"use client";

/*
 * [04] How We Hire — The Loop, as a Scene.
 * Deliberately un-boxed: no console frame, no header/footer chrome (that
 * idiom belongs to [02]). Four clickable stations advance a hand-drawn
 * human moment per step — a both-ways call, a shipped-system deep-dive, a
 * shared-editor session, an answer handed over in writing — rendered as
 * open line-art illustrations with pinned notes (tilted, not gridded).
 * Sits on the page's second blue band with soft glows, so the white run
 * breaks and the section reads human, not UI.
 * Copy is the approved four-step text. Auto-advances, locks on click.
 */

import Link from "next/link";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import Bust from "@/components/demos/LineArtBust";
import { usePrefersReducedMotion } from "@/hooks/useCountUp";

const CYCLE_MS = 6400;

const steps = [
  {
    num: "01",
    name: "Intro call",
    tag: "Both ways",
    desc: "Thirty minutes with the team you would join. It goes both ways: you interview us too.",
  },
  {
    num: "02",
    name: "Technical deep-dive",
    tag: "No puzzles",
    desc: "A conversation about real problems we have shipped. No whiteboard puzzles, no trick questions.",
  },
  {
    num: "03",
    name: "Working session",
    tag: "Real work",
    desc: "Solve something real with the people you would work with, drawn from an actual problem, not a staged one.",
  },
  {
    num: "04",
    name: "Decision",
    tag: "Yes or no",
    desc: "A clear yes or no, with reasons. We tell the truth. It is one of the written principles.",
  },
];

function PinnedNote({
  children,
  className,
  tilt,
}: {
  children: ReactNode;
  className: string;
  tilt: string;
}) {
  return (
    <div
      className={`absolute flex items-center gap-2 rounded-card border border-subtle-stroke bg-white/95 px-3 py-2 shadow-frame backdrop-blur-sm ${tilt} ${className}`}
    >
      {children}
    </div>
  );
}

function VoiceBars({ className }: { className?: string }) {
  return (
    <span className={`flex items-end gap-[3px] ${className ?? ""}`} aria-hidden>
      {[6, 11, 8, 5].map((h, i) => (
        <span
          key={i}
          className="w-[3px] rounded-full bg-current"
          style={{ height: `${h}px`, animation: `softpulse 1.1s ease-in-out ${i * 0.18}s infinite` }}
        />
      ))}
    </span>
  );
}

/* Step 01 — a call that goes both ways. */
function CallScene() {
  return (
    <div className="relative mx-auto w-full max-w-[440px]">
      <svg viewBox="0 0 300 210" fill="none" aria-hidden className="w-full">
        <path
          d="M84 84 C118 44 178 44 212 88"
          className="stroke-blue-border animate-[dashmove_2s_linear_infinite]"
          strokeWidth={2}
          strokeDasharray="7 7"
          strokeLinecap="round"
        />
        <circle cx="148" cy="52" r="6" className="fill-blue animate-[ps-pulse_2s_infinite]" />
        <circle cx="148" cy="52" r="11" className="stroke-blue/40 animate-[ps-ring_2.6s_ease-out_infinite]" strokeWidth={1.5} fill="none" />
        <path d="M112 60 q-8 2 -8 -6" className="stroke-blue/50" strokeWidth={1.6} fill="none" strokeLinecap="round" />
        <path d="M188 60 q8 2 8 -6" className="stroke-blue/50" strokeWidth={1.6} fill="none" strokeLinecap="round" />
        <Bust cx={64} cy={104} r={17} tone="blue" />
        {/* the team you would join, standing together */}
        <Bust cx={202} cy={106} r={12} tone="soft" smile={false} />
        <Bust cx={258} cy={106} r={12} tone="soft" smile={false} />
        <Bust cx={230} cy={102} r={15} tone="ink" />
      </svg>
      <PinnedNote className="-left-1 bottom-2 sm:left-2" tilt="-rotate-3">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden className="text-inkSoft">
          <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1" />
          <path d="M6 3.5V6l1.5 1.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-ink">30:00</span>
        <VoiceBars className="h-3 text-blue" />
      </PinnedNote>
      <PinnedNote className="-right-1 top-1 sm:right-2" tilt="rotate-2">
        <span className="font-mono text-[9px] font-semibold uppercase tracking-eyebrow text-blue">Questions both ways</span>
      </PinnedNote>
    </div>
  );
}

/* Step 02 — a shipped system on the table, not a whiteboard. */
function DeepDiveScene() {
  return (
    <div className="relative mx-auto w-full max-w-[440px]">
      <svg viewBox="0 0 300 210" fill="none" aria-hidden className="w-full">
        <path d="M74 150 H244" className="stroke-lineSoft" strokeWidth={1.5} strokeLinecap="round" />
        <path
          d="M78 146 L104 132 L124 138 L150 108 L178 118 L206 82 L238 92"
          className="stroke-blue"
          strokeWidth={2.4}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="206" cy="82" r="4.5" className="fill-blue animate-[ps-pulse_2s_infinite]" />
        <circle cx="206" cy="82" r="9" className="stroke-blue/40 animate-[ps-ring_2.6s_ease-out_infinite]" strokeWidth={1.5} fill="none" />
        {/* team member, pointing at the live system */}
        <Bust cx={48} cy={104} r={16} tone="ink" />
        <path d="M62 130 L96 118" className="stroke-ink" strokeWidth={2.3} strokeLinecap="round" />
        {/* you, watching */}
        <Bust cx={262} cy={112} r={15} tone="blue" />
      </svg>
      <PinnedNote className="left-1/2 top-0 -translate-x-1/2" tilt="-rotate-2">
        <span className="h-[6px] w-[6px] rounded-full bg-blue animate-[ps-pulse_2s_infinite]" aria-hidden />
        <span className="font-mono text-[9px] font-semibold uppercase tracking-eyebrow text-blue">Pipeline · live</span>
      </PinnedNote>
      <PinnedNote className="-left-1 bottom-1 sm:left-1" tilt="rotate-2">
        <span className="font-mono text-[9px] uppercase tracking-eyebrow text-inkSoft">No whiteboard</span>
      </PinnedNote>
    </div>
  );
}

/* Step 03 — the shared editor, two people on one real problem. */
function WorkingScene() {
  return (
    <div className="relative mx-auto w-full max-w-[440px]">
      <svg viewBox="0 0 300 210" fill="none" aria-hidden className="w-full">
        {/* the shared surface */}
        <rect x="76" y="70" width="148" height="96" rx="10" className="stroke-line" strokeWidth={1.6} fill="none" />
        <path d="M92 92 H150" className="stroke-inkSoft/50" strokeWidth={2} strokeLinecap="round" strokeDasharray="0 0" />
        <path d="M92 92 H140" className="stroke-inkSoft/40" strokeWidth={2} strokeLinecap="round" />
        <path d="M92 112 H196" className="stroke-ink" strokeWidth={2} strokeLinecap="round" />
        <path d="M92 132 H172" className="stroke-ink" strokeWidth={2} strokeLinecap="round" />
        {/* two cursors on the same line */}
        <path d="M150 88 v8" className="stroke-ink animate-[ps-caret-blink_1s_step-end_infinite]" strokeWidth={2} strokeLinecap="round" />
        <path d="M196 108 v8" className="stroke-blue animate-[ps-caret-blink_1.2s_step-end_infinite]" strokeWidth={2} strokeLinecap="round" />
        {/* two people leaning in, side by side */}
        <Bust cx={44} cy={112} r={16} tone="blue" />
        <Bust cx={256} cy={112} r={16} tone="ink" />
      </svg>
      <PinnedNote className="-left-1 top-1 sm:left-1" tilt="-rotate-3">
        <span className="font-mono text-[9px] font-semibold uppercase tracking-eyebrow text-ink">the-actual-problem</span>
      </PinnedNote>
      <PinnedNote className="-right-1 bottom-2 sm:right-1" tilt="rotate-2">
        <span className="font-mono text-[9px] uppercase tracking-eyebrow text-inkSoft">Same problem · same table</span>
      </PinnedNote>
    </div>
  );
}

/* Step 04 — the answer, handed over in writing. */
function DecisionScene() {
  return (
    <div className="relative mx-auto w-full max-w-[440px]">
      <svg viewBox="0 0 300 210" fill="none" aria-hidden className="w-full">
        {/* team hands the answer over */}
        <Bust cx={54} cy={100} r={16} tone="ink" />
        <Bust cx={246} cy={100} r={16} tone="blue" />
        {/* reaching arms toward the letter */}
        <path d="M68 126 L124 132" className="stroke-ink" strokeWidth={2.3} strokeLinecap="round" />
        <path d="M232 126 L176 132" className="stroke-blue" strokeWidth={2.3} strokeLinecap="round" />
        {/* the letter, centre stage */}
        <g className="animate-[ps-float_5s_ease-in-out_infinite]">
          <rect x="124" y="112" width="52" height="38" rx="5" className="fill-white stroke-blue" strokeWidth={2} />
          <path d="M124 118 L150 136 L176 118" className="stroke-blue" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <path d="M150 96 v-10" className="stroke-blue-border" strokeWidth={1.6} strokeLinecap="round" strokeDasharray="4 4" />
        <circle cx="150" cy="80" r="4" className="fill-blue" />
      </svg>
      <PinnedNote className="left-1/2 top-0 -translate-x-1/2" tilt="rotate-2">
        <span className="font-mono text-[9px] font-semibold uppercase tracking-eyebrow text-blue">Yes or no · in writing</span>
      </PinnedNote>
      <PinnedNote className="-left-1 bottom-2 sm:left-1" tilt="-rotate-2">
        <span className="font-mono text-[9px] uppercase tracking-eyebrow text-inkSoft">With reasons</span>
      </PinnedNote>
    </div>
  );
}

const scenes = [CallScene, DeepDiveScene, WorkingScene, DecisionScene];

export default function CareersHiring() {
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState(0);
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    if (locked || reduced) return;
    const id = setInterval(() => setActive((a) => (a + 1) % steps.length), CYCLE_MS);
    return () => clearInterval(id);
  }, [locked, reduced]);

  const pick = (idx: number) => {
    setLocked(true);
    setActive(idx);
  };

  const step = steps[active];
  const Scene = scenes[active];

  return (
    <section
      id="how-we-hire"
      className="relative scroll-mt-24 overflow-hidden border-t border-lineSoft bg-[linear-gradient(180deg,#FFFFFF_0%,#EAEFFC_16%,#E3EAFB_50%,#EAEFFC_84%,#FFFFFF_100%)]"
    >
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-blue/10 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute -right-20 top-1/3 h-80 w-80 rounded-full bg-blue/[0.08] blur-3xl" aria-hidden />

      <ScrollRevealRail>
        <ScrollReveal>
          <div className="flex items-baseline justify-between font-mono text-[11px] uppercase tracking-eyebrow">
            <p>
              <span className="text-overcast">[04]</span>
              <span className="text-inkSoft">&nbsp;&nbsp;How we hire</span>
            </p>
            <span className="hidden text-overcast sm:inline">/ Four steps, both ways</span>
          </div>
          <h2 className="mt-5 text-heading-sm font-semibold text-ink md:text-heading-md lg:text-heading-lg">
            No puzzles. No ghosting. No theatre.
          </h2>
          <p className="mt-5 max-w-[34em] text-lg leading-relaxed text-secondary-text">
            The process mirrors the work: real problems, real colleagues, and a
            straight answer at the end. Step through it.
          </p>
        </ScrollReveal>

        {/* Station rail — open nodes on a hand-drawn line, no strip chrome */}
        <ScrollReveal delay={100}>
          <div className="mt-12 hidden grid-cols-4 md:grid lg:mt-14">
            {steps.map((s, idx) => {
              const isActive = idx === active;
              const isDone = idx < active;
              return (
                <button
                  key={s.num}
                  type="button"
                  onClick={() => pick(idx)}
                  aria-current={isActive}
                  className="group relative pb-3 text-left"
                >
                  <span
                    className="pointer-events-none absolute -top-4 right-8 select-none text-[64px] font-semibold leading-none tracking-tighter text-ink/[0.05]"
                    aria-hidden
                  >
                    {s.num}
                  </span>
                  <span className="flex items-center">
                    <span
                      className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border font-mono text-[10px] font-bold shadow-card transition-colors duration-250 ease-settle ${
                        isDone
                          ? "border-blue bg-blue text-white"
                          : isActive
                            ? "border-blue bg-blue-subtle text-blue"
                            : "border-blue-border bg-white/80 text-blue group-hover:border-blue"
                      }`}
                    >
                      {s.num}
                      {isActive && (
                        <span className="absolute inset-0 rounded-full border border-blue/40 animate-[ps-ring_2.4s_ease-out_infinite]" aria-hidden />
                      )}
                    </span>
                    {idx < steps.length - 1 && (
                      <span
                        className={`h-px flex-1 ${
                          isDone
                            ? "bg-blue/40"
                            : "bg-[length:16px_1px] bg-repeat-x bg-[repeating-linear-gradient(90deg,#C8D2F5_0_8px,transparent_8px_16px)] animate-[ps-dash_1.4s_linear_infinite]"
                        }`}
                        aria-hidden
                      />
                    )}
                  </span>
                  <span
                    className={`mt-4 block pr-6 text-[17px] font-semibold tracking-tight transition-colors duration-250 ease-settle ${
                      isActive ? "text-ink" : "text-inkSoft group-hover:text-ink"
                    }`}
                  >
                    {s.name}
                  </span>
                  <span className="mt-1 block font-mono text-[9px] font-semibold uppercase tracking-eyebrow text-overcast">
                    {s.tag}
                  </span>
                  <span className="absolute bottom-0 left-0 h-[2px] w-[calc(100%-24px)] bg-blue-border/30" aria-hidden>
                    {isActive && !locked && !reduced && (
                      <span
                        key={active}
                        className="absolute inset-y-0 left-0 bg-blue"
                        style={{ animation: `progressFill ${CYCLE_MS}ms linear both` }}
                      />
                    )}
                    {isActive && (locked || reduced) && <span className="absolute inset-y-0 left-0 w-full bg-blue" />}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Mobile: chip rail */}
          <div className="mt-10 flex gap-2 overflow-x-auto pb-1 md:hidden">
            {steps.map((s, idx) => (
              <button
                key={s.num}
                type="button"
                onClick={() => pick(idx)}
                aria-current={idx === active}
                className={`shrink-0 rounded-full border px-3.5 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.08em] transition-colors duration-250 ease-settle ${
                  idx === active ? "border-blue bg-blue text-white" : "border-blue-border bg-white/80 text-inkSoft"
                }`}
              >
                {s.num} &middot; {s.name}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* The open scene — editorial text beside a hand-drawn human moment */}
        <ScrollReveal delay={140}>
          <div
            key={active}
            className="mc-stage-in mt-10 grid grid-cols-1 items-center gap-10 lg:mt-14 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16"
          >
            <div>
              <p className="font-mono text-[10px] font-semibold uppercase tracking-eyebrow text-blue">
                {step.tag}
              </p>
              <h3 className="mt-3 text-[26px] font-semibold tracking-tight text-ink md:text-[30px]">{step.name}</h3>
              <div className="mt-4 mb-4 h-[3px] w-10 rounded-full bg-blue/50" aria-hidden />
              <p className="max-w-[30em] text-[16px] leading-relaxed text-inkSoft md:text-[17px]">{step.desc}</p>
            </div>

            <div className="relative py-4">
              <Scene />
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={180}>
          <div className="mt-12">
            <Link
              href="#talk-to-our-team"
              className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-blue transition-colors duration-250 ease-settle hover:text-blue-hover"
            >
              Start with the intro call →
            </Link>
          </div>
        </ScrollReveal>

        <span className="sr-only" aria-live="polite">
          {step.name}. {step.desc}
        </span>
      </ScrollRevealRail>
    </section>
  );
}
