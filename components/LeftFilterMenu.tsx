"use client";

import React, { useState } from "react";
import { useHeader } from "@/lib/headerContext";
import {
  PROJECT_CONTEXTS,
  getSharedCardTags,
} from "@/data/projects";
import {
  Briefcase,
  Tag,
  ChevronDown,
  RotateCcw,
  Layers,
} from "lucide-react";

const PROJECT_CATEGORIES = ["All", "Research", "Engineering", "Data"] as const;

export function LeftFilterMenu() {
  const {
    isExploreMode,
    selectedTopic,
    setSelectedTopic,
    selectedContext,
    setSelectedContext,
    selectedCategory,
    setSelectedCategory,
  } = useHeader();

  // Accordion state: rolling / unrolling filter groups
  const [openGroups, setOpenGroups] = useState({
    context: true,
    category: false,
    tags: false,
  });

  const toggleGroup = (group: "context" | "category" | "tags") => {
    setOpenGroups((prev) => ({ ...prev, [group]: !prev[group] }));
  };

  if (!isExploreMode) return null;

  const isFiltered =
    selectedTopic !== "All" ||
    selectedCategory !== "All" ||
    selectedContext !== "All";

  const handleReset = () => {
    setSelectedTopic("All");
    setSelectedContext("All");
    setSelectedCategory("All");
  };

  return (
    <aside
      id="project-filters"
      aria-label="Filters"
      className="filter-panel hidden md:block fixed top-20 sm:top-22 left-5 sm:left-7 z-40 pointer-events-auto w-60 sm:w-68 max-h-[calc(100dvh-10rem)] overflow-y-auto rounded-lg bg-[var(--card)]/94 backdrop-blur-xl border border-[var(--border)] p-4 shadow-lg space-y-4 animate-in fade-in slide-in-from-left-4 duration-300 select-none custom-scrollbar"
    >
      {/* Project context filters */}
      <div>
        <button
          onClick={() => toggleGroup("context")}
          className="w-full flex items-center justify-between text-[11px] font-mono font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1 py-1 cursor-pointer hover:opacity-80 transition-opacity"
        >
          <span className="flex items-center gap-1.5">
            <Briefcase className="w-3.5 h-3.5" />
            Project Context
          </span>
          <div className="flex items-center gap-1.5">
            {selectedContext !== "All" && (
              <span className="text-[10px] lowercase text-[var(--muted)] font-normal">
                1 active
              </span>
            )}
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform duration-200 ${
                openGroups.context ? "rotate-0" : "-rotate-90"
              }`}
            />
          </div>
        </button>

        {openGroups.context && (
          <div className="space-y-0.5 pt-1 animate-in fade-in duration-150">
            {PROJECT_CONTEXTS.map((context) => (
              <label
                key={context}
                className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg hover:bg-[var(--muted-bg)]/80 cursor-pointer transition-colors text-xs text-[var(--foreground)]"
              >
                <input
                  type="radio"
                  name="project-context"
                  value={context}
                  checked={selectedContext === context}
                  onChange={() => setSelectedContext(context)}
                  className="accent-emerald-500 w-3.5 h-3.5 cursor-pointer"
                />
                <span
                  className={`flex flex-1 items-baseline justify-between gap-2 ${
                    selectedContext === context
                      ? "font-semibold text-emerald-600 dark:text-emerald-400"
                      : ""
                  }`}
                >
                  {context === "All" ? (
                    <span>All Contexts</span>
                  ) : context === "Personal Projects" ? (
                    <span>Personal Projects</span>
                  ) : (
                    <>
                      <span>{context === "Data Scientist Freelance" ? "Data Scientist" : context.split(" @")[0]}</span>
                      <span className="shrink-0 font-mono text-[10px] font-normal text-slate-500 dark:text-slate-400">
                        {context.includes("@") ? `@${context.split("@")[1]}` : "Freelance"}
                      </span>
                    </>
                  )}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      <hr className="border-[var(--border)]" />

      {/* Category filters */}
      <div>
        <button
          onClick={() => toggleGroup("category")}
          className="w-full flex items-center justify-between text-[11px] font-mono font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1 py-1 cursor-pointer hover:opacity-80 transition-opacity"
        >
          <span className="flex items-center gap-1.5"><Layers className="w-3.5 h-3.5" />Category</span>
          <div className="flex items-center gap-1.5">
            {selectedCategory !== "All" && <span className="text-[10px] lowercase text-[var(--muted)] font-normal">1 active</span>}
            <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${openGroups.category ? "rotate-0" : "-rotate-90"}`} />
          </div>
        </button>
        {openGroups.category && (
          <div className="space-y-0.5 pt-1 animate-in fade-in duration-150">
            {PROJECT_CATEGORIES.map((category) => (
              <label key={category} className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg hover:bg-[var(--muted-bg)]/80 cursor-pointer transition-colors text-xs text-[var(--foreground)]">
                <input
                  type="radio"
                  name="project-category"
                  value={category}
                  checked={selectedCategory === category}
                  onChange={() => setSelectedCategory(category)}
                  className="accent-emerald-500 w-3.5 h-3.5 cursor-pointer"
                />
                <span className={selectedCategory === category ? "font-semibold text-emerald-600 dark:text-emerald-400" : ""}>
                  {category === "All" ? "All Categories" : category}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      <hr className="border-[var(--border)]" />

      {/* 2. Tag Filters (Card Tags) Section */}
      <div>
        <button
          onClick={() => toggleGroup("tags")}
          className="w-full flex items-center justify-between text-[11px] font-mono font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1 py-1 cursor-pointer hover:opacity-80 transition-opacity"
        >
          <span className="flex items-center gap-1.5">
            <Tag className="w-3.5 h-3.5" />
            Tags
          </span>
          <div className="flex items-center gap-1.5">
            {selectedTopic !== "All" && (
              <span className="text-[10px] lowercase text-[var(--muted)] font-normal">
                1 active
              </span>
            )}
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform duration-200 ${
                openGroups.tags ? "rotate-0" : "-rotate-90"
              }`}
            />
          </div>
        </button>

        {openGroups.tags && (
          <div className="space-y-0.5 pt-1 animate-in fade-in duration-150">
            <label className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg hover:bg-[var(--muted-bg)]/80 cursor-pointer transition-colors text-xs text-[var(--foreground)]">
              <input
                type="radio"
                name="card-tag"
                value="All"
                checked={selectedTopic === "All"}
                onChange={() => setSelectedTopic("All")}
                className="accent-emerald-500 w-3.5 h-3.5 cursor-pointer"
              />
              <span
                className={
                  selectedTopic === "All"
                    ? "font-semibold text-emerald-600 dark:text-emerald-400"
                    : ""
                }
              >
                All Tags
              </span>
            </label>

            {getSharedCardTags().map((tag) => (
              <label
                key={tag}
                className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg hover:bg-[var(--muted-bg)]/80 cursor-pointer transition-colors text-xs text-[var(--foreground)]"
              >
                <input
                  type="radio"
                  name="card-tag"
                  value={tag}
                  checked={selectedTopic === tag}
                  onChange={() => setSelectedTopic(tag)}
                  className="accent-emerald-500 w-3.5 h-3.5 cursor-pointer"
                />
                <span
                  className={
                    selectedTopic === tag
                      ? "font-semibold text-emerald-600 dark:text-emerald-400"
                      : ""
                  }
                >
                  {tag}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Reset Filter Button */}
      {isFiltered && (
        <button
          onClick={handleReset}
          className="w-full pt-2 flex items-center justify-center gap-1.5 text-[11px] font-mono text-[var(--muted)] hover:text-emerald-500 transition-colors cursor-pointer border-t border-[var(--border)]"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset all filters</span>
        </button>
      )}
    </aside>
  );
}
