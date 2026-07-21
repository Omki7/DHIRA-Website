"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import useCountUp, { usePrefersReducedMotion } from "@/hooks/useCountUp";

/*
 * The problem section's evidence: one question typed once, answered three
 * irreconcilable ways. Every column is internally correct — that is the point.
 *
 * PRESENTATION (Jul 2026 rebuild). The three figures used to sit in three even,
 * divider-separated columns — which read as three *independent* KPIs and made
 * the numbers feel like they were drifting in space. The story is the opposite:
 * same question, related answers, and the whole weight is the GAP between them.
 *
 * So on lg+ the three answers are plotted on a single measurement axis,
 * positioned by their real value (documents 1.19 → warehouse 1.24 → live 1.31),
 * so the divergence is spatial and immediate. The axis splits the claim (world
 * + figure, above) from the evidence (lineage + why it's off, below), and the
 * "120,000 people apart" payoff becomes a measured bracket, not a sentence.
 * Below lg the plot can't breathe, so it degrades to a value-sorted list.
 *
 * Colour encodes the source world, not decoration — blue warehouse, rose
 * documents, green stream. Figures are illustrative, framed as a scenario by
 * the quoted question.
 *
 * CURRENCY-FREE ON PURPOSE: the scenario counts people served, not money. A
 * revenue question in ₹/crore read as India-only to a global audience and
 * collided with the $ figures in the industry-record block directly below.
 * "People served" is the one question a ministry and an enterprise both ask,
 * so keep this example unit-neutral — do not reintroduce a currency here.
 */

const QUESTION = "How many people did we serve last quarter?";

type Answer = {
  world: string;
  value: number; // numeric, drives the position on the axis
  figure: string; // display target for the count-up
  caveat: string;
  color: string; // source-world colour (dots + accents)
  sources: string[];
};

/* Authored in reading order; positions below are derived from `value`, and the
   plot renders them value-sorted so left-to-right on the axis is low-to-high. */
const ANSWERS: Answer[] = [
  {
    world: "The warehouse",
    value: 1.24,
    figure: "1.24M",
    caveat: "Last synced six days ago.",
    color: "#3E63DD",
    sources: ["Core systems", "service_records"],
  },
  {
    world: "The documents",
    value: 1.19,
    figure: "1.19M",
    caveat: "1,240 intake forms never parsed.",
    color: "#E5547B",
    sources: ["Intake forms", "scanned_docs"],
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

const SORTED = [...ANSWERS].sort((a, b) => a.value - b.value);
const PAD = 15; // percent inset so the outer points don't touch the edges
const xOf = (index: number) => PAD + (index / (SORTED.length - 1)) * (100 - 2 * PAD);

/* Plot geometry (lg+). One horizontal axis; claim above it, evidence below. */
const H = 262;
const AXIS_Y = 120;

/* ─── Shared pieces ───────────────────────────────────────────────────────── */
function WorldLabel({ answer }: { answer: Answer }) {
  return (
    <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-eyebrow text-overcast">
      <span
        className="h-[5px] w-[5px] rounded-full"
        style={{ background: answer.color }}
        aria-hidden
      />
      {answer.world}
    </span>
  );
}

function Figure({ answer, index, className }: { answer: Answer; index: number; className: string }) {
  const { ref, display } = useCountUp(answer.figure, { duration: 1500, delay: index * 130 });
  return (
    <div ref={ref} className={className}>
      {display}
    </div>
  );
}

function LineageArrow() {
  return (
    <svg width="14" height="8" viewBox="0 0 14 8" fill="none" aria-hidden className="shrink-0">
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

function LineageRail({ answer }: { answer: Answer }) {
  return (
    <div className="flex items-center justify-center">
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
  );
}

function Caveat({ answer, className = "" }: { answer: Answer; className?: string }) {
  return (
    <p className={`flex items-center gap-1.5 text-[12px] leading-snug text-overcast ${className}`}>
      <span className="h-[4px] w-[4px] shrink-0 rounded-full bg-[#D79B3C]" aria-hidden />
      {answer.caveat}
    </p>
  );
}

/* ─── lg+ : the measured axis ─────────────────────────────────────────────── */
function AxisPlot() {
  const xMin = xOf(0);
  const xMax = xOf(SORTED.length - 1);
  return (
    <div className="relative mx-auto hidden max-w-[980px] lg:block" style={{ height: H }}>
      {/* the axis */}
      <div className="absolute left-0 right-0 h-px bg-lineSoft" style={{ top: AXIS_Y }} />

      {/* per-answer column, positioned by value */}
      {SORTED.map((a, i) => {
        const x = xOf(i);
        return (
          <div
            key={a.world}
            className="absolute top-0 h-full w-[220px] -translate-x-1/2"
            style={{ left: `${x}%` }}
          >
            {/* claim — above the line */}
            <div
              className="absolute inset-x-0 flex flex-col items-center gap-2"
              style={{ bottom: H - AXIS_Y + 18 }}
            >
              <WorldLabel answer={a} />
              <Figure
                answer={a}
                index={i}
                className="whitespace-nowrap font-sans text-[40px] font-semibold leading-none tracking-tightest text-ink lg:text-[46px]"
              />
            </div>

            {/* stem + dot on the axis */}
            <div
              className="absolute left-1/2 w-px -translate-x-1/2 bg-lineSoft"
              style={{ top: AXIS_Y - 16, height: 16 }}
            />
            <div
              className="absolute left-1/2 h-3 w-3 -translate-x-1/2 rounded-full ring-2 ring-white"
              style={{ top: AXIS_Y - 6, background: a.color }}
            />

            {/* evidence — below the line */}
            <div
              className="absolute inset-x-0 flex flex-col items-center gap-2.5"
              style={{ top: AXIS_Y + 20 }}
            >
              <LineageRail answer={a} />
              <Caveat answer={a} className="justify-center text-center" />
            </div>
          </div>
        );
      })}

      {/* the gap, measured */}
      <div
        className="absolute"
        style={{ left: `${xMin}%`, width: `${xMax - xMin}%`, top: AXIS_Y + 96 }}
      >
        <div className="relative h-px w-full bg-line">
          <span className="absolute left-0 top-0 h-2 w-px -translate-y-2 bg-line" aria-hidden />
          <span className="absolute right-0 top-0 h-2 w-px -translate-y-2 bg-line" aria-hidden />
        </div>
        <p className="mt-2.5 text-center font-mono text-[10.5px] uppercase tracking-eyebrow text-overcast">
          <span className="font-semibold text-ink">120,000</span> people apart
        </p>
      </div>
    </div>
  );
}

/* ─── < lg : value-sorted list ────────────────────────────────────────────── */
function AnswerList() {
  return (
    <div className="mx-auto max-w-[440px] lg:hidden">
      {SORTED.map((a, i) => (
        <div
          key={a.world}
          className="flex items-start justify-between gap-5 border-b border-dashed border-lineSoft py-5 first:pt-0 last:border-0 last:pb-0"
        >
          <div className="min-w-0">
            <WorldLabel answer={a} />
            <div className="mt-3 flex justify-start">
              <LineageRail answer={a} />
            </div>
            <Caveat answer={a} className="mt-2.5" />
          </div>
          <Figure
            answer={a}
            index={i}
            className="shrink-0 whitespace-nowrap font-sans text-[34px] font-semibold leading-none tracking-tightest text-ink"
          />
        </div>
      ))}
      <p className="mt-6 text-center font-mono text-[10.5px] uppercase tracking-eyebrow text-overcast">
        <span className="font-semibold text-ink">120,000</span> people apart
      </p>
    </div>
  );
}

/* ─── Typed question ──────────────────────────────────────────────────────── */
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
    }, 45);
    return () => clearInterval(timer);
  }, [started, reduced]);

  return (
    <p
      ref={ref}
      className="text-center text-[19px] font-medium tracking-tight text-ink md:text-[23px]"
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
    <div>
      <TypedQuestion />

      <div className="mt-9">
        <AxisPlot />
        <AnswerList />
      </div>

      <p className="mx-auto mt-10 max-w-[46em] text-center text-[15px] leading-relaxed text-inkSoft lg:mt-6">
        Nobody is wrong. Each system answered from what it could see — and the
        three never met.
      </p>
    </div>
  );
}
