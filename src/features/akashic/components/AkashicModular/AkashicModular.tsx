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
 *
 * Below lg (5 Nov 2026, platform audit) nothing pins: the track drops its
 * height and the walkthrough reads as one column, each module's anchor span
 * sitting just above its text (CSS `order`, AkashicModular.module.scss).
 */

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import type { AkashicPage } from "@/content/pages/akashic";
import usePrefersReducedMotion from "@/shared/hooks/usePrefersReducedMotion";
import {
  AkashicTeardownMockup,
  MODULE_ANCHOR_ALIASES,
  TEARDOWN_TRACK_VH,
  moduleAnchorVh,
} from "../../mockups/AkashicTeardownMockup";
import styles from "./AkashicModular.module.scss";

export interface AkashicModularProps {
  content: AkashicPage["howItWorks"];
  curtainContent?: ReactNode;
}

export function AkashicModular({ content, curtainContent }: AkashicModularProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const [curtainHeight, setCurtainHeight] = useState(0);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (!curtainContent || !curtainRef.current) return;
    const observer = new ResizeObserver((entries) => {
      setCurtainHeight(entries[0].contentRect.height);
    });
    observer.observe(curtainRef.current);
    return () => observer.disconnect();
  }, [curtainContent]);

  // The snap assist moves the viewport for the visitor, so it is motion in
  // the sense Rule 6 means. Reduced-motion users get no assist at all: the
  // global `scroll-behavior: auto !important` only strips the smoothing, so
  // without this guard they were handed an abrupt jump instead.
  useEffect(() => {
    if (reduced) return;
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
  }, [curtainHeight, reduced]);

  return (
    /* Without a curtain the section itself is #how-it-works, so the page's
       scroll spy sees the module anchors as inside it and keeps a module
       hash (#master-data) instead of rewriting it to the section's. */
    <section id={curtainContent ? undefined : "how-it-works"} className={styles.section}>
      {curtainContent && (
        <div
          id="how-it-works"
          className={styles.anchor}
          style={{ top: `${curtainHeight}px` }}
        />
      )}
      <div
        ref={trackRef}
        className={styles.track}
        style={{
          "--track-h": `calc(${TEARDOWN_TRACK_VH}vh${curtainHeight > 0 ? ` + ${curtainHeight}px` : ""})`,
        } as CSSProperties}
      >
        {MODULE_ANCHOR_ALIASES.map((aliases, i) => (
          <span
            key={aliases[0]}
            className={styles.moduleAnchor}
            style={{
              top: `calc(${moduleAnchorVh(i)}vh + 120px)`,
              "--stack-order": 2 + 2 * i,
            } as CSSProperties}
          >
            {aliases.map((alias) => (
              <span key={alias} id={alias} className={styles.moduleAnchorId} />
            ))}
          </span>
        ))}
        <div className={styles.stickyFrame}>
          <AkashicTeardownMockup
            content={content}
            trackRef={trackRef}
            curtainHeight={curtainHeight}
          />
        </div>
      </div>

      {curtainContent && (
        <div ref={curtainRef} className={styles.curtain}>
          {curtainContent}
        </div>
      )}
    </section>
  );
}
