"use client";

import React from "react";
import { FreightPricingVisual } from "./FreightPricingVisual";

export function FreightPricingFigure() {
  return (
    <div className="w-full my-6 rounded-[14px] border border-[var(--border)] bg-transparent p-4 sm:p-6 overflow-hidden select-none font-sans">
      {/* Figure Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-5 border-b border-[var(--border)]">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--foreground)]">
            Designed Telemetry Solution: Spot Freight Pricing Simulator &amp; Spatial Routing Kinematics
          </span>
        </div>

        <div className="flex items-center gap-2 text-[11px] font-mono text-[var(--muted)]">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>60,000 Spot Loads Evaluated</span>
        </div>
      </div>

      {/* Main Interactive Visual */}
      <FreightPricingVisual />

      {/* Caption */}
      <p className="mt-4 text-xs text-[var(--muted)] leading-relaxed font-mono">
        <strong className="text-[var(--foreground)]">Coded Analysis Walkthrough:</strong> Real-time simulation of the machine learning pipeline trained across 48,000 historical loads and prospective validation across 12,000 loads. Demonstrates geodesic Haversine route detour ratios, automated data quality imputation for 888 anomalous records, non-linear short-haul tariff floors, and out-of-time walk-forward December holiday capacity surge curves.
      </p>
    </div>
  );
}
