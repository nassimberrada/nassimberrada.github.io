"use client";

import React from "react";

export function MultiRepoRagArchitecture() {
  return (
    <div className="w-full my-6 rounded-[14px] border border-[var(--border)] bg-[var(--card)] p-4 sm:p-6 shadow-sm overflow-hidden select-none font-sans">
      {/* Schematic Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b border-[var(--border)]">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--foreground)]">
            Multi-Repository RAG Documentation Assistant — Architecture Flow
          </span>
        </div>
        <span className="text-[10px] font-mono text-[var(--muted)]">
          GitHub Webhooks · AST Chunker · Qdrant HNSW · BM25 · Reciprocal Rank Fusion · Grounded Synthesis
        </span>
      </div>

      <div className="w-full overflow-x-auto">
        <svg
          viewBox="0 0 960 520"
          className="w-full min-w-[900px] h-auto"
          style={{ fontVariantNumeric: "tabular-nums" }}
        >
          <defs>
            <marker
              id="rag-arrow-amber"
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
              id="rag-arrow-cyan"
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
              id="rag-arrow-purple"
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
              id="rag-arrow-emerald"
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

          {/* ========================================================================= */}
          {/* STEP 1: MULTI-REPO GIT WEBHOOK INGESTION                                  */}
          {/* ========================================================================= */}
          <g transform="translate(20, 20)">
            <rect
              width="280"
              height="225"
              rx="12"
              fill="var(--card)"
              stroke="#f59e0b"
              strokeWidth="1.5"
              strokeOpacity="0.4"
            />
            <rect x="14" y="14" width="165" height="20" rx="4" fill="rgba(245,158,11,0.12)" />
            <text x="96.5" y="28" fontSize="10" fontFamily="monospace" fontWeight="bold" fill="#f59e0b" textAnchor="middle">
              1. MULTI-REPO WEBHOOKS
            </text>
            <text x="14" y="48" fontSize="8.5" fontFamily="monospace" fill="var(--muted)">
              Incremental Git Diff Ingestion Engine
            </text>

            {/* Repositories List */}
            <g transform="translate(14, 56)">
              <rect width="252" height="74" rx="6" fill="var(--muted-bg)" stroke="var(--border)" strokeWidth="1" />
              <text x="10" y="16" fontSize="8.5" fontWeight="bold" fill="var(--foreground)" fontFamily="monospace">
                Monitored Knowledge Repositories:
              </text>
              <text x="10" y="30" fontSize="8" fontFamily="monospace" fill="#06b6d4">
                • unifyai/ivy (Core Framework &amp; AST Engine)
              </text>
              <text x="10" y="44" fontSize="8" fontFamily="monospace" fill="#10b981">
                • ivy-frontends (PyTorch, JAX, TF, NumPy API)
              </text>
              <text x="10" y="58" fontSize="8" fontFamily="monospace" fill="#f59e0b">
                • ivy-backends &amp; eng-docs/rfcs (Specs &amp; JIT)
              </text>
            </g>

            {/* Webhook Diff Processor */}
            <g transform="translate(14, 138)">
              <rect width="252" height="72" rx="6" fill="var(--card)" stroke="var(--border)" strokeWidth="0.8" />
              <text x="10" y="16" fontSize="8" fontFamily="monospace" fill="var(--foreground)" fontWeight="bold">
                Incremental Webhook Trigger:
              </text>
              <text x="10" y="30" fontSize="7.8" fontFamily="monospace" fill="var(--muted)">
                HMAC-256 Auth ➔ git diff --name-only HEAD~1
              </text>
              <text x="10" y="44" fontSize="7.8" fontFamily="monospace" fill="#10b981">
                • Only re-indexes modified/created files
              </text>
              <text x="10" y="58" fontSize="7.8" fontFamily="monospace" fill="var(--foreground)">
                • Doc sync latency: &lt; 5 mins per commit
              </text>
            </g>
          </g>

          {/* ARROW: Step 1 to Step 2 */}
          <path d="M 300 132 L 340 132" fill="none" stroke="#f59e0b" strokeWidth="1.8" markerEnd="url(#rag-arrow-amber)" />

          {/* ========================================================================= */}
          {/* STEP 2: CODE-AWARE HIERARCHICAL AST CHUNKING                              */}
          {/* ========================================================================= */}
          <g transform="translate(340, 20)">
            <rect
              width="280"
              height="225"
              rx="12"
              fill="var(--card)"
              stroke="#06b6d4"
              strokeWidth="1.5"
              strokeOpacity="0.4"
            />
            <rect x="14" y="14" width="160" height="20" rx="4" fill="rgba(6,182,212,0.12)" />
            <text x="94" y="28" fontSize="10" fontFamily="monospace" fontWeight="bold" fill="#06b6d4" textAnchor="middle">
              2. AST HIERARCHY CHUNKER
            </text>
            <text x="14" y="48" fontSize="8.5" fontFamily="monospace" fill="var(--muted)">
              Tree-Sitter Semantic Scope Decomposition
            </text>

            {/* AST Splitting Specs */}
            <g transform="translate(14, 56)">
              <rect width="252" height="74" rx="6" fill="var(--muted-bg)" stroke="var(--border)" strokeWidth="1" />
              <text x="10" y="16" fontSize="8.5" fontWeight="bold" fill="var(--foreground)" fontFamily="monospace">
                Syntax-Aware Chunk Boundaries:
              </text>
              <text x="10" y="30" fontSize="8" fontFamily="monospace" fill="var(--muted)">
                • Classes: Preserves inheritance &amp; parent scope
              </text>
              <text x="10" y="44" fontSize="8" fontFamily="monospace" fill="#06b6d4">
                • Functions: Signatures + Docstrings + Body
              </text>
              <text x="10" y="58" fontSize="8" fontFamily="monospace" fill="#10b981">
                • RFC Docs: Heading hierarchy &amp; Code blocks
              </text>
            </g>

            {/* Provenance Metadata Payload */}
            <g transform="translate(14, 138)">
              <rect width="252" height="72" rx="6" fill="var(--card)" stroke="var(--border)" strokeWidth="0.8" />
              <text x="10" y="16" fontSize="8" fontFamily="monospace" fill="var(--foreground)" fontWeight="bold">
                Line-Level Provenance Tagging:
              </text>
              <text x="10" y="30" fontSize="7.8" fontFamily="monospace" fill="#06b6d4">
                payload: repo, branch, commit_sha, file_path
              </text>
              <text x="10" y="44" fontSize="7.8" fontFamily="monospace" fill="var(--muted)">
                line_range: "L82-L115" · symbol: "conv2d"
              </text>
              <text x="10" y="58" fontSize="7.8" fontFamily="monospace" fill="#10b981">
                Zero arbitrary token truncations
              </text>
            </g>
          </g>

          {/* ARROW: Step 2 to Step 3 */}
          <path d="M 620 132 L 660 132" fill="none" stroke="#06b6d4" strokeWidth="1.8" markerEnd="url(#rag-arrow-cyan)" />

          {/* ========================================================================= */}
          {/* STEP 3: HYBRID EMBEDDING & VECTOR INDEXING (QDRANT + BM25)               */}
          {/* ========================================================================= */}
          <g transform="translate(660, 20)">
            <rect
              width="280"
              height="225"
              rx="12"
              fill="var(--card)"
              stroke="#a855f7"
              strokeWidth="1.5"
              strokeOpacity="0.4"
            />
            <rect x="14" y="14" width="165" height="20" rx="4" fill="rgba(168,85,247,0.12)" />
            <text x="96.5" y="28" fontSize="10" fontFamily="monospace" fontWeight="bold" fill="#a855f7" textAnchor="middle">
              3. HYBRID VECTOR STORAGE
            </text>
            <text x="14" y="48" fontSize="8.5" fontFamily="monospace" fill="var(--muted)">
              Dual-Stream Dense + Sparse Representations
            </text>

            {/* Dense Stream */}
            <g transform="translate(14, 56)">
              <rect width="252" height="74" rx="6" fill="var(--muted-bg)" stroke="var(--border)" strokeWidth="1" />
              <text x="10" y="16" fontSize="8.5" fontWeight="bold" fill="var(--foreground)" fontFamily="monospace">
                Stream A: Dense Vector Storage (Qdrant)
              </text>
              <text x="10" y="30" fontSize="8" fontFamily="monospace" fill="#a855f7">
                • Model: bge-code-large (768-dim embeddings)
              </text>
              <text x="10" y="44" fontSize="8" fontFamily="monospace" fill="var(--muted)">
                • Metric: Cosine Distance · HNSW Graph Index
              </text>
              <text x="10" y="58" fontSize="8" fontFamily="monospace" fill="#10b981">
                • 30,800 AST Vector Chunks Indexed
              </text>
            </g>

            {/* Sparse Stream */}
            <g transform="translate(14, 138)">
              <rect width="252" height="72" rx="6" fill="var(--card)" stroke="var(--border)" strokeWidth="0.8" />
              <text x="10" y="16" fontSize="8" fontFamily="monospace" fill="var(--foreground)" fontWeight="bold">
                Stream B: Sparse Lexical Index (BM25):
              </text>
              <text x="10" y="30" fontSize="7.8" fontFamily="monospace" fill="#f59e0b">
                • Exact identifier &amp; symbol inverted index
              </text>
              <text x="10" y="44" fontSize="7.8" fontFamily="monospace" fill="var(--muted)">
                • Captures exact API names (e.g. lax.conv2d)
              </text>
              <text x="10" y="58" fontSize="7.8" fontFamily="monospace" fill="#06b6d4">
                • Sub-15ms combined index lookup
              </text>
            </g>
          </g>

          {/* DOWNWARD TRANSITION ARROW: Step 3 to Bottom Pipeline */}
          <path
            d="M 800 245 L 800 268 L 240 268 L 240 285"
            fill="none"
            stroke="#a855f7"
            strokeWidth="1.8"
            strokeDasharray="4 4"
            markerEnd="url(#rag-arrow-purple)"
          />

          {/* ========================================================================= */}
          {/* STEP 4: RECIPROCAL RANK FUSION (RRF) & CROSS-ENCODER RE-RANKING          */}
          {/* ========================================================================= */}
          <g transform="translate(20, 285)">
            <rect
              width="440"
              height="215"
              rx="12"
              fill="var(--card)"
              stroke="#06b6d4"
              strokeWidth="1.5"
              strokeOpacity="0.4"
            />
            <rect x="14" y="14" width="180" height="20" rx="4" fill="rgba(6,182,212,0.12)" />
            <text x="104" y="28" fontSize="10" fontFamily="monospace" fontWeight="bold" fill="#06b6d4" textAnchor="middle">
              4. RRF FUSION &amp; RE-RANKER
            </text>
            <text x="14" y="48" fontSize="8.5" fontFamily="monospace" fill="var(--muted)">
              Two-Stage Hybrid Candidate Retrieval &amp; Relevance Filtering
            </text>

            <g transform="translate(14, 56)">
              <rect width="412" height="74" rx="6" fill="var(--muted-bg)" stroke="var(--border)" strokeWidth="1" />
              <text x="10" y="16" fontSize="8.5" fontWeight="bold" fill="var(--foreground)" fontFamily="monospace">
                Stage 4A: Reciprocal Rank Fusion (RRF) Formula:
              </text>
              <text x="10" y="32" fontSize="9" fontFamily="monospace" fill="#06b6d4" fontWeight="bold">
                RRF_Score(d) = Σ [ 1 / ( k + rank_m(d) ) ]  where k = 60
              </text>
              <text x="10" y="48" fontSize="8" fontFamily="monospace" fill="var(--muted)">
                • Merges Top-50 Dense hits (Qdrant) + Top-50 Sparse hits (BM25)
              </text>
              <text x="10" y="62" fontSize="8" fontFamily="monospace" fill="#10b981">
                • Normalizes differing score scales into unified ranking
              </text>
            </g>

            <g transform="translate(14, 138)">
              <rect width="412" height="66" rx="6" fill="var(--card)" stroke="var(--border)" strokeWidth="0.8" />
              <text x="10" y="16" fontSize="8" fontFamily="monospace" fill="var(--foreground)" fontWeight="bold">
                Stage 4B: BGE Cross-Encoder Joint Re-Ranking:
              </text>
              <text x="10" y="30" fontSize="8" fontFamily="monospace" fill="var(--muted)">
                Evaluates joint query-chunk cross-attention over Top-15 candidates
              </text>
              <text x="10" y="44" fontSize="8" fontFamily="monospace" fill="#f59e0b">
                • Confidence cutoff: relevance score ≥ 0.75 enforced
              </text>
              <text x="10" y="58" fontSize="8" fontFamily="monospace" fill="#10b981">
                • Discards irrelevant distractor passages before generation
              </text>
            </g>
          </g>

          {/* ARROW: Step 4 to Step 5 */}
          <path d="M 460 392 L 500 392" fill="none" stroke="#10b981" strokeWidth="1.8" markerEnd="url(#rag-arrow-emerald)" />

          {/* ========================================================================= */}
          {/* STEP 5: CITATION-ENFORCED SYNTHESIS & WORKBENCH DEPLOYMENT                */}
          {/* ========================================================================= */}
          <g transform="translate(500, 285)">
            <rect
              width="440"
              height="215"
              rx="12"
              fill="var(--card)"
              stroke="#10b981"
              strokeWidth="1.5"
              strokeOpacity="0.4"
            />
            <rect x="14" y="14" width="200" height="20" rx="4" fill="rgba(16,185,129,0.12)" />
            <text x="114" y="28" fontSize="10" fontFamily="monospace" fontWeight="bold" fill="#10b981" textAnchor="middle">
              5. CITATION-ENFORCED SYNTHESIS
            </text>
            <text x="14" y="48" fontSize="8.5" fontFamily="monospace" fill="var(--muted)">
              Grounded Generation, Anti-Hallucination &amp; Internal Deployment
            </text>

            <g transform="translate(14, 56)">
              <rect width="412" height="74" rx="6" fill="var(--muted-bg)" stroke="var(--border)" strokeWidth="1" />
              <text x="10" y="16" fontSize="8.5" fontWeight="bold" fill="var(--foreground)" fontFamily="monospace">
                Strict Grounding &amp; Citation Constraints:
              </text>
              <text x="10" y="32" fontSize="8" fontFamily="monospace" fill="#10b981">
                • Every technical statement links to [file_path#Lstart-Lend]
              </text>
              <text x="10" y="46" fontSize="8" fontFamily="monospace" fill="var(--muted)">
                • Cross-references code against active git commit SHA
              </text>
              <text x="10" y="60" fontSize="8" fontFamily="monospace" fill="#f59e0b">
                • Anti-Hallucination Guardrail: Refuses if source context is insufficient
              </text>
            </g>

            <g transform="translate(14, 138)">
              <rect width="412" height="66" rx="6" fill="var(--card)" stroke="var(--border)" strokeWidth="0.8" />
              <text x="10" y="16" fontSize="8.5" fontFamily="monospace" fill="var(--foreground)" fontWeight="bold">
                Production Deployment Across Engineering:
              </text>
              <text x="10" y="30" fontSize="8" fontFamily="monospace" fill="var(--muted)">
                FastAPI Microservice (sub-80ms retrieval) · Internal Web Assistant
              </text>
              <text x="10" y="44" fontSize="8" fontFamily="monospace" fill="#06b6d4">
                • Slack Bot (@ivy-bot) &amp; VS Code Extension Integration
              </text>
              <text x="10" y="58" fontSize="8" fontFamily="monospace" fill="#10b981">
                • 96.1% Retrieval Hit-Rate across 40+ Deep Ivy engineers
              </text>
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}
