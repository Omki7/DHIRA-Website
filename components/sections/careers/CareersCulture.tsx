"use client";

/*
 * [02] Working Here — Candid Questions, Straight Answers.
 * The culture ledger rebuilt as a live Q&A console (Jul 2026): the six
 * questions candidates hold back in interviews, each answered straight
 * and pinned to its published principle (W-01…W-06). Answers reuse the
 * approved culture copy verbatim — no invented perks; specifics stay
 * pointed at the intro call, on purpose (Rule 4 applied to ourselves).
 * The section sits on a soft blue band to break the page's white run.
 *
 * A Fresher / Experienced toggle (Jul 2026) swaps the whole question set:
 * both audiences hang off the SAME six principles (W-01…W-06), only the
 * questions they hold back — and the answers they need — differ. Fresher
 * is the default view.
 */

import Link from "next/link";
import { useEffect, useState } from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import DhiraLogo from "@/components/icons/DhiraLogo";
import { usePrefersReducedMotion } from "@/hooks/useCountUp";

const CYCLE_MS = 7000;
const TYPE_STEP = 2;
const TYPE_TICK_MS = 16;

type Audience = "fresher" | "experienced";
type QA = { num: string; principle: string; question: string; answer: string };

const AUDIENCES: { id: Audience; label: string }[] = [
  { id: "fresher", label: "Fresher" },
  { id: "experienced", label: "Experienced" },
];

/*
 * Both sets hang off the SAME six principles (W-01…W-06). Only the question a
 * candidate holds back — and the answer they need — changes with experience.
 */
const QA_SETS: Record<Audience, QA[]> = {
  fresher: [
    {
      num: "W-01",
      principle: "You ship real things, early.",
      question: "What will I actually be doing in my first month?",
      answer:
        "A small team has no bench of observers. Your work lands in production systems that a country depends on, within your first weeks.",
    },
    {
      num: "W-02",
      principle: "Outcomes over hours.",
      question: "What are the working hours really like?",
      answer:
        "We measure by whether the answer is trusted, not by time logged. That is a written principle, and it applies inside the team too.",
    },
    {
      num: "W-03",
      principle: "An open stack that travels with you.",
      question: "Will I grow here, or get locked into your stack?",
      answer:
        "We build on open technologies. The skills you sharpen here are inspectable, swappable, and yours to keep.",
    },
    {
      num: "W-04",
      principle: "Straight answers, both directions.",
      question: "What is the feedback culture like?",
      answer:
        "Clear yes or no, with reasons: in hiring, in reviews, in daily work. We tell the truth. It is written down.",
    },
    {
      num: "W-05",
      principle: "Work where you work best.",
      question: "Can I work from where I live?",
      answer:
        "New York, Hyderabad, Bangalore, and remote. The team already ships across three time zones.",
    },
    {
      num: "W-06",
      principle: "No throwaway projects, no throwaway teams.",
      question: "Is this a place to build a long-term career?",
      answer:
        "We build systems meant to outlive budget cycles, and we staff them like it. Long-term is the whole point.",
    },
  ],
  experienced: [
    {
      num: "W-01",
      principle: "You ship real things, early.",
      question: "Will I own real scope, or inherit someone else's roadmap?",
      answer:
        "Senior hires take a system, not a ticket queue. You own an outcome a country depends on — and the decisions that shape it — from week one.",
    },
    {
      num: "W-02",
      principle: "Outcomes over hours.",
      question: "Is there an on-call or crunch culture I should know about?",
      answer:
        "We measure by whether the answer is trusted, not by hours logged or heroics. It is a written principle, and it holds under deadline, not just on quiet weeks.",
    },
    {
      num: "W-03",
      principle: "An open stack that travels with you.",
      question: "Will I be maintaining legacy, or building on modern tooling?",
      answer:
        "We build on open technologies your team already knows — inspectable and swappable. No black box to inherit, and nothing you sharpen here is locked to us.",
    },
    {
      num: "W-04",
      principle: "Straight answers, both directions.",
      question: "How are technical decisions made — who has the final call?",
      answer:
        "Clear yes or no, with reasons: in architecture reviews as much as in hiring. Senior engineers own their calls; disagreement gets written down, not smoothed over.",
    },
    {
      num: "W-05",
      principle: "Work where you work best.",
      question: "I lead across time zones — is distributed work real here?",
      answer:
        "New York, Hyderabad, Bangalore, and remote. The team already ships across three time zones. Distributed is how we work, not an exception we allow.",
    },
    {
      num: "W-06",
      principle: "No throwaway projects, no throwaway teams.",
      question: "I've seen platforms rewritten every two years. Is this built to last?",
      answer:
        "We build systems meant to outlive budget cycles, and we staff them like it. If it cannot be maintained by someone who was not in the room, we did it wrong.",
    },
  ],
};

function CandidateAvatar() {
  return (
    <span className="mt-5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-subtle-stroke bg-white shadow-card">
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden>
        <circle cx="12" cy="8.5" r="3.6" className="stroke-inkSoft" strokeWidth="1.6" />
        <path d="M4.8 20 C6 15.8 9 14.4 12 14.4 C15 14.4 18 15.8 19.2 20" className="stroke-inkSoft" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    </span>
  );
}

function DhiraAvatar() {
  return (
    <span className="mt-5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ink text-white shadow-card">
      <DhiraLogo className="h-4 w-4" />
    </span>
  );
}

function GhostBubble({ className, flip }: { className: string; flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 140 100"
      fill="none"
      aria-hidden
      className={`pointer-events-none absolute ${className}`}
      style={flip ? { transform: "scaleX(-1)" } : undefined}
    >
      <rect x="2" y="2" width="136" height="72" rx="20" className="stroke-blue-border" strokeWidth="2" />
      <path d="M32 74 v18 l18 -18" className="stroke-blue-border" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

export default function CareersCulture() {
  const reduced = usePrefersReducedMotion();
  const [audience, setAudience] = useState<Audience>("fresher");
  const [active, setActive] = useState(0);
  const [locked, setLocked] = useState(false);
  const [typed, setTyped] = useState(0);

  const qa = QA_SETS[audience];
  const item = qa[active];

  useEffect(() => {
    if (locked || reduced) return;
    const id = setInterval(() => setActive((a) => (a + 1) % qa.length), CYCLE_MS);
    return () => clearInterval(id);
  }, [locked, reduced, qa.length]);

  useEffect(() => {
    const full = qa[active].answer.length;
    if (reduced) {
      setTyped(full);
      return;
    }
    setTyped(0);
    const id = setInterval(() => {
      setTyped((t) => {
        if (t + TYPE_STEP >= full) {
          clearInterval(id);
          return full;
        }
        return t + TYPE_STEP;
      });
    }, TYPE_TICK_MS);
    return () => clearInterval(id);
  }, [active, reduced, qa]);

  const pick = (idx: number) => {
    setLocked(true);
    setActive(idx);
  };

  // Switching audience resets to the first question and re-arms auto-cycle.
  const switchAudience = (next: Audience) => {
    if (next === audience) return;
    setAudience(next);
    setActive(0);
    setLocked(false);
  };
  const doneTyping = typed >= item.answer.length;

  return (
    <section
      id="how-we-work"
      className="relative scroll-mt-24 overflow-hidden border-t border-lineSoft bg-[linear-gradient(180deg,#FFFFFF_0%,#F3F6FE_14%,#F3F6FE_86%,#FFFFFF_100%)]"
    >
      <GhostBubble className="right-[4%] top-14 hidden w-[150px] opacity-45 animate-[ps-float_7s_ease-in-out_infinite] md:block" />
      <GhostBubble className="bottom-16 left-[3%] hidden w-[110px] opacity-35 animate-[ps-float_9s_ease-in-out_infinite] md:block" flip />

      <ScrollRevealRail>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.45fr] lg:gap-16">
          <div className="self-start lg:sticky lg:top-32">
            <ScrollReveal>
              <p className="font-mono text-[11px] uppercase tracking-eyebrow">
                <span className="text-overcast">[02]</span>
                <span className="text-inkSoft">&nbsp;&nbsp;Working here</span>
              </p>
              <h2 className="mt-5 text-heading-sm font-semibold leading-[1.05] tracking-tighter text-ink md:text-heading-md">
                Candid questions, straight answers.
              </h2>
              <p className="mt-6 max-w-[26em] text-lg leading-relaxed text-inkSoft">
                Every candidate has questions they hold back in interviews:
                about the culture, the hours, the atmosphere. Here they are,
                answered the way we answer everything, and pinned to a
                principle we publish.
              </p>
              <div className="mt-8">
                <Link href="/about#what-we-believe" className="btn-secondary">
                  Read the published principles
                </Link>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={120}>
            <div className="overflow-hidden rounded-frame border border-subtle-stroke bg-primary-bg shadow-frame">
              <div className="flex flex-col gap-3 border-b border-subtle-stroke bg-white px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                <span className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-eyebrow text-ink">
                  <span className="relative flex h-2 w-2">
                    <span
                      className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue opacity-50"
                      style={{ animationDuration: "2.4s" }}
                    />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-blue" />
                  </span>
                  Candid questions
                </span>
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-eyebrow text-overcast">
                    Answering as
                  </span>
                  <div
                    role="tablist"
                    aria-label="Choose your experience level"
                    className="flex items-center gap-1 rounded-full border border-subtle-stroke bg-primary-bg p-1"
                  >
                    {AUDIENCES.map((aud) => {
                      const isOn = aud.id === audience;
                      return (
                        <button
                          key={aud.id}
                          type="button"
                          role="tab"
                          aria-selected={isOn}
                          onClick={() => switchAudience(aud.id)}
                          className={`rounded-full px-4 py-1.5 text-[12px] font-semibold leading-none tracking-tight transition-colors duration-250 ease-settle ${
                            isOn
                              ? "bg-blue text-white shadow-card"
                              : "bg-transparent text-inkSoft hover:text-ink"
                          }`}
                        >
                          {aud.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-[248px_1fr]">
                <div className="flex gap-2 overflow-x-auto border-b border-subtle-stroke p-3 lg:flex-col lg:gap-0 lg:overflow-visible lg:border-b-0 lg:border-r lg:p-0">
                  {qa.map((entry, idx) => {
                    const isActive = idx === active;
                    return (
                      <button
                        key={entry.num}
                        type="button"
                        onClick={() => pick(idx)}
                        aria-current={isActive}
                        className={`relative shrink-0 rounded-full border px-3 py-1.5 text-left font-mono text-[10px] font-semibold uppercase tracking-[0.08em] transition-colors duration-250 ease-settle lg:w-full lg:shrink lg:rounded-none lg:border-x-0 lg:border-t-0 lg:border-b lg:border-subtle-stroke lg:px-5 lg:py-4 lg:font-sans lg:text-[13px] lg:font-medium lg:normal-case lg:tracking-normal lg:last:border-b-0 ${
                          isActive
                            ? "border-blue-border bg-white text-ink lg:bg-white"
                            : "border-subtle-stroke bg-transparent text-inkSoft hover:bg-white/70 lg:hover:bg-white/60"
                        }`}
                      >
                        <span className={`lg:block lg:leading-snug ${isActive ? "lg:text-ink" : ""}`}>
                          <span className="lg:hidden">{idx + 1}</span>
                          <span className="hidden lg:inline">{entry.question}</span>
                        </span>
                        {isActive && !locked && !reduced && (
                          <span
                            key={active}
                            className="absolute bottom-0 left-0 hidden h-[2px] bg-blue lg:block"
                            style={{ animation: `progressFill ${CYCLE_MS}ms linear both` }}
                            aria-hidden
                          />
                        )}
                        {isActive && (
                          <span className="absolute inset-y-0 left-0 hidden w-[2.5px] bg-blue lg:block" aria-hidden />
                        )}
                      </button>
                    );
                  })}
                </div>

                <div className="dot-grid relative flex min-h-[300px] flex-col p-5 sm:p-7 lg:min-h-0">
                  <div key={`q-${active}`} className="mc-stage-in flex items-start justify-end gap-2.5">
                    <div className="max-w-[80%] sm:max-w-[66%]">
                      <p className="mb-1.5 text-right font-mono text-[9px] font-semibold uppercase tracking-eyebrow text-overcast">
                        You ask
                      </p>
                      <div className="rounded-[14px] rounded-br-[4px] border border-subtle-stroke bg-white px-4 py-3 text-[14px] leading-relaxed text-ink shadow-card">
                        {item.question}
                      </div>
                    </div>
                    <CandidateAvatar />
                  </div>

                  <div key={`a-${active}`} className="mc-stage-in mt-5 flex items-start justify-start gap-2.5">
                    <DhiraAvatar />
                    <div className="max-w-[86%] sm:max-w-[76%]">
                      <p className="mb-1.5 font-mono text-[9px] font-semibold uppercase tracking-eyebrow text-blue">
                        We answer
                      </p>
                      <div className="rounded-[14px] rounded-tl-[4px] bg-blue px-4 py-3 text-[15px] leading-relaxed text-white shadow-card">
                        {item.answer.slice(0, typed)}
                        {!doneTyping && (
                          <span className="ml-0.5 inline-block h-[1em] w-[6px] translate-y-[2px] bg-white/90 animate-[ps-caret-blink_1s_step-end_infinite]" aria-hidden />
                        )}
                      </div>
                      <div
                        className={`mt-3 transition-opacity duration-400 ease-settle ${doneTyping ? "opacity-100" : "opacity-0"}`}
                      >
                        <Link
                          href="/about#what-we-believe"
                          className="inline-flex items-center gap-1.5 rounded-full border border-blue-border bg-blue-subtle px-3 py-1 font-mono text-[9px] font-semibold uppercase tracking-[0.08em] text-blue transition-colors duration-250 ease-settle hover:border-blue"
                        >
                          {item.num} · {item.principle}
                        </Link>
                      </div>
                    </div>
                  </div>
                  <span className="sr-only" aria-live="polite">
                    {item.question} {item.answer}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 border-t border-subtle-stroke bg-white px-5 py-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-overcast">
                  No perks theatre. No rehearsed answers.
                </span>
                <Link
                  href="#talk-to-our-team"
                  className="font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-blue transition-colors duration-250 ease-settle hover:text-blue-hover"
                >
                  Ask the rest on the intro call →
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </ScrollRevealRail>
    </section>
  );
}
