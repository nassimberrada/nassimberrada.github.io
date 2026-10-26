"use client";

import React from "react";
import { SpotifyTrendVisual } from "./SpotifyTrendVisual";

export function SpotifyTrendFigure() {
  return (
    <div className="w-full my-6 rounded-[14px] border border-[var(--border)] bg-[var(--card)] p-4 sm:p-6 shadow-sm overflow-hidden select-none font-sans">
      {/* Figure Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-5 border-b border-[var(--border)]">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--foreground)]">
            Designed Telemetry Solution: 100-Year Acoustic Dynamics &amp; Lyrical Sentiment Probes
          </span>
        </div>

        <div className="flex items-center gap-2 text-[11px] font-mono text-[var(--muted)]">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>550k Track Ingestion Active</span>
        </div>
      </div>

      {/* Main Interactive Visual */}
      <SpotifyTrendVisual />

      {/* Caption */}
      <p className="mt-4 text-xs text-[var(--muted)] leading-relaxed font-mono">
        <strong className="text-[var(--foreground)]">Coded Analysis Walkthrough:</strong> Real-time exploration of the feature space analyzed in <code className="text-[var(--foreground)] font-bold">Spotify Story.ipynb</code>. Tracks normalized acoustic dimensions across 10 decades, measures emotional dissonance between lyrics and musical valence, visualizes loudness wars and track length compression, and projects genre manifolds via t-SNE.
      </p>
    </div>
  );
}
