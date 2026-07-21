/*
 * [01] The Invisible Journey — the education problem as a creative split: the
 * three signals that each look like noise (dark plate) against the term-end
 * exit they add up to (paper-light plate, red spine), then the fracture ledger
 * beneath. Red appears only as the problem indicator (token table). Fracture
 * copy comes from the shared sector config so the two stay in sync.
 */

import Image from "next/image";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import { SECTOR_PAGES } from "@/components/sections/sectors/sectorContent";

const education = SECTOR_PAGES.education;

const journeySignals = [
  {
    tag: "RESOLVE",
    title: "One learner, every system",
    body: "Admissions, LMS, assessment, attendance, and fees resolve into one governed record.",
  },
  {
    tag: "PATTERN",
    title: "At-risk combination matched",
    body: "The three signals together match a known drop-out shape this cohort has shown before.",
  },
  {
    tag: "ACT",
    title: "Counsellor reaches out",
    body: "A conversation in week four, while there is still a term left to change the outcome.",
  },
];

const noiseRows = [
  { system: "ATT", event: "Attendance dips", flag: false },
  { system: "LMS", event: "Assessment slides", flag: false },
  { system: "FEE", event: "Payment stalls", flag: true },
];

function JourneyEvidenceBand() {
  return (
    <div className="mt-10 overflow-hidden rounded-frame border border-subtle-stroke bg-ink shadow-frame">
      <div className="grid grid-cols-1 lg:grid-cols-[1.12fr_0.88fr]">
        <div className="relative min-h-[300px] overflow-hidden">
          <Image
            src="/sectors/education-hq.jpg"
            alt="University campus with students and academic buildings"
            fill
            sizes="(min-width: 1024px) 58vw, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,10,12,0.12)_0%,rgba(10,10,12,0.68)_100%)]" aria-hidden />
          <div className="absolute left-5 top-5 rounded-full border border-white/[0.18] bg-white/[0.12] px-3 py-1.5 font-mono text-[9.5px] font-semibold uppercase tracking-[0.08em] text-white/[0.82] backdrop-blur-md">
            Cohort · Week 3
          </div>
          <div className="absolute bottom-5 left-5 right-5 grid gap-2 sm:grid-cols-3">
            {["Week 2", "Week 3", "Week 4"].map((stage) => (
              <div key={stage} className="rounded-card border border-white/[0.16] bg-black/[0.34] px-3 py-2 backdrop-blur-md">
                <p className="font-mono text-[8px] font-semibold uppercase tracking-[0.08em] text-white/[0.52]">
                  Signal
                </p>
                <p className={`mt-1 text-[12px] font-semibold ${stage === "Week 4" ? "text-blue-subtle" : "text-white"}`}>
                  {stage}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative px-6 py-7 text-white md:px-8">
          <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-blue/70 via-blue/30 to-transparent lg:inset-x-auto lg:bottom-0 lg:left-0 lg:top-0 lg:h-auto lg:w-[3px]" aria-hidden />
          <p className="font-mono text-[10px] font-semibold uppercase tracking-eyebrow text-white/50">
            What the journey is already saying
          </p>
          <div className="mt-6 space-y-5">
            {journeySignals.map((signal, idx) => (
              <div key={signal.title} className={idx > 0 ? "border-t border-dashed border-white/[0.14] pt-5" : ""}>
                <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.1em] text-blue-subtle">
                  {signal.tag}
                </p>
                <h3 className="mt-1.5 text-[18px] font-semibold leading-snug tracking-tight text-white">
                  {signal.title}
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-white/[0.62]">
                  {signal.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function EducationJourney() {
  return (
    <section id="problem" className="scroll-mt-24 overflow-hidden bg-white pt-10 pb-16 lg:pt-14 lg:pb-20">
      <ScrollRevealRail>
        <ScrollReveal>
          <div className="mb-10 flex items-center justify-between border-t border-b border-dashed border-lineSoft py-[17px] px-[2px] font-mono text-[11px] uppercase tracking-eyebrow text-inkSoft">
            <span>
              <span className="text-overcast">[01]</span>
              &nbsp;&nbsp;THE PROBLEM
            </span>
            <span className="text-overcast">/ THE INVISIBLE JOURNEY</span>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={80}>
          <h2 className="text-heading-sm font-semibold text-ink md:text-heading-md lg:text-heading-lg">
            You can count enrolments. You can&rsquo;t see journeys.
          </h2>
        </ScrollReveal>

        {/* The two views */}
        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_auto_1fr] lg:items-stretch lg:gap-0">
          <ScrollReveal delay={120}>
            <div className="relative h-full overflow-hidden rounded-frame bg-ink px-7 py-9 text-white md:px-9">
              <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-blue/70 via-blue/30 to-transparent" aria-hidden />
              <div className="dot-grid absolute inset-0 opacity-10 invert" aria-hidden />
              <div className="relative">
                <p className="font-mono text-[10px] font-semibold uppercase tracking-eyebrow text-white/50">
                  What each system saw
                </p>
                <p className="mt-5 font-mono text-[34px] font-bold leading-none tracking-tight text-white md:text-[40px]">
                  Just noise<span className="text-blue">.</span>
                </p>
                <p className="mt-4 font-mono text-[9.5px] uppercase tracking-[0.1em] text-white/50">
                  Three systems &middot; three unread signals
                </p>
                <div className="mt-6 space-y-2.5">
                  {noiseRows.map((row) => (
                    <div key={row.system} className="flex items-center gap-3 border-t border-dashed border-white/[0.14] pt-2.5 first:border-t-0 first:pt-0">
                      <span className="w-[46px] shrink-0 rounded-[4px] border border-white/[0.18] bg-white/[0.08] px-1.5 py-0.5 text-center font-mono text-[8.5px] font-semibold uppercase tracking-[0.06em] text-white/70">
                        {row.system}
                      </span>
                      <span className="min-w-0 flex-1 truncate text-[12.5px] font-medium tracking-tight text-white/85">
                        {row.event}
                      </span>
                      <span
                        className={`h-[6px] w-[6px] shrink-0 rounded-full ${row.flag ? "bg-blue animate-[ps-pulse_2s_infinite]" : "bg-white/30"}`}
                        aria-hidden
                      />
                    </div>
                  ))}
                </div>
                <p className="mt-6 max-w-[26em] text-[15px] leading-relaxed text-white/[0.65]">
                  Each signal alone looks like a bad week. No system holds the
                  person, so no system sees them add up.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <div className="hidden flex-col items-center justify-center px-8 lg:flex" aria-hidden>
            <span className="h-full w-px border-l border-dashed border-line" />
            <span className="whitespace-nowrap py-3 font-mono text-[9px] uppercase tracking-[0.12em] text-overcast">
              Never joined
            </span>
            <span className="h-full w-px border-l border-dashed border-line" />
          </div>

          <ScrollReveal delay={200}>
            <div className="relative h-full overflow-hidden rounded-frame border border-subtle-stroke bg-primary-bg px-7 py-9 md:px-9">
              <div className="absolute inset-y-0 left-0 w-[3px] bg-red/60" aria-hidden />
              <p className="font-mono text-[10px] font-semibold uppercase tracking-eyebrow text-overcast">
                What they added up to
              </p>
              <p className="mt-5 text-[34px] font-semibold leading-none tracking-tighter text-ink md:text-[40px]">
                Term end
              </p>
              <p className="mt-4 font-mono text-[9.5px] uppercase tracking-[0.1em] text-overcast">
                Drop-out &middot; discovered as paperwork
              </p>
              <p className="mt-5 max-w-[26em] text-[15px] leading-relaxed text-inkSoft">
                Together they were a drop-out announcing itself a term in
                advance. Nobody saw them together, so the intervention came after
                the exit, when it was already a report.
              </p>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={140}>
          <p className="mx-auto mt-9 max-w-[38em] text-center text-lg leading-relaxed text-inkSoft md:text-xl">
            The gap between the signals and the person is where the drop-out
            hides.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={180}>
          <JourneyEvidenceBand />
        </ScrollReveal>

        {/* Fractures */}
        <div className="mt-12 grid grid-cols-1 gap-y-10 border-t border-lineSoft pt-10 md:grid-cols-3 md:gap-x-10 md:gap-y-0">
          {education.problem.fractures.map((fracture, idx) => (
            <ScrollReveal key={fracture.title} delay={idx * 90}>
              <div className={idx > 0 ? "md:border-l md:border-dashed md:border-lineSoft md:pl-10" : ""}>
                <p className="text-[44px] font-semibold leading-none tracking-tighter text-lineSoft">
                  {idx + 1}
                </p>
                <h3 className="mt-4 text-[19px] font-semibold leading-snug tracking-tight text-ink md:text-[20px]">
                  {fracture.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-inkSoft">
                  {fracture.body}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={120}>
          <p className="mt-12 border-t border-dashed border-lineSoft pt-6 font-mono text-[10px] uppercase tracking-eyebrow text-overcast">
            None of these are people problems. All of them are architecture problems.
          </p>
        </ScrollReveal>
      </ScrollRevealRail>
    </section>
  );
}
