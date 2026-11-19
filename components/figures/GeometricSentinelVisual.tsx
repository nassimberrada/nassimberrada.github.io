"use client";

import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCw, Activity, ShieldAlert, Cpu, Sparkles, CheckCircle2, ChevronRight } from "lucide-react";

// Unit offsets for 8 sentinel points per class (Class 1 & Class 2)
const BASE_OFFSETS_C1: [number, number][] = [
  [-0.62, -0.38],
  [-0.25, -0.72],
  [0.34, -0.58],
  [0.68, -0.15],
  [0.48, 0.52],
  [0.05, 0.68],
  [-0.52, 0.42],
  [0.08, 0.05],
];

const BASE_OFFSETS_C2: [number, number][] = [
  [0.62, -0.38],
  [0.25, -0.72],
  [-0.34, -0.58],
  [-0.68, -0.15],
  [-0.48, 0.52],
  [-0.05, 0.68],
  [0.52, 0.42],
  [-0.08, 0.05],
];

// Rehearsal windows [startChunk, endChunk] across the 30-chunk stream
const REHEARSAL_WINDOWS: [number, number][] = [
  [3.0, 5.0],
  [8.5, 10.5],
  [15.0, 17.0],
  [22.0, 24.0],
];

const COOLDOWN_DURATION = 2.0;

interface FrameMetrics {
  state: "IDLE" | "AUDIT" | "TRIGGERED" | "REHEARSAL" | "COOLDOWN";
  stateColor: string;
  mei: number;
  rm: number;
  margin: number;
  ssub: number;
  c1Radius: number;
  c2Radius: number;
  c1Center: [number, number];
  c2Center: [number, number];
  replayAlpha: number; // 0 = pure stream, 1 = 50/50 replay
}

function computeFrameMetrics(t: number): FrameMetrics {
  const normT = ((t % 30) + 30) % 30;

  let activeWindowIdx = -1;
  let inCooldown = false;
  let cycleProgress = 0;

  for (let i = 0; i < REHEARSAL_WINDOWS.length; i++) {
    const [start, end] = REHEARSAL_WINDOWS[i];
    const prevEnd = i === 0 ? 0 : REHEARSAL_WINDOWS[i - 1][1] + COOLDOWN_DURATION;

    if (normT >= start && normT <= end) {
      activeWindowIdx = i;
      break;
    }
    if (normT > end && normT <= end + COOLDOWN_DURATION) {
      inCooldown = true;
      break;
    }
    if (normT >= prevEnd && normT < start) {
      cycleProgress = (normT - prevEnd) / (start - prevEnd);
      break;
    }
  }

  let mei: number;
  let replayAlpha = 0;
  let state: FrameMetrics["state"] = "IDLE";
  let stateColor = "#10b981"; // emerald

  if (activeWindowIdx !== -1) {
    const [wStart, wEnd] = REHEARSAL_WINDOWS[activeWindowIdx];
    const progress = (normT - wStart) / (wEnd - wStart);
    mei = 1.10 + 0.62 * 0.5 * (1 + Math.cos(progress * Math.PI));
    replayAlpha = Math.sin(progress * Math.PI);
    state = "REHEARSAL";
    stateColor = "#06b6d4"; // cyan/blue
  } else if (inCooldown) {
    const cooldownProgress = (normT - REHEARSAL_WINDOWS[3][1]) / COOLDOWN_DURATION;
    mei = 1.08 + Math.sin(cooldownProgress * Math.PI) * 0.04;
    state = "COOLDOWN";
    stateColor = "#8b5cf6"; // purple
  } else if (normT >= 26.0) {
    const p = (normT - 26.0) / 4.0;
    const settle = 0.5 * (1 + Math.cos(p * Math.PI));
    mei = 1.05 + 0.05 * settle;
    state = "IDLE";
    stateColor = "#10b981";
  } else {
    const smoothCurve = Math.pow(cycleProgress, 1.8);
    mei = 1.05 + smoothCurve * 0.67;
    if (mei >= 1.65) {
      state = "TRIGGERED";
      stateColor = "#ef4444"; // red/amber trigger
    } else if (mei >= 1.25) {
      state = "AUDIT";
      stateColor = "#f59e0b"; // warning
    }
  }

  const severity = Math.max(0, Math.min(1, (mei - 1.05) / 0.67));
  const rm = 0.18 + severity * 0.20;
  const margin = 0.62 - severity * 0.31;
  const ssub = 1.0 - severity * 0.28;

  const c1Radius = 26 + severity * 22;
  const c2Radius = 26 + severity * 22;

  const verticalWobble = Math.sin((normT / 30) * Math.PI * 4) * 2;
  const c1Center: [number, number] = [130 + severity * 22, 95 + verticalWobble];
  const c2Center: [number, number] = [250 - severity * 22, 95 - verticalWobble];

  return {
    state,
    stateColor,
    mei,
    rm,
    margin,
    ssub,
    c1Radius,
    c2Radius,
    c1Center,
    c2Center,
    replayAlpha,
  };
}

export function GeometricSentinelVisual() {
  const [chunk, setChunk] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isScrubbing, setIsScrubbing] = useState<boolean>(false);
  const lastTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isPlaying || isScrubbing) {
      lastTimeRef.current = null;
      return;
    }

    let reqId: number;
    const speed = 2.4; // 30 chunks in 12.5 seconds

    const tick = (now: number) => {
      if (lastTimeRef.current !== null) {
        const delta = (now - lastTimeRef.current) / 1000;
        setChunk((prev) => (prev + delta * speed) % 30);
      }
      lastTimeRef.current = now;
      reqId = requestAnimationFrame(tick);
    };

    reqId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(reqId);
  }, [isPlaying, isScrubbing]);

  const frame = computeFrameMetrics(chunk);

  // Compute sentinel point coordinates
  const dotsC1 = BASE_OFFSETS_C1.map(([ox, oy]) => [
    frame.c1Center[0] + ox * frame.c1Radius,
    frame.c1Center[1] + oy * frame.c1Radius,
  ]);

  const dotsC2 = BASE_OFFSETS_C2.map(([ox, oy]) => [
    frame.c2Center[0] + ox * frame.c2Radius,
    frame.c2Center[1] + oy * frame.c2Radius,
  ]);

  return (
    <div className="w-full my-6 rounded-[14px] border border-[var(--border)] bg-[var(--card)] p-4 sm:p-6 shadow-sm overflow-hidden select-none font-sans">
      {/* Top Header & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-4 border-b border-[var(--border)]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--foreground)]">
              Sentinel Manifold Telemetry &amp; Closed-Loop Actuation
            </span>
            <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold">
              <Activity className="w-3 h-3" /> LIVE PROBING
            </span>
          </div>
          <p className="text-xs text-[var(--muted)] mt-1 font-mono">
            Forward-only activation tracking across 30 adaptation chunks (600 steps)
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-[var(--foreground)]">
            Chunk <strong className="text-emerald-600 dark:text-emerald-400">{chunk.toFixed(1).padStart(4, "0")}</strong> / 30 · Step{" "}
            <strong className="text-emerald-600 dark:text-emerald-400">{Math.round(chunk * 20)}</strong> / 600
          </span>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono font-semibold border border-[var(--border)] bg-[var(--card)] hover:border-emerald-500/50 text-[var(--foreground)] transition-colors shadow-xs"
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 text-emerald-500" /> Pause
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-emerald-500" /> Play
              </>
            )}
          </button>
          <button
            onClick={() => setChunk(0)}
            className="p-1.5 rounded-lg border border-[var(--border)] hover:border-emerald-500/50 text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
            title="Reset timeline"
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Grid: Left 2D Manifold Projection + Right Diagnostics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-4">
        {/* Left: Manifold SVG Canvas (7 cols) */}
        <div className="lg:col-span-7 rounded-xl border border-[var(--border)] bg-[var(--card)]/80 p-3.5 flex flex-col justify-between shadow-xs">
          <div className="flex items-center justify-between text-[11px] font-mono mb-2">
            <span className="text-[var(--muted)]">Layer 18 Sentinel Space Projection (d=896 → 2D)</span>
            <span
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded font-bold uppercase tracking-wider text-[10px]"
              style={{
                color: frame.stateColor,
                backgroundColor: `${frame.stateColor}15`,
                border: `1px solid ${frame.stateColor}40`,
              }}
            >
              ● {frame.state}
            </span>
          </div>

          <div className="relative w-full aspect-[2/1] overflow-hidden rounded-lg bg-[var(--card)]/90 border border-[var(--border)]/70">
            <svg viewBox="0 0 380 190" className="w-full h-full select-none">
              <defs>
                <pattern id="sentinel-grid" width="19" height="19" patternUnits="userSpaceOnUse">
                  <path d="M 19 0 L 0 0 0 19" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-[var(--border)]/50" />
                </pattern>
              </defs>
              <rect width="380" height="190" fill="url(#sentinel-grid)" />

              {/* Readout Hyperplane */}
              <line
                x1="190"
                y1="12"
                x2="190"
                y2="178"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeDasharray="4 3"
                className="text-[var(--border)]"
              />
              <text x="190" y="184" fill="currentColor" fontSize="7.5" fontFamily="monospace" textAnchor="middle" className="text-[var(--muted)]">
                Readout Hyperplane
              </text>

              {/* Inter-Class Nearest-Neighbor Margin Bracket */}
              <g>
                <line
                  x1={frame.c1Center[0] + frame.c1Radius}
                  y1="34"
                  x2={frame.c2Center[0] - frame.c2Radius}
                  y2="34"
                  stroke={frame.mei >= 1.65 ? "#ef4444" : "#10b981"}
                  strokeWidth="1.5"
                />
                <line
                  x1={frame.c1Center[0] + frame.c1Radius}
                  y1="29"
                  x2={frame.c1Center[0] + frame.c1Radius}
                  y2="39"
                  stroke={frame.mei >= 1.65 ? "#ef4444" : "#10b981"}
                  strokeWidth="1"
                />
                <line
                  x1={frame.c2Center[0] - frame.c2Radius}
                  y1="29"
                  x2={frame.c2Center[0] - frame.c2Radius}
                  y2="39"
                  stroke={frame.mei >= 1.65 ? "#ef4444" : "#10b981"}
                  strokeWidth="1"
                />
                <text
                  x="190"
                  y="27"
                  fill={frame.mei >= 1.65 ? "#ef4444" : "#10b981"}
                  fontSize="8.5"
                  fontFamily="monospace"
                  fontWeight="bold"
                  textAnchor="middle"
                >
                  Δmargin = {frame.margin.toFixed(2)}
                </text>
              </g>

              {/* Class 1 Manifold Ellipse (µ1) */}
              <circle
                cx={frame.c1Center[0]}
                cy={frame.c1Center[1]}
                r={frame.c1Radius}
                fill="#10b981"
                fillOpacity="0.08"
                stroke="#10b981"
                strokeWidth={frame.state === "REHEARSAL" ? 2 : 1.2}
                strokeDasharray={frame.mei >= 1.65 ? "3 3" : "none"}
              />
              <circle cx={frame.c1Center[0]} cy={frame.c1Center[1]} r="3" fill="#10b981" />
              <text
                x={frame.c1Center[0]}
                y={frame.c1Center[1] - frame.c1Radius - 6}
                fill="#10b981"
                fontSize="9"
                fontFamily="monospace"
                fontWeight="bold"
                textAnchor="middle"
              >
                Class µ₁ (Intent A)
              </text>
              {dotsC1.map(([x, y], i) => (
                <circle key={`c1-${i}`} cx={x} cy={y} r="2.4" fill="#10b981" opacity="0.9" />
              ))}

              {/* Class 2 Manifold Ellipse (µ2) */}
              <circle
                cx={frame.c2Center[0]}
                cy={frame.c2Center[1]}
                r={frame.c2Radius}
                fill={frame.mei >= 1.65 ? "#ef4444" : "#06b6d4"}
                fillOpacity={frame.mei >= 1.65 ? "0.15" : "0.08"}
                stroke={frame.mei >= 1.65 ? "#ef4444" : "#06b6d4"}
                strokeWidth={frame.state === "REHEARSAL" ? 2 : 1.2}
                strokeDasharray={frame.mei >= 1.65 ? "3 3" : "none"}
              />
              <circle cx={frame.c2Center[0]} cy={frame.c2Center[1]} r="3" fill={frame.mei >= 1.65 ? "#ef4444" : "#06b6d4"} />
              <text
                x={frame.c2Center[0]}
                y={frame.c2Center[1] - frame.c2Radius - 6}
                fill={frame.mei >= 1.65 ? "#ef4444" : "#06b6d4"}
                fontSize="9"
                fontFamily="monospace"
                fontWeight="bold"
                textAnchor="middle"
              >
                Class µ₂ (Intent B)
              </text>
              {dotsC2.map(([x, y], i) => (
                <circle key={`c2-${i}`} cx={x} cy={y} r="2.4" fill={frame.mei >= 1.65 ? "#ef4444" : "#06b6d4"} opacity="0.9" />
              ))}

              {/* Dynamic Alert Banner */}
              {frame.mei >= 1.65 && (
                <g>
                  <rect x="95" y="140" width="190" height="22" rx="4" fill="rgba(15, 23, 42, 0.9)" stroke="#ef4444" strokeWidth="1.2" />
                  <text
                    x="190"
                    y="154"
                    fill="#ef4444"
                    fontSize="8"
                    fontFamily="monospace"
                    textAnchor="middle"
                    fontWeight="bold"
                  >
                    ⚠ TRIPWIRE BREACH: MARGIN COLLAPSE
                  </text>
                </g>
              )}
            </svg>
          </div>

          <div className="flex items-center justify-between text-[10px] font-mono text-[var(--muted)] mt-2">
            <span>Intra-class radius R_M = {frame.rm.toFixed(2)}</span>
            <span>Subspace Alignment S = {frame.ssub.toFixed(2)}</span>
          </div>
        </div>

        {/* Right: Diagnostics & Telemetry Dashboard (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-3">
          {/* MEI Telemetry Card */}
          <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-3.5 shadow-xs">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-mono text-[var(--muted)] uppercase tracking-wider">
                Manifold Entanglement (MEI<sub>rel</sub>)
              </span>
              <span
                className="text-base font-bold font-mono"
                style={{ color: frame.mei >= 1.65 ? "#ef4444" : "#10b981" }}
              >
                {frame.mei.toFixed(3)}
              </span>
            </div>

            {/* Gauge Bar */}
            <div className="relative w-full h-2 rounded-full bg-[var(--border)] overflow-hidden my-2">
              <div
                className="absolute top-0 bottom-0 left-[82.5%] w-0.5 bg-red-500 z-10"
                title="Tripwire Threshold τ = 1.65"
              />
              <div
                className="h-full rounded-full transition-all duration-75"
                style={{
                  width: `${Math.min(100, Math.max(0, (frame.mei / 2.0) * 100))}%`,
                  backgroundColor: frame.mei >= 1.65 ? "#ef4444" : "#10b981",
                }}
              />
            </div>

            <div className="flex justify-between text-[9px] font-mono text-[var(--muted)]">
              <span>1.0 (Pristine)</span>
              <span className="text-red-500 font-semibold">τ = 1.65</span>
              <span>2.0 (Severe)</span>
            </div>

            {/* 3 Metric Pills */}
            <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-[var(--border)]">
              <div className="p-2 rounded-lg bg-[var(--card)]/90 border border-[var(--border)] text-center">
                <span className="text-[9px] font-mono text-[var(--muted)] block">Radius R_M</span>
                <span className="text-xs font-mono font-bold text-[var(--foreground)]">{frame.rm.toFixed(2)}</span>
              </div>
              <div className="p-2 rounded-lg bg-[var(--card)]/90 border border-[var(--border)] text-center">
                <span className="text-[9px] font-mono text-[var(--muted)] block">Margin Δ</span>
                <span className="text-xs font-mono font-bold text-[var(--foreground)]">{frame.margin.toFixed(2)}</span>
              </div>
              <div className="p-2 rounded-lg bg-[var(--card)]/90 border border-[var(--border)] text-center">
                <span className="text-[9px] font-mono text-[var(--muted)] block">Grassmann S</span>
                <span className="text-xs font-mono font-bold text-[var(--foreground)]">{frame.ssub.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Prompt Slot Allocation Budget */}
          <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-3.5 shadow-xs">
            <div className="flex items-center justify-between text-[10px] font-mono mb-2">
              <span className="text-[var(--muted)]">Prompt-Slot Budget: B<sub>total</sub> = 4</span>
              <span
                className="font-bold"
                style={{ color: frame.replayAlpha > 0.05 ? "#06b6d4" : "#10b981" }}
              >
                {frame.replayAlpha > 0.05 ? "Replay Mix (α = 0.5)" : "Pure Stream (100% B)"}
              </span>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {[0, 1, 2, 3].map((slotIdx) => {
                const isReplaySlot = slotIdx >= 2;
                const slotAlpha = isReplaySlot ? frame.replayAlpha : 0;
                const isReplaying = slotAlpha > 0.4;

                return (
                  <div
                    key={slotIdx}
                    className={`h-11 rounded-lg border flex flex-col items-center justify-center transition-colors ${
                      isReplaying
                        ? "border-cyan-500 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400"
                        : "border-[var(--border)] bg-[var(--card)]/60 text-[var(--foreground)]"
                    }`}
                  >
                    <strong className="text-sm font-mono">{isReplaying ? "A" : "B"}</strong>
                    <span className="text-[8px] font-mono opacity-80">{isReplaying ? "Replay" : "Incoming"}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Bottom Timeline Scrubber */}
      <div className="rounded-xl border border-[var(--border)] bg-[var(--card)]/70 p-3 shadow-xs">
        <div className="flex items-center justify-between text-[10px] font-mono text-[var(--muted)] mb-1.5">
          <span>Continuous Stream Execution (4 Surgical Rehearsal Windows · W=2 chunks)</span>
          <span className="text-emerald-600 dark:text-emerald-400">Conserves 47% Replay Compute (17.3k vs 32.6k tokens)</span>
        </div>

        {/* Scrubber Track */}
        <div
          className="relative h-6 rounded-lg border border-[var(--border)] overflow-hidden cursor-pointer grid grid-cols-30 gap-0.5 bg-[var(--card)]"
          style={{ gridTemplateColumns: "repeat(30, minmax(0, 1fr))" }}
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const clickPos = (e.clientX - rect.left) / rect.width;
            setChunk(Math.max(0, Math.min(29.9, clickPos * 30)));
          }}
        >
          {Array.from({ length: 30 }).map((_, i) => {
            const inReplay = REHEARSAL_WINDOWS.some(([start, end]) => i >= Math.floor(start) && i <= Math.floor(end));
            return (
              <div
                key={i}
                className={`h-full transition-opacity ${
                  inReplay ? "bg-cyan-500 opacity-90" : "bg-[var(--border)]/40 opacity-50"
                }`}
              />
            );
          })}

          {/* Smooth Playhead Marker */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-emerald-500 shadow-[0_0_8px_#10b981] z-10 pointer-events-none transition-transform"
            style={{ left: `${(chunk / 30) * 100}%` }}
          />
        </div>

        <div className="flex justify-between text-[9px] font-mono text-[var(--muted)] mt-1.5">
          <span>Chunk 00</span>
          <span>Chunk 10</span>
          <span>Chunk 20</span>
          <span>Chunk 30 (600 steps)</span>
        </div>
      </div>

      {/* Summary KPI Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-3 border-t border-[var(--border)]">
        <div className="p-2.5 rounded-xl border border-[var(--border)] bg-[var(--card)] text-center shadow-xs">
          <div className="text-[10px] font-mono text-[var(--muted)] uppercase tracking-wider">
            Operational Lead Time
          </div>
          <div className="text-base font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-0.5">
            +10 Steps
          </div>
          <div className="text-[10px] text-[var(--muted)] font-mono">
            Advance warning window
          </div>
        </div>

        <div className="p-2.5 rounded-xl border border-[var(--border)] bg-[var(--card)] text-center shadow-xs">
          <div className="text-[10px] font-mono text-[var(--muted)] uppercase tracking-wider">
            Skill A Retention
          </div>
          <div className="text-base font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-0.5">
            74.8%
          </div>
          <div className="text-[10px] text-[var(--muted)] font-mono">
            +2.8 pp vs scalar tracking
          </div>
        </div>

        <div className="p-2.5 rounded-xl border border-[var(--border)] bg-[var(--card)] text-center shadow-xs">
          <div className="text-[10px] font-mono text-[var(--muted)] uppercase tracking-wider">
            Plasticity Protection
          </div>
          <div className="text-base font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-0.5">
            79.6%
          </div>
          <div className="text-[10px] text-[var(--muted)] font-mono">
            Negligible plasticity cost
          </div>
        </div>

        <div className="p-2.5 rounded-xl border border-[var(--border)] bg-[var(--card)] text-center shadow-xs">
          <div className="text-[10px] font-mono text-[var(--muted)] uppercase tracking-wider">
            Total Compute Footprint
          </div>
          <div className="text-base font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-0.5">
            146k GFLOPs
          </div>
          <div className="text-[10px] text-[var(--muted)] font-mono">
            47% fewer replay tokens
          </div>
        </div>
      </div>
    </div>
  );
}

// Background SVG for InfiniteGridHero Card
export function getGeometricSentinelCardSvg(): string {
  return `<svg viewBox="0 0 320 180" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" fill="none">
    <defs>
      <linearGradient id="sentinel-glow" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#10b981" stop-opacity="0.25"/>
        <stop offset="50%" stop-color="#06b6d4" stop-opacity="0.18"/>
        <stop offset="100%" stop-color="#10b981" stop-opacity="0.08"/>
      </linearGradient>
    </defs>
    
    <!-- Outer Card Frame -->
    <rect x="20" y="25" width="280" height="130" rx="8" fill="url(#sentinel-glow)" stroke="#10b981" stroke-opacity="0.35" stroke-width="1.2"/>
    
    <!-- Manifold Hyperplane & Ellipses -->
    <line x1="160" y1="35" x2="160" y2="145" stroke="#10b981" stroke-opacity="0.25" stroke-dasharray="3 3"/>
    
    <!-- Class 1 Manifold -->
    <circle class="sentinel-cluster-a" cx="115" cy="90" r="24" stroke="#10b981" stroke-width="1.5" stroke-opacity="0.7" fill="#10b981" fill-opacity="0.1"/>
    <circle cx="115" cy="90" r="2.5" fill="#10b981"/>
    <circle cx="106" cy="82" r="1.8" fill="#10b981" opacity="0.8"/>
    <circle cx="124" cy="98" r="1.8" fill="#10b981" opacity="0.8"/>
    
    <!-- Class 2 Manifold -->
    <circle class="sentinel-cluster-b" cx="205" cy="90" r="24" stroke="#06b6d4" stroke-width="1.5" stroke-opacity="0.7" fill="#06b6d4" fill-opacity="0.1"/>
    <circle cx="205" cy="90" r="2.5" fill="#06b6d4"/>
    <circle cx="196" cy="82" r="1.8" fill="#06b6d4" opacity="0.8"/>
    <circle cx="214" cy="98" r="1.8" fill="#06b6d4" opacity="0.8"/>

    <!-- Margin Indicator -->
    <line class="sentinel-margin-bracket" x1="139" y1="52" x2="181" y2="52" stroke="#10b981" stroke-width="1.2"/>
    <line x1="139" y1="48" x2="139" y2="56" stroke="#10b981" stroke-width="1"/>
    <line x1="181" y1="48" x2="181" y2="56" stroke="#10b981" stroke-width="1"/>

    <!-- Badge -->
    <rect x="180" y="128" width="110" height="18" rx="4" fill="#10b981" fill-opacity="0.2" stroke="#10b981" stroke-width="0.8"/>
    <text x="188" y="140" font-family="monospace" font-size="7" font-weight="bold" fill="#10b981">MEI_rel: Δt = +10 steps</text>
  </svg>`;
}
