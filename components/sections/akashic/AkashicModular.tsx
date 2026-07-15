"use client";

/*
 * [02] How It Works — Start Anywhere, Scale Everywhere.
 * Immersive scrollytelling teardown: a tall track pins a full-viewport
 * 3D exploded-stack scene (demos/mockups/AkashicTeardownMockup, AGENTS.md
 * §8a) and native scroll opens the sealed platform into its six plates,
 * one module per scroll segment, with governance revealed as the frame
 * around them. The hero/showcase/four-moves sections ride on top as a
 * curtain (curtainContent): once the visitor scrolls near its end, a
 * snap assist pulls the stage up to cover the full screen. Scroll
 * position stays the single source of truth — the HUD ticks navigate by
 * scrolling the page.
 */

import { useEffect, useRef, useState } from "react";
import AkashicTeardownMockup, { TEARDOWN_TRACK_VH } from "@/components/demos/mockups/AkashicTeardownMockup";

type Props = {
  curtainContent?: React.ReactNode;
};

export default function AkashicModular({ curtainContent }: Props = {}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const [curtainHeight, setCurtainHeight] = useState(0);

  useEffect(() => {
    if (!curtainContent || !curtainRef.current) return;
    const observer = new ResizeObserver((entries) => {
      setCurtainHeight(entries[0].contentRect.height);
    });
    observer.observe(curtainRef.current);
    return () => observer.disconnect();
  }, [curtainContent]);

  useEffect(() => {
    if (curtainHeight <= 0) return;
    let lastY = window.scrollY;
    let lastScrollTime = Date.now();
    let isSnapping = false;
    let cooldownUntil = 0;

    const abortSnap = () => {
      if (isSnapping) {
        isSnapping = false;
        cooldownUntil = Date.now() + 1200;
        // Interrupted by user input: cancel native smooth scroll by scrolling to current position
        window.scrollTo(0, window.scrollY);
      }
    };

    const onScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastY;
      const now = Date.now();
      const dt = now - lastScrollTime;
      lastY = currentY;
      lastScrollTime = now;

      const el = trackRef.current;
      if (!el || isSnapping || delta <= 0) return;

      // If delta is large or scroll speed is high, user is scrolling fast. Avoid hijacking.
      const speed = dt > 0 ? Math.abs(delta) / dt : 0;
      if (speed > 1.5 || delta > 40) {
        cooldownUntil = Date.now() + 1000;
        return;
      }

      if (Date.now() < cooldownUntil) return;

      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      if (total <= 0) return;
      const passed = Math.min(Math.max(-rect.top, 0), total);

      // Snap assist: with the curtain nearly gone, a small scroll pulls
      // the teardown stage up to cover the full screen.
      const snapThreshold = 240;
      if (passed > curtainHeight - snapThreshold && passed < curtainHeight) {
        isSnapping = true;
        window.scrollTo({
          top: rect.top + window.scrollY + curtainHeight,
          behavior: "smooth",
        });
        setTimeout(() => {
          isSnapping = false;
        }, 800);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("wheel", abortSnap, { passive: true });
    window.addEventListener("touchstart", abortSnap, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", abortSnap);
      window.removeEventListener("touchstart", abortSnap);
    };
  }, [curtainHeight]);

  return (
    <section className={`relative bg-primary-bg ${curtainContent ? "" : "border-t border-lineSoft"}`}>
      <div
        id="how-it-works"
        className="absolute w-full"
        style={{ top: `${curtainHeight}px` }}
      />
      <div
        ref={trackRef}
        style={{ height: `calc(${TEARDOWN_TRACK_VH}vh${curtainHeight > 0 ? ` + ${curtainHeight}px` : ""})` }}
      >
        <div className="sticky top-0 h-screen overflow-hidden">
          <AkashicTeardownMockup trackRef={trackRef} curtainHeight={curtainHeight} />
        </div>
      </div>

      {curtainContent && (
        <div ref={curtainRef} className="absolute inset-x-0 top-0 z-10 w-full">
          {curtainContent}
        </div>
      )}
    </section>
  );
}
