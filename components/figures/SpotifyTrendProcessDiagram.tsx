"use client";

import React from "react";

export function SpotifyTrendProcessDiagram() {
  return (
    <div className="w-full my-6 rounded-[14px] border border-[var(--border)] bg-[var(--card)] p-4 sm:p-6 shadow-sm overflow-hidden select-none font-sans">
      {/* Diagram Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b border-[var(--border)]">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--foreground)]">
            Analytical Pipeline: 550k Track Ingestion, NLP Sentiment Dissonance &amp; Manifold Geometry
          </span>
        </div>
        <span className="text-[10px] font-mono text-[var(--muted)]">
          From Raw Telemetry to Cultural Insight
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
              id="spot-arrow-emerald"
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
              id="spot-arrow-blue"
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
              id="spot-arrow-purple"
              viewBox="0 0 10 10"
              refX="6"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#8b5cf6" />
            </marker>
            <marker
              id="spot-arrow-amber"
              viewBox="0 0 10 10"
              refX="6"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#f59e0b" />
            </marker>

            {/* Pattern Grid */}
            <pattern id="spotGrid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-[var(--border)] opacity-20" />
            </pattern>
          </defs>

          {/* Background Grid */}
          <rect width="940" height="480" fill="url(#spotGrid)" />

          {/* =========================================================================
              TIER 1: RAW INGESTION & DATA SANITIZATION (TOP)
              ========================================================================= */}
          <rect
            x="20"
            y="20"
            width="900"
            height="100"
            rx="10"
            fill="currentColor"
            className="text-[var(--card)]"
            stroke="#10b981"
            strokeWidth="1.2"
            strokeOpacity="0.4"
          />

          {/* Tier 1 Header Badge */}
          <g transform="translate(35, 32)">
            <rect x="0" y="0" width="230" height="18" rx="4" fill="#10b981" fillOpacity="0.12" stroke="#10b981" strokeWidth="1" strokeOpacity="0.3" />
            <text x="115" y="13" textAnchor="middle" fill="#10b981" fontSize="9" fontFamily="monospace" fontWeight="bold">
              PHASE 01 · 550k INGESTION &amp; HYGIENE
            </text>
            <text x="245" y="13" fill="currentColor" className="text-[var(--muted)]" fontSize="8.5" fontFamily="monospace">
              Kaggle 550k Songs Audio, Lyrics, and Genres · 1920 to 2024 · 1,100+ Micro-Genres
            </text>
          </g>

          {/* Ingestion Sub-blocks */}
          <g transform="translate(40, 56)">
            <rect x="0" y="0" width="260" height="52" rx="6" fill="currentColor" className="text-[var(--muted-bg)]" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />
            <text x="12" y="16" fill="#10b981" fontSize="10" fontFamily="monospace" fontWeight="bold">
              1. Raw Audio Telemetry
            </text>
            <text x="12" y="30" fill="currentColor" className="text-[var(--foreground)]" fontSize="8.5" fontFamily="monospace">
              11 Continuous Features (Valence, Energy, etc.)
            </text>
            <text x="12" y="42" fill="#ef4444" fontSize="7.5" fontFamily="monospace">
              Filter: tempo &gt; 0, year &lt; 2025, duration_ms
            </text>
          </g>

          <g transform="translate(340, 56)">
            <rect x="0" y="0" width="260" height="52" rx="6" fill="currentColor" className="text-[var(--muted-bg)]" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />
            <text x="12" y="16" fill="#3b82f6" fontSize="10" fontFamily="monospace" fontWeight="bold">
              2. Lyrics Corpus Ingestion
            </text>
            <text x="12" y="30" fill="currentColor" className="text-[var(--foreground)]" fontSize="8.5" fontFamily="monospace">
              Multilingual Lyrics String Telemetry
            </text>
            <text x="12" y="42" fill="#f59e0b" fontSize="7.5" fontFamily="monospace">
              Sanitization: dropna(lyrics, year, valence)
            </text>
          </g>

          <g transform="translate(640, 56)">
            <rect x="0" y="0" width="260" height="52" rx="6" fill="currentColor" className="text-[var(--muted-bg)]" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />
            <text x="12" y="16" fill="#8b5cf6" fontSize="10" fontFamily="monospace" fontWeight="bold">
              3. Metadata &amp; Popularity
            </text>
            <text x="12" y="30" fill="currentColor" className="text-[var(--foreground)]" fontSize="8.5" fontFamily="monospace">
              Spotify Track Popularity Index (0–100)
            </text>
            <text x="12" y="42" fill="#10b981" fontSize="7.5" fontFamily="monospace">
              Correlation: Loudness &amp; Danceability lead
            </text>
          </g>


          {/* =========================================================================
              TIER 2: NLP SENTIMENT & LYRICAL DISSONANCE (MIDDLE-TOP)
              ========================================================================= */}
          <rect
            x="20"
            y="135"
            width="900"
            height="130"
            rx="10"
            fill="currentColor"
            className="text-[var(--card)]"
            stroke="#3b82f6"
            strokeWidth="1.2"
            strokeOpacity="0.4"
          />

          {/* Tier 2 Header Badge */}
          <g transform="translate(35, 147)">
            <rect x="0" y="0" width="240" height="18" rx="4" fill="#3b82f6" fillOpacity="0.12" stroke="#3b82f6" strokeWidth="1" strokeOpacity="0.3" />
            <text x="120" y="13" textAnchor="middle" fill="#3b82f6" fontSize="9" fontFamily="monospace" fontWeight="bold">
              PHASE 02 · NLP SENTIMENT &amp; DISSONANCE
            </text>
            <text x="255" y="13" fill="currentColor" className="text-[var(--muted)]" fontSize="8.5" fontFamily="monospace">
              TextBlob Polarity · Lyrical Sentiment vs. Musical Valence · Cheerful Despair Metric
            </text>
          </g>

          {/* TextBlob Polarity */}
          <g transform="translate(40, 172)">
            <rect x="0" y="0" width="260" height="80" rx="6" fill="currentColor" className="text-[var(--muted-bg)]" stroke="#3b82f6" strokeWidth="1" strokeOpacity="0.5" />
            <text x="12" y="16" fill="#3b82f6" fontSize="10" fontFamily="monospace" fontWeight="bold">
              Lyrical Sentiment Analysis
            </text>
            <text x="12" y="30" fill="currentColor" className="text-[var(--foreground)]" fontSize="8.5" fontFamily="monospace" fontWeight="semibold">
              TextBlob(lyrics).polarity &isin; [-1.0, +1.0]
            </text>
            <text x="12" y="45" fill="currentColor" className="text-[var(--muted)]" fontSize="7.8" fontFamily="sans-serif">
              Processes song lyrics across decades to extract emotional polarity score from textual vocabulary.
            </text>
            <text x="12" y="68" fill="#10b981" fontSize="8" fontFamily="monospace">
              &check; Discovered downward secular trend
            </text>
          </g>

          {/* Emotional Dissonance */}
          <g transform="translate(340, 172)">
            <rect x="0" y="0" width="260" height="80" rx="6" fill="currentColor" className="text-[var(--muted-bg)]" stroke="#3b82f6" strokeWidth="1" strokeOpacity="0.5" />
            <text x="12" y="16" fill="#3b82f6" fontSize="10" fontFamily="monospace" fontWeight="bold">
              Emotional Dissonance Formulation
            </text>
            <text x="12" y="30" fill="currentColor" className="text-[var(--foreground)]" fontSize="8.5" fontFamily="monospace" fontWeight="semibold">
              is_dissonant = (valence &gt; 0.6) &amp; (sentiment &lt; -0.1)
            </text>
            <text x="12" y="45" fill="currentColor" className="text-[var(--muted)]" fontSize="7.8" fontFamily="sans-serif">
              Isolates &ldquo;cheerful despair&rdquo;: upbeat, danceable production paired with negative, sad lyrical themes.
            </text>
            <text x="12" y="68" fill="#ef4444" fontSize="8" fontFamily="monospace">
              &check; Surged from 4.2% to 29.8% modern
            </text>
          </g>

          {/* MinMaxScaler Normalization */}
          <g transform="translate(640, 172)">
            <rect x="0" y="0" width="260" height="80" rx="6" fill="currentColor" className="text-[var(--muted-bg)]" stroke="#3b82f6" strokeWidth="1" strokeOpacity="0.5" />
            <text x="12" y="16" fill="#3b82f6" fontSize="10" fontFamily="monospace" fontWeight="bold">
              Centennial Feature Rescaling
            </text>
            <text x="12" y="30" fill="currentColor" className="text-[var(--foreground)]" fontSize="8.5" fontFamily="monospace" fontWeight="semibold">
              MinMaxScaler(features) &rarr; [0, 1] Matrix
            </text>
            <text x="12" y="45" fill="currentColor" className="text-[var(--muted)]" fontSize="7.8" fontFamily="sans-serif">
              Normalizes heterogeneous units (dB, BPM, probabilities) to evaluate comparative diversity on a single scale.
            </text>
            <text x="12" y="68" fill="#10b981" fontSize="8" fontFamily="monospace">
              &check; Enables unified cross-feature variance
            </text>
          </g>

          {/* Connectors Tier 1 -> Tier 2 */}
          <path d="M 170 108 L 170 135" stroke="#10b981" strokeWidth="1.5" markerEnd="url(#spot-arrow-emerald)" />
          <path d="M 470 108 L 470 135" stroke="#3b82f6" strokeWidth="1.5" markerEnd="url(#spot-arrow-blue)" />
          <path d="M 770 108 L 770 135" stroke="#8b5cf6" strokeWidth="1.5" markerEnd="url(#spot-arrow-purple)" />


          {/* =========================================================================
              TIER 3: VARIETY COLLAPSE & STREAMING OPTIMIZATION (MIDDLE-BOTTOM)
              ========================================================================= */}
          <rect
            x="20"
            y="280"
            width="900"
            height="100"
            rx="10"
            fill="currentColor"
            className="text-[var(--card)]"
            stroke="#8b5cf6"
            strokeWidth="1.2"
            strokeOpacity="0.4"
          />

          {/* Tier 3 Header Badge */}
          <g transform="translate(35, 292)">
            <rect x="0" y="0" width="260" height="18" rx="4" fill="#8b5cf6" fillOpacity="0.12" stroke="#8b5cf6" strokeWidth="1" strokeOpacity="0.3" />
            <text x="130" y="13" textAnchor="middle" fill="#8b5cf6" fontSize="9" fontFamily="monospace" fontWeight="bold">
              PHASE 03 · DIVERSITY COLLAPSE &amp; COMPRESSION
            </text>
            <text x="275" y="13" fill="currentColor" className="text-[var(--muted)]" fontSize="8.5" fontFamily="monospace">
              Loudness Wars (-18 to -6 dBFS) · Song Duration Compression (TikTok Effect)
            </text>
          </g>

          {/* Sub-block 3A: Diversity Index */}
          <g transform="translate(40, 316)">
            <rect x="0" y="0" width="410" height="52" rx="6" fill="currentColor" className="text-[var(--muted-bg)]" stroke="#8b5cf6" strokeWidth="1" strokeOpacity="0.5" />
            <text x="12" y="16" fill="#8b5cf6" fontSize="10" fontFamily="monospace" fontWeight="bold">
              Acoustic Diversity Index (Annual StdDev)
            </text>
            <text x="12" y="30" fill="currentColor" className="text-[var(--foreground)]" fontSize="8.5" fontFamily="monospace">
              df.groupby(&apos;year&apos;)[features].std().mean(axis=1) &rarr; &sigma;_t
            </text>
            <text x="12" y="44" fill="#ef4444" fontSize="8" fontFamily="monospace">
              Result: Variance collapsed post-2000 &mdash; Pop standardization &amp; production homogeneity
            </text>
          </g>

          {/* Sub-block 3B: Loudness & Duration */}
          <g transform="translate(490, 316)">
            <rect x="0" y="0" width="410" height="52" rx="6" fill="currentColor" className="text-[var(--muted-bg)]" stroke="#8b5cf6" strokeWidth="1" strokeOpacity="0.5" />
            <text x="12" y="16" fill="#8b5cf6" fontSize="10" fontFamily="monospace" fontWeight="bold">
              The Loudness War &amp; TikTok Duration Drop
            </text>
            <text x="12" y="30" fill="currentColor" className="text-[var(--foreground)]" fontSize="8.5" fontFamily="monospace">
              Loudness: -18 dBFS &rarr; -6.2 dBFS · Duration: 4.2m &rarr; 2.8m (-33% Length)
            </text>
            <text x="12" y="44" fill="#f59e0b" fontSize="8" fontFamily="monospace">
              Result: Modern tracks maximize early hook retention &amp; 30s streaming royalty threshold
            </text>
          </g>

          {/* Connectors Tier 2 -> Tier 3 */}
          <path d="M 245 252 L 245 280" stroke="#3b82f6" strokeWidth="1.5" markerEnd="url(#spot-arrow-blue)" />
          <path d="M 695 252 L 695 280" stroke="#8b5cf6" strokeWidth="1.5" markerEnd="url(#spot-arrow-purple)" />


          {/* =========================================================================
              TIER 4: HIGH-DIMENSIONAL t-SNE MANIFOLD PROJECTION (BOTTOM)
              ========================================================================= */}
          <rect
            x="20"
            y="395"
            width="900"
            height="70"
            rx="10"
            fill="currentColor"
            className="text-[var(--card)]"
            stroke="#10b981"
            strokeWidth="1.2"
            strokeOpacity="0.4"
          />

          <g transform="translate(35, 408)">
            <rect x="0" y="0" width="240" height="18" rx="4" fill="#10b981" fillOpacity="0.12" stroke="#10b981" strokeWidth="1" strokeOpacity="0.3" />
            <text x="120" y="13" textAnchor="middle" fill="#10b981" fontSize="9" fontFamily="monospace" fontWeight="bold">
              PHASE 04 · t-SNE GENRE GALAXY
            </text>
            <text x="255" y="13" fill="currentColor" className="text-[var(--muted)]" fontSize="8.5" fontFamily="monospace">
              8-Dimensional Non-Linear Embedding · Perplexity: 30 · Genre Manifold Overlap Analysis
            </text>
          </g>

          <g transform="translate(40, 432)" fontSize="8.5" fontFamily="monospace" fill="currentColor" className="text-[var(--foreground)]">
            <text x="0" y="14">
              &bull; <tspan fontWeight="bold" fill="#10b981">Manifold Projection:</tspan> StandardScaler(8 Features) &rarr; t-SNE(n_components=2, perplexity=30, random_state=42)
            </text>
            <text x="610" y="14">
              &bull; <tspan fontWeight="bold" fill="#3b82f6">Finding:</tspan> Historic genre islands &rarr; Modern Pop-Trap-EDM hyper-cluster
            </text>
          </g>

          {/* Connectors to Tier 4 */}
          <path d="M 245 368 L 245 395" stroke="#10b981" strokeWidth="1.5" markerEnd="url(#spot-arrow-emerald)" />
          <path d="M 695 368 L 695 395" stroke="#10b981" strokeWidth="1.5" markerEnd="url(#spot-arrow-emerald)" />
        </svg>
      </div>

      {/* Schematic Footer Note */}
      <div className="mt-4 pt-3 border-t border-[var(--border)] flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-[var(--muted)]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>Full Notebook Reproduction: Kaggle 550k Track Dataset Pipeline</span>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-emerald-600 dark:text-emerald-400">
          <span>NLP Sentiment Polarity · Diversity Indices · t-SNE Manifold Geometry</span>
        </div>
      </div>
    </div>
  );
}
