"use client";

import React from "react";

export function FreightPricingProcessDiagram() {
  return (
    <div className="w-full my-6 rounded-[14px] border border-[var(--border)] bg-[var(--card)] p-4 sm:p-6 shadow-sm overflow-hidden select-none font-sans">
      {/* Diagram Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b border-[var(--border)]">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--foreground)]">
            Analytical Pipeline: Telemetry Hygiene, Geodesic Kinematics &amp; Walk-Forward Boosting
          </span>
        </div>
        <span className="text-[10px] font-mono text-[var(--muted)]">
          From Raw Corrupted Telemetry to Calibrated Rate Intelligence
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
              id="freight-arrow-emerald"
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
              id="freight-arrow-blue"
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
              id="freight-arrow-amber"
              viewBox="0 0 10 10"
              refX="6"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#f59e0b" />
            </marker>

            {/* Gradients */}
            <linearGradient id="tier1-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.02" />
            </linearGradient>
            <linearGradient id="tier2-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.02" />
            </linearGradient>
            <linearGradient id="tier3-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.02" />
            </linearGradient>
            <linearGradient id="tier4-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.02" />
            </linearGradient>
          </defs>

          {/* Background Grid */}
          <rect width="940" height="480" fill="transparent" />

          {/* ================================================================= */}
          {/* TIER 1: Telemetry Ingestion & Quality Hygiene */}
          {/* ================================================================= */}
          <g transform="translate(20, 20)">
            <rect
              width="200"
              height="390"
              rx="12"
              fill="url(#tier1-grad)"
              stroke="#3b82f6"
              strokeWidth="1.2"
              strokeDasharray="4 2"
            />
            {/* Tier Header */}
            <rect x="0" y="0" width="200" height="28" rx="12" fill="#3b82f6" fillOpacity="0.12" />
            <text x="12" y="18" fill="#3b82f6" fontSize="10.5" fontWeight="bold" fontFamily="monospace">
              TIER 1: TELEMETRY HYGIENE
            </text>

            {/* Block 1: Raw Load Ingestion */}
            <g transform="translate(12, 38)">
              <rect width="176" height="78" rx="8" fill="var(--card)" stroke="var(--border)" strokeWidth="1" />
              <text x="10" y="16" fill="var(--foreground)" fontSize="9.5" fontWeight="bold" fontFamily="monospace">
                60k Shipments Stream
              </text>
              <text x="10" y="32" fill="var(--muted)" fontSize="8.5" fontFamily="sans-serif">
                • 48k Train: 2025-01 → 10
              </text>
              <text x="10" y="46" fill="var(--muted)" fontSize="8.5" fontFamily="sans-serif">
                • 12k Val: 2025-11 → 12
              </text>
              <text x="10" y="60" fill="var(--muted)" fontSize="8.5" fontFamily="sans-serif">
                • 31 Benchmark: Fixed Dec
              </text>
              <text x="10" y="72" fill="#3b82f6" fontSize="8" fontFamily="monospace">
                load_id dropped (no memorization)
              </text>
            </g>

            {/* Block 2: Anomaly Interception */}
            <g transform="translate(12, 126)">
              <rect width="176" height="110" rx="8" fill="var(--card)" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3 2" />
              <text x="10" y="16" fill="#f59e0b" fontSize="9.5" fontWeight="bold" fontFamily="monospace">
                Sensor Anomaly Trap (888)
              </text>
              <text x="10" y="32" fill="var(--muted)" fontSize="8" fontFamily="sans-serif">
                • Negative Weight: 292 trn, 145 val
              </text>
              <text x="10" y="46" fill="var(--muted)" fontSize="8" fontFamily="sans-serif">
                • Missing Weight: 300 trn, 165 val
              </text>
              <text x="10" y="60" fill="var(--muted)" fontSize="8" fontFamily="sans-serif">
                • Missing Mkt Index: 374 trn, 249 val
              </text>
              <rect x="10" y="68" width="156" height="34" rx="4" fill="#f59e0b" fillOpacity="0.1" />
              <text x="14" y="82" fill="#f59e0b" fontSize="7.5" fontWeight="bold" fontFamily="monospace">
                weight &lt; 0 → weight_invalid = 1
              </text>
              <text x="14" y="94" fill="#f59e0b" fontSize="7.5" fontWeight="bold" fontFamily="monospace">
                weight.isna → weight_missing = 1
              </text>
            </g>

            {/* Block 3: Median Imputation */}
            <g transform="translate(12, 246)">
              <rect width="176" height="80" rx="8" fill="var(--card)" stroke="var(--border)" strokeWidth="1" />
              <text x="10" y="16" fill="var(--foreground)" fontSize="9.5" fontWeight="bold" fontFamily="monospace">
                Imputation Guardrails
              </text>
              <text x="10" y="32" fill="var(--muted)" fontSize="8" fontFamily="sans-serif">
                • Negative values converted to NaN
              </text>
              <text x="10" y="46" fill="var(--muted)" fontSize="8" fontFamily="sans-serif">
                • SimpleImputer(strategy=&quot;median&quot;)
              </text>
              <text x="10" y="60" fill="var(--muted)" fontSize="8" fontFamily="sans-serif">
                • add_indicator=True enabled
              </text>
              <text x="10" y="72" fill="#10b981" fontSize="8" fontFamily="monospace">
                Zero instances discarded
              </text>
            </g>

            <rect x="12" y="336" width="176" height="42" rx="6" fill="#3b82f6" fillOpacity="0.1" stroke="#3b82f6" strokeWidth="0.8" />
            <text x="20" y="352" fill="#3b82f6" fontSize="8.5" fontWeight="bold" fontFamily="monospace">
              Population Integrity
            </text>
            <text x="20" y="366" fill="var(--foreground)" fontSize="8" fontFamily="sans-serif">
              Preserves 100% of sample variance
            </text>
          </g>

          {/* Connection Arrow 1 -> 2 */}
          <path
            d="M 220 215 L 254 215"
            fill="none"
            stroke="#3b82f6"
            strokeWidth="2"
            markerEnd="url(#freight-arrow-blue)"
          />

          {/* ================================================================= */}
          {/* TIER 2: Geodesic Spatial Kinematics & Calendar Harmonics */}
          {/* ================================================================= */}
          <g transform="translate(260, 20)">
            <rect
              width="210"
              height="390"
              rx="12"
              fill="url(#tier2-grad)"
              stroke="#8b5cf6"
              strokeWidth="1.2"
              strokeDasharray="4 2"
            />
            {/* Tier Header */}
            <rect x="0" y="0" width="210" height="28" rx="12" fill="#8b5cf6" fillOpacity="0.12" />
            <text x="12" y="18" fill="#8b5cf6" fontSize="10.5" fontWeight="bold" fontFamily="monospace">
              TIER 2: KINEMATICS &amp; HARMONICS
            </text>

            {/* Block 1: Spherical Haversine Routing */}
            <g transform="translate(12, 38)">
              <rect width="186" height="96" rx="8" fill="var(--card)" stroke="var(--border)" strokeWidth="1" />
              <text x="10" y="16" fill="var(--foreground)" fontSize="9.5" fontWeight="bold" fontFamily="monospace">
                Haversine Spherical Metric
              </text>
              <rect x="10" y="24" width="166" height="26" rx="4" fill="#8b5cf6" fillOpacity="0.1" />
              <text x="14" y="40" fill="#8b5cf6" fontSize="8" fontWeight="bold" fontFamily="monospace">
                d_gc = 2R · arcsin(√haversine_a)
              </text>
              <text x="10" y="62" fill="var(--muted)" fontSize="8" fontFamily="sans-serif">
                • Earth Radius R = 3,958.8 miles
              </text>
              <text x="10" y="75" fill="var(--muted)" fontSize="8" fontFamily="sans-serif">
                • Δlat = deliv_lat - pick_lat
              </text>
              <text x="10" y="88" fill="var(--muted)" fontSize="8" fontFamily="sans-serif">
                • Δlon = deliv_lon - pick_lon
              </text>
            </g>

            {/* Block 2: Highway Detour Curvature Ratio */}
            <g transform="translate(12, 144)">
              <rect width="186" height="88" rx="8" fill="var(--card)" stroke="#8b5cf6" strokeWidth="1" />
              <text x="10" y="16" fill="#8b5cf6" fontSize="9.5" fontWeight="bold" fontFamily="monospace">
                Highway Detour Ratio
              </text>
              <rect x="10" y="24" width="166" height="24" rx="4" fill="#8b5cf6" fillOpacity="0.1" />
              <text x="14" y="39" fill="#8b5cf6" fontSize="8" fontWeight="bold" fontFamily="monospace">
                ratio = distance / d_gc
              </text>
              <text x="10" y="60" fill="var(--muted)" fontSize="8" fontFamily="sans-serif">
                • Measures mountain/toll detour
              </text>
              <text x="10" y="74" fill="var(--muted)" fontSize="8" fontFamily="sans-serif">
                • Isolates straight-line air-miles
              </text>
              <text x="10" y="84" fill="#10b981" fontSize="7.5" fontFamily="monospace">
                Standard: 1.12x–1.28x curvature
              </text>
            </g>

            {/* Block 3: Cyclical Fourier Harmonics */}
            <g transform="translate(12, 242)">
              <rect width="186" height="84" rx="8" fill="var(--card)" stroke="var(--border)" strokeWidth="1" />
              <text x="10" y="16" fill="var(--foreground)" fontSize="9.5" fontWeight="bold" fontFamily="monospace">
                Fourier Calendar Harmonics
              </text>
              <text x="10" y="32" fill="var(--muted)" fontSize="8" fontFamily="monospace">
                month_sin = sin(2π·m / 12)
              </text>
              <text x="10" y="44" fill="var(--muted)" fontSize="8" fontFamily="monospace">
                dow_sin = sin(2π·dow / 7)
              </text>
              <text x="10" y="58" fill="var(--muted)" fontSize="8" fontFamily="sans-serif">
                • days_since_start linear epoch
              </text>
              <text x="10" y="72" fill="#8b5cf6" fontSize="7.5" fontWeight="bold" fontFamily="monospace">
                Resolves weekly dispatch cycles
              </text>
            </g>

            <rect x="12" y="336" width="186" height="42" rx="6" fill="#8b5cf6" fillOpacity="0.1" stroke="#8b5cf6" strokeWidth="0.8" />
            <text x="20" y="352" fill="#8b5cf6" fontSize="8.5" fontWeight="bold" fontFamily="monospace">
              Continuous Spatiotemporal
            </text>
            <text x="20" y="366" fill="var(--foreground)" fontSize="8" fontFamily="sans-serif">
              Smooth coordinate surfaces without grids
            </text>
          </g>

          {/* Connection Arrow 2 -> 3 */}
          <path
            d="M 470 215 L 504 215"
            fill="none"
            stroke="#8b5cf6"
            strokeWidth="2"
            markerEnd="url(#freight-arrow-blue)"
          />

          {/* ================================================================= */}
          {/* TIER 3: Modular Preprocessing & Gradient Boosted Ensemble */}
          {/* ================================================================= */}
          <g transform="translate(510, 20)">
            <rect
              width="200"
              height="390"
              rx="12"
              fill="url(#tier3-grad)"
              stroke="#10b981"
              strokeWidth="1.2"
              strokeDasharray="4 2"
            />
            {/* Tier Header */}
            <rect x="0" y="0" width="200" height="28" rx="12" fill="#10b981" fillOpacity="0.12" />
            <text x="12" y="18" fill="#10b981" fontSize="10.5" fontWeight="bold" fontFamily="monospace">
              TIER 3: BOOSTED ENSEMBLE
            </text>

            {/* Block 1: ColumnTransformer */}
            <g transform="translate(12, 38)">
              <rect width="176" height="88" rx="8" fill="var(--card)" stroke="var(--border)" strokeWidth="1" />
              <text x="10" y="16" fill="var(--foreground)" fontSize="9.5" fontWeight="bold" fontFamily="monospace">
                ColumnTransformer
              </text>
              <text x="10" y="32" fill="var(--muted)" fontSize="8" fontFamily="sans-serif">
                • Numeric: Median Imputer + Indic.
              </text>
              <text x="10" y="46" fill="var(--muted)" fontSize="8" fontFamily="sans-serif">
                • Categorical: OneHotEncoder
              </text>
              <rect x="10" y="54" width="156" height="24" rx="4" fill="#10b981" fillOpacity="0.1" />
              <text x="14" y="69" fill="#10b981" fontSize="7.5" fontWeight="bold" fontFamily="monospace">
                handle_unknown=&quot;ignore&quot;
              </text>
            </g>

            {/* Block 2: Unseen Hub Tolerance */}
            <g transform="translate(12, 136)">
              <rect width="176" height="84" rx="8" fill="var(--card)" stroke="#10b981" strokeWidth="1" />
              <text x="10" y="16" fill="#10b981" fontSize="9.5" fontWeight="bold" fontFamily="monospace">
                Network Hub Expansion
              </text>
              <text x="10" y="32" fill="var(--muted)" fontSize="8" fontFamily="sans-serif">
                • Train: 64 pickup/delivery hubs
              </text>
              <text x="10" y="46" fill="var(--muted)" fontSize="8" fontFamily="sans-serif">
                • Val: 72 hubs (8 unseen nodes)
              </text>
              <text x="10" y="60" fill="var(--muted)" fontSize="8" fontFamily="sans-serif">
                • Zero-vector onehot fallback
              </text>
              <text x="10" y="74" fill="#3b82f6" fontSize="7.5" fontFamily="monospace">
                Continuous lat/lon fallback
              </text>
            </g>

            {/* Block 3: HistGradientBoosting */}
            <g transform="translate(12, 230)">
              <rect width="176" height="96" rx="8" fill="var(--card)" stroke="var(--border)" strokeWidth="1" />
              <text x="10" y="16" fill="var(--foreground)" fontSize="9.5" fontWeight="bold" fontFamily="monospace">
                HistGradientBoosting
              </text>
              <text x="10" y="32" fill="var(--muted)" fontSize="8" fontFamily="monospace">
                • max_iter: 350 trees
              </text>
              <text x="10" y="45" fill="var(--muted)" fontSize="8" fontFamily="monospace">
                • learning_rate: 0.055
              </text>
              <text x="10" y="58" fill="var(--muted)" fontSize="8" fontFamily="monospace">
                • max_leaf_nodes: 31
              </text>
              <text x="10" y="71" fill="var(--muted)" fontSize="8" fontFamily="monospace">
                • min_samples_leaf: 35
              </text>
              <text x="10" y="84" fill="#10b981" fontSize="8" fontFamily="monospace">
                • l2_regularization: 1.0
              </text>
            </g>

            <rect x="12" y="336" width="176" height="42" rx="6" fill="#10b981" fillOpacity="0.1" stroke="#10b981" strokeWidth="0.8" />
            <text x="20" y="352" fill="#10b981" fontSize="8.5" fontWeight="bold" fontFamily="monospace">
              Non-Linear Scaling
            </text>
            <text x="20" y="366" fill="var(--foreground)" fontSize="8" fontFamily="sans-serif">
              Captures tariff floors &amp; reefer spreads
            </text>
          </g>

          {/* Connection Arrow 3 -> 4 */}
          <path
            d="M 710 215 L 744 215"
            fill="none"
            stroke="#10b981"
            strokeWidth="2"
            markerEnd="url(#freight-arrow-emerald)"
          />

          {/* ================================================================= */}
          {/* TIER 4: Walk-Forward Validation & Production Inference */}
          {/* ================================================================= */}
          <g transform="translate(750, 20)">
            <rect
              width="170"
              height="390"
              rx="12"
              fill="url(#tier4-grad)"
              stroke="#f59e0b"
              strokeWidth="1.2"
              strokeDasharray="4 2"
            />
            {/* Tier Header */}
            <rect x="0" y="0" width="170" height="28" rx="12" fill="#f59e0b" fillOpacity="0.12" />
            <text x="10" y="18" fill="#f59e0b" fontSize="10.5" fontWeight="bold" fontFamily="monospace">
              TIER 4: WALK-FORWARD
            </text>

            {/* Block 1: 4 Rolling Folds */}
            <g transform="translate(10, 38)">
              <rect width="150" height="96" rx="8" fill="var(--card)" stroke="var(--border)" strokeWidth="1" />
              <text x="8" y="16" fill="var(--foreground)" fontSize="9" fontWeight="bold" fontFamily="monospace">
                Rolling Out-of-Time
              </text>
              <text x="8" y="30" fill="var(--muted)" fontSize="7.5" fontFamily="monospace">
                Jul: MAE $195.57 | R² 0.800
              </text>
              <text x="8" y="44" fill="var(--muted)" fontSize="7.5" fontFamily="monospace">
                Aug: MAE $178.26 | R² 0.811
              </text>
              <text x="8" y="58" fill="var(--muted)" fontSize="7.5" fontFamily="monospace">
                Sep: MAE $124.97 | R² 0.836
              </text>
              <text x="8" y="72" fill="var(--muted)" fontSize="7.5" fontFamily="monospace">
                Oct: MAE $148.93 | R² 0.816
              </text>
              <text x="8" y="86" fill="#10b981" fontSize="7.5" fontWeight="bold" fontFamily="monospace">
                Avg MedAE: $59.07
              </text>
            </g>

            {/* Block 2: December Benchmark Stress Test */}
            <g transform="translate(10, 144)">
              <rect width="150" height="88" rx="8" fill="var(--card)" stroke="#f59e0b" strokeWidth="1" />
              <text x="8" y="16" fill="#f59e0b" fontSize="9" fontWeight="bold" fontFamily="monospace">
                Dec Stress Benchmark
              </text>
              <text x="8" y="30" fill="var(--muted)" fontSize="7.5" fontFamily="sans-serif">
                • Lexington → Fort Wayne
              </text>
              <text x="8" y="44" fill="var(--muted)" fontSize="7.5" fontFamily="sans-serif">
                • 360 mi, Dry Van, 32k lbs
              </text>
              <text x="8" y="58" fill="var(--muted)" fontSize="7.5" fontFamily="sans-serif">
                • 31 consecutive daily loads
              </text>
              <text x="8" y="72" fill="#f59e0b" fontSize="7.5" fontWeight="bold" fontFamily="monospace">
                Holiday surge: +34.6%
              </text>
              <text x="8" y="82" fill="var(--muted)" fontSize="7" fontFamily="sans-serif">
                Peak Dec 22 at $1,142
              </text>
            </g>

            {/* Block 3: Production Submission */}
            <g transform="translate(10, 242)">
              <rect width="150" height="84" rx="8" fill="var(--card)" stroke="var(--border)" strokeWidth="1" />
              <text x="8" y="16" fill="var(--foreground)" fontSize="9" fontWeight="bold" fontFamily="monospace">
                12k Forward Test
              </text>
              <text x="8" y="30" fill="var(--muted)" fontSize="7.5" fontFamily="sans-serif">
                • All labeled rows refit (48k)
              </text>
              <text x="8" y="44" fill="var(--muted)" fontSize="7.5" fontFamily="sans-serif">
                • max(pred, 1e-6) positivity
              </text>
              <text x="8" y="58" fill="var(--muted)" fontSize="7.5" fontFamily="sans-serif">
                • Schema: load_id, pred_rate
              </text>
              <text x="8" y="72" fill="#10b981" fontSize="7.5" fontWeight="bold" fontFamily="monospace">
                Strict zero-leakage guarantee
              </text>
            </g>

            <rect x="10" y="336" width="150" height="42" rx="6" fill="#f59e0b" fillOpacity="0.1" stroke="#f59e0b" strokeWidth="0.8" />
            <text x="16" y="352" fill="#f59e0b" fontSize="8.5" fontWeight="bold" fontFamily="monospace">
              Targeted Generalization
            </text>
            <text x="16" y="366" fill="var(--foreground)" fontSize="8" fontFamily="sans-serif">
              -16.4% error reduction vs OLS
            </text>
          </g>

          {/* ================================================================= */}
          {/* Bottom Summary Bar */}
          {/* ================================================================= */}
          <g transform="translate(20, 425)">
            <rect width="900" height="40" rx="8" fill="none" stroke="var(--border)" strokeWidth="1" />
            <text x="15" y="24" fill="var(--muted)" fontSize="9" fontFamily="monospace">
              <tspan fill="#3b82f6" fontWeight="bold">INPUT:</tspan> 60k Loads &amp; GPS Coords
            </text>
            <text x="250" y="24" fill="var(--muted)" fontSize="9" fontFamily="monospace">
              <tspan fill="#8b5cf6" fontWeight="bold">ENGINEERING:</tspan> Haversine Detour + Fourier Cycles
            </text>
            <text x="540" y="24" fill="var(--muted)" fontSize="9" fontFamily="monospace">
              <tspan fill="#10b981" fontWeight="bold">ESTIMATOR:</tspan> L2 HistGradientBoosting
            </text>
            <text x="760" y="24" fill="var(--muted)" fontSize="9" fontFamily="monospace">
              <tspan fill="#f59e0b" fontWeight="bold">BENCHMARK:</tspan> MedAE $59.07
            </text>
          </g>
        </svg>
      </div>
    </div>
  );
}
