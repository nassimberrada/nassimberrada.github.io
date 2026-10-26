"use client";

import React, { useMemo } from "react";

export type OptimizationStage = "baseline" | "pruning" | "tensorization" | "quantization";

interface CustomEdgeOptimizationVisualProps {
  progress: number; // 0.0 to 3.0 continuous float
  onStageSelect?: (stage: OptimizationStage) => void;
}

// Isometric projection helper (ViewBox: 980 x 440)
// CX positioned at 660 gives generous clearance (>260px) from the left stage card
const CX = 660;
const CY = 215;
const S = 1.34;
const COS30 = Math.cos(Math.PI / 6);
const SIN30 = 0.5;

function iso(x: number, y: number, z: number = 0): [number, number] {
  const sx = CX + (x - y) * COS30 * S;
  const sy = CY + (x + y) * SIN30 * S - z * S;
  return [Number(sx.toFixed(1)), Number(sy.toFixed(1))];
}

function isoSlab(
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  z0: number,
  z1: number
) {
  const t00 = iso(x0, y0, z1);
  const t10 = iso(x1, y0, z1);
  const t11 = iso(x1, y1, z1);
  const t01 = iso(x0, y1, z1);

  const b00 = iso(x0, y0, z0);
  const b10 = iso(x1, y0, z0);
  const b11 = iso(x1, y1, z0);
  const b01 = iso(x0, y1, z0);

  const top = `M ${t00[0]} ${t00[1]} L ${t10[0]} ${t10[1]} L ${t11[0]} ${t11[1]} L ${t01[0]} ${t01[1]} Z`;
  const right = `M ${t10[0]} ${t10[1]} L ${t11[0]} ${t11[1]} L ${b11[0]} ${b11[1]} L ${b10[0]} ${b10[1]} Z`;
  const left = `M ${t01[0]} ${t01[1]} L ${t11[0]} ${t11[1]} L ${b11[0]} ${b11[1]} L ${b01[0]} ${b01[1]} Z`;

  return { top, left, right, t00, t10, t11, t01, b00, b10, b11, b01 };
}

// Smooth sigmoid-like easeInOut
function easeInOut(t: number): number {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

export function CustomEdgeOptimizationVisual({
  progress,
  onStageSelect,
}: CustomEdgeOptimizationVisualProps) {
  const clampedProgress = Math.max(0, Math.min(3, progress));

  // Phase sub-transitions:
  // p1: 0.0 -> 1.0 (Baseline -> Pruning)
  const p1 = Math.max(0, Math.min(1, clampedProgress));
  const ep1 = easeInOut(p1);

  // p2: 0.0 -> 1.0 (Pruning -> Tensorization)
  const p2 = Math.max(0, Math.min(1, clampedProgress - 1));
  const ep2 = easeInOut(p2);

  // p3: 0.0 -> 1.0 (Tensorization -> Quantization)
  const p3 = Math.max(0, Math.min(1, clampedProgress - 2));
  const ep3 = easeInOut(p3);

  // Left Floating Explainer Card Data (Plain Language + Wrap-friendly Text)
  const telemetry = useMemo(() => {
    // Model Footprint: 90MB -> 65MB -> 38MB -> 20MB
    let size = 90;
    if (clampedProgress <= 1) size = 90 - ep1 * 25;
    else if (clampedProgress <= 2) size = 65 - ep2 * 27;
    else size = 38 - ep3 * 18;

    // Latency: 48ms -> 34ms -> 21ms -> 12ms
    let latency = 48;
    if (clampedProgress <= 1) latency = 48 - ep1 * 14;
    else if (clampedProgress <= 2) latency = 34 - ep2 * 13;
    else latency = 21 - ep3 * 9;

    // Speedup: 1.0x -> 1.4x -> 2.3x -> 4.0x
    let speed = 1.0;
    if (clampedProgress <= 1) speed = 1.0 + ep1 * 0.4;
    else if (clampedProgress <= 2) speed = 1.4 + ep2 * 0.9;
    else speed = 2.3 + ep3 * 1.7;

    let stageName: OptimizationStage = "baseline";
    let badgeText = "Stage 1 · Baseline Model";
    let badgeColor = "#94a3b8"; // Slate
    let title = "Full-Size Dense Model";
    let description =
      "The uncompressed neural network in standard 32-bit floating point precision. All channels and layers are active, requiring high memory bandwidth and power on mobile chips.";
    let status = "Baseline Footprint (100%)";

    if (clampedProgress >= 2.5) {
      stageName = "quantization";
      badgeText = "Stage 4 · INT8 Quantization";
      badgeColor = "#10b981"; // Emerald
      title = "Shrinking to 8-Bit Integers";
      description =
        "The model weights are clamped and converted from 32-bit floats into compact 8-bit integers. Parameters shrink into a tight core that mobile NPUs execute concurrently with vector instructions.";
      status = "Quantized to INT8 Core (-78% size · 4x faster)";
    } else if (clampedProgress >= 1.5) {
      stageName = "tensorization";
      badgeText = "Stage 3 · Matrix Factorization";
      badgeColor = "#06b6d4"; // Cyan
      title = "Splitting Heavy Matrices";
      description =
        "Each surviving weight block splits into two low-rank factor slabs (U and V). Computing two consecutive smaller operations runs significantly faster on mobile hardware than one large matrix.";
      status = "Factorized into Low-Rank Slabs (-58% size)";
    } else if (clampedProgress >= 0.5) {
      stageName = "pruning";
      badgeText = "Stage 2 · Structured Pruning";
      badgeColor = "#f59e0b"; // Amber
      title = "Excising Redundant Channels";
      description =
        "We profile layer sensitivity and prune the least informative channels. Inactive parameters are eliminated completely, accelerating inference without needing sparse accelerators.";
      status = "Pruned Redundant Channels (-28% params)";
    }

    return {
      size: size.toFixed(1),
      latency: latency.toFixed(0),
      speed: speed.toFixed(1),
      stageName,
      badgeText,
      badgeColor,
      title,
      description,
      status,
    };
  }, [clampedProgress, ep1, ep2, ep3]);

  // COLOR & MORPH LOGIC:
  // 1. Baseline view: All 4 layers are neutral grey.
  // 2. Pruning view: Two layers become orange (layers 0 & 2 survive), while the other two (layers 1 & 3) are removed (lifted up & dissolved).
  // 3. Tensorization view: Each surviving layer starts orange and splits into an orange fraction and a blue fraction, and the orange portion drops away leaving the blue factors U & V.
  // 4. Quantization view: The center of the remaining blue blocks turns green, and the layers shrink inward to the green quantized core.

  // Pruning lift offset and opacity for excised layers 1 & 3
  const prunedLift = ep1 * 55;
  const prunedOpacity = Math.max(0, 1 - ep1 * 1.5);

  // Tensorization: Orange part shrinks away (ep2), Blue factors U and V emerge
  const orangePartOpacity = Math.max(0, 1 - ep2 * 1.3);
  const blueFactorSeparation = ep2 * 26; // U shifts left, V shifts right

  // Quantization: Green core expands, outer layer shrinks into green core
  const quantCoreOpacity = Math.min(1, Math.max(0, (clampedProgress - 2.0) * 1.8));

  return (
    <div className="relative w-full aspect-[2/1] min-h-[360px] max-h-[460px] flex items-center justify-center overflow-hidden">
      {/* 1. PLAIN LANGUAGE EXPLAINER CARD (HTML OVERLAY - WRAPS AUTOMATICALLY, NO CLIPPING) */}
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10 w-[270px] sm:w-[310px] rounded-xl border border-[var(--border)] bg-[var(--card)]/90 backdrop-blur-md p-4 shadow-xl text-left pointer-events-auto transition-colors duration-300">
        {/* Header & Stage indicator dot */}
        <div className="flex items-center gap-2 mb-2">
          <span
            className="w-2.5 h-2.5 rounded-full shrink-0 animate-pulse"
            style={{
              backgroundColor: telemetry.badgeColor,
              boxShadow: `0 0 10px ${telemetry.badgeColor}`,
            }}
          />
          <span
            className="text-[11px] font-mono font-bold tracking-wider uppercase"
            style={{ color: telemetry.badgeColor }}
          >
            {telemetry.badgeText}
          </span>
        </div>

        {/* Stage Title */}
        <h4 className="text-sm font-semibold text-[var(--foreground)] mb-1.5 leading-snug">
          {telemetry.title}
        </h4>

        {/* Plain language explanation */}
        <p className="text-xs text-[var(--muted)] leading-relaxed mb-3 break-words">
          {telemetry.description}
        </p>

        {/* Real-time Dynamic Stats Pill */}
        <div className="rounded-lg bg-[var(--muted-bg)]/80 border border-[var(--border)] p-2.5 space-y-1">
          <div className="flex items-center justify-between text-[11px] font-mono">
            <span className="text-[var(--muted)]">Footprint</span>
            <span className="font-semibold text-[var(--foreground)]">{telemetry.size} MB</span>
          </div>
          <div className="flex items-center justify-between text-[11px] font-mono">
            <span className="text-[var(--muted)]">Speedup</span>
            <span className="font-semibold" style={{ color: telemetry.badgeColor }}>
              {telemetry.speed}x ({telemetry.latency}ms)
            </span>
          </div>
          <div className="pt-1 border-t border-[var(--border)]/50 text-[10px] font-mono text-[var(--muted)] text-right">
            {telemetry.status}
          </div>
        </div>
      </div>

      {/* 2. ISOMETRIC 3D SVG VISUAL */}
      <svg
        viewBox="0 0 980 440"
        className="w-full h-full select-none"
        style={{ filter: "drop-shadow(0 20px 35px rgba(0,0,0,0.2))" }}
      >
        <defs>
          <filter id="opt-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* ISOMETRIC FLOOR GRID */}
        <g opacity="0.3">
          {[-170, -125, -80, -35, 10, 55, 100, 145, 190].map((coord, i) => {
            const p1 = iso(coord, -190, -48);
            const p2 = iso(coord, 190, -48);
            const p3 = iso(-190, coord, -48);
            const p4 = iso(190, coord, -48);
            return (
              <g key={i}>
                <line
                  x1={p1[0]}
                  y1={p1[1]}
                  x2={p2[0]}
                  y2={p2[1]}
                  stroke="var(--border)"
                  strokeWidth="0.8"
                  strokeDasharray="4 4"
                />
                <line
                  x1={p3[0]}
                  y1={p3[1]}
                  x2={p4[0]}
                  y2={p4[1]}
                  stroke="var(--border)"
                  strokeWidth="0.8"
                  strokeDasharray="4 4"
                />
              </g>
            );
          })}
        </g>

        {/* BASE GROUND SHADOW */}
        <polygon
          points={`${iso(-95 - blueFactorSeparation, -85, -47).join(",")} ${iso(95 + blueFactorSeparation, -85, -47).join(",")} ${iso(95 + blueFactorSeparation, 85, -47).join(",")} ${iso(-95 - blueFactorSeparation, 85, -47).join(",")}`}
          fill="rgba(0,0,0,0.3)"
          filter="blur(14px)"
        />

        {/* CHANNEL 0 (SURVIVING ACTIVE BLOCK - FRONT/LEFT) */}
        {(() => {
          const baseZ0 = -35;
          const baseZ1 = 70;
          const shrinkZ = ep3 * 16;
          const shrinkY = ep3 * 8;
          const shrinkX = ep3 * 10;

          const uX0 = -85 - blueFactorSeparation * 0.8 + shrinkX;
          const uX1 = (ep2 > 0 ? -12 - blueFactorSeparation * 0.5 : 85) - shrinkX;
          const y0 = -85 + shrinkY;
          const y1 = -44 - shrinkY;
          const z0 = baseZ0 + shrinkZ;
          const z1 = baseZ1 - shrinkZ;

          let topFill = "#475569";
          let leftFill = "#334155";
          let rightFill = "#1e293b";
          let stroke = "#64748b";

          if (clampedProgress > 2.0) {
            topFill = "#10b981";
            leftFill = "#059669";
            rightFill = "#047857";
            stroke = "#34d399";
          } else if (clampedProgress > 1.0) {
            topFill = "#06b6d4";
            leftFill = "#0891b2";
            rightFill = "#0e7490";
            stroke = "#67e8f9";
          } else if (clampedProgress > 0.0) {
            topFill = "#d97706";
            leftFill = "#b45309";
            rightFill = "#78350f";
            stroke = "#fbbf24";
          }

          const slab = isoSlab(uX0, y0, uX1, y1, z0, z1);

          return (
            <g className="transition-all duration-300">
              <path d={slab.left} fill={leftFill} stroke={stroke} strokeWidth="1" />
              <path d={slab.right} fill={rightFill} stroke={stroke} strokeWidth="1" />
              <path d={slab.top} fill={topFill} stroke={stroke} strokeWidth="1.2" />

              {/* During Tensorization: Orange portion dissolving away */}
              {ep2 > 0 && orangePartOpacity > 0.02 && (
                <g opacity={orangePartOpacity * (1 - ep2)}>
                  {(() => {
                    const oSlab = isoSlab(-10, y0, 85, y1, z0, z1);
                    return (
                      <g>
                        <path d={oSlab.top} fill="#d97706" stroke="#fbbf24" strokeWidth="1" strokeDasharray="3 2" />
                        <path d={oSlab.left} fill="#b45309" stroke="#fbbf24" strokeWidth="1" strokeDasharray="3 2" />
                      </g>
                    );
                  })()}
                </g>
              )}

              {/* During Quantization: Green glowing center core */}
              {quantCoreOpacity > 0.02 && (
                <g opacity={quantCoreOpacity}>
                  {(() => {
                    const cSlab = isoSlab(uX0 + 8, y0 + 6, uX1 - 8, y1 - 6, z0 + 10, z1 - 10);
                    return (
                      <g>
                        <path d={cSlab.top} fill="#34d399" stroke="#6ee7b7" strokeWidth="1.2" />
                        <path d={cSlab.left} fill="#10b981" stroke="#34d399" strokeWidth="1" />
                        <path d={cSlab.right} fill="#059669" stroke="#34d399" strokeWidth="1" />
                      </g>
                    );
                  })()}
                </g>
              )}
            </g>
          );
        })()}

        {/* CHANNEL 1 (EXCISED DURING PRUNING - GREY IN BASELINE, LIFTS AND DISSOLVES) */}
        {prunedOpacity > 0.01 &&
          (() => {
            const y0 = -40;
            const y1 = -3;
            const z0 = -35 + prunedLift;
            const z1 = 70 + prunedLift;
            const slab = isoSlab(-85, y0, 85, y1, z0, z1);

            return (
              <g opacity={prunedOpacity} className="transition-opacity">
                <path
                  d={slab.left}
                  fill="#334155"
                  stroke={ep1 > 0 ? "#94a3b8" : "#475569"}
                  strokeWidth="1"
                  strokeDasharray={ep1 > 0.1 ? "4 3" : "none"}
                />
                <path
                  d={slab.right}
                  fill="#1e293b"
                  stroke={ep1 > 0 ? "#94a3b8" : "#334155"}
                  strokeWidth="1"
                  strokeDasharray={ep1 > 0.1 ? "4 3" : "none"}
                />
                <path
                  d={slab.top}
                  fill="#475569"
                  stroke={ep1 > 0 ? "#94a3b8" : "#64748b"}
                  strokeWidth="1.2"
                  strokeDasharray={ep1 > 0.1 ? "4 3" : "none"}
                />
              </g>
            );
          })()}

        {/* CHANNEL 2 (SURVIVING ACTIVE BLOCK - MIDDLE/RIGHT) */}
        {(() => {
          const baseZ0 = -35;
          const baseZ1 = 70;
          const shrinkZ = ep3 * 16;
          const shrinkY = ep3 * 8;
          const shrinkX = ep3 * 10;

          const vX0 = (ep2 > 0 ? 12 + blueFactorSeparation * 0.5 : -85) + shrinkX;
          const vX1 = 85 + blueFactorSeparation * 0.8 - shrinkX;
          const y0 = 6 + shrinkY;
          const y1 = 48 - shrinkY;
          const z0 = baseZ0 + shrinkZ;
          const z1 = baseZ1 - shrinkZ;

          let topFill = "#475569";
          let leftFill = "#334155";
          let rightFill = "#1e293b";
          let stroke = "#64748b";

          if (clampedProgress > 2.0) {
            topFill = "#10b981";
            leftFill = "#059669";
            rightFill = "#047857";
            stroke = "#34d399";
          } else if (clampedProgress > 1.0) {
            topFill = "#06b6d4";
            leftFill = "#0891b2";
            rightFill = "#0e7490";
            stroke = "#67e8f9";
          } else if (clampedProgress > 0.0) {
            topFill = "#d97706";
            leftFill = "#b45309";
            rightFill = "#78350f";
            stroke = "#fbbf24";
          }

          const slab = isoSlab(vX0, y0, vX1, y1, z0, z1);

          return (
            <g className="transition-all duration-300">
              <path d={slab.left} fill={leftFill} stroke={stroke} strokeWidth="1" />
              <path d={slab.right} fill={rightFill} stroke={stroke} strokeWidth="1" />
              <path d={slab.top} fill={topFill} stroke={stroke} strokeWidth="1.2" />

              {/* During Tensorization: Orange portion dissolving away */}
              {ep2 > 0 && orangePartOpacity > 0.02 && (
                <g opacity={orangePartOpacity * (1 - ep2)}>
                  {(() => {
                    const oSlab = isoSlab(-85, y0, 10, y1, z0, z1);
                    return (
                      <g>
                        <path d={oSlab.top} fill="#d97706" stroke="#fbbf24" strokeWidth="1" strokeDasharray="3 2" />
                        <path d={oSlab.right} fill="#78350f" stroke="#fbbf24" strokeWidth="1" strokeDasharray="3 2" />
                      </g>
                    );
                  })()}
                </g>
              )}

              {/* During Quantization: Green glowing center core */}
              {quantCoreOpacity > 0.02 && (
                <g opacity={quantCoreOpacity}>
                  {(() => {
                    const cSlab = isoSlab(vX0 + 8, y0 + 6, vX1 - 8, y1 - 6, z0 + 10, z1 - 10);
                    return (
                      <g>
                        <path d={cSlab.top} fill="#34d399" stroke="#6ee7b7" strokeWidth="1.2" />
                        <path d={cSlab.left} fill="#10b981" stroke="#34d399" strokeWidth="1" />
                        <path d={cSlab.right} fill="#059669" stroke="#34d399" strokeWidth="1" />
                      </g>
                    );
                  })()}
                </g>
              )}
            </g>
          );
        })()}

        {/* CHANNEL 3 (EXCISED DURING PRUNING - GREY IN BASELINE, LIFTS AND DISSOLVES) */}
        {prunedOpacity > 0.01 &&
          (() => {
            const y0 = 52;
            const y1 = 85;
            const z0 = -35 + prunedLift;
            const z1 = 70 + prunedLift;
            const slab = isoSlab(-85, y0, 85, y1, z0, z1);

            return (
              <g opacity={prunedOpacity} className="transition-opacity">
                <path
                  d={slab.left}
                  fill="#334155"
                  stroke={ep1 > 0 ? "#94a3b8" : "#475569"}
                  strokeWidth="1"
                  strokeDasharray={ep1 > 0.1 ? "4 3" : "none"}
                />
                <path
                  d={slab.right}
                  fill="#1e293b"
                  stroke={ep1 > 0 ? "#94a3b8" : "#334155"}
                  strokeWidth="1"
                  strokeDasharray={ep1 > 0.1 ? "4 3" : "none"}
                />
                <path
                  d={slab.top}
                  fill="#475569"
                  stroke={ep1 > 0 ? "#94a3b8" : "#64748b"}
                  strokeWidth="1.2"
                  strokeDasharray={ep1 > 0.1 ? "4 3" : "none"}
                />
              </g>
            );
          })()}

        {/* CONTINUOUS STEPPER & PROGRESS TRACK (BOTTOM RIGHT) */}
        <g transform="translate(460, 395)">
          {/* Progress Track */}
          <rect x="0" y="0" width="450" height="6" rx="3" fill="var(--border)" />
          <rect
            x="0"
            y="0"
            width={(clampedProgress / 3) * 450}
            height="6"
            rx="3"
            fill={telemetry.badgeColor}
            className="transition-all duration-150"
          />

          {/* 4 Checkpoint Markers with ample spacing to avoid text collisions */}
          {[
            { st: "baseline", label: "1. Dense FP32", x: 0, anchor: "start" as const },
            { st: "pruning", label: "2. Pruning", x: 150, anchor: "middle" as const },
            { st: "tensorization", label: "3. Tensorize", x: 300, anchor: "middle" as const },
            { st: "quantization", label: "4. INT8 Quantize", x: 450, anchor: "end" as const },
          ].map((item, i) => {
            const isPassed = clampedProgress >= i;
            const isCur = Math.round(clampedProgress) === i;
            return (
              <g
                key={item.st}
                className="cursor-pointer group"
                onClick={() => onStageSelect && onStageSelect(item.st as OptimizationStage)}
              >
                <circle
                  cx={item.x}
                  cy="3"
                  r={isCur ? "7" : "4.5"}
                  fill={isPassed ? telemetry.badgeColor : "var(--card)"}
                  stroke={isPassed ? "var(--card)" : "var(--border)"}
                  strokeWidth="2"
                  className="transition-all duration-300"
                />
                <text
                  x={item.x}
                  y="22"
                  fill={isCur ? "var(--foreground)" : "var(--muted)"}
                  fontSize="10.5"
                  fontFamily="monospace"
                  fontWeight={isCur ? "bold" : "normal"}
                  textAnchor={item.anchor}
                >
                  {item.label}
                </text>
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}

// Background SVG for InfiniteGridHero Card
export function getEdgeOptimizationCardSvg(): string {
  return `<svg viewBox="0 0 320 180" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" fill="none">
    <defs>
      <linearGradient id="edge-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#06b6d4" stop-opacity="0.30"/>
        <stop offset="50%" stop-color="#10b981" stop-opacity="0.20"/>
        <stop offset="100%" stop-color="#3b82f6" stop-opacity="0.10"/>
      </linearGradient>
    </defs>
    
    <path d="M 10 90 L 310 90 M 160 10 L 160 170" stroke="currentColor" stroke-opacity="0.1" stroke-width="1.2" stroke-dasharray="4 4"/>
    
    <!-- Left: Dense Tensor (FP32) -->
    <rect x="25" y="35" width="65" height="110" rx="8" fill="currentColor" fill-opacity="0.04" stroke="#94a3b8" stroke-width="1.2" stroke-opacity="0.6"/>
    <text x="32" y="52" font-family="monospace" font-size="5.5" font-weight="bold" fill="#94a3b8">DENSE FP32</text>
    <text x="32" y="64" font-family="monospace" font-size="4.5" fill="currentColor" fill-opacity="0.6">90 MB</text>
    <line x1="32" y1="80" x2="82" y2="80" stroke="#94a3b8" stroke-width="0.8" stroke-dasharray="2 2"/>
    <line x1="32" y1="100" x2="82" y2="100" stroke="#94a3b8" stroke-width="0.8" stroke-dasharray="2 2"/>
    <line x1="32" y1="120" x2="82" y2="120" stroke="#94a3b8" stroke-width="0.8" stroke-dasharray="2 2"/>

    <!-- Arrow 1: Pruning / Decomposition -->
    <path class="edge-transform-stage" d="M 98 90 L 118 90" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="2 2"/>

    <!-- Middle: Low-Rank Factorized Matrices (U and V) -->
    <rect x="126" y="45" width="28" height="90" rx="4" fill="currentColor" fill-opacity="0.06" stroke="#06b6d4" stroke-width="1"/>
    <text x="130" y="56" font-family="monospace" font-size="4.5" font-weight="bold" fill="#06b6d4">U</text>
    
    <circle cx="160" cy="90" r="5" fill="none" stroke="#06b6d4" stroke-width="1"/>
    <text x="158.5" y="92" font-family="sans-serif" font-size="6" font-weight="bold" fill="#06b6d4">⊗</text>

    <rect x="166" y="45" width="28" height="90" rx="4" fill="currentColor" fill-opacity="0.06" stroke="#06b6d4" stroke-width="1"/>
    <text x="170" y="56" font-family="monospace" font-size="4.5" font-weight="bold" fill="#06b6d4">V</text>

    <!-- Arrow 2: Quantization -->
    <path class="edge-transform-stage" d="M 202 90 L 222 90" stroke="#10b981" stroke-width="1.5" stroke-dasharray="2 2"/>

    <!-- Right: INT8 Micro-Lattice -->
    <rect x="230" y="40" width="65" height="100" rx="8" fill="url(#edge-grad)" stroke="#10b981" stroke-width="1.4"/>
    <text x="238" y="55" font-family="monospace" font-size="5.5" font-weight="bold" fill="#10b981">INT8 LITE</text>
    <text x="238" y="66" font-family="monospace" font-size="4.5" fill="#10b981">20 MB (-78%)</text>
    
    <rect x="238" y="76" width="12" height="12" rx="2" fill="#10b981" fill-opacity="0.4"/>
    <rect x="254" y="76" width="12" height="12" rx="2" fill="#10b981" fill-opacity="0.4"/>
    <rect x="270" y="76" width="12" height="12" rx="2" fill="#10b981" fill-opacity="0.4"/>
    <rect x="238" y="92" width="12" height="12" rx="2" fill="#10b981" fill-opacity="0.4"/>
    <rect x="254" y="92" width="12" height="12" rx="2" fill="#10b981" fill-opacity="0.4"/>
    <rect x="270" y="92" width="12" height="12" rx="2" fill="#10b981" fill-opacity="0.4"/>
    <rect x="238" y="108" width="12" height="12" rx="2" fill="#10b981" fill-opacity="0.4"/>
    <rect x="254" y="108" width="12" height="12" rx="2" fill="#10b981" fill-opacity="0.4"/>
    <rect x="270" y="108" width="12" height="12" rx="2" fill="#10b981" fill-opacity="0.4"/>
  </svg>`;
}
