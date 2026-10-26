"use client";

import React, { useState } from "react";
import { highlightPython } from "./PythonSyntax";
import {
  FileText,
  Boxes,
  Cpu,
  BarChart3,
  Database,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Layers,
  Zap,
  HardDrive,
  Code2,
} from "lucide-react";

interface StageDetail {
  number: string;
  name: string;
  tagline: string;
  icon: React.ReactNode;
  color: string;
  borderColor: string;
  bgColor: string;
  files: string[];
  description: string;
  components: { title: string; desc: string; detail: string }[];
  codeSnippet: string;
}

const STAGES: StageDetail[] = [
  {
    number: "01",
    name: "Crash-Resilient State Machine",
    tagline: "Automated experiment progression & preemptive failure logging",
    icon: <AlertTriangle className="w-5 h-5 text-amber-500" />,
    color: "text-amber-500",
    borderColor: "border-amber-500/30",
    bgColor: "bg-amber-500/10",
    files: ["benchmarking.py", "helpers.py:set_autotune_experiment()", "models.txt", "failed.txt"],
    description:
      "Orchestrates hundreds of multi-batch evaluations without supervision. Before running a model, it logs a preemptive 'Terminated' record into failed.txt so that fatal CUDA out-of-memory or driver kernel panics can be cleanly detected and skipped on subsequent runs.",
    components: [
      {
        title: "models.txt & results.txt",
        desc: "Tracks the corpus of Hugging Face checkpoints against completed evaluations",
        detail: "Maintains task, architecture, batch size, and execution telemetry indices.",
      },
      {
        title: "Preemptive Crash Lock",
        desc: "Guards against unhandled CUDA OOMs and segmentation faults",
        detail: "Logs failed.txt before invoking compilation; cleans up upon successful completion.",
      },
      {
        title: "Incremental Resumption",
        desc: "Detects missing setups and auto-resumes interrupted runs",
        detail: "Iterates through batch grid [1, 8, 32] without repeating passed experiments.",
      },
    ],
    codeSnippet: `# Preemptive crash guard before autotuning
save_terminated_autotune_models(model_task, model_name, batch_size)
model = build_autotune_model(model_name, architecture)
inputs = generate_autotune_inputs(model, int(batch_size))
# Executes search across compiler grid
autotuned = autotune(model, source="torch", kwargs=inputs, search_config=search_config)
# Clean up lock once execution completes safely
remove_terminated_autotune_models(model_task, model_name, batch_size)`,
  },
  {
    number: "02",
    name: "Model Introspection & Tensor Synthesis",
    tagline: "Shape-adaptive synthetic inputs across NLP, Vision, & Audio",
    icon: <Boxes className="w-5 h-5 text-cyan-500" />,
    color: "text-cyan-500",
    borderColor: "border-cyan-500/30",
    bgColor: "bg-cyan-500/10",
    files: ["helpers.py:build_autotune_model()", "helpers.py:generate_autotune_inputs()"],
    description:
      "Queries the HuggingFace Hub API to discover model architecture types. Dynamically inspects the forward signature via Python inspect.signature to construct calibrated dummy tensors matching exact spatial dimensions and sequence lengths.",
    components: [
      {
        title: "Hub API Introspection",
        desc: "Resolves model configuration, architectures, and hidden dimensions",
        detail: "Queries HfApi().model_info(repo_id=ckpt) to retrieve model_type and architectures.",
      },
      {
        title: "NLP Sequence Generator",
        desc: "Generates input_ids, attention_mask, & decoder_input_ids",
        detail: "Synthesizes token id batches [B, 5] and decoder tensors [B, 10] for Seq2Seq.",
      },
      {
        title: "Vision & Audio Synthesizer",
        desc: "Constructs 4D image pixel buffers and high-sample audio arrays",
        detail: "Extracts image_size for pixel_values [B, 3, H, W] and input_values [B, 93680].",
      },
    ],
    codeSnippet: `def generate_autotune_inputs(model, batch_size):
    input_indices = list(inspect.signature(model.forward).parameters.keys())
    if "input_ids" in input_indices:
        inputs["input_ids"] = torch.randint(0, 20, (batch_size, 5))
        if "attention_mask" in input_indices:
            inputs["attention_mask"] = torch.randint(1, 2, (batch_size, 5))
    if "pixel_values" in input_indices:
        img_size = get_config_attribute_value(model.config.to_dict(), "image_size") or 224
        inputs["pixel_values"] = torch.rand((batch_size, 3, img_size, img_size))
    return inputs`,
  },
  {
    number: "03",
    name: "Multi-Backend Transpiler & Compiler Grid",
    tagline: "Cross-framework IR lowering to JAX, Inductor, ONNX, & TVM",
    icon: <Cpu className="w-5 h-5 text-emerald-500" />,
    color: "text-emerald-500",
    borderColor: "border-emerald-500/30",
    bgColor: "bg-emerald-500/10",
    files: ["autotune.autotune()", "Ivy AST Graph Tracer", "Unified Intermediate Representation"],
    description:
      "Lowers the source PyTorch graph into Ivy's unified intermediate representation, then re-targets it across a cross-compiler matrix: JAX (XLA JIT), PyTorch 2.0 Inductor, NVPrims NvFuser, CUDA Graphs, Apache TVM, TorchScript, and ONNX Runtime.",
    components: [
      {
        title: "JAX XLA JIT Pipeline",
        desc: "Fuses memory-bound attention kernels into monolithic XLA kernels",
        detail: "Lowers to jax.jit with x64 precision enabled; eliminates Python runtime dispatch.",
      },
      {
        title: "PyTorch 2.0 Inductor Modes",
        desc: "Evaluates default, reduce-overhead, and max-autotune compilation flags",
        detail: "Leverages OpenAI Triton backend to autotune matrix multiplication block tile sizes.",
      },
      {
        title: "Hardware Backends",
        desc: "Parallel compilation for NVIDIA CUDA 11.8 / A100 GPU:0 and Intel Xeon CPU",
        detail: "Profiles device-level memory allocators, pinned memory transfers, and host dispatch.",
      },
    ],
    codeSnippet: `# Multi-compiler transpilation execution
autotuned = autotune(
    model,
    source="torch",
    kwargs=inputs,
    search_config={
        "include": {
            "frameworks": ["jax", "torch", "tensorflow"],
            "devices": ["gpu:0", "cpu"],
            "torch_backends": ["inductor", "onnxrt", "nvprims_nvfuser", "cudagraphs", "tvm"],
            "torch_modes": ["default", "reduce-overhead", "max-autotune"]
        }
    }
)`,
  },
  {
    number: "04",
    name: "Dual-Metric Profiler & Parity Verifier",
    tagline: "High-precision CUDA latency, peak VRAM, and numerical loss bounds",
    icon: <BarChart3 className="w-5 h-5 text-purple-500" />,
    color: "text-purple-500",
    borderColor: "border-purple-500/30",
    bgColor: "bg-purple-500/10",
    files: ["time.perf_counter()", "torch.cuda.max_memory_allocated()", "helpers.py:format_results()"],
    description:
      "Performs isolated execution loops after warmup passes. Synchronizes CUDA hardware streams to measure sub-millisecond execution latency, queries hardware memory pools for peak VRAM usage, and verifies mathematical parity against native uncompiled baseline.",
    components: [
      {
        title: "Stream-Synchronized Latency",
        desc: "Isolates kernel execution times from asynchronous host dispatch overhead",
        detail: "Measures wall-clock latency with perf_counter() and CUDA event stream barriers.",
      },
      {
        title: "Peak VRAM Allocation",
        desc: "Monitors memory allocation peaks across tensor buffers",
        detail: "Tracks torch.cuda.max_memory_allocated() to identify static buffer savings.",
      },
      {
        title: "Numerical Error Bounds",
        desc: "Verifies RMSE parity against uncompiled baseline predictions",
        detail: "Enforces strict tolerance threshold: RMSE ≤ 10⁻⁴ (typical results: 2.1e-5).",
      },
    ],
    codeSnippet: `# Profiling telemetry schema per backend
{
    ('jax', 'default', 'default', 'gpu:0'): {
        'runtime': 0.00312,           # 3.12 ms (6.15x speedup)
        'memory_usage': 0.0342,       # 34.2 MB peak VRAM (-85.9%)
        'rmse_error': 2.98e-05,       # Validated exact mathematical parity
        'error': 'nan'                # Zero compilation failure
    }
}`,
  },
  {
    number: "05",
    name: "Multi-Index Union & Pareto Optimizer",
    tagline: "Cross-sectional speedup matrices & optimal deployment discovery",
    icon: <Database className="w-5 h-5 text-blue-500" />,
    color: "text-blue-500",
    borderColor: "border-blue-500/30",
    bgColor: "bg-blue-500/10",
    files: ["helpers.py:sync_and_sort()", "helpers.py:get_search_config()", "Autotune Benchmarking.xlsx"],
    description:
      "Merges multi-level index results into a unified schema across all historical models. Re-indexes missing setups, computes cross-sectional speedup matrices, and highlights the global optimal execution engine per task, architecture, and batch size.",
    components: [
      {
        title: "Multi-Index Reindexing",
        desc: "Unions [framework, backend, mode, device] levels across all runs",
        detail: "Executes sync_and_sort() to maintain a coherent global benchmark database.",
      },
      {
        title: "Cross-Sectional Matrix",
        desc: "Calculates NxN relative speedup matrix between all compiler configurations",
        detail: "Row i vs Column j comparisons identify relative speedups across frameworks.",
      },
      {
        title: "Champion Engine Selection",
        desc: "Determines winning deployment backend based on latency & VRAM constraints",
        detail: "Outputs optimal deployment targets (e.g. JAX XLA GPU for transformer inference).",
      },
    ],
    codeSnippet: `def sync_and_sort():
    # Computes unified multi-index across all completed experiments
    union_index = base_df.index
    for row in rows[2:]:
        results_df = format_results(row.split("§")[-1], to_dataframe=True)
        union_index = results_df.index.union(union_index)
    # Re-indexes all experiments and sorts alphabetically by (task, model, batch)
    for row in rows[1:]:
        reindexed = format_results(raw).reindex(union_index)
        experiments.append(reindexed)`,
  },
];

export function TranspilationBenchmarkingArchitecture() {
  const [activeStage, setActiveStage] = useState<number>(0);
  const stage = STAGES[activeStage];

  return (
    <div className="w-full space-y-6">
      {/* 1. Header Overview Banner */}
      <div className="p-4 sm:p-5 rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-[var(--border)]">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
              HARNESS PIPELINE
            </span>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--foreground)]">
              5-Stage Transpilation &amp; Autotune Engine
            </span>
          </div>
          <span className="text-[11px] font-mono text-[var(--muted)]">
            Ground Truth: <code className="text-[var(--foreground)] font-mono">benchmarking.py</code> + <code className="text-[var(--foreground)] font-mono">helpers.py</code>
          </span>
        </div>

        {/* 5 Stepper Stage Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {STAGES.map((st, idx) => {
            const isActive = activeStage === idx;
            return (
              <button
                key={st.number}
                onClick={() => setActiveStage(idx)}
                className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                  isActive
                    ? `${st.borderColor} ${st.bgColor} shadow-xs`
                    : "border-[var(--border)] bg-[var(--muted-bg)]/30 hover:border-[var(--border)]/90"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono font-bold text-[var(--muted)]">
                    {st.number}
                  </span>
                  <div className="scale-75 origin-top-right">{st.icon}</div>
                </div>
                <div className={`text-xs font-semibold leading-tight ${isActive ? "text-[var(--foreground)] font-bold" : "text-[var(--muted)]"}`}>
                  {st.name.split(" ")[0]} {st.name.split(" ")[1]}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Active Stage In-Depth Inspector */}
      <div className="p-5 sm:p-6 rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-xs space-y-5">
        {/* Stage Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[var(--border)]">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl ${stage.bgColor} border ${stage.borderColor} flex items-center justify-center shrink-0`}>
              {stage.icon}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-mono font-bold uppercase tracking-wider ${stage.color}`}>
                  STAGE {stage.number}
                </span>
                <span className="text-xs text-[var(--muted)]">·</span>
                <span className="text-xs font-mono text-[var(--muted)]">{stage.tagline}</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-[var(--foreground)]">
                {stage.name}
              </h3>
            </div>
          </div>

          {/* Reference Source Files */}
          <div className="flex flex-wrap items-center gap-1.5">
            {stage.files.map((file, i) => (
              <span
                key={i}
                className="px-2 py-0.5 rounded text-[10px] font-mono bg-[var(--muted-bg)] border border-[var(--border)] text-[var(--muted)]"
              >
                {file}
              </span>
            ))}
          </div>
        </div>

        {/* Narrative Description */}
        <p className="text-xs sm:text-sm text-[var(--foreground)] leading-relaxed">
          {stage.description}
        </p>

        {/* 3 Core Architecture Sub-Components */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {stage.components.map((c, i) => (
            <div
              key={i}
              className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--muted-bg)]/40 space-y-1.5"
            >
              <div className="text-xs font-bold font-mono text-[var(--foreground)] flex items-center gap-1.5">
                <span className={`w-1.5 h-1.5 rounded-full ${stage.color.replace("text-", "bg-")}`} />
                <span>{c.title}</span>
              </div>
              <p className="text-[11px] text-[var(--foreground)] font-medium leading-snug">
                {c.desc}
              </p>
              <p className="text-[10px] text-[var(--muted)] leading-relaxed font-mono">
                {c.detail}
              </p>
            </div>
          ))}
        </div>

        {/* Code / Implementation Excerpt */}
        <div className="rounded-xl border border-[var(--border)] bg-[var(--muted-bg)]/60 p-3.5 font-mono text-[11px]">
          <div className="flex items-center justify-between text-[10px] text-[var(--muted)] uppercase tracking-wider mb-2 pb-1.5 border-b border-[var(--border)]/60">
            <div className="flex items-center gap-1.5">
              <Code2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>Implementation Blueprint ({stage.files[0]})</span>
            </div>
            <span>Python 3.10 · CUDA 11.8</span>
          </div>
          <pre className="overflow-x-auto text-[var(--foreground)] leading-relaxed font-mono">
            <code>{highlightPython(stage.codeSnippet)}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
