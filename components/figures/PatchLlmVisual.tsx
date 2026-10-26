"use client";

import React, { useState } from "react";
import { Terminal, Check, RotateCcw, Play, FileCode, GitBranch, ArrowRight, ShieldCheck, Undo2 } from "lucide-react";

interface StepState {
  id: string;
  command: string;
  output: string[];
  diff?: {
    file: string;
    lines: { type: "add" | "del" | "ctx"; text: string }[];
  };
  statusBadge: string;
}

const DEMO_STEPS: StepState[] = [
  {
    id: "task",
    command: "/task Add token-bucket rate limiting to public auth endpoints",
    output: [
      "[PatchLLM Agent Session #492]",
      "Target Goal: Add token-bucket rate limiting to public auth endpoints",
      "Model: gemini/gemini-1.5-flash via LiteLLM router (latency: ~240ms)",
      "Ready. Use /context or /plan to formulate execution steps.",
    ],
    statusBadge: "Goal Initialized",
  },
  {
    id: "context",
    command: "/context @dir:src/api/auth @file:src/middleware/rate_limit.py",
    output: [
      "Resolving dynamic scopes...",
      "  ✔ @dir:src/api/auth -> 3 files parsed (214 lines)",
      "  ✔ @file:src/middleware/rate_limit.py -> 1 file parsed (68 lines)",
      "Active Context Budget: 4 files | 1,420 tokens | AST boundaries indexed.",
    ],
    statusBadge: "Context Ingested",
  },
  {
    id: "plan",
    command: "/plan",
    output: [
      "Generated 2-step execution plan:",
      "  1. Define TokenBucketLimiter class with sliding redis window in rate_limit.py",
      "  2. Attach @rate_limit(max_requests=60, window_secs=60) decorator to routes.py",
      "Session checkpoint saved to .patchllm/sessions/sess_492.json",
    ],
    statusBadge: "Plan Formulated",
  },
  {
    id: "run",
    command: "/run",
    output: [
      "Executing Step 1/2: src/middleware/rate_limit.py",
      "Invoked LLM via LiteLLM. Synthesizing unified patch diff...",
      "Proposed patch generated. Inspect diff below before approving.",
    ],
    diff: {
      file: "src/middleware/rate_limit.py",
      lines: [
        { type: "ctx", text: " import time" },
        { type: "ctx", text: " from typing import Optional, Dict" },
        { type: "add", text: "+class TokenBucketLimiter:" },
        { type: "add", text: "+    def __init__(self, capacity: int = 60, refill_rate: float = 1.0):" },
        { type: "add", text: "+        self.capacity = capacity" },
        { type: "add", text: "+        self.tokens = capacity" },
        { type: "add", text: "+        self.refill_rate = refill_rate" },
        { type: "add", text: "+        self.last_refill = time.monotonic()" },
        { type: "add", text: "+" },
        { type: "add", text: "+    def consume(self, cost: int = 1) -> bool:" },
        { type: "add", text: "+        now = time.monotonic()" },
        { type: "add", text: "+        self.tokens = min(self.capacity, self.tokens + (now - self.last_refill) * self.refill_rate)" },
        { type: "add", text: "+        self.last_refill = now" },
        { type: "add", text: "+        if self.tokens >= cost:" },
        { type: "add", text: "+            self.tokens -= cost" },
        { type: "add", text: "+            return True" },
        { type: "add", text: "+        return False" },
        { type: "del", text: "-# TODO: Implement rate limiting middleware here" },
      ],
    },
    statusBadge: "Diff Ready for Review",
  },
  {
    id: "approve",
    command: "/approve",
    output: [
      "✔ Patch applied successfully to: src/middleware/rate_limit.py",
      "✔ Git stage updated (+17 lines, -1 line)",
      "✔ Rollback snapshot indexed: .patchllm/snapshots/snap_492_1.patch",
      "Step 1 complete. Proceed to Step 2 with /run, or /revert to undo.",
    ],
    statusBadge: "Changes Applied",
  },
];

export function PatchLlmVisual() {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(3); // Default to diff review

  const currentStep = DEMO_STEPS[activeStepIndex];

  return (
    <div className="w-full space-y-4 font-mono select-none">
      {/* Interactive Command Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 rounded-xl border border-[var(--border)] bg-[var(--card)] shadow-xs">
        <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
          {DEMO_STEPS.map((s, idx) => {
            const isCurrent = idx === activeStepIndex;
            const isPast = idx < activeStepIndex;
            return (
              <button
                key={s.id}
                onClick={() => setActiveStepIndex(idx)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all shrink-0 flex items-center gap-1.5 ${
                  isCurrent
                    ? "bg-emerald-500 text-white font-bold shadow-xs"
                    : isPast
                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
                    : "bg-[var(--surface)] text-[var(--muted)] hover:text-[var(--foreground)] border border-[var(--border)]"
                }`}
              >
                <span>{s.command.split(" ")[0]}</span>
                {isPast && <Check className="w-3 h-3 text-emerald-500" />}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2 text-xs ml-auto">
          <button
            onClick={() => setActiveStepIndex((prev) => (prev >= DEMO_STEPS.length - 1 ? 0 : prev + 1))}
            className="px-2.5 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--surface-muted)] text-[var(--foreground)] transition-colors flex items-center gap-1 text-[11px]"
          >
            <span>Next Step</span>
            <ArrowRight className="w-3 h-3" />
          </button>
          <button
            onClick={() => setActiveStepIndex(0)}
            className="p-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--surface-muted)] text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
            title="Reset to /task"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Terminal Viewport */}
      <div className="rounded-[14px] border border-[var(--border)] bg-[#0d1117] text-slate-200 overflow-hidden shadow-xl">
        {/* Terminal Window Header Bar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-[#161b22] border-b border-slate-800 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
            <span className="ml-2 text-slate-400 font-mono text-[11px] flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              patchllm — session #492 (main)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              {currentStep.statusBadge}
            </span>
          </div>
        </div>

        {/* Terminal Body */}
        <div className="p-4 sm:p-5 space-y-4 text-xs font-mono leading-relaxed overflow-x-auto">
          {/* Active Command Prompt */}
          <div className="flex items-center gap-2 text-emerald-400 font-bold">
            <span className="text-slate-500">&gt;&gt;&gt;</span>
            <span className="text-white">{currentStep.command}</span>
          </div>

          {/* Command Output Log */}
          <div className="space-y-1 text-slate-300 pl-4 border-l-2 border-slate-700">
            {currentStep.output.map((line, i) => (
              <div key={i} className="text-[11px] sm:text-xs">
                {line.startsWith("✔") ? (
                  <span className="text-emerald-400 font-semibold">{line}</span>
                ) : line.includes("1.") || line.includes("2.") ? (
                  <span className="text-amber-300">{line}</span>
                ) : (
                  line
                )}
              </div>
            ))}
          </div>

          {/* Interactive Unified Diff Inspector */}
          {currentStep.diff && (
            <div className="mt-3 rounded-xl border border-slate-800 bg-[#0a0d12] overflow-hidden">
              <div className="flex items-center justify-between px-3 py-1.5 bg-[#161b22] border-b border-slate-800 text-[11px]">
                <div className="flex items-center gap-1.5 text-slate-300">
                  <FileCode className="w-3.5 h-3.5 text-blue-400" />
                  <span className="font-bold">{currentStep.diff.file}</span>
                </div>
                <span className="text-slate-400 text-[10px]">Unified Diff (18 lines)</span>
              </div>

              <div className="p-2 space-y-0.5 font-mono text-[11px] leading-tight overflow-x-auto">
                {currentStep.diff.lines.map((l, i) => (
                  <div
                    key={i}
                    className={`px-2 py-0.5 rounded-xs whitespace-pre ${
                      l.type === "add"
                        ? "bg-emerald-950/60 text-emerald-300 border-l-2 border-emerald-500"
                        : l.type === "del"
                        ? "bg-rose-950/60 text-rose-300 border-l-2 border-rose-500"
                        : "text-slate-400"
                    }`}
                  >
                    {l.text}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Human-in-the-Loop Action Ribbon */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-slate-800 text-[11px] text-slate-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Human-in-the-Loop: Review all edits before applying</span>
            </div>
            <div className="flex items-center gap-3 text-[10px]">
              <span className="text-emerald-400">/approve (Apply)</span>
              <span className="text-amber-400">/retry (Feedback)</span>
              <span className="text-rose-400">/revert (Undo)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Clean SVG export for InfiniteGridHero project cards
 */
export function getPatchLlmCardSvg(): string {
  return `
    <svg viewBox="0 0 320 200" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="patch-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#10b981" stop-opacity="0.25" />
          <stop offset="100%" stop-color="#0d1117" stop-opacity="0.1" />
        </linearGradient>
      </defs>
      <!-- Terminal Frame Window -->
      <rect x="25" y="25" width="270" height="150" rx="8" fill="#0d1117" stroke="#10b981" stroke-width="1.2" stroke-opacity="0.5" />
      <rect x="25" y="25" width="270" height="24" rx="8" fill="#161b22" />
      <circle cx="40" cy="37" r="3.5" fill="#ff5f56" />
      <circle cx="52" cy="37" r="3.5" fill="#ffbd2e" />
      <circle cx="64" cy="37" r="3.5" fill="#27c93f" />

      <!-- Command Line -->
      <text x="80" y="41" fill="#94a3b8" font-size="9" font-family="monospace">patchllm --cli</text>
      <text x="40" y="70" fill="#34d399" font-size="10" font-family="monospace" font-weight="bold">&gt;&gt;&gt; /task refactor auth</text>

      <!-- Diff lines -->
      <rect class="patch-diff-addition" x="38" y="85" width="244" height="14" rx="2" fill="#064e3b" fill-opacity="0.4" />
      <text x="44" y="96" fill="#34d399" font-size="8.5" font-family="monospace">+ def rate_limit(tokens=60):</text>

      <rect class="patch-diff-addition" x="38" y="103" width="244" height="14" rx="2" fill="#064e3b" fill-opacity="0.4" />
      <text x="44" y="114" fill="#34d399" font-size="8.5" font-family="monospace">+     bucket.consume()</text>

      <rect class="patch-diff-removal" x="38" y="121" width="244" height="14" rx="2" fill="#881337" fill-opacity="0.4" />
      <text x="44" y="132" fill="#f43f5e" font-size="8.5" font-family="monospace">- # unthrottled endpoint</text>

      <!-- Approval Badge -->
      <rect class="patch-approval-badge" x="180" y="145" width="102" height="18" rx="4" fill="#10b981" fill-opacity="0.15" stroke="#10b981" stroke-width="0.8" />
      <text x="231" y="157" fill="#10b981" font-size="8.5" font-family="monospace" font-weight="bold" text-anchor="middle">✔ /approve applied</text>
    </svg>
  `;
}
