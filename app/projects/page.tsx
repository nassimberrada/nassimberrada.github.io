"use client";

import { useEffect } from "react";

export default function ProjectsIndexPage() {
  useEffect(() => {
    window.location.replace("/");
  }, []);

  return (
    <main className="min-h-screen grid place-items-center p-6 text-sm text-[var(--muted)]">
      <p>
        Redirecting to the portfolio… <a className="underline" href="/">Continue</a>
      </p>
    </main>
  );
}
