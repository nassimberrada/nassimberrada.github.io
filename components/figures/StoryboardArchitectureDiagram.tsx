"use client";

import React from "react";

export function StoryboardArchitectureDiagram() {
  return (
    <div className="w-full my-6 rounded-[14px] border border-[var(--border)] bg-[var(--card)] p-4 sm:p-6 shadow-sm overflow-hidden select-none">
      {/* Schematic Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b border-[var(--border)]">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
            SYSTEM ARCHITECTURE &amp; FORMULATION
          </span>
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--foreground)]">
            Storyboard-First Video Pipeline — Artifact Specifications &amp; Algorithms
          </span>
        </div>
        <span className="text-[10px] font-mono text-[var(--muted)]">
          storyboard-atlas-v2 · OpenRouter Video Matrix · av_align Cross-Correlation · FFmpeg Libass
        </span>
      </div>

      <div className="w-full overflow-x-auto">
        <svg
          viewBox="0 0 960 520"
          className="w-full min-w-[900px] h-auto"
          style={{ fontVariantNumeric: "tabular-nums" }}
        >
          <defs>
            <marker
              id="story-arrow-emerald"
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
              id="story-arrow-cyan"
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
              id="story-arrow-purple"
              viewBox="0 0 10 10"
              refX="6"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#8b5cf6" />
            </marker>
            <marker
              id="story-arrow-amber"
              viewBox="0 0 10 10"
              refX="6"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#f59e0b" />
            </marker>
          </defs>

          {/* ========================================================================= */}
          {/* STEP 1: STORY CONFIG (LLM BEATS & CINEMATOGRAPHY)                         */}
          {/* ========================================================================= */}
          <g transform="translate(20, 20)">
            <rect
              width="270"
              height="215"
              rx="12"
              fill="var(--card)"
              stroke="#f59e0b"
              strokeWidth="1.5"
              strokeOpacity="0.4"
            />
            <rect x="14" y="14" width="140" height="20" rx="4" fill="rgba(245,158,11,0.12)" />
            <text x="84" y="28" fontSize="10" fontFamily="monospace" fontWeight="bold" fill="#f59e0b" textAnchor="middle">
              1. step1_story.py
            </text>
            <text x="14" y="48" fontSize="8.5" fontFamily="monospace" fill="var(--muted)">
              projects/&lt;name&gt;/story.json
            </text>

            <g transform="translate(14, 56)">
              <rect width="242" height="66" rx="6" fill="var(--muted-bg)" stroke="var(--border)" strokeWidth="1" />
              <text x="10" y="16" fontSize="9" fontWeight="bold" fill="var(--foreground)">
                Pydantic Story Grammar Decomposition
              </text>
              <text x="10" y="29" fontSize="8" fill="var(--muted)">
                Beats: [pace, camera_direction, shot_size, dialogue]
              </text>
              <text x="10" y="41" fontSize="8" fill="var(--muted)">
                Temporal Chunking: Duration &le; 15s per storyboard
              </text>
              <text x="10" y="54" fontSize="8" fontFamily="monospace" fill="#f59e0b">
                Style Dict: scene, characters, props, locations
              </text>
            </g>

            {/* Code / Schema snippet */}
            <g transform="translate(14, 130)">
              <rect width="242" height="70" rx="6" fill="var(--card)" stroke="var(--border)" strokeWidth="0.8" />
              <text x="10" y="16" fontSize="7.5" fontFamily="monospace" fill="var(--muted)">
                {"{"}
              </text>
              <text x="16" y="29" fontSize="7.5" fontFamily="monospace" fill="#f59e0b">
                &quot;aspect&quot;: &quot;9:16&quot;, &quot;duration&quot;: 24, &quot;chunks&quot;: 2,
              </text>
              <text x="16" y="42" fontSize="7.5" fontFamily="monospace" fill="var(--foreground)">
                {'\"beats\": [{\"slot\": \"01\", \"pace\": \"medium\"}],'}
              </text>
              <text x="16" y="55" fontSize="7.5" fontFamily="monospace" fill="#10b981">
                &quot;continuity_hash&quot;: &quot;sha256-a94f0e...&quot;
              </text>
              <text x="10" y="66" fontSize="7.5" fontFamily="monospace" fill="var(--muted)">
                {"}"}
              </text>
            </g>
          </g>

          {/* ARROW: Step 1 to Step 2 */}
          <path d="M 290 125 L 340 125" fill="none" stroke="#f59e0b" strokeWidth="1.8" markerEnd="url(#story-arrow-amber)" />

          {/* ========================================================================= */}
          {/* STEP 2: MULTI-ANGLE REFERENCE SHEETS                                      */}
          {/* ========================================================================= */}
          <g transform="translate(340, 20)">
            <rect
              width="270"
              height="215"
              rx="12"
              fill="var(--card)"
              stroke="#06b6d4"
              strokeWidth="1.5"
              strokeOpacity="0.4"
            />
            <rect x="14" y="14" width="140" height="20" rx="4" fill="rgba(6,182,212,0.12)" />
            <text x="84" y="28" fontSize="10" fontFamily="monospace" fontWeight="bold" fill="#06b6d4" textAnchor="middle">
              2. step2_sheets.py
            </text>
            <text x="14" y="48" fontSize="8.5" fontFamily="monospace" fill="var(--muted)">
              projects/&lt;name&gt;/sheets/*.png
            </text>

            <g transform="translate(14, 56)">
              <rect width="242" height="144" rx="6" fill="var(--muted-bg)" stroke="var(--border)" strokeWidth="1" />
              <text x="10" y="16" fontSize="9" fontWeight="bold" fill="var(--foreground)">
                Multi-Angle Identity &amp; Palette Locks
              </text>

              {/* 3 Reference Sheets */}
              <rect x="10" y="26" width="222" height="34" rx="4" fill="var(--card)" stroke="#06b6d4" strokeWidth="0.8" />
              <text x="18" y="40" fontSize="8.5" fontFamily="monospace" fill="#06b6d4" fontWeight="bold">
                characters.png (Turnarounds)
              </text>
              <text x="18" y="52" fontSize="7.5" fill="var(--muted)">
                Front, 3/4 angle, side profile, mouth visemes
              </text>

              <rect x="10" y="66" width="222" height="34" rx="4" fill="var(--card)" stroke="var(--border)" strokeWidth="0.8" />
              <text x="18" y="80" fontSize="8.5" fontFamily="monospace" fill="var(--foreground)" fontWeight="bold">
                locations.png (Plates)
              </text>
              <text x="18" y="92" fontSize="7.5" fill="var(--muted)">
                Lighting HDR, environmental tone, depth fog
              </text>

              <rect x="10" y="106" width="222" height="32" rx="4" fill="var(--card)" stroke="var(--border)" strokeWidth="0.8" />
              <text x="18" y="120" fontSize="8.5" fontFamily="monospace" fill="var(--foreground)" fontWeight="bold">
                props.png (Assets &amp; HUD)
              </text>
              <text x="18" y="131" fontSize="7.5" fill="var(--muted)">
                Dashboard UI modals, vehicle telemetry HUD
              </text>
            </g>
          </g>

          {/* ARROW: Step 2 to Step 3 */}
          <path d="M 610 125 L 660 125" fill="none" stroke="#06b6d4" strokeWidth="1.8" markerEnd="url(#story-arrow-cyan)" />

          {/* ========================================================================= */}
          {/* STEP 3: MASTER ATLAS & CONTACT SHEET SCAFFOLD                             */}
          {/* ========================================================================= */}
          <g transform="translate(660, 20)">
            <rect
              width="280"
              height="215"
              rx="12"
              fill="var(--card)"
              stroke="#10b981"
              strokeWidth="1.5"
              strokeOpacity="0.4"
            />
            <rect x="14" y="14" width="160" height="20" rx="4" fill="rgba(16,185,129,0.12)" />
            <text x="94" y="28" fontSize="10" fontFamily="monospace" fontWeight="bold" fill="#10b981" textAnchor="middle">
              3. step3_storyboard.py
            </text>
            <text x="14" y="48" fontSize="8.5" fontFamily="monospace" fill="var(--muted)">
              storyboard/master_atlas.json
            </text>

            <g transform="translate(14, 56)">
              <rect width="252" height="144" rx="6" fill="var(--muted-bg)" stroke="var(--border)" strokeWidth="1" />
              <text x="10" y="16" fontSize="9" fontWeight="bold" fill="var(--foreground)">
                storyboard-atlas-v2 Coordinate Engine
              </text>
              <text x="10" y="28" fontSize="7.5" fontFamily="monospace" fill="#10b981">
                cols = 2 if n &le; 4 else 3 · gap = w // 120
              </text>

              {/* 4 Storyboard Panels Graphic */}
              <g transform="translate(10, 36)">
                <rect x="0" y="0" width="112" height="46" rx="3" fill="var(--card)" stroke="#10b981" strokeWidth="0.8" />
                <text x="6" y="14" fontSize="8" fontFamily="monospace" fontWeight="bold" fill="#10b981">Slot 01: [0,0,w/2,h/2]</text>
                <text x="6" y="26" fontSize="7" fill="var(--muted)">Close-up 85mm CU</text>
                <text x="6" y="38" fontSize="7" fill="var(--muted)">Rain windshield static</text>

                <rect x="120" y="0" width="112" height="46" rx="3" fill="var(--card)" stroke="var(--border)" strokeWidth="0.8" />
                <text x="126" y="14" fontSize="8" fontFamily="monospace" fontWeight="bold" fill="var(--foreground)">Slot 02: [w/2,0,w,h/2]</text>
                <text x="126" y="26" fontSize="7" fill="var(--muted)">Push-in 35mm OTS</text>
                <text x="126" y="38" fontSize="7" fill="var(--muted)">Red telemetry alert</text>

                <rect x="0" y="52" width="112" height="46" rx="3" fill="var(--card)" stroke="var(--border)" strokeWidth="0.8" />
                <text x="6" y="66" fontSize="8" fontFamily="monospace" fontWeight="bold" fill="var(--foreground)">Slot 03: [0,h/2,w/2,h]</text>
                <text x="6" y="78" fontSize="7" fill="var(--muted)">Orbit 45° 50mm</text>
                <text x="6" y="90" fontSize="7" fill="var(--muted)">Teal Droid hotfix</text>

                <rect x="120" y="52" width="112" height="46" rx="3" fill="var(--card)" stroke="#10b981" strokeWidth="0.8" />
                <text x="126" y="66" fontSize="8" fontFamily="monospace" fontWeight="bold" fill="#10b981">Slot 04: [w/2,h/2,w,h]</text>
                <text x="126" y="78" fontSize="7" fill="var(--muted)">Dolly back 50mm</text>
                <text x="126" y="90" fontSize="7" fill="var(--muted)">14ms latency green</text>
              </g>
            </g>
          </g>

          {/* ARROW: Step 3 (Storyboard) down to Step 4 (Video) */}
          <path
            d="M 800 235 C 800 260, 680 260, 680 275"
            fill="none"
            stroke="#10b981"
            strokeWidth="1.8"
            markerEnd="url(#story-arrow-emerald)"
          />

          {/* ========================================================================= */}
          {/* STEP 4: OPENROUTER VIDEO & AV_ALIGN CROSS-CORRELATION                     */}
          {/* ========================================================================= */}
          <g transform="translate(340, 275)">
            <rect
              width="600"
              height="225"
              rx="12"
              fill="var(--card)"
              stroke="#8b5cf6"
              strokeWidth="1.5"
              strokeOpacity="0.4"
            />
            <rect x="14" y="14" width="220" height="20" rx="4" fill="rgba(139,92,246,0.12)" />
            <text x="124" y="28" fontSize="10" fontFamily="monospace" fontWeight="bold" fill="#8b5cf6" textAnchor="middle">
              4. step4_video.py &amp; av_align.py
            </text>
            <text x="250" y="28" fontSize="8.5" fontFamily="monospace" fill="var(--muted)">
              OpenRouter Video Engine &amp; Remux
            </text>

            <g transform="translate(14, 46)">
              {/* Left Column: 9-Slot Reference Allocation */}
              <g transform="translate(0, 0)">
                <rect width="275" height="162" rx="6" fill="var(--muted-bg)" stroke="var(--border)" strokeWidth="1" />
                <text x="10" y="16" fontSize="9" fontWeight="bold" fill="var(--foreground)">
                  OpenRouter 9-Slot Reference Mode
                </text>
                <text x="10" y="28" fontSize="7.5" fill="var(--muted)">
                  Seedance 2 / Kling v3 / Veo 3.1
                </text>

                <rect x="10" y="36" width="255" height="22" rx="3" fill="var(--card)" stroke="#8b5cf6" strokeWidth="0.8" />
                <text x="16" y="50" fontSize="8" fontFamily="monospace" fill="#8b5cf6" fontWeight="bold">
                  input_references[0]: chunk_01.png
                </text>

                <rect x="10" y="62" width="255" height="22" rx="3" fill="var(--card)" stroke="var(--border)" strokeWidth="0.8" />
                <text x="16" y="76" fontSize="8" fontFamily="monospace" fill="var(--foreground)">
                  input_references[1..3]: sheets/*.png
                </text>

                <rect x="10" y="88" width="255" height="22" rx="3" fill="var(--card)" stroke="var(--border)" strokeWidth="0.8" />
                <text x="16" y="102" fontSize="8" fontFamily="monospace" fill="var(--foreground)">
                  input_references[4..8]: mouth visemes
                </text>

                <rect x="10" y="114" width="255" height="38" rx="3" fill="rgba(139,92,246,0.08)" stroke="#8b5cf6" strokeWidth="0.8" />
                <text x="16" y="128" fontSize="7.5" fontFamily="monospace" fill="#8b5cf6" fontWeight="bold">
                  Motion Directive: Start on Panel 1
                </text>
                <text x="16" y="140" fontSize="7" fill="var(--muted)">
                  Jump-cut sequentially across slots without morph
                </text>
              </g>

              {/* Right Column: av_align Mathematical Cross-Correlation */}
              <g transform="translate(288, 0)">
                <rect width="284" height="162" rx="6" fill="var(--muted-bg)" stroke="#10b981" strokeWidth="1" strokeOpacity="0.4" />
                <text x="10" y="16" fontSize="9" fontWeight="bold" fill="#10b981">
                  Deterministic Mouth↔Audio Alignment
                </text>
                <text x="10" y="28" fontSize="7.5" fontFamily="monospace" fill="var(--muted)">
                  R_xy(&tau;) = &Sigma; x(t) &middot; y(t + &tau;) &nbsp;|&nbsp; &tau;* = argmax R_xy(&tau;)
                </text>

                <rect x="10" y="36" width="264" height="34" rx="3" fill="var(--card)" stroke="var(--border)" strokeWidth="0.8" />
                <text x="16" y="49" fontSize="7.5" fontFamily="monospace" fill="var(--foreground)">
                  x(t) = RMS Audio Envelope (ElevenLabs)
                </text>
                <text x="16" y="61" fontSize="7.5" fontFamily="monospace" fill="#06b6d4">
                  y(t) = Cyan Face/Mouth Glow (20 FPS)
                </text>

                <rect x="10" y="74" width="264" height="36" rx="3" fill="var(--card)" stroke="var(--border)" strokeWidth="0.8" />
                <text x="16" y="88" fontSize="7.5" fontFamily="monospace" fill="var(--foreground)">
                  Lag Thresholds: |&tau;| &le; 1.5s, r &ge; 0.12
                </text>
                <text x="16" y="100" fontSize="7" fill="var(--muted)">
                  Eliminates +140ms Seedance diffusion mouth lag
                </text>

                <rect x="10" y="114" width="264" height="38" rx="3" fill="rgba(16,185,129,0.12)" stroke="#10b981" strokeWidth="0.8" />
                <text x="16" y="128" fontSize="8" fontFamily="monospace" fontWeight="bold" fill="#10b981">
                  FFmpeg adelay(&tau;*) Compensation
                </text>
                <text x="16" y="140" fontSize="7" fill="var(--muted)">
                  ffmpeg -i video.mp4 -af adelay=140|140 -c:v copy
                </text>
              </g>
            </g>
          </g>

          {/* ARROW: Step 4 left to Step 5 */}
          <path d="M 340 380 L 290 380" fill="none" stroke="#8b5cf6" strokeWidth="1.8" markerEnd="url(#story-arrow-purple)" />

          {/* ========================================================================= */}
          {/* STEP 5: POST-PRODUCTION & SOCIAL MASTERING                                */}
          {/* ========================================================================= */}
          <g transform="translate(20, 275)">
            <rect
              width="270"
              height="225"
              rx="12"
              fill="var(--card)"
              stroke="#ec4899"
              strokeWidth="1.5"
              strokeOpacity="0.4"
            />
            <rect x="14" y="14" width="140" height="20" rx="4" fill="rgba(236,72,153,0.12)" />
            <text x="84" y="28" fontSize="10" fontFamily="monospace" fontWeight="bold" fill="#ec4899" textAnchor="middle">
              5. step5_post.py
            </text>
            <text x="14" y="48" fontSize="8.5" fontFamily="monospace" fill="var(--muted)">
              video/final_social.mp4
            </text>

            <g transform="translate(14, 56)">
              <rect width="242" height="152" rx="6" fill="var(--muted-bg)" stroke="var(--border)" strokeWidth="1" />
              <text x="10" y="16" fontSize="9" fontWeight="bold" fill="var(--foreground)">
                Social Delivery Mastering
              </text>

              <rect x="10" y="26" width="222" height="32" rx="3" fill="var(--card)" stroke="var(--border)" strokeWidth="0.8" />
              <text x="16" y="40" fontSize="8" fontFamily="monospace" fill="#ec4899" fontWeight="bold">
                ElevenLabs Neural TTS (vo.mp3)
              </text>
              <text x="16" y="51" fontSize="7" fill="var(--muted)">
                Scripted narration matching beat durations
              </text>

              <rect x="10" y="64" width="222" height="32" rx="3" fill="var(--card)" stroke="var(--border)" strokeWidth="0.8" />
              <text x="16" y="78" fontSize="8" fontFamily="monospace" fill="var(--foreground)" fontWeight="bold">
                FFmpeg libass (captions.ass)
              </text>
              <text x="16" y="89" fontSize="7" fill="var(--muted)">
                Timestamped word alignment, baked subtitle styling
              </text>

              <rect x="10" y="102" width="222" height="40" rx="3" fill="rgba(16,185,129,0.15)" stroke="#10b981" strokeWidth="0.8" />
              <text x="16" y="117" fontSize="8" fontFamily="monospace" fontWeight="bold" fill="#10b981">
                Final Cut: final_social.mp4
              </text>
              <text x="16" y="130" fontSize="7" fill="var(--muted)">
                Channel ducking, AAC audio, 1080p MP4 packaging
              </text>
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}
