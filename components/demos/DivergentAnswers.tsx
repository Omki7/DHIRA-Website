"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import useCountUp, { usePrefersReducedMotion } from "@/hooks/useCountUp";

/*
 * The problem section's evidence: one question, answered three irreconcilable
 * ways. Every row is internally correct. That is the point.
 *
 * PRESENTATION (Jul 2026 rebuild). This was a 262px-tall horizontal
 * "measurement" axis. Two problems: it cost more vertical space than the
 * headline it was evidence for, and it spaced the three points by index rather
 * than by value, so the axis measured nothing. The same evidence reads harder
 * as a reconciliation that does not reconcile: one question at the top, three
 * totals below it, the variance at the bottom. Right-aligned tabular figures
 * put the divergence in the digits themselves, and the object is narrow enough
 * to sit beside the section headline instead of under it.
 *
 * The variance strip keeps the honest version of the axis: a 3-dot track
 * scaled to the observed range, labelled as variance so relative-within-range
 * is the correct reading.
 *
 * Deliberately NOT a §4a stat band: no blue gradient top bar. That bar is the
 * site's signature for proof figures, and these figures are the opposite of
 * proof. The rest of the recipe (pulsing dot eyebrow, dashed dividers, dashed
 * footer) is kept so it still reads as ours.
 *
 * Colour encodes the source world, not decoration: blue warehouse, rose
 * documents, green stream. Figures are illustrative, framed as a scenario by
 * the quoted question.
 *
 * CURRENCY-FREE ON PURPOSE: the scenario counts people served, not money. A
 * revenue question in Rs/crore read as India-only to a global audience and
 * collided with the $ figures in the industry record. "People served" is the
 * one question a ministry and an enterprise both ask, so keep this example
 * unit-neutral: do not reintroduce a currency here.
 */

const QUESTION = "How many people did we serve last quarter?";

type Answer = {
  world: string;
  value: number;
  figure: string;
  caveat: string;
  color: string;
  sources: string[];
};

/* Authored low to high so the ledger reads as a ramp and the last row is the
   one furthest from the first. */
const ANSWERS: Answer[] = [
  {
    world: "The documents",
    value: 1.19,
    figure: "1.19M",
    caveat: "1,240 intake forms never parsed.",
    color: "#E5547B",
    sources: ["Intake forms", "scanned_docs"],
  },
  {
    world: "The warehouse",
    value: 1.24,
    figure: "1.24M",
    caveat: "Last synced six days ago.",
    color: "#3E63DD",
    sources: ["Core systems", "service_records"],
  },
  {
    world: "The live stream",
    value: 1.31,
    figure: "1.31M",
    caveat: "Three feeds still lagging.",
    color: "#1B8A5F",
    sources: ["Field devices", "service_events"],
  },
];

const LO = Math.min(...ANSWERS.map((a) => a.value));
const HI = Math.max(...ANSWERS.map((a) => a.value));
const posOf = (value: number) => ((value - LO) / (HI - LO)) * 100;
const SPREAD = "120,000"; /* 1.31M less 1.19M */

function LineageArrow() {
  return (
    <svg width="13" height="8" viewBox="0 0 14 8" fill="none" aria-hidden className="shrink-0">
      <path d="M0 4 H10" stroke="#D0D3DB" strokeWidth="1" />
      <path
        d="M8 1.5 L11 4 L8 6.5"
        stroke="#D0D3DB"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function AnswerRow({ answer, index }: { answer: Answer; index: number }) {
  const { ref, display } = useCountUp(answer.figure, { duration: 1400, delay: index * 160 });

  return (
    <div className="flex items-center justify-between gap-4 border-t border-dashed border-lineSoft py-[22px] first:border-t-0 sm:gap-8">
      <div className="min-w-0">
        <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-eyebrow text-overcast">
          <span
            className="h-[5px] w-[5px] shrink-0 rounded-full"
            style={{ background: answer.color }}
            aria-hidden
          />
          {answer.world}
        </span>

        <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-2">
          <div className="flex items-center">
            {answer.sources.map((label, i) => (
              <Fragment key={label}>
                {i > 0 && <LineageArrow />}
                <span className="inline-flex items-center gap-1.5 rounded-btn border border-subtle-stroke bg-primary-bg px-2 py-[3px]">
                  <span
                    className="h-[7px] w-[7px] rounded-[2px]"
                    style={{ background: answer.color }}
                    aria-hidden
                  />
                  <span className="whitespace-nowrap font-mono text-[9.5px] tracking-tight text-inkSoft">
                    {label}
                  </span>
                </span>
              </Fragment>
            ))}
          </div>

          <p className="flex items-center gap-1.5 text-[12px] leading-snug text-overcast">
            <span className="h-[4px] w-[4px] shrink-0 rounded-full bg-[#D79B3C]" aria-hidden />
            {answer.caveat}
          </p>
        </div>
      </div>

      <div
        ref={ref}
        className="shrink-0 whitespace-nowrap font-sans text-[34px] font-semibold leading-none tracking-tightest text-ink tabular-nums sm:text-[42px]"
      >
        {display}
      </div>
    </div>
  );
}

/* The question types itself once the ledger is on screen: the beat that makes
   the three figures below land as answers rather than as statistics. */
function TypedQuestion() {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLParagraphElement>(null);
  const [started, setStarted] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.6 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reduced) {
      setCount(QUESTION.length);
      return;
    }
    if (!started) return;
    let i = 0;
    const timer = setInterval(() => {
      i += 1;
      setCount(i);
      if (i >= QUESTION.length) clearInterval(timer);
      /* 32ms/char lands the full question at ~1.3s, just ahead of the slowest
         figure's count-up, so the beat reads question-then-answers. */
    }, 32);
    return () => clearInterval(timer);
  }, [started, reduced]);

  return (
    <p
      ref={ref}
      className="text-[17px] font-medium leading-snug tracking-tight text-ink sm:text-[19px]"
      aria-label={`“${QUESTION}”`}
    >
      <span aria-hidden>
        &ldquo;{QUESTION.slice(0, count)}
        {count >= QUESTION.length && "”"}
      </span>
      <span
        aria-hidden
        className="ml-[3px] inline-block h-[1.05em] w-[2px] translate-y-[0.16em] bg-blue animate-[ps-caret-blink_1s_step-end_infinite]"
      />
    </p>
  );
}

export default function DivergentAnswers() {
  return (
    <div className="overflow-hidden rounded-frame border border-subtle-stroke bg-white shadow-frame">
      <div className="flex items-center justify-between gap-4 border-b border-subtle-stroke bg-primary-bg px-5 py-[11px] sm:px-6">
        <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-eyebrow text-inkSoft">
          <span
            className="h-[5px] w-[5px] rounded-full bg-blue animate-[ps-pulse_2s_infinite]"
            aria-hidden
          />
          One question
        </span>
        <span className="font-mono text-[10px] uppercase tracking-eyebrow text-overcast">
          Three answers
        </span>
      </div>

      <div className="border-b border-subtle-stroke px-5 py-[18px] sm:px-6">
        <TypedQuestion />
      </div>

      <div className="px-5 sm:px-6">
        {ANSWERS.map((answer, i) => (
          <AnswerRow key={answer.world} answer={answer} index={i} />
        ))}
      </div>

      <div className="flex items-center justify-between gap-5 border-t border-dashed border-lineSoft bg-primary-bg px-5 py-[14px] sm:px-6">
        <div className="flex items-center gap-4">
          <span className="font-mono text-[10px] uppercase tracking-eyebrow text-inkSoft">
            Variance
          </span>
          <span className="relative hidden h-[3px] w-[104px] rounded-full bg-line sm:block" aria-hidden>
            {ANSWERS.map((a) => (
              <span
                key={a.world}
                className="absolute top-1/2 h-[9px] w-[9px] -translate-x-1/2 -translate-y-1/2 rounded-full ring-2 ring-primary-bg"
                style={{ left: `${posOf(a.value)}%`, background: a.color }}
              />
            ))}
          </span>
        </div>
        <p className="whitespace-nowrap font-mono text-[10.5px] uppercase tracking-eyebrow text-inkSoft">
          <span className="text-[13px] font-semibold tracking-tight text-red">{SPREAD}</span>
          &nbsp;&nbsp;people apart
        </p>
      </div>
    </div>
  );
}
