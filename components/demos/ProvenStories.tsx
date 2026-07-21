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
 */

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { usePrefersReducedMotion } from "@/hooks/useCountUp";

const CYCLE_MS = 7000;

type Metric = { value: string; label: string };

type Story = {
  id: string;
  platform: string;
  authority: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  metrics: Metric[];
};

const STORIES: Story[] = [
  {
    id: "learning",
    platform: "National Learning Platform",
    authority: "Education · Country-scale deployment",
    title: "One Learning Record Across 36 States and 135 Languages",
    description:
      "Akashic is the intelligence layer inside a national education platform, turning transaction logs from every state into curriculum, retention, and resource insight that programme owners can act on.",
    image: "/proof/learning.jpg",
    alt: "Students at their desks in a school classroom",
    metrics: [
      { value: "5.75B+", label: "Learning interactions connected" },
      { value: "135", label: "Languages connected" },
    ],
  },
  {
    id: "mobility",
    platform: "Overseas Employment Registry",
    authority: "Labour mobility · Country-scale deployment",
    title: "Four Million Worker Clearances, Traceable End to End",
    description:
      "Visa clearances, immigration logs, and overseas employer records unified into a single auditable view, so labour corridors stay monitored and recruitment compliance stays verifiable.",
    image: "/proof/mobility.jpg",
    alt: "Travellers crossing a sunlit airport departure hall",
    metrics: [
      { value: "4M+", label: "Worker clearances on record" },
      { value: "18", label: "Destination corridors" },
    ],
  },
  {
    id: "immunisation",
    platform: "National Immunisation Registry",
    authority: "Public health · Country-scale deployment",
    title: "Two Billion Vaccinations, Recorded and Reconciled",
    description:
      "The intelligence layer behind a country's immunisation record, reconciling doses, sessions, and coverage into figures health authorities can stand behind.",
    image: "/proof/vaccination.jpg",
    alt: "A health worker vaccinating an infant at an immunisation clinic",
    metrics: [{ value: "2 Billion+", label: "Vaccinations recorded" }],
  },
];

/* Figures are static by design. Count-up was tried and removed: these targets
   are small ("2 Billion+", "4M+"), so an animation from zero spends most of
   its run showing a wrong number ("0 Billion+") and reads as a glitch. */
function splitValue(value: string) {
  const match = value.match(/^([\d.]+)(.*)$/);
  if (!match) return { figure: value, suffix: "" };
  return { figure: match[1], suffix: match[2] };
}

function MetricCell({ metric }: { metric: Metric }) {
  const { figure, suffix } = splitValue(metric.value);

  return (
    <div>
      <div className="mb-2 flex items-baseline leading-none text-blue">
        <span className="text-[42px] font-semibold leading-none tracking-tighter tabular-nums sm:text-5xl md:text-[56px]">
          {figure}
        </span>
        {suffix && (
          <span className="whitespace-pre text-2xl font-medium leading-none md:text-4xl">
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

export default function ProvenStories() {
  const reduced = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback(
    (next: number) => setIndex((next + STORIES.length) % STORIES.length),
    []
  );

  useEffect(() => {
    if (reduced || paused) return;
    const timer = setTimeout(() => go(index + 1), CYCLE_MS);
    return () => clearTimeout(timer);
  }, [index, paused, reduced, go]);

  return (
    <div
      className="relative"
      role="group"
      aria-roledescription="carousel"
      aria-label="Akashic deployments in production"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="relative w-full overflow-hidden rounded-2xl border border-lineSoft bg-white shadow-frame">
        {STORIES.map((story, i) => {
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
                    <div className="text-[26px] font-semibold leading-none tracking-tight text-ink">
                      {story.platform}
                    </div>
                    <div className="mt-2.5 font-mono text-[10px] uppercase tracking-eyebrow text-overcast">
                      {story.authority}
                    </div>
                  </div>

                  <h3 className="mb-5 text-2xl font-semibold leading-[1.15] tracking-tight text-ink md:text-3xl lg:text-[34px]">
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
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Edge arrows are a desktop affordance only: on stacked mobile they
          would sit on top of the story copy. Touch gets the padded dot rail. */}
      <button
        type="button"
        onClick={() => go(index - 1)}
        aria-label="Previous deployment"
        className="absolute left-5 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-lineSoft bg-white/95 text-ink shadow-[0_10px_30px_-10px_rgba(16,24,40,0.35)] backdrop-blur transition-colors duration-settle ease-settle hover:border-blue/50 hover:text-blue lg:flex"
      >
        <Chevron dir="left" />
      </button>
      <button
        type="button"
        onClick={() => go(index + 1)}
        aria-label="Next deployment"
        className="absolute right-5 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-lineSoft bg-white/95 text-ink shadow-[0_10px_30px_-10px_rgba(16,24,40,0.35)] backdrop-blur transition-colors duration-settle ease-settle hover:border-blue/50 hover:text-blue lg:flex"
      >
        <Chevron dir="right" />
      </button>

      <div className="mt-6 flex items-center justify-center lg:mt-8">
        {STORIES.map((story, i) => (
          <button
            key={story.id}
            type="button"
            onClick={() => go(i)}
            aria-label={`Show ${story.platform}`}
            aria-current={i === index}
            className="flex items-center justify-center p-2.5"
          >
            {i === index ? (
              <span className="relative block h-1.5 w-11 overflow-hidden rounded-full bg-lineSoft">
                <span
                  key={index}
                  className="absolute inset-y-0 left-0 block rounded-full bg-blue"
                  style={
                    reduced
                      ? { width: "100%" }
                      : {
                          animation: `progressFill ${CYCLE_MS}ms linear forwards`,
                          animationPlayState: paused ? "paused" : "running",
                        }
                  }
                />
              </span>
            ) : (
              <span className="block h-1.5 w-1.5 rounded-full bg-line transition-colors duration-settle ease-settle hover:bg-inkSoft" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
