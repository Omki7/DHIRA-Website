"use client";

import { useEffect, useRef } from "react";

/* A 2px reading line across the top of an essay (26 Oct 2026). Scroll
   linked, not animated: one transform per frame at most, written outside
   React (Rule 6a), and it never moves on its own. */
export default function ReadingProgress({ target }: { target: string }) {
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const body = document.getElementById(target);
    const line = bar.current;
    if (!body || !line) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const box = body.getBoundingClientRect();
      const span = box.height - window.innerHeight * 0.6;
      const progress = span > 0 ? Math.min(1, Math.max(0, -box.top / span)) : 1;
      line.style.transform = `scaleX(${progress})`;
    };
    const request = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
    };
  }, [target]);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px]">
      <div ref={bar} className="h-full origin-left scale-x-0 bg-blue" />
    </div>
  );
}
