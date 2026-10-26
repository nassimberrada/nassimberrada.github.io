"use client";

import React from "react";
import { CustomAvatarVisual } from "./CustomAvatarVisual";

export function AvatarFigure() {
  return (
    <div className="iso rounded-[14px] border border-[var(--border)] bg-[var(--card)] p-4 sm:p-6 shadow-lg overflow-hidden my-6">
      {/* Figure Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-[var(--border)]">
        <div className="flex items-center gap-2">
          <div>
            <h4 className="text-sm font-semibold text-[var(--foreground)] leading-tight">
              Real-Time Zero-Shot Speech-Driven Avatar Animation
            </h4>
            <p className="text-[11px] text-[var(--muted)] font-mono">
              Live WebRTC Stream · Deepgram STT · OpenAI LLM · ElevenLabs TTS · Replicate Video Gen
            </p>
          </div>
        </div>

      </div>

      {/* Visual Component */}
      <CustomAvatarVisual />
    </div>
  );
}
