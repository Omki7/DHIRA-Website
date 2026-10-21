"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";
import type { HomeProblem } from "@/content/pages/home";

const TYPE_DELAY_MS = 300;
const CHARACTER_MS = 38;
const CONNECTOR_SECONDS = 1.1;
const CONNECTOR_PATHS = [
  "M300 0v20c0 16-12 26-28 26H128c-18 0-28 12-28 30v126",
  "M300 0v202",
  "M300 0v20c0 16 12 26 28 26h144c18 0 28 12 28 30v126",
] as const;

// An editorial diagram of the existing illustrative scenario, not product UI.
function SourceGlyph({ kind }: { kind: "documents" | "warehouse" | "stream" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" className="h-6 w-6" aria-hidden="true">
      {kind === "documents" && <path d="M7 3h8l4 4v14H7V3Zm8 0v5h4M10 12h6m-6 4h4M4 7v13" />}
      {kind === "warehouse" && <><ellipse cx="12" cy="5" rx="8" ry="3" /><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" /></>}
      {kind === "stream" && <path d="M2 12h4l3-7 5 14 3-7h5M4 5h1m14 14h1" />}
    </svg>
  );
}

/** The gap between the largest and smallest answer, in whole people. */
function spread(answers: HomeProblem["answers"]) {
  const totals = answers.map((answer) => Math.round(Number(answer.figure) * 1_000_000));
  return new Intl.NumberFormat("en-GB").format(Math.max(...totals) - Math.min(...totals));
}

export default function DivergentAnswers({ content: HOME_PROBLEM }: { content: HomeProblem }) {
  const ref = useRef<HTMLElement>(null);
  const entered = useInView(ref, { once: true, amount: 0.3 });
  const reduced = usePrefersReducedMotion();
  const [characters, setCharacters] = useState(0);
  const complete = characters >= HOME_PROBLEM.question.length;
  const draw = reduced || complete;

  useEffect(() => {
    if (!entered || reduced) return;
    let interval: ReturnType<typeof setInterval> | undefined;
    const delay = setTimeout(() => {
      interval = setInterval(() => {
        setCharacters((count) => {
          const next = Math.min(count + 1, HOME_PROBLEM.question.length);
          if (next === HOME_PROBLEM.question.length) clearInterval(interval);
          return next;
        });
      }, CHARACTER_MS);
    }, TYPE_DELAY_MS);
    return () => {
      clearTimeout(delay);
      clearInterval(interval);
    };
  }, [entered, reduced, HOME_PROBLEM.question.length]);

  return (
    <figure ref={ref} className="relative isolate mx-auto w-full max-w-[600px] py-5 sm:py-7" aria-label={HOME_PROBLEM.figureLabel}>
      
      <div className="text-center">
        <p className="font-mono text-[10px] uppercase tracking-eyebrow text-inkSoft">{HOME_PROBLEM.period}</p>
        <p data-problem-question aria-label={HOME_PROBLEM.question} className="relative mx-auto mt-3 max-w-[20em] text-[21px] font-medium leading-tight tracking-tight text-ink sm:text-[25px]">
          {/* Reserve the full question's space so typing never shifts the diagram. */}
          <span aria-hidden="true" className="invisible">{HOME_PROBLEM.question}<span className="ml-1 inline-block w-[2px]" /></span>
          <span aria-hidden="true" className="absolute inset-0">
            <span data-typed-question>{reduced ? HOME_PROBLEM.question : HOME_PROBLEM.question.slice(0, characters)}</span>
            <span data-typing-cursor className="ml-1 inline-block h-[1em] w-[2px] translate-y-[0.13em] bg-blue motion-safe:animate-[ps-caret-blink_1s_step-end_infinite]" />
          </span>
        </p>
      </div>

      <div className="relative mt-4">
        <svg viewBox="0 0 600 208" preserveAspectRatio="none" className="pointer-events-none absolute inset-x-0 top-0 h-[208px] w-full overflow-visible text-blue/65" fill="none" aria-hidden="true">
          {CONNECTOR_PATHS.map((path, index) => (
            <motion.path
              key={path}
              data-problem-connector
              d={path}
              stroke="currentColor"
              strokeWidth="1.8"
              vectorEffect="non-scaling-stroke"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: draw ? 1 : 0, opacity: draw ? 1 : 0 }}
              transition={{ duration: reduced ? 0 : CONNECTOR_SECONDS, delay: reduced ? 0 : index * 0.08, ease: [0.4, 0, 0.2, 1] }}
            />
          ))}
          <circle cx="300" cy="3" r="3" className="fill-blue" />
          {[100, 300, 500].map((x, index) => (
            <motion.circle key={x} cx={x} cy="202" r="3" className="fill-blue" initial={{ opacity: 0 }} animate={{ opacity: draw ? 1 : 0 }} transition={{ duration: reduced ? 0 : 0.3, delay: reduced ? 0 : CONNECTOR_SECONDS + index * 0.08 }} />
          ))}
        </svg>
        <div className="grid grid-cols-3">
          {HOME_PROBLEM.answers.map((answer, index) => (
            <div key={answer.source} className="relative min-w-0 px-1 pt-20 text-center sm:px-3">
              <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: draw ? 1 : 0, y: draw ? 0 : 6 }} transition={{ duration: reduced ? 0 : 0.45, delay: reduced ? 0 : 0.35 + index * 0.08 }}>
                <div className="relative mx-auto flex h-11 w-11 items-center justify-center rounded-tile border border-blue-border bg-background text-blue ">
                  <SourceGlyph kind={answer.kind} />
                </div>
                <p className="relative mt-3 h-4 font-mono text-[9px] uppercase leading-4 tracking-[0.06em] text-inkSoft sm:text-[10px] sm:tracking-eyebrow"><span className="bg-background px-1.5">{answer.source}</span></p>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: draw ? 1 : 0, y: draw ? 0 : 10 }} transition={{ duration: reduced ? 0 : 0.55, delay: reduced ? 0 : CONNECTOR_SECONDS + index * 0.08 }}>
                <p data-problem-answer className={`mt-16 whitespace-nowrap text-[34px] font-medium leading-none tracking-tightest tabular-nums sm:text-[46px] lg:text-[40px] xl:text-[52px] ${index === 1 ? "text-blue" : "text-ink"}`}>
                  {answer.figure}
                </p>
                {/* The unit is a word on its own line ("million"), never "M". */}
                <p className="mt-2 text-[13px] font-medium text-inkSoft sm:text-[14px]">{answer.unit}</p>
                <p className="mt-2 text-[11px] leading-snug text-inkSoft sm:text-[12px]">{answer.caveat}</p>
                <div aria-hidden="true" className="mx-auto mt-5 h-8 w-px border-l border-dashed border-red/40" />
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: draw ? 1 : 0, y: draw ? 0 : 8 }} transition={{ duration: reduced ? 0 : 0.6, delay: reduced ? 0 : CONNECTOR_SECONDS + 0.45 }}>
        <div className="relative mx-auto w-5/6 border-t border-red/40 pt-7 text-center">
          <span aria-hidden="true" className="absolute left-1/2 top-0 flex h-6 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-background text-red">
            <svg viewBox="0 0 32 20" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-8"><path d="m11 3-4 14M24 3l-4 14" /></svg>
          </span>
          <p className="text-[14px] leading-snug text-inkSoft sm:text-[15px]">
            <span className="font-semibold text-red-deep">{spread(HOME_PROBLEM.answers)}</span> {HOME_PROBLEM.spreadLabel}
          </p>
          <p className="mt-2 text-[17px] font-medium tracking-tight text-ink sm:text-[19px]">{HOME_PROBLEM.conclusion}</p>
        </div>
        <figcaption className="mt-6 text-center font-mono text-[9px] uppercase tracking-eyebrow text-inkSoft">{HOME_PROBLEM.scenarioLabel}</figcaption>
      </motion.div>
    </figure>
  );
}
