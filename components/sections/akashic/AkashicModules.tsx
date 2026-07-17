/*
 * [04] The architecture — the platform on one schematic.
 * Rebuilt (Jul 2026, user direction) as a top-to-bottom elevation drawing,
 * benchmarked against how 2026 platform sites draw architecture (Fabric /
 * Snowflake / Databricks): full-width layer STRATA stacked in flow order,
 * governance drawn as a spanning plane rather than a detached box. The old
 * five-column circuit read bland, truncated its copy, and hid the very
 * thing it existed to show (three layers, seven modules).
 *
 * Flow: IN sources stratum → LAYER 01 Data (Pipelines / Master Data /
 * Warehouse) → LAYER 02 Knowledge (no modules: built by Master Data, viz +
 * capability lines) → LAYER 03 Intelligence (ML / Ask Akashic / BI) → OUT
 * decision bar. Static three-lane lineage beams (BeamTriple / BeamMerge)
 * connect the strata on the shared BAND_GRID template so lanes track the
 * tile columns. The signature device is the GOVERNANCE BRACKET: a vertical
 * "Governed · end to end" rail down the left of every stratum that turns
 * into the full-width Akashic Governance floor card (module 07).
 *
 * Content contract: module tiles carry HIGH-LEVEL CAPABILITY LISTS (four
 * TERSE NOUN PHRASES each, in a 2×2 grid — full sentences read wordy and
 * made the section scroll, user feedback Jul 2026) summarising [08]'s
 * datasheet — ready-made connectors, CDC, OCR, fuzzy matching, BYOK —
 * without vendor or technology names ([08] stays the only place
 * technology is named; keep the two in sync). Dot list markers, never
 * checkmarks (Rule 2). NOTHING TRUNCATES: the old `truncate` subs/metas
 * cut copy mid-word and triggered this rebuild. Vertical rhythm is
 * deliberately tight so the schematic reads as ONE DRAWING, not a scroll.
 * Still no worked examples (§8a; decoupled from [01]'s story), and
 * on-screen copy says "knowledge layer", never "knowledge graph" (user
 * direction, Jul 2026). Nav anchor ids kept (#modules-data-pipelines …
 * #modules-governance).
 *
 * Chrome: SINGLE-ELEVATION. Each stratum and the governance floor is a
 * white card carrying the section's only shadow-card; everything inside is
 * flat — panel-tinted tiles with hairline (card-divide) borders at most.
 * No longer constrained to one desktop fold: capability content earns the
 * height.
 */

import ScrollReveal from "@/components/ui/ScrollReveal";
import DynamicSketchIcon from "@/components/icons/DynamicSketchIcon";
import { FlowPath, Node, MobileConn, LANES } from "@/components/demos/AkashicFlowConnectors";
import { BlueChip, Capillary } from "@/components/sections/akashic/AkashicCardChrome";

/* One grid template for every stratum interior and the beams between
   them, so the three beam lanes always track the tile columns. */
const BAND_GRID = "lg:grid-cols-[210px_minmax(0,1fr)]";

/* ------------------------------------------------------------------ */
/*  Connectors: three-lane beams between strata + the governance rail   */
/* ------------------------------------------------------------------ */

function BeamTriple() {
  return (
    <div className={`hidden lg:grid ${BAND_GRID}`} aria-hidden>
      <div />
      <svg viewBox="0 0 1000 28" className="h-7 w-full" preserveAspectRatio="none" fill="none" style={{ overflow: "visible" }}>
        {LANES.map((x) => (
          <FlowPath key={x} d={`M ${x} 0 L ${x} 28`} />
        ))}
        {LANES.map((x) => (
          <Node key={`t${x}`} x={x} y={0} />
        ))}
        {LANES.map((x) => (
          <Node key={`b${x}`} x={x} y={28} />
        ))}
      </svg>
    </div>
  );
}

/* Three lanes converge into one: the platform's many paths end in one
   answer. Sits between Layer 03 and the decision bar. */
function BeamMerge() {
  return (
    <div className={`hidden lg:grid ${BAND_GRID}`} aria-hidden>
      <div />
      <svg viewBox="0 0 1000 40" className="h-10 w-full" preserveAspectRatio="none" fill="none" style={{ overflow: "visible" }}>
        {LANES.map((x) => (
          <FlowPath key={x} d={`M ${x} 0 C ${x} 22, 500 18, 500 40`} />
        ))}
        {LANES.map((x) => (
          <Node key={`s${x}`} x={x} y={0} />
        ))}
        <Node x={500} y={40} />
      </svg>
    </div>
  );
}

/* The left arm of the governance bracket: one continuous rail spanning
   every stratum, labelled in the middle, closing into the floor card. */
function GovRail() {
  return (
    <div className="relative hidden lg:block" aria-hidden>
      <span className="absolute inset-y-1 left-1/2 w-[3px] -translate-x-1/2 rounded-full bg-blue-border/50" />
      <span className="absolute inset-y-1 left-1/2 w-px -translate-x-1/2 bg-blue/[0.65]" />
      <span className="absolute left-1/2 top-0 h-[9px] w-[9px] -translate-x-1/2 rounded-full border-[1.4px] border-blue/70 bg-white" />
      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-card-line bg-white px-[3px] py-3 font-mono text-[9.5px] font-semibold uppercase tracking-eyebrow text-secondary-text [writing-mode:vertical-rl]">
        Governed · end to end
      </span>
    </div>
  );
}

/* The bracket's elbow: carries the rail past the decision bar into the
   governance floor. */
function GovJunction() {
  return (
    <div className="relative hidden h-4 lg:block" aria-hidden>
      <span className="absolute inset-y-0 left-[22px] w-[3px] -translate-x-1/2 rounded-full bg-blue-border/50" />
      <span className="absolute inset-y-0 left-[22px] w-px -translate-x-1/2 bg-blue/[0.65]" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Stratum shell: white card + shared left-spine grammar               */
/* ------------------------------------------------------------------ */

function Stratum({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-outer border border-card-line bg-white shadow-card">
      <Capillary />
      <div className={`grid ${BAND_GRID}`}>{children}</div>
    </div>
  );
}

function Spine({
  index,
  name,
  tagline,
  footer,
  watermark,
}: {
  index: string;
  name: string;
  tagline: string;
  footer?: string;
  watermark?: string;
}) {
  return (
    <div className="relative flex flex-col border-b border-card-divide px-4 py-3.5 lg:border-b-0 lg:border-r lg:px-5">
      {watermark && (
        <span className="pointer-events-none absolute right-3 top-2 font-mono text-[36px] font-bold leading-none text-blue/[0.08]" aria-hidden>
          {watermark}
        </span>
      )}
      <p className="font-mono text-[9.5px] font-bold uppercase tracking-eyebrow text-secondary-text">{index}</p>
      <h3 className="mt-1 text-[16px] font-semibold tracking-tight text-ink">{name}</h3>
      <p className="mt-0.5 max-w-[24em] text-[12.5px] leading-snug text-inkSoft lg:max-w-none">{tagline}</p>
      {footer && (
        <div className="mt-2.5 flex items-center gap-2 lg:mt-auto lg:pt-2.5">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-blue" aria-hidden />
          <span className="text-[11.5px] font-semibold text-blue">{footer}</span>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Module tile: name, job, and a high-level capability list            */
/* ------------------------------------------------------------------ */

function ModuleTile({
  id,
  icon,
  name,
  sub,
  caps,
}: {
  id: string;
  icon: string;
  name: string;
  sub: string;
  caps: string[];
}) {
  return (
    <div id={id} className="flex min-w-0 scroll-mt-28 flex-col rounded-inner border border-card-divide bg-panel p-3">
      <div className="flex items-center gap-2.5">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-tile bg-blue-subtle text-blue">
          <DynamicSketchIcon text={icon} className="h-4 w-4" />
        </span>
        <span className="text-[13.5px] font-semibold tracking-tight text-ink">{name}</span>
      </div>
      <p className="mt-1.5 text-[11.5px] leading-snug text-inkSoft">{sub}</p>
      <ul className="mt-2.5 grid grid-cols-2 gap-x-3 gap-y-1 border-t border-card-divide pt-2.5">
        {caps.map((cap) => (
          <li key={cap} className="flex items-start gap-1.5">
            <span className="mt-[5px] h-[5px] w-[5px] shrink-0 rounded-full bg-blue/70" aria-hidden />
            <span className="text-[11px] font-medium leading-snug text-secondary-text">{cap}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Knowledge layer viz — generic relationship types, not named          */
/*  entities (§8a: what the layer holds, without a worked example)       */
/* ------------------------------------------------------------------ */

function KnowledgeViz() {
  const nodes = [
    { x: 108, y: 34, w: 118, label: "Related records", edge: "linked to", ex: 208, ey: 48 },
    { x: 108, y: 116, w: 96, label: "Its history", edge: "traced through", ex: 200, ey: 108 },
    { x: 532, y: 34, w: 104, label: "Its category", edge: "classified as", ex: 434, ey: 48 },
    { x: 532, y: 116, w: 86, label: "A policy", edge: "governed by", ex: 438, ey: 108 },
  ];
  return (
    <svg viewBox="0 0 640 150" fill="none" className="mx-auto w-full max-w-[500px]" aria-hidden>
      {nodes.map((n) => (
        <FlowPath key={n.label} d={`M 320 75 L ${n.x} ${n.y}`} />
      ))}
      <circle cx="320" cy="75" r="40" fill="#3E63DD" opacity="0.08" />
      <rect x="262" y="59" width="116" height="32" rx="16" fill="#EEF1FC" stroke="#C8D2F5" strokeWidth="1.2" />
      <text x="320" y="79.5" textAnchor="middle" fontSize="12" fontWeight="700" fill="#3E63DD">Any record</text>
      {nodes.map((n) => (
        <g key={n.label}>
          <text
            x={n.ex}
            y={n.ey}
            textAnchor="middle"
            fontSize="9.5"
            fill="#5C5E63"
            stroke="#F7F8FB"
            strokeWidth="5"
            paintOrder="stroke"
            fontFamily="'Google Sans Mono', monospace"
          >
            {n.edge}
          </text>
          <rect x={n.x - n.w / 2} y={n.y - 14} width={n.w} height={28} rx={14} fill="#FFFFFF" stroke="#D9DEE8" strokeWidth="1.2" />
          <text x={n.x} y={n.y + 3.5} textAnchor="middle" fontSize="10.5" fontWeight="500" fill="#1A1C1D">{n.label}</text>
        </g>
      ))}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Content                                                             */
/* ------------------------------------------------------------------ */

const sourceGroups = [
  {
    heading: "Business systems",
    items: [
      { name: "CRM", dot: "#00A1E0" },
      { name: "ERP", dot: "#1F2A44" },
    ],
  },
  {
    heading: "Databases",
    items: [
      { name: "SQL", dot: "#3E63DD" },
      { name: "NoSQL", dot: "#7C5CFC" },
    ],
  },
  {
    heading: "Files",
    items: [
      { name: "PDFs", dot: "#E8491D" },
      { name: "Spreadsheets", dot: "#30A46C" },
    ],
  },
  {
    heading: "Streaming & IoT",
    items: [
      { name: "Events", dot: "#D97706" },
      { name: "Sensors", dot: "#0891B2" },
    ],
  },
];

/* High-level summaries of [08]'s datasheet — terse noun phrases only
   (user direction, Jul 2026: full sentences read wordy here), and no
   vendor or technology names ([08] is the only place technology is
   named). */
const dataLayerModules = [
  {
    id: "modules-data-pipelines",
    icon: "Akashic Data Pipelines",
    name: "Akashic Pipelines",
    sub: "Ingest and validate every source",
    caps: ["Ready-made connectors", "Streaming · batch · CDC", "PDF, email & OCR intake", "Schema validation"],
  },
  {
    id: "modules-master-data",
    icon: "Akashic Master Data",
    name: "Akashic Master Data",
    sub: "Resolve every entity to one golden record",
    caps: ["Exact + fuzzy matching", "Survivorship rules", "Steward review queue", "Hierarchy management"],
  },
  {
    id: "modules-data-warehousing",
    icon: "Akashic Data Warehouse",
    name: "Akashic Warehouse",
    sub: "Model data and define metrics once",
    caps: ["Dimensional models", "Governed metric layer", "Your warehouse or ours", "Sub-second queries"],
  },
];

const intelligenceLayerModules = [
  {
    id: "modules-machine-learning",
    icon: "Akashic Machine Learning",
    name: "Akashic ML",
    sub: "Train, deploy and monitor models",
    caps: ["Notebooks & experiments", "Feature store", "Staged deployment", "Drift & bias monitoring"],
  },
  {
    id: "modules-ask-ai",
    icon: "Akashic Insights",
    name: "Ask Akashic",
    sub: "Answer questions in plain language",
    caps: ["Grounded & cited", "Bring your own model", "PII masking", "Prompt audit log"],
  },
  {
    id: "modules-business-intelligence",
    icon: "Akashic BI",
    name: "Akashic BI",
    sub: "Serve metrics to every surface",
    caps: ["Dashboards & drill-down", "Alerts & reports", "Row-level security", "Embedded analytics"],
  },
];

const knowledgeCaps = [
  "Entities & hierarchies",
  "Category · history · policy",
  "Context for every answer",
];

const govTiles = [
  { label: "Access control", detail: "row + column · query time" },
  { label: "Lineage", detail: "column-level, across sources" },
  { label: "Audit trail", detail: "append-only, every action" },
  { label: "Data residency", detail: "in-region, zero egress" },
];

/* ------------------------------------------------------------------ */
/*  Section                                                             */
/* ------------------------------------------------------------------ */

export default function AkashicModules() {
  return (
    <section id="modules" className="scroll-mt-24 border-t border-lineSoft bg-primary-bg">
      <div className="rail-container pt-12 pb-24 lg:pt-16 lg:pb-32">
        <ScrollReveal>
          <p className="font-mono text-[11px] uppercase tracking-eyebrow">
            <span className="text-overcast">[04]</span>
            <span className="text-inkSoft">&nbsp;&nbsp;The architecture</span>
          </p>
          <h2 className="mt-5 text-balance text-heading-sm font-semibold text-ink md:text-heading-md">
            Seven modules. Three layers. One platform.
          </h2>
          <p className="mt-5 max-w-[36em] text-lg leading-relaxed text-secondary-text">
            Sources in at the top, a decision out at the bottom, governance under
            every layer. What each module does and the capabilities it ships with,
            on one page.
          </p>
        </ScrollReveal>

        <div className="mt-8 lg:mt-10">
          <div className="lg:grid lg:grid-cols-[44px_minmax(0,1fr)] lg:gap-x-4">
            <GovRail />

            <div className="flex flex-col gap-3 lg:gap-0">
              {/* IN: the sources stratum */}
              <ScrollReveal>
                <Stratum>
                  <Spine index="In" name="Your sources" tagline="Structured, unstructured and streaming, side by side." />
                  <div className="flex flex-wrap items-center gap-x-7 gap-y-3 px-4 py-3 lg:px-5">
                    {sourceGroups.map((group) => (
                      <div key={group.heading} className="flex flex-col gap-1.5">
                        <p className="font-mono text-[9.5px] font-semibold uppercase tracking-[0.1em] text-secondary-text">{group.heading}</p>
                        <div className="flex flex-wrap gap-1.5">
                          {group.items.map((src) => (
                            <span
                              key={src.name}
                              className="inline-flex items-center gap-2 rounded-full border border-card-divide bg-panel px-3 py-1 text-[11.5px] font-medium text-ink"
                            >
                              <span className="h-1.5 w-1.5 rounded-full" style={{ background: src.dot }} aria-hidden />
                              {src.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </Stratum>
              </ScrollReveal>

              <BeamTriple />
              <MobileConn />

              {/* LAYER 01: Data */}
              <ScrollReveal delay={90}>
                <Stratum>
                  <Spine
                    index="Layer 01"
                    name="Data Layer"
                    tagline="Every source ingested, resolved and modelled."
                    footer="Validated · resolved · query-ready"
                    watermark="01"
                  />
                  <div className="grid gap-2 p-2.5 sm:grid-cols-2 lg:grid-cols-3 lg:p-3">
                    {dataLayerModules.map((mod) => (
                      <ModuleTile key={mod.id} {...mod} />
                    ))}
                  </div>
                </Stratum>
              </ScrollReveal>

              <BeamTriple />
              <MobileConn />

              {/* LAYER 02: Knowledge (no modules — built by Master Data) */}
              <ScrollReveal delay={160}>
                <Stratum>
                  <Spine
                    index="Layer 02"
                    name="Knowledge Layer"
                    tagline="Built by Master Data: every record linked to its context."
                    footer="One meaning, everywhere it&rsquo;s used"
                    watermark="02"
                  />
                  <div className="grid items-center gap-3 p-2.5 lg:p-3 xl:grid-cols-[minmax(0,1fr)_240px]">
                    <div className="rounded-inner border border-card-divide bg-panel px-3 py-2">
                      <KnowledgeViz />
                    </div>
                    <ul className="flex flex-col gap-2 px-1 xl:px-0">
                      {knowledgeCaps.map((cap) => (
                        <li key={cap} className="flex items-start gap-2">
                          <span className="mt-[5px] h-[5px] w-[5px] shrink-0 rounded-full bg-blue/70" aria-hidden />
                          <span className="text-[11.5px] font-medium leading-snug text-secondary-text">{cap}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Stratum>
              </ScrollReveal>

              <BeamTriple />
              <MobileConn />

              {/* LAYER 03: Intelligence */}
              <ScrollReveal delay={230}>
                <Stratum>
                  <Spine
                    index="Layer 03"
                    name="Intelligence Layer"
                    tagline="Governed data becomes predictions, answers and dashboards."
                    footer="Every answer carries its lineage"
                    watermark="03"
                  />
                  <div className="grid gap-2 p-2.5 sm:grid-cols-2 lg:grid-cols-3 lg:p-3">
                    {intelligenceLayerModules.map((mod) => (
                      <ModuleTile key={mod.id} {...mod} />
                    ))}
                  </div>
                </Stratum>
              </ScrollReveal>

              <BeamMerge />
              <MobileConn />

              {/* OUT: the decision bar */}
              <ScrollReveal delay={300}>
                <Stratum>
                  <Spine index="Out" name="Your decision" tagline="Trusted, traced, acted on." />
                  <div className="flex flex-col gap-3 px-4 py-3.5 lg:flex-row lg:items-center lg:justify-between lg:gap-6 lg:px-5">
                    <div>
                      <p className="text-[15px] font-semibold leading-snug tracking-tight text-ink">
                        Ask anything. One grounded answer, every time.
                      </p>
                      <p className="mt-1 text-[11.5px] leading-snug text-inkSoft">
                        Backed by the governed metric layer and the knowledge layer, with
                        citations. Every line traced to its source.
                      </p>
                    </div>
                    <BlueChip label="GROUNDED" />
                  </div>
                </Stratum>
              </ScrollReveal>
            </div>
          </div>

          {/* The bracket closes: governance floor under everything */}
          <ScrollReveal delay={120}>
            <GovJunction />
            <div id="modules-governance" className="mt-3 scroll-mt-28 overflow-hidden rounded-outer border border-card-line bg-white shadow-card lg:mt-0">
              <div className="h-[3px] bg-gradient-to-r from-ink/60 via-ink/25 to-transparent" aria-hidden />
              <div className="flex flex-col gap-4 px-4 py-4 lg:flex-row lg:items-center lg:gap-6 lg:px-5">
                <div className="flex items-center gap-3.5 lg:min-w-[300px]">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-tile bg-ink text-white">
                    <DynamicSketchIcon text="Akashic Data Governance" className="h-[18px] w-[18px]" />
                  </span>
                  <div>
                    <h3 className="text-[16px] font-semibold tracking-tight text-ink">
                      Akashic Governance
                      <span className="ml-2 font-normal text-inkSoft">· the floor under every layer</span>
                    </h3>
                    <p className="mt-0.5 text-[13px] leading-snug text-inkSoft">
                      Applied to every module, from the first byte to the final answer.
                    </p>
                  </div>
                </div>
                <div className="grid flex-1 gap-2.5 sm:grid-cols-2 xl:grid-cols-4">
                  {govTiles.map((tile) => (
                    <div key={tile.label} className="flex flex-col gap-0.5 rounded-inner border border-card-divide bg-panel px-3.5 py-2">
                      <span className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-blue" aria-hidden />
                        <span className="text-[12.5px] font-medium text-ink">{tile.label}</span>
                      </span>
                      <span className="pl-3.5 font-mono text-[9.5px] font-semibold text-secondary-text">{tile.detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
