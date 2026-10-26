"use client";

import React from "react";
import { CustomTeammatesVisual } from "./CustomTeammatesVisual";

export function TeammatesFigure() {
  return (
    <div className="iso rounded-[14px] border border-[var(--border)] bg-[var(--card)] p-4 sm:p-6 shadow-lg overflow-hidden my-6">
      {/* Figure Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-[var(--border)]">
        <div>
          <h4 className="text-sm font-semibold text-[var(--foreground)] leading-tight">
            Autonomous AI Teammate Runtime — Omnichannel Agent Infrastructure
          </h4>
          <p className="text-[11px] text-[var(--muted)] font-mono">
            Self-Learning Skills · Dedicated Omnichannel Comms · Sandboxed VM Browser Execution
          </p>
        </div>
      </div>

      {/* Looping Visual Component */}
      <CustomTeammatesVisual />
    </div>
  );
}
