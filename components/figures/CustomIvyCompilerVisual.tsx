"use client";

import React, { useState } from "react";
import { Check, Copy, ArrowRight, Sparkles, Terminal } from "lucide-react";

export type Framework = "TensorFlow" | "PyTorch" | "JAX" | "NumPy";

// -----------------------------------------------------------------------------
// Official Framework SVG Logos
// -----------------------------------------------------------------------------
export function TensorFlowLogo({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M1.292 5.856L11.54 0v24l-4.095-2.378V7.603l-6.168 3.564.015-5.31zm21.43 5.311l-.014-5.31L12.46 0v24l4.095-2.378V14.87l3.092 1.788-.018-4.618-3.074-1.756V7.603l6.168 3.564z" />
    </svg>
  );
}

export function PyTorchLogo({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12.005 0L4.952 7.053a9.865 9.865 0 000 14.022 9.866 9.866 0 0014.022 0c3.984-3.9 3.986-10.205.085-14.023l-1.744 1.743c2.904 2.905 2.904 7.634 0 10.538s-7.634 2.904-10.538 0-2.904-7.634 0-10.538l4.647-4.646.582-.665zm3.568 3.899a1.327 1.327 0 00-1.327 1.327 1.327 1.327 0 001.327 1.328A1.327 1.327 0 0016.9 5.226 1.327 1.327 0 0015.573 3.9z" />
    </svg>
  );
}

export function JAXLogo({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 451 261" className={className}>
      <polygon fill="#5e97f6" points="50.5 130.4 25.5 173.71 75.5 173.71 100.5 130.4 50.5 130.4" />
      <polygon fill="#5e97f6" points="0.5 217.01 25.5 173.71 75.5 173.71 50.5 217.01 0.5 217.01" />
      <polygon fill="#5e97f6" points="125.5 173.71 75.5 173.71 50.5 217.01 100.5 217.01 125.5 173.71" />
      <polygon fill="#5e97f6" points="175.5 173.71 125.5 173.71 100.5 217.01 150.5 217.01 175.5 173.71" />
      <polygon fill="#5e97f6" points="150.5 130.4 125.5 173.71 175.5 173.71 200.5 130.4 150.5 130.4" />
      <polygon fill="#5e97f6" points="175.5 87.1 150.5 130.4 200.5 130.4 225.5 87.1 175.5 87.1" />
      <polygon fill="#5e97f6" points="200.5 43.8 175.5 87.1 225.5 87.1 250.5 43.8 200.5 43.8" />
      <polygon fill="#5e97f6" points="225.5 0.5 200.5 43.8 250.5 43.8 275.5 0.5 225.5 0.5" />
      <polygon fill="#2a56c6" points="0.5 217.01 25.5 260.31 75.5 260.31 50.5 217.01 0.5 217.01" />
      <polygon fill="#2a56c6" points="125.5 260.31 75.5 260.31 50.5 217.01 100.5 217.01 125.5 260.31" />
      <polygon fill="#2a56c6" points="175.5 260.31 125.5 260.31 100.5 217.01 150.5 217.01 175.5 260.31" />
      <polygon fill="#00796b" points="200.5 217.01 175.5 173.71 150.5 217.01 175.5 260.31 200.5 217.01" />
      <polygon fill="#00796b" points="250.5 130.4 225.5 87.1 200.5 130.4 250.5 130.4" />
      <polygon fill="#00796b" points="250.5 43.8 225.5 87.1 250.5 130.4 275.5 87.1 250.5 43.8" />
      <polygon fill="#3367d6" points="125.5 173.71 100.5 130.4 75.5 173.71 125.5 173.71" />
      <polygon fill="#26a69a" points="250.5 130.4 200.5 130.4 175.5 173.71 225.5 173.71 250.5 130.4" />
      <polygon fill="#26a69a" points="300.5 130.4 250.5 130.4 225.5 173.71 275.5 173.71 300.5 130.4" />
      <polygon fill="#9c27b0" points="350.5 43.8 325.5 0.5 300.5 43.8 325.5 87.1 350.5 43.8" />
      <polygon fill="#9c27b0" points="375.5 87.1 350.5 43.8 325.5 87.1 350.5 130.4 375.5 87.1" />
      <polygon fill="#9c27b0" points="400.5 130.4 375.5 87.1 350.5 130.4 375.5 173.71 400.5 130.4" />
      <polygon fill="#9c27b0" points="425.5 173.71 400.5 130.4 375.5 173.71 400.5 217.01 425.5 173.71" />
      <polygon fill="#9c27b0" points="450.5 217.01 425.5 173.71 400.5 217.01 425.5 260.31 450.5 217.01" />
      <polygon fill="#9c27b0" points="425.5 0.5 400.5 43.8 425.5 87.1 450.5 43.8 425.5 0.5" />
      <polygon fill="#9c27b0" points="375.5 87.1 400.5 43.8 425.5 87.1 400.5 130.4 375.5 87.1" />
      <polygon fill="#9c27b0" points="350.5 130.4 325.5 173.71 350.5 217.01 375.5 173.71 350.5 130.4" />
      <polygon fill="#9c27b0" points="325.5 260.31 300.5 217.01 325.5 173.71 350.5 217.01 325.5 260.31" />
      <polygon fill="#6a1b9a" points="275.5 260.31 250.5 217.01 300.5 217.01 325.5 260.31 275.5 260.31" />
      <polygon fill="#00695c" points="225.5 173.71 175.5 173.71 200.5 217.01 250.5 217.01 225.5 173.71" />
      <polygon fill="#00695c" points="275.5 173.71 225.5 173.71 250.5 217.01 275.5 173.71" />
      <polygon fill="#00695c" points="275.5 87.1 300.5 130.4 350.5 130.4 325.5 87.1 275.5 87.1" />
      <polygon fill="#00695c" points="300.5 43.8 250.5 43.8 275.5 87.1 325.5 87.1 300.5 43.8" />
      <polygon fill="#00695c" points="425.5 260.31 400.5 217.01 350.5 217.01 375.5 260.31 425.5 260.31" />
      <polygon fill="#00695c" points="375.5 173.71 350.5 217.01 400.5 217.01 375.5 173.71" />
      <polygon fill="#ea80fc" points="325.5 0.5 275.5 0.5 250.5 43.8 300.5 43.8 325.5 0.5" />
      <polygon fill="#ea80fc" points="325.5 173.71 275.5 173.71 250.5 217.01 300.5 217.01 325.5 173.71" />
      <polygon fill="#ea80fc" points="350.5 130.4 300.5 130.4 275.5 173.71 325.5 173.71 350.5 130.4" />
      <polygon fill="#ea80fc" points="425.5 0.5 375.5 0.5 350.5 43.8 400.5 43.8 425.5 0.5" />
      <polygon fill="#ea80fc" points="375.5 87.1 350.5 43.8 400.5 43.8 375.5 87.1" />
    </svg>
  );
}

export function NumPyLogo({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M10.315 4.876L6.3048 2.8517l-4.401 2.1965 4.1186 2.0683zm1.8381.9277l4.2045 2.1223-4.3622 2.1906-4.125-2.0718zm5.6153-2.9213l4.3193 2.1658-3.863 1.9402-4.2131-2.1252zm-1.859-.9329L12.021 0 8.1742 1.9193l4.0068 2.0208zm-3.0401 16.7443V24l4.7107-2.3507-.0053-5.3085zm4.7037-4.2057l-.0052-5.2528-4.6985 2.3356v5.2546zm5.6553-.9845v5.327l-4.0178 2.0052-.0029-5.3028zm0-1.8626V6.4214l-4.0253 2.001.0034 5.2633zM11.2062 11.571L8.0333 9.9756v6.895s-3.8804-8.2564-4.2399-8.998c-.0463-.0957-.2371-.2007-.2858-.2262C2.8118 7.2812.773 6.2485.773 6.2485V18.43l2.8204 1.5076v-6.3674s3.8392 7.3775 3.878 7.458c.0389.0807.4245.8582.8362 1.1314.5485.363 2.8992 1.7766 2.8992 1.7766z" />
    </svg>
  );
}

// -----------------------------------------------------------------------------
// Framework Metadata & Color Palette
// -----------------------------------------------------------------------------
const FW_META: Record<
  Framework,
  {
    key: string;
    name: string;
    color: string;
    icon: (cls?: string) => React.ReactNode;
  }
> = {
  TensorFlow: {
    key: "tf",
    name: "TensorFlow",
    color: "#ff6f00",
    icon: (cls) => <TensorFlowLogo className={cls || "w-5 h-5 text-[#ff6f00]"} />,
  },
  PyTorch: {
    key: "torch",
    name: "PyTorch",
    color: "#ee4c2c",
    icon: (cls) => <PyTorchLogo className={cls || "w-5 h-5 text-[#ee4c2c]"} />,
  },
  JAX: {
    key: "jax",
    name: "JAX",
    color: "#0891b2",
    icon: (cls) => <JAXLogo className={cls || "w-5 h-5"} />,
  },
  NumPy: {
    key: "np",
    name: "NumPy",
    color: "#4d77cf",
    icon: (cls) => <NumPyLogo className={cls || "w-5 h-5 text-[#4d77cf]"} />,
  },
};

const FW_LIST: Framework[] = ["TensorFlow", "PyTorch", "JAX", "NumPy"];

// -----------------------------------------------------------------------------
// Real Implementation Code Snippets (From Unifying Framework Blog Post)
// -----------------------------------------------------------------------------
const BACKEND_CODE: Record<Framework, string> = {
  TensorFlow: `# ivy/functional/backends/tensorflow/elementwise.py
import tensorflow as tf
from typing import Optional

def cos(
    x: tf.Tensor,
    /,
    *,
    out: Optional[tf.Tensor] = None,
) -> tf.Tensor:
    x = _cast_for_unary_op(x)
    return tf.math.cos(x)`,

  PyTorch: `# ivy/functional/backends/torch/elementwise.py
import torch
from typing import Optional

def cos(
    x: torch.Tensor,
    /,
    *,
    out: Optional[torch.Tensor] = None,
) -> torch.Tensor:
    x = _cast_for_unary_op(x)
    return torch.cos(x, out=out)`,

  JAX: `# ivy/functional/backends/jax/elementwise.py
import jax.numpy as jnp
from typing import Optional

def cos(
    x: jnp.ndarray,
    /,
    *,
    out: Optional[jnp.ndarray] = None,
) -> jnp.ndarray:
    x = _cast_for_unary_op(x)
    return jnp.cos(x)`,

  NumPy: `# ivy/functional/backends/numpy/elementwise.py
import numpy as np
from typing import Optional

def cos(
    x: np.ndarray,
    /,
    *,
    out: Optional[np.ndarray] = None,
) -> np.ndarray:
    x = _cast_for_unary_op(x)
    return np.cos(x, out=out)`,
};

const FUNCTIONAL_API_CODE = `# ivy/functional/ivy/elementwise.py
from typing import Optional, Union
import ivy

def cos(
    x: Union[ivy.Array, ivy.NativeArray],
    /,
    *,
    out: Optional[ivy.Array] = None,
) -> ivy.Array:
    """Computes cosine of each element in input array."""
    return ivy.current_backend(x).cos(x, out=out)`;

const FRONTEND_CODE: Record<Framework, string> = {
  TensorFlow: `# ivy/functional/frontends/tensorflow/math.py
import ivy

def cos(x, name=None):
    return ivy.cos(x)`,

  PyTorch: `# ivy/functional/frontends/torch/math.py
import ivy

def cos(input, *, out=None):
    return ivy.cos(input, out=out)`,

  JAX: `# ivy/functional/frontends/jax/lax.py
import ivy

def cos(x):
    return ivy.cos(x)`,

  NumPy: `# ivy/functional/frontends/numpy/math.py
import ivy

def cos(x, out=None, where=True):
    return ivy.cos(x, out=out, where=where)`,
};

interface CustomIvyCompilerVisualProps {
  initialLeftFw?: Framework;
  initialRightFw?: Framework;
}

export function CustomIvyCompilerVisual({
  initialLeftFw = "TensorFlow",
  initialRightFw = "PyTorch",
}: CustomIvyCompilerVisualProps) {
  const [leftFw, setLeftFw] = useState<Framework>(initialLeftFw);
  const [rightFw, setRightFw] = useState<Framework>(initialRightFw);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const copyCode = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(key);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  return (
    <div className="w-full space-y-4">
      {/* ===================================================================== */}
      {/* ROW 1: Three Architectural Summary Cards                              */}
      {/* [1. Backend Runtimes Execution ... 2. Functional Array API ... 3. Frontend API Emulates ...] */}
      {/* ===================================================================== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 text-xs font-mono">
        <div className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--muted-bg)]/40 hover:border-emerald-500/30 transition-all">
          <div className="text-[10px] text-cyan-600 dark:text-cyan-400 font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
            1. Backend Runtimes Execution
          </div>
          <div className="text-xs text-[var(--foreground)] font-semibold">
            JAX XLA · torch.compile · Grappler
          </div>
          <div className="text-[11px] text-[var(--muted)] mt-1 leading-relaxed">
            Hardware-specialized execution code &amp; native backends
          </div>
        </div>

        <div className="p-3.5 rounded-xl border border-emerald-500/40 bg-emerald-500/5 hover:border-emerald-500/60 transition-all shadow-sm">
          <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            2. Functional Array API
          </div>
          <div className="text-xs text-[var(--foreground)] font-semibold">
            Array API Standard Intermediary
          </div>
          <div className="text-[11px] text-[var(--muted)] mt-1 leading-relaxed">
            Core mathematical primitives &amp; AST DAG Tracer
          </div>
        </div>

        <div className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--muted-bg)]/40 hover:border-emerald-500/30 transition-all">
          <div className="text-[10px] text-orange-600 dark:text-orange-400 font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
            3. Frontend API Emulates
          </div>
          <div className="text-xs text-[var(--foreground)] font-semibold">
            Emulates torch.*, tf.*, jax.*, np.*
          </div>
          <div className="text-[11px] text-[var(--muted)] mt-1 leading-relaxed">
            Matches native function signatures &amp; kwargs 1:1
          </div>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* ROW 2: Interactive Framework Selection & Transpiler Flow Band         */}
      {/* [SOURCE BACKEND Toggles  ---->   Ivy Transpiler ---->  TARGET FRONTEND Toggles] */}
      {/* ===================================================================== */}
      <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--card)] shadow-sm">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          {/* SOURCE BACKEND Toggles */}
          <div className="flex items-center gap-3">
            <div className="text-left">
              <div className="text-[10px] font-mono text-[var(--muted)] uppercase tracking-wider">
                Source Backend
              </div>
              <div className="text-xs font-bold font-mono text-emerald-600 dark:text-emerald-400">
                {FW_META[leftFw].name.toUpperCase()}
              </div>
            </div>

            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[var(--muted-bg)] border border-[var(--border)]">
              {FW_LIST.map((fw) => {
                const isActive = leftFw === fw;
                return (
                  <button
                    key={fw}
                    onClick={() => setLeftFw(fw)}
                    title={`Select ${fw} as Source Backend`}
                    className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                      isActive
                        ? "bg-[var(--card)] shadow-sm border border-emerald-500/60 ring-2 ring-emerald-500/20 scale-105"
                        : "opacity-60 hover:opacity-100 hover:bg-[var(--card)]/50 border border-transparent"
                    }`}
                  >
                    {FW_META[fw].icon("w-5 h-5")}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Flow Indicator: Source -> Ivy Transpiler (IR) -> Target */}
          <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-[var(--muted-bg)]/60 border border-[var(--border)] font-mono text-xs">
            <span className="font-semibold text-[var(--foreground)]">
              {FW_META[leftFw].name}
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-bold">
              <Sparkles className="w-3 h-3" />
              <span>Ivy Transpiler</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            <span className="font-semibold text-[var(--foreground)]">
              {FW_META[rightFw].name}
            </span>
          </div>

          {/* TARGET FRONTEND Toggles */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[var(--muted-bg)] border border-[var(--border)]">
              {FW_LIST.map((fw) => {
                const isActive = rightFw === fw;
                return (
                  <button
                    key={fw}
                    onClick={() => setRightFw(fw)}
                    title={`Select ${fw} as Target Frontend`}
                    className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                      isActive
                        ? "bg-[var(--card)] shadow-sm border border-emerald-500/60 ring-2 ring-emerald-500/20 scale-105"
                        : "opacity-60 hover:opacity-100 hover:bg-[var(--card)]/50 border border-transparent"
                    }`}
                  >
                    {FW_META[fw].icon("w-5 h-5")}
                  </button>
                );
              })}
            </div>

            <div className="text-right">
              <div className="text-[10px] font-mono text-[var(--muted)] uppercase tracking-wider">
                Target Frontend
              </div>
              <div className="text-xs font-bold font-mono text-cyan-600 dark:text-cyan-400">
                {FW_META[rightFw].name.toUpperCase()}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* ROW 3: Three Side-by-Side Terminals                                   */}
      {/* [Backend Function Terminal | Array API Terminal | Frontend Function Terminal] */}
      {/* ===================================================================== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Terminal 1: Source Backend Function */}
        <div className="rounded-xl border border-[var(--border)] bg-[#0d1117] text-[#c9d1d9] overflow-hidden flex flex-col shadow-md">
          <div className="flex items-center justify-between px-3 py-2 bg-[#161b22] border-b border-[#30363d] text-xs font-mono">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
              </div>
              <span className="text-[11px] text-[#8b949e] font-semibold truncate max-w-[130px]">
                backends/{FW_META[leftFw].key}/elementwise.py
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[9px] px-1.5 py-0.5 rounded font-bold uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30">
                {leftFw} Backend
              </span>
              <button
                onClick={() => copyCode("backend", BACKEND_CODE[leftFw])}
                className="p-1 rounded hover:bg-[#21262d] text-[#8b949e] hover:text-[#c9d1d9] transition-colors"
                title="Copy Code"
              >
                {copiedSection === "backend" ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </div>
          <div className="p-3 font-mono text-[11px] leading-relaxed overflow-x-auto flex-1 bg-[#0d1117]/90 min-h-[190px]">
            <pre className="text-[#e6edf3]">
              <code>{BACKEND_CODE[leftFw]}</code>
            </pre>
          </div>
        </div>

        {/* Terminal 2: Functional Array API (Unified IR) */}
        <div className="rounded-xl border border-emerald-500/40 bg-[#0d1117] text-[#c9d1d9] overflow-hidden flex flex-col shadow-md ring-1 ring-emerald-500/20">
          <div className="flex items-center justify-between px-3 py-2 bg-[#161b22] border-b border-[#30363d] text-xs font-mono">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
              </div>
              <span className="text-[11px] text-emerald-400 font-semibold truncate max-w-[130px]">
                ivy/elementwise.py
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[9px] px-1.5 py-0.5 rounded font-bold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Functional API (IR)
              </span>
              <button
                onClick={() => copyCode("api", FUNCTIONAL_API_CODE)}
                className="p-1 rounded hover:bg-[#21262d] text-[#8b949e] hover:text-[#c9d1d9] transition-colors"
                title="Copy Code"
              >
                {copiedSection === "api" ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </div>
          <div className="p-3 font-mono text-[11px] leading-relaxed overflow-x-auto flex-1 bg-[#0d1117]/90 min-h-[190px]">
            <pre className="text-[#e6edf3]">
              <code>{FUNCTIONAL_API_CODE}</code>
            </pre>
          </div>
        </div>

        {/* Terminal 3: Target Frontend Function */}
        <div className="rounded-xl border border-[var(--border)] bg-[#0d1117] text-[#c9d1d9] overflow-hidden flex flex-col shadow-md">
          <div className="flex items-center justify-between px-3 py-2 bg-[#161b22] border-b border-[#30363d] text-xs font-mono">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
              </div>
              <span className="text-[11px] text-[#8b949e] font-semibold truncate max-w-[130px]">
                frontends/{FW_META[rightFw].key}/math.py
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[9px] px-1.5 py-0.5 rounded font-bold uppercase bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                {rightFw} Frontend
              </span>
              <button
                onClick={() => copyCode("frontend", FRONTEND_CODE[rightFw])}
                className="p-1 rounded hover:bg-[#21262d] text-[#8b949e] hover:text-[#c9d1d9] transition-colors"
                title="Copy Code"
              >
                {copiedSection === "frontend" ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </div>
          <div className="p-3 font-mono text-[11px] leading-relaxed overflow-x-auto flex-1 bg-[#0d1117]/90 min-h-[190px]">
            <pre className="text-[#e6edf3]">
              <code>{FRONTEND_CODE[rightFw]}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Card Background SVG for Grid View
// -----------------------------------------------------------------------------
export function getIvyCompilerCardSvg(): string {
  return `<svg viewBox="0 0 320 180" class="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="ivy-card-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#10b981" stop-opacity="0.25"/>
        <stop offset="100%" stop-color="#06b6d4" stop-opacity="0.08"/>
      </linearGradient>
    </defs>
    <path d="M20 90 L300 90 M160 20 L160 160 M60 40 L260 140 M60 140 L260 40" stroke="currentColor" stroke-opacity="0.12" stroke-width="1" stroke-dasharray="4 4" />
    <rect x="125" y="65" width="70" height="50" rx="10" fill="url(#ivy-card-grad)" stroke="#10b981" stroke-width="1.5" stroke-opacity="0.6"/>
    <text x="160" y="88" text-anchor="middle" font-family="monospace" font-size="10" font-weight="700" fill="#10b981">IVY CORE</text>
    <text x="160" y="102" text-anchor="middle" font-family="monospace" font-size="7.5" fill="currentColor" fill-opacity="0.7">ARRAY API IR</text>

    <rect x="30" y="25" width="62" height="32" rx="6" fill="currentColor" fill-opacity="0.06" stroke="#ee4c2c" stroke-width="1.2" stroke-opacity="0.6"/>
    <text x="61" y="45" text-anchor="middle" font-family="monospace" font-size="8.5" font-weight="600" fill="#ee4c2c">PyTorch</text>
    <line class="ivy-framework-link" x1="92" y1="47" x2="125" y2="75" stroke="#ee4c2c" stroke-opacity="0.5" stroke-width="1.2"/>

    <rect x="30" y="120" width="62" height="32" rx="6" fill="currentColor" fill-opacity="0.06" stroke="#0891b2" stroke-width="1.2" stroke-opacity="0.6"/>
    <text x="61" y="140" text-anchor="middle" font-family="monospace" font-size="8.5" font-weight="600" fill="#0891b2">JAX XLA</text>
    <line class="ivy-framework-link" x1="92" y1="130" x2="125" y2="105" stroke="#0891b2" stroke-opacity="0.5" stroke-width="1.2"/>

    <rect x="228" y="25" width="62" height="32" rx="6" fill="currentColor" fill-opacity="0.06" stroke="#ff6f00" stroke-width="1.2" stroke-opacity="0.6"/>
    <text x="259" y="45" text-anchor="middle" font-family="monospace" font-size="8.5" font-weight="600" fill="#ff6f00">TensorFlow</text>
    <line class="ivy-framework-link" x1="228" y1="47" x2="195" y2="75" stroke="#ff6f00" stroke-opacity="0.5" stroke-width="1.2"/>

    <rect x="228" y="120" width="62" height="32" rx="6" fill="currentColor" fill-opacity="0.06" stroke="#4d77cf" stroke-width="1.2" stroke-opacity="0.6"/>
    <text x="259" y="140" text-anchor="middle" font-family="monospace" font-size="8.5" font-weight="600" fill="#4d77cf">NumPy</text>
    <line class="ivy-framework-link" x1="228" y1="130" x2="195" y2="105" stroke="#4d77cf" stroke-opacity="0.5" stroke-width="1.2"/>
  </svg>`;
}
