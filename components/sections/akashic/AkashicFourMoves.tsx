"use client";

/*
 * [01] How It Works — One Model, Four Moves.
 * The per-move micro-visuals are SIMULATED PRODUCT UI (see AGENTS.md §8a):
 * canned chips, transcripts, and timestamps for visual storytelling only.
 * The Understood and Delivered visuals follow the active world toggle.
 */

import { useEffect, useState } from "react";
import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";

const WORLD_INTERVAL = 4600;

const worlds = [
  {
    label: "Enterprise",
    question: "Why is one region falling behind on target, and what’s driving it?",
    context: "vs Q3 target · South region",
    recipient: "Regional head",
    initials: "RH",
  },
  {
    label: "Public programmes",
    question: "Why are enrolments lagging in one district, and what’s driving it?",
    context: "vs enrolment target · District 7",
    recipient: "District lead",
    initials: "DL",
  },
];

/* ------------------------------------------------------------------ */
/*  Per-move micro-visuals                                             */
/* ------------------------------------------------------------------ */

function ConnectedVisual() {
  const feeds = [
    { name: "Sales records", dot: "#00A1E0" },
    { name: "Scheme data", dot: "#30A46C" },
    { name: "Field reports", dot: "#E8491D" },
    { name: "Ops logs", dot: "#1F2A44" },
  ];
  return (
    <div className="mt-4 flex max-w-[30em] flex-wrap items-center gap-2">
      {feeds.map((feed, i) => (
        <span
          key={feed.name}
          className="inline-flex items-center gap-1.5 rounded-full border border-subtle-stroke bg-white px-3 py-1 text-[11.5px] font-medium text-ink shadow-card"
        >
          <span
            className="h-1.5 w-1.5 rounded-full animate-[ps-pulse_2.4s_infinite]"
            style={{ background: feed.dot, animationDelay: `${i * 350}ms` }}
          />
          {feed.name}
        </span>
      ))}
      <span className="text-[11px] text-overcast">synced just now</span>
    </div>
  );
}

function UnderstoodVisual({ world }: { world: number }) {
  return (
    <div className="mt-4 flex max-w-[30em] flex-wrap items-center gap-2">
      <span className="rounded-[7px] border border-subtle-stroke bg-white px-2.5 py-1 font-mono text-[10.5px] text-ink shadow-card">
        “behind”
      </span>
      <svg width="22" height="12" viewBox="0 0 22 12" fill="none" aria-hidden className="shrink-0">
        <path d="M 0 6 Q 11 2, 22 6" stroke="#3E63DD" strokeWidth="1.3" opacity="0.3" />
        <path d="M 0 6 Q 11 2, 22 6" stroke="#3E63DD" strokeWidth="1.5" strokeDasharray="6 26" className="animate-[ps-flow_1.8s_linear_infinite]" opacity="0.85" />
      </svg>
      <span className="rounded-[7px] border border-blue-border bg-blue-subtle px-2.5 py-1 font-mono text-[10.5px] font-semibold text-blue">
        {worlds[world].context}
      </span>
      <span className="text-[11px] text-overcast">one meaning, everywhere</span>
    </div>
  );
}

function ReasonedVisual() {
  return (
    <div className="mt-4 max-w-[26em] rounded-[10px] border border-subtle-stroke bg-primary-bg px-3.5 py-2.5 font-mono text-[10.5px] leading-relaxed text-inkSoft shadow-card">
      <span className="text-overcast">trace:</span>&nbsp;question &rarr; governed model &rarr; evidence
      <br />
      <span className="text-overcast">sources:</span>&nbsp;3 merged · 1 golden record
      <span className="ml-0.5 font-bold text-blue animate-[ps-caret-blink_1s_step-end_infinite]">|</span>
    </div>
  );
}

function DeliveredVisual({ world }: { world: number }) {
  return (
    <div className="mt-4 flex max-w-[26em] items-center gap-3 rounded-[12px] border border-subtle-stroke bg-white px-3.5 py-2.5 shadow-card">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-subtle text-[11px] font-bold text-blue">
        {worlds[world].initials}
      </div>
      <div className="min-w-0 flex-1">
        <div className="truncate text-[12px] font-semibold text-ink">
          {worlds[world].recipient} · notified
        </div>
        <div className="truncate text-[11px] text-inkSoft">Plain-language brief, with the why attached</div>
      </div>
      <span className="shrink-0 font-mono text-[10px] text-overcast">09:41</span>
    </div>
  );
}

const moves = [
  {
    name: "Connected",
    desc: "Every system that touches the question: sales records or scheme data, field reports or operational logs. Pulled in the moment anything changes.",
    visual: (_world: number) => <ConnectedVisual />,
  },
  {
    name: "Understood",
    desc: "Linked with context: which team or which district, which target or which indicator. So “behind” means the same thing wherever it’s asked.",
    visual: (world: number) => <UnderstoodVisual world={world} />,
  },
  {
    name: "Reasoned",
    desc: "Ask why, and the AI reasons over that one governed model. Not a guess. Not three reports with three different numbers.",
    visual: (_world: number) => <ReasonedVisual />,
  },
  {
    name: "Delivered",
    desc: "The answer reaches whoever’s accountable, in plain language, in time to act. Not in a report two weeks from now.",
    visual: (world: number) => <DeliveredVisual world={world} />,
  },
];

/* ------------------------------------------------------------------ */
/*  Section                                                            */
/* ------------------------------------------------------------------ */

export default function AkashicFourMoves() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const interval = WORLD_INTERVAL + (prefersReduced ? 1400 : 0);
    const id = setInterval(() => {
      setActive((i) => (i + 1) % worlds.length);
    }, interval);
    return () => clearInterval(id);
  }, [paused]);

  return (
    <section id="how-it-works" className="scroll-mt-24 border-t border-lineSoft bg-white">
      <div className="rail-container pt-12 pb-24 lg:pt-16 lg:pb-32">
        <ScrollReveal>
          <p className="font-mono text-[11px] uppercase tracking-eyebrow">
            <span className="text-overcast">[01]</span>
            <span className="text-inkSoft">&nbsp;&nbsp;How it works</span>
          </p>
          <h2 className="mt-5 max-w-[13em] text-heading-sm font-semibold text-ink md:text-heading-md lg:text-heading-lg">
            One governed model. Four moves. No hand-offs.
          </h2>
        </ScrollReveal>

        <div className="mt-14 grid gap-12 lg:mt-16 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
          {/* Left: the two worlds, one question widget */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <ScrollReveal>
              <div className="inline-flex rounded-full border border-subtle-stroke bg-tertiary-bg p-1">
                {worlds.map((world, i) => (
                  <button
                    key={world.label}
                    type="button"
                    onClick={() => {
                      setActive(i);
                      setPaused(true);
                    }}
                    aria-pressed={i === active}
                    className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-250 ease-settle ${
                      i === active
                        ? "bg-white text-ink shadow-card"
                        : "text-inkSoft hover:text-ink"
                    }`}
                  >
                    {world.label}
                  </button>
                ))}
              </div>

              <div className="mt-6 rounded-frame border border-subtle-stroke bg-white p-5 shadow-card">
                <div className="flex items-start gap-3">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mt-1.5 shrink-0 text-blue"
                    aria-hidden
                  >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                  <div className="grid min-w-0 flex-1 text-left">
                    {worlds.map((world, i) => (
                      <p
                        key={world.label}
                        aria-hidden={i !== active}
                        className="col-start-1 row-start-1 text-lg font-medium leading-snug text-ink"
                        style={{
                          opacity: i === active ? 1 : 0,
                          filter: i === active ? "blur(0)" : "blur(4px)",
                          transform: i === active ? "translateY(0)" : "translateY(4px)",
                          transition:
                            "opacity 380ms cubic-bezier(0.2,0.8,0.2,1), filter 380ms cubic-bezier(0.2,0.8,0.2,1), transform 380ms cubic-bezier(0.2,0.8,0.2,1)",
                        }}
                      >
                        &ldquo;{world.question}&rdquo;
                        <span
                          className="ml-0.5 font-bold text-blue"
                          style={{ animation: "ps-caret-blink 1s step-end infinite" }}
                        >
                          |
                        </span>
                      </p>
                    ))}
                  </div>
                  <span className="mt-1 flex shrink-0 items-center gap-1 self-start rounded-full bg-blue px-2.5 py-1 text-[9px] font-bold tracking-[0.06em] text-white shadow-[0_2px_5px_rgba(62,99,221,0.2)]">
                    ASK
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </span>
                </div>
              </div>

              <p className="mt-5 max-w-[30em] text-sm leading-relaxed text-inkSoft">
                Two different worlds. The same four moves get either one answered.
              </p>
            </ScrollReveal>
          </div>

          {/* Right: the four moves rail */}
          <div className="relative">
            <div
              className="absolute left-[19px] top-8 bottom-8 w-px bg-gradient-to-b from-blue-border via-lineSoft to-blue"
              aria-hidden
            />
            {moves.map((move, i) => (
              <ScrollReveal key={move.name} delay={i * 90}>
                <div className="relative grid grid-cols-[40px_1fr] gap-x-6 py-7 first:pt-0 last:pb-0">
                  <div
                    className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full border font-mono text-[11px] font-medium ${
                      i === moves.length - 1
                        ? "border-blue bg-blue text-white shadow-[0_4px_12px_rgba(62,99,221,0.35)]"
                        : "border-blue-border bg-blue-subtle text-blue"
                    }`}
                  >
                    0{i + 1}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold tracking-tight text-ink md:text-2xl">
                      {move.name}
                    </h3>
                    <p className="mt-2 max-w-[34em] text-base leading-relaxed text-inkSoft">
                      {move.desc}
                    </p>
                    {move.visual(active)}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Closing statement */}
        <ScrollReveal>
          <div className="mt-20 flex flex-col items-center border-t border-lineSoft pt-14 text-center lg:mt-24">
            <p className="max-w-[24em] text-2xl font-semibold leading-snug tracking-tight text-ink md:text-[28px]">
              Two different questions. One governed model behind both answers.
              That&rsquo;s what &ldquo;grounded&rdquo; means, in practice.
            </p>
            <Link href="#modules" className="btn-secondary mt-8">
              See every module
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                aria-hidden
              >
                <path
                  d="M6 2.5V9.5M6 9.5L2.5 6M6 9.5L9.5 6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
