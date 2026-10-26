"use client";

import React, { useState, useEffect } from "react";
import {
  Mic,
  Volume2,
  Cpu,
  Workflow,
  FileText,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
} from "lucide-react";

interface TurnScenario {
  id: string;
  userPrompt: string;
  agentResponse: string;
  visemes: string[];
}

const TURNS: TurnScenario[] = [
  {
    id: "interpolation",
    userPrompt: "Hello, walk me through the architecture...",
    agentResponse: "The boundary frames lock to reference photo...",
    visemes: ["/aa/", "/oh/", "/ee/"],
  },
  {
    id: "latency",
    userPrompt: "How is glass-to-glass latency under 180ms?",
    agentResponse: "Asyncio orchestrates STT, token chunking, and video...",
    visemes: ["/ee/", "/aa/", "/oh/"],
  },
  {
    id: "zeroshot",
    userPrompt: "Can any static portrait be driven zero-shot?",
    agentResponse: "Yes, landmark deformation operates without training...",
    visemes: ["/oh/", "/aa/", "/mm/"],
  },
];

export function CustomAvatarVisual() {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [activeStage, setActiveStage] = useState<number>(3);
  const [turnIdx, setTurnIdx] = useState<number>(0);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const currentTurn = TURNS[turnIdx];

  // Auto cycle active stage in top pipeline
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setActiveStage((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(timer);
  }, [isPlaying]);

  return (
    <div className="w-full rounded-[14px] border border-[var(--border)] bg-[var(--card)] shadow-lg overflow-hidden font-sans select-none text-[var(--foreground)] transition-colors">
      {/* 1. TOP HEADER & CONTROLS */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 border-b border-[var(--border)] bg-[var(--muted-bg)]/60">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/25 text-[11px] font-mono font-semibold text-emerald-600 dark:text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>STREAMING SEQUENCE EXPLAINER</span>
          </div>
          <span className="text-[11px] font-mono text-[var(--muted)]">
            Reference-Bounded Continuous Video Stream
          </span>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2 text-xs font-mono">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md border text-xs transition-colors cursor-pointer ${
              isPlaying
                ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300 font-semibold"
                : "bg-[var(--card)] border-[var(--border)] text-[var(--muted)] hover:text-[var(--foreground)]"
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3 h-3 text-emerald-500" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3 text-emerald-500" />
                <span>Play</span>
              </>
            )}
          </button>

          <button
            onClick={() => setTurnIdx((prev) => (prev + 1) % TURNS.length)}
            className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-[var(--card)] hover:bg-[var(--card-hover)] border border-[var(--border)] text-xs text-[var(--foreground)] transition-colors cursor-pointer shadow-2xs"
            title="Cycle Scenario"
          >
            <RotateCcw className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
            <span>Cycle</span>
          </button>
        </div>
      </div>

      {/* 2. MAIN VISUAL CANVAS */}
      <div className="p-4 sm:p-6 md:p-8 bg-[var(--muted-bg)]/20 space-y-6 sm:space-y-8">
        
        {/* ========================================================================= */}
        {/* ROW 1: MULTIMODAL DRIVING PIPELINE (AUDIO ➔ VISEMES)                      */}
        {/* ========================================================================= */}
        <div className="p-3.5 sm:p-4 rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono mb-3">
            <span className="flex items-center gap-1.5 font-bold text-[var(--foreground)] tracking-wider">
              <Workflow className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              MULTIMODAL DRIVING PIPELINE (AUDIO ➔ VISEMES)
            </span>
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold text-[10px]">
              Asyncio WebRTC Loop (&lt; 180ms)
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 text-xs font-mono">
            {/* 1. User Speech */}
            <div
              onMouseEnter={() => setHoveredNode("user-speech")}
              onMouseLeave={() => setHoveredNode(null)}
              className={`p-2.5 rounded-xl border transition-all ${
                activeStage === 0 || hoveredNode === "user-speech"
                  ? "border-amber-500 bg-amber-500/10 shadow-xs ring-1 ring-amber-500/30"
                  : "border-[var(--border)] bg-[var(--muted-bg)]/30"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1 text-[11px]">
                  <Mic className="w-3 h-3" />
                  1. User Speech
                </span>
              </div>
              <div className="text-[10px] text-[var(--muted)] mb-2">16kHz PCM Stream</div>
              {/* Waveform bars */}
              <div className="flex items-center gap-1 h-3.5">
                {[0.4, 0.9, 0.6, 1.0, 0.7, 0.5, 0.8, 0.6].map((h, i) => (
                  <div
                    key={i}
                    style={{ height: `${h * 14}px` }}
                    className="flex-1 rounded-full bg-amber-500 transition-all duration-150"
                  />
                ))}
              </div>
            </div>

            {/* 2. STT (Deepgram) */}
            <div
              onMouseEnter={() => setHoveredNode("stt")}
              onMouseLeave={() => setHoveredNode(null)}
              className={`p-2.5 rounded-xl border transition-all ${
                activeStage === 1 || hoveredNode === "stt"
                  ? "border-yellow-500 bg-yellow-500/10 shadow-xs ring-1 ring-yellow-500/30"
                  : "border-[var(--border)] bg-[var(--muted-bg)]/30"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-yellow-600 dark:text-yellow-400 flex items-center gap-1 text-[11px]">
                  <FileText className="w-3 h-3" />
                  2. STT (Deepgram)
                </span>
              </div>
              <div className="text-[10px] text-[var(--muted)] mb-1">Streaming Text</div>
              <div className="text-[10px] font-mono text-[var(--foreground)] truncate bg-[var(--card)] px-2 py-1 rounded border border-[var(--border)]">
                &quot;{currentTurn.userPrompt}&quot;
              </div>
            </div>

            {/* 3. LLM (OpenAI) */}
            <div
              onMouseEnter={() => setHoveredNode("llm")}
              onMouseLeave={() => setHoveredNode(null)}
              className={`p-2.5 rounded-xl border transition-all ${
                activeStage === 2 || hoveredNode === "llm"
                  ? "border-emerald-500 bg-emerald-500/10 shadow-xs ring-1 ring-emerald-500/30"
                  : "border-[var(--border)] bg-[var(--muted-bg)]/30"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 text-[11px]">
                  <Cpu className="w-3 h-3" />
                  3. LLM (OpenAI)
                </span>
              </div>
              <div className="text-[10px] text-[var(--muted)] mb-1">Sentence Chunks</div>
              <div className="text-[10px] font-mono text-[var(--foreground)] truncate bg-[var(--card)] px-2 py-1 rounded border border-[var(--border)]">
                &quot;{currentTurn.agentResponse}&quot;
              </div>
            </div>

            {/* 4. TTS (ElevenLabs) */}
            <div
              onMouseEnter={() => setHoveredNode("tts")}
              onMouseLeave={() => setHoveredNode(null)}
              className={`p-2.5 rounded-xl border transition-all ${
                activeStage === 3 || hoveredNode === "tts"
                  ? "border-cyan-500 bg-cyan-500/10 shadow-xs ring-1 ring-cyan-500/30"
                  : "border-[var(--border)] bg-[var(--muted-bg)]/30"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-cyan-600 dark:text-cyan-400 flex items-center gap-1 text-[11px]">
                  <Volume2 className="w-3 h-3" />
                  4. TTS (ElevenLabs)
                </span>
              </div>
              <div className="text-[10px] text-[var(--muted)] mb-1">Visemes + 48kHz Audio</div>
              <div className="flex items-center gap-1 text-[9.5px] font-mono text-cyan-600 dark:text-cyan-400">
                {currentTurn.visemes.map((v, i) => (
                  <span key={i} className="px-1.5 py-0.5 rounded bg-cyan-500/15 border border-cyan-500/25">
                    {v}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* ROW 2: THE 5-FRAME SEQUENCE STREAM (CENTER VIDEO CLIP + BOUNDARY FRAMES)  */}
        {/* ========================================================================= */}
        <div className="flex items-center justify-center overflow-x-auto py-2 px-1">
          <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 min-w-[680px]">
            
            {/* FRAME 1 (EXTENDED LEFT): PRECEDING SEQUENCE (CHUNK N-1) */}
            <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 aspect-square rounded-2xl overflow-hidden bg-zinc-950 border border-[var(--border)]/70 shadow-xs shrink-0 opacity-70 hover:opacity-100 transition-opacity">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/animated-ai-avatar-reference.jpg"
                alt="Chunk N-1 Reference"
                onError={(e) => {
                  e.currentTarget.src = "/images/alex_rivera_avatar.png";
                }}
                className="w-full h-full object-cover"
              />
            </div>

            {/* FRAME 2: F₀ (START) - REFERENCE CONDITIONED */}
            <div className="relative w-32 h-32 sm:w-36 sm:h-36 md:w-44 md:h-44 aspect-square rounded-2xl overflow-hidden border-2.5 border-emerald-500 bg-zinc-950 shadow-md shrink-0 flex flex-col justify-between p-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/animated-ai-avatar-reference.jpg"
                alt="F_0 (Start)"
                onError={(e) => {
                  e.currentTarget.src = "/images/alex_rivera_avatar.png";
                }}
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Top Badges */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="px-2 py-0.5 rounded bg-emerald-500 text-white font-mono text-[9px] font-bold shadow-xs">
                  F₀ (Start)
                </span>
                <span className="px-1.5 py-0.5 rounded bg-black/70 text-white font-mono text-[8px]">
                  00:00
                </span>
              </div>

              {/* Bottom Badge */}
              <div className="relative z-10">
                <div className="px-2 py-0.5 rounded bg-black/80 backdrop-blur-xs text-[8.5px] font-mono text-emerald-400 font-medium text-center">
                  Conditioned on Ref Image
                </div>
              </div>
            </div>

            {/* FRAME 3 (HERO CENTER): TALKING VIDEO CLIP (LARGER & PROMINENT) */}
            <div className="relative w-44 h-44 sm:w-56 sm:h-56 md:w-64 md:h-64 aspect-square rounded-3xl overflow-hidden border-3 border-cyan-500 bg-zinc-950 shadow-xl shrink-0 flex flex-col justify-between p-2.5 z-10">
              <video
                src="/videos/animated-ai-avatar-clip.mp4"
                autoPlay
                loop
                muted
                playsInline
                poster="/images/animated-ai-avatar-reference.jpg"
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Top Badges */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-lg bg-cyan-500 text-white font-mono text-[10px] font-bold shadow-xs">
                  Talking Clip
                </span>
                <span className="px-2 py-0.5 rounded-lg bg-red-500 text-white font-mono text-[9px] font-bold animate-pulse shadow-xs">
                  LIVE
                </span>
              </div>

              {/* Bottom Audio Motion Badge */}
              <div className="relative z-10">
                <div className="px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-xs text-[9.5px] font-mono text-cyan-300 font-semibold text-center border border-white/10 shadow-xs">
                  Audio-Driven Facial Motion
                </div>
              </div>
            </div>

            {/* FRAME 4: F_last (END) - REFERENCE CONDITIONED */}
            <div className="relative w-32 h-32 sm:w-36 sm:h-36 md:w-44 md:h-44 aspect-square rounded-2xl overflow-hidden border-2.5 border-purple-500 bg-zinc-950 shadow-md shrink-0 flex flex-col justify-between p-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/animated-ai-avatar-reference.jpg"
                alt="F_last (End)"
                onError={(e) => {
                  e.currentTarget.src = "/images/alex_rivera_avatar.png";
                }}
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Top Badges */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="px-2 py-0.5 rounded bg-purple-500 text-white font-mono text-[9px] font-bold shadow-xs">
                  F_last (End)
                </span>
                <span className="px-1.5 py-0.5 rounded bg-black/70 text-white font-mono text-[8px]">
                  00:30
                </span>
              </div>

              {/* Bottom Badge */}
              <div className="relative z-10">
                <div className="px-2 py-0.5 rounded bg-black/80 backdrop-blur-xs text-[8.5px] font-mono text-purple-400 font-medium text-center">
                  Conditioned on Ref Image
                </div>
              </div>
            </div>

            {/* FRAME 5 (EXTENDED RIGHT): SUBSEQUENT SEQUENCE (CHUNK N+1) */}
            <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 aspect-square rounded-2xl overflow-hidden bg-zinc-950 border border-[var(--border)]/70 shadow-xs shrink-0 opacity-70 hover:opacity-100 transition-opacity">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/animated-ai-avatar-reference.jpg"
                alt="Chunk N+1 Reference"
                onError={(e) => {
                  e.currentTarget.src = "/images/alex_rivera_avatar.png";
                }}
                className="w-full h-full object-cover"
              />
            </div>

          </div>
        </div>

        {/* ========================================================================= */}
        {/* ROW 3: FOOTNOTE EXPLAINER ON SEQUENCE CONTINUITY                          */}
        {/* ========================================================================= */}
        <div className="p-3 rounded-xl border border-emerald-500/30 bg-emerald-500/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span className="text-[var(--foreground)]">
              <strong>Seamless Sequence Bounding:</strong> The active video clip is conditioned on the reference portrait at both boundary edges (<code className="text-emerald-600 dark:text-emerald-400">F₀</code> and <code className="text-purple-600 dark:text-purple-400">F_last</code>), guaranteeing continuous chunk transitions with 0 seam jitter across conversational speech turns.
            </span>
          </div>
          <div className="px-2.5 py-1 rounded bg-[var(--card)] border border-[var(--border)] text-[10px] text-emerald-600 dark:text-emerald-400 font-bold shrink-0">
            Zero Seam Jitter
          </div>
        </div>

      </div>

      {/* 3. CAPTION FOOTER */}
      <div className="px-4 py-2.5 border-t border-[var(--border)] bg-[var(--muted-bg)]/40 flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-[var(--muted)]">
        <div>
          <span>Reference-Bounded Sequence Generation · User Speech ➔ Deepgram STT ➔ OpenAI LLM ➔ ElevenLabs TTS ➔ Replicate Video Stream</span>
        </div>
        <div>
          <span>Python · asyncio · WebRTC · Pydantic</span>
        </div>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Card Background SVG for Grid View
// -----------------------------------------------------------------------------
export function getAvatarCardSvg(): string {
  return `<svg viewBox="0 0 320 180" class="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="avatar-clip-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#06b6d4" stop-opacity="0.35"/>
        <stop offset="100%" stop-color="#10b981" stop-opacity="0.15"/>
      </linearGradient>
    </defs>
    
    <!-- Top Row: Multimodal Pipeline Mini-Ribbon -->
    <rect x="20" y="16" width="280" height="26" rx="5" fill="currentColor" fill-opacity="0.04" stroke="currentColor" stroke-opacity="0.2" stroke-width="1"/>
    <rect class="avatar-pipeline-stage" x="26" y="21" width="60" height="16" rx="3" fill="#f59e0b" fill-opacity="0.15"/>
    <text x="56" y="32" font-family="monospace" font-size="4.5" fill="#f59e0b" text-anchor="middle" font-weight="bold">1. Speech</text>
    
    <rect class="avatar-pipeline-stage" x="94" y="21" width="60" height="16" rx="3" fill="#eab308" fill-opacity="0.15"/>
    <text x="124" y="32" font-family="monospace" font-size="4.5" fill="#eab308" text-anchor="middle" font-weight="bold">2. STT</text>
    
    <rect class="avatar-pipeline-stage" x="162" y="21" width="60" height="16" rx="3" fill="#10b981" fill-opacity="0.15"/>
    <text x="192" y="32" font-family="monospace" font-size="4.5" fill="#10b981" text-anchor="middle" font-weight="bold">3. LLM</text>
    
    <rect class="avatar-pipeline-stage" x="230" y="21" width="64" height="16" rx="3" fill="#06b6d4" fill-opacity="0.15"/>
    <text x="262" y="32" font-family="monospace" font-size="4.5" fill="#06b6d4" text-anchor="middle" font-weight="bold">4. TTS</text>

    <!-- Bottom Row: 5-Frame Sequence Reel -->
    <!-- Frame 1 (Leftmost Preceding) -->
    <rect x="15" y="70" width="46" height="46" rx="6" fill="currentColor" fill-opacity="0.06" stroke="currentColor" stroke-opacity="0.2" stroke-width="1" opacity="0.6"/>
    <circle cx="38" cy="90" r="10" stroke="currentColor" stroke-opacity="0.3" stroke-width="0.8" fill="none"/>

    <!-- Frame 2: F_0 (Start - Emerald) -->
    <rect x="68" y="62" width="56" height="56" rx="8" fill="currentColor" fill-opacity="0.08" stroke="#10b981" stroke-width="1.8"/>
    <circle cx="96" cy="86" r="12" stroke="#10b981" stroke-width="1" fill="none"/>
    <rect x="74" y="66" width="22" height="7" rx="2" fill="#10b981"/>
    <text x="85" y="71.5" font-family="monospace" font-size="4" fill="#ffffff" text-anchor="middle" font-weight="bold">F_0</text>

    <!-- Frame 3 (Center Hero: Talking Clip - Cyan) -->
    <rect x="131" y="52" width="70" height="70" rx="10" fill="url(#avatar-clip-grad)" stroke="#06b6d4" stroke-width="2.2"/>
    <circle cx="166" cy="82" r="16" stroke="#06b6d4" stroke-width="1.2" fill="none"/>
    <!-- Talking mouth -->
    <path d="M 160 88 Q 166 93 172 88" stroke="#06b6d4" stroke-width="1.5" stroke-linecap="round" fill="none"/>
    <rect x="137" y="58" width="30" height="8" rx="2" fill="#06b6d4"/>
    <text x="152" y="64" font-family="monospace" font-size="4.5" fill="#ffffff" text-anchor="middle" font-weight="bold">CLIP</text>
    <rect x="178" y="58" width="16" height="8" rx="2" fill="#ef4444"/>
    <text x="186" y="64" font-family="monospace" font-size="4" fill="#ffffff" text-anchor="middle" font-weight="bold">LIVE</text>

    <!-- Frame 4: F_last (End - Purple) -->
    <rect x="208" y="62" width="56" height="56" rx="8" fill="currentColor" fill-opacity="0.08" stroke="#8b5cf6" stroke-width="1.8"/>
    <circle cx="236" cy="86" r="12" stroke="#8b5cf6" stroke-width="1" fill="none"/>
    <rect x="214" y="66" width="26" height="7" rx="2" fill="#8b5cf6"/>
    <text x="227" y="71.5" font-family="monospace" font-size="4" fill="#ffffff" text-anchor="middle" font-weight="bold">F_last</text>

    <!-- Frame 5 (Rightmost Subsequent) -->
    <rect x="271" y="70" width="46" height="46" rx="6" fill="currentColor" fill-opacity="0.06" stroke="currentColor" stroke-opacity="0.2" stroke-width="1" opacity="0.6"/>
    <circle cx="294" cy="90" r="10" stroke="currentColor" stroke-opacity="0.3" stroke-width="0.8" fill="none"/>
  </svg>`;
}
