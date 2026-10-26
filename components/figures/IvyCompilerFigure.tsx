"use client";

import React from "react";
import { CustomIvyCompilerVisual } from "./CustomIvyCompilerVisual";

export function IvyCompilerFigure() {
  return (
    <div className="iso rounded-[14px] border border-[var(--border)] bg-[var(--card)] p-4 sm:p-6 shadow-lg overflow-hidden my-6">
      {/* Figure Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-[var(--border)]">
        <div className="flex items-center gap-2">
          <div>
            <h4 className="text-sm font-semibold text-[var(--foreground)] leading-tight">
              Ivy Unified AI Framework &amp; Transpiler — AST Graph Engine
            </h4>
            <p className="text-[11px] text-[var(--muted)] font-mono">
              Recursive DAG Tracer · Functional API Intermediary Representation (IR) · 4-Way Framework Interop
            </p>
          </div>
        </div>

      </div>

      {/* 3-Row Interactive Transpilation Layout */}
      <CustomIvyCompilerVisual
        initialLeftFw="TensorFlow"
        initialRightFw="PyTorch"
      />
    </div>
  );
}
