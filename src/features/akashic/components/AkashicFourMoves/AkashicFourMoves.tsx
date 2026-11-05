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
 * plain words. Since 5 Nov 2026 (platform audit) the section arrives with the
 * answer already shown: the run plays only from its play control (Rule 6b),
 * and the page no longer glides itself to this section.
 *
 * Everything on the right is SIMULATED PRODUCT UI (AGENTS.md §8a): canned
 * copy and demo data for storytelling only.
 */

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import type { AkashicPage } from "@/content/pages/akashic";
import { AkashicWordmark } from "@/shared/components/icons";
import { FigureEyebrow, MotionToggle, ScrollReveal } from "@/shared/components/ui";
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
  /* False: the finished answer is shown. True: the run is replaying. */
  const [playing, setPlaying] = useState(false);
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const reduced = usePrefersReducedMotion();

  const world = worlds[active];
  const run = playing && !reduced;
  const typedLen = run ? typedRun : world.question.length;
  const phase = run ? phaseRun : 5;
  const typingDone = typedLen >= world.question.length;
  const revealed = phase === 5;
  const running = run && !revealed;

  const selectWorld = (i: number) => {
    if (i === active) return;
    setActive(i);
    setPlaying(false);
  };

  // Roving focus across the two examples (WAI-ARIA tabs pattern).
  const onTabKey = (event: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const last = worlds.length - 1;
    const next =
      event.key === "ArrowRight" ? (i === last ? 0 : i + 1)
      : event.key === "ArrowLeft" ? (i === 0 ? last : i - 1)
      : event.key === "Home" ? 0
      : event.key === "End" ? last
      : -1;
    if (next < 0) return;
    event.preventDefault();
    selectWorld(next);
    tabsRef.current[next]?.focus();
  };

  const togglePlay = () => {
    if (playing) {
      setPlaying(false);
      return;
    }
    setTypedLen(0);
    setPhase(0);
    setPlaying(true);
  };

  // The run: type the question, hold a beat on "Thinking", cascade the four
  // moves in order, then reveal the answer and settle.
  useEffect(() => {
    if (!run) return;
    const q = world.question;
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
              () => {
                setPhase(p);
                if (p === 5) setPlaying(false);
              },
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
  }, [run, world.question]);

  return (
    <section id="akashic-in-action" className={styles.section}>
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
                      ref={(node) => {
                        tabsRef.current[i] = node;
                      }}
                      id={`ask-tab-${i}`}
                      type="button"
                      role="tab"
                      aria-selected={i === active}
                      aria-controls="ask-run"
                      tabIndex={i === active ? 0 : -1}
                      onClick={() => selectWorld(i)}
                      onKeyDown={(event) => onTabKey(event, i)}
                      className={`${styles.tab} ${i === active ? styles.tabActive : ""}`}
                    >
                      {w.label}
                    </button>
                  ))}
                </div>
                <MotionToggle
                  paused={!playing}
                  onToggle={togglePlay}
                  controls={content.replayLabel}
                />
              </div>
            </ScrollReveal>
          </div>

          {/* Right: the ask simulation */}
          <div
            id="ask-run"
            role="tabpanel"
            aria-labelledby={`ask-tab-${active}`}
            className={styles.rightCol}
          >
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
                  {(!typingDone || phase === 0) && run && (
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
