"use client";

import React from "react";

export function BenchmarkingArchitectureDiagram() {
  return (
    <div className="w-full my-6 rounded-[14px] border border-[var(--border)] bg-[var(--card)] p-4 sm:p-6 shadow-sm overflow-hidden select-none">
      {/* Schematic Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b border-[var(--border)]">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--foreground)]">
            LLM Evals &amp; Benchmarking — Multi-Repository Architecture
          </span>
        </div>
        <span className="text-[10px] font-mono text-[var(--muted)]">
          modelhub (Cloud Run) · orchestra (FastAPI) · unify (Python SDK) · GitHub Cron Jobs
        </span>
      </div>

      <div className="w-full overflow-x-auto">
        <svg
          viewBox="0 0 940 440"
          className="w-full min-w-[880px] h-auto"
          style={{ fontVariantNumeric: "tabular-nums" }}
        >
          <defs>
            <marker
              id="bench-arrow-green"
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
              id="bench-arrow-cyan"
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
              id="bench-arrow-purple"
              viewBox="0 0 10 10"
              refX="6"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#a855f7" />
            </marker>
            <marker
              id="bench-arrow-amber"
              viewBox="0 0 10 10"
              refX="6"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#f59e0b" />
            </marker>
          </defs>

          {/* ========================================================================= */}
          {/* BLOCK 1: GITHUB CRON JOBS (AUTOMATED PERIODIC BENCHMARK RUNNER)           */}
          {/* ========================================================================= */}
          <g transform="translate(20, 25)">
            <rect
              width="240"
              height="180"
              rx="12"
              fill="var(--card)"
              stroke="#a855f7"
              strokeWidth="1.5"
              strokeOpacity="0.4"
            />
            {/* Header pill */}
            <rect x="14" y="14" width="115" height="20" rx="4" fill="rgba(168,85,247,0.12)" />
            <text x="71.5" y="28" fontSize="10" fontFamily="monospace" fontWeight="bold" fill="#a855f7" textAnchor="middle">
              github cron jobs
            </text>
            <text x="14" y="48" fontSize="9" fill="var(--muted)">
              Automated multi-region cron schedules
            </text>

            <g transform="translate(12, 60)">
              <rect width="216" height="48" rx="7" fill="var(--muted-bg)" stroke="var(--border)" strokeWidth="1" />
              <text x="10" y="18" fontSize="10" fontWeight="bold" fill="var(--foreground)">
                Periodic GitHub Actions
              </text>
              <text x="10" y="32" fontSize="8.5" fontFamily="monospace" fill="#a855f7">
                schedule: &apos;0 */2 * * *&apos; (Every X hours)
              </text>
            </g>

            <g transform="translate(12, 116)">
              <rect width="216" height="50" rx="7" fill="var(--muted-bg)" stroke="var(--border)" strokeWidth="1" />
              <text x="10" y="17" fontSize="9.5" fontWeight="bold" fill="var(--foreground)">
                Public Benchmark Batteries
              </text>
              <text x="10" y="30" fontSize="8.5" fill="var(--muted)">
                Triggers probes across 50+ endpoints
              </text>
              <text x="10" y="42" fontSize="8.5" fill="var(--muted)">
                Matrix: MMLU, GSM8K, Streaming tests
              </text>
            </g>
          </g>

          {/* ========================================================================= */}
          {/* BLOCK 2: unify (PYTHON CLIENT SDK)                                        */}
          {/* ========================================================================= */}
          <g transform="translate(20, 235)">
            <rect
              width="240"
              height="180"
              rx="12"
              fill="var(--card)"
              stroke="#10b981"
              strokeWidth="1.5"
              strokeOpacity="0.4"
            />
            {/* Header pill */}
            <rect x="14" y="14" width="60" height="20" rx="4" fill="rgba(16,185,129,0.12)" />
            <text x="44" y="28" fontSize="10" fontFamily="monospace" fontWeight="bold" fill="#10b981" textAnchor="middle">
              unify
            </text>
            <text x="80" y="28" fontSize="11" fontWeight="600" fill="var(--foreground)">
              Python Client API
            </text>
            <text x="14" y="48" fontSize="9" fill="var(--muted)">
              Universal provider execution &amp; timing
            </text>

            <g transform="translate(12, 60)">
              <rect width="216" height="48" rx="7" fill="var(--muted-bg)" stroke="var(--border)" strokeWidth="1" />
              <text x="10" y="18" fontSize="10" fontWeight="bold" fill="var(--foreground)">
                Probe Execution Runner
              </text>
              <text x="10" y="32" fontSize="8.5" fontFamily="monospace" fill="#10b981">
                unify.benchmark(model, provider)
              </text>
            </g>

            <g transform="translate(12, 116)">
              <rect width="216" height="50" rx="7" fill="var(--muted-bg)" stroke="var(--border)" strokeWidth="1" />
              <text x="10" y="17" fontSize="9.5" fontWeight="bold" fill="var(--foreground)">
                Microsecond Telemetry Probe
              </text>
              <text x="10" y="30" fontSize="8.5" fill="var(--muted)">
                Streams response chunks via WebSockets
              </text>
              <text x="10" y="42" fontSize="8.5" fill="var(--muted)">
                Measures TTFT, ITL &amp; output entropy
              </text>
            </g>
          </g>

          {/* ========================================================================= */}
          {/* BLOCK 3: orchestra (BACKEND LOGIC & MULTI-REGION COORDINATOR)              */}
          {/* ========================================================================= */}
          <g transform="translate(325, 25)">
            <rect
              width="285"
              height="390"
              rx="12"
              fill="var(--card)"
              stroke="#06b6d4"
              strokeWidth="1.5"
              strokeOpacity="0.4"
            />
            {/* Header pill */}
            <rect x="14" y="14" width="85" height="20" rx="4" fill="rgba(6,182,212,0.12)" />
            <text x="56.5" y="28" fontSize="10" fontFamily="monospace" fontWeight="bold" fill="#06b6d4" textAnchor="middle">
              orchestra
            </text>
            <text x="106" y="28" fontSize="11" fontWeight="600" fill="var(--foreground)">
              Backend Logic &amp; Endpoints
            </text>
            <text x="14" y="48" fontSize="9" fill="var(--muted)">
              Dynamic trigger for endpoint × region measurements
            </text>

            {/* Inner Module 1: Trigger Endpoints */}
            <g transform="translate(12, 62)">
              <rect width="261" height="68" rx="8" fill="var(--muted-bg)" stroke="var(--border)" strokeWidth="1" />
              <text x="10" y="18" fontSize="10" fontWeight="bold" fill="var(--foreground)">
                Dynamic Trigger Endpoints
              </text>
              <text x="10" y="32" fontSize="8.5" fontFamily="monospace" fill="#06b6d4">
                POST /benchmark/trigger
              </text>
              <text x="10" y="46" fontSize="8.5" fill="var(--muted)">
                Dispatches targeted test battery per:
              </text>
              <text x="10" y="58" fontSize="8.5" fontFamily="monospace" fill="var(--foreground)">
                endpoint (model@provider) × region
              </text>
            </g>

            {/* Inner Module 2: Variance Filtering */}
            <g transform="translate(12, 138)">
              <rect width="261" height="68" rx="8" fill="var(--muted-bg)" stroke="var(--border)" strokeWidth="1" />
              <text x="10" y="18" fontSize="10" fontWeight="bold" fill="var(--foreground)">
                Statistical Variance Filtering
              </text>
              <text x="10" y="32" fontSize="8.5" fill="var(--muted)">
                Isolates external cloud jitter from model delays
              </text>
              <text x="10" y="46" fontSize="8.5" fill="var(--muted)">
                Calculates p50 median, p90, p95 tail metrics
              </text>
              <text x="10" y="58" fontSize="8.5" fontFamily="monospace" fill="#06b6d4">
                Detects silent upstream model degradation
              </text>
            </g>

            {/* Inner Module 3: Aggregated Metrics Store */}
            <g transform="translate(12, 214)">
              <rect width="261" height="68" rx="8" fill="var(--muted-bg)" stroke="var(--border)" strokeWidth="1" />
              <text x="10" y="18" fontSize="10" fontWeight="bold" fill="var(--foreground)">
                Multi-Region Historical Store
              </text>
              <text x="10" y="32" fontSize="8.5" fill="var(--muted)">
                PostgreSQL tables: historical latency timeseries
              </text>
              <text x="10" y="46" fontSize="8.5" fill="var(--muted)">
                Regions: us-east, us-west, eu-west, ap-se, sa-east
              </text>
              <text x="10" y="58" fontSize="8.5" fontFamily="monospace" fill="#06b6d4">
                Redis sub-second cache for active pings
              </text>
            </g>

            {/* Inner Module 4: Public APIs */}
            <g transform="translate(12, 290)">
              <rect width="261" height="88" rx="8" fill="var(--muted-bg)" stroke="var(--border)" strokeWidth="1" />
              <text x="10" y="18" fontSize="10" fontWeight="bold" fill="var(--foreground)">
                Public Query &amp; Leaderboard API
              </text>
              <text x="10" y="32" fontSize="8.5" fontFamily="monospace" fill="#06b6d4">
                GET /benchmarks?endpoint=...&amp;region=...
              </text>
              <text x="10" y="46" fontSize="8.5" fill="var(--muted)">
                Serves TTFT distributions, ITL streams, pricing
              </text>
              <text x="10" y="60" fontSize="8.5" fill="var(--muted)">
                High-throughput async endpoints in FastAPI
              </text>
              <text x="10" y="74" fontSize="8.5" fontFamily="monospace" fill="var(--muted)">
                Continuous sync to ModelHub UI
              </text>
            </g>
          </g>

          {/* ========================================================================= */}
          {/* BLOCK 4: modelhub (PUBLIC WEBAPP ON GCP CLOUD RUN)                        */}
          {/* ========================================================================= */}
          <g transform="translate(670, 25)">
            <rect
              width="250"
              height="390"
              rx="12"
              fill="var(--card)"
              stroke="#f59e0b"
              strokeWidth="1.5"
              strokeOpacity="0.4"
            />
            {/* Header pill */}
            <rect x="14" y="14" width="85" height="20" rx="4" fill="rgba(245,158,11,0.12)" />
            <text x="56.5" y="28" fontSize="10" fontFamily="monospace" fontWeight="bold" fill="#f59e0b" textAnchor="middle">
              modelhub
            </text>
            <text x="106" y="28" fontSize="11" fontWeight="600" fill="var(--foreground)">
              Public Web Application
            </text>
            <text x="14" y="48" fontSize="9" fill="var(--muted)">
              Deployed on GCP Cloud Run
            </text>

            {/* Module 1: Cloud Run Container */}
            <g transform="translate(12, 62)">
              <rect width="226" height="68" rx="8" fill="var(--muted-bg)" stroke="var(--border)" strokeWidth="1" />
              <text x="10" y="18" fontSize="10" fontWeight="bold" fill="var(--foreground)">
                GCP Cloud Run Hosting
              </text>
              <text x="10" y="32" fontSize="8.5" fill="var(--muted)">
                Next.js &amp; React containerized frontend
              </text>
              <text x="10" y="46" fontSize="8.5" fill="var(--muted)">
                Autoscaling edge service with Global CDN
              </text>
              <text x="10" y="58" fontSize="8.5" fontFamily="monospace" fill="#f59e0b">
                HTTPS custom domain routing
              </text>
            </g>

            {/* Module 2: Live Leaderboard */}
            <g transform="translate(12, 138)">
              <rect width="226" height="68" rx="8" fill="var(--muted-bg)" stroke="var(--border)" strokeWidth="1" />
              <text x="10" y="18" fontSize="10" fontWeight="bold" fill="var(--foreground)">
                Real-Time Provider Leaderboard
              </text>
              <text x="10" y="32" fontSize="8.5" fill="var(--muted)">
                Interactive model@provider selector
              </text>
              <text x="10" y="46" fontSize="8.5" fill="var(--muted)">
                Sort by TTFT, TPS throughput, token cost
              </text>
              <text x="10" y="58" fontSize="8.5" fontFamily="monospace" fill="#f59e0b">
                Pareto Frontier recommendation
              </text>
            </g>

            {/* Module 3: Multi-Region Plots */}
            <g transform="translate(12, 214)">
              <rect width="226" height="68" rx="8" fill="var(--muted-bg)" stroke="var(--border)" strokeWidth="1" />
              <text x="10" y="18" fontSize="10" fontWeight="bold" fill="var(--foreground)">
                Regional Latency &amp; ITL Plots
              </text>
              <text x="10" y="32" fontSize="8.5" fill="var(--muted)">
                Interactive distribution bars per region
              </text>
              <text x="10" y="46" fontSize="8.5" fill="var(--muted)">
                24h throughput stability line graphs
              </text>
              <text x="10" y="58" fontSize="8.5" fontFamily="monospace" fill="#f59e0b">
                Multi-region comparison matrix
              </text>
            </g>

            {/* Module 4: Public Artifacts */}
            <g transform="translate(12, 290)">
              <rect width="226" height="88" rx="8" fill="var(--muted-bg)" stroke="var(--border)" strokeWidth="1" />
              <text x="10" y="18" fontSize="10" fontWeight="bold" fill="var(--foreground)">
                Developer Analytics &amp; Exports
              </text>
              <text x="10" y="32" fontSize="8.5" fill="var(--muted)">
                Live status badges for open-source repos
              </text>
              <text x="10" y="46" fontSize="8.5" fill="var(--muted)">
                CSV/JSON benchmark exports
              </text>
              <text x="10" y="60" fontSize="8.5" fill="var(--muted)">
                Informs Neural Router optimization
              </text>
              <text x="10" y="74" fontSize="8.5" fontFamily="monospace" fill="var(--muted)">
                Cloud Run serverless latency &lt; 20ms
              </text>
            </g>
          </g>

          {/* ========================================================================= */}
          {/* FLOW ARROWS CONNECTING THE MODULES                                        */}
          {/* ========================================================================= */}
          {/* GitHub Cron -> unify */}
          <path
            d="M 140 205 L 140 231"
            fill="none"
            stroke="#a855f7"
            strokeWidth="1.8"
            markerEnd="url(#bench-arrow-purple)"
          />
          <text x="146" y="222" fontSize="8" fontFamily="monospace" fill="#a855f7">
            Cron Trigger
          </text>

          {/* unify -> orchestra (trigger probe & send telemetry) */}
          <path
            d="M 260 300 L 321 300"
            fill="none"
            stroke="#10b981"
            strokeWidth="1.8"
            markerEnd="url(#bench-arrow-green)"
          />
          <text x="290" y="293" fontSize="8" fontFamily="monospace" fill="#10b981" textAnchor="middle">
            POST probe
          </text>

          {/* orchestra -> modelhub (serve benchmark telemetry) */}
          <path
            d="M 610 180 L 666 180"
            fill="none"
            stroke="#06b6d4"
            strokeWidth="1.8"
            markerEnd="url(#bench-arrow-cyan)"
          />
          <text x="638" y="173" fontSize="8" fontFamily="monospace" fill="#06b6d4" textAnchor="middle">
            GET data
          </text>

          <path
            d="M 666 210 L 614 210"
            fill="none"
            stroke="#f59e0b"
            strokeWidth="1.5"
            strokeDasharray="3 3"
            markerEnd="url(#bench-arrow-amber)"
          />
          <text x="638" y="222" fontSize="8" fontFamily="monospace" fill="#f59e0b" textAnchor="middle">
            User Query
          </text>
        </svg>
      </div>

      {/* Schematic Legend */}
      <div className="mt-4 pt-3 border-t border-[var(--border)] flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-[var(--muted)]">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded bg-purple-500/20 border border-purple-500/40 inline-block" />
            <strong className="text-[var(--foreground)]">github cron jobs:</strong> Hourly Probe Triggers
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded bg-emerald-500/20 border border-emerald-500/40 inline-block" />
            <strong className="text-[var(--foreground)]">unify:</strong> Python Client SDK
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded bg-cyan-500/20 border border-cyan-500/40 inline-block" />
            <strong className="text-[var(--foreground)]">orchestra:</strong> Dynamic Trigger &amp; Stats Backend
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded bg-amber-500/20 border border-amber-500/40 inline-block" />
            <strong className="text-[var(--foreground)]">modelhub:</strong> GCP Cloud Run WebApp
          </span>
        </div>
        <div>
          500k Daily Benchmark Runs · 50+ Providers Tracked
        </div>
      </div>
    </div>
  );
}
