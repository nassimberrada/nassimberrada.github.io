"use client";

import React from "react";
import { AutonomousCodeGenVisual } from "./AutonomousCodeGenVisual";

export function AutonomousCodeGenFigure() {
  return (
    <div className="w-full my-6 rounded-[14px] border border-[var(--border)] bg-[var(--card)] p-4 sm:p-6 shadow-sm overflow-hidden select-none font-sans">
      {/* Figure Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-5 border-b border-[var(--border)]">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--foreground)]">
            Autonomous Code-Gen Agent: Implementation Synthesis &amp; Property Verification
          </span>
        </div>

        <div className="flex items-center gap-2 text-[11px] font-mono text-[var(--muted)]">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>AST Parity Engine Active</span>
        </div>
      </div>

      {/* Main Interactive Visual */}
      <AutonomousCodeGenVisual />
    </div>
  );
}
