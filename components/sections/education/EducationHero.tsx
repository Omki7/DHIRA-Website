"use client";

/*
 * [00] Education Hero: real campus texture plus a simulated Akashic student
 * success desk. The console is storytelling UI only: hardcoded demo readouts,
 * signal states, and a converging-risk trace, not live product functionality
 * (§8a).
 */

import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import type { SectorContent, SectorTemplate } from "@/content/pages/sectors";
import { LiveChip } from "@/components/sections/akashic/AkashicCardChrome";

const signals = [
  { code: "ATT", name: "Attendance", state: "ok" },
  { code: "LMS", name: "Scores", state: "ok" },
  { code: "FEE", name: "Fees", state: "risk" },
  { code: "—", name: "Outreach", state: "ok" },
] as const;

const readouts = [
  { label: "Signals", value: "3 of 3" },
  { label: "Flagged", value: "Wk 3" },
  { label: "Window", value: "1 term" },
];

const eduSystems = ["SIS", "LMS", "Assessment", "Attendance", "Fees", "Placement"];

const signalRows = [
  { label: "Learner signal", value: "Attendance · scores · fees" },
  { label: "Journey graph", value: "Enrolment · course · placement" },
  { label: "Institution record", value: "Cohort · programme · outcome" },
];

function RiskTrace() {
  const baseline = 66;
  const risk = 52;
  return (
    <div className="px-4 pb-1 pt-3.5">
      <div className="flex items-center justify-between gap-4">
        <span className="font-mono text-[8.5px] font-semibold uppercase tracking-[0.1em] text-overcast">
          Signals · one learner · term 3
        </span>
        <span className="font-mono text-[8.5px] font-semibold uppercase tracking-[0.08em] text-blue">
          At-risk pattern
        </span>
      </div>
      <svg viewBox="0 0 440 74" className="mt-2 h-[74px] w-full" aria-hidden>
        <line x1="0" y1="18" x2="440" y2="18" stroke="rgb(var(--background))" strokeWidth="1" opacity="0.09" />
        {/* at-risk band */}
        <line x1="0" y1={risk} x2="440" y2={risk} stroke="rgb(var(--blue-400))" strokeWidth="1" strokeDasharray="3 4" opacity="0.7" />
        <text x="2" y={risk - 4} fontFamily="monospace" fontSize="8" fill="rgb(var(--line))">
          AT-RISK BAND
        </text>
        <line x1="0" y1={baseline} x2="440" y2={baseline} stroke="rgb(var(--background))" strokeWidth="1" opacity="0.09" />
        {/* three thin signals each sliding, converging into the band */}
        <polyline fill="none" stroke="rgb(var(--overcast))" strokeWidth="1.3" points="0,26 88,30 176,36 220,41" />
        <polyline fill="none" stroke="rgb(var(--overcast))" strokeWidth="1.3" points="0,33 88,36 176,42 220,46" />
        <polyline fill="none" stroke="rgb(var(--overcast))" strokeWidth="1.3" points="0,40 88,43 176,47 220,50" />
        {/* combined risk crossing into the band */}
        <polyline fill="none" stroke="rgb(var(--blue-400))" strokeWidth="1.8" points="220,46 264,52 308,56 352,59 396,61 432,62" />
        <circle cx="396" cy="61" r="3.5" fill="rgb(var(--blue-400))" />
        <line x1="220" y1="8" x2="220" y2={baseline} stroke="rgb(var(--blue-400))" strokeWidth="1" strokeDasharray="2 3" opacity="0.5" />
        <text x="214" y="12" textAnchor="end" fontFamily="monospace" fontSize="8" fill="rgb(var(--line))">
          EACH: NOISE
        </text>
        <text x="226" y="12" fontFamily="monospace" fontSize="8" fill="rgb(var(--blue-300))">
          WK 3 PATTERN
        </text>
      </svg>
    </div>
  );
}

function SuccessConsole() {
  return (
    <div className="w-full max-w-[520px] overflow-hidden rounded-frame border border-card-line bg-background text-left ">
      <div className="h-[3px] bg-blue" aria-hidden />
      <div className="flex items-center justify-between border-b border-line px-4 py-3">
        <span className="flex items-center gap-1.5 font-mono text-[10px] font-semibold uppercase tracking-eyebrow text-secondary-text">
          <span className="h-[5px] w-[5px] rounded-full bg-blue animate-[ps-pulse_2s_infinite]" aria-hidden />
          Student success · Live signals
        </span>
        <LiveChip />
      </div>

      <RiskTrace />

      <div className="px-4 pb-4 pt-3">
        <div className="relative">
          <div className="absolute left-[7px] right-[7px] top-[5px] border-t border-dashed border-line" aria-hidden />
          <div className="grid grid-cols-4">
            {signals.map((signal) => (
              <div key={signal.code + signal.name} className="flex flex-col items-start">
                <span
                  className={`relative z-10 block h-[11px] w-[11px] rounded-full border-2 ${
                    signal.state === "risk"
                      ? "border-blue bg-blue animate-[ps-pulse_2s_infinite]"
                      : "border-line bg-transparent"
                  }`}
                  aria-hidden
                />
                <span className="mt-2 font-mono text-[8.5px] uppercase tracking-[0.08em] text-inkSoft">
                  {signal.code}
                </span>
                <span
                  className={`text-[11.5px] font-semibold tracking-tight ${
                    signal.state === "risk" ? "text-blue" : "text-ink"
                  }`}
                >
                  {signal.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2">
          {signalRows.map((row) => (
            <div key={row.label} className="rounded-card border border-line bg-tertiary-bg px-3 py-2">
              <p className="font-mono text-[8px] font-semibold uppercase tracking-[0.08em] text-inkSoft">
                {row.label}
              </p>
              <p className="mt-1 text-[11.5px] font-semibold leading-snug tracking-tight text-ink">
                {row.value}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between gap-3 rounded-card border border-blue-border bg-blue-subtle px-3.5 py-2.5">
          <div className="min-w-0">
            <p className="truncate text-[12px] font-semibold tracking-tight text-ink">
              At-risk pattern · one learner
            </p>
            <p className="font-mono text-[8.5px] uppercase tracking-[0.08em] text-inkSoft">
              Flagged a term early · counsellor ready
            </p>
          </div>
          <span className="shrink-0 rounded-full bg-blue px-2.5 py-1 font-mono text-[8.5px] font-semibold uppercase tracking-[0.08em] text-on-action">
            Reach out
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 divide-x divide-line border-t border-line">
        {readouts.map((readout) => (
          <div key={readout.label} className="px-3.5 py-3">
            <p className="flex items-center gap-1.5 font-mono text-[8.5px] font-semibold uppercase tracking-[0.1em] text-inkSoft">
              <span className="h-[5px] w-[5px] shrink-0 rounded-full bg-blue animate-[ps-pulse_2s_infinite]" aria-hidden />
              {readout.label}
            </p>
            <p className="mt-1.5 font-mono text-[15px] font-bold tracking-tight text-ink">
              {readout.value}
            </p>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-line bg-tertiary-bg px-4 py-2.5 font-mono text-[8.5px] uppercase tracking-[0.06em]">
        <span className="text-inkSoft">SIS · LMS · assessment unified</span>
        <span className="text-inkSoft">Every learner one record</span>
      </div>
    </div>
  );
}

function EduSystemsRail() {
  return (
    <div className="grid gap-3 border-t border-line py-5 md:grid-cols-[auto_1fr] md:items-center">
      <p className="font-mono text-[10px] font-semibold uppercase tracking-eyebrow text-inkSoft">
        Systems joined
      </p>
      <div className="flex flex-wrap gap-2 md:justify-end">
        {eduSystems.map((system) => (
          <span
            key={system}
            className="rounded-full border border-line bg-background px-3 py-1.5 font-mono text-[9.5px] font-semibold uppercase tracking-[0.08em] text-secondary-text "
          >
            {system}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function EducationHero({ content, template }: { content: SectorContent; template: SectorTemplate }) {
  const [eyebrowLead, eyebrowTail] = content.eyebrow.split(" · ");
  return (
    <section id="hero" className="relative overflow-hidden bg-anchor text-ink">
      
      
      
      

      <ScrollRevealRail>
        <div className="grid min-h-[calc(100vh-72px)] grid-cols-1 items-center gap-12 py-16 md:py-20 lg:grid-cols-[minmax(0,0.95fr)_minmax(420px,0.9fr)] lg:gap-16">
          <div>
            <ScrollReveal>
              <figure className="mb-7 inline-flex items-center gap-2 rounded-full border border-line bg-tertiary-bg px-3.5 py-1.5 text-xs text-ink   sm:text-sm">
                <span className="font-semibold">{content.name}</span>
                <span className="h-3.5 w-px bg-tertiary-bg" aria-hidden />
                <span className="font-medium text-secondary-text">{template.badge}</span>
              </figure>
            </ScrollReveal>

            <ScrollReveal delay={80}>
              <p className="font-mono text-[11px] uppercase tracking-eyebrow text-secondary-text">
                {eyebrowLead} <span className="text-inkSoft">·</span> {eyebrowTail}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={140}>
              <h1 className="mt-6 max-w-[9.5em] text-5xl font-semibold leading-[1.02] tracking-tightest text-ink md:text-6xl lg:text-[66px]">
                {content.headlinePlain}{" "}
                <span className="relative inline-block">
                  {content.headlineMarked}
                  <span className="absolute -bottom-[0.08em] left-0 h-[0.08em] w-full rounded-full bg-blue" aria-hidden />
                </span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={220}>
              <p className="mt-7 max-w-[37em] text-lg leading-relaxed text-secondary-text">
                {content.intro}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Link
                  href={template.primary.href}
                  className="btn-primary"
                >
                  {template.primary.label}
                </Link>
                <Link
                  href={template.secondary.href}
                  className="btn-secondary "
                >
                  {template.secondary.label}
                </Link>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={260} className="min-w-0">
            <div className="flex justify-center lg:justify-end">
<div className="w-full max-w-[520px]"><div className="relative mb-4 aspect-[16/5] w-full overflow-hidden rounded-frame border border-card-line">
                    <Image src={content.image.src} alt={content.image.alt} fill priority sizes="(min-width: 1024px) 520px, 100vw" className="object-cover" />
                  </div><SuccessConsole /></div>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={340}>
          <EduSystemsRail />
        </ScrollReveal>
      </ScrollRevealRail>
    </section>
  );
}
