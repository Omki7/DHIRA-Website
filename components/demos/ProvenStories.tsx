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
 *   187M+ enrolments  — same figure DeliveryProven already carries.
 *   282K+ employer profiles — same figure FieldLedger already carries.
 *   26M+ vaccination sessions — public record. At the 200 crore dose milestone
 *     (17 Jul 2022) the programme reported 2,00,00,15,631 doses administered
 *     across 2,63,26,111 sessions, i.e. 2.63 crore. Deliberately the SAME
 *     milestone the "2 Billion+" figure comes from, so the two numbers on the
 *     card are consistent with each other. If the dose figure is ever revised
 *     upward, revise the session figure from the same release or drop it.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import useOnScreen from "@/hooks/useOnScreen";
import Image from "next/image";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";
import { useUi } from "@/components/providers/UiProvider";
import MotionToggle from "@/components/ui/MotionToggle";
import type { Metric, Story } from "@/content/collections/customer-stories";

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
      <div className="mb-2 flex items-baseline leading-none text-ink">
        <span className="text-[42px] font-semibold leading-none tracking-tighter tabular-nums sm:text-5xl md:text-[56px]">
          {figure}
        </span>
        {suffix && (
          <span className="whitespace-pre text-xl font-medium leading-none tabular-nums tracking-tight md:text-[28px]">
            {suffix}
          </span>
        )}
      </div>
      <div className="text-sm leading-snug text-inkSoft md:text-base">
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

interface ProvenStoriesProps {
  stories: Story[];
  ariaLabel: string;
  /** What one story is called in the controls ("Previous deployment"). */
  itemNoun: string;
}

export default function ProvenStories({ stories, ariaLabel, itemNoun }: ProvenStoriesProps) {
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
      className="relative"
      role="group"
      aria-roledescription={carousel.roleDescription}
      aria-label={ariaLabel}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="relative w-full overflow-hidden rounded-outer border border-lineSoft bg-background ">
        {stories.map((story, i) => {
          const isActive = i === index;
          return (
            <div
              key={story.id}
              aria-hidden={!isActive}
              className={`transition-opacity duration-500 ease-smooth ${
                isActive
                  ? "relative z-10 opacity-100"
                  : "pointer-events-none absolute inset-0 z-0 opacity-0"
              }`}
            >
              <div className="grid h-full grid-cols-1 lg:grid-cols-2">
                <div className="flex flex-col p-8 md:p-12 lg:p-14">
                  <div className="mb-7">
                    <div className="text-[26px] font-semibold leading-none tabular-nums tracking-tight text-ink">
                      {story.platform}
                    </div>
                    <div className="mt-2.5 font-mono text-[10px] uppercase tracking-eyebrow text-overcast">
                      {story.authority}
                    </div>
                  </div>

                  <h3 className="mb-5 text-2xl font-medium leading-[1.15] tracking-tight text-ink md:text-3xl lg:text-[34px]">
                    {story.title}
                  </h3>

                  <p className="mb-10 text-base leading-relaxed text-inkSoft md:text-lg">
                    {story.description}
                  </p>

                  <div className="mt-auto border-t border-lineSoft pt-7">
                    <div className="grid grid-cols-2 gap-8">
                      {story.metrics.map((metric) => (
                        <MetricCell key={metric.label} metric={metric} />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="relative aspect-[4/3] overflow-hidden lg:aspect-auto lg:min-h-[600px]">
                  <Image
                    src={story.image}
                    alt={story.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
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
        className="absolute -left-5 lg:-left-6 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-lineSoft bg-background text-ink  transition-colors duration-200 ease-settle hover:border-blue/50 hover:text-blue lg:flex"
      >
        <Chevron dir="left" />
      </button>
      <button
        type="button"
        onClick={() => pick(index + 1)}
        aria-label={`${carousel.next} ${itemNoun}`}
        className="absolute -right-5 lg:-right-6 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-lineSoft bg-background text-ink  transition-colors duration-200 ease-settle hover:border-blue/50 hover:text-blue lg:flex"
      >
        <Chevron dir="right" />
      </button>

      <div className="mt-6 flex items-center justify-center lg:mt-8">
        {stories.map((story, i) => (
          <button
            key={story.id}
            type="button"
            onClick={() => pick(i)}
            aria-label={`${carousel.show} ${story.platform}`}
            aria-current={i === index}
            className="flex items-center justify-center p-2.5"
          >
            {i === index ? (
              <span className="relative block h-1.5 w-11 overflow-hidden rounded-full bg-lineSoft">
                <span
                  key={index}
                  className="absolute inset-y-0 left-0 block w-full origin-left rounded-full bg-blue"
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
              <span className="block h-1.5 w-1.5 rounded-full bg-line transition-colors duration-200 ease-settle hover:bg-inkSoft" />
            )}
          </button>
        ))}
        <MotionToggle paused={stopped} onToggle={() => setStopped((s) => !s)} controls={motion.stories} className="ml-3" />
      </div>
    </div>
  );
}
