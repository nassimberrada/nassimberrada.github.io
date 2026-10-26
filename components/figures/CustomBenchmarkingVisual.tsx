"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Clock,
  TrendingUp,
  DollarSign,
  Search,
  Play,
  Pause,
  Sparkles,
  Server,
  Zap,
  Activity,
  Globe,
} from "lucide-react";

interface RegionMetric {
  code: string;
  name: string;
  location: string;
  ttftP50: number; // ms
  ttftP95: number; // ms
  itlMs: number; // ms per token
  tps: number; // tokens per sec
  jitter: number; // %
  costInPerM: number; // $
  costOutPerM: number; // $
  lastPingSec: number;
}

interface EndpointData {
  id: string;
  model: string;
  provider: string;
  fullName: string;
  category: "frontier" | "fast" | "open";
  contextWindow: string;
  regions: RegionMetric[];
}

interface StreamPoint {
  id: number;
  tps: number;
  itl: number;
  ttft: number;
}

const INITIAL_ENDPOINTS: EndpointData[] = [
  {
    id: "llama-3.3-70b@groq",
    model: "llama-3.3-70b-versatile",
    provider: "groq",
    fullName: "llama-3.3-70b-versatile@groq",
    category: "fast",
    contextWindow: "128k",
    regions: [
      { code: "us-east-1", name: "US East", location: "N. Virginia", ttftP50: 195, ttftP95: 235, itlMs: 3.4, tps: 294, jitter: 3.8, costInPerM: 0.59, costOutPerM: 0.79, lastPingSec: 2 },
      { code: "us-west-2", name: "US West", location: "Oregon", ttftP50: 215, ttftP95: 260, itlMs: 3.5, tps: 286, jitter: 4.1, costInPerM: 0.59, costOutPerM: 0.79, lastPingSec: 5 },
      { code: "eu-west-1", name: "EU West", location: "Ireland", ttftP50: 245, ttftP95: 310, itlMs: 3.6, tps: 278, jitter: 5.2, costInPerM: 0.59, costOutPerM: 0.79, lastPingSec: 7 },
      { code: "ap-southeast-1", name: "APAC", location: "Singapore", ttftP50: 285, ttftP95: 365, itlMs: 3.8, tps: 263, jitter: 6.4, costInPerM: 0.59, costOutPerM: 0.79, lastPingSec: 11 },
      { code: "sa-east-1", name: "SA East", location: "São Paulo", ttftP50: 310, ttftP95: 410, itlMs: 3.9, tps: 256, jitter: 7.1, costInPerM: 0.59, costOutPerM: 0.79, lastPingSec: 14 },
    ],
  },
  {
    id: "gpt-4o@openai",
    model: "gpt-4o-2024-11-20",
    provider: "openai",
    fullName: "gpt-4o-2024-11-20@openai",
    category: "frontier",
    contextWindow: "128k",
    regions: [
      { code: "us-east-1", name: "US East", location: "N. Virginia", ttftP50: 385, ttftP95: 520, itlMs: 8.6, tps: 116, jitter: 5.9, costInPerM: 2.50, costOutPerM: 10.00, lastPingSec: 1 },
      { code: "us-west-2", name: "US West", location: "Oregon", ttftP50: 410, ttftP95: 540, itlMs: 8.8, tps: 113, jitter: 6.1, costInPerM: 2.50, costOutPerM: 10.00, lastPingSec: 4 },
      { code: "eu-west-1", name: "EU West", location: "Ireland", ttftP50: 440, ttftP95: 595, itlMs: 9.1, tps: 109, jitter: 7.3, costInPerM: 2.50, costOutPerM: 10.00, lastPingSec: 8 },
      { code: "ap-southeast-1", name: "APAC", location: "Singapore", ttftP50: 495, ttftP95: 680, itlMs: 9.4, tps: 106, jitter: 8.2, costInPerM: 2.50, costOutPerM: 10.00, lastPingSec: 12 },
      { code: "sa-east-1", name: "SA East", location: "São Paulo", ttftP50: 530, ttftP95: 740, itlMs: 9.8, tps: 102, jitter: 9.4, costInPerM: 2.50, costOutPerM: 10.00, lastPingSec: 18 },
    ],
  },
  {
    id: "claude-3-5-sonnet@anthropic",
    model: "claude-3-5-sonnet-20241022",
    provider: "anthropic",
    fullName: "claude-3-5-sonnet-20241022@anthropic",
    category: "frontier",
    contextWindow: "200k",
    regions: [
      { code: "us-east-1", name: "US East", location: "N. Virginia", ttftP50: 480, ttftP95: 660, itlMs: 12.2, tps: 82, jitter: 6.8, costInPerM: 3.00, costOutPerM: 15.00, lastPingSec: 3 },
      { code: "us-west-2", name: "US West", location: "Oregon", ttftP50: 510, ttftP95: 690, itlMs: 12.5, tps: 80, jitter: 7.0, costInPerM: 3.00, costOutPerM: 15.00, lastPingSec: 6 },
      { code: "eu-west-1", name: "EU West", location: "Ireland", ttftP50: 550, ttftP95: 750, itlMs: 12.9, tps: 77, jitter: 8.4, costInPerM: 3.00, costOutPerM: 15.00, lastPingSec: 9 },
      { code: "ap-southeast-1", name: "APAC", location: "Singapore", ttftP50: 620, ttftP95: 840, itlMs: 13.4, tps: 74, jitter: 9.6, costInPerM: 3.00, costOutPerM: 15.00, lastPingSec: 15 },
      { code: "sa-east-1", name: "SA East", location: "São Paulo", ttftP50: 660, ttftP95: 910, itlMs: 13.9, tps: 72, jitter: 10.5, costInPerM: 3.00, costOutPerM: 15.00, lastPingSec: 21 },
    ],
  },
  {
    id: "deepseek-v3@deepseek",
    model: "deepseek-chat-v3",
    provider: "deepseek",
    fullName: "deepseek-chat-v3@deepseek",
    category: "open",
    contextWindow: "64k",
    regions: [
      { code: "us-east-1", name: "US East", location: "N. Virginia", ttftP50: 620, ttftP95: 890, itlMs: 9.8, tps: 102, jitter: 8.4, costInPerM: 0.14, costOutPerM: 0.28, lastPingSec: 2 },
      { code: "us-west-2", name: "US West", location: "Oregon", ttftP50: 640, ttftP95: 910, itlMs: 10.1, tps: 99, jitter: 8.9, costInPerM: 0.14, costOutPerM: 0.28, lastPingSec: 5 },
      { code: "eu-west-1", name: "EU West", location: "Ireland", ttftP50: 580, ttftP95: 820, itlMs: 9.5, tps: 105, jitter: 7.9, costInPerM: 0.14, costOutPerM: 0.28, lastPingSec: 6 },
      { code: "ap-southeast-1", name: "APAC", location: "Singapore", ttftP50: 390, ttftP95: 540, itlMs: 8.9, tps: 112, jitter: 5.1, costInPerM: 0.14, costOutPerM: 0.28, lastPingSec: 1 },
      { code: "sa-east-1", name: "SA East", location: "São Paulo", ttftP50: 710, ttftP95: 990, itlMs: 10.8, tps: 92, jitter: 11.2, costInPerM: 0.14, costOutPerM: 0.28, lastPingSec: 19 },
    ],
  },
  {
    id: "qwen-2.5-72b@together",
    model: "qwen-2.5-72b-instruct",
    provider: "together",
    fullName: "qwen-2.5-72b-instruct@together",
    category: "open",
    contextWindow: "32k",
    regions: [
      { code: "us-east-1", name: "US East", location: "N. Virginia", ttftP50: 340, ttftP95: 460, itlMs: 6.8, tps: 147, jitter: 4.8, costInPerM: 0.90, costOutPerM: 0.90, lastPingSec: 3 },
      { code: "us-west-2", name: "US West", location: "Oregon", ttftP50: 320, ttftP95: 430, itlMs: 6.7, tps: 149, jitter: 4.4, costInPerM: 0.90, costOutPerM: 0.90, lastPingSec: 4 },
      { code: "eu-west-1", name: "EU West", location: "Ireland", ttftP50: 410, ttftP95: 540, itlMs: 7.2, tps: 138, jitter: 6.1, costInPerM: 0.90, costOutPerM: 0.90, lastPingSec: 10 },
      { code: "ap-southeast-1", name: "APAC", location: "Singapore", ttftP50: 450, ttftP95: 610, itlMs: 7.6, tps: 131, jitter: 7.0, costInPerM: 0.90, costOutPerM: 0.90, lastPingSec: 16 },
      { code: "sa-east-1", name: "SA East", location: "São Paulo", ttftP50: 490, ttftP95: 680, itlMs: 7.9, tps: 126, jitter: 8.3, costInPerM: 0.90, costOutPerM: 0.90, lastPingSec: 22 },
    ],
  },
];

// Helper to add bell-curved random jitter to numbers
function applyNoise(base: number, maxPct: number, minFloor = 1): number {
  const norm = ((Math.random() + Math.random() + Math.random()) / 3 - 0.5) * 2;
  const val = Math.round(base * (1 + norm * maxPct));
  return Math.max(minFloor, val);
}

export function CustomBenchmarkingVisual() {
  const [endpoints, setEndpoints] = useState<EndpointData[]>(INITIAL_ENDPOINTS);
  const [selectedEndpointId, setSelectedEndpointId] = useState<string>("llama-3.3-70b@groq");
  const [activeTab, setActiveTab] = useState<"ttft" | "stream" | "cost">("ttft");
  const [searchFilter, setSearchFilter] = useState<string>("");
  const [isLiveProbActive, setIsLiveProbActive] = useState<boolean>(true);
  const [probeSeq, setProbeSeq] = useState<number>(18420);
  const [lastProbedRegion, setLastProbedRegion] = useState<string>("us-east-1");
  const [isPingFlash, setIsPingFlash] = useState<boolean>(false);

  // Time-series rolling stream for the currently selected endpoint
  const [streamPoints, setStreamPoints] = useState<StreamPoint[]>([
    { id: 1, tps: 288, itl: 3.5, ttft: 198 },
    { id: 2, tps: 292, itl: 3.4, ttft: 194 },
    { id: 3, tps: 290, itl: 3.4, ttft: 196 },
    { id: 4, tps: 296, itl: 3.3, ttft: 192 },
    { id: 5, tps: 289, itl: 3.5, ttft: 201 },
    { id: 6, tps: 294, itl: 3.4, ttft: 195 },
    { id: 7, tps: 298, itl: 3.3, ttft: 191 },
    { id: 8, tps: 294, itl: 3.4, ttft: 195 },
  ]);

  // Periodic multi-region probe engine (updates every 2.5s with realistic random distributions)
  useEffect(() => {
    if (!isLiveProbActive) return;

    const interval = setInterval(() => {
      setProbeSeq((prev) => prev + 1);

      // Randomly pick which region just completed a probe
      const regionsList = ["us-east-1", "us-west-2", "eu-west-1", "ap-southeast-1", "sa-east-1"];
      const probedRegCode = regionsList[Math.floor(Math.random() * regionsList.length)];
      setLastProbedRegion(probedRegCode);
      setIsPingFlash(true);
      setTimeout(() => setIsPingFlash(false), 800);

      setEndpoints((prevEndpoints) => {
        return prevEndpoints.map((ep) => {
          // Find the base endpoint to prevent runaway drift
          const baseEp = INITIAL_ENDPOINTS.find((b) => b.id === ep.id) || ep;

          const updatedRegions = ep.regions.map((reg, idx) => {
            const baseReg = baseEp.regions[idx];
            // Apply subtle bell-curved noise (±2% to ±5%)
            const newTtftP50 = applyNoise(baseReg.ttftP50, 0.045, 50);
            const newTtftP95 = Math.round(newTtftP50 * 1.25 + applyNoise(15, 0.2));
            const newTps = applyNoise(baseReg.tps, 0.035, 10);
            const newItl = Number((1000 / newTps).toFixed(1));
            const newJitter = Number((baseReg.jitter + (Math.random() - 0.5) * 0.4).toFixed(1));

            return {
              ...reg,
              ttftP50: newTtftP50,
              ttftP95: newTtftP95,
              tps: newTps,
              itlMs: newItl,
              jitter: Math.max(1.5, newJitter),
              lastPingSec: reg.code === probedRegCode ? 1 : reg.lastPingSec + 2,
            };
          });

          return {
            ...ep,
            regions: updatedRegions,
          };
        });
      });
    }, 2500);

    return () => clearInterval(interval);
  }, [isLiveProbActive]);

  const selectedEndpoint = useMemo(() => {
    return endpoints.find((e) => e.id === selectedEndpointId) || endpoints[0];
  }, [endpoints, selectedEndpointId]);

  // Update rolling time-series whenever selected endpoint updates
  useEffect(() => {
    const usEast = selectedEndpoint.regions[0];
    setStreamPoints((prev) => {
      const nextId = prev.length > 0 ? prev[prev.length - 1].id + 1 : 1;
      const newPt: StreamPoint = {
        id: nextId,
        tps: usEast.tps,
        itl: usEast.itlMs,
        ttft: usEast.ttftP50,
      };
      const sliced = prev.slice(-11);
      return [...sliced, newPt];
    });
  }, [selectedEndpoint.regions]);

  const filteredEndpoints = useMemo(() => {
    if (!searchFilter.trim()) return endpoints;
    const q = searchFilter.toLowerCase();
    return endpoints.filter(
      (e) => e.fullName.toLowerCase().includes(q) || e.provider.toLowerCase().includes(q)
    );
  }, [endpoints, searchFilter]);

  const avgTtft = useMemo(() => {
    const sum = selectedEndpoint.regions.reduce((acc, r) => acc + r.ttftP50, 0);
    return Math.round(sum / selectedEndpoint.regions.length);
  }, [selectedEndpoint]);

  const avgTps = useMemo(() => {
    const sum = selectedEndpoint.regions.reduce((acc, r) => acc + r.tps, 0);
    return Math.round(sum / selectedEndpoint.regions.length);
  }, [selectedEndpoint]);

  // Coordinates for the ITL/TPS SVG stream curve
  const streamSvgPath = useMemo(() => {
    if (streamPoints.length < 2) return "";
    const minTps = Math.min(...streamPoints.map((p) => p.tps)) * 0.92;
    const maxTps = Math.max(...streamPoints.map((p) => p.tps)) * 1.08;
    const range = maxTps - minTps || 1;

    const width = 480;
    const height = 140;
    const stepX = width / (streamPoints.length - 1);

    const pts = streamPoints.map((p, idx) => {
      const x = idx * stepX;
      const y = height - ((p.tps - minTps) / range) * (height - 24) - 12;
      return { x, y };
    });

    let path = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 1; i < pts.length; i++) {
      const prev = pts[i - 1];
      const curr = pts[i];
      const cx = (prev.x + curr.x) / 2;
      path += ` C ${cx} ${prev.y}, ${cx} ${curr.y}, ${curr.x} ${curr.y}`;
    }
    return { path, pts, minTps, maxTps };
  }, [streamPoints]);

  return (
    <div className="w-full rounded-[14px] border border-[var(--border)] bg-[var(--card)] shadow-lg overflow-hidden font-sans select-none text-[var(--foreground)] transition-colors">
      {/* 1. COMPACT TELEMETRY HEADER */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2 border-b border-[var(--border)] bg-[var(--muted-bg)]/60">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/25 text-[11px] font-mono font-semibold text-emerald-600 dark:text-emerald-400">
            <span
              className={`w-1.5 h-1.5 rounded-full bg-emerald-500 ${
                isLiveProbActive ? "animate-ping" : ""
              }`}
            />
            <span>LIVE HARNESS</span>
          </div>
          <span className="text-[11px] font-mono text-[var(--muted)]">
            Probe #{probeSeq.toLocaleString()} ·{" "}
            <span className="text-emerald-600 dark:text-emerald-400 font-medium">
              {lastProbedRegion}
            </span>{" "}
            sampled
          </span>
        </div>

        {/* Live / Pause Button */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-[var(--muted)] hidden sm:inline">
            Tick: 2.5s
          </span>
          <button
            onClick={() => setIsLiveProbActive(!isLiveProbActive)}
            className={`flex items-center gap-1 px-2 py-1 rounded text-[11px] font-mono border transition-all cursor-pointer ${
              isLiveProbActive
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-semibold"
                : "bg-[var(--card)] border-[var(--border)] text-[var(--muted)] hover:text-[var(--foreground)]"
            }`}
          >
            {isLiveProbActive ? (
              <>
                <Pause className="w-3 h-3 text-emerald-500" />
                <span>Active</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3 text-[var(--muted)]" />
                <span>Paused</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 2. TWO-COLUMN MAIN BENCHMARK WORKSPACE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-[var(--border)] min-h-[440px]">
        {/* ========================================================================= */}
        {/* LEFT PANE: FILTERABLE ENDPOINTS LIST (5 COLS)                             */}
        {/* ========================================================================= */}
        <div className="lg:col-span-5 flex flex-col bg-[var(--card)]">
          {/* Search bar */}
          <div className="p-2.5 border-b border-[var(--border)] bg-[var(--muted-bg)]/20">
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[var(--card)] border border-[var(--border)] text-xs text-[var(--muted)]">
              <Search className="w-3.5 h-3.5 opacity-60" />
              <input
                type="text"
                placeholder="Filter model@provider..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="bg-transparent border-none outline-none text-[var(--foreground)] placeholder-[var(--muted)] text-[11px] font-mono w-full"
              />
            </div>
          </div>

          {/* List of endpoints */}
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {filteredEndpoints.map((ep) => {
              const isSelected = ep.id === selectedEndpointId;
              const usEast = ep.regions[0];

              return (
                <div
                  key={ep.id}
                  onClick={() => setSelectedEndpointId(ep.id)}
                  className={`p-2.5 rounded-lg cursor-pointer transition-all border ${
                    isSelected
                      ? "bg-emerald-500/10 border-emerald-500/40 shadow-xs"
                      : "border-transparent hover:bg-[var(--card-hover)]"
                  }`}
                >
                  <div className="flex items-center justify-between gap-1">
                    <div className="min-w-0 font-mono text-xs font-bold text-[var(--foreground)] truncate">
                      <span>{ep.model}</span>
                      <span className="text-emerald-600 dark:text-emerald-400">@{ep.provider}</span>
                    </div>
                    <div className="text-right font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400 whitespace-nowrap">
                      {usEast.tps} <span className="text-[10px] font-normal text-[var(--muted)]">tok/s</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[10px] font-mono text-[var(--muted)] mt-1">
                    <span className="capitalize">{ep.category} · {ep.contextWindow}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-2.5 h-2.5 opacity-70" />
                      {usEast.ttftP50}ms TTFT
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Left panel subtle footer */}
          <div className="p-2 border-t border-[var(--border)] bg-[var(--muted-bg)]/20 text-[10px] font-mono text-[var(--muted)] flex items-center justify-between">
            <span className="flex items-center gap-1">
              <Server className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
              <span>5 Global Regions Tracked</span>
            </span>
            <span className="text-emerald-600 dark:text-emerald-400 font-medium">unify.benchmarks</span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* RIGHT PANE: REAL-TIME PLOTS (7 COLS)                                      */}
        {/* ========================================================================= */}
        <div className="lg:col-span-7 flex flex-col bg-[var(--card)]">
          {/* Top selection info & Tab switches */}
          <div className="p-3 border-b border-[var(--border)] flex flex-wrap items-center justify-between gap-2 bg-[var(--muted-bg)]/20">
            <div>
              <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-[var(--foreground)]">
                <span>{selectedEndpoint.fullName}</span>
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    isPingFlash ? "bg-emerald-400 scale-125" : "bg-emerald-600 dark:text-emerald-400"
                  } transition-all duration-300`}
                />
              </div>
              <div className="text-[10px] font-mono text-[var(--muted)] mt-0.5">
                p50 TTFT: <strong className="text-[var(--foreground)]">{avgTtft}ms</strong> · Throughput:{" "}
                <strong className="text-emerald-600 dark:text-emerald-400">{avgTps} tok/s</strong>
              </div>
            </div>

            {/* Clean Tab Buttons */}
            <div className="flex items-center rounded-lg bg-[var(--muted-bg)]/80 p-0.5 border border-[var(--border)] text-[10px] font-mono">
              <button
                onClick={() => setActiveTab("ttft")}
                className={`px-2.5 py-1 rounded transition-all cursor-pointer ${
                  activeTab === "ttft"
                    ? "bg-[var(--card)] text-emerald-600 dark:text-emerald-400 font-bold shadow-xs"
                    : "text-[var(--muted)] hover:text-[var(--foreground)]"
                }`}
              >
                TTFT Latency
              </button>
              <button
                onClick={() => setActiveTab("stream")}
                className={`px-2.5 py-1 rounded transition-all cursor-pointer ${
                  activeTab === "stream"
                    ? "bg-[var(--card)] text-emerald-600 dark:text-emerald-400 font-bold shadow-xs"
                    : "text-[var(--muted)] hover:text-[var(--foreground)]"
                }`}
              >
                ITL / TPS Stream
              </button>
              <button
                onClick={() => setActiveTab("cost")}
                className={`px-2.5 py-1 rounded transition-all cursor-pointer ${
                  activeTab === "cost"
                    ? "bg-[var(--card)] text-emerald-600 dark:text-emerald-400 font-bold shadow-xs"
                    : "text-[var(--muted)] hover:text-[var(--foreground)]"
                }`}
              >
                Cost Economics
              </button>
            </div>
          </div>

          {/* TAB 1: REGIONAL TTFT LATENCY BARS */}
          {activeTab === "ttft" && (
            <div className="flex-1 p-4 flex flex-col justify-between space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-[var(--muted)]">
                <span className="flex items-center gap-1.5 text-[var(--foreground)] font-semibold">
                  <Clock className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  Time-to-First-Token (TTFT) by Region
                </span>
                <div className="flex items-center gap-3 text-[10px]">
                  <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
                    <span className="w-2 h-2 rounded-xs bg-emerald-500" /> p50
                  </span>
                  <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400 font-medium">
                    <span className="w-2 h-2 rounded-xs bg-amber-500/50" /> p95 tail
                  </span>
                </div>
              </div>

              {/* Dynamic Bar Charts */}
              <div className="space-y-3 my-auto py-1">
                {selectedEndpoint.regions.map((region) => {
                  const maxTtft = 900;
                  const p50Width = Math.min(100, (region.ttftP50 / maxTtft) * 100);
                  const p95Width = Math.min(100, (region.ttftP95 / maxTtft) * 100);
                  const isCurrentProbed = region.code === lastProbedRegion;

                  return (
                    <div key={region.code} className="space-y-1">
                      <div className="flex items-center justify-between text-[11px] font-mono">
                        <span className="font-semibold text-[var(--foreground)] flex items-center gap-1.5">
                          <span>{region.code}</span>
                          <span className="text-[var(--muted)] font-normal">({region.location})</span>
                          {isCurrentProbed && (
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          )}
                        </span>
                        <span className="text-[10px] font-mono text-[var(--muted)]">
                          p50: <strong className="text-emerald-600 dark:text-emerald-400 font-bold">{region.ttftP50}ms</strong> · p95: <strong className="text-amber-600 dark:text-amber-400">{region.ttftP95}ms</strong>
                        </span>
                      </div>

                      {/* Bar track */}
                      <div className="relative h-4 w-full rounded bg-[var(--muted-bg)] overflow-hidden border border-[var(--border)]">
                        {/* p95 background bar */}
                        <div
                          style={{ width: `${p95Width}%` }}
                          className="absolute left-0 top-0 bottom-0 bg-amber-500/20 transition-all duration-500 ease-out"
                        />
                        {/* p50 foreground bar */}
                        <div
                          style={{ width: `${p50Width}%` }}
                          className="absolute left-0 top-0 bottom-0 bg-emerald-500/80 rounded-r shadow-xs transition-all duration-500 ease-out"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="p-2 rounded-lg bg-[var(--muted-bg)]/40 border border-[var(--border)] text-[10px] font-mono text-[var(--muted)] flex items-center justify-between">
                <span>Kernel Variance Filter: <strong>±{selectedEndpoint.regions[0].jitter}%</strong></span>
                <span className="text-emerald-600 dark:text-emerald-400 font-medium">Orchestra Fast Timers</span>
              </div>
            </div>
          )}

          {/* TAB 2: LIVE STREAM (ITL & TPS) */}
          {activeTab === "stream" && (
            <div className="flex-1 p-4 flex flex-col justify-between space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-[var(--muted)]">
                <span className="flex items-center gap-1.5 text-[var(--foreground)] font-semibold">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  Live Generation Speed (tok/s)
                </span>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
                  {selectedEndpoint.regions[0].tps} tok/s current
                </span>
              </div>

              {/* Dynamic SVG Stream */}
              <div className="relative flex-1 w-full flex items-center justify-center py-2">
                {streamSvgPath ? (
                  <svg className="w-full h-36" viewBox="0 0 480 140" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="streamGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stop-color="#10b981" stop-opacity="0.3" />
                        <stop offset="100%" stop-color="#10b981" stop-opacity="0.0" />
                      </linearGradient>
                    </defs>

                    {/* Horizontal grid lines */}
                    <line x1="0" y1="20" x2="480" y2="20" stroke="var(--border)" strokeDasharray="3 3" />
                    <line x1="0" y1="70" x2="480" y2="70" stroke="var(--border)" strokeDasharray="3 3" />
                    <line x1="0" y1="120" x2="480" y2="120" stroke="var(--border)" strokeDasharray="3 3" />

                    {/* Area under curve */}
                    <path
                      d={`${streamSvgPath.path} L 480 140 L 0 140 Z`}
                      fill="url(#streamGrad)"
                    />

                    {/* Line curve */}
                    <path
                      d={streamSvgPath.path}
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />

                    {/* Data Points */}
                    {streamSvgPath.pts.map((pt, idx) => {
                      const isLast = idx === streamSvgPath.pts.length - 1;
                      return (
                        <g key={idx}>
                          <circle
                            cx={pt.x}
                            cy={pt.y}
                            r={isLast ? 4 : 2.5}
                            fill={isLast ? "#10b981" : "var(--card)"}
                            stroke="#10b981"
                            strokeWidth="1.5"
                          />
                          {isLast && (
                            <circle
                              cx={pt.x}
                              cy={pt.y}
                              r="7"
                              fill="none"
                              stroke="#10b981"
                              strokeWidth="1.2"
                              className="animate-ping"
                            />
                          )}
                        </g>
                      );
                    })}
                  </svg>
                ) : null}
              </div>

              {/* Dynamic stats row */}
              <div className="grid grid-cols-3 gap-2 text-xs font-mono">
                <div className="p-2.5 rounded-lg border border-[var(--border)] bg-[var(--muted-bg)]/40 text-center">
                  <div className="text-[10px] text-[var(--muted)]">Throughput</div>
                  <div className="text-base font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">
                    {selectedEndpoint.regions[0].tps} <span className="text-[10px] font-normal">tps</span>
                  </div>
                </div>
                <div className="p-2.5 rounded-lg border border-[var(--border)] bg-[var(--muted-bg)]/40 text-center">
                  <div className="text-[10px] text-[var(--muted)]">Inter-Token Latency</div>
                  <div className="text-base font-bold text-[var(--foreground)] mt-0.5">
                    {selectedEndpoint.regions[0].itlMs} <span className="text-[10px] font-normal text-[var(--muted)]">ms</span>
                  </div>
                </div>
                <div className="p-2.5 rounded-lg border border-[var(--border)] bg-[var(--muted-bg)]/40 text-center">
                  <div className="text-[10px] text-[var(--muted)]">Uptime</div>
                  <div className="text-base font-bold text-cyan-600 dark:text-cyan-400 mt-0.5">
                    99.98%
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: COST ECONOMICS */}
          {activeTab === "cost" && (
            <div className="flex-1 p-4 flex flex-col justify-between space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-[var(--muted)]">
                <span className="flex items-center gap-1.5 text-[var(--foreground)] font-semibold">
                  <DollarSign className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  Provider Pricing ($/1M Tokens)
                </span>
                <span className="text-[10px] font-mono text-[var(--muted)]">Verified Rate</span>
              </div>

              <div className="grid grid-cols-2 gap-3 my-auto py-2">
                <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--muted-bg)]/40 space-y-1">
                  <div className="text-[10px] uppercase font-mono tracking-wider text-[var(--muted)]">
                    Prompt Ingress
                  </div>
                  <div className="text-3xl font-mono font-bold text-[var(--foreground)]">
                    ${selectedEndpoint.regions[0].costInPerM.toFixed(2)}
                  </div>
                  <p className="text-[10px] text-[var(--muted)] font-mono">
                    Per 1,000,000 input prompt tokens
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--muted-bg)]/40 space-y-1">
                  <div className="text-[10px] uppercase font-mono tracking-wider text-[var(--muted)]">
                    Completion Egress
                  </div>
                  <div className="text-3xl font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    ${selectedEndpoint.regions[0].costOutPerM.toFixed(2)}
                  </div>
                  <p className="text-[10px] text-[var(--muted)] font-mono">
                    Per 1,000,000 generated tokens
                  </p>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-[var(--muted-bg)]/40 border border-[var(--border)] text-[10px] font-mono text-[var(--muted)] flex items-center justify-between">
                <span>Value Efficiency: <strong>{((selectedEndpoint.regions[0].tps / (selectedEndpoint.regions[0].costInPerM + 0.1)) * 10).toFixed(0)} tokens/$</strong></span>
                <span className="text-emerald-600 dark:text-emerald-400 font-medium">Model Context: {selectedEndpoint.contextWindow}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 3. SUBTLE STATUS FOOTER */}
      <div className="px-4 py-2 border-t border-[var(--border)] bg-[var(--muted-bg)]/40 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-[var(--muted)]">
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>Real-time Multi-Region LLM Benchmarks</span>
        </div>
        <div>
          <span>modelhub · orchestra · unify · GitHub Actions Cron</span>
        </div>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Card Background SVG for Grid View
// -----------------------------------------------------------------------------
export function getBenchmarkingCardSvg(): string {
  return `<svg viewBox="0 0 320 180" class="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bench-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#10b981" stop-opacity="0.25"/>
        <stop offset="100%" stop-color="#06b6d4" stop-opacity="0.08"/>
      </linearGradient>
    </defs>
    
    <path d="M 10 90 L 310 90 M 120 10 L 120 170" stroke="currentColor" stroke-opacity="0.1" stroke-width="1.2" stroke-dasharray="4 4"/>
    
    <!-- Left: Endpoint list mini -->
    <rect x="18" y="20" width="94" height="140" rx="6" fill="currentColor" fill-opacity="0.04" stroke="#10b981" stroke-width="1" stroke-opacity="0.4"/>
    <rect x="24" y="28" width="82" height="12" rx="3" fill="#10b981" fill-opacity="0.25"/>
    <text x="28" y="36" font-family="monospace" font-size="5" font-weight="bold" fill="#10b981">llama-3.3@groq</text>
    <rect x="24" y="44" width="82" height="10" rx="2" fill="currentColor" fill-opacity="0.06"/>
    <text x="28" y="51" font-family="monospace" font-size="4.5" fill="currentColor" fill-opacity="0.7">gpt-4o@openai</text>
    <rect x="24" y="58" width="82" height="10" rx="2" fill="currentColor" fill-opacity="0.06"/>
    <text x="28" y="65" font-family="monospace" font-size="4.5" fill="currentColor" fill-opacity="0.7">claude-3.5@anth</text>
    <rect x="24" y="72" width="82" height="10" rx="2" fill="currentColor" fill-opacity="0.06"/>
    <text x="28" y="79" font-family="monospace" font-size="4.5" fill="currentColor" fill-opacity="0.7">deepseek-v3@ds</text>

    <!-- Right: Regional TTFT Bars & Plots -->
    <rect x="130" y="20" width="172" height="140" rx="6" fill="url(#bench-grad)" stroke="#06b6d4" stroke-width="1" stroke-opacity="0.4"/>
    <text x="140" y="34" font-family="monospace" font-size="6" font-weight="bold" fill="#06b6d4">REGIONAL TTFT &amp; TPS</text>
    
    <!-- Region bars -->
    <text x="140" y="50" font-family="monospace" font-size="5" fill="currentColor" fill-opacity="0.7">us-east-1</text>
    <rect x="180" y="45" width="85" height="6" rx="2" fill="#10b981"/>
    
    <text x="140" y="64" font-family="monospace" font-size="5" fill="currentColor" fill-opacity="0.7">us-west-2</text>
    <rect x="180" y="59" width="75" height="6" rx="2" fill="#10b981" fill-opacity="0.85"/>

    <text x="140" y="78" font-family="monospace" font-size="5" fill="currentColor" fill-opacity="0.7">eu-west-1</text>
    <rect x="180" y="73" width="95" height="6" rx="2" fill="#06b6d4"/>

    <text x="140" y="92" font-family="monospace" font-size="5" fill="currentColor" fill-opacity="0.7">ap-se-1</text>
    <rect x="180" y="87" width="105" height="6" rx="2" fill="#f59e0b"/>

    <!-- Sparkline at bottom -->
    <path class="benchmark-throughput-trace" d="M 140 135 Q 165 115 190 125 T 240 105 T 290 120" fill="none" stroke="#10b981" stroke-width="1.8"/>
    <circle cx="240" cy="105" r="3" fill="#10b981"/>
    <text x="240" y="98" text-anchor="middle" font-family="monospace" font-size="4.5" fill="#10b981" font-weight="bold">294 tok/s</text>
  </svg>`;
}
