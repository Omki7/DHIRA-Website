"use client";

/**
 * SIMULATED PRODUCT UI — not real Akashic app code.
 * The homepage [02] stage (the /akashic hero's until 23 Oct 2026, when the
 * user swapped the two): one OUTCOME CARD per module, in the fan the
 * founder approved on 20 Oct 2026, with the context tentacles beneath as the
 * index.
 *
 * HISTORY. Full app windows until 15 Oct 2026; one-moment drawings 15 to 20
 * Oct (now homepage [02]); the seven module screens at 0.56 scale 20 to 22
 * Oct (AkashicModuleScreensMockup). On 22 Oct 2026 the founder said those
 * screens still showed too much: the stage must be end-user and executive
 * friendly and about outcomes a reader recognises, not the product's layout.
 *
 * THE GRAMMAR, taken from how ThoughtSpot, Hex and Cube show their product
 * to business readers (measured 22 Oct 2026), so the next edit keeps it:
 *   1. A person asks. Every card opens with a role and the plain question
 *      that role brings, typed in (Hex's prompt pills, ThoughtSpot's
 *      "Ask Data" bar).
 *   2. One legible outcome. The answer is the largest line on the card and
 *      the drawing proves it. Nothing else competes (ThoughtSpot's lifted
 *      callout, Hex's one big figure).
 *   3. No app chrome. No window bar, module rail, sidebar, toolbar, avatar or
 *      run number: the product shows through its answer, not its layout.
 *   4. Builder modules are drawn, not screenshotted. Pipelines, matching,
 *      definitions and lineage are hairline drawings in the site's own line
 *      language: sources enter from beyond the card's edge, colour encodes
 *      the source system, blue is what Akashic produced.
 *   5. Provenance closes every card in one mono line. Traceability is
 *      Akashic's difference, so every card carries it.
 *
 * Second pass, same day (user: "more intuitive and creative"): each drawing
 * is now a picture a business reader already knows. Master Data is a
 * customer's family tree rolling up, not deduplication; Warehouse is the
 * metric tree behind one number; Business Intelligence is the quarter's gap
 * to plan with the alert it raised; Governance is one report seen by two
 * roles.
 *
 * The ONE demo world (Sales Performance, quarter 2 of financial year 2026,
 * USD) comes from the module screens these cards replaced: $25.4 million
 * net revenue up 6.4%, 82,401 orders up 2,113, 98% of plan up 2 points,
 * the top customer account at $4.2 million, regions North 106 to South 92,
 * channels 46 / 32 / 22. Derived here: $308 per order, up 3.7%.
 * Illustrative and consistent with it: the top account's split across its
 * group ($2.1 / $1.4 / $0.7 million) and stores, and the weekly revenue
 * shape. South's attainment is never stated: /akashic [01] owns that story.
 *
 * NAMES. No invented brands or people (user, 22 Oct 2026: no "generic AI
 * slop names"). A party is named by what it is to the reader ("largest
 * customer group", "India subsidiary", "West regional head"); only real
 * systems keep proper names (Salesforce, NetSuite, Shopify).
 */

/* Split into this folder (Nov 2026): the drawing kit (drawingKit.tsx), the
   seven drawings (BuilderDrawings, InsightDrawings, GovernanceDrawing), the
   outcomes (outcomes.ts), the card (OutcomeCard.tsx) and this stage. */

import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ContextTentacles } from "@/features/akashic";
import type { OutcomeShowcase } from "@/content/pages/akashic";
import { MotionToggle } from "@/shared/components/ui";
import useOnScreen from "@/shared/hooks/useOnScreen";
import usePrefersReducedMotion from "@/shared/hooks/usePrefersReducedMotion";
import { useUi } from "@/shared/providers/UiProvider";
import { cx } from "@/shared/utils/cx";
import { CARD_H, CARD_W, OutcomeCard } from "./OutcomeCard";
import { OUTCOMES } from "./outcomes";
import styles from "./AkashicOutcomeCardsMockup.module.scss";

/* ---------------------------------------------------------------- */
/* The stage                                                         */
/* ---------------------------------------------------------------- */
const DURATION_MS = 9000;

/* Where a card sits for its distance from the front (computed geometry,
   Rule 8). `w` is the stage width; the front card shrinks only to fit. */
const offset = (rp: number, n: number) => (rp === 0 ? 0 : rp <= n / 2 ? rp : rp - n);

function placement(rp: number, n: number, w: number): CSSProperties {
  const sc = Math.min(1, (w - 24) / CARD_W);
  const step = offset(rp, n);
  const d = Math.abs(step);
  const side = Math.sign(step);
  if (d === 0) return { transform: `translate(-50%, 0) scale(${sc})`, opacity: 1, zIndex: 30 };
  if (w < 768 || d > 2) return { transform: `translate(-50%, ${sc * 40}px) scale(${sc * 0.7})`, opacity: 0, zIndex: 0, pointerEvents: "none" };
  const x = side * w * (d === 1 ? 0.3 : 0.46);
  const s = sc * (d === 1 ? 0.84 : 0.7);
  // Shells stay opaque so a card never shows the one behind it through
  // itself; the card's contents carry the recession (CONTENT_FADE).
  return {
    transform: `translate(calc(-50% + ${x}px), ${d === 1 ? 22 : 44}px) rotate(${side * d * 1.2}deg) scale(${s})`,
    opacity: 1,
    zIndex: 30 - d * 10,
  };
}

/* How far a card's contents recede, by distance from the front. */
const CONTENT_FADE = [1, 0.4, 0.2];

export interface AkashicOutcomeCardsMockupProps {
  content: OutcomeShowcase;
}

export function AkashicOutcomeCardsMockup({ content }: AkashicOutcomeCardsMockupProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  // Off screen, nothing cycles (Rule 6a).
  const onScreen = useOnScreen(rootRef);
  const [active, setActive] = useState(0);
  const [resetKey, setResetKey] = useState(0);
  const [width, setWidth] = useState(1152);
  const [held, setHeld] = useState(false);
  /* A reader who picks a card keeps it: the tour stops until Play (UX
     review, 23 Oct 2026: let visitors pick, and let them stop motion). */
  const [paused, setPaused] = useState(false);
  const { motion } = useUi();
  const modules = content.modules.slice(0, OUTCOMES.length);
  const n = modules.length;
  const cycling = !reduced && onScreen && !held && !paused;

  const select = (i: number) => {
    setActive(i);
    setResetKey((k) => k + 1);
    setPaused(true);
  };

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    setWidth(el.offsetWidth);
    const observer = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!cycling) return;
    const timer = setTimeout(() => setActive((a) => (a + 1) % n), DURATION_MS);
    return () => clearTimeout(timer);
  }, [active, resetKey, cycling, n]);

  // The pipeline's travelling records are SMIL: they rest off screen.
  useEffect(() => {
    stageRef.current?.querySelectorAll("svg").forEach((svg) => (onScreen ? svg.unpauseAnimations() : svg.pauseAnimations()));
  }, [onScreen, active]);

  const sc = Math.min(1, (width - 24) / CARD_W);
  const current = modules[active];

  return (
    <div
      ref={rootRef}
      role="group"
      aria-label={content.label}
      className={styles.root}
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
      onFocus={() => setHeld(true)}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setHeld(false)}
    >
      {/* The stage. Decorative: the caption and the index carry the content. */}
      <div
        ref={stageRef}
        aria-hidden
        className={styles.stage}
        style={{ height: Math.round(CARD_H * sc) + 34 }}
      >
        {modules.map((m, i) => {
          const rp = (i - active + n) % n;
          const front = rp === 0;
          return (
            <div
              key={m.module}
              onClick={() => !front && select(i)}
              className={cx(styles.slot, !front && styles.slotBehind)}
              style={{ width: CARD_W, height: CARD_H, transformOrigin: "center top", ...placement(rp, n, width) }}
            >
              <div className={styles.slotInner}>
                <OutcomeCard
                  module={m.module}
                  outcome={OUTCOMES[i]}
                  live={front}
                  fade={CONTENT_FADE[Math.abs(offset(rp, n))] ?? 0}
                  runKey={`${active}-${resetKey}`}
                  reduced={reduced}
                  flow={!reduced && Math.abs(offset(rp, n)) <= 1}
                />
              </div>
            </div>
          );
        })}
      </div>

      <p className={styles.caption}>
        <span key={active} className={styles.captionText}>
          <span className={styles.captionModule}>{current.module}.</span> {current.caption}
        </span>{" "}
        <Link href={content.link.href} className={styles.captionLink}>
          {content.link.label}
        </Link>
      </p>

      <ContextTentacles
        nodes={modules.map(({ module, adds }) => ({ module, adds }))}
        active={active}
        resetKey={resetKey}
        durationMs={cycling ? DURATION_MS : 0}
        onSelect={select}
        control={<MotionToggle paused={paused} onToggle={() => setPaused((p) => !p)} controls={motion.tour} />}
      />
    </div>
  );
}
