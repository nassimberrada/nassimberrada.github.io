"use client";

import React from "react";

export function TeammatesArchitectureDiagram() {
  return (
    <div className="w-full my-6 rounded-[14px] border border-[var(--border)] bg-[var(--card)] p-4 sm:p-6 shadow-sm overflow-hidden select-none">
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b border-[var(--border)]">
        <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--foreground)]">
          Autonomous AI Teammates — Multi-Repository System Architecture
        </span>
        <span className="text-[10px] font-mono text-[var(--muted)]">
          Dual-Brain &amp; CodeAct Engine: console · orchestra · unify · unillm · communication · deploy
        </span>
      </div>

      <div className="w-full overflow-x-auto">
        <svg
          viewBox="0 0 940 500"
          className="w-full min-w-[880px] h-auto"
          style={{ fontVariantNumeric: "tabular-nums" }}
        >
          <defs>
            <marker
              id="team-arrow"
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
              id="team-arrow-green"
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
              id="team-arrow-cyan"
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
              id="team-steer-arrow"
              viewBox="0 0 10 10"
              refX="6"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#a855f7" />
            </marker>
          </defs>

          {/* ============================================================= */}
          {/* TOP ROW: Ingress, API Gateway & Omnichannel Comms             */}
          {/* ============================================================= */}

          {/* 1. CONSOLE (Frontend User Platform) */}
          <g transform="translate(25, 25)">
            <rect
              width="270"
              height="165"
              rx="12"
              fill="var(--muted-bg)"
              stroke="var(--border)"
              strokeWidth="1.3"
            />
            <rect
              x="12"
              y="12"
              width="78"
              height="18"
              rx="4"
              fill="#10b981"
              fillOpacity="0.15"
              stroke="#10b981"
              strokeWidth="1"
            />
            <text x="51" y="24.5" textAnchor="middle" fontSize="9" fontFamily="monospace" fontWeight="700" fill="#10b981">
              CONSOLE
            </text>
            <text x="12" y="52" fontSize="13.5" fontFamily="sans-serif" fontWeight="700" fill="var(--foreground)">
              Frontend User Platform
            </text>
            <text x="12" y="68" fontSize="10" fontFamily="mono" fill="var(--muted)">
              Next.js · React · WebRTC Stream · Tailwind
            </text>
            <line x1="12" y1="78" x2="258" y2="78" stroke="var(--border)" strokeWidth="1" />
            
            <g transform="translate(12, 92)" fontSize="9.5" fontFamily="sans-serif" fill="var(--foreground)">
              <text y="0">• Real-time chat &amp; low-latency WebRTC calls</text>
              <text y="16">• Live screen perception &amp; frame observation</text>
              <text y="32">• Mid-flight steering: pause, interject, resume</text>
              <text y="48">• Full action execution &amp; diff trace inspector</text>
            </g>
          </g>

          {/* 2. ORCHESTRA (Backend Layer & Persistent Store) */}
          <g transform="translate(335, 25)">
            <rect
              width="270"
              height="165"
              rx="12"
              fill="var(--card)"
              stroke="var(--border)"
              strokeWidth="1.3"
            />
            <rect
              x="12"
              y="12"
              width="85"
              height="18"
              rx="4"
              fill="#06b6d4"
              fillOpacity="0.15"
              stroke="#06b6d4"
              strokeWidth="1"
            />
            <text x="54.5" y="24.5" textAnchor="middle" fontSize="9" fontFamily="monospace" fontWeight="700" fill="#06b6d4">
              ORCHESTRA
            </text>
            <text x="12" y="52" fontSize="13.5" fontFamily="sans-serif" fontWeight="700" fill="var(--foreground)">
              Backend Management API
            </text>
            <text x="12" y="68" fontSize="10" fontFamily="mono" fill="var(--muted)">
              FastAPI · PostgreSQL · Redis · Async Queue
            </text>
            <line x1="12" y1="78" x2="258" y2="78" stroke="var(--border)" strokeWidth="1" />
            
            <g transform="translate(12, 92)" fontSize="9.5" fontFamily="sans-serif" fill="var(--foreground)">
              <text y="0">• Assistant identity, RBAC &amp; credentials</text>
              <text y="16">• Typed relational tables (Contacts, Tasks, Files)</text>
              <text y="32">• Memory consolidation pass every 50 messages</text>
              <text y="48">• Multi-assistant organization context sharing</text>
            </g>
          </g>

          {/* 3. COMMUNICATION (Third-Party Omnichannel Infrastructure) */}
          <g transform="translate(645, 25)">
            <rect
              width="270"
              height="165"
              rx="12"
              fill="var(--muted-bg)"
              stroke="var(--border)"
              strokeWidth="1.3"
            />
            <rect
              x="12"
              y="12"
              width="105"
              height="18"
              rx="4"
              fill="#f59e0b"
              fillOpacity="0.15"
              stroke="#f59e0b"
              strokeWidth="1"
            />
            <text x="64.5" y="24.5" textAnchor="middle" fontSize="9" fontFamily="monospace" fontWeight="700" fill="#f59e0b">
              COMMUNICATION
            </text>
            <text x="12" y="52" fontSize="13.5" fontFamily="sans-serif" fontWeight="700" fill="var(--foreground)">
              Omnichannel Comms Infra
            </text>
            <text x="12" y="68" fontSize="10" fontFamily="mono" fill="var(--muted)">
              Twilio · SendGrid · WhatsApp · Connectors
            </text>
            <line x1="12" y1="78" x2="258" y2="78" stroke="var(--border)" strokeWidth="1" />
            
            <g transform="translate(12, 92)" fontSize="9.5" fontFamily="sans-serif" fill="var(--foreground)">
              <text y="0">• Dedicated assistant phone &amp; SMS lines</text>
              <text y="16">• Inbound/Outbound corporate email gateway</text>
              <text y="32">• WhatsApp Business API integration</text>
              <text y="48">• Third-party connectors (Slack, Teams, Meet)</text>
            </g>
          </g>

          {/* Ingress Connecting Arrows Top Row */}
          <line x1="295" y1="105" x2="335" y2="105" stroke="var(--border)" strokeWidth="1.5" markerEnd="url(#team-arrow)" />
          <line x1="605" y1="105" x2="645" y2="105" stroke="var(--border)" strokeWidth="1.5" markerEnd="url(#team-arrow)" />

          {/* Vertical Connecting Arrows from Top Row to Bottom Row */}
          <line x1="160" y1="190" x2="160" y2="265" stroke="#10b981" strokeWidth="1.5" markerEnd="url(#team-arrow-green)" />
          <line x1="470" y1="190" x2="330" y2="265" stroke="#06b6d4" strokeWidth="1.5" markerEnd="url(#team-arrow-cyan)" />
          <line x1="780" y1="190" x2="410" y2="265" stroke="var(--border)" strokeWidth="1.5" markerEnd="url(#team-arrow)" />

          {/* Dotted Steering Bus Arrow Returning to Console */}
          <path
            d="M 180 265 L 180 205 L 180 195"
            stroke="#a855f7"
            strokeWidth="1.5"
            strokeDasharray="4 3"
            markerEnd="url(#team-steer-arrow)"
          />
          <text x="190" y="235" fontSize="8.5" fontFamily="monospace" fill="#a855f7" fontWeight="600">
            SteerableToolHandle Bus
          </text>

          {/* ============================================================= */}
          {/* BOTTOM ROW: Agent Runtime, LLM Client & VM Sandboxing         */}
          {/* ============================================================= */}

          {/* 4. UNIFY (Dual-Brain Runtime & CodeAct Engine) */}
          <g transform="translate(25, 270)">
            <rect
              width="410"
              height="205"
              rx="12"
              fill="#10b981"
              fillOpacity="0.06"
              stroke="#10b981"
              strokeOpacity="0.4"
              strokeWidth="1.4"
            />
            <rect
              x="14"
              y="14"
              width="60"
              height="18"
              rx="4"
              fill="#10b981"
              fillOpacity="0.2"
              stroke="#10b981"
              strokeWidth="1"
            />
            <text x="44" y="26.5" textAnchor="middle" fontSize="9" fontFamily="monospace" fontWeight="700" fill="#10b981">
              UNIFY
            </text>
            <text x="14" y="54" fontSize="13.5" fontFamily="sans-serif" fontWeight="700" fill="var(--foreground)">
              Dual-Brain Runtime &amp; CodeAct Engine
            </text>
            <text x="14" y="70" fontSize="10" fontFamily="mono" fill="var(--muted)">
              Fast/Slow Brain · CodeActActor · FunctionManager · GuidanceManager
            </text>
            <line x1="14" y1="80" x2="396" y2="80" stroke="var(--border)" strokeWidth="1" />
            
            <g transform="translate(14, 96)" fontSize="9.5" fontFamily="sans-serif" fill="var(--foreground)">
              <text y="0">• <tspan fontWeight="700">Slow Brain (ConversationManager)</tspan>: main-process long planning &amp; memory</text>
              <text y="17">• <tspan fontWeight="700">Fast Brain</tspan>: LiveKit WebRTC subprocess for sub-second voice/video response</text>
              <text y="34">• <tspan fontWeight="700">CodeActActor</tspan>: writes complete multi-statement Python plans over primitives.*</text>
              <text y="51">• <tspan fontWeight="700">Steerable Protocol</tspan>: typed ask, interject, pause signals flow mid-flight</text>
              <text y="68">• <tspan fontWeight="700">Dual Skill Library</tspan>: executable Python (Function) + procedural SOPs (Guidance)</text>
              <text y="85">• <tspan fontWeight="700">Typed Primitives</tspan>: Contacts, Knowledge, Tasks, Files, Transcripts, Web, Secrets</text>
            </g>
          </g>

          {/* 5. UNILLM (Universal LLM Client) */}
          <g transform="translate(460, 270)">
            <rect
              width="230"
              height="205"
              rx="12"
              fill="var(--card)"
              stroke="var(--border)"
              strokeWidth="1.3"
            />
            <rect
              x="12"
              y="14"
              width="70"
              height="18"
              rx="4"
              fill="#8b5cf6"
              fillOpacity="0.15"
              stroke="#8b5cf6"
              strokeWidth="1"
            />
            <text x="47" y="26.5" textAnchor="middle" fontSize="9" fontFamily="monospace" fontWeight="700" fill="#8b5cf6">
              UNILLM
            </text>
            <text x="12" y="54" fontSize="13.5" fontFamily="sans-serif" fontWeight="700" fill="var(--foreground)">
              Universal LLM Client
            </text>
            <text x="12" y="70" fontSize="10" fontFamily="mono" fill="var(--muted)">
              Unified API · Smart Caching
            </text>
            <line x1="12" y1="80" x2="218" y2="80" stroke="var(--border)" strokeWidth="1" />
            
            <g transform="translate(12, 96)" fontSize="9.5" fontFamily="sans-serif" fill="var(--foreground)">
              <text y="0">• Single API across all providers</text>
              <text y="17">• Incompatible prompt/tool mapping</text>
              <text y="34">• Semantic caching &amp; latency tracking</text>
              <text y="51">• Async streaming &amp; provider fallbacks</text>
              <text y="68">• Pareto objective routing</text>
              <text y="85">• OpenAI, Anthropic, Gemini, DeepSeek</text>
            </g>
          </g>

          {/* 6. DEPLOY (Execution Sandboxing & VMs) */}
          <g transform="translate(715, 270)">
            <rect
              width="200"
              height="205"
              rx="12"
              fill="var(--muted-bg)"
              stroke="var(--border)"
              strokeWidth="1.3"
            />
            <rect
              x="12"
              y="14"
              width="65"
              height="18"
              rx="4"
              fill="#ec4899"
              fillOpacity="0.15"
              stroke="#ec4899"
              strokeWidth="1"
            />
            <text x="44.5" y="26.5" textAnchor="middle" fontSize="9" fontFamily="monospace" fontWeight="700" fill="#ec4899">
              DEPLOY
            </text>
            <text x="12" y="54" fontSize="13.5" fontFamily="sans-serif" fontWeight="700" fill="var(--foreground)">
              VM &amp; K8s Infra
            </text>
            <text x="12" y="70" fontSize="10" fontFamily="mono" fill="var(--muted)">
              Firecracker · QEMU · Playwright
            </text>
            <line x1="12" y1="80" x2="188" y2="80" stroke="var(--border)" strokeWidth="1" />
            
            <g transform="translate(12, 96)" fontSize="9.5" fontFamily="sans-serif" fill="var(--foreground)">
              <text y="0">• Managed assistant VMs</text>
              <text y="17">• Headless Playwright browser</text>
              <text y="34">• Ephemeral sandboxes</text>
              <text y="51">• Strict network egress rules</text>
              <text y="68">• Transient snapshot rollback</text>
              <text y="85">• Self-host &amp; cloud cluster</text>
            </g>
          </g>

          {/* Connecting Arrows Bottom Row */}
          <line x1="435" y1="365" x2="460" y2="365" stroke="#10b981" strokeWidth="1.5" markerEnd="url(#team-arrow-green)" />
          <line x1="690" y1="365" x2="715" y2="365" stroke="var(--border)" strokeWidth="1.5" markerEnd="url(#team-arrow)" />
        </svg>
      </div>
    </div>
  );
}
