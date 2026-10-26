"use client";

import React from "react";

export function DistForgeArchitectureDiagram() {
  return (
    <div className="w-full my-6 rounded-[14px] border border-[var(--border)] bg-[var(--card)] p-4 sm:p-6 shadow-sm overflow-hidden select-none font-sans">
      {/* Diagram Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b border-[var(--border)]">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--foreground)]">
            DistForge System Architecture: AST-to-GLSL Compilation &amp; Dual Execution Engines
          </span>
        </div>
        <span className="text-[10px] font-mono text-[var(--muted)]">
          Decoupling Declarative 3D Modeling from GPU Raymarching &amp; Compute Meshing
        </span>
      </div>

      <div className="w-full overflow-x-auto">
        <svg
          viewBox="0 0 940 460"
          className="w-full min-w-[880px] h-auto"
          style={{ fontVariantNumeric: "tabular-nums" }}
        >
          <defs>
            {/* Arrows */}
            <marker
              id="df-arrow-emerald"
              viewBox="0 0 10 10"
              refX="6"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#10b981" />
            </marker>
            <marker
              id="df-arrow-blue"
              viewBox="0 0 10 10"
              refX="6"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#3b82f6" />
            </marker>
            <marker
              id="df-arrow-purple"
              viewBox="0 0 10 10"
              refX="6"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#8b5cf6" />
            </marker>

            {/* Stage Gradients */}
            <linearGradient id="df-stage1-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.02" />
            </linearGradient>
            <linearGradient id="df-stage2-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.02" />
            </linearGradient>
            <linearGradient id="df-stage3a-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.02" />
            </linearGradient>
            <linearGradient id="df-stage3b-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.02" />
            </linearGradient>
          </defs>

          {/* Background Canvas */}
          <rect width="940" height="460" fill="transparent" />

          {/* ================================================================= */}
          {/* STAGE 1: Declarative Python AST (SDFNode Graph) */}
          {/* ================================================================= */}
          <g transform="translate(20, 20)">
            <rect
              width="240"
              height="380"
              rx="12"
              fill="url(#df-stage1-grad)"
              stroke="#3b82f6"
              strokeWidth="1.2"
              strokeDasharray="4 2"
            />
            <rect x="0" y="0" width="240" height="28" rx="12" fill="#3b82f6" fillOpacity="0.12" />
            <text x="12" y="18" fill="#3b82f6" fontSize="10.5" fontWeight="bold" fontFamily="monospace">
              STAGE 1: PYTHON AST GRAPH
            </text>

            {/* Block 1: SDFNode Base & Primitives */}
            <g transform="translate(12, 38)">
              <rect width="216" height="88" rx="8" fill="var(--card)" stroke="var(--border)" strokeWidth="1" />
              <text x="10" y="16" fill="var(--foreground)" fontSize="9.5" fontWeight="bold" fontFamily="monospace">
                SDFNode Primitives
              </text>
              <text x="10" y="32" fill="var(--muted)" fontSize="8.5" fontFamily="sans-serif">
                • 3D Primitives: Box, Sphere, Cylinder, Torus
              </text>
              <text x="10" y="46" fill="var(--muted)" fontSize="8.5" fontFamily="sans-serif">
                • 2D Profiles: Rectangle, Circle, Sketch
              </text>
              <text x="10" y="60" fill="var(--muted)" fontSize="8.5" fontFamily="sans-serif">
                • Forge(glsl): Custom raw shader node
              </text>
              <text x="10" y="74" fill="#3b82f6" fontSize="8" fontFamily="monospace">
                No immediate spatial math evaluation
              </text>
            </g>

            {/* Block 2: Bitwise CSG Overloads */}
            <g transform="translate(12, 134)">
              <rect width="216" height="88" rx="8" fill="var(--card)" stroke="#3b82f6" strokeWidth="1" />
              <text x="10" y="16" fill="#3b82f6" fontSize="9.5" fontWeight="bold" fontFamily="monospace">
                CSG Boolean Operators
              </text>
              <text x="10" y="32" fill="var(--muted)" fontSize="8.5" fontFamily="monospace">
                • | : UnionNode (min(d1, d2))
              </text>
              <text x="10" y="46" fill="var(--muted)" fontSize="8.5" fontFamily="monospace">
                • - : DifferenceNode (max(d1, -d2))
              </text>
              <text x="10" y="60" fill="var(--muted)" fontSize="8.5" fontFamily="monospace">
                • &amp; : IntersectionNode (max(d1, d2))
              </text>
              <text x="10" y="74" fill="#10b981" fontSize="8" fontFamily="monospace">
                Smooth blending via smin(d1, d2, k)
              </text>
            </g>

            {/* Block 3: Dynamic Uniforms & Watchdog */}
            <g transform="translate(12, 230)">
              <rect width="216" height="80" rx="8" fill="var(--card)" stroke="var(--border)" strokeWidth="1" />
              <text x="10" y="16" fill="var(--foreground)" fontSize="9.5" fontWeight="bold" fontFamily="monospace">
                Param &amp; Hot-Reload Watcher
              </text>
              <text x="10" y="32" fill="var(--muted)" fontSize="8.5" fontFamily="sans-serif">
                • Param(name, default, min, max)
              </text>
              <text x="10" y="46" fill="var(--muted)" fontSize="8.5" fontFamily="sans-serif">
                • Binds to GLSL uniforms per frame
              </text>
              <text x="10" y="60" fill="var(--muted)" fontSize="8.5" fontFamily="sans-serif">
                • Watchdog monitors script file saves
              </text>
              <text x="10" y="72" fill="#f59e0b" fontSize="8" fontFamily="monospace">
                Sub-second hot reload cycle
              </text>
            </g>

            <rect x="12" y="322" width="216" height="46" rx="6" fill="#3b82f6" fillOpacity="0.1" stroke="#3b82f6" strokeWidth="0.8" />
            <text x="18" y="340" fill="#3b82f6" fontSize="8.5" fontWeight="bold" fontFamily="monospace">
              AST Output:
            </text>
            <text x="18" y="354" fill="var(--foreground)" fontSize="8" fontFamily="sans-serif">
              Declarative syntax tree with zero CPU bottlenecks
            </text>
          </g>

          {/* Connection Arrow 1 -> 2 */}
          <path
            d="M 260 210 L 294 210"
            fill="none"
            stroke="#3b82f6"
            strokeWidth="2"
            markerEnd="url(#df-arrow-blue)"
          />

          {/* ================================================================= */}
          {/* STAGE 2: Context-Aware GLSL Compiler & Domain Warping */}
          {/* ================================================================= */}
          <g transform="translate(300, 20)">
            <rect
              width="270"
              height="380"
              rx="12"
              fill="url(#df-stage2-grad)"
              stroke="#8b5cf6"
              strokeWidth="1.2"
              strokeDasharray="4 2"
            />
            <rect x="0" y="0" width="270" height="28" rx="12" fill="#8b5cf6" fillOpacity="0.12" />
            <text x="12" y="18" fill="#8b5cf6" fontSize="10.5" fontWeight="bold" fontFamily="monospace">
              STAGE 2: GLSL COMPILER &amp; DOMAIN WARPING
            </text>

            {/* Block 1: GLSLContext State Machine */}
            <g transform="translate(12, 38)">
              <rect width="246" height="92" rx="8" fill="var(--card)" stroke="var(--border)" strokeWidth="1" />
              <text x="10" y="16" fill="var(--foreground)" fontSize="9.5" fontWeight="bold" fontFamily="monospace">
                GLSLContext State Machine
              </text>
              <text x="10" y="32" fill="var(--muted)" fontSize="8.5" fontFamily="sans-serif">
                • Traverses AST via recursive to_glsl(ctx)
              </text>
              <text x="10" y="46" fill="var(--muted)" fontSize="8.5" fontFamily="sans-serif">
                • Dynamic Variable Indexing (var_0, var_1, ...)
              </text>
              <text x="10" y="60" fill="var(--muted)" fontSize="8.5" fontFamily="sans-serif">
                • Deduplicated header dependency injection
              </text>
              <text x="10" y="74" fill="#8b5cf6" fontSize="8" fontFamily="monospace">
                Packed vec4: (distance, mat_id, 0, 0)
              </text>
            </g>

            {/* Block 2: Domain Warping over Matrix Multiplication */}
            <g transform="translate(12, 138)">
              <rect width="246" height="106" rx="8" fill="var(--card)" stroke="#8b5cf6" strokeWidth="1" />
              <text x="10" y="16" fill="#8b5cf6" fontSize="9.5" fontWeight="bold" fontFamily="monospace">
                Domain Warping (No Matrix Mult)
              </text>
              <text x="10" y="32" fill="var(--muted)" fontSize="8.5" fontFamily="sans-serif">
                • Inverses coordinates before reaching child
              </text>
              <rect x="10" y="40" width="226" height="26" rx="4" fill="#8b5cf6" fillOpacity="0.1" />
              <text x="16" y="56" fill="#8b5cf6" fontSize="8" fontWeight="bold" fontFamily="monospace">
                warped_p = rotate(p - offset, -angle)
              </text>
              <text x="10" y="78" fill="var(--muted)" fontSize="8" fontFamily="sans-serif">
                • Child evaluates at origin (p = vec3(0))
              </text>
              <text x="10" y="92" fill="#10b981" fontSize="7.5" fontWeight="bold" fontFamily="monospace">
                Infinite chaining with zero matrix overhead
              </text>
            </g>

            {/* Block 3: Spatial Modifiers */}
            <g transform="translate(12, 252)">
              <rect width="246" height="66" rx="8" fill="var(--card)" stroke="var(--border)" strokeWidth="1" />
              <text x="10" y="16" fill="var(--foreground)" fontSize="9.5" fontWeight="bold" fontFamily="monospace">
                Non-Linear Deformations
              </text>
              <text x="10" y="32" fill="var(--muted)" fontSize="8" fontFamily="monospace">
                • twist(k): angle = p.y * k; rotZ(angle)
              </text>
              <text x="10" y="46" fill="var(--muted)" fontSize="8" fontFamily="monospace">
                • bend(k), repeat(c), elongate(h)
              </text>
              <text x="10" y="58" fill="#8b5cf6" fontSize="7.5" fontFamily="monospace">
                Conservative stepping (0.3x) prevents ray overshoot
              </text>
            </g>

            <rect x="12" y="328" width="246" height="40" rx="6" fill="#8b5cf6" fillOpacity="0.1" stroke="#8b5cf6" strokeWidth="0.8" />
            <text x="18" y="344" fill="#8b5cf6" fontSize="8.5" fontWeight="bold" fontFamily="monospace">
              Compiler Output:
            </text>
            <text x="18" y="358" fill="var(--foreground)" fontSize="8" fontFamily="sans-serif">
              Self-contained, highly optimized GLSL code string
            </text>
          </g>

          {/* Fork Arrows from Compiler to Both Pathways */}
          <path
            d="M 570 140 L 610 140 L 610 110 L 626 110"
            fill="none"
            stroke="#10b981"
            strokeWidth="2"
            markerEnd="url(#df-arrow-emerald)"
          />
          <path
            d="M 570 280 L 610 280 L 610 300 L 626 300"
            fill="none"
            stroke="#f59e0b"
            strokeWidth="2"
            markerEnd="url(#df-arrow-amber)"
          />

          {/* ================================================================= */}
          {/* STAGE 3A: Screen-Space Real-Time Raymarcher (Top Right) */}
          {/* ================================================================= */}
          <g transform="translate(630, 20)">
            <rect
              width="290"
              height="185"
              rx="12"
              fill="url(#df-stage3a-grad)"
              stroke="#10b981"
              strokeWidth="1.2"
            />
            <rect x="0" y="0" width="290" height="26" rx="12" fill="#10b981" fillOpacity="0.12" />
            <text x="12" y="17" fill="#10b981" fontSize="10" fontWeight="bold" fontFamily="monospace">
              PATHWAY A: REAL-TIME GPU RAYMARCHER
            </text>

            <g transform="translate(10, 34)">
              <rect width="270" height="74" rx="6" fill="var(--card)" stroke="var(--border)" strokeWidth="1" />
              <text x="8" y="14" fill="var(--foreground)" fontSize="9" fontWeight="bold" fontFamily="monospace">
                Screen-Space Quad Fragment Shader
              </text>
              <text x="8" y="28" fill="var(--muted)" fontSize="8" fontFamily="sans-serif">
                • Sphere tracing: p_{`k+1`} = p_k + SDF(p_k) · ray_dir
              </text>
              <text x="8" y="42" fill="var(--muted)" fontSize="8" fontFamily="sans-serif">
                • Conservative step safety factor: 0.3×
              </text>
              <text x="8" y="56" fill="var(--muted)" fontSize="8" fontFamily="sans-serif">
                • Soft shadow penumbra &amp; Ambient Occlusion
              </text>
              <text x="8" y="68" fill="#10b981" fontSize="7.5" fontWeight="bold" fontFamily="monospace">
                60+ FPS in native GLFW ModernGL desktop window
              </text>
            </g>

            <rect x="10" y="116" width="270" height="58" rx="6" fill="#10b981" fillOpacity="0.1" stroke="#10b981" strokeWidth="0.8" />
            <text x="16" y="132" fill="#10b981" fontSize="8" fontWeight="bold" fontFamily="monospace">
              Interactive Workflow:
            </text>
            <text x="16" y="146" fill="var(--foreground)" fontSize="8" fontFamily="sans-serif">
              Save Python file → Sub-second shader recompile → Instant 3D view
            </text>
            <text x="16" y="160" fill="var(--muted)" fontSize="7.5" fontFamily="monospace">
              UI Slider mutation → GLSL Uniform update (0 ms compile)
            </text>
          </g>

          {/* ================================================================= */}
          {/* STAGE 3B: Headless Compute Mesh Extraction (Bottom Right) */}
          {/* ================================================================= */}
          <g transform="translate(630, 215)">
            <rect
              width="290"
              height="185"
              rx="12"
              fill="url(#df-stage3b-grad)"
              stroke="#f59e0b"
              strokeWidth="1.2"
            />
            <rect x="0" y="0" width="290" height="26" rx="12" fill="#f59e0b" fillOpacity="0.12" />
            <text x="12" y="17" fill="#f59e0b" fontSize="10" fontWeight="bold" fontFamily="monospace">
              PATHWAY B: GPU COMPUTE MESH ENGINE
            </text>

            <g transform="translate(10, 34)">
              <rect width="270" height="74" rx="6" fill="var(--card)" stroke="var(--border)" strokeWidth="1" />
              <text x="8" y="14" fill="var(--foreground)" fontSize="9" fontWeight="bold" fontFamily="monospace">
                OpenGL 4.3 Compute Shader + SSBO
              </text>
              <text x="8" y="28" fill="var(--muted)" fontSize="8" fontFamily="sans-serif">
                • Massive parallel evaluation of 2^22 sample points
              </text>
              <text x="8" y="42" fill="var(--muted)" fontSize="8" fontFamily="sans-serif">
                • Adaptive Octree: Empty voxel pruning concentrates on boundary
              </text>
              <text x="8" y="56" fill="var(--muted)" fontSize="8" fontFamily="sans-serif">
                • Dual Contouring: Sharp edge preservation via Hermite data
              </text>
              <text x="8" y="68" fill="#f59e0b" fontSize="7.5" fontWeight="bold" fontFamily="monospace">
                QEF Solving: Moore-Penrose pseudo-inverse (pinv(A) @ b)
              </text>
            </g>

            <rect x="10" y="116" width="270" height="58" rx="6" fill="#f59e0b" fillOpacity="0.1" stroke="#f59e0b" strokeWidth="0.8" />
            <text x="16" y="132" fill="#f59e0b" fontSize="8" fontWeight="bold" fontFamily="monospace">
              B-Rep Polygon Export:
            </text>
            <text x="16" y="146" fill="var(--foreground)" fontSize="8" fontFamily="sans-serif">
              Watertight, non-manifold-free polygonal geometry
            </text>
            <text x="16" y="160" fill="var(--muted)" fontSize="7.5" fontFamily="monospace">
              Formats: STL (3D Printing), OBJ, GLB (Game Engines / Web)
            </text>
          </g>

          {/* ================================================================= */}
          {/* Bottom Telemetry Strip */}
          {/* ================================================================= */}
          <g transform="translate(20, 412)">
            <rect width="900" height="36" rx="8" fill="none" stroke="var(--border)" strokeWidth="1" />
            <text x="15" y="22" fill="var(--muted)" fontSize="8.5" fontFamily="monospace">
              <tspan fill="#3b82f6" fontWeight="bold">INPUT:</tspan> Python Procedural Code
            </text>
            <text x="250" y="22" fill="var(--muted)" fontSize="8.5" fontFamily="monospace">
              <tspan fill="#8b5cf6" fontWeight="bold">COMPILER:</tspan> AST → Context GLSL + Warping
            </text>
            <text x="520" y="22" fill="var(--muted)" fontSize="8.5" fontFamily="monospace">
              <tspan fill="#10b981" fontWeight="bold">RENDERER:</tspan> 60 FPS Raymarcher
            </text>
            <text x="730" y="22" fill="var(--muted)" fontSize="8.5" fontFamily="monospace">
              <tspan fill="#f59e0b" fontWeight="bold">MESHING:</tspan> Dual Contouring (QEF pinv)
            </text>
          </g>
        </svg>
      </div>
    </div>
  );
}
