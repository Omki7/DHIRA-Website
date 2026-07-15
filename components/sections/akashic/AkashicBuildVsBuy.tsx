/*
 * [07] Build vs. buy — the opportunity-cost argument, not a capability fight.
 * Framed to concede the open-source base (the stack tour in [08] names it
 * anyway) and win on what the team stops doing instead. Every figure here
 * must be sourced or cut (AGENTS.md Rule 4): the build-side estimates are
 * currently UNSOURCED and flagged for confirmation before ship.
 * Capability rows must match [08]'s datasheet wording exactly — it is the
 * arbiter for lineage granularity and audit guarantees.
 *
 * Every cell is a string, deliberately. The "Who carries it" group used to
 * be booleans rendered as tick / cross badges, which (a) violated Rule 2 —
 * checkmarks belong only to FieldLedger — and (b) contradicted the headline:
 * a cross claims the team *cannot* build what the H2 concedes they could,
 * and what [08] then names the open-source projects for. Rows state who
 * carries the work, not who is capable of it. Do not reintroduce booleans.
 */

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
        akashic: "6 weeks",
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
        label: "Real-time streaming and CDC",
        build: "Per-source, per-schema, ongoing",
        akashic: "Configured once",
        akashicHighlight: true,
      },
      {
        label: "Grounded answers, with citations",
        build: "Build the grounding layer first",
        akashic: "Included",
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
    <svg className="h-8 w-8 text-overcast" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
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
          <h2 className="mt-5 text-heading-sm font-semibold text-ink md:text-heading-md lg:text-heading-lg">
            Your team could build this. The question is what else they&rsquo;d stop doing.
          </h2>
          <p className="mt-5 max-w-[36em] text-lg leading-relaxed text-secondary-text">
            Every Akashic module is assembled from technologies your engineers already
            know. The build is not the hard part. Keeping seven systems integrated,
            governed, and current while the business keeps asking for answers: that
            becomes the job. Permanently.
          </p>
        </ScrollReveal>

        <div className="mt-12 lg:mt-14">
          {/* Scroll wrapper for mobile viewports */}
          <div className="w-full overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-thin">
            <div className="min-w-[760px] lg:min-w-0">
              {/* Header Grid */}
              <div className="grid grid-cols-[1.3fr_1fr_1fr] gap-4 mb-4">
                <div className="flex items-end pb-4 pl-4">
                  <span className="font-mono text-[10px] uppercase tracking-eyebrow text-overcast">
                    Side by side
                  </span>
                </div>

                {/* Custom Build Header Card */}
                <ScrollReveal delay={50}>
                  <div className="flex h-full flex-col items-center justify-between rounded-[10px] border border-lineSoft bg-primary-bg p-5 text-center">
                    <div className="flex flex-col items-center">
                      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-tertiary-bg">
                        <ToolIcon />
                      </div>
                      <h3 className="font-sans text-base font-semibold text-ink">Custom build</h3>
                      <p className="mt-1 text-xs text-secondary-text">The same open technologies, wired together in-house</p>
                    </div>
                    <span className="mt-4 inline-block rounded-full bg-tertiary-bg/60 px-3 py-1 font-mono text-[9px] uppercase tracking-wider text-secondary-text">
                      In-house
                    </span>
                  </div>
                </ScrollReveal>

                {/* Akashic Header Card */}
                <ScrollReveal delay={100}>
                  <div className="relative flex h-full flex-col items-center justify-between rounded-[10px] border-2 border-blue bg-blue-subtle/20 p-5 text-center shadow-sm">
                    {/* Recommended Pill badge */}
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-blue px-3 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-wider text-white shadow-sm">
                      Recommended
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-subtle">
                        <AkashicLogo className="h-7 w-7" primaryColor="#3E63DD" accentColor="#0F9CA6" />
                      </div>
                      <h3 className="font-sans text-base font-semibold text-ink">Akashic</h3>
                      <p className="mt-1 text-xs text-secondary-text">The same technologies, already assembled and governed</p>
                    </div>
                    <span className="mt-4 inline-block rounded-full bg-blue/10 px-3 py-1 font-mono text-[9px] uppercase tracking-wider text-blue">
                      Production Ready
                    </span>
                  </div>
                </ScrollReveal>
              </div>

              {/* Rows List */}
              <div className="border border-lineSoft rounded-[10px] overflow-hidden bg-white shadow-card">
                {groups.map((group, groupIdx) => (
                  <div key={group.name} className="first:border-t-0 border-t border-lineSoft">
                    {/* Group Header */}
                    <div className="bg-primary-bg/75 px-4 py-2.5 font-mono text-[10px] font-bold uppercase tracking-eyebrow text-inkSoft border-b border-lineSoft/60 text-left">
                      {group.name}
                    </div>

                    {/* Group Rows */}
                    <div className="divide-y divide-lineSoft/50">
                      {group.rows.map((row, rowIdx) => {
                        const isLastInLastGroup = 
                          groupIdx === groups.length - 1 && 
                          rowIdx === group.rows.length - 1;

                        return (
                          <div
                            key={row.label}
                            className="grid grid-cols-[1.3fr_1fr_1fr] transition-colors duration-settle hover:bg-tertiary-bg/10"
                          >
                            {/* Label */}
                            <div className="flex items-center text-left py-4 px-5 text-sm font-medium text-ink">
                              {row.label}
                            </div>

                            {/* Custom Build Cell */}
                            <div className="flex items-center justify-center py-4 px-4 text-sm text-secondary-text bg-primary-bg/10 border-l border-lineSoft/40">
                              <span className="font-sans text-center">{row.build}</span>
                            </div>

                            {/* Akashic Cell */}
                            <div className={`flex items-center justify-center py-4 px-4 text-sm bg-blue-subtle/5 border-l border-blue-border/20 border-r border-blue-border/20 ${
                              isLastInLastGroup ? "rounded-br-[9px]" : ""
                            }`}>
                              <span className={`font-sans text-center font-semibold ${
                                row.akashicHighlight ? "text-blue" : "text-ink"
                              }`}>
                                {row.akashic}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <ScrollReveal>
          <div className="mt-12 flex flex-col items-center text-center lg:mt-16">
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
