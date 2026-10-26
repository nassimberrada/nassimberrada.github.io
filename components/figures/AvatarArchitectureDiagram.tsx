"use client";

import React from "react";

export function AvatarArchitectureDiagram() {
  return (
    <div className="w-full my-6 rounded-[14px] border border-[var(--border)] bg-[var(--card)] p-4 sm:p-6 shadow-sm overflow-hidden select-none">
      {/* Schematic Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b border-[var(--border)]">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--foreground)]">
            Real-Time Avatar Animation — Asyncio &amp; Third-Party API Orchestration
          </span>
        </div>
        <span className="text-[10px] font-mono text-[var(--muted)]">
          WebRTC · Deepgram STT · OpenAI LLM · ElevenLabs TTS · Replicate Video Gen
        </span>
      </div>

      <div className="w-full overflow-x-auto">
        <svg
          viewBox="0 0 940 450"
          className="w-full min-w-[880px] h-auto"
          style={{ fontVariantNumeric: "tabular-nums" }}
        >
          <defs>
            <marker
              id="avatar-arrow-emerald"
              viewBox="0 0 10 10"
              refX="6"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#10b981" />
            </marker>
            <marker
              id="avatar-arrow-amber"
              viewBox="0 0 10 10"
              refX="6"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#f59e0b" />
            </marker>
            <marker
              id="avatar-arrow-cyan"
              viewBox="0 0 10 10"
              refX="6"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#06b6d4" />
            </marker>
            <marker
              id="avatar-arrow-purple"
              viewBox="0 0 10 10"
              refX="6"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#8b5cf6" />
            </marker>
          </defs>

          {/* ========================================================================= */}
          {/* CLIENT WEBRTC ZONE (LEFT)                                                 */}
          {/* ========================================================================= */}
          <g transform="translate(20, 30)">
            <rect
              width="210"
              height="390"
              rx="12"
              fill="var(--card)"
              stroke="#10b981"
              strokeWidth="1.5"
              strokeOpacity="0.4"
            />
            {/* Header pill */}
            <rect x="14" y="14" width="105" height="20" rx="4" fill="rgba(16,185,129,0.12)" />
            <text x="66.5" y="28" fontSize="10" fontFamily="monospace" fontWeight="bold" fill="#10b981" textAnchor="middle">
              client browser
            </text>
            <text x="14" y="48" fontSize="9" fill="var(--muted)">
              Low-latency WebRTC peer session
            </text>

            {/* Mic Inbound Box */}
            <g transform="translate(14, 65)">
              <rect width="182" height="70" rx="8" fill="var(--muted-bg)" stroke="var(--border)" strokeWidth="1" />
              <text x="10" y="20" fontSize="10" fontWeight="bold" fill="var(--foreground)">
                User Mic Audio Capture
              </text>
              <text x="10" y="34" fontSize="8.5" fill="var(--muted)">
                Continuous 16kHz PCM audio stream
              </text>
              <rect x="10" y="44" width="115" height="16" rx="3" fill="rgba(245,158,11,0.12)" />
              <text x="14" y="55" fontSize="8" fontFamily="monospace" fill="#f59e0b">
                WebRTC Media Track (In)
              </text>
            </g>

            {/* Playback Box */}
            <g transform="translate(14, 260)">
              <rect width="182" height="110" rx="8" fill="var(--muted-bg)" stroke="#10b981" strokeWidth="1.2" strokeOpacity="0.4" />
              <text x="10" y="20" fontSize="10" fontWeight="bold" fill="var(--foreground)">
                Live Avatar Stream Player
              </text>
              <text x="10" y="34" fontSize="8.5" fill="var(--muted)">
                H.264 Video + Opus Audio Playback
              </text>

              {/* Sub-item: Specs */}
              <rect x="10" y="46" width="162" height="24" rx="4" fill="var(--card)" stroke="var(--border)" strokeWidth="1" />
              <text x="18" y="61" fontSize="8.5" fontFamily="monospace" fill="var(--foreground)">
                30 FPS · 1080p · Lip-Synced
              </text>

              <rect x="10" y="76" width="162" height="22" rx="4" fill="rgba(16,185,129,0.12)" />
              <text x="18" y="90" fontSize="8.5" fontFamily="monospace" fontWeight="bold" fill="#10b981">
                Glass-to-Glass: &lt; 180ms
              </text>
            </g>
          </g>

          {/* ========================================================================= */}
          {/* ARROW: Client Mic -> Server Orchestrator                                  */}
          {/* ========================================================================= */}
          <path
            d="M 230 130 L 285 130"
            fill="none"
            stroke="#f59e0b"
            strokeWidth="2"
            markerEnd="url(#avatar-arrow-amber)"
          />
          <text x="257" y="122" fontSize="8" fontFamily="monospace" fill="#f59e0b" textAnchor="middle">
            PCM Track
          </text>

          {/* ========================================================================= */}
          {/* SERVER ASYNCIO ORCHESTRATION PIPELINE (CENTER & RIGHT)                    */}
          {/* ========================================================================= */}
          <g transform="translate(290, 30)">
            <rect
              width="630"
              height="390"
              rx="12"
              fill="var(--card)"
              stroke="var(--border)"
              strokeWidth="1.5"
            />
            {/* Header pill */}
            <rect x="16" y="14" width="220" height="20" rx="4" fill="var(--muted-bg)" />
            <text x="24" y="28" fontSize="10" fontFamily="monospace" fontWeight="bold" fill="var(--foreground)">
              Python asyncio + Pydantic Engine
            </text>
            <text x="248" y="28" fontSize="9" fill="var(--muted)">
              aiortc / PyAV Media Transport Layer
            </text>

            {/* STEP 1: DEEPGRAM STREAMING STT */}
            <g transform="translate(16, 50)">
              <rect width="280" height="95" rx="8" fill="var(--muted-bg)" stroke="#f59e0b" strokeWidth="1.2" strokeOpacity="0.4" />
              <div className="flex items-center justify-between">
                <rect x="10" y="10" width="115" height="18" rx="3" fill="rgba(245,158,11,0.15)" />
                <text x="15" y="22" fontSize="9" fontFamily="monospace" fontWeight="bold" fill="#f59e0b">
                  1. Deepgram (STT)
                </text>
                <text x="210" y="22" fontSize="9" fontFamily="monospace" fill="#f59e0b" fontWeight="bold">
                  ~42ms Latency
                </text>
              </div>
              <text x="10" y="44" fontSize="9" fill="var(--foreground)" fontWeight="bold">
                Streaming WebSocket Ingest
              </text>
              <text x="10" y="58" fontSize="8.5" fill="var(--muted)">
                Sub-50ms partial speech-to-text transcripts
              </text>
              <rect x="10" y="68" width="260" height="18" rx="3" fill="var(--card)" stroke="var(--border)" strokeWidth="1" />
              <text x="16" y="80" fontSize="8" fontFamily="monospace" fill="var(--muted)">
                Raw PCM audio chunks ➔ Text tokens
              </text>
            </g>

            {/* STEP 2: OPENAI STREAMING LLM */}
            <g transform="translate(330, 50)">
              <rect width="280" height="95" rx="8" fill="var(--muted-bg)" stroke="#10b981" strokeWidth="1.2" strokeOpacity="0.4" />
              <rect x="10" y="10" width="115" height="18" rx="3" fill="rgba(16,185,129,0.15)" />
              <text x="15" y="22" fontSize="9" fontFamily="monospace" fontWeight="bold" fill="#10b981">
                2. OpenAI API (LLM)
              </text>
              <text x="210" y="22" fontSize="9" fontFamily="monospace" fill="#10b981" fontWeight="bold">
                ~58ms TTFT
              </text>
              <text x="10" y="44" fontSize="9" fill="var(--foreground)" fontWeight="bold">
                Sentence-Boundary Chunking
              </text>
              <text x="10" y="58" fontSize="8.5" fill="var(--muted)">
                Pydantic validated async token stream
              </text>
              <rect x="10" y="68" width="260" height="18" rx="3" fill="var(--card)" stroke="var(--border)" strokeWidth="1" />
              <text x="16" y="80" fontSize="8" fontFamily="monospace" fill="var(--muted)">
                split_on_punctuation() ➔ Sentence chunks
              </text>
            </g>

            {/* ARROW: Step 1 -> Step 2 */}
            <path
              d="M 296 97 L 330 97"
              fill="none"
              stroke="#10b981"
              strokeWidth="1.8"
              markerEnd="url(#avatar-arrow-emerald)"
            />

            {/* STEP 3: ELEVENLABS STREAMING TTS */}
            <g transform="translate(330, 175)">
              <rect width="280" height="90" rx="8" fill="var(--muted-bg)" stroke="#06b6d4" strokeWidth="1.2" strokeOpacity="0.4" />
              <rect x="10" y="10" width="125" height="18" rx="3" fill="rgba(6,182,212,0.15)" />
              <text x="15" y="22" fontSize="9" fontFamily="monospace" fontWeight="bold" fill="#06b6d4">
                3. ElevenLabs (TTS)
              </text>
              <text x="210" y="22" fontSize="9" fontFamily="monospace" fill="#06b6d4" fontWeight="bold">
                ~36ms Latency
              </text>
              <text x="10" y="44" fontSize="9" fill="var(--foreground)" fontWeight="bold">
                Neural Voice Synthesis
              </text>
              <text x="10" y="58" fontSize="8.5" fill="var(--muted)">
                48kHz PCM + Viseme synchronization
              </text>
              <rect x="10" y="66" width="260" height="16" rx="3" fill="var(--card)" stroke="var(--border)" strokeWidth="1" />
              <text x="16" y="78" fontSize="8" fontFamily="monospace" fill="var(--muted)">
                Streaming voice audio chunk dispatch
              </text>
            </g>

            {/* ARROW: Step 2 -> Step 3 */}
            <path
              d="M 470 145 L 470 175"
              fill="none"
              stroke="#06b6d4"
              strokeWidth="1.8"
              markerEnd="url(#avatar-arrow-cyan)"
            />
            <text x="478" y="163" fontSize="8" fontFamily="monospace" fill="#06b6d4">
              Sentence
            </text>

            {/* STEP 4: REPLICATE VIDEO GEN DRIVING MODEL */}
            <g transform="translate(16, 175)">
              <rect width="280" height="90" rx="8" fill="var(--muted-bg)" stroke="#8b5cf6" strokeWidth="1.2" strokeOpacity="0.4" />
              <rect x="10" y="10" width="130" height="18" rx="3" fill="rgba(139,92,246,0.15)" />
              <text x="15" y="22" fontSize="9" fontFamily="monospace" fontWeight="bold" fill="#8b5cf6">
                4. Replicate Video Gen
              </text>
              <text x="210" y="22" fontSize="9" fontFamily="monospace" fill="#8b5cf6" fontWeight="bold">
                ~38ms Latency
              </text>
              <text x="10" y="44" fontSize="9" fill="var(--foreground)" fontWeight="bold">
                Zero-Shot Talking Head Driver
              </text>
              <text x="10" y="58" fontSize="8.5" fill="var(--muted)">
                Static portrait + Audio chunk ➔ Video clip
              </text>
              <rect x="10" y="66" width="260" height="16" rx="3" fill="var(--card)" stroke="var(--border)" strokeWidth="1" />
              <text x="16" y="78" fontSize="8" fontFamily="monospace" fill="#8b5cf6">
                Baseline Portrait + Facial Deformation
              </text>
            </g>

            {/* ARROW: Step 3 (TTS audio) -> Step 4 (Video Gen) */}
            <path
              d="M 330 220 L 296 220"
              fill="none"
              stroke="#8b5cf6"
              strokeWidth="1.8"
              markerEnd="url(#avatar-arrow-purple)"
            />
            <text x="313" y="213" fontSize="8" fontFamily="monospace" fill="#8b5cf6" textAnchor="middle">
              Audio
            </text>

            {/* STEP 5: ROLLING BOUNDARY FRAME BUFFER & INTERPOLATION */}
            <g transform="translate(16, 290)">
              <rect width="594" height="85" rx="8" fill="var(--muted-bg)" stroke="#10b981" strokeWidth="1.5" strokeOpacity="0.5" />
              <rect x="10" y="10" width="220" height="18" rx="3" fill="rgba(16,185,129,0.15)" />
              <text x="16" y="22" fontSize="9" fontFamily="monospace" fontWeight="bold" fill="#10b981">
                5. Rolling Boundary Frame Interpolation
              </text>
              <text x="470" y="22" fontSize="9" fontFamily="monospace" fill="#10b981" fontWeight="bold">
                Zero Seam Jitter
              </text>

              <text x="12" y="44" fontSize="9" fill="var(--foreground)">
                Interpolates the final frame of chunk <strong>N-1</strong> with the first frame of chunk <strong>N</strong> on a rolling basis.
              </text>

              {/* Graphic of frame interpolation */}
              <g transform="translate(12, 52)">
                <rect x="0" y="0" width="140" height="22" rx="4" fill="var(--card)" stroke="var(--border)" strokeWidth="1" />
                <text x="70" y="15" fontSize="8.5" fontFamily="monospace" fill="var(--foreground)" textAnchor="middle">
                  Chunk N-1 (Frame #30)
                </text>

                <path d="M 145 11 L 180 11" stroke="#10b981" strokeWidth="1.5" markerEnd="url(#avatar-arrow-emerald)" />

                <rect x="185" y="0" width="180" height="22" rx="4" fill="rgba(16,185,129,0.15)" stroke="#10b981" strokeWidth="1" />
                <text x="275" y="15" fontSize="8.5" fontFamily="monospace" fontWeight="bold" fill="#10b981" textAnchor="middle">
                  Alpha / Optical Flow Blend
                </text>

                <path d="M 370 11 L 405 11" stroke="#10b981" strokeWidth="1.5" markerEnd="url(#avatar-arrow-emerald)" />

                <rect x="410" y="0" width="155" height="22" rx="4" fill="var(--card)" stroke="var(--border)" strokeWidth="1" />
                <text x="487" y="15" fontSize="8.5" fontFamily="monospace" fill="var(--foreground)" textAnchor="middle">
                  Chunk N (Frame #0)
                </text>
              </g>
            </g>

            {/* ARROW: Step 4 -> Step 5 */}
            <path
              d="M 156 265 L 156 290"
              fill="none"
              stroke="#10b981"
              strokeWidth="1.8"
              markerEnd="url(#avatar-arrow-emerald)"
            />
          </g>

          {/* ========================================================================= */}
          {/* ARROW: Server Output -> Client Playback (Return Loop)                      */}
          {/* ========================================================================= */}
          <path
            d="M 306 350 L 230 350"
            fill="none"
            stroke="#10b981"
            strokeWidth="2.2"
            markerEnd="url(#avatar-arrow-emerald)"
          />
          <text x="268" y="342" fontSize="8" fontFamily="monospace" fill="#10b981" textAnchor="middle" fontWeight="bold">
            WebRTC (H.264)
          </text>
        </svg>
      </div>
    </div>
  );
}
