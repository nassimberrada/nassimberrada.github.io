"use client";

import React from "react";
import { PatchLlmVisual } from "./PatchLlmVisual";

export function PatchLlmFigure() {
  return (
    <div className="w-full my-6 rounded-[14px] border border-[var(--border)] bg-[var(--card)] p-4 sm:p-6 shadow-sm overflow-hidden select-none font-sans">
      {/* Figure Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-5 border-b border-[var(--border)]">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--foreground)]">
            PatchLLM Interactive Terminal TUI &amp; Human-in-the-Loop Refactoring Lifecycle
          </span>
        </div>

        <div className="flex items-center gap-2 text-[11px] font-mono text-[var(--muted)]">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Interactive TUI Ready</span>
        </div>
      </div>

      {/* Main Terminal Visual */}
      <PatchLlmVisual />

      {/* Caption */}
      <p className="mt-4 text-xs text-[var(--muted)] leading-relaxed font-mono">
        <strong className="text-[var(--foreground)]">Terminal Agent Workflow:</strong> Step-by-step walkthrough of the <code className="text-[var(--foreground)] font-bold">patchllm</code> command-line agent. Demonstrates goal formulation (<code className="text-emerald-500">/task</code>), targeted context scoping via <code className="text-emerald-500">@dir</code> and <code className="text-emerald-500">@file</code> definitions, step-by-step planning (<code className="text-emerald-500">/plan</code>), syntax-highlighted unified diff inspection (<code className="text-emerald-500">/diff</code>), and atomic file application with instant rollback snapshots (<code className="text-emerald-500">/approve</code>, <code className="text-emerald-500">/revert</code>).
      </p>
    </div>
  );
}
