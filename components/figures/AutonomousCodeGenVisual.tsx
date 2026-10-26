"use client";

import React, { useState, useEffect } from "react";
import {
  Sparkles,
  Bot,
  GitPullRequest,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Code2,
  FileCode,
  Terminal,
  Cpu,
  Layers,
  ArrowRight,
  ShieldCheck,
  Play,
  Pause,
} from "lucide-react";

export type Framework = "torch" | "jax" | "tensorflow" | "numpy";
export type ApiDomain = "frontend" | "backend";

interface CodeGenerationExample {
  id: string;
  targetFramework: Framework;
  domain: ApiDomain;
  functionName: string;
  signature: string;
  datasetContext: string;
  synthesizedCode: string;
  unitTestCode: string;
  testCases: {
    name: string;
    inputShapes: string;
    dtypes: string;
    status: "pass" | "correcting" | "fail";
    numericTolerance: string;
  }[];
  prMetadata: {
    branch: string;
    title: string;
    filesChanged: number;
    linesAdded: number;
    ciStatus: "passing" | "pending";
  };
}

const EXAMPLES: CodeGenerationExample[] = [
  {
    id: "torch-gelu",
    targetFramework: "torch",
    domain: "frontend",
    functionName: "ivy.functional.frontends.torch.nn.functional.gelu",
    signature: "gelu(input, approximate='none') -> Tensor",
    datasetContext: "Torch frontend parity corpus · Trained on 3,400+ validated frontend AST pairs",
    synthesizedCode: `def gelu(input, approximate='none'):
    if approximate == 'none':
        return ivy.multiply(
            0.5,
            ivy.multiply(
                input,
                ivy.add(1.0, ivy.erf(ivy.divide(input, ivy.sqrt(2.0))))
            )
        )
    elif approximate == 'tanh':
        inner = ivy.multiply(
            ivy.sqrt(2.0 / ivy.pi),
            ivy.add(input, ivy.multiply(0.044715, ivy.pow(input, 3)))
        )
        return ivy.multiply(0.5, ivy.multiply(input, ivy.add(1.0, ivy.tanh(inner))))
    raise ValueError(f"Invalid approximate: {approximate}")`,
    unitTestCode: `@given(
    input_and_dtype=helpers.dtype_and_values(
        available_dtypes=helpers.get_dtypes("float"),
        min_num_dims=1, max_num_dims=4
    ),
    approximate=st.sampled_from(["none", "tanh"])
)
def test_torch_gelu(input_and_dtype, approximate, on_device, backend_fw):
    input_dtype, x = input_and_dtype
    helpers.test_frontend_function(
        input_dtypes=input_dtype,
        frontend="torch",
        test_flags=FrontendMethodTestFlags(),
        backend_to_test=backend_fw,
        on_device=on_device,
        fn_tree="nn.functional.gelu",
        input=x[0],
        approximate=approximate,
        atol=1e-5, rtol=1e-5
    )`,
    testCases: [
      { name: "Float32 Tensor (Standard CDF)", inputShapes: "[2, 64, 128]", dtypes: "torch.float32", status: "pass", numericTolerance: "4.12e-6" },
      { name: "Tanh Approximation Flag", inputShapes: "[4, 32]", dtypes: "torch.float32", status: "pass", numericTolerance: "1.08e-5" },
      { name: "Float64 Gradient Equality", inputShapes: "[1, 16]", dtypes: "torch.float64", status: "pass", numericTolerance: "2.35e-7" },
    ],
    prMetadata: {
      branch: "auto/torch-gelu-frontend-binding",
      title: "feat(torch-frontend): implement nn.functional.gelu with tanh approximation",
      filesChanged: 2,
      linesAdded: 48,
      ciStatus: "passing",
    },
  },
  {
    id: "jax-lax-conv",
    targetFramework: "jax",
    domain: "backend",
    functionName: "ivy.functional.backends.jax.layers.conv2d",
    signature: "conv2d(x, filters, strides, padding, ...) -> Array",
    datasetContext: "JAX backend compiler corpus · Supervised on JIT-compiled tensor operations",
    synthesizedCode: `def conv2d(x, filters, strides, padding, data_format='NHWC', dilations=1):
    strides = [1] + [strides] * 2 + [1] if isinstance(strides, int) else strides
    dilations = [1] + [dilations] * 2 + [1] if isinstance(dilations, int) else dilations
    padding = padding.upper()
    dimension_numbers = ('NHWC', 'HWIO', 'NHWC') if data_format == 'NHWC' else ('NCHW', 'OIHW', 'NCHW')
    return lax.conv_general_dilated(
        lhs=x,
        rhs=filters,
        window_strides=strides[1:3],
        padding=padding,
        lhs_dilation=None,
        rhs_dilation=dilations[1:3],
        dimension_numbers=dimension_numbers
    )`,
    unitTestCode: `@given(
    x_and_f=helpers.conv2d_helper(
        available_dtypes=helpers.get_dtypes("float"),
        batch_size=st.integers(1, 4),
        spatial_dims=st.integers(14, 28)
    )
)
def test_jax_conv2d(x_and_f, on_device, backend_fw):
    x, filters, strides, pad = x_and_f
    helpers.test_backend_function(
        backend="jax",
        backend_to_test=backend_fw,
        on_device=on_device,
        fn_name="conv2d",
        x=x, filters=filters, strides=strides, padding=pad,
        atol=1e-4, rtol=1e-4
    )`,
    testCases: [
      { name: "NHWC Conv2D Dilated", inputShapes: "[2, 28, 28, 32]", dtypes: "jax.numpy.float32", status: "pass", numericTolerance: "2.14e-5" },
      { name: "Asymmetric Strides (2, 1)", inputShapes: "[1, 32, 32, 16]", dtypes: "jax.numpy.float32", status: "pass", numericTolerance: "1.98e-5" },
      { name: "Gradient Parity vs Native", inputShapes: "[1, 14, 14, 8]", dtypes: "jax.numpy.float32", status: "pass", numericTolerance: "3.20e-6" },
    ],
    prMetadata: {
      branch: "auto/jax-conv2d-backend-jit",
      title: "feat(jax-backend): add conv2d implementation via lax.conv_general_dilated",
      filesChanged: 2,
      linesAdded: 54,
      ciStatus: "passing",
    },
  },
  {
    id: "tf-spectral-norm",
    targetFramework: "tensorflow",
    domain: "frontend",
    functionName: "ivy.functional.frontends.tensorflow.math.bessel_i0e",
    signature: "bessel_i0e(x, name=None) -> Tensor",
    datasetContext: "TensorFlow frontend parity corpus · Trained on special mathematical operations",
    synthesizedCode: `def bessel_i0e(x, name=None):
    x = ivy.astype(x, ivy.float32) if ivy.is_int_dtype(x) else x
    return ivy.multiply(ivy.exp(-ivy.abs(x)), ivy.i0(x))`,
    unitTestCode: `@given(
    input_and_dtype=helpers.dtype_and_values(
        available_dtypes=helpers.get_dtypes("float"),
        min_value=-50.0, max_value=50.0
    )
)
def test_tf_bessel_i0e(input_and_dtype, on_device, backend_fw):
    input_dtype, x = input_and_dtype
    helpers.test_frontend_function(
        input_dtypes=input_dtype,
        frontend="tensorflow",
        backend_to_test=backend_fw,
        on_device=on_device,
        fn_tree="math.bessel_i0e",
        x=x[0],
        atol=1e-4
    )`,
    testCases: [
      { name: "Exponential Scaled Region (|x| > 10)", inputShapes: "[8, 16]", dtypes: "tf.float32", status: "pass", numericTolerance: "3.42e-5" },
      { name: "Origin Zero Symmetry (x=0)", inputShapes: "[1, 1]", dtypes: "tf.float32", status: "pass", numericTolerance: "0.00e+00" },
      { name: "Float64 High Precision Test", inputShapes: "[4, 8]", dtypes: "tf.float64", status: "pass", numericTolerance: "1.12e-6" },
    ],
    prMetadata: {
      branch: "auto/tf-bessel-i0e-frontend",
      title: "feat(tensorflow-frontend): add tf.math.bessel_i0e mathematically stable wrapper",
      filesChanged: 2,
      linesAdded: 36,
      ciStatus: "passing",
    },
  },
];

export function AutonomousCodeGenVisual() {
  const [selectedExampleId, setSelectedExampleId] = useState<string>("torch-gelu");
  const [activeTab, setActiveTab] = useState<"code" | "test" | "pr">("code");
  const [executionState, setExecutionState] = useState<"idle" | "running" | "verified">("verified");

  const example = EXAMPLES.find((e) => e.id === selectedExampleId) || EXAMPLES[0];

  const runVerificationSimulation = () => {
    setExecutionState("running");
    setTimeout(() => {
      setExecutionState("verified");
    }, 700);
  };

  return (
    <div className="w-full space-y-5 select-none font-sans">
      {/* 1. Controller Bar: Missing API Selection & Target Framework */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-4 rounded-xl border border-[var(--border)] bg-[var(--card)] shadow-xs">
        <div className="flex flex-col gap-1.5 w-full md:w-auto">
          <label className="text-[11px] font-mono text-[var(--muted)] uppercase tracking-wider flex items-center gap-1.5">
            <Bot className="w-3.5 h-3.5 text-emerald-500" />
            <span>Autonomous Agent Mission: Select Synthesized Target</span>
          </label>
          <div className="flex flex-wrap gap-1.5">
            {EXAMPLES.map((ex) => (
              <button
                key={ex.id}
                onClick={() => {
                  setSelectedExampleId(ex.id);
                  runVerificationSimulation();
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer border ${
                  selectedExampleId === ex.id
                    ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-600 dark:text-emerald-400 font-semibold shadow-2xs"
                    : "border-[var(--border)] bg-[var(--muted-bg)]/40 text-[var(--muted)] hover:text-[var(--foreground)]"
                }`}
              >
                <span className="uppercase text-[10px] mr-1.5 px-1 py-0.2 rounded bg-[var(--muted-bg)] border border-[var(--border)] text-[var(--foreground)]">
                  {ex.targetFramework}
                </span>
                <span>{ex.functionName.split(".").slice(-2).join(".")}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Verification Status Pill */}
        <div className="flex items-center gap-2 border-t md:border-t-0 md:border-l border-[var(--border)] pt-3 md:pt-0 md:pl-4">
          <div className="text-right font-mono text-xs hidden sm:block">
            <span className="text-[10px] text-[var(--muted)] block">Agent Status</span>
            <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              Unit Tests Validated
            </span>
          </div>
          <button
            onClick={runVerificationSimulation}
            className="px-3 py-1.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Re-verify</span>
          </button>
        </div>
      </div>

      {/* 2. Interactive Synthesized Artifact Workbench */}
      <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] overflow-hidden shadow-xs">
        {/* Artifact Header with Sub-Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-b border-[var(--border)] bg-[var(--muted-bg)]/30">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-mono font-bold text-[var(--foreground)] truncate max-w-[280px] sm:max-w-none">
              {example.functionName}
            </span>
          </div>

          <div className="flex items-center gap-1 bg-[var(--card)] p-1 rounded-lg border border-[var(--border)] text-xs font-mono">
            <button
              onClick={() => setActiveTab("code")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded transition-all cursor-pointer ${
                activeTab === "code"
                  ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/30 shadow-2xs"
                  : "text-[var(--muted)] hover:text-[var(--foreground)]"
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Implementation</span>
            </button>
            <button
              onClick={() => setActiveTab("test")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded transition-all cursor-pointer ${
                activeTab === "test"
                  ? "bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 font-bold border border-cyan-500/30 shadow-2xs"
                  : "text-[var(--muted)] hover:text-[var(--foreground)]"
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Hypothesis Test</span>
            </button>
            <button
              onClick={() => setActiveTab("pr")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded transition-all cursor-pointer ${
                activeTab === "pr"
                  ? "bg-purple-500/15 text-purple-600 dark:text-purple-400 font-bold border border-purple-500/30 shadow-2xs"
                  : "text-[var(--muted)] hover:text-[var(--foreground)]"
              }`}
            >
              <GitPullRequest className="w-3.5 h-3.5" />
              <span>GitHub PR ({example.prMetadata.ciStatus})</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Synthesized Code */}
        {activeTab === "code" && (
          <div className="p-4 sm:p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono">
              <div className="text-[var(--muted)]">
                Signature: <code className="text-emerald-600 dark:text-emerald-400 font-semibold">{example.signature}</code>
              </div>
              <span className="text-[10px] text-[var(--muted)] bg-[var(--muted-bg)] px-2 py-0.5 rounded border border-[var(--border)]">
                {example.datasetContext}
              </span>
            </div>

            <div className="relative rounded-xl border border-[var(--border)] bg-[var(--muted-bg)]/60 p-4 font-mono text-xs overflow-x-auto">
              <pre className="text-emerald-600 dark:text-emerald-400 leading-relaxed">
                {example.synthesizedCode}
              </pre>
            </div>
          </div>
        )}

        {/* Tab 2: Hypothesis Unit Test */}
        {activeTab === "test" && (
          <div className="p-4 sm:p-5 space-y-4">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-[var(--muted)]">
                Property-Based Numerical Testing via <code className="text-cyan-600 dark:text-cyan-400">hypothesis</code> &amp; <code className="text-cyan-600 dark:text-cyan-400">ivy.helpers</code>
              </span>
              <span className="text-[10px] text-cyan-600 dark:text-cyan-400 font-bold bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                STRICT PARITY: atol=1e-5
              </span>
            </div>

            <div className="relative rounded-xl border border-[var(--border)] bg-[var(--muted-bg)]/60 p-4 font-mono text-xs overflow-x-auto">
              <pre className="text-cyan-600 dark:text-cyan-400 leading-relaxed">
                {example.unitTestCode}
              </pre>
            </div>

            {/* Test Matrix Execution Table */}
            <div className="rounded-xl border border-[var(--border)] overflow-hidden">
              <div className="bg-[var(--muted-bg)]/40 px-3 py-2 border-b border-[var(--border)] text-[11px] font-mono font-bold text-[var(--foreground)] uppercase">
                Property-Based Execution Results
              </div>
              <div className="divide-y divide-[var(--border)] font-mono text-xs">
                {example.testCases.map((tc, idx) => (
                  <div key={idx} className="p-2.5 flex items-center justify-between gap-3 bg-[var(--card)]">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span className="text-[var(--foreground)] font-medium">{tc.name}</span>
                    </div>
                    <div className="flex items-center gap-4 text-[11px] text-[var(--muted)]">
                      <span>Shape: <code className="text-[var(--foreground)]">{tc.inputShapes}</code></span>
                      <span className="hidden sm:inline">Dtype: <code className="text-[var(--foreground)]">{tc.dtypes}</code></span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">Δ = {tc.numericTolerance}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Automated GitHub Pull Request */}
        {activeTab === "pr" && (
          <div className="p-4 sm:p-5 space-y-4 font-mono text-xs">
            <div className="p-4 rounded-xl border border-purple-500/30 bg-purple-500/5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-bold">
                  <GitPullRequest className="w-4 h-4" />
                  <span>Pull Request #3482</span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                  ALL CI CHECKS PASSED
                </span>
              </div>

              <div className="text-sm font-bold text-[var(--foreground)]">
                {example.prMetadata.title}
              </div>

              <div className="text-[11px] text-[var(--muted)] flex items-center gap-3">
                <span>Branch: <code className="text-[var(--foreground)]">{example.prMetadata.branch}</code></span>
                <span>·</span>
                <span>+{example.prMetadata.linesAdded} lines</span>
                <span>·</span>
                <span>{example.prMetadata.filesChanged} files</span>
              </div>
            </div>

            {/* Simulated Git Commits */}
            <div className="space-y-2">
              <div className="text-[11px] font-bold text-[var(--muted)] uppercase tracking-wider">
                Autonomous Commit History
              </div>
              <div className="space-y-1.5">
                <div className="p-2.5 rounded-lg border border-[var(--border)] bg-[var(--muted-bg)]/30 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-[var(--foreground)] font-mono">ci: verify property tests across PyTorch, JAX, TF backends</span>
                  </div>
                  <span className="text-[10px] text-[var(--muted)]">e9f41b2</span>
                </div>
                <div className="p-2.5 rounded-lg border border-[var(--border)] bg-[var(--muted-bg)]/30 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-[var(--foreground)] font-mono">test: add hypothesis property tests with gradient verification</span>
                  </div>
                  <span className="text-[10px] text-[var(--muted)]">a203c19</span>
                </div>
                <div className="p-2.5 rounded-lg border border-[var(--border)] bg-[var(--muted-bg)]/30 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-[var(--foreground)] font-mono">feat: implement function wrapper conforming to framework signature</span>
                  </div>
                  <span className="text-[10px] text-[var(--muted)]">4bc8d71</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 3. Training & Performance Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono">
        <div className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--card)]">
          <div className="font-bold text-emerald-600 dark:text-emerald-400 mb-1 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5" />
            <span>1. Domain-Tuned Dataset</span>
          </div>
          <p className="text-[var(--muted)] text-[11px] leading-relaxed font-sans">
            Trained on pairs of correct backend/frontend implementations and rigorous property test suites extracted from Ivy AST commits.
          </p>
        </div>

        <div className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--card)]">
          <div className="font-bold text-cyan-600 dark:text-cyan-400 mb-1 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>2. Self-Correction Loop</span>
          </div>
          <p className="text-[var(--muted)] text-[11px] leading-relaxed font-sans">
            Failed sandbox runs feed stack traces and shape mismatches directly back into the agent context for multi-turn autonomous refinement.
          </p>
        </div>

        <div className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--card)]">
          <div className="font-bold text-purple-600 dark:text-purple-400 mb-1 flex items-center gap-1.5">
            <GitPullRequest className="w-3.5 h-3.5" />
            <span>3. 82.4% PR Merge Rate</span>
          </div>
          <p className="text-[var(--muted)] text-[11px] leading-relaxed font-sans">
            Generated over 450+ production functions, eliminating hundreds of hours of manual, repetitive API binding authoring.
          </p>
        </div>
      </div>
    </div>
  );
}

// Background SVG for InfiniteGridHero Card
export function getAutonomousCodeGenCardSvg(): string {
  return `<svg viewBox="0 0 320 180" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" fill="none">
    <defs>
      <linearGradient id="codegen-glow" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#10b981" stop-opacity="0.30"/>
        <stop offset="50%" stop-color="#06b6d4" stop-opacity="0.20"/>
        <stop offset="100%" stop-color="#8b5cf6" stop-opacity="0.10"/>
      </linearGradient>
    </defs>
    
    <!-- Code Editor Card Outline -->
    <rect x="20" y="25" width="280" height="130" rx="8" fill="url(#codegen-glow)" stroke="#10b981" stroke-opacity="0.35" stroke-width="1.2"/>
    
    <!-- Window controls -->
    <circle cx="36" cy="38" r="3" fill="#ef4444" fill-opacity="0.6"/>
    <circle cx="46" cy="38" r="3" fill="#f59e0b" fill-opacity="0.6"/>
    <circle cx="56" cy="38" r="3" fill="#10b981" fill-opacity="0.6"/>
    <line x1="20" y1="48" x2="300" y2="48" stroke="#10b981" stroke-opacity="0.2" stroke-width="1"/>

    <!-- Synthesized Code Lines -->
    <rect class="codegen-line" x="35" y="58" width="85" height="5" rx="2.5" fill="#10b981" fill-opacity="0.7"/>
    <rect class="codegen-line" x="125" y="58" width="60" height="5" rx="2.5" fill="#06b6d4" fill-opacity="0.6"/>
    
    <rect class="codegen-line" x="50" y="70" width="140" height="4.5" rx="2" fill="#94a3b8" fill-opacity="0.4"/>
    <rect class="codegen-line" x="50" y="80" width="110" height="4.5" rx="2" fill="#94a3b8" fill-opacity="0.4"/>
    <rect class="codegen-line" x="65" y="90" width="130" height="4.5" rx="2" fill="#10b981" fill-opacity="0.5"/>
    <rect class="codegen-line" x="65" y="100" width="95" height="4.5" rx="2" fill="#06b6d4" fill-opacity="0.5"/>
    
    <!-- PR & Verification Badge -->
    <rect class="codegen-ci-badge" x="205" y="118" width="85" height="24" rx="5" fill="#10b981" fill-opacity="0.2" stroke="#10b981" stroke-width="1"/>
    <text x="215" y="133" font-family="monospace" font-size="6.5" font-weight="bold" fill="#10b981">CI PASSED: 100%</text>
  </svg>`;
}
