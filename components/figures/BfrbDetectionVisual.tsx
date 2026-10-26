"use client";

import React, { useState, useEffect } from "react";
import { Play, Pause, RotateCw, Activity, ShieldCheck, Cpu, Radio, Sparkles, Layers, Sliders, CheckCircle2 } from "lucide-react";

interface GestureScenario {
  id: string;
  name: string;
  category: "BFRB" | "Control";
  clinicalTarget: string;
  description: string;
  imuSignal: {
    rawX: number[];
    rawY: number[];
    rawZ: number[];
    linearX: number[];
    linearY: number[];
    linearZ: number[];
    angularVel: number[];
    jerk: number[];
  };
  tofGrid: number[][]; // 8x8 matrix distance in mm (e.g. 50-600mm, -1 = occluded/out-of-range)
  thermalChannels: number[]; // 5 channels in Celsius
  fullModelProbabilities: { label: string; prob: number; isTarget: boolean }[];
  imuOnlyProbabilities: { label: string; prob: number; isTarget: boolean }[];
  ttaPasses: { scale: number; shift: number; confidence: number }[];
}

const GESTURE_SCENARIOS: GestureScenario[] = [
  {
    id: "trichotillomania",
    name: "Hair Pulling (Trichotillomania)",
    category: "BFRB",
    clinicalTarget: "Scalp / Hair Follicle Extraction",
    description: "Hand elevates above head height with upward vertical linear acceleration, followed by stationary fine-motor fingers tension and high angular twist.",
    imuSignal: {
      rawX: [0.12, 0.25, 0.48, 0.72, 0.85, 0.65, 0.42, 0.28, 0.15, 0.11],
      rawY: [0.08, 0.15, 0.35, 0.58, 0.79, 0.62, 0.38, 0.22, 0.14, 0.09],
      rawZ: [0.98, 1.15, 1.45, 1.62, 1.78, 1.52, 1.25, 1.05, 0.99, 0.97],
      linearX: [0.02, 0.18, 0.42, 0.68, 0.81, 0.58, 0.35, 0.18, 0.06, 0.02],
      linearY: [0.01, 0.08, 0.28, 0.52, 0.72, 0.54, 0.29, 0.12, 0.05, 0.01],
      linearZ: [0.05, 0.24, 0.58, 0.82, 0.95, 0.68, 0.38, 0.18, 0.08, 0.03],
      angularVel: [0.2, 0.6, 1.4, 2.8, 3.9, 3.2, 1.8, 0.9, 0.4, 0.2],
      jerk: [0.04, 0.12, 0.35, 0.78, 0.92, 0.45, 0.18, 0.08, 0.03, 0.01],
    },
    tofGrid: [
      [420, 380, 310, 240, 180, 150, 120, 95],
      [390, 340, 280, 210, 160, 130, 90, 65],
      [360, 310, 240, 170, 120, 85, 55, 42],
      [320, 270, 190, 130, 85, 50, 32, 28],
      [280, 220, 150, 95, 55, 35, 25, 22],
      [250, 180, 120, 70, 42, 28, 20, 18],
      [220, 150, 90, 55, 32, 22, 18, 15],
      [190, 120, 70, 42, 25, 18, 15, 12],
    ],
    thermalChannels: [34.8, 35.6, 36.4, 36.8, 36.1],
    fullModelProbabilities: [
      { label: "Trichotillomania (Hair Pull)", prob: 0.942, isTarget: true },
      { label: "Onychophagia (Nail Bite)", prob: 0.021, isTarget: false },
      { label: "Excoriation (Skin Pick)", prob: 0.018, isTarget: false },
      { label: "Control (Scratching Scalp)", prob: 0.014, isTarget: false },
      { label: "Control (Drinking / Gesturing)", prob: 0.005, isTarget: false },
    ],
    imuOnlyProbabilities: [
      { label: "Trichotillomania (Hair Pull)", prob: 0.884, isTarget: true },
      { label: "Control (Scratching Scalp)", prob: 0.068, isTarget: false },
      { label: "Excoriation (Skin Pick)", prob: 0.028, isTarget: false },
      { label: "Onychophagia (Nail Bite)", prob: 0.012, isTarget: false },
      { label: "Control (Drinking / Gesturing)", prob: 0.008, isTarget: false },
    ],
    ttaPasses: [
      { scale: 1.0, shift: 0, confidence: 0.942 },
      { scale: 0.94, shift: -3, confidence: 0.938 },
      { scale: 1.06, shift: +4, confidence: 0.951 },
      { scale: 0.98, shift: -2, confidence: 0.945 },
      { scale: 1.02, shift: +2, confidence: 0.947 },
    ],
  },
  {
    id: "onychophagia",
    name: "Nail Biting (Onychophagia)",
    category: "BFRB",
    clinicalTarget: "Oral / Hand-to-Mouth Contact",
    description: "Hand approaches mouth with sustained near-zero ToF distance (<25mm), characteristic 3-5 Hz rhythmic jaw-hand kinematic coupling.",
    imuSignal: {
      rawX: [0.08, 0.22, 0.41, 0.52, 0.56, 0.54, 0.55, 0.53, 0.48, 0.42],
      rawY: [0.12, 0.28, 0.46, 0.62, 0.65, 0.63, 0.64, 0.61, 0.55, 0.48],
      rawZ: [0.95, 1.05, 1.18, 1.25, 1.28, 1.27, 1.26, 1.24, 1.15, 1.02],
      linearX: [0.01, 0.14, 0.32, 0.41, 0.45, 0.42, 0.44, 0.41, 0.35, 0.28],
      linearY: [0.03, 0.16, 0.34, 0.48, 0.52, 0.49, 0.51, 0.47, 0.41, 0.32],
      linearZ: [0.02, 0.11, 0.22, 0.28, 0.31, 0.29, 0.30, 0.28, 0.21, 0.14],
      angularVel: [0.1, 0.4, 0.8, 1.2, 1.5, 1.4, 1.3, 1.2, 0.8, 0.3],
      jerk: [0.02, 0.08, 0.18, 0.24, 0.29, 0.22, 0.25, 0.19, 0.12, 0.05],
    },
    tofGrid: [
      [310, 240, 180, 120, 80, 45, 25, 18],
      [280, 210, 150, 95, 55, 28, 18, 14],
      [240, 180, 120, 70, 38, 20, 14, 12],
      [210, 150, 95, 50, 24, 15, 12, 10],
      [180, 120, 70, 35, 18, 12, 10, 8],
      [150, 95, 50, 22, 14, 10, 8, 7],
      [120, 70, 35, 16, 11, 8, 7, 6],
      [90, 50, 25, 12, 8, 7, 6, 5],
    ],
    thermalChannels: [35.2, 36.1, 37.0, 36.9, 36.3],
    fullModelProbabilities: [
      { label: "Onychophagia (Nail Bite)", prob: 0.958, isTarget: true },
      { label: "Trichotillomania (Hair Pull)", prob: 0.018, isTarget: false },
      { label: "Excoriation (Skin Pick)", prob: 0.012, isTarget: false },
      { label: "Control (Drinking / Gesturing)", prob: 0.008, isTarget: false },
      { label: "Control (Scratching Scalp)", prob: 0.004, isTarget: false },
    ],
    imuOnlyProbabilities: [
      { label: "Onychophagia (Nail Bite)", prob: 0.872, isTarget: true },
      { label: "Control (Drinking / Gesturing)", prob: 0.078, isTarget: false },
      { label: "Trichotillomania (Hair Pull)", prob: 0.028, isTarget: false },
      { label: "Excoriation (Skin Pick)", prob: 0.014, isTarget: false },
      { label: "Control (Scratching Scalp)", prob: 0.008, isTarget: false },
    ],
    ttaPasses: [
      { scale: 1.0, shift: 0, confidence: 0.958 },
      { scale: 0.92, shift: -4, confidence: 0.948 },
      { scale: 1.08, shift: +3, confidence: 0.962 },
      { scale: 0.97, shift: -1, confidence: 0.955 },
      { scale: 1.03, shift: +1, confidence: 0.960 },
    ],
  },
  {
    id: "excoriation",
    name: "Skin Picking (Excoriation)",
    category: "BFRB",
    clinicalTarget: "Epidermal Surface / Cuticle Manipulation",
    description: "Rapid microscopic kinematic jerk bursts with high localized acceleration variance and consistent arm-to-body thermal contact.",
    imuSignal: {
      rawX: [0.15, 0.32, 0.28, 0.45, 0.38, 0.52, 0.44, 0.39, 0.25, 0.18],
      rawY: [0.18, 0.35, 0.31, 0.48, 0.42, 0.55, 0.47, 0.42, 0.29, 0.21],
      rawZ: [0.99, 1.08, 1.04, 1.12, 1.09, 1.15, 1.11, 1.07, 1.03, 1.01],
      linearX: [0.08, 0.24, 0.19, 0.38, 0.31, 0.44, 0.36, 0.29, 0.18, 0.09],
      linearY: [0.09, 0.26, 0.21, 0.41, 0.34, 0.47, 0.39, 0.32, 0.21, 0.11],
      linearZ: [0.04, 0.12, 0.08, 0.16, 0.12, 0.19, 0.14, 0.11, 0.06, 0.03],
      angularVel: [0.3, 0.9, 0.7, 1.6, 1.2, 1.8, 1.4, 1.1, 0.6, 0.3],
      jerk: [0.12, 0.48, 0.38, 0.85, 0.72, 0.94, 0.79, 0.62, 0.34, 0.15],
    },
    tofGrid: [
      [180, 150, 120, 95, 75, 55, 45, 38],
      [160, 130, 105, 80, 62, 45, 36, 30],
      [140, 115, 90, 68, 50, 36, 28, 24],
      [120, 95, 75, 55, 38, 28, 22, 18],
      [105, 80, 60, 42, 28, 20, 16, 14],
      [85, 65, 48, 32, 22, 16, 12, 10],
      [70, 52, 38, 25, 16, 12, 10, 8],
      [55, 40, 28, 18, 12, 10, 8, 6],
    ],
    thermalChannels: [34.5, 35.1, 35.8, 35.4, 34.9],
    fullModelProbabilities: [
      { label: "Excoriation (Skin Pick)", prob: 0.926, isTarget: true },
      { label: "Onychophagia (Nail Bite)", prob: 0.034, isTarget: false },
      { label: "Trichotillomania (Hair Pull)", prob: 0.022, isTarget: false },
      { label: "Control (Scratching Scalp)", prob: 0.012, isTarget: false },
      { label: "Control (Drinking / Gesturing)", prob: 0.006, isTarget: false },
    ],
    imuOnlyProbabilities: [
      { label: "Excoriation (Skin Pick)", prob: 0.854, isTarget: true },
      { label: "Control (Scratching Scalp)", prob: 0.072, isTarget: false },
      { label: "Onychophagia (Nail Bite)", prob: 0.046, isTarget: false },
      { label: "Trichotillomania (Hair Pull)", prob: 0.018, isTarget: false },
      { label: "Control (Drinking / Gesturing)", prob: 0.010, isTarget: false },
    ],
    ttaPasses: [
      { scale: 1.0, shift: 0, confidence: 0.926 },
      { scale: 0.95, shift: -2, confidence: 0.919 },
      { scale: 1.05, shift: +3, confidence: 0.932 },
      { scale: 0.98, shift: -1, confidence: 0.928 },
      { scale: 1.02, shift: +2, confidence: 0.930 },
    ],
  },
  {
    id: "control_scratch",
    name: "Control: Normal Scalp Scratch",
    category: "Control",
    clinicalTarget: "Benign Daily Gesture (False Alarm Check)",
    description: "Brief, transient itch scratch without compulsive repetition or prolonged cyclic cadence; high broad acceleration, immediate withdrawal.",
    imuSignal: {
      rawX: [0.18, 0.42, 0.85, 0.65, 0.28, 0.14, 0.08, 0.05, 0.02, 0.01],
      rawY: [0.14, 0.38, 0.78, 0.58, 0.24, 0.11, 0.06, 0.03, 0.01, 0.00],
      rawZ: [1.02, 1.35, 1.85, 1.45, 1.15, 1.04, 1.01, 0.99, 0.98, 0.98],
      linearX: [0.11, 0.35, 0.78, 0.58, 0.21, 0.07, 0.02, 0.01, 0.00, 0.00],
      linearY: [0.08, 0.31, 0.71, 0.51, 0.18, 0.06, 0.02, 0.00, 0.00, 0.00],
      linearZ: [0.06, 0.38, 0.88, 0.48, 0.18, 0.06, 0.02, 0.01, 0.00, 0.00],
      angularVel: [0.4, 1.2, 2.5, 1.8, 0.8, 0.3, 0.1, 0.0, 0.0, 0.0],
      jerk: [0.08, 0.32, 0.68, 0.42, 0.15, 0.05, 0.01, 0.00, 0.00, 0.00],
    },
    tofGrid: [
      [580, 540, 480, 420, 360, 310, 260, 220],
      [550, 500, 440, 380, 320, 270, 220, 180],
      [510, 460, 400, 340, 280, 230, 180, 150],
      [470, 420, 360, 300, 240, 190, 150, 120],
      [430, 380, 320, 260, 200, 160, 120, 95],
      [390, 340, 280, 220, 170, 130, 95, 75],
      [350, 300, 240, 180, 140, 105, 75, 55],
      [310, 260, 200, 150, 110, 80, 55, 40],
    ],
    thermalChannels: [32.1, 32.8, 33.4, 33.2, 32.6],
    fullModelProbabilities: [
      { label: "Control (Scratching Scalp)", prob: 0.938, isTarget: true },
      { label: "Trichotillomania (Hair Pull)", prob: 0.038, isTarget: false },
      { label: "Excoriation (Skin Pick)", prob: 0.014, isTarget: false },
      { label: "Control (Drinking / Gesturing)", prob: 0.006, isTarget: false },
      { label: "Onychophagia (Nail Bite)", prob: 0.004, isTarget: false },
    ],
    imuOnlyProbabilities: [
      { label: "Control (Scratching Scalp)", prob: 0.862, isTarget: true },
      { label: "Trichotillomania (Hair Pull)", prob: 0.098, isTarget: false },
      { label: "Excoriation (Skin Pick)", prob: 0.024, isTarget: false },
      { label: "Control (Drinking / Gesturing)", prob: 0.010, isTarget: false },
      { label: "Onychophagia (Nail Bite)", prob: 0.006, isTarget: false },
    ],
    ttaPasses: [
      { scale: 1.0, shift: 0, confidence: 0.938 },
      { scale: 0.93, shift: -3, confidence: 0.929 },
      { scale: 1.07, shift: +4, confidence: 0.942 },
      { scale: 0.98, shift: -1, confidence: 0.935 },
      { scale: 1.03, shift: +2, confidence: 0.940 },
    ],
  },
];

export function BfrbDetectionVisual() {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>("trichotillomania");
  const [modelMode, setModelMode] = useState<"full" | "imu_only">("full");
  const [activeFrame, setActiveFrame] = useState<number>(4); // active timestep 0..9
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [showTta, setShowTta] = useState<boolean>(false);

  const scenario = GESTURE_SCENARIOS.find((s) => s.id === selectedScenarioId) || GESTURE_SCENARIOS[0];
  const probabilities = modelMode === "full" ? scenario.fullModelProbabilities : scenario.imuOnlyProbabilities;
  const topPrediction = probabilities.reduce((max, p) => (p.prob > max.prob ? p : max), probabilities[0]);

  // Automated playback frame loop
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveFrame((prev) => (prev + 1) % 10);
    }, 450);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="rounded-[14px] border border-[var(--border)] bg-[var(--card)] overflow-hidden shadow-sm">
      {/* Top Header / Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 border-b border-[var(--border)] bg-[var(--muted-bg)]/40">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-mono font-bold text-[var(--foreground)] uppercase tracking-wider flex items-center gap-2">
              <span>Dual-Tower Multimodal BFRB Inference Engine</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded font-normal bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                50 Hz Real-Time
              </span>
            </div>
            <p className="text-[11px] text-[var(--muted)] font-mono">
              Inertial Kinematics + 8×8 Time-of-Flight + 5-Ch Thermopile
            </p>
          </div>
        </div>

        {/* Playback Controls & TTA Toggle */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowTta(!showTta)}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-mono transition-colors border ${
              showTta
                ? "bg-purple-600 text-white border-purple-700 font-semibold"
                : "bg-[var(--card)] text-[var(--muted)] hover:text-[var(--foreground)] border-[var(--border)]"
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>TTA (5-Pass)</span>
          </button>

          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            aria-label={isPlaying ? "Pause stream simulation" : "Play stream simulation"}
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
            onClick={() => setActiveFrame(0)}
            title="Reset to t=0"
            className="p-1.5 rounded-lg border border-[var(--border)] bg-[var(--card)] hover:bg-[var(--muted-bg)] text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Scenario & Architecture Mode Selectors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-4 border-b border-[var(--border)] bg-[var(--muted-bg)]/20 text-xs">
        {/* Scenario Toggle */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-mono font-medium text-[var(--muted)] flex items-center gap-1">
            <Radio className="w-3 h-3 text-emerald-500" />
            <span>Select Gesture Window:</span>
          </label>
          <div className="flex flex-wrap gap-1.5">
            {GESTURE_SCENARIOS.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => {
                  setSelectedScenarioId(s.id);
                  setActiveFrame(4);
                }}
                className={`px-2.5 py-1 rounded-lg font-mono text-[11px] transition-all border ${
                  selectedScenarioId === s.id
                    ? s.category === "BFRB"
                      ? "bg-emerald-600 text-white border-emerald-700 font-semibold shadow-xs"
                      : "bg-blue-600 text-white border-blue-700 font-semibold shadow-xs"
                    : "bg-[var(--card)] text-[var(--muted)] hover:text-[var(--foreground)] border-[var(--border)]"
                }`}
              >
                {s.name}
              </button>
            ))}
          </div>
        </div>

        {/* Architecture Mode */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-mono font-medium text-[var(--muted)] flex items-center gap-1">
            <Cpu className="w-3 h-3 text-blue-500" />
            <span>Deployment Architecture:</span>
          </label>
          <div className="flex flex-wrap gap-1.5">
            <button
              type="button"
              onClick={() => setModelMode("full")}
              className={`px-2.5 py-1 rounded-lg font-mono text-[11px] transition-all border ${
                modelMode === "full"
                  ? "bg-blue-600 text-white border-blue-700 font-semibold shadow-xs"
                  : "bg-[var(--card)] text-[var(--muted)] hover:text-[var(--foreground)] border-[var(--border)]"
              }`}
            >
              Dual-Tower Full (IMU + ToF + THM)
            </button>
            <button
              type="button"
              onClick={() => setModelMode("imu_only")}
              className={`px-2.5 py-1 rounded-lg font-mono text-[11px] transition-all border ${
                modelMode === "imu_only"
                  ? "bg-amber-600 text-white border-amber-700 font-semibold shadow-xs"
                  : "bg-[var(--card)] text-[var(--muted)] hover:text-[var(--foreground)] border-[var(--border)]"
              }`}
            >
              IMU-Only Slim Model (Fallback)
            </button>
          </div>
        </div>
      </div>

      {/* Main Multi-Modal Display: 3 Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-[var(--border)] bg-[var(--card)]">
        {/* Panel 1: IMU Kinematics (Accelerometer, Jerk, Angular Velocity) */}
        <div className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--muted)] flex items-center gap-1">
              <Activity className="w-3.5 h-3.5 text-blue-500" />
              <span>Tower 1 · 6-DoF Kinematics</span>
            </span>
            <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 font-semibold">
              Gravity Decoupled
            </span>
          </div>

          {/* Kinematic Waveform Display */}
          <div className="p-3 rounded-xl border border-[var(--border)] bg-[var(--muted-bg)]/40 font-mono text-xs space-y-2.5">
            <div>
              <div className="flex justify-between text-[10px] text-[var(--muted)] mb-1">
                <span>Linear Accel a_linear (X, Y, Z):</span>
                <span className="text-blue-600 dark:text-blue-400 font-bold">
                  {scenario.imuSignal.linearZ[activeFrame].toFixed(2)} m/s²
                </span>
              </div>
              <div className="h-10 w-full flex items-end gap-1 px-1 py-1 rounded bg-[var(--card)] border border-[var(--border)]/60">
                {scenario.imuSignal.linearZ.map((val, idx) => (
                  <div
                    key={idx}
                    className={`flex-1 rounded-t transition-all duration-200 ${
                      idx === activeFrame
                        ? "bg-blue-500"
                        : idx < activeFrame
                        ? "bg-blue-500/40"
                        : "bg-blue-500/15"
                    }`}
                    style={{ height: `${Math.min(100, Math.max(10, val * 100))}%` }}
                  />
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[10px] text-[var(--muted)] mb-1">
                <span>Instantaneous Angular Velocity (&omega;):</span>
                <span className="text-indigo-600 dark:text-indigo-400 font-bold">
                  {scenario.imuSignal.angularVel[activeFrame].toFixed(1)} rad/s
                </span>
              </div>
              <div className="h-6 w-full flex items-end gap-1 px-1 py-1 rounded bg-[var(--card)] border border-[var(--border)]/60">
                {scenario.imuSignal.angularVel.map((val, idx) => (
                  <div
                    key={idx}
                    className={`flex-1 rounded-t transition-all duration-200 ${
                      idx === activeFrame
                        ? "bg-indigo-500"
                        : "bg-indigo-500/30"
                    }`}
                    style={{ height: `${Math.min(100, (val / 4) * 100)}%` }}
                  />
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-[var(--border)]/60 flex items-center justify-between text-[10px]">
              <span className="text-[var(--muted)]">Kinematic Jerk (da/dt):</span>
              <span className="font-semibold text-[var(--foreground)]">
                {scenario.imuSignal.jerk[activeFrame].toFixed(2)} m/s³
              </span>
            </div>
          </div>

          <div className="p-2.5 rounded-lg border border-blue-500/20 bg-blue-500/5 text-xs font-mono space-y-1">
            <span className="text-[10px] text-blue-600 dark:text-blue-400 font-semibold block">
              PHYSICS TRANSFORMATION:
            </span>
            <p className="text-[11px] text-[var(--foreground)] leading-snug">
              a<sub>linear</sub> = a<sub>sensor</sub> - R<sup>-1</sup>([0, 0, 9.81])
            </p>
          </div>
        </div>

        {/* Panel 2: Optical & Thermal Proximity (ToF + Thermopile) */}
        <div className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--muted)] flex items-center gap-1">
              <Layers className="w-3.5 h-3.5 text-purple-500" />
              <span>Tower 2 · ToF &amp; Thermal</span>
            </span>
            <span
              className={`text-[9px] font-mono px-2 py-0.5 rounded-full border ${
                modelMode === "full"
                  ? "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20 font-semibold"
                  : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20 font-semibold"
              }`}
            >
              {modelMode === "full" ? "8×8 Matrix Active" : "Sensor Offline / Bypassed"}
            </span>
          </div>

          {modelMode === "full" ? (
            <div className="p-3 rounded-xl border border-[var(--border)] bg-[var(--muted-bg)]/40 font-mono text-xs space-y-2">
              <div className="flex items-center justify-between text-[10px] text-[var(--muted)]">
                <span>64-Zone Time-of-Flight Heatmap (mm):</span>
                <span className="text-purple-600 dark:text-purple-400 font-bold">
                  Min: {scenario.tofGrid[7][7]} mm
                </span>
              </div>

              {/* 8x8 Grid Display */}
              <div className="grid grid-cols-8 gap-0.5 p-1 rounded bg-[var(--card)] border border-[var(--border)]/60">
                {scenario.tofGrid.map((row, rIdx) =>
                  row.map((val, cIdx) => {
                    const norm = Math.max(0, Math.min(1, 1 - val / 500));
                    return (
                      <div
                        key={`${rIdx}-${cIdx}`}
                        className="w-full aspect-square rounded-xs transition-colors"
                        style={{
                          backgroundColor:
                            norm > 0.7
                              ? `rgba(239, 68, 68, ${norm})`
                              : norm > 0.4
                              ? `rgba(245, 158, 11, ${norm})`
                              : `rgba(99, 102, 241, ${Math.max(0.15, norm)})`,
                        }}
                        title={`${val} mm`}
                      />
                    );
                  })
                )}
              </div>

              {/* Thermal Channels */}
              <div className="pt-2 border-t border-[var(--border)]/60 space-y-1">
                <div className="flex justify-between text-[10px] text-[var(--muted)]">
                  <span>5-Ch Thermopile (Hand-Head Contact):</span>
                  <span className="font-semibold text-amber-500">
                    {scenario.thermalChannels[2]} °C
                  </span>
                </div>
                <div className="flex gap-1">
                  {scenario.thermalChannels.map((temp, idx) => (
                    <div key={idx} className="flex-1 text-center p-1 rounded bg-[var(--card)] text-[10px]">
                      {temp.toFixed(1)}°
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-6 rounded-xl border border-dashed border-amber-500/40 bg-amber-500/5 text-center font-mono space-y-2">
              <span className="text-xs font-bold text-amber-600 dark:text-amber-400 block">
                Single-Stream IMU Fallback Engaged
              </span>
              <p className="text-[11px] text-[var(--muted)] leading-relaxed">
                Optical ToF sensor array and thermopiles disabled to conserve power or recover from occlusion. The standalone IMU-Only Slim model maintains continuous inference with zero crash risk.
              </p>
            </div>
          )}

          <div className="p-2.5 rounded-lg border border-purple-500/20 bg-purple-500/5 text-xs font-mono space-y-1">
            <span className="text-[10px] text-purple-600 dark:text-purple-400 font-semibold block">
              CHANNEL ATTENTION:
            </span>
            <p className="text-[11px] text-[var(--foreground)] leading-snug">
              Squeeze-and-Excitation blocks re-weight informative spatial sectors.
            </p>
          </div>
        </div>

        {/* Panel 3: Softmax Probabilities & Classification Readout */}
        <div className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--muted)] flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Multimodal Classification Head</span>
            </span>
            <span
              className={`text-[9px] font-mono px-2 py-0.5 rounded-full border ${
                topPrediction.isTarget && scenario.category === "BFRB"
                  ? "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/30 font-bold"
                  : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 font-semibold"
              }`}
            >
              {scenario.category}
            </span>
          </div>

          {/* Probability Bars */}
          <div className="p-3 rounded-xl border border-[var(--border)] bg-[var(--muted-bg)]/40 font-mono text-xs space-y-2">
            <div className="flex justify-between text-[10px] text-[var(--muted)] mb-1">
              <span>Softmax Output Distribution:</span>
              <span className="font-bold text-[var(--foreground)]">
                {(topPrediction.prob * 100).toFixed(1)}% Confidence
              </span>
            </div>

            <div className="space-y-1.5">
              {probabilities.map((item, idx) => {
                const isSelected = item.label === topPrediction.label;
                return (
                  <div key={idx} className="space-y-0.5">
                    <div className="flex justify-between text-[10px]">
                      <span className={isSelected ? "font-bold text-[var(--foreground)]" : "text-[var(--muted)]"}>
                        {item.label}
                      </span>
                      <span className={isSelected ? "font-bold text-emerald-600 dark:text-emerald-400" : "text-[var(--muted)]"}>
                        {(item.prob * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-[var(--border)] overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${
                          isSelected
                            ? item.isTarget && scenario.category === "BFRB"
                              ? "bg-red-500"
                              : "bg-emerald-500"
                            : "bg-gray-400/40"
                        }`}
                        style={{ width: `${item.prob * 100}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* TTA Inspector if enabled */}
          {showTta ? (
            <div className="p-2.5 rounded-lg border border-purple-500/30 bg-purple-500/5 text-xs font-mono space-y-1.5">
              <span className="text-[10px] text-purple-600 dark:text-purple-400 font-semibold block">
                5-PASS TEST-TIME AUGMENTATION (TTA):
              </span>
              <div className="space-y-1 text-[10px]">
                {scenario.ttaPasses.map((p, idx) => (
                  <div key={idx} className="flex justify-between text-[var(--muted)]">
                    <span>
                      Pass {idx + 1}: {p.scale}x scale, {p.shift > 0 ? `+${p.shift}` : p.shift} roll
                    </span>
                    <span className="font-semibold text-[var(--foreground)]">
                      {(p.confidence * 100).toFixed(1)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-2.5 rounded-lg border border-[var(--border)] bg-[var(--card)] text-xs font-mono space-y-1">
              <div className="flex justify-between text-[10px] text-[var(--muted)]">
                <span>INFERENCE LATENCY:</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">&lt; 14 ms</span>
              </div>
              <p className="text-[11px] text-[var(--foreground)] leading-snug">
                Target: {scenario.clinicalTarget}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Footer Info Bar */}
      <div className="p-3 border-t border-[var(--border)] bg-[var(--muted-bg)]/20 text-xs font-mono text-[var(--muted)] flex items-center justify-between">
        <span className="truncate pr-4">
          <strong className="text-[var(--foreground)]">{scenario.name}:</strong> {scenario.description}
        </span>
        <span className="text-[10px] shrink-0 text-emerald-600 dark:text-emerald-400 font-semibold">
          CMI Sensor Benchmark
        </span>
      </div>
    </div>
  );
}

// Background SVG representation for the portfolio hero card
export function getBfrbCardSvg(): string {
  return `
    <svg viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
      <defs>
        <linearGradient id="bfrbGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#10b981" stop-opacity="0.3"/>
          <stop offset="100%" stop-color="#3b82f6" stop-opacity="0.1"/>
        </linearGradient>
      </defs>
      <!-- Kinematic sinusoidal waveform -->
      <path class="bfrb-motion-wave" d="M 20 120 Q 50 60, 80 120 T 140 120 T 200 120 T 260 120 T 320 120 T 380 120" stroke="#10b981" stroke-width="2.5" fill="none" opacity="0.6"/>
      <path class="bfrb-motion-wave" d="M 20 120 Q 50 170, 80 120 T 140 120 T 200 120 T 260 120 T 320 120 T 380 120" stroke="#3b82f6" stroke-width="1.5" stroke-dasharray="3 3" fill="none" opacity="0.5"/>
      <!-- 8x8 ToF grid dots representation -->
      <rect x="40" y="30" width="80" height="60" rx="4" fill="url(#bfrbGrad)" stroke="#10b981" stroke-width="1" stroke-opacity="0.4"/>
      <!-- Softmax output bars -->
      <rect x="280" y="35" width="80" height="8" rx="2" fill="#10b981" opacity="0.8"/>
      <rect x="280" y="50" width="30" height="8" rx="2" fill="#3b82f6" opacity="0.4"/>
      <rect x="280" y="65" width="20" height="8" rx="2" fill="#888888" opacity="0.3"/>
    </svg>
  `;
}
