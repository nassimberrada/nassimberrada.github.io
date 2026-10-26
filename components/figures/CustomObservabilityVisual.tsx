"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Table as TableIcon,
  BarChart2,
  GitCompare,
  Code2,
  Search,
  Play,
  Pause,
  Clock,
  TrendingUp,
  Sparkles,
  Check,
} from "lucide-react";

interface RowTraceSpan {
  id: string;
  name: string;
  duration: string;
  isModel?: boolean;
  children?: { id: string; name: string; duration: string; isModel?: boolean }[];
}

interface TableRowData {
  id: number;
  email: string;
  studentName: string;
  timeOfDay: string;
  marks: number;
  model: string;
  latencyMs: number;
  tokensIn: number;
  tokensOut: number;
  status: string;
  question: string;
  rationale: string[];
  spans: RowTraceSpan[];
  codeSnippet: string;
}

const SAMPLE_ROWS: TableRowData[] = [
  {
    id: 8,
    email: "tiana.b@unify.ai",
    studentName: "Tiana Barker",
    timeOfDay: "18:25:10",
    marks: 5.0,
    model: "claude-3.5-sonnet",
    latencyMs: 940,
    tokensIn: 1420,
    tokensOut: 480,
    status: "200 OK",
    question: "17. Sequence of boxes: | 5 | 7 | 12 | 19 | 31 |. Find 2a + 3b for the sequence.",
    rationale: [
      "1. (a) Part A recurrence verified: 5 + 7 = 12 (1.0 mark)",
      "2. (b) Part B sequence logic verified: 7 + 12 = 19 (2.0 marks)",
      "3. (c) Expressed 2a + 3b correctly with full working (1.0 mark)",
      "4. (d) Solved a = 6, b = 15 accurately without slip (1.0 mark)",
    ],
    spans: [
      {
        id: "call_agent",
        name: "call_agent",
        duration: "940ms",
        children: [
          { id: "tokenize", name: "tokenize_submission", duration: "14ms" },
          { id: "claude_model", name: "claude-3.5-sonnet@anthropic", duration: "870ms", isModel: true },
          { id: "parse_rubric", name: "parse_markscheme_rubric", duration: "56ms" },
        ],
      },
    ],
    codeSnippet: `@unify.traced
def evaluate_gcse_math(student_id, submission):
    prompt = build_markscheme_prompt(submission)
    # Dispatched to claude-3.5-sonnet endpoint
    return unify.chat(model="claude-3.5-sonnet", prompt=prompt)`,
  },
  {
    id: 9,
    email: "tabitha.l@unify.ai",
    studentName: "Tabitha Lyons",
    timeOfDay: "18:02:17",
    marks: 4.0,
    model: "gpt-4o",
    latencyMs: 1420,
    tokensIn: 2180,
    tokensOut: 610,
    status: "200 OK",
    question: "17. Sequence of boxes: | 5 | 7 | 12 | 19 | 31 |. Find 2a + 3b for the sequence.",
    rationale: [
      "1. (a) Part A completely correct (1.0 mark)",
      "2. (b) Part B recurrence verified (2.0 marks)",
      "3. (c) Algebraic slip: wrote a + 3b instead of 2a + 3b (0 marks awarded)",
      "4. (d) Arithmetic recovery correct (1.0 mark)",
    ],
    spans: [
      {
        id: "call_agent",
        name: "call_agent",
        duration: "1.42s",
        children: [
          { id: "extract_mark", name: "extract_mark_type", duration: "2.0ms" },
          { id: "gpt4o_model", name: "gpt-4o@openai", duration: "1.36s", isModel: true },
          { id: "validate_marks", name: "validate_eval_output", duration: "58ms" },
        ],
      },
    ],
    codeSnippet: `@unify.traced
def evaluate_gcse_math(student_id, submission):
    subq_agents = {k: agent.copy() for k in markscheme}
    # Dispatched to gpt-4o endpoint
    return unify.chat(model="gpt-4o", messages=submission)`,
  },
  {
    id: 10,
    email: "nathan.w@unify.ai",
    studentName: "Nathan Whitfield",
    timeOfDay: "18:01:47",
    marks: 5.0,
    model: "o3-mini@openai",
    latencyMs: 1180,
    tokensIn: 2456,
    tokensOut: 814,
    status: "200 OK",
    question: "17. Sequence of boxes: | 5 | 7 | 12 | 19 | 31 |. Find 2a + 3b for the sequence.",
    rationale: [
      "1. (a) Part A completely correct (1.0 mark)",
      "2. (b) Part B completely correct (2.0 marks)",
      "3. (c) Student wrote a + 3b; award partial 1 mark for substitution attempt (1.0 mark)",
      "4. (d) Set up 2a + 3b = 57, a = 6, b = 15; full marks (1.0 mark)",
    ],
    spans: [
      {
        id: "call_agent",
        name: "call_agent",
        duration: "1.18s",
        children: [
          { id: "parse_ms", name: "parse_marks_from_markscheme", duration: "160ms" },
          { id: "o3_model", name: "o3-mini@openai", duration: "1.02s", isModel: true },
          { id: "subq", name: "call_subq_agent_a:0", duration: "120ms" },
        ],
      },
    ],
    codeSnippet: `@unify.traced
def call_agent(example_id, subq_system_msg, markscheme):
    subq_agents = {k: agent.copy() for k in markscheme.keys()}
    # Dispatched to o3-mini reasoning model
    return agent.set_response_format(rf)`,
  },
  {
    id: 11,
    email: "queenie.h@unify.ai",
    studentName: "Queenie Harding",
    timeOfDay: "17:58:30",
    marks: 4.75,
    model: "gemini-1.5-pro",
    latencyMs: 820,
    tokensIn: 1290,
    tokensOut: 390,
    status: "200 OK",
    question: "17. Sequence of boxes: | 5 | 7 | 12 | 19 | 31 |. Find 2a + 3b for the sequence.",
    rationale: [
      "1. (a) Part A verified correctly (1.0 mark)",
      "2. (b) Recurrence verified (2.0 marks)",
      "3. (c) Correct formula 2a + 3b with minor notation omission (0.75 mark)",
      "4. (d) Final computation verified: 37 obtained (1.0 mark)",
    ],
    spans: [
      {
        id: "call_agent",
        name: "call_agent",
        duration: "820ms",
        children: [
          { id: "tokenize", name: "tokenize_prompt", duration: "10ms" },
          { id: "gemini_model", name: "gemini-1.5-pro@google", duration: "770ms", isModel: true },
          { id: "format_grades", name: "format_grades", duration: "40ms" },
        ],
      },
    ],
    codeSnippet: `@unify.traced
def evaluate_gcse_math(student_id, submission):
    # Dispatched to gemini-1.5-pro endpoint
    return unify.chat(model="gemini-1.5-pro", prompt=submission)`,
  },
  {
    id: 12,
    email: "finley.h@unify.ai",
    studentName: "Finley Hall",
    timeOfDay: "17:54:00",
    marks: 4.5,
    model: "o3-mini@openai",
    latencyMs: 1260,
    tokensIn: 1940,
    tokensOut: 560,
    status: "200 OK",
    question: "17. Sequence of boxes: | 5 | 7 | 12 | 19 | 31 |. Find 2a + 3b for the sequence.",
    rationale: [
      "1. (a) Part A completely correct (1.0 mark)",
      "2. (b) Part B recurrence verified (2.0 marks)",
      "3. (c) Algebraic slip on 3rd box calculation (0.5 mark)",
      "4. (d) Recovery step sound (1.0 mark)",
    ],
    spans: [
      {
        id: "call_agent",
        name: "call_agent",
        duration: "1.26s",
        children: [
          { id: "parse_rubric", name: "parse_rubric", duration: "12ms" },
          { id: "o3_model", name: "o3-mini@openai", duration: "1.20s", isModel: true },
          { id: "postprocess", name: "postprocess_marks", duration: "48ms" },
        ],
      },
    ],
    codeSnippet: `@unify.traced
def evaluate_gcse_math(student_id, submission):
    # Dispatched to o3-mini endpoint
    return unify.chat(model="o3-mini", prompt=submission)`,
  },
];

export function CustomObservabilityVisual() {
  // Selected rows for Diff: exactly 2 rows
  const [selectedIds, setSelectedIds] = useState<number[]>([9, 10]);
  // Currently inspected row for Trace Viewer: 1 row
  const [inspectedId, setInspectedId] = useState<number>(10);
  const [activePlotTab, setActivePlotTab] = useState<"line" | "histogram" | "scatter">("line");
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(false);
  const [searchFilter, setSearchFilter] = useState<string>("");

  // Auto-play demo cycle
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setSelectedIds((prev) => {
        if (prev.includes(9) && prev.includes(10)) {
          setInspectedId(8);
          return [8, 10];
        } else if (prev.includes(8) && prev.includes(10)) {
          setInspectedId(11);
          return [11, 10];
        } else {
          setInspectedId(10);
          return [9, 10];
        }
      });
    }, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  // Handle row click: toggles selection and updates trace inspection
  const handleRowClick = (clickedId: number) => {
    setIsAutoPlaying(false);
    setInspectedId(clickedId);

    setSelectedIds((prev) => {
      if (prev.includes(clickedId)) {
        if (prev.length <= 1) return prev;
        return prev.filter((id) => id !== clickedId);
      } else {
        if (prev.length >= 2) {
          return [prev[1], clickedId];
        } else {
          return [...prev, clickedId];
        }
      }
    });
  };

  // Resolve the two rows for diffing
  const rowA = useMemo(() => {
    const id = selectedIds[0] ?? 9;
    return SAMPLE_ROWS.find((r) => r.id === id) || SAMPLE_ROWS[1];
  }, [selectedIds]);

  const rowB = useMemo(() => {
    const id = selectedIds[1] ?? (selectedIds[0] === 10 ? 9 : 10);
    return SAMPLE_ROWS.find((r) => r.id === id) || SAMPLE_ROWS[2];
  }, [selectedIds]);

  // Resolve the currently inspected row for the trace viewer
  const inspectedRow = useMemo(() => {
    return SAMPLE_ROWS.find((r) => r.id === inspectedId) || SAMPLE_ROWS[2];
  }, [inspectedId]);

  // Filtered rows for table search
  const filteredRows = useMemo(() => {
    if (!searchFilter.trim()) return SAMPLE_ROWS;
    const q = searchFilter.toLowerCase();
    return SAMPLE_ROWS.filter(
      (r) =>
        r.studentName.toLowerCase().includes(q) ||
        r.email.toLowerCase().includes(q) ||
        r.model.toLowerCase().includes(q)
    );
  }, [searchFilter]);

  return (
    <div className="w-full rounded-[14px] border border-[var(--border)] bg-[var(--card)] shadow-xl overflow-hidden font-sans select-none text-[var(--foreground)] transition-colors">
      {/* 1. APP HEADER */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-[var(--border)] bg-[var(--muted-bg)]/80 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono font-medium text-emerald-600 dark:text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-semibold">WorkingAssistant</span>
          </div>

          <div className="hidden sm:flex items-center gap-1 text-xs font-mono text-[var(--muted)]">
            <span className="px-2 py-0.5 rounded bg-[var(--card)] border border-[var(--border)] text-[var(--foreground)] shadow-2xs">
              Usage &amp; Traces
            </span>
            <span className="opacity-40">/</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Tiled Canvas</span>
          </div>
        </div>

        {/* Status & Controls */}
        <div className="flex items-center gap-3 text-xs font-mono">
          <div className="hidden md:flex items-center gap-2 text-[var(--muted)] text-[11px]">
            <span>Ingestion: <strong className="text-emerald-600 dark:text-emerald-400 font-bold">25k req/s</strong></span>
            <span>·</span>
            <span>P99: <strong className="text-cyan-600 dark:text-cyan-400 font-bold">45ms</strong></span>
          </div>

          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded border text-xs transition-colors cursor-pointer ${
              isAutoPlaying
                ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-700 dark:text-emerald-300 font-medium"
                : "bg-[var(--card)] border-[var(--border)] text-[var(--muted)] hover:text-[var(--foreground)] shadow-2xs"
            }`}
          >
            {isAutoPlaying ? (
              <Pause className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
            ) : (
              <Play className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
            )}
            <span>{isAutoPlaying ? "Auto Demo" : "Interactive Mode"}</span>
          </button>
        </div>
      </div>

      {/* 2. THE 4-QUADRANT GRID */}
      <div className="p-3 grid grid-cols-1 lg:grid-cols-2 gap-3 bg-[var(--background)]/60">
        
        {/* ========================================================================= */}
        {/* QUADRANT 1: DATA TABLE                                                    */}
        {/* ========================================================================= */}
        <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] flex flex-col overflow-hidden shadow-xs h-[320px]">
          {/* Header */}
          <div className="flex items-center justify-between px-3.5 py-2 border-b border-[var(--border)] bg-[var(--muted-bg)]/60">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/25 flex items-center gap-1">
                <TableIcon className="w-3 h-3" />
                Table
              </span>
              <span className="text-xs font-mono text-[var(--muted)]">Telemetry Ingestion</span>
            </div>

            <div className="text-[10px] font-mono text-[var(--muted)] flex items-center gap-1">
              <span>Showing</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">{filteredRows.length}</span>
              <span>rows</span>
            </div>
          </div>

          {/* Quick search input */}
          <div className="px-3 py-1.5 border-b border-[var(--border)]/60 bg-[var(--muted-bg)]/30">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[var(--card)] border border-[var(--border)] text-[var(--muted)] text-xs shadow-2xs">
              <Search className="w-3.5 h-3.5 opacity-60" />
              <input
                type="text"
                placeholder="Filter by student, email, model..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="bg-transparent border-none outline-none text-[var(--foreground)] placeholder-[var(--muted)] text-[11px] w-full font-mono"
              />
            </div>
          </div>

          {/* Table */}
          <div className="flex-1 overflow-x-auto overflow-y-auto font-mono text-xs">
            <table className="w-full text-left border-collapse min-w-[500px]">
              <thead>
                <tr className="border-b border-[var(--border)] text-[var(--muted)] text-[10px] uppercase tracking-wider bg-[var(--muted-bg)]/40">
                  <th className="py-2 px-2.5 w-12 text-center">Select</th>
                  <th className="py-2 px-2.5">Student / Email</th>
                  <th className="py-2 px-2.5">Model</th>
                  <th className="py-2 px-2.5">Latency</th>
                  <th className="py-2 px-2.5 text-right">Marks</th>
                </tr>
              </thead>
              <tbody>
                {filteredRows.map((row) => {
                  const isSelected = selectedIds.includes(row.id);
                  const isInspected = inspectedId === row.id;

                  return (
                    <tr
                      key={row.id}
                      onClick={() => handleRowClick(row.id)}
                      className={`cursor-pointer transition-colors border-b border-[var(--border)]/40 ${
                        isInspected
                          ? "bg-emerald-500/10 dark:bg-emerald-500/20 text-[var(--foreground)] border-l-2 border-l-emerald-500 font-medium"
                          : isSelected
                          ? "bg-cyan-500/10 dark:bg-cyan-500/15 text-[var(--foreground)] border-l-2 border-l-cyan-500 font-medium"
                          : "hover:bg-[var(--card-hover)] text-[var(--foreground)]"
                      }`}
                    >
                      <td className="py-2 px-2.5 text-center">
                        <div
                          className={`w-3.5 h-3.5 mx-auto rounded flex items-center justify-center transition-all ${
                            isSelected
                              ? isInspected
                                ? "bg-emerald-500 text-white font-bold"
                                : "bg-cyan-500 text-white font-bold"
                              : "border border-[var(--border)]"
                          }`}
                        >
                          {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                        </div>
                      </td>
                      <td className="py-2 px-2.5 whitespace-nowrap">
                        <div className="font-semibold text-[var(--foreground)] text-xs">{row.studentName}</div>
                        <div className="text-[10px] text-[var(--muted)]">{row.email}</div>
                      </td>
                      <td className="py-2 px-2.5 whitespace-nowrap">
                        <span className="px-1.5 py-0.5 rounded text-[10px] bg-[var(--muted-bg)] border border-[var(--border)] text-[var(--muted)] font-mono">
                          {row.model}
                        </span>
                      </td>
                      <td className="py-2 px-2.5 whitespace-nowrap text-[var(--muted)] text-[11px]">
                        {row.latencyMs}ms
                      </td>
                      <td className="py-2 px-2.5 text-right whitespace-nowrap">
                        <span
                          className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                            row.marks >= 5.0
                              ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30"
                              : "bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30"
                          }`}
                        >
                          {row.marks.toFixed(2)}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Table Footer Instructions */}
          <div className="px-3.5 py-1.5 border-t border-[var(--border)] bg-[var(--muted-bg)]/50 flex items-center justify-between text-[10px] font-mono text-[var(--muted)]">
            <span>
              Diff Selection: <strong className="text-emerald-600 dark:text-emerald-400 font-bold">Rows {selectedIds.join(" & ")}</strong>
            </span>
            <span className="hidden sm:inline">Click any row to inspect &amp; compare</span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* QUADRANT 2: DYNAMIC PLOTS                                                 */}
        {/* ========================================================================= */}
        <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] flex flex-col overflow-hidden shadow-xs h-[320px]">
          {/* Header with Tabs */}
          <div className="flex items-center justify-between px-3.5 py-2 border-b border-[var(--border)] bg-[var(--muted-bg)]/60">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border border-cyan-500/25 flex items-center gap-1">
                <BarChart2 className="w-3 h-3" />
                Plots
              </span>
              <div className="flex items-center gap-1 rounded bg-[var(--card)] p-0.5 border border-[var(--border)] text-[10px] font-mono">
                <button
                  onClick={() => setActivePlotTab("line")}
                  className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
                    activePlotTab === "line"
                      ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 font-bold border border-emerald-500/30"
                      : "text-[var(--muted)] hover:text-[var(--foreground)]"
                  }`}
                >
                  Speed / Latency
                </button>
                <button
                  onClick={() => setActivePlotTab("histogram")}
                  className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
                    activePlotTab === "histogram"
                      ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 font-bold border border-emerald-500/30"
                      : "text-[var(--muted)] hover:text-[var(--foreground)]"
                  }`}
                >
                  Score Dist
                </button>
                <button
                  onClick={() => setActivePlotTab("scatter")}
                  className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
                    activePlotTab === "scatter"
                      ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 font-bold border border-emerald-500/30"
                      : "text-[var(--muted)] hover:text-[var(--foreground)]"
                  }`}
                >
                  Evals Regression
                </button>
              </div>
            </div>

            <div className="text-[10px] font-mono text-[var(--muted)]">
              Aggregated Metrics
            </div>
          </div>

          {/* Plot Canvas */}
          <div className="flex-1 p-3 flex flex-col justify-between bg-[var(--card)]">
            {activePlotTab === "line" && (
              <div className="h-full flex flex-col justify-between">
                <div className="flex items-center justify-between text-xs font-mono text-[var(--muted)]">
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5" />
                    Throughput vs Request Sequence
                  </span>
                  <div className="flex items-center gap-3 text-[10px]">
                    <span className="text-emerald-600 dark:text-emerald-400 font-medium">● o3-mini</span>
                    <span className="text-amber-600 dark:text-amber-400 font-medium">● gpt-4o</span>
                    <span className="text-cyan-600 dark:text-cyan-400 font-medium">● claude-3.5</span>
                  </div>
                </div>

                <div className="relative flex-1 w-full mt-2">
                  <svg className="w-full h-full" viewBox="0 0 460 170" preserveAspectRatio="none">
                    <line x1="20" y1="20" x2="450" y2="20" stroke="var(--border)" strokeDasharray="3 3" />
                    <line x1="20" y1="65" x2="450" y2="65" stroke="var(--border)" strokeDasharray="3 3" />
                    <line x1="20" y1="110" x2="450" y2="110" stroke="var(--border)" strokeDasharray="3 3" />
                    <line x1="20" y1="155" x2="450" y2="155" stroke="var(--border)" strokeWidth="1.2" />

                    {/* Curves */}
                    <path
                      d="M 25 70 Q 55 25 85 55 T 145 35 T 205 65 T 265 25 T 325 55 T 385 30 T 445 45"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="2.2"
                    />
                    <path
                      d="M 25 105 Q 60 75 95 115 T 165 95 T 235 125 T 305 85 T 375 110 T 445 90"
                      fill="none"
                      stroke="#f59e0b"
                      strokeWidth="1.8"
                    />
                    <path
                      d="M 25 140 Q 65 120 105 150 T 185 130 T 265 145 T 345 120 T 425 135 T 445 125"
                      fill="none"
                      stroke="#06b6d4"
                      strokeWidth="1.6"
                    />

                    {/* Active Selected Markers */}
                    <circle cx="265" cy="25" r="5" fill="#10b981" stroke="var(--card)" strokeWidth="1.5" />
                    <text x="265" y="15" fontSize="8" fill="var(--foreground)" textAnchor="middle" fontFamily="monospace" fontWeight="bold">
                      Row {rowB.id} ({rowB.latencyMs}ms)
                    </text>

                    <circle cx="235" cy="125" r="5" fill="#f59e0b" stroke="var(--card)" strokeWidth="1.5" />
                    <text x="235" y="142" fontSize="8" fill="var(--foreground)" textAnchor="middle" fontFamily="monospace" fontWeight="bold">
                      Row {rowA.id} ({rowA.latencyMs}ms)
                    </text>
                  </svg>
                </div>
              </div>
            )}

            {activePlotTab === "histogram" && (
              <div className="h-full flex flex-col justify-between">
                <div className="flex items-center justify-between text-xs font-mono text-[var(--muted)]">
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                    Score &amp; Confidence Distribution
                  </span>
                  <span className="text-[10px]">1,360 Evaluated Samples</span>
                </div>

                <div className="relative flex-1 w-full mt-2 flex items-end gap-1.5 px-3 pb-2 pt-4">
                  {[28, 42, 36, 55, 68, 85, 74, 92, 115, 140, 158, 120, 95, 70, 48, 30].map(
                    (val, idx) => (
                      <div key={idx} className="flex-1 flex flex-col items-center">
                        <div
                          style={{ height: `${(val / 160) * 125}px` }}
                          className={`w-full rounded-t transition-all ${
                            idx === 10
                              ? "bg-emerald-500 shadow-sm"
                              : idx === 7
                              ? "bg-cyan-500"
                              : "bg-emerald-500/40"
                          }`}
                        />
                      </div>
                    )
                  )}
                </div>
                <div className="flex justify-between text-[9px] font-mono text-[var(--muted)] px-3 border-t border-[var(--border)] pt-1">
                  <span>0.0 (Irrelevant)</span>
                  <span>2.5 (Passing)</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">5.0 (Optimal Parity)</span>
                </div>
              </div>
            )}

            {activePlotTab === "scatter" && (
              <div className="h-full flex flex-col justify-between">
                <div className="flex items-center justify-between text-xs font-mono text-[var(--muted)]">
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                    Evaluated Accuracy vs Latency
                  </span>
                  <div className="flex items-center gap-2 text-[10px]">
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">r = 0.69</span>
                    <span className="text-cyan-600 dark:text-cyan-400 font-bold">r = 0.51</span>
                  </div>
                </div>

                <div className="relative flex-1 w-full mt-2">
                  <svg className="w-full h-full" viewBox="0 0 460 170" preserveAspectRatio="none">
                    <line x1="30" y1="150" x2="430" y2="30" stroke="#10b981" strokeWidth="2" strokeDasharray="4 2" />
                    <line x1="30" y1="155" x2="430" y2="70" stroke="#06b6d4" strokeWidth="1.5" strokeDasharray="3 2" />

                    {[
                      [45, 138, "#10b981"], [70, 120, "#10b981"], [95, 110, "#06b6d4"], [120, 115, "#f59e0b"],
                      [140, 95, "#10b981"], [165, 85, "#10b981"], [190, 80, "#06b6d4"], [215, 95, "#f59e0b"],
                      [240, 70, "#10b981"], [270, 60, "#10b981"], [350, 45, "#10b981"], [380, 40, "#10b981"]
                    ].map(([cx, cy, col], i) => (
                      <circle key={i} cx={cx} cy={cy} r="3" fill={col as string} opacity="0.8" />
                    ))}

                    <circle cx="350" cy="45" r="5" fill="#10b981" stroke="var(--card)" strokeWidth="1.5" />
                    <text x="350" y="34" fontSize="8" fill="var(--foreground)" textAnchor="middle" fontFamily="monospace" fontWeight="bold">
                      Row {rowB.id}
                    </text>
                  </svg>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between text-[10px] font-mono text-[var(--muted)] pt-1 border-t border-[var(--border)]">
              <span>Real-time metrics rendered on browser canvas</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-medium">Zero Server Compute</span>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* QUADRANT 3: DYNAMIC CLIENT-SIDE DIFF VIEWER                               */}
        {/* ========================================================================= */}
        <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] flex flex-col overflow-hidden shadow-xs h-[330px]">
          {/* Header */}
          <div className="flex items-center justify-between px-3.5 py-2 border-b border-[var(--border)] bg-[var(--muted-bg)]/60">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/25 flex items-center gap-1">
                <GitCompare className="w-3 h-3" />
                Diff View
              </span>
              <span className="text-xs font-mono text-[var(--foreground)]">
                Row <strong>{rowA.id}</strong> ({rowA.studentName}) vs Row <strong>{rowB.id}</strong> ({rowB.studentName})
              </span>
            </div>

            <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-semibold">
              ⚡ Computed Client-Side
            </span>
          </div>

          {/* Diff Grid Panels */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[var(--border)] overflow-y-auto bg-[var(--card)] text-xs font-mono">
            {/* Panel 1: Problem Spec */}
            <div className="p-3 flex flex-col gap-2 overflow-hidden">
              <div className="flex items-center justify-between text-[10px] text-[var(--muted)] font-semibold border-b border-[var(--border)] pb-1">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">Entries &gt; question</span>
                <span className="text-[9px] text-[var(--muted)]">Spec</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[var(--muted-bg)]/60 border border-[var(--border)] text-[10px] text-[var(--foreground)] space-y-1.5 leading-relaxed overflow-y-auto">
                <p className="font-semibold text-[var(--foreground)]">
                  17. Box recurrence sequence:
                </p>
                <div className="flex items-center gap-1 text-center py-1 font-bold text-emerald-700 dark:text-emerald-300">
                  <span className="px-1.5 py-0.5 bg-emerald-500/15 border border-emerald-500/25 rounded">5</span>
                  <span className="px-1.5 py-0.5 bg-emerald-500/15 border border-emerald-500/25 rounded">7</span>
                  <span className="px-1.5 py-0.5 bg-[var(--card)] border border-[var(--border)] text-[var(--foreground)] rounded">12</span>
                  <span className="px-1.5 py-0.5 bg-[var(--card)] border border-[var(--border)] text-[var(--foreground)] rounded">19</span>
                  <span className="px-1.5 py-0.5 bg-[var(--card)] border border-[var(--border)] text-[var(--foreground)] rounded">31</span>
                </div>
                <p className="text-[9px] text-[var(--muted)]">
                  Find expressions for boxes 3, 4, and 5 and calculate 2a + 3b.
                </p>
              </div>
            </div>

            {/* Panel 2: Live Text / Token Rationale Diff */}
            <div className="p-3 flex flex-col gap-2 overflow-hidden">
              <div className="flex items-center justify-between text-[10px] text-[var(--muted)] font-semibold border-b border-[var(--border)] pb-1">
                <span className="text-amber-600 dark:text-amber-400 font-bold">
                  Entries &gt; rationale [{rowA.id}, {rowB.id}]
                </span>
                <span className="text-[9px] bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 px-1.5 py-0.2 rounded font-bold border border-emerald-500/25">
                  Token Diff
                </span>
              </div>
              <div className="p-2 rounded-lg bg-[var(--muted-bg)]/40 border border-[var(--border)] text-[10px] leading-relaxed overflow-y-auto space-y-1.5">
                <div className="p-1.5 rounded-md bg-rose-500/10 dark:bg-rose-500/15 border border-rose-500/25 text-rose-800 dark:text-rose-200">
                  <div className="font-bold text-rose-600 dark:text-rose-400 text-[10px] flex items-center justify-between">
                    <span>- Row {rowA.id} ({rowA.model})</span>
                    <span>{rowA.marks.toFixed(2)} pts</span>
                  </div>
                  <p className="mt-1 text-[9px] leading-tight opacity-90">
                    {rowA.rationale[2]}
                  </p>
                </div>

                <div className="p-1.5 rounded-md bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-500/25 text-emerald-800 dark:text-emerald-200">
                  <div className="font-bold text-emerald-600 dark:text-emerald-400 text-[10px] flex items-center justify-between">
                    <span>+ Row {rowB.id} ({rowB.model})</span>
                    <span>{rowB.marks.toFixed(2)} pts</span>
                  </div>
                  <p className="mt-1 text-[9px] leading-tight opacity-90">
                    {rowB.rationale[2]}
                  </p>
                </div>
              </div>
            </div>

            {/* Panel 3: Client-side Math Delta */}
            <div className="p-3 flex flex-col gap-2 overflow-hidden">
              <div className="flex items-center justify-between text-[10px] text-[var(--muted)] font-semibold border-b border-[var(--border)] pb-1">
                <span className="text-cyan-600 dark:text-cyan-400 font-bold">Entries &gt; delta_calc</span>
                <span className="text-[9px] text-[var(--muted)]">Browser Delta</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[var(--muted-bg)]/60 border border-[var(--border)] text-[10px] space-y-2 overflow-y-auto">
                <div className="text-center p-2 rounded-md bg-[var(--card)] border border-[var(--border)] shadow-2xs">
                  <span className="text-[9px] text-[var(--muted)] block mb-1">Score Difference:</span>
                  <div className="flex items-center justify-center gap-1.5 font-bold font-mono">
                    <span className="px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/25">
                      Row {rowB.id} [{rowB.marks.toFixed(1)}]
                    </span>
                    <span className="text-[var(--muted)]">-</span>
                    <span className="px-1.5 py-0.5 rounded bg-rose-500/15 text-rose-700 dark:text-rose-300 border border-rose-500/25">
                      Row {rowA.id} [{rowA.marks.toFixed(1)}]
                    </span>
                    <span className="text-[var(--muted)]">=</span>
                    <span className="px-1.5 py-0.5 rounded bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 border border-cyan-500/25">
                      {(rowB.marks - rowA.marks >= 0 ? "+" : "") + (rowB.marks - rowA.marks).toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="space-y-1 text-[9px] text-[var(--muted)] pt-1">
                  <div className="flex justify-between">
                    <span>Latency Delta:</span>
                    <span className="text-[var(--foreground)] font-bold">
                      {rowB.latencyMs - rowA.latencyMs > 0 ? "+" : ""}
                      {rowB.latencyMs - rowA.latencyMs}ms
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Token Output Delta:</span>
                    <span className="text-[var(--foreground)] font-bold">
                      {rowB.tokensOut - rowA.tokensOut > 0 ? "+" : ""}
                      {rowB.tokensOut - rowA.tokensOut} tok
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* QUADRANT 4: DETAILED ROW TRACE VIEWER                                     */}
        {/* ========================================================================= */}
        <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] flex flex-col overflow-hidden shadow-xs h-[330px]">
          {/* Header */}
          <div className="flex items-center justify-between px-3.5 py-2 border-b border-[var(--border)] bg-[var(--muted-bg)]/60">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-purple-500/10 text-purple-700 dark:text-purple-300 border border-purple-500/25 flex items-center gap-1">
                <Code2 className="w-3 h-3" />
                Trace View
              </span>
              <span className="text-xs font-mono text-[var(--foreground)]">
                Row <strong>{inspectedRow.id}</strong>: {inspectedRow.studentName}
              </span>
            </div>

            <div className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-semibold">
              <Clock className="w-3 h-3" />
              <span>{inspectedRow.latencyMs}ms total</span>
            </div>
          </div>

          {/* Span Tree & Code Inspector */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[var(--border)] overflow-y-auto bg-[var(--card)] text-xs font-mono">
            {/* Left: Execution Span Tree */}
            <div className="p-3 overflow-y-auto space-y-1.5">
              <div className="text-[10px] text-[var(--muted)] font-bold uppercase tracking-wider flex items-center justify-between mb-2">
                <span>Call Hierarchy</span>
                <span className="text-[9px] text-emerald-600 dark:text-emerald-400 font-semibold">@unify.traced</span>
              </div>

              {inspectedRow.spans.map((span) => (
                <div key={span.id} className="space-y-1">
                  <div className="p-1.5 rounded-md bg-[var(--muted-bg)]/70 border border-[var(--border)] flex items-center justify-between text-[11px]">
                    <div className="flex items-center gap-1 font-semibold text-[var(--foreground)]">
                      <span className="text-[var(--muted)]">▼</span>
                      <span>{span.name}</span>
                    </div>
                    <span className="text-[var(--muted)] text-[10px]">{span.duration}</span>
                  </div>

                  {span.children && (
                    <div className="pl-3.5 space-y-1 border-l border-[var(--border)] ml-2">
                      {span.children.map((child) => (
                        <div
                          key={child.id}
                          className={`p-1.5 rounded-md flex items-center justify-between text-[10px] ${
                            child.isModel
                              ? "bg-emerald-500/15 dark:bg-emerald-500/25 border border-emerald-500/35 text-emerald-800 dark:text-emerald-200 shadow-2xs font-bold"
                              : "text-[var(--muted)] hover:bg-[var(--card-hover)]"
                          }`}
                        >
                          <div className="flex items-center gap-1.5">
                            {child.isModel && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />}
                            <span>{child.name}</span>
                          </div>
                          <span>{child.duration}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Right: Code & Metadata */}
            <div className="p-3 overflow-y-auto space-y-2 flex flex-col justify-between">
              <div>
                <div className="text-[10px] text-[var(--muted)] font-bold mb-1.5 flex items-center justify-between border-b border-[var(--border)] pb-1">
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Function Binding</span>
                  <span className="text-[var(--muted)]">{inspectedRow.model}</span>
                </div>

                <div className="p-2.5 rounded-lg bg-[var(--muted-bg)] border border-[var(--border)] font-mono text-[9px] leading-relaxed text-[var(--foreground)] overflow-x-auto whitespace-pre">
                  {inspectedRow.codeSnippet}
                </div>
              </div>

              {/* Metadata Badges */}
              <div className="grid grid-cols-2 gap-1.5 text-[9px] font-mono">
                <div className="p-1.5 rounded-md bg-[var(--muted-bg)]/80 border border-[var(--border)]">
                  <span className="text-[var(--muted)] block text-[8px] uppercase">Endpoint:</span>
                  <span className="text-emerald-700 dark:text-emerald-300 font-semibold truncate block">{inspectedRow.model}</span>
                </div>
                <div className="p-1.5 rounded-md bg-[var(--muted-bg)]/80 border border-[var(--border)]">
                  <span className="text-[var(--muted)] block text-[8px] uppercase">Total Tokens:</span>
                  <span className="text-[var(--foreground)] font-semibold">{inspectedRow.tokensIn + inspectedRow.tokensOut} tok</span>
                </div>
                <div className="p-1.5 rounded-md bg-[var(--muted-bg)]/80 border border-[var(--border)]">
                  <span className="text-[var(--muted)] block text-[8px] uppercase">Latency:</span>
                  <span className="text-[var(--foreground)] font-semibold">{inspectedRow.latencyMs}ms</span>
                </div>
                <div className="p-1.5 rounded-md bg-[var(--muted-bg)]/80 border border-[var(--border)]">
                  <span className="text-[var(--muted)] block text-[8px] uppercase">HTTP Response:</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{inspectedRow.status}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* 3. FOOTER TIP */}
      <div className="px-4 py-2 border-t border-[var(--border)] bg-[var(--muted-bg)]/60 flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-[var(--muted)]">
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>Click any row in the Table to inspect its trace tree, or select two rows to compute real-time client-side diffs.</span>
        </div>
        <div className="text-[11px] text-[var(--muted)]">
          Client-Side Computation in <strong>console (Next.js)</strong> · Telemetry Ingestion in <strong>orchestra (FastAPI)</strong>
        </div>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Card Background SVG for Grid View
// -----------------------------------------------------------------------------
export function getObservabilityCardSvg(): string {
  return `<svg viewBox="0 0 320 180" class="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="obs-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#10b981" stop-opacity="0.25"/>
        <stop offset="100%" stop-color="#06b6d4" stop-opacity="0.08"/>
      </linearGradient>
      <linearGradient id="obs-grad-2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#f59e0b" stop-opacity="0.25"/>
        <stop offset="100%" stop-color="#10b981" stop-opacity="0.08"/>
      </linearGradient>
    </defs>
    
    <!-- Quadrant grid crosshairs -->
    <path d="M 10 90 L 310 90 M 160 10 L 160 170" stroke="currentColor" stroke-opacity="0.12" stroke-width="1.2" stroke-dasharray="4 4"/>
    
    <!-- Quadrant 1: Table -->
    <rect x="18" y="18" width="132" height="64" rx="6" fill="url(#obs-grad-1)" stroke="#10b981" stroke-width="1.2" stroke-opacity="0.5"/>
    <rect x="22" y="24" width="124" height="10" rx="3" fill="#10b981" fill-opacity="0.25"/>
    <line x1="22" y1="42" x2="146" y2="42" stroke="currentColor" stroke-opacity="0.1"/>
    <line x1="22" y1="54" x2="146" y2="54" stroke="currentColor" stroke-opacity="0.1"/>
    <line x1="22" y1="66" x2="146" y2="66" stroke="currentColor" stroke-opacity="0.1"/>
    <rect x="24" y="45" width="22" height="6" rx="2" fill="#10b981" fill-opacity="0.8"/>
    <rect x="52" y="46" width="38" height="4" rx="2" fill="currentColor" fill-opacity="0.3"/>
    <rect x="24" y="57" width="22" height="6" rx="2" fill="#06b6d4" fill-opacity="0.8"/>
    <rect x="52" y="58" width="46" height="4" rx="2" fill="currentColor" fill-opacity="0.3"/>
    <text x="142" y="32" text-anchor="end" font-family="monospace" font-size="6.5" font-weight="bold" fill="#10b981">TABLE</text>

    <!-- Quadrant 2: Plots -->
    <rect x="170" y="18" width="132" height="64" rx="6" fill="url(#obs-grad-1)" stroke="#06b6d4" stroke-width="1.2" stroke-opacity="0.5"/>
    <path class="observability-trace" d="M 178 68 Q 195 38 212 56 T 246 36 T 280 48 T 294 30" fill="none" stroke="#10b981" stroke-width="1.8"/>
    <path class="observability-trace" d="M 178 74 Q 200 58 222 72 T 266 52 T 294 62" fill="none" stroke="#f59e0b" stroke-width="1.4"/>
    <rect x="250" y="60" width="4" height="14" rx="1" fill="#10b981" fill-opacity="0.7"/>
    <rect x="256" y="54" width="4" height="20" rx="1" fill="#10b981" fill-opacity="0.9"/>
    <rect x="262" y="48" width="4" height="26" rx="1" fill="#10b981"/>
    <rect x="268" y="56" width="4" height="18" rx="1" fill="#10b981" fill-opacity="0.7"/>
    <text x="294" y="32" text-anchor="end" font-family="monospace" font-size="6.5" font-weight="bold" fill="#06b6d4">PLOTS</text>

    <!-- Quadrant 3: Diff View -->
    <rect x="18" y="98" width="132" height="64" rx="6" fill="url(#obs-grad-2)" stroke="#f59e0b" stroke-width="1.2" stroke-opacity="0.5"/>
    <rect x="24" y="110" width="120" height="18" rx="3" fill="#f43f5e" fill-opacity="0.15" stroke="#f43f5e" stroke-width="0.8" stroke-opacity="0.4"/>
    <line x1="28" y1="119" x2="88" y2="119" stroke="#f43f5e" stroke-width="2" stroke-linecap="round"/>
    <rect x="24" y="134" width="120" height="22" rx="3" fill="#10b981" fill-opacity="0.18" stroke="#10b981" stroke-width="0.8" stroke-opacity="0.5"/>
    <line x1="28" y1="143" x2="110" y2="143" stroke="#10b981" stroke-width="2" stroke-linecap="round"/>
    <line x1="28" y1="150" x2="75" y2="150" stroke="#10b981" stroke-width="2" stroke-linecap="round"/>
    <text x="142" y="108" text-anchor="end" font-family="monospace" font-size="6.5" font-weight="bold" fill="#f59e0b">DIFF</text>

    <!-- Quadrant 4: Trace View -->
    <rect x="170" y="98" width="132" height="64" rx="6" fill="url(#obs-grad-1)" stroke="#a855f7" stroke-width="1.2" stroke-opacity="0.5"/>
    <line x1="178" y1="112" x2="220" y2="112" stroke="currentColor" stroke-opacity="0.3" stroke-width="1.5"/>
    <line x1="186" y1="122" x2="230" y2="122" stroke="currentColor" stroke-opacity="0.2" stroke-width="1.2"/>
    <rect x="186" y="129" width="62" height="11" rx="3" fill="#10b981" fill-opacity="0.3" stroke="#10b981" stroke-width="0.8"/>
    <text x="189" y="137" font-family="monospace" font-size="5.5" font-weight="bold" fill="#10b981">o3-mini@openai</text>
    <line x1="186" y1="147" x2="224" y2="147" stroke="currentColor" stroke-opacity="0.2" stroke-width="1.2"/>
    <rect x="254" y="110" width="42" height="46" rx="3" fill="currentColor" fill-opacity="0.06" stroke="currentColor" stroke-opacity="0.1"/>
    <text x="257" y="120" font-family="monospace" font-size="5" fill="#10b981">@unify.traced</text>
    <text x="294" y="108" text-anchor="end" font-family="monospace" font-size="6.5" font-weight="bold" fill="#a855f7">TRACE</text>
  </svg>`;
}
