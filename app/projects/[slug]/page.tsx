import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  PROJECTS,
  getProjectBySlug,
  getAllProjectSlugs,
  getProjectDisplayTags,
} from "@/data/projects";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Award,
  Layers,
  Cpu,
  Target,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Compass,
  FlaskConical,
  Lightbulb,
} from "lucide-react";
import { GithubIcon } from "@/components/Icons";
import { Footer } from "@/components/Footer";
import { NeuralRouterFigure } from "@/components/figures/NeuralRouterFigure";
import { IvyCompilerFigure } from "@/components/figures/IvyCompilerFigure";
import { RouterArchitectureDiagram } from "@/components/figures/RouterArchitectureDiagram";
import { IvyTracingDiagram } from "@/components/figures/IvyTracingDiagram";
import { TeammatesFigure } from "@/components/figures/TeammatesFigure";
import { TeammatesArchitectureDiagram } from "@/components/figures/TeammatesArchitectureDiagram";
import { ObservabilityFigure } from "@/components/figures/ObservabilityFigure";
import { ObservabilityArchitectureDiagram } from "@/components/figures/ObservabilityArchitectureDiagram";
import { BenchmarkingFigure } from "@/components/figures/BenchmarkingFigure";
import { BenchmarkingArchitectureDiagram } from "@/components/figures/BenchmarkingArchitectureDiagram";
import { AvatarFigure } from "@/components/figures/AvatarFigure";
import { AvatarArchitectureDiagram } from "@/components/figures/AvatarArchitectureDiagram";
import { StoryboardFigure } from "@/components/figures/StoryboardFigure";
import { StoryboardArchitectureDiagram } from "@/components/figures/StoryboardArchitectureDiagram";
import { EdgeOptimizationFigure } from "@/components/figures/EdgeOptimizationFigure";
import { EdgeOptimizationArchitectureDiagram } from "@/components/figures/EdgeOptimizationArchitectureDiagram";
import { TranspilationBenchmarkingFigure } from "@/components/figures/TranspilationBenchmarkingFigure";
import { TranspilationBenchmarkingArchitecture } from "@/components/figures/TranspilationBenchmarkingArchitecture";
import { AutonomousCodeGenFigure } from "@/components/figures/AutonomousCodeGenFigure";
import { AutonomousCodeGenArchitecture } from "@/components/figures/AutonomousCodeGenArchitecture";
import { RagDocsFigure } from "@/components/figures/RagDocsFigure";
import { MultiRepoRagArchitecture } from "@/components/figures/MultiRepoRagArchitecture";
import { OrthoLoraFigure } from "@/components/figures/OrthoLoraFigure";
import { OrthoLoraApproachDiagram } from "@/components/figures/OrthoLoraApproachDiagram";
import { DriftLabFigure } from "@/components/figures/DriftLabFigure";
import { DriftLabArchitectureDiagram } from "@/components/figures/DriftLabArchitectureDiagram";
import { BfrbDetectionFigure } from "@/components/figures/BfrbDetectionFigure";
import { BfrbExperimentalProcessDiagram } from "@/components/figures/BfrbExperimentalProcessDiagram";
import { SpotifyTrendFigure } from "@/components/figures/SpotifyTrendFigure";
import { SpotifyTrendProcessDiagram } from "@/components/figures/SpotifyTrendProcessDiagram";
import { FreightPricingFigure } from "@/components/figures/FreightPricingFigure";
import { FreightPricingProcessDiagram } from "@/components/figures/FreightPricingProcessDiagram";
import { DistForgeFigure } from "@/components/figures/DistForgeFigure";
import { DistForgeArchitectureDiagram } from "@/components/figures/DistForgeArchitectureDiagram";
import { PatchLlmFigure } from "@/components/figures/PatchLlmFigure";
import { PatchLlmArchitectureDiagram } from "@/components/figures/PatchLlmArchitectureDiagram";
import { ProjectTypeIcon } from "@/components/ProjectTypeIcon";
import type { Metadata } from "next";

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getAllProjectSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} | Nassim Berrada`,
    description: project.subtitle,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  // Find previous and next project for smooth browsing
  const currentIndex = PROJECTS.findIndex((p) => p.slug === slug);
  const prevProject = currentIndex > 0 ? PROJECTS[currentIndex - 1] : null;
  const nextProject =
    currentIndex < PROJECTS.length - 1 ? PROJECTS[currentIndex + 1] : null;

  return (
    <div className="project-page min-h-screen pt-28 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Back Link & Breadcrumb */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-xs font-mono text-[var(--muted)] hover:text-emerald-500 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Projects</span>
          </Link>

          <div className="text-xs font-mono text-[var(--muted)]">
            Project {currentIndex + 1} of {PROJECTS.length}
          </div>
        </div>

        {/* Header Metadata */}
        <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono mb-4">
          <span role="img" aria-label={`${project.category} project`}>
            <ProjectTypeIcon category={project.category} className="h-4 w-4 text-emerald-500" />
          </span>
          <span className="text-[var(--foreground)] font-medium">
            {project.company}
          </span>
          <span className="text-[var(--muted)]">·</span>
          <span className="text-[var(--foreground)] font-medium">
            {project.role}
          </span>
          <span className="text-[var(--muted)]">·</span>
          <span className="text-[var(--muted)]">{project.period}</span>
        </div>

        {/* Title & Subtitle */}
        <h1 className="project-page-title text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-[var(--foreground)] leading-[1.02]">
          {project.title}
        </h1>
        <p className="mt-3 text-base sm:text-lg text-[var(--muted)] leading-relaxed">
          {project.subtitle}
        </p>

        {/* Action Links (GitHub, Product Hunt, Papers) */}
        {project.links && project.links.length > 0 && (
          <div className="mt-6 flex flex-wrap items-center gap-3">
            {project.links.map((link, idx) => (
              <a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium transition-all shadow-sm"
              >
                {link.type === "github" ? (
                  <GithubIcon className="w-4 h-4" />
                ) : (
                  <ExternalLink className="w-4 h-4" />
                )}
                <span>{link.label}</span>
              </a>
            ))}
          </div>
        )}

        <hr className="my-12 border-[var(--border)]" />

        {/* Deep Dive Content Sections */}
        <div className="project-page-content space-y-12">
          {project.isResearchStructure ? (
            <div className="space-y-12">
              {/* Section 1: Question */}
              <section className="space-y-4">
                <div className={`flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider ${["driftlab-agent-adaptation", "endogenous-subspace-orthogonalization"].includes(project.slug) ? "text-emerald-600 dark:text-emerald-400" : "text-blue-600 dark:text-blue-400"}`}>
                  <HelpCircle className="w-4 h-4" />
                  <span>{["driftlab-agent-adaptation", "endogenous-subspace-orthogonalization"].includes(project.slug) ? "Question" : "01 / Question"}</span>
                </div>

                <div className="space-y-4 text-base text-[var(--foreground)] leading-relaxed">
                  {(project.questionDetails || [project.challenge]).map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>
              </section>

              {/* Section 2: Approach */}
              <section className="space-y-6">
                <div className={`flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider ${["driftlab-agent-adaptation", "endogenous-subspace-orthogonalization"].includes(project.slug) ? "text-emerald-600 dark:text-emerald-400" : "text-blue-600 dark:text-blue-400"}`}>
                  <Compass className="w-4 h-4" />
                  <span>{["driftlab-agent-adaptation", "endogenous-subspace-orthogonalization"].includes(project.slug) ? "Approach" : "02 / Approach"}</span>
                </div>

                <div className="space-y-4 text-base text-[var(--foreground)] leading-relaxed">
                  {(project.approachDetails || [project.architecture]).map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>

                {/* FIG 1: Dynamic Process Visual (Reused from blog figure.ortho-flow) */}
                {project.slug === "endogenous-subspace-orthogonalization" && (
                  <OrthoLoraFigure />
                )}
                {project.slug === "driftlab-agent-adaptation" && (
                  <DriftLabFigure />
                )}
              </section>

              {/* Section 3: Methodology */}
              <section className="space-y-6">
                <div className={`flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider ${["driftlab-agent-adaptation", "endogenous-subspace-orthogonalization"].includes(project.slug) ? "text-emerald-600 dark:text-emerald-400" : "text-blue-600 dark:text-blue-400"}`}>
                  <FlaskConical className="w-4 h-4" />
                  <span>{["driftlab-agent-adaptation", "endogenous-subspace-orthogonalization"].includes(project.slug) ? "Methodology" : "03 / Methodology"}</span>
                </div>

                <p className="text-base text-[var(--muted)] leading-relaxed">
                  {project.slug === "endogenous-subspace-orthogonalization" ? (
                    <>
                      Empirical evaluation protocol, loss optimization formulation, and layer interventions inferred directly from the research repository (<code className="text-[var(--foreground)] font-mono">~/Code/ortho-lora</code>):
                    </>
                  ) : project.slug === "driftlab-agent-adaptation" ? (
                    <>
                      DriftLab pairs six seeded workplace worlds with controlled change protocols and an evaluator-only record of ground truth. This lets each memory setup face the same tasks and feedback, while four change probes measure detection, recovery, retention, and over-updating across three memory layers:
                    </>
                  ) : (
                    <>Empirical evaluation protocol and research methodology:</>
                  )}
                </p>

                {project.researchMethodology?.length ? (
                  <ul className="space-y-3 pl-5 list-disc marker:text-emerald-500 text-sm text-[var(--muted)]">
                    {project.researchMethodology.map((item, idx) => (
                      <li key={idx} className="pl-1 leading-relaxed">
                        <span className="font-semibold text-[var(--foreground)]">{item.title}</span>
                        {item.badge && <span className="font-mono text-xs text-[var(--muted)]"> · {item.badge}</span>}
                        <span>. {item.description}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}

                {/* Approach Schematic Diagram (Moved to Methodology) */}
                {project.slug === "endogenous-subspace-orthogonalization" && (
                  <OrthoLoraApproachDiagram />
                )}
                {project.slug === "driftlab-agent-adaptation" && (
                  <DriftLabArchitectureDiagram />
                )}

              </section>

              {/* Section 4: Findings */}
              <section className="space-y-6">
                <div className={`flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider ${["driftlab-agent-adaptation", "endogenous-subspace-orthogonalization"].includes(project.slug) ? "text-emerald-600 dark:text-emerald-400" : "text-blue-600 dark:text-blue-400"}`}>
                  <Lightbulb className="w-4 h-4" />
                  <span>{["driftlab-agent-adaptation", "endogenous-subspace-orthogonalization"].includes(project.slug) ? "Findings" : "04 / Findings"}</span>
                </div>

                <p className="text-base text-[var(--muted)] leading-relaxed">
                  {project.slug === "endogenous-subspace-orthogonalization"
                    ? "Experimental verification, geometric superposition collapse metrics, and theoretical boundary conditions synthesized from published paper tables and benchmark sweeps:"
                    : project.slug === "driftlab-agent-adaptation"
                    ? "Empirical benchmark characterization, paired statistical effects (95% CI), and registered hypothesis falsifications synthesized from published evaluation runs:"
                    : "Key empirical findings, statistical results, and analytical conclusions:"}
                </p>

                <ul className="space-y-3 pl-5 text-sm text-[var(--muted)] list-disc marker:text-emerald-500">
                  {project.researchFindings?.map((item, idx) => <li key={idx} className="pl-1 leading-relaxed">
                    <span className="font-semibold text-[var(--foreground)]">{item.title}{item.metric ? ` (${item.metric})` : ""}. </span>{item.description}{item.takeaway ? ` ${item.takeaway}` : null}
                  </li>)}
                </ul>
              </section>
            </div>
          ) : project.isDataProjectStructure ? (
            <div className="space-y-12">
              {/* Section 1: Context and Objective */}
              <section className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  <Target className="w-4 h-4" />
                  <span>{["dynamic-freight-rate-forecasting", "pediatric-bfrb-classification", "spotify-sound-trend-evolution"].includes(project.slug) ? "Context" : "01 / Context & Objective"}</span>
                </div>

                <div className="space-y-4 text-base text-[var(--foreground)] leading-relaxed">
                  {project.contextAndObjective?.details.map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>

                {/* Sensor Modalities Breakdown */}
                {! ["dynamic-freight-rate-forecasting", "pediatric-bfrb-classification", "spotify-sound-trend-evolution"].includes(project.slug) && project.contextAndObjective?.dataModalities && (
                  <div className="mt-6 pt-6 border-t border-[var(--border)] space-y-3">
                    <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--muted)]">
                      Sensor Telemetry &amp; Ingestion Modalities:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {project.contextAndObjective.dataModalities.map((mod, idx) => (
                        <div
                          key={idx}
                          className="p-4 rounded-xl border border-[var(--border)] bg-[var(--muted-bg)]/40 space-y-1.5"
                        >
                          <div className="flex items-center justify-between font-mono">
                            <span className="font-bold text-sm text-emerald-600 dark:text-emerald-400">
                              {mod.name}
                            </span>
                            <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-semibold">
                              {mod.rate}
                            </span>
                          </div>
                          <div className="text-xs font-mono text-[var(--muted)]">
                            Hardware: {mod.sensor}
                          </div>
                          <p className="text-xs sm:text-sm text-[var(--foreground)] leading-relaxed">
                            {mod.role}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </section>

              {/* Section 2: Designed Solution */}
              <section className="space-y-6">
                <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  <Cpu className="w-4 h-4" />
                  <span>{["dynamic-freight-rate-forecasting", "pediatric-bfrb-classification", "spotify-sound-trend-evolution"].includes(project.slug) ? "Designed Solution" : "02 / Designed Solution"}</span>
                </div>

                <div className="space-y-4 text-base text-[var(--foreground)] leading-relaxed">
                  {project.designedSolution?.details.map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>

                {/* FIG 1: Visualizes Coded Solution */}
                {project.slug === "pediatric-bfrb-classification" && (
                  <BfrbDetectionFigure />
                )}
                {project.slug === "spotify-sound-trend-evolution" && (
                  <SpotifyTrendFigure />
                )}
                {project.slug === "dynamic-freight-rate-forecasting" && (
                  <FreightPricingFigure />
                )}

                {/* Architecture Highlights */}
                {! ["dynamic-freight-rate-forecasting", "pediatric-bfrb-classification", "spotify-sound-trend-evolution"].includes(project.slug) && project.designedSolution?.architectureHighlights && (
                  <ul className="space-y-3 pt-2 pl-5 list-disc marker:text-emerald-500 text-sm text-[var(--muted)]">
                    {project.designedSolution.architectureHighlights.map((item, idx) => (
                      <li key={idx} className="pl-1 leading-relaxed">
                        <span className="font-semibold text-[var(--foreground)]">{item.title}</span>{item.badge && <span className="font-mono text-xs text-[var(--muted)]"> · {item.badge}</span>}. {item.detail}
                      </li>
                    ))}
                  </ul>
                )}
              </section>

              {/* Section 3: Experimental Process */}
              <section className="space-y-6">
                <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  <FlaskConical className="w-4 h-4" />
                  <span>{["dynamic-freight-rate-forecasting", "pediatric-bfrb-classification", "spotify-sound-trend-evolution"].includes(project.slug) ? "Experimental Process" : "03 / Experimental Process"}</span>
                </div>

                <div className="space-y-4 text-base text-[var(--foreground)] leading-relaxed">
                  {project.experimentalProcess?.details.map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>

                {/* Process / Analysis Explainer Diagram */}
                {project.slug === "pediatric-bfrb-classification" && (
                  <BfrbExperimentalProcessDiagram />
                )}
                {project.slug === "spotify-sound-trend-evolution" && (
                  <SpotifyTrendProcessDiagram />
                )}
                {project.slug === "dynamic-freight-rate-forecasting" && (
                  <FreightPricingProcessDiagram />
                )}

                <ul className="space-y-3 pt-2 pl-5 list-disc marker:text-emerald-500">
                  {project.experimentalProcess?.steps.map((step, idx) => (
                    <li key={idx} className="pl-1 text-sm text-[var(--muted)] leading-relaxed">
                      <span className="font-semibold text-emerald-700 dark:text-emerald-300">{step.phase}: </span><span className="font-semibold text-[var(--foreground)]">{step.title}. </span>{step.description}{step.insights?.length ? ` ${step.insights.join(" ")}` : null}
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          ) : (
            <>
              {/* Section 1: Problem and Challenges */}
              <section>
                <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-3">
                  <Target className="w-4 h-4" />
                  <span>Problem &amp; Challenges</span>
                </div>
                <p className="text-base text-[var(--muted)] leading-relaxed">
                  {project.challenge}
                </p>
              </section>

          {/* Section 2: Engineered Solution */}
          <section>
            <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-3">
              <Sparkles className="w-4 h-4" />
              <span>Engineered Solution</span>
            </div>
            <p className="text-base text-[var(--muted)] leading-relaxed mb-6">
              {project.slug === "neural-llm-router"
                ? "An end-to-end multi-objective dynamic router that optimizes model selection per individual prompt. It routes simple queries to fast quantized endpoints and reserves frontier models for heavy multi-step reasoning, optimizing the Pareto frontier across Cost, Latency (TTFT/ITL), and Quality."
                : project.architecture}
            </p>

            {/* Interactive project visualization */}
            {project.slug === "neural-llm-router" && (
              <NeuralRouterFigure />
            )}
            {project.slug === "ivy-framework-transpiler" && (
              <IvyCompilerFigure />
            )}
            {project.slug === "autonomous-ai-teammates" && (
              <TeammatesFigure />
            )}
            {project.slug === "llm-observability-platform" && (
              <ObservabilityFigure />
            )}
            {project.slug === "llm-evals-benchmarking" && (
              <BenchmarkingFigure />
            )}
            {project.slug === "realtime-avatar-animation" && (
              <AvatarFigure />
            )}
            {project.slug === "generative-video-pipeline" && (
              <StoryboardFigure />
            )}
            {project.slug === "edge-model-optimization" && (
              <EdgeOptimizationFigure />
            )}
            {project.slug === "cross-framework-model-benchmarks" && (
              <TranspilationBenchmarkingFigure />
            )}
            {project.slug === "self-contributing-codegen-agent" && (
              <AutonomousCodeGenFigure />
            )}
            {project.slug === "rag-docs-assistant" && (
              <RagDocsFigure />
            )}
            {project.slug === "distforge" && (
              <DistForgeFigure />
            )}
            {project.slug === "patchllm" && (
              <PatchLlmFigure />
            )}
          </section>

          {/* Section 3: Technical Architecture */}
          <section>
            <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-3">
              <Cpu className="w-4 h-4" />
              <span>Technical Architecture</span>
            </div>

            {project.slug === "neural-llm-router" ? (
              <div className="space-y-6">
                <p className="text-base text-[var(--muted)] leading-relaxed">
                  The neural routing pipeline continuously scores LLM endpoints ahead of inference. Rather than brittle heuristics, it evaluates latent model representations conditioned on prompt semantics, combining predicted quality with live provider telemetry:
                </p>

                {/* Technical Breakdown Cards */}
                <div className="project-detail-quadrants">
                  <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--card)]">
                    <div className="font-mono font-bold text-emerald-600 dark:text-emerald-400 mb-1.5 text-sm">
                      1. Neural Scoring Function
                    </div>
                    <p className="text-[var(--muted)] leading-relaxed text-xs">
                      For models <code className="text-[var(--foreground)] font-mono">m ∈ M</code>, the best model satisfies <code className="text-[var(--foreground)] font-mono">Best(p) = argmax_m (Quality(p, m))</code>. A BERT-like encoder evaluates prompt embeddings conditioned on latent model vectors via a calibrated logistic head: <code className="text-[var(--foreground)] font-mono">Quality(p, m) = σ(wᵀ[BERT(p); m] + b)</code>.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--card)]">
                    <div className="font-mono font-bold text-emerald-600 dark:text-emerald-400 mb-1.5 text-sm">
                      2. Supervised Judge Calibration
                    </div>
                    <p className="text-[var(--muted)] leading-relaxed text-xs">
                      Trained in a supervised manner on open LLM datasets using GPT-4 as an impartial judge. Candidate responses are evaluated across a 5-tier instruction adherence rubric (Irrelevant, Bad, Satisfactory, Very Good, Excellent) mapped directly to continuous ground-truth quality scores.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--card)]">
                    <div className="font-mono font-bold text-emerald-600 dark:text-emerald-400 mb-1.5 text-sm">
                      3. Live Runtime Benchmarks
                    </div>
                    <p className="text-[var(--muted)] leading-relaxed text-xs">
                      Continuous background synthetic probes track Time-to-First-Token (TTFT), Inter-Token Latency (ITL), server geolocation, and batch overhead across active providers to provide real-time latency and cost telemetry.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--card)]">
                    <div className="font-mono font-bold text-emerald-600 dark:text-emerald-400 mb-1.5 text-sm">
                      4. Modular Pareto Loss Optimization
                    </div>
                    <p className="text-[var(--muted)] leading-relaxed text-xs">
                      Objective formulation linearly combines quality, cost, and speed: <code className="text-[var(--foreground)] font-mono">ℒ = a·Quality - b·ITL - c·TTFT - d·Cost</code>. Tunable weights allow operators to switch between Low Cost, Balanced, Quality-First, or sub-70ms real-time voice loops.
                    </p>
                  </div>
                </div>

                {/* Editorial Architecture Diagram designed per diagram-design skill */}
                <RouterArchitectureDiagram />
              </div>
            ) : project.slug === "ivy-framework-transpiler" ? (
              <div className="space-y-6">
                <p className="text-base text-[var(--muted)] leading-relaxed">
                  Ivy unifies deep learning frameworks via a 3-stage AST compilation pipeline. The graph compiler extracts a static computational DAG from arbitrary dynamic source code, swaps framework-specific operations with unified frontend wrappers, normalizes arguments, and retraces into the target framework&apos;s backend execution graph:
                </p>

                {/* Technical Breakdown Cards */}
                <div className="project-detail-quadrants">
                  <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--card)]">
                    <div className="font-mono font-bold text-emerald-600 dark:text-emerald-400 mb-1.5 text-sm">
                      1. Static &amp; Dynamic AST Graph Tracing
                    </div>
                    <p className="text-[var(--muted)] leading-relaxed text-xs">
                      Extracts symbolic Directed Acyclic Graphs (DAGs) directly from native code execution, capturing tensor node flows and argument parameters without evaluating eager runtime kernels.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--card)]">
                    <div className="font-mono font-bold text-emerald-600 dark:text-emerald-400 mb-1.5 text-sm">
                      2. Frontend Function Replacement
                    </div>
                    <p className="text-[var(--muted)] leading-relaxed text-xs">
                      Replaces native source functions (e.g. <code className="text-[var(--foreground)] font-mono">jnp.matmul</code>) with 1:1 Ivy frontend wrappers (<code className="text-[var(--foreground)] font-mono">ivy.frontends.jax.numpy.matmul</code>) preserving native kwargs and positional signatures.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--card)]">
                    <div className="font-mono font-bold text-emerald-600 dark:text-emerald-400 mb-1.5 text-sm">
                      3. Zero-Copy Tensor Conversion
                    </div>
                    <p className="text-[var(--muted)] leading-relaxed text-xs">
                      Transforms native framework arrays (<code className="text-[var(--foreground)] font-mono">jnp.array</code>) to target tensor types (<code className="text-[var(--foreground)] font-mono">torch.tensor</code>) via zero-copy buffer handoffs and memory wrapping wherever possible.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--card)]">
                    <div className="font-mono font-bold text-emerald-600 dark:text-emerald-400 mb-1.5 text-sm">
                      4. Target Backend Lowering &amp; JIT
                    </div>
                    <p className="text-[var(--muted)] leading-relaxed text-xs">
                      Retraces the normalized graph using target backend APIs (<code className="text-[var(--foreground)] font-mono">torch.matmul</code>, <code className="text-[var(--foreground)] font-mono">torch.add</code>), emitting native graphs ready for JIT compilation (XLA, Inductor, Grappler).
                    </p>
                  </div>
                </div>

                {/* Editorial Architecture Diagram designed per diagram-design skill */}
                <IvyTracingDiagram />
              </div>
            ) : project.slug === "autonomous-ai-teammates" ? (
              <div className="space-y-6">
                <p className="text-base text-[var(--muted)] leading-relaxed">
                  Six connected services give the assistant access to third-party workspaces, familiar communication channels, and the tools needed to act in live user environments. An interaction loop stays responsive to user guidance while a background reasoner carries long-running work forward, grows reusable skills, and validates them before reuse:
                </p>

                {/* 6 Technical Breakdown Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                  <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--card)]">
                    <div className="font-mono font-bold text-emerald-600 dark:text-emerald-400 mb-1.5 flex items-center justify-between text-sm">
                      <span>1. console</span>
                      <span className="text-[10px] text-[var(--muted)] font-normal">Frontend Platform</span>
                    </div>
                    <p className="text-[var(--muted)] leading-relaxed text-xs">
                      Next.js &amp; React user dashboard supporting real-time chat, low-latency WebRTC voice/video calls, live screen-sharing perception, and live diff trace inspection. Enables mid-flight user interjection without restarting the run.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--card)]">
                    <div className="font-mono font-bold text-cyan-600 dark:text-cyan-400 mb-1.5 flex items-center justify-between text-sm">
                      <span>2. orchestra</span>
                      <span className="text-[10px] text-[var(--muted)] font-normal">Backend API &amp; State</span>
                    </div>
                    <p className="text-[var(--muted)] leading-relaxed text-xs">
                      Central FastAPI service managing assistant identity, RBAC boundaries, and PostgreSQL typed memory tables (Contacts, Knowledge, Tasks, Files). Runs background memory consolidation passes every 50 messages to distill structured knowledge from conversations.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--card)]">
                    <div className="font-mono font-bold text-emerald-600 dark:text-emerald-400 mb-1.5 flex items-center justify-between text-sm">
                      <span>3. unify</span>
                      <span className="text-[10px] text-[var(--muted)] font-normal">Dual-Brain Runtime</span>
                    </div>
                    <p className="text-[var(--muted)] leading-relaxed text-xs">
                      Coordinates the <strong>Slow Brain</strong> (<code className="text-[var(--foreground)] font-mono">ConversationManager</code> for long planning) and <strong>Fast Brain</strong> (LiveKit subprocess for sub-second voice turns). Its <code className="text-[var(--foreground)] font-mono">CodeActActor</code> writes complete sandboxed Python programs over typed <code className="text-[var(--foreground)] font-mono">primitives.*</code>, controlled by a universal <code className="text-[var(--foreground)] font-mono">SteerableToolHandle</code> protocol.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--card)]">
                    <div className="font-mono font-bold text-purple-600 dark:text-purple-400 mb-1.5 flex items-center justify-between text-sm">
                      <span>4. unillm</span>
                      <span className="text-[10px] text-[var(--muted)] font-normal">Universal LLM Client</span>
                    </div>
                    <p className="text-[var(--muted)] leading-relaxed text-xs">
                      Universal multi-provider LLM abstraction layer mapping incompatible input schemas across OpenAI, Anthropic, Gemini, and DeepSeek with semantic prompt caching, async streaming, and automated provider fallback retries.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--card)]">
                    <div className="font-mono font-bold text-amber-600 dark:text-amber-400 mb-1.5 flex items-center justify-between text-sm">
                      <span>5. communication</span>
                      <span className="text-[10px] text-[var(--muted)] font-normal">Omnichannel Infra</span>
                    </div>
                    <p className="text-[var(--muted)] leading-relaxed text-xs">
                      Telecommunications bridge provisioning dedicated assistant phone numbers, SMS, WhatsApp Business, SendGrid inbound/outbound email, and workspace integration connectors (Slack, Microsoft Teams, Google Meet, Google Drive).
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--card)]">
                    <div className="font-mono font-bold text-pink-600 dark:text-pink-400 mb-1.5 flex items-center justify-between text-sm">
                      <span>6. deploy</span>
                      <span className="text-[10px] text-[var(--muted)] font-normal">VMs &amp; Sandboxes</span>
                    </div>
                    <p className="text-[var(--muted)] leading-relaxed text-xs">
                      Kubernetes cluster manager orchestrating disposable Firecracker/QEMU micro-VMs with Playwright for headless browser automation and sandboxed code execution, enforcing strict egress network isolation and snapshot recovery.
                    </p>
                  </div>
                </div>

                {/* Editorial Architecture Diagram */}
                <TeammatesArchitectureDiagram />
              </div>
            ) : project.slug === "llm-observability-platform" ? (
              <div className="space-y-6">
                <p className="text-base text-[var(--muted)] leading-relaxed">
                  The universal LLM observability platform is built across a high-performance decoupled architecture: <strong>console</strong> serves as the Next.js tiled workspace, <strong>orchestra</strong> processes and validates telemetry via FastAPI &amp; PostgreSQL, <strong>unify</strong> instruments applications with non-blocking async hooks, and <strong>GCP/GCS</strong> manages scalable container deployments and immutable trace storage:
                </p>

                {/* 4 Technical Breakdown Cards */}
                <div className="project-detail-quadrants">
                  <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--card)]">
                    <div className="font-mono font-bold text-amber-600 dark:text-amber-400 mb-1.5 flex items-center justify-between text-sm">
                      <span>1. console</span>
                      <span className="text-[10px] text-[var(--muted)] font-normal">Frontend Dashboard</span>
                    </div>
                    <p className="text-[var(--muted)] leading-relaxed text-xs">
                      Next.js &amp; React frontend application providing a customizable tiled canvas to manage projects and dashboards. Features a <strong>dynamic client-side diff engine</strong> that aligns tokens and calculates side-by-side prompt and output deltas directly in the browser with zero backend round-trip latency.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--card)]">
                    <div className="font-mono font-bold text-cyan-600 dark:text-cyan-400 mb-1.5 flex items-center justify-between text-sm">
                      <span>2. orchestra</span>
                      <span className="text-[10px] text-[var(--muted)] font-normal">Logging Backend &amp; API</span>
                    </div>
                    <p className="text-[var(--muted)] leading-relaxed text-xs">
                      High-throughput FastAPI service exposing REST and WebSocket endpoints (<code className="text-[var(--foreground)] font-mono">/logs</code>, <code className="text-[var(--foreground)] font-mono">/traces</code>, <code className="text-[var(--foreground)] font-mono">/projects</code>). Ingests arbitrarily complex JSON schemas, manages project state, and maintains structured metadata and raw trace indexes in PostgreSQL.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--card)]">
                    <div className="font-mono font-bold text-emerald-600 dark:text-emerald-400 mb-1.5 flex items-center justify-between text-sm">
                      <span>3. unify</span>
                      <span className="text-[10px] text-[var(--muted)] font-normal">Python Client SDK</span>
                    </div>
                    <p className="text-[var(--muted)] leading-relaxed text-xs">
                      Universal Python client library querying heterogeneous LLM endpoints (OpenAI, Anthropic, Bedrock, Gemini). Features the <code className="text-[var(--foreground)] font-mono">@unify.traced</code> decorator to automatically capture nested call hierarchies, inputs, outputs, and token counts via background workers with zero critical-path latency.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--card)]">
                    <div className="font-mono font-bold text-blue-600 dark:text-blue-400 mb-1.5 flex items-center justify-between text-sm">
                      <span>4. GCP / GCS</span>
                      <span className="text-[10px] text-[var(--muted)] font-normal">Deployment &amp; Storage</span>
                    </div>
                    <p className="text-[var(--muted)] leading-relaxed text-xs">
                      Google Cloud deployment layer orchestrating containerized services across Cloud Run / GKE with Cloud Load Balancing. Leverages Google Cloud Storage (GCS) for immutable execution trace blobs, Parquet analytical partitions, and Cloud SQL for relational indexes.
                    </p>
                  </div>
                </div>

                {/* Editorial Architecture Diagram */}
                <ObservabilityArchitectureDiagram />
              </div>
            ) : project.slug === "llm-evals-benchmarking" ? (
              <div className="space-y-6">
                <p className="text-base text-[var(--muted)] leading-relaxed">
                  The large-scale benchmarking engine operates as an automated, closed-loop telemetry pipeline: <strong>modelhub</strong> renders the public leaderboard on Cloud Run, <strong>orchestra</strong> drives dynamic measurement dispatch per endpoint and region, <strong>unify</strong> conducts nanosecond probe timers against upstream LLMs, and <strong>github cron jobs</strong> execute automated sweeps every few hours:
                </p>

                {/* 4 Technical Breakdown Cards */}
                <div className="project-detail-quadrants">
                  <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--card)]">
                    <div className="font-mono font-bold text-emerald-600 dark:text-emerald-400 mb-1.5 flex items-center justify-between text-sm">
                      <span>1. modelhub</span>
                      <span className="text-[10px] text-[var(--muted)] font-normal">Cloud Run Webapp</span>
                    </div>
                    <p className="text-[var(--muted)] leading-relaxed text-xs">
                      Public web application deployed as a containerized Next.js/React service on Google Cloud Run with Global CDN edge caching. Powers interactive leaderboard views, dynamic region filtering, token pricing calculators, and responsive TTFT/ITL distribution charts.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--card)]">
                    <div className="font-mono font-bold text-cyan-600 dark:text-cyan-400 mb-1.5 flex items-center justify-between text-sm">
                      <span>2. orchestra</span>
                      <span className="text-[10px] text-[var(--muted)] font-normal">Backend Logic &amp; Dispatch</span>
                    </div>
                    <p className="text-[var(--muted)] leading-relaxed text-xs">
                      FastAPI backend holding measurement dispatch logic. Exposes endpoints to trigger dynamic benchmarks on any specified <code className="text-[var(--foreground)] font-mono">endpoint × region</code> tuple, applies variance filtering to eliminate cloud transit jitter, and aggregates historical percentiles in PostgreSQL and Redis.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--card)]">
                    <div className="font-mono font-bold text-amber-600 dark:text-amber-400 mb-1.5 flex items-center justify-between text-sm">
                      <span>3. unify</span>
                      <span className="text-[10px] text-[var(--muted)] font-normal">Python Client SDK</span>
                    </div>
                    <p className="text-[var(--muted)] leading-relaxed text-xs">
                      Python client library interfacing directly with Orchestra endpoints and upstream LLM providers. Drives probe batteries, measures nanosecond TTFT and inter-token intervals via raw streaming chunk timestamps, and packages standardized telemetry payloads.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--card)]">
                    <div className="font-mono font-bold text-purple-600 dark:text-purple-400 mb-1.5 flex items-center justify-between text-sm">
                      <span>4. github cron jobs</span>
                      <span className="text-[10px] text-[var(--muted)] font-normal">Periodic Sweeps</span>
                    </div>
                    <p className="text-[var(--muted)] leading-relaxed text-xs">
                      Automated GitHub Actions workflows scheduled to execute continuous benchmark sweeps every X hours across active <code className="text-[var(--foreground)] font-mono">model@provider</code> pairs and 5 global regions (<code className="text-[var(--foreground)] font-mono">us-east-1</code>, <code className="text-[var(--foreground)] font-mono">eu-west-1</code>, etc.), publishing fresh public leaderboards without manual intervention.
                    </p>
                  </div>
                </div>

                {/* Editorial Architecture Diagram */}
                <BenchmarkingArchitectureDiagram />
              </div>
            ) : project.slug === "realtime-avatar-animation" ? (
              <div className="space-y-6">
                <p className="text-base text-[var(--muted)] leading-relaxed">
                  The real-time avatar engine coordinates an asynchronous, multi-service streaming pipeline built in Python with <strong>asyncio</strong>, <strong>WebRTC</strong>, and <strong>Pydantic</strong> models: user speech is captured over WebRTC and transcribed in real time via <strong>Deepgram STT</strong>, streamed into <strong>OpenAI LLM</strong> with sentence-boundary chunking, converted to audio with <strong>ElevenLabs TTS</strong>, and used alongside the baseline portrait image in <strong>Replicate</strong> video generation with rolling frame interpolation:
                </p>

                {/* 4 Technical Breakdown Cards */}
                <div className="project-detail-quadrants">
                  <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--card)]">
                    <div className="font-mono font-bold text-amber-600 dark:text-amber-400 mb-1.5 flex items-center justify-between text-sm">
                      <span>1. Deepgram (Streaming STT)</span>
                      <span className="text-[10px] text-[var(--muted)] font-normal">~42ms Latency</span>
                    </div>
                    <p className="text-[var(--muted)] leading-relaxed text-xs">
                      Maintains a persistent streaming WebSocket connection over WebRTC. Ingests raw 16kHz PCM audio frames from the client microphone, returning sub-50ms partial speech-to-text transcripts with interim confidence scoring.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--card)]">
                    <div className="font-mono font-bold text-emerald-600 dark:text-emerald-400 mb-1.5 flex items-center justify-between text-sm">
                      <span>2. OpenAI LLM (Asyncio Orchestrator)</span>
                      <span className="text-[10px] text-[var(--muted)] font-normal">~58ms TTFT</span>
                    </div>
                    <p className="text-[var(--muted)] leading-relaxed text-xs">
                      Asynchronous Python worker validating schemas with <code className="text-[var(--foreground)] font-mono">Pydantic</code>. Ingests finalized user queries and streams LLM response tokens through a punctuation-boundary splitter to dispatch complete conversational sentences to TTS without waiting for the full response.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--card)]">
                    <div className="font-mono font-bold text-cyan-600 dark:text-cyan-400 mb-1.5 flex items-center justify-between text-sm">
                      <span>3. ElevenLabs (Streaming TTS)</span>
                      <span className="text-[10px] text-[var(--muted)] font-normal">~36ms Chunk Latency</span>
                    </div>
                    <p className="text-[var(--muted)] leading-relaxed text-xs">
                      Synthesizes high-fidelity 48kHz voice audio from streamed sentence chunks. Streams raw audio buffers alongside synchronized phoneme/viseme timing metadata required to drive facial landmark motion in the subsequent video generation stage.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--card)]">
                    <div className="font-mono font-bold text-purple-600 dark:text-purple-400 mb-1.5 flex items-center justify-between text-sm">
                      <span>4. Replicate Video Gen &amp; Rolling Interpolator</span>
                      <span className="text-[10px] text-[var(--muted)] font-normal">Zero Seam Jitter</span>
                    </div>
                    <p className="text-[var(--muted)] leading-relaxed text-xs">
                      Zero-shot neural video generation using the static profile image as baseline driven by the synthesized audio chunks. Employs a rolling first-and-last frame buffer to interpolate boundary frames between successive clips, ensuring smooth video playback without seam cuts over WebRTC.
                    </p>
                  </div>
                </div>

                {/* Editorial Architecture Diagram */}
                <AvatarArchitectureDiagram />
              </div>
            ) : project.slug === "generative-video-pipeline" ? (
              <div className="space-y-6">
                <p className="text-base text-[var(--muted)] leading-relaxed">
                  The pipeline turns a brief into a finished video by planning story beats, creating consistent character and location references, and assembling storyboard sheets to guide video generation. It then aligns dialogue and visuals and completes the edit with voiceover, audio, and captions:
                </p>

                {/* Editorial Architecture Diagram */}
                <StoryboardArchitectureDiagram />
              </div>
            ) : project.slug === "edge-model-optimization" ? (
              <div className="space-y-6">
                <p className="text-base text-[var(--muted)] leading-relaxed">
                  The edge model optimization suite applies a systematic, hardware-aware compression pipeline: <strong>Step 1</strong> profiles layer-by-layer parameter weight vs. latency sensitivity, <strong>Step 2</strong> applies dependency-graph structured channel pruning to eliminate dead features without sparse indexing overhead, <strong>Step 3</strong> factorizes dense convolution kernels via Variational Bayes Matrix Factorization (VBMF), <strong>Step 4</strong> performs PyTorch FX symbolic INT8 quantization with SQNR noise floor safeguards, and <strong>Step 5</strong> compiles artifacts to TorchScript Lite (.ptl) and ONNX for thermal-stable execution on mobile and embedded silicon:
                </p>

                {/* Editorial Architecture Diagram */}
                <EdgeOptimizationArchitectureDiagram />
              </div>
            ) : project.slug === "cross-framework-model-benchmarks" ? (
              <div className="space-y-6">
                <p className="text-base text-[var(--muted)] leading-relaxed">
                  The harness benchmarks Hugging Face models across native and Ivy-transpiled backends, batch sizes, and device types. It records latency, memory use, and numerical parity, then compares the results to identify the best execution engine for each workload. The pipeline also validates model outputs against a strict numerical tolerance and generates repeatable reports for regression tracking:
                </p>

                {/* Editorial Architecture Diagram */}
                <TranspilationBenchmarkingArchitecture />
              </div>
            ) : project.slug === "self-contributing-codegen-agent" ? (
              <div className="space-y-6">
                <p className="text-base text-[var(--muted)] leading-relaxed">
                  The autonomous framework code-generation and pull request agent was trained on a specialized multi-framework dataset of correct function implementations and corresponding unit tests: <strong>Step 1</strong> mines the Ivy codebase across PyTorch, JAX, TensorFlow, and NumPy to extract validated AST implementation-test pairs, <strong>Step 2</strong> cleans and normalizes functions into structured instruction-tuning schemas with ground-truth signatures and docstrings, <strong>Step 3</strong> performs multi-task supervised fine-tuning (SFT) over CodeLlama/StarCoder on code and test generation tokens, <strong>Step 4</strong> applies execution-guided reinforcement and rejection sampling with sandboxed pytest runs to learn traceback-conditioned self-repair, and <strong>Step 5</strong> deploys the model into an autonomous production loop capable of discovering API gaps and opening merged GitHub pull requests with zero human keyframing:
                </p>

                {/* Editorial Architecture Diagram */}
                <AutonomousCodeGenArchitecture />
              </div>
            ) : project.slug === "rag-docs-assistant" ? (
              <div className="space-y-6">
                <p className="text-base text-[var(--muted)] leading-relaxed">
                  The multi-repository RAG documentation assistant connects to continuously updating Ivy framework codebases and internal RFCs: <strong>Step 1</strong> intercepts GitHub commit push events across 4 repositories via an incremental diff webhook worker, <strong>Step 2</strong> applies Tree-Sitter and Python AST hierarchical chunking to preserve module, class, and docstring semantics with line-level provenance, <strong>Step 3</strong> generates hybrid vector representations (dense embeddings in Qdrant + sparse lexical inverted index via BM25), <strong>Step 4</strong> executes two-stage retrieval combining Reciprocal Rank Fusion (RRF) and cross-encoder re-ranking with strict confidence cutoffs, and <strong>Step 5</strong> synthesizes citation-enforced answers verified against git commit trees across the internal developer workspace, Slack, and IDEs:
                </p>

                {/* Editorial Architecture Diagram */}
                <MultiRepoRagArchitecture />
              </div>
            ) : project.slug === "distforge" ? (
              <div className="space-y-6">
                <p className="text-base text-[var(--muted)] leading-relaxed">
                  DistForge operates a two-stage compilation pipeline: <strong>Stage 1</strong> builds an object-oriented Python AST where geometry primitives and CSG boolean operators construct an expression tree without performing premature spatial evaluations, <strong>Stage 2</strong> traverses the AST via a context-aware GLSL compiler with dynamic variable index allocation and recursive inverse coordinate domain-warping (eliminating global matrix multiplication overhead), and <strong>Stage 3</strong> bifurcates execution into a 60+ FPS screen-space fragment shader for interactive desktop raymarching with sub-second hot-reloading alongside an OpenGL 4.3 Compute Shader for massive parallel sampling and feature-preserving Dual Contouring mesh extraction:
                </p>

                {/* Editorial Architecture Diagram */}
                <DistForgeArchitectureDiagram />
              </div>
            ) : project.slug === "patchllm" ? (
              <div className="space-y-6">
                <p className="text-base text-[var(--muted)] leading-relaxed">
                  PatchLLM executes a structured 4-tier interactive refactoring lifecycle: <strong>Tier 1</strong> ingests user goals and expands dynamic context scopes (<code className="text-emerald-500 font-mono">@git:staged</code>, <code className="text-emerald-500 font-mono">@dir</code>, <code className="text-emerald-500 font-mono">@file</code>) while budgeting AST token bounds, <strong>Tier 2</strong> generates atomic steps with stateful session serialization and crash recovery (<code className="text-[var(--foreground)] font-mono">.patchllm/sessions/*.json</code>), <strong>Tier 3</strong> invokes foundation models via a LiteLLM multi-provider router to synthesize and dry-run validate unified git diffs, and <strong>Tier 4</strong> presents interactive diffs for granular user approval, atomic disk writes, and instant 1-key rollback snapshots (<code className="text-emerald-500 font-mono">/revert</code>):
                </p>

                {/* Editorial Architecture Diagram */}
                <PatchLlmArchitectureDiagram />
              </div>
            ) : (
              project.pipelineDiagram && (
                <div className="p-5 rounded-xl border border-[var(--border)] bg-[var(--background)] font-mono text-xs text-emerald-600 dark:text-emerald-400 overflow-x-auto leading-relaxed shadow-inner">
                  <div className="text-[10px] text-[var(--muted)] uppercase tracking-wider mb-2 font-sans font-semibold">
                    Execution Pipeline Flow
                  </div>
                  <pre>{project.pipelineDiagram.join("\n")}</pre>
                </div>
              )
            )}
          </section>

            </>
          )}
        </div>

        {/* Prev / Next Navigation Footer */}
        <div className="mt-16 pt-8 border-t border-[var(--border)] grid grid-cols-1 sm:grid-cols-2 gap-4">
          {prevProject ? (
            <Link
              href={`/projects/${prevProject.slug}`}
              className="group flex items-start gap-3 text-left"
            >
              <ChevronLeft className="w-5 h-5 text-[var(--muted)] group-hover:text-emerald-500 shrink-0 mt-0.5 transition-colors" />
              <div>
                <div className="text-[11px] font-mono text-[var(--muted)]">
                  Previous Project
                </div>
                <div className="text-sm font-semibold text-[var(--foreground)] group-hover:text-emerald-500 transition-colors line-clamp-1">
                  {prevProject.title}
                </div>
              </div>
            </Link>
          ) : (
            <div />
          )}

          {nextProject && (
            <Link
              href={`/projects/${nextProject.slug}`}
              className="group flex items-start justify-end gap-3 text-right"
            >
              <div>
                <div className="text-[11px] font-mono text-[var(--muted)]">
                  Next Project
                </div>
                <div className="text-sm font-semibold text-[var(--foreground)] group-hover:text-emerald-500 transition-colors line-clamp-1">
                  {nextProject.title}
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-[var(--muted)] group-hover:text-emerald-500 shrink-0 mt-0.5 transition-colors" />
            </Link>
          )}
        </div>
      </div>
      <div className="mt-16">
        <Footer />
      </div>
    </div>
  );
}
