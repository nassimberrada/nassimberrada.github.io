"use client";

import React, { useState, useEffect } from "react";
import { Play, Pause, Sparkles, MessageSquare, ShieldCheck, Mail, Phone, Hash, Laptop } from "lucide-react";
import connectorPaths from "./connector_paths.json";

// -----------------------------------------------------------------------------
// Connector Item Definitions
// -----------------------------------------------------------------------------
interface ConnectorItem {
  id: string;
  name: string;
  color: string;
  path: string;
}

const CONNECTORS_ROW_1: ConnectorItem[] = [
  { id: "teams", name: "Microsoft Teams", color: "#6264A7", path: (connectorPaths as Record<string, string>)["MicrosoftTeams"] || "" },
  { id: "meet", name: "Google Meet", color: "#00897B", path: (connectorPaths as Record<string, string>)["GoogleMeet"] || "" },
  { id: "zoom", name: "Zoom", color: "#2D8CFF", path: (connectorPaths as Record<string, string>)["Zoom"] || "" },
  { id: "github", name: "GitHub", color: "#8b949e", path: (connectorPaths as Record<string, string>)["GitHub"] || "" },
  { id: "linear", name: "Linear", color: "#5E6AD2", path: (connectorPaths as Record<string, string>)["Linear"] || "" },
  { id: "drive", name: "Google Drive", color: "#FFBA00", path: (connectorPaths as Record<string, string>)["GoogleDrive"] || "" },
];

const CONNECTORS_ROW_2: ConnectorItem[] = [
  { id: "notion", name: "Notion", color: "#e6edf3", path: (connectorPaths as Record<string, string>)["Notion"] || "" },
  { id: "dropbox", name: "Dropbox", color: "#0061FF", path: (connectorPaths as Record<string, string>)["Dropbox"] || "" },
  { id: "slack", name: "Slack", color: "#ECB22E", path: (connectorPaths as Record<string, string>)["Slack"] || "" },
  { id: "trello", name: "Trello", color: "#0079BF", path: (connectorPaths as Record<string, string>)["Trello"] || "" },
  { id: "clickup", name: "ClickUp", color: "#7B68EE", path: (connectorPaths as Record<string, string>)["ClickUp"] || "" },
  { id: "jira", name: "Jira", color: "#0052CC", path: (connectorPaths as Record<string, string>)["Jira"] || "" },
];

export function CustomTeammatesVisual() {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [step, setStep] = useState<number>(0);

  // Chat conversation stages synchronized with reasoning & actions (0 to 5)
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % 6);
    }, 2800);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="w-full relative rounded-[14px] border border-[var(--border)] bg-[var(--card)] p-3 sm:p-5 shadow-xl overflow-hidden select-none">
      {/* =================================================================== */}
      {/* BACKGROUND: Two Endless Marquee Rows of Third-Party Connectors      */}
      {/* (Bigger icons with vibrant colors)                                  */}
      {/* =================================================================== */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-45 dark:opacity-30 flex flex-col justify-around py-4 z-0">
        {/* Row 1: Sliding Left */}
        <div className="flex gap-14 whitespace-nowrap animate-slide-left">
          {[...CONNECTORS_ROW_1, ...CONNECTORS_ROW_1, ...CONNECTORS_ROW_1, ...CONNECTORS_ROW_1].map((c, idx) => (
            <div
              key={`row1-${idx}`}
              className="flex items-center gap-3 px-4 py-2 rounded-xl border border-[var(--border)] bg-[var(--muted-bg)]/60 shadow-sm"
            >
              <svg viewBox="0 0 24 24" className="w-7 h-7 sm:w-8 sm:h-8 shrink-0" fill={c.color}>
                <path d={c.path} />
              </svg>
              <span className="text-xs sm:text-sm font-mono font-semibold text-[var(--foreground)]">
                {c.name}
              </span>
            </div>
          ))}
        </div>

        {/* Row 2: Sliding Right (Reverse) */}
        <div className="flex gap-14 whitespace-nowrap animate-slide-right">
          {[...CONNECTORS_ROW_2, ...CONNECTORS_ROW_2, ...CONNECTORS_ROW_2, ...CONNECTORS_ROW_2].map((c, idx) => (
            <div
              key={`row2-${idx}`}
              className="flex items-center gap-3 px-4 py-2 rounded-xl border border-[var(--border)] bg-[var(--muted-bg)]/60 shadow-sm"
            >
              <svg viewBox="0 0 24 24" className="w-7 h-7 sm:w-8 sm:h-8 shrink-0" fill={c.color}>
                <path d={c.path} />
              </svg>
              <span className="text-xs sm:text-sm font-mono font-semibold text-[var(--foreground)]">
                {c.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* =================================================================== */}
      {/* FOREGROUND: Three Hero Interactive Cards                            */}
      {/* [Left: Chat Tile | Middle: Contact Card | Right: Actions Terminal]  */}
      {/* Chat tile is slightly overlaid on top of Contact Card's top-left   */}
      {/* =================================================================== */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-0 my-3 max-w-5xl mx-auto">
        {/* ----------------------------------------------------------------- */}
        {/* TILE 1: Left Chat Conversation (Overlaid on Contact top-left)      */}
        {/* ----------------------------------------------------------------- */}
        <div className="w-full lg:w-[290px] xl:w-[310px] shrink-0 rounded-xl border border-[var(--border)] bg-[var(--card)]/95 backdrop-blur-md p-3.5 shadow-2xl flex flex-col justify-between z-30 lg:-mr-8 lg:-mt-4 transform transition-transform hover:scale-[1.01]">
          <div>
            <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-[var(--border)]">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-3.5 h-3.5 text-emerald-500" />
                <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[var(--foreground)]">
                  Live Chat Thread
                </span>
              </div>
              <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                ACTIVE
              </span>
            </div>

            <div className="space-y-2.5 text-[11px]">
              {/* Message 1: Assistant */}
              <div className="flex items-start gap-2 transition-all duration-300">
                <img
                  src="/images/alex_rivera_avatar.png"
                  alt="Alex Rivera"
                  className="w-6 h-6 rounded-full object-cover ring-2 ring-emerald-500/40 shrink-0 mt-0.5"
                />
                <div className="p-2.5 rounded-xl rounded-tl-sm bg-[var(--muted-bg)] border border-[var(--border)] text-[var(--foreground)] leading-relaxed max-w-[88%]">
                  Hey, how can I help today?
                </div>
              </div>

              {/* Message 2: User Prompt */}
              {step >= 1 && (
                <div className="flex justify-end transition-all duration-300 animate-in fade-in slide-in-from-bottom-2">
                  <div className="p-2.5 rounded-xl rounded-tr-sm bg-emerald-600 text-white leading-relaxed max-w-[90%] shadow-sm">
                    Can you go through the weekly report in our drive and email John a digest with actionable points?
                  </div>
                </div>
              )}

              {/* Message 3: Assistant Working Ack */}
              {step >= 2 && (
                <div className="flex items-start gap-2 transition-all duration-300 animate-in fade-in slide-in-from-bottom-2">
                  <img
                    src="/images/alex_rivera_avatar.png"
                    alt="Alex Rivera"
                    className="w-6 h-6 rounded-full object-cover ring-2 ring-emerald-500/40 shrink-0 mt-0.5"
                  />
                  <div className="p-2.5 rounded-xl rounded-tl-sm bg-[var(--muted-bg)] border border-[var(--border)] text-[var(--foreground)] leading-relaxed max-w-[88%]">
                    On it, give me a moment...
                  </div>
                </div>
              )}

              {/* Message 4: Assistant Completion */}
              {step >= 5 && (
                <div className="flex items-start gap-2 transition-all duration-300 animate-in fade-in slide-in-from-bottom-2">
                  <img
                    src="/images/alex_rivera_avatar.png"
                    alt="Alex Rivera"
                    className="w-6 h-6 rounded-full object-cover ring-2 ring-emerald-500/40 shrink-0 mt-0.5"
                  />
                  <div className="p-2.5 rounded-xl rounded-tl-sm bg-[var(--muted-bg)] border border-[var(--border)] text-[var(--foreground)] leading-relaxed max-w-[88%]">
                    Just sent over! John has some comments for you to look into.
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Typing Indicator / Active Status */}
          <div className="pt-2.5 mt-2.5 border-t border-[var(--border)] flex items-center justify-between text-[10px] font-mono text-[var(--muted)]">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              {step === 0 && "Waiting for user task..."}
              {step === 1 && "Parsing user instruction..."}
              {(step >= 2 && step <= 4) && "Executing tool chain..."}
              {step === 5 && "Task complete. Synced."}
            </span>
            <span>Step {step + 1}/6</span>
          </div>
        </div>

        {/* ----------------------------------------------------------------- */}
        {/* TILE 2: Middle Assistant Contact Badge (Underneath Chat top-left) */}
        {/* ----------------------------------------------------------------- */}
        <div className="w-full lg:w-[280px] xl:w-[295px] shrink-0 rounded-xl border border-emerald-500/40 bg-[var(--card)] shadow-2xl overflow-hidden relative flex flex-col justify-between z-20">
          {/* Top Emerald Gradient Banner */}
          <div className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 h-24 relative p-3 flex items-start justify-between">
            <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider bg-black/25 text-white backdrop-blur-sm border border-white/20">
              AI Teammate ID
            </span>
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-sm text-white text-[9px] font-mono font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              <span>ONLINE</span>
            </div>
          </div>

          {/* Avatar (Overlapping Banner and Body) */}
          <div className="relative px-4 pt-0 pb-4 flex flex-col items-center text-center -mt-10">
            <div className="relative">
              <img
                src="/images/alex_rivera_avatar.png"
                alt="Alex Rivera"
                className="w-20 h-20 rounded-full object-cover border-4 border-[var(--card)] shadow-xl ring-2 ring-emerald-500/50"
              />
              <span className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-[var(--card)] shadow-sm" />
            </div>

            <h3 className="mt-2 text-lg font-bold tracking-tight text-[var(--foreground)]">
              Alex Rivera
            </h3>
            <div className="mt-0.5 text-[10.5px] font-mono font-bold tracking-wider text-emerald-600 dark:text-emerald-400 uppercase">
              Senior Data Analyst
            </div>

            {/* Contact Details Grid */}
            <div className="w-full mt-3 p-2.5 rounded-xl border border-[var(--border)] bg-[var(--muted-bg)]/40 font-mono text-[11px] space-y-1.5 text-left">
              <div className="flex items-center justify-between">
                <span className="text-[9.5px] text-[var(--muted)] uppercase tracking-wider flex items-center gap-1">
                  <Hash className="w-3 h-3 text-emerald-500" />
                  <span>ID</span>
                </span>
                <span className="font-semibold text-[var(--foreground)]">
                  EMP-8842
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[9.5px] text-[var(--muted)] uppercase tracking-wider flex items-center gap-1">
                  <Mail className="w-3 h-3 text-emerald-500" />
                  <span>Email</span>
                </span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                  alex@corp.com
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[9.5px] text-[var(--muted)] uppercase tracking-wider flex items-center gap-1">
                  <Phone className="w-3 h-3 text-emerald-500" />
                  <span>Phone</span>
                </span>
                <span className="font-semibold text-[var(--foreground)]">
                  +1 (555) 0123
                </span>
              </div>
            </div>

            {/* Omnichannel Integration Badges */}
            <div className="w-full mt-2.5 flex items-center justify-between px-1 text-[9.5px] font-mono text-[var(--muted)]">
              <span className="flex items-center gap-1">
                <Laptop className="w-3 h-3 text-cyan-500" />
                <span>VM Browser</span>
              </span>
              <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
                <ShieldCheck className="w-3 h-3" />
                <span>SOC2 Sandboxed</span>
              </span>
            </div>
          </div>
        </div>

        {/* ----------------------------------------------------------------- */}
        {/* TILE 3: Right Reasoning & Actions Terminal                        */}
        {/* ----------------------------------------------------------------- */}
        <div className="w-full lg:w-[290px] xl:w-[310px] shrink-0 rounded-xl border border-[#30363d] bg-[#0d1117] text-[#c9d1d9] p-3.5 shadow-xl flex flex-col justify-between font-mono text-xs overflow-hidden z-10 lg:ml-4">
          <div>
            <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-[#30363d]">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#ff5f56]" />
                  <span className="w-2 h-2 rounded-full bg-[#ffbd2e]" />
                  <span className="w-2 h-2 rounded-full bg-[#27c93f]" />
                </div>
                <span className="text-[10.5px] text-[#8b949e] font-semibold truncate">
                  alex/actions.log
                </span>
              </div>
              <span className="text-[8.5px] px-1.5 py-0.5 rounded font-bold uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                Action Tracer
              </span>
            </div>

            {/* Hierarchical Execution Tree */}
            <div className="space-y-1.5 leading-relaxed text-[11px]">
              <div className={`transition-opacity duration-300 ${step >= 2 ? "opacity-100 text-white font-semibold" : "opacity-30"}`}>
                Searching for weekly report in drive
              </div>
              <div className={`pl-2 transition-opacity duration-300 text-emerald-400 ${step >= 2 ? "opacity-100" : "opacity-20"}`}>
                |__ Mapping existing folder structure
              </div>
              <div className={`pl-2 transition-opacity duration-300 text-emerald-400 ${step >= 2 ? "opacity-100" : "opacity-20"}`}>
                |__ Searching for &quot;weekly_report&quot;
              </div>
              <div className={`pl-2 transition-opacity duration-300 text-emerald-400 ${step >= 2 ? "opacity-100 font-semibold" : "opacity-20"}`}>
                |__ Found weekly report
              </div>

              <div className={`pt-1.5 transition-opacity duration-300 ${step >= 3 ? "opacity-100 text-white font-semibold" : "opacity-30"}`}>
                Summarizing report
              </div>
              <div className={`pl-2 transition-opacity duration-300 text-cyan-400 ${step >= 3 ? "opacity-100" : "opacity-20"}`}>
                |__ Extracting main ideas
              </div>
              <div className={`pl-2 transition-opacity duration-300 text-cyan-400 ${step >= 3 ? "opacity-100" : "opacity-20"}`}>
                |__ Finding points of actions
              </div>
              <div className={`pl-2 transition-opacity duration-300 text-cyan-400 ${step >= 4 ? "opacity-100 font-semibold" : "opacity-20"}`}>
                |__ Drafting report
              </div>

              <div className={`pt-1.5 transition-opacity duration-300 ${step >= 4 ? "opacity-100 text-white font-semibold" : "opacity-30"}`}>
                Sending report
              </div>
              <div className={`pl-2 transition-opacity duration-300 text-amber-400 ${step >= 5 ? "opacity-100 font-semibold" : "opacity-20"}`}>
                |__ Dispatched via SendGrid to john@corp.com
              </div>

              {/* Blinking Cursor */}
              <div className="pt-1 flex items-center text-emerald-400">
                <span className="font-bold">|</span>
                <span className="w-1.5 h-3 bg-emerald-400 animate-pulse ml-0.5 inline-block" />
              </div>
            </div>
          </div>

          {/* Bottom Telemetry */}
          <div className="pt-2 mt-2 border-t border-[#30363d] flex items-center justify-between text-[9.5px] text-[#8b949e]">
            <span>Latency: 11.4ms</span>
            <span>UniLLM: Claude 3.5</span>
          </div>
        </div>
      </div>

      {/* =================================================================== */}
      {/* Visual Controls Footer                                             */}
      {/* =================================================================== */}
      <div className="mt-3 pt-2.5 border-t border-[var(--border)] flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-2 text-[var(--muted)] text-[11px]">
          <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
          <span>Interactive Looping Simulation · Third-Party Omnichannel Connectors</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Step Scrubbers */}
          <div className="flex items-center gap-1 bg-[var(--muted-bg)] p-1 rounded-lg border border-[var(--border)]">
            {[0, 1, 2, 3, 4, 5].map((s) => (
              <button
                key={s}
                onClick={() => setStep(s)}
                className={`w-5 h-5 rounded flex items-center justify-center text-[10px] transition-all ${
                  step === s
                    ? "bg-emerald-600 text-white font-bold"
                    : "text-[var(--muted)] hover:text-[var(--foreground)]"
                }`}
              >
                {s + 1}
              </button>
            ))}
          </div>

          {/* Play / Pause */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-[var(--border)] bg-[var(--card)] hover:bg-[var(--muted-bg)] text-[var(--foreground)] text-xs transition-colors"
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 text-emerald-500" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-[var(--muted)]" />
                <span>Play</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Custom Styles for Background Marquee */}
      <style jsx>{`
        @keyframes slideLeft {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @keyframes slideRight {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0%);
          }
        }
        .animate-slide-left {
          animation: slideLeft 30s linear infinite;
        }
        .animate-slide-right {
          animation: slideRight 34s linear infinite;
        }
      `}</style>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Card Background SVG for Grid View
// -----------------------------------------------------------------------------
export function getTeammatesCardSvg(): string {
  return `<svg viewBox="0 0 320 180" class="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="teammate-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#10b981" stop-opacity="0.25"/>
        <stop offset="100%" stop-color="#06b6d4" stop-opacity="0.08"/>
      </linearGradient>
    </defs>
    <path d="M10 90 L310 90 M160 10 L160 170 M40 30 L280 150 M40 150 L280 30" stroke="currentColor" stroke-opacity="0.1" stroke-width="1" stroke-dasharray="4 4" />
    <rect x="110" y="30" width="100" height="120" rx="10" fill="url(#teammate-grad)" stroke="#10b981" stroke-width="1.5" stroke-opacity="0.6"/>
    <rect x="110" y="30" width="100" height="35" rx="10" fill="#10b981" fill-opacity="0.3"/>
    <circle cx="160" cy="65" r="18" fill="currentColor" fill-opacity="0.1" stroke="#10b981" stroke-width="2"/>
    <text x="160" y="105" text-anchor="middle" font-family="sans-serif" font-size="9" font-weight="700" fill="#10b981">ALEX RIVERA</text>
    <text x="160" y="118" text-anchor="middle" font-family="monospace" font-size="7" fill="currentColor" fill-opacity="0.7">AI TEAMMATE</text>
    
    <rect x="20" y="55" width="75" height="40" rx="8" fill="currentColor" fill-opacity="0.05" stroke="#10b981" stroke-width="1" stroke-opacity="0.4"/>
    <text x="30" y="73" font-family="monospace" font-size="6.5" fill="currentColor" fill-opacity="0.8">Task Ingress</text>
    <text x="30" y="84" font-family="monospace" font-size="5.5" fill="#10b981">Omnichannel</text>
    <line x1="95" y1="75" x2="110" y2="75" stroke="#10b981" stroke-width="1.2" stroke-opacity="0.5"/>

    <rect x="225" y="55" width="75" height="50" rx="8" fill="currentColor" fill-opacity="0.05" stroke="#06b6d4" stroke-width="1" stroke-opacity="0.4"/>
    <text x="235" y="73" font-family="monospace" font-size="6.5" fill="currentColor" fill-opacity="0.8">Action Tracer</text>
    <text x="235" y="84" font-family="monospace" font-size="5.5" fill="#06b6d4">Tool Sandbox</text>
    <line x1="210" y1="75" x2="225" y2="75" stroke="#06b6d4" stroke-width="1.2" stroke-opacity="0.5"/>

    <circle class="teammate-flow-pulse-in" cx="95" cy="75" r="2.6" fill="#34d399" stroke="#d1fae5" stroke-width="0.8" opacity="0"/>
    <circle class="teammate-flow-pulse-out" cx="210" cy="75" r="2.6" fill="#22d3ee" stroke="#cffafe" stroke-width="0.8" opacity="0"/>
  </svg>`;
}
