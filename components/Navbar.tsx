"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Moon, Sun, Microscope, Search, Mail, Grid2X2, List } from "lucide-react";
import {
  GithubIcon,
  KaggleIcon,
  HuggingFaceIcon,
  CodePenIcon,
} from "@/components/Icons";
import { useHeader } from "@/lib/headerContext";
import { Tooltip } from "@/components/Tooltip";

export function Navbar() {
  const [isDark, setIsDark] = useState(true);
  const pathname = usePathname();
  const searchInputRef = useRef<HTMLInputElement>(null);

  const {
    isExploreMode,
    setIsExploreMode,
    searchQuery,
    setSearchQuery,
    cardView,
    setCardView,
    setSelectedTopic,
    setSelectedContext,
    setSelectedCategory,
  } = useHeader();

  const searchQueryRef = useRef(searchQuery);
  searchQueryRef.current = searchQuery;
  const isExploreModeRef = useRef(isExploreMode);
  isExploreModeRef.current = isExploreMode;

  const isHome = pathname === "/";
  const showSearchInHeader = isHome && isExploreMode;

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "light") {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
    } else {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };

  // Auto-typing in grid mode: typing anywhere automatically opens and fills the search bar
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if inside an interactive dialog/modal
      if (document.querySelector("[role='dialog']")) return;

      if (e.key === "Escape") {
        setSearchQuery("");
        setSelectedTopic("All");
        setSelectedContext("All");
        setSelectedCategory("All");
        return;
      }

      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT" ||
          target.isContentEditable)
      ) {
        return;
      }

      // Ignore modifier keys
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      if (e.key === "Backspace") {
        if (searchQueryRef.current) {
          e.preventDefault();
          setSearchQuery(searchQueryRef.current.slice(0, -1));
          if (isExploreModeRef.current) searchInputRef.current?.focus();
        }
        return;
      }

      // Printable character of length 1
      if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        if (!isExploreModeRef.current) {
          setIsExploreMode(true);
        }
        setSearchQuery(searchQueryRef.current + e.key);

        setTimeout(() => {
          if (searchInputRef.current) {
            searchInputRef.current.focus();
            const len = searchInputRef.current.value.length;
            searchInputRef.current.setSelectionRange(len, len);
          }
        }, 40);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isExploreMode, setIsExploreMode, setSearchQuery, setSelectedTopic, setSelectedContext, setSelectedCategory]);

  if (pathname.startsWith("/projects/")) return null;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none p-5 sm:p-7 flex items-center justify-between gap-4">
      {/* Top Left Area: Switches between Name/Title and Search Bar */}
      <div className="pointer-events-auto flex items-center gap-3 max-w-[70vw]">
        {!showSearchInHeader && !isHome ? (
          <Link href="/" className="group block">
            <div className="text-base sm:text-lg font-bold tracking-tight text-[var(--foreground)] group-hover:text-emerald-500 transition-colors">
              Nassim Berrada
            </div>
            <div className="text-xs sm:text-sm font-mono text-[var(--muted)] group-hover:text-[var(--foreground)] transition-colors">
              AI Researcher — ML Engineer
            </div>
          </Link>
        ) : showSearchInHeader ? (
          <div className="flex items-center gap-2 animate-in fade-in slide-in-from-left-4 duration-300 navbar-search--mobile">
            {/* Search Input with auto-focus */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)]" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Type anywhere to search a project..."
                className="navbar-search-input w-60 sm:w-68 pl-8 pr-3 py-1.5 rounded-lg bg-[var(--card)]/90 backdrop-blur-xl border border-[var(--border)] text-xs text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>
          </div>
        ) : null}
      </div>

      {/* Bottom Left Actions: Links + Research + Theme Toggle */}
      <div className={`${isHome && !isExploreMode ? "hidden" : ""} portfolio-action-container fixed bottom-5 left-5 sm:bottom-7 sm:left-7 pointer-events-auto flex flex-row sm:flex-row-reverse h-[30px] items-center gap-1 p-0.5 rounded-full bg-[var(--card)]/80 backdrop-blur-md border border-[var(--border)] shadow-sm shrink-0 ${isExploreMode ? "portfolio-controls-reveal" : ""}`}>
        <div className="flex flex-row sm:flex-row-reverse items-center gap-0.5">
          <Tooltip align="left" label="Email Me"><a
            href="mailto:nassim@unfoldinglabs.ai"
            aria-label="Email Me"
            className="inline-flex items-center justify-center p-1.5 rounded-full text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--muted-bg)] transition-colors"
          ><Mail className="w-3.5 h-3.5" /></a></Tooltip>
          <Tooltip align="left" label="Research & Publications"><a
            href="https://www.unfoldinglabs.ai"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Research & Publications"
            className="inline-flex items-center justify-center p-1.5 rounded-full text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--muted-bg)] transition-colors"
          ><Microscope className="w-3.5 h-3.5" /></a></Tooltip>
        </div>

        <span aria-hidden="true" className="h-4 w-px bg-[var(--border)] opacity-40 mx-0.5" />
        <div className="flex flex-row sm:flex-row-reverse items-center gap-0.5">
        <Tooltip align="left" label="GitHub (@nasssimberrada)"><a
          href="https://github.com/nasssimberrada"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub Profile"
          className="inline-flex items-center justify-center p-1.5 rounded-full text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--muted-bg)] transition-colors"
        >
          <GithubIcon className="w-3.5 h-3.5" />
        </a></Tooltip>

        <Tooltip align="left" label="Kaggle (@nassimberrada)"><a
          href="https://kaggle.com/nassimberrada"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Kaggle Profile"
          className="inline-flex items-center justify-center p-1.5 rounded-full text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--muted-bg)] transition-colors"
        >
          <KaggleIcon className="w-3.5 h-3.5" />
        </a></Tooltip>

        <Tooltip align="left" label="Hugging Face (@nassimberrada)"><a
          href="https://huggingface.co/nassimberrada"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Hugging Face Profile"
          className="inline-flex items-center justify-center p-1.5 rounded-full text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--muted-bg)] transition-colors"
        >
          <HuggingFaceIcon className="w-3.5 h-3.5" />
        </a></Tooltip>

        <Tooltip align="left" label="CodePen (@nassimberrada)"><a
          href="https://codepen.io/nassimberrada"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="CodePen Profile"
          className="inline-flex items-center justify-center p-1.5 rounded-full text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--muted-bg)] transition-colors"
        >
          <CodePenIcon className="w-3.5 h-3.5" />
        </a></Tooltip>

        </div>

        <span aria-hidden="true" className="h-4 w-px bg-[var(--border)] opacity-40 mx-0.5" />
        <div className="portfolio-view-theme-group flex flex-row sm:flex-row-reverse items-center gap-0.5">
        {isHome && <>
        <Tooltip align="left" label={cardView === "grid" ? "Switch to list view" : "Switch to grid"}><button
          onClick={() => setCardView(cardView === "grid" ? "list" : "grid")}
          aria-label={cardView === "grid" ? "Switch to list view" : "Switch to infinite grid"}
          className="inline-flex items-center justify-center p-1.5 rounded-full text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--muted-bg)] transition-colors"
        >{cardView === "grid" ? <List className="w-3.5 h-3.5" /> : <Grid2X2 className="w-3.5 h-3.5" />}</button></Tooltip>
        </>}
        <Tooltip align="left" label="Toggle theme"><button
          onClick={toggleTheme}
          onPointerDown={(event) => event.currentTarget.blur()}
          aria-label="Toggle Theme"
          className="inline-flex items-center justify-center p-1.5 rounded-full text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--muted-bg)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border)] focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--card)]"
        >
          {isDark ? (
            <Sun className="w-3.5 h-3.5 text-amber-400" />
          ) : (
            <Moon className="w-3.5 h-3.5 text-slate-600" />
          )}
        </button></Tooltip>
      </div>
      </div>
    </header>
  );
}
