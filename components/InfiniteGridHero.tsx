"use client";

import React, { useEffect, useRef, useState, useMemo, useCallback } from "react";
import {
  PROJECTS,
  Project,
  getProjectDisplayTags,
  getProjectTags,
} from "@/data/projects";
import { ProjectModal } from "@/components/ProjectModal";
import { LeftFilterMenu } from "@/components/LeftFilterMenu";
import { useHeader } from "@/lib/headerContext";
import { ArrowDown, Layers, Cpu } from "lucide-react";
import { getNeuralRouterCardSvg } from "@/components/figures/CustomNeuralRouterVisual";
import { getIvyCompilerCardSvg } from "@/components/figures/CustomIvyCompilerVisual";
import { getTeammatesCardSvg } from "@/components/figures/CustomTeammatesVisual";
import { getObservabilityCardSvg } from "@/components/figures/CustomObservabilityVisual";
import { getBenchmarkingCardSvg } from "@/components/figures/CustomBenchmarkingVisual";
import { getAvatarCardSvg } from "@/components/figures/CustomAvatarVisual";
import { getStoryboardCardSvg } from "@/components/figures/CustomStoryboardVisual";
import { getEdgeOptimizationCardSvg } from "@/components/figures/CustomEdgeOptimizationVisual";
import { getTranspilationBenchmarkingCardSvg } from "@/components/figures/TranspilationBenchmarkingVisual";
import { getAutonomousCodeGenCardSvg } from "@/components/figures/AutonomousCodeGenVisual";
import { getRagDocsAssistantCardSvg } from "@/components/figures/CustomRagDocsVisual";
import { getOrthoLoraCardSvg } from "@/components/figures/OrthoLoraVisual";
import { getDriftLabCardSvg } from "@/components/figures/DriftLabVisual";
import { getBfrbCardSvg } from "@/components/figures/BfrbDetectionVisual";
import { getSpotifyTrendCardSvg } from "@/components/figures/SpotifyTrendVisual";
import { getFreightPricingCardSvg } from "@/components/figures/FreightPricingVisual";
import { getDistForgeCardSvg } from "@/components/figures/DistForge3DVisual";
import { getPatchLlmCardSvg } from "@/components/figures/PatchLlmVisual";
import { ProjectTypeIcon } from "@/components/ProjectTypeIcon";
import { DescentBackground } from "@/components/DescentBackground";

interface GridItemData {
  id: number;
  project: Project;
  element: HTMLDivElement | null;
  baseCenterX: number;
  baseCenterY: number;
  visualX: number;
  visualY: number;
  width: number;
  height: number;
  colSpan: number;
  rowSpan: number;
  currentScale: number;
  currentOpacity: number;
  currentFilter: number;
}

interface AnimatedProjectEntry {
  project: Project;
  occurrenceKey: string;
  phase: "entering" | "present" | "exiting";
}

const LIST_PAGE_SIZE = 8;
const GRID_SCROLL_FRICTION = 0.92;
const GRID_SCROLL_FORCE = 0.085;
const GRID_MAX_VELOCITY = 35;

function getGridLayoutKey() {
  if (typeof window === "undefined") return "0:2";
  const inset = window.innerWidth >= 768 ? 316 : 0;
  const width = Math.max(1, window.innerWidth - inset);
  const columns = width >= 1048 ? 4 : width >= 768 ? 3 : 2;
  return `${inset}:${columns}`;
}

function AnimatedProjectList({
  projects,
  onSelect,
  scrollRoot,
}: {
  projects: Project[];
  onSelect: (project: Project) => void;
  scrollRoot: React.RefObject<HTMLDivElement | null>;
}) {
  const [visibleCount, setVisibleCount] = useState(() => Math.min(LIST_PAGE_SIZE, projects.length));
  const sentinelRef = useRef<HTMLDivElement>(null);
  const velocityRef = useRef(0);
  const scrollFrameRef = useRef(0);
  const visibleProjects = useMemo(
    () =>
      projects.slice(0, visibleCount).map((project, index) => ({
        project,
        occurrenceKey: `${index}:${project.slug}`,
      })),
    [projects, visibleCount]
  );
  const [entries, setEntries] = useState<AnimatedProjectEntry[]>(() =>
    visibleProjects.map(({ project, occurrenceKey }) => ({ project, occurrenceKey, phase: "present" }))
  );

  useEffect(() => {
    const sentinel = sentinelRef.current;
    const root = scrollRoot.current;
    if (!sentinel || !root || visibleCount >= projects.length) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisibleCount((count) => Math.min(projects.length, count + LIST_PAGE_SIZE));
        }
      },
      { root, rootMargin: "320px 0px", threshold: 0 }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [projects.length, scrollRoot, visibleCount]);

  const handleWheel = useCallback((event: WheelEvent) => {
    if (event.ctrlKey || event.deltaY === 0) return;
    const root = scrollRoot.current;
    if (!root) return;

    event.preventDefault();
    velocityRef.current -= event.deltaY * GRID_SCROLL_FORCE;
    velocityRef.current = Math.max(
      -GRID_MAX_VELOCITY,
      Math.min(GRID_MAX_VELOCITY, velocityRef.current)
    );

    const animateScroll = () => {
      const scrollRootElement = scrollRoot.current;
      if (!scrollRootElement) {
        scrollFrameRef.current = 0;
        return;
      }

      velocityRef.current *= GRID_SCROLL_FRICTION;
      const maxScroll = scrollRootElement.scrollHeight - scrollRootElement.clientHeight;
      scrollRootElement.scrollTop = Math.max(
        0,
        Math.min(maxScroll, scrollRootElement.scrollTop - velocityRef.current)
      );

      const hitTop = scrollRootElement.scrollTop === 0 && velocityRef.current > 0;
      const hitBottom = scrollRootElement.scrollTop === maxScroll && velocityRef.current < 0;
      if (Math.abs(velocityRef.current) < 0.1 || hitTop || hitBottom) {
        velocityRef.current = 0;
        scrollFrameRef.current = 0;
        return;
      }

      scrollFrameRef.current = requestAnimationFrame(animateScroll);
    };

    if (!scrollFrameRef.current) scrollFrameRef.current = requestAnimationFrame(animateScroll);
  }, [scrollRoot]);

  useEffect(() => {
    const root = scrollRoot.current;
    if (!root) return;
    root.addEventListener("wheel", handleWheel, { passive: false });
    return () => root.removeEventListener("wheel", handleWheel);
  }, [handleWheel, scrollRoot]);

  useEffect(() => () => cancelAnimationFrame(scrollFrameRef.current), []);

  useEffect(() => {
    setEntries((previous) => {
      const desiredKeys = new Set(visibleProjects.map((entry) => entry.occurrenceKey));
      const previousByKey = new Map(previous.map((entry) => [entry.occurrenceKey, entry]));
      const current = visibleProjects.map(({ project, occurrenceKey }) => ({
        project,
        occurrenceKey,
        phase: previousByKey.has(occurrenceKey) ? ("present" as const) : ("entering" as const),
      }));
      const exiting = previous
        .filter((entry) => !desiredKeys.has(entry.occurrenceKey))
        .map((entry) => ({ ...entry, phase: "exiting" as const }));
      return [...current, ...exiting];
    });

    const timeout = window.setTimeout(() => {
      setEntries((current) =>
        current
          .filter((entry) => entry.phase !== "exiting")
          .map((entry) => (entry.phase === "entering" ? { ...entry, phase: "present" } : entry))
      );
    }, 290);
    return () => {
      window.clearTimeout(timeout);
    };
  }, [visibleProjects]);

  return (
    <div className="mx-auto max-w-5xl space-y-5">
      {entries.map(({ project, occurrenceKey, phase }) => {
        const isFeatured = !!project.featured;

        return (
          <button
            key={occurrenceKey}
            onClick={() => onSelect(project)}
            aria-hidden={phase === "exiting"}
            tabIndex={phase === "exiting" ? -1 : undefined}
            className={`project-list-card w-full rounded-lg border text-left p-4 sm:p-5 shadow-none transition-[border-color,background-color,transform] duration-300 group ${
              isFeatured
                ? "border-[var(--border)] bg-[var(--card)] hover:border-emerald-500/80 min-h-36 sm:min-h-40"
                : "border-[var(--border)] bg-[var(--project-card)] hover:border-emerald-500/50 min-h-28 sm:min-h-32"
            } ${
              phase === "entering"
                ? "project-list-enter"
                : phase === "exiting"
                ? "project-list-exit pointer-events-none"
                : ""
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 truncate">
                    {isFeatured ? project.period : `${project.company} · ${project.period}`}
                  </span>
                </div>

                <h2 className="project-list-title mt-1 flex items-start gap-1.5 text-base sm:text-lg text-[var(--foreground)] leading-tight">
                  <ProjectTypeIcon
                    category={project.category}
                    className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500"
                  />
                  <span>{project.title}</span>
                </h2>
                <p className="mt-1 block min-w-0 truncate text-xs text-[var(--muted)]">{project.subtitle}</p>

              </div>

              <div className="shrink-0 flex items-center gap-2 sm:gap-4 text-right">
                {(isFeatured ? project.metrics?.slice(0, 2) : project.metrics?.slice(0, 1))?.map(
                  (m) => (
                    <div key={m.label}>
                      <div className="font-mono font-bold text-emerald-600 dark:text-emerald-400 text-sm sm:text-base">
                        {m.value}
                      </div>
                      <div className="text-[9px] text-[var(--muted)] font-mono">{m.label}</div>
                    </div>
                  )
                )}
              </div>
            </div>

            {isFeatured && project.challenge && (
              <p className="mt-2 text-xs leading-relaxed text-[var(--foreground)]/80 border-l-2 border-emerald-500/50 pl-2.5 font-sans italic hidden sm:block">
                &ldquo;{project.challenge}&rdquo;
              </p>
            )}

            <div className="mt-3 flex flex-wrap gap-1">
              {getProjectDisplayTags(project)
                .slice(0, isFeatured ? 5 : 4)
                .map((tag) => (
                  <span
                    key={tag}
                    className={`project-tag rounded px-1.5 py-0.5 text-[9px] font-mono ${
                      isFeatured
                        ? "bg-emerald-500/5 text-emerald-700/80 dark:text-emerald-300/80 border border-emerald-500/10"
                        : "bg-[var(--muted-bg)]/70 text-[var(--muted)] border border-[var(--border)]/60"
                    }`}
                  >
                    {tag}
                  </span>
                ))}
            </div>
            {isFeatured && (
              <span className="mt-2 block text-right text-[9px] font-mono font-semibold text-emerald-600 dark:text-emerald-400">
                Project Details →
              </span>
            )}
          </button>
        );
      })}
      {visibleCount < projects.length && (
        <div ref={sentinelRef} aria-hidden="true" className="h-2" />
      )}
    </div>
  );
}

export function InfiniteGridHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const listViewportRef = useRef<HTMLDivElement>(null);

  const {
    isExploreMode,
    setIsExploreMode,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedTopic,
    setSelectedTopic,
    selectedContext,
    setSelectedContext,
    cardView,
  } = useHeader();

  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [gridLayoutKey, setGridLayoutKey] = useState(getGridLayoutKey);

  useEffect(() => {
    const updateGridLayout = () => setGridLayoutKey(getGridLayoutKey());
    window.addEventListener("resize", updateGridLayout);
    return () => window.removeEventListener("resize", updateGridLayout);
  }, []);

  const setProjectAndUrl = useCallback((project: Project | null, replace = false) => {
    setActiveProject(project);
    const url = project ? `/projects/${project.slug}` : "/";
    if (window.location.pathname !== url) {
      window.history[replace || !project ? "replaceState" : "pushState"]({}, "", url);
    }
  }, []);

  useEffect(() => {
    const syncProjectFromUrl = () => {
      const match = window.location.pathname.match(/^\/projects\/([^/]+)\/?$/);
      const project = match ? PROJECTS.find((p) => p.slug === match[1]) ?? null : null;
      setActiveProject(project);
    };
    syncProjectFromUrl();
    window.addEventListener("popstate", syncProjectFromUrl);
    return () => window.removeEventListener("popstate", syncProjectFromUrl);
  }, []);

  // Grid constants: the canvas has a finite 16-column x 13-row placement area.
  const BASE_ITEM_WIDTH = 240;
  const BASE_ITEM_HEIGHT = 175;
  const GAP = 16;
  const COLS = 16;
  const ROWS = 13;
  const CELL_WIDTH = BASE_ITEM_WIDTH + GAP;
  const CELL_HEIGHT = BASE_ITEM_HEIGHT + GAP;
  const GRID_TOP_PADDING = 96;

  const INFLUENCE_RADIUS = 240;
  const MAX_SCALE = 1.25;
  const LERP_FACTOR = 0.12;

  const itemsRef = useRef<GridItemData[]>([]);
  const gridContentBottomRef = useRef(0);
  const filteredClusterBottomRef = useRef(0);
  const isExploreModeRef = useRef(isExploreMode);
  isExploreModeRef.current = isExploreMode;

  const searchQueryRef = useRef(searchQuery);
  searchQueryRef.current = searchQuery;
  const selectedCategoryRef = useRef(selectedCategory);
  selectedCategoryRef.current = selectedCategory;
  const selectedTopicRef = useRef(selectedTopic);
  selectedTopicRef.current = selectedTopic;
  const selectedContextRef = useRef(selectedContext);
  selectedContextRef.current = selectedContext;
  const activeProjectRef = useRef(activeProject);
  activeProjectRef.current = activeProject;

  const activeProjectIndex = useMemo(() => {
    if (!activeProject) return -1;
    return PROJECTS.findIndex((p) => p.slug === activeProject.slug);
  }, [activeProject]);

  const isProjectMatching = useCallback((project: Project): boolean => {
    const q = searchQueryRef.current.trim().toLowerCase();
    const cat = selectedCategoryRef.current;
    const top = selectedTopicRef.current;
    const context = selectedContextRef.current;

    if (cat !== "All" && (cat === "Data" ? project.category !== "Analysis" : project.category !== cat)) return false;
    if (top !== "All" && !getProjectTags(project).includes(top)) return false;
    const contextMatches =
      context === "All" ||
      (context === "Personal Projects"
        ? project.projectContext === "personal"
        : context === "AI Researcher @UnfoldingLabs"
        ? project.companySlug === "unfolding-labs"
        : context === "AI Engineer @UnifyAI"
        ? project.companySlug === "unify-ai"
        : context === "ML Research Engineer @DeepIvy"
        ? project.companySlug === "deep-ivy"
        : project.companySlug === "freelance");
    if (context !== "All" && !contextMatches) return false;

    if (q) {
      const matchTitle = project.title.toLowerCase().includes(q);
      const searchableCopy = [project.subtitle, project.challenge, project.architecture, ...project.methodology, ...project.results]
        .join(" ")
        .toLowerCase();
      const matchCopy = searchableCopy.includes(q);
      const matchTech = project.techStack.some((t) => t.toLowerCase().includes(q));
      const matchTags = [...project.latexTags, ...getProjectTags(project)].some((t) =>
        t.toLowerCase().includes(q)
      );
      const matchCompany = project.company.toLowerCase().includes(q);
      const matchRole = project.role.toLowerCase().includes(q);
      if (
        !matchTitle &&
        !matchCopy &&
        !matchTech &&
        !matchTags &&
        !matchCompany &&
        !matchRole
      ) {
        return false;
      }
    }
    return true;
  }, []);

  const hasActiveFilter =
    searchQuery.trim().length > 0 ||
    selectedCategory !== "All" ||
    selectedTopic !== "All" ||
    selectedContext !== "All";

  const matchingCount = useMemo(() => {
    if (!hasActiveFilter) return PROJECTS.length;
    return PROJECTS.filter((p) => isProjectMatching(p)).length;
  }, [hasActiveFilter, isProjectMatching, searchQuery, selectedCategory, selectedTopic, selectedContext]);

  const listProjects = useMemo(
    () => PROJECTS.filter(isProjectMatching),
    [isProjectMatching, searchQuery, selectedCategory, selectedTopic, selectedContext]
  );

  // Initialize Bento Grid Layout
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    viewport.innerHTML = "";
    itemsRef.current = [];

    // 2D Occupancy matrix (ROWS x COLS)
    const grid: boolean[][] = Array.from({ length: ROWS }, () =>
      Array.from({ length: COLS }, () => false)
    );

    const gridInset = window.innerWidth >= 768 ? 316 : 0;
    const visibleGridWidth = Math.max(1, window.innerWidth - gridInset);
    const visibleColumns = visibleGridWidth >= 1048 ? 4 : visibleGridWidth >= 768 ? 3 : 2;
    const visibleStartColumn = 1;
    const visibleEndColumn = visibleStartColumn + visibleColumns;

    let idCounter = 0;

    // Helper to render card visuals
    const getCardBackground = (slug: string) => {
      const visualInner =
        slug === "neural-llm-router"
          ? getNeuralRouterCardSvg()
          : slug === "ivy-framework-transpiler"
          ? getIvyCompilerCardSvg()
          : slug === "autonomous-ai-teammates"
          ? getTeammatesCardSvg()
          : slug === "llm-observability-platform"
          ? getObservabilityCardSvg()
          : slug === "llm-evals-benchmarking"
          ? getBenchmarkingCardSvg()
          : slug === "realtime-avatar-animation"
          ? getAvatarCardSvg()
          : slug === "generative-video-pipeline"
          ? getStoryboardCardSvg()
          : slug === "edge-model-optimization"
          ? getEdgeOptimizationCardSvg()
          : slug === "cross-framework-model-benchmarks"
          ? getTranspilationBenchmarkingCardSvg()
          : slug === "self-contributing-codegen-agent"
          ? getAutonomousCodeGenCardSvg()
          : slug === "rag-docs-assistant"
          ? getRagDocsAssistantCardSvg()
          : slug === "endogenous-subspace-orthogonalization"
          ? getOrthoLoraCardSvg()
          : slug === "driftlab-agent-adaptation"
          ? getDriftLabCardSvg()
          : slug === "pediatric-bfrb-classification"
          ? getBfrbCardSvg()
          : slug === "spotify-sound-trend-evolution"
          ? getSpotifyTrendCardSvg()
          : slug === "dynamic-freight-rate-forecasting"
          ? getFreightPricingCardSvg()
          : slug === "distforge"
          ? getDistForgeCardSvg()
          : slug === "patchllm"
          ? getPatchLlmCardSvg()
          : "";

      const backgroundMotionClass =
        slug === "autonomous-ai-teammates" ? "project-card-bg-teammates" : "scale-[1.05]";

      return visualInner
        ? `<div data-project-card-visual class="absolute inset-0 w-full h-full pointer-events-none overflow-hidden rounded-2xl opacity-30 dark:opacity-22 blur-[1px] ${backgroundMotionClass} flex items-center justify-center">${visualInner}</div>`
        : "";
    };

    const addCardGraphicMotion = (tile: HTMLDivElement, slug: string) => {
      const background = tile.querySelector<HTMLElement>("[data-project-card-visual]");
      const svg = background?.querySelector<SVGSVGElement>("svg");
      if (!background || !svg) return;

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
      type MotionSpec = { selector: string; frames: Keyframe[]; duration: number; delay?: number; easing?: string; dash?: "draw" | "flow" };
      const specs: Record<string, MotionSpec[]> = {
        "autonomous-ai-teammates": [
          { selector: ".teammate-flow-pulse-in", frames: [{ cx: 95, r: 2.6, opacity: 0 }, { cx: 110, r: 4.4, opacity: 1, offset: 0.5 }, { cx: 125, r: 2.6, opacity: 0 }], duration: 1500 },
          { selector: ".teammate-flow-pulse-out", frames: [{ cx: 210, r: 2.6, opacity: 0 }, { cx: 225, r: 4.4, opacity: 1, offset: 0.5 }, { cx: 240, r: 2.6, opacity: 0 }], duration: 1500, delay: 750 },
        ],
        "neural-llm-router": [
          { selector: ".router-provider-blocks", frames: [{ transform: "translateY(0px)" }, { transform: "translateY(-9px)" }, { transform: "translateY(0px)" }], duration: 2400, easing: "ease-in-out" },
        ],
        distforge: [
          { selector: ".distforge-rotating-cube", frames: [{ transform: "rotate(0deg)" }, { transform: "rotate(14deg)" }, { transform: "rotate(0deg)" }, { transform: "rotate(-14deg)" }, { transform: "rotate(0deg)" }], duration: 7800, easing: "ease-in-out" },
        ],
        "endogenous-subspace-orthogonalization": [
          { selector: ".ortho-vector", frames: [{ opacity: 0.18, strokeWidth: 1.5 }, { opacity: 1, strokeWidth: 3.4 }, { opacity: 0.18, strokeWidth: 1.5 }], duration: 1600, delay: 180 },
        ],
        "driftlab-agent-adaptation": [
          { selector: ".driftlab-change-marker", frames: [{ strokeDashoffset: 0 }, { strokeDashoffset: -24 }], duration: 1600, easing: "linear", dash: "flow" },
          { selector: ".driftlab-change-point", frames: [{ transform: "scale(1)", opacity: 0.25 }, { transform: "scale(1.42)", opacity: 1 }, { transform: "scale(1)", opacity: 0.25 }], duration: 1650 },
          { selector: ".driftlab-recovery-step", frames: [{ opacity: 0.2, fillOpacity: 0.15 }, { opacity: 1, fillOpacity: 0.85 }, { opacity: 0.2, fillOpacity: 0.15 }], duration: 1300, delay: 340 },
        ],
        "llm-observability-platform": [
          { selector: ".observability-trace", frames: [{ strokeDashoffset: 1, opacity: 0.15 }, { strokeDashoffset: 0, opacity: 1 }], duration: 1800, delay: 260, easing: "ease-out", dash: "draw" },
        ],
        "llm-evals-benchmarking": [
          { selector: ".benchmark-throughput-trace", frames: [{ strokeDashoffset: 1, opacity: 0.12 }, { strokeDashoffset: 0, opacity: 1 }], duration: 1600, easing: "ease-out", dash: "draw" },
        ],
        "realtime-avatar-animation": [
          { selector: ".avatar-pipeline-stage", frames: [{ fillOpacity: 0.08, transform: "scale(1)" }, { fillOpacity: 0.8, transform: "scale(1.1)" }, { fillOpacity: 0.08, transform: "scale(1)" }], duration: 1300, delay: 300 },
        ],
        "generative-video-pipeline": [
          { selector: ".storyboard-panel", frames: [{ strokeOpacity: 0.12, fillOpacity: 0.04 }, { strokeOpacity: 1, fillOpacity: 0.42 }, { strokeOpacity: 0.12, fillOpacity: 0.04 }], duration: 1350, delay: 440 },
        ],
        "ivy-framework-transpiler": [
          { selector: ".ivy-framework-link", frames: [{ strokeDashoffset: 1, opacity: 0.12 }, { strokeDashoffset: 0, opacity: 1 }], duration: 1050, delay: 240, easing: "ease-out", dash: "draw" },
        ],
        "cross-framework-model-benchmarks": [
          { selector: ".transpilation-benchmark-bar", frames: [{ transform: "scaleX(0.45)" }, { transform: "scaleX(1)" }], duration: 1000, delay: 280, easing: "cubic-bezier(.2,.8,.2,1)" },
        ],
        "self-contributing-codegen-agent": [
          { selector: ".codegen-line", frames: [{ transform: "scaleX(0.08)", opacity: 0.35 }, { transform: "scaleX(1)", opacity: 1 }], duration: 900, delay: 160, easing: "ease-out" },
          { selector: ".codegen-ci-badge", frames: [{ opacity: 0.5 }, { opacity: 1 }, { opacity: 0.5 }], duration: 1900 },
        ],
        "rag-docs-assistant": [
          { selector: ".rag-user-message", frames: [{ fillOpacity: 0.06 }, { fillOpacity: 0.7 }, { fillOpacity: 0.06 }], duration: 1200 },
          { selector: ".rag-citation-match", frames: [{ fillOpacity: 0.04, strokeOpacity: 0.2 }, { fillOpacity: 0.62, strokeOpacity: 1 }, { fillOpacity: 0.04, strokeOpacity: 0.2 }], duration: 1350, delay: 500 },
        ],
        "edge-model-optimization": [
          { selector: ".edge-transform-stage", frames: [{ strokeDashoffset: 0, opacity: 0.18 }, { strokeDashoffset: -12, opacity: 1 }], duration: 1000, delay: 420, dash: "flow" },
        ],
        "dynamic-freight-rate-forecasting": [
          { selector: ".freight-route-line", frames: [{ strokeDashoffset: 1, opacity: 0.12 }, { strokeDashoffset: 0, opacity: 1 }], duration: 1800, easing: "ease-in-out", dash: "draw" },
        ],
        "pediatric-bfrb-classification": [
          { selector: ".bfrb-motion-wave", frames: [{ strokeDashoffset: 0 }, { strokeDashoffset: -90 }], duration: 1700, easing: "linear", dash: "flow" },
        ],
        "spotify-sound-trend-evolution": [
          { selector: ".spotify-decade-playhead", frames: [{ transform: "translateX(0px)" }, { transform: "translateX(280px)" }], duration: 3200, easing: "linear" },
          { selector: ".spotify-duration-trend", frames: [{ strokeDashoffset: 1, opacity: 0.12 }, { strokeDashoffset: 0, opacity: 1 }], duration: 2100, easing: "ease-out", dash: "draw" },
        ],
        patchllm: [
          { selector: ".patch-diff-addition", frames: [{ fillOpacity: 0.08 }, { fillOpacity: 0.8 }, { fillOpacity: 0.08 }], duration: 1100, delay: 240 },
          { selector: ".patch-approval-badge", frames: [{ opacity: 0.5 }, { opacity: 1 }, { opacity: 0.5 }], duration: 1800, delay: 650 },
        ],
      };

      const cardSpecs = specs[slug];
      if (!cardSpecs) return;
      let animations: Animation[] = [];
      let restoreStyles: (() => void)[] = [];
      const stopAnimations = () => {
        animations.forEach((animation) => animation.cancel());
        animations = [];
        restoreStyles.forEach((restore) => restore());
        restoreStyles = [];
      };
      tile.addEventListener("pointerenter", () => {
        if (reduceMotion.matches) return;
        stopAnimations();
        cardSpecs.forEach((spec) => {
          const elements = Array.from(svg.querySelectorAll<SVGElement>(spec.selector));
          elements.forEach((element, index) => {
            let frames = spec.frames;
            if (spec.dash) {
              const geometry = element as SVGGeometryElement;
              let length = 0;
              try {
                length = geometry.getTotalLength();
              } catch {
                return;
              }
              if (!Number.isFinite(length) || length <= 0) return;

              const previousDashArray = element.style.strokeDasharray;
              const previousDashOffset = element.style.strokeDashoffset;
              restoreStyles.push(() => {
                element.style.strokeDasharray = previousDashArray;
                element.style.strokeDashoffset = previousDashOffset;
              });
              if (spec.dash === "draw") {
                element.style.strokeDasharray = `${length}`;
                frames = spec.frames.map((frame, frameIndex) => ({
                  ...frame,
                  strokeDashoffset: frameIndex === 0 ? length : frameIndex === spec.frames.length - 1 ? 0 : length * 0.35,
                }));
              } else if (window.getComputedStyle(element).strokeDasharray === "none") {
                element.style.strokeDasharray = `${Math.max(4, length * 0.09)} ${Math.max(3, length * 0.045)}`;
              }
            }
            if (spec.frames.some((frame) => "transform" in frame)) {
              element.style.transformBox = "fill-box";
              element.style.transformOrigin =
                spec.selector === ".codegen-line" || spec.selector === ".transpilation-benchmark-bar"
                  ? "left center"
                  : "center";
            }
            animations.push(element.animate(frames, {
              duration: spec.duration,
              delay: (spec.delay ?? 0) + index * 180,
              iterations: Infinity,
              direction: spec.selector === ".distforge-rotating-cube" ? "alternate" : "normal",
              easing: spec.easing ?? "ease-in-out",
            }));
          });
        });
      });
      tile.addEventListener("pointerleave", () => {
        stopAnimations();
      });
    };

    const getTypeIcon = (category: string) =>
      category === "Research"
        ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3h6M10 3v6.5l-5.2 8.7A2.5 2.5 0 0 0 6.9 22h10.2a2.5 2.5 0 0 0 2.1-3.8L14 9.5V3M8 15h8"/></svg>`
        : category === "Engineering"
        ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m8 8-4 4 4 4M16 8l4 4-4 4M14 4l-4 16"/></svg>`
        : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18M18 17V9M13 17V5M8 17v-3"/></svg>`;

    // Place one expanded card for each featured project inside the visible columns.
    const featuredProjects = PROJECTS.filter((p) => p.featured);
    const standardProjects = PROJECTS.filter((p) => !p.featured);

    const featuredForSampling = featuredProjects.filter((p) => p.slug !== "distforge").sort(
      (a, b) =>
        Number(a.featuredSpan === "vertical") - Number(b.featuredSpan === "vertical")
    );
    const distForgeProject = featuredProjects.find((p) => p.slug === "distforge");
    if (distForgeProject) featuredForSampling.push(distForgeProject);
    const dynamicPlacements: { project: Project; r: number; c: number }[] = [];
    for (const project of featuredForSampling) {
        const colSpan = project.featuredSpan === "vertical" ? 1 : 2;
        const rowSpan = project.featuredSpan === "vertical" ? 2 : 1;
        let placement: { r: number; c: number } | undefined;

        // Place DistForge immediately before the final regular card, PatchLLM.
        // On a two-column layout, its horizontal span fills the row above it.
        if (project.slug === "distforge") {
          let bestScore = Number.POSITIVE_INFINITY;
          let bestRow = -1;
          let bestColumn = -1;

          for (let r = 0; r <= ROWS - rowSpan; r++) {
            for (let c = visibleStartColumn; c <= visibleEndColumn - colSpan; c++) {
              if (grid[r][c] || grid[r][c + 1]) continue;

              let slotIndex = 0;
              let finalStandardSlot: { r: number; c: number } | undefined;
              for (let slotRow = 0; slotRow < ROWS && !finalStandardSlot; slotRow++) {
                for (let slotColumn = visibleStartColumn; slotColumn < visibleEndColumn; slotColumn++) {
                  const reservedByDistForge = slotRow === r && slotColumn >= c && slotColumn < c + colSpan;
                  if (grid[slotRow][slotColumn] || reservedByDistForge) continue;
                  if (slotIndex === standardProjects.length - 1) {
                    finalStandardSlot = { r: slotRow, c: slotColumn };
                    break;
                  }
                  slotIndex++;
                }
              }
              if (!finalStandardSlot) continue;
              if (
                finalStandardSlot.r < r ||
                (finalStandardSlot.r === r && finalStandardSlot.c < c + colSpan)
              ) {
                continue;
              }

              const horizontalGap =
                finalStandardSlot.c < c
                  ? c - finalStandardSlot.c
                  : finalStandardSlot.c >= c + colSpan
                  ? finalStandardSlot.c - (c + colSpan - 1)
                  : 0;
              const distance = Math.abs(finalStandardSlot.r - r) + horizontalGap;
              const score = distance * 100 + r;
              if (score < bestScore) {
                bestScore = score;
                bestRow = r;
                bestColumn = c;
              }
            }
          }

          if (bestRow >= 0) {
            placement = { r: bestRow, c: bestColumn };
            for (let dc = 0; dc < colSpan; dc++) grid[bestRow][bestColumn + dc] = true;
          }
        }

        for (let r = 0; r <= ROWS - rowSpan && !placement; r++) {
          for (let c = visibleStartColumn; c <= visibleEndColumn - colSpan; c++) {
            let available = true;
            for (let dr = 0; dr < rowSpan && available; dr++) {
              for (let dc = 0; dc < colSpan; dc++) {
                if (grid[r + dr][c + dc]) {
                  available = false;
                  break;
                }
              }
            }
            if (!available) continue;

            placement = { r, c };
            for (let dr = 0; dr < rowSpan; dr++) {
              for (let dc = 0; dc < colSpan; dc++) grid[r + dr][c + dc] = true;
            }
            break;
          }
        }

        if (placement) dynamicPlacements.push({ project, ...placement });
    }

    // Stamp the dynamically collected featured projects
    dynamicPlacements.forEach(({ project, r, c }) => {
      const isVertical = project.featuredSpan === "vertical";
      const requestedColSpan = isVertical ? 1 : 2;
      const rowSpan = isVertical ? 2 : 1;
      const placementColumn = c;
      const colSpan = requestedColSpan;

      // Ensure it fits within world boundaries
      if (r + rowSpan > ROWS || placementColumn + colSpan > COLS) return;

      const itemWidth = colSpan * CELL_WIDTH - GAP;
      const itemHeight = rowSpan * CELL_HEIGHT - GAP;
      const tileDiv = document.createElement("div");

      tileDiv.className =
        "project-grid-card absolute cursor-pointer rounded-lg border border-[var(--border)] bg-[var(--card)] p-4 select-none hover:border-emerald-500/70 transition-[border-color,background-color,transform] overflow-hidden";
      tileDiv.style.width = `${itemWidth}px`;
      tileDiv.style.height = `${itemHeight}px`;
      tileDiv.style.willChange = "transform, opacity, filter";
      tileDiv.style.transformOrigin = "center center";

      const bgSvg = getCardBackground(project.slug);
      const typeIcon = getTypeIcon(project.category);

      if (isVertical) {
        tileDiv.innerHTML = `
          ${bgSvg}
          <div class="relative z-10 h-full flex flex-col justify-between pointer-events-none">
            <div>
              <div class="flex items-start gap-1.5 mb-1">
                <span class="text-emerald-500 w-3.5 h-3.5 shrink-0 mt-px">${typeIcon}</span>
                <h3 class="text-sm font-bold text-[var(--foreground)] line-clamp-2 leading-snug tracking-tight">${project.title}</h3>
              </div>
              <p class="text-[11px] text-[var(--muted)] line-clamp-3 leading-relaxed">${project.subtitle}</p>
            </div>
            <div class="space-y-1.5">
              ${(project.metrics || []).slice(0, 2).map((m) => `
                <div class="project-card-metric p-1.5 rounded-lg bg-[var(--card)]/85 backdrop-blur-sm border border-[var(--border)]/70">
                  <div class="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">${m.value}</div>
                  <div class="text-[9px] text-[var(--muted)] truncate font-mono">${m.label}</div>
                </div>
              `).join("")}
              <div class="flex flex-wrap gap-1">${getProjectDisplayTags(project).slice(0, 3).map((t) => `<span class="project-tag px-1.5 py-0.5 text-[9px] font-mono">${t}</span>`).join("")}</div>
              <span class="block text-right text-[9px] font-mono font-semibold text-emerald-600 dark:text-emerald-400">Project Details →</span>
            </div>
          </div>
        `;
      } else if (colSpan === 1) {
        tileDiv.innerHTML = `
          ${bgSvg}
          <div class="relative z-10 h-full flex flex-col justify-between pointer-events-none">
            <div>
              <div class="flex items-start gap-1.5">
                <span class="text-emerald-500 w-3.5 h-3.5 shrink-0 mt-px">${typeIcon}</span>
                <h3 class="text-xs font-bold text-[var(--foreground)] line-clamp-2 leading-snug tracking-tight">${project.title}</h3>
              </div>
            </div>
            <div>
              ${(project.metrics || []).slice(0, 1).map((m) => `<div class="project-card-metric p-1.5 rounded-lg bg-[var(--card)]/85 backdrop-blur-sm border border-[var(--border)]/70 mb-1.5"><div class="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">${m.value}</div><div class="text-[9px] text-[var(--muted)] truncate font-mono">${m.label}</div></div>`).join("")}
              <div class="flex flex-wrap gap-1">${getProjectDisplayTags(project).slice(0, 2).map((t) => `<span class="project-tag px-1.5 py-0.5 text-[9px] font-mono">${t}</span>`).join("")}</div>
              <span class="block text-right text-[9px] font-mono font-semibold text-emerald-600 dark:text-emerald-400">Project Details →</span>
            </div>
          </div>
        `;
      } else {
        tileDiv.innerHTML = `
          ${bgSvg}
          <div class="relative z-10 h-full flex flex-row items-stretch justify-between gap-4 pointer-events-none">
            <div class="flex-1 flex flex-col justify-between min-w-0 pr-1">
              <div>
                <div class="flex items-start gap-1.5"><span class="text-emerald-500 w-3.5 h-3.5 shrink-0 mt-0.5">${typeIcon}</span><h3 class="text-sm font-bold text-[var(--foreground)] line-clamp-2 leading-snug tracking-tight">${project.title}</h3></div>
                <p class="mt-1 text-[11px] text-[var(--muted)] line-clamp-2 leading-relaxed">${project.subtitle}</p>
              </div>
              <div class="flex flex-wrap gap-1 mt-1">${getProjectDisplayTags(project).slice(0, 3).map((t) => `<span class="project-tag px-1.5 py-0.5 text-[9px] font-mono">${t}</span>`).join("")}</div>
            </div>
            <div class="w-40 shrink-0 flex flex-col justify-between border-l border-[var(--border)]/60 pl-3">
              <div class="space-y-1.5">${(project.metrics || []).slice(0, 2).map((m) => `<div class="project-card-metric p-1.5 rounded-lg bg-[var(--card)]/85 backdrop-blur-sm border border-[var(--border)]/70"><div class="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">${m.value}</div><div class="text-[9px] text-[var(--muted)] truncate font-mono">${m.label}</div></div>`).join("")}</div>
              <span class="text-[9px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold self-end">Project Details →</span>
            </div>
          </div>
        `;
      }

      viewport.appendChild(tileDiv);
      addCardGraphicMotion(tileDiv, project.slug);

      itemsRef.current.push({
        id: idCounter++,
        project,
        element: tileDiv,
        baseCenterX: placementColumn * CELL_WIDTH + itemWidth / 2,
        baseCenterY: GRID_TOP_PADDING + r * CELL_HEIGHT + itemHeight / 2,
        visualX: placementColumn * CELL_WIDTH,
        visualY: GRID_TOP_PADDING + r * CELL_HEIGHT,
        width: itemWidth,
        height: itemHeight,
        colSpan,
        rowSpan,
        currentScale: 1,
        currentOpacity: 0.85,
        currentFilter: 100,
      });
    });

    // Fill only the visible columns and place each non-featured project once.
    const fillOrder: { r: number; c: number }[] = [];
    for (let r = 0; r < ROWS; r++) {
      for (let c = visibleStartColumn; c < Math.min(visibleEndColumn, COLS); c++) {
        fillOrder.push({ r, c });
      }
    }

    let standardCursor = 0;
    for (const { r, c } of fillOrder) {
      if (standardCursor >= standardProjects.length) break;
      if (grid[r][c]) continue; // occupied by a featured card
      grid[r][c] = true;

      const project = standardProjects[standardCursor++];

      const itemWidth = BASE_ITEM_WIDTH;
      const itemHeight = BASE_ITEM_HEIGHT;
      const tileDiv = document.createElement("div");

      tileDiv.className =
        "project-grid-card absolute cursor-pointer rounded-lg border border-[var(--border)] bg-[var(--project-card)] p-4 select-none hover:border-emerald-500/60 transition-[border-color,background-color,transform] overflow-hidden";
      tileDiv.style.width = `${itemWidth}px`;
      tileDiv.style.height = `${itemHeight}px`;
      tileDiv.style.willChange = "transform, opacity, filter";
      tileDiv.style.transformOrigin = "center center";

      const bgSvg = getCardBackground(project.slug);
      const typeIcon = getTypeIcon(project.category);
      const metric = project.metrics && project.metrics[0];

      tileDiv.innerHTML = `
          ${bgSvg}
          <div class="relative z-10 h-full flex flex-col justify-between pointer-events-none">
            <div>
              <div class="flex items-start gap-1.5 mb-2">
                <span class="text-emerald-500 w-3.5 h-3.5 shrink-0 mt-px">${typeIcon}</span>
                <h3 class="text-xs font-bold text-[var(--foreground)] line-clamp-2 leading-snug tracking-tight drop-shadow-sm">${project.title}</h3>
              </div>
            </div>
            
            <div>
              ${
                metric
                  ? `<div class="project-card-metric p-2 rounded-lg bg-[var(--card)]/80 backdrop-blur-sm border border-[var(--border)]/60 mb-2">
                      <div class="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">${metric.value}</div>
                      <div class="text-[9px] text-[var(--muted)] truncate font-mono">${metric.label}</div>
                    </div>`
                  : ""
              }
              <div class="flex flex-wrap gap-1">
                ${getProjectDisplayTags(project)
                  .slice(0, 2)
                  .map(
                    (t) =>
                      `<span class="project-tag px-1.5 py-0.5 text-[9px] font-mono">${t}</span>`
                  )
                  .join("")}
              </div>
            </div>
          </div>
        `;

      viewport.appendChild(tileDiv);
      addCardGraphicMotion(tileDiv, project.slug);

      itemsRef.current.push({
        id: idCounter++,
        project,
        element: tileDiv,
        baseCenterX: c * CELL_WIDTH + itemWidth / 2,
        baseCenterY: GRID_TOP_PADDING + r * CELL_HEIGHT + itemHeight / 2,
        visualX: c * CELL_WIDTH,
        visualY: GRID_TOP_PADDING + r * CELL_HEIGHT,
        width: itemWidth,
        height: itemHeight,
        colSpan: 1,
        rowSpan: 1,
        currentScale: 1,
        currentOpacity: 0.85,
        currentFilter: 100,
      });
    }

    gridContentBottomRef.current = Math.max(
      0,
      ...itemsRef.current.map((item) => item.baseCenterY + item.height / 2)
    );

    // Physics Drag & Momentum Loop
    let panY = 0;
    let isDragging = false;
    let velocityY = 0;
    let lastMouseX = 0;
    let lastMouseY = 0;
    let dragDistance = 0;
    let isTouchDragging = false;
    let lastTouchY = 0;

    let currentMouseX = window.innerWidth / 2;
    let currentMouseY = window.innerHeight / 2;

    const onMouseDown = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest("input, select, button, [role='dialog'], header")) return;
      isDragging = true;
      velocityY = 0;
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
      dragDistance = 0;
      document.body.style.cursor = "grabbing";
    };

    const onMouseUp = () => {
      isDragging = false;
      document.body.style.cursor = "default";
    };

    const onMouseMove = (e: MouseEvent) => {
      currentMouseX = e.clientX;
      currentMouseY = e.clientY;

      if (isDragging) {
        const deltaX = e.clientX - lastMouseX;
        const deltaY = e.clientY - lastMouseY;
        panY += deltaY;
        velocityY = deltaY;
        lastMouseX = e.clientX;
        lastMouseY = e.clientY;
        dragDistance += Math.abs(deltaX) + Math.abs(deltaY);

        if (!isExploreModeRef.current && (dragDistance > 30 || deltaY < -20)) {
          setIsExploreMode(true);
        }
      }
    };

    const onTouchStart = (e: TouchEvent) => {
      if ((e.target as HTMLElement).closest("input, select, button, [role='dialog'], header")) return;
      const touch = e.touches[0];
      if (!touch) return;
      isTouchDragging = true;
      lastTouchY = touch.clientY;
      dragDistance = 0;
      velocityY = 0;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isTouchDragging || activeProjectRef.current) return;
      const touch = e.touches[0];
      if (!touch) return;
      const deltaY = touch.clientY - lastTouchY;
      lastTouchY = touch.clientY;
      dragDistance += Math.abs(deltaY);

      if (!isExploreModeRef.current && (dragDistance > 30 || deltaY < -20)) {
        setIsExploreMode(true);
      }
      if (isExploreModeRef.current) {
        panY += deltaY;
        velocityY = deltaY;
      }
      if (dragDistance > 4) e.preventDefault();
    };

    const onTouchEnd = () => {
      isTouchDragging = false;
    };

    const onWheel = (e: WheelEvent) => {
      if (activeProjectRef.current) return;
      if ((e.target as HTMLElement).closest(".project-list-viewport")) return;

      if (!isExploreModeRef.current && e.deltaY > 15) {
        setIsExploreMode(true);
        return;
      }

      velocityY -= e.deltaY * GRID_SCROLL_FORCE;
      velocityY = Math.max(Math.min(velocityY, GRID_MAX_VELOCITY), -GRID_MAX_VELOCITY);
    };

    itemsRef.current.forEach((item) => {
      if (!item.element) return;
      item.element.addEventListener("click", (e) => {
        e.stopPropagation();
        const totalSpeed = Math.abs(velocityY);
        if (dragDistance < 8 && totalSpeed < 2) {
          if (!isExploreModeRef.current) {
            setIsExploreMode(true);
          }
          setProjectAndUrl(item.project);
        }
      });
    });

    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd);
    window.addEventListener("touchcancel", onTouchEnd);

    let animationFrameId: number;
    let lastFilterKey = "";
    let previousViewportLayout = "";
    let previousExploreMode: boolean | null = null;
    const clusterTargetPositions = new Map<number, { x: number; y: number }>();

    const animate = () => {
      if (!isDragging) {
        velocityY *= GRID_SCROLL_FRICTION;
        panY += velocityY;
      }
      
      const inExplore = isExploreModeRef.current;
      const gridLeftInset = inExplore && window.innerWidth >= 768
        ? 316
        : 0;
      const gridWidth = Math.max(1, window.innerWidth - gridLeftInset);
      const visibleColumns = gridWidth >= 1048 ? 4 : gridWidth >= 768 ? 3 : 2;
      const visibleGridWidth =
        visibleColumns * BASE_ITEM_WIDTH + (visibleColumns - 1) * GAP;
      const visibleGridLeft = gridLeftInset + (gridWidth - visibleGridWidth) / 2;
      const viewportLayout = `${gridLeftInset}:${gridWidth}:${visibleColumns}`;
      const layoutChanged =
        previousViewportLayout === "" ||
        viewportLayout !== previousViewportLayout ||
        previousExploreMode === null ||
        inExplore !== previousExploreMode;
      previousViewportLayout = viewportLayout;
      previousExploreMode = inExplore;
      // Keep one contiguous slice of the canvas aligned to the available grid area.
      const panX = visibleGridLeft - CELL_WIDTH;
      const centerX = gridLeftInset + gridWidth / 2;
      const centerY = window.innerHeight / 2;

      const q = searchQueryRef.current.trim().toLowerCase();
      const top = selectedTopicRef.current;
      const context = selectedContextRef.current;
      const cat = selectedCategoryRef.current;
      const filterActive = q.length > 0 || cat !== "All" || top !== "All" || context !== "All";

      const currentFilterKey = `${q}::${cat}::${top}::${context}`;
      if (currentFilterKey !== lastFilterKey) {
        lastFilterKey = currentFilterKey;
        panY = 0;
        velocityY = 0;
        clusterTargetPositions.clear();

        if (filterActive) {
          const matchingProjects = PROJECTS.filter((p) => isProjectMatching(p));
          const chosenItems: GridItemData[] = [];
          const chosenItemIds = new Set<number>();

          matchingProjects.forEach((proj) => {
            const candidates = itemsRef.current.filter(
              (it) => it.project.slug === proj.slug && !chosenItemIds.has(it.id)
            );
            if (candidates.length === 0) return;

            const expandedCandidates = candidates.filter(
              (item) => item.colSpan > 1 || item.rowSpan > 1
            );
            const preferredCandidates = expandedCandidates.length > 0 ? expandedCandidates : candidates;
            let bestItem = preferredCandidates[0];
            let bestDist = Math.hypot(bestItem.visualX - centerX, bestItem.visualY - centerY);
            for (let i = 1; i < preferredCandidates.length; i++) {
              const d = Math.hypot(
                preferredCandidates[i].visualX - centerX,
                preferredCandidates[i].visualY - centerY
              );
              if (d < bestDist) {
                bestDist = d;
                bestItem = preferredCandidates[i];
              }
            }

            chosenItemIds.add(bestItem.id);
            chosenItems.push(bestItem);
          });

          // Dynamic 2D bin-packer for heterogeneous card sizes (1x1, 2x1, 1x2)
          const availableWidth = gridWidth;
          const maxCols = Math.max(1, Math.floor((availableWidth + GAP) / CELL_WIDTH));
          let clusterCols = Math.min(maxCols, 4);
          if (chosenItems.length <= 2) clusterCols = Math.min(maxCols, 2);

          // 2D occupancy tracker
          const clusterOccupied: boolean[][] = [];
          const isCellOccupied = (r: number, c: number) => clusterOccupied[r]?.[c] ?? false;
          const markCellOccupied = (r: number, c: number) => {
            if (!clusterOccupied[r]) clusterOccupied[r] = [];
            clusterOccupied[r][c] = true;
          };

          const rawPositions: { item: GridItemData; col: number; row: number }[] = [];
          let maxColOccupied = 0;
          let maxRowOccupied = 0;

          chosenItems.forEach((it) => {
            const span = Math.min(it.colSpan, clusterCols);
            const rSpan = it.rowSpan;

            let placed = false;
            let r = 0;

            // Search row by row for a free 2D block [r .. r+rSpan-1][c .. c+span-1]
            while (!placed && r < 50) {
              for (let c = 0; c <= clusterCols - span; c++) {
                let canFit = true;
                for (let dr = 0; dr < rSpan; dr++) {
                  for (let dc = 0; dc < span; dc++) {
                    if (isCellOccupied(r + dr, c + dc)) {
                      canFit = false;
                      break;
                    }
                  }
                  if (!canFit) break;
                }

                if (canFit) {
                  // Reserve all cells spanned by this item
                  for (let dr = 0; dr < rSpan; dr++) {
                    for (let dc = 0; dc < span; dc++) {
                      markCellOccupied(r + dr, c + dc);
                    }
                  }
                  rawPositions.push({ item: it, col: c, row: r });
                  maxColOccupied = Math.max(maxColOccupied, c + span);
                  maxRowOccupied = Math.max(maxRowOccupied, r + rSpan);
                  placed = true;
                  break;
                }
              }
              r++;
            }
          });

          // Center the final bento cluster accurately in the viewport
          const actualCols = Math.max(1, maxColOccupied);
          const actualRows = Math.max(1, maxRowOccupied);
          const totalClusterWidth = actualCols * CELL_WIDTH - GAP;
          const totalClusterHeight = actualRows * CELL_HEIGHT - GAP;
          const clusterStartX = gridLeftInset + (gridWidth - totalClusterWidth) / 2;
          const clusterStartY = Math.max(90, centerY - totalClusterHeight / 2);
          filteredClusterBottomRef.current = clusterStartY + totalClusterHeight;

          rawPositions.forEach(({ item, col, row }) => {
            clusterTargetPositions.set(item.id, {
              x: item.colSpan > clusterCols
                ? gridLeftInset + (gridWidth - item.width) / 2
                : clusterStartX + col * CELL_WIDTH,
              y: clusterStartY + row * CELL_HEIGHT,
            });
          });
        }
      }

      if (inExplore) {
        const contentBottom = filterActive
          ? filteredClusterBottomRef.current
          : gridContentBottomRef.current;
        const minPanY = Math.min(0, window.innerHeight - contentBottom - 48);
        if (panY > 0) {
          panY = 0;
          if (velocityY > 0) velocityY = 0;
        } else if (panY < minPanY) {
          panY = minPanY;
          if (velocityY < 0) velocityY = 0;
        }
      }

      itemsRef.current.forEach((item) => {
        if (!item.element) return;

        const clusterPos = filterActive ? clusterTargetPositions.get(item.id) : undefined;
        const isRepresentative = clusterPos !== undefined;
        const matches = isProjectMatching(item.project);

        let destX = item.baseCenterX + panX - item.width / 2;
        let destY = item.baseCenterY + panY - item.height / 2;

        let targetScale = 1.0;
        let targetOpacity = inExplore ? (matches ? 1.0 : 0.15) : 0.7;
        let targetFilter = inExplore ? (matches ? 0 : 80) : 50;
        let zIndex = 1;

        if (filterActive) {
          if (isRepresentative) {
            destX = clusterPos.x;
            destY = clusterPos.y + panY;

            targetScale = 1.0;
            targetOpacity = 1.0;
            targetFilter = 0;
            zIndex = 10;
            item.element.style.pointerEvents = "auto";

            const itemCenterX = destX + item.width / 2;
            const itemCenterY = destY + item.height / 2;
            const dx = currentMouseX - itemCenterX;
            const dy = currentMouseY - itemCenterY;
            const dist = Math.hypot(dx, dy);

            if (dist < INFLUENCE_RADIUS) {
              const proximity = 1 - dist / INFLUENCE_RADIUS;
              targetScale = 1 + (MAX_SCALE - 1) * Math.pow(proximity, 3);
              zIndex = 20 + Math.round(proximity * 6);
            }
          } else {
            targetScale = 0.75;
            targetOpacity = 0.04;
            targetFilter = 90;
            zIndex = 1;
            item.element.style.pointerEvents = "none";
          }
        } else {
          item.element.style.pointerEvents = "auto";
          if (inExplore && matches) {
            const itemCenterX = destX + item.width / 2;
            const itemCenterY = destY + item.height / 2;
            const dx = currentMouseX - itemCenterX;
            const dy = currentMouseY - itemCenterY;
            const dist = Math.hypot(dx, dy);

            if (dist < INFLUENCE_RADIUS) {
              const proximity = 1 - dist / INFLUENCE_RADIUS;
              targetScale = 1 + (MAX_SCALE - 1) * Math.pow(proximity, 3);
              targetFilter = 0;
              zIndex = 2 + Math.round(proximity * 6);
            }
          } else if (!matches) {
            targetScale = 0.85;
          }
        }

        const gridRightEdge = gridLeftInset + gridWidth;
        const center = destX + item.width / 2;
        const maxScale = Math.max(
          0,
          Math.min(
            1,
            (2 * (center - gridLeftInset)) / item.width,
            (2 * (gridRightEdge - center)) / item.width
          )
        );
        const destinationFits = maxScale > 0;
        if (inExplore && destinationFits) {
          targetScale = Math.min(targetScale, maxScale);
        } else if (inExplore) {
          targetOpacity = 0;
          targetScale = 1;
          item.element.style.pointerEvents = "none";
        }

        const distToDest = Math.hypot(destX - item.visualX, destY - item.visualY);
        if (layoutChanged || (distToDest > 800 && !isRepresentative)) {
          item.visualX = destX;
          item.visualY = destY;
        } else {
          item.visualX += (destX - item.visualX) * LERP_FACTOR;
          item.visualY += (destY - item.visualY) * LERP_FACTOR;
        }

        item.currentScale += (targetScale - item.currentScale) * LERP_FACTOR;
        const visualCenterX = item.visualX + item.width / 2;
        const visualHalfWidth = (item.width * item.currentScale) / 2;
        const visualFits =
          visualCenterX - visualHalfWidth >= gridLeftInset &&
          visualCenterX + visualHalfWidth <= gridRightEdge;
        if (inExplore && (!destinationFits || !visualFits)) {
          item.currentOpacity = 0;
          item.element.style.pointerEvents = "none";
        } else if (layoutChanged) {
          item.currentOpacity = targetOpacity;
        } else {
          item.currentOpacity += (targetOpacity - item.currentOpacity) * LERP_FACTOR;
        }
        item.currentFilter += (targetFilter - item.currentFilter) * LERP_FACTOR;

        item.element.style.transform = `translate3d(${item.visualX - gridLeftInset}px, ${item.visualY}px, 0) scale(${item.currentScale})`;
        item.element.style.zIndex = `${zIndex}`;
        item.element.style.opacity = `${item.currentOpacity}`;
        item.element.style.filter = `grayscale(${item.currentFilter}%)`;

        if (item.currentScale > 1.06 && (inExplore || filterActive) && (matches || isRepresentative)) {
          item.element.style.boxShadow = "0 20px 40px -10px rgba(16, 185, 129, 0.28)";
        } else {
          item.element.style.boxShadow = "none";
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchcancel", onTouchEnd);
    };
  }, [gridLayoutKey, isProjectMatching, setIsExploreMode, setProjectAndUrl]);

  return (
    <div
      ref={containerRef}
      className="portfolio-canvas relative w-screen h-screen overflow-hidden bg-[var(--background)] select-none"
    >
      {/* Background layer: z-0, purely non-interactive */}
      <DescentBackground softened={!isExploreMode} />

      {/* Grid Cards Viewport: z-10 with [isolation:isolate] */}
      <div
        ref={viewportRef}
        className={`absolute inset-0 w-full h-full pointer-events-auto [isolation:isolate] z-10 ${
          isExploreMode ? "project-grid-viewport--filtered" : ""
        } ${
          isExploreMode && cardView === "grid"
            ? "project-grid-reveal"
            : "hidden"
        }`}
      />

      {/* List Viewport */}
      {isExploreMode && cardView === "list" && (
        <div
          ref={listViewportRef}
          className={`project-list-viewport absolute inset-0 z-10 overflow-y-auto px-4 sm:px-8 ${
            isExploreMode ? "md:pl-[320px]" : ""
          } pt-28 pb-12 custom-scrollbar overscroll-contain transition-[filter,opacity] duration-500 ${
            isExploreMode ? "" : "blur-[4px] opacity-70"
          }`}
        >
          <AnimatedProjectList
            projects={listProjects}
            onSelect={setProjectAndUrl}
            scrollRoot={listViewportRef}
          />
        </div>
      )}

      {/* Hero Landing Foreground */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center px-6 py-8 sm:px-12 md:px-16 transition-all duration-500 ease-out z-20 ${
          isExploreMode
            ? "opacity-0 -translate-y-8 pointer-events-none"
            : "opacity-100 translate-y-0 pointer-events-auto"
        }`}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex w-fit flex-col items-stars text-center">
            <h1 className="hero-title text-4xl sm:text-5xl font-normal text-[var(--foreground)] leading-[1.05]">
              Nassim Berrada
            </h1>
            <p className="mt-2 whitespace-nowrap text-base font-mono tracking-[0.04em] text-[var(--muted)]">
              AI Researcher <span className="text-emerald-500">·</span> ML Engineer
            </p>
          </div>
        </div>

        <div className="absolute bottom-6 sm:bottom-12 md:bottom-16 left-0 right-0 flex justify-center">
          <button
            onClick={() => setIsExploreMode(true)}
            className="inline-flex flex-col items-center gap-1.5 whitespace-nowrap group text-[11px] sm:text-xs font-mono text-[var(--muted)] hover:text-emerald-500 transition-colors cursor-pointer"
          >
            <span>Explore Projects</span>
            <ArrowDown className="hero-scroll-arrow h-3.5 w-3.5 text-emerald-500" />
          </button>
        </div>
      </div>

      <LeftFilterMenu />

      {/* Empty State */}
      {hasActiveFilter && matchingCount === 0 && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-30 pointer-events-none px-4">
          <div className="bg-[var(--card)]/90 backdrop-blur-xl border border-[var(--border)] rounded-2xl p-6 text-center max-w-sm shadow-xl pointer-events-auto animate-in fade-in zoom-in-95 duration-200">
            <p className="text-sm font-semibold text-[var(--foreground)] mb-1">
              No matching projects found
            </p>
            <p className="text-xs text-[var(--muted)] mb-4 font-mono">
              Try adjusting your search query or filter tags.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
                setSelectedTopic("All");
                setSelectedContext("All");
              }}
              className="px-4 py-2 rounded-xl text-xs font-mono font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/30 transition-colors cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        </div>
      )}

      {/* Fullscreen Case Study Modal */}
      <ProjectModal
        project={activeProject}
        onClose={() => setProjectAndUrl(null)}
        onNext={() => {
          const p = PROJECTS[(activeProjectIndex + 1) % PROJECTS.length];
          setProjectAndUrl(p, true);
        }}
        onPrev={() => {
          const p = PROJECTS[(activeProjectIndex - 1 + PROJECTS.length) % PROJECTS.length];
          setProjectAndUrl(p, true);
        }}
      />
    </div>
  );
}
