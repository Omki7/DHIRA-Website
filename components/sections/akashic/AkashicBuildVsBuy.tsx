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
 * Design (Jul 2026, second pass): the "elevated column" comparison, spoken
 * in the house card language. The whole table sits in a recessed gray tray;
 * the Akashic column is a white house card — capillary, hairline blue
 * border, soft shadow — floating over it with a small overhang top and
 * bottom. No thick frames, no detached header boxes: elevation and hairlines
 * do all the work, matching every other card on the page. Group names live
 * in the label rail; rows are CSS-subgrid so heights always align. Mobile
 * gets stacked per-row cards instead of a horizontally scrolled table.
 */

import { Fragment } from "react";
import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import AkashicLogo from "@/components/icons/AkashicLogo";
import { Capillary, BlueChip } from "@/components/sections/akashic/AkashicCardChrome";

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

function ToolIcon() {
  return (
    <svg className="h-5 w-5 text-overcast" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

export default function AkashicBuildVsBuy() {
  return (
    <section id="build-vs-buy" className="scroll-mt-24 border-t border-lineSoft bg-white">
      <div className="rail-container pt-12 pb-24 lg:pt-16 lg:pb-32">
        <ScrollReveal>
          <p className="font-mono text-[11px] uppercase tracking-eyebrow">
            <span className="text-overcast">[07]</span>
            <span className="text-inkSoft">&nbsp;&nbsp;Build vs. buy</span>
          </p>
          <h2 className="mt-5 text-balance text-heading-sm font-semibold text-ink md:text-heading-md">
            Buy the platform. Keep your engineers.
          </h2>
          <p className="mt-5 max-w-[36em] text-lg leading-relaxed text-secondary-text">
            Every Akashic module is built from open technologies your engineers already
            know. The difference is who carries the integration, the governance, and
            the upkeep.
          </p>
        </ScrollReveal>

        {/* ===== Desktop: recessed tray, elevated Akashic card ===== */}
        <ScrollReveal>
          <div className="relative mx-auto mt-12 hidden max-w-[1000px] lg:mt-16 lg:block">
            {/* the recessed tray both columns sit in */}
            <div className="absolute inset-0 rounded-outer border border-card-line bg-primary-bg/70" aria-hidden />
            {/* the elevated Akashic plate — a house card floating over the tray */}
            <div
              className="absolute -top-5 -bottom-5 right-0 w-[300px] overflow-hidden rounded-outer border border-blue-border bg-white shadow-frame"
              aria-hidden
            >
              <Capillary />
            </div>

            {/* content grid; subgrid rows keep all three columns height-aligned */}
            <div className="relative grid grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)_300px]">
              {/* header row */}
              <div className="col-span-3 grid grid-cols-subgrid">
                <div className="flex items-end border-b border-lineSoft px-6 pb-5">
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-eyebrow text-secondary-text">
                    Side by side
                  </span>
                </div>
                <div className="flex flex-col items-center justify-end border-b border-lineSoft px-5 pb-5 pt-8 text-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-tertiary-bg">
                    <ToolIcon />
                  </div>
                  <h3 className="mt-2.5 text-[15px] font-semibold tracking-tight text-ink">Custom build</h3>
                  <p className="mt-1 max-w-[16em] text-[11.5px] leading-snug text-secondary-text">
                    The same open technologies, wired together in-house
                  </p>
                  <span className="mt-3 inline-flex items-center rounded-chip border border-card-line bg-white px-2 py-1 text-[9px] font-bold tracking-[0.03em] text-secondary-text">
                    In-house
                  </span>
                </div>
                <div className="flex flex-col items-center border-b border-card-divide px-5 pb-5 pt-6 text-center">
                  <span className="rounded-full bg-blue px-3 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-wider text-white">
                    Recommended
                  </span>
                  <div className="mt-3.5 flex h-10 w-10 items-center justify-center rounded-full bg-blue-subtle">
                    <AkashicLogo className="h-6 w-6" primaryColor="#3E63DD" accentColor="#0F9CA6" />
                  </div>
                  <h3 className="mt-2.5 text-[15px] font-semibold tracking-tight text-ink">Akashic</h3>
                  <p className="mt-1 max-w-[16em] text-[11.5px] leading-snug text-secondary-text">
                    The same technologies, already assembled and governed
                  </p>
                  <span className="mt-3">
                    <BlueChip label="Production ready" />
                  </span>
                </div>
              </div>

              {groups.map((group, groupIdx) => (
                <Fragment key={group.name}>
                  {/* group chapter label in the rail; the columns run behind it */}
                  <div className="col-span-3 px-6 pt-6 pb-2">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-eyebrow text-inkSoft">
                      {group.name}
                    </span>
                  </div>

                  {group.rows.map((row, rowIdx) => {
                    const isLast =
                      groupIdx === groups.length - 1 && rowIdx === group.rows.length - 1;
                    return (
                      <div key={row.label} className="group/row col-span-3 grid grid-cols-subgrid">
                        <div
                          className={`flex items-center px-6 py-3.5 text-sm font-medium text-ink transition-colors duration-250 ease-settle group-hover/row:bg-white/60 ${
                            isLast ? "" : "border-b border-lineSoft/70"
                          }`}
                        >
                          {row.label}
                        </div>
                        <div
                          className={`flex items-center justify-center px-5 py-3.5 text-center text-[13.5px] text-secondary-text transition-colors duration-250 ease-settle group-hover/row:bg-white/60 ${
                            isLast ? "" : "border-b border-lineSoft/70"
                          }`}
                        >
                          {row.build}
                        </div>
                        <div
                          className={`flex items-center justify-center px-6 py-3.5 text-center text-[13.5px] font-semibold transition-colors duration-250 ease-settle group-hover/row:bg-blue-subtle/25 ${
                            isLast ? "" : "border-b border-card-divide"
                          }`}
                        >
                          <span className={row.akashicHighlight ? "text-blue" : "text-ink"}>
                            {row.akashic}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </Fragment>
              ))}

              {/* breathing room before the tray / plate bottom edges */}
              <div className="col-span-3 h-5" />
            </div>
          </div>
        </ScrollReveal>

        {/* ===== Mobile: stacked per-row cards, no sideways scrolling ===== */}
        <div className="mt-10 lg:hidden">
          <ScrollReveal>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-inner border border-card-line bg-primary-bg px-3 py-2.5 text-center">
                <p className="text-[13px] font-semibold text-ink">Custom build</p>
                <p className="mt-0.5 text-[11px] text-secondary-text">Wired together in-house</p>
              </div>
              <div className="relative rounded-inner border border-blue-border bg-white px-3 py-2.5 text-center shadow-card">
                <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 rounded-full bg-blue px-2.5 py-0.5 font-mono text-[8px] font-semibold uppercase tracking-wider text-white">
                  Recommended
                </span>
                <p className="text-[13px] font-semibold text-ink">Akashic</p>
                <p className="mt-0.5 text-[11px] text-secondary-text">Assembled and governed</p>
              </div>
            </div>
          </ScrollReveal>

          {groups.map((group) => (
            <ScrollReveal key={group.name}>
              <div className="mt-7">
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
                        <div className="px-3.5 py-2.5">
                          <p className="font-mono text-[8.5px] uppercase tracking-wider text-secondary-text">Build</p>
                          <p className="mt-0.5 text-[12.5px] leading-snug text-secondary-text">{row.build}</p>
                        </div>
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
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

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
