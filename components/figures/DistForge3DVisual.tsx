"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { Play, Pause, RotateCcw, Box, Layers, Eye, Compass, Sliders, Sparkles, Code2, Cpu } from "lucide-react";

type ModelType = "csg-box" | "twisted-column" | "metaspheres" | "gyroid";
type RenderMode = "shaded" | "wireframe" | "raymarch" | "slice";

interface Vec3 {
  x: number;
  y: number;
  z: number;
}

interface Face {
  indices: number[];
  color?: string;
  isInside?: boolean;
}

export function DistForge3DVisual() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // User interactive state
  const [modelType, setModelType] = useState<ModelType>("csg-box");
  const [renderMode, setRenderMode] = useState<RenderMode>("shaded");
  const [isAutoRotating, setIsAutoRotating] = useState<boolean>(true);
  const [twistParam, setTwistParam] = useState<number>(2.2);
  const [csgScaleParam, setCsgScaleParam] = useState<number>(1.15);
  const [sliceZParam, setSliceZParam] = useState<number>(0.0);

  // Rotation angles (radians)
  const rotationRef = useRef<{ rotX: number; rotY: number }>({ rotX: 0.45, rotY: 0.65 });
  const isDraggingRef = useRef<boolean>(false);
  const lastMousePosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // ---------------------------------------------------------------------------
  // 3D Geometry Generators for Signed Distance Function Models
  // ---------------------------------------------------------------------------

  // 1. CSG Box minus Sphere (Constructive Solid Geometry)
  const generateCsgBoxGeometry = useCallback((sphereRadius: number) => {
    const vertices: Vec3[] = [];
    const faces: Face[] = [];
    const s = 1.0; // half box size
    const r = Math.min(1.4, Math.max(0.6, sphereRadius));

    // Outer box grid with chamfers and spherical carved holes on faces
    const res = 12; // grid resolution per face
    for (let axis = 0; axis < 6; axis++) {
      for (let i = 0; i <= res; i++) {
        for (let j = 0; j <= res; j++) {
          const u = (i / res) * 2 - 1;
          const v = (j / res) * 2 - 1;
          let p: Vec3;

          if (axis === 0) p = { x: s, y: u * s, z: v * s };
          else if (axis === 1) p = { x: -s, y: u * s, z: v * s };
          else if (axis === 2) p = { x: u * s, y: s, z: v * s };
          else if (axis === 3) p = { x: u * s, y: -s, z: v * s };
          else if (axis === 4) p = { x: u * s, y: v * s, z: s };
          else p = { x: u * s, y: v * s, z: -s };

          // CSG Subtraction: if inside sphere, project outward to spherical boundary
          const distSq = p.x * p.x + p.y * p.y + p.z * p.z;
          const dist = Math.sqrt(distSq);
          let isCarved = false;

          if (dist < r) {
            const factor = r / (dist || 1);
            p = { x: p.x * factor, y: p.y * factor, z: p.z * factor };
            isCarved = true;
          }

          vertices.push(p);

          // Add face quad
          if (i < res && j < res) {
            const rowOffset = axis * (res + 1) * (res + 1);
            const idx0 = rowOffset + i * (res + 1) + j;
            const idx1 = idx0 + 1;
            const idx2 = idx0 + (res + 1) + 1;
            const idx3 = idx0 + (res + 1);

            faces.push({
              indices: [idx0, idx1, idx2, idx3],
              isInside: isCarved,
            });
          }
        }
      }
    }

    return { vertices, faces };
  }, []);

  // 2. Twisted Column (Domain Warping: twist(p, k))
  const generateTwistedColumnGeometry = useCallback((twistAmount: number) => {
    const vertices: Vec3[] = [];
    const faces: Face[] = [];
    const slices = 28;
    const segments = 16;
    const height = 2.4;
    const width = 0.7;

    for (let i = 0; i <= slices; i++) {
      const y = -height / 2 + (i / slices) * height;
      const angle = y * twistAmount;
      const cosA = Math.cos(angle);
      const sinA = Math.sin(angle);

      for (let j = 0; j < segments; j++) {
        // Square perimeter cross section
        const theta = (j / segments) * Math.PI * 2;
        // Rounded box 2D profile
        const bx = Math.sign(Math.cos(theta)) * Math.min(Math.abs(Math.cos(theta)), width * 0.75);
        const bz = Math.sign(Math.sin(theta)) * Math.min(Math.abs(Math.sin(theta)), width * 0.75);

        // Apply domain twist
        const x = bx * cosA - bz * sinA;
        const z = bx * sinA + bz * cosA;

        vertices.push({ x, y, z });

        if (i < slices) {
          const idx0 = i * segments + j;
          const idx1 = i * segments + ((j + 1) % segments);
          const idx2 = (i + 1) * segments + ((j + 1) % segments);
          const idx3 = (i + 1) * segments + j;

          faces.push({ indices: [idx0, idx1, idx2, idx3] });
        }
      }
    }

    return { vertices, faces };
  }, []);

  // 3. Metaspheres (Smooth Polynomial Union smin(d1, d2, k))
  const generateMetaspheresGeometry = useCallback(() => {
    const vertices: Vec3[] = [];
    const faces: Face[] = [];
    const latBands = 20;
    const longBands = 24;

    // Two intersecting spheres blended smoothly
    const c1 = { x: -0.55, y: 0.0, z: 0.0, r: 0.95 };
    const c2 = { x: 0.55, y: 0.1, z: 0.0, r: 0.85 };

    for (let lat = 0; lat <= latBands; lat++) {
      const theta = (lat * Math.PI) / latBands;
      const sinTheta = Math.sin(theta);
      const cosTheta = Math.cos(theta);

      for (let lon = 0; lon <= longBands; lon++) {
        const phi = (lon * 2 * Math.PI) / longBands;
        const sinPhi = Math.sin(phi);
        const cosPhi = Math.cos(phi);

        // Ray from origin
        const dir = {
          x: sinTheta * cosPhi,
          y: cosTheta,
          z: sinTheta * sinPhi,
        };

        // Approximate blended radial distance using smin
        let r = 0.95;
        if (dir.x > 0) {
          r = 0.95 + 0.3 * Math.exp(-Math.pow(dir.x - 0.5, 2) / 0.4);
        } else {
          r = 0.95 + 0.35 * Math.exp(-Math.pow(dir.x + 0.5, 2) / 0.4);
        }

        const p = {
          x: dir.x * r * 1.35,
          y: dir.y * r * 0.95,
          z: dir.z * r * 0.95,
        };

        vertices.push(p);

        if (lat < latBands && lon < longBands) {
          const first = lat * (longBands + 1) + lon;
          const second = first + longBands + 1;

          faces.push({
            indices: [first, first + 1, second + 1, second],
          });
        }
      }
    }

    return { vertices, faces };
  }, []);

  // 4. Gyroid Minimal Surface Lattice (sin(x)cos(y) + sin(y)cos(z) + sin(z)cos(x) = 0)
  const generateGyroidGeometry = useCallback(() => {
    const vertices: Vec3[] = [];
    const faces: Face[] = [];
    const steps = 18;
    const size = 1.6;

    for (let i = 0; i <= steps; i++) {
      const u = (i / steps) * 2 - 1;
      const theta = u * Math.PI * 1.8;
      for (let j = 0; j <= steps; j++) {
        const v = (j / steps) * 2 - 1;
        const phi = v * Math.PI * 1.8;

        // Parametric Gyroid ribbon slice
        const x = (Math.sin(theta) * Math.cos(phi)) * size * 0.9;
        const y = (Math.sin(phi) * Math.cos(theta)) * size * 0.9;
        const z = (Math.sin(theta + phi) * 0.5) * size * 0.9;

        vertices.push({ x, y, z });

        if (i < steps && j < steps) {
          const idx0 = i * (steps + 1) + j;
          const idx1 = idx0 + 1;
          const idx2 = idx0 + (steps + 1) + 1;
          const idx3 = idx0 + (steps + 1);

          faces.push({ indices: [idx0, idx1, idx2, idx3] });
        }
      }
    }

    return { vertices, faces };
  }, []);

  // Active geometry computation
  const geometry = useMemo(() => {
    if (modelType === "csg-box") return generateCsgBoxGeometry(csgScaleParam);
    if (modelType === "twisted-column") return generateTwistedColumnGeometry(twistParam);
    if (modelType === "metaspheres") return generateMetaspheresGeometry();
    return generateGyroidGeometry();
  }, [modelType, csgScaleParam, twistParam, generateCsgBoxGeometry, generateTwistedColumnGeometry, generateMetaspheresGeometry, generateGyroidGeometry]);

  // ---------------------------------------------------------------------------
  // Canvas 3D Rendering Engine with Sphere-Tracing Raymarcher & Isosurface Slice
  // ---------------------------------------------------------------------------

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let lastTime = performance.now();

    const render = (time: number) => {
      const dt = (time - lastTime) / 1000;
      lastTime = time;

      // Auto-rotation update
      if (isAutoRotating && !isDraggingRef.current) {
        rotationRef.current.rotY += dt * 0.45;
      }

      // Handle high-DPI
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      const width = rect.width;
      const height = rect.height;

      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const fov = 340;
      const cameraDistance = 3.8;

      const { rotX, rotY } = rotationRef.current;
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);

      // Light direction vector (normalized)
      const light = { x: 0.577, y: 0.577, z: 0.577 };

      // 1. Transform all vertices into Camera Coordinate Space
      const projected = geometry.vertices.map((v) => {
        // Rotate around Y
        const x1 = v.x * cosY + v.z * sinY;
        const y1 = v.y;
        const z1 = -v.x * sinY + v.z * cosY;

        // Rotate around X
        const x2 = x1;
        const y2 = y1 * cosX - z1 * sinX;
        const z2 = y1 * sinX + z1 * cosX;

        // Camera perspective projection
        const depth = z2 + cameraDistance;
        const scale = fov / (depth || 1);
        const px = cx + x2 * scale;
        const py = cy - y2 * scale;

        return { px, py, z: z2, origZ: v.z, raw: { x: x2, y: y2, z: z2 } };
      });

      // 2. Prepare & Depth-Sort Faces (Painter's Algorithm)
      const sortedFaces = geometry.faces
        .map((face) => {
          let avgZ = 0;
          face.indices.forEach((idx) => {
            avgZ += projected[idx].z;
          });
          avgZ /= face.indices.length;

          // Compute Face Normal in View Space
          const p0 = projected[face.indices[0]].raw;
          const p1 = projected[face.indices[1]].raw;
          const p2 = projected[face.indices[2]].raw;

          const ux = p1.x - p0.x;
          const uy = p1.y - p0.y;
          const uz = p1.z - p0.z;
          const vx = p2.x - p0.x;
          const vy = p2.y - p0.y;
          const vz = p2.z - p0.z;

          const nx = uy * vz - uz * vy;
          const ny = uz * vx - ux * vz;
          const nz = ux * vy - uy * vx;
          const len = Math.sqrt(nx * nx + ny * ny + nz * nz) || 1;

          return {
            face,
            avgZ,
            normal: { x: nx / len, y: ny / len, z: nz / len },
          };
        })
        .sort((a, b) => b.avgZ - a.avgZ);

      // -----------------------------------------------------------------------
      // Render Mode Specific Drawing
      // -----------------------------------------------------------------------

      if (renderMode === "slice") {
        // Draw 3D Cutting Plane Bounds
        ctx.strokeStyle = "rgba(16, 185, 129, 0.4)";
        ctx.setLineDash([4, 4]);
        ctx.strokeRect(cx - 160, cy - 140, 320, 280);
        ctx.setLineDash([]);

        // Label for cutting plane
        ctx.font = "10px monospace";
        ctx.fillStyle = "#10b981";
        ctx.fillText(`CUTTING PLANE: Z = ${sliceZParam.toFixed(2)}`, cx - 150, cy - 148);
      }

      // Draw Faces
      sortedFaces.forEach(({ face, normal }) => {
        // Backface culling in shaded/solid mode
        if (renderMode === "shaded" && normal.z <= 0) return;

        // If slice mode is active, cull geometry beyond slice plane
        if (renderMode === "slice") {
          const firstVertex = geometry.vertices[face.indices[0]];
          if (firstVertex.z > sliceZParam) return;
        }

        ctx.beginPath();
        face.indices.forEach((idx, i) => {
          const pt = projected[idx];
          if (i === 0) ctx.moveTo(pt.px, pt.py);
          else ctx.lineTo(pt.px, pt.py);
        });
        ctx.closePath();

        if (renderMode === "wireframe") {
          // Dual Contouring Quad/Triangle Wireframe
          ctx.strokeStyle = normal.z > 0 ? "rgba(16, 185, 129, 0.85)" : "rgba(16, 185, 129, 0.25)";
          ctx.lineWidth = 1.2;
          ctx.stroke();

          // Small vertex points to highlight dual contour vertices
          face.indices.forEach((idx) => {
            const pt = projected[idx];
            ctx.fillStyle = "#34d399";
            ctx.fillRect(pt.px - 1.5, pt.py - 1.5, 3, 3);
          });
        } else if (renderMode === "shaded") {
          // Phong Illumination: Ambient + Diffuse + Specular Glint + Fresnel Rim
          const dot = Math.max(0, normal.x * light.x + normal.y * light.y + normal.z * light.z);
          const fresnel = Math.pow(1 - Math.max(0, normal.z), 2.5);

          // Specular reflection
          const refX = 2 * dot * normal.x - light.x;
          const refY = 2 * dot * normal.y - light.y;
          const refZ = 2 * dot * normal.z - light.z;
          const spec = Math.pow(Math.max(0, refZ), 16) * 0.45;

          const baseEmerald = face.isInside
            ? { r: 59, g: 130, b: 246 } // Blue inside carved CSG cavity
            : { r: 16, g: 185, b: 129 }; // Emerald for outer surface

          const intensity = 0.22 + 0.68 * dot + spec;
          const r = Math.min(255, Math.floor(baseEmerald.r * intensity + fresnel * 60));
          const g = Math.min(255, Math.floor(baseEmerald.g * intensity + fresnel * 80));
          const b = Math.min(255, Math.floor(baseEmerald.b * intensity + fresnel * 100));

          ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
          ctx.fill();

          // Subtle face edge boundary
          ctx.strokeStyle = `rgba(${r * 0.6}, ${g * 0.6}, ${b * 0.6}, 0.35)`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        } else if (renderMode === "slice") {
          // Isosurface Heatmap Color (Distance gradient representation)
          ctx.fillStyle = "rgba(16, 185, 129, 0.35)";
          ctx.fill();
          ctx.strokeStyle = "#10b981";
          ctx.lineWidth = 1.5;
          ctx.stroke();
        } else if (renderMode === "raymarch") {
          // Transparent ghost geometry to anchor sphere tracing rays
          ctx.fillStyle = "rgba(16, 185, 129, 0.08)";
          ctx.fill();
          ctx.strokeStyle = "rgba(16, 185, 129, 0.25)";
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      });

      // -----------------------------------------------------------------------
      // Render Mode: Sphere Tracing Ray Visualizer
      // -----------------------------------------------------------------------
      if (renderMode === "raymarch") {
        // Draw 3 Camera Rays with expanding distance-bound spheres
        const rays = [
          { origin: { x: -1.8, y: 1.2, z: -2.8 }, dir: { x: 0.45, y: -0.28, z: 0.85 } },
          { origin: { x: 0.0, y: 0.3, z: -3.0 }, dir: { x: 0.0, y: -0.05, z: 1.0 } },
          { origin: { x: 1.5, y: -0.8, z: -2.7 }, dir: { x: -0.38, y: 0.2, z: 0.9 } },
        ];

        rays.forEach((ray, rayIdx) => {
          let curr = { ...ray.origin };
          let totalDist = 0;
          const steps = [0.85, 0.52, 0.31, 0.16, 0.08, 0.03]; // Simulated SDF distance step sequence

          ctx.strokeStyle = rayIdx === 1 ? "#3b82f6" : "#f59e0b";
          ctx.lineWidth = 1.8;

          // Draw the primary ray trajectory
          ctx.beginPath();
          steps.forEach((stepDist, stepIdx) => {
            // Project ray origin to screen
            const depth = curr.z * cosX + curr.y * sinX + cameraDistance;
            const scale = fov / (depth || 1);
            const px = cx + (curr.x * cosY + curr.z * sinY) * scale;
            const py = cy - (curr.y * cosX - curr.z * sinX) * scale;

            if (stepIdx === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);

            // Draw Tangent Sphere Circle around current ray point
            ctx.save();
            ctx.strokeStyle = rayIdx === 1 ? "rgba(59, 130, 246, 0.4)" : "rgba(245, 158, 11, 0.35)";
            ctx.fillStyle = rayIdx === 1 ? "rgba(59, 130, 246, 0.05)" : "rgba(245, 158, 11, 0.04)";
            ctx.beginPath();
            ctx.arc(px, py, stepDist * scale * 0.9, 0, Math.PI * 2);
            ctx.stroke();
            ctx.fill();

            // Point marker
            ctx.fillStyle = rayIdx === 1 ? "#60a5fa" : "#fbbf24";
            ctx.beginPath();
            ctx.arc(px, py, 2.5, 0, Math.PI * 2);
            ctx.fill();

            ctx.restore();

            // Advance ray along dir by conservative SDF step
            curr.x += ray.dir.x * stepDist;
            curr.y += ray.dir.y * stepDist;
            curr.z += ray.dir.z * stepDist;
            totalDist += stepDist;
          });
          ctx.stroke();

          // Surface Hit Contact Marker
          const finalDepth = curr.z * cosX + curr.y * sinX + cameraDistance;
          const finalScale = fov / (finalDepth || 1);
          const hitX = cx + (curr.x * cosY + curr.z * sinY) * finalScale;
          const hitY = cy - (curr.y * cosX - curr.z * sinX) * finalScale;

          ctx.fillStyle = "#10b981";
          ctx.beginPath();
          ctx.arc(hitX, hitY, 5, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = "#ffffff";
          ctx.lineWidth = 1.5;
          ctx.stroke();

          ctx.font = "9px monospace";
          ctx.fillStyle = "#10b981";
          ctx.fillText(`HIT (ε < 0.001)`, hitX + 8, hitY + 3);
        });
      }

      ctx.restore();
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animationFrameId);
  }, [geometry, renderMode, isAutoRotating, sliceZParam]);

  // ---------------------------------------------------------------------------
  // Mouse / Touch Drag Orbit Handlers
  // ---------------------------------------------------------------------------

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    isDraggingRef.current = true;
    lastMousePosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - lastMousePosRef.current.x;
    const dy = e.clientY - lastMousePosRef.current.y;
    lastMousePosRef.current = { x: e.clientX, y: e.clientY };

    rotationRef.current.rotY += dx * 0.012;
    rotationRef.current.rotX = Math.max(-1.4, Math.min(1.4, rotationRef.current.rotX + dy * 0.012));
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  // Active Code Representation Snippet
  const codeSnippet = useMemo(() => {
    if (modelType === "csg-box") {
      return `from distforge import box, sphere\n\n# Constructive Solid Geometry\nscene = box(1.5) - sphere(${csgScaleParam.toFixed(2)})\nscene.render()`;
    }
    if (modelType === "twisted-column") {
      return `from distforge import box, Y\n\n# Domain Warping without Matrix Mult\nscene = box((0.7, 2.4, 0.7)).twist(${twistParam.toFixed(1)})\nscene.render()`;
    }
    if (modelType === "metaspheres") {
      return `from distforge import sphere\n\n# Smooth Polynomial Union (smin)\ns1 = sphere(1.0).translate((-0.5, 0, 0))\ns2 = sphere(0.85).translate((0.5, 0, 0))\nscene = s1.smooth_union(s2, k=0.45)\nscene.render()`;
    }
    return `from distforge import Forge\n\n# Custom Triply Periodic Minimal Surface\nscene = Forge("""\n  vec3 q = sin(p * 1.5) * cos(p.yzx * 1.5);\n  return (q.x + q.y + q.z) * 0.5;\n""")\nscene.render()`;
  }, [modelType, csgScaleParam, twistParam]);

  return (
    <div className="w-full space-y-4 select-none font-sans">
      {/* 3D Viewport Container */}
      <div className="relative w-full h-[440px] sm:h-[480px] rounded-[14px] border border-[var(--border)] bg-[var(--surface-muted)] overflow-hidden shadow-inner group">
        {/* Interactive 3D Canvas */}
        <canvas
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className="w-full h-full cursor-grab active:cursor-grabbing block touch-none"
        />

        {/* TOP LEFT: Live Python AST Code Overlay */}
        <div className="absolute top-3 left-3 max-w-[280px] sm:max-w-[340px] p-2.5 rounded-xl border border-[var(--border)] bg-[var(--card)]/85 backdrop-blur-md shadow-md pointer-events-none font-mono">
          <div className="flex items-center gap-1.5 text-[10px] text-emerald-600 dark:text-emerald-400 font-bold mb-1.5 uppercase tracking-wider">
            <Code2 className="w-3.5 h-3.5" />
            <span>Python AST Expression</span>
          </div>
          <pre className="text-[10px] sm:text-[11px] text-[var(--foreground)] leading-relaxed whitespace-pre-wrap">
            {codeSnippet}
          </pre>
        </div>

        {/* TOP RIGHT: GPU Telemetry Badge */}
        <div className="absolute top-3 right-3 p-2.5 rounded-xl border border-[var(--border)] bg-[var(--card)]/85 backdrop-blur-md shadow-md font-mono text-[10px] space-y-1">
          <div className="flex items-center justify-between gap-3">
            <span className="text-[var(--muted)]">GPU Raymarcher</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              60+ FPS
            </span>
          </div>
          <div className="flex items-center justify-between gap-3 text-[9px] text-[var(--muted)]">
            <span>Sphere Step Safety</span>
            <span className="text-[var(--foreground)]">0.3× (Conservative)</span>
          </div>
          <div className="flex items-center justify-between gap-3 text-[9px] text-[var(--muted)]">
            <span>Mesh Pipeline</span>
            <span className="text-blue-500 font-semibold">Dual Contouring (QEF pinv)</span>
          </div>
        </div>

        {/* BOTTOM LEFT: Drag to Rotate Guide Hint */}
        <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg border border-[var(--border)] bg-[var(--card)]/80 backdrop-blur-sm text-[10px] font-mono text-[var(--muted)] flex items-center gap-1.5 pointer-events-none">
          <Compass className="w-3.5 h-3.5 text-emerald-500" />
          <span>Click &amp; drag anywhere to rotate 3D view</span>
        </div>

        {/* BOTTOM RIGHT: Quick Canvas Actions (Play/Pause Auto-Spin, Reset Camera) */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1.5">
          <button
            onClick={() => setIsAutoRotating(!isAutoRotating)}
            className="p-2 rounded-lg border border-[var(--border)] bg-[var(--card)]/90 backdrop-blur-md hover:bg-[var(--surface)] text-[var(--foreground)] transition-colors shadow-sm flex items-center gap-1 text-[11px] font-mono"
            title={isAutoRotating ? "Pause 3D auto-spin" : "Enable 3D auto-spin"}
          >
            {isAutoRotating ? <Pause className="w-3.5 h-3.5 text-amber-500" /> : <Play className="w-3.5 h-3.5 text-emerald-500" />}
            <span className="hidden sm:inline">{isAutoRotating ? "Pause Spin" : "Auto Spin"}</span>
          </button>
          <button
            onClick={() => {
              rotationRef.current = { rotX: 0.45, rotY: 0.65 };
            }}
            className="p-2 rounded-lg border border-[var(--border)] bg-[var(--card)]/90 backdrop-blur-md hover:bg-[var(--surface)] text-[var(--muted)] hover:text-[var(--foreground)] transition-colors shadow-sm"
            title="Reset 3D orientation"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 3D Control Ribbon */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 p-3.5 rounded-xl border border-[var(--border)] bg-[var(--card)] shadow-xs">
        {/* Procedural Shape Selectors */}
        <div className="md:col-span-6 space-y-1.5">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--muted)] block">
            1. Select Procedural SDF Shape
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 font-mono text-xs">
            <button
              onClick={() => setModelType("csg-box")}
              className={`px-2.5 py-1.5 rounded-lg transition-all text-left flex items-center gap-1.5 ${
                modelType === "csg-box"
                  ? "bg-emerald-500 text-white font-bold shadow-xs"
                  : "bg-[var(--surface)] hover:bg-[var(--surface-muted)] text-[var(--muted)] hover:text-[var(--foreground)] border border-[var(--border)]"
              }`}
            >
              <Box className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">CSG Box</span>
            </button>
            <button
              onClick={() => setModelType("twisted-column")}
              className={`px-2.5 py-1.5 rounded-lg transition-all text-left flex items-center gap-1.5 ${
                modelType === "twisted-column"
                  ? "bg-emerald-500 text-white font-bold shadow-xs"
                  : "bg-[var(--surface)] hover:bg-[var(--surface-muted)] text-[var(--muted)] hover:text-[var(--foreground)] border border-[var(--border)]"
              }`}
            >
              <Layers className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">Twist Warp</span>
            </button>
            <button
              onClick={() => setModelType("metaspheres")}
              className={`px-2.5 py-1.5 rounded-lg transition-all text-left flex items-center gap-1.5 ${
                modelType === "metaspheres"
                  ? "bg-emerald-500 text-white font-bold shadow-xs"
                  : "bg-[var(--surface)] hover:bg-[var(--surface-muted)] text-[var(--muted)] hover:text-[var(--foreground)] border border-[var(--border)]"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">Metaspheres</span>
            </button>
            <button
              onClick={() => setModelType("gyroid")}
              className={`px-2.5 py-1.5 rounded-lg transition-all text-left flex items-center gap-1.5 ${
                modelType === "gyroid"
                  ? "bg-emerald-500 text-white font-bold shadow-xs"
                  : "bg-[var(--surface)] hover:bg-[var(--surface-muted)] text-[var(--muted)] hover:text-[var(--foreground)] border border-[var(--border)]"
              }`}
            >
              <Cpu className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">Gyroid</span>
            </button>
          </div>
        </div>

        {/* 3D Rendering Mode Selectors */}
        <div className="md:col-span-6 space-y-1.5">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--muted)] block">
            2. Choose 3D Visualization Mode
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 font-mono text-xs">
            <button
              onClick={() => setRenderMode("shaded")}
              className={`px-2.5 py-1.5 rounded-lg transition-all text-left flex items-center gap-1.5 ${
                renderMode === "shaded"
                  ? "bg-blue-600 text-white font-bold shadow-xs"
                  : "bg-[var(--surface)] hover:bg-[var(--surface-muted)] text-[var(--muted)] hover:text-[var(--foreground)] border border-[var(--border)]"
              }`}
            >
              <Eye className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">Solid Phong</span>
            </button>
            <button
              onClick={() => setRenderMode("wireframe")}
              className={`px-2.5 py-1.5 rounded-lg transition-all text-left flex items-center gap-1.5 ${
                renderMode === "wireframe"
                  ? "bg-blue-600 text-white font-bold shadow-xs"
                  : "bg-[var(--surface)] hover:bg-[var(--surface-muted)] text-[var(--muted)] hover:text-[var(--foreground)] border border-[var(--border)]"
              }`}
            >
              <Layers className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">Dual Contour</span>
            </button>
            <button
              onClick={() => setRenderMode("raymarch")}
              className={`px-2.5 py-1.5 rounded-lg transition-all text-left flex items-center gap-1.5 ${
                renderMode === "raymarch"
                  ? "bg-blue-600 text-white font-bold shadow-xs"
                  : "bg-[var(--surface)] hover:bg-[var(--surface-muted)] text-[var(--muted)] hover:text-[var(--foreground)] border border-[var(--border)]"
              }`}
            >
              <Compass className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">Ray Steps</span>
            </button>
            <button
              onClick={() => setRenderMode("slice")}
              className={`px-2.5 py-1.5 rounded-lg transition-all text-left flex items-center gap-1.5 ${
                renderMode === "slice"
                  ? "bg-blue-600 text-white font-bold shadow-xs"
                  : "bg-[var(--surface)] hover:bg-[var(--surface-muted)] text-[var(--muted)] hover:text-[var(--foreground)] border border-[var(--border)]"
              }`}
            >
              <Sliders className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">SDF Slice</span>
            </button>
          </div>
        </div>

        {/* Dynamic Parameter Sliders (matching DistForge's Param API) */}
        <div className="md:col-span-12 pt-2 border-t border-[var(--border)] grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
          {modelType === "csg-box" && (
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[11px] text-[var(--muted)]">
                <span>Cutter Radius (sphere)</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">{csgScaleParam.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0.7"
                max="1.35"
                step="0.02"
                value={csgScaleParam}
                onChange={(e) => setCsgScaleParam(parseFloat(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer h-1.5 bg-[var(--surface-muted)] rounded-lg appearance-none"
              />
            </div>
          )}

          {modelType === "twisted-column" && (
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[11px] text-[var(--muted)]">
                <span>Domain Twist (radians/m)</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">{twistParam.toFixed(1)} rad</span>
              </div>
              <input
                type="range"
                min="0.0"
                max="4.0"
                step="0.1"
                value={twistParam}
                onChange={(e) => setTwistParam(parseFloat(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer h-1.5 bg-[var(--surface-muted)] rounded-lg appearance-none"
              />
            </div>
          )}

          {renderMode === "slice" && (
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[11px] text-[var(--muted)]">
                <span>Cutting Plane (Z-Axis)</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">{sliceZParam.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="-1.2"
                max="1.2"
                step="0.05"
                value={sliceZParam}
                onChange={(e) => setSliceZParam(parseFloat(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer h-1.5 bg-[var(--surface-muted)] rounded-lg appearance-none"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * Clean SVG export for InfiniteGridHero project cards
 */
export function getDistForgeCardSvg(): string {
  return `
    <svg viewBox="0 0 320 200" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="df-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#10b981" stop-opacity="0.3" />
          <stop offset="100%" stop-color="#3b82f6" stop-opacity="0.05" />
        </linearGradient>
      </defs>
      <!-- Isometric 3D CSG Cube Wireframe -->
      <g transform="translate(160, 100) scale(1.1)">
        <g class="distforge-rotating-cube">
        <!-- Back Edges -->
        <line x1="0" y1="0" x2="-60" y2="-35" stroke="#10b981" stroke-opacity="0.25" stroke-dasharray="3 3" />
        <line x1="0" y1="0" x2="60" y2="-35" stroke="#10b981" stroke-opacity="0.25" stroke-dasharray="3 3" />
        <line x1="0" y1="0" x2="0" y2="70" stroke="#10b981" stroke-opacity="0.25" stroke-dasharray="3 3" />

        <!-- Front Cube Top Face -->
        <polygon points="0,-70 60,-35 0,0 -60,-35" fill="url(#df-grad)" stroke="#10b981" stroke-width="1.8" />
        <!-- Front Cube Right Face -->
        <polygon points="0,0 60,-35 60,35 0,70" fill="url(#df-grad)" stroke="#10b981" stroke-width="1.8" />
        <!-- Front Cube Left Face -->
        <polygon points="0,0 -60,-35 -60,35 0,70" fill="url(#df-grad)" stroke="#10b981" stroke-width="1.8" />

        <!-- Carved CSG Sphere Core -->
        <circle cx="0" cy="0" r="32" fill="#3b82f6" fill-opacity="0.2" stroke="#3b82f6" stroke-width="1.5" stroke-dasharray="4 2" />
        <ellipse cx="0" cy="0" rx="32" ry="12" fill="none" stroke="#60a5fa" stroke-width="1.2" opacity="0.6" />

        <!-- Raymarching Tangent Circle -->
        <circle cx="-25" cy="-15" r="14" fill="none" stroke="#f59e0b" stroke-width="1.2" stroke-dasharray="2 2" opacity="0.8" />
        <circle cx="15" cy="18" r="8" fill="none" stroke="#f59e0b" stroke-width="1.2" stroke-dasharray="2 2" opacity="0.8" />
        </g>
      </g>
    </svg>
  `;
}
