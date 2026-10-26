export type ProjectCategory = "Research" | "Engineering" | "Analysis";

export interface ProjectMetric {
  label: string;
  value: string;
  detail?: string;
}

export interface ProjectLink {
  label: string;
  url: string;
  type: "github" | "producthunt" | "paper" | "demo" | "external";
}

export interface ResearchMethodologyItem {
  title: string;
  badge?: string;
  description: string;
}

export interface ResearchFindingItem {
  title: string;
  badge?: string;
  metric?: string;
  description: string;
  takeaway?: string;
}

export interface DataProjectModality {
  name: string;
  sensor: string;
  rate: string;
  role: string;
}

export interface ExperimentalProcessStep {
  phase: string;
  badge?: string;
  title: string;
  description: string;
  insights?: string[];
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  company: string;
  companySlug: string;
  role: string;
  period: string;
  category: ProjectCategory;
  projectContext?: "personal";
  featured?: boolean;
  featuredSpan?: "horizontal" | "vertical";
  latexTags: string[];
  domainTags: string[];
  metrics: ProjectMetric[];
  challenge: string;
  architecture: string;
  methodology: string[];
  results: string[];
  techStack: string[];
  pipelineDiagram?: string[];
  links: ProjectLink[];

  // Dedicated research project structure (Question, Approach, Methodology, Findings)
  isResearchStructure?: boolean;
  question?: string;
  questionDetails?: string[];
  approach?: string;
  approachDetails?: string[];
  researchMethodology?: ResearchMethodologyItem[];
  researchFindings?: ResearchFindingItem[];

  // Dedicated data project structure (Context and Objective, Designed Solution, Experimental Process)
  isDataProjectStructure?: boolean;
  contextAndObjective?: {
    headline: string;
    details: string[];
    dataModalities?: DataProjectModality[];
  };
  designedSolution?: {
    headline: string;
    details: string[];
    architectureHighlights?: { title: string; badge?: string; detail: string }[];
  };
  experimentalProcess?: {
    headline: string;
    details: string[];
    steps: ExperimentalProcessStep[];
  };
}

export const CARD_TAGS = [
  "All",
  "AI Agents",
  "Computer Vision",
  "Compilers",
  "Data Science",
  "Evaluation",
  "Generative AI",
  "LLM Systems",
  "Model Training",
  "Optimization",
  "Open Source",
  "Time Series",
  "Benchmarking",
] as const;

export type CardTag = (typeof CARD_TAGS)[number];
export const TOPIC_TAGS = CARD_TAGS;
export type TopicTag = CardTag;

const PROJECT_CARD_TOPICS: Record<string, [CardTag, CardTag]> = {
  "endogenous-subspace-orthogonalization": ["Model Training", "Evaluation"],
  "driftlab-agent-adaptation": ["AI Agents", "Evaluation"],
  "autonomous-ai-teammates": ["AI Agents", "LLM Systems"],
  "neural-llm-router": ["LLM Systems", "Optimization"],
  "llm-observability-platform": ["LLM Systems", "Evaluation"],
  "llm-evals-benchmarking": ["LLM Systems", "Benchmarking"],
  "realtime-avatar-animation": ["Computer Vision", "Generative AI"],
  "generative-video-pipeline": ["Computer Vision", "Generative AI"],
  "ivy-framework-transpiler": ["Compilers", "Open Source"],
  "cross-framework-model-benchmarks": ["Compilers", "Benchmarking"],
  "self-contributing-codegen-agent": ["AI Agents", "Compilers"],
  "rag-docs-assistant": ["AI Agents", "LLM Systems"],
  "edge-model-optimization": ["Model Training", "Optimization"],
  "dynamic-freight-rate-forecasting": ["Data Science", "Time Series"],
  "pediatric-bfrb-classification": ["Data Science", "Computer Vision"],
  "spotify-sound-trend-evolution": ["Data Science", "Time Series"],
  distforge: ["Compilers", "Open Source"],
  patchllm: ["AI Agents", "Compilers"],
};

export function getProjectTags(project: Project): string[] {
  return Array.from(new Set([
    ...project.latexTags.map((tag) => tag === "Evals" ? "Evaluation" : tag),
    ...(PROJECT_CARD_TOPICS[project.slug] ?? []),
  ]));
}

export function getProjectDisplayTags(project: Project): string[] {
  return PROJECT_CARD_TOPICS[project.slug] ?? [];
}

export function getSharedCardTags(): CardTag[] {
  return CARD_TAGS.filter((tag) =>
    tag !== "All" &&
    PROJECTS.filter((project) => getProjectTags(project).includes(tag)).length >= 2
  );
}

export const PROJECT_CONTEXTS = [
  "All",
  "AI Researcher @UnfoldingLabs",
  "AI Engineer @UnifyAI",
  "ML Research Engineer @DeepIvy",
  "Data Scientist Freelance",
  "Personal Projects",
] as const;

export type ProjectContext = (typeof PROJECT_CONTEXTS)[number];

export const PROJECTS: Project[] = [
  // ---------------------------------------------------------------------------
  // 1. Unfolding Labs (AI Researcher, 2026 - Present)
  // ---------------------------------------------------------------------------
  {
    id: "ul-1",
    slug: "endogenous-subspace-orthogonalization",
    title: "Endogenous Subspace Orthogonalization (Ortho-LoRA)",
    subtitle: "Targeted monosemanticity and causal activation steering via attribution-conditioned low-rank adaptation",
    company: "Unfolding Labs",
    companySlug: "unfolding-labs",
    role: "AI Researcher",
    period: "2026 — Present",
    category: "Research",
    featured: true,
    featuredSpan: "vertical",
    latexTags: ["Interpretability", "Mechanistic Interpretability", "Superposition", "LoRA", "Research"],
    domainTags: ["Interpretability", "Model Training"],
    metrics: [
      { label: "Cross-Talk Reduction", value: "10.3x", detail: "C_gram: 0.719 → 0.070 in Qwen-2.5-0.5B" },
      { label: "Effective Capacity", value: "87.7%", detail: "28.05 / 32 ranks actively utilized" },
      { label: "Steering Selectivity", value: "3.837 SSI", detail: "+41.6% vs LoRA, 13.2x vs CAA" },
      { label: "Parameter Footprint", value: "112x Less", detail: "57K vs 6.4M params/layer vs Top-K SAE" },
    ],
    challenge:
      "Large Language Models rely on superposition—packing non-orthogonal semantic features into representations to maximize capacity. This produces polysemantic activations that cause cross-talk and collateral damage when steered. Existing methods rely on exogenous Sparse Autoencoders (SAEs), which incur 4x–32x parameter expansion, add forward latency, and degrade task loss under activation intervention.",
    architecture:
      "Ortho-LoRA rotates task-invoked representations into an orthogonal coordinate system using attribution-conditioned Gram loss and bottleneck sparsity. Channels scale angular penalties by empirical co-activation, separating overlapping write directions while preserving task accuracy and merging into base weights with 0 ms added latency.",
    methodology: [
      "Attribution-Conditioned Gram Loss: Scales angular repulsion by token co-activation so only concurrent features are forced apart.",
      "Dual Architectural Backbones: Evaluated across modern Gated SwiGLU (Qwen-2.5-0.5B) and classical Dense GELU (Pythia-410M).",
      "Layer Depth Sweeps: Interventions across Early (L6), Mid (L12), and Late (L18) layers to isolate semantic abstraction.",
      "Head-to-Head Baselines: Benchmarked against Standard LoRA, Contrastive Activation Addition (CAA), and Top-K SAEs.",
    ],
    results: [
      "Superposition Collapse: 10.3x drop in off-diagonal cross-talk (C_gram = 0.070) with 87.7% subspace capacity utilization.",
      "Causal Steering Precision: Peak SSI of 3.837 (+41.6% over LoRA) with 16.3x lower collateral vocabulary drift.",
      "Zero Added Latency: Merges into base weights at 0 ms runtime cost with 112x fewer parameters than Top-K SAEs.",
      "Capacity Phase Transition: Confirmed Johnson-Lindenstrauss threshold where r ≥ 8 prevents capacity-starvation collapse.",
    ],
    techStack: ["PyTorch", "Hugging Face", "Transformers", "PEFT", "LoRA", "Weights & Biases", "LaTeX"],
    links: [],

    // Dedicated research project structure
    isResearchStructure: true,
    question:
      "Can a model unpack its own representations on demand?",
    questionDetails: [
      "Language models rely on superposition to compress web-scale knowledge into finite geometric dimensions, creating entangled, polysemantic representations that resist clean steering. While Sparse Autoencoders (SAEs) attempt to untangle these activations exogenously with severe parameter and latency overhead, circumscribed downstream tasks require only a fraction of residual capacity. Can a model instead endogenously unpack its own representations on demand by rotating task features into an orthogonal basis during adaptation?",
    ],
    approach:
      "Turning low-rank channels into an orthogonal coordinate frame.",
    approachDetails: [
      "Ortho-LoRA transforms low-rank adapter channels (ΔW = BA) into an orthogonal coordinate frame via a joint attribution-conditioned Gram penalty and bottleneck sparsity. Rather than enforcing blind perpendicularity, the loss scales angular repulsion by empirical token co-activation—forcing write vectors apart only when channels fire concurrently on real task inputs. When adaptation converges, weights fold directly into the base model with zero added inference latency.",
    ],
    researchMethodology: [
      {
        title: "Architectural Paradigms & Layer Depth Sweeps",
        badge: "PyTorch & PEFT",
        description:
          "Evaluated across two contrasting transformer backbones: modern Gated SwiGLU with RMSNorm (Qwen-2.5-0.5B, d=896) and classical Dense GELU with LayerNorm (Pythia-410M, d=1024). Interventions were systematically swept across Early (Layer 6, ~25%), Mid (Layer 12, ~50%), and Late (Layer 18, ~75%) residual streams to isolate semantic abstraction from surface un-embedding biases.",
      },
      {
        title: "Joint Loss Formulation & Hyperparameter Sweeps",
        badge: "Gram Coherence",
        description:
          "Trained using AdamW (lr=2e-4, cosine decay, weight decay 0.01) with PyTorch FP16 mixed precision on single 16GB NVIDIA T4 GPU budgets (<7 GB peak VRAM). Grid sweeps comprehensively varied rank capacity r ∈ [4, 8, 16, 32, 64] and orthogonality weight λ_ortho ∈ [0.0, 0.1, 0.5, 1.0, 2.0] alongside L1 bottleneck activation sparsity λ_sparse.",
      },
      {
        title: "Comparative Baselines & Matched Capacities",
        badge: "SAE vs LoRA vs CAA",
        description:
          "Benchmarked head-to-head against unconstrained Standard LoRA (λ_ortho = 0.0), Contrastive Activation Addition (CAA), and an exogenous Top-K Sparse Autoencoder (k=32, 4x expansion dictionary d_sae = 3,584 trained to Fraction of Variance Unexplained FVU < 0.01) fitted directly to Layer 12 activations.",
      },
      {
        title: "Downstream Tasks & Counterfactual Steerability",
        badge: "Evals Suite",
        description:
          "Evaluated across affective sentiment classification (tweet_eval), continuous safety moderation (real-toxicity-prompts), and stereotypical bias (StereoSet). Steerability measured via the Steering Selectivity Index (SSI), tracking target probability change (ΔP) relative to off-target KL divergence drift (D_KL) across steering multipliers γ ∈ [-6, +6].",
      },
    ],
    researchFindings: [
      {
        title: "Superposition Collapse & Metric Separation",
        badge: "10.3x Cross-Talk Drop",
        metric: "C_gram: 0.719 → 0.070",
        description:
          "Reduced cross-talk up to 10.3x and raised effective rank capacity from 57.5% to 87.7%.",
      },
      {
        title: "Causal Steering Selectivity & Zero Leakage",
        badge: "Peak SSI = 3.837",
        metric: "+41.6% vs LoRA · 13.2x vs CAA",
        description:
          "Reached SSI 3.837, with 16.3x less collateral drift than standard LoRA.",
      },
      {
        title: "Radical Parameter & Latency Efficiency vs. SAEs",
        badge: "Zero Runtime Overhead",
        metric: "112x Fewer Params",
        description:
          "Uses 112x fewer parameters than a matched SAE and adds 0 ms latency when merged.",
      },
      {
        title: "Phase Transition Boundaries & Layer Depth Limits",
        badge: "Johnson-Lindenstrauss",
        metric: "Capacity Threshold r ≥ 8",
        description:
          "Rank below 8 caused capacity collapse; mid-layer interventions produced the strongest causal steering.",
      },
    ],
  },
  {
    id: "ul-3",
    slug: "driftlab-agent-adaptation",
    title: "DriftLab: Measuring Agent Adaptation in Non-Stationary Environments",
    subtitle: "A testbed and formal evaluation protocol measuring LLM agent adaptation dynamics across non-stationary workplace environments",
    company: "Unfolding Labs",
    companySlug: "unfolding-labs",
    role: "AI Researcher",
    period: "2026 — Present",
    category: "Research",
    featured: true,
    featuredSpan: "horizontal",
    latexTags: ["Continual Learning", "Non-Stationary Environments", "AI Agents", "Benchmarking", "Evaluation Protocol"],
    domainTags: ["AI Agents", "Continual Learning"],
    metrics: [
      { label: "Worlds", value: "6", detail: "Seeded workplace simulations" },
      { label: "Protocols", value: "20", detail: "Abrupt, gradual, cosmetic, endogenous, and adversarial drift" },
      { label: "Statistical Rigor", value: "Seed-Paired", detail: "Byte-identical environments with 95% bootstrap intervals" },
    ],
    challenge:
      "Benchmarks evaluate competence on frozen worlds where ground truth is static. Conversely, deployed agents operate in environments where rules shift constantly without notice, requiring ground truth to measure adaptation dynamics.",
    architecture:
      "Deterministic simulation harness separating latent world mechanics from protocol schedules, writing an immutable per-step ledger invisible to the agent to compute detection, recovery, retention, and over-update metrics.",
    methodology: [
      "Simulating workplace environments with hidden ground truth maps across 5 distinct drift topologies.",
      "Measuring temporal dynamics in task encounters rather than steps to isolate environment sampling frequency.",
      "Evaluating swappable memory substrates behind fixed models using seed-matched paired bootstrap statistics.",
    ],
    results: [
      "Demonstrated that cosmetic over-reaction is domain-specific, penalizing format-heavy tasks (-0.133 acc) while leaving incidental formats untouched.",
      "Falsified world-model hypothesis: explicit prediction invalidation triggered hyper-reactive over-updating (U = 0.81 vs 0.30 notes).",
      "Proved delayed credit assignment inflicts universal performance penalties (-0.25 to -0.42) regardless of environmental non-stationarity.",
    ],
    techStack: ["Python", "AsyncIO", "OpenAI API", "NumPy", "SciPy", "Docker", "LaTeX"],
    links: [],

    // Dedicated research project structure
    isResearchStructure: true,
    question:
      "How do we measure agent adaptation when the world keeps changing unannounced?",
    questionDetails: [
      "Static benchmarks evaluate language model agents on frozen tasks where rules and ground truth remain fixed. Deployed agents work in turbulent environments where routing policies flip, schemas mutate, and adversaries adapt. How can we quantify how many task encounters an agent needs to detect a latent shift, recover competence, and retain new rules without corrupting existing knowledge?",
    ],
    approach:
      "Seeded workplace simulations with parallel hidden ground truth and encounter-based measurement.",
    approachDetails: [
      "DriftLab constructs six deterministic, seeded workplace simulations where an evaluator records an immutable ledger of hidden ground truth while the agent interacts through natural task exchanges and in-role feedback. Environmental drift is controlled across abrupt, gradual, cosmetic, endogenous, and adversarial shifts. Adaptation is measured in affected-task encounters rather than raw steps, and memory substrates are evaluated under identical paired seeds.",
    ],
    researchMethodology: [
      {
        title: "Deterministic Workplace Worlds & Latent Truth Maps",
        badge: "6 Seeded Worlds",
        description:
          "Instantiated six realistic workplace simulations (routing intake, order form-filling, retail inventory, codebase migration, claims fraud screening, pooled audience campaigns). Environments are strictly seeded so two agents face byte-identical episodes, maintaining a hidden truth map f_t(κ_t) at every step while presenting signal-free realistic text to the agent.",
      },
      {
        title: "Controlled Drift Taxonomy & Change Topologies",
        badge: "20 Protocols",
        description:
          "Decoupled what changes (owned by the world via inert hooks) from when it changes (owned by the protocol). Spans abrupt change-points, gradual drift with deterministic truth, cosmetic restyling (re-rendering without schema change), endogenous drift (triggered by agent behavior), and adversarial drift (where a co-adapting fraud ring shifts tactics against agent approvals).",
      },
      {
        title: "Encounter-Based Latency & Epistemic Metrics",
        badge: "Encounter Calculus",
        description:
          "Adaptation is counted in affected-task encounters k rather than steps, removing environmental sampling density from scoring. Formulated detection latency d(c), recovery latency ρ(c), stability σ(c), retention window accuracy R(c), stale-memory relapse rate S(c), collateral interference I(c), and the over-update rate U under misleading feedback.",
      },
      {
        title: "Substrate Isolation & Pre-Registered Paired Testing",
        badge: "Paired Bootstrap",
        description:
          "Swapped seven memory substrates (None, Transcript, Notes, Skills, Beliefs, World Model, Fast+Slow) behind fixed pinned models (GPT-5.6-Luna, DeepSeek-V4.1-Flash, Qwen3.8-27B). Evaluated pre-registered hypotheses via paired effects Δ = (1/|S|) Σ [m_B(s) - m_A(s)] with 95% bootstrap confidence intervals, automating scope-qualified verdicts.",
      },
    ],
    researchFindings: [
      {
        title: "Cosmetic Over-Reaction is Domain-Dependent",
        badge: "Surface Vulnerability",
        metric: "-0.133 Acc Drop on Form",
        description:
          "Cosmetic changes cut form-filling accuracy by 0.133 (95% CI [-0.240, -0.025]) but had no effect on request routing.",
        takeaway:
          "Formatting matters when it carries task meaning.",
      },
      {
        title: "The World-Model Epistemic Paradox",
        badge: "Hypothesis Falsified",
        metric: "U = 0.81 vs 0.30 Notes",
        description:
          "With 15% misleading feedback, the world model over-updated at 0.81, versus 0.30 for notes.",
        takeaway:
          "Explicit belief updates made memory more reactive to noise.",
      },
      {
        title: "Adversarial Co-Adaptation vs Recovery Latency",
        badge: "Endogenous Pressure",
        metric: "+0.10 to +0.25 Acc Gap",
        description:
          "Adversarial fraud screening reduced episode accuracy by 0.10 to 0.25 as tactics shifted 34 times, versus 20 in control.",
        takeaway:
          "Frequent shifts mattered more than per-shift recovery time.",
      },
      {
        title: "Universal Penalty of Delayed Credit Assignment",
        badge: "6-Step Feedback Lag",
        metric: "-0.25 to -0.42 Penalty",
        description:
          "A six-step feedback delay reduced accuracy across models in both changing (-0.25 to -0.42) and stable worlds (-0.28 to -0.56).",
        takeaway:
          "Delayed feedback hurt performance regardless of drift.",
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // 2. Unify AI (AI Engineer, Feb 2024 - Sep 2026)
  // ---------------------------------------------------------------------------
  {
    id: "uai-1",
    slug: "autonomous-ai-teammates",
    title: "Autonomous AI Assistant Teammates Platform",
    subtitle: "Autonomous enterprise agents with dynamic skill acquisition, omnichannel communication, and VM browser execution",
    company: "Unify AI, Ltd",
    companySlug: "unify-ai",
    role: "AI Engineer",
    period: "Feb 2024 — Sep 2026",
    category: "Engineering",
    featured: true,
    featuredSpan: "horizontal",
    latexTags: ["AI Agents", "Agent Harness", "Infrastructure", "Deployment"],
    domainTags: ["AI Agents", "LLM Systems"],
    metrics: [
      { label: "Connectors", value: "50+", detail: "Third-party workspace and communication integrations" },
      { label: "Task Completion", value: "93.2%", detail: "Complex multi-step workflow success rate" },
      { label: "VM Boot Latency", value: "< 1.4s", detail: "Isolated headless sandbox provisioning" },
    ],
    challenge:
      "Many AI agents can answer prompts or complete isolated tool calls, but they are not yet dependable assistants in a person's real work. They often lack deep connections to the user's apps, files, and communication channels; they lose context across long-running tasks; and they struggle to adapt when real workflows are messy, interrupted, or change over time. Without a way to learn and improve reusable skills, users must repeatedly guide the agent through familiar work.",
    architecture:
      "The platform connects agents to third-party workspaces and lets users work with them through familiar channels such as chat, email, phone, messaging, and live screen sharing. Agents can act in browser and desktop environments, while a persistent task loop carries work across interruptions. As new needs arise, agents can develop, validate, and manage reusable skills so they improve at the user's recurring workflows over time.",
    pipelineDiagram: [
      "User Input (Slack / WhatsApp / Live Screen Stream)",
      "      │",
      "      ▼",
      "Agent Planner & Function Dispatcher",
      "      ├──► Dynamic Skill Synthesis & Unit Test Sandbox",
      "      ├──► Dedicated Firecracker / Docker VM (Browser Use)",
      "      └──► Live WebRTC Screen Analyzer & Voice Guidance",
      "             │",
      "             ▼",
      "State Checkpointer & Audit Log (Postgres / Redis)",
    ],
    methodology: [
      "Engineered autonomous function synthesis: agents self-generate API client code upon discovering new OpenAPI specifications.",
      "Implemented WebRTC low-latency streaming pipeline for real-time visual screen observation and voice interruption.",
      "Hardened VM execution environments with strict network egress policies and transient snapshot rollbacks.",
    ],
    results: [
      "Achieved widespread enterprise adoption across customer support and internal IT ops.",
      "Reduced routine human operational overhead by 70% across automated ticket resolution pipelines.",
    ],
    techStack: ["Python", "FastAPI", "NextJS", "React", "Docker", "WebRTC", "Playwright", "PostgreSQL", "Redis", "GCP"],
    links: [],
  },
  {
    id: "uai-2",
    slug: "neural-llm-router",
    title: "Neural LLM Dynamic Router",
    subtitle: "End-to-end trained neural classifier routing arbitrary prompts to optimal LLMs on the Pareto frontier",
    company: "Unify AI, Ltd",
    companySlug: "unify-ai",
    role: "AI Engineer",
    period: "Feb 2024 — Sep 2026",
    category: "Engineering",
    featured: true,
    featuredSpan: "horizontal",
    latexTags: ["Model Training", "Routing", "Benchmarking", "Deployment"],
    domainTags: ["LLM Systems"],
    metrics: [
      { label: "Cost Savings", value: "64.3%", detail: "Compared to default frontier model calls" },
      { label: "Quality Retention", value: "98.7%", detail: "Maintained quality benchmark on LMSYS/MMLU" },
      { label: "Routing Latency", value: "< 14ms", detail: "Sub-millisecond embedding inference" },
    ],
    challenge:
      "Sending every query to top-tier frontier models like GPT-4 or Claude 3.5 Sonnet results in exorbitant infrastructure bills. Conversely, naive heuristic routing (e.g. prompt length or keyword rules) fails on subtly complex reasoning questions.",
    architecture:
      "A dual-stage neural router: (1) Ultra-fast frozen semantic embedding encoder + multi-head MLP trained via contrastive loss on hundreds of thousands of benchmarked prompt-response evaluations, (2) User-configured Pareto optimizer weighting cost, latency SLA, and predicted model competency.",
    pipelineDiagram: [
      "User Prompt ──► Quantized Transformer Embedder (sub-10ms)",
      "                      │",
      "                      ▼",
      "              Neural Router MLP Head",
      "         (Predicts expected score per LLM)",
      "                      │",
      "                      ▼",
      "         Pareto Optimization Engine",
      "      [Cost Profile | Latency SLA | Target Quality]",
      "                      │",
      "      ┌───────────────┼───────────────┐",
      "      ▼               ▼               ▼",
      "Small / Fast    Mid-Tier Model    Frontier LLM",
      "(e.g. LLaMA-8B)  (e.g. Mistral)   (e.g. Claude/GPT-4)",
    ],
    methodology: [
      "Curated multi-task benchmark corpora covering code generation, mathematical reasoning, creative synthesis, and classification.",
      "Trained model using cross-entropy ranking loss calibrated against pairwise model evaluation margins.",
      "Optimized weights for ONNX Runtime and TensorRT deployment on CPU/edge instances to keep routing overhead under 15ms.",
    ],
    results: [
      "Featured on Product Hunt with significant user traction across high-volume production LLM clients.",
      "Saved users thousands of dollars monthly while matching or exceeding frontier-only quality scores.",
    ],
    techStack: ["PyTorch", "Hugging Face", "ONNX Runtime", "FastAPI", "Docker", "GCP", "PostgreSQL"],
    links: [],
  },
  {
    id: "uai-3",
    slug: "llm-observability-platform",
    title: "Universal LLM Observability & Dashboard Platform",
    subtitle: "High-throughput telemetry ingestion, real-time token streaming inspection, and customizable tiled analytics",
    company: "Unify AI, Ltd",
    companySlug: "unify-ai",
    role: "AI Engineer",
    period: "Feb 2024 — Sep 2026",
    category: "Engineering",
    latexTags: ["LLM", "Observability", "Dashboards", "Deployment"],
    domainTags: ["LLM Systems"],
    metrics: [
      { label: "Telemetry Data", value: "25k+ Events", detail: "Structured LLM inputs, outputs, and traces captured" },
      { label: "Query Latency", value: "< 45ms", detail: "Real-time tiled dashboard aggregations" },
      { label: "Diff Inspection", value: "Instant", detail: "Side-by-side prompt & generation comparison" },
    ],
    challenge:
      "Debugging generative AI systems in production is notoriously difficult due to unstructured inputs, non-deterministic streaming tokens, complex nested tool calls, and high data ingestion volumes that overwhelm traditional APM tools.",
    architecture:
      "Asynchronous telemetry pipeline built on PostgreSQL and Redis with a React/Next.js frontend. Features an interactive dashboard canvas supporting drag-and-drop tiles: token cost breakdowns, latency distribution heatmaps, semantic prompt clustering, and dynamic client-side generation diff visualizers.",
    pipelineDiagram: [
      "Unify Client SDK ──► Non-blocking Async Telemetry Buffer",
      "                             │",
      "                             ▼",
      "         orchestra (FastAPI + PostgreSQL & Redis)",
      "                             │",
      "                             ▼",
      "            console (Next.js / React Tiled Engine)",
      "      [Client-Side Diff | Latency Heatmap | Cost | Traces]",
    ],
    methodology: [
      "Designed a zero-overhead logging client using background non-blocking thread workers so API latencies were unaffected.",
      "Implemented custom vector indexing for fast semantic retrieval of prompt outliers and regression cases.",
      "Engineered flexible tiled layout engine allowing engineering teams to export and share dashboard templates.",
    ],
    results: [
      "Enabled customers to pinpoint hallucinations, track cost spikes across providers, and debug multi-agent conversations.",
      "Delivered real-time telemetry streaming with zero execution latency impact on production LLM endpoints.",
    ],
    techStack: ["NextJS", "React", "TypeScript", "Python", "FastAPI", "PostgreSQL", "Redis", "GCP", "Tailwind CSS"],
    links: [],
  },
  {
    id: "uai-4",
    slug: "llm-evals-benchmarking",
    title: "Large-Scale LLM Evals & Provider Benchmarking Engine",
    subtitle: "Automated continuous evaluation system tracking latency, throughput, token pricing, and accuracy across 50+ model endpoints",
    company: "Unify AI, Ltd",
    companySlug: "unify-ai",
    role: "AI Engineer",
    period: "Feb 2024 — Sep 2026",
    category: "Engineering",
    latexTags: ["LLM", "Evals", "Benchmarking", "Deployment"],
    domainTags: ["LLM Systems"],
    metrics: [
      { label: "Queries Processed", value: "500k+ Daily", detail: "Benchmark prompts measured across providers" },
      { label: "Endpoints Tracked", value: "50+ Providers", detail: "OpenAI, Anthropic, Bedrock, Together, Anyscale" },
      { label: "Precision Anomaly Detect", value: "99.2%", detail: "Automatic flagging of silent model degradation" },
    ],
    challenge:
      "Cloud LLM API performance varies wildly across regions, times of day, and upstream provider updates. Engineers frequently suffer from silent model updates, sudden latency degradation, or throughput throttling without actionable data.",
    architecture:
      "Distributed benchmarking architecture powered by scheduled GitHub cron jobs and the Unify Python client, orchestrating multi-region probes through Orchestra backend endpoints and publishing real-time telemetry, TTFT/ITL plots, and cost benchmarks to the ModelHub webapp deployed on GCP Cloud Run.",
    pipelineDiagram: [
      "GitHub Actions (Cron Trigger every X hours) ──► unify Python Benchmark Battery",
      "                                                         │",
      "                                                         ▼",
      "                        orchestra Ingestion Endpoints (Trigger probe per endpoint × region)",
      "                                                         │",
      "                                                         ▼",
      "                        PostgreSQL Metrics Store (TTFT, ITL, Cost, Variance Filtering)",
      "                                                         │",
      "                                                         ▼",
      "                        modelhub WebApp (GCP Cloud Run Leaderboard & Regional Plots)",
    ],
    methodology: [
      "Developed statistical variance filtering to isolate external cloud network jitter from model inference delays.",
      "Implemented automated LLM-as-a-judge pipelines with calibrated rubrics to detect semantic regressions.",
      "Created public live status leaderboards highlighting real-time provider speeds.",
    ],
    results: [
      "Provided objective benchmark data empowering developers to migrate workloads to the most cost-effective and responsive hosts.",
      "Served as the core data engine powering the Unify Neural Router's dynamic routing choices.",
    ],
    techStack: ["Python", "FastAPI", "PostgreSQL", "NextJS", "React", "Docker", "GCP Cloud Run", "GitHub Actions", "Redis"],
    links: [],
  },
  {
    id: "uai-5",
    slug: "realtime-avatar-animation",
    title: "Real-Time Zero-Shot Speech-Driven Avatar Animation",
    subtitle: "Low-latency streaming neural pipeline animating arbitrary portrait images from synthesized conversational speech",
    company: "Unify AI, Ltd",
    companySlug: "unify-ai",
    role: "AI Engineer",
    period: "Feb 2024 — Sep 2026",
    category: "Engineering",
    latexTags: ["AI Agents", "Computer Vision", "Animation", "Research"],
    domainTags: ["Computer Vision", "AI Agents"],
    metrics: [
      { label: "Animated Response Latency", value: "<180 ms", detail: "Speech completion to first synchronized avatar motion" },
      { label: "Zero-Shot Setup", value: "0 sec", detail: "Works on arbitrary static headshot without fine-tuning" },
    ],
    challenge:
      "Existing avatar synthesis models require multi-minute video training or suffer from high inference latency (>1s) and eerie robotic jitter, making interactive real-time voice conversations unnatural.",
    architecture:
      "A Python asyncio and WebRTC pipeline turns live speech into a zero-shot talking portrait. Deepgram transcribes audio, OpenAI generates a response, and ElevenLabs and Replicate produce synchronized voice and video; rolling frame interpolation smooths transitions between clips.",
    pipelineDiagram: [
      "User Voice (WebRTC Mic Stream) ──► Deepgram (Streaming STT WebSocket)",
      "                                          │",
      "                                          ▼",
      "                                    OpenAI API (Streaming LLM Sentence Tokens)",
      "                                          │",
      "                                          ▼",
      "                                    ElevenLabs (Streaming TTS Voice Synthesizer)",
      "                                          │",
      "                                          ▼",
      "Baseline Profile Image ──────────► Replicate API (Video Gen Talking Photo Driver)",
      "                                          │",
      "                                          ▼",
      "Rolling Boundary Interpolator ──► WebRTC Video/Audio Playback Stream (<180ms)",
    ],
    methodology: [
      "Built asynchronous Python orchestration using asyncio and Pydantic models for concurrent audio chunking and pipeline dispatch.",
      "Integrated Deepgram streaming STT and OpenAI token streaming to feed ElevenLabs TTS with sub-sentence latency.",
      "Coupled Replicate video generation with a rolling first-and-last frame reference interpolation buffer to eliminate boundary seam jitter.",
      "Delivered bi-directional low-latency media streaming via WebRTC data and media channels.",
    ],
    results: [
      "Achieved sub-180ms glass-to-glass conversational response latency from user speech completion to avatar lip movement.",
      "Zero per-user calibration or training required for animating arbitrary portrait headshots.",
    ],
    techStack: ["Python", "asyncio", "WebRTC", "Pydantic", "Deepgram", "OpenAI", "ElevenLabs", "Replicate", "Docker"],
    links: [],
  },
  {
    id: "uai-6",
    slug: "generative-video-pipeline",
    title: "Storyboard-Driven Generative Video Pipeline",
    subtitle: "Automated generative video creation preserving multi-scene character identity, cinematography, and prompt fidelity",
    company: "Unify AI, Ltd",
    companySlug: "unify-ai",
    role: "AI Engineer",
    period: "Feb 2024 — Sep 2026",
    category: "Engineering",
    latexTags: ["Generative AI", "Content", "Animation", "Research"],
    domainTags: ["Computer Vision"],
    metrics: [
      { label: "Videos Generated", value: "250+", detail: "Autonomous multi-scene videos generated from briefs" },
      { label: "Generation Cost", value: "-58%", detail: "Optimized multi-stage rendering pipeline" },
      { label: "Render Turnaround", value: "4.2 Min", detail: "Full 60-second multi-scene video package" },
    ],
    challenge:
      "Generating coherent multi-scene videos from text prompts typically fails due to character face-shifting between scenes, fluctuating lighting, and lack of directorial control over camera panning, zooming, and cinematic framing.",
    architecture:
      "Modular storyboard-first video generation pipeline orchestrating LLMs, multi-angle reference sheets, contact-sheet storyboards, and diffusion video models. (1) Step 1 parses raw briefs into structured beats, pacing, and per-entity visual styles (story.json). (2) Step 2 synthesizes multi-angle reference sheets (characters.png, locations.png, props.png) to lock visual identity across scenes. (3) Step 3 compiles a deterministic master atlas and paginated storyboard sheets (chunk_NN.png, <=15s chunks) with camera angles, shot sizes, and continuity scaffolding. (4) Step 4 dispatches storyboards to OpenRouter video generation models (Seedance 2, Kling v3, Veo 3.1, Sora 2) using multi-image input reference mode and deterministic dialogue AV alignment (av_align.remux_aligned). (5) Step 5 masters synthesized ElevenLabs voiceover, diegetic audio mixes, and burned subtitle captions (captions.ass) via FFmpeg.",
    pipelineDiagram: [
      "Idea / Brief ──► Step 1: Story Config (LLM Beat Decomposition & Pacing)",
      "                       │",
      "                       ▼",
      "         Step 2: Reference Sheets (Characters, Locations, Props)",
      "                       │",
      "                       ▼",
      "         Step 3: Master Atlas & Storyboard Sheets (<=15s Scaffolds)",
      "                       │",
      "                       ▼",
      "         Step 4: Video Generation (OpenRouter: Seedance 2 / Kling / Veo)",
      "                       │",
      "                       ▼",
      "         AV Alignment (av_align Mouth Glow Correlation & Remux)",
      "                       │",
      "                       ▼",
      "         Step 5: Post-Production (ElevenLabs VO + Captions + FFmpeg Cut)",
    ],
    methodology: [
      "Designed a five-stage pipeline where each step reads and writes self-contained artifacts under projects/<name>/.",
      "Implemented multi-angle entity reference sheets (characters, locations, props) to enforce cross-scene visual and stylistic consistency.",
      "Engineered master atlas scaffolding with slot-based camera directions, shot sizes, and 15-second chunk pagination.",
      "Developed deterministic audio-video alignment (av_align) cross-correlating mouth luminance glow against audio tracks to correct provider lip-sync lag.",
      "Integrated OpenRouter unified video API supporting Seedance 2 reference mode, Kling v3, Veo 3.1, and Sora 2.",
    ],
    results: [
      "Enabled end-to-end automated generation of high-engagement, brand-consistent video assets with zero human keyframing.",
      "Cut multi-scene video turnaround time to 4.2 minutes with 89.6% character and location preservation.",
    ],
    techStack: ["Python", "OpenRouter", "Seedance 2", "Kling v3", "Veo 3.1", "ElevenLabs", "FFmpeg", "Pydantic", "OpenCV"],
    links: [],
  },

  // ---------------------------------------------------------------------------
  // 3. Deep Ivy (ML Research Engineer, Aug 2022 - Feb 2024)
  // ---------------------------------------------------------------------------
  {
    id: "ivy-1",
    slug: "ivy-framework-transpiler",
    title: "Ivy Framework Multi-Backend Transpiler & Compiler",
    subtitle: "Bridging PyTorch, JAX, TensorFlow, and NumPy into a unified framework-agnostic ML compiler",
    company: "Deep Ivy, Inc",
    companySlug: "deep-ivy",
    role: "Machine Learning Research Engineer",
    period: "Aug 2022 — Feb 2024",
    category: "Engineering",
    featured: true,
    featuredSpan: "vertical",
    latexTags: ["Machine Learning", "Framework", "Open Source", "Engineering"],
    domainTags: ["Compilers & Frameworks"],
    metrics: [
      { label: "Functions Implemented", value: "1,200+", detail: "Across PyTorch, JAX, NumPy, and TensorFlow" },
      { label: "GitHub Stars", value: "14k+", detail: "Leading open-source framework interop codebase" },
      { label: "Interop Accuracy", value: "99.8%", detail: "Gradient & value parity across frontend/backend runs" },
    ],
    challenge:
      "The fragmented ML ecosystem traps research code in framework silos (e.g., PyTorch research code cannot run on JAX TPU hardware, and legacy TensorFlow models cannot easily integrate into modern PyTorch pipelines).",
    architecture:
      "Source-to-source AST transpiler and intermediate representation (IR) layer. Translates computational graphs, gradient functions, and custom layers into native target framework operations with zero runtime overhead.",
    pipelineDiagram: [
      "Source Model Code (PyTorch / TensorFlow / NumPy)",
      "                       │",
      "                       ▼",
      "        Ivy AST Analyzer & Graph Tracer",
      "                       │",
      "                       ▼",
      "         Unified Intermediate Representation",
      "                       │",
      "                       ▼",
      " Target Framework Code Generator (JAX / PyTorch / ONNX)",
      "                       │",
      "                       ▼",
      "Native Target Compilation (e.g. jax.jit / torch.compile)",
    ],
    methodology: [
      "Authored rigorous property-based hypothesis tests verifying mathematical and gradient parity across all supported backend engines.",
      "Engineered automated conversion of complex stateful neural network modules (attention layers, batch norm, convolutions).",
      "Collaborated with global open-source community contributors via strict CI/CD linting and unit test matrices.",
    ],
    results: [
      "Enabled researchers to write code once and deploy across arbitrary hardware backends (TPU, CUDA, Metal, CPU).",
      "Core contributor to one of the most prominent open-source ML infrastructure repositories.",
    ],
    techStack: ["PyTorch", "JAX", "TensorFlow", "NumPy", "Python", "C++", "GitHub Actions", "Docker"],
    links: [],
  },
  {
    id: "ivy-2",
    slug: "cross-framework-model-benchmarks",
    title: "Cross-Framework HuggingFace Model Transpilation Benchmarking",
    subtitle: "Comprehensive empirical evaluation comparing transpiled vs. native model latency, memory footprint, and numerical parity",
    company: "Deep Ivy, Inc",
    companySlug: "deep-ivy",
    role: "Machine Learning Research Engineer",
    period: "Aug 2022 — Feb 2024",
    category: "Engineering",
    latexTags: ["Machine Learning", "Transpiling", "Benchmarking", "Engineering"],
    domainTags: ["Compilers & Frameworks"],
    metrics: [
      { label: "Architectures Tested", value: "35+ Models", detail: "Transformers, ResNets, UNet, BERT, RoBERTa" },
      { label: "JAX Speedup", value: "Up to 2.1x", detail: "Observed when transpiling PyTorch HF models to JAX TPU" },
      { label: "Numerical Tolerance", value: "1e-5", detail: "Absolute error threshold verified across tests" },
    ],
    challenge:
      "Proving that transpiled code is truly production-ready requires demonstrating that compilation introduces zero numerical degradation and achieves parity or speedups compared to native human-written framework implementations.",
    architecture:
      "Automated continuous benchmarking harness profiling memory utilization (CUDA VRAM), FLOPs, wall-clock inference latency, and numerical error bounds across diverse batch sizes (1, 8, 32, 128) and device backends (GPU, TPU, CPU).",
    methodology: [
      "Profiled kernel execution using NVIDIA Nsight and PyTorch Profiler to isolate operator fusion bottlenecks.",
      "Benchmarked HuggingFace vision and NLP checkpoints against native baseline weights.",
      "Generated automated regression reports on every transpiler commit to prevent performance regressions.",
    ],
    results: [
      "Validated that transpiling PyTorch transformer models to JAX achieved superior throughput on TPU pods with identical loss.",
      "Identified critical operator fusion opportunities directly implemented into the Ivy compiler roadmap.",
    ],
    techStack: ["PyTorch", "JAX", "TensorFlow", "Hugging Face", "CUDA", "NVIDIA Nsight", "Python"],
    links: [],
  },
  {
    id: "ivy-3",
    slug: "self-contributing-codegen-agent",
    title: "Autonomous Framework Code-Generation & PR Agent",
    subtitle: "End-to-end trained AI agent synthesizing missing backend functions, authoring unit tests, and opening validated GitHub PRs",
    company: "Deep Ivy, Inc",
    companySlug: "deep-ivy",
    role: "Machine Learning Research Engineer",
    period: "Aug 2022 — Feb 2024",
    category: "Engineering",
    latexTags: ["Model Training", "AI Agents", "Code Generation", "Research"],
    domainTags: ["AI Agents", "Compilers & Frameworks"],
    metrics: [
      { label: "PR Acceptance Rate", value: "82.4%", detail: "Merged autonomously authored pull requests" },
      { label: "Functions Generated", value: "450+", detail: "Validated with full mathematical unit tests" },
      { label: "Engineering Hours Saved", value: "600+ Hrs", detail: "Eliminated repetitive API binding authoring" },
    ],
    challenge:
      "Bridging four massive ML frameworks requires implementing thousands of individual mathematical operations and edge-case wrappers—a monumental, repetitive task prone to human copy-paste errors and inconsistent test coverage.",
    architecture:
      "Fine-tuned LLM agent paired with an automated compiler test harness: (1) AST extractor flags missing functions, (2) Model synthesizes Ivy wrapper and type signatures, (3) Agent authors hypothesis property test, (4) Sandboxed test execution verifies gradient equality, (5) Agent self-corrects upon test failure before submitting git PR.",
    pipelineDiagram: [
      "Missing API Detector (Scans PyTorch vs Ivy API parity)",
      "                          │",
      "                          ▼",
      "            Fine-Tuned Code-Gen Agent",
      "         (Synthesizes function + docstring)",
      "                          │",
      "                          ▼",
      "       Autonomous Test Generator & Executor",
      "             │                        ▲",
      "             ├─► Tests Pass? ──No─────┤ (Self-Correction Loop)",
      "             │",
      "            Yes",
      "             ▼",
      "GitHub API ──► Automated PR with CI Test Proof",
    ],
    methodology: [
      "Fine-tuned CodeLlama/StarCoder models on validated Ivy codebase commits and compiler test suites.",
      "Built dynamic self-debugging feedback loop: compiler tracebacks and linter warnings fed back to agent context.",
      "Integrated automated git commit signing and pull request description generation.",
    ],
    results: [
      "Accelerated the framework's API parity timeline by several months.",
      "Demonstrated practical viability of autonomous software engineering agents in mission-critical open-source codebases.",
    ],
    techStack: ["Python", "PyTorch", "Hugging Face", "AST", "Git API", "Docker", "Hypothesis"],
    links: [],
  },
  {
    id: "ivy-4",
    slug: "rag-docs-assistant",
    title: "Dynamic Multi-Repository RAG Documentation Assistant",
    subtitle: "Internal knowledge retrieval agent synchronized with constantly updating framework documentation and codebases",
    company: "Deep Ivy, Inc",
    companySlug: "deep-ivy",
    role: "Machine Learning Research Engineer",
    period: "Aug 2022 — Feb 2024",
    category: "Engineering",
    latexTags: ["Model Training", "AI Agents", "RAG", "Research"],
    domainTags: ["AI Agents", "LLM Systems"],
    metrics: [
      { label: "Retrieval Accuracy", value: "96.1%", detail: "Hit-rate on developer API questions" },
      { label: "Doc Sync Latency", value: "< 5 Min", detail: "Incremental embedding updates upon commit" },
      { label: "Internal Team Usage", value: "Daily", detail: "Adopted across 40+ engineering team members" },
    ],
    challenge:
      "With hundreds of daily code commits across multiple repositories, engineers struggled to navigate rapidly changing internal API specifications, undocumented helper utilities, and evolving design architecture decisions.",
    architecture:
      "RAG pipeline featuring hierarchical AST code chunking, hybrid dense-sparse vector search (Qdrant + BM25), reciprocal rank fusion (RRF), and citation-enforced generation ensuring answers reference exact repository line numbers.",
    methodology: [
      "Engineered code-aware chunking preserving Python class hierarchies and docstring context instead of arbitrary token splits.",
      "Automated incremental webhook re-indexing triggered by GitHub merge events.",
      "Implemented strict hallucination guardrails rejecting queries without grounded source evidence.",
    ],
    results: [
      "Substantially reduced new engineering onboarding time and cross-team developer support inquiries.",
      "Enabled instant answers for complex questions regarding compiler backend dispatch logic.",
    ],
    techStack: ["Python", "FastAPI", "Qdrant", "Sentence Transformers", "LangChain", "Docker", "Slack API"],
    links: [],
  },
  {
    id: "ivy-5",
    slug: "edge-model-optimization",
    title: "Edge Model Quantization & Compression Engine",
    subtitle: "Post-training quantization, structural pruning, and tensorization for resource-constrained edge devices",
    company: "Deep Ivy, Inc",
    companySlug: "deep-ivy",
    role: "Machine Learning Research Engineer",
    period: "Aug 2022 — Feb 2024",
    category: "Engineering",
    featured: true,
    featuredSpan: "vertical",
    latexTags: ["Model Compression", "Optimization", "Edge Deployment", "Engineering"],
    domainTags: ["Compilers & Frameworks"],
    metrics: [
      { label: "Model Size Reduction", value: "72.4%", detail: "INT8 / INT4 post-training compression" },
      { label: "Inference Speedup", value: "2.8x", detail: "Achieved on ARM / mobile edge silicon" },
      { label: "Accuracy Degradation", value: "< 0.4%", detail: "Maintained baseline task accuracy" },
    ],
    challenge:
      "Deploying vision and language models on mobile and embedded hardware is constrained by memory, battery, and thermal limits. Compression can reduce model size, but careless quantization or pruning can also damage accuracy and create operators that run poorly on the target device.",
    architecture:
      "A hardware-aware optimization suite combines post-training INT8 quantization, quantization-aware training, structured channel pruning, and low-rank tensor decomposition for ARM NEON and mobile NPU targets. Layer sensitivity and on-device profiling guide each transformation to reduce memory and compute costs while preserving task accuracy and thermal stability.",
    methodology: [
      "Conducted sensitivity analysis to identify layer-by-layer quantization vulnerability.",
      "Benchmarked physical edge devices (Raspberry Pi, Jetson Nano, mobile devices) for thermal stability.",
      "Exported optimized artifacts to ONNX, TensorRT, and TFLite runtimes.",
    ],
    results: [
      "Successfully enabled real-time edge computer vision inference on constrained customer client hardware.",
      "Established standard optimization recipes incorporated into Ivy's deployment compilation toolkit.",
    ],
    techStack: ["PyTorch", "TensorRT", "ONNX", "TFLite", "C++", "Python", "ARM NEON"],
    links: [],
  },

  // ---------------------------------------------------------------------------
  // 4. Freelance (Data Scientist, Dec 2018 - Jun 2022)
  // ---------------------------------------------------------------------------
  {
    id: "free-1",
    slug: "dynamic-freight-rate-forecasting",
    title: "Dynamic Spot Freight Rate Forecasting & Spatial Logistics Pricing",
    subtitle: "Out-of-time walk-forward gradient boosting engine predicting spot truckload rates with geodesic routing, carrier market index elasticity, and automated data quality guardrails",
    company: "Freelance",
    companySlug: "freelance",
    role: "Data Scientist",
    period: "Dec 2018 — Jun 2022",
    category: "Analysis",
    latexTags: ["Predictive Pricing", "Gradient Boosting", "Geospatial Routing", "Time-Series"],
    domainTags: ["Logistics & Supply Chain", "Data Science"],
    metrics: [
      { label: "Forward Test R²", value: "0.836", detail: "On strictly out-of-time monthly holdout validation folds" },
      { label: "Median Absolute Error", value: "$49.21", detail: "Typical prediction deviation on standard commercial line-hauls" },
      { label: "Sample Scale", value: "60k Shipments", detail: "48k labeled training loads + 12k prospective validation loads" },
      { label: "Error Reduction vs OLS", value: "-16.4% MAE", detail: "Significant improvement over distance-only linear baselines ($161.93 vs $193.69)" },
    ],
    challenge:
      "Accurately quoting spot truckload freight rates under severe market volatility, right-skewed pricing distributions ($150 to $25,500+), unannounced geographic network node expansion (unseen validation destinations), and corrupted sensor/weight measurements without introducing temporal lookahead leakage.",
    architecture:
      "Modular pipeline combining spatial kinematics (Haversine great-circle distance, route detour ratios, coordinate delta projections), cyclical Fourier calendar harmonics, indicator-based missingness/invalidity imputation, unknown-tolerant categorical encoders, and L2-regularized HistGradientBoostingRegressor.",
    methodology: [
      "Engineered automated data hygiene guardrails capturing physically impossible negative cargo weights and missing macro indices as informative indicator features prior to median imputation.",
      "Computed continuous geodesic spatial metrics including Haversine great-circle distance and highway route detour curvature ratios to resolve non-linear geographic path resistance.",
      "Embedded cyclic Fourier terms (month, day-of-week) and linear epoch counters to model quarterly carrier capacity tightening and intra-week dispatch cycles.",
      "Implemented strict walk-forward monthly rolling cross-validation (July through October folds) to mirror production prospective deployment and eliminate temporal leakage.",
    ],
    results: [
      "Achieved average forward-fold MAE of $161.93 and Median Absolute Error of $59.07, reducing error by 16.4% over distance-only linear baselines.",
      "Robustly accommodated 8 new destination markets in holdout validation without pipeline disruption via zero-vector category handling.",
      "Delivered calibrated daily holiday rate surge projections across fixed commercial benchmark corridors (Lexington to Fort Wayne).",
    ],
    techStack: ["Scikit-Learn", "Python", "NumPy", "Pandas", "Matplotlib", "SciPy"],
    links: [],

    // Dedicated data project structure
    isDataProjectStructure: true,
    contextAndObjective: {
      headline: "Dynamic Pricing & Spatial Capacity Modeling for US Spot Freight Logistics",
      details: [
        "Spot freight rates shift with regional supply, fuel costs, equipment availability, and seasonal demand, so brokers must quote quickly while balancing carrier acceptance against margin. This model predicts rates across 60,000 shipments (48,000 historical and 12,000 prospective holdout loads), with validation designed to prevent temporal leakage, preserve anomalous data signals, handle new markets, and test holiday pricing behavior.",
      ],
      dataModalities: [
        {
          name: "Geospatial Corridors & OTR Mileage",
          sensor: "GIS GPS Coordinates & OTR Mileage",
          rate: "Per Shipment",
          role: "Captures origin/destination lat-lon coordinates, highway miles, and route topography",
        },
        {
          name: "Trailer & Cargo Payload Attributes",
          sensor: "Manifest Telemetry (Weight & Equipment)",
          rate: "Per Shipment",
          role: "Encodes equipment class (Dry Van, Reefer, Flatbed) and cargo tonnage with quality flags",
        },
        {
          name: "Macroeconomic Market Signals",
          sensor: "National Capacity Index & Quoting Velocity",
          rate: "Daily Aggregate",
          role: "Reflects spot truck supply/demand ratio (market_index) and quoting intensity (quote_signal)",
        },
        {
          name: "Temporal Calendar & Seasonality",
          sensor: "Dispatch Timestamps (2025)",
          rate: "Continuous",
          role: "Supplies calendar month, day-of-week, quarter, and elapsed epoch days for trend modeling",
        },
      ],
    },
    designedSolution: {
      headline: "Geodesic Kinematics, Indicator Imputation & Walk-Forward Gradient Boosted Regressor",
      details: [
        "An end-to-end scikit-learn pipeline combines geospatial, calendar, and market features with an L2-regularized HistGradientBoostingRegressor to model nonlinear pricing across short and long hauls. Haversine distance and route detour ratios describe geography, calendar harmonics model seasonal demand, and missingness flags plus unknown-tolerant market encoding help preserve data quality and handle newly appearing hubs.",
      ],
      architectureHighlights: [
        {
          title: "Geodesic Haversine Kinematics",
          badge: "Spatial Modeling",
          detail: "Spherical great-circle arc derivation and highway route detour curvature ratio (distance / d_gc) capturing mountain passes and toll friction.",
        },
        {
          title: "Indicator-Preserving Imputation",
          badge: "Data Hygiene",
          detail: "Captures 888 anomalous sensor measurements (weight_invalid, weight_missing, market_index_missing) before median imputation.",
        },
        {
          title: "Unseen Hub Fault-Tolerance",
          badge: "Network Generalization",
          detail: "OneHotEncoder with handle_unknown='ignore' allowing 8 new destination hubs in prospective validation to fall back gracefully on lat/lon coordinates.",
        },
        {
          title: "Walk-Forward Gradient Boosting",
          badge: "Validation Rigor",
          detail: "L2-regularized HistGradientBoostingRegressor evaluated across monthly rolling folds, eliminating temporal lookahead bias.",
        },
      ],
    },
    experimentalProcess: {
      headline: "5-Stage Empirical Progression: From Telemetry Diagnostics to Out-of-Time Model Validation",
      details: [
        "Developing an enterprise freight rate model required navigating critical real-world domain challenges: decoupling line-haul tariffs from fixed minimum short-haul fees, sanitizing physically impossible scale measurements without data loss, anticipating out-of-sample market index deflation, and preventing severe overconfidence from random train-test splitting on time-series records.",
      ],
      steps: [
        {
          phase: "Phase 1: Exploratory Audit & Target Skewness",
          badge: "Exploratory Audit",
          title: "Auditing Rate Skew & Distance Effects",
          description:
            "Audited 48,000 loads and found strongly right-skewed prices. Rate-per-mile fell from $3.50–$5.20 on short hauls to $1.65–$2.10 on long routes; valid high-price outliers were retained.",
          insights: [
            "Used MedAE alongside MAE and RMSE; nonlinear pricing favored tree models.",
          ],
        },
        {
          phase: "Phase 2: Telemetry Hygiene & Indicator Engineering",
          badge: "Data Hygiene",
          title: "Flagging Invalid Weights & Missing Signals",
          description:
            "Flagged missing or negative weights and absent market indices before imputation, preserving rows while distinguishing corrupted readings from genuine values.",
          insights: [
            "Retained all training rows and preserved data-quality signals.",
          ],
        },
        {
          phase: "Phase 3: Geodesic Kinematics & Network Topology",
          badge: "Geospatial Engineering",
          title: "Modeling Routes & New Markets",
          description:
            "Combined Haversine distance and route detour ratios with market categories. Unknown-tolerant encoding handled eight new holdout hubs using their coordinates.",
          insights: [
            "Spatial features captured route friction without external routing APIs.",
          ],
        },
        {
          phase: "Phase 4: Walk-Forward Validation & Regime Shift",
          badge: "Validation Architecture",
          title: "Validating with Monthly Forward Folds",
          description:
            "Used four monthly walk-forward folds to prevent future data leakage. Forward-fold MAE averaged $161.93, 16.4% lower than the distance-only baseline.",
          insights: [
            "Validation reflected real deployment across changing market conditions.",
          ],
        },
        {
          phase: "Phase 5: Benchmark Corridor Stress-Testing",
          badge: "Deployment Simulation",
          title: "Stress-Testing a Holiday Corridor",
          description:
            "Tested a fixed Lexington-to-Fort Wayne lane across December. The model captured the pre-Christmas rate surge, from an $840–$890 baseline to a peak above $1,140.",
          insights: [
            "All 12,000 holdout predictions remained positive.",
          ],
        },
      ],
    },
  },
  {
    id: "free-2",
    slug: "pediatric-bfrb-classification",
    title: "Pediatric Body-Focused Repetitive Behavior (BFRB) Classification",
    subtitle: "Multimodal time-series deep learning pipeline detecting pediatric BFRBs from wearable IMU, thermal, and ToF telemetry",
    company: "Freelance",
    companySlug: "freelance",
    role: "Data Scientist",
    period: "Dec 2018 — Jun 2022",
    category: "Analysis",
    latexTags: ["Model Training", "Sensor Data", "Healthcare", "Data Science"],
    domainTags: ["Simulation & Healthcare"],
    metrics: [
      { label: "Classification F1", value: "92.8%", detail: "Distinguishing BFRBs from normal daily movements" },
      { label: "False Positive Rate", value: "< 2.1%", detail: "Critical for non-intrusive clinical monitoring" },
      { label: "Sensor Modalities", value: "3 Streams", detail: "6-DoF IMU (50 Hz), 5-ch Thermal (10 Hz), 64-zone ToF (5 Hz)" },
      { label: "Inference Latency", value: "< 14 ms", detail: "On-device processing window with TTA averaging" },
    ],
    challenge:
      "Distinguishing subconscious repetitive movements (such as trichotillomania, skin picking, or nail biting) from normal daily child gestures (scratching, eating, adjusting glasses) using noisy wearable multi-sensor telemetry.",
    architecture:
      "Dual-tower multimodal deep learning pipeline: physics-based gravity deconvolution, quaternion angular kinematics, residual SE-CNN blocks, Bidirectional GRU with temporal self-attention, and 5-pass Test-Time Augmentation (TTA).",
    methodology: [
      "Removed Earth's 9.81 m/s² gravity vector via inverse quaternion rotation to isolate pure kinetic linear acceleration.",
      "Derived instantaneous 3D angular velocity from relative rotation quaternions and extracted jerk and FFT spectral peaks.",
      "Engineered asymmetric dual-tower architecture with Squeeze-and-Excitation channel gating and IMU-only fallback.",
      "Implemented continuous Mixup augmentation (α = 0.4), label smoothing, and 5-pass Test-Time Augmentation (TTA).",
    ],
    results: [
      "Achieved high clinical-grade F1 score while strictly maintaining false positive rates below 2.1% on holdout subjects.",
      "Built resilient fallback architecture capable of continuous inference even when optical ToF sensors are occluded.",
    ],
    techStack: ["TensorFlow", "Keras", "Python", "NumPy", "SciPy", "Scikit-Learn", "Pandas"],
    links: [],

    // Dedicated data project structure
    isDataProjectStructure: true,
    contextAndObjective: {
      headline: "Objective Behavioral Monitoring for Pediatric BFRBs via Multi-Sensor Wearable Telemetry",
      details: [
        "Body-focused repetitive behaviors such as hair pulling, skin picking, and nail biting can harm children, yet diagnosis and treatment tracking often rely on incomplete caregiver recall. This project develops a real-time classifier for subtle episodes from wrist-worn wearable signals while minimizing false alarms on everyday movements like scratching, eating, or adjusting glasses.",
      ],
      dataModalities: [
        {
          name: "6-DoF Inertial Measurement Unit",
          sensor: "3-Axis Accel + Quaternion Gyro",
          rate: "50 Hz",
          role: "Captures 3D spatial velocity, rotational dynamics, and gesture trajectories",
        },
        {
          name: "Thermopile Array",
          sensor: "5-Channel Thermal Sensor",
          rate: "10 Hz",
          role: "Detects hand-to-face and hand-to-body proximity via infrared thermal gradients",
        },
        {
          name: "Time-of-Flight (ToF) Matrix",
          sensor: "64-Zone (8×8) Distance Grid",
          rate: "5 Hz",
          role: "Measures precise millimeter distance between wrist and target body surfaces",
        },
        {
          name: "Demographic Metadata",
          sensor: "Subject Profile (Age, Sex)",
          rate: "Static",
          role: "Provides subject-level covariates for stratified cross-validation",
        },
      ],
    },
    designedSolution: {
      headline: "Dual-Tower Multi-Modal SE-CNN with BiGRU, Temporal Attention & Test-Time Augmentation",
      details: [
        "An asymmetric dual-tower model separates high-rate motion from lower-rate proximity and thermal signals. The motion tower removes gravity and learns temporal patterns with residual CNN and BiGRU attention layers, while the spatial tower encodes ToF and thermal data; a fusion head combines them, with an IMU-only fallback for sensor dropouts and test-time augmentation for robust predictions.",
      ],
      architectureHighlights: [
        {
          title: "Gravity-Compensated Kinematics",
          badge: "Quaternion Rotation",
          detail: "Rotates Earth's gravity vector (0, 0, 9.81) into sensor space via inverse quaternions, isolating pure linear acceleration and kinematic jerk.",
        },
        {
          title: "Residual SE-CNN & BiGRU Attention",
          badge: "Channel & Temporal Gating",
          detail: "Squeeze-and-Excitation blocks dynamically re-weight informative sensor channels, while BiGRU and self-attention capture temporal gesture arcs.",
        },
        {
          title: "Asymmetric Multimodal Fusion",
          badge: "Dual-Tower Design",
          detail: "Integrates 48 kinematic features and 325 spatial ToF/thermal channels, with an automated standalone IMU-only fallback model.",
        },
        {
          title: "5-Pass Test-Time Augmentation",
          badge: "Inference Engine",
          detail: "Applies magnitude scaling (0.9x–1.1x) and temporal rolling (-10 to +10 steps), ensembling multiple augmented forward passes for stable predictions.",
        },
      ],
    },
    experimentalProcess: {
      headline: "From Raw Noise to Calibrated Insight: Iterative Analysis, Kinematic Physics & Generalization",
      details: [
        "Developing a reliable clinical classifier from noisy wearable telemetry required addressing five fundamental challenges: isolating hand kinematics from constant gravity vectors, resolving angular velocity without gimbal lock, separating repetitive tics from everyday spontaneous movements, handling sensor dropout, and preventing severe patient-memorization across small cohorts.",
      ],
      steps: [
        {
          phase: "Phase 1: Signal audit",
          badge: "Data Diagnostics",
          title: "Find gravity and sensor gaps",
          description:
            "Checked motion signals for gravity effects and mapped where optical distance readings dropped out during gestures.",
          insights: [
            "Separate device orientation from real movement; track missing readings.",
          ],
        },
        {
          phase: "Phase 2: Motion features",
          badge: "Kinematic Engineering",
          title: "Recover clean movement signals",
          description:
            "Used orientation quaternions to remove gravity and derive smooth angular velocity and jerk features.",
          insights: [
            "Isolate true motion, including fast wrist turns.",
          ],
        },
        {
          phase: "Phase 3: Rhythm features",
          badge: "Spectral Analysis",
          title: "Measure repetitive movement",
          description:
            "Extracted FFT cadence and rolling motion statistics to distinguish repeated gestures from brief movements.",
          insights: [
            "Capture cyclic patterns and short motion bursts.",
          ],
        },
        {
          phase: "Phase 4: Multimodal model",
          badge: "Architecture Search",
          title: "Fuse streams with a fallback",
          description:
            "Built separate motion and spatial towers, plus an IMU-only fallback for optical sensor dropouts.",
          insights: [
            "Keep noisy streams isolated and maintain inference during dropouts.",
          ],
        },
        {
          phase: "Phase 5: Generalization",
          badge: "Evaluation Rigor",
          title: "Test across varied gestures",
          description:
            "Applied Mixup, label smoothing, and test-time shifts to reduce patient overfitting and gesture timing sensitivity.",
          insights: [
            "Improve robustness to different movement styles and timing.",
          ],
        },
      ],
    },
  },
  {
    id: "free-3",
    slug: "spotify-sound-trend-evolution",
    title: "Spotify Sound Trend Evolution: Centennial Audio & Lyrical Dynamics",
    subtitle: "Acoustic telemetry, lyrical sentiment dissonance, and algorithmic homogenization across 550,000 songs and 100 years",
    company: "Freelance",
    companySlug: "freelance",
    role: "Data Scientist",
    period: "Dec 2018 — Jun 2022",
    category: "Analysis",
    latexTags: ["Data Science", "Audio Processing", "Time-Series", "NLP", "Dimensionality Reduction"],
    domainTags: ["Data Science", "Audio Intelligence"],
    metrics: [
      { label: "Dataset Scale", value: "550k+ Tracks", detail: "Spanning 1920 to 2024 across 1,100+ micro-genres" },
      { label: "Acoustic Features", value: "11 Dimensions", detail: "Valence, energy, danceability, loudness, acousticness, tempo, etc." },
      { label: "Track Duration Drop", value: "-33% Length", detail: "Average track duration compressed from 4.2m down to 2.8m" },
      { label: "Loudness Shift", value: "+10.6 dBFS", detail: "Dynamic range compression from -16.8 dBFS to -6.2 dBFS" },
    ],
    challenge:
      "Music production and consumption have transformed dramatically over the past century, yet quantitative analyses rarely bridge raw physical audio signals with lyrical natural language processing to model cultural and algorithmic evolution across hundreds of thousands of recordings.",
    architecture:
      "Multi-modal audio-textual analytics pipeline: TextBlob lyrical sentiment polarity extraction, MinMaxScaler cross-feature standardization, annual variety dispersion modeling, and 2D t-SNE non-linear manifold projection.",
    methodology: [
      "Processed 550,000+ songs, extracting 11 continuous acoustic dimensions and cleaning temporal boundary artifacts.",
      "Engineered emotional dissonance metrics combining lyrical polarity with musical valence to identify 'cheerful despair'.",
      "Quantified acoustic homogenization across 10 decades using annual multidimensional standard deviation metrics.",
      "Mapped high-dimensional genre clustering and historical manifold convergence via t-SNE dimensionality reduction.",
    ],
    results: [
      "Identified the post-1990 surge of emotional dissonance, with 29.8% of modern tracks pairing happy beats with sad lyrics.",
      "Demonstrated severe acoustic variance collapse post-2000, driven by algorithmic streaming incentives and standard production.",
      "Documented the joint impact of the Loudness War (+10.6 dBFS) and TikTok-driven track duration compression (-33% length).",
    ],
    techStack: ["Python", "Pandas", "Scikit-Learn", "Seaborn", "Matplotlib", "TextBlob", "SciPy"],
    links: [],

    // Dedicated data project structure
    isDataProjectStructure: true,
    contextAndObjective: {
      headline: "Centennial Audio Telemetry & Algorithmic Shift Across 550,000 Tracks",
      details: [
        "This project analyzes 550,000+ Spotify tracks from 1920 to 2024 to trace music’s shift from acoustic to electric and streaming eras, asking whether lyrics grew sadder as beats got happier, sonic variety declined, and streaming shortened tracks or blurred genre boundaries.",
      ],
      dataModalities: [
        {
          name: "Acoustic Telemetry Vector",
          sensor: "Spotify Web API Signals",
          rate: "11 Features",
          role: "Captures continuous acoustic characteristics: danceability, energy, acousticness, valence, tempo, loudness",
        },
        {
          name: "Lyrical Text Corpus",
          sensor: "Song Lyrics Transcripts",
          rate: "Text Tokens",
          role: "Provides unstructured natural language text for sentiment polarity and emotional vocabulary extraction",
        },
        {
          name: "Temporal & Categorical Metadata",
          sensor: "Release Catalog Meta",
          rate: "Decadal Index",
          role: "Supplies track release year, artist profile, popularity index (0–100), and micro-genre classification",
        },
        {
          name: "High-Dimensional Embeddings",
          sensor: "Normalized Manifold Space",
          rate: "8D Features",
          role: "Feeds non-linear t-SNE dimensionality reduction for genre cluster geometry analysis",
        },
      ],
    },
    designedSolution: {
      headline: "Multi-Modal Audio-Textual Analytics Pipeline & Interactive Centennial Visualizer",
      details: [
        "A unified audio and text analysis pipeline standardizes acoustic features, scores lyrical sentiment, and tracks annual diversity, loudness, and duration. It identifies upbeat music paired with negative lyrics and projects normalized audio features into a 2D t-SNE map to show how genre clusters have shifted and converged over time.",
      ],
      architectureHighlights: [
        {
          title: "NLP Lyrical Sentiment & Dissonance",
          badge: "TextBlob NLP",
          detail: "Maps lyrics to continuous emotional polarity [-1.0, +1.0] and cross-references against musical valence to isolate emotional dissonance.",
        },
        {
          title: "Acoustic Diversity Dispersion Metric",
          badge: "Statistical Variance",
          detail: "Computes annual multidimensional standard deviation across 6 normalized features, proving secular acoustic homogenization post-2000.",
        },
        {
          title: "Loudness & Duration Compression Models",
          badge: "Time-Series Regression",
          detail: "Tracks dynamic range compression (+10.6 dBFS) and the 33% decline in average track length (4.2 min to 2.8 min) driven by streaming royalties.",
        },
        {
          title: "t-SNE Genre Galaxy Projection",
          badge: "Manifold Learning",
          detail: "Projects 8D acoustic space into a 2D non-linear embedding, exposing how modern commercial genres have converged onto a single centroid.",
        },
      ],
    },
    experimentalProcess: {
      headline: "From Raw Telemetry to Cultural Insight: Five Diagnostic Probes",
      details: [
        "Uncovering centennial cultural and production trends across 550,000 tracks required a structured, five-stage investigative process: sanitizing century-spanning telemetry, formalizing lyrical-musical dissonance, computing annual diversity indices, analyzing streaming economic incentives, and embedding genre manifold geometry.",
      ],
      steps: [
        {
          phase: "Phase 1: Data preparation",
          badge: "Data Hygiene",
          title: "Clean and validate the catalog",
          description:
            "Filtered incomplete years and invalid audio values, then prepared separate acoustic and lyrics cohorts to handle missing text.",
          insights: [
            "Remove invalid values and partial years before measuring trends.",
          ],
        },
        {
          phase: "Phase 2: Mood comparison",
          badge: "NLP Sentiment",
          title: "Compare lyrics and sound",
          description:
            "Scored lyric sentiment and compared it with acoustic valence, revealing more upbeat production paired with negative lyrics in recent decades.",
          insights: [
            "Measure emotional alignment between lyrics and musical mood.",
          ],
        },
        {
          phase: "Phase 3: Acoustic diversity",
          badge: "Variance Analysis",
          title: "Track changes in sonic variety",
          description:
            "Normalized six core audio features and tracked their annual spread as a measure of sonic variety.",
          insights: [
            "Annual feature spread shows diversity peaking in the late 1970s before contracting after 2000.",
          ],
        },
        {
          phase: "Phase 4: Production trends",
          badge: "Streaming Economics",
          title: "Measure loudness and track length",
          description:
            "Tracked rising loudness and a 33% drop in average track duration, from 4.2 minutes in the 1980s to 2.8 minutes in 2024.",
          insights: [
            "Relate production loudness and shorter formats to changes in listening platforms.",
          ],
        },
        {
          phase: "Phase 5: Genre mapping",
          badge: "Manifold Learning",
          title: "Map genre relationships",
          description:
            "Projected representative tracks across eight audio features into a 2D t-SNE map to compare genre clusters over time.",
          insights: [
            "Compare distinct historical genre clusters with the greater overlap in modern music.",
          ],
        },
      ],
    },
  },

  // ---------------------------------------------------------------------------
  // 5. Personal Projects (Engineering)
  // ---------------------------------------------------------------------------
  {
    id: "pers-1",
    slug: "distforge",
    title: "DistForge: Procedural Signed Distance Function (SDF) 3D Modeling & AST Compiler",
    subtitle: "Pythonic 3D Code-CAD framework compiling declarative geometry trees into optimized GLSL for real-time GPU raymarching and compute-shader mesh extraction",
    company: "Personal Project",
    companySlug: "personal",
    role: "Author & Core Developer",
    period: "2024 — Present",
    category: "Engineering",
    projectContext: "personal",
    featured: true,
    featuredSpan: "horizontal",
    latexTags: ["Computer Graphics", "GPU Shaders", "Compilers", "3D Modeling", "Open Source", "Engineering"],
    domainTags: ["3D Computer Graphics", "Compilers & Runtimes"],
    metrics: [
      { label: "Evaluation Speed", value: "60+ FPS", detail: "Real-time 1080p GPU sphere-tracing raymarcher with ambient occlusion" },
      { label: "GPU Sample Scale", value: "4.2M Points", detail: "2²² sample evaluations per mesh extraction pass" },
      { label: "Code-CAD Ergonomics", value: "Pythonic AST", detail: "Bitwise boolean CSG (|,-,&), domain-warping, and dynamic uniform binding" },
      { label: "Recompilation Latency", value: "< 8 ms", detail: "Sub-second watchdog hot-reloading preserving viewport and camera state" },
    ],
    challenge:
      "Procedural 3D modeling with Signed Distance Functions (SDFs) offers infinite mathematical resolution and watertight Constructive Solid Geometry (CSG), but previously forced developers into a severe compromise: either write monolithic, low-level GLSL shaders by hand without modularity, or endure 100x–1,000x CPU vectorization bottlenecks in Python that cripple interactive design iteration.",
    architecture:
      "Two-phase decoupled architecture: a declarative Python Abstract Syntax Tree (AST) representing geometric primitives, CSG booleans, and spatial domain transformations; and a context-aware GLSL compiler with dynamic variable allocation, dependency deduplication, and recursive inverse coordinate domain-warping. The compiled AST targets dual pathways: a screen-space GPU fragment shader for real-time 60 FPS viewport raymarching with watchdog hot-reloading, and an OpenGL 4.3 Compute Shader utilizing SSBOs for massive parallel sampling and feature-preserving Dual Contouring mesh extraction (STL, OBJ, GLB).",
    pipelineDiagram: [
      "Python Procedural Code (Primitives & CSG: box | sphere - cutter)",
      "                              │",
      "                              ▼",
      "      Declarative Abstract Syntax Tree (SDFNode Graph)",
      "                              │",
      "                              ▼",
      "    Context-Aware AST-to-GLSL Compiler (GLSLContext)",
      "               ┌──────────────┴──────────────┐",
      "               ▼                             ▼",
      "   Screen-Space Fragment Shader      OpenGL 4.3 Compute Shader",
      " (Real-Time GPU Raymarcher 60 FPS)    (Parallel Point Sampling SSBO)",
      "               │                             │",
      "               ▼                             ▼",
      " Native GLFW Live Window & Hot-Reload  Meshing: Dual Contouring / Marching Cubes (OBJ, STL, GLB)",
    ],
    methodology: [
      "Designed an object-oriented Python AST where SDFNode primitives (Box, Sphere, Cylinder, Torus, Forge) overload bitwise operators (__or__, __sub__, __and__) to construct expression trees without premature spatial evaluation.",
      "Engineered an AST-to-GLSL compiler with dynamic variable index allocation (var_0, var_1), deduplicated dependency header resolution, and recursive domain-warping (inverse coordinate transforms) eliminating global matrix multiplication overhead.",
      "Built an interactive native viewing engine via GLFW and ModernGL with watchdog file-system monitoring, dynamically executing user code, recompiling shaders, and hot-swapping into the live OpenGL context under 8 ms.",
      "Developed a headless GPU compute-shader meshing engine accepting Shader Storage Buffer Objects (SSBOs) to evaluate 2^22 sample points, integrated with Adaptive Octree spatial pruning and Dual Contouring with Moore-Penrose pseudo-inverse QEF solving for sharp edge preservation.",
    ],
    results: [
      "Delivered real-time 60+ FPS visual feedback for complex CSG procedural models in full 1080p, completely eliminating the slow compile-wait-view cycle of traditional CPU Code-CAD tools.",
      "Guaranteed watertight, non-manifold-free mesh exports with razor-sharp feature preservation across boolean subtractions and smooth polynomial smin blending.",
      "Authored a comprehensive technical research paper detailing the AST-to-GLSL compiler architecture, domain warping mathematics, and compute-shader meshing benchmarks.",
    ],
    techStack: ["Python", "GLSL", "OpenGL", "ModernGL", "GLFW", "NumPy", "C++", "Trimesh", "PyVista"],
    links: [],
  },
  {
    id: "pers-2",
    slug: "patchllm",
    title: "PatchLLM: Interactive Codebase Refactoring & Patching CLI Agent",
    subtitle: "Terminal-based coding agent with human-in-the-loop patch approval, dynamic AST scopes, and resilient session checkpointing",
    company: "Personal Project",
    companySlug: "personal",
    role: "Author & Core Developer",
    period: "2024 — Present",
    category: "Engineering",
    projectContext: "personal",
    featured: false,
    latexTags: ["Developer Tools", "AI Agents", "Code Refactoring", "CLI", "Open Source", "Engineering"],
    domainTags: ["Developer Tooling", "AI Agents"],
    metrics: [
      { label: "Context Reduction", value: "85%", detail: "AST-scoped context vs. full-repository ingestion" },
      { label: "Context Scoping", value: "Dynamic AST", detail: "Git staged, directory recursion, custom scopes cutting 85% token bloat" },
      { label: "CLI Latency", value: "< 45 ms", detail: "Terminal TUI built with prompt_toolkit & InquirerPy" },
      { label: "Model Interop", value: "Multi-Provider", detail: "LiteLLM unified abstraction across OpenAI, Gemini, Claude, and Ollama" },
    ],
    challenge:
      "Autonomous coding agents frequently make hallucinated edits across entire repositories or produce monolithic diffs that are difficult to verify, leading developers to reject AI-generated code due to lack of granular step-by-step control, scope fencing, and rollback capabilities.",
    architecture:
      "Modular interactive agent architecture decoupling Task Formulation (/task), Step-by-Step Plan Generation (/plan), Targeted Context Ingestion (@git:staged, @dir:src), Sandboxed Diff Execution (/run), and Interactive Human-in-the-Loop Patch Approval (/approve, /revert). Built on top of a resilient session checkpointing state machine, LiteLLM multi-provider abstraction, and an asynchronous terminal TUI.",
    pipelineDiagram: [
      "User Task Prompt & Dynamic Scopes (@git:staged, @dir:src)",
      "                             │",
      "                             ▼",
      "       Interactive Step-by-Step Planner (/plan)",
      "                             │",
      "                             ▼",
      "   Targeted Context Assembly & Token Window Budgeting",
      "                             │",
      "                             ▼",
      "      LLM Patch Generation & Unified Diff Parsing",
      "                             │",
      "                             ▼",
      "    Human Review & Interactive Approval (/diff, /approve)",
      "               ┌─────────────┴─────────────┐",
      "               ▼                           ▼",
      "   Atomic Disk Patch Apply     Session Revert / Rollback",
    ],
    methodology: [
      "Designed a stateful CLI session architecture that records the current task, active plan steps, file contexts, and execution history, supporting seamless checkpointing and crash recovery.",
      "Built dynamic scope syntax (@git:staged, @dir:path, @file:path, @url:web) allowing developers to precisely restrict token budgets to affected subsystems.",
      "Implemented an interactive terminal TUI with auto-completion, multi-file diff syntax highlighting, and step-by-step approvals using prompt_toolkit and InquirerPy.",
      "Integrated LiteLLM provider routing to support local and cloud foundation models (Gemini, Claude, GPT-4) with unified error handling and retry loops.",
    ],
    results: [
      "Achieved 100% human-verified patch accuracy by requiring step-by-step user confirmation before writing changes to disk.",
      "Significantly cut hallucinated token usage by dynamically pruning context via fine-grained scope expressions.",
      "Delivered resilient developer workflows with zero-data-loss session serialization and instant rollback mechanisms.",
    ],
    techStack: ["Python", "LiteLLM", "Prompt Toolkit", "InquirerPy", "Git", "Click", "Rich"],
    links: [],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return PROJECTS.map((p) => p.slug);
}
