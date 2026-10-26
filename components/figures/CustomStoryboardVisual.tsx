"use client";

import React, { useState, useRef } from "react";
import {
  Film,
  Sparkles,
  Play,
  Pause,
  RotateCcw,
  VolumeX,
  Layers,
} from "lucide-react";

interface StoryboardFrame {
  id: number;
  src: string;
  label: string;
  timestamp: number;
  title: string;
  subtitle: string;
}

const FRAMES: StoryboardFrame[] = [
  {
    id: 1,
    src: "/images/storyboard-frame-1.jpg",
    label: "Keyframe 01",
    timestamp: 0.0,
    title: "Establishing Keyframe",
    subtitle: "Hero character turnaround & initial camera pose",
  },
  {
    id: 2,
    src: "/images/storyboard-frame-2.jpg",
    label: "Keyframe 02",
    timestamp: 1.6,
    title: "Motion Trajectory",
    subtitle: "Cinematic camera translation & continuity",
  },
  {
    id: 3,
    src: "/images/storyboard-frame-3.jpg",
    label: "Keyframe 03",
    timestamp: 3.2,
    title: "Dynamic Focal Shift",
    subtitle: "Action beat execution & lighting consistency",
  },
  {
    id: 4,
    src: "/images/storyboard-frame-4.jpg",
    label: "Keyframe 04",
    timestamp: 4.8,
    title: "Sequence Resolution",
    subtitle: "Pacing cadence & temporal wrap to final cut",
  },
];

export function CustomStoryboardVisual() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(6.33);
  const [activeFrameId, setActiveFrameId] = useState<number>(1);

  // Time update listener from the video element
  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const time = videoRef.current.currentTime;
    setCurrentTime(time);

    // Map 6.33s video runtime across the 4 storyboard keyframes
    if (time < 1.6) {
      setActiveFrameId(1);
    } else if (time < 3.2) {
      setActiveFrameId(2);
    } else if (time < 4.8) {
      setActiveFrameId(3);
    } else {
      setActiveFrameId(4);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current && videoRef.current.duration) {
      setDuration(videoRef.current.duration);
    }
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const seekToFrame = (frame: StoryboardFrame) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = frame.timestamp;
    setActiveFrameId(frame.id);
    if (!isPlaying) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const resetPlayback = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    setActiveFrameId(1);
    videoRef.current.play();
    setIsPlaying(true);
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="w-full rounded-[14px] border border-[var(--border)] bg-[var(--card)] shadow-xl overflow-hidden font-sans select-none text-[var(--foreground)] transition-colors">
      
      {/* 1. TOP STATUS HEADER */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-3 border-b border-[var(--border)] bg-[var(--muted-bg)]/60">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono font-semibold text-emerald-600 dark:text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>STORYBOARD-TO-VIDEO PIPELINE</span>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-[var(--muted)]">
            <span className="px-2 py-0.5 rounded bg-[var(--card)] border border-[var(--border)] text-[var(--foreground)] font-semibold shadow-2xs">
              1280x720 · 16:9
            </span>
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
              4-Frame Scaffolding ➔ Video Render
            </span>
          </div>
        </div>

        {/* Video Controls & Sound Status */}
        <div className="flex items-center gap-2 text-xs font-mono">
          <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-[var(--card)] border border-[var(--border)] text-[var(--muted)] text-[11px]">
            <VolumeX className="w-3.5 h-3.5 text-zinc-400" />
            <span>Silent Loop</span>
          </div>

          <button
            onClick={resetPlayback}
            className="p-1.5 rounded-md border border-[var(--border)] bg-[var(--card)] hover:text-emerald-500 transition-colors cursor-pointer"
            title="Reset to Start"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={togglePlay}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md border text-xs transition-colors cursor-pointer ${
              isPlaying
                ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300 font-semibold"
                : "bg-[var(--card)] border-[var(--border)] text-[var(--muted)] hover:text-[var(--foreground)]"
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 text-emerald-500" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-emerald-500" />
                <span>Play</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 2. MAIN MEDIA WORKSPACE: FRAMES STACKED VERTICALLY ON LEFT, VIDEO ON RIGHT */}
      <div className="p-4 sm:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
          
          {/* LEFT: 4 STORYBOARD FRAMES STACKED VERTICALLY (5 COLS) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-2.5">
            <div className="flex items-center justify-between text-xs font-mono text-[var(--muted)] px-1 mb-0.5">
              <span className="flex items-center gap-1.5 font-bold text-[var(--foreground)] uppercase text-[11px]">
                <Layers className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                Input Storyboard Keyframes
              </span>
              <span className="text-[10px] text-[var(--muted)]">Click to seek</span>
            </div>

            {FRAMES.map((frame) => {
              const isActive = activeFrameId === frame.id;
              return (
                <div
                  key={frame.id}
                  onClick={() => seekToFrame(frame)}
                  className={`group relative rounded-xl border p-2 flex items-center gap-3 transition-all duration-200 cursor-pointer overflow-hidden ${
                    isActive
                      ? "border-emerald-500 ring-2 ring-emerald-500/40 bg-emerald-500/10 dark:bg-emerald-500/15 shadow-md scale-[1.01]"
                      : "border-[var(--border)] bg-[var(--card)] hover:border-emerald-500/40 hover:bg-[var(--card-hover)] opacity-75 hover:opacity-100"
                  }`}
                >
                  {/* Thumbnail */}
                  <div className="relative w-28 sm:w-32 aspect-video rounded-lg overflow-hidden shrink-0 bg-zinc-950 border border-black/10">
                    <img
                      src={frame.src}
                      alt={frame.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-1 left-1 px-1.5 py-0.2 rounded bg-black/75 backdrop-blur-xs text-[8.5px] font-mono text-white/90 font-semibold">
                      {frame.label.split(" ")[1]}
                    </div>
                    {isActive && (
                      <div className="absolute inset-0 border-2 border-emerald-500 pointer-events-none" />
                    )}
                  </div>

                  {/* Frame Details */}
                  <div className="min-w-0 flex-1 space-y-0.5">
                    <div className="flex items-center justify-between text-[10px] font-mono">
                      <span
                        className={`font-bold flex items-center gap-1 ${
                          isActive ? "text-emerald-600 dark:text-emerald-400" : "text-[var(--foreground)]"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            isActive ? "bg-emerald-500 animate-pulse" : "bg-[var(--border)]"
                          }`}
                        />
                        {frame.label}
                      </span>
                      <span
                        className={`text-[9.5px] font-mono ${
                          isActive ? "text-emerald-600 dark:text-emerald-400 font-semibold" : "text-[var(--muted)]"
                        }`}
                      >
                        00:0{Math.floor(frame.timestamp)}.0
                      </span>
                    </div>

                    <div className="font-semibold text-xs text-[var(--foreground)] truncate">
                      {frame.title}
                    </div>
                    <p className="text-[10px] text-[var(--muted)] font-sans leading-tight line-clamp-1">
                      {frame.subtitle}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* RIGHT: GENERATED DIFFUSION VIDEO (7 COLS) */}
          <div className="lg:col-span-7 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-[var(--muted)] px-1">
              <span className="flex items-center gap-1.5 font-bold text-[var(--foreground)] uppercase text-[11px]">
                <Film className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                Generated Video (storyboard-animation.mp4)
              </span>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
                00:0{Math.floor(currentTime)}.{Math.floor((currentTime % 1) * 10)} / 00:0{Math.floor(duration)}.0
              </span>
            </div>

            {/* Video Container */}
            <div className="relative aspect-video w-full rounded-[14px] overflow-hidden border border-[var(--border)] bg-zinc-950 shadow-2xl group flex items-center justify-center">
              <video
                ref={videoRef}
                src="/videos/storyboard-animation.mp4"
                autoPlay
                loop
                muted
                playsInline
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                className="w-full h-full object-cover"
              />

              {/* Top-Left Live HUD Badge */}
              <div className="absolute top-3 left-3 flex items-center gap-2 pointer-events-none">
                <span className="px-2.5 py-0.5 rounded-full bg-black/75 backdrop-blur-md border border-white/10 text-[10px] font-mono text-emerald-400 font-semibold flex items-center gap-1.5 shadow-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  Diffusion Video Output
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[9px] font-mono text-zinc-300">
                  1280x720 · 24fps
                </span>
              </div>

              {/* Bottom Scrubber Timeline */}
              <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none">
                <div className="w-full h-1.5 rounded-full bg-white/20 overflow-hidden relative">
                  <div
                    className="h-full bg-emerald-500 rounded-full transition-all duration-100 ease-linear"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 3. FOOTER STATUS BAR */}
      <div className="px-4 sm:px-6 py-2.5 border-t border-[var(--border)] bg-[var(--muted-bg)]/40 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-[var(--muted)]">
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>
            Pipeline: <strong className="text-[var(--foreground)]">4-Frame Scaffolding</strong> ➔ <strong className="text-[var(--foreground)]">OpenRouter Video API</strong> ➔ <strong className="text-[var(--foreground)]">Deterministic Continuous Stream</strong>
          </span>
        </div>
        <div className="flex items-center gap-3 text-[10px]">
          <span>Resolution: 1280x720</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-bold">Turnaround: 4.2 Min</span>
        </div>
      </div>
    </div>
  );
}

// Background SVG for InfiniteGridHero Card
export function getStoryboardCardSvg(): string {
  return `<svg viewBox="0 0 320 180" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" fill="none">
    <defs>
      <linearGradient id="story-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#10b981" stop-opacity="0.25"/>
        <stop offset="100%" stop-color="#8b5cf6" stop-opacity="0.10"/>
      </linearGradient>
    </defs>
    
    <!-- Outer dashed grid -->
    <path d="M 10 90 L 310 90 M 110 10 L 110 170" stroke="currentColor" stroke-opacity="0.1" stroke-width="1.2" stroke-dasharray="4 4"/>
    
    <!-- Left: Story Beats & Reference Sheets Wireframe -->
    <rect x="18" y="22" width="80" height="136" rx="8" fill="currentColor" fill-opacity="0.04" stroke="#10b981" stroke-width="1" stroke-opacity="0.4"/>
    <rect x="24" y="30" width="68" height="14" rx="3" fill="#10b981" fill-opacity="0.2"/>
    <text x="28" y="40" font-family="monospace" font-size="5" font-weight="bold" fill="#10b981">story.json</text>
    
    <rect x="24" y="50" width="68" height="24" rx="3" fill="currentColor" fill-opacity="0.06"/>
    <text x="28" y="60" font-family="monospace" font-size="4.5" fill="currentColor" fill-opacity="0.7">characters.png</text>
    <text x="28" y="68" font-family="monospace" font-size="3.5" fill="#10b981">identity anchor</text>

    <rect x="24" y="80" width="68" height="20" rx="3" fill="currentColor" fill-opacity="0.06"/>
    <text x="28" y="90" font-family="monospace" font-size="4.5" fill="currentColor" fill-opacity="0.7">locations.png</text>

    <rect x="24" y="106" width="68" height="20" rx="3" fill="currentColor" fill-opacity="0.06"/>
    <text x="28" y="116" font-family="monospace" font-size="4.5" fill="currentColor" fill-opacity="0.7">props.png</text>

    <!-- Right: 4-Panel Contact Sheet Storyboard -->
    <rect x="118" y="22" width="184" height="136" rx="8" fill="url(#story-grad)" stroke="#8b5cf6" stroke-width="1" stroke-opacity="0.4"/>
    <text x="126" y="34" font-family="monospace" font-size="5" font-weight="bold" fill="#8b5cf6">MASTER ATLAS (chunk_01.png)</text>

    <!-- 4 Storyboard Panels -->
    <rect class="storyboard-panel" x="126" y="42" width="80" height="48" rx="4" fill="currentColor" fill-opacity="0.08" stroke="#10b981" stroke-width="0.8"/>
    <text x="132" y="52" font-family="monospace" font-size="4.5" fill="#10b981">Panel 1 (Close-up)</text>

    <rect class="storyboard-panel" x="214" y="42" width="80" height="48" rx="4" fill="currentColor" fill-opacity="0.08" stroke="currentColor" stroke-opacity="0.2" stroke-width="0.8"/>
    <text x="220" y="52" font-family="monospace" font-size="4.5" fill="currentColor" fill-opacity="0.6">Panel 2 (Dashboard)</text>

    <rect class="storyboard-panel" x="126" y="98" width="80" height="48" rx="4" fill="currentColor" fill-opacity="0.08" stroke="currentColor" stroke-opacity="0.2" stroke-width="0.8"/>
    <text x="132" y="108" font-family="monospace" font-size="4.5" fill="currentColor" fill-opacity="0.6">Panel 3 (Droid Fix)</text>

    <rect class="storyboard-panel" x="214" y="98" width="80" height="48" rx="4" fill="currentColor" fill-opacity="0.08" stroke="#8b5cf6" stroke-width="0.8"/>
    <text x="220" y="108" font-family="monospace" font-size="4.5" fill="#8b5cf6">Panel 4 (Resolved)</text>

    <!-- Linking arrow -->
    <path d="M 98 90 L 118 90" stroke="#10b981" stroke-width="1.2" stroke-dasharray="2 2"/>
  </svg>`;
}
