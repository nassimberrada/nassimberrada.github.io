"use client";

import React from "react";

export function RouterArchitectureDiagram() {
  return (
    <div className="w-full my-6 rounded-[14px] border border-[var(--border)] bg-[var(--card)] p-4 sm:p-6 shadow-sm overflow-hidden select-none">
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b border-[var(--border)]">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--foreground)]">
            Neural Dispatch Pipeline &amp; Pareto Optimization Flow
          </span>
        </div>
        <span className="text-[10px] font-mono text-[var(--muted)]">
          Target Density: 4/10 · End-to-End Latency &lt; 14ms
        </span>
      </div>

      <div className="w-full overflow-x-auto">
        <svg
          viewBox="0 0 760 310"
          className="w-full min-w-[680px] h-auto"
          style={{ fontVariantNumeric: "tabular-nums" }}
        >
          <defs>
            <marker
              id="arch-arrow"
              viewBox="0 0 10 10"
              refX="6"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="var(--foreground)" opacity="0.6" />
            </marker>
            <marker
              id="arch-arrow-green"
              viewBox="0 0 10 10"
              refX="6"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#10b981" />
            </marker>
          </defs>

          {/* STAGE 1: INGRESS */}
          <g transform="translate(15, 80)">
            <rect
              width="110"
              height="80"
              rx="10"
              fill="var(--muted-bg)"
              stroke="var(--border)"
              strokeWidth="1.2"
            />
            <text
              x="55"
              y="26"
              textAnchor="middle"
              fontSize="9"
              fontFamily="monospace"
              fontWeight="700"
              fill="var(--muted)"
              letterSpacing="0.05em"
            >
              STAGE 01
            </text>
            <text
              x="55"
              y="44"
              textAnchor="middle"
              fontSize="12"
              fontFamily="sans-serif"
              fontWeight="700"
              fill="var(--foreground)"
            >
              User Prompt
            </text>
            <text
              x="55"
              y="62"
              textAnchor="middle"
              fontSize="9.5"
              fontFamily="monospace"
              fill="var(--muted)"
            >
              Arbitrary Query p
            </text>
          </g>

          {/* Connection 1 -> 2 */}
          <line
            x1="125"
            y1="120"
            x2="155"
            y2="120"
            stroke="var(--foreground)"
            strokeWidth="1.5"
            strokeOpacity="0.4"
            markerEnd="url(#arch-arrow)"
          />

          {/* STAGE 2: FEATURE ENCODER */}
          <g transform="translate(160, 60)">
            <rect
              width="135"
              height="120"
              rx="10"
              fill="var(--card)"
              stroke="var(--border)"
              strokeWidth="1.2"
            />
            <rect
              x="8"
              y="8"
              width="119"
              height="18"
              rx="4"
              fill="var(--muted-bg)"
            />
            <text
              x="67.5"
              y="20"
              textAnchor="middle"
              fontSize="8.5"
              fontFamily="monospace"
              fontWeight="700"
              fill="var(--muted)"
            >
              BERT ENCODER
            </text>
            <text
              x="67.5"
              y="46"
              textAnchor="middle"
              fontSize="11"
              fontFamily="sans-serif"
              fontWeight="700"
              fill="var(--foreground)"
            >
              Semantic Vector
            </text>
            <text
              x="67.5"
              y="64"
              textAnchor="middle"
              fontSize="10"
              fontFamily="monospace"
              fontWeight="600"
              fill="#10b981"
            >
              e(p) ∈ ℝ⁷⁶⁸
            </text>
            <line
              x1="14"
              y1="76"
              x2="121"
              y2="76"
              stroke="var(--border)"
              strokeWidth="1"
              strokeDasharray="2 2"
            />
            <text
              x="67.5"
              y="92"
              textAnchor="middle"
              fontSize="8.5"
              fontFamily="monospace"
              fill="var(--muted)"
            >
              Frozen Quantized
            </text>
            <text
              x="67.5"
              y="105"
              textAnchor="middle"
              fontSize="8.5"
              fontFamily="monospace"
              fill="var(--muted)"
            >
              Latency &lt; 2.4ms
            </text>
          </g>

          {/* Connection 2 -> 3 */}
          <line
            x1="295"
            y1="120"
            x2="325"
            y2="120"
            stroke="var(--foreground)"
            strokeWidth="1.5"
            strokeOpacity="0.4"
            markerEnd="url(#arch-arrow)"
          />

          {/* STAGE 3: NEURAL SCORING ENGINE */}
          <g transform="translate(330, 40)">
            <rect
              width="165"
              height="160"
              rx="12"
              fill="var(--card)"
              stroke="#10b981"
              strokeWidth="1.6"
              className="shadow-sm"
            />
            <rect
              x="10"
              y="10"
              width="145"
              height="20"
              rx="5"
              fill="#10b981"
              fillOpacity="0.12"
            />
            <text
              x="82.5"
              y="24"
              textAnchor="middle"
              fontSize="9"
              fontFamily="monospace"
              fontWeight="800"
              fill="#10b981"
            >
              SCORING FORWARD PASS
            </text>

            <text
              x="82.5"
              y="52"
              textAnchor="middle"
              fontSize="12"
              fontFamily="sans-serif"
              fontWeight="700"
              fill="var(--foreground)"
            >
              Logistic Regressor
            </text>

            <g transform="translate(15, 64)">
              <rect
                width="135"
                height="32"
                rx="6"
                fill="var(--muted-bg)"
                stroke="var(--border)"
                strokeWidth="1"
              />
              <text
                x="67.5"
                y="20"
                textAnchor="middle"
                fontSize="9.5"
                fontFamily="monospace"
                fontWeight="700"
                fill="var(--foreground)"
              >
                σ(wᵀ[BERT; m] + b)
              </text>
            </g>

            <text
              x="82.5"
              y="118"
              textAnchor="middle"
              fontSize="9"
              fontFamily="monospace"
              fill="var(--muted)"
            >
              Batch Query across M
            </text>

            <g transform="translate(15, 128)">
              <rect
                width="135"
                height="22"
                rx="4"
                fill="var(--muted-bg)"
              />
              <text
                x="67.5"
                y="15"
                textAnchor="middle"
                fontSize="8.5"
                fontFamily="monospace"
                fill="var(--foreground)"
              >
                Output: Quality σ∈[0, 1]
              </text>
            </g>
          </g>

          {/* LIVE BENCHMARK INFEED (Bottom-Up into Pareto Engine) */}
          <g transform="translate(520, 215)">
            <rect
              width="195"
              height="75"
              rx="10"
              fill="var(--muted-bg)"
              stroke="var(--border)"
              strokeWidth="1.2"
            />
            <text
              x="97.5"
              y="20"
              textAnchor="middle"
              fontSize="8.5"
              fontFamily="monospace"
              fontWeight="700"
              fill="var(--muted)"
            >
              RUNTIME BENCHMARKS
            </text>
            <text
              x="97.5"
              y="38"
              textAnchor="middle"
              fontSize="10"
              fontFamily="sans-serif"
              fontWeight="700"
              fill="var(--foreground)"
            >
              Continuous Probing
            </text>
            <text
              x="97.5"
              y="56"
              textAnchor="middle"
              fontSize="8.5"
              fontFamily="monospace"
              fill="var(--muted)"
            >
              TTFT · ITL · $/Token · Region
            </text>
          </g>

          {/* Feed Line from Benchmarks into Pareto Engine */}
          <path
            d="M 617.5 215 L 617.5 175"
            fill="none"
            stroke="var(--foreground)"
            strokeWidth="1.4"
            strokeOpacity="0.4"
            strokeDasharray="3 3"
            markerEnd="url(#arch-arrow)"
          />

          {/* Connection 3 -> 4 */}
          <line
            x1="495"
            y1="120"
            x2="520"
            y2="120"
            stroke="#10b981"
            strokeWidth="2"
            markerEnd="url(#arch-arrow-green)"
          />

          {/* STAGE 4: PARETO DISPATCH ENGINE */}
          <g transform="translate(525, 45)">
            <rect
              width="185"
              height="120"
              rx="12"
              fill="var(--card)"
              stroke="var(--border)"
              strokeWidth="1.4"
            />
            <rect
              x="10"
              y="10"
              width="165"
              height="18"
              rx="4"
              fill="var(--muted-bg)"
            />
            <text
              x="92.5"
              y="22"
              textAnchor="middle"
              fontSize="8.5"
              fontFamily="monospace"
              fontWeight="700"
              fill="var(--muted)"
            >
              MULTI-OBJECTIVE OPTIMIZER
            </text>
            <text
              x="92.5"
              y="46"
              textAnchor="middle"
              fontSize="11.5"
              fontFamily="sans-serif"
              fontWeight="700"
              fill="var(--foreground)"
            >
              Pareto Frontier Dispatch
            </text>

            <g transform="translate(12, 58)">
              <rect
                width="161"
                height="26"
                rx="5"
                fill="#10b981"
                fillOpacity="0.08"
                stroke="#10b981"
                strokeWidth="1"
              />
              <text
                x="80.5"
                y="17"
                textAnchor="middle"
                fontSize="9"
                fontFamily="monospace"
                fontWeight="700"
                fill="#10b981"
              >
                ℒ = a·Q-b·ITL-c·TTFT-d·$
              </text>
            </g>

            <text
              x="92.5"
              y="104"
              textAnchor="middle"
              fontSize="8.5"
              fontFamily="monospace"
              fill="var(--muted)"
            >
              Weights: Cost / Quality / Speed
            </text>
          </g>

          {/* Bottom Feed Label */}
          <text
            x="617.5"
            y="196"
            textAnchor="middle"
            fontSize="8"
            fontFamily="monospace"
            fill="var(--muted)"
          >
            Live Cost &amp; Latency SLAs
          </text>
        </svg>
      </div>

      {/* Editorial Explanatory Legend */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4 pt-4 border-t border-[var(--border)] text-xs">
        <div className="flex items-start gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
          <div>
            <div className="font-semibold text-[var(--foreground)] font-mono text-[11px]">
              Sub-14ms Neural Scoring
            </div>
            <p className="text-[11px] text-[var(--muted)] leading-relaxed mt-0.5">
              BERT embeddings evaluated in parallel batches across candidate models using a calibrated logistic head.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-500 mt-1.5 shrink-0" />
          <div>
            <div className="font-semibold text-[var(--foreground)] font-mono text-[11px]">
              Live Synthetic Probes
            </div>
            <p className="text-[11px] text-[var(--muted)] leading-relaxed mt-0.5">
              Continuous background polling measuring TTFT, ITL, cold starts, and batch dynamics across providers.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 shrink-0" />
          <div>
            <div className="font-semibold text-[var(--foreground)] font-mono text-[11px]">
              Tunable Pareto Frontier
            </div>
            <p className="text-[11px] text-[var(--muted)] leading-relaxed mt-0.5">
              Modular objective loss formulation lets operators dial weights for maximum savings or sub-70ms voice loops.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
