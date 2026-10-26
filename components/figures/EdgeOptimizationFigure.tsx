"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  CustomEdgeOptimizationVisual,
  OptimizationStage,
} from "./CustomEdgeOptimizationVisual";
import {
  Play,
  Pause,
  RotateCcw,
  Box,
  Scissors,
  Layers,
  Binary,
  Sparkles,
} from "lucide-react";

export function EdgeOptimizationFigure() {
  const [progress, setProgress] = useState<number>(0.0); // 0.0 to 3.0
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const animFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(performance.now());
  const targetStageRef = useRef<number | null>(null);

  // Smooth continuous animation cycle:
  // Starts promptly, moves smoothly between stages with a crisp pause at each milestone
  useEffect(() => {
    let pauseRemaining = 0.5; // Starts shortly after initial render

    const animate = (now: number) => {
      const dt = Math.min(0.05, (now - lastTimeRef.current) / 1000);
      lastTimeRef.current = now;

      if (isPlaying) {
        if (targetStageRef.current !== null) {
          // Rapidly and smoothly glide toward manual target
          setProgress((prev) => {
            const diff = targetStageRef.current! - prev;
            if (Math.abs(diff) < 0.02) {
              const res = targetStageRef.current!;
              targetStageRef.current = null;
              pauseRemaining = 1.4;
              return res;
            }
            return prev + Math.sign(diff) * Math.min(Math.abs(diff), dt * 3.5);
          });
        } else {
          // Automatic continuous tour
          if (pauseRemaining > 0) {
            pauseRemaining -= dt;
          } else {
            setProgress((prev) => {
              const speed = 0.85; // snappy, fluid transition (~1.15s per stage)
              let next = prev + dt * speed;
              if (next >= 3.0) {
                // Loop back to 0.0 with pause
                pauseRemaining = 1.8;
                return 0.0;
              }

              // Check if we just crossed an integer threshold (1.0, 2.0)
              const prevFloor = Math.floor(prev);
              const nextFloor = Math.floor(next);
              if (nextFloor > prevFloor && nextFloor <= 3) {
                pauseRemaining = 1.3;
                return nextFloor;
              }

              return next;
            });
          }
        }
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isPlaying]);

  const selectStage = (stage: OptimizationStage) => {
    const stageMap: Record<OptimizationStage, number> = {
      baseline: 0.0,
      pruning: 1.0,
      tensorization: 2.0,
      quantization: 3.0,
    };
    targetStageRef.current = stageMap[stage];
    setIsPlaying(true);
  };

  const roundedStage = Math.min(3, Math.round(progress));

  return (
    <div
      className="w-full my-6 rounded-[14px] border border-[var(--border)] bg-[var(--card)] p-4 sm:p-6 shadow-sm overflow-hidden select-none font-sans"
    >
      {/* Figure Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-[var(--border)]">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--foreground)]">
            Continuous Morphing Model Optimization Engine
          </span>
        </div>

        {/* Global Controls */}
        <div className="flex items-center gap-2 text-xs font-mono">
          {/* Stage Selector Pills */}
          <div className="hidden sm:flex items-center rounded-lg bg-[var(--muted-bg)] p-0.5 border border-[var(--border)] shadow-2xs">
            <button
              onClick={() => selectStage("baseline")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded text-[11px] font-mono transition-all cursor-pointer ${
                roundedStage === 0
                  ? "bg-[var(--card)] text-[var(--foreground)] font-bold shadow-2xs border border-[var(--border)]"
                  : "text-[var(--muted)] hover:text-[var(--foreground)]"
              }`}
            >
              <Box className="w-3.5 h-3.5 text-slate-400" />
              <span>1. Dense</span>
            </button>

            <button
              onClick={() => selectStage("pruning")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded text-[11px] font-mono transition-all cursor-pointer ${
                roundedStage === 1
                  ? "bg-[var(--card)] text-amber-600 dark:text-amber-400 font-bold shadow-2xs border border-[var(--border)]"
                  : "text-[var(--muted)] hover:text-[var(--foreground)]"
              }`}
            >
              <Scissors className="w-3.5 h-3.5 text-amber-500" />
              <span>2. Prune</span>
            </button>

            <button
              onClick={() => selectStage("tensorization")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded text-[11px] font-mono transition-all cursor-pointer ${
                roundedStage === 2
                  ? "bg-[var(--card)] text-cyan-600 dark:text-cyan-400 font-bold shadow-2xs border border-[var(--border)]"
                  : "text-[var(--muted)] hover:text-[var(--foreground)]"
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-cyan-500" />
              <span>3. Tensorize</span>
            </button>

            <button
              onClick={() => selectStage("quantization")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded text-[11px] font-mono transition-all cursor-pointer ${
                roundedStage === 3
                  ? "bg-[var(--card)] text-emerald-600 dark:text-emerald-400 font-bold shadow-2xs border border-[var(--border)]"
                  : "text-[var(--muted)] hover:text-[var(--foreground)]"
              }`}
            >
              <Binary className="w-3.5 h-3.5 text-emerald-500" />
              <span>4. Quantize</span>
            </button>
          </div>

          {/* Reset button */}
          <button
            onClick={() => {
              targetStageRef.current = 0.0;
              setIsPlaying(true);
            }}
            className="p-1.5 rounded-md border border-[var(--border)] bg-[var(--card)] hover:text-emerald-500 transition-colors cursor-pointer"
            title="Reset to Baseline"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          {/* Play / Pause Tour Button */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md border text-xs transition-colors cursor-pointer ${
              isPlaying
                ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300 font-semibold"
                : "bg-[var(--card)] border-[var(--border)] text-[var(--muted)] hover:text-[var(--foreground)]"
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 text-emerald-500" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-emerald-500" />
                <span>Morph</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Continuous Morphing Visual Canvas */}
      <CustomEdgeOptimizationVisual
        progress={progress}
        onStageSelect={selectStage}
      />

      {/* Metric Cards Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-4 pt-3 border-t border-[var(--border)]">
        <div className="p-3 rounded-xl border border-[var(--border)] bg-[var(--muted-bg)]/40">
          <div className="text-[11px] font-mono uppercase text-[var(--muted)]">Model Footprint</div>
          <div className="text-base sm:text-lg font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-0.5">
            ~90MB ➔ ~20MB
          </div>
          <div className="text-[10px] text-[var(--muted)] font-mono mt-0.5">78% Size Reduction</div>
        </div>

        <div className="p-3 rounded-xl border border-[var(--border)] bg-[var(--muted-bg)]/40">
          <div className="text-[11px] font-mono uppercase text-[var(--muted)]">Inference Latency</div>
          <div className="text-base sm:text-lg font-bold font-mono text-cyan-600 dark:text-cyan-400 mt-0.5">
            4.0x Speedup
          </div>
          <div className="text-[10px] text-[var(--muted)] font-mono mt-0.5">48ms ➔ 12ms per pass</div>
        </div>

        <div className="p-3 rounded-xl border border-[var(--border)] bg-[var(--muted-bg)]/40">
          <div className="text-[11px] font-mono uppercase text-[var(--muted)]">Accuracy Retention</div>
          <div className="text-base sm:text-lg font-bold font-mono text-amber-600 dark:text-amber-400 mt-0.5">
            &lt; 0.4% Loss
          </div>
          <div className="text-[10px] text-[var(--muted)] font-mono mt-0.5">SQNR-Guided Quantization</div>
        </div>

        <div className="p-3 rounded-xl border border-[var(--border)] bg-[var(--muted-bg)]/40">
          <div className="text-[11px] font-mono uppercase text-[var(--muted)]">Deployment Target</div>
          <div className="text-base sm:text-lg font-bold font-mono text-purple-600 dark:text-purple-400 mt-0.5">
            Mobile Lite
          </div>
          <div className="text-[10px] text-[var(--muted)] font-mono mt-0.5">TorchScript Lite (.ptl) / ONNX</div>
        </div>
      </div>

      {/* Caption Footnote */}
      <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-[var(--muted)]">
        <span className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
          Continuous morphing pipeline: Dense Weights ➔ Structured Channel Pruning ➔ VBMF Tensorization ➔ INT8 Quantization
        </span>
        <span className="hidden sm:inline">ARM NEON / Mobile NPU</span>
      </div>
    </div>
  );
}
