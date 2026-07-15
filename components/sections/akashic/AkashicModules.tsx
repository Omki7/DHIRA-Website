/*
 * [04] Inside the Platform — the anatomy, one screen.
 * The assembly drawing after the [02] teardown: a complete circuit that
 * fills one desktop fold. Sources rail (four categories: business
 * systems, databases, files, streaming & IoT — covering structured,
 * unstructured, and streaming data) → three stage-numbered layer columns
 * → a "Your decision" rail that closes the flow. Every module shows its
 * CAPABILITY, not a worked example (SIMULATED PRODUCT UI, §8a — but
 * deliberately decoupled from [01]'s South-region story, per user
 * direction Jul 2026, so this section reads as a spec sheet, not a
 * narrative): Pipelines shows real-time + batch and structured +
 * unstructured; Master Data shows deduplication and hierarchy
 * management; Warehouse shows query-ready, sub-second reads; the
 * knowledge graph shows generic relationship types (linked to /
 * classified as / traced through / governed by), not named entities;
 * ML shows trend + forecast; Ask Akashic shows grounded, cited answers;
 * BI shows self-refreshing dashboards. Governance drop-ties run from
 * each layer column into the full-width governance floor bar, whose
 * tiles describe governance capabilities generically (enforced on every
 * request / every step recorded / every action logged); the ties reuse
 * the section grid template so they stay aligned at any width. Module
 * rows keep the nav anchor ids (#modules-data-pipelines …
 * #modules-governance). Mobile stacks the columns vertically with
 * MobileConn joints.
 */

import ScrollReveal from "@/components/ui/ScrollReveal";
import DynamicSketchIcon from "@/components/icons/DynamicSketchIcon";
import { FlowPath, Node, MobileConn } from "@/components/demos/AkashicFlowConnectors";
import { BlueChip } from "@/components/sections/akashic/AkashicCardChrome";

/* One grid template for the flow row and the governance ties, so the
   drop-ties always sit under their layer columns. */
const FLOW_GRID =
  "lg:grid-cols-[150px_26px_minmax(0,1fr)_26px_minmax(0,1fr)_26px_minmax(0,1fr)_26px_160px]";

/* ------------------------------------------------------------------ */
/*  Connectors                                                         */
/* ------------------------------------------------------------------ */

/* Horizontal flow joint between columns (lg+). */
function HFlow() {
  return (
    <div className="hidden w-full lg:block" aria-hidden>
      <svg viewBox="0 0 26 12" className="h-3 w-full" preserveAspectRatio="none" fill="none" style={{ overflow: "visible" }}>
        <FlowPath d="M 1 6 L 25 6" />
        <Node x={1} y={6} />
        <Node x={25} y={6} />
      </svg>
    </div>
  );
}

function Joint() {
  return (
    <div aria-hidden className="lg:flex lg:h-full lg:items-center">
      <HFlow />
      <MobileConn />
    </div>
  );
}

/* Vertical drop-tie from a layer column into the governance floor (lg+). */
function GovTie() {
  return (
    <svg
      width="12"
      height="28"
      viewBox="0 0 12 28"
      className="mx-auto"
      fill="none"
      style={{ overflow: "visible" }}
      aria-hidden
    >
      <FlowPath d="M 6 0 L 6 28" />
      <Node x={6} y={0} />
      <Node x={6} y={28} />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Layer column shell + module rows                                   */
/* ------------------------------------------------------------------ */

function LayerCol({
  stage,
  name,
  tagline,
  footer,
  children,
}: {
  stage: string;
  name: string;
  tagline: string;
  footer: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-frame border border-[#E3E7F0] bg-primary-bg">
      <div className="h-[3px] bg-gradient-to-r from-blue/50 via-blue/25 to-transparent" aria-hidden />
      <div className="flex items-start justify-between gap-2 border-b border-[#EBEEF4] bg-white px-4 py-3.5">
        <div>
          <h3 className="text-[16px] font-semibold tracking-tight text-ink">{name}</h3>
          <p className="mt-0.5 text-[12.5px] leading-snug text-inkSoft">{tagline}</p>
        </div>
        <span className="pt-0.5 font-mono text-[9.5px] font-bold tracking-eyebrow text-overcast">{stage}</span>
      </div>
      <div className="flex flex-1 flex-col gap-2.5 p-3.5">{children}</div>
      <div className="flex items-center gap-2 border-t border-[#EBEEF4] bg-white/70 px-4 py-3">
        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-blue animate-[ps-pulse_2.4s_infinite]" aria-hidden />
        <span className="text-[11.5px] font-semibold text-blue">{footer}</span>
      </div>
    </div>
  );
}

function ModuleRow({
  id,
  icon,
  name,
  sub,
  meta,
  viz,
}: {
  id: string;
  icon: string;
  name: string;
  sub: string;
  meta: string;
  viz: React.ReactNode;
}) {
  return (
    <div id={id} className="flex flex-1 scroll-mt-28 items-center gap-3 rounded-[10px] border border-[#E3E7F0] bg-white px-3.5 py-3 shadow-card">
      <span className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-[8px] border border-blue-border bg-blue-subtle text-blue">
        <DynamicSketchIcon text={icon} className="h-4 w-4" />
      </span>
      <div className="min-w-0 flex-1">
        <div className="truncate text-[13px] font-semibold tracking-tight text-ink">{name}</div>
        <div className="truncate text-[11px] text-tertiary-text">{sub}</div>
        <div className="mt-1 truncate font-mono text-[9px] text-overcast">{meta}</div>
      </div>
      <div className="shrink-0">{viz}</div>
    </div>
  );
}

/* Two stacked capability chips — the shared shape for showing a module's
   range (speed, format, method) without a worked example. */
function CapChips({ items }: { items: string[] }) {
  return (
    <div className="flex flex-col items-end gap-1">
      {items.map((label) => (
        <span
          key={label}
          className="whitespace-nowrap rounded-[5px] border border-blue-border bg-blue-subtle px-1.5 py-0.5 font-mono text-[8px] font-semibold uppercase tracking-[0.04em] text-blue"
        >
          {label}
        </span>
      ))}
    </div>
  );
}

/* Per-module capability signatures (simulated UI, §8a — generic
   capability markers, not a worked example). */

function PipelinesViz() {
  return <CapChips items={["Structured", "Unstructured"]} />;
}

function MasterDataViz() {
  return <CapChips items={["Deduplication", "Hierarchy"]} />;
}

function WarehouseViz() {
  return <CapChips items={["Query-ready", "Sub-second"]} />;
}

function MLViz() {
  return (
    <div className="flex flex-col items-end gap-0.5">
      <svg viewBox="0 0 64 20" className="h-4 w-14" fill="none" aria-hidden>
        <path d="M2 16 L14 13.5 L26 14.5 L38 8" stroke="#3E63DD" strokeWidth="1.8" strokeLinecap="round" className="fl-sparkline" />
        <path d="M38 8 L50 5 L60 3" stroke="#3E63DD" strokeWidth="1.8" strokeLinecap="round" strokeDasharray="3 4" opacity="0.55" />
        <circle cx="60" cy="3" r="2.4" fill="#3E63DD" />
      </svg>
      <span className="font-mono text-[8.5px] text-inkSoft">trend + forecast</span>
    </div>
  );
}

function AskAIViz() {
  return <BlueChip label="GROUNDED" />;
}

function BIViz() {
  const bars = [55, 70, 60, 80, 68];
  return (
    <div className="flex flex-col items-end gap-0.5">
      <div className="flex h-5 w-14 items-end gap-1" aria-hidden>
        {bars.map((h, i) => (
          <span
            key={i}
            className="flex-1 origin-bottom rounded-t-[2px] animate-[ps-grow_1.1s_cubic-bezier(0.2,0.8,0.2,1)_both]"
            style={{ height: `${h}%`, background: i === bars.length - 1 ? "#3E63DD" : "#C8D2F5", animationDelay: `${i * 90}ms` }}
          />
        ))}
      </div>
      <span className="font-mono text-[8.5px] font-semibold text-blue">auto-refresh</span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Knowledge graph — generic relationship types, not named entities    */
/*  (what a knowledge graph holds, without a worked example)            */
/* ------------------------------------------------------------------ */

function KnowledgeGraph() {
  const nodes = [
    { x: 68, y: 36, w: 118, label: "Related records", edge: "linked to", ex: 130, ey: 76 },
    { x: 292, y: 36, w: 100, label: "Its category", edge: "classified as", ex: 240, ey: 76 },
    { x: 68, y: 204, w: 90, label: "Its history", edge: "traced through", ex: 116, ey: 170 },
    { x: 292, y: 204, w: 84, label: "A policy", edge: "governed by", ex: 242, ey: 170 },
  ];
  return (
    <svg viewBox="0 0 360 240" fill="none" className="mx-auto w-full max-w-[360px]" aria-hidden>
      {nodes.map((n) => (
        <FlowPath key={n.label} d={`M 180 120 L ${n.x} ${n.y}`} />
      ))}
      <circle cx="180" cy="120" r="46" fill="#3E63DD" opacity="0.08" className="animate-[ps-breathe_3.2s_ease-in-out_infinite]" />
      <rect x="122" y="104" width="116" height="32" rx="16" fill="#EEF1FC" stroke="#C8D2F5" strokeWidth="1.2" />
      <text x="180" y="124.5" textAnchor="middle" fontSize="12" fontWeight="700" fill="#3E63DD">Any record</text>
      {nodes.map((n) => (
        <g key={n.label}>
          <text
            x={n.ex}
            y={n.ey}
            textAnchor="middle"
            fontSize="9"
            fill="#64748B"
            stroke="#FFFFFF"
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
/*  Section                                                            */
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

const govTiles = [
  { label: "Access control", detail: "enforced on every request" },
  { label: "Lineage", detail: "every step recorded" },
  { label: "Audit trail", detail: "every action logged" },
  { label: "Data residency", detail: "enforced in your region" },
];

export default function AkashicModules() {
  return (
    <section id="modules" className="scroll-mt-24 border-t border-lineSoft bg-primary-bg">
      <div className="rail-container pt-10 pb-14 lg:flex lg:min-h-screen lg:flex-col lg:justify-center lg:pt-12 lg:pb-16">
        <ScrollReveal>
          <p className="font-mono text-[11px] uppercase tracking-eyebrow">
            <span className="text-overcast">[04]</span>
            <span className="text-inkSoft">&nbsp;&nbsp;How it composes</span>
          </p>
          <h2 className="mt-5 text-heading-sm font-semibold text-ink md:text-heading-md">
            Seven modules. Three layers. One circuit.
          </h2>
          <p className="mt-5 max-w-[36em] text-lg leading-relaxed text-secondary-text">
            Sources in on one side. A decision out the other. Governance underneath,
            start to finish. Not seven tools wired together: one platform, already
            assembled.
          </p>
        </ScrollReveal>

        <div className="mt-8 lg:mt-12">
          <ScrollReveal>
            <div className={`grid gap-3 lg:min-h-[480px] lg:gap-0 ${FLOW_GRID}`}>
              {/* Sources, grouped by kind (structured, unstructured, streaming) */}
              <div className="flex flex-col gap-3">
                <p className="font-mono text-[9.5px] uppercase tracking-eyebrow text-inkSoft">Your sources</p>
                {sourceGroups.map((group) => (
                  <div key={group.heading} className="flex flex-col gap-1.5">
                    <p className="font-mono text-[8.5px] uppercase tracking-[0.1em] text-overcast">{group.heading}</p>
                    <div className="flex flex-row flex-wrap gap-1.5 lg:flex-col">
                      {group.items.map((src) => (
                        <span
                          key={src.name}
                          className="inline-flex items-center gap-2 rounded-full border border-[#E3E7F0] bg-white px-3 py-1.5 text-[11.5px] font-medium text-ink shadow-card"
                        >
                          <span className="h-1.5 w-1.5 rounded-full animate-[ps-pulse_2.4s_infinite]" style={{ background: src.dot }} />
                          {src.name}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
                <p className="mt-auto hidden pt-2 font-mono text-[9px] leading-relaxed text-overcast lg:block">
                  STRUCTURED · UNSTRUCTURED · STREAMING
                </p>
              </div>

              <Joint />

              {/* Layer 1 */}
              <LayerCol
                stage="01"
                name="Data Layer"
                tagline="Connected. Every source ingested, resolved, and modelled."
                footer="Validated · resolved · query-ready"
              >
                <ModuleRow id="modules-data-pipelines" icon="Akashic Data Pipelines" name="Akashic Pipelines" sub="Everything arrives here" meta="streaming · batch · CDC" viz={<PipelinesViz />} />
                <ModuleRow id="modules-master-data" icon="Akashic Master Data" name="Akashic Master Data" sub="Duplicates collapse here" meta="match + merge logic" viz={<MasterDataViz />} />
                <ModuleRow id="modules-data-warehousing" icon="Akashic Data Warehouse" name="Akashic Warehouse" sub="Metrics are defined here" meta="dimensional models" viz={<WarehouseViz />} />
              </LayerCol>

              <Joint />

              {/* Layer 2 */}
              <LayerCol
                stage="02"
                name="Knowledge Layer"
                tagline="Understood. Master Data links each record to its context."
                footer="Same meaning for reports, models, and questions"
              >
                <div className="flex flex-1 items-center rounded-[10px] border border-[#E3E7F0] bg-white px-2 py-3 shadow-card">
                  <KnowledgeGraph />
                </div>
              </LayerCol>

              <Joint />

              {/* Layer 3 */}
              <LayerCol
                stage="03"
                name="Intelligence Layer"
                tagline="Reasoned. Answered. Where a model becomes something you can act on."
                footer="Every answer carries its lineage"
              >
                <ModuleRow id="modules-machine-learning" icon="Akashic Machine Learning" name="Akashic ML" sub="Patterns surface here" meta="forecasting · anomalies" viz={<MLViz />} />
                <ModuleRow id="modules-ask-ai" icon="Akashic Insights" name="Ask Akashic" sub="Questions land here" meta="every answer cited" viz={<AskAIViz />} />
                <ModuleRow id="modules-business-intelligence" icon="Akashic BI" name="Akashic BI" sub="Metrics are read here" meta="self-refreshing" viz={<BIViz />} />
              </LayerCol>

              <Joint />

              {/* Out: the decision (capability, not a worked example, §8a) */}
              <div className="flex flex-col gap-2">
                <p className="font-mono text-[9.5px] uppercase tracking-eyebrow text-inkSoft">Your decision</p>
                <div className="flex flex-1 flex-col overflow-hidden rounded-[10px] bg-white ring-1 ring-[#0B1440]/10 shadow-card">
                  <div className="flex items-center gap-1.5 border-b border-[#EBEEF4] bg-[#FAFBFC] px-3 py-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#30A46C] animate-[ps-pulse_2s_infinite]" aria-hidden />
                    <span className="font-mono text-[8.5px] uppercase tracking-[0.08em] text-overcast">Answered</span>
                  </div>
                  <div className="flex flex-1 flex-col p-3.5">
                    <p className="font-mono text-[10px] leading-relaxed text-tertiary-text">
                      &ldquo;Ask anything about your data.&rdquo;
                    </p>
                    <p className="mt-2 text-[14px] font-semibold leading-snug tracking-tight text-ink">
                      One grounded answer, every time.
                    </p>
                    <div className="mt-3">
                      <BlueChip label="GROUNDED" />
                    </div>
                    <div className="mt-3.5 flex flex-col gap-1.5 border-t border-[#EBEEF4] pt-3">
                      <p className="font-mono text-[8.5px] uppercase tracking-[0.08em] text-overcast">Backed by</p>
                      <p className="font-mono text-[9.5px] leading-snug text-inkSoft">the governed metric layer</p>
                      <p className="font-mono text-[9.5px] leading-snug text-inkSoft">the knowledge graph, with citations</p>
                    </div>
                    <p className="mt-auto pt-3 text-[11px] leading-snug text-inkSoft">
                      Every line traced to its source.
                    </p>
                  </div>
                </div>
                <p className="mt-auto hidden pt-2 font-mono text-[9px] leading-relaxed text-overcast lg:block">
                  TRUSTED · TRACED · ACTED ON
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Governance: the floor under all three layers */}
          <ScrollReveal delay={120}>
            <div className={`hidden lg:grid ${FLOW_GRID}`} aria-hidden>
              <div />
              <div />
              <GovTie />
              <div />
              <GovTie />
              <div />
              <GovTie />
              <div />
              <div />
            </div>
            <div id="modules-governance" className="mt-3 scroll-mt-28 overflow-hidden rounded-frame border border-line bg-primary-bg lg:mt-0">
              <div className="h-[3px] bg-gradient-to-r from-ink/60 via-ink/25 to-transparent" aria-hidden />
              <div className="flex flex-col gap-3 px-4 py-4 md:flex-row md:items-center md:justify-between md:px-6 lg:py-5">
                <div className="flex items-center gap-3.5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[9px] bg-ink text-white shadow-card">
                    <DynamicSketchIcon text="Akashic Data Governance" className="h-[18px] w-[18px]" />
                  </span>
                  <div>
                    <h3 className="text-[16px] font-semibold tracking-tight text-ink">
                      Akashic Governance
                      <span className="ml-2 font-normal text-inkSoft">· the floor everything above stands on</span>
                    </h3>
                    <p className="mt-0.5 text-[13px] leading-snug text-inkSoft">
                      Applied at every layer, from the first byte to the final answer.
                    </p>
                  </div>
                </div>
                <div className="flex shrink-0 flex-wrap gap-2.5">
                  {govTiles.map((tile, i) => (
                    <div key={tile.label} className="flex flex-col gap-0.5 rounded-[10px] border border-[#E3E7F0] bg-white px-4 py-2.5 shadow-card">
                      <span className="flex items-center gap-2">
                        <span
                          className="h-1.5 w-1.5 rounded-full bg-blue animate-[ps-pulse_2.4s_infinite]"
                          style={{ animationDelay: `${i * 400}ms` }}
                        />
                        <span className="text-[12.5px] font-medium text-ink">{tile.label}</span>
                      </span>
                      <span className="pl-3.5 font-mono text-[9.5px] text-overcast">{tile.detail}</span>
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
