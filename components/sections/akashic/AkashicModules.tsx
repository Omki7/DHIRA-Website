"use client";

/*
 * [02] Every Module, One Foundation — living stack diagram.
 * The module-card bodies are SIMULATED PRODUCT UI (see AGENTS.md §8a):
 * hardcoded figures and canned rows, consistent with the home page's
 * PowerfulPlatform mockups (same fake deployment, same numbers).
 */

import ScrollReveal from "@/components/ui/ScrollReveal";
import DynamicSketchIcon from "@/components/icons/DynamicSketchIcon";
import { FlowPath, FanIn, MergeDown, SplitDown, MobileConn } from "@/components/demos/AkashicFlowConnectors";
import { CARD, CardHeader, CardDesc, LiveChip, BlueChip } from "@/components/sections/akashic/AkashicCardChrome";

/* ------------------------------------------------------------------ */
/*  Layer shell                                                        */
/* ------------------------------------------------------------------ */

function LayerShell({
  name,
  tagline,
  children,
}: {
  name: string;
  tagline: string;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-frame border border-subtle-stroke bg-primary-bg">
      <div className="h-[3px] bg-gradient-to-r from-blue/50 via-blue/25 to-transparent" aria-hidden />
      <div className="flex flex-col gap-0.5 border-b border-subtle-stroke bg-white px-5 py-3.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
        <h3 className="shrink-0 text-[15px] font-semibold tracking-tight text-ink">{name}</h3>
        <p className="text-[13px] text-inkSoft sm:text-right">{tagline}</p>
      </div>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Layer 1 module bodies                                              */
/* ------------------------------------------------------------------ */

function PipelinesBody() {
  const rows = [
    { name: "CRM records", sub: "structured", rate: "1,240/s", pct: "90%", bar: "#3E63DD", rateColor: "#1A1C1D" },
    { name: "Field PDFs", sub: "unstructured · parsed", rate: "parsing", pct: "45%", bar: "#C0883A", rateColor: "#C0883A" },
    { name: "Live feeds", sub: "streaming", rate: "840/s", pct: "70%", bar: "#3E63DD", rateColor: "#1A1C1D" },
  ];
  return (
    <div className="flex flex-1 flex-col gap-2 p-3.5">
      {rows.map((row) => (
        <div key={row.name} className="flex items-center gap-2.5 rounded-[10px] border border-[#EEEEF3] bg-[#FBFBFE] px-3 py-2">
          <div className="min-w-0 flex-1">
            <div className="truncate text-[12px] font-semibold text-ink">{row.name}</div>
            <div className="truncate text-[10px] text-tertiary-text">{row.sub}</div>
          </div>
          <div className="flex shrink-0 flex-col items-end gap-1">
            <span className="text-[10px] font-semibold" style={{ color: row.rateColor }}>{row.rate}</span>
            <div className="h-[3px] w-12 overflow-hidden rounded-full bg-[#EAEAEF]">
              <div className="h-full rounded-full" style={{ width: row.pct, background: row.bar }} />
            </div>
          </div>
        </div>
      ))}
      <div className="mt-auto flex items-center gap-2 rounded-[9px] border border-[#CBEFDF] bg-[#EBF8F3] px-3 py-2">
        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#30A46C]" />
        <span className="text-[11px] font-bold text-[#1B7A47]">Validated on arrival · 0 errors</span>
      </div>
    </div>
  );
}

function MasterDataBody() {
  const variants = [
    { val: "“South Rgn”", src: "crm" },
    { val: "“Region: South”", src: "erp" },
    { val: "“S. District 7”", src: "field app" },
  ];
  return (
    <div className="flex flex-1 flex-col gap-2 p-3.5">
      <div className="flex flex-col gap-1.5 rounded-[10px] border border-[#EAEAEF] bg-[#F7F8FA] px-3 py-2.5">
        {variants.map((row) => (
          <div key={row.src} className="flex items-center justify-between gap-2">
            <span className="truncate font-mono text-[10.5px] text-ink">{row.val}</span>
            <span className="shrink-0 rounded-[4px] bg-[#F1F2F4] px-1.5 py-0.5 font-mono text-[8.5px] text-[#7C828C]">{row.src}</span>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2" aria-hidden>
        <div className="h-px flex-1 bg-[#EAEAEF]" />
        <span className="text-[10px] font-semibold text-[#6E7178]">merged</span>
        <div className="h-px flex-1 bg-[#EAEAEF]" />
      </div>
      <div className="mt-auto rounded-[12px] border-[1.5px] border-blue bg-gradient-to-b from-[#F6F8FF] to-white p-3 shadow-[0_6px_18px_rgba(62,99,221,0.08)]">
        <div className="text-[13px] font-bold text-ink">South Region</div>
        <div className="mt-0.5 text-[10.5px] font-medium text-blue">Golden record · 3 sources merged</div>
      </div>
    </div>
  );
}

function WarehouseBody() {
  const tiers = [
    { label: "RAW", labelColor: "#B07F36", dot: "#C0883A", figure: "12.4M", unit: "rows", pct: "100%", bar: "#DDA653" },
    { label: "CONFORMED", labelColor: "#7C828C", dot: "#9AA0AA", figure: "9.8M", unit: "rows", pct: "75%", bar: "#AFB4C0" },
  ];
  return (
    <div className="flex flex-1 flex-col gap-2 p-3.5">
      {tiers.map((tier) => (
        <div key={tier.label} className="rounded-[10px] border border-[#EAEAEF] bg-white px-3 py-2">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: tier.dot }} />
              <span className="font-mono text-[8.5px] font-bold tracking-[0.07em]" style={{ color: tier.labelColor }}>{tier.label}</span>
            </span>
            <span className="text-[11.5px] font-bold text-ink">
              {tier.figure} <span className="text-[9.5px] font-normal text-tertiary-text">{tier.unit}</span>
            </span>
          </div>
          <div className="mt-2 h-[3px] overflow-hidden rounded-full bg-[#EAEAEF]">
            <div className="h-full rounded-full" style={{ width: tier.pct, background: tier.bar }} />
          </div>
        </div>
      ))}
      <div className="mt-auto rounded-[10px] border-[1.5px] border-blue bg-gradient-to-b from-[#F6F8FF] to-white px-3 py-2 shadow-[0_6px_18px_rgba(62,99,221,0.08)]">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-blue" />
            <span className="font-mono text-[8.5px] font-bold tracking-[0.07em] text-blue">GOVERNED</span>
          </span>
          <span className="text-[11.5px] font-bold text-ink">
            1.2M <span className="text-[9.5px] font-normal text-tertiary-text">entities</span>
          </span>
        </div>
        <div className="mt-1 text-[10.5px] font-semibold text-blue">Query-ready serving layer · 12ms</div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Layer 2: knowledge graph                                           */
/* ------------------------------------------------------------------ */

function KnowledgeGraph() {
  const nodes = [
    { x: 62, y: 34, w: 78, label: "A report" },
    { x: 298, y: 34, w: 78, label: "A model" },
    { x: 62, y: 186, w: 84, label: "Q3 target" },
    { x: 298, y: 186, w: 90, label: "A question" },
  ];
  return (
    <svg viewBox="0 0 360 220" fill="none" className="w-full max-w-[380px]" aria-hidden>
      {nodes.map((n) => (
        <FlowPath key={n.label} d={`M 180 110 L ${n.x} ${n.y}`} />
      ))}
      <circle cx="180" cy="110" r="44" fill="#3E63DD" opacity="0.08" className="animate-[ps-breathe_3.2s_ease-in-out_infinite]" />
      <rect x="115" y="93" width="130" height="34" rx="17" fill="#EEF1FC" stroke="#C8D2F5" strokeWidth="1.2" />
      <text x="180" y="114.5" textAnchor="middle" fontSize="12.5" fontWeight="700" fill="#3E63DD">Region: South</text>
      {nodes.map((n) => (
        <g key={n.label}>
          <rect x={n.x - n.w / 2} y={n.y - 14} width={n.w} height={28} rx={14} fill="#FFFFFF" stroke="#EEEFF1" strokeWidth="1.2" />
          <text x={n.x} y={n.y + 3.5} textAnchor="middle" fontSize="10.5" fill="#5C5E63">{n.label}</text>
        </g>
      ))}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Layer 3 module bodies                                              */
/* ------------------------------------------------------------------ */

function MLBody() {
  return (
    <div className="flex flex-1 flex-col gap-2.5 p-3.5">
      <div className="rounded-[10px] border border-[#EAEAEF] bg-[#FBFBFE] p-3">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[8.5px] font-bold tracking-[0.07em] text-[#7C828C]">Q3 FORECAST</span>
          <span className="font-mono text-[8.5px] text-tertiary-text">weekly</span>
        </div>
        <svg viewBox="0 0 220 72" fill="none" className="mt-1 w-full" aria-hidden>
          <line x1="6" y1="62" x2="214" y2="62" stroke="#EAEAEF" strokeWidth="1" />
          <path d="M6 54 L40 48 L74 52 L108 36 L142 40" stroke="#3E63DD" strokeWidth="2" strokeLinecap="round" className="fl-sparkline" />
          <path d="M142 40 L176 28 L210 20" stroke="#3E63DD" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 5" opacity="0.55" />
          <circle cx="210" cy="20" r="8" fill="#3E63DD" opacity="0.15" className="animate-[ps-pulse_2s_infinite]" />
          <circle cx="210" cy="20" r="3" fill="#3E63DD" />
        </svg>
      </div>
      <div className="mt-auto flex items-center gap-2 rounded-[9px] border border-blue-border bg-blue-subtle px-3 py-2">
        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-blue" />
        <span className="text-[11px] font-semibold text-blue">Trained on governed features</span>
      </div>
    </div>
  );
}

function AskAIBody() {
  return (
    <div className="flex flex-1 flex-col gap-2 p-3.5">
      <div className="ml-auto max-w-[85%] rounded-[12px] rounded-br-[4px] bg-tertiary-bg px-3 py-2 text-[11.5px] font-medium text-ink">
        Why is District 7 behind?
      </div>
      <div className="mr-auto max-w-[92%] rounded-[12px] rounded-bl-[4px] border border-blue-border bg-blue-subtle/60 px-3 py-2">
        <p className="text-[11.5px] leading-relaxed text-ink">
          Enrolments dipped 9% after two camps were rescheduled
          <span className="ml-0.5 font-bold text-blue animate-[ps-caret-blink_1s_step-end_infinite]">|</span>
        </p>
        <div className="mt-1.5 flex flex-wrap gap-1">
          <span className="rounded-[4px] border border-blue-border bg-white px-1.5 py-0.5 font-mono text-[8.5px] text-blue">governed model</span>
          <span className="rounded-[4px] border border-blue-border bg-white px-1.5 py-0.5 font-mono text-[8.5px] text-blue">lineage attached</span>
        </div>
      </div>
      <div className="mt-auto flex items-center gap-2 rounded-[9px] border border-[#CBEFDF] bg-[#EBF8F3] px-3 py-2">
        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#30A46C]" />
        <span className="text-[11px] font-bold text-[#1B7A47]">Same answer, whoever asks</span>
      </div>
    </div>
  );
}

function BIBody() {
  const bars = [42, 68, 52, 84, 62, 90];
  return (
    <div className="flex flex-1 flex-col gap-2.5 p-3.5">
      <div className="rounded-[10px] border border-[#EAEAEF] bg-[#FBFBFE] p-3">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[8.5px] font-bold tracking-[0.07em] text-[#7C828C]">TARGET ATTAINMENT</span>
          <span className="font-mono text-[8.5px] text-tertiary-text">by region</span>
        </div>
        <div className="mt-2 flex h-16 items-end gap-1.5 border-b border-[#EAEAEF] pb-px">
          {bars.map((height, i) => (
            <div
              key={i}
              className="flex-1 origin-bottom rounded-t-[3px] animate-[ps-grow_1.1s_cubic-bezier(0.2,0.8,0.2,1)_both]"
              style={{
                height: `${height}%`,
                background: i === 3 ? "#3E63DD" : "#C8D2F5",
                animationDelay: `${i * 90}ms`,
              }}
            />
          ))}
        </div>
      </div>
      <div className="mt-auto flex items-center gap-2 rounded-[9px] border border-blue-border bg-blue-subtle px-3 py-2">
        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-blue" />
        <span className="text-[11px] font-semibold text-blue">Defined once · consistent everywhere</span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Section                                                            */
/* ------------------------------------------------------------------ */

const sources = [
  { name: "CRMs", dot: "#00A1E0" },
  { name: "ERPs", dot: "#1F2A44" },
  { name: "PDFs", dot: "#E8491D" },
  { name: "Spreadsheets", dot: "#30A46C" },
  { name: "Live feeds", dot: "#3E63DD" },
];

export default function AkashicModules() {
  return (
    <section id="modules" className="scroll-mt-24 border-t border-lineSoft bg-white">
      <div className="rail-container pt-12 pb-24 lg:pt-16 lg:pb-32">
        <ScrollReveal>
          <p className="font-mono text-[11px] uppercase tracking-eyebrow">
            <span className="text-overcast">[02]</span>
            <span className="text-inkSoft">&nbsp;&nbsp;The platform</span>
          </p>
          <h2 className="mt-5 max-w-[13em] text-heading-sm font-semibold text-ink md:text-heading-md lg:text-heading-lg">
            Every module, one foundation.
          </h2>
          <p className="mt-5 max-w-[32em] text-lg leading-relaxed text-secondary-text">
            Three layers. Governance runs underneath all of them, start to finish.
          </p>
        </ScrollReveal>

        <div className="mx-auto mt-14 max-w-[1160px] lg:mt-16">
          <div className="grid gap-x-6 lg:grid-cols-[44px_minmax(0,1fr)]">
            {/* Governance rail — runs down the whole stack */}
            <div className="hidden lg:flex lg:flex-col lg:items-center" aria-hidden>
              <div className="flex h-9 w-9 items-center justify-center rounded-[9px] bg-ink text-white shadow-card">
                <DynamicSketchIcon text="Akashic Data Governance" className="h-4 w-4" />
              </div>
              <div className="relative mt-3 w-px flex-1 bg-gradient-to-b from-line via-overcast/50 to-ink">
                {["18%", "48%", "78%"].map((top) => (
                  <span
                    key={top}
                    className="absolute left-1/2 h-2 w-2 -translate-x-1/2 rounded-full border-2 border-overcast bg-white"
                    style={{ top }}
                  />
                ))}
              </div>
              <div className="h-10 w-px bg-gradient-to-b from-ink/40 to-ink" />
            </div>

            {/* The stack */}
            <div>
              {/* Sources rain in */}
              <ScrollReveal>
                <div className="flex flex-wrap justify-between gap-2">
                  {sources.map((src) => (
                    <span
                      key={src.name}
                      className="inline-flex items-center gap-2 rounded-full border border-subtle-stroke bg-white px-3.5 py-1.5 text-xs font-medium text-ink shadow-card"
                    >
                      <span className="h-1.5 w-1.5 rounded-full animate-[ps-pulse_2.4s_infinite]" style={{ background: src.dot }} />
                      {src.name}
                    </span>
                  ))}
                </div>
                <FanIn />
                <MobileConn />
              </ScrollReveal>

              {/* Layer 1 */}
              <ScrollReveal>
                <LayerShell
                  name="Data Foundation"
                  tagline="Every source, ingested and resolved, before anything gets built on top of it."
                >
                  <div className="grid gap-3 p-3.5 md:grid-cols-3">
                    <div id="data-pipelines" className={`${CARD} scroll-mt-28`}>
                      <CardHeader icon="Akashic Data Pipelines" name="Akashic Pipelines" sub="Real-time ingestion" chip={<LiveChip />} />
                      <CardDesc text="Ingests structured and unstructured data, from CRMs and ERPs to PDFs and live feeds." />
                      <PipelinesBody />
                    </div>
                    <div id="master-data" className={`${CARD} scroll-mt-28`}>
                      <CardHeader icon="Akashic Master Data" name="Akashic Master Data" sub="Entity resolution" chip={<LiveChip label="98% CONF" />} />
                      <CardDesc text="Resolves every version of an entity into one golden record. No duplicates. No conflicting identities." />
                      <MasterDataBody />
                    </div>
                    <div id="data-warehousing" className={`${CARD} scroll-mt-28`}>
                      <CardHeader icon="Akashic Data Warehouse" name="Akashic Warehouse" sub="Query-ready models" chip={<LiveChip label="ACID" />} />
                      <CardDesc text="Structures those records into models built for fast, reliable queries: the base every layer above builds on." />
                      <WarehouseBody />
                    </div>
                  </div>
                </LayerShell>
              </ScrollReveal>

              <MergeDown />
              <MobileConn />

              {/* Layer 2 */}
              <ScrollReveal delay={80}>
                <LayerShell
                  name="Knowledge Foundation"
                  tagline="Context and meaning, built in as data is modelled. Not bolted on after."
                >
                  <div className="grid items-center gap-6 p-5 md:grid-cols-[minmax(0,1fr)_minmax(0,380px)] md:gap-10 md:px-7">
                    <div>
                      <p className="max-w-[36em] text-[15px] leading-relaxed text-inkSoft md:text-base">
                        Every record carries relationships, not just fields. So
                        &ldquo;Region&rdquo; or &ldquo;Customer&rdquo; means the same
                        thing to a report, a model, and a person asking a question
                        about it.
                      </p>
                      <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-blue-border bg-blue-subtle px-3.5 py-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-blue animate-[ps-pulse_2.4s_infinite]" />
                        <span className="text-xs font-semibold text-blue">
                          Not a separate step. It happens as data is modelled and served.
                        </span>
                      </div>
                    </div>
                    <KnowledgeGraph />
                  </div>
                </LayerShell>
              </ScrollReveal>

              <SplitDown />
              <MobileConn />

              {/* Layer 3 */}
              <ScrollReveal delay={80}>
                <LayerShell
                  name="AI & Decision Intelligence"
                  tagline="Where the governed model becomes an answer someone can act on."
                >
                  <div className="grid gap-3 p-3.5 md:grid-cols-3">
                    <div id="machine-learning" className={`${CARD} scroll-mt-28`}>
                      <CardHeader icon="Akashic Machine Learning" name="Akashic ML" sub="Predictive models" chip={<BlueChip label="DEPLOYED" />} />
                      <CardDesc text="Build, train, and monitor predictive models directly on governed data." />
                      <MLBody />
                    </div>
                    <div id="ask-ai" className={`${CARD} scroll-mt-28`}>
                      <CardHeader icon="Akashic Insights" name="Ask Akashic" sub="Plain-language answers" chip={<BlueChip label="GROUNDED" />} />
                      <CardDesc text="Ask in plain language. Get an answer grounded in the same governed model everyone else sees." />
                      <AskAIBody />
                    </div>
                    <div id="business-intelligence" className={`${CARD} scroll-mt-28`}>
                      <CardHeader icon="Akashic BI" name="Akashic BI" sub="Live dashboards" chip={<LiveChip label="REAL-TIME" />} />
                      <CardDesc text="Dashboards and metrics that reach the person accountable, not just sit in a report." />
                      <BIBody />
                    </div>
                  </div>
                </LayerShell>
              </ScrollReveal>
            </div>

            {/* Governance: the floor everything stands on */}
            <ScrollReveal delay={120} className="lg:col-span-2">
              <div
                id="governance"
                className="fl-sheen relative mt-6 scroll-mt-28 overflow-hidden rounded-frame bg-ink p-6 text-white md:p-8"
              >
                <div className="h-[3px] absolute inset-x-0 top-0 bg-gradient-to-r from-blue/70 via-blue/30 to-transparent" aria-hidden />
                <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-[13px] font-medium text-white/50">
                      Akashic Governance, running underneath all three
                    </p>
                    <h3 className="mt-3 max-w-[24em] text-xl font-semibold tracking-tight md:text-2xl">
                      From the first byte to the final answer.
                    </h3>
                    <p className="mt-3 max-w-[36em] text-sm leading-relaxed text-white/60 md:text-base">
                      Applied at every layer above. Not a feature added later. The
                      floor everything else stands on.
                    </p>
                  </div>
                  <div className="flex shrink-0 flex-col gap-2.5">
                    {["Access control", "Lineage", "Audit trail"].map((item, i) => (
                      <div key={item} className="flex items-center gap-2.5 rounded-[10px] border border-white/[0.12] bg-white/[0.06] px-3.5 py-2">
                        <span
                          className="h-1.5 w-1.5 rounded-full bg-blue-border animate-[ps-pulse_2.4s_infinite]"
                          style={{ animationDelay: `${i * 400}ms` }}
                        />
                        <span className="text-xs font-medium text-white/80">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
