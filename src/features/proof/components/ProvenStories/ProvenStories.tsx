"use client";

/*
 * One-deployment-at-a-time proof carousel for ProvenAtScale.
 * Real deployment data, not simulated UI: every figure is sourced from the
 * approved scale stats (Rule 4). Slides cross-fade in place rather than
 * sliding, so the card never changes height mid-transition.
 * Photography is illustrative of the sector, not a screenshot of the system.
 *
 * NAMING: these are government deployments we cannot claim publicly by name,
 * so neither the system nor the commissioning ministry is identified — each
 * story is carried by its sector and its public-record figures instead. Do
 * not reintroduce platform or authority names here.
 *
 * METRIC TEST (user direction, Jul 2026): every figure here must be something
 * DHIRA can defend as its OWN result, not a property of the domain it landed
 * in. "135 languages connected" and "18 destination corridors" were removed on
 * that test — they describe the programme's scope (the languages the course
 * material was already in), not anything the platform computed. Volume figures
 * that describe what Akashic actually unified and reconciled stay. Before
 * adding a metric, ask: would we defend this in the room as our result?
 *
 * ANALYTICAL CLAIMS ONLY (user direction, 22 Jul 2026): on all three of these
 * DHIRA built the intelligence layer, not the transaction system. So the copy
 * may claim what was unified, resolved, reconciled, and read — never what was
 * run, cleared, delivered, or enforced. Verbs like "recorded", "managed",
 * "served", "traceable end to end" and "compliance stays verifiable" were cut
 * for exactly this: they read as ownership of the operation, which is the one
 * claim we could not defend in the room. Titles carry the claim and stay
 * number-free; the two KPIs underneath carry the figures.
 *
 * SOURCES for the second KPI on each card (added 22 Jul 2026, Rule 4):
 *   187M+ enrolments  — same figure the /services proof section carries.
 *   282K+ employer profiles — same figure FieldLedger already carries.
 *   26M+ vaccination sessions — public record. At the 200 crore dose milestone
 *     (17 Jul 2022) the programme reported 2,00,00,15,631 doses administered
 *     across 2,63,26,111 sessions, i.e. 2.63 crore. Deliberately the SAME
 *     milestone the "2 Billion+" figure comes from, so the two numbers on the
 *     card are consistent with each other. If the dose figure is ever revised
 *     upward, revise the session figure from the same release or drop it.
 */

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Metric, Story } from "@/content/collections/customer-stories";
import { MotionToggle } from "@/shared/components/ui";
import useOnScreen from "@/shared/hooks/useOnScreen";
import usePrefersReducedMotion from "@/shared/hooks/usePrefersReducedMotion";
import { useUi } from "@/shared/providers/UiProvider";
import { cx } from "@/shared/utils/cx";
import styles from "./ProvenStories.module.scss";

const CYCLE_MS = 7000;

/* Story data, its naming rules and sources live in lib/customerStories.ts,
   shared with the /customers library (moved 15 Oct 2026). */

/* Figures are static by design. Count-up was tried and removed: these targets
   are small ("2 billion+", "4 million+"), so an animation from zero spends most
   of its run showing a wrong number and reads as a glitch. Units are words,
   never "B", "M" or "K" (no short forms, 21 Oct 2026), so the unit is set
   smaller than the figure. */
function splitValue(value: string) {
  const match = value.match(/^([\d.,]+)(.*)$/);
  if (!match) return { figure: value, suffix: "" };
  return { figure: match[1], suffix: match[2] };
}

function MetricCell({ metric }: { metric: Metric }) {
  const { figure, suffix } = splitValue(metric.value);

  return (
    <div>
      <div className={styles.metricValue}>
        <span className={styles.metricFigure}>
          {figure}
        </span>
        {suffix && (
          <span className={styles.metricSuffix}>
            {suffix}
          </span>
        )}
      </div>
      <div className={styles.metricLabel}>
        {metric.label}
      </div>
    </div>
  );
}

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <polyline points={dir === "left" ? "15 18 9 12 15 6" : "9 18 15 12 9 6"} />
    </svg>
  );
}

export interface ProvenStoriesProps {
  stories: Story[];
  ariaLabel: string;
  /** What one story is called in the controls ("Previous deployment"). */
  itemNoun: string;
}

export function ProvenStories({ stories, ariaLabel, itemNoun }: ProvenStoriesProps) {
  const { carousel, motion } = useUi();
  const reduced = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const [hovered, setPaused] = useState(false);
  /* Picking a story stops the cycle until Play (UX review, 23 Oct 2026). */
  const [stopped, setStopped] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const onScreen = useOnScreen(rootRef);
  // Off screen counts as paused: the cycle only runs where it can be seen.
  const paused = hovered || !onScreen || stopped;

  const go = useCallback(
    (next: number) => setIndex((next + stories.length) % stories.length),
    [stories]
  );
  const pick = (next: number) => {
    setStopped(true);
    go(next);
  };

  useEffect(() => {
    if (reduced || paused) return;
    const timer = setTimeout(() => go(index + 1), CYCLE_MS);
    return () => clearTimeout(timer);
  }, [index, paused, reduced, go]);

  return (
    <div
      ref={rootRef}
      className={styles.root}
      role="group"
      aria-roledescription={carousel.roleDescription}
      aria-label={ariaLabel}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className={styles.frame}>
        {stories.map((story, i) => {
          const isActive = i === index;
          return (
            <div
              key={story.id}
              aria-hidden={!isActive}
              className={cx(styles.slide, isActive ? styles.slideActive : styles.slideHidden)}
            >
              <div className={styles.slideGrid}>
                <div className={styles.story}>
                  <div className={styles.storyHead}>
                    <div className={styles.platform}>
                      {story.platform}
                    </div>
                    <div className={styles.authority}>
                      {story.authority}
                    </div>
                  </div>

                  <h3 className={styles.title}>
                    {story.title}
                  </h3>

                  <p className={styles.description}>
                    {story.description}
                  </p>

                  <div className={styles.metrics}>
                    <div className={styles.metricsGrid}>
                      {story.metrics.map((metric) => (
                        <MetricCell key={metric.label} metric={metric} />
                      ))}
                    </div>
                  </div>
                </div>

                <div className={styles.photo}>
                  <Image
                    src={story.image}
                    alt={story.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className={styles.photoImage}
                    priority={i === 0}
                  />
                  
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Arrows are a desktop affordance only: on stacked mobile they would sit
          on top of the story copy. Touch gets the padded dot rail. Both flank
          the photography half rather than the story half — at `left-5` the prev
          arrow overlapped the paragraph's last line, since the text column's
          `lg:p-14` inset is narrower than the arrow's own diameter. */}
      <button
        type="button"
        onClick={() => pick(index - 1)}
        aria-label={`${carousel.previous} ${itemNoun}`}
        className={cx(styles.arrow, styles.arrowPrevious)}
      >
        <Chevron dir="left" />
      </button>
      <button
        type="button"
        onClick={() => pick(index + 1)}
        aria-label={`${carousel.next} ${itemNoun}`}
        className={cx(styles.arrow, styles.arrowNext)}
      >
        <Chevron dir="right" />
      </button>

      <div className={styles.dots}>
        {stories.map((story, i) => (
          <button
            key={story.id}
            type="button"
            onClick={() => pick(i)}
            aria-label={`${carousel.show} ${story.platform}`}
            aria-current={i === index}
            className={styles.dotButton}
          >
            {i === index ? (
              <span className={styles.progress}>
                <span
                  key={index}
                  className={styles.progressFill}
                  style={
                    reduced || stopped
                      ? { width: "100%" }
                      : {
                          animation: `progressFill ${CYCLE_MS}ms linear forwards`,
                          animationPlayState: paused ? "paused" : "running",
                        }
                  }
                />
              </span>
            ) : (
              <span className={styles.dot} />
            )}
          </button>
        ))}
        <MotionToggle paused={stopped} onToggle={() => setStopped((s) => !s)} controls={motion.stories} className={styles.motionToggle} />
      </div>
    </div>
  );
}
