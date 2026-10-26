"use client";

import { useCallback, useEffect, useRef } from "react";

type PointerMessage = { type: "pointermove" | "pointerleave"; x?: number; y?: number };

export function DescentBackground({ softened }: { softened: boolean }) {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const lastPointer = useRef<{ x: number; y: number } | null>(null);

  const send = useCallback((message: PointerMessage) => {
    frameRef.current?.contentWindow?.postMessage(message, window.location.origin);
  }, []);

  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      const frame = frameRef.current;
      if (!frame) return;
      const bounds = frame.getBoundingClientRect();
      const point = { x: event.clientX - bounds.left, y: event.clientY - bounds.top };
      if (point.x < 0 || point.y < 0 || point.x > bounds.width || point.y > bounds.height) {
        lastPointer.current = null;
        send({ type: "pointerleave" });
        return;
      }
      lastPointer.current = point;
      send({ type: "pointermove", ...point });
    };
    const onPointerLeave = () => {
      lastPointer.current = null;
      send({ type: "pointerleave" });
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerleave", onPointerLeave);
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [send]);

  const onLoad = () => {
    if (lastPointer.current) send({ type: "pointermove", ...lastPointer.current });
  };

  return (
    <iframe
      ref={frameRef}
      onLoad={onLoad}
      src="/descent.html?embed=1"
      title="Interactive terrain background"
      aria-hidden="true"
      tabIndex={-1}
      className={`absolute inset-0 h-full w-full border-0 pointer-events-none transition-[filter,transform] duration-700 ${
        softened ? "blur-[2px] scale-[1.015]" : ""
      }`}
    />
  );
}
