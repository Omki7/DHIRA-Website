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
import type { CareersPage } from "@/content/pages/careers";

type Audience = CareersPage["culture"]["audiences"][number]["id"];

/* The answer arrives: down out of the question, then across. */
function Elbow() {
  return (
    <svg viewBox="0 0 18 26" className="mt-1 h-[26px] w-[18px] shrink-0" aria-hidden>
      <path d="M2 0V18a6 6 0 0 0 6 6h9" fill="none" stroke="rgb(var(--blue))" strokeWidth="1.4" />
      <circle cx="17" cy="24" r="2.2" fill="rgb(var(--blue))" />
    </svg>
  );
}

export default function CareersCulture({ content }: { content: CareersPage["culture"] }) {
  const [audience, setAudience] = useState<Audience>(content.audiences[0].id);
  const qa = content.qa[audience];

  return (
    <section
      id="how-we-work"
      className="scroll-mt-24 bg-band pt-12 pb-20 lg:pt-16 lg:pb-24"
    >
      <ScrollRevealRail>
        <SectionHeader
          num={content.num}
          label={content.label}
          setup={content.setup}
          payoff={content.payoff}
          lede={content.lede}
        >
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-overcast">{content.audienceLabel}</span>
            <div className="flex gap-1 rounded-full border border-blue-border bg-background p-1">
              {content.audiences.map((a) => (
                <button
                  key={a.id}
                  type="button"
                  onClick={() => setAudience(a.id)}
                  aria-pressed={audience === a.id}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-150 ${
                    audience === a.id ? "bg-ink text-on-action" : "text-inkSoft hover:text-ink"
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
          <SectionCoda lead={content.coda.lead} payoff={content.coda.payoff} />
        </ScrollReveal>
      </ScrollRevealRail>
    </section>
  );
}
