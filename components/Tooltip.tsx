"use client";

import React from "react";

export function Tooltip({
  children,
  label,
  align = "right",
}: {
  children: React.ReactNode;
  label: string;
  align?: "left" | "right";
}) {
  const horizontalPosition = align === "left" ? "right-0 md:left-0 md:right-auto" : "right-0";

  return (
    <span className="group/tooltip relative inline-flex">
      {children}
      <span role="tooltip" className={`pointer-events-none absolute ${horizontalPosition} top-full z-[80] mt-2 whitespace-nowrap rounded-md border border-[var(--border)] bg-[var(--card)] px-2 py-1 text-[10px] font-medium text-[var(--foreground)] opacity-0 shadow-lg transition-opacity group-hover/tooltip:opacity-100 group-focus-within/tooltip:opacity-100 md:top-auto md:bottom-full md:mt-0 md:mb-2`}>
        {label}
      </span>
    </span>
  );
}
