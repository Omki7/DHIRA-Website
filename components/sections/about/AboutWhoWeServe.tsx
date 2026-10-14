"use client";

/*
 * NOT RENDERED (removed from /about on 23 Sep 2026, user direction: "does
 * not do much, distracting"). Kept on disk as a draft; the soft blue band
 * moved to [03] How we work. Its stories were DRAFT, illustrative people.
 *
 * Was [02] Who we build for: "Behind every record, someone waiting on an answer."
 *
 * Intent: the page's human turn. The hero says every record is a person;
 * this section names three of them, one per live national programme, so
 * the programmes read as lives touched, not systems shipped. Each card is a
 * small drawing in the page's line language: a stack of records on the
 * left, one blue line carrying the answer to a person on the right.
 *
 * Owns: the people served. The programme figures (enrolments, doses,
 * clearances) stay with [05] Vision, where the layer drawing carries them.
 *
 * DRAFT (23 Sep 2026): Ananya, Meera and Imran are illustrative people and
 * their stories are written for review. The programme names are real
 * (`SiloLayer` DEPLOYMENTS). Confirm or replace each story before shipping.
 *
 * Ground: the page's one soft blue band (Rule 5a).
 */

import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import SectionHeader from "@/components/ui/SectionHeader";
import SectionCoda from "@/components/ui/SectionCoda";

type Story = {
  n: string;
  programme: string;
  who: string;
  body: string;
};

const STORIES: Story[] = [
  {
    n: "01",
    programme: "National Learning Platform",
    who: "Ananya moves to a new school.",
    body: "Her records arrive the same week. No lost term, no second admission form.",
  },
  {
    n: "02",
    programme: "National Immunisation Registry",
    who: "Meera tracks her son's vaccines.",
    body: "Every dose from every clinic, on one record. Nothing given twice, nothing missed.",
  },
  {
    n: "03",
    programme: "Overseas Employment Registry",
    who: "Imran leaves for work abroad.",
    body: "Clearance in days, not weeks. One verified record instead of three offices.",
  },
];

/* Records on the left, the answer travelling to one person on the right. */
function RecordToPerson({ index }: { index: number }) {
  const rows = [0, 1, 2];
  return (
    <svg viewBox="0 0 240 72" className="h-auto w-full" aria-hidden>
      {rows.map((k) => (
        <g key={k} transform={`translate(${6 + k * 6} ${10 + k * 6})`}>
          <rect width="52" height="36" rx="2" fill="#FFFFFF" stroke="#64748B" strokeWidth="1" />
          <line x1="8" x2="40" y1="11" y2="11" stroke="#d3d8df" />
          <line x1="8" x2="32" y1="19" y2="19" stroke="#d3d8df" />
          <line x1="8" x2="36" y1="27" y2="27" stroke="#d3d8df" />
        </g>
      ))}
      <path
        d={`M72 ${40 - index * 2} C 120 ${14 + index * 8}, 150 ${58 - index * 6}, 196 38`}
        fill="none"
        stroke="#3E63DD"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="72" cy={40 - index * 2} r="2.5" fill="#3E63DD" />
      <circle cx="214" cy="28" r="7" fill="none" stroke="#1A1C1D" strokeWidth="1.3" />
      <path d="M200 58 C 200 44, 228 44, 228 58" fill="none" stroke="#1A1C1D" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

export default function AboutWhoWeServe() {
  return (
    <section
      id="who-we-serve"
      className="scroll-mt-24 bg-[linear-gradient(180deg,#FFFFFF_0%,#F1F5FE_16%,#F1F5FE_84%,#FFFFFF_100%)] pt-12 pb-20 lg:pt-16 lg:pb-24"
    >
      <ScrollRevealRail>
        <SectionHeader
          num="02"
          label="Who we build for"
          setup="Behind every record,"
          payoff="someone waiting on an answer."
          lede="Three national programmes, three people each one serves. The systems are ours. The days are theirs."
        />

        <ol className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3 lg:mt-14 lg:gap-8">
          {STORIES.map((s, k) => (
            <li key={s.n}>
              <ScrollReveal delay={80 + k * 60}>
                <article className="flex h-full flex-col rounded-tile border border-blue-border/70 bg-background p-6 sm:p-7">
                  <RecordToPerson index={k} />
                  <p className="mt-6 border-t border-dashed border-lineSoft pt-4 font-mono text-[11px] uppercase leading-[1.6] tracking-[0.08em] text-inkSoft">
                    <span className="text-overcast">{s.n}</span>&nbsp;&nbsp;{s.programme}
                  </p>
                  <h3 className="mt-3 text-[21px] font-semibold leading-snug tracking-tight text-ink sm:text-[22px]">
                    {s.who}
                  </h3>
                  <p className="mt-2 text-pretty text-[15px] leading-relaxed text-inkSoft sm:text-base">{s.body}</p>
                </article>
              </ScrollReveal>
            </li>
          ))}
        </ol>

        <ScrollReveal delay={120}>
          <SectionCoda lead="Records in the millions." payoff="Built for the one." />
        </ScrollReveal>
      </ScrollRevealRail>
    </section>
  );
}
