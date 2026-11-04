"use client";

/*
 * [01] Akashic in action — the product page (eyebrow "Ask Akashic" since 14 Oct 2026)'s first fold, on the blue-tint
 * band (rgb(var(--band))) shared with the careers/company pages. Split stage: narrative
 * + world toggle left, a live ask
 * simulation right. The question types itself FIRST; the four moves stay
 * hidden until it finishes (their space is reserved so the fold never jumps),
 * then cascade in one by one, and the answer card pops in as a two-panel
 * evidence dossier: "From your systems" (numbers) beside "From your
 * documents" (the why) — the structured + unstructured pull made obvious in
 * plain words. The run plays once and persists; switching worlds replays it.
 *
 * Everything on the right is SIMULATED PRODUCT UI (AGENTS.md §8a): canned
 * copy and demo data for storytelling only.
 */

import { useEffect, useRef, useState } from "react";
import type { AkashicPage } from "@/content/pages/akashic";
import { AkashicWordmark } from "@/shared/components/icons";
import { FigureEyebrow, ScrollReveal } from "@/shared/components/ui";
import usePrefersReducedMotion from "@/shared/hooks/usePrefersReducedMotion";
import {
  DocumentsPanel,
  SystemsPanel,
  UiIcon,
} from "./EvidencePanels";
import styles from "./AkashicFourMoves.module.scss";

export interface AkashicFourMovesProps {
  content: AkashicPage["inAction"];
}

export function AkashicFourMoves({ content }: AkashicFourMovesProps) {
  const { worlds, statusLabels: STATUS_LABELS, chrome } = content;
  const [active, setActive] = useState(0);
  const [typedRun, setTypedLen] = useState(0);
  const [phaseRun, setPhase] = useState(0);
  const [started, setStarted] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  const world = worlds[active];
  /* Reduced motion shows the finished run at once. */
  const typedLen = started && reduced ? world.question.length : typedRun;
  const phase = started && reduced ? 5 : phaseRun;
  const typingDone = typedLen >= world.question.length;
  const revealed = phase === 5;
  const running = started && !revealed;

  // Pull-to-pop: the moment the section peeks in from the wireframes above,
  // a rAF eased glide lands it flush with the viewport. Native smooth scroll
  // is too uneven across platforms for this to feel like one motion.
  useEffect(() => {
    if (reduced) return;
    let lastY = window.scrollY;
    let lastScrollTime = Date.now();
    let snapping = false;
    let cooldownUntil = 0;
    let rafId = 0;

    const abort = () => {
      if (snapping) {
        snapping = false;
        cancelAnimationFrame(rafId);
        cooldownUntil = Date.now() + 1200;
        lastY = window.scrollY;
      }
    };
    const onWheelUp = (e: WheelEvent) => {
      if (e.deltaY < 0) abort();
    };

    const glide = (targetY: number) => {
      const startY = window.scrollY;
      const dist = targetY - startY;
      if (Math.abs(dist) < 2) return;
      const dur = Math.min(950, 480 + Math.abs(dist) * 0.4);
      const t0 = performance.now();
      snapping = true;
      let expectedY = startY;
      const ease = (t: number) => 1 - Math.pow(1 - t, 4);
      const stepFrame = (now: number) => {
        if (!snapping) return;

        // If the actual scroll position deviates from where we scrolled,
        // it means the user manually scrolled (wheel, trackpad, touch, etc.). Abort.
        const currentY = window.scrollY;
        if (Math.abs(currentY - expectedY) > 1.5) {
          abort();
          return;
        }

        const p = Math.min((now - t0) / dur, 1);
        const nextY = startY + dist * ease(p);
        expectedY = nextY;

        window.scrollTo(0, nextY);

        if (p < 1) {
          rafId = requestAnimationFrame(stepFrame);
        } else {
          snapping = false;
          cooldownUntil = Date.now() + 1600;
          lastY = window.scrollY;
        }
      };
      rafId = requestAnimationFrame(stepFrame);
    };

    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const y = window.scrollY;
      const delta = y - lastY;
      const now = Date.now();
      const dt = now - lastScrollTime;
      lastY = y;
      lastScrollTime = now;

      if (snapping || delta <= 0) return;

      // If delta is large or scroll speed is high, user is scrolling fast. Avoid hijacking.
      const speed = dt > 0 ? Math.abs(delta) / dt : 0;
      if (speed > 1.5 || delta > 40) {
        cooldownUntil = Date.now() + 1000;
        return;
      }

      if (Date.now() < cooldownUntil) return;

      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // A light downward scroll with the section edge on screen pulls it flush.
      if (rect.top < vh - 72 && rect.top > vh * 0.22) {
        glide(y + rect.top);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("wheel", onWheelUp, { passive: true });
    window.addEventListener("touchstart", abort, { passive: true });
    return () => {
      abort();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", onWheelUp);
      window.removeEventListener("touchstart", abort);
    };
  }, [reduced]);

  // Start the run once, the first time the section is properly on screen.
  // It never resets on scroll-out: the answered state stays put.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // The run: type the question, hold a beat on "Thinking", cascade the four
  // moves in order, then reveal the answer. Replays only on a world switch.
  useEffect(() => {
    if (!started || reduced) return;
    const q = worlds[active].question;
    const timers: number[] = [];
    let i = 0;
    const typer = window.setInterval(() => {
      i += 1;
      setTypedLen(i);
      if (i >= q.length) {
        window.clearInterval(typer);
        [1, 2, 3, 4, 5].forEach((p, idx) => {
          timers.push(
            window.setTimeout(
              () => setPhase(p),
              800 + idx * 850 + (p === 5 ? 250 : 0)
            )
          );
        });
      }
    }, 22);
    return () => {
      window.clearInterval(typer);
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, [started, active, reduced, worlds]);

  return (
    <section
      id="akashic-in-action"
      className={styles.section}
      ref={sectionRef}
    >
      <div className={`rail-container ${styles.container}`}>
        {/* The site's one eyebrow rail, full width above both columns. The
            "See what's underneath" button that ended this section went on 20
            Oct 2026: no section ends on a next-section button (founder). */}
        <ScrollReveal>
          <FigureEyebrow
            num={content.eyebrow.number}
            label={content.eyebrow.label}
          />
        </ScrollReveal>
        <div className={styles.grid}>
          {/* Left: narrative + world toggle */}
          <div className={styles.leftCol}>
            <ScrollReveal>
              <div>
                {/* Header rewritten 14 Oct 2026 (user: "watch Akashic answer it.
                    no one cares"). The headline states the executive gain the demo
                    proves (the cause, fast, defensible); the mechanism moves to
                    the lede and the four moves on the right. */}
                {/* From lg the setup line must hold on one line in the 5-col
                    column, so the size tracks the column width (measured 14 Oct
                    2026: the setup is ~10.7x its font size wide). */}
                <h2 className={styles.headline}>
                  <span className={styles.headlineSetup}>
                    {content.title.setup}
                  </span>
                  <br className={styles.headlineBr} /> {content.title.payoff}
                </h2>
                <p className={styles.lede}>{content.lede}</p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={80}>
              <div className={styles.tablistWrap}>
                <div
                  className={styles.tablist}
                  role="tablist"
                  aria-label={content.examplesLabel}
                >
                  {worlds.map((w, i) => (
                    <button
                      key={w.label}
                      type="button"
                      role="tab"
                      aria-selected={i === active}
                      onClick={() => {
                        if (i !== active) {
                          setActive(i);
                          setTypedLen(0);
                          setPhase(0);
                        }
                      }}
                      className={`${styles.tab} ${i === active ? styles.tabActive : ""}`}
                    >
                      {w.label}
                    </button>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right: the ask simulation */}
          <div className={styles.rightCol}>
            {/* Question card — a focused input while the run is underway */}
            <div
              className={`${styles.inputCard} ${
                running ? styles.inputCardRunning : styles.inputCardIdle
              }`}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={styles.searchIcon}
                aria-hidden
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <div className="min-w-0 flex-1">
                <p className={styles.questionText}>
                  {world.question.slice(0, typedLen)}
                  {(!typingDone || phase === 0) && started && !reduced && (
                    <span className={styles.caret}>|</span>
                  )}
                </p>
                <div className={styles.askerMeta}>
                  <span
                    className={`${styles.askerText} ${
                      typingDone ? styles.askerTextVisible : styles.askerTextHidden
                    }`}
                  >
                    {world.asker} &middot; {world.context}
                  </span>
                  {typingDone && phase < 5 && (
                    <span className={styles.statusIndicator}>
                      <span className={styles.statusDot} />
                      {STATUS_LABELS[phase]}&hellip;
                    </span>
                  )}
                </div>
              </div>

              {/* Enterprise input affordances. Mic is a real Akashic capability
                  (speech-to-text); the ⌘K hint and scope chip are honest UI. */}
              <div className={styles.inputAffordances}>
                <span className={styles.cmdK} aria-hidden>
                  &#8984;K
                </span>
                <span className={styles.micButton} aria-hidden>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 2a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" />
                    <path d="M19 10v1a7 7 0 0 1-14 0v-1M12 18v4" />
                  </svg>
                </span>
                <span className={styles.askBadge}>
                  <span>{chrome.ask}</span>
                  <svg
                    width="9"
                    height="9"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </span>
              </div>
            </div>

            {/* Four moves — hidden until the question is asked, then each row
                rises in as it lights. Space is reserved so the fold never jumps. */}
            <div className={styles.movesList} aria-hidden={phase === 0}>
              {world.steps.map((step, i) => {
                const lit = phase >= i + 1;
                return (
                  <div
                    key={step.name}
                    className={`${styles.moveRow} ${
                      lit ? styles.moveRowLit : styles.moveRowUnlit
                    }`}
                  >
                    <span className={styles.moveNumber}>
                      0{i + 1}
                    </span>
                    <p className={styles.moveContent}>
                      <span className={styles.moveName}>{step.name}</span>
                      <span className={styles.moveLine}>{step.line}</span>
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Answer card — always laid out so the fold never jumps; content
                pops in (and re-animates) when the run reaches the answer */}
            <div
              key={`ans-${active}-${revealed ? "on" : "off"}`}
              className={revealed ? styles.answerPop : styles.invisible}
              aria-hidden={!revealed}
            >
              <div className={styles.answerCard}>
                {/* Chrome strip: who answered, for whom */}
                <div className={styles.answerChrome}>
                  <AkashicWordmark className={styles.answerWordmark} />
                  <span className={styles.answerLabel}>
                    &middot; {chrome.answer}
                  </span>
                  <span className={styles.answerMeta}>
                    <span className={styles.metaPositiveDot} aria-hidden />
                    {chrome.for} {world.asker} &middot; {chrome.time}
                  </span>
                  {/* Read the answer aloud. Akashic ships text-to-speech. */}
                  <span className={styles.speakerButton} aria-hidden>
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M11 5L6 9H2v6h4l5 4V5z" />
                      <path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a9 9 0 0 1 0 14" />
                    </svg>
                  </span>
                </div>

                <div className={styles.answerBody}>
                  <p className={styles.answerTitle}>
                    {world.answer}
                  </p>
                  <p className={styles.answerDetail}>
                    {world.answerDetail}
                  </p>

                  {/* The proof, side by side: numbers and paperwork */}
                  <div className={styles.panelsGrid}>
                    <SystemsPanel world={world} chrome={chrome} />
                    <DocumentsPanel world={world} chrome={chrome} />
                  </div>

                  {/* Evidence footer */}
                  <div className={styles.chipsFooter}>
                    {world.chips.map((chip, i) => (
                      <span
                        key={chip.label}
                        className={styles.chip}
                        style={{
                          animation: `akx-rise 0.5s ${1.55 + i * 0.12}s cubic-bezier(0.2,0.8,0.2,1) both`,
                        }}
                      >
                        <span className={styles.chipIcon}>
                          <UiIcon icon={chip.icon} />
                        </span>
                        {chip.label}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
