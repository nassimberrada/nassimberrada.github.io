"use client";

import React from "react";

export function GeometricSentinelArchitectureDiagram() {
  return (
    <div className="w-full my-6 rounded-[14px] border border-[var(--border)] bg-[var(--card)] p-4 sm:p-6 shadow-sm overflow-hidden select-none font-sans">
      {/* Diagram Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b border-[var(--border)]">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--foreground)]">
            Closed-Loop Sentinel Auditing &amp; Hysteresis Controller Architecture
          </span>
        </div>
        <span className="text-[10px] font-mono text-[var(--muted)]">
          Forward Telemetry · MEI Decomposition · 4-State Hysteresis
        </span>
      </div>

      <div className="w-full overflow-x-auto">
        <svg
          viewBox="0 0 940 440"
          className="w-full min-w-[880px] h-auto"
          style={{ fontVariantNumeric: "tabular-nums" }}
        >
          <defs>
            {/* Arrow Markers */}
            <marker
              id="gs-arrow-emerald"
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
              id="gs-arrow-cyan"
              viewBox="0 0 10 10"
              refX="6"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#06b6d4" />
            </marker>
            <marker
              id="gs-arrow-amber"
              viewBox="0 0 10 10"
              refX="6"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#f59e0b" />
            </marker>
            <marker
              id="gs-arrow-red"
              viewBox="0 0 10 10"
              refX="6"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#ef4444" />
            </marker>
          </defs>

          {/* Lane 1: Continual Adapter Training (Top) */}
          <g>
            <rect
              x="20"
              y="20"
              width="900"
              height="115"
              rx="10"
              fill="currentColor"
              className="text-[var(--card)]/90"
              stroke="#10b981"
              strokeOpacity="0.3"
              strokeWidth="1.2"
            />
            <rect x="35" y="10" width="220" height="20" rx="4" fill="#10b981" fillOpacity="0.15" stroke="#10b981" strokeWidth="0.8" />
            <text x="45" y="24" fill="#10b981" fontFamily="monospace" fontSize="10" fontWeight="bold">
              STAGE 1: ADAPTER STREAM ENGINE
            </text>

            {/* Block 1.1: Incoming Stream Batch */}
            <rect x="40" y="45" width="180" height="70" rx="6" fill="#10b981" fillOpacity="0.06" stroke="#10b981" strokeOpacity="0.5" strokeWidth="1" />
            <text x="52" y="66" fill="#10b981" fontFamily="monospace" fontSize="11" fontWeight="bold">Data Invariant (B=4)</text>
            <text x="52" y="84" fill="currentColor" className="text-[var(--foreground)]" fontSize="10">Unmitigated: 4 Skill B</text>
            <text x="52" y="100" fill="currentColor" className="text-[var(--muted)]" fontSize="9.5">Replay: 2 B + 2 A (50/50)</text>

            {/* Arrow 1.1 -> 1.2 */}
            <path d="M 220 80 L 270 80" stroke="#10b981" strokeWidth="1.6" markerEnd="url(#gs-arrow-emerald)" fill="none" />

            {/* Block 1.2: Base Model + LoRA Adapter */}
            <rect x="270" y="45" width="220" height="70" rx="6" fill="#10b981" fillOpacity="0.06" stroke="#10b981" strokeOpacity="0.5" strokeWidth="1" />
            <text x="282" y="66" fill="#10b981" fontFamily="monospace" fontSize="11" fontWeight="bold">Qwen2.5-0.5B + LoRA</text>
            <text x="282" y="84" fill="currentColor" className="text-[var(--foreground)]" fontSize="10">r=16, α=32 (9.44M params)</text>
            <text x="282" y="100" fill="currentColor" className="text-[var(--muted)]" fontSize="9.5">Targeting All Attn &amp; MLP Projections</text>

            {/* Arrow 1.2 -> 1.3 */}
            <path d="M 490 80 L 540 80" stroke="#10b981" strokeWidth="1.6" markerEnd="url(#gs-arrow-emerald)" fill="none" />

            {/* Block 1.3: Chunk Boundary Forward Hook */}
            <rect x="540" y="45" width="210" height="70" rx="6" fill="#06b6d4" fillOpacity="0.08" stroke="#06b6d4" strokeOpacity="0.6" strokeWidth="1" />
            <text x="552" y="66" fill="#06b6d4" fontFamily="monospace" fontSize="11" fontWeight="bold">Layer 18 Forward Hook</text>
            <text x="552" y="84" fill="currentColor" className="text-[var(--foreground)]" fontSize="10">Frozen Sentinels (K=32)</text>
            <text x="552" y="100" fill="currentColor" className="text-[var(--muted)]" fontSize="9.5">2P FLOPs/tok · 0 Backprop / Decode</text>

            {/* Arrow 1.3 -> Sentinel Pool */}
            <path d="M 750 80 L 795 80" stroke="#06b6d4" strokeWidth="1.6" markerEnd="url(#gs-arrow-cyan)" fill="none" />

            {/* Block 1.4: Quarantined Anchor Pool */}
            <rect x="795" y="45" width="110" height="70" rx="6" fill="currentColor" className="text-[var(--card)]" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1" />
            <text x="805" y="68" fill="currentColor" className="text-[var(--foreground)]" fontFamily="monospace" fontSize="10" fontWeight="bold">Frozen Anchors</text>
            <text x="805" y="86" fill="currentColor" className="text-[var(--muted)]" fontSize="9">Quarantined</text>
            <text x="805" y="100" fill="currentColor" className="text-[var(--muted)]" fontSize="9">Historical A</text>
          </g>

          {/* Vertical Downward Connection: Layer 18 activations to Manifold Engine */}
          <path d="M 645 115 L 645 160" stroke="#06b6d4" strokeWidth="1.8" strokeDasharray="3 3" markerEnd="url(#gs-arrow-cyan)" fill="none" />
          <text x="655" y="142" fill="#06b6d4" fontFamily="monospace" fontSize="9" fontWeight="bold">h(L18) &isin; R^(32 &times; 896)</text>

          {/* Lane 2: Geometric Manifold Diagnostics (Middle) */}
          <g>
            <rect
              x="20"
              y="160"
              width="900"
              height="125"
              rx="10"
              fill="currentColor"
              className="text-[var(--card)]/90"
              stroke="#06b6d4"
              strokeOpacity="0.3"
              strokeWidth="1.2"
            />
            <rect x="35" y="150" width="250" height="20" rx="4" fill="#06b6d4" fillOpacity="0.15" stroke="#06b6d4" strokeWidth="0.8" />
            <text x="45" y="164" fill="#06b6d4" fontFamily="monospace" fontSize="10" fontWeight="bold">
              STAGE 2: MANIFOLD DIAGNOSTICS &amp; SVD
            </text>

            {/* Block 2.1: Dual Gram SVD Subspace Decomposition */}
            <rect x="40" y="185" width="260" height="85" rx="6" fill="#06b6d4" fillOpacity="0.06" stroke="#06b6d4" strokeOpacity="0.5" strokeWidth="1" />
            <text x="52" y="206" fill="#06b6d4" fontFamily="monospace" fontSize="11" fontWeight="bold">Dual Gram SVD Decomposition</text>
            <text x="52" y="225" fill="currentColor" className="text-[var(--foreground)]" fontSize="10">D_subspace = ||P_U (h_t - h_0)||_2</text>
            <text x="52" y="242" fill="currentColor" className="text-[var(--muted)]" fontSize="9.5">Filters Null Space (88% benign syntactic drift)</text>
            <text x="52" y="258" fill="currentColor" className="text-[var(--muted)]" fontSize="9.5">Grassmann angle alignment S_subspace</text>

            {/* Arrow 2.1 -> 2.2 */}
            <path d="M 300 227 L 350 227" stroke="#06b6d4" strokeWidth="1.6" markerEnd="url(#gs-arrow-cyan)" fill="none" />

            {/* Block 2.2: MEI Formula & Boundary Tracking */}
            <rect x="350" y="185" width="300" height="85" rx="6" fill="#06b6d4" fillOpacity="0.06" stroke="#06b6d4" strokeOpacity="0.5" strokeWidth="1" />
            <text x="362" y="206" fill="#06b6d4" fontFamily="monospace" fontSize="11" fontWeight="bold">Relative MEI Formulation</text>
            <text x="362" y="225" fill="#ef4444" fontFamily="monospace" fontSize="10" fontWeight="bold">MEI = R_M / [max(Δ_margin, ε) · max(S_sub, ε)]</text>
            <text x="362" y="242" fill="currentColor" className="text-[var(--foreground)]" fontSize="9.5">R_M: Intra-class dispersion (cluster expansion)</text>
            <text x="362" y="258" fill="currentColor" className="text-[var(--foreground)]" fontSize="9.5">Δ_margin: Inter-class nearest-neighbor margin</text>

            {/* Arrow 2.2 -> 2.3 */}
            <path d="M 650 227 L 700 227" stroke="#06b6d4" strokeWidth="1.6" markerEnd="url(#gs-arrow-cyan)" fill="none" />

            {/* Block 2.3: Prospective Lead Time Detector */}
            <rect x="700" y="185" width="205" height="85" rx="6" fill="#ef4444" fillOpacity="0.08" stroke="#ef4444" strokeOpacity="0.6" strokeWidth="1" />
            <text x="712" y="206" fill="#ef4444" fontFamily="monospace" fontSize="11" fontWeight="bold">Prospective Lead Detector</text>
            <text x="712" y="225" fill="#ef4444" fontFamily="monospace" fontSize="10.5" fontWeight="bold">Tripwire: τ_MEI = 1.65</text>
            <text x="712" y="242" fill="currentColor" className="text-[var(--foreground)]" fontSize="10">Δt = +10 Steps Lead Time</text>
            <text x="712" y="258" fill="currentColor" className="text-[var(--muted)]" fontSize="9.5">Anticipates accuracy cliff at step 30</text>
          </g>

          {/* Vertical Downward Connection: Detector to Controller */}
          <path d="M 802 270 L 802 315" stroke="#ef4444" strokeWidth="1.8" strokeDasharray="3 3" markerEnd="url(#gs-arrow-red)" fill="none" />
          <text x="812" y="297" fill="#ef4444" fontFamily="monospace" fontSize="9" fontWeight="bold">Trigger Pulse</text>

          {/* Lane 3: 4-State Hysteresis Controller & Closed-Loop Actuator (Bottom) */}
          <g>
            <rect
              x="20"
              y="315"
              width="900"
              height="105"
              rx="10"
              fill="currentColor"
              className="text-[var(--card)]/90"
              stroke="#8b5cf6"
              strokeOpacity="0.3"
              strokeWidth="1.2"
            />
            <rect x="35" y="305" width="260" height="20" rx="4" fill="#8b5cf6" fillOpacity="0.15" stroke="#8b5cf6" strokeWidth="0.8" />
            <text x="45" y="319" fill="#8b5cf6" fontFamily="monospace" fontSize="10" fontWeight="bold">
              STAGE 3: 4-STATE HYSTERESIS CONTROLLER
            </text>

            {/* State 1: IDLE MONITORING */}
            <rect x="40" y="340" width="195" height="65" rx="6" fill="#10b981" fillOpacity="0.08" stroke="#10b981" strokeOpacity="0.6" strokeWidth="1" />
            <text x="52" y="360" fill="#10b981" fontFamily="monospace" fontSize="10.5" fontWeight="bold">1. IDLE MONITORING</text>
            <text x="52" y="377" fill="currentColor" className="text-[var(--foreground)]" fontSize="9.5">Pure Skill B training</text>
            <text x="52" y="392" fill="currentColor" className="text-[var(--muted)]" fontSize="9">Non-autoregressive forward</text>

            {/* Arrow 1 -> 2 */}
            <path d="M 235 372 L 265 372" stroke="#f59e0b" strokeWidth="1.5" markerEnd="url(#gs-arrow-amber)" fill="none" />

            {/* State 2: TRIPWIRE EVALUATION */}
            <rect x="265" y="340" width="195" height="65" rx="6" fill="#f59e0b" fillOpacity="0.08" stroke="#f59e0b" strokeOpacity="0.6" strokeWidth="1" />
            <text x="277" y="360" fill="#f59e0b" fontFamily="monospace" fontSize="10.5" fontWeight="bold">2. TRIPWIRE EVAL</text>
            <text x="277" y="377" fill="currentColor" className="text-[var(--foreground)]" fontSize="9.5">Threshold τ + Velocity shock δ</text>
            <text x="277" y="392" fill="currentColor" className="text-[var(--muted)]" fontSize="9">Prevents chattering oscillations</text>

            {/* Arrow 2 -> 3 */}
            <path d="M 460 372 L 490 372" stroke="#ef4444" strokeWidth="1.5" markerEnd="url(#gs-arrow-red)" fill="none" />

            {/* State 3: ACTIVE REHEARSAL */}
            <rect x="490" y="340" width="200" height="65" rx="6" fill="#06b6d4" fillOpacity="0.08" stroke="#06b6d4" strokeOpacity="0.6" strokeWidth="1" />
            <text x="502" y="360" fill="#06b6d4" fontFamily="monospace" fontSize="10.5" fontWeight="bold">3. SURGICAL REPLAY</text>
            <text x="502" y="377" fill="currentColor" className="text-[var(--foreground)]" fontSize="9.5">W_replay = 2 chunks (40 steps)</text>
            <text x="502" y="392" fill="currentColor" className="text-[var(--muted)]" fontSize="9">50/50 balance · Total 17.3k tok</text>

            {/* Arrow 3 -> 4 */}
            <path d="M 690 372 L 720 372" stroke="#8b5cf6" strokeWidth="1.5" markerEnd="url(#gs-arrow-cyan)" fill="none" />

            {/* State 4: REFRACTORY COOLDOWN */}
            <rect x="720" y="340" width="185" height="65" rx="6" fill="#8b5cf6" fillOpacity="0.08" stroke="#8b5cf6" strokeOpacity="0.6" strokeWidth="1" />
            <text x="732" y="360" fill="#8b5cf6" fontFamily="monospace" fontSize="10.5" fontWeight="bold">4. COOLDOWN (C=2)</text>
            <text x="732" y="377" fill="currentColor" className="text-[var(--foreground)]" fontSize="9.5">Suppresses re-triggering</text>
            <text x="732" y="392" fill="currentColor" className="text-[var(--muted)]" fontSize="9">Optimizer settling window</text>
          </g>

          {/* Feedback loop arrow back to Stage 1 */}
          <path
            d="M 590 340 C 590 300, 130 300, 130 115"
            stroke="#10b981"
            strokeWidth="1.8"
            strokeDasharray="4 4"
            markerEnd="url(#gs-arrow-emerald)"
            fill="none"
          />
          <text x="280" y="302" fill="#10b981" fontFamily="monospace" fontSize="9" fontWeight="bold">
            Closed-Loop Batch Interleaving Actuation (2 Replay + 2 Stream Slots)
          </text>
        </svg>
      </div>
    </div>
  );
}
