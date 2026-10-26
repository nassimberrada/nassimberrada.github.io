"use client";

import React, { useState, useEffect } from "react";
import { Play, Pause, RotateCw, Disc, Volume2, Clock, Activity, Sparkles, TrendingUp } from "lucide-react";

interface EraData {
  id: string;
  name: string;
  range: string;
  summary: string;
  avgAcousticness: number; // 0..1
  avgEnergy: number; // 0..1
  avgDanceability: number; // 0..1
  avgValence: number; // 0..1
  avgLoudnessDb: number; // dB (-20 to -4)
  avgDurationMin: number; // minutes
  diversityStdDev: number; // 0..1
  lyricalDissonancePct: number; // % of tracks with high valence + sad lyrics
  topGenres: string[];
  sampleTracks: { title: string; artist: string; year: number; dissonance: boolean }[];
  tsneClusters: { x: number; y: number; genre: string; color: string }[];
  manifoldState: string;
}

const ERAS: EraData[] = [
  {
    id: "acoustic",
    name: "Acoustic Emergence & Big Band",
    range: "1920 — 1960",
    summary: "Dominated by organic acoustic instrumentation, broad dynamic headroom (-16.8 dBFS), natural uncompressed timbre, and geographically distinct genre traditions.",
    avgAcousticness: 0.82,
    avgEnergy: 0.28,
    avgDanceability: 0.46,
    avgValence: 0.54,
    avgLoudnessDb: -16.8,
    avgDurationMin: 3.4,
    diversityStdDev: 0.38,
    lyricalDissonancePct: 4.2,
    topGenres: ["Traditional Pop", "Big Band Jazz", "Delta Blues", "Acoustic Folk", "Classical Swing"],
    sampleTracks: [
      { title: "Sing, Sing, Sing", artist: "Benny Goodman", year: 1937, dissonance: false },
      { title: "Cross Road Blues", artist: "Robert Johnson", year: 1936, dissonance: false },
      { title: "La Vie En Rose", artist: "Édith Piaf", year: 1947, dissonance: false },
      { title: "In the Mood", artist: "Glenn Miller", year: 1939, dissonance: false },
    ],
    tsneClusters: [
      { x: 120, y: 70, genre: "Big Band / Swing", color: "#3b82f6" },
      { x: 150, y: 110, genre: "Traditional Pop", color: "#60a5fa" },
      { x: 420, y: 80, genre: "Delta Blues", color: "#f59e0b" },
      { x: 450, y: 130, genre: "Acoustic Folk", color: "#d97706" },
      { x: 280, y: 45, genre: "Orchestral", color: "#10b981" },
    ],
    manifoldState: "Isolated Island Manifolds · High Acoustic Dispersion",
  },
  {
    id: "electric",
    name: "The Electric & Analog Revolution",
    range: "1960 — 1990",
    summary: "Electrification, multitrack tape synthesis, explosion of rock, disco, funk, and synth-pop. Peak musical positivity/valence with progressive track lengthening.",
    avgAcousticness: 0.36,
    avgEnergy: 0.62,
    avgDanceability: 0.55,
    avgValence: 0.64,
    avgLoudnessDb: -11.4,
    avgDurationMin: 4.2,
    diversityStdDev: 0.44,
    lyricalDissonancePct: 11.5,
    topGenres: ["Classic Rock", "Disco / Funk", "Motown Soul", "Synth-Pop", "New Wave"],
    sampleTracks: [
      { title: "Stayin' Alive", artist: "Bee Gees", year: 1977, dissonance: false },
      { title: "Bohemian Rhapsody", artist: "Queen", year: 1975, dissonance: false },
      { title: "Superstition", artist: "Stevie Wonder", year: 1972, dissonance: false },
      { title: "Sweet Child O' Mine", artist: "Guns N' Roses", year: 1987, dissonance: false },
    ],
    tsneClusters: [
      { x: 190, y: 140, genre: "Classic Rock", color: "#ef4444" },
      { x: 230, y: 180, genre: "Hard Rock", color: "#b91c1c" },
      { x: 370, y: 130, genre: "Disco / Funk", color: "#ec4899" },
      { x: 410, y: 160, genre: "Motown Soul", color: "#f59e0b" },
      { x: 280, y: 195, genre: "Synth-Pop", color: "#8b5cf6" },
    ],
    manifoldState: "Transitional Expansion · Surging Harmonic Energy",
  },
  {
    id: "digital",
    name: "Digital Homogenization & The Loudness Wars",
    range: "1990 — Present",
    summary: "DAW production, brickwall peak limiting (-6.2 dBFS), algorithmic streaming optimization, sub-3-minute track compression, and the surge of cheerful despair.",
    avgAcousticness: 0.16,
    avgEnergy: 0.74,
    avgDanceability: 0.68,
    avgValence: 0.45,
    avgLoudnessDb: -6.2,
    avgDurationMin: 2.8,
    diversityStdDev: 0.24,
    lyricalDissonancePct: 29.8,
    topGenres: ["Contemporary Pop", "Trap / Hip-Hop", "Streaming EDM", "Dance-Pop", "Reggaeton"],
    sampleTracks: [
      { title: "Hey Ya!", artist: "Outkast", year: 2003, dissonance: true },
      { title: "Pumped Up Kicks", artist: "Foster the People", year: 2010, dissonance: true },
      { title: "Blinding Lights", artist: "The Weeknd", year: 2019, dissonance: true },
      { title: "As It Was", artist: "Harry Styles", year: 2022, dissonance: true },
    ],
    tsneClusters: [
      { x: 270, y: 115, genre: "Contemporary Pop", color: "#10b981" },
      { x: 290, y: 125, genre: "Trap / Hip-Hop", color: "#8b5cf6" },
      { x: 280, y: 105, genre: "Dance-Pop", color: "#ec4899" },
      { x: 260, y: 130, genre: "Streaming EDM", color: "#3b82f6" },
      { x: 300, y: 110, genre: "Modern Indie", color: "#f59e0b" },
    ],
    manifoldState: "Hyper-Cluster Convergence · Algorithmic Standardization",
  },
];

export function SpotifyTrendVisual() {
  const [selectedEraId, setSelectedEraId] = useState<string>("digital");
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  const era = ERAS.find((e) => e.id === selectedEraId) || ERAS[2];

  // Auto-play through eras
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setSelectedEraId((prev) => {
        if (prev === "acoustic") return "electric";
        if (prev === "electric") return "digital";
        return "acoustic";
      });
    }, 4500);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="rounded-[14px] border border-[var(--border)] bg-[var(--card)] overflow-hidden shadow-sm">
      {/* Top Header / Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 border-b border-[var(--border)] bg-[var(--muted-bg)]/40">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            <Disc className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-mono font-bold text-[var(--foreground)] uppercase tracking-wider flex items-center gap-2">
              <span>Centennial Audio Telemetry &amp; Lyrical Sentiment Engine</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded font-normal bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                550,000 Tracks
              </span>
            </div>
            <p className="text-[11px] text-[var(--muted)] font-mono">
              100-Year Acoustic Shift · Kaggle Audio &amp; Lyrics Dataset
            </p>
          </div>
        </div>

        {/* Playback Controls & Era Selector */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            aria-label={isPlaying ? "Pause era progression" : "Play era progression"}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium border border-[var(--border)] bg-[var(--card)] hover:bg-[var(--muted-bg)] text-[var(--foreground)] transition-colors shadow-xs"
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 text-blue-500" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-emerald-500" />
                <span>Play</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => {
              setSelectedEraId("acoustic");
              setIsPlaying(false);
            }}
            title="Reset to 1920"
            className="p-1.5 rounded-lg border border-[var(--border)] bg-[var(--card)] hover:bg-[var(--muted-bg)] text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Era Selector Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-3 border-b border-[var(--border)] bg-[var(--muted-bg)]/20 text-xs font-mono">
        {ERAS.map((e) => {
          const isSelected = e.id === era.id;
          return (
            <button
              key={e.id}
              type="button"
              onClick={() => {
                setSelectedEraId(e.id);
                setIsPlaying(false);
              }}
              className={`p-2.5 rounded-xl border text-left transition-all ${
                isSelected
                  ? "bg-emerald-500/10 border-emerald-500/40 shadow-xs ring-1 ring-emerald-500/20"
                  : "bg-[var(--card)] border-[var(--border)] text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--muted-bg)]/40"
              }`}
            >
              <div className="flex items-center justify-between mb-0.5">
                <span className={`text-[10px] font-bold ${isSelected ? "text-emerald-600 dark:text-emerald-400" : "text-[var(--muted)]"}`}>
                  {e.range}
                </span>
                {isSelected && (
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                )}
              </div>
              <div className="font-bold text-[var(--foreground)] text-xs truncate">
                {e.name}
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Unified Dashboard (Decluttered 2-Column Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-[var(--border)] bg-[var(--card)]">
        {/* Left Container: Combined Analytical Telemetry & Gridded t-SNE Plot */}
        <div className="lg:col-span-2 p-4 space-y-4">
          {/* Top Row: 4 Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
            {/* Card 1: Acousticness */}
            <div className="p-2.5 rounded-xl bg-[var(--muted-bg)]/40 border border-[var(--border)] space-y-1">
              <span className="text-[10px] text-[var(--muted)] block">Acousticness:</span>
              <span className="text-sm font-bold text-amber-500">
                {(era.avgAcousticness * 100).toFixed(0)}%
              </span>
              <div className="w-full h-1.5 rounded-full bg-[var(--border)] overflow-hidden">
                <div className="h-full bg-amber-500" style={{ width: `${era.avgAcousticness * 100}%` }} />
              </div>
            </div>

            {/* Card 2: Loudness War */}
            <div className="p-2.5 rounded-xl bg-[var(--muted-bg)]/40 border border-[var(--border)] space-y-1">
              <span className="text-[10px] text-[var(--muted)] block flex items-center gap-1">
                <Volume2 className="w-3 h-3 text-purple-500" />
                <span>Loudness:</span>
              </span>
              <span className="text-sm font-bold text-purple-600 dark:text-purple-400">
                {era.avgLoudnessDb.toFixed(1)} dBFS
              </span>
              <span className="text-[9px] text-[var(--muted)] block truncate">
                {era.id === "digital" ? "Brickwall Peak" : "Dynamic Headroom"}
              </span>
            </div>

            {/* Card 3: Lyrical Dissonance */}
            <div className="p-2.5 rounded-xl bg-[var(--muted-bg)]/40 border border-[var(--border)] space-y-1">
              <span className="text-[10px] text-[var(--muted)] block truncate">
                Cheerful Despair:
              </span>
              <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                {era.lyricalDissonancePct}%
              </span>
              <span className="text-[9px] text-[var(--muted)] block truncate">
                Happy Beat / Sad Text
              </span>
            </div>

            {/* Card 4: Song Duration (TikTok) */}
            <div className="p-2.5 rounded-xl bg-[var(--muted-bg)]/40 border border-[var(--border)] space-y-1">
              <span className="text-[10px] text-[var(--muted)] block flex items-center gap-1">
                <Clock className="w-3 h-3 text-red-500" />
                <span>Track Length:</span>
              </span>
              <span className="text-sm font-bold text-red-600 dark:text-red-400">
                {era.avgDurationMin.toFixed(1)} min
              </span>
              <span className="text-[9px] text-[var(--muted)] block truncate">
                {era.id === "digital" ? "-33% Compression" : "Full Arrangement"}
              </span>
            </div>
          </div>

          {/* Gridded t-SNE Plot with Named Axes */}
          <div className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--muted-bg)]/20 font-mono space-y-2">
            <div className="flex flex-wrap items-center justify-between text-xs gap-1">
              <div className="flex items-center gap-1.5 font-bold text-[var(--foreground)]">
                <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                <span>t-SNE Acoustic Manifold Geometry (N=2,000, Perplexity: 30)</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 font-semibold">
                {era.manifoldState}
              </span>
            </div>

            {/* SVG Gridded Plot with Named Axes */}
            <div className="w-full rounded-lg bg-[var(--card)] border border-[var(--border)] p-2 overflow-hidden">
              <svg
                viewBox="0 0 540 240"
                className="w-full h-auto select-none"
                style={{ fontVariantNumeric: "tabular-nums" }}
              >
                <defs>
                  {/* Subtle Grid Pattern */}
                  <pattern id="tsneSubGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-[var(--border)] opacity-30" />
                  </pattern>
                </defs>

                {/* Plot Background Area: x=55..520, y=15..205 */}
                <rect x="55" y="15" width="465" height="190" fill="url(#tsneSubGrid)" rx="4" />
                <rect x="55" y="15" width="465" height="190" fill="none" stroke="currentColor" strokeWidth="1" className="text-[var(--border)]" rx="4" />

                {/* Zero Axes crosshair */}
                <line x1="287" y1="15" x2="287" y2="205" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" className="text-[var(--muted)] opacity-40" />
                <line x1="55" y1="110" x2="520" y2="110" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" className="text-[var(--muted)] opacity-40" />

                {/* Y-Axis Coordinate Ticks (Energy & Loudness) */}
                <g fontSize="7.5" fontFamily="monospace" fill="currentColor" className="text-[var(--muted)]" textAnchor="end">
                  <text x="50" y="24">+20</text>
                  <line x1="51" y1="20" x2="55" y2="20" stroke="currentColor" strokeWidth="1" />
                  <text x="50" y="69">+10</text>
                  <line x1="51" y1="65" x2="55" y2="65" stroke="currentColor" strokeWidth="1" />
                  <text x="50" y="114">0</text>
                  <line x1="51" y1="110" x2="55" y2="110" stroke="currentColor" strokeWidth="1" />
                  <text x="50" y="159">-10</text>
                  <line x1="51" y1="155" x2="55" y2="155" stroke="currentColor" strokeWidth="1" />
                  <text x="50" y="204">-20</text>
                  <line x1="51" y1="200" x2="55" y2="200" stroke="currentColor" strokeWidth="1" />
                </g>

                {/* Y-Axis Title (Rotated) */}
                <text
                  x="-110"
                  y="16"
                  transform="rotate(-90)"
                  textAnchor="middle"
                  fill="currentColor"
                  className="text-[var(--muted)] font-mono text-[8.5px] font-bold"
                >
                  &larr; Low Energy &middot; t-SNE Dim 2 (Dynamic Energy &amp; Compression) &middot; High Loudness &rarr;
                </text>

                {/* X-Axis Coordinate Ticks (Acoustic Dispersion) */}
                <g fontSize="7.5" fontFamily="monospace" fill="currentColor" className="text-[var(--muted)]" textAnchor="middle">
                  <text x="95" y="217">-20</text>
                  <line x1="95" y1="205" x2="95" y2="209" stroke="currentColor" strokeWidth="1" />
                  <text x="190" y="217">-10</text>
                  <line x1="190" y1="205" x2="190" y2="209" stroke="currentColor" strokeWidth="1" />
                  <text x="287" y="217">0</text>
                  <line x1="287" y1="205" x2="287" y2="209" stroke="currentColor" strokeWidth="1" />
                  <text x="385" y="217">+10</text>
                  <line x1="385" y1="205" x2="385" y2="209" stroke="currentColor" strokeWidth="1" />
                  <text x="480" y="217">+20</text>
                  <line x1="480" y1="205" x2="480" y2="209" stroke="currentColor" strokeWidth="1" />
                </g>

                {/* X-Axis Title */}
                <text
                  x="287"
                  y="233"
                  textAnchor="middle"
                  fill="currentColor"
                  className="text-[var(--muted)] font-mono text-[8.5px] font-bold"
                >
                  &larr; Electronic / Synthetic &middot; t-SNE Dim 1 (Timbre &amp; Acoustic Dispersion) &middot; Organic Acoustic &rarr;
                </text>

                {/* Cluster Points & Labels */}
                {era.tsneClusters.map((cluster, idx) => (
                  <g key={idx} className="transition-all duration-300">
                    {/* Cluster Halo */}
                    <circle
                      cx={cluster.x}
                      cy={cluster.y}
                      r={era.id === "digital" ? "14" : "18"}
                      fill={cluster.color}
                      fillOpacity={era.id === "digital" ? "0.25" : "0.15"}
                      stroke={cluster.color}
                      strokeWidth="1.2"
                      strokeDasharray={era.id === "digital" ? "none" : "2 2"}
                    />
                    {/* Centroid Point */}
                    <circle
                      cx={cluster.x}
                      cy={cluster.y}
                      r="3.5"
                      fill={cluster.color}
                      stroke="#ffffff"
                      strokeWidth="1"
                    />
                    {/* Cluster Label Badge */}
                    <rect
                      x={cluster.x - 38}
                      y={cluster.y - 18}
                      width="76"
                      height="12"
                      rx="3"
                      fill="currentColor"
                      className="text-[var(--card)]"
                      stroke={cluster.color}
                      strokeWidth="0.8"
                    />
                    <text
                      x={cluster.x}
                      y={cluster.y - 9.5}
                      textAnchor="middle"
                      fill="currentColor"
                      className="text-[var(--foreground)] font-mono text-[6.5px] font-bold"
                    >
                      {cluster.genre}
                    </text>
                  </g>
                ))}
              </svg>
            </div>
          </div>

          {/* Bottom Row: Lyrical Dissonance + Variance Homogenization Synthesis */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
            {/* Box A: Lyrical Dissonance */}
            <div className="p-3 rounded-xl border border-[var(--border)] bg-[var(--muted-bg)]/30 space-y-1.5">
              <div className="flex items-center justify-between text-[11px] font-bold text-[var(--foreground)]">
                <span>Lyrical vs. Valence Dissonance:</span>
                <span className="text-blue-600 dark:text-blue-400">
                  {era.lyricalDissonancePct}%
                </span>
              </div>
              <p className="text-[10.5px] text-[var(--muted)] leading-relaxed">
                {era.id === "digital"
                  ? "Surge of 'cheerful despair': modern radio hits pair high-energy dance beats with alienated, melancholic lyrics."
                  : era.id === "electric"
                  ? "Tight emotional coherence: buoyant uptempo rock & disco tracks carry optimistic, celebratory lyrical themes."
                  : "Acoustic harmony alignment: folk and blues ballads directly reflect lyrical sorrow or optimism without production disguise."}
              </p>
            </div>

            {/* Box B: Diversity & Homogenization */}
            <div className="p-3 rounded-xl border border-[var(--border)] bg-[var(--muted-bg)]/30 space-y-1.5">
              <div className="flex items-center justify-between text-[11px] font-bold text-[var(--foreground)]">
                <span>Annual Diversity Dispersion Index:</span>
                <span className="text-indigo-600 dark:text-indigo-400">
                  &sigma; = {era.diversityStdDev.toFixed(2)}
                </span>
              </div>
              <p className="text-[10.5px] text-[var(--muted)] leading-relaxed">
                {era.id === "digital"
                  ? "The 'Death of Variety': normalized feature standard deviation collapsed post-2000 as streaming algorithms favored standardized templates."
                  : "Peak acoustic diversity: organic multi-instrumentation, brass sections, and non-quantized tempos preserved wide dynamic variance."}
              </p>
            </div>
          </div>
        </div>

        {/* Right Container: Era Cultural Context & Benchmark Tracks */}
        <div className="p-4 space-y-3 font-mono">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-wider text-[var(--muted)] flex items-center gap-1">
              <Activity className="w-3.5 h-3.5 text-emerald-500" />
              <span>Cultural &amp; Studio Context</span>
            </span>
            <span className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-semibold">
              {era.range}
            </span>
          </div>

          <div className="p-3 rounded-xl border border-[var(--border)] bg-[var(--muted-bg)]/40 text-xs space-y-2">
            <h4 className="font-bold text-[var(--foreground)] text-sm">
              {era.name}
            </h4>
            <p className="text-[11px] text-[var(--muted)] leading-relaxed">
              {era.summary}
            </p>
          </div>

          {/* Dominant Genres */}
          <div className="space-y-1.5">
            <span className="text-[10px] text-[var(--muted)] uppercase font-semibold block">
              Macro-Genres in Cohort:
            </span>
            <div className="flex flex-wrap gap-1">
              {era.topGenres.map((genre, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded text-[10px] bg-[var(--card)] border border-[var(--border)] text-[var(--foreground)]"
                >
                  {genre}
                </span>
              ))}
            </div>
          </div>

          {/* Benchmark Analyzed Tracks */}
          <div className="space-y-1.5 pt-1">
            <span className="text-[10px] text-[var(--muted)] uppercase font-semibold block">
              Benchmark Tracks Analyzed:
            </span>
            <div className="space-y-1">
              {era.sampleTracks.map((track, idx) => (
                <div
                  key={idx}
                  className="p-2 rounded-lg bg-[var(--card)] border border-[var(--border)]/70 text-[11px] flex items-center justify-between"
                >
                  <div className="truncate pr-2">
                    <span className="font-bold text-[var(--foreground)]">{track.title}</span>
                    <span className="text-[var(--muted)] block text-[10px]">{track.artist} ({track.year})</span>
                  </div>
                  {track.dissonance && (
                    <span className="shrink-0 text-[9px] px-1.5 py-0.5 rounded font-bold bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/30">
                      Dissonant
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Thesis Note */}
      <div className="p-3 border-t border-[var(--border)] bg-[var(--muted-bg)]/20 text-xs font-mono text-[var(--muted)] flex items-center justify-between">
        <span className="truncate pr-4">
          <strong className="text-[var(--foreground)]">Centennial Finding:</strong> Music transitioned from acoustic divergence (1920–1960) to electric expansion (1960–1990) to algorithmic standardization, dynamic range compression, and emotional dissonance (1990–Present).
        </span>
        <span className="text-[10px] shrink-0 text-emerald-600 dark:text-emerald-400 font-semibold">
          Spotify 550k Study
        </span>
      </div>
    </div>
  );
}

// Background SVG representation for the portfolio hero card
export function getSpotifyTrendCardSvg(): string {
  return `
    <svg viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
      <defs>
        <linearGradient id="spotGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#10b981" stop-opacity="0.3"/>
          <stop offset="100%" stop-color="#3b82f6" stop-opacity="0.1"/>
        </linearGradient>
      </defs>
      <!-- Decadal waveform bars -->
      <rect x="30" y="140" width="8" height="50" rx="2" fill="#f59e0b" opacity="0.6"/>
      <rect x="50" y="130" width="8" height="60" rx="2" fill="#f59e0b" opacity="0.6"/>
      <rect x="70" y="110" width="8" height="80" rx="2" fill="#f59e0b" opacity="0.6"/>
      <rect x="110" y="90" width="8" height="100" rx="2" fill="#3b82f6" opacity="0.6"/>
      <rect x="130" y="70" width="8" height="120" rx="2" fill="#3b82f6" opacity="0.7"/>
      <rect x="150" y="80" width="8" height="110" rx="2" fill="#3b82f6" opacity="0.7"/>
      <rect x="200" y="50" width="8" height="140" rx="2" fill="#10b981" opacity="0.8"/>
      <rect x="220" y="45" width="8" height="145" rx="2" fill="#10b981" opacity="0.8"/>
      <rect x="240" y="40" width="8" height="150" rx="2" fill="#10b981" opacity="0.9"/>
      <!-- Downward duration line -->
      <path class="spotify-duration-trend" d="M 30 70 L 150 60 L 280 130 L 370 160" stroke="#ef4444" stroke-width="2.5" fill="none" stroke-dasharray="4 4"/>
      <!-- t-SNE scatter points -->
      <circle cx="320" cy="60" r="10" fill="#10b981" fill-opacity="0.2" stroke="#10b981"/>
      <circle cx="340" cy="75" r="12" fill="#3b82f6" fill-opacity="0.2" stroke="#3b82f6"/>
      <circle cx="310" cy="85" r="8" fill="#8b5cf6" fill-opacity="0.2" stroke="#8b5cf6"/>
      <line class="spotify-decade-playhead" x1="0" y1="30" x2="0" y2="194" stroke="#34d399" stroke-width="1.5" stroke-dasharray="3 3" opacity="0.9"/>
    </svg>
  `;
}
