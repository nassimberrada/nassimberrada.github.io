"use client";

import React from "react";

export function OrthoLoraApproachDiagram() {
  return (
    <div className="w-full my-6 rounded-[14px] border border-[var(--border)] bg-[var(--card)] p-4 sm:p-6 shadow-sm overflow-hidden select-none font-sans">
      {/* Schematic Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b border-[var(--border)]">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--foreground)]">
            Endogenous Subspace Orthogonalization vs. Exogenous SAE Probing
          </span>
        </div>
        <span className="text-[10px] font-mono text-[var(--muted)]">
          Architectural Forward Dynamics Comparison
        </span>
      </div>

      <div className="w-full overflow-x-auto">
        <svg
          viewBox="0 0 920 460"
          className="w-full min-w-[860px] h-auto"
          style={{ fontVariantNumeric: "tabular-nums" }}
        >
          <defs>
            {/* Arrow markers */}
            <marker
              id="ortho-arrow-emerald"
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
              id="ortho-arrow-emerald"
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
              id="ortho-arrow-amber"
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
              id="ortho-arrow-muted"
              viewBox="0 0 10 10"
              refX="6"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#64748b" />
            </marker>
            <marker
              id="ortho-arrow-rose"
              viewBox="0 0 10 10"
              refX="6"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#ef4444" />
            </marker>

            {/* Subtle card gradients */}
            <linearGradient id="sae-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#ef4444" stopOpacity="0.03" />
            </linearGradient>
            <linearGradient id="ortho-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.04" />
            </linearGradient>
          </defs>

          {/* =============================================================== */}
          {/* SECTION A: EXOGENOUS PROBING (TOP-K SAE)                         */}
          {/* =============================================================== */}
          <g>
            {/* Background Container Box */}
            <rect
              x="20"
              y="20"
              width="880"
              height="185"
              rx="12"
              fill="url(#sae-grad)"
              stroke="#f59e0b"
              strokeOpacity="0.3"
              strokeWidth="1.2"
            />

            {/* Section A Title Badge */}
            <rect x="36" y="32" width="280" height="22" rx="4" fill="#f59e0b" fillOpacity="0.15" />
            <text x="44" y="47" fontFamily="monospace" fontSize="11" fontWeight="bold" fill="#d97706">
              (a) Exogenous Probing (Top-K Sparse Autoencoder)
            </text>

            <text x="740" y="47" fontFamily="monospace" fontSize="10" fill="#94a3b8" textAnchor="end">
              112x Parameters · Detached Latents · High Latency
            </text>

            {/* Block 1: Base Residual Stream */}
            <rect x="40" y="70" width="160" height="95" rx="8" fill="var(--card)" stroke="var(--border)" strokeWidth="1" />
            <text x="52" y="92" fontFamily="sans-serif" fontSize="11" fontWeight="bold" fill="var(--foreground)">
              Base Layer Stream x
            </text>
            <text x="52" y="108" fontFamily="monospace" fontSize="9.5" fill="#64748b">
              x ∈ ℝ^d (d = 896)
            </text>
            <text x="52" y="126" fontFamily="sans-serif" fontSize="9" fill="#ef4444">
              • Superposition (dense)
            </text>
            <text x="52" y="140" fontFamily="sans-serif" fontSize="9" fill="#ef4444">
              • Entangled features
            </text>
            <text x="52" y="154" fontFamily="sans-serif" fontSize="9" fill="#94a3b8">
              • Polysemantic activations
            </text>

            {/* Flow Arrow 1 -> 2 */}
            <line x1="200" y1="117" x2="236" y2="117" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#ortho-arrow-muted)" />

            {/* Block 2: SAE Encoder */}
            <rect x="240" y="70" width="165" height="95" rx="8" fill="var(--card)" stroke="#f59e0b" strokeOpacity="0.5" strokeWidth="1.2" />
            <text x="252" y="92" fontFamily="sans-serif" fontSize="11" fontWeight="bold" fill="#d97706">
              SAE Encoder W_enc
            </text>
            <text x="252" y="108" fontFamily="monospace" fontSize="9.5" fill="#64748b">
              W_enc ∈ ℝ^(4d × d)
            </text>
            <text x="252" y="126" fontFamily="sans-serif" fontSize="9" fill="var(--foreground)">
              • Top-k Hard Sparsity (k=32)
            </text>
            <text x="252" y="140" fontFamily="sans-serif" fontSize="9" fill="#d97706">
              • 4x Expansion (3,584 dims)
            </text>
            <text x="252" y="154" fontFamily="sans-serif" fontSize="9" fill="#ef4444">
              • 3.2M params per layer
            </text>

            {/* Flow Arrow 2 -> 3 */}
            <line x1="405" y1="117" x2="441" y2="117" stroke="#f59e0b" strokeWidth="1.5" markerEnd="url(#ortho-arrow-amber)" />

            {/* Block 3: Latent Dictionary */}
            <rect x="445" y="70" width="165" height="95" rx="8" fill="var(--card)" stroke="#f59e0b" strokeOpacity="0.5" strokeWidth="1.2" />
            <text x="457" y="92" fontFamily="sans-serif" fontSize="11" fontWeight="bold" fill="#d97706">
              Latents c ∈ ℝ^(4d)
            </text>
            <text x="457" y="108" fontFamily="monospace" fontSize="9.5" fill="#64748b">
              Sparse Dictionary Code
            </text>
            <text x="457" y="126" fontFamily="sans-serif" fontSize="9" fill="var(--foreground)">
              • Reconstruction FVU &lt; 0.01
            </text>
            <text x="457" y="140" fontFamily="sans-serif" fontSize="9" fill="#ef4444">
              • Non-orthogonal latents
            </text>
            <text x="457" y="154" fontFamily="sans-serif" fontSize="9" fill="#ef4444">
              • Observational probe only
            </text>

            {/* Flow Arrow 3 -> 4 */}
            <line x1="610" y1="117" x2="646" y2="117" stroke="#f59e0b" strokeWidth="1.5" markerEnd="url(#ortho-arrow-amber)" />

            {/* Block 4: SAE Decoder & Interventional Collapse */}
            <rect x="650" y="70" width="230" height="95" rx="8" fill="var(--card)" stroke="#ef4444" strokeOpacity="0.5" strokeWidth="1.2" />
            <text x="662" y="92" fontFamily="sans-serif" fontSize="11" fontWeight="bold" fill="#ef4444">
              Decoder W_dec &amp; Patching
            </text>
            <text x="662" y="108" fontFamily="monospace" fontSize="9.5" fill="#64748b">
              x̂ = W_dec · c + b_dec
            </text>
            <text x="662" y="126" fontFamily="sans-serif" fontSize="9" fill="#ef4444">
              ✖ 6.4M total params added per layer
            </text>
            <text x="662" y="140" fontFamily="sans-serif" fontSize="9" fill="#ef4444">
              ✖ Catastrophic Loss on Patching (14.94)
            </text>
            <text x="662" y="154" fontFamily="sans-serif" fontSize="9" fill="#ef4444">
              ✖ Unusable for low-latency production
            </text>
          </g>

          {/* =============================================================== */}
          {/* SECTION B: ENDOGENOUS ORTHO-LORA (OURS)                          */}
          {/* =============================================================== */}
          <g>
            {/* Background Container Box */}
            <rect
              x="20"
              y="225"
              width="880"
              height="215"
              rx="12"
              fill="url(#ortho-grad)"
              stroke="#10b981"
              strokeOpacity="0.4"
              strokeWidth="1.4"
            />

            {/* Section B Title Badge */}
            <rect x="36" y="237" width="290" height="22" rx="4" fill="#10b981" fillOpacity="0.15" />
            <text x="44" y="252" fontFamily="monospace" fontSize="11" fontWeight="bold" fill="#10b981">
              (b) Endogenous Ortho-LoRA Forward Path (Ours)
            </text>

            <text x="780" y="252" fontFamily="monospace" fontSize="10" fill="#10b981" fontWeight="bold" textAnchor="end">
              112x Fewer Parameters · 0 ms Merged Latency · 10.3x Cross-Talk Drop
            </text>

            {/* Block 1: Input Tokens */}
            <rect x="40" y="280" width="130" height="90" rx="8" fill="var(--card)" stroke="var(--border)" strokeWidth="1" />
            <text x="52" y="302" fontFamily="sans-serif" fontSize="11" fontWeight="bold" fill="var(--foreground)">
              Input Tokens x
            </text>
            <text x="52" y="318" fontFamily="monospace" fontSize="9.5" fill="#64748b">
              x ∈ ℝ^d
            </text>
            <text x="52" y="338" fontFamily="sans-serif" fontSize="9" fill="#10b981">
              Prompt Embeddings
            </text>
            <text x="52" y="352" fontFamily="sans-serif" fontSize="9" fill="#94a3b8">
              Task token stream
            </text>

            {/* Fork Path: Top branch to Frozen W0, Bottom branch to Ortho-LoRA */}
            <path
              d="M 170 325 L 200 325 L 200 295 L 216 295"
              fill="none"
              stroke="#64748b"
              strokeWidth="1.5"
              markerEnd="url(#ortho-arrow-muted)"
            />
            <path
              d="M 170 325 L 200 325 L 200 365 L 216 365"
              fill="none"
              stroke="#10b981"
              strokeWidth="1.5"
              markerEnd="url(#ortho-arrow-emerald)"
            />

            {/* Block 2A: Frozen Base Model Weights W0 */}
            <rect x="220" y="270" width="170" height="52" rx="6" fill="var(--card)" stroke="var(--border)" strokeWidth="1" />
            <text x="232" y="290" fontFamily="sans-serif" fontSize="10.5" fontWeight="bold" fill="var(--foreground)">
              Frozen Base Layer W₀
            </text>
            <text x="232" y="306" fontFamily="monospace" fontSize="9" fill="#64748b">
              h₀ = W₀ · x  (Intact Base Model)
            </text>

            {/* Block 2B: Ortho-LoRA Adapter */}
            <rect x="220" y="338" width="170" height="85" rx="6" fill="var(--card)" stroke="#10b981" strokeWidth="1.2" />
            <text x="232" y="356" fontFamily="sans-serif" fontSize="10.5" fontWeight="bold" fill="#10b981">
              Ortho-LoRA (r = 32)
            </text>
            <text x="232" y="372" fontFamily="monospace" fontSize="9" fill="#10b981">
              Δh = (α/r) · B · (A · x)
            </text>
            <text x="232" y="388" fontFamily="sans-serif" fontSize="8.5" fill="var(--foreground)">
              • Detectors: z_k = a_kᵀ x
            </text>
            <text x="232" y="402" fontFamily="sans-serif" fontSize="8.5" fill="#10b981">
              • Orthogonal writes: b_k
            </text>
            <text x="232" y="416" fontFamily="sans-serif" fontSize="8.5" fill="#10b981">
              • Only 57K params per layer
            </text>

            {/* Block 3: Attribution-Conditioned Gram Loss Banner */}
            <rect x="410" y="342" width="165" height="78" rx="6" fill="#10b981" fillOpacity="0.1" stroke="#10b981" strokeOpacity="0.4" strokeDasharray="3 3" strokeWidth="1" />
            <text x="420" y="360" fontFamily="monospace" fontSize="9.5" fontWeight="bold" fill="#10b981">
              ℒ_ortho Gram Penalty
            </text>
            <text x="420" y="376" fontFamily="monospace" fontSize="8.5" fill="var(--foreground)">
              b_j ⟂ b_k · z̄_(j,k)
            </text>
            <text x="420" y="392" fontFamily="sans-serif" fontSize="8" fill="#64748b">
              Conditioned on co-activation
            </text>
            <text x="420" y="406" fontFamily="sans-serif" fontSize="8" fill="#10b981">
              ℒ_sparse: Bottleneck L1 Sparsity
            </text>

            {/* Flow from Ortho-LoRA to Loss */}
            <line x1="390" y1="381" x2="406" y2="381" stroke="#10b981" strokeWidth="1.2" strokeDasharray="2 2" markerEnd="url(#ortho-arrow-emerald)" />

            {/* Flow to Recombination Sum */}
            <path
              d="M 390 296 L 600 296 L 600 320"
              fill="none"
              stroke="#64748b"
              strokeWidth="1.5"
              markerEnd="url(#ortho-arrow-muted)"
            />
            <path
              d="M 575 381 L 600 381 L 600 345"
              fill="none"
              stroke="#10b981"
              strokeWidth="1.5"
              markerEnd="url(#ortho-arrow-emerald)"
            />

            {/* Summing Junction Node */}
            <circle cx="600" cy="333" r="14" fill="var(--card)" stroke="var(--border)" strokeWidth="1.5" />
            <text x="600" y="337" fontFamily="sans-serif" fontSize="14" fontWeight="bold" fill="var(--foreground)" textAnchor="middle">
              +
            </text>

            {/* Flow from Sum to Orthogonal Subspace Output */}
            <line x1="614" y1="333" x2="636" y2="333" stroke="#10b981" strokeWidth="1.5" markerEnd="url(#ortho-arrow-emerald)" />

            {/* Block 4: Adapted Representation Stream */}
            <rect x="640" y="285" width="115" height="96" rx="8" fill="var(--card)" stroke="#10b981" strokeWidth="1.2" />
            <text x="650" y="306" fontFamily="sans-serif" fontSize="10.5" fontWeight="bold" fill="#10b981">
              h&apos; Adapted Stream
            </text>
            <text x="650" y="322" fontFamily="monospace" fontSize="8.5" fill="#64748b">
              h&apos; = h₀ + Δh
            </text>
            <text x="650" y="340" fontFamily="sans-serif" fontSize="8" fill="var(--foreground)">
              • Monosemantic Subspace
            </text>
            <text x="650" y="354" fontFamily="sans-serif" fontSize="8" fill="#10b981">
              • Cgram = 0.070 (⟂)
            </text>
            <text x="650" y="368" fontFamily="sans-serif" fontSize="8" fill="#10b981">
              • 87.7% Rank Utilization
            </text>

            {/* Flow to Zero-Latency Deployment Merge */}
            <line x1="755" y1="333" x2="776" y2="333" stroke="#10b981" strokeWidth="1.5" markerEnd="url(#ortho-arrow-emerald)" />

            {/* Block 5: Deployment Merge (0 ms added latency) */}
            <rect x="780" y="285" width="110" height="96" rx="8" fill="#10b981" fillOpacity="0.1" stroke="#10b981" strokeWidth="1.5" />
            <text x="790" y="306" fontFamily="sans-serif" fontSize="10" fontWeight="bold" fill="#10b981">
              Zero Latency Merge
            </text>
            <text x="790" y="322" fontFamily="monospace" fontSize="8.5" fill="var(--foreground)">
              W&apos; = W₀ + (α/r)BA
            </text>
            <text x="790" y="342" fontFamily="monospace" fontSize="12" fontWeight="bold" fill="#10b981">
              0 ms
            </text>
            <text x="790" y="356" fontFamily="sans-serif" fontSize="8" fill="var(--foreground)">
              Added Latency
            </text>
            <text x="790" y="370" fontFamily="sans-serif" fontSize="7.5" fill="#64748b">
              Single-weight forward
            </text>
          </g>
        </svg>
      </div>

      <div className="mt-3 pt-3 border-t border-[var(--border)] text-xs text-[var(--muted)] flex flex-wrap items-center justify-between gap-2">
        <span className="font-mono text-[11px]">
          Directly optimizes representation geometry inside the model&apos;s native forward graph rather than probing post-hoc.
        </span>
        <span className="font-mono text-[10px] text-emerald-600 dark:text-emerald-400">
          Native Forward Subspace Formulation
        </span>
      </div>
    </div>
  );
}
