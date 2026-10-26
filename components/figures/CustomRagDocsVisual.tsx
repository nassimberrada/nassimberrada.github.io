"use client";

import React, { useState } from "react";
import {
  Search,
  BookOpen,
  GitBranch,
  GitCommit,
  CheckCircle2,
  FileCode,
  Sparkles,
  Copy,
  Check,
  Bot,
  User,
  ShieldCheck,
  Code2,
  RefreshCw,
  Layers,
} from "lucide-react";

interface QueryPreset {
  id: string;
  label: string;
  category: string;
  userQuery: string;
  answerText: string;
  codeSnippet: string;
  citedSource: {
    repo: string;
    branch: string;
    commitSha: string;
    filePath: string;
    lineRange: string;
    symbolName: string;
    denseScore: number;
    bm25Score: number;
    combinedRrfScore: number;
    sourceCodeSnippet: string;
  };
}

const QUERY_PRESETS: QueryPreset[] = [
  {
    id: "jax-conv",
    label: "JAX Dynamic Shapes in conv2d",
    category: "Backend JIT",
    userQuery:
      "How does the JAX backend in Ivy handle dynamic spatial dimensions and dilations during lax.conv_general_dilated compilation?",
    answerText:
      "The JAX backend expands scalar strides and dilations into explicit spatial tuples [1, s_h, s_w, 1]. For dynamic input shapes under jax.jit, it constructs dimension numbers matching the active data_format (NHWC vs NCHW) to preserve symbolic shape polymorphism without triggering recompilation stalls.",
    codeSnippet: `def conv2d(x, filters, strides, padding, data_format="NHWC", dilations=1):
    strides = [1] + [strides] * 2 + [1] if isinstance(strides, int) else strides
    dilations = [1] + [dilations] * 2 + [1] if isinstance(dilations, int) else dilations
    padding = padding.upper()
    dimension_numbers = ("NHWC", "HWIO", "NHWC") if data_format == "NHWC" else ("NCHW", "OIHW", "NCHW")
    
    # Executes JIT-fused dilated spatial convolution
    return lax.conv_general_dilated(
        lhs=x, rhs=filters, window_strides=strides[1:3],
        padding=padding, lhs_dilation=None,
        rhs_dilation=dilations[1:3], dimension_numbers=dimension_numbers
    )`,
    citedSource: {
      repo: "unifyai/ivy",
      branch: "main",
      commitSha: "7f8a91c",
      filePath: "ivy/functional/backends/jax/layers.py",
      lineRange: "L82-L115",
      symbolName: "def conv2d(...) -> Array",
      denseScore: 0.94,
      bm25Score: 18.6,
      combinedRrfScore: 0.982,
      sourceCodeSnippet: `82 | def conv2d(x, filters, strides, padding, data_format="NHWC", dilations=1):
83 |     """JAX implementation of 2D spatial convolution with JIT support."""
84 |     strides = [1] + [strides] * 2 + [1] if isinstance(strides, int) else strides
85 |     dilations = [1] + [dilations] * 2 + [1] if isinstance(dilations, int) else dilations
86 |     padding = padding.upper()
87 |     dimension_numbers = ("NHWC", "HWIO", "NHWC") if data_format == "NHWC" else ...
88 |     return lax.conv_general_dilated(lhs=x, rhs=filters, window_strides=strides[1:3], ...)`,
    },
  },
  {
    id: "torch-gelu",
    label: "PyTorch GELU Tanh Parity",
    category: "Frontend Parity",
    userQuery:
      "Where in the PyTorch frontend does Ivy map nn.functional.gelu, and how is the tanh numerical approximation implemented?",
    answerText:
      "The PyTorch frontend implements nn.functional.gelu in ivy/functional/frontends/torch/nn/functional.py. When approximate='tanh', it computes the cubic polynomial expansion 0.5x · (1 + tanh(√(2/π) · (x + 0.044715x³))) using native Ivy primitives (ivy.erf, ivy.tanh), ensuring mathematical gradient parity across backends.",
    codeSnippet: `def gelu(input, approximate="none"):
    if approximate == "none":
        return ivy.multiply(
            0.5, ivy.multiply(input, ivy.add(1.0, ivy.erf(ivy.divide(input, ivy.sqrt(2.0)))))
        )
    elif approximate == "tanh":
        inner = ivy.multiply(
            ivy.sqrt(2.0 / ivy.pi),
            ivy.add(input, ivy.multiply(0.044715, ivy.pow(input, 3)))
        )
        return ivy.multiply(0.5, ivy.multiply(input, ivy.add(1.0, ivy.tanh(inner))))
    raise ValueError(f"Invalid approximate argument: {approximate}")`,
    citedSource: {
      repo: "unifyai/ivy-frontends",
      branch: "master",
      commitSha: "e48b109",
      filePath: "ivy/functional/frontends/torch/nn/functional.py",
      lineRange: "L42-L68",
      symbolName: "def gelu(input, approximate='none')",
      denseScore: 0.96,
      bm25Score: 21.2,
      combinedRrfScore: 0.991,
      sourceCodeSnippet: `42 | def gelu(input, approximate="none"):
43 |     """PyTorch frontend wrapper for Gaussian Error Linear Units (GELU)."""
44 |     if approximate == "none":
45 |         return ivy.multiply(0.5, ivy.multiply(input, ivy.add(1.0, ivy.erf(...))))
46 |     elif approximate == "tanh":
47 |         inner = ivy.multiply(ivy.sqrt(2.0 / ivy.pi), ivy.add(input, ...))
48 |         return ivy.multiply(0.5, ivy.multiply(input, ivy.add(1.0, ivy.tanh(inner))))`,
    },
  },
  {
    id: "rfc-tracer",
    label: "RFC-042: Graph Tracing Passes",
    category: "Architecture RFC",
    userQuery:
      "What is the pipeline sequence for symbolic AST graph tracing specified in RFC-042?",
    answerText:
      "According to internal engineering design RFC-042 (compiler-tracer-passes.md), the Ivy graph tracer executes three sequential phases: (1) AST Extraction & Node Normalization, (2) Symbolic Shape & Dtype Inference Propagation, and (3) Operator Canonicalization & Dead Code Elimination (DCE) before backend lowering.",
    codeSnippet: `class IvyGraphTracer:
    def trace(self, fn, *args, **kwargs):
        # Phase 1: Symbol discovery & AST traversal
        raw_graph = self.extract_ast_nodes(fn)
        
        # Phase 2: Forward symbolic shape & dtype propagation
        propagated_graph = self.propagate_shapes_and_dtypes(raw_graph, args, kwargs)
        
        # Phase 3: Operator canonicalization & DCE
        optimized_ir = self.apply_compiler_passes(propagated_graph, passes=[
            CanonicalizeElementwisePass(),
            DeadCodeEliminationPass(),
            BackendDispatchLoweringPass()
        ])
        return optimized_ir`,
    citedSource: {
      repo: "unifyai/eng-docs",
      branch: "main",
      commitSha: "a93c771",
      filePath: "docs/rfcs/042-compiler-tracer-passes.md",
      lineRange: "L18-L46",
      symbolName: "RFC-042: Graph Tracing Pipeline Spec",
      denseScore: 0.91,
      bm25Score: 16.9,
      combinedRrfScore: 0.964,
      sourceCodeSnippet: `18 | ## 3. Compiler Pass Execution Sequence
19 | The Ivy graph tracer follows a deterministic three-stage pipeline:
20 | 1. **AST Node Extraction**: Builds functional DAG from Python bytecode.
21 | 2. **Shape/Dtype Forward Propagation**: Infers dynamic bounds.
22 | 3. **Pass Scheduling**: Applies DCE, constant folding, and lowering.`,
    },
  },
];

const REPOSITORIES = [
  { name: "unifyai/ivy", branch: "main", chunks: "14.2k", status: "Synced 2m ago" },
  { name: "ivy-frontends", branch: "master", chunks: "8.6k", status: "Synced 8m ago" },
  { name: "ivy-backends", branch: "master", chunks: "6.1k", status: "Synced 15m ago" },
  { name: "eng-docs/rfcs", branch: "main", chunks: "1.9k", status: "Live Webhook" },
];

export function CustomRagDocsVisual() {
  const [selectedPresetId, setSelectedPresetId] = useState<string>("jax-conv");
  const [copied, setCopied] = useState<boolean>(false);

  const preset =
    QUERY_PRESETS.find((p) => p.id === selectedPresetId) || QUERY_PRESETS[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(preset.codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full space-y-4 select-none font-sans">
      {/* 1. Decluttered Top Control Bar: Query Selector & Live Knowledge Repositories */}
      <div className="p-3.5 sm:p-4 rounded-xl border border-[var(--border)] bg-[var(--card)] shadow-xs space-y-3">
        {/* Top: Preset Inquiries */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div className="flex flex-col gap-1.5 w-full md:w-auto">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--muted)] flex items-center gap-1.5">
              <Search className="w-3.5 h-3.5 text-emerald-500" />
              <span>Interactive Developer Inquiries</span>
            </span>
            <div className="flex flex-wrap gap-1.5">
              {QUERY_PRESETS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedPresetId(item.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer border ${
                    selectedPresetId === item.id
                      ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-600 dark:text-emerald-400 font-semibold shadow-2xs"
                      : "border-[var(--border)] bg-[var(--muted-bg)]/40 text-[var(--muted)] hover:text-[var(--foreground)]"
                  }`}
                >
                  <span className="text-[9px] uppercase font-bold mr-1.5 px-1 py-0.2 rounded bg-[var(--muted-bg)] border border-[var(--border)] text-[var(--foreground)]">
                    {item.category}
                  </span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Real-time Status */}
          <div className="flex items-center gap-2 text-xs font-mono border-t md:border-t-0 md:border-l border-[var(--border)] pt-2 md:pt-0 md:pl-4">
            <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Qdrant + BM25 Hybrid Sync</span>
            </div>
            <span className="text-[10px] text-[var(--muted)] hidden sm:inline">
              · 30.8k AST Vectors
            </span>
          </div>
        </div>

        {/* Bottom Strip: Connected Multi-Repo Status Tags */}
        <div className="pt-2.5 border-t border-[var(--border)] flex flex-wrap items-center gap-2 text-[11px] font-mono">
          <span className="text-[10px] text-[var(--muted)] uppercase font-semibold flex items-center gap-1 mr-1">
            <BookOpen className="w-3 h-3 text-cyan-500" />
            <span>Synced Repos:</span>
          </span>
          {REPOSITORIES.map((repo, idx) => (
            <div
              key={idx}
              className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-[var(--muted-bg)]/60 border border-[var(--border)] text-[var(--foreground)]"
            >
              <GitBranch className="w-2.5 h-2.5 text-emerald-500" />
              <span className="font-semibold text-[10px]">{repo.name}</span>
              <span className="text-[9px] text-[var(--muted)]">({repo.chunks})</span>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Balanced 2-Panel Layout: [Left (60%): Chat & Code | Right (40%): Grounded Citation Inspector] */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* ================================================================= */}
        {/* PANEL 1: AI Assistant Chat & Code Canvas (lg:col-span-7)          */}
        {/* ================================================================= */}
        <div className="lg:col-span-7 rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 sm:p-5 shadow-xs space-y-4 min-w-0 overflow-hidden flex flex-col justify-between">
          <div className="space-y-4 min-w-0">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[var(--border)]">
              <div className="flex items-center gap-2">
                <Bot className="w-4 h-4 text-emerald-500" />
                <span className="text-xs font-mono font-bold text-[var(--foreground)]">
                  Ivy Knowledge Assistant
                </span>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                Grounded Mode
              </span>
            </div>

            {/* User Message Bubble */}
            <div className="flex items-start gap-2.5 min-w-0">
              <div className="w-7 h-7 rounded-lg bg-[var(--muted-bg)] border border-[var(--border)] flex items-center justify-center shrink-0 mt-0.5 text-[var(--muted)]">
                <User className="w-4 h-4" />
              </div>
              <div className="p-3 rounded-2xl rounded-tl-sm bg-[var(--muted-bg)]/60 border border-[var(--border)] text-xs text-[var(--foreground)] leading-relaxed shadow-2xs font-sans min-w-0 break-words flex-1">
                {preset.userQuery}
              </div>
            </div>

            {/* Assistant Response Bubble */}
            <div className="flex items-start gap-2.5 min-w-0">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center shrink-0 mt-0.5 text-emerald-500">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="space-y-3 flex-1 min-w-0">
                {/* Text Bubble with Clean Wrap */}
                <div className="p-3.5 rounded-2xl rounded-tl-sm bg-[var(--card)] border border-[var(--border)] text-xs text-[var(--foreground)] leading-relaxed shadow-sm space-y-2.5 font-sans min-w-0">
                  <p className="break-words">{preset.answerText}</p>

                  {/* Inline Verified Source Badge */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-[var(--border)] text-[11px] font-mono">
                    <span className="text-[10px] text-[var(--muted)]">Verified Source:</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/20 flex items-center gap-1 text-[10px] break-all">
                      <FileCode className="w-3 h-3 shrink-0" />
                      <span>{preset.citedSource.filePath}:{preset.citedSource.lineRange}</span>
                    </span>
                  </div>
                </div>

                {/* Code Block with Copy Button */}
                <div className="rounded-xl border border-[var(--border)] bg-[var(--muted-bg)]/80 overflow-hidden font-mono text-xs shadow-2xs min-w-0">
                  <div className="flex items-center justify-between px-3 py-1.5 bg-[var(--muted-bg)] border-b border-[var(--border)] text-[10px] text-[var(--muted)]">
                    <div className="flex items-center gap-1.5 truncate">
                      <Code2 className="w-3 h-3 text-emerald-500 shrink-0" />
                      <span className="truncate">{preset.citedSource.filePath.split("/").slice(-1)[0]}</span>
                    </div>
                    <button
                      onClick={handleCopy}
                      className="flex items-center gap-1 hover:text-[var(--foreground)] transition-colors cursor-pointer shrink-0 ml-2"
                    >
                      {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                      <span>{copied ? "Copied" : "Copy"}</span>
                    </button>
                  </div>
                  <pre className="p-3 overflow-x-auto text-emerald-600 dark:text-emerald-400 leading-relaxed text-[11px]">
                    {preset.codeSnippet}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* PANEL 2: Grounded Citation Inspector & AST Slice (lg:col-span-5) */}
        {/* ================================================================= */}
        <div className="lg:col-span-5 rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 sm:p-5 shadow-xs space-y-3.5 min-w-0 overflow-hidden flex flex-col justify-between">
          <div className="space-y-3.5 min-w-0">
            {/* Header */}
            <div className="flex items-center justify-between pb-2.5 border-b border-[var(--border)]">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[var(--foreground)] flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>Grounded Chunk Inspector</span>
              </span>
              <span className="px-1.5 py-0.2 rounded text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/20">
                {(preset.citedSource.combinedRrfScore * 100).toFixed(1)}% Match
              </span>
            </div>

            {/* Target Metadata Card */}
            <div className="p-3 rounded-lg border border-[var(--border)] bg-[var(--muted-bg)]/40 text-xs font-mono space-y-1.5 min-w-0">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-[var(--muted)]">Repository</span>
                <span className="font-bold text-[var(--foreground)] truncate ml-2">
                  {preset.citedSource.repo} @ {preset.citedSource.commitSha}
                </span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-[var(--muted)]">File Anchor</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                  {preset.citedSource.lineRange}
                </span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-[var(--muted)]">AST Target</span>
                <span className="text-[var(--foreground)] truncate ml-2">
                  {preset.citedSource.symbolName}
                </span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-[var(--muted)]">Hybrid Score</span>
                <span className="text-[var(--foreground)]">
                  Dense: {preset.citedSource.denseScore.toFixed(2)} · BM25: {preset.citedSource.bm25Score.toFixed(1)}
                </span>
              </div>
            </div>

            {/* Retrieved Context Slice */}
            <div className="space-y-1.5 min-w-0">
              <div className="text-[10px] font-mono text-[var(--muted)] uppercase tracking-wider flex items-center justify-between">
                <span>Retrieved Context Slice (Qdrant Payload)</span>
                <span>Python AST</span>
              </div>
              <div className="rounded-lg border border-[var(--border)] bg-[var(--muted-bg)]/70 p-3 font-mono text-[10.5px] overflow-x-auto min-w-0">
                <pre className="text-[var(--foreground)] leading-relaxed font-mono opacity-90 whitespace-pre-wrap break-words">
                  {preset.citedSource.sourceCodeSnippet}
                </pre>
              </div>
            </div>

            {/* Grounding & Webhook Notice */}
            <div className="p-2.5 rounded-lg border border-cyan-500/30 bg-cyan-500/5 text-[10.5px] font-mono text-[var(--muted)] space-y-1 min-w-0">
              <div className="font-bold text-cyan-600 dark:text-cyan-400 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 shrink-0" />
                <span>Strict Grounding Contract</span>
              </div>
              <p className="leading-snug break-words">
                Every code statement is strictly cross-referenced against git commit tree {preset.citedSource.commitSha}. If retrieval confidence falls below 0.75, the agent safely refuses to answer.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Background SVG for InfiniteGridHero Card
export function getRagDocsAssistantCardSvg(): string {
  return `<svg viewBox="0 0 320 180" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" fill="none">
    <defs>
      <linearGradient id="rag-bg-glow" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#06b6d4" stop-opacity="0.25"/>
        <stop offset="50%" stop-color="#10b981" stop-opacity="0.20"/>
        <stop offset="100%" stop-color="#3b82f6" stop-opacity="0.10"/>
      </linearGradient>
    </defs>
    
    <!-- Outer Application Frame -->
    <rect x="20" y="20" width="280" height="140" rx="10" fill="url(#rag-bg-glow)" stroke="#06b6d4" stroke-opacity="0.3" stroke-width="1.2"/>
    
    <!-- Left Pane: Chat Conversation & Code Canvas -->
    <rect x="30" y="32" width="165" height="116" rx="6" fill="currentColor" fill-opacity="0.03" stroke="currentColor" stroke-opacity="0.1" stroke-width="0.8"/>
    
    <!-- User Bubble -->
    <rect class="rag-user-message" x="75" y="40" width="112" height="14" rx="4" fill="#10b981" fill-opacity="0.2" stroke="#10b981" stroke-opacity="0.4"/>
    <rect x="83" y="45" width="85" height="4" rx="2" fill="#10b981" fill-opacity="0.8"/>
    
    <!-- Assistant Bubble with Code -->
    <rect x="38" y="60" width="150" height="20" rx="4" fill="currentColor" fill-opacity="0.06"/>
    <rect x="44" y="66" width="125" height="3.5" rx="1.5" fill="currentColor" fill-opacity="0.5"/>
    <rect x="44" y="72" width="95" height="3.5" rx="1.5" fill="currentColor" fill-opacity="0.4"/>
    
    <!-- Code Box -->
    <rect x="38" y="85" width="150" height="50" rx="4" fill="#0f172a" stroke="#10b981" stroke-opacity="0.3" stroke-width="0.8"/>
    <rect x="44" y="93" width="90" height="3.5" rx="1.5" fill="#10b981" fill-opacity="0.7"/>
    <rect x="44" y="101" width="70" height="3" rx="1.5" fill="#38bdf8" fill-opacity="0.6"/>
    <rect x="52" y="108" width="80" height="3" rx="1.5" fill="#94a3b8" fill-opacity="0.5"/>
    <rect x="52" y="115" width="60" height="3" rx="1.5" fill="#94a3b8" fill-opacity="0.5"/>
    
    <!-- Right Pane: Citation Card -->
    <rect x="205" y="32" width="85" height="116" rx="6" fill="currentColor" fill-opacity="0.04" stroke="#10b981" stroke-opacity="0.3" stroke-width="0.8"/>
    <rect x="213" y="40" width="45" height="5" rx="2.5" fill="#10b981" fill-opacity="0.8"/>
    <rect class="rag-citation-match" x="213" y="52" width="68" height="24" rx="3" fill="#10b981" fill-opacity="0.1" stroke="#10b981" stroke-opacity="0.3"/>
    <text x="217" y="66" font-family="monospace" font-size="5" font-weight="bold" fill="#10b981">97.4% MATCH</text>
    <rect x="213" y="82" width="68" height="52" rx="3" fill="currentColor" fill-opacity="0.05"/>
    <rect x="217" y="90" width="55" height="3" rx="1.5" fill="currentColor" fill-opacity="0.4"/>
    <rect x="217" y="97" width="45" height="3" rx="1.5" fill="currentColor" fill-opacity="0.3"/>
  </svg>`;
}
