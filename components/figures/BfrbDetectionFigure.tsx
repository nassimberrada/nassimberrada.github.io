"use client";

import React from "react";
import { BfrbDetectionVisual } from "./BfrbDetectionVisual";

export function BfrbDetectionFigure() {
  return (
    <div className="w-full my-6 rounded-[14px] border border-[var(--border)] bg-[var(--card)] p-4 sm:p-6 shadow-sm overflow-hidden select-none font-sans">
      {/* Figure Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-5 border-b border-[var(--border)]">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--foreground)]">
            Designed Multimodal Solution: Dual-Tower SE-CNN Architecture &amp; Kinematic Processing
          </span>
        </div>

        <div className="flex items-center gap-2 text-[11px] font-mono text-[var(--muted)]">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Real-Time Sensor Deconvolution Active</span>
        </div>
      </div>

      {/* Main Interactive Visual */}
      <BfrbDetectionVisual />

      {/* Caption */}
      <p className="mt-4 text-xs text-[var(--muted)] leading-relaxed font-mono">
        <strong className="text-[var(--foreground)]">Coded Solution Walkthrough:</strong> Real-time visualization of the dual-tower model from <code className="text-[var(--foreground)] font-bold">cmi-behavior-detection.ipynb</code>. Raw accelerometer and quaternion streams undergo gravity deconvolution and angular velocity derivation in Tower 1, while Tower 2 processes 64-zone ToF distance grids and 5-channel thermopiles with Squeeze-and-Excitation channel gating.
      </p>
    </div>
  );
}
