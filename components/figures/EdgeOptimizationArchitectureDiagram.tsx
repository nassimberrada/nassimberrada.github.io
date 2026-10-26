"use client";

import React from "react";

export function EdgeOptimizationArchitectureDiagram() {
  return (
    <div className="w-full my-6 rounded-[14px] border border-[var(--border)] bg-[var(--card)] p-4 sm:p-6 shadow-sm overflow-hidden select-none">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b border-[var(--border)]">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--foreground)]">
            Edge Model Compression &amp; Deployment Pipeline
          </span>
        </div>
        <span className="text-[10px] font-mono text-[var(--muted)]">
          Sensitivity Profiling · Structured Pruning · VBMF Tensorization · FX INT8 · TorchScript Lite
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
              id="opt-arrow-cyan"
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
              id="opt-arrow-amber"
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
              id="opt-arrow-emerald"
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
              id="opt-arrow-purple"
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

          {/* ========================================================================= */}
          {/* STEP 1: LAYER SENSITIVITY & LATENCY/PARAMETER PROFILING                    */}
          {/* ========================================================================= */}
          <g transform="translate(20, 20)">
            <rect
              width="270"
              height="215"
              rx="12"
              fill="var(--card)"
              stroke="#64748b"
              strokeWidth="1.5"
              strokeOpacity="0.4"
            />
            <rect x="14" y="14" width="145" height="20" rx="4" fill="rgba(100,116,139,0.12)" />
            <text x="86.5" y="28" fontSize="10" fontFamily="monospace" fontWeight="bold" fill="#64748b" textAnchor="middle">
              1. SENSITIVITY PROFILER
            </text>
            <text x="14" y="48" fontSize="8.5" fontFamily="monospace" fill="var(--muted)">
              Hardware Submodule Benchmarking
            </text>

            <g transform="translate(14, 56)">
              <rect width="242" height="66" rx="6" fill="var(--muted-bg)" stroke="var(--border)" strokeWidth="1" />
              <text x="10" y="16" fontSize="9" fontWeight="bold" fill="var(--foreground)">
                Bottleneck Identification
              </text>
              <text x="10" y="29" fontSize="8" fill="var(--muted)">
                Memory Weight vs Execution Latency Split
              </text>
              <text x="10" y="42" fontSize="7.8" fontFamily="monospace" fill="#f59e0b">
                • Temporal Conv: 50% parameter weight
              </text>
              <text x="10" y="55" fontSize="7.8" fontFamily="monospace" fill="#06b6d4">
                • Frame Encoder: 67% overall latency
              </text>
            </g>

            {/* Profiling output equation */}
            <g transform="translate(14, 130)">
              <rect width="242" height="70" rx="6" fill="var(--card)" stroke="var(--border)" strokeWidth="0.8" />
              <text x="10" y="18" fontSize="8" fontFamily="monospace" fill="var(--foreground)" fontWeight="bold">
                Target Allocation Policy:
              </text>
              <text x="10" y="32" fontSize="7.5" fontFamily="monospace" fill="var(--muted)">
                Compute Layers ➔ Structured Channel Pruning
              </text>
              <text x="10" y="46" fontSize="7.5" fontFamily="monospace" fill="#06b6d4">
                Heavy Convolutions ➔ Low-Rank VBMF SVD
              </text>
              <text x="10" y="60" fontSize="7.5" fontFamily="monospace" fill="#10b981">
                Linear &amp; Dense Blocks ➔ Dynamic INT8
              </text>
            </g>
          </g>

          {/* ARROW: Step 1 to Step 2 */}
          <path d="M 290 125 L 340 125" fill="none" stroke="#f59e0b" strokeWidth="1.8" markerEnd="url(#opt-arrow-amber)" />

          {/* ========================================================================= */}
          {/* STEP 2: STRUCTURED CHANNEL PRUNING (DEPENDENCY-AWARE)                     */}
          {/* ========================================================================= */}
          <g transform="translate(340, 20)">
            <rect
              width="270"
              height="215"
              rx="12"
              fill="var(--card)"
              stroke="#f59e0b"
              strokeWidth="1.5"
              strokeOpacity="0.4"
            />
            <rect x="14" y="14" width="150" height="20" rx="4" fill="rgba(245,158,11,0.12)" />
            <text x="89" y="28" fontSize="10" fontFamily="monospace" fontWeight="bold" fill="#f59e0b" textAnchor="middle">
              2. STRUCTURED PRUNING
            </text>
            <text x="14" y="48" fontSize="8.5" fontFamily="monospace" fill="var(--muted)">
              GPU/NPU Dense Channel Dropping
            </text>

            <g transform="translate(14, 56)">
              <rect width="242" height="144" rx="6" fill="var(--muted-bg)" stroke="var(--border)" strokeWidth="1" />
              <text x="10" y="16" fontSize="9" fontWeight="bold" fill="var(--foreground)">
                Hardware-Native Channel Removal
              </text>
              <text x="10" y="28" fontSize="7.5" fill="var(--muted)">
                Avoids zero-weight sparsity latency penalty on edge GPUs
              </text>

              {/* Step details */}
              <rect x="10" y="36" width="222" height="30" rx="4" fill="var(--card)" stroke="#f59e0b" strokeWidth="0.8" />
              <text x="16" y="49" fontSize="8" fontFamily="monospace" fill="#f59e0b" fontWeight="bold">
                Taylor / L1 Magnitude Criterion
              </text>
              <text x="16" y="60" fontSize="7" fill="var(--muted)">
                Importance Score: I_i = |W_i · &nabla;_W L|
              </text>

              <rect x="10" y="72" width="222" height="30" rx="4" fill="var(--card)" stroke="var(--border)" strokeWidth="0.8" />
              <text x="16" y="85" fontSize="8" fontFamily="monospace" fill="var(--foreground)" fontWeight="bold">
                Dependency Graph Resolution
              </text>
              <text x="16" y="96" fontSize="7" fill="var(--muted)">
                Coupled residual downsamples &amp; channel alignment
              </text>

              <rect x="10" y="108" width="222" height="30" rx="4" fill="rgba(245,158,11,0.12)" stroke="#f59e0b" strokeWidth="0.8" />
              <text x="16" y="121" fontSize="8" fontFamily="monospace" fill="#f59e0b" fontWeight="bold">
                Result: 65 MB (-28% parameters)
              </text>
              <text x="16" y="132" fontSize="7" fill="var(--muted)">
                Zero sparse matrix indexing overhead on mobile
              </text>
            </g>
          </g>

          {/* ARROW: Step 2 to Step 3 */}
          <path d="M 610 125 L 660 125" fill="none" stroke="#06b6d4" strokeWidth="1.8" markerEnd="url(#opt-arrow-cyan)" />

          {/* ========================================================================= */}
          {/* STEP 3: TENSORIZATION VIA ANALYTIC VBMF MATRIX FACTORIZATION             */}
          {/* ========================================================================= */}
          <g transform="translate(660, 20)">
            <rect
              width="280"
              height="215"
              rx="12"
              fill="var(--card)"
              stroke="#06b6d4"
              strokeWidth="1.5"
              strokeOpacity="0.4"
            />
            <rect x="14" y="14" width="165" height="20" rx="4" fill="rgba(6,182,212,0.12)" />
            <text x="96.5" y="28" fontSize="10" fontFamily="monospace" fontWeight="bold" fill="#06b6d4" textAnchor="middle">
              3. VBMF TENSORIZATION
            </text>
            <text x="14" y="48" fontSize="8.5" fontFamily="monospace" fill="var(--muted)">
              Low-Rank Convolution Decomposition
            </text>

            <g transform="translate(14, 56)">
              <rect width="252" height="144" rx="6" fill="var(--muted-bg)" stroke="var(--border)" strokeWidth="1" />
              <text x="10" y="16" fontSize="9" fontWeight="bold" fill="var(--foreground)">
                Variational Bayes Matrix Factorization
              </text>
              <text x="10" y="28" fontSize="7.5" fontFamily="monospace" fill="#06b6d4">
                W ≈ U [Cin × R] ⊗ V [R × Cout]
              </text>

              {/* Factorization Diagram */}
              <g transform="translate(10, 36)">
                <rect x="0" y="0" width="112" height="46" rx="3" fill="var(--card)" stroke="#06b6d4" strokeWidth="0.8" />
                <text x="6" y="14" fontSize="8" fontFamily="monospace" fontWeight="bold" fill="#06b6d4">Pointwise Conv U</text>
                <text x="6" y="26" fontSize="7" fill="var(--muted)">Kernel: 1 × 1 × R</text>
                <text x="6" y="38" fontSize="7" fill="var(--muted)">Projects to rank R</text>

                <rect x="120" y="0" width="112" height="46" rx="3" fill="var(--card)" stroke="#06b6d4" strokeWidth="0.8" />
                <text x="126" y="14" fontSize="8" fontFamily="monospace" fontWeight="bold" fill="#06b6d4">Spatial Conv V</text>
                <text x="126" y="26" fontSize="7" fill="var(--muted)">Kernel: K × K × Cout</text>
                <text x="126" y="38" fontSize="7" fill="var(--muted)">Recovers feature map</text>

                <rect x="0" y="52" width="232" height="44" rx="3" fill="rgba(6,182,212,0.12)" stroke="#06b6d4" strokeWidth="0.8" />
                <text x="8" y="66" fontSize="7.8" fontFamily="monospace" fontWeight="bold" fill="#06b6d4">
                  Analytic Rank Selection via Free Energy
                </text>
                <text x="8" y="78" fontSize="7" fill="var(--muted)">
                  No manual rank grid search required · Noise floor estimation
                </text>
                <text x="8" y="90" fontSize="7.5" fontFamily="monospace" fill="var(--foreground)">
                  Result: 38 MB (-58% model weight) · 2.3x speedup
                </text>
              </g>
            </g>
          </g>

          {/* ARROW: Step 3 down to Step 4 */}
          <path
            d="M 800 235 C 800 260, 680 260, 680 275"
            fill="none"
            stroke="#10b981"
            strokeWidth="1.8"
            markerEnd="url(#opt-arrow-emerald)"
          />

          {/* ========================================================================= */}
          {/* STEP 4: QUANTIZATION ENGINE & SQNR SENSITIVITY CALIBRATION               */}
          {/* ========================================================================= */}
          <g transform="translate(340, 275)">
            <rect
              width="600"
              height="225"
              rx="12"
              fill="var(--card)"
              stroke="#10b981"
              strokeWidth="1.5"
              strokeOpacity="0.4"
            />
            <rect x="14" y="14" width="210" height="20" rx="4" fill="rgba(16,185,129,0.12)" />
            <text x="119" y="28" fontSize="10" fontFamily="monospace" fontWeight="bold" fill="#10b981" textAnchor="middle">
              4. FX INT8 QUANTIZATION
            </text>
            <text x="240" y="28" fontSize="8.5" fontFamily="monospace" fill="var(--muted)">
              Dynamic &amp; Static Integer Calibration
            </text>

            <g transform="translate(14, 46)">
              {/* Left Column: Quantization Mapping Formula & Calibration */}
              <g transform="translate(0, 0)">
                <rect width="275" height="162" rx="6" fill="var(--muted-bg)" stroke="var(--border)" strokeWidth="1" />
                <text x="10" y="16" fontSize="9" fontWeight="bold" fill="var(--foreground)">
                  Affine Symmetric Mapping Formula
                </text>
                <text x="10" y="28" fontSize="7.5" fontFamily="monospace" fill="#10b981">
                  q = clamp(round(w / S) + Z, -128, 127)
                </text>

                <rect x="10" y="36" width="255" height="32" rx="3" fill="var(--card)" stroke="#10b981" strokeWidth="0.8" />
                <text x="16" y="50" fontSize="8" fontFamily="monospace" fill="#10b981" fontWeight="bold">
                  Scale &amp; Zero-Point Calibration
                </text>
                <text x="16" y="61" fontSize="7" fill="var(--muted)">
                  S = (max - min) / (qmax - qmin), Z = -round(min / S) + qmin
                </text>

                <rect x="10" y="74" width="255" height="32" rx="3" fill="var(--card)" stroke="var(--border)" strokeWidth="0.8" />
                <text x="16" y="88" fontSize="8" fontFamily="monospace" fill="var(--foreground)" fontWeight="bold">
                  SQNR Layer Sensitivity Guard
                </text>
                <text x="16" y="99" fontSize="7" fill="var(--muted)">
                  SQNR = 10 · log10(P_signal / P_quant_noise) &ge; threshold
                </text>

                <rect x="10" y="112" width="255" height="40" rx="3" fill="rgba(16,185,129,0.12)" stroke="#10b981" strokeWidth="0.8" />
                <text x="16" y="126" fontSize="7.8" fontFamily="monospace" fill="#10b981" fontWeight="bold">
                  FX Graph Transformation Pass
                </text>
                <text x="16" y="137" fontSize="7" fill="var(--muted)">
                  Symbolic graph rewriting swaps FP32 ops with torch.ao quantized kernels
                </text>
              </g>

              {/* Right Column: Compression Gains & Metric Comparison */}
              <g transform="translate(288, 0)">
                <rect width="284" height="162" rx="6" fill="var(--muted-bg)" stroke="#10b981" strokeWidth="1" strokeOpacity="0.4" />
                <text x="10" y="16" fontSize="9" fontWeight="bold" fill="#10b981">
                  Benchmarked Compression Efficiency
                </text>
                <text x="10" y="28" fontSize="7.5" fontFamily="monospace" fill="var(--muted)">
                  Evaluated across physical ARM NEON edge silicon
                </text>

                <rect x="10" y="36" width="264" height="34" rx="3" fill="var(--card)" stroke="var(--border)" strokeWidth="0.8" />
                <text x="14" y="49" fontSize="8" fontFamily="monospace" fill="var(--foreground)">
                  Footprint Reduction: <tspan fill="#10b981" fontWeight="bold">~90 MB ➔ ~20 MB (78%)</tspan>
                </text>
                <text x="14" y="61" fontSize="7" fill="var(--muted)">
                  Memory bandwidth bottleneck eliminated on mobile DRAM
                </text>

                <rect x="10" y="76" width="264" height="34" rx="3" fill="var(--card)" stroke="var(--border)" strokeWidth="0.8" />
                <text x="14" y="89" fontSize="8" fontFamily="monospace" fill="var(--foreground)">
                  Inference Acceleration: <tspan fill="#06b6d4" fontWeight="bold">4.0x Speedup (12ms)</tspan>
                </text>
                <text x="14" y="101" fontSize="7" fill="var(--muted)">
                  Integer SIMD vectorization over 8-bit packed registers
                </text>

                <rect x="10" y="116" width="264" height="36" rx="3" fill="rgba(16,185,129,0.12)" stroke="#10b981" strokeWidth="0.8" />
                <text x="14" y="130" fontSize="8" fontFamily="monospace" fontWeight="bold" fill="#10b981">
                  Task Accuracy Loss: &lt; 0.4% Degradation
                </text>
                <text x="14" y="142" fontSize="7" fill="var(--muted)">
                  Zero perceptible drift on downstream task prediction targets
                </text>
              </g>
            </g>
          </g>

          {/* ARROW: Step 4 left to Step 5 */}
          <path d="M 340 380 L 290 380" fill="none" stroke="#a855f7" strokeWidth="1.8" markerEnd="url(#opt-arrow-purple)" />

          {/* ========================================================================= */}
          {/* STEP 5: SERIALIZATION & HARDWARE TARGET RUNTIMES (MOBILE / ONNX / TFLITE) */}
          {/* ========================================================================= */}
          <g transform="translate(20, 275)">
            <rect
              width="270"
              height="225"
              rx="12"
              fill="var(--card)"
              stroke="#a855f7"
              strokeWidth="1.5"
              strokeOpacity="0.4"
            />
            <rect x="14" y="14" width="165" height="20" rx="4" fill="rgba(168,85,247,0.12)" />
            <text x="96.5" y="28" fontSize="10" fontFamily="monospace" fontWeight="bold" fill="#a855f7" textAnchor="middle">
              5. EDGE SERIALIZATION
            </text>
            <text x="14" y="48" fontSize="8.5" fontFamily="monospace" fill="var(--muted)">
              Cross-Platform Edge Deployment
            </text>

            <g transform="translate(14, 56)">
              <rect width="242" height="152" rx="6" fill="var(--muted-bg)" stroke="var(--border)" strokeWidth="1" />
              <text x="10" y="16" fontSize="9" fontWeight="bold" fill="var(--foreground)">
                Target Runtime Packaging
              </text>

              <rect x="10" y="26" width="222" height="32" rx="3" fill="var(--card)" stroke="var(--border)" strokeWidth="0.8" />
              <text x="16" y="40" fontSize="8" fontFamily="monospace" fill="#a855f7" fontWeight="bold">
                TorchScript Lite (.ptl)
              </text>
              <text x="16" y="51" fontSize="7" fill="var(--muted)">
                Optimized for mobile interpreter (iOS / Android)
              </text>

              <rect x="10" y="64" width="222" height="32" rx="3" fill="var(--card)" stroke="var(--border)" strokeWidth="0.8" />
              <text x="16" y="78" fontSize="8" fontFamily="monospace" fill="var(--foreground)" fontWeight="bold">
                ONNX &amp; TensorRT Engine
              </text>
              <text x="16" y="89" fontSize="7" fill="var(--muted)">
                NVIDIA Jetson / Xavier embedded acceleration
              </text>

              <rect x="10" y="102" width="222" height="40" rx="3" fill="rgba(168,85,247,0.15)" stroke="#a855f7" strokeWidth="0.8" />
              <text x="16" y="117" fontSize="8" fontFamily="monospace" fontWeight="bold" fill="#a855f7">
                Thermal &amp; Battery Stability
              </text>
              <text x="16" y="130" fontSize="7" fill="var(--muted)">
                Zero throttling under sustained continuous edge workloads
              </text>
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}
