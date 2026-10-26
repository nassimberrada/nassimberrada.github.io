"use client";

import React, { useEffect, useRef, useMemo } from "react";

export interface WaveConfig {
  id?: string;
  baseY?: number;
  amplitude: number;
  frequency: number;
  phase?: number;
  speed?: number;
  secondaryAmp?: number;
  secondaryFreq?: number;
  fillLight?: string;
  fillDark?: string;
  strokeLight?: string;
  strokeDark?: string;
}

interface NeuralGeometryBackgroundProps {
  panXRef?: React.MutableRefObject<number>;
  panYRef?: React.MutableRefObject<number>;
  worldWidth?: number;
  worldHeight?: number;
  waves?: Array<Partial<WaveConfig>>;
}

export const BASE_WAVE_DEFAULTS: WaveConfig[] = [
  {
    id: "champagne",
    baseY: 0.20,
    amplitude: 55,
    frequency: 0.0018,
    phase: 0.0,
    speed: 0.35,
    secondaryAmp: 18,
    secondaryFreq: 0.0035,
    fillLight: "rgba(238, 226, 214, 0.38)",
    fillDark: "rgba(48, 38, 34, 0.18)",
    strokeLight: "rgba(255, 255, 255, 0.70)",
    strokeDark: "rgba(215, 175, 140, 0.06)",
  },
  {
    id: "ice-blue",
    baseY: 0.33,
    amplitude: 95,
    frequency: 0.0024,
    phase: 1.6,
    speed: 0.45,
    secondaryAmp: 25,
    secondaryFreq: 0.0012,
    fillLight: "rgba(164, 192, 218, 0.32)",
    fillDark: "rgba(28, 48, 72, 0.22)",
    strokeLight: "rgba(195, 218, 240, 0.60)",
    strokeDark: "rgba(110, 160, 220, 0.08)",
  },
  {
    id: "mocha-bronze",
    baseY: 0.46,
    amplitude: 120,
    frequency: 0.0016,
    phase: 3.2,
    speed: 0.30,
    secondaryAmp: 30,
    secondaryFreq: 0.0028,
    fillLight: "rgba(168, 138, 120, 0.26)",
    fillDark: "rgba(52, 38, 32, 0.25)",
    strokeLight: "rgba(210, 185, 170, 0.50)",
    strokeDark: "rgba(195, 135, 95, 0.06)",
  },
  {
    id: "charcoal",
    baseY: 0.60,
    amplitude: 70,
    frequency: 0.0012,
    phase: 4.5,
    speed: 0.22,
    secondaryAmp: 18,
    secondaryFreq: 0.0022,
    fillLight: "rgba(75, 90, 110, 0.20)",
    fillDark: "rgba(16, 22, 34, 0.32)",
    strokeLight: "rgba(100, 120, 145, 0.35)",
    strokeDark: "rgba(80, 100, 130, 0.05)",
  },
];

const PHI = (1 + Math.sqrt(5)) / 2;

const ICOSA_VERTS: [number, number, number][] = [
  [-1, PHI, 0], [1, PHI, 0], [-1, -PHI, 0], [1, -PHI, 0],
  [0, -1, PHI], [0, 1, PHI], [0, -1, -PHI], [0, 1, -PHI],
  [PHI, 0, -1], [PHI, 0, 1], [-PHI, 0, -1], [-PHI, 0, 1],
].map(([x, y, z]) => {
  const len = Math.hypot(x, y, z);
  return [x / len, y / len, z / len];
});

const ICOSA_FACES: [number, number, number][] = [
  [0, 11, 5], [0, 5, 1], [0, 1, 7], [0, 7, 10], [0, 10, 11],
  [1, 5, 9], [5, 11, 4], [11, 10, 2], [10, 7, 6], [7, 1, 8],
  [3, 9, 4], [3, 4, 2], [3, 2, 6], [3, 6, 8], [3, 8, 9],
  [4, 9, 5], [2, 4, 11], [6, 2, 10], [8, 6, 7], [9, 8, 1],
];

interface PolySphere {
  xPct: number;
  yPct: number;
  radius: number;
  baseColor: [number, number, number];
  rotX: number;
  rotY: number;
  rotSpeedX: number;
  rotSpeedY: number;
  hasShadow?: boolean;
}

interface ConstellationNode {
  xPct: number;
  yPct: number;
  type: "sphere" | "dot" | "amber-facet";
  size?: number;
  sphereIdx?: number;
}

export function NeuralGeometryBackground({
  waves,
}: NeuralGeometryBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const activeWaves: WaveConfig[] = useMemo(() => {
    if (!waves || waves.length === 0) return BASE_WAVE_DEFAULTS;
    return waves.map((w, idx) => {
      const fallback = BASE_WAVE_DEFAULTS[idx % BASE_WAVE_DEFAULTS.length];
      return {
        id: w.id || `wave-${idx}`,
        baseY: w.baseY ?? (0.18 + idx * 0.15),
        amplitude: w.amplitude ?? fallback.amplitude,
        frequency: w.frequency ?? fallback.frequency,
        phase: w.phase ?? fallback.phase,
        speed: w.speed ?? fallback.speed,
        secondaryAmp: w.secondaryAmp ?? fallback.secondaryAmp,
        secondaryFreq: w.secondaryFreq ?? fallback.secondaryFreq,
        fillLight: w.fillLight ?? fallback.fillLight,
        fillDark: w.fillDark ?? fallback.fillDark,
        strokeLight: w.strokeLight ?? fallback.strokeLight,
        strokeDark: w.strokeDark ?? fallback.strokeDark,
      };
    });
  }, [waves]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animId: number;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const COLOR_CHARCOAL: [number, number, number] = [88, 76, 68];
    const COLOR_IVORY: [number, number, number] = [246, 243, 238];
    const COLOR_ICE_BLUE: [number, number, number] = [155, 182, 210];
    const COLOR_COPPER: [number, number, number] = [214, 150, 115];
    const COLOR_SLATE: [number, number, number] = [75, 96, 122];
    const COLOR_SAND: [number, number, number] = [218, 196, 175];

    const spheres: PolySphere[] = [
      // 0: Large dark bronze/charcoal sphere (upper-left)
      { xPct: 0.14, yPct: 0.22, radius: 56, baseColor: COLOR_CHARCOAL, rotX: 0.3, rotY: 0.2, rotSpeedX: 0.0012, rotSpeedY: 0.0015, hasShadow: true },
      // 1: Large glowing white/ivory faceted sphere (mid-right)
      { xPct: 0.78, yPct: 0.34, radius: 52, baseColor: COLOR_IVORY, rotX: 0.8, rotY: 0.1, rotSpeedX: 0.001, rotSpeedY: 0.0012, hasShadow: true },
      // 2: Ice-Blue geometric sphere (lower-right)
      { xPct: 0.76, yPct: 0.67, radius: 48, baseColor: COLOR_ICE_BLUE, rotX: 0.2, rotY: 0.6, rotSpeedX: 0.0015, rotSpeedY: 0.0014 },
      // 3: Warm copper facet bead (mid-flow)
      { xPct: 0.60, yPct: 0.58, radius: 20, baseColor: COLOR_COPPER, rotX: 0.4, rotY: 0.3, rotSpeedX: 0.002, rotSpeedY: 0.002 },
      // 4: Small charcoal-slate bead
      { xPct: 0.06, yPct: 0.42, radius: 15, baseColor: COLOR_CHARCOAL, rotX: 0.1, rotY: 0.8, rotSpeedX: 0.0025, rotSpeedY: 0.003 },
      // 5: Small champagne facet (center-left)
      { xPct: 0.26, yPct: 0.34, radius: 17, baseColor: COLOR_SAND, rotX: 0.5, rotY: 0.3, rotSpeedX: 0.0022, rotSpeedY: 0.002 },
      // 6: Deep navy node (upper center)
      { xPct: 0.64, yPct: 0.22, radius: 16, baseColor: COLOR_SLATE, rotX: 0.2, rotY: 0.5, rotSpeedX: 0.002, rotSpeedY: 0.0025 },
      // 7: Copper facet (mid-left)
      { xPct: 0.15, yPct: 0.52, radius: 16, baseColor: COLOR_COPPER, rotX: 0.3, rotY: 0.4, rotSpeedX: 0.0025, rotSpeedY: 0.002 },
      // 8: Ice facet (mid-lower)
      { xPct: 0.66, yPct: 0.70, radius: 16, baseColor: COLOR_ICE_BLUE, rotX: 0.4, rotY: 0.1, rotSpeedX: 0.0022, rotSpeedY: 0.002 },
      // 9: Bronze facet (far-right)
      { xPct: 0.88, yPct: 0.70, radius: 16, baseColor: COLOR_COPPER, rotX: 0.2, rotY: 0.5, rotSpeedX: 0.0025, rotSpeedY: 0.002 },
      // 10: ⭐ NEW: Bottom-left connected geometric sphere
      { xPct: 0.12, yPct: 0.78, radius: 25, baseColor: COLOR_COPPER, rotX: 0.4, rotY: 0.3, rotSpeedX: 0.0022, rotSpeedY: 0.002, hasShadow: true },
    ];

    const nodes: ConstellationNode[] = spheres.map((sp, idx) => ({
      xPct: sp.xPct,
      yPct: sp.yPct,
      type: "sphere" as const,
      sphereIdx: idx,
    }));

    const extraNodes: ConstellationNode[] = [
      { xPct: 0.28, yPct: 0.25, type: "dot", size: 5.5 },  // 11
      { xPct: 0.35, yPct: 0.30, type: "dot", size: 4.5 },  // 12
      { xPct: 0.24, yPct: 0.78, type: "dot", size: 5.0 },  // 13 (bridges bottom-left to center)
      { xPct: 0.37, yPct: 0.75, type: "dot", size: 4.5 },  // 14
      { xPct: 0.43, yPct: 0.74, type: "dot", size: 5.5 },  // 15
      { xPct: 0.58, yPct: 0.41, type: "dot", size: 4.5 },  // 16
      { xPct: 0.63, yPct: 0.37, type: "dot", size: 4.5 },  // 17
      { xPct: 0.70, yPct: 0.79, type: "dot", size: 6.5 },  // 18
      { xPct: 0.84, yPct: 0.16, type: "amber-facet", size: 7.5 }, // 19
      { xPct: 0.87, yPct: 0.45, type: "dot", size: 4.5 },  // 20
      { xPct: 0.93, yPct: 0.86, type: "amber-facet", size: 7.5 }, // 21
    ];
    nodes.push(...extraNodes);

    // Network connection links
    const links: [number, number][] = [
      [4, 0], [4, 7], [7, 0], [0, 5], [0, 11],
      [5, 11], [5, 12], [11, 12],
      // ⭐ Connections linking the bottom-left sphere (#10)
      [7, 10],   // From mid-left sphere down to bottom-left sphere
      [10, 13],  // From bottom-left sphere to intermediate pearl node
      [13, 14],  // Continuing to center-bottom constellation
      [14, 15], [12, 16], [16, 3], [6, 17], [6, 1], [17, 1],
      [16, 6], [3, 8], [8, 18], [18, 2], [3, 2],
      [1, 2], [1, 19], [19, 20], [20, 2], [2, 9],
      [9, 21], [18, 21],
    ];

    const LIGHT: [number, number, number] = [-0.48, -0.68, 0.55];
    const lightLen = Math.hypot(...LIGHT);
    const L: [number, number, number] = [LIGHT[0] / lightLen, LIGHT[1] / lightLen, LIGHT[2] / lightLen];

    let time = 0;

    const render = () => {
      time += 0.0035;
      const w = window.innerWidth;
      const h = window.innerHeight;

      ctx.clearRect(0, 0, w, h);
      const isDark = document.documentElement.classList.contains("dark");

      // 1. Static Screen-Anchored Sinuous Wave Strata
      activeWaves.forEach((wave) => {
        ctx.beginPath();
        ctx.moveTo(-60, h + 150);

        const steps = 36;
        for (let i = 0; i <= steps; i++) {
          const sx = -60 + (w + 120) * (i / steps);
          const primaryWave =
            Math.sin(time * (wave.speed || 0.35) + sx * wave.frequency + (wave.phase || 0)) *
            wave.amplitude;
          const harmonicWave = wave.secondaryAmp
            ? Math.cos(time * ((wave.speed || 0.35) * 1.5) + sx * (wave.secondaryFreq || wave.frequency * 2)) *
              wave.secondaryAmp
            : 0;

          const sy = h * (wave.baseY || 0.5) + primaryWave + harmonicWave;

          if (i === 0) ctx.lineTo(sx, sy);
          else ctx.lineTo(sx, sy);
        }

        ctx.lineTo(w + 60, h + 150);
        ctx.closePath();

        ctx.fillStyle = (isDark ? wave.fillDark : wave.fillLight) || "transparent";
        ctx.fill();

        const stroke = isDark ? wave.strokeDark : wave.strokeLight;
        if (stroke) {
          ctx.strokeStyle = stroke;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      });

      // 2. Resolve Screen Coordinates
      const nodeScreenCoords = nodes.map((node) => ({
        x: node.xPct * w,
        y: node.yPct * h,
        type: node.type,
        size: node.size,
      }));

      // 3. Constellation Connections (BEHIND SHAPES)
      links.forEach(([from, to]) => {
        const nA = nodeScreenCoords[from];
        const nB = nodeScreenCoords[to];
        if (!nA || !nB) return;

        ctx.beginPath();
        ctx.moveTo(nA.x, nA.y);
        ctx.lineTo(nB.x, nB.y);

        ctx.strokeStyle = isDark
          ? "rgba(255, 255, 255, 0.38)"
          : "rgba(255, 255, 255, 0.95)";
        ctx.lineWidth = 1.25;
        ctx.stroke();
      });

      // 4. Pearl Nodes & Amber Beads (Behind spheres)
      nodeScreenCoords.forEach((node) => {
        if (node.type === "dot") {
          const rad = node.size || 5;
          ctx.beginPath();
          ctx.arc(node.x, node.y, rad, 0, Math.PI * 2);
          ctx.fillStyle = isDark ? "rgba(240, 245, 255, 0.85)" : "rgba(255, 255, 255, 0.95)";
          ctx.fill();
          ctx.strokeStyle = isDark ? "rgba(255, 255, 255, 0.25)" : "rgba(180, 195, 215, 0.7)";
          ctx.lineWidth = 0.8;
          ctx.stroke();
        } else if (node.type === "amber-facet") {
          const sz = node.size || 6;
          ctx.beginPath();
          ctx.moveTo(node.x, node.y - sz);
          ctx.lineTo(node.x + sz, node.y);
          ctx.lineTo(node.x, node.y + sz);
          ctx.lineTo(node.x - sz, node.y);
          ctx.closePath();
          ctx.fillStyle = isDark ? "rgba(225, 150, 105, 0.85)" : "rgba(220, 145, 105, 0.92)";
          ctx.fill();
          ctx.strokeStyle = "rgba(255, 255, 255, 0.6)";
          ctx.lineWidth = 0.7;
          ctx.stroke();
        }
      });

      // 5. Projected 3D Faceted Spheres (ON TOP OF WIRES)
      spheres.forEach((sp) => {
        const sx = sp.xPct * w;
        const sy = sp.yPct * h;

        if (sp.hasShadow) {
          ctx.save();
          ctx.beginPath();
          ctx.ellipse(sx + 14, sy + 30, sp.radius * 0.90, sp.radius * 0.32, 0.12, 0, Math.PI * 2);
          const shadowGrad = ctx.createRadialGradient(
            sx + 14,
            sy + 30,
            0,
            sx + 14,
            sy + 30,
            sp.radius * 0.90
          );
          shadowGrad.addColorStop(0, isDark ? "rgba(0, 0, 0, 0.28)" : "rgba(45, 35, 30, 0.16)");
          shadowGrad.addColorStop(1, "transparent");
          ctx.fillStyle = shadowGrad;
          ctx.fill();
          ctx.restore();
        }

        sp.rotX += sp.rotSpeedX;
        sp.rotY += sp.rotSpeedY;

        const cosX = Math.cos(sp.rotX);
        const sinX = Math.sin(sp.rotX);
        const cosY = Math.cos(sp.rotY);
        const sinY = Math.sin(sp.rotY);

        const transformedVerts = ICOSA_VERTS.map(([vx, vy, vz]) => {
          const x1 = vx * cosY + vz * sinY;
          const y1 = vy;
          const z1 = -vx * sinY + vz * cosY;
          const x2 = x1;
          const y2 = y1 * cosX - z1 * sinX;
          const z2 = y1 * sinX + z1 * cosX;
          return [x2 * sp.radius + sx, y2 * sp.radius + sy, z2];
        });

        ICOSA_FACES.forEach(([iA, iB, iC]) => {
          const pA = transformedVerts[iA];
          const pB = transformedVerts[iB];
          const pC = transformedVerts[iC];

          const vABx = pB[0] - pA[0];
          const vABy = pB[1] - pA[1];
          const vACx = pC[0] - pA[0];
          const vACy = pC[1] - pA[1];
          const crossZ = vABx * vACy - vABy * vACx;
          if (crossZ < 0) return;

          const rawNx = (ICOSA_VERTS[iA][0] + ICOSA_VERTS[iB][0] + ICOSA_VERTS[iC][0]) / 3;
          const rawNy = (ICOSA_VERTS[iA][1] + ICOSA_VERTS[iB][1] + ICOSA_VERTS[iC][1]) / 3;
          const rawNz = (ICOSA_VERTS[iA][2] + ICOSA_VERTS[iB][2] + ICOSA_VERTS[iC][2]) / 3;

          const nx1 = rawNx * cosY + rawNz * sinY;
          const ny1 = rawNy;
          const nz1 = -rawNx * sinY + rawNz * cosY;
          const nx2 = nx1;
          const ny2 = ny1 * cosX - nz1 * sinX;
          const nz2 = ny1 * sinX + nz1 * cosX;

          const dot = Math.max(0, nx2 * L[0] + ny2 * L[1] + nz2 * L[2]);
          const rim = Math.pow(1 - Math.max(0, nz2), 2) * 0.25;
          const ambient = isDark ? 0.35 : 0.52;
          const intensity = Math.min(1.0, ambient + dot * 0.60 + rim);

          const [cr, cg, cb] = sp.baseColor;
          const r = Math.min(255, Math.floor(cr * intensity));
          const g = Math.min(255, Math.floor(cg * intensity));
          const b = Math.min(255, Math.floor(cb * intensity));
          const alpha = isDark ? 0.85 : 0.92;

          ctx.beginPath();
          ctx.moveTo(pA[0], pA[1]);
          ctx.lineTo(pB[0], pB[1]);
          ctx.lineTo(pC[0], pC[1]);
          ctx.closePath();

          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
          ctx.fill();

          ctx.strokeStyle = isDark
            ? "rgba(255, 255, 255, 0.10)"
            : "rgba(255, 255, 255, 0.45)";
          ctx.lineWidth = 0.65;
          ctx.stroke();
        });
      });

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, [activeWaves]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-45 dark:opacity-30 transition-opacity duration-700"
    />
  );
}