"use client";

import React from "react";

export function ObservabilityArchitectureDiagram() {
  return (
    <div className="w-full my-6 rounded-[14px] border border-[var(--border)] bg-[var(--card)] p-4 sm:p-6 shadow-sm overflow-hidden select-none">
      {/* Schematic Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b border-[var(--border)]">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--foreground)]">
            Universal LLM Observability — Multi-Layer System Architecture
          </span>
        </div>
        <span className="text-[10px] font-mono text-[var(--muted)]">
          console (Next.js) · orchestra (FastAPI) · unify (Python SDK) · GCP / GCS (Infra &amp; Storage)
        </span>
      </div>

      <div className="w-full overflow-x-auto">
        <svg
          viewBox="0 0 940 480"
          className="w-full min-w-[880px] h-auto"
          style={{ fontVariantNumeric: "tabular-nums" }}
        >
          <defs>
            <marker
              id="obs-arrow"
              viewBox="0 0 10 10"
              refX="6"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="var(--muted)" opacity="0.8" />
            </marker>
            <marker
              id="obs-arrow-green"
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
              id="obs-arrow-cyan"
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
              id="obs-arrow-amber"
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
          {/* LAYER 1: unify (PYTHON CLIENT API & PROVIDER GATEWAY)                     */}
          {/* ========================================================================= */}
          <g transform="translate(20, 20)">
            <rect
              width="265"
              height="260"
              rx="12"
              fill="var(--card)"
              stroke="#10b981"
              strokeWidth="1.5"
              strokeOpacity="0.4"
            />
            {/* Header pill */}
            <rect x="14" y="14" width="75" height="20" rx="4" fill="rgba(16,185,129,0.12)" />
            <text x="51.5" y="28" fontSize="10" fontFamily="monospace" fontWeight="bold" fill="#10b981" textAnchor="middle">
              unify
            </text>
            <text x="96" y="28" fontSize="11" fontWeight="600" fill="var(--foreground)">
              Python Client SDK
            </text>
            <text x="14" y="48" fontSize="9" fill="var(--muted)">
              Application runtime instrumentation &amp; gateway
            </text>

            {/* Inner Module 1: Universal LLM Query Engine */}
            <g transform="translate(12, 60)">
              <rect width="241" height="54" rx="8" fill="var(--muted-bg)" stroke="var(--border)" strokeWidth="1" />
              <text x="10" y="18" fontSize="10" fontWeight="bold" fill="var(--foreground)">
                Universal LLM API Router
              </text>
              <text x="10" y="32" fontSize="8.5" fill="var(--muted)">
                Maps OpenAI, Anthropic, Gemini, Bedrock
              </text>
              <text x="10" y="44" fontSize="8.5" fontFamily="monospace" fill="#10b981">
                unify.chat(model=&quot;...&quot;, prompt=&quot;...&quot;)
              </text>
            </g>

            {/* Inner Module 2: @unify.traced Decorator */}
            <g transform="translate(12, 122)">
              <rect width="241" height="58" rx="8" fill="var(--muted-bg)" stroke="var(--border)" strokeWidth="1" />
              <div className="flex items-center">
                <text x="10" y="18" fontSize="10" fontWeight="bold" fill="#10b981">
                  @unify.traced Auto-Logger
                </text>
              </div>
              <text x="10" y="32" fontSize="8.5" fill="var(--muted)">
                Inspects function AST, wraps inputs &amp; returns
              </text>
              <text x="10" y="46" fontSize="8.5" fill="var(--muted)">
                Captures call hierarchy, spans &amp; token metrics
              </text>
            </g>

            {/* Inner Module 3: Non-blocking Async Telemetry Buffer */}
            <g transform="translate(12, 188)">
              <rect width="241" height="58" rx="8" fill="var(--muted-bg)" stroke="var(--border)" strokeWidth="1" />
              <text x="10" y="18" fontSize="10" fontWeight="bold" fill="var(--foreground)">
                Async Telemetry Worker
              </text>
              <text x="10" y="32" fontSize="8.5" fill="var(--muted)">
                Background queue · zero user latency impact
              </text>
              <text x="10" y="46" fontSize="8.5" fontFamily="monospace" fill="var(--muted)">
                POST /logs &amp; /traces batch ingest
              </text>
            </g>
          </g>

          {/* ========================================================================= */}
          {/* LAYER 2: orchestra (FASTAPI / POSTGRES BACKEND ENGINE)                    */}
          {/* ========================================================================= */}
          <g transform="translate(330, 20)">
            <rect
              width="280"
              height="260"
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
              Logging Backend &amp; API
            </text>
            <text x="14" y="48" fontSize="9" fill="var(--muted)">
              FastAPI ingestion service &amp; state management
            </text>

            {/* Inner Module 1: Ingestion & Validation Endpoints */}
            <g transform="translate(12, 60)">
              <rect width="256" height="54" rx="8" fill="var(--muted-bg)" stroke="var(--border)" strokeWidth="1" />
              <text x="10" y="18" fontSize="10" fontWeight="bold" fill="var(--foreground)">
                REST Endpoints (/logs, /traces, /projects)
              </text>
              <text x="10" y="32" fontSize="8.5" fill="var(--muted)">
                Pydantic validation of arbitrary data structures
              </text>
              <text x="10" y="44" fontSize="8.5" fontFamily="monospace" fill="#06b6d4">
                25k req/s high-throughput ingress buffer
              </text>
            </g>

            {/* Inner Module 2: Telemetry Ingestion & Metadata */}
            <g transform="translate(12, 122)">
              <rect width="256" height="58" rx="8" fill="var(--muted-bg)" stroke="var(--border)" strokeWidth="1" />
              <text x="10" y="18" fontSize="10" fontWeight="bold" fill="var(--foreground)">
                Telemetry Storage &amp; Schema Validation
              </text>
              <text x="10" y="32" fontSize="8.5" fill="var(--muted)">
                Validates complex nested I/O &amp; execution spans
              </text>
              <text x="10" y="46" fontSize="8.5" fill="var(--muted)">
                Serves raw traces &amp; metadata to clients
              </text>
            </g>

            {/* Inner Module 3: Projects & Interfaces Schema Store */}
            <g transform="translate(12, 188)">
              <rect width="256" height="58" rx="8" fill="var(--muted-bg)" stroke="var(--border)" strokeWidth="1" />
              <text x="10" y="18" fontSize="10" fontWeight="bold" fill="var(--foreground)">
                Project &amp; Interface State
              </text>
              <text x="10" y="32" fontSize="8.5" fill="var(--muted)">
                Manages tiled configurations, views &amp; schemas
              </text>
              <text x="10" y="46" fontSize="8.5" fontFamily="monospace" fill="#06b6d4">
                PostgreSQL Relational DB + Redis Cache
              </text>
            </g>
          </g>

          {/* ========================================================================= */}
          {/* LAYER 3: console (FRONTEND NEXT.JS / REACT INTERACTION PLATFORM)          */}
          {/* ========================================================================= */}
          <g transform="translate(655, 20)">
            <rect
              width="265"
              height="260"
              rx="12"
              fill="var(--card)"
              stroke="#f59e0b"
              strokeWidth="1.5"
              strokeOpacity="0.4"
            />
            {/* Header pill */}
            <rect x="14" y="14" width="75" height="20" rx="4" fill="rgba(245,158,11,0.12)" />
            <text x="51.5" y="28" fontSize="10" fontFamily="monospace" fontWeight="bold" fill="#f59e0b" textAnchor="middle">
              console
            </text>
            <text x="96" y="28" fontSize="11" fontWeight="600" fill="var(--foreground)">
              Frontend Dashboard
            </text>
            <text x="14" y="48" fontSize="9" fill="var(--muted)">
              Next.js &amp; React tiled interface canvas
            </text>

            {/* Inner Module: 4 Quadrants Display */}
            <g transform="translate(12, 60)">
              <rect width="241" height="88" rx="8" fill="var(--muted-bg)" stroke="var(--border)" strokeWidth="1" />
              <text x="10" y="18" fontSize="10" fontWeight="bold" fill="var(--foreground)">
                4-Quadrant Tiled Canvas
              </text>
              <g transform="translate(10, 26)">
                <rect x="0" y="0" width="105" height="24" rx="4" fill="rgba(16,185,129,0.1)" stroke="#10b981" strokeWidth="0.8" />
                <text x="52.5" y="15" fontSize="8.5" fontFamily="monospace" fill="#10b981" textAnchor="middle">1. Data Table</text>

                <rect x="115" y="0" width="105" height="24" rx="4" fill="rgba(6,182,212,0.1)" stroke="#06b6d4" strokeWidth="0.8" />
                <text x="167.5" y="15" fontSize="8.5" fontFamily="monospace" fill="#06b6d4" textAnchor="middle">2. Plots (Speed/Evals)</text>

                <rect x="0" y="28" width="105" height="24" rx="4" fill="rgba(245,158,11,0.1)" stroke="#f59e0b" strokeWidth="0.8" />
                <text x="52.5" y="43" fontSize="8.5" fontFamily="monospace" fill="#f59e0b" textAnchor="middle">3. Diff Viewer</text>

                <rect x="115" y="28" width="105" height="24" rx="4" fill="rgba(168,85,247,0.1)" stroke="#a855f7" strokeWidth="0.8" />
                <text x="167.5" y="43" fontSize="8.5" fontFamily="monospace" fill="#a855f7" textAnchor="middle">4. Trace Viewer</text>
              </g>
            </g>

            {/* Inner Module: Dynamic Client-Side Diff & Customization */}
            <g transform="translate(12, 156)">
              <rect width="241" height="90" rx="8" fill="var(--muted-bg)" stroke="var(--border)" strokeWidth="1" />
              <text x="10" y="18" fontSize="10" fontWeight="bold" fill="#f59e0b">
                Dynamic Client-Side Diff Engine
              </text>
              <text x="10" y="32" fontSize="8.5" fill="var(--foreground)">
                Browser-side token alignment &amp; text deltas
              </text>
              <text x="10" y="46" fontSize="8.5" fill="var(--muted)">
                Zero backend round-trips for row comparisons
              </text>
              <text x="10" y="60" fontSize="8.5" fill="var(--muted)">
                Real-time WebSocket &amp; SSE telemetry streaming
              </text>
              <text x="10" y="74" fontSize="8.5" fontFamily="monospace" fill="#f59e0b">
                Custom tiled layout builder &amp; export
              </text>
            </g>
          </g>

          {/* ========================================================================= */}
          {/* CONNECTOR ARROWS BETWEEN TOP THREE REPOSITORIES                           */}
          {/* ========================================================================= */}
          {/* unify -> orchestra (Telemetry logging) */}
          <path
            d="M 285 105 L 324 105"
            fill="none"
            stroke="#10b981"
            strokeWidth="1.8"
            markerEnd="url(#obs-arrow-green)"
          />
          <text x="305" y="98" fontSize="8" fontFamily="monospace" fill="#10b981" textAnchor="middle">
            POST /logs
          </text>

          {/* orchestra <-> console (Data queries & WebSockets) */}
          <path
            d="M 610 105 L 649 105"
            fill="none"
            stroke="#06b6d4"
            strokeWidth="1.8"
            markerEnd="url(#obs-arrow-cyan)"
          />
          <text x="632" y="98" fontSize="8" fontFamily="monospace" fill="#06b6d4" textAnchor="middle">
            GET /traces
          </text>

          <path
            d="M 649 135 L 616 135"
            fill="none"
            stroke="#f59e0b"
            strokeWidth="1.5"
            strokeDasharray="3 3"
            markerEnd="url(#obs-arrow-amber)"
          />
          <text x="632" y="147" fontSize="8" fontFamily="monospace" fill="#f59e0b" textAnchor="middle">
            WS Stream
          </text>

          {/* ========================================================================= */}
          {/* LAYER 4: GCP / GCS (DEPLOYMENT INFRASTRUCTURE & SCALABLE DATA STORAGE)    */}
          {/* ========================================================================= */}
          <g transform="translate(20, 310)">
            <rect
              width="900"
              height="145"
              rx="12"
              fill="var(--card)"
              stroke="var(--border)"
              strokeWidth="1.5"
            />
            {/* Header pill */}
            <rect x="14" y="14" width="85" height="20" rx="4" fill="rgba(59,130,246,0.12)" />
            <text x="56.5" y="28" fontSize="10" fontFamily="monospace" fontWeight="bold" fill="#3b82f6" textAnchor="middle">
              GCP / GCS
            </text>
            <text x="106" y="28" fontSize="11" fontWeight="600" fill="var(--foreground)">
              Deployment Infrastructure &amp; Persistent Object Storage
            </text>
            <text x="14" y="48" fontSize="9" fill="var(--muted)">
              Scalable cloud deployment, container orchestration, managed databases &amp; blob storage
            </text>

            {/* 4 GCP Sub-components */}
            <g transform="translate(12, 60)">
              {/* Cloud Run / GKE */}
              <g transform="translate(0, 0)">
                <rect width="205" height="70" rx="8" fill="var(--muted-bg)" stroke="var(--border)" strokeWidth="1" />
                <text x="10" y="18" fontSize="10" fontWeight="bold" fill="var(--foreground)">
                  Cloud Run / GKE
                </text>
                <text x="10" y="32" fontSize="8.5" fill="var(--muted)">
                  Auto-scaling containers
                </text>
                <text x="10" y="44" fontSize="8.5" fill="var(--muted)">
                  Hosts console &amp; orchestra instances
                </text>
                <text x="10" y="58" fontSize="8.5" fontFamily="monospace" fill="#3b82f6">
                  Global Load Balancer + SSL
                </text>
              </g>

              {/* Cloud Storage (GCS) */}
              <g transform="translate(220, 0)">
                <rect width="215" height="70" rx="8" fill="var(--muted-bg)" stroke="var(--border)" strokeWidth="1" />
                <text x="10" y="18" fontSize="10" fontWeight="bold" fill="#10b981">
                  Google Cloud Storage (GCS)
                </text>
                <text x="10" y="32" fontSize="8.5" fill="var(--muted)">
                  Immutable trace blob storage
                </text>
                <text x="10" y="44" fontSize="8.5" fill="var(--muted)">
                  Stores large payloads, prompt spans
                </text>
                <text x="10" y="58" fontSize="8.5" fontFamily="monospace" fill="#10b981">
                  Parquet analytical partitions
                </text>
              </g>

              {/* Cloud SQL PostgreSQL */}
              <g transform="translate(450, 0)">
                <rect width="210" height="70" rx="8" fill="var(--muted-bg)" stroke="var(--border)" strokeWidth="1" />
                <text x="10" y="18" fontSize="10" fontWeight="bold" fill="#06b6d4">
                  Cloud SQL (PostgreSQL)
                </text>
                <text x="10" y="32" fontSize="8.5" fill="var(--muted)">
                  High-availability relational DB
                </text>
                <text x="10" y="44" fontSize="8.5" fill="var(--muted)">
                  Indexes projects, interfaces &amp; logs
                </text>
                <text x="10" y="58" fontSize="8.5" fontFamily="monospace" fill="#06b6d4">
                  B-tree &amp; GIN inverted indices
                </text>
              </g>

              {/* Redis Memorystore */}
              <g transform="translate(675, 0)">
                <rect width="201" height="70" rx="8" fill="var(--muted-bg)" stroke="var(--border)" strokeWidth="1" />
                <text x="10" y="18" fontSize="10" fontWeight="bold" fill="#f59e0b">
                  Cloud Memorystore (Redis)
                </text>
                <text x="10" y="32" fontSize="8.5" fill="var(--muted)">
                  Sub-millisecond caching
                </text>
                <text x="10" y="44" fontSize="8.5" fill="var(--muted)">
                  Live telemetry pub/sub message bus
                </text>
                <text x="10" y="58" fontSize="8.5" fontFamily="monospace" fill="#f59e0b">
                  Real-time rate-limit counters
                </text>
              </g>
            </g>
          </g>

          {/* Vertical Arrows Connecting orchestra/console down to GCP */}
          <path
            d="M 470 280 L 470 304"
            fill="none"
            stroke="#06b6d4"
            strokeWidth="1.5"
            strokeDasharray="2 2"
            markerEnd="url(#obs-arrow-cyan)"
          />
          <path
            d="M 780 280 L 780 304"
            fill="none"
            stroke="#f59e0b"
            strokeWidth="1.5"
            strokeDasharray="2 2"
            markerEnd="url(#obs-arrow-amber)"
          />
          <path
            d="M 152 280 L 152 304"
            fill="none"
            stroke="#10b981"
            strokeWidth="1.5"
            strokeDasharray="2 2"
            markerEnd="url(#obs-arrow-green)"
          />
        </svg>
      </div>

      {/* Schematic Legend */}
      <div className="mt-4 pt-3 border-t border-[var(--border)] flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-[var(--muted)]">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded bg-emerald-500/20 border border-emerald-500/40 inline-block" />
            <strong className="text-[var(--foreground)]">unify:</strong> Python Client SDK
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded bg-cyan-500/20 border border-cyan-500/40 inline-block" />
            <strong className="text-[var(--foreground)]">orchestra:</strong> Logging Backend API
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded bg-amber-500/20 border border-amber-500/40 inline-block" />
            <strong className="text-[var(--foreground)]">console:</strong> Frontend Dashboard
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded bg-blue-500/20 border border-blue-500/40 inline-block" />
            <strong className="text-[var(--foreground)]">GCP / GCS:</strong> Cloud Infrastructure
          </span>
        </div>
        <div>
          End-to-End Latency: <strong className="text-emerald-500">&lt; 45ms</strong> · Ingestion Throughput: <strong className="text-emerald-500">25k req/s</strong>
        </div>
      </div>
    </div>
  );
}
