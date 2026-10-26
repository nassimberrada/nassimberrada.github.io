"use client";

import React from "react";

export function DriftLabArchitectureDiagram() {
  return (
    <div className="w-full my-6 rounded-[14px] border border-[var(--border)] bg-[var(--card)] p-4 sm:p-6 shadow-sm overflow-hidden select-none font-sans">
      {/* Diagram Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b border-[var(--border)]">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--foreground)]">
            DriftLab Closed-Loop Measurement Architecture &amp; Latent Truth Ledger
          </span>
        </div>
        <span className="text-[10px] font-mono text-[var(--muted)]">
          Decoupled Evaluation Engine (3 Lanes)
        </span>
      </div>

      <div className="w-full overflow-x-auto">
        <svg
          viewBox="0 0 940 480"
          className="w-full min-w-[880px] h-auto"
          style={{ fontVariantNumeric: "tabular-nums" }}
        >
          <defs>
            {/* Markers */}
            <marker
              id="dl-arrow-blue"
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
              id="dl-arrow-emerald"
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
              id="dl-arrow-amber"
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
              id="dl-arrow-muted"
              viewBox="0 0 10 10"
              refX="6"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#888888" opacity="0.6" />
            </marker>
            <marker
              id="dl-arrow-indigo"
              viewBox="0 0 10 10"
              refX="6"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#10b981" />
            </marker>

            {/* Pattern Grids */}
            <pattern id="dlGrid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-[var(--border)] opacity-20" />
            </pattern>
          </defs>

          {/* Background Grid */}
          <rect width="940" height="480" fill="url(#dlGrid)" />

          {/* =========================================================================
              LANE 1: AGENT INTERACTION LOOP (TOP)
              ========================================================================= */}
          <rect
            x="20"
            y="20"
            width="900"
            height="125"
            rx="10"
            fill="currentColor"
            className="text-[var(--card)]"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="none"
          />
          <rect
            x="20"
            y="20"
            width="900"
            height="125"
            rx="10"
            fill="#10b981"
            fillOpacity="0.03"
            stroke="#10b981"
            strokeWidth="1.2"
            strokeOpacity="0.4"
          />

          {/* Lane 1 Header Badge */}
          <g transform="translate(35, 34)">
            <rect x="0" y="0" width="165" height="20" rx="4" fill="#10b981" fillOpacity="0.12" stroke="#10b981" strokeWidth="1" strokeOpacity="0.3" />
            <text x="82" y="14" textAnchor="middle" fill="#10b981" fontSize="9.5" fontFamily="monospace" fontWeight="bold">
              01 · AGENT EXECUTION LOOP
            </text>
            <text x="175" y="14" fill="currentColor" className="text-[var(--muted)]" fontSize="9" fontFamily="monospace">
              Input: Observation x_t · Output: Action a_t (Text-only contract, memory opaque to evaluator)
            </text>
          </g>

          {/* Agent Sub-blocks */}
          {/* Box 1A: Task Perception */}
          <g transform="translate(40, 62)">
            <rect x="0" y="0" width="170" height="68" rx="6" fill="currentColor" className="text-[var(--muted-bg)]" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />
            <text x="12" y="18" fill="currentColor" className="text-[var(--foreground)]" fontSize="10.5" fontFamily="monospace" fontWeight="bold">
              1. Task Perception
            </text>
            <text x="12" y="34" fill="currentColor" className="text-[var(--muted)]" fontSize="8.5" fontFamily="sans-serif">
              Observation x_t from world
            </text>
            <text x="12" y="47" fill="currentColor" className="text-[var(--muted)]" fontSize="8" fontFamily="monospace">
              Natural prose / JSON / memos
            </text>
            <text x="12" y="58" fill="#10b981" fontSize="8" fontFamily="monospace">
              Task Key &kappa;_t hidden
            </text>
          </g>

          {/* Connector 1A -> 1B */}
          <path d="M 210 96 L 250 96" stroke="#10b981" strokeWidth="1.5" markerEnd="url(#dl-arrow-blue)" />

          {/* Box 1B: Memory Substrate */}
          <g transform="translate(255, 62)">
            <rect x="0" y="0" width="200" height="68" rx="6" fill="currentColor" className="text-[var(--muted-bg)]" stroke="#10b981" strokeWidth="1.2" strokeOpacity="0.5" />
            <text x="12" y="18" fill="#10b981" fontSize="10.5" fontFamily="monospace" fontWeight="bold">
              2. Memory Retrieval
            </text>
            <text x="12" y="34" fill="currentColor" className="text-[var(--muted)]" fontSize="8.5" fontFamily="sans-serif">
              Substrate: Notes · World Model · Transcript
            </text>
            <text x="12" y="47" fill="currentColor" className="text-[var(--muted)]" fontSize="8" fontFamily="monospace">
              Beliefs / procedure lookup
            </text>
            <text x="12" y="58" fill="currentColor" className="text-[var(--foreground)]" fontSize="8" fontFamily="monospace" fontWeight="semibold">
              Controlled Independent Variable
            </text>
          </g>

          {/* Connector 1B -> 1C */}
          <path d="M 455 96 L 495 96" stroke="#10b981" strokeWidth="1.5" markerEnd="url(#dl-arrow-indigo)" />

          {/* Box 1C: Model Policy */}
          <g transform="translate(500, 62)">
            <rect x="0" y="0" width="180" height="68" rx="6" fill="currentColor" className="text-[var(--muted-bg)]" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />
            <text x="12" y="18" fill="currentColor" className="text-[var(--foreground)]" fontSize="10.5" fontFamily="monospace" fontWeight="bold">
              3. LLM Action Emission
            </text>
            <text x="12" y="34" fill="currentColor" className="text-[var(--muted)]" fontSize="8.5" fontFamily="sans-serif">
              Pinned Model: Luna · DeepSeek · Qwen
            </text>
            <text x="12" y="47" fill="currentColor" className="text-[var(--muted)]" fontSize="8" fontFamily="monospace">
              Produces: Action a_t &isin; A
            </text>
            <text x="12" y="58" fill="#888888" fontSize="8" fontFamily="monospace">
              Confidence elicited: p_t &isin; [0, 1]
            </text>
          </g>

          {/* Connector 1C -> 1D */}
          <path d="M 680 96 L 720 96" stroke="#10b981" strokeWidth="1.5" markerEnd="url(#dl-arrow-blue)" />

          {/* Box 1D: Feedback & Consolidation */}
          <g transform="translate(725, 62)">
            <rect x="0" y="0" width="180" height="68" rx="6" fill="currentColor" className="text-[var(--muted-bg)]" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />
            <text x="12" y="18" fill="currentColor" className="text-[var(--foreground)]" fontSize="10.5" fontFamily="monospace" fontWeight="bold">
              4. Consolidation Loop
            </text>
            <text x="12" y="34" fill="currentColor" className="text-[var(--muted)]" fontSize="8.5" fontFamily="sans-serif">
              In-role feedback &amp; reward r_t
            </text>
            <text x="12" y="47" fill="currentColor" className="text-[var(--muted)]" fontSize="8" fontFamily="monospace">
              Partial view / delayed &tau; steps
            </text>
            <text x="12" y="58" fill="#10b981" fontSize="8" fontFamily="monospace">
              Updates substrate state
            </text>
          </g>


          {/* =========================================================================
              LANE 2: SEEDED WORLD & DRIFT SCHEDULER (MIDDLE)
              ========================================================================= */}
          <rect
            x="20"
            y="160"
            width="900"
            height="135"
            rx="10"
            fill="currentColor"
            className="text-[var(--card)]"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="none"
          />
          <rect
            x="20"
            y="160"
            width="900"
            height="135"
            rx="10"
            fill="#f59e0b"
            fillOpacity="0.03"
            stroke="#f59e0b"
            strokeWidth="1.2"
            strokeOpacity="0.4"
          />

          {/* Lane 2 Header Badge */}
          <g transform="translate(35, 174)">
            <rect x="0" y="0" width="185" height="20" rx="4" fill="#f59e0b" fillOpacity="0.12" stroke="#f59e0b" strokeWidth="1" strokeOpacity="0.3" />
            <text x="92" y="14" textAnchor="middle" fill="#f59e0b" fontSize="9.5" fontFamily="monospace" fontWeight="bold">
              02 · WORLD SIMULATION &amp; DRIFT
            </text>
            <text x="195" y="14" fill="currentColor" className="text-[var(--muted)]" fontSize="9" fontFamily="monospace">
              6 Deterministic Worlds (rule, form, inventory, code, claims, campaign) · Seed-Paired
            </text>
          </g>

          {/* Sub-blocks in Lane 2 */}
          {/* Seed Generator */}
          <g transform="translate(40, 202)">
            <rect x="0" y="0" width="170" height="78" rx="6" fill="currentColor" className="text-[var(--muted-bg)]" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />
            <text x="12" y="18" fill="currentColor" className="text-[var(--foreground)]" fontSize="10" fontFamily="monospace" fontWeight="bold">
              Seeded Environment
            </text>
            <text x="12" y="34" fill="currentColor" className="text-[var(--muted)]" fontSize="8" fontFamily="sans-serif">
              Integer seed s &isin; S generates:
            </text>
            <text x="12" y="47" fill="currentColor" className="text-[var(--muted)]" fontSize="8" fontFamily="monospace">
              · Byte-identical episode
            </text>
            <text x="12" y="58" fill="currentColor" className="text-[var(--muted)]" fontSize="8" fontFamily="monospace">
              · Signal-free surface detail
            </text>
            <text x="12" y="69" fill="#10b981" fontSize="8" fontFamily="monospace">
              Ground truth f_t(&kappa;_t) locked
            </text>
          </g>

          {/* Connector Seed -> Topologies */}
          <path d="M 210 241 L 250 241" stroke="#f59e0b" strokeWidth="1.5" markerEnd="url(#dl-arrow-amber)" />

          {/* 5 Drift Topologies Box */}
          <g transform="translate(255, 202)">
            <rect x="0" y="0" width="425" height="78" rx="6" fill="currentColor" className="text-[var(--muted-bg)]" stroke="#f59e0b" strokeWidth="1.2" strokeOpacity="0.5" />
            <div className="flex justify-between">
              <text x="12" y="17" fill="#f59e0b" fontSize="10" fontFamily="monospace" fontWeight="bold">
                20 Protocols Exercising 5 Drift Topologies
              </text>
              <text x="410" y="17" textAnchor="end" fill="currentColor" className="text-[var(--muted)]" fontSize="8" fontFamily="monospace">
                Controlled Variable
              </text>
            </div>

            <g transform="translate(12, 26)" fontSize="8" fontFamily="monospace">
              <rect x="0" y="0" width="95" height="20" rx="3" fill="#f59e0b" fillOpacity="0.1" />
              <text x="47" y="13" textAnchor="middle" fill="currentColor" className="text-[var(--foreground)] font-semibold">1. Abrupt Rule</text>

              <rect x="102" y="0" width="95" height="20" rx="3" fill="#10b981" fillOpacity="0.1" />
              <text x="149" y="13" textAnchor="middle" fill="currentColor" className="text-[var(--foreground)] font-semibold">2. Gradual Truth</text>

              <rect x="204" y="0" width="95" height="20" rx="3" fill="#10b981" fillOpacity="0.1" />
              <text x="251" y="13" textAnchor="middle" fill="currentColor" className="text-[var(--foreground)] font-semibold">3. Cosmetic Shift</text>

              <rect x="306" y="0" width="95" height="20" rx="3" fill="#ef4444" fillOpacity="0.1" />
              <text x="353" y="13" textAnchor="middle" fill="currentColor" className="text-[var(--foreground)] font-semibold">4. Endogenous</text>

              <rect x="0" y="25" width="401" height="19" rx="3" fill="#10b981" fillOpacity="0.08" />
              <text x="200" y="38" textAnchor="middle" fill="#10b981" fontWeight="bold">5. Adversarial Co-Adapting Opponent (claims fraud ring shifts against agent approvals)</text>
            </g>
          </g>

          {/* Connector Topologies -> Protocol Arm */}
          <path d="M 680 241 L 720 241" stroke="#f59e0b" strokeWidth="1.5" markerEnd="url(#dl-arrow-amber)" />

          {/* Protocol Arming */}
          <g transform="translate(725, 202)">
            <rect x="0" y="0" width="180" height="78" rx="6" fill="currentColor" className="text-[var(--muted-bg)]" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />
            <text x="12" y="18" fill="currentColor" className="text-[var(--foreground)]" fontSize="10" fontFamily="monospace" fontWeight="bold">
              Regime Injection
            </text>
            <text x="12" y="34" fill="currentColor" className="text-[var(--muted)]" fontSize="8" fontFamily="sans-serif">
              Triggers change event c:
            </text>
            <text x="12" y="47" fill="#f59e0b" fontSize="8" fontFamily="monospace">
              c = (t_c, A_c) @ step t_c
            </text>
            <text x="12" y="58" fill="currentColor" className="text-[var(--muted)]" fontSize="8" fontFamily="monospace">
              Affects key subset A_c
            </text>
            <text x="12" y="69" fill="#10b981" fontSize="8" fontFamily="monospace">
              Agent never notified
            </text>
          </g>


          {/* =========================================================================
              LANE 3: PARALLEL TRUTH LEDGER & STATISTICAL ENGINE (BOTTOM)
              ========================================================================= */}
          <rect
            x="20"
            y="310"
            width="900"
            height="150"
            rx="10"
            fill="currentColor"
            className="text-[var(--card)]"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="none"
          />
          <rect
            x="20"
            y="310"
            width="900"
            height="150"
            rx="10"
            fill="#10b981"
            fillOpacity="0.03"
            stroke="#10b981"
            strokeWidth="1.2"
            strokeOpacity="0.4"
          />

          {/* Lane 3 Header Badge */}
          <g transform="translate(35, 324)">
            <rect x="0" y="0" width="220" height="20" rx="4" fill="#10b981" fillOpacity="0.12" stroke="#10b981" strokeWidth="1" strokeOpacity="0.3" />
            <text x="110" y="14" textAnchor="middle" fill="#10b981" fontSize="9.5" fontFamily="monospace" fontWeight="bold">
              03 · EVALUATOR &amp; STATISTICAL LEDGER
            </text>
            <text x="230" y="14" fill="currentColor" className="text-[var(--muted)]" fontSize="9" fontFamily="monospace">
              Immutable per-step run record &middot; Evaluated post hoc &middot; Paired effects (95% CI)
            </text>
          </g>

          {/* Lane 3 Components */}
          {/* Append-Only Run Record */}
          <g transform="translate(40, 352)">
            <rect x="0" y="0" width="260" height="92" rx="6" fill="currentColor" className="text-[var(--muted-bg)]" stroke="#10b981" strokeWidth="1" strokeOpacity="0.5" />
            <text x="12" y="18" fill="#10b981" fontSize="10.5" fontFamily="monospace" fontWeight="bold">
              Immutable Run Record
            </text>
            <text x="12" y="32" fill="currentColor" className="text-[var(--muted)]" fontSize="8" fontFamily="sans-serif">
              Logged per step t (invisible to agent):
            </text>
            <g transform="translate(12, 40)" fontSize="8" fontFamily="monospace" fill="currentColor" className="text-[var(--foreground)]">
              <text x="0" y="10">&middot; Observation x_t &amp; Reply a_t</text>
              <text x="0" y="22">&middot; Latent Key &kappa;_t &amp; True Action f_t(&kappa;_t)</text>
              <text x="0" y="34">&middot; Reward r_t &amp; Stated Confidence p_t</text>
              <text x="0" y="46">&middot; Exact Change Point c = (t_c, A_c)</text>
            </g>
          </g>

          {/* Connector Record -> Calculus */}
          <path d="M 300 398 L 340 398" stroke="#10b981" strokeWidth="1.5" markerEnd="url(#dl-arrow-emerald)" />

          {/* Encounter-Based Adaptation Calculus */}
          <g transform="translate(345, 352)">
            <rect x="0" y="0" width="310" height="92" rx="6" fill="currentColor" className="text-[var(--muted-bg)]" stroke="#10b981" strokeWidth="1.2" strokeOpacity="0.5" />
            <text x="12" y="18" fill="#10b981" fontSize="10.5" fontFamily="monospace" fontWeight="bold">
              Encounter-Based Calculus (Unit: k)
            </text>
            <g transform="translate(12, 28)" fontSize="8.5" fontFamily="monospace">
              <text x="0" y="12" fill="currentColor" className="text-[var(--foreground)]">
                &bull; <tspan fontWeight="bold" fill="#10b981">Detection d(c):</tspan> min&#123;k : a_k &ne; f^-(k)&#125; (old rule stops)
              </text>
              <text x="0" y="25" fill="currentColor" className="text-[var(--foreground)]">
                &bull; <tspan fontWeight="bold" fill="#10b981">Recovery &rho;(c):</tspan> min&#123;k : y_k = 1&#125; (first correct)
              </text>
              <text x="0" y="38" fill="currentColor" className="text-[var(--foreground)]">
                &bull; <tspan fontWeight="bold" fill="#10b981">Retention R(c):</tspan> Mean accuracy in window k &isin; [9..38]
              </text>
              <text x="0" y="51" fill="currentColor" className="text-[var(--foreground)]">
                &bull; <tspan fontWeight="bold" fill="#ef4444">Staleness S(c):</tspan> Relapses to obsolete f^- after recovery
              </text>
              <text x="0" y="64" fill="currentColor" className="text-[var(--foreground)]">
                &bull; <tspan fontWeight="bold" fill="#f59e0b">Over-Update U:</tspan> P(a_next &ne; a | correct, r &le; 0)
              </text>
            </g>
          </g>

          {/* Connector Calculus -> Paired Effects */}
          <path d="M 655 398 L 695 398" stroke="#10b981" strokeWidth="1.5" markerEnd="url(#dl-arrow-emerald)" />

          {/* Paired Statistical Validator */}
          <g transform="translate(700, 352)">
            <rect x="0" y="0" width="205" height="92" rx="6" fill="currentColor" className="text-[var(--muted-bg)]" stroke="#10b981" strokeWidth="1" strokeOpacity="0.4" />
            <text x="12" y="18" fill="#10b981" fontSize="10.5" fontFamily="monospace" fontWeight="bold">
              Paired Statistical Engine
            </text>
            <text x="12" y="32" fill="currentColor" className="text-[var(--muted)]" fontSize="8" fontFamily="sans-serif">
              Matched seed differences:
            </text>
            <g transform="translate(12, 40)" fontSize="8" fontFamily="monospace">
              <text x="0" y="10" fill="currentColor" className="text-[var(--foreground)] font-bold">
                &Delta; = (1/|S|) &Sigma; [m_B(s) - m_A(s)]
              </text>
              <text x="0" y="23" fill="#10b981">
                95% Bootstrap CI over seeds
              </text>
              <text x="0" y="35" fill="currentColor" className="text-[var(--muted)]">
                Automated Hypothesis Check:
              </text>
              <text x="0" y="47" fill="#10b981" fontWeight="bold">
                Supported &middot; Contradicted &middot; Null
              </text>
            </g>
          </g>


          {/* =========================================================================
              INTER-LANE DATA FLOW CONNECTORS (VERTICAL / CURVED)
              ========================================================================= */}
          {/* Agent Action down to World Evaluation (Right side) */}
          <path
            d="M 590 130 L 590 160"
            stroke="#10b981"
            strokeWidth="1.5"
            strokeDasharray="4 3"
            markerEnd="url(#dl-arrow-blue)"
          />

          {/* World observation up to Agent (Left side) */}
          <path
            d="M 125 202 L 125 130"
            stroke="#f59e0b"
            strokeWidth="1.5"
            strokeDasharray="4 3"
            markerEnd="url(#dl-arrow-amber)"
          />

          {/* Latent Truth tap down to Ledger */}
          <path
            d="M 170 280 L 170 352"
            stroke="#10b981"
            strokeWidth="1.5"
            markerEnd="url(#dl-arrow-emerald)"
          />
          <text x="175" y="304" fill="#10b981" fontSize="8" fontFamily="monospace" fontWeight="bold">
            Ground Truth f_t Stream
          </text>

          {/* Opaque Boundary Notice on right */}
          <line x1="20" y1="148" x2="920" y2="148" stroke="#888888" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.3" />
          <text x="915" y="145" textAnchor="end" fill="#888888" fontSize="7.5" fontFamily="monospace" fontStyle="italic">
            --- STRICT SANDBOX BOUNDARY: Agent never observes hidden world state; evaluator never reads agent memory ---
          </text>
        </svg>
      </div>

      {/* Schematic Footer Note */}
      <div className="mt-4 pt-3 border-t border-[var(--border)] flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-[var(--muted)]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>Closed-Loop Architecture: Evaluation is pure post hoc function of immutable ledger records</span>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-emerald-600 dark:text-emerald-400">
          <span>Zero-Leakage Guarantee · Paired Bootstrap Statistics</span>
        </div>
      </div>
    </div>
  );
}
