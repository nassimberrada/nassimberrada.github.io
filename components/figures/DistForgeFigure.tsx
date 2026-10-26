"use client";

import React from "react";
import { DistForge3DVisual } from "./DistForge3DVisual";

export function DistForgeFigure() {
  return (
    <div className="w-full my-6 rounded-[14px] border border-[var(--border)] bg-[var(--card)] p-4 sm:p-6 shadow-sm overflow-hidden select-none font-sans">
      {/* Figure Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-5 border-b border-[var(--border)]">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--foreground)]">
            Procedural 3D Signed Distance Field (SDF) Visualizer &amp; Raymarching Engine
          </span>
        </div>

        <div className="flex items-center gap-2 text-[11px] font-mono text-[var(--muted)]">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Interactive 3D Orbit &amp; Raymarch Active</span>
        </div>
      </div>

      {/* Main 3D Interactive Canvas */}
      <DistForge3DVisual />

      {/* Caption */}
      <p className="mt-4 text-xs text-[var(--muted)] leading-relaxed font-mono">
        <strong className="text-[var(--foreground)]">Interactive 3D Procedural Viewport:</strong> Real-time rendering of Signed Distance Function (SDF) geometry authored via the <code className="text-[var(--foreground)] font-bold">distforge</code> Python library. Click and drag in 3D to orbit the camera. Switch between Phong-shaded solid surfaces, Dual Contouring polygonal wireframe meshes, step-by-step sphere tracing raymarch rays, and interior distance field slice planes.
      </p>
    </div>
  );
}
