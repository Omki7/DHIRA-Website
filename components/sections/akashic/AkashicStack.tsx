"use client";

/*
 * [08] Capabilities & connectors — the technical reference, per module.
 * A tabbed drawer (selector left, detail panel right) in the "Modular by
 * design" idiom, built for engineering and technical-evaluation readers.
 * STRICTLY a technical datasheet: every module body is data-driven from
 * the same three cell types — connector tile (monogram + name), capability
 * cell (icon + technical term + optional mono qualifier), and the BI
 * chart-type gallery — so all seven panels share one visual grammar (user
 * direction, Jul 2026: consistency over bespoke visuals; no worked
 * examples, no instance data, no marketing sentences — terse noun phrases
 * only). Connector / model marks use the house monogram tile (illustrative
 * integration categories, not a live registry). Deliberately does NOT show
 * a "runs on" underlying-tech-stack footer (removed per user direction,
 * Jul 2026): the section's job is connectors, features, and capabilities —
 * not infrastructure. Compliance / key-custody / residency lines match the
 * home + [05] copy.
 */

import { useState } from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import DynamicSketchIcon from "@/components/icons/DynamicSketchIcon";
import { CardBadge, Capillary } from "@/components/sections/akashic/AkashicCardChrome";

/* ------------------------------------------------------------------ */
/*  Local line-icon set (stroke, 24-box) — section-specific glyphs      */
/* ------------------------------------------------------------------ */

const ICO: Record<string, string> = {
  "file-lines": "M7 3h7l4 4v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z M14 3v4h4 M9 13h6 M9 16.5h4",
  doc: "M7 3h7l4 4v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z M14 3v4h4",
  mail: "M3.5 6.5h17v11h-17z M4 7l8 6 8-6",
  image: "M4 5h16v14H4z M4 15l4-4 4 4 3-3 5 5 M8.5 9.5a1.3 1.3 0 1 1-2.6 0 1.3 1.3 0 0 1 2.6 0z",
  clipboard: "M9 4h6v3H9z M8 5H6v15h12V5h-2 M9 12h6 M9 16h4",
  bolt: "M13 3L5 13h5l-1 8 8-11h-5l1-7z",
  layers: "M12 3l9 5-9 5-9-5 9-5z M3 13l9 5 9-5",
  refresh: "M20 11a8 8 0 1 0-2 5.3 M20 5v6h-6",
  funnel: "M4 5h16l-6 8v5l-4 2v-7z",
  alert: "M12 4l9 16H3z M12 10v4 M12 17h.01",
  users: "M16 20v-1a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v1 M10 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z M17 4.5a3 3 0 0 1 0 6 M21 20v-1a3.5 3.5 0 0 0-3-3.4",
  pin: "M12 21s7-5.4 7-11a7 7 0 1 0-14 0c0 5.6 7 11 7 11z M12 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
  merge: "M6 4v4a4 4 0 0 0 4 4h8 M15 9l3.5 3-3.5 3 M6 20v-4",
  hierarchy: "M9 4h6v3H9z M4 20V16h5v-3 M20 20v-4h-5v-3 M11 13h2v-3",
  shield: "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z",
  queue: "M4 6h16 M4 12h16 M4 18h10",
  sparkle: "M12 3l1.7 4.3L18 9l-4.3 1.7L12 15l-1.7-4.3L6 9l4.3-1.7z",
  lock: "M6 10V8a6 6 0 0 1 12 0v2 M5 10h14v10H5z M12 14v3",
  key: "M15.5 4a4.5 4.5 0 1 0 3.5 7.3 M12.5 7.5L4 16v4h4v-2h2v-2h2l1.2-1.2",
  database: "M12 3c4.4 0 8 1.3 8 3v12c0 1.7-3.6 3-8 3s-8-1.3-8-3V6c0-1.7 3.6-3 8-3z M4 6c0 1.7 3.6 3 8 3s8-1.3 8-3 M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3",
  grid: "M4 4h7v7H4z M13 4h7v7h-7z M4 13h7v7H4z M13 13h7v7h-7z",
  "chart-bar": "M4 20V4 M4 20h16 M8 20v-6 M12.5 20v-9 M17 20v-4",
  flask: "M9 3h6 M10 3v6l-4.2 8A2 2 0 0 0 7.6 20h8.8a2 2 0 0 0 1.8-3l-4.2-8V3 M7.4 15h9.2",
  archive: "M4 4h16v4H4z M5 8v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8 M9.5 12h5",
  rocket: "M12 3c3 1 4.5 4 4.5 8L14 13h-4l-2.5-2c0-4 1.5-7 4.5-8z M12 8.5a1.4 1.4 0 1 0 0-2.8 1.4 1.4 0 0 0 0 2.8z M9.5 15l-2 4 4-2",
  gauge: "M4 18a8 8 0 1 1 16 0 M12 13l4-3 M12 13a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z",
  notebook: "M6 3h11a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H6z M6 3v18 M9.5 7h5 M9.5 11h5 M9.5 15h3",
  chip: "M8 8h8v8H8z M4 10v4 M20 10v4 M9.5 4v2 M14.5 4v2 M9.5 18v2 M14.5 18v2 M4 10h2 M18 10h2 M4 14h2 M18 14h2",
  mask: "M4 8s2.5-2 8-2 8 2 8 2v2.5a5 5 0 0 1-5 5h-.7L12 17l-2.3-1.5H9a5 5 0 0 1-5-5z M8.5 11h.01 M15.5 11h.01",
  history: "M12 8v4l3 2 M4 12a8 8 0 1 1 3 6.2 M4 19v-4h4",
  globe: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z M3.5 12h17 M12 3c2.8 3 2.8 15 0 18 M12 3c-2.8 3-2.8 15 0 18",
  code: "M9.5 8L5.5 12l4 4 M14.5 8l4 4-4 4",
  bell: "M6 16v-6a6 6 0 0 1 12 0v6l2 2H4z M10 20a2 2 0 0 0 4 0",
  filter: "M4 5h16l-6 8v6l-4-2v-4z",
  link: "M9 15l6-6 M8.5 12l-2 2a3 3 0 0 0 4.2 4.2l2-2 M15.5 12l2-2a3 3 0 0 0-4.2-4.2l-2 2",
  tag: "M4 4h7l9 9-7 7-9-9z M8 8h.01",
  lineage: "M6 8H4v-2 M4 6h4a4 4 0 0 1 4 4v0a4 4 0 0 0 4 4h2 M18 12h2v-2 M18 16h2v-2 M4 18h4a4 4 0 0 1 4-4",
  chart: "M4 4v16h16 M8 14l3-4 3 2 4-6",
};

function Ico({ name, className = "h-4 w-4" }: { name: string; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d={ICO[name]} />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  The datasheet grammar: three cell types, one group renderer         */
/* ------------------------------------------------------------------ */

type Conn = { mono: string; name: string; color: string };
type Cap = { icon: string; term: string; sub?: string };
type Group =
  | { label: string; kind: "conn"; items: Conn[] }
  | { label: string; kind: "cap"; items: Cap[] }
  | { label: string; kind: "charts" }
  | { label: string; kind: "badges"; items: string[] };

function ConnTile({ mono, name, color }: Conn) {
  return (
    <div className="flex items-center gap-2 rounded-inner border border-card-line bg-white px-2.5 py-2 shadow-card">
      <span
        className="flex h-6 w-6 shrink-0 items-center justify-center rounded-chip font-mono text-[9px] font-bold leading-none text-white"
        style={{ background: color }}
        aria-hidden
      >
        {mono}
      </span>
      <span className="truncate text-[11.5px] font-medium text-ink">{name}</span>
    </div>
  );
}

function CapCell({ icon, term, sub }: Cap) {
  return (
    <div className="flex items-center gap-2.5 rounded-inner border border-card-line bg-white px-3 py-2.5">
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-tile bg-blue-subtle text-blue">
        <Ico name={icon} className="h-4 w-4" />
      </span>
      <span className="min-w-0">
        <span className="block truncate text-[12px] font-semibold tracking-tight text-ink">{term}</span>
        {sub && <span className="block truncate font-mono text-[9px] text-secondary-text">{sub}</span>}
      </span>
    </div>
  );
}

/* BI chart-type gallery — the capability IS the visualisation range,
   so the cell content is a minimal chart glyph (Superset-style). */
function ChartThumb({ kind }: { kind: string }) {
  const stroke = "#3E63DD";
  const fill = "#C8D2F5";
  switch (kind) {
    case "bar":
      return (
        <svg viewBox="0 0 40 24" className="h-7 w-10" fill="none" aria-hidden>
          <rect x="4" y="12" width="6" height="9" rx="1" fill={fill} />
          <rect x="13" y="7" width="6" height="14" rx="1" fill={stroke} />
          <rect x="22" y="10" width="6" height="11" rx="1" fill={fill} />
          <rect x="31" y="4" width="6" height="17" rx="1" fill={stroke} />
        </svg>
      );
    case "line":
      return (
        <svg viewBox="0 0 40 24" className="h-7 w-10" fill="none" aria-hidden>
          <polyline points="4,17 13,11 21,14 29,6 37,9" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="29" cy="6" r="1.8" fill={stroke} />
        </svg>
      );
    case "area":
      return (
        <svg viewBox="0 0 40 24" className="h-7 w-10" fill="none" aria-hidden>
          <path d="M4 20 L13 12 L21 15 L29 7 L37 11 V21 H4 Z" fill={fill} />
          <polyline points="4,20 13,12 21,15 29,7 37,11" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "big":
      return <span className="font-mono text-[13px] font-bold tracking-tight text-blue">123</span>;
    case "pie":
      return (
        <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" aria-hidden>
          <circle cx="12" cy="12" r="8" fill={fill} />
          <path d="M12 12 L12 4 A8 8 0 0 1 19 15 Z" fill={stroke} />
          <circle cx="12" cy="12" r="3.4" fill="#fff" />
        </svg>
      );
    case "table":
      return (
        <svg viewBox="0 0 40 24" className="h-7 w-10" fill="none" aria-hidden stroke={stroke} strokeWidth="1.5">
          <rect x="4" y="4" width="32" height="16" rx="1.5" fill="none" />
          <path d="M4 10h32M4 15h32M15 4v16M26 4v16" opacity="0.7" />
        </svg>
      );
    case "heat":
      return (
        <svg viewBox="0 0 24 24" className="h-7 w-7" aria-hidden>
          {[0, 1, 2].map((r) =>
            [0, 1, 2].map((c) => (
              <rect key={`${r}-${c}`} x={4 + c * 5.5} y={4 + r * 5.5} width="4.5" height="4.5" rx="1" fill={stroke} opacity={0.25 + ((r + c) % 3) * 0.32} />
            )),
          )}
        </svg>
      );
    case "geo":
      return (
        <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" aria-hidden>
          <path d="M6 6l4-1 5 2 4-1v11l-4 1-5-2-4 1z" fill={fill} stroke={stroke} strokeWidth="1.2" strokeLinejoin="round" />
          <path d="M10 5v11M15 7v11" stroke={stroke} strokeWidth="1" opacity="0.6" />
          <circle cx="12.5" cy="11" r="2" fill={stroke} />
        </svg>
      );
    default:
      return null;
  }
}

const CHART_TYPES = [
  { kind: "bar", label: "Bar" },
  { kind: "line", label: "Time-series" },
  { kind: "area", label: "Area" },
  { kind: "big", label: "Big number" },
  { kind: "pie", label: "Pie" },
  { kind: "table", label: "Pivot table" },
  { kind: "heat", label: "Heatmap" },
  { kind: "geo", label: "Geo map" },
];

function GroupBlock({ group }: { group: Group }) {
  return (
    <div>
      <div className="font-mono text-[9.5px] font-bold uppercase tracking-eyebrow text-secondary-text">{group.label}</div>
      {group.kind === "conn" && (
        <div className="mt-2 grid grid-cols-2 gap-1.5 sm:grid-cols-3 xl:grid-cols-4">
          {group.items.map((c) => (
            <ConnTile key={c.name} {...c} />
          ))}
        </div>
      )}
      {group.kind === "cap" && (
        <div className="mt-2 grid grid-cols-1 gap-1.5 sm:grid-cols-2 xl:grid-cols-3">
          {group.items.map((c) => (
            <CapCell key={c.term} {...c} />
          ))}
        </div>
      )}
      {group.kind === "charts" && (
        <div className="mt-2 grid grid-cols-4 gap-1.5 sm:grid-cols-8">
          {CHART_TYPES.map((c) => (
            <div key={c.label} className="flex flex-col items-center gap-1 rounded-inner border border-card-line bg-white px-1 pt-2 pb-1.5">
              <span className="flex h-8 items-center justify-center">
                <ChartThumb kind={c.kind} />
              </span>
              <span className="truncate text-[9px] font-medium text-inkSoft">{c.label}</span>
            </div>
          ))}
        </div>
      )}
      {group.kind === "badges" && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {group.items.map((b) => (
            <span key={b} className="rounded-chip border border-card-line bg-white px-2.5 py-1.5 font-mono text-[9.5px] font-semibold text-inkSoft shadow-card">
              {b}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Module datasheets                                                   */
/* ------------------------------------------------------------------ */

type ModuleDef = {
  id: string;
  icon: string;
  name: string;
  tagline: string;
  desc: string;
  groups: Group[];
};

const MODULES: ModuleDef[] = [
  {
    id: "pipelines",
    icon: "Akashic Data Pipelines",
    name: "Akashic Pipelines",
    tagline: "Ingestion",
    desc: "Every source, ingested and validated the moment it arrives. Structured, unstructured, or streaming: one entry point into the platform, or a standalone ingestion layer.",
    groups: [
      {
        label: "Source connectors",
        kind: "conn",
        items: [
          { mono: "SF", name: "Salesforce", color: "#2E9BD6" },
          { mono: "SAP", name: "SAP", color: "#1170B5" },
          { mono: "NS", name: "NetSuite", color: "#1F2A44" },
          { mono: "HS", name: "HubSpot", color: "#EA5A2E" },
          { mono: "WD", name: "Workday", color: "#0875E1" },
          { mono: "ZD", name: "Zendesk", color: "#03363D" },
          { mono: "PG", name: "Postgres", color: "#336791" },
          { mono: "My", name: "MySQL", color: "#00758F" },
          { mono: "Mo", name: "MongoDB", color: "#00894F" },
          { mono: "❄", name: "Snowflake", color: "#1D9BD1" },
          { mono: "Ka", name: "Kafka", color: "#231F20" },
          { mono: "S3", name: "Amazon S3", color: "#C9412C" },
          { mono: "GS", name: "Sheets", color: "#0F9D58" },
          { mono: "{}", name: "REST / Webhook", color: "#3E63DD" },
        ],
      },
      {
        label: "Unstructured ingestion",
        kind: "cap",
        items: [
          { icon: "file-lines", term: "PDF extraction", sub: "layout-aware parsing" },
          { icon: "doc", term: "Office documents", sub: "DOCX · XLSX" },
          { icon: "mail", term: "Email ingestion", sub: ".eml · attachments" },
          { icon: "image", term: "OCR", sub: "scanned documents" },
        ],
      },
      {
        label: "Ingestion modes",
        kind: "cap",
        items: [
          { icon: "bolt", term: "Streaming", sub: "real-time" },
          { icon: "layers", term: "Batch", sub: "scheduled" },
          { icon: "refresh", term: "Change data capture", sub: "CDC" },
        ],
      },
      {
        label: "Validation",
        kind: "cap",
        items: [
          { icon: "funnel", term: "Schema validation", sub: "on arrival" },
          { icon: "clipboard", term: "Data contracts", sub: "versioned" },
          { icon: "alert", term: "Error quarantine", sub: "retry & backfill" },
        ],
      },
    ],
  },
  {
    id: "master-data",
    icon: "Akashic Master Data",
    name: "Akashic Master Data",
    tagline: "Entity resolution",
    desc: "Every version of an entity resolves into one golden record, with the lineage of everything merged kept intact.",
    groups: [
      {
        label: "Matching",
        kind: "cap",
        items: [
          { icon: "key", term: "Deterministic match keys", sub: "exact-key rules" },
          { icon: "sparkle", term: "Fuzzy matching", sub: "probabilistic scoring" },
          { icon: "filter", term: "Configurable match rules", sub: "per entity type" },
          { icon: "gauge", term: "Auto-merge thresholds", sub: "confidence-based" },
        ],
      },
      {
        label: "Golden record",
        kind: "cap",
        items: [
          { icon: "shield", term: "Survivorship rules", sub: "field-level precedence" },
          { icon: "queue", term: "Source precedence", sub: "per attribute" },
          { icon: "chart", term: "Confidence scoring", sub: "per merge" },
          { icon: "lineage", term: "Merge lineage", sub: "superseded records kept" },
        ],
      },
      {
        label: "Stewardship",
        kind: "cap",
        items: [
          { icon: "users", term: "Review queue", sub: "steward approvals" },
          { icon: "hierarchy", term: "Hierarchy management", sub: "parent-child rollups" },
          { icon: "refresh", term: "Standardisation", sub: "cleansing rules" },
          { icon: "merge", term: "Deduplication", sub: "cross-source" },
        ],
      },
    ],
  },
  {
    id: "warehouse",
    icon: "Akashic Data Warehouse",
    name: "Akashic Warehouse",
    tagline: "Modelled storage",
    desc: "Mastered records become models built for fast, reliable queries. Bring your own warehouse or run Akashic-managed storage.",
    groups: [
      {
        label: "Warehouse connectors",
        kind: "conn",
        items: [
          { mono: "❄", name: "Snowflake", color: "#1D9BD1" },
          { mono: "BQ", name: "BigQuery", color: "#3B78E7" },
          { mono: "DB", name: "Databricks", color: "#E8432A" },
          { mono: "RS", name: "Redshift", color: "#205B99" },
          { mono: "Sy", name: "Synapse", color: "#0F6CBD" },
          { mono: "PG", name: "Postgres", color: "#336791" },
        ],
      },
      {
        label: "Modelling",
        kind: "cap",
        items: [
          { icon: "layers", term: "Medallion layering", sub: "bronze · silver · gold" },
          { icon: "grid", term: "Dimensional models", sub: "facts · dimensions" },
          { icon: "code", term: "dbt transforms", sub: "version-controlled" },
          { icon: "chart-bar", term: "Semantic metric layer", sub: "defined once" },
        ],
      },
      {
        label: "Storage & serving",
        kind: "cap",
        items: [
          { icon: "lock", term: "ACID transactions" },
          { icon: "archive", term: "Open table formats", sub: "Iceberg · Delta" },
          { icon: "bolt", term: "Sub-second queries" },
          { icon: "history", term: "Versioned schemas", sub: "change-tracked" },
        ],
      },
    ],
  },
  {
    id: "ml",
    icon: "Akashic Machine Learning",
    name: "Akashic ML",
    tagline: "Prediction",
    desc: "Build, train, deploy, and monitor models directly on governed data. No exports, no separate environment.",
    groups: [
      {
        label: "Development",
        kind: "cap",
        items: [
          { icon: "notebook", term: "JupyterHub notebooks", sub: "Python" },
          { icon: "flask", term: "Experiment tracking", sub: "MLflow" },
          { icon: "grid", term: "Feature store", sub: "online + offline" },
          { icon: "chip", term: "GPU compute", sub: "on demand" },
        ],
      },
      {
        label: "Deployment",
        kind: "cap",
        items: [
          { icon: "archive", term: "Model registry", sub: "dev · staging · prod" },
          { icon: "rocket", term: "CI/CD promotion", sub: "staged rollout" },
          { icon: "link", term: "Serving endpoints", sub: "batch + real-time" },
        ],
      },
      {
        label: "Monitoring",
        kind: "cap",
        items: [
          { icon: "gauge", term: "Drift detection", sub: "PSI" },
          { icon: "alert", term: "Bias monitoring", sub: "per segment" },
          { icon: "history", term: "Feature freshness", sub: "SLA-tracked" },
          { icon: "refresh", term: "Scheduled retraining" },
        ],
      },
    ],
  },
  {
    id: "ask",
    icon: "Akashic Insights",
    name: "Ask Akashic",
    tagline: "Natural language",
    desc: "Plain-language questions answered from the governed metric layer and the knowledge graph, with lineage attached to every answer.",
    groups: [
      {
        label: "Model providers · bring your own key",
        kind: "conn",
        items: [
          { mono: "A", name: "Anthropic Claude", color: "#C9633B" },
          { mono: "O", name: "OpenAI", color: "#0A8A6F" },
          { mono: "Az", name: "Azure OpenAI", color: "#0089D6" },
          { mono: "Ll", name: "Llama / Mistral", color: "#3E63DD" },
          { mono: "ak", name: "Akashic-hosted", color: "#1A1C1D" },
        ],
      },
      {
        label: "Grounding",
        kind: "cap",
        items: [
          { icon: "database", term: "Metric-layer grounding", sub: "governed definitions" },
          { icon: "lineage", term: "Knowledge-graph reasoning", sub: "entity relationships" },
          { icon: "file-lines", term: "Source citations", sub: "on every answer" },
          { icon: "funnel", term: "Scoped contexts", sub: "per domain" },
        ],
      },
      {
        label: "Controls",
        kind: "cap",
        items: [
          { icon: "shield", term: "Row-level enforcement", sub: "at answer time" },
          { icon: "mask", term: "PII masking", sub: "before inference" },
          { icon: "history", term: "Prompt audit log", sub: "append-only" },
          { icon: "globe", term: "In-region inference", sub: "no training on your data" },
        ],
      },
    ],
  },
  {
    id: "bi",
    icon: "Akashic BI",
    name: "Akashic BI",
    tagline: "Decision surface",
    desc: "Dashboards and metrics defined once, consistent on every surface they appear.",
    groups: [
      { label: "Visualisation types", kind: "charts" },
      {
        label: "Analytics",
        kind: "cap",
        items: [
          { icon: "chart-bar", term: "Semantic metric layer", sub: "defined once" },
          { icon: "code", term: "SQL Lab", sub: "ad-hoc queries" },
          { icon: "filter", term: "Cross-filtering", sub: "dashboard-wide" },
          { icon: "funnel", term: "Drill-down", sub: "to row level" },
        ],
      },
      {
        label: "Delivery & control",
        kind: "cap",
        items: [
          { icon: "bell", term: "Alerts & thresholds", sub: "metric-based" },
          { icon: "mail", term: "Scheduled reports", sub: "email delivery" },
          { icon: "shield", term: "Row-level security", sub: "per viewer" },
          { icon: "link", term: "Embedded analytics", sub: "iframe · SDK" },
        ],
      },
    ],
  },
  {
    id: "governance",
    icon: "Akashic Data Governance",
    name: "Akashic Governance",
    tagline: "Always on",
    desc: "Access control, lineage, and audit under every module, from the first byte to the final answer.",
    groups: [
      {
        label: "Catalogue & lineage",
        kind: "cap",
        items: [
          { icon: "database", term: "Asset catalogue", sub: "tables · models · dashboards" },
          { icon: "lineage", term: "Column-level lineage", sub: "cross-source" },
          { icon: "chart", term: "Data profiling", sub: "per column" },
          { icon: "tag", term: "Business glossary", sub: "terms · synonyms" },
        ],
      },
      {
        label: "Data quality",
        kind: "cap",
        items: [
          { icon: "history", term: "Freshness tests", sub: "SLA-tracked" },
          { icon: "funnel", term: "Null & uniqueness tests", sub: "per column" },
          { icon: "alert", term: "Schema-drift detection" },
          { icon: "gauge", term: "Volume monitoring", sub: "row-count baselines" },
        ],
      },
      {
        label: "Access & audit",
        kind: "cap",
        items: [
          { icon: "users", term: "Role-based access", sub: "row + column level" },
          { icon: "key", term: "SSO / SCIM", sub: "identity sync" },
          { icon: "queue", term: "Audit log", sub: "append-only" },
          { icon: "mask", term: "PII classification", sub: "auto-tagged · masked" },
        ],
      },
      {
        label: "Residency & keys",
        kind: "cap",
        items: [
          { icon: "pin", term: "In-region deployment", sub: "cloud · on-prem · hybrid" },
          { icon: "globe", term: "Zero data egress", sub: "policy-enforced" },
          { icon: "lock", term: "AES-256 encryption", sub: "at rest · in transit" },
          { icon: "shield", term: "Customer-held keys", sub: "no DHIRA key custody" },
        ],
      },
      { label: "Compliance", kind: "badges", items: ["DPDP Act", "ISO 27001", "SOC 2 Type II", "GDPR", "CERT-In"] },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Section                                                            */
/* ------------------------------------------------------------------ */

export default function AkashicStack() {
  const [active, setActive] = useState(0);
  const m = MODULES[active];

  return (
    <section id="stack" className="scroll-mt-24 border-t border-lineSoft bg-primary-bg">
      <div className="rail-container pt-12 pb-24 lg:pt-16 lg:pb-32">
        <ScrollReveal>
          <p className="font-mono text-[11px] uppercase tracking-eyebrow">
            <span className="text-overcast">[09]</span>
            <span className="text-inkSoft">&nbsp;&nbsp;Capabilities &amp; connectors</span>
          </p>
          <h2 className="mt-5 text-balance text-heading-sm font-semibold text-ink md:text-heading-md">
            Every module, down to what it connects to and what it does.
          </h2>
          <p className="mt-5 max-w-[36em] text-lg leading-relaxed text-secondary-text">
            The technical reference: pick a module to see its source and system
            connectors, its capabilities, and the controls it ships with.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={120}>
          <div className="mt-10 grid gap-5 lg:mt-12 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-8">
            {/* Selector */}
            <div
              role="tablist"
              aria-label="Akashic modules"
              className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:gap-1.5 lg:overflow-x-visible lg:pb-0"
            >
              {MODULES.map((mod, i) => {
                const isActive = i === active;
                return (
                  <button
                    key={mod.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActive(i)}
                    className={`flex shrink-0 items-center gap-3 rounded-inner border px-3.5 py-3 text-left transition-all duration-250 ease-settle lg:w-full lg:shrink ${
                      isActive
                        ? "border-blue-border bg-blue-subtle/60 shadow-card"
                        : "border-card-line bg-white hover:border-blue-border/60 hover:bg-primary-bg lg:border-transparent"
                    }`}
                  >
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-tile border ${
                        isActive ? "border-blue/20 bg-white text-blue" : "border-subtle-stroke bg-white text-inkSoft"
                      }`}
                    >
                      <DynamicSketchIcon text={mod.icon} className="h-4 w-4" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block whitespace-nowrap text-[13px] font-semibold tracking-tight text-ink lg:truncate lg:whitespace-normal">
                        {mod.name}
                      </span>
                      <span className="hidden truncate text-[11px] text-secondary-text lg:block">{mod.tagline}</span>
                    </span>
                    <span className="hidden font-mono text-[9px] font-bold tracking-eyebrow text-secondary-text lg:block">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Detail drawer */}
            <div
              key={m.id}
              role="tabpanel"
              className="animate-[ps-rise_450ms_cubic-bezier(0.2,0.8,0.2,1)_both] overflow-hidden rounded-outer border border-card-line bg-white shadow-frame"
            >
              <Capillary />

              <div className="flex items-center gap-3 border-b border-blue/10 bg-gradient-to-b from-blue-subtle/70 to-transparent px-5 py-4">
                <CardBadge icon={m.icon} />
                <div className="min-w-0 flex-1">
                  <div className="text-[16px] font-bold tracking-tight text-ink">{m.name}</div>
                  <div className="truncate text-[12px] text-secondary-text">{m.tagline}</div>
                </div>
              </div>

              <div className="flex flex-col gap-5 px-5 pt-4 pb-5">
                <p className="max-w-[54em] text-[13.5px] leading-relaxed text-inkSoft">{m.desc}</p>
                {m.groups.map((g) => (
                  <GroupBlock key={g.label} group={g} />
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
