"use client";

/*
 * [07] Build vs. buy — the opportunity-cost argument, not a capability fight.
 * Framed to concede the open-source base (the stack tour in [08] names it
 * anyway) and win on what the team stops doing instead. Every figure here
 * must be sourced or cut (AGENTS.md Rule 4): the hard time figure was hedged
 * to "Weeks, typically" (Jul 2026) rather than commit to an unsourced "6
 * weeks"; the remaining build-side cells are qualitative, not quantified.
 * Capability rows must match [08]'s datasheet wording exactly — it is the
 * arbiter for lineage granularity and audit guarantees.
 *
 * Every cell is a string, deliberately. The "Who carries it" group used to
 * be booleans rendered as tick / cross badges, which (a) violated Rule 2 —
 * checkmarks belong only to FieldLedger — and (b) contradicted the framing:
 * a cross claims the team *cannot* build what the section concedes they
 * could, and what [08] then names the open-source projects for. Rows state
 * who carries the work, not who is capable of it. Do not reintroduce booleans.
 *
 * Design (Jul 2026, third pass): the two states are pill fields. The Akashic
 * side is a clean 3×3 — the same governed set, assembled and aligned; the
 * custom side is the same concerns tumbled out of square (see
 * AkashicComparisonPills). The old canvas physics + hand-drawn underline were
 * retired as cheap effects. The detailed matrix is one card with the Akashic
 * column drawn as a tinted, hairline-framed "recommended" lane — no
 * absolutely-positioned floating plate, so nothing can drift out of
 * alignment. Rows are CSS subgrid so heights always align; mobile stacks per
 * row instead of scrolling a wide table.
 */

import { Fragment, useState } from "react";
import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import AkashicLogo from "@/components/icons/AkashicLogo";

interface ComparisonRow {
  label: string;
  build: string;
  akashic: string;
  akashicHighlight?: boolean;
}

interface ComparisonGroup {
  name: string;
  rows: ComparisonRow[];
}

const groups: ComparisonGroup[] = [
  {
    name: "Speed and complexity",
    rows: [
      {
        label: "Time to production-ready system",
        build: "Quarters",
        akashic: "Weeks, typically",
        akashicHighlight: true,
      },
      {
        label: "Engineers held on the platform",
        build: "A standing team",
        akashic: "One solutions architect",
        akashicHighlight: true,
      },
      {
        label: "Integration setup effort",
        build: "Custom APIs, per source",
        akashic: "Pre-built connectors, day one",
        akashicHighlight: true,
      },
      {
        label: "Deployment complexity",
        build: "Seven systems, wired by hand",
        akashic: "One deployment, cloud or on-premises",
        akashicHighlight: true,
      },
    ],
  },
  {
    name: "Who carries it",
    rows: [
      {
        label: "Unified knowledge graph",
        build: "Design it, then maintain it",
        akashic: "Included, maintained",
        akashicHighlight: true,
      },
      {
        label: "Column-level lineage",
        build: "Instrument every transform yourself",
        akashic: "Automatic, every layer",
        akashicHighlight: true,
      },
      {
        label: "Real-time streaming and change capture",
        build: "Per-source, per-schema, ongoing",
        akashic: "Configured once",
        akashicHighlight: true,
      },
      {
        label: "Grounded answers, with citations",
        build: "Build the grounding layer first",
        akashic: "Included",
        akashicHighlight: true,
      },
      {
        label: "Append-only audit log",
        build: "Yours to build and prove",
        akashic: "Append-only, always on",
        akashicHighlight: true,
      },
    ],
  },
  {
    name: "Cost and governance",
    rows: [
      {
        label: "Upfront licensing cost",
        build: "$0 (open-source base)",
        akashic: "Predictable subscription",
      },
      {
        label: "Annual maintenance overhead",
        build: "Yours to carry",
        akashic: "Included in your licence",
        akashicHighlight: true,
      },
      {
        label: "Built-in compliance and security",
        build: "Yours to certify",
        akashic: "Certified",
        akashicHighlight: true,
      },
      {
        label: "Open standards, no lock-in",
        build: "Achievable, by discipline",
        akashic: "Structural",
        akashicHighlight: true,
      },
    ],
  },
];

function ToolIcon({ className = "h-5 w-5 text-overcast" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

/* Head-to-head rows for the comparison dashboard. `lean` is the blue
   (Akashic) share of the back-to-back track, 0–100; the custom bar takes the
   rest, less a constant centre gap. It is a QUALITATIVE editorial weight — how
   decisively the balance tips on that row — not a measured benchmark, and no
   figure is ever surfaced to the reader (AGENTS.md Rule 4). The values vary
   per row on purpose: a uniform lean read as one bar repeated seven times, so
   each capability now tips by a different amount and the last row (upfront
   licence) tips the other way, the one thing custom wins on. */
interface CompareRow {
  attr: string;
  ak: string;
  cu: string;
  lean: number;
}

const compare: CompareRow[] = [
  { attr: "Integration", ak: "Prebuilt", cu: "Custom APIs", lean: 76 },
  { attr: "Knowledge graph", ak: "Maintained", cu: "You build it", lean: 82 },
  { attr: "Column lineage", ak: "Automatic", cu: "You instrument", lean: 78 },
  { attr: "Grounded answers", ak: "Included", cu: "From scratch", lean: 70 },
  { attr: "Compliance", ak: "Certified", cu: "You certify", lean: 65 },
  { attr: "Upkeep", ak: "Included", cu: "You carry it", lean: 73 },
  { attr: "Upfront licence", ak: "Subscription", cu: "$0 open-source", lean: 33 },
];

/* Profile trait chips. The page's own chip idiom (see AkashicCardChrome's
   BlueChip / LiveChip): chip-radius, subtle fill, hairline border, mono
   uppercase micro-label — not the ad-hoc rounded-full pill this section used
   before. Kept short so all three sit on one line in the 232px column. */
function Tag({ tone, children }: { tone: "blue" | "gray"; children: React.ReactNode }) {
  return (
    <span
      className={`rounded-chip border px-2 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.05em] ${
        tone === "blue"
          ? "border-blue-border bg-blue-subtle text-blue"
          : "border-card-line bg-panel text-secondary-text"
      }`}
    >
      {children}
    </span>
  );
}

export default function AkashicBuildVsBuy() {
  const [showMatrix, setShowMatrix] = useState(false);

  return (
    <section id="build-vs-buy" className="scroll-mt-24 border-t border-lineSoft bg-background">
      <div className="rail-container pt-12 pb-24 lg:pt-16 lg:pb-32">
        <ScrollReveal>
          <p className="font-mono text-[11px] uppercase tracking-eyebrow">
            <span className="text-overcast">[07]</span>
            <span className="text-inkSoft">&nbsp;&nbsp;Build vs. buy</span>
          </p>
          <h2 className="mt-5 text-heading-sm font-semibold text-ink md:text-heading-md lg:whitespace-nowrap">
            Buy the platform. Keep your engineers.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-secondary-text">
            <span className="block lg:whitespace-nowrap">
              Every Akashic module is built from open technologies your engineers already know.
            </span>
            <span className="block lg:whitespace-nowrap">
              The difference is who carries the integration, the governance, and the upkeep.
            </span>
          </p>
        </ScrollReveal>

        {/* ===== Head-to-head: two profiles flanking a "who carries the work"
             comparison, modelled on a candidate-comparison dashboard ===== */}
        <ScrollReveal delay={100}>
          <div className="mx-auto mt-16 max-w-[1040px] overflow-hidden rounded-outer border border-card-line bg-white shadow-card">
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,232px)_minmax(0,1fr)_minmax(0,232px)]">
              {/* Left profile — Akashic */}
              <div className="flex flex-col items-center gap-3 border-b border-card-divide bg-blue-subtle/25 px-6 py-8 text-center lg:border-b-0 lg:border-r">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-blue-border bg-white shadow-card">
                  <AkashicLogo className="h-8 w-8" />
                </div>
                <div>
                  <div className="flex items-center justify-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-blue" aria-hidden />
                    <span className="text-[15px] font-semibold text-ink">Akashic</span>
                  </div>
                  <p className="mt-0.5 text-[12px] text-secondary-text">The assembled platform</p>
                </div>
                <div className="flex flex-wrap justify-center gap-1.5">
                  <Tag tone="blue">Modular</Tag>
                  <Tag tone="blue">Open</Tag>
                  <Tag tone="blue">Governed</Tag>
                </div>
                <span className="mt-1 rounded-chip bg-blue px-3 py-1 text-[11px] font-semibold text-white">
                  Weeks to live
                </span>
              </div>

              {/* Center — back-to-back "who carries the work" bars */}
              <div className="px-5 py-6 lg:px-9">
                <p className="mb-5 text-center font-mono text-[9px] font-semibold uppercase tracking-eyebrow text-secondary-text">
                  Who carries the work
                </p>
                <div className="flex flex-col gap-3.5">
                  {compare.map((row) => (
                    <div key={row.attr}>
                      <p className="mb-1 text-center text-[11px] font-medium text-inkSoft">{row.attr}</p>
                      <div className="flex items-center gap-2.5">
                        <span className="w-[88px] shrink-0 text-right text-[11px] font-semibold text-blue">
                          {row.ak}
                        </span>
                        <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-panel">
                          <span
                            className="absolute left-0 top-0 h-full rounded-full bg-blue transition-[width] duration-500 ease-settle"
                            style={{ width: `${row.lean}%` }}
                          />
                          <span
                            className="absolute right-0 top-0 h-full rounded-full bg-line transition-[width] duration-500 ease-settle"
                            style={{ width: `${94 - row.lean}%` }}
                          />
                        </div>
                        <span className="w-[88px] shrink-0 text-left text-[11px] text-secondary-text">
                          {row.cu}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right profile — Custom build */}
              <div className="flex flex-col items-center gap-3 border-t border-card-divide bg-panel/50 px-6 py-8 text-center lg:border-l lg:border-t-0">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-line bg-white shadow-card">
                  <ToolIcon className="h-7 w-7 text-overcast" />
                </div>
                <div>
                  <div className="flex items-center justify-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-overcast" aria-hidden />
                    <span className="text-[15px] font-semibold text-ink">Custom build</span>
                  </div>
                  <p className="mt-0.5 text-[12px] text-secondary-text">Wired together in-house</p>
                </div>
                <div className="flex flex-wrap justify-center gap-1.5">
                  <Tag tone="gray">DIY</Tag>
                  <Tag tone="gray">Self-run</Tag>
                  <Tag tone="gray">Upkeep</Tag>
                </div>
                <span className="mt-1 rounded-chip border border-card-line bg-white px-3 py-1 text-[11px] font-semibold text-secondary-text">
                  Quarters to live
                </span>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Detailed matrix toggle */}
        <ScrollReveal delay={200}>
          <div className="mt-14 flex justify-center">
            <button
              onClick={() => setShowMatrix(!showMatrix)}
              className="btn-secondary flex items-center gap-2 px-4 py-2 text-xs font-semibold transition-colors duration-250 hover:bg-tertiary-bg"
            >
              <span>{showMatrix ? "Hide" : "Show"} detailed comparison matrix</span>
              <svg
                className={`h-3.5 w-3.5 transition-transform duration-250 ${showMatrix ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </ScrollReveal>

        {showMatrix && (
          <div className="mt-12">
            {/* ===== Desktop: one card, Akashic drawn as a tinted, hairline-
                 framed "recommended" lane. Subgrid keeps every row aligned. ===== */}
            <div className="mx-auto hidden max-w-[960px] overflow-hidden rounded-outer border border-card-line bg-white shadow-card lg:block">
              <div className="grid grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)_minmax(0,1fr)]">
                {/* header row */}
                <div className="col-span-3 grid grid-cols-subgrid">
                  <div className="flex items-end border-b border-lineSoft bg-panel/40 px-6 py-5">
                    <span className="font-mono text-[10px] font-semibold uppercase tracking-eyebrow text-secondary-text">
                      Side by side
                    </span>
                  </div>
                  {/* Akashic (recommended) lane */}
                  <div className="relative flex flex-col items-center border-x border-b border-blue-border/50 bg-blue-subtle/50 px-5 pb-5 pt-8 text-center">
                    <span className="absolute left-1/2 top-0 -translate-x-1/2 rounded-b-chip bg-blue px-3 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-wider text-white">
                      Recommended
                    </span>
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-card">
                      <AkashicLogo className="h-6 w-6" primaryColor="#3E63DD" accentColor="#0F9CA6" />
                    </span>
                    <h3 className="mt-2.5 text-[15px] font-semibold tracking-tight text-ink">Akashic</h3>
                    <p className="mt-1 max-w-[15em] text-[11.5px] leading-snug text-secondary-text">
                      The same technologies, already assembled and governed
                    </p>
                  </div>
                  {/* Custom build */}
                  <div className="flex flex-col items-center justify-end border-b border-lineSoft px-5 pb-5 pt-8 text-center">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-tertiary-bg">
                      <ToolIcon />
                    </span>
                    <h3 className="mt-2.5 text-[15px] font-semibold tracking-tight text-ink">Custom build</h3>
                    <p className="mt-1 max-w-[15em] text-[11.5px] leading-snug text-secondary-text">
                      The same open technologies, wired together in-house
                    </p>
                  </div>
                </div>

                {groups.map((group) => (
                  <Fragment key={group.name}>
                    {/* group band — label in the rail, lane tint continues */}
                    <div className="col-span-3 grid grid-cols-subgrid">
                      <div className="border-b border-lineSoft bg-panel/40 px-6 pb-2.5 pt-4">
                        <span className="font-mono text-[10px] font-bold uppercase tracking-eyebrow text-inkSoft">
                          {group.name}
                        </span>
                      </div>
                      <div className="border-x border-b border-blue-border/50 bg-blue-subtle/50" aria-hidden />
                      <div className="border-b border-lineSoft bg-panel/40" aria-hidden />
                    </div>

                    {group.rows.map((row) => (
                      <div key={row.label} className="group/row col-span-3 grid grid-cols-subgrid">
                        <div className="flex items-center border-b border-lineSoft/70 px-6 py-3.5 text-sm font-medium text-ink transition-colors duration-250 ease-settle group-hover/row:bg-panel/60">
                          {row.label}
                        </div>
                        <div className="flex items-center justify-center border-x border-b border-blue-border/50 bg-blue-subtle/50 px-5 py-3.5 text-center text-[13.5px] font-semibold transition-colors duration-250 ease-settle group-hover/row:bg-blue-subtle">
                          <span className={row.akashicHighlight ? "text-blue" : "text-ink"}>
                            {row.akashic}
                          </span>
                        </div>
                        <div className="flex items-center justify-center border-b border-lineSoft/70 px-5 py-3.5 text-center text-[13.5px] text-secondary-text transition-colors duration-250 ease-settle group-hover/row:bg-panel/60">
                          {row.build}
                        </div>
                      </div>
                    ))}
                  </Fragment>
                ))}
              </div>
            </div>

            {/* ===== Mobile: stacked per-row cards, no sideways scrolling ===== */}
            <div className="lg:hidden">
              <div className="grid grid-cols-2 gap-3">
                <div className="relative rounded-inner border border-blue-border bg-white px-3 py-2.5 text-center shadow-card">
                  <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 rounded-full bg-blue px-2.5 py-0.5 font-mono text-[8px] font-semibold uppercase tracking-wider text-white">
                    Recommended
                  </span>
                  <p className="text-[13px] font-semibold text-ink">Akashic</p>
                  <p className="mt-0.5 text-[11px] text-secondary-text">Assembled and governed</p>
                </div>
                <div className="rounded-inner border border-card-line bg-primary-bg px-3 py-2.5 text-center">
                  <p className="text-[13px] font-semibold text-ink">Custom build</p>
                  <p className="mt-0.5 text-[11px] text-secondary-text">Wired together in-house</p>
                </div>
              </div>

              {groups.map((group) => (
                <div key={group.name} className="mt-7">
                  <p className="font-mono text-[10px] font-bold uppercase tracking-eyebrow text-inkSoft">
                    {group.name}
                  </p>
                  <div className="mt-2.5 flex flex-col gap-2.5">
                    {group.rows.map((row) => (
                      <div key={row.label} className="overflow-hidden rounded-inner border border-card-line bg-white">
                        <p className="border-b border-card-divide bg-panel px-3.5 py-2 text-[13px] font-medium text-ink">
                          {row.label}
                        </p>
                        <div className="grid grid-cols-2 divide-x divide-card-divide">
                          <div className="bg-blue-subtle/30 px-3.5 py-2.5">
                            <p className="font-mono text-[8.5px] uppercase tracking-wider text-blue/70">Akashic</p>
                            <p
                              className={`mt-0.5 text-[12.5px] font-semibold leading-snug ${
                                row.akashicHighlight ? "text-blue" : "text-ink"
                              }`}
                            >
                              {row.akashic}
                            </p>
                          </div>
                          <div className="px-3.5 py-2.5">
                            <p className="font-mono text-[8.5px] uppercase tracking-wider text-secondary-text">Build</p>
                            <p className="mt-0.5 text-[12.5px] leading-snug text-secondary-text">{row.build}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Closer: statement + CTA, the house section-ending pattern */}
        <ScrollReveal>
          <div className="mt-14 flex flex-col items-center text-center lg:mt-20">
            <p className="max-w-[26em] text-2xl font-semibold leading-snug tracking-tight text-ink md:text-[28px]">
              Akashic is what your team would build if building the platform were their only job.
            </p>
            <Link href="#stack" className="btn-primary mt-8">
              See what each module runs on
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
