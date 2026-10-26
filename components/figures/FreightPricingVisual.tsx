"use client";

import React, { useState, useEffect } from "react";
import { Play, Pause, RotateCw, MapPin, Truck, Calendar, DollarSign, Activity, AlertCircle, TrendingUp, CheckCircle2 } from "lucide-react";

interface Corridor {
  id: string;
  name: string;
  origin: string;
  destination: string;
  originCoords: { x: number; y: number; state: string };
  destCoords: { x: number; y: number; state: string };
  distanceMiles: number;
  greatCircleMiles: number;
  detourRatio: number;
  equipment: "Dry Van" | "Reefer" | "Flatbed";
  equipmentMultiplier: number;
  baseWeightLbs: number;
  marketIndex: number;
  quoteSignal: number;
  decemberCurve: number[]; // 31 daily predicted rates ($)
  phaseDescription: string;
}

const CORRIDORS: Corridor[] = [
  {
    id: "midwest-benchmark",
    name: "Midwest Industrial Corridor (Benchmark)",
    origin: "Lexington",
    destination: "Fort Wayne",
    originCoords: { x: 570, y: 220, state: "KY" },
    destCoords: { x: 560, y: 150, state: "IN" },
    distanceMiles: 360,
    greatCircleMiles: 304.8,
    detourRatio: 1.18,
    equipment: "Dry Van",
    equipmentMultiplier: 1.0,
    baseWeightLbs: 32000,
    marketIndex: 0.927,
    quoteSignal: 0.512,
    decemberCurve: [
      848, 856, 862, 850, 842, 835, 830, 854, 868, 875, 869, 860, 852, 848, 876, 895, 920, 965, 1020, 1075, 1115, 1142, 1120, 1050, 940, 920, 935, 960, 985, 1005, 990
    ],
    phaseDescription: "Standard 360-mile commercial line-haul benchmark corridor isolating date seasonality and holiday capacity crunches.",
  },
  {
    id: "transcon-reefer",
    name: "Transcontinental Produce Corridor",
    origin: "Los Angeles",
    destination: "Atlanta",
    originCoords: { x: 120, y: 240, state: "CA" },
    destCoords: { x: 630, y: 260, state: "GA" },
    distanceMiles: 2180,
    greatCircleMiles: 1935.2,
    detourRatio: 1.13,
    equipment: "Reefer",
    equipmentMultiplier: 1.25,
    baseWeightLbs: 42500,
    marketIndex: 1.042,
    quoteSignal: 0.785,
    decemberCurve: [
      5340, 5380, 5410, 5390, 5320, 5280, 5250, 5420, 5490, 5540, 5510, 5460, 5410, 5390, 5580, 5720, 5890, 6120, 6310, 6420, 6480, 6450, 6210, 5850, 5600, 5520, 5590, 5680, 5750, 5820, 5790
    ],
    phaseDescription: "Cross-country temperature-controlled headhaul commanding premium refrigeration margins and strict transit timetables.",
  },
  {
    id: "gulf-flatbed",
    name: "Gulf-to-Lakes Heavy-Haul Corridor",
    origin: "Houston",
    destination: "Chicago",
    originCoords: { x: 440, y: 340, state: "TX" },
    destCoords: { x: 530, y: 140, state: "IL" },
    distanceMiles: 1080,
    greatCircleMiles: 940.5,
    detourRatio: 1.15,
    equipment: "Flatbed",
    equipmentMultiplier: 1.17,
    baseWeightLbs: 44800,
    marketIndex: 0.985,
    quoteSignal: 0.62,
    decemberCurve: [
      2490, 2515, 2530, 2510, 2480, 2460, 2450, 2520, 2560, 2580, 2565, 2535, 2505, 2495, 2580, 2640, 2710, 2795, 2855, 2890, 2910, 2895, 2780, 2620, 2540, 2510, 2535, 2570, 2610, 2635, 2620
    ],
    phaseDescription: "Industrial manufacturing freight with heavy tonnage density, specialized securement tarping, and steady weekly rhythms.",
  },
  {
    id: "northeast-metro",
    name: "Northeast Megalopolis Congestion Corridor",
    origin: "Philadelphia",
    destination: "Boston",
    originCoords: { x: 710, y: 155, state: "PA" },
    destCoords: { x: 760, y: 125, state: "MA" },
    distanceMiles: 310,
    greatCircleMiles: 268.0,
    detourRatio: 1.16,
    equipment: "Dry Van",
    equipmentMultiplier: 1.0,
    baseWeightLbs: 26000,
    marketIndex: 0.89,
    quoteSignal: 0.44,
    decemberCurve: [
      1020, 1035, 1045, 1030, 1015, 1005, 995, 1030, 1050, 1065, 1055, 1040, 1025, 1018, 1060, 1090, 1130, 1180, 1225, 1260, 1280, 1275, 1210, 1120, 1060, 1045, 1060, 1085, 1110, 1125, 1115
    ],
    phaseDescription: "Dense urban transit route with high turnpike tolls, driver bridge delays, and elevated short-haul rate-per-mile floors.",
  },
];

const VALIDATION_FOLDS = [
  { fold: "2025-07", trainEnd: "2025-06-30", nTest: "4,800", mae: 195.57, rmse: 672.13, r2: 0.800, medAe: 66.09 },
  { fold: "2025-08", trainEnd: "2025-07-31", nTest: "4,800", mae: 178.26, rmse: 640.91, r2: 0.811, medAe: 66.23 },
  { fold: "2025-09", trainEnd: "2025-08-31", nTest: "4,800", mae: 124.97, rmse: 616.31, r2: 0.836, medAe: 49.21 },
  { fold: "2025-10", trainEnd: "2025-09-30", nTest: "4,800", mae: 148.93, rmse: 655.79, r2: 0.816, medAe: 54.75 },
];

export function FreightPricingVisual() {
  const [selectedCorridorId, setSelectedCorridorId] = useState<string>("midwest-benchmark");
  const [dayIndex, setDayIndex] = useState<number>(17); // Dec 18 (holiday surge peak)
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  const activeCorridor = CORRIDORS.find((c) => c.id === selectedCorridorId) || CORRIDORS[0];

  // Auto-play day scrubber
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setDayIndex((prev) => (prev >= 30 ? 0 : prev + 1));
    }, 750);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const currentRate = activeCorridor.decemberCurve[dayIndex];
  const ratePerMile = (currentRate / activeCorridor.distanceMiles).toFixed(2);
  const activeDay = dayIndex + 1;

  // Day label and period
  const dayOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][(dayIndex + 0) % 7]; // Dec 1, 2025 is Monday
  const isWeekend = dayOfWeek === "Sat" || dayOfWeek === "Sun";
  const isHolidayPeak = activeDay >= 18 && activeDay <= 23;
  const isHolidayPost = activeDay >= 24 && activeDay <= 26;

  // Holiday regime badge text
  const regimeBadge = isHolidayPeak
    ? "Pre-Holiday Peak Crunch"
    : isHolidayPost
    ? "Christmas Lull & Standstill"
    : activeDay > 26
    ? "Year-End Inventory Clearing"
    : isWeekend
    ? "Weekend Capacity Discount"
    : "Midweek Balanced Dispatch";

  return (
    <div className="w-full space-y-6">
      {/* Control Ribbon */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl border border-[var(--border)] bg-[var(--card)] shadow-xs">
        {/* Corridor Selectors */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-0.5 max-w-full">
          {CORRIDORS.map((c) => {
            const isSelected = c.id === activeCorridor.id;
            return (
              <button
                key={c.id}
                onClick={() => setSelectedCorridorId(c.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all shrink-0 flex items-center gap-1.5 ${
                  isSelected
                    ? "bg-emerald-500 text-white shadow-xs font-bold"
                    : "bg-[var(--surface-muted)] text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface)]"
                }`}
              >
                <Truck className="w-3.5 h-3.5" />
                <span>{c.origin} → {c.destination}</span>
              </button>
            );
          })}
        </div>

        {/* Playback Controls & Date Badge */}
        <div className="flex items-center gap-2 font-mono text-xs ml-auto">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--surface-muted)] text-[var(--foreground)] transition-colors flex items-center gap-1"
            title={isPlaying ? "Pause automated timeline" : "Play automated timeline"}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5 text-amber-500" /> : <Play className="w-3.5 h-3.5 text-emerald-500" />}
            <span className="text-[11px]">{isPlaying ? "Pause" : "Play"}</span>
          </button>
          <button
            onClick={() => { setDayIndex(0); setIsPlaying(false); }}
            className="p-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--surface-muted)] text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
            title="Reset to Dec 01"
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>
          <div className="px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-bold text-[11px] flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>Dec {activeDay < 10 ? `0${activeDay}` : activeDay}, 2025 ({dayOfWeek})</span>
          </div>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: Diagnostic Probes, Target Skew & Walk-Forward Validation */}
        <div className="lg:col-span-6 space-y-4">
          {/* Diagnostic Key Numbers */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono">
            <div className="p-2.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] flex flex-col justify-between">
              <span className="text-[10px] text-[var(--muted)] uppercase tracking-wider">Anomalies Imputed</span>
              <span className="text-sm font-bold text-amber-500 mt-0.5">888 Loads</span>
              <span className="text-[9px] text-[var(--muted)]">292 neg wgt + 374 idx</span>
            </div>
            <div className="p-2.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] flex flex-col justify-between">
              <span className="text-[10px] text-[var(--muted)] uppercase tracking-wider">Target Skewness</span>
              <span className="text-sm font-bold text-[var(--foreground)] mt-0.5">+2.84 Skew</span>
              <span className="text-[9px] text-[var(--muted)]">Max $25,533 (mean $2,374)</span>
            </div>
            <div className="p-2.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] flex flex-col justify-between">
              <span className="text-[10px] text-[var(--muted)] uppercase tracking-wider">Equipment Spread</span>
              <span className="text-sm font-bold text-blue-500 mt-0.5">+25% Reefer</span>
              <span className="text-[9px] text-[var(--muted)]">Flatbed +17% vs Dry Van</span>
            </div>
            <div className="p-2.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] flex flex-col justify-between">
              <span className="text-[10px] text-[var(--muted)] uppercase tracking-wider">Capacity Shift</span>
              <span className="text-sm font-bold text-emerald-500 mt-0.5">1.08 → 0.93</span>
              <span className="text-[9px] text-[var(--muted)]">Q4 carrier loosening</span>
            </div>
          </div>

          {/* Rate vs Distance Non-Linearity Chart */}
          <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] space-y-2 font-sans">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="font-semibold text-[var(--foreground)] flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                Rate vs. Distance Non-Linearity &amp; Short-Haul Tariff Floors
              </span>
              <span className="text-[10px] text-[var(--muted)]">Pearson r = 0.909</span>
            </div>
            <p className="text-[11px] text-[var(--muted)] leading-relaxed font-sans">
              While linear distance dominates line-hauls, tree-based gradient boosting captures essential non-linear boundaries: a fixed driver detention/loading floor ($600–$800) for hauls &lt; 250 miles and declining marginal rates beyond 1,500 miles.
            </p>

            {/* SVG Non-Linearity Curve */}
            <div className="w-full h-36 bg-[var(--card)] rounded-lg border border-[var(--border)] p-2">
              <svg viewBox="0 0 460 120" className="w-full h-full">
                {/* Grid Lines */}
                <line x1="40" y1="20" x2="450" y2="20" stroke="var(--border)" strokeDasharray="3 3" opacity="0.4" />
                <line x1="40" y1="50" x2="450" y2="50" stroke="var(--border)" strokeDasharray="3 3" opacity="0.4" />
                <line x1="40" y1="80" x2="450" y2="80" stroke="var(--border)" strokeDasharray="3 3" opacity="0.4" />
                <line x1="40" y1="100" x2="450" y2="100" stroke="var(--border)" opacity="0.7" />
                <line x1="40" y1="10" x2="40" y2="100" stroke="var(--border)" opacity="0.7" />

                {/* Axis Labels */}
                <text x="35" y="24" fill="var(--muted)" fontSize="8" textAnchor="end" fontFamily="monospace">$5k</text>
                <text x="35" y="54" fill="var(--muted)" fontSize="8" textAnchor="end" fontFamily="monospace">$3k</text>
                <text x="35" y="84" fill="var(--muted)" fontSize="8" textAnchor="end" fontFamily="monospace">$1.5k</text>
                <text x="35" y="102" fill="var(--muted)" fontSize="8" textAnchor="end" fontFamily="monospace">$0</text>
                <text x="45" y="112" fill="var(--muted)" fontSize="8" textAnchor="start" fontFamily="monospace">0 mi</text>
                <text x="180" y="112" fill="var(--muted)" fontSize="8" textAnchor="middle" fontFamily="monospace">1,000 mi</text>
                <text x="320" y="112" fill="var(--muted)" fontSize="8" textAnchor="middle" fontFamily="monospace">2,000 mi</text>
                <text x="440" y="112" fill="var(--muted)" fontSize="8" textAnchor="end" fontFamily="monospace">2,500 mi</text>

                {/* Sample Scatter Points */}
                <circle cx="55" cy="88" r="2" fill="#3b82f6" opacity="0.4" />
                <circle cx="68" cy="85" r="2" fill="#3b82f6" opacity="0.5" />
                <circle cx="95" cy="80" r="2" fill="#3b82f6" opacity="0.4" />
                <circle cx="120" cy="74" r="2" fill="#3b82f6" opacity="0.4" />
                <circle cx="160" cy="65" r="2" fill="#3b82f6" opacity="0.5" />
                <circle cx="210" cy="56" r="2" fill="#3b82f6" opacity="0.4" />
                <circle cx="260" cy="48" r="2" fill="#3b82f6" opacity="0.4" />
                <circle cx="310" cy="40" r="2" fill="#3b82f6" opacity="0.5" />
                <circle cx="370" cy="32" r="2" fill="#3b82f6" opacity="0.4" />
                <circle cx="420" cy="25" r="2" fill="#3b82f6" opacity="0.5" />

                {/* High Outliers (Tail) */}
                <circle cx="280" cy="22" r="2.5" fill="#f59e0b" opacity="0.6" />
                <circle cx="390" cy="14" r="2.5" fill="#f59e0b" opacity="0.6" />

                {/* OLS Linear Regression Fit (Dashed Gray) */}
                <line x1="40" y1="98" x2="445" y2="28" stroke="#94a3b8" strokeDasharray="4 4" strokeWidth="1.5" />
                <text x="380" y="24" fill="#94a3b8" fontSize="7.5" fontFamily="monospace">OLS Linear</text>

                {/* Non-Linear Gradient Boosted Fit (Green Curved) */}
                <path
                  d="M 40 92 Q 65 86, 100 81 T 200 62 T 320 41 T 445 28"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="2.5"
                />

                {/* Short-haul floor bracket */}
                <rect x="42" y="80" width="38" height="18" fill="#10b981" fillOpacity="0.1" rx="2" />
                <text x="44" y="78" fill="#10b981" fontSize="7" fontWeight="bold" fontFamily="monospace">Short-haul Floor</text>

                {/* Active Corridor Point */}
                {(() => {
                  const plotX = 40 + (activeCorridor.distanceMiles / 2500) * 405;
                  const plotY = Math.max(16, 100 - (currentRate / 7000) * 85);
                  return (
                    <g>
                      <circle cx={plotX} cy={plotY} r="5" fill="#10b981" stroke="#ffffff" strokeWidth="2" className="animate-pulse" />
                      <text x={plotX + 8} y={plotY + 3} fill="var(--foreground)" fontSize="8.5" fontWeight="bold" fontFamily="monospace">
                        ${currentRate.toLocaleString()}
                      </text>
                    </g>
                  );
                })()}
              </svg>
            </div>
          </div>

          {/* Walk-Forward Monthly Cross-Validation Table */}
          <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] space-y-2.5 font-sans">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="font-semibold text-[var(--foreground)] flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                Strict Walk-Forward Monthly Cross-Validation (Zero Lookahead Leakage)
              </span>
              <span className="px-1.5 py-0.5 rounded text-[9px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold">
                Avg MedAE: $59.07
              </span>
            </div>
            <p className="text-[11px] text-[var(--muted)] leading-relaxed font-sans">
              Unlike standard random K-fold splits which allow future macro conditions to leak into past predictions, each monthly fold trains exclusively on preceding timestamps.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono border-collapse">
                <thead>
                  <tr className="border-b border-[var(--border)] text-[var(--muted)] text-[10px] uppercase">
                    <th className="py-1.5 px-2">Test Fold</th>
                    <th className="py-1.5 px-2">Training Through</th>
                    <th className="py-1.5 px-2 text-right">Holdout Loads</th>
                    <th className="py-1.5 px-2 text-right">MAE</th>
                    <th className="py-1.5 px-2 text-right">RMSE</th>
                    <th className="py-1.5 px-2 text-right">R²</th>
                    <th className="py-1.5 px-2 text-right text-emerald-600 dark:text-emerald-400 font-bold">MedAE</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)] text-[11px]">
                  {VALIDATION_FOLDS.map((row) => (
                    <tr key={row.fold} className="hover:bg-[var(--card)] transition-colors">
                      <td className="py-1.5 px-2 font-semibold text-[var(--foreground)]">{row.fold}</td>
                      <td className="py-1.5 px-2 text-[var(--muted)]">{row.trainEnd}</td>
                      <td className="py-1.5 px-2 text-right">{row.nTest}</td>
                      <td className="py-1.5 px-2 text-right font-medium">${row.mae.toFixed(2)}</td>
                      <td className="py-1.5 px-2 text-right text-[var(--muted)]">${row.rmse.toFixed(2)}</td>
                      <td className="py-1.5 px-2 text-right text-blue-500 font-semibold">{row.r2.toFixed(3)}</td>
                      <td className="py-1.5 px-2 text-right font-bold text-emerald-600 dark:text-emerald-400">${row.medAe.toFixed(2)}</td>
                    </tr>
                  ))}
                  <tr className="bg-[var(--card)] font-bold text-[11px] border-t-2 border-[var(--border)]">
                    <td className="py-2 px-2" colSpan={3}>Mean Model Performance</td>
                    <td className="py-2 px-2 text-right text-emerald-600 dark:text-emerald-400">$161.93</td>
                    <td className="py-2 px-2 text-right text-[var(--muted)]">$646.29</td>
                    <td className="py-2 px-2 text-right text-blue-500">0.816</td>
                    <td className="py-2 px-2 text-right text-emerald-600 dark:text-emerald-400">$59.07</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between text-[10px] font-mono text-[var(--muted)] pt-1">
              <span>Benchmark comparison: Distance-Only Linear MAE: <strong>$193.69</strong> (Tree model delivers <strong>-16.4% error reduction</strong>)</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Active Corridor Schematic, Geospatial Map & December Daily Forecast */}
        <div className="lg:col-span-6 space-y-4">
          {/* Active Lane Quoting HUD */}
          <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] space-y-3 font-mono">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--border)] pb-2.5">
              <div>
                <span className="text-[10px] text-[var(--muted)] uppercase tracking-wider block">Target Spot Freight Corridor</span>
                <span className="text-sm font-bold text-[var(--foreground)]">
                  {activeCorridor.origin}, {activeCorridor.originCoords.state} → {activeCorridor.destination}, {activeCorridor.destCoords.state}
                </span>
              </div>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                isHolidayPeak
                  ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30"
                  : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
              }`}>
                {regimeBadge}
              </span>
            </div>

            {/* Price Banner */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <span className="text-[10px] text-[var(--muted)] uppercase">Predicted Rate</span>
                <div className="text-xl sm:text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-0.5">
                  ${currentRate.toLocaleString()}
                </div>
                <span className="text-[9px] text-[var(--muted)]">95% CI: ±${(59.07 * 1.48).toFixed(0)}</span>
              </div>
              <div>
                <span className="text-[10px] text-[var(--muted)] uppercase">Rate Per Mile</span>
                <div className="text-xl sm:text-2xl font-extrabold text-[var(--foreground)] mt-0.5">
                  ${ratePerMile}
                </div>
                <span className="text-[9px] text-[var(--muted)]">{activeCorridor.equipment} Tariff</span>
              </div>
              <div>
                <span className="text-[10px] text-[var(--muted)] uppercase">Highway Distance</span>
                <div className="text-sm font-bold text-[var(--foreground)] mt-1">
                  {activeCorridor.distanceMiles.toLocaleString()} mi
                </div>
                <span className="text-[9px] text-emerald-600 dark:text-emerald-400">Detour: {activeCorridor.detourRatio}× Haversine</span>
              </div>
              <div>
                <span className="text-[10px] text-[var(--muted)] uppercase">Payload Weight</span>
                <div className="text-sm font-bold text-[var(--foreground)] mt-1">
                  {activeCorridor.baseWeightLbs.toLocaleString()} lbs
                </div>
                <span className="text-[9px] text-blue-500">Market Index: {activeCorridor.marketIndex}</span>
              </div>
            </div>
          </div>

          {/* Geospatial Corridor Arc Schematic (SVG) */}
          <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] space-y-2 font-sans">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="font-semibold text-[var(--foreground)] flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                Geodesic Routing &amp; Haversine Great-Circle Detour Ratio
              </span>
              <span className="text-[10px] font-mono text-[var(--muted)]">
                d_gc = {activeCorridor.greatCircleMiles.toFixed(1)} mi
              </span>
            </div>

            <div className="w-full h-44 bg-[var(--card)] rounded-lg border border-[var(--border)] overflow-hidden relative">
              <svg viewBox="0 0 820 400" className="w-full h-full">
                {/* Simplified US Continental Outline */}
                <path
                  d="M 60 100 L 160 80 L 260 90 L 380 70 L 520 60 L 660 80 L 760 100 L 780 160 L 750 240 L 720 320 L 640 360 L 500 370 L 440 380 L 340 360 L 220 340 L 100 300 L 50 200 Z"
                  fill="none"
                  stroke="var(--border)"
                  strokeWidth="1.5"
                  opacity="0.3"
                />

                {/* Subdued US Grid */}
                <line x1="200" y1="50" x2="200" y2="350" stroke="var(--border)" strokeDasharray="3 3" opacity="0.2" />
                <line x1="400" y1="50" x2="400" y2="350" stroke="var(--border)" strokeDasharray="3 3" opacity="0.2" />
                <line x1="600" y1="50" x2="600" y2="350" stroke="var(--border)" strokeDasharray="3 3" opacity="0.2" />
                <line x1="50" y1="180" x2="780" y2="180" stroke="var(--border)" strokeDasharray="3 3" opacity="0.2" />
                <line x1="50" y1="280" x2="780" y2="280" stroke="var(--border)" strokeDasharray="3 3" opacity="0.2" />

                {/* Straight Line Haversine (Air-Line) Vector */}
                <line
                  x1={activeCorridor.originCoords.x}
                  y1={activeCorridor.originCoords.y}
                  x2={activeCorridor.destCoords.x}
                  y2={activeCorridor.destCoords.y}
                  stroke="#94a3b8"
                  strokeDasharray="4 4"
                  strokeWidth="1.5"
                  opacity="0.6"
                />

                {/* Highway Route Arc (Curved Detour Path) */}
                {(() => {
                  const ox = activeCorridor.originCoords.x;
                  const oy = activeCorridor.originCoords.y;
                  const dx = activeCorridor.destCoords.x;
                  const dy = activeCorridor.destCoords.y;
                  const mx = (ox + dx) / 2;
                  const my = (oy + dy) / 2 - 40; // Arc upwards
                  return (
                    <g>
                      <path
                        d={`M ${ox} ${oy} Q ${mx} ${my} ${dx} ${dy}`}
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                      {/* Animated Pulse along the path */}
                      <circle cx={mx} cy={my + 10} r="4" fill="#34d399" className="animate-ping" />
                    </g>
                  );
                })()}

                {/* Origin Node */}
                <circle cx={activeCorridor.originCoords.x} cy={activeCorridor.originCoords.y} r="7" fill="#3b82f6" stroke="#ffffff" strokeWidth="2" />
                <text x={activeCorridor.originCoords.x} y={activeCorridor.originCoords.y + 22} fill="var(--foreground)" fontSize="11" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                  {activeCorridor.origin}, {activeCorridor.originCoords.state} (Origin)
                </text>

                {/* Destination Node */}
                <circle cx={activeCorridor.destCoords.x} cy={activeCorridor.destCoords.y} r="7" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
                <text x={activeCorridor.destCoords.x} y={activeCorridor.destCoords.y + 22} fill="var(--foreground)" fontSize="11" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                  {activeCorridor.destination}, {activeCorridor.destCoords.state} (Destination)
                </text>

                {/* Route Metrics Tag Overlay */}
                <rect x="25" y="25" width="260" height="48" rx="6" fill="var(--card)" fillOpacity="0.85" stroke="var(--border)" strokeWidth="1" />
                <text x="35" y="44" fill="var(--foreground)" fontSize="10.5" fontWeight="bold" fontFamily="monospace">
                  OTR Highway: {activeCorridor.distanceMiles} mi
                </text>
                <text x="35" y="60" fill="var(--muted)" fontSize="9.5" fontFamily="monospace">
                  Haversine: {activeCorridor.greatCircleMiles} mi | Detour: {activeCorridor.detourRatio}×
                </text>
              </svg>
            </div>
          </div>

          {/* December Daily Rate Forecast Curve (SVG + Date Scrubber) */}
          <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] space-y-2.5 font-sans">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="font-semibold text-[var(--foreground)] flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-emerald-500" />
                December 2025 Daily Spot Rate Trajectory (Out-of-Time Test Set)
              </span>
              <span className="text-[10px] text-amber-500 font-bold">
                Holiday Surge: +34.6%
              </span>
            </div>

            {/* SVG 31-Day Time Series Chart */}
            <div className="w-full h-36 bg-[var(--card)] rounded-lg border border-[var(--border)] p-2">
              <svg viewBox="0 0 500 120" className="w-full h-full">
                {/* Horizontal Guide Lines */}
                <line x1="30" y1="20" x2="490" y2="20" stroke="var(--border)" strokeDasharray="3 3" opacity="0.4" />
                <line x1="30" y1="60" x2="490" y2="60" stroke="var(--border)" strokeDasharray="3 3" opacity="0.4" />
                <line x1="30" y1="100" x2="490" y2="100" stroke="var(--border)" opacity="0.7" />

                {/* Pre-Holiday Surge Band (Dec 18 - Dec 23) */}
                {(() => {
                  const x1 = 30 + (17 / 30) * 450;
                  const x2 = 30 + (22 / 30) * 450;
                  return (
                    <g>
                      <rect x={x1} y="15" width={x2 - x1} height="85" fill="#f59e0b" fillOpacity="0.12" />
                      <text x={(x1 + x2) / 2} y="12" fill="#f59e0b" fontSize="7" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                        CRUNCH PEAK
                      </text>
                    </g>
                  );
                })()}

                {/* Curve Area Fill & Path */}
                {(() => {
                  const curve = activeCorridor.decemberCurve;
                  const minRate = Math.min(...curve) * 0.95;
                  const maxRate = Math.max(...curve) * 1.05;
                  const range = maxRate - minRate;

                  const points = curve.map((rate, i) => {
                    const x = 30 + (i / 30) * 450;
                    const y = 100 - ((rate - minRate) / range) * 80;
                    return { x, y, rate };
                  });

                  const dPath = points.reduce((acc, p, i) => `${acc} ${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`, "");
                  const areaPath = `${dPath} L ${points[points.length - 1].x} 100 L 30 100 Z`;

                  const activePoint = points[dayIndex];

                  return (
                    <g>
                      {/* Gradient Fill */}
                      <path d={areaPath} fill="#10b981" fillOpacity="0.12" />
                      {/* Trajectory Stroke */}
                      <path d={dPath} fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

                      {/* Daily Markers */}
                      {points.map((p, i) => (
                        <circle
                          key={i}
                          cx={p.x}
                          cy={p.y}
                          r={i === dayIndex ? 5 : 2}
                          fill={i === dayIndex ? "#10b981" : "var(--muted)"}
                          stroke="#ffffff"
                          strokeWidth={i === dayIndex ? 2 : 0.5}
                          className={i === dayIndex ? "animate-pulse" : ""}
                        />
                      ))}

                      {/* Vertical Scrubber Line for Active Day */}
                      <line x1={activePoint.x} y1="15" x2={activePoint.x} y2="100" stroke="#10b981" strokeDasharray="2 2" strokeWidth="1.5" />

                      {/* Active Rate Floating Tooltip */}
                      <g transform={`translate(${Math.min(activePoint.x - 30, 420)}, ${Math.max(activePoint.y - 18, 18)})`}>
                        <rect x="0" y="0" width="60" height="16" rx="3" fill="#10b981" />
                        <text x="30" y="11" fill="#ffffff" fontSize="8.5" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                          ${activePoint.rate.toLocaleString()}
                        </text>
                      </g>
                    </g>
                  );
                })()}

                {/* X Axis Day Labels */}
                <text x="30" y="112" fill="var(--muted)" fontSize="8" textAnchor="middle" fontFamily="monospace">Dec 1</text>
                <text x="142" y="112" fill="var(--muted)" fontSize="8" textAnchor="middle" fontFamily="monospace">Dec 8</text>
                <text x="255" y="112" fill="var(--muted)" fontSize="8" textAnchor="middle" fontFamily="monospace">Dec 15</text>
                <text x="367" y="112" fill="var(--muted)" fontSize="8" textAnchor="middle" fontFamily="monospace">Dec 22</text>
                <text x="480" y="112" fill="var(--muted)" fontSize="8" textAnchor="middle" fontFamily="monospace">Dec 31</text>
              </svg>
            </div>

            {/* Interactive Day Scrubber Slider */}
            <div className="space-y-1 pt-1">
              <div className="flex items-center justify-between text-[11px] font-mono text-[var(--muted)]">
                <span>Timeline Scrubber (Dec 01 – Dec 31)</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                  Day {activeDay} of 31 (${currentRate.toLocaleString()})
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="30"
                value={dayIndex}
                onChange={(e) => {
                  setDayIndex(parseInt(e.target.value));
                  setIsPlaying(false);
                }}
                className="w-full accent-emerald-500 cursor-pointer h-1.5 bg-[var(--card)] rounded-lg appearance-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Clean SVG export for InfiniteGridHero project cards
 */
export function getFreightPricingCardSvg(): string {
  return `
    <svg viewBox="0 0 320 200" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="freight-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#10b981" stop-opacity="0.25" />
          <stop offset="100%" stop-color="#3b82f6" stop-opacity="0.05" />
        </linearGradient>
      </defs>
      <!-- Subdued US Transit Grid -->
      <line x1="40" y1="40" x2="280" y2="40" stroke="#10b981" stroke-opacity="0.15" stroke-dasharray="4 4" />
      <line x1="40" y1="90" x2="280" y2="90" stroke="#10b981" stroke-opacity="0.15" stroke-dasharray="4 4" />
      <line x1="40" y1="140" x2="280" y2="140" stroke="#10b981" stroke-opacity="0.15" stroke-dasharray="4 4" />
      <line x1="100" y1="20" x2="100" y2="160" stroke="#10b981" stroke-opacity="0.1" stroke-dasharray="4 4" />
      <line x1="220" y1="20" x2="220" y2="160" stroke="#10b981" stroke-opacity="0.1" stroke-dasharray="4 4" />

      <!-- Corridor Routing Arc -->
      <path class="freight-route-line" d="M 60 130 Q 150 50 250 85" fill="none" stroke="#10b981" stroke-width="2.5" stroke-linecap="round" />
      <path d="M 60 130 Q 150 50 250 85 L 250 160 L 60 160 Z" fill="url(#freight-grad)" />

      <!-- Origin and Destination Nodes -->
      <circle cx="60" cy="130" r="5" fill="#3b82f6" stroke="#ffffff" stroke-width="1.5" />
      <circle cx="250" cy="85" r="5" fill="#10b981" stroke="#ffffff" stroke-width="1.5" />

      <!-- Detour Curvature Tag -->
      <rect x="120" y="45" width="80" height="20" rx="4" fill="#064e3b" fill-opacity="0.8" stroke="#10b981" stroke-width="1" />
      <text x="160" y="59" fill="#34d399" font-size="9" font-family="monospace" font-weight="bold" text-anchor="middle">
        1.18x Detour
      </text>

      <!-- Holiday Surge Wave -->
      <path d="M 50 165 C 100 165, 140 162, 180 155 S 240 135, 270 148" fill="none" stroke="#f59e0b" stroke-width="1.8" stroke-dasharray="2 2" />
    </svg>
  `;
}
