"use client";

import React from "react";

export function PatchLlmArchitectureDiagram() {
  return (
    <div className="w-full my-6 rounded-[14px] border border-[var(--border)] bg-[var(--card)] p-4 sm:p-6 shadow-sm overflow-hidden select-none font-sans">
      {/* Diagram Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b border-[var(--border)]">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--foreground)]">
            PatchLLM Architecture: Dynamic Scopes, Stateful Planning &amp; Atomic Patching
          </span>
        </div>
        <span className="text-[10px] font-mono text-[var(--muted)]">
          Human-in-the-Loop Terminal Agent Execution Loop
        </span>
      </div>

      <div className="w-full overflow-x-auto">
        <svg
          viewBox="0 0 940 460"
          className="w-full min-w-[880px] h-auto"
          style={{ fontVariantNumeric: "tabular-nums" }}
        >
          <defs>
            {/* Markers */}
            <marker
              id="patch-arrow-emerald"
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
              id="patch-arrow-blue"
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
              id="patch-arrow-purple"
              viewBox="0 0 10 10"
              refX="6"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#8b5cf6" />
            </marker>

            {/* Gradients */}
            <linearGradient id="patch-tier1-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.02" />
            </linearGradient>
            <linearGradient id="patch-tier2-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.02" />
            </linearGradient>
            <linearGradient id="patch-tier3-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.02" />
            </linearGradient>
            <linearGradient id="patch-tier4-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.02" />
            </linearGradient>
          </defs>

          {/* Background Canvas */}
          <rect width="940" height="460" fill="transparent" />

          {/* ================================================================= */}
          {/* TIER 1: User Directives & Dynamic Scopes */}
          {/* ================================================================= */}
          <g transform="translate(20, 20)">
            <rect
              width="210"
              height="380"
              rx="12"
              fill="url(#patch-tier1-grad)"
              stroke="#3b82f6"
              strokeWidth="1.2"
              strokeDasharray="4 2"
            />
            <rect x="0" y="0" width="210" height="28" rx="12" fill="#3b82f6" fillOpacity="0.12" />
            <text x="12" y="18" fill="#3b82f6" fontSize="10.5" fontWeight="bold" fontFamily="monospace">
              TIER 1: DIRECTIVES &amp; SCOPES
            </text>

            {/* Block 1: Terminal TUI Interface */}
            <g transform="translate(12, 38)">
              <rect width="186" height="88" rx="8" fill="var(--card)" stroke="var(--border)" strokeWidth="1" />
              <text x="10" y="16" fill="var(--foreground)" fontSize="9.5" fontWeight="bold" fontFamily="monospace">
                Terminal TUI Session
              </text>
              <text x="10" y="32" fill="var(--muted)" fontSize="8.5" fontFamily="sans-serif">
                • Built on prompt_toolkit + InquirerPy
              </text>
              <text x="10" y="46" fill="var(--muted)" fontSize="8.5" fontFamily="sans-serif">
                • Slash commands (/task, /plan, /run)
              </text>
              <text x="10" y="60" fill="var(--muted)" fontSize="8.5" fontFamily="sans-serif">
                • Multi-platform (Desktop + Mobile SSH)
              </text>
              <text x="10" y="74" fill="#3b82f6" fontSize="8" fontFamily="monospace">
                Sub-45ms input responsiveness
              </text>
            </g>

            {/* Block 2: Dynamic Scope Grammar */}
            <g transform="translate(12, 134)">
              <rect width="186" height="96" rx="8" fill="var(--card)" stroke="#3b82f6" strokeWidth="1" />
              <text x="10" y="16" fill="#3b82f6" fontSize="9.5" fontWeight="bold" fontFamily="monospace">
                Dynamic Context Scopes
              </text>
              <text x="10" y="32" fill="var(--muted)" fontSize="8" fontFamily="monospace">
                • @git:staged, @git:modified
              </text>
              <text x="10" y="46" fill="var(--muted)" fontSize="8" fontFamily="monospace">
                • @dir:path/to/module
              </text>
              <text x="10" y="60" fill="var(--muted)" fontSize="8" fontFamily="monospace">
                • @file:src/routes.py
              </text>
              <text x="10" y="74" fill="var(--muted)" fontSize="8" fontFamily="monospace">
                • @url:https://docs...
              </text>
              <text x="10" y="86" fill="#10b981" fontSize="7.5" fontWeight="bold" fontFamily="monospace">
                Cuts context bloat by up to 85%
              </text>
            </g>

            {/* Block 3: Token Budgeting */}
            <g transform="translate(12, 238)">
              <rect width="186" height="74" rx="8" fill="var(--card)" stroke="var(--border)" strokeWidth="1" />
              <text x="10" y="16" fill="var(--foreground)" fontSize="9.5" fontWeight="bold" fontFamily="monospace">
                AST Token Budgeter
              </text>
              <text x="10" y="32" fill="var(--muted)" fontSize="8.5" fontFamily="sans-serif">
                • Sliding context window packing
              </text>
              <text x="10" y="46" fill="var(--muted)" fontSize="8.5" fontFamily="sans-serif">
                • Prunes test fixtures &amp; binaries
              </text>
              <text x="10" y="60" fill="#3b82f6" fontSize="8" fontFamily="monospace">
                Exact prompt boundary control
              </text>
            </g>

            <rect x="12" y="322" width="186" height="46" rx="6" fill="#3b82f6" fillOpacity="0.1" stroke="#3b82f6" strokeWidth="0.8" />
            <text x="18" y="340" fill="#3b82f6" fontSize="8.5" fontWeight="bold" fontFamily="monospace">
              Tier 1 Output:
            </text>
            <text x="18" y="354" fill="var(--foreground)" fontSize="8" fontFamily="sans-serif">
              Structured task &amp; targeted code context
            </text>
          </g>

          {/* Connection Arrow 1 -> 2 */}
          <path
            d="M 230 210 L 264 210"
            fill="none"
            stroke="#3b82f6"
            strokeWidth="2"
            markerEnd="url(#patch-arrow-blue)"
          />

          {/* ================================================================= */}
          {/* TIER 2: Stateful Session & Checkpoint Engine */}
          {/* ================================================================= */}
          <g transform="translate(270, 20)">
            <rect
              width="210"
              height="380"
              rx="12"
              fill="url(#patch-tier2-grad)"
              stroke="#8b5cf6"
              strokeWidth="1.2"
              strokeDasharray="4 2"
            />
            <rect x="0" y="0" width="210" height="28" rx="12" fill="#8b5cf6" fillOpacity="0.12" />
            <text x="12" y="18" fill="#8b5cf6" fontSize="10.5" fontWeight="bold" fontFamily="monospace">
              TIER 2: SESSION STATE MACHINE
            </text>

            {/* Block 1: Step Planner */}
            <g transform="translate(12, 38)">
              <rect width="186" height="88" rx="8" fill="var(--card)" stroke="var(--border)" strokeWidth="1" />
              <text x="10" y="16" fill="var(--foreground)" fontSize="9.5" fontWeight="bold" fontFamily="monospace">
                Step-by-Step Planner
              </text>
              <text x="10" y="32" fill="var(--muted)" fontSize="8.5" fontFamily="sans-serif">
                • Decomposes goal into atomic steps
              </text>
              <text x="10" y="46" fill="var(--muted)" fontSize="8.5" fontFamily="sans-serif">
                • Interactive step reordering (/plan)
              </text>
              <text x="10" y="60" fill="var(--muted)" fontSize="8.5" fontFamily="sans-serif">
                • Target file anchoring per step
              </text>
              <text x="10" y="74" fill="#8b5cf6" fontSize="8" fontFamily="monospace">
                Prevents monolithic runaway edits
              </text>
            </g>

            {/* Block 2: Resilient Session Checkpoints */}
            <g transform="translate(12, 134)">
              <rect width="186" height="96" rx="8" fill="var(--card)" stroke="#8b5cf6" strokeWidth="1" />
              <text x="10" y="16" fill="#8b5cf6" fontSize="9.5" fontWeight="bold" fontFamily="monospace">
                Session Checkpointer
              </text>
              <text x="10" y="32" fill="var(--muted)" fontSize="8.5" fontFamily="sans-serif">
                • Serializes task, scopes, history
              </text>
              <rect x="10" y="40" width="166" height="24" rx="4" fill="#8b5cf6" fillOpacity="0.1" />
              <text x="14" y="55" fill="#8b5cf6" fontSize="7.5" fontWeight="bold" fontFamily="monospace">
                .patchllm/sessions/*.json
              </text>
              <text x="10" y="76" fill="var(--muted)" fontSize="8.5" fontFamily="sans-serif">
                • Instant crash/disconnect resume
              </text>
              <text x="10" y="88" fill="#10b981" fontSize="7.5" fontFamily="monospace">
                Zero loss on network dropouts
              </text>
            </g>

            {/* Block 3: Feedback Loop */}
            <g transform="translate(12, 238)">
              <rect width="186" height="74" rx="8" fill="var(--card)" stroke="var(--border)" strokeWidth="1" />
              <text x="10" y="16" fill="var(--foreground)" fontSize="9.5" fontWeight="bold" fontFamily="monospace">
                Adaptive Feedback Loops
              </text>
              <text x="10" y="32" fill="var(--muted)" fontSize="8.5" fontFamily="sans-serif">
                • /retry &lt;feedback&gt; step steering
              </text>
              <text x="10" y="46" fill="var(--muted)" fontSize="8.5" fontFamily="sans-serif">
                • /skip &amp; /refine plan mutation
              </text>
              <text x="10" y="60" fill="#8b5cf6" fontSize="8" fontFamily="monospace">
                Dynamic human alignment
              </text>
            </g>

            <rect x="12" y="322" width="186" height="46" rx="6" fill="#8b5cf6" fillOpacity="0.1" stroke="#8b5cf6" strokeWidth="0.8" />
            <text x="18" y="340" fill="#8b5cf6" fontSize="8.5" fontWeight="bold" fontFamily="monospace">
              Tier 2 Output:
            </text>
            <text x="18" y="354" fill="var(--foreground)" fontSize="8" fontFamily="sans-serif">
              Stateful session graph with checkpoint locks
            </text>
          </g>

          {/* Connection Arrow 2 -> 3 */}
          <path
            d="M 480 210 L 514 210"
            fill="none"
            stroke="#8b5cf6"
            strokeWidth="2"
            markerEnd="url(#patch-arrow-purple)"
          />

          {/* ================================================================= */}
          {/* TIER 3: Multi-Provider LLM & Diff Synthesis */}
          {/* ================================================================= */}
          <g transform="translate(520, 20)">
            <rect
              width="210"
              height="380"
              rx="12"
              fill="url(#patch-tier3-grad)"
              stroke="#f59e0b"
              strokeWidth="1.2"
              strokeDasharray="4 2"
            />
            <rect x="0" y="0" width="210" height="28" rx="12" fill="#f59e0b" fillOpacity="0.12" />
            <text x="12" y="18" fill="#f59e0b" fontSize="10.5" fontWeight="bold" fontFamily="monospace">
              TIER 3: DIFF SYNTHESIS
            </text>

            {/* Block 1: LiteLLM Router */}
            <g transform="translate(12, 38)">
              <rect width="186" height="92" rx="8" fill="var(--card)" stroke="var(--border)" strokeWidth="1" />
              <text x="10" y="16" fill="var(--foreground)" fontSize="9.5" fontWeight="bold" fontFamily="monospace">
                LiteLLM Universal Client
              </text>
              <text x="10" y="32" fill="var(--muted)" fontSize="8.5" fontFamily="sans-serif">
                • OpenAI, Gemini, Claude, Ollama
              </text>
              <text x="10" y="46" fill="var(--muted)" fontSize="8.5" fontFamily="sans-serif">
                • Unified schema &amp; error retries
              </text>
              <text x="10" y="60" fill="var(--muted)" fontSize="8.5" fontFamily="sans-serif">
                • Default: gemini/gemini-1.5-flash
              </text>
              <text x="10" y="74" fill="#f59e0b" fontSize="8" fontFamily="monospace">
                Fast 200-400ms token streaming
              </text>
            </g>

            {/* Block 2: Unified Diff Parser */}
            <g transform="translate(12, 138)">
              <rect width="186" height="96" rx="8" fill="var(--card)" stroke="#f59e0b" strokeWidth="1" />
              <text x="10" y="16" fill="#f59e0b" fontSize="9.5" fontWeight="bold" fontFamily="monospace">
                Unified Diff Parser
              </text>
              <text x="10" y="32" fill="var(--muted)" fontSize="8.5" fontFamily="sans-serif">
                • Extracts git-standard hunks (@@)
              </text>
              <text x="10" y="46" fill="var(--muted)" fontSize="8.5" fontFamily="sans-serif">
                • Tolerant whitespace matching
              </text>
              <text x="10" y="60" fill="var(--muted)" fontSize="8.5" fontFamily="sans-serif">
                • Multi-file hunk separation
              </text>
              <text x="10" y="74" fill="#10b981" fontSize="7.5" fontWeight="bold" fontFamily="monospace">
                Verifies line numbers ahead of apply
              </text>
            </g>

            {/* Block 3: Sandboxed Simulation */}
            <g transform="translate(12, 242)">
              <rect width="186" height="70" rx="8" fill="var(--card)" stroke="var(--border)" strokeWidth="1" />
              <text x="10" y="16" fill="var(--foreground)" fontSize="9.5" fontWeight="bold" fontFamily="monospace">
                Dry-Run Verification
              </text>
              <text x="10" y="32" fill="var(--muted)" fontSize="8.5" fontFamily="sans-serif">
                • In-memory shadow file patch check
              </text>
              <text x="10" y="46" fill="var(--muted)" fontSize="8.5" fontFamily="sans-serif">
                • Flags merge conflicts before disk write
              </text>
              <text x="10" y="58" fill="#f59e0b" fontSize="7.5" fontFamily="monospace">
                Zero risk of source file corruption
              </text>
            </g>

            <rect x="12" y="322" width="186" height="46" rx="6" fill="#f59e0b" fillOpacity="0.1" stroke="#f59e0b" strokeWidth="0.8" />
            <text x="18" y="340" fill="#f59e0b" fontSize="8.5" fontWeight="bold" fontFamily="monospace">
              Tier 3 Output:
            </text>
            <text x="18" y="354" fill="var(--foreground)" fontSize="8" fontFamily="sans-serif">
              Validated unified diff ready for inspection
            </text>
          </g>

          {/* Connection Arrow 3 -> 4 */}
          <path
            d="M 730 210 L 764 210"
            fill="none"
            stroke="#f59e0b"
            strokeWidth="2"
            markerEnd="url(#patch-arrow-emerald)"
          />

          {/* ================================================================= */}
          {/* TIER 4: Human Review, Atomic Apply & Rollback */}
          {/* ================================================================= */}
          <g transform="translate(770, 20)">
            <rect
              width="150"
              height="380"
              rx="12"
              fill="url(#patch-tier4-grad)"
              stroke="#10b981"
              strokeWidth="1.2"
            />
            <rect x="0" y="0" width="150" height="28" rx="12" fill="#10b981" fillOpacity="0.12" />
            <text x="10" y="18" fill="#10b981" fontSize="10.5" fontWeight="bold" fontFamily="monospace">
              TIER 4: ATOMIC APPLY
            </text>

            {/* Block 1: Human Inspection */}
            <g transform="translate(10, 38)">
              <rect width="130" height="88" rx="8" fill="var(--card)" stroke="var(--border)" strokeWidth="1" />
              <text x="8" y="16" fill="var(--foreground)" fontSize="9" fontWeight="bold" fontFamily="monospace">
                Human Review
              </text>
              <text x="8" y="30" fill="var(--muted)" fontSize="7.5" fontFamily="sans-serif">
                • /diff terminal inspection
              </text>
              <text x="8" y="44" fill="var(--muted)" fontSize="7.5" fontFamily="sans-serif">
                • File-by-file approval
              </text>
              <text x="8" y="58" fill="var(--muted)" fontSize="7.5" fontFamily="sans-serif">
                • Reject or refine prompt
              </text>
              <text x="8" y="72" fill="#10b981" fontSize="7.5" fontWeight="bold" fontFamily="monospace">
                100% human verified
              </text>
            </g>

            {/* Block 2: Atomic Disk Apply */}
            <g transform="translate(10, 134)">
              <rect width="130" height="96" rx="8" fill="var(--card)" stroke="#10b981" strokeWidth="1" />
              <text x="8" y="16" fill="#10b981" fontSize="9" fontWeight="bold" fontFamily="monospace">
                Atomic Apply
              </text>
              <text x="8" y="30" fill="var(--muted)" fontSize="7.5" fontFamily="sans-serif">
                • /approve writes disk
              </text>
              <text x="8" y="44" fill="var(--muted)" fontSize="7.5" fontFamily="sans-serif">
                • Atomic tempfile rename
              </text>
              <text x="8" y="58" fill="var(--muted)" fontSize="7.5" fontFamily="sans-serif">
                • Automatic git staging
              </text>
              <text x="8" y="72" fill="#3b82f6" fontSize="7" fontFamily="monospace">
                Snapshot: .patchllm/*.patch
              </text>
            </g>

            {/* Block 3: Instant Rollback */}
            <g transform="translate(10, 238)">
              <rect width="130" height="74" rx="8" fill="var(--card)" stroke="var(--border)" strokeWidth="1" />
              <text x="8" y="16" fill="var(--foreground)" fontSize="9" fontWeight="bold" fontFamily="monospace">
                Rollback Engine
              </text>
              <text x="8" y="30" fill="var(--muted)" fontSize="7.5" fontFamily="sans-serif">
                • /revert reverses patch
              </text>
              <text x="8" y="44" fill="var(--muted)" fontSize="7.5" fontFamily="sans-serif">
                • Restores original state
              </text>
              <text x="8" y="58" fill="#10b981" fontSize="7.5" fontFamily="monospace">
                1-key undo safety
              </text>
            </g>

            <rect x="10" y="322" width="130" height="46" rx="6" fill="#10b981" fillOpacity="0.1" stroke="#10b981" strokeWidth="0.8" />
            <text x="14" y="340" fill="#10b981" fontSize="8" fontWeight="bold" fontFamily="monospace">
              Tier 4 Outcome:
            </text>
            <text x="14" y="354" fill="var(--foreground)" fontSize="7.5" fontFamily="sans-serif">
              Clean refactor committed
            </text>
          </g>

          {/* ================================================================= */}
          {/* Bottom Telemetry Strip */}
          {/* ================================================================= */}
          <g transform="translate(20, 412)">
            <rect width="900" height="36" rx="8" fill="none" stroke="var(--border)" strokeWidth="1" />
            <text x="15" y="22" fill="var(--muted)" fontSize="8.5" fontFamily="monospace">
              <tspan fill="#3b82f6" fontWeight="bold">INPUT:</tspan> /task + @dir/@file Scopes
            </text>
            <text x="260" y="22" fill="var(--muted)" fontSize="8.5" fontFamily="monospace">
              <tspan fill="#8b5cf6" fontWeight="bold">PLANNING:</tspan> Atomic Steps + Session Recovery
            </text>
            <text x="540" y="22" fill="var(--muted)" fontSize="8.5" fontFamily="monospace">
              <tspan fill="#f59e0b" fontWeight="bold">GENERATION:</tspan> LiteLLM + Unified Diffs
            </text>
            <text x="760" y="22" fill="var(--muted)" fontSize="8.5" fontFamily="monospace">
              <tspan fill="#10b981" fontWeight="bold">SAFETY:</tspan> /diff, /approve, /revert
            </text>
          </g>
        </svg>
      </div>
    </div>
  );
}
