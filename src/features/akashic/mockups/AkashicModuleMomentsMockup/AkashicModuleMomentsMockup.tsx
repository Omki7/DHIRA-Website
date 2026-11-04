"use client";

/*
 * SIMULATED PRODUCT UI — not real Akashic app code.
 * One MOMENT per module, not one screen. Hosted by /akashic/1-0 "Generally
 * available" with its own module index.
 */

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import useOnScreen from "@/shared/hooks/useOnScreen";
import usePrefersReducedMotion from "@/shared/hooks/usePrefersReducedMotion";
import { MOMENTS } from "./MomentDrawings";
import styles from "./AkashicModuleMomentsMockup.module.scss";

const N = MOMENTS.length;
const MOMENT_DURATION_MS = 8500;

export function AkashicModuleMomentsMockup() {
  const rootRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const onScreen = useOnScreen(rootRef);
  const [active, setActive] = useState(0);
  const [resetKey, setResetKey] = useState(0);

  const select = (i: number) => {
    setActive(i);
    setResetKey((k) => k + 1);
  };

  useEffect(() => {
    if (reduced || !onScreen) return;
    const timer = setTimeout(() => setActive((a) => (a + 1) % N), MOMENT_DURATION_MS);
    return () => clearTimeout(timer);
  }, [active, resetKey, reduced, onScreen]);

  const m = MOMENTS[active];
  const Draw = m.Draw;

  return (
    <div ref={rootRef} className={styles.root}>
      {/* The stage */}
      <div aria-hidden className={styles.stageMask}>
        <div
          key={`${active}-${resetKey}`}
          className={styles.stageViewport}
          style={
            {
              "--fm": `${m.focus}px`,
              transform: "translate(calc(var(--fx) * -1), -50%) scale(var(--sc))",
              transformOrigin: "var(--fx) 50%",
            } as CSSProperties
          }
        >
          <Draw />
        </div>
      </div>

      <p className={styles.captionP}>
        <span key={active} className={styles.captionRise}>
          <span className={styles.captionModule}>{m.module}.</span> {m.caption}
        </span>{" "}
        <Link href="#talk-to-our-team" className={styles.captionLink}>
          See it with your own data
        </Link>
      </p>

      {/* The module index */}
      <div className={styles.tabsContainer}>
        {MOMENTS.map((mo, i) => {
          const isActive = active === i;
          return (
            <button
              key={mo.module}
              type="button"
              onClick={() => select(i)}
              aria-pressed={isActive}
              className={`${styles.tabBtn} ${isActive ? styles.tabActive : styles.tabInactive}`}
            >
              <span className={isActive ? styles.tabNumActive : styles.tabNumInactive}>
                {String(i + 1).padStart(2, "0")}
              </span>
              {mo.module}
              <span aria-hidden className={styles.tabTrack} />
              {isActive && (
                <span
                  key={resetKey}
                  aria-hidden
                  className={styles.tabProgress}
                  style={{ animation: `progressFill ${MOMENT_DURATION_MS}ms linear forwards` }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
