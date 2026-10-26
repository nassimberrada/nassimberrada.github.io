"use client";

import React from "react";

export function BfrbExperimentalProcessDiagram() {
  return (
    <div className="w-full my-6 rounded-[14px] border border-[var(--border)] bg-[var(--card)] p-4 sm:p-6 shadow-sm overflow-hidden select-none font-sans">
      {/* Diagram Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b border-[var(--border)]">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--foreground)]">
            Experimental Pipeline: Physics-Based Kinematics, Asymmetric Dual Towers &amp; Generalization
          </span>
        </div>
        <span className="text-[10px] font-mono text-[var(--muted)]">
          From Raw Signal to Clinical Insight
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
              id="bfrb-arrow-emerald"
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
              id="bfrb-arrow-blue"
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
              id="bfrb-arrow-purple"
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
              id="bfrb-arrow-amber"
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
            <pattern id="bfrbGrid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-[var(--border)] opacity-20" />
            </pattern>
          </defs>

          {/* Background Grid */}
          <rect width="940" height="480" fill="url(#bfrbGrid)" />

          {/* =========================================================================
              TIER 1: MULTI-SENSOR WEARABLE INGESTION (TOP)
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
            <rect x="0" y="0" width="220" height="18" rx="4" fill="#10b981" fillOpacity="0.12" stroke="#10b981" strokeWidth="1" strokeOpacity="0.3" />
            <text x="110" y="13" textAnchor="middle" fill="#10b981" fontSize="9" fontFamily="monospace" fontWeight="bold">
              PHASE 01 · MULTI-SENSOR INGESTION
            </text>
            <text x="235" y="13" fill="currentColor" className="text-[var(--muted)]" fontSize="8.5" fontFamily="monospace">
              Helios Wristband Telemetry · 50 Hz IMU · 10 Hz Thermopile · 5 Hz 8×8 ToF Grid
            </text>
          </g>

          {/* Sensor Input Nodes */}
          {/* Node 1: IMU */}
          <g transform="translate(40, 56)">
            <rect x="0" y="0" width="260" height="52" rx="6" fill="currentColor" className="text-[var(--muted-bg)]" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />
            <text x="12" y="16" fill="#3b82f6" fontSize="10" fontFamily="monospace" fontWeight="bold">
              1. 6-DoF Kinematics (50 Hz)
            </text>
            <text x="12" y="30" fill="currentColor" className="text-[var(--foreground)]" fontSize="8.5" fontFamily="monospace">
              Raw Accel + Quaternions
            </text>
            <text x="12" y="42" fill="#ef4444" fontSize="7.5" fontFamily="monospace">
              Challenge: 9.81 m/s² gravity vector dominates.
            </text>
          </g>

          {/* Node 2: ToF Array */}
          <g transform="translate(340, 56)">
            <rect x="0" y="0" width="260" height="52" rx="6" fill="currentColor" className="text-[var(--muted-bg)]" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />
            <text x="12" y="16" fill="#8b5cf6" fontSize="10" fontFamily="monospace" fontWeight="bold">
              2. 64-Zone Time-of-Flight (5 Hz)
            </text>
            <text x="12" y="30" fill="currentColor" className="text-[var(--foreground)]" fontSize="8.5" fontFamily="monospace">
              8×8 Matrix Distance Depth [mm] (tof_0..63)
            </text>
            <text x="12" y="42" fill="#f59e0b" fontSize="7.5" fontFamily="monospace">
              Challenge: Fabric/hair occlusions.
            </text>
          </g>

          {/* Node 3: Thermopile */}
          <g transform="translate(640, 56)">
            <rect x="0" y="0" width="260" height="52" rx="6" fill="currentColor" className="text-[var(--muted-bg)]" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />
            <text x="12" y="16" fill="#f59e0b" fontSize="10" fontFamily="monospace" fontWeight="bold">
              3. 5-Channel Thermal (10 Hz)
            </text>
            <text x="12" y="30" fill="currentColor" className="text-[var(--foreground)]" fontSize="8.5" fontFamily="monospace">
              Infrared Temperature Gradient (thm_1..5)
            </text>
            <text x="12" y="42" fill="#10b981" fontSize="7.5" fontFamily="monospace">
              Role: Confirms epidermal hand-to-face proximity.
            </text>
          </g>


          {/* =========================================================================
              TIER 2: PHYSICS DECONVOLUTION & FEATURE ENGINEERING (MIDDLE)
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
              PHASE 02 · PHYSICS-BASED FEATURE ENGINEERING
            </text>
            <text x="255" y="13" fill="currentColor" className="text-[var(--muted)]" fontSize="8.5" fontFamily="monospace">
              Signal Deconvolution · Kinematic Jerk · Fourier Harmonics · Occlusion Density
            </text>
          </g>

          {/* Sub-blocks Tier 2 */}
          {/* Gravity Removal */}
          <g transform="translate(40, 172)">
            <rect x="0" y="0" width="260" height="80" rx="6" fill="currentColor" className="text-[var(--muted-bg)]" stroke="#3b82f6" strokeWidth="1" strokeOpacity="0.5" />
            <text x="12" y="16" fill="#3b82f6" fontSize="10" fontFamily="monospace" fontWeight="bold">
              Gravity Deconvolution
            </text>
            <text x="12" y="30" fill="currentColor" className="text-[var(--foreground)]" fontSize="8.5" fontFamily="monospace" fontWeight="semibold">
              a_linear = a - R⁻¹([0, 0, 9.81])
            </text>
            <text x="12" y="45" fill="currentColor" className="text-[var(--muted)]" fontSize="7.8" fontFamily="sans-serif">
              Rotates gravity out of sensor coordinates via inverse quaternion R.
            </text>
            <text x="12" y="68" fill="#10b981" fontSize="8" fontFamily="monospace">
              &check; Jerk Derived: j = da_linear / dt
            </text>
          </g>

          {/* Angular Velocity */}
          <g transform="translate(340, 172)">
            <rect x="0" y="0" width="260" height="80" rx="6" fill="currentColor" className="text-[var(--muted-bg)]" stroke="#3b82f6" strokeWidth="1" strokeOpacity="0.5" />
            <text x="12" y="16" fill="#3b82f6" fontSize="10" fontFamily="monospace" fontWeight="bold">
              Relative Quaternion Angular Vel
            </text>
            <text x="12" y="30" fill="currentColor" className="text-[var(--foreground)]" fontSize="8.5" fontFamily="monospace" fontWeight="semibold">
              &Delta;R = R_t⁻¹ &middot; R_t+dt &rarr; &omega; = rotvec(&Delta;R) / &Delta;t
            </text>
            <text x="12" y="45" fill="currentColor" className="text-[var(--muted)]" fontSize="7.8" fontFamily="sans-serif">
              Eliminates Euler gimbal lock and trigonometric discontinuities.
            </text>
            <text x="12" y="68" fill="#10b981" fontSize="8" fontFamily="monospace">
              &check; 3D Rotational Speed Preserved
            </text>
          </g>

          {/* FFT & Missingness */}
          <g transform="translate(640, 172)">
            <rect x="0" y="0" width="260" height="80" rx="6" fill="currentColor" className="text-[var(--muted-bg)]" stroke="#3b82f6" strokeWidth="1" strokeOpacity="0.5" />
            <text x="12" y="16" fill="#3b82f6" fontSize="10" fontFamily="monospace" fontWeight="bold">
              FFT Harmonics &amp; Occlusion Stat
            </text>
            <text x="12" y="30" fill="currentColor" className="text-[var(--foreground)]" fontSize="8.5" fontFamily="monospace" fontWeight="semibold">
              rfft(motion) &rarr; fft_mag1, 2, 3 (1.5-6 Hz)
            </text>
            <text x="12" y="45" fill="currentColor" className="text-[var(--muted)]" fontSize="7.8" fontFamily="sans-serif">
              Quantifies repetitive rhythmic cadence.
            </text>
            <text x="12" y="68" fill="#10b981" fontSize="8" fontFamily="monospace">
              &check; 48 IMU + 325 ToF/THM Channels
            </text>
          </g>

          {/* Downward Connectors from Tier 1 to Tier 2 */}
          <path d="M 170 108 L 170 135" stroke="#3b82f6" strokeWidth="1.5" markerEnd="url(#bfrb-arrow-blue)" />
          <path d="M 470 108 L 470 135" stroke="#8b5cf6" strokeWidth="1.5" markerEnd="url(#bfrb-arrow-purple)" />
          <path d="M 770 108 L 770 135" stroke="#f59e0b" strokeWidth="1.5" markerEnd="url(#bfrb-arrow-amber)" />


          {/* =========================================================================
              TIER 3: DUAL-TOWER NEURAL ARCHITECTURE (BOTTOM-MIDDLE)
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
            <rect x="0" y="0" width="220" height="18" rx="4" fill="#8b5cf6" fillOpacity="0.12" stroke="#8b5cf6" strokeWidth="1" strokeOpacity="0.3" />
            <text x="110" y="13" textAnchor="middle" fill="#8b5cf6" fontSize="9" fontFamily="monospace" fontWeight="bold">
              PHASE 03 · DUAL-TOWER SE-CNN &amp; BiGRU
            </text>
            <text x="235" y="13" fill="currentColor" className="text-[var(--muted)]" fontSize="8.5" fontFamily="monospace">
              Asymmetric Deep Learning Architecture · Squeeze-and-Excitation · Temporal Self-Attention
            </text>
          </g>

          {/* Tower 1 (IMU Deep) */}
          <g transform="translate(40, 316)">
            <rect x="0" y="0" width="410" height="52" rx="6" fill="currentColor" className="text-[var(--muted-bg)]" stroke="#3b82f6" strokeWidth="1" strokeOpacity="0.5" />
            <text x="12" y="16" fill="#3b82f6" fontSize="10" fontFamily="monospace" fontWeight="bold">
              Tower 1: Deep Temporal Kinematic Stream (48 dims)
            </text>
            <text x="12" y="30" fill="currentColor" className="text-[var(--foreground)]" fontSize="8" fontFamily="monospace">
              Dense(64) &rarr; GaussianNoise(0.02) &rarr; 2× Residual SE-CNN (32 &amp; 64f, k=5,3)
            </text>
            <text x="12" y="44" fill="#10b981" fontSize="8" fontFamily="monospace">
              &rarr; Bidirectional GRU (64 units) &rarr; Temporal Self-Attention &rarr; GlobalAvgPool
            </text>
          </g>

          {/* Tower 2 (ToF/THM Spatial) */}
          <g transform="translate(490, 316)">
            <rect x="0" y="0" width="410" height="52" rx="6" fill="currentColor" className="text-[var(--muted-bg)]" stroke="#8b5cf6" strokeWidth="1" strokeOpacity="0.5" />
            <text x="12" y="16" fill="#8b5cf6" fontSize="10" fontFamily="monospace" fontWeight="bold">
              Tower 2: Spatial Proximity &amp; Thermal Stream (325 dims)
            </text>
            <text x="12" y="30" fill="currentColor" className="text-[var(--foreground)]" fontSize="8" fontFamily="monospace">
              Dense(32) &rarr; GaussianNoise(0.02) &rarr; Residual SE-CNN (32f, k=5) &rarr; GlobalAvgPool
            </text>
            <text x="12" y="44" fill="#f59e0b" fontSize="8" fontFamily="monospace">
              &check; Fallback Resilience: Bypassed automatically when ToF/THM are missing
            </text>
          </g>

          {/* Connectors from Tier 2 to Tier 3 */}
          <path d="M 245 252 L 245 280" stroke="#3b82f6" strokeWidth="1.5" markerEnd="url(#bfrb-arrow-blue)" />
          <path d="M 695 252 L 695 280" stroke="#8b5cf6" strokeWidth="1.5" markerEnd="url(#bfrb-arrow-purple)" />


          {/* =========================================================================
              TIER 4: REGULARIZED FUSION & TEST-TIME AUGMENTATION (BOTTOM)
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

          {/* Tier 4 Elements */}
          <g transform="translate(35, 408)">
            <rect x="0" y="0" width="230" height="18" rx="4" fill="#10b981" fillOpacity="0.12" stroke="#10b981" strokeWidth="1" strokeOpacity="0.3" />
            <text x="115" y="13" textAnchor="middle" fill="#10b981" fontSize="9" fontFamily="monospace" fontWeight="bold">
              PHASE 04 · REGULARIZATION &amp; TTA
            </text>
            <text x="245" y="13" fill="currentColor" className="text-[var(--muted)]" fontSize="8.5" fontFamily="monospace">
              Mixup (&alpha;=0.4) · Label Smoothing (0.1) · 5-Pass Test-Time Augmentation Engine
            </text>
          </g>

          <g transform="translate(40, 432)" fontSize="8.5" fontFamily="monospace" fill="currentColor" className="text-[var(--foreground)]">
            <text x="0" y="14">
              &bull; <tspan fontWeight="bold" fill="#10b981">Multimodal Fusion Head:</tspan> Concat([T1, T2]) &rarr; Dense(128, ReLU) &rarr; Dropout(0.5) &rarr; Softmax(5 Classes)
            </text>
          </g>

          <g transform="translate(40, 432)" fontSize="8.5" fontFamily="monospace" fill="currentColor" className="text-[var(--foreground)]">
            <text x="0" y="24">
              &bull; <tspan fontWeight="bold" fill="#8b5cf6">TTA Ensemble:</tspan> 5× Jitter (Scale 0.9-1.1×, Roll &plusmn;10 steps) &rarr; Averaged Logits
            </text>
          </g>

          {/* Connectors to Tier 4 */}
          <path d="M 245 368 L 245 395" stroke="#10b981" strokeWidth="1.5" markerEnd="url(#bfrb-arrow-emerald)" />
          <path d="M 695 368 L 695 395" stroke="#10b981" strokeWidth="1.5" markerEnd="url(#bfrb-arrow-emerald)" />
        </svg>
      </div>

      {/* Schematic Footer Note */}
      <div className="mt-4 pt-3 border-t border-[var(--border)] flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-[var(--muted)]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>Iterative Data Science Process: Physics Kinematics + Multimodal Asymmetry + TTA</span>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-emerald-600 dark:text-emerald-400">
          <span>92.8% F1 Score · &lt; 2.1% False Alarm Rate on Holdout Subjects</span>
        </div>
      </div>
    </div>
  );
}
