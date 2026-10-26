"use client";

import React from "react";
import { CustomObservabilityVisual } from "./CustomObservabilityVisual";

export function ObservabilityFigure() {
  return (
    <div className="iso rounded-[14px] border border-[var(--border)] bg-[var(--card)] p-4 sm:p-6 shadow-lg overflow-hidden my-6">
      {/* Figure Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-[var(--border)]">
        <div className="flex items-center gap-2">
          <div>
            <h4 className="text-sm font-semibold text-[var(--foreground)] leading-tight">
              Universal LLM Observability &amp; Dashboard Engine — Tiled Telemetry Canvas
            </h4>
            <p className="text-[11px] text-[var(--muted)] font-mono">
              High-Throughput Ingestion · Interactive Data Tables · Real-Time Plots · Row Diff &amp; Execution Traces
            </p>
          </div>
        </div>

      </div>

      {/* Visual Component */}
      <CustomObservabilityVisual />
    </div>
  );
}
