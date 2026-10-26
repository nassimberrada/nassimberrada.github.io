"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { CustomNeuralRouterVisual, RouterTarget } from "./CustomNeuralRouterVisual";
import {
  Play,
  Pause,
  Activity,
  Zap,
  ShieldCheck,
  Gauge,
  DollarSign,
  Clock,
  Target,
} from "lucide-react";

type RouterPreset = "balanced" | "quality" | "cost" | "latency";

export function NeuralRouterFigure() {
  const [preset, setPreset] = useState<RouterPreset>("balanced");
  const [gaugeVal, setGaugeVal] = useState<number>(0.5);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isHoveringGauge, setIsHoveringGauge] = useState<boolean>(false);
  const gaugeTrackRef = useRef<HTMLDivElement>(null);
  const tourPhaseRef = useRef<number>(0.5);
  const animFrameRef = useRef<number | null>(null);
  const STAGES: { preset: RouterPreset; gauge: number }[] = useMemo(
    () => [
      { preset: "cost", gauge: 0.1 },
      { preset: "balanced", gauge: 0.5 },
      { preset: "quality", gauge: 0.78 },
      { preset: "latency", gauge: 0.96 },
    ],
    []
  );

  const getPresetForGauge = (g: number): RouterPreset => {
    if (g < 0.3) return "cost";
    if (g < 0.65) return "balanced";
    if (g < 0.88) return "quality";
    return "latency";
  };

  // Auto-tour animation across Pareto trade-offs
  useEffect(() => {
    if (!isPlaying || isHoveringGauge) return;
    let lastTime = performance.now();
    let stageIndex = 1; // start at balanced
    let pauseTimer = 2.0; // hold 2s at each preset
    let isTransitioning = false;

    const loop = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      if (!isTransitioning) {
        pauseTimer -= dt;
        if (pauseTimer <= 0) {
          isTransitioning = true;
          stageIndex = (stageIndex + 1) % STAGES.length;
        }
      } else {
        const targetGauge = STAGES[stageIndex].gauge;
        const current = tourPhaseRef.current;
        const diff = targetGauge - current;

        if (Math.abs(diff) < 0.015) {
          tourPhaseRef.current = targetGauge;
          setGaugeVal(targetGauge);
          setPreset(STAGES[stageIndex].preset);
          isTransitioning = false;
          pauseTimer = 2.4; // hold 2.4s so user can read metrics and view the high cube
        } else {
          // Smooth glide toward target
          const speed = 1.8;
          const step = Math.sign(diff) * Math.min(Math.abs(diff), dt * speed);
          tourPhaseRef.current += step;
          setGaugeVal(tourPhaseRef.current);
          setPreset(getPresetForGauge(tourPhaseRef.current));
        }
      }

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isPlaying, isHoveringGauge, STAGES]);

  // Handle preset selection from left column
  const handlePresetSelect = (selected: RouterPreset) => {
    setPreset(selected);
    let target = 0.5;
    switch (selected) {
      case "cost":
        target = 0.1;
        break;
      case "balanced":
        target = 0.5;
        break;
      case "quality":
        target = 0.78;
        break;
      case "latency":
        target = 0.96;
        break;
    }
    setGaugeVal(target);
    tourPhaseRef.current = target;
  };

  // Handle direct gauge pointer scrubbing
  const handleGaugePointer = (clientX: number) => {
    if (!gaugeTrackRef.current) return;
    const rect = gaugeTrackRef.current.getBoundingClientRect();
    const rawRatio = (clientX - rect.left) / rect.width;
    const clamped = Math.max(0, Math.min(1, rawRatio));
    setGaugeVal(clamped);
    tourPhaseRef.current = clamped;
    setPreset(getPresetForGauge(clamped));
  };

  // Handle direct 3D column click
  const handleTargetSelect = (target: RouterTarget) => {
    if (target === "openai") handlePresetSelect("cost");
    else if (target === "mistral") handlePresetSelect("balanced");
    else if (target === "anthropic") handlePresetSelect("quality");
  };

  // Dynamic Telemetry Metrics - Strictly mapped to the 3 blocks: OpenAI, Mistral, and Anthropic
  const telemetry = useMemo(() => {
    switch (preset) {
      case "quality":
        return {
          winner: "Claude 3.5 Sonnet",
          provider: "Anthropic Direct Endpoint",
          quality: "0.984",
          ttft: "285 ms",
          itl: "18.2 ms/token",
          savings: "21.4%",
          desc: "Deep reasoning & schema adherence priority",
        };
      case "balanced":
        return {
          winner: "Mixtral-8x22B MoE",
          provider: "Mistral AI Dedicated",
          quality: "0.948",
          ttft: "124 ms",
          itl: "4.8 ms/token",
          savings: "68.2%",
          desc: "Optimal Pareto frontier: high throughput with low degradation",
        };
      case "cost":
        return {
          winner: "GPT-4o-mini",
          provider: "OpenAI Direct Endpoint",
          quality: "0.912",
          ttft: "98 ms",
          itl: "8.4 ms/token",
          savings: "92.4%",
          desc: "Cost-optimized frontier distillation tier",
        };
      case "latency":
        return {
          winner: "Claude 3.5 Haiku",
          provider: "Anthropic Fast Tier",
          quality: "0.938",
          ttft: "68 ms",
          itl: "3.2 ms/token",
          savings: "74.0%",
          desc: "Real-time interactive voice/agent loop requiring minimal TTFT",
        };
    }
  }, [preset]);

  return (
    <div className="rounded-[14px] border border-[var(--border)] bg-[var(--card)] p-4 sm:p-5 shadow-lg overflow-hidden my-6">
      {/* Figure Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[var(--border)]">
        <div className="flex items-center gap-2">
          <div>
            <h4 className="text-sm font-semibold text-[var(--foreground)] leading-tight">
              Dynamic Prompt Router — Multi-Objective Neural Dispatcher
            </h4>
            <p className="text-[11px] text-[var(--muted)] font-mono">
              Unify Neural Scoring Architecture: σ(wᵀ[BERT(p); m] + b) &amp; Live Runtime Benchmarking
            </p>
          </div>
        </div>

        {/* Live Active Target Readout */}
        <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-[var(--muted-bg)]/80 border border-[var(--border)] text-xs font-mono">
          <Target className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
          <span className="text-[var(--foreground)] font-semibold">
            {telemetry.winner}
          </span>
        </div>
      </div>

      {/* Main 2-Column Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mt-4">
        {/* LEFT COLUMN: ROUTING OBJECTIVES */}
        <div className="lg:col-span-4 flex flex-col justify-between gap-3">
          <div>
            <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-[var(--muted)] mb-2.5 px-0.5">
              Routing Objectives
            </div>

            <div className="flex flex-col gap-2">
              {[
                {
                  id: "balanced" as const,
                  title: "Balanced Pareto",
                  desc: "Mixtral-8x22B · Optimal Trade-off",
                  icon: Gauge,
                },
                {
                  id: "quality" as const,
                  title: "Quality First",
                  desc: "Claude 3.5 Sonnet · Deep Reason",
                  icon: ShieldCheck,
                },
                {
                  id: "cost" as const,
                  title: "Cost-First",
                  desc: "GPT-4o-mini · 92% Savings",
                  icon: DollarSign,
                },
                {
                  id: "latency" as const,
                  title: "Low TTFT",
                  desc: "Claude 3.5 Haiku · Sub-70ms TTFT",
                  icon: Clock,
                },
              ].map((item) => {
                const Icon = item.icon;
                const isActive = preset === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handlePresetSelect(item.id)}
                    className={`p-3 rounded-xl border text-left transition-all duration-200 ${
                      isActive
                        ? "border-emerald-500 bg-emerald-500/10 shadow-sm ring-1 ring-emerald-500/30"
                        : "border-[var(--border)] bg-[var(--card)] hover:border-[var(--foreground)]/30 hover:bg-[var(--muted-bg)]/40"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span
                        className={`text-xs font-bold ${
                          isActive
                            ? "text-emerald-600 dark:text-emerald-400"
                            : "text-[var(--foreground)]"
                        }`}
                      >
                        {item.title}
                      </span>
                      <Icon
                        className={`w-3.5 h-3.5 ${
                          isActive
                            ? "text-emerald-600 dark:text-emerald-400"
                            : "text-[var(--muted)]"
                        }`}
                      />
                    </div>
                    <div className="text-[10px] text-[var(--muted)] font-mono leading-tight">
                      {item.desc}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mathematical Formulation & Tour Control */}
          <div className="p-3 rounded-xl border border-[var(--border)] bg-[var(--muted-bg)]/40 text-[10px] font-mono flex flex-col gap-2">
            <div className="text-[var(--muted)] leading-relaxed">
              <span className="font-bold text-[var(--foreground)]">Loss Formulation:</span>
              <br />
              ℒ = α·Quality - β·TTFT - γ·Cost
            </div>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="mt-1 flex items-center justify-between px-2.5 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--card)] hover:bg-[var(--muted-bg)] text-[var(--foreground)] text-[11px] transition-colors"
            >
              <span className="flex items-center gap-1.5">
                {isPlaying ? (
                  <>
                    <Pause className="w-3 h-3 text-emerald-500" />
                    <span>Auto-Tour Active</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3 h-3 text-[var(--muted)]" />
                    <span>Resume Auto-Tour</span>
                  </>
                )}
              </span>
              <Activity className="w-3 h-3 text-emerald-500 animate-pulse" />
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: GAUGE + ISOMETRIC VISUAL + METRICS */}
        <div className="lg:col-span-8 flex flex-col gap-3.5">
          {/* 1. PROFILE GAUGE */}
          <div className="rounded-xl border border-[var(--border)] bg-[var(--muted-bg)]/40 p-3 sm:px-4">
            <div className="flex items-center justify-between text-[11px] font-mono font-bold mb-2">
              <button
                onClick={() => handlePresetSelect("cost")}
                className={`px-2 py-0.5 rounded transition-all ${
                  gaugeVal <= 0.25
                    ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-extrabold border border-emerald-500/40"
                    : "text-[var(--muted)] hover:text-[var(--foreground)]"
                }`}
              >
                Low Cost
              </button>
              <button
                onClick={() => handlePresetSelect("balanced")}
                className={`px-2 py-0.5 rounded transition-all ${
                  gaugeVal > 0.25 && gaugeVal < 0.75
                    ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-extrabold border border-emerald-500/40"
                    : "text-[var(--muted)] hover:text-[var(--foreground)]"
                }`}
              >
                Balanced
              </button>
              <button
                onClick={() => handlePresetSelect("latency")}
                className={`px-2 py-0.5 rounded transition-all ${
                  gaugeVal >= 0.75
                    ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-extrabold border border-emerald-500/40"
                    : "text-[var(--muted)] hover:text-[var(--foreground)]"
                }`}
              >
                High Speed
              </button>
            </div>

            {/* Slider Track with Interactive Thumb */}
            <div
              ref={gaugeTrackRef}
              onPointerDown={(e) => {
                setIsHoveringGauge(true);
                handleGaugePointer(e.clientX);
              }}
              onPointerMove={(e) => {
                if (isHoveringGauge) handleGaugePointer(e.clientX);
              }}
              onPointerUp={() => setIsHoveringGauge(false)}
              onPointerLeave={() => setIsHoveringGauge(false)}
              className="relative w-full h-3 rounded-full bg-[var(--border)] cursor-pointer overflow-hidden"
            >
              {/* Active Fill Gradient */}
              <div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-emerald-500/40 via-emerald-500/80 to-emerald-400"
                style={{ width: `${Math.round(gaugeVal * 100)}%` }}
              />

              {/* Slider Thumb Marker */}
              <div
                className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white dark:border-black shadow-md pointer-events-none"
                style={{
                  left: `calc(${Math.round(gaugeVal * 100)}% - 8px)`,
                }}
              />
            </div>
          </div>

          {/* 2. ISOMETRIC VISUAL CANVAS */}
          <div className="relative rounded-xl border border-[var(--border)]/70 bg-[var(--background)]/70 p-3 sm:p-5 overflow-hidden flex items-center justify-center min-h-[360px]">
            {/* Subtle dot matrix background */}
            <div
              className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06] pointer-events-none"
              style={{
                backgroundImage: "radial-gradient(currentColor 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            />

            {/* Custom Isometric Visual Component */}
            <div className="w-full max-w-2xl">
              <CustomNeuralRouterVisual
                gaugeVal={gaugeVal}
                onTargetSelect={handleTargetSelect}
              />
            </div>
          </div>

          {/* 3. METRICS ROW: [Endpoint  Quality  TTFT/ITL  Savings] */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3.5 rounded-xl border border-[var(--border)] bg-[var(--muted-bg)]/40 font-mono">
            <div>
              <div className="text-[10px] text-[var(--muted)] uppercase tracking-wider">
                Endpoint
              </div>
              <div className="text-xs font-bold text-[var(--foreground)] truncate mt-1">
                {telemetry.winner}
              </div>
              <div className="text-[10px] text-[var(--muted)] truncate">
                {telemetry.provider}
              </div>
            </div>

            <div>
              <div className="text-[10px] text-[var(--muted)] uppercase tracking-wider flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-500" />
                <span>Quality</span>
              </div>
              <div className="text-sm sm:text-base font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">
                {telemetry.quality}
              </div>
              <div className="text-[10px] text-[var(--muted)]">Logistic σ</div>
            </div>

            <div>
              <div className="text-[10px] text-[var(--muted)] uppercase tracking-wider flex items-center gap-1">
                <Clock className="w-3 h-3 text-cyan-500" />
                <span>TTFT / ITL</span>
              </div>
              <div className="text-sm sm:text-base font-bold text-[var(--foreground)] mt-0.5">
                {telemetry.ttft}
              </div>
              <div className="text-[10px] text-[var(--muted)]">{telemetry.itl}</div>
            </div>

            <div>
              <div className="text-[10px] text-[var(--muted)] uppercase tracking-wider flex items-center gap-1">
                <Zap className="w-3 h-3 text-violet-500" />
                <span>Savings</span>
              </div>
              <div className="text-sm sm:text-base font-bold text-[var(--foreground)] mt-0.5">
                {telemetry.savings}
              </div>
              <div className="text-[10px] text-[var(--muted)]">Cost Reduction</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
