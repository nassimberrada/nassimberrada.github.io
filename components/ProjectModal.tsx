"use client";

import React, { useEffect, useState } from "react";
import { Project, getProjectDisplayTags } from "@/data/projects";
import {
  X,
  Sparkles,
  ExternalLink,
  Target,
  Cpu,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  Compass,
  FlaskConical,
  Lightbulb,
} from "lucide-react";
import { GithubIcon } from "@/components/Icons";
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

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onNext?: () => void;
  onPrev?: () => void;
}

export function ProjectModal({
  project,
  onClose,
  onNext,
  onPrev,
}: ProjectModalProps) {
  const [mounted, setMounted] = useState(false);
  const [animatingIn, setAnimatingIn] = useState(false);

  useEffect(() => {
    if (project) {
      setMounted(true);
      // Small timeout to trigger CSS transition smoothly
      const timer = setTimeout(() => setAnimatingIn(true), 16);
      return () => clearTimeout(timer);
    } else {
      setAnimatingIn(false);
      const timer = setTimeout(() => setMounted(false), 280);
      return () => clearTimeout(timer);
    }
  }, [project]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowRight" && onNext) onNext();
      if (e.key === "ArrowLeft" && onPrev) onPrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onNext, onPrev]);

  const handleClose = () => {
    setAnimatingIn(false);
    setTimeout(() => {
      onClose();
    }, 250);
  };

  if (!mounted && !project) return null;

  const currentProject = project;
  if (!currentProject) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className={`fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 md:p-10 transition-opacity duration-300 ease-out ${
        animatingIn ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Blurred Backdrop */}
      <div
        onClick={handleClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
      />

      {/* Main Fullscreen Card (Gradual scale & slide transition) */}
      <div
        className={`project-dialog-sheet relative w-[94vw] max-w-6xl xl:max-w-7xl max-h-[90vh] bg-[var(--card)] border border-[var(--border)] rounded-lg shadow-2xl flex flex-col overflow-hidden z-10 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          animatingIn
            ? "scale-100 translate-y-0 opacity-100"
            : "scale-90 translate-y-8 opacity-0"
        }`}
      >
        {/* Sticky Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border)] bg-[var(--card)]/90 backdrop-blur-sm shrink-0">
          <div className="min-w-0 pr-3">
            <h2 className="project-dialog-title text-xl sm:text-2xl tracking-tight text-[var(--foreground)] truncate leading-none">
              {currentProject.title}
            </h2>
            <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] sm:text-xs font-mono text-[var(--muted)]">
              <span className="inline-flex items-center gap-1.5" role="img" aria-label={`${currentProject.category} project`}>
                <ProjectTypeIcon category={currentProject.category} className="h-3.5 w-3.5 text-emerald-500" />
                <span>{currentProject.company}</span>
              </span>
              <span>{currentProject.role} · {currentProject.period}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onPrev && (
              <button
                onClick={onPrev}
                aria-label="Previous project"
                className="p-1.5 rounded-lg text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--muted-bg)] transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}
            {onNext && (
              <button
                onClick={onNext}
                aria-label="Next project"
                className="p-1.5 rounded-lg text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--muted-bg)] transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
            <button
              onClick={handleClose}
              aria-label="Close modal"
              className="p-1.5 rounded-lg text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--muted-bg)] transition-colors ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="project-dialog-content flex-1 overflow-y-auto px-6 sm:px-10 py-7 sm:py-9 space-y-10 sm:space-y-12">
          {/* External Links */}
          {currentProject.links && currentProject.links.length > 0 && (
            <div className="flex flex-wrap items-center gap-3">
              {currentProject.links.map((link, idx) => (
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

          {/* Research Projects: Question, Approach, Methodology, Findings */}
          {currentProject.isResearchStructure ? (
            <div className="space-y-8">
              {/* 1. Section: Question */}
              <div className="space-y-3">
                <div className={`flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider ${["driftlab-agent-adaptation", "endogenous-subspace-orthogonalization"].includes(currentProject.slug) ? "text-emerald-600 dark:text-emerald-400" : "text-blue-600 dark:text-blue-400"}`}>
                  <HelpCircle className="w-4 h-4" />
                  <span>{["driftlab-agent-adaptation", "endogenous-subspace-orthogonalization"].includes(currentProject.slug) ? "Question" : "01 / Question"}</span>
                </div>

                <div className="space-y-3 text-sm text-[var(--foreground)] leading-relaxed">
                  {(currentProject.questionDetails || [currentProject.challenge]).map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>
              </div>

              {/* 2. Section: Approach */}
              <div className="space-y-4">
                <div className={`flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider ${["driftlab-agent-adaptation", "endogenous-subspace-orthogonalization"].includes(currentProject.slug) ? "text-emerald-600 dark:text-emerald-400" : "text-blue-600 dark:text-blue-400"}`}>
                  <Compass className="w-4 h-4" />
                  <span>{["driftlab-agent-adaptation", "endogenous-subspace-orthogonalization"].includes(currentProject.slug) ? "Approach" : "02 / Approach"}</span>
                </div>

                <div className="space-y-3 text-sm text-[var(--foreground)] leading-relaxed">
                  {(currentProject.approachDetails || [currentProject.architecture]).map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>

                {/* FIG 1: Dynamic Process Visualization (Blog figure.ortho-flow) */}
                {currentProject.slug === "endogenous-subspace-orthogonalization" && (
                  <OrthoLoraFigure />
                )}
                {currentProject.slug === "driftlab-agent-adaptation" && (
                  <DriftLabFigure />
                )}
              </div>

              {/* 3. Section: Methodology */}
              <div className="space-y-4">
                <div className={`flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider ${["driftlab-agent-adaptation", "endogenous-subspace-orthogonalization"].includes(currentProject.slug) ? "text-emerald-600 dark:text-emerald-400" : "text-blue-600 dark:text-blue-400"}`}>
                  <FlaskConical className="w-4 h-4" />
                  <span>{["driftlab-agent-adaptation", "endogenous-subspace-orthogonalization"].includes(currentProject.slug) ? "Methodology" : "03 / Methodology"}</span>
                </div>
                <p className="text-sm text-[var(--muted)] leading-relaxed">
                  {currentProject.slug === "endogenous-subspace-orthogonalization" ? (
                    <>
                      Empirical evaluation protocol, loss optimization formulation, and layer interventions inferred directly from the research repository (<code className="text-[var(--foreground)] font-mono">~/Code/ortho-lora</code>):
                    </>
                  ) : currentProject.slug === "driftlab-agent-adaptation" ? (
                    <>
                      DriftLab pairs six seeded workplace worlds with controlled change protocols and an evaluator-only record of ground truth. This lets each memory setup face the same tasks and feedback, while four change probes measure detection, recovery, retention, and over-updating across three memory layers:
                    </>
                  ) : (
                    <>Empirical evaluation protocol and research methodology:</>
                  )}
                </p>

                {currentProject.researchMethodology?.length ? (
                  <ul className="space-y-3 pl-5 list-disc marker:text-emerald-500 text-sm text-[var(--muted)]">
                    {currentProject.researchMethodology.map((item, idx) => (
                      <li key={idx} className="pl-1 leading-relaxed">
                        <span className="font-semibold text-[var(--foreground)]">{item.title}</span>
                        {item.badge && <span className="font-mono text-xs text-[var(--muted)]"> · {item.badge}</span>}
                        <span>. {item.description}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}

                {/* Approach Schematic Diagram (Moved to Methodology) */}
                {currentProject.slug === "endogenous-subspace-orthogonalization" && (
                  <OrthoLoraApproachDiagram />
                )}
                {currentProject.slug === "driftlab-agent-adaptation" && (
                  <DriftLabArchitectureDiagram />
                )}

              </div>

              {/* 4. Section: Findings */}
              <div className="space-y-3">
                <div className={`flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider ${["driftlab-agent-adaptation", "endogenous-subspace-orthogonalization"].includes(currentProject.slug) ? "text-emerald-600 dark:text-emerald-400" : "text-blue-600 dark:text-blue-400"}`}>
                  <Lightbulb className="w-4 h-4" />
                  <span>{["driftlab-agent-adaptation", "endogenous-subspace-orthogonalization"].includes(currentProject.slug) ? "Findings" : "04 / Findings"}</span>
                </div>
                <p className="text-sm text-[var(--muted)] leading-relaxed">
                  {currentProject.slug === "endogenous-subspace-orthogonalization"
                    ? "Experimental verification, geometric superposition collapse metrics, and theoretical boundary conditions synthesized from published paper tables and benchmark sweeps:"
                    : currentProject.slug === "driftlab-agent-adaptation"
                    ? "Empirical benchmark characterization, paired statistical effects (95% CI), and registered hypothesis falsifications synthesized from published evaluation runs:"
                    : "Key empirical findings, statistical results, and analytical conclusions:"}
                </p>

                <ul className="space-y-3 pl-5 text-sm text-[var(--muted)] list-disc marker:text-emerald-500">
                  {currentProject.researchFindings?.map((item, idx) => <li key={idx} className="pl-1 leading-relaxed">
                    <span className="font-semibold text-[var(--foreground)]">{item.title}{item.metric ? ` (${item.metric})` : ""}. </span>{item.description}{item.takeaway ? ` ${item.takeaway}` : null}
                  </li>)}
                </ul>
              </div>
            </div>
          ) : currentProject.isDataProjectStructure ? (
            <div className="space-y-8">
              {/* 1. Section: Context and Objective */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  <Target className="w-4 h-4" />
                  <span>{["dynamic-freight-rate-forecasting", "pediatric-bfrb-classification", "spotify-sound-trend-evolution"].includes(currentProject.slug) ? "Context" : "01 / Context & Objective"}</span>
                </div>

                <div className="space-y-3 text-sm text-[var(--foreground)] leading-relaxed">
                  {currentProject.contextAndObjective?.details.map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>

                {/* Sensor Modalities Breakdown */}
                {! ["dynamic-freight-rate-forecasting", "pediatric-bfrb-classification", "spotify-sound-trend-evolution"].includes(currentProject.slug) && currentProject.contextAndObjective?.dataModalities && (
                  <div className="mt-4 pt-4 border-t border-[var(--border)] space-y-2">
                    <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--muted)]">
                      Sensor Telemetry &amp; Ingestion Modalities:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {currentProject.contextAndObjective.dataModalities.map((mod, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-xl border border-[var(--border)] bg-[var(--muted-bg)]/40 space-y-1"
                        >
                          <div className="flex items-center justify-between font-mono">
                            <span className="font-bold text-emerald-600 dark:text-emerald-400">
                              {mod.name}
                            </span>
                            <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-semibold">
                              {mod.rate}
                            </span>
                          </div>
                          <div className="text-[11px] font-mono text-[var(--muted)]">
                            Hardware: {mod.sensor}
                          </div>
                          <p className="text-[11px] text-[var(--foreground)] leading-snug">
                            {mod.role}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* 2. Section: Designed Solution */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  <Cpu className="w-4 h-4" />
                  <span>{["dynamic-freight-rate-forecasting", "pediatric-bfrb-classification", "spotify-sound-trend-evolution"].includes(currentProject.slug) ? "Designed Solution" : "02 / Designed Solution"}</span>
                </div>

                <div className="space-y-3 text-sm text-[var(--foreground)] leading-relaxed">
                  {currentProject.designedSolution?.details.map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>

                {/* FIG 1: Visualizes Coded Solution */}
                {currentProject.slug === "pediatric-bfrb-classification" && (
                  <BfrbDetectionFigure />
                )}
                {currentProject.slug === "spotify-sound-trend-evolution" && (
                  <SpotifyTrendFigure />
                )}
                {currentProject.slug === "dynamic-freight-rate-forecasting" && (
                  <FreightPricingFigure />
                )}

                {/* Architecture Highlights */}
                {! ["dynamic-freight-rate-forecasting", "pediatric-bfrb-classification", "spotify-sound-trend-evolution"].includes(currentProject.slug) && currentProject.designedSolution?.architectureHighlights && (
                  <ul className="space-y-3 pt-2 pl-5 list-disc marker:text-emerald-500 text-sm text-[var(--muted)]">
                    {currentProject.designedSolution.architectureHighlights.map((item, idx) => (
                      <li key={idx} className="pl-1 leading-relaxed">
                        <span className="font-semibold text-[var(--foreground)]">{item.title}</span>{item.badge && <span className="font-mono text-xs text-[var(--muted)]"> · {item.badge}</span>}. {item.detail}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* 3. Section: Experimental Process */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  <FlaskConical className="w-4 h-4" />
                  <span>{["dynamic-freight-rate-forecasting", "pediatric-bfrb-classification", "spotify-sound-trend-evolution"].includes(currentProject.slug) ? "Experimental Process" : "03 / Experimental Process"}</span>
                </div>

                <div className="space-y-3 text-sm text-[var(--foreground)] leading-relaxed">
                  {currentProject.experimentalProcess?.details.map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>

                {/* Process / Analysis Explainer Diagram */}
                {currentProject.slug === "pediatric-bfrb-classification" && (
                  <BfrbExperimentalProcessDiagram />
                )}
                {currentProject.slug === "spotify-sound-trend-evolution" && (
                  <SpotifyTrendProcessDiagram />
                )}
                {currentProject.slug === "dynamic-freight-rate-forecasting" && (
                  <FreightPricingProcessDiagram />
                )}

                <ul className="space-y-3 pt-2 pl-5 list-disc marker:text-emerald-500">
                  {currentProject.experimentalProcess?.steps.map((step, idx) => (
                    <li key={idx} className="pl-1 text-sm text-[var(--muted)] leading-relaxed">
                      <span className="font-semibold text-emerald-700 dark:text-emerald-300">{step.phase}: </span><span className="font-semibold text-[var(--foreground)]">{step.title}. </span>{step.description}{step.insights?.length ? ` ${step.insights.join(" ")}` : null}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <>
              {/* 4. Section: Problem and Challenges */}
              <div>
                <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-2">
                  <Target className="w-4 h-4" />
                  <span>Problem &amp; Challenges</span>
                </div>
                <p className="text-sm text-[var(--foreground)] leading-relaxed">
                  {currentProject.challenge}
                </p>
              </div>

          {/* 5. Section: Engineered Solution */}
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Engineered Solution</span>
            </div>
            <p className="text-sm text-[var(--foreground)] leading-relaxed mb-4">
              {currentProject.slug === "neural-llm-router"
                ? "An end-to-end multi-objective dynamic router that optimizes model selection per individual prompt. It routes simple queries to fast quantized endpoints and reserves frontier models for heavy multi-step reasoning, optimizing the Pareto frontier across Cost, Latency (TTFT/ITL), and Quality."
                : currentProject.architecture}
            </p>

            {/* Interactive project visualization */}
            {currentProject.slug === "neural-llm-router" && (
              <NeuralRouterFigure />
            )}
            {currentProject.slug === "ivy-framework-transpiler" && (
              <IvyCompilerFigure />
            )}
            {currentProject.slug === "autonomous-ai-teammates" && (
              <TeammatesFigure />
            )}
            {currentProject.slug === "llm-observability-platform" && (
              <ObservabilityFigure />
            )}
            {currentProject.slug === "llm-evals-benchmarking" && (
              <BenchmarkingFigure />
            )}
            {currentProject.slug === "realtime-avatar-animation" && (
              <AvatarFigure />
            )}
            {currentProject.slug === "generative-video-pipeline" && (
              <StoryboardFigure />
            )}
            {currentProject.slug === "edge-model-optimization" && (
              <EdgeOptimizationFigure />
            )}
            {currentProject.slug === "cross-framework-model-benchmarks" && (
              <TranspilationBenchmarkingFigure />
            )}
            {currentProject.slug === "self-contributing-codegen-agent" && (
              <AutonomousCodeGenFigure />
            )}
            {currentProject.slug === "rag-docs-assistant" && (
              <RagDocsFigure />
            )}
            {currentProject.slug === "distforge" && (
              <DistForgeFigure />
            )}
            {currentProject.slug === "patchllm" && (
              <PatchLlmFigure />
            )}
          </div>

          {/* 6. Section: Technical Architecture */}
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-2">
              <Cpu className="w-4 h-4" />
              <span>Technical Architecture</span>
            </div>

            {currentProject.slug === "neural-llm-router" ? (
              <div className="space-y-4">
                <p className="text-sm text-[var(--foreground)] leading-relaxed">
                  The neural routing pipeline continuously scores LLM endpoints ahead of inference. Rather than brittle heuristics, it evaluates latent model representations conditioned on prompt semantics, combining predicted quality with live provider telemetry:
                </p>

                {/* Technical Breakdown Cards */}
                <div className="project-detail-quadrants">
                  <div className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--muted-bg)]/40">
                    <div className="font-mono font-bold text-emerald-600 dark:text-emerald-400 mb-1">
                      1. Neural Scoring Function
                    </div>
                    <p className="text-[var(--muted)] leading-relaxed">
                      For models <code className="text-[var(--foreground)]">m ∈ M</code>, the best model satisfies <code className="text-[var(--foreground)]">Best(p) = argmax_m (Quality(p, m))</code>. A BERT-like encoder evaluates prompt embeddings conditioned on latent model vectors via a calibrated logistic head: <code className="text-[var(--foreground)]">Quality(p, m) = σ(wᵀ[BERT(p); m] + b)</code>.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--muted-bg)]/40">
                    <div className="font-mono font-bold text-emerald-600 dark:text-emerald-400 mb-1">
                      2. Supervised Judge Calibration
                    </div>
                    <p className="text-[var(--muted)] leading-relaxed">
                      Trained in a supervised manner on open LLM datasets using GPT-4 as an impartial judge. Candidate responses are evaluated across a 5-tier instruction adherence rubric (Irrelevant, Bad, Satisfactory, Very Good, Excellent) mapped directly to continuous ground-truth quality scores.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--muted-bg)]/40">
                    <div className="font-mono font-bold text-emerald-600 dark:text-emerald-400 mb-1">
                      3. Live Runtime Benchmarks
                    </div>
                    <p className="text-[var(--muted)] leading-relaxed">
                      Continuous background synthetic probes track Time-to-First-Token (TTFT), Inter-Token Latency (ITL), server geolocation, and batch overhead across active providers to provide real-time latency and cost telemetry.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--muted-bg)]/40">
                    <div className="font-mono font-bold text-emerald-600 dark:text-emerald-400 mb-1">
                      4. Modular Pareto Loss Optimization
                    </div>
                    <p className="text-[var(--muted)] leading-relaxed">
                      Objective formulation linearly combines quality, cost, and speed: <code className="text-[var(--foreground)]">ℒ = a·Quality - b·ITL - c·TTFT - d·Cost</code>. Tunable weights allow operators to switch between Low Cost, Balanced, Quality-First, or sub-70ms real-time voice loops.
                    </p>
                  </div>
                </div>

                {/* Editorial Architecture Diagram designed per diagram-design skill */}
                <RouterArchitectureDiagram />
              </div>
            ) : currentProject.slug === "ivy-framework-transpiler" ? (
              <div className="space-y-4">
                <p className="text-sm text-[var(--foreground)] leading-relaxed">
                  Ivy unifies deep learning frameworks via a 3-stage AST compilation pipeline. The graph compiler extracts a static computational DAG from arbitrary dynamic source code, swaps framework-specific operations with unified frontend wrappers, normalizes arguments, and retraces into the target framework&apos;s backend execution graph:
                </p>

                {/* Technical Breakdown Cards */}
                <div className="project-detail-quadrants">
                  <div className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--muted-bg)]/40">
                    <div className="font-mono font-bold text-emerald-600 dark:text-emerald-400 mb-1">
                      1. Static &amp; Dynamic AST Graph Tracing
                    </div>
                    <p className="text-[var(--muted)] leading-relaxed">
                      Extracts symbolic Directed Acyclic Graphs (DAGs) directly from native code execution, capturing tensor node flows and argument parameters without evaluating eager runtime kernels.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--muted-bg)]/40">
                    <div className="font-mono font-bold text-emerald-600 dark:text-emerald-400 mb-1">
                      2. Frontend Function Replacement
                    </div>
                    <p className="text-[var(--muted)] leading-relaxed">
                      Replaces native source functions (e.g. <code className="text-[var(--foreground)]">jnp.matmul</code>) with 1:1 Ivy frontend wrappers (<code className="text-[var(--foreground)]">ivy.frontends.jax.numpy.matmul</code>) preserving native kwargs and positional signatures.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--muted-bg)]/40">
                    <div className="font-mono font-bold text-emerald-600 dark:text-emerald-400 mb-1">
                      3. Zero-Copy Tensor Conversion
                    </div>
                    <p className="text-[var(--muted)] leading-relaxed">
                      Transforms native framework arrays (<code className="text-[var(--foreground)]">jnp.array</code>) to target tensor types (<code className="text-[var(--foreground)]">torch.tensor</code>) via zero-copy buffer handoffs and memory wrapping wherever possible.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--muted-bg)]/40">
                    <div className="font-mono font-bold text-emerald-600 dark:text-emerald-400 mb-1">
                      4. Target Backend Lowering &amp; JIT
                    </div>
                    <p className="text-[var(--muted)] leading-relaxed">
                      Retraces the normalized graph using target backend APIs (<code className="text-[var(--foreground)]">torch.matmul</code>, <code className="text-[var(--foreground)]">torch.add</code>), emitting native graphs ready for JIT compilation (XLA, Inductor, Grappler).
                    </p>
                  </div>
                </div>

                {/* Editorial Architecture Diagram designed per diagram-design skill */}
                <IvyTracingDiagram />
              </div>
            ) : currentProject.slug === "autonomous-ai-teammates" ? (
              <div className="space-y-4">
                <p className="text-sm text-[var(--foreground)] leading-relaxed">
                  Six connected services give the assistant access to third-party workspaces, familiar communication channels, and the tools needed to act in live user environments. An interaction loop stays responsive to user guidance while a background reasoner carries long-running work forward, grows reusable skills, and validates them before reuse:
                </p>

                {/* 6 Technical Breakdown Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--muted-bg)]/40">
                    <div className="font-mono font-bold text-emerald-600 dark:text-emerald-400 mb-1 flex items-center justify-between">
                      <span>1. console</span>
                      <span className="text-[10px] text-[var(--muted)]">Frontend Platform</span>
                    </div>
                    <p className="text-[var(--muted)] leading-relaxed">
                      Next.js &amp; React user dashboard supporting real-time chat, low-latency WebRTC voice/video calls, live screen-sharing perception, and live diff trace inspection. Enables mid-flight user interjection without restarting the run.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--muted-bg)]/40">
                    <div className="font-mono font-bold text-cyan-600 dark:text-cyan-400 mb-1 flex items-center justify-between">
                      <span>2. orchestra</span>
                      <span className="text-[10px] text-[var(--muted)]">Backend API &amp; State</span>
                    </div>
                    <p className="text-[var(--muted)] leading-relaxed">
                      Central FastAPI service managing assistant identity, RBAC boundaries, and PostgreSQL typed memory tables (Contacts, Knowledge, Tasks, Files). Runs background memory consolidation passes every 50 messages to distill structured knowledge from conversations.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--muted-bg)]/40">
                    <div className="font-mono font-bold text-emerald-600 dark:text-emerald-400 mb-1 flex items-center justify-between">
                      <span>3. unify</span>
                      <span className="text-[10px] text-[var(--muted)]">Dual-Brain Runtime</span>
                    </div>
                    <p className="text-[var(--muted)] leading-relaxed">
                      Coordinates the <strong>Slow Brain</strong> (<code>ConversationManager</code> for long planning) and <strong>Fast Brain</strong> (LiveKit subprocess for sub-second voice turns). Its <code>CodeActActor</code> writes complete sandboxed Python programs over typed <code>primitives.*</code>, controlled by a universal <code>SteerableToolHandle</code> protocol.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--muted-bg)]/40">
                    <div className="font-mono font-bold text-purple-600 dark:text-purple-400 mb-1 flex items-center justify-between">
                      <span>4. unillm</span>
                      <span className="text-[10px] text-[var(--muted)]">Universal LLM Client</span>
                    </div>
                    <p className="text-[var(--muted)] leading-relaxed">
                      Universal multi-provider LLM abstraction layer mapping incompatible input schemas across OpenAI, Anthropic, Gemini, and DeepSeek with semantic prompt caching, async streaming, and automated provider fallback retries.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--muted-bg)]/40">
                    <div className="font-mono font-bold text-amber-600 dark:text-amber-400 mb-1 flex items-center justify-between">
                      <span>5. communication</span>
                      <span className="text-[10px] text-[var(--muted)]">Omnichannel Infra</span>
                    </div>
                    <p className="text-[var(--muted)] leading-relaxed">
                      Telecommunications bridge provisioning dedicated assistant phone numbers, SMS, WhatsApp Business, SendGrid inbound/outbound email, and workspace integration connectors (Slack, Microsoft Teams, Google Meet, Google Drive).
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--muted-bg)]/40">
                    <div className="font-mono font-bold text-pink-600 dark:text-pink-400 mb-1 flex items-center justify-between">
                      <span>6. deploy</span>
                      <span className="text-[10px] text-[var(--muted)]">VMs &amp; Sandboxes</span>
                    </div>
                    <p className="text-[var(--muted)] leading-relaxed">
                      Kubernetes cluster manager orchestrating disposable Firecracker/QEMU micro-VMs with Playwright for headless browser automation and sandboxed code execution, enforcing strict egress network isolation and snapshot recovery.
                    </p>
                  </div>
                </div>

                {/* Editorial Architecture Diagram */}
                <TeammatesArchitectureDiagram />
              </div>
            ) : currentProject.slug === "llm-observability-platform" ? (
              <div className="space-y-4">
                <p className="text-sm text-[var(--foreground)] leading-relaxed">
                  The universal LLM observability platform is built across a high-performance decoupled architecture: <strong>console</strong> serves as the Next.js tiled workspace, <strong>orchestra</strong> processes and validates telemetry via FastAPI &amp; PostgreSQL, <strong>unify</strong> instruments applications with non-blocking async hooks, and <strong>GCP/GCS</strong> manages scalable container deployments and immutable trace storage:
                </p>

                {/* 4 Technical Breakdown Cards */}
                <div className="project-detail-quadrants">
                  <div className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--muted-bg)]/40">
                    <div className="font-mono font-bold text-amber-600 dark:text-amber-400 mb-1 flex items-center justify-between">
                      <span>1. console</span>
                      <span className="text-[10px] text-[var(--muted)]">Frontend Dashboard</span>
                    </div>
                    <p className="text-[var(--muted)] leading-relaxed">
                      Next.js &amp; React frontend application providing a customizable tiled canvas to manage projects and dashboards. Features a <strong>dynamic client-side diff engine</strong> that aligns tokens and calculates side-by-side prompt and output deltas directly in the browser with zero backend round-trip latency.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--muted-bg)]/40">
                    <div className="font-mono font-bold text-cyan-600 dark:text-cyan-400 mb-1 flex items-center justify-between">
                      <span>2. orchestra</span>
                      <span className="text-[10px] text-[var(--muted)]">Logging Backend &amp; API</span>
                    </div>
                    <p className="text-[var(--muted)] leading-relaxed">
                      High-throughput FastAPI service exposing REST and WebSocket endpoints (<code className="text-[var(--foreground)]">/logs</code>, <code className="text-[var(--foreground)]">/traces</code>, <code className="text-[var(--foreground)]">/projects</code>). Ingests arbitrarily complex JSON schemas, manages project state, and maintains structured metadata and raw trace indexes in PostgreSQL.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--muted-bg)]/40">
                    <div className="font-mono font-bold text-emerald-600 dark:text-emerald-400 mb-1 flex items-center justify-between">
                      <span>3. unify</span>
                      <span className="text-[10px] text-[var(--muted)]">Python Client SDK</span>
                    </div>
                    <p className="text-[var(--muted)] leading-relaxed">
                      Universal Python client library querying heterogeneous LLM endpoints (OpenAI, Anthropic, Bedrock, Gemini). Features the <code className="text-[var(--foreground)]">@unify.traced</code> decorator to automatically capture nested call hierarchies, inputs, outputs, and token counts via background workers with zero critical-path latency.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--muted-bg)]/40">
                    <div className="font-mono font-bold text-blue-600 dark:text-blue-400 mb-1 flex items-center justify-between">
                      <span>4. GCP / GCS</span>
                      <span className="text-[10px] text-[var(--muted)]">Deployment &amp; Storage</span>
                    </div>
                    <p className="text-[var(--muted)] leading-relaxed">
                      Google Cloud deployment layer orchestrating containerized services across Cloud Run / GKE with Cloud Load Balancing. Leverages Google Cloud Storage (GCS) for immutable execution trace blobs, Parquet analytical partitions, and Cloud SQL for relational indexes.
                    </p>
                  </div>
                </div>

                {/* Editorial Architecture Diagram */}
                <ObservabilityArchitectureDiagram />
              </div>
            ) : currentProject.slug === "llm-evals-benchmarking" ? (
              <div className="space-y-4">
                <p className="text-sm text-[var(--foreground)] leading-relaxed">
                  The large-scale benchmarking engine operates as an automated, closed-loop telemetry pipeline: <strong>modelhub</strong> renders the public leaderboard on Cloud Run, <strong>orchestra</strong> drives dynamic measurement dispatch per endpoint and region, <strong>unify</strong> conducts nanosecond probe timers against upstream LLMs, and <strong>github cron jobs</strong> execute automated sweeps every few hours:
                </p>

                {/* 4 Technical Breakdown Cards */}
                <div className="project-detail-quadrants">
                  <div className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--muted-bg)]/40">
                    <div className="font-mono font-bold text-emerald-600 dark:text-emerald-400 mb-1 flex items-center justify-between">
                      <span>1. modelhub</span>
                      <span className="text-[10px] text-[var(--muted)]">Cloud Run Webapp</span>
                    </div>
                    <p className="text-[var(--muted)] leading-relaxed">
                      Public web application deployed as a containerized Next.js/React service on Google Cloud Run with Global CDN edge caching. Powers interactive leaderboard views, dynamic region filtering, token pricing calculators, and responsive TTFT/ITL distribution charts.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--muted-bg)]/40">
                    <div className="font-mono font-bold text-cyan-600 dark:text-cyan-400 mb-1 flex items-center justify-between">
                      <span>2. orchestra</span>
                      <span className="text-[10px] text-[var(--muted)]">Backend Logic &amp; Dispatch</span>
                    </div>
                    <p className="text-[var(--muted)] leading-relaxed">
                      FastAPI backend holding measurement dispatch logic. Exposes endpoints to trigger dynamic benchmarks on any specified <code className="text-[var(--foreground)]">endpoint × region</code> tuple, applies variance filtering to eliminate cloud transit jitter, and aggregates historical percentiles in PostgreSQL and Redis.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--muted-bg)]/40">
                    <div className="font-mono font-bold text-amber-600 dark:text-amber-400 mb-1 flex items-center justify-between">
                      <span>3. unify</span>
                      <span className="text-[10px] text-[var(--muted)]">Python Client SDK</span>
                    </div>
                    <p className="text-[var(--muted)] leading-relaxed">
                      Python client library interfacing directly with Orchestra endpoints and upstream LLM providers. Drives probe batteries, measures nanosecond TTFT and inter-token intervals via raw streaming chunk timestamps, and packages standardized telemetry payloads.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--muted-bg)]/40">
                    <div className="font-mono font-bold text-purple-600 dark:text-purple-400 mb-1 flex items-center justify-between">
                      <span>4. github cron jobs</span>
                      <span className="text-[10px] text-[var(--muted)]">Periodic Sweeps</span>
                    </div>
                    <p className="text-[var(--muted)] leading-relaxed">
                      Automated GitHub Actions workflows scheduled to execute continuous benchmark sweeps every X hours across active <code className="text-[var(--foreground)]">model@provider</code> pairs and 5 global regions (<code className="text-[var(--foreground)]">us-east-1</code>, <code className="text-[var(--foreground)]">eu-west-1</code>, etc.), publishing fresh public leaderboards without manual intervention.
                    </p>
                  </div>
                </div>

                {/* Editorial Architecture Diagram */}
                <BenchmarkingArchitectureDiagram />
              </div>
            ) : currentProject.slug === "realtime-avatar-animation" ? (
              <div className="space-y-4">
                <p className="text-sm text-[var(--foreground)] leading-relaxed">
                  The real-time avatar engine coordinates an asynchronous, multi-service streaming pipeline built in Python with <strong>asyncio</strong>, <strong>WebRTC</strong>, and <strong>Pydantic</strong> models: user speech is captured over WebRTC and transcribed in real time via <strong>Deepgram STT</strong>, streamed into <strong>OpenAI LLM</strong> with sentence-boundary chunking, converted to audio with <strong>ElevenLabs TTS</strong>, and used alongside the baseline portrait image in <strong>Replicate</strong> video generation with rolling frame interpolation:
                </p>

                {/* 4 Technical Breakdown Cards */}
                <div className="project-detail-quadrants">
                  <div className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--muted-bg)]/40">
                    <div className="font-mono font-bold text-amber-600 dark:text-amber-400 mb-1 flex items-center justify-between">
                      <span>1. Deepgram (Streaming STT)</span>
                      <span className="text-[10px] text-[var(--muted)]">~42ms Latency</span>
                    </div>
                    <p className="text-[var(--muted)] leading-relaxed">
                      Maintains a persistent streaming WebSocket connection over WebRTC. Ingests raw 16kHz PCM audio frames from the client microphone, returning sub-50ms partial speech-to-text transcripts with interim confidence scoring.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--muted-bg)]/40">
                    <div className="font-mono font-bold text-emerald-600 dark:text-emerald-400 mb-1 flex items-center justify-between">
                      <span>2. OpenAI LLM (Asyncio Orchestrator)</span>
                      <span className="text-[10px] text-[var(--muted)]">~58ms TTFT</span>
                    </div>
                    <p className="text-[var(--muted)] leading-relaxed">
                      Asynchronous Python worker validating schemas with <code className="text-[var(--foreground)]">Pydantic</code>. Ingests finalized user queries and streams LLM response tokens through a punctuation-boundary splitter to dispatch complete conversational sentences to TTS without waiting for the full response.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--muted-bg)]/40">
                    <div className="font-mono font-bold text-cyan-600 dark:text-cyan-400 mb-1 flex items-center justify-between">
                      <span>3. ElevenLabs (Streaming TTS)</span>
                      <span className="text-[10px] text-[var(--muted)]">~36ms Chunk Latency</span>
                    </div>
                    <p className="text-[var(--muted)] leading-relaxed">
                      Synthesizes high-fidelity 48kHz voice audio from streamed sentence chunks. Streams raw audio buffers alongside synchronized phoneme/viseme timing metadata required to drive facial landmark motion in the subsequent video generation stage.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--muted-bg)]/40">
                    <div className="font-mono font-bold text-purple-600 dark:text-purple-400 mb-1 flex items-center justify-between">
                      <span>4. Replicate Video Gen &amp; Rolling Interpolator</span>
                      <span className="text-[10px] text-[var(--muted)]">Zero Seam Jitter</span>
                    </div>
                    <p className="text-[var(--muted)] leading-relaxed">
                      Zero-shot neural video generation using the static profile image as baseline driven by the synthesized audio chunks. Employs a rolling first-and-last frame buffer to interpolate boundary frames between successive clips, ensuring smooth video playback without seam cuts over WebRTC.
                    </p>
                  </div>
                </div>

                {/* Editorial Architecture Diagram */}
                <AvatarArchitectureDiagram />
              </div>
            ) : currentProject.slug === "generative-video-pipeline" ? (
              <div className="space-y-4">
                <p className="text-sm text-[var(--foreground)] leading-relaxed">
                  The pipeline turns a brief into a finished video by planning story beats, creating consistent character and location references, and assembling storyboard sheets to guide video generation. It then aligns dialogue and visuals and completes the edit with voiceover, audio, and captions:
                </p>

                {/* Editorial Architecture Diagram */}
                <StoryboardArchitectureDiagram />
              </div>
            ) : currentProject.slug === "edge-model-optimization" ? (
              <div className="space-y-4">
                <p className="text-sm text-[var(--foreground)] leading-relaxed">
                  The edge model optimization suite applies a systematic, hardware-aware compression pipeline: <strong>Step 1</strong> profiles layer-by-layer parameter weight vs. latency sensitivity, <strong>Step 2</strong> applies dependency-graph structured channel pruning to eliminate dead features without sparse indexing overhead, <strong>Step 3</strong> factorizes dense convolution kernels via Variational Bayes Matrix Factorization (VBMF), <strong>Step 4</strong> performs PyTorch FX symbolic INT8 quantization with SQNR noise floor safeguards, and <strong>Step 5</strong> compiles artifacts to TorchScript Lite (.ptl) and ONNX for thermal-stable execution on mobile and embedded silicon:
                </p>

                {/* Editorial Architecture Diagram */}
                <EdgeOptimizationArchitectureDiagram />
              </div>
            ) : currentProject.slug === "cross-framework-model-benchmarks" ? (
              <div className="space-y-4">
                <p className="text-sm text-[var(--foreground)] leading-relaxed">
                  The harness benchmarks Hugging Face models across native and Ivy-transpiled backends, batch sizes, and device types. It records latency, memory use, and numerical parity, then compares the results to identify the best execution engine for each workload. The pipeline also validates model outputs against a strict numerical tolerance and generates repeatable reports for regression tracking:
                </p>

                {/* Editorial Architecture Diagram */}
                <TranspilationBenchmarkingArchitecture />
              </div>
            ) : currentProject.slug === "self-contributing-codegen-agent" ? (
              <div className="space-y-4">
                <p className="text-sm text-[var(--foreground)] leading-relaxed">
                  The autonomous framework code-generation and pull request agent was trained on a specialized multi-framework dataset of correct function implementations and corresponding unit tests: <strong>Step 1</strong> mines the Ivy codebase across PyTorch, JAX, TensorFlow, and NumPy to extract validated AST implementation-test pairs, <strong>Step 2</strong> cleans and normalizes functions into structured instruction-tuning schemas with ground-truth signatures and docstrings, <strong>Step 3</strong> performs multi-task supervised fine-tuning (SFT) over CodeLlama/StarCoder on code and test generation tokens, <strong>Step 4</strong> applies execution-guided reinforcement and rejection sampling with sandboxed pytest runs to learn traceback-conditioned self-repair, and <strong>Step 5</strong> deploys the model into an autonomous production loop capable of discovering API gaps and opening merged GitHub pull requests with zero human keyframing:
                </p>

                {/* Editorial Architecture Diagram */}
                <AutonomousCodeGenArchitecture />
              </div>
            ) : currentProject.slug === "rag-docs-assistant" ? (
              <div className="space-y-4">
                <p className="text-sm text-[var(--foreground)] leading-relaxed">
                  The multi-repository RAG documentation assistant connects to continuously updating Ivy framework codebases and internal RFCs: <strong>Step 1</strong> intercepts GitHub commit push events across 4 repositories via an incremental diff webhook worker, <strong>Step 2</strong> applies Tree-Sitter and Python AST hierarchical chunking to preserve module, class, and docstring semantics with line-level provenance, <strong>Step 3</strong> generates hybrid vector representations (dense embeddings in Qdrant + sparse lexical inverted index via BM25), <strong>Step 4</strong> executes two-stage retrieval combining Reciprocal Rank Fusion (RRF) and cross-encoder re-ranking with strict confidence cutoffs, and <strong>Step 5</strong> synthesizes citation-enforced answers verified against git commit trees across the internal developer workspace, Slack, and IDEs:
                </p>

                {/* Editorial Architecture Diagram */}
                <MultiRepoRagArchitecture />
              </div>
            ) : currentProject.slug === "distforge" ? (
              <div className="space-y-4">
                <p className="text-sm text-[var(--foreground)] leading-relaxed">
                  DistForge operates a two-stage compilation pipeline: <strong>Stage 1</strong> builds an object-oriented Python AST where geometry primitives and CSG boolean operators construct an expression tree without performing premature spatial evaluations, <strong>Stage 2</strong> traverses the AST via a context-aware GLSL compiler with dynamic variable index allocation and recursive inverse coordinate domain-warping (eliminating global matrix multiplication overhead), and <strong>Stage 3</strong> bifurcates execution into a 60+ FPS screen-space fragment shader for interactive desktop raymarching with sub-second hot-reloading alongside an OpenGL 4.3 Compute Shader for massive parallel sampling and feature-preserving Dual Contouring mesh extraction:
                </p>

                {/* Editorial Architecture Diagram */}
                <DistForgeArchitectureDiagram />
              </div>
            ) : currentProject.slug === "patchllm" ? (
              <div className="space-y-4">
                <p className="text-sm text-[var(--foreground)] leading-relaxed">
                  PatchLLM executes a structured 4-tier interactive refactoring lifecycle: <strong>Tier 1</strong> ingests user goals and expands dynamic context scopes (<code className="text-emerald-500">@git:staged</code>, <code className="text-emerald-500">@dir</code>, <code className="text-emerald-500">@file</code>) while budgeting AST token bounds, <strong>Tier 2</strong> generates atomic steps with stateful session serialization and crash recovery (<code className="text-[var(--foreground)] font-mono">.patchllm/sessions/*.json</code>), <strong>Tier 3</strong> invokes foundation models via a LiteLLM multi-provider router to synthesize and dry-run validate unified git diffs, and <strong>Tier 4</strong> presents interactive diffs for granular user approval, atomic disk writes, and instant 1-key rollback snapshots (<code className="text-emerald-500">/revert</code>):
                </p>

                {/* Editorial Architecture Diagram */}
                <PatchLlmArchitectureDiagram />
              </div>
            ) : (
              currentProject.pipelineDiagram && (
                <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--background)] font-mono text-xs text-emerald-600 dark:text-emerald-400 overflow-x-auto leading-relaxed">
                  <div className="text-[10px] text-[var(--muted)] uppercase tracking-wider mb-2 font-sans font-semibold">
                    Execution Pipeline Flow
                  </div>
                  <pre>{currentProject.pipelineDiagram.join("\n")}</pre>
                </div>
              )
            )}
          </div>

        </>
      )}
    </div>
    {(currentProject.slug === "autonomous-ai-teammates" || currentProject.slug === "driftlab-agent-adaptation" || currentProject.slug === "neural-llm-router" || currentProject.slug === "distforge" || currentProject.slug === "endogenous-subspace-orthogonalization" || currentProject.slug === "ivy-framework-transpiler" || currentProject.slug === "llm-observability-platform") && (
      <div className="flex shrink-0 items-center justify-between gap-3 border-t border-[var(--border)] bg-[var(--card)]/95 px-6 py-3 backdrop-blur-sm">
        <span className="text-xs text-[var(--muted)]">Project Link</span>
        <a
          href={currentProject.slug === "driftlab-agent-adaptation" ? "https://www.unfoldinglabs.ai/research/driftlab-agent-adaptation" : currentProject.slug === "endogenous-subspace-orthogonalization" ? "https://www.unfoldinglabs.ai/research/endogenous-subspace-orthogonalization" : currentProject.slug === "neural-llm-router" ? "https://www.producthunt.com/products/unify-5/launches/unify-router" : currentProject.slug === "distforge" ? "http://github.com/nassimberrada/distforge/" : currentProject.slug === "ivy-framework-transpiler" ? "https://github.com/unifyai/ivy" : currentProject.slug === "llm-observability-platform" ? "https://www.producthunt.com/products/unify-5/launches/unify-interfaces" : "https://www.producthunt.com/products/unify-5"}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
        >
          <ExternalLink className="h-3.5 w-3.5" />
          {currentProject.slug === "driftlab-agent-adaptation" || currentProject.slug === "endogenous-subspace-orthogonalization" ? "Open research post" : currentProject.slug === "distforge" || currentProject.slug === "ivy-framework-transpiler" ? "GitHub Repository" : "Product Hunt"}
        </a>
      </div>
    )}
  </div>
</div>
  );
}
