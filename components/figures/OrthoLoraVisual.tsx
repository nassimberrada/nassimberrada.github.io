"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, Layers, Play, Pause, RotateCw, CheckCircle2 } from "lucide-react";

interface PromptScenario {
  id: string;
  label: string;
  task: string;
  tokens: string[];
  channels: {
    name: string;
    label: string;
    concept: string;
    color: string;
    angleOrtho: number; // degrees in polar layout
    angleStd: number;
    tokenWeights: number[]; // activations across tokens [0..1]
  }[];
  metrics: {
    ortho: {
      cgram: string;
      deff: string;
      dkl: string;
      latency: string;
    };
    std: {
      cgram: string;
      deff: string;
      dkl: string;
      latency: string;
    };
  };
}

const SCENARIOS: PromptScenario[] = [
  {
    id: "affective",
    label: "Affective Aesthetics (TweetEval)",
    task: "Fine-grained Sentiment & Aesthetics",
    tokens: ["The", "performance", "was", "truly", "enchanting", "and", "melodic"],
    channels: [
      {
        name: "z1",
        label: "b1",
        concept: "enchanting",
        color: "#10b981", // emerald
        angleOrtho: 40,
        angleStd: 32,
        tokenWeights: [0.08, 0.22, 0.12, 0.55, 0.98, 0.18, 0.35],
      },
      {
        name: "z2",
        label: "b2",
        concept: "gorgeous",
        color: "#10b981", // indigo
        angleOrtho: 85,
        angleStd: 38,
        tokenWeights: [0.05, 0.18, 0.1, 0.48, 0.86, 0.12, 0.28],
      },
      {
        name: "z3",
        label: "b3",
        concept: "nostalgic",
        color: "#10b981", // emerald
        angleOrtho: 135,
        angleStd: 44,
        tokenWeights: [0.1, 0.35, 0.15, 0.3, 0.42, 0.22, 0.72],
      },
      {
        name: "z4",
        label: "b4",
        concept: "melodic",
        color: "#8b5cf6", // purple
        angleOrtho: 215,
        angleStd: 48,
        tokenWeights: [0.04, 0.28, 0.08, 0.25, 0.35, 0.14, 0.96],
      },
      {
        name: "z5",
        label: "b5",
        concept: "horrific",
        color: "#f59e0b", // amber
        angleOrtho: 295,
        angleStd: 53,
        tokenWeights: [0.02, 0.03, 0.05, 0.02, 0.01, 0.02, 0.01],
      },
      {
        name: "z6",
        label: "b6",
        concept: "chaotic",
        color: "#ef4444", // rose
        angleOrtho: 340,
        angleStd: 59,
        tokenWeights: [0.02, 0.04, 0.06, 0.03, 0.02, 0.03, 0.02],
      },
    ],
    metrics: {
      ortho: {
        cgram: "0.070",
        deff: "28.05 / 32",
        dkl: "0.068",
        latency: "0 ms (Merged)",
      },
      std: {
        cgram: "0.719",
        deff: "18.40 / 32",
        dkl: "0.221",
        latency: "0 ms (Merged)",
      },
    },
  },
  {
    id: "safety",
    label: "Safety & Toxicity (RealToxicityPrompts)",
    task: "Causal Toxicity Moderation",
    tokens: ["Those", "arriving", "at", "the", "border", "are", "seeking"],
    channels: [
      {
        name: "z1",
        label: "b1",
        concept: "humanitarian",
        color: "#10b981", // emerald
        angleOrtho: 45,
        angleStd: 35,
        tokenWeights: [0.08, 0.38, 0.12, 0.18, 0.45, 0.32, 0.96],
      },
      {
        name: "z2",
        label: "b2",
        concept: "families",
        color: "#10b981", // emerald
        angleOrtho: 100,
        angleStd: 42,
        tokenWeights: [0.12, 0.44, 0.09, 0.15, 0.38, 0.28, 0.82],
      },
      {
        name: "z3",
        label: "b3",
        concept: "due process",
        color: "#10b981", // indigo
        angleOrtho: 155,
        angleStd: 48,
        tokenWeights: [0.05, 0.22, 0.16, 0.22, 0.68, 0.38, 0.74],
      },
      {
        name: "z4",
        label: "b4",
        concept: "statutory",
        color: "#8b5cf6", // purple
        angleOrtho: 220,
        angleStd: 52,
        tokenWeights: [0.03, 0.12, 0.11, 0.2, 0.58, 0.22, 0.42],
      },
      {
        name: "z5",
        label: "b5",
        concept: "toxic / pejorative",
        color: "#ef4444", // red
        angleOrtho: 305,
        angleStd: 56,
        tokenWeights: [0.02, 0.04, 0.02, 0.03, 0.08, 0.04, 0.02],
      },
      {
        name: "z6",
        label: "b6",
        concept: "disorder",
        color: "#f59e0b", // amber
        angleOrtho: 350,
        angleStd: 60,
        tokenWeights: [0.04, 0.08, 0.05, 0.04, 0.12, 0.05, 0.03],
      },
    ],
    metrics: {
      ortho: {
        cgram: "0.059",
        deff: "27.80 / 32",
        dkl: "0.071",
        latency: "0 ms (Merged)",
      },
      std: {
        cgram: "0.709",
        deff: "17.90 / 32",
        dkl: "0.280",
        latency: "0 ms (Merged)",
      },
    },
  },
];

export function OrthoLoraVisual() {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>("affective");
  const [mode, setMode] = useState<"ortho" | "std">("ortho");
  const [activeTokenIdx, setActiveTokenIdx] = useState<number>(4); // default active token
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [hoveredChannel, setHoveredChannel] = useState<string | null>(null);

  const scenario = SCENARIOS.find((s) => s.id === selectedScenarioId) || SCENARIOS[0];
  const activeMetrics = scenario.metrics[mode];

  // Continuous Looping Animation Engine
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setActiveTokenIdx((prev) => (prev + 1) % scenario.tokens.length);
    }, 1300);

    return () => clearInterval(interval);
  }, [isPlaying, scenario.tokens.length]);

  // Coordinate geometry for 2D polar vector projection
  const originX = 140;
  const originY = 120;
  const radius = 86;

  return (
    <div className="w-full rounded-[14px] border border-[var(--border)] bg-[var(--card)] p-4 sm:p-6 shadow-sm font-sans select-none space-y-6">
      {/* Top Header & Interactive Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--border)]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--foreground)]">
              Endogenous Subspace Orthogonalization (Ortho-LoRA)
            </span>
          </div>
          <p className="text-xs text-[var(--muted)]">
            Attribution-conditioned Gram loss &#x2112;<sub>ortho</sub> decorrelates task-relevant write directions directly in the forward pass.
          </p>
        </div>

        {/* Action Controls: Mode Switch & Animation Loop Toggle */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          {/* Loop Play/Pause button */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            title={isPlaying ? "Pause token animation" : "Resume token animation"}
            className="p-1.5 rounded-lg border border-[var(--border)] bg-[var(--muted-bg)] text-[var(--muted)] hover:text-[var(--foreground)] transition-colors flex items-center gap-1.5 text-xs font-mono"
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
                <span className="hidden sm:inline">Looping</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-emerald-500" />
                <span className="hidden sm:inline">Play</span>
              </>
            )}
          </button>

          {/* Mode Toggle Button Group */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-[var(--muted-bg)] border border-[var(--border)]">
            <button
              onClick={() => setMode("ortho")}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all flex items-center gap-1.5 ${
                mode === "ortho"
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "text-[var(--muted)] hover:text-[var(--foreground)]"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ortho-LoRA</span>
            </button>
            <button
              onClick={() => setMode("std")}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all flex items-center gap-1.5 ${
                mode === "std"
                  ? "bg-slate-700 text-white shadow-sm"
                  : "text-[var(--muted)] hover:text-[var(--foreground)]"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Standard LoRA</span>
            </button>
          </div>
        </div>
      </div>

      {/* Task Benchmark Selector */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-mono text-[var(--muted)] uppercase tracking-wider">
            Evaluation Stream:
          </span>
          {SCENARIOS.map((s) => (
            <button
              key={s.id}
              onClick={() => {
                setSelectedScenarioId(s.id);
                setActiveTokenIdx(4);
              }}
              className={`px-3 py-1 rounded-lg text-xs font-mono transition-all border ${
                selectedScenarioId === s.id
                  ? "bg-emerald-500/10 border-emerald-500 text-emerald-600 dark:text-emerald-400 font-semibold shadow-xs"
                  : "border-[var(--border)] text-[var(--muted)] hover:text-[var(--foreground)] bg-[var(--muted-bg)]/40"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1.5 text-[11px] font-mono text-[var(--muted)]">
          <RotateCw className={`w-3 h-3 text-emerald-500 ${isPlaying ? "animate-spin" : ""}`} />
          <span>Scanning Token: <strong>{scenario.tokens[activeTokenIdx]}</strong></span>
        </div>
      </div>

      {/* Main Dual-Panel Flow Visual (Looping Process Visualization from Blog figure.ortho-flow) */}
      <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-4 sm:p-5 overflow-hidden">
        {/* Animated Token Sequence Prompt Bar */}
        <div className="flex flex-wrap items-center gap-2 pb-4 mb-4 border-b border-[var(--border)]">
          <span className="text-[11px] font-mono text-[var(--muted)] shrink-0">
            INPUT PROMPT TOKENS:
          </span>
          <div className="flex flex-wrap items-center gap-1.5">
            {scenario.tokens.map((token, idx) => {
              const isActive = activeTokenIdx === idx;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    setActiveTokenIdx(idx);
                    setIsPlaying(false);
                  }}
                  className={`px-2.5 py-1 rounded-md text-xs font-mono transition-all duration-300 relative ${
                    isActive
                      ? "bg-emerald-600 text-white font-bold shadow-md shadow-emerald-500/30 scale-105 border-emerald-500"
                      : "bg-[var(--muted-bg)] border border-[var(--border)] text-[var(--foreground)] hover:border-emerald-500/50"
                  }`}
                >
                  {token}
                  {isActive && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Matrix + Vector Space Projection */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Left Panel: Detector Channel Activations z_k = a_k^T x (6 cols) */}
          <div className="lg:col-span-6 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                <span>1. DETECTOR ACTIVATIONS</span>
                <span className="text-[10px] text-[var(--muted)] font-normal">
                  z_k = a_kᵀ x
                </span>
              </span>
              <span className="text-[10px] text-[var(--muted)]">
                Active: T{activeTokenIdx + 1} ({scenario.tokens[activeTokenIdx]})
              </span>
            </div>

            {/* Matrix Columns Header */}
            <div className="grid grid-cols-8 gap-1 text-[10px] font-mono text-[var(--muted)] text-center px-1">
              <span className="text-left">Rank</span>
              {scenario.tokens.map((t, i) => (
                <span
                  key={i}
                  className={`transition-colors duration-200 ${
                    activeTokenIdx === i ? "text-emerald-600 dark:text-emerald-400 font-bold" : ""
                  }`}
                >
                  T{i + 1}
                </span>
              ))}
            </div>

            {/* Matrix Rows with Active Column Highlighting */}
            <div className="space-y-1.5">
              {scenario.channels.map((ch) => {
                const currentWeight = ch.tokenWeights[activeTokenIdx];
                const isChannelActive = currentWeight > 0.4;

                return (
                  <div
                    key={ch.name}
                    onMouseEnter={() => setHoveredChannel(ch.name)}
                    onMouseLeave={() => setHoveredChannel(null)}
                    className={`grid grid-cols-8 gap-1 items-center px-2 py-1 rounded-lg border transition-all duration-300 ${
                      hoveredChannel === ch.name || (isChannelActive && mode === "ortho")
                        ? "border-emerald-500/40 bg-emerald-500/10"
                        : "border-transparent hover:border-[var(--border)] hover:bg-[var(--muted-bg)]/40"
                    }`}
                  >
                    <span
                      className="text-xs font-mono font-bold truncate text-left"
                      style={{ color: ch.color }}
                    >
                      {ch.name}
                    </span>
                    {ch.tokenWeights.map((w, tIdx) => {
                      const isColActive = activeTokenIdx === tIdx;
                      const opacity =
                        mode === "ortho"
                          ? Math.max(0.12, w)
                          : Math.max(0.3, w * 0.9);

                      return (
                        <div
                          key={tIdx}
                          className={`h-6 rounded-md flex items-center justify-center transition-all duration-300 ${
                            isColActive ? "ring-2 ring-emerald-500/80 scale-105 z-10" : ""
                          }`}
                          style={{
                            backgroundColor: ch.color,
                            opacity: isColActive ? Math.min(1.0, opacity + 0.25) : opacity,
                          }}
                          title={`${ch.concept} on '${scenario.tokens[tIdx]}': ${(w * 100).toFixed(0)}%`}
                        >
                          <span className="text-[9px] font-mono font-semibold text-white drop-shadow-sm">
                            {w > 0.35 ? w.toFixed(1) : ""}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>

            <div className="text-[10px] font-mono text-[var(--muted)] pt-1 flex items-center justify-between">
              <span>Attribution Sparsity: <strong className="text-[var(--foreground)]">{mode === "ortho" ? "L_sparse active (L₀ ≈ 1.8)" : "Dense Overlap (L₀ ≈ 5.2)"}</strong></span>
              <span>Optimizer: <strong className="text-[var(--foreground)]">AdamW (T4 GPU)</strong></span>
            </div>
          </div>

          {/* Right Panel: Subspace Projection Canvas (6 cols) */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <div className="w-full flex items-center justify-between text-xs font-mono mb-2">
              <span className="font-semibold text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
                <span>2. FEATURE WRITE SPACE</span>
                <span className="text-[10px] text-[var(--muted)] font-normal">
                  b_k write vectors
                </span>
              </span>
              <span
                className={`text-[10px] font-mono px-2 py-0.5 rounded font-medium ${
                  mode === "ortho"
                    ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
                    : "bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30"
                }`}
              >
                {mode === "ortho" ? "Orthogonal Frame (Cgram = 0.070)" : "Entangled Superposition (Cgram = 0.719)"}
              </span>
            </div>

            {/* Coordinate SVG with Looping Animations */}
            <div className="relative w-full max-w-[320px] aspect-[4/3] rounded-xl border border-[var(--border)] bg-[var(--card)] p-2 shadow-inner">
              <svg viewBox="0 0 280 240" className="w-full h-full">
                <defs>
                  {scenario.channels.map((ch) => (
                    <marker
                      key={`arr-${ch.name}`}
                      id={`arrow-${ch.name}-${mode}`}
                      viewBox="0 0 10 10"
                      refX="7"
                      refY="5"
                      markerWidth="5"
                      markerHeight="5"
                      orient="auto-start-reverse"
                    >
                      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill={ch.color} />
                    </marker>
                  ))}
                </defs>

                {/* Coordinate Grid / Axes */}
                <line
                  x1="20"
                  y1={originY}
                  x2="260"
                  y2={originY}
                  stroke="var(--border)"
                  strokeDasharray="3 3"
                  strokeWidth="1.2"
                />
                <line
                  x1={originX}
                  y1="20"
                  x2={originX}
                  y2="220"
                  stroke="var(--border)"
                  strokeDasharray="3 3"
                  strokeWidth="1.2"
                />
                <circle cx={originX} cy={originY} r="3" fill="var(--muted)" />

                {/* Concentric Guides */}
                <circle
                  cx={originX}
                  cy={originY}
                  r={radius}
                  fill="none"
                  stroke="var(--border)"
                  strokeDasharray="4 4"
                  strokeOpacity="0.4"
                />

                {/* Feature Write Vectors with Dynamic Active Pulse */}
                {scenario.channels.map((ch) => {
                  const deg = mode === "ortho" ? ch.angleOrtho : ch.angleStd;
                  const rad = (deg * Math.PI) / 180;
                  const currentWeight = ch.tokenWeights[activeTokenIdx];
                  const isActive = currentWeight > 0.4;
                  const length = radius * (isActive ? 1.05 : 0.95);

                  const targetX = originX + length * Math.cos(rad);
                  const targetY = originY - length * Math.sin(rad);

                  const isHovered = hoveredChannel === ch.name;

                  return (
                    <g key={ch.name} className="transition-all duration-500">
                      {/* Active vector halo */}
                      {isActive && (
                        <line
                          x1={originX}
                          y1={originY}
                          x2={targetX}
                          y2={targetY}
                          stroke={ch.color}
                          strokeWidth={6}
                          strokeLinecap="round"
                          opacity={0.3}
                          className="animate-pulse"
                        />
                      )}
                      <line
                        x1={originX}
                        y1={originY}
                        x2={targetX}
                        y2={targetY}
                        stroke={ch.color}
                        strokeWidth={isActive || isHovered ? 3.4 : 1.9}
                        strokeLinecap="round"
                        markerEnd={`url(#arrow-${ch.name}-${mode})`}
                        opacity={isHovered || isActive ? 1 : 0.75}
                      />
                      {/* Label */}
                      <text
                        x={targetX + (Math.cos(rad) > 0 ? 8 : -8)}
                        y={targetY + (Math.sin(rad) < 0 ? -4 : 6)}
                        textAnchor={Math.cos(rad) > 0 ? "start" : "end"}
                        dominantBaseline="middle"
                        fill={ch.color}
                        fontSize={isActive || isHovered ? 11 : 9.5}
                        fontFamily="monospace"
                        fontWeight={isActive || isHovered ? "bold" : "600"}
                      >
                        {ch.label} ({ch.concept})
                      </text>
                    </g>
                  );
                })}
              </svg>

              {/* Subspace overlay annotation */}
              <div className="absolute bottom-2 left-2 right-2 text-[10px] font-mono text-[var(--muted)] text-center bg-[var(--background)]/85 backdrop-blur-xs py-0.5 rounded border border-[var(--border)]">
                {mode === "ortho"
                  ? "Attribution penalty forces b_j ⟂ b_k (zero cross-talk)"
                  : "Unconstrained LoRA: vectors collapse into collinear cluster"}
              </div>
            </div>
          </div>
        </div>

        {/* Bridge Banner connecting A -> Ortho-LoRA -> B */}
        <div className="mt-5 pt-4 border-t border-[var(--border)] flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
          <div className="px-3 py-1.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold">
            A (Input Detect: z = aᵀx)
          </div>
          <span className="text-[var(--muted)]">×</span>
          <div className="px-3 py-1.5 rounded-lg border border-indigo-500/40 bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 font-bold shadow-xs">
            {mode === "ortho" ? "Ortho-LoRA (Gram Penalty L_ortho)" : "Standard LoRA (Entangled)"}
          </div>
          <span className="text-[var(--muted)]">×</span>
          <div className="px-3 py-1.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold">
            B (Orthogonal Write: Δh = ∑ b_k z_k)
          </div>
          <span className="text-[var(--muted)]">═</span>
          <div className="px-3 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] font-semibold">
            Merged ΔW: 0 ms Latency
          </div>
        </div>
      </div>

      {/* Real-Time Benchmark Metrics Bar (Clean Telemetry replacing dial block) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--card)] text-center shadow-xs">
          <div className="text-[10px] font-mono text-[var(--muted)] uppercase tracking-wider">
            Gram Cross-Talk (Cgram)
          </div>
          <div className="text-lg font-bold font-mono text-[var(--foreground)] mt-1">
            {activeMetrics.cgram}
          </div>
          <div className="text-[10px] text-emerald-600 dark:text-emerald-400 mt-0.5 font-mono">
            {mode === "ortho" ? "10.3x reduction (↓)" : "Severe off-diagonal overlap"}
          </div>
        </div>

        <div className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--card)] text-center shadow-xs">
          <div className="text-[10px] font-mono text-[var(--muted)] uppercase tracking-wider">
            Subspace Capacity (deff)
          </div>
          <div className="text-lg font-bold font-mono text-[var(--foreground)] mt-1">
            {activeMetrics.deff}
          </div>
          <div className="text-[10px] text-emerald-600 dark:text-emerald-400 mt-0.5 font-mono">
            {mode === "ortho" ? "87.7% utilization (↑)" : "57.5% rank collapse"}
          </div>
        </div>

        <div className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--card)] text-center shadow-xs">
          <div className="text-[10px] font-mono text-[var(--muted)] uppercase tracking-wider">
            Collateral Drift (DKL)
          </div>
          <div className="text-lg font-bold font-mono text-[var(--foreground)] mt-1">
            {activeMetrics.dkl}
          </div>
          <div className="text-[10px] text-emerald-600 dark:text-emerald-400 mt-0.5 font-mono">
            {mode === "ortho" ? "16.3x lower leakage (↓)" : "Unintended token drift"}
          </div>
        </div>

        <div className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--card)] text-center shadow-xs">
          <div className="text-[10px] font-mono text-[var(--muted)] uppercase tracking-wider">
            Inference Overhead
          </div>
          <div className="text-lg font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-1">
            {activeMetrics.latency}
          </div>
          <div className="text-[10px] text-[var(--muted)] mt-0.5 font-mono">
            112x fewer params vs SAE
          </div>
        </div>
      </div>
    </div>
  );
}

// Background SVG for InfiniteGridHero Card
export function getOrthoLoraCardSvg(): string {
  return `<svg viewBox="0 0 320 180" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" fill="none">
    <defs>
      <linearGradient id="ortho-glow" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#10b981" stop-opacity="0.30"/>
        <stop offset="50%" stop-color="#10b981" stop-opacity="0.20"/>
        <stop offset="100%" stop-color="#10b981" stop-opacity="0.10"/>
      </linearGradient>
    </defs>
    
    <!-- Outer Card Frame -->
    <rect x="20" y="25" width="280" height="130" rx="8" fill="url(#ortho-glow)" stroke="#10b981" stroke-opacity="0.35" stroke-width="1.2"/>
    
    <!-- Coordinate Subspace Grid -->
    <line x1="80" y1="90" x2="240" y2="90" stroke="#10b981" stroke-opacity="0.25" stroke-dasharray="3 3"/>
    <line x1="160" y1="40" x2="160" y2="140" stroke="#10b981" stroke-opacity="0.25" stroke-dasharray="3 3"/>
    <circle cx="160" cy="90" r="38" stroke="#10b981" stroke-opacity="0.2" stroke-dasharray="4 4" fill="none"/>

    <!-- Orthogonal Vector Rays -->
    <line class="ortho-vector" x1="160" y1="90" x2="200" y2="55" stroke="#10b981" stroke-width="2" stroke-linecap="round"/>
    <line class="ortho-vector" x1="160" y1="90" x2="125" y2="52" stroke="#10b981" stroke-width="2" stroke-linecap="round"/>
    <line class="ortho-vector" x1="160" y1="90" x2="120" y2="125" stroke="#10b981" stroke-width="2" stroke-linecap="round"/>
    <line class="ortho-vector" x1="160" y1="90" x2="195" y2="122" stroke="#8b5cf6" stroke-width="2" stroke-linecap="round"/>
    
    <!-- Center Origin Dot -->
    <circle cx="160" cy="90" r="3" fill="#10b981"/>
    
    <!-- Badge -->
    <rect x="195" y="128" width="95" height="18" rx="4" fill="#10b981" fill-opacity="0.2" stroke="#10b981" stroke-width="0.8"/>
    <text x="202" y="140" font-family="monospace" font-size="7" font-weight="bold" fill="#10b981">Cgram = 0.070 (⟂)</text>
  </svg>`;
}
