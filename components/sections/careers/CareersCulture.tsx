"use client";

/*
 * [02] Working here: "Candid questions, straight answers."
 *
 * Intent: answer the six things candidates hold back in interviews, and be
 * seen answering all six. The console this replaces typed one answer at a
 * time and published one of six; the argument of the section is candour, so
 * hiding five answers behind a timer argued the opposite.
 *
 * Every question is joined to its answer by a blue elbow leader, the page's
 * mark for "this connects to that", and pinned to the working principle it
 * comes from (W01 to W06). The principles live only here: the old "Read the
 * published principles" link pointed at /about's three opinions, which are
 * a different list, so it was removed (23 Sep 2026). The Fresher / Experienced toggle swaps the
 * whole set: both audiences hang off the SAME six principles, only the
 * question a candidate holds back changes. Answers are the approved culture
 * copy: no invented perks, specifics stay pointed at the intro call.
 *
 * Ground: the page's one soft blue band (Rule 5a).
 */

import { useState } from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import SectionHeader from "@/components/ui/SectionHeader";
import SectionCoda from "@/components/ui/SectionCoda";

type Audience = "fresher" | "experienced";
type QA = { num: string; principle: string; question: string; answer: string };

const AUDIENCES: { id: Audience; label: string }[] = [
  { id: "fresher", label: "Fresher" },
  { id: "experienced", label: "Experienced" },
];

const QA_SETS: Record<Audience, QA[]> = {
  fresher: [
    {
      num: "W01",
      principle: "Ship real work, early.",
      question: "What will I do in my first month?",
      answer: "Ship. No bench of observers. Your work reaches production systems within weeks.",
    },
    {
      num: "W02",
      principle: "Outcomes over hours.",
      question: "What are the hours really like?",
      answer: "Trusted outcomes count, not hours logged. A written rule, applied inside the team too.",
    },
    {
      num: "W03",
      principle: "An open stack, portable skills.",
      question: "Will I grow here, or get locked in?",
      answer: "Open technologies, inspectable and swappable. Every skill you sharpen travels with you.",
    },
    {
      num: "W04",
      principle: "Straight answers, both directions.",
      question: "How does feedback work?",
      answer: "A clear yes or no, with reasons. In hiring, in reviews, in daily work.",
    },
    {
      num: "W05",
      principle: "Work where you work best.",
      question: "Can I work from where I live?",
      answer: "New York, Hyderabad, Bangalore or remote. One team, three time zones.",
    },
    {
      num: "W06",
      principle: "No throwaway projects, no throwaway teams.",
      question: "Can I build a long career here?",
      answer: "Systems built to outlive budget cycles, staffed the same way. Lasting work is the point.",
    },
  ],
  experienced: [
    {
      num: "W01",
      principle: "Ship real work, early.",
      question: "Will I own real scope, or inherit a roadmap?",
      answer: "Senior hires own a system, not a ticket queue. The outcome and the decisions, from week one.",
    },
    {
      num: "W02",
      principle: "Outcomes over hours.",
      question: "Is there an on call or crunch culture?",
      answer: "Trusted outcomes count, not hours or heroics. The rule holds under deadline too.",
    },
    {
      num: "W03",
      principle: "An open stack, portable skills.",
      question: "Legacy maintenance, or modern tooling?",
      answer: "Open, modern technologies. Inspectable, swappable, and no black box to inherit.",
    },
    {
      num: "W04",
      principle: "Straight answers, both directions.",
      question: "Who makes the final technical call?",
      answer: "Senior engineers own their calls. A clear yes or no, with reasons. Disagreement gets written down.",
    },
    {
      num: "W05",
      principle: "Work where you work best.",
      question: "Is distributed work real here?",
      answer: "New York, Hyderabad, Bangalore and remote. Distributed is the default, not an exception.",
    },
    {
      num: "W06",
      principle: "No throwaway projects, no throwaway teams.",
      question: "Will the platform survive the next rewrite?",
      answer: "Systems built to outlive budget cycles. If a newcomer cannot maintain the code, the work failed.",
    },
  ],
};

/* The answer arrives: down out of the question, then across. */
function Elbow() {
  return (
    <svg viewBox="0 0 18 26" className="mt-1 h-[26px] w-[18px] shrink-0" aria-hidden>
      <path d="M2 0V18a6 6 0 0 0 6 6h9" fill="none" stroke="#3E63DD" strokeWidth="1.4" />
      <circle cx="17" cy="24" r="2.2" fill="#3E63DD" />
    </svg>
  );
}

export default function CareersCulture() {
  const [audience, setAudience] = useState<Audience>("fresher");
  const qa = QA_SETS[audience];

  return (
    <section
      id="how-we-work"
      className="scroll-mt-24 bg-[linear-gradient(180deg,#FFFFFF_0%,#F1F5FE_16%,#F1F5FE_84%,#FFFFFF_100%)] pt-12 pb-20 lg:pt-16 lg:pb-24"
    >
      <ScrollRevealRail>
        <SectionHeader
          num="02"
          label="Working here"
          setup="Candid questions,"
          payoff="straight answers."
          lede="Six questions candidates hold back, each pinned to a working principle."
        >
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-overcast">Answering as</span>
            <div className="flex gap-1 rounded-full border border-blue-border bg-white p-1">
              {AUDIENCES.map((a) => (
                <button
                  key={a.id}
                  type="button"
                  onClick={() => setAudience(a.id)}
                  aria-pressed={audience === a.id}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-150 ${
                    audience === a.id ? "bg-ink text-white" : "text-inkSoft hover:text-ink"
                  }`}
                >
                  {a.label}
                </button>
              ))}
            </div>
          </div>
        </SectionHeader>

        <dl className="mt-10 grid grid-cols-1 gap-x-16 border-t border-blue-border/70 md:grid-cols-2">
          {qa.map((item, k) => (
            <div
              key={item.num}
              className={`border-b border-blue-border/70 py-6 ${k % 2 === 0 ? "md:pr-4" : "md:pl-4"}`}
            >
              <ScrollReveal delay={40 + (k % 2) * 40}>
                <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-overcast">
                  <span className="text-blue">{item.num}</span>&nbsp;&nbsp;{item.principle}
                </p>
                <dt className="mt-3 text-[19px] font-medium leading-snug tracking-tight text-ink sm:text-[21px]">
                  {item.question}
                </dt>
                <dd className="mt-2 flex gap-3">
                  <Elbow />
                  <span className="text-[15px] leading-relaxed text-inkSoft">{item.answer}</span>
                </dd>
              </ScrollReveal>
            </div>
          ))}
        </dl>

        <ScrollReveal delay={120}>
          <SectionCoda lead="No perks theatre." payoff="Ask the rest on the intro call." />
        </ScrollReveal>
      </ScrollRevealRail>
    </section>
  );
}
