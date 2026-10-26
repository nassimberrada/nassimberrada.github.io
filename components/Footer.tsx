import React from "react";
import { Globe, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] py-8 bg-[var(--background)] text-xs text-[var(--muted)]">
      <div className="max-w-[68rem] mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-[var(--foreground)]">Nassim Berrada</span>
          <span className="text-[var(--border)]">|</span>
          <span className="font-mono text-emerald-600 dark:text-emerald-400">AI Researcher &amp; ML Engineer</span>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          <a
            href="mailto:nassim@unfoldinglabs.ai"
            className="flex items-center gap-1.5 hover:text-emerald-500 transition-colors"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Email</span>
          </a>
          <a
            href="https://www.unfoldinglabs.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-emerald-500 transition-colors"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>unfoldinglabs.ai</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
