"use client";

/*
 * [00] Finance Hero: real financial-district texture plus a simulated Akashic
 * risk-desk surveillance console. The console is storytelling UI only:
 * hardcoded demo readouts, hop states, and a structuring trace, not live
 * product functionality (§8a).
 */

import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import type { SectorContent, SectorTemplate } from "@/content/pages/sectors";
import { LiveChip } from "@/components/sections/akashic/AkashicCardChrome";

const hops = [
  { code: "14:02", name: "Card", state: "ok" },
  { code: "14:07", name: "UPI", state: "ok" },
  { code: "14:08", name: "Savings", state: "chain" },
  { code: "—", name: "Resolved", state: "ok" },
] as const;

const readouts = [
  { label: "Streams", value: "1,240/s" },
  { label: "Entities", value: "1 of 3" },
  { label: "Chain", value: "3 hops" },
];

const bankSystems = ["Core banking", "Cards", "UPI", "Lending", "KYC", "AML"];

const signalRows = [
  { label: "Transaction signal", value: "Amount · counterparty · channel" },
  { label: "Identity graph", value: "Name · KYC · device · linked accounts" },
  { label: "Enterprise record", value: "Exposure · risk score · prior alerts" },
];

function StructuringTrace() {
  // Six transfers, each parked just under the ₹50,000 reporting limit.
  // Individually clean (grey); the pattern crystallises into blue.
  const bars = [
    { x: 24, h: 30, blue: false },
    { x: 92, h: 33, blue: false },
    { x: 160, h: 31, blue: false },
    { x: 236, h: 34, blue: true },
    { x: 304, h: 32, blue: true },
    { x: 372, h: 35, blue: true },
  ];
  const baseline = 66;
  const threshold = 18;

  return (
    <div className="px-4 pb-1 pt-3.5">
      <div className="flex items-center justify-between gap-4">
        <span className="font-mono text-[8.5px] font-semibold uppercase tracking-[0.1em] text-overcast">
          Transfers · same beneficiary · 6 min
        </span>
        <span className="font-mono text-[8.5px] font-semibold uppercase tracking-[0.08em] text-blue">
          Chain detected
        </span>
      </div>
      <svg viewBox="0 0 440 74" className="mt-2 h-[74px] w-full" aria-hidden>
        {/* reporting threshold */}
        <line x1="0" y1={threshold} x2="440" y2={threshold} stroke="rgb(var(--blue-400))" strokeWidth="1" strokeDasharray="3 4" opacity="0.7" />
        <text x="2" y={threshold - 4} fontFamily="monospace" fontSize="8" fill="rgb(var(--line))">
          REPORT LIMIT ₹50,000
        </text>
        {/* baseline */}
        <line x1="0" y1={baseline} x2="440" y2={baseline} stroke="rgb(var(--background))" strokeWidth="1" opacity="0.09" />
        {/* transfer bars, all parked just below the limit */}
        {bars.map((bar) => (
          <rect
            key={bar.x}
            x={bar.x}
            y={bar.h}
            width="26"
            height={baseline - bar.h}
            rx="1.5"
            fill={bar.blue ? "rgb(var(--blue-400))" : "rgb(var(--overcast))"}
          />
        ))}
        {/* detection marker */}
        <line x1="224" y1="8" x2="224" y2={baseline} stroke="rgb(var(--blue-400))" strokeWidth="1" strokeDasharray="2 3" opacity="0.5" />
        <text x="230" y="12" fontFamily="monospace" fontSize="8" fill="rgb(var(--blue-300))">
          14:09 PATTERN
        </text>
        <text x="218" y="12" textAnchor="end" fontFamily="monospace" fontSize="8" fill="rgb(var(--line))">
          EACH: CLEAR
        </text>
        <circle cx="385" cy="35" r="3.5" fill="rgb(var(--blue-400))" />
      </svg>
    </div>
  );
}

function SurveillanceConsole() {
  return (
    <div className="w-full max-w-[520px] overflow-hidden rounded-frame border border-card-line bg-background text-left ">
      <div className="h-[3px] bg-blue" aria-hidden />
      <div className="flex items-center justify-between border-b border-line px-4 py-3">
        <span className="flex items-center gap-1.5 font-mono text-[10px] font-semibold uppercase tracking-eyebrow text-secondary-text">
          <span className="h-[5px] w-[5px] rounded-full bg-blue animate-[ps-pulse_2s_infinite]" aria-hidden />
          Risk desk · Live surveillance
        </span>
        <LiveChip />
      </div>

      <StructuringTrace />

      <div className="px-4 pb-4 pt-3">
        <div className="relative">
          <div className="absolute left-[7px] right-[7px] top-[5px] border-t border-dashed border-line" aria-hidden />
          <div className="grid grid-cols-4">
            {hops.map((hop) => (
              <div key={hop.name} className="flex flex-col items-start">
                <span
                  className={`relative z-10 block h-[11px] w-[11px] rounded-full border-2 ${
                    hop.state === "chain"
                      ? "border-blue bg-blue animate-[ps-pulse_2s_infinite]"
                      : "border-line bg-transparent"
                  }`}
                  aria-hidden
                />
                <span className="mt-2 font-mono text-[8.5px] uppercase tracking-[0.08em] text-inkSoft">
                  {hop.code}
                </span>
                <span
                  className={`text-[11.5px] font-semibold tracking-tight ${
                    hop.state === "chain" ? "text-blue" : "text-ink"
                  }`}
                >
                  {hop.name}
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
              Structuring pattern · same entity
            </p>
            <p className="font-mono text-[8.5px] uppercase tracking-[0.08em] text-inkSoft">
              Flagged as it forms · evidence attached
            </p>
          </div>
          <span className="shrink-0 rounded-full bg-blue px-2.5 py-1 font-mono text-[8.5px] font-semibold uppercase tracking-[0.08em] text-on-action">
            Review
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
        <span className="text-inkSoft">Core banking · cards · UPI unified</span>
        <span className="text-inkSoft">Every alert traceable</span>
      </div>
    </div>
  );
}

function BankSystemsRail() {
  return (
    <div className="grid gap-3 border-t border-line py-5 md:grid-cols-[auto_1fr] md:items-center">
      <p className="font-mono text-[10px] font-semibold uppercase tracking-eyebrow text-inkSoft">
        Systems watched together
      </p>
      <div className="flex flex-wrap gap-2 md:justify-end">
        {bankSystems.map((system) => (
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

export default function FinanceHero({ content, template }: { content: SectorContent; template: SectorTemplate }) {
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
              <h1 className="mt-6 max-w-[9.5em] text-5xl font-medium leading-[1.02] tracking-tightest text-ink md:text-6xl lg:text-[66px]">
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
                  </div><SurveillanceConsole /></div>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={340}>
          <BankSystemsRail />
        </ScrollReveal>
      </ScrollRevealRail>
    </section>
  );
}
