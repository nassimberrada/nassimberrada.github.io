"use client";

import React, { useState } from "react";
import { highlightPython } from "./PythonSyntax";
import {
  Database,
  Filter,
  Layers,
  Sparkles,
  Bot,
  Cpu,
  CheckCircle2,
  Code2,
  GitBranch,
  Terminal,
  Workflow,
  Zap,
} from "lucide-react";

interface TrainingStage {
  number: string;
  name: string;
  tagline: string;
  icon: React.ReactNode;
  color: string;
  borderColor: string;
  bgColor: string;
  description: string;
  components: { title: string; desc: string; detail: string }[];
  codeSnippet: string;
}

const TRAINING_STAGES: TrainingStage[] = [
  {
    number: "01",
    name: "Corpus Mining & AST Extraction",
    tagline: "Mining validated functions & tests across PyTorch, JAX, TF, and NumPy",
    icon: <Database className="w-5 h-5 text-amber-500" />,
    color: "text-amber-500",
    borderColor: "border-amber-500/30",
    bgColor: "bg-amber-500/10",
    description:
      "Recursively parses the entire Ivy repository commit history and Git tree via Python's ast module. Traverses both ivy/functional/frontends/<framework>/ (frontend wrappers) and ivy/functional/backends/<framework>/ (native compiler implementations), pairing every validated function with its associated hypothesis unit test.",
    components: [
      {
        title: "AST Function-Test Linker",
        desc: "Links implementation AST nodes directly to their corresponding test file targets",
        detail: "Pairs ivy.functional.frontends.torch.* with ivy_tests/test_ivy/test_frontends/test_torch/*.",
      },
      {
        title: "Multi-Framework Cross Sampling",
        desc: "Mines across PyTorch, JAX, TensorFlow, and NumPy to establish cross-framework patterns",
        detail: "Extracts 6,800+ validated (implementation, test) pairs across 4 framework ecosystems.",
      },
      {
        title: "Commit Delta & Evolution History",
        desc: "Extracts historic bug-fix commits showing how faulty functions were corrected",
        detail: "Captures negative-to-positive commit transitions to train self-debugging capabilities.",
      },
    ],
    codeSnippet: `# 1. AST Mining & Function-Test Pairing Script
def mine_ivy_corpus(repo_path):
    pairs = []
    for fw in ["torch", "jax", "tensorflow", "numpy"]:
        frontend_dir = os.path.join(repo_path, f"ivy/functional/frontends/{fw}")
        test_dir = os.path.join(repo_path, f"ivy_tests/test_ivy/test_frontends/test_{fw}")
        for fn_node, meta in parse_ast_functions(frontend_dir):
            matching_test = find_corresponding_hypothesis_test(test_dir, fn_node.name)
            if matching_test and verify_ci_passed(meta.commit_hash):
                pairs.append({"fw": fw, "fn": fn_node, "test": matching_test, "doc": meta.docstring})
    return pairs`,
  },
  {
    number: "02",
    name: "Dataset Construction & AST Normalization",
    tagline: "Deduplication, signature standardization, & supervised instruction formatting",
    icon: <Filter className="w-5 h-5 text-cyan-500" />,
    color: "text-cyan-500",
    borderColor: "border-cyan-500/30",
    bgColor: "bg-cyan-500/10",
    description:
      "Cleans and normalizes the mined AST corpus into an instruction-tuning format. Standardizes type annotations, expands docstrings into Sphinx format, extracts ground-truth native framework signatures, and structures input-output token sequences into multi-turn programming objectives.",
    components: [
      {
        title: "Instruction Tuple Serialization",
        desc: "Formats tasks as: (Framework Signature + Docstring + Backend Primitives → Code + Test)",
        detail: "Ensures model learns to generate both the operational wrapper and its unit test simultaneously.",
      },
      {
        title: "AST Canonicalization & Linters",
        desc: "Runs black, flake8, and isort to enforce uniform whitespace and syntax structures",
        detail: "Strips non-functional formatting noise and standardizes variable naming conventions.",
      },
      {
        title: "Stratified Framework Partitioning",
        desc: "Splits 80/10/10 across function categories (math, layers, activations, reductions)",
        detail: "Guarantees zero target API leakage between training set and evaluation benchmarks.",
      },
    ],
    codeSnippet: `# 2. Structured Supervised Dataset Sample Schema
{
  "instruction": "Implement the missing PyTorch frontend function 'torch.nn.functional.gelu' and its property test.",
  "context": {
    "framework": "torch",
    "domain": "frontend",
    "signature": "gelu(input, approximate='none') -> Tensor",
    "native_docstring": "Gaussian Error Linear Units activation function...",
    "available_ivy_primitives": ["ivy.multiply", "ivy.add", "ivy.erf", "ivy.sqrt", "ivy.tanh", "ivy.pow"]
  },
  "target_implementation": "def gelu(input, approximate='none'):\\n    ...",
  "target_hypothesis_test": "@given(input_and_dtype=helpers.dtype_and_values(...))\\ndef test_torch_gelu(...):\\n    ..."
}`,
  },
  {
    number: "03",
    name: "Multi-Task Supervised Fine-Tuning (SFT)",
    tagline: "Fine-tuning CodeLlama/StarCoder on causal language modeling over code tokens",
    icon: <Cpu className="w-5 h-5 text-emerald-500" />,
    color: "text-emerald-500",
    borderColor: "border-emerald-500/30",
    bgColor: "bg-emerald-500/10",
    description:
      "Fine-tunes base open code foundation models (CodeLlama-13B / StarCoder-15B) using multi-task cross-entropy loss with FlashAttention-2. The training objective covers three interleaved tasks: (A) Function Synthesis, (B) Hypothesis Test Authoring, and (C) Traceback-Conditioned Repair.",
    components: [
      {
        title: "Context-Length & Packing",
        desc: "4,096 token sequence length packed with multi-file implementation and test context",
        detail: "Leverages FlashAttention-2 and Rotary Positional Embeddings (RoPE) for long AST context.",
      },
      {
        title: "Loss Masking & Selective Backprop",
        desc: "Loss is calculated exclusively over generated code and test tokens (labels masked on prompt)",
        detail: "Prevents gradient corruption from prompt boilerplate and docstring tokens.",
      },
      {
        title: "DeepSpeed ZeRO-3 & LoRA / Full SFT",
        desc: "Trained across 8x NVIDIA A100 (80GB) SXM4 nodes with cosine learning rate schedule",
        detail: "Target learning rate 2e-5 with warm-up over 500 steps and weight decay 0.01.",
      },
    ],
    codeSnippet: `# 3. Supervised Fine-Tuning Training Loop
model = AutoModelForCausalLM.from_pretrained("codellama/CodeLlama-13b-Python-hf")
training_args = TrainingArguments(
    output_dir="./ivy-codegen-agent-v1",
    learning_rate=2e-5,
    per_device_train_batch_size=4,
    gradient_accumulation_steps=8,
    lr_scheduler_type="cosine",
    bf16=True,
    deepspeed="ds_config_zero3.json"
)
trainer = Trainer(model=model, args=training_args, train_dataset=ivy_dataset, data_collator=DataCollatorForSeq2Seq())
trainer.train()`,
  },
  {
    number: "04",
    name: "Execution-Guided Self-Debugging Alignment",
    tagline: "RL / Rejection sampling with sandboxed pytest execution rewards",
    icon: <Bot className="w-5 h-5 text-purple-500" />,
    color: "text-purple-500",
    borderColor: "border-purple-500/30",
    bgColor: "bg-purple-500/10",
    description:
      "Aligns the fine-tuned model via rejection sampling and execution-guided reinforcement learning (RLHF / RLAIF). The agent samples candidate implementations, runs them against the synthesized hypothesis tests inside isolated Docker sandboxes, and prioritizes candidates that achieve 100% test passing and strict numerical tolerance (atol ≤ 1e-5).",
    components: [
      {
        title: "Compiler & Test Execution Reward",
        desc: "Binary + continuous reward function evaluating test outcomes, linter compliance, and latency",
        detail: "R = +1.0 for passing all property tests; -0.8 for runtime exception; -0.4 for tolerance mismatch.",
      },
      {
        title: "Traceback-Conditioned Repair Pairs",
        desc: "Pairs failing code + pytest stderr output with ground-truth human bugfix commits",
        detail: "Teaches the model to interpret Python tracebacks and auto-correct broadcasting bugs.",
      },
      {
        title: "Numerical Gradient Parity Gate",
        desc: "Automatic differentiation check validating forward and backward pass parity",
        detail: "Ensures gradients match native PyTorch / JAX tensors within 1e-5 margin.",
      },
    ],
    codeSnippet: `# 4. Execution Sandbox Evaluation & Reward Computation
def compute_execution_reward(candidate_code, candidate_test):
    with DockerSandbox() as sandbox:
        sandbox.write("fn.py", candidate_code)
        sandbox.write("test_fn.py", candidate_test)
        result = sandbox.run("pytest test_fn.py --hypothesis-seed=42")
        if result.exit_code == 0:
            return 1.0, "PASSED"
        else:
            traceback = extract_assertion_failure(result.stderr)
            return -0.5, traceback`,
  },
  {
    number: "05",
    name: "Autonomous PR Generation & Deployment",
    tagline: "End-to-end integration: AST gap discovery, git commit signing, & GitHub PR",
    icon: <GitBranch className="w-5 h-5 text-blue-500" />,
    color: "text-blue-500",
    borderColor: "border-blue-500/30",
    bgColor: "bg-blue-500/10",
    description:
      "The trained agent is deployed into production as an automated GitHub bot. It scans the Ivy codebase for API gaps, generates the missing function and its test, iterates through the self-correction loop in Docker, signs the commit, and opens a fully verified GitHub pull request.",
    components: [
      {
        title: "End-to-End Parity Engine",
        desc: "Scans native frameworks, prioritizes missing functions, and triggers code generation",
        detail: "Dispatched automatically via daily cron jobs or developer slash commands.",
      },
      {
        title: "Autonomous Self-Correction Loop",
        desc: "Iterates up to 3 self-debugging passes if sandbox tests fail on the first generation",
        detail: "Boosts single-turn pass rate from 68.1% to an 82.4% merged PR acceptance rate.",
      },
      {
        title: "Automated Pull Request Dispatch",
        desc: "Commits to dedicated feature branch, formats with black/flake8, and submits PR",
        detail: "Contributed 450+ validated functions to Ivy, saving over 600+ hours of human dev work.",
      },
    ],
    codeSnippet: `# 5. Production Autonomous Workflow
gap = scan_next_highest_priority_gap()
prompt = format_agent_prompt(gap)
code, test = agent.generate_with_self_correction(prompt, max_turns=3)
if sandbox.verify(code, test):
    branch = f"auto/{gap.framework}-{gap.name}"
    git.commit(branch=branch, files=[code, test], message=f"feat({gap.framework}): implement {gap.name}")
    github.create_pr(branch=branch, title=f"feat: add {gap.name} with property tests")`,
  },
];

export function AutonomousCodeGenArchitecture() {
  const [activeStage, setActiveStage] = useState<number>(0);
  const stage = TRAINING_STAGES[activeStage];

  return (
    <div className="w-full space-y-6 select-none font-sans">
      {/* 1. Header Overview Banner */}
      <div className="p-4 sm:p-5 rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-[var(--border)]">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
              TRAINING &amp; DATASET PIPELINE
            </span>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--foreground)]">
              How the Framework Code-Generation Agent Was Trained
            </span>
          </div>
          <span className="text-[11px] font-mono text-[var(--muted)]">
            Corpus Mining ──► AST Dataset ──► Multi-Task SFT ──► Sandbox RL
          </span>
        </div>

        {/* 5 Stepper Stage Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {TRAINING_STAGES.map((st, idx) => {
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
                <div
                  className={`text-xs font-semibold leading-tight ${
                    isActive ? "text-[var(--foreground)] font-bold" : "text-[var(--muted)]"
                  }`}
                >
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
            <div
              className={`w-10 h-10 rounded-xl ${stage.bgColor} border ${stage.borderColor} flex items-center justify-center shrink-0`}
            >
              {stage.icon}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span
                  className={`text-[10px] font-mono font-bold uppercase tracking-wider ${stage.color}`}
                >
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
                <span
                  className={`w-1.5 h-1.5 rounded-full ${stage.color.replace("text-", "bg-")}`}
                />
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
              <span>Training Pipeline &amp; Dataset Processing Blueprint</span>
            </div>
            <span>Python · PyTorch · HuggingFace · AST</span>
          </div>
          <pre className="overflow-x-auto text-[var(--foreground)] leading-relaxed font-mono">
            <code>{highlightPython(stage.codeSnippet)}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
