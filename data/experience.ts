export interface ExperienceRole {
  company: string;
  companySlug: string;
  role: string;
  location: string;
  period: string;
  isCurrent?: boolean;
  summary: string;
  bulletSlugs: string[];
}

export const EXPERIENCES: ExperienceRole[] = [
  {
    company: "Unfolding Labs",
    companySlug: "unfolding-labs",
    role: "AI Researcher",
    location: "Remote",
    period: "2026 — Present",
    isCurrent: true,
    summary:
      "Conducting fundamental research into learning agents, neuro-symbolic reasoning, continual learning, and the internal representations underlying autonomous behavior.",
    bulletSlugs: [
      "endogenous-subspace-orthogonalization",
      "driftlab-agent-adaptation",
    ],
  },
  {
    company: "Unify AI, Ltd",
    companySlug: "unify-ai",
    role: "AI Engineer",
    location: "Remote",
    period: "Feb 2024 — Sep 2026",
    summary:
      "Engineered production AI agent architectures, dynamic neural routers, LLM observability dashboards, high-throughput model evaluation harnesses, and real-time generative computer vision streaming pipelines.",
    bulletSlugs: [
      "autonomous-ai-teammates",
      "neural-llm-router",
      "llm-observability-platform",
      "llm-evals-benchmarking",
      "realtime-avatar-animation",
      "generative-video-pipeline",
    ],
  },
  {
    company: "Deep Ivy, Inc",
    companySlug: "deep-ivy",
    role: "Machine Learning Research Engineer",
    location: "Remote",
    period: "Aug 2022 — Feb 2024",
    summary:
      "Core contributor to the Ivy unified framework and transpiler. Added PyTorch, JAX, and NumPy compiler backend/frontend interop, developed autonomous framework code-generation agents, deployed internal RAG assistants, and optimized models for edge deployment.",
    bulletSlugs: [
      "ivy-framework-transpiler",
      "cross-framework-model-benchmarks",
      "self-contributing-codegen-agent",
      "rag-docs-assistant",
      "edge-model-optimization",
    ],
  },
  {
    company: "Freelance",
    companySlug: "freelance",
    role: "Data Scientist",
    location: "Remote",
    period: "Dec 2018 — Jun 2022",
    summary:
      "Developed applied machine learning, predictive pricing, and time-series sensor systems across logistics freight networks, wearable healthcare devices, and large-scale cultural audio datasets.",
    bulletSlugs: [
      "dynamic-freight-rate-forecasting",
      "pediatric-bfrb-classification",
      "spotify-sound-trend-evolution",
    ],
  },
  {
    company: "Personal Projects",
    companySlug: "personal",
    role: "Open-Source Creator & Engineer",
    location: "Remote",
    period: "2024 — Present",
    summary:
      "Open-source procedural 3D modeling compilers and interactive terminal coding agents, developing real-time GPU raymarching engines and developer refactoring tools.",
    bulletSlugs: [
      "distforge",
      "patchllm",
    ],
  },
];
