/*
 * SIMULATED PRODUCT UI — not real Akashic app code.
 * The faces of the /akashic [02] teardown plates: one crop of the product
 * per module, drawn at the plate's own size (536 × 376) so it reads in the
 * scene instead of shrinking with a whole app window.
 *
 * User direction, 26 Oct 2026, in order: put the wireframes on the plates;
 * "remove the top and left bar... the focus should be on the things we want
 * to show"; then "too ugly, clunky and too colourful... put them in
 * monotone... they should feel like they are taken from actual akashic
 * platform".
 *
 * THE RULES, so the next edit keeps them:
 *   1. A crop, not a window: the panel's own header (breadcrumb, view
 *      tabs, one status), one canvas, the panel's status bar. No window
 *      bar, top bar, module rail or side panels.
 *   2. Monotone: one ink in four strengths (ink, secondary, tertiary,
 *      hairline) on the screen surface. No source colours, no accent; the
 *      selected or focal element is the darkest thing on the screen.
 *   3. The canvas is the module's verb: Data Pipelines a run graph, Master
 *      Data a match review, Data Warehouse a schema diagram, Machine
 *      Learning a forecast, Ask Akashic a cited answer, Business
 *      Intelligence dashboard tiles.
 *   4. Product type: Inter (loaded for simulated UI only), tabular figures.
 *   5. One demo world (AkashicScreenKitMockup's header, USD). Parties named
 *      by role or record id, systems by their real names. No check marks.
 * Inline styles and SVG attributes are the Rule 8 mockup exception.
 */

import type { ReactNode } from "react";

export const FACE_W = 536;
export const FACE_H = 376;

const UI = "Inter, var(--font-sans)";
const INK = "rgb(var(--ink))";
const MID = "rgb(var(--secondary-text))";
const SOFT = "rgb(var(--tertiary-text))";
const LINE = "rgb(var(--card-line))";
const SURFACE = "rgb(var(--screen-surface))";
const RAISED = "rgb(var(--screen-raised))";

/* Canvas size: the face less its header (44) and status bar (30). */
const CW = FACE_W;
const CH = FACE_H - 74;

function Icon({ d }: { d: string }) {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={MID} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

function Panel({ icon, crumbs, tabs, status, bar, children }: { icon: string; crumbs: [string, string]; tabs: string[]; status: string; bar: [string, string]; children: ReactNode }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-[12px] border border-card-line bg-[rgb(var(--screen-surface))] text-ink" style={{ width: FACE_W, height: FACE_H, fontFamily: UI }}>
      <div className="flex h-[44px] shrink-0 items-center justify-between border-b border-card-line px-4">
        <span className="flex items-center gap-2 text-[12px]">
          <Icon d={icon} />
          <span className="text-secondary-text">{crumbs[0]}</span>
          <span className="text-tertiary-text">/</span>
          <span className="font-medium">{crumbs[1]}</span>
        </span>
        <span className="flex items-center gap-2.5">
          <span className="flex rounded-[7px] bg-[rgb(var(--screen-raised))] p-[3px] text-[11px]">
            {tabs.map((t, i) => (
              <span key={t} className={`rounded-[5px] px-2 py-[3px] ${i === 0 ? "border border-card-line bg-[rgb(var(--screen-surface))] font-medium text-ink" : "border border-transparent text-secondary-text"}`}>{t}</span>
            ))}
          </span>
          <span className="flex items-center gap-1.5 rounded-full border border-card-line px-2 py-[3px] text-[10.5px] text-secondary-text">
            <span className="h-1.5 w-1.5 rounded-full bg-ink" />
            {status}
          </span>
        </span>
      </div>
      <div className="relative min-h-0 flex-1">{children}</div>
      <div className="flex h-[30px] shrink-0 items-center justify-between border-t border-card-line bg-[rgb(var(--screen-raised))] px-4 text-[10.5px] text-secondary-text">
        <span>{bar[0]}</span>
        <span className="tabular-nums">{bar[1]}</span>
      </div>
    </div>
  );
}

/* A node on a canvas: name over one line of meta, the selected one in ink. */
function Node({ x, y, w, name, meta, selected = false }: { x: number; y: number; w: number; name: string; meta: string; selected?: boolean }) {
  return (
    <g>
      <rect x={x + 0.5} y={y + 0.5} width={w - 1} height="47" rx="8" fill={SURFACE} stroke={selected ? INK : LINE} strokeWidth={selected ? 1.5 : 1} />
      <text x={x + 12} y={y + 20} fontSize="12" fontWeight="600" fill={INK}>{name}</text>
      <text x={x + 12} y={y + 36} fontSize="10.5" fill={MID}>{meta}</text>
      <circle cx={x} cy={y + 24} r="3" fill={SURFACE} stroke={SOFT} />
      <circle cx={x + w} cy={y + 24} r="3" fill={SURFACE} stroke={SOFT} />
    </g>
  );
}

const edge = (x1: number, y1: number, x2: number, y2: number) => `M${x1} ${y1}C${(x1 + x2) / 2} ${y1} ${(x1 + x2) / 2} ${y2} ${x2} ${y2}`;

/* 0 · Data Pipelines: the run graph, three systems into one gold table. */
function Pipelines() {
  const src = [
    { y: 28, name: "Salesforce", meta: "Source · 82,401 orders" },
    { y: 126, name: "NetSuite", meta: "Source · 81,072 invoices" },
    { y: 224, name: "Sales plan", meta: "Source · 60 targets" },
  ];
  return (
    <Panel icon="M4 6h6v4H4zM14 14h6v4h-6zM10 8h2a2 2 0 0 1 2 2v4" crumbs={["Pipelines", "unify_sales"]} tabs={["Canvas", "Runs", "Schedule"]} status="Healthy" bar={["Last run 6 min ago · 0 rejected", "82,401 rows"]}>
      <svg width={CW} height={CH} viewBox={`0 0 ${CW} ${CH}`} fill="none" style={{ fontFamily: UI }}>
        <defs>
          <pattern id="plate-dots" width="16" height="16" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="0.8" fill={LINE} /></pattern>
        </defs>
        <rect width={CW} height={CH} fill="url(#plate-dots)" />
        {src.map((s) => <path key={s.name} d={edge(160, s.y + 24, 206, 150)} stroke={SOFT} strokeWidth="1.3" />)}
        <path d={edge(322, 150, 362, 150)} stroke={INK} strokeWidth="1.5" />
        {src.map((s) => <Node key={s.name} x={16} y={s.y} w={144} name={s.name} meta={s.meta} />)}
        <Node x={206} y={126} w={116} name="join_orders" meta="Transform · SQL" />
        <Node x={362} y={126} w={158} name="fact_sales" meta="Target · gold layer" selected />
        <g fontSize="10.5">
          <rect x="362.5" y="186.5" width="157" height="64" rx="7" fill={RAISED} stroke={LINE} />
          <text x="374" y="205" fill={MID}>Schema tests</text>
          <text x="508" y="205" fill={INK} textAnchor="end" fontWeight="600">24 passed</text>
          <text x="374" y="223" fill={MID}>Quality rules</text>
          <text x="508" y="223" fill={INK} textAnchor="end" fontWeight="600">11 passed</text>
          <text x="374" y="241" fill={MID}>Rejected rows</text>
          <text x="508" y="241" fill={INK} textAnchor="end" fontWeight="600">0</text>
        </g>
      </svg>
    </Panel>
  );
}

/* 1 · Master Data: one match under review, three records into one. */
function MasterData() {
  const cols = ["Salesforce", "NetSuite", "Invoice PDF", "Golden record"];
  const ids = ["Account #4471", "Customer 4471-B", "Bill-to", "CU-9042"];
  const rows = [
    { k: "Tax ID", v: ["94-2404110", "94-2404110", "—", "94-2404110"] },
    { k: "Address", v: ["500 Harbor Blvd", "500 Harbor Blvd, Ste 2", "500 HARBOR BLVD STE 2", "500 Harbor Blvd, Ste 2"] },
    { k: "Terms", v: ["—", "net-45", "Net 45", "net-45"] },
    { k: "Segment", v: ["Retail · key account", "Retail", "—", "Retail · key account"] },
  ];
  return (
    <Panel icon="M8 7a3 3 0 1 0 0 .01M16 17a3 3 0 1 0 0 .01M10.5 9.5l3 5" crumbs={["Customers", "Match review"]} tabs={["Review", "Rules", "History"]} status="Score 0.98" bar={["Matched on tax ID exact · address fuzzy 0.97", "3 records → 1"]}>
      <div className="px-4 pt-3 text-[11px]">
        <div className="grid grid-cols-[70px_1fr_1fr_1fr_1.15fr] items-end gap-x-2 border-b border-card-line pb-2">
          <span />
          {cols.map((c, i) => (
            <span key={c} className={i === 3 ? "rounded-t-[6px] bg-[rgb(var(--screen-raised))] px-2 pt-1.5" : "px-1"}>
              <span className={`block text-[10px] uppercase tracking-[0.06em] ${i === 3 ? "text-ink font-semibold" : "text-tertiary-text"}`}>{c}</span>
              <span className={`block text-[11.5px] ${i === 3 ? "font-semibold text-ink" : "font-medium text-secondary-text"}`}>{ids[i]}</span>
            </span>
          ))}
        </div>
        {rows.map((r) => (
          <div key={r.k} className="grid grid-cols-[70px_1fr_1fr_1fr_1.15fr] gap-x-2 border-b border-card-line">
            <span className="py-2.5 text-tertiary-text">{r.k}</span>
            {r.v.map((v, i) => (
              <span key={i} className={`py-2.5 leading-snug ${i === 3 ? "bg-[rgb(var(--screen-raised))] px-2 font-semibold text-ink" : "px-1 text-secondary-text"}`}>{v}</span>
            ))}
          </div>
        ))}
        <div className="mt-3 flex items-center justify-between">
          <span className="text-[11px] text-secondary-text">Survivorship: tax ID from Salesforce · address and terms from ERP</span>
          <span className="rounded-[6px] bg-ink px-2.5 py-1 text-[11px] font-medium text-on-action">Merged</span>
        </div>
      </div>
    </Panel>
  );
}

/* 2 · Data Warehouse: the schema diagram behind one governed metric. */
function Warehouse() {
  const table = (x: number, y: number, name: string, cols: [string, string][], selected = false) => (
    <g key={name}>
      <rect x={x + 0.5} y={y + 0.5} width="139" height={30 + cols.length * 19} rx="8" fill={SURFACE} stroke={selected ? INK : LINE} strokeWidth={selected ? 1.5 : 1} />
      <rect x={x + 1} y={y + 1} width="138" height="26" rx="7" fill={RAISED} />
      <text x={x + 11} y={y + 18} fontSize="11.5" fontWeight="600" fill={INK}>{name}</text>
      {cols.map(([c, k], i) => (
        <g key={c}>
          <text x={x + 11} y={y + 44 + i * 19} fontSize="10.5" fill={k ? INK : MID}>{c}</text>
          {k && <text x={x + 129} y={y + 44 + i * 19} fontSize="9" fill={SOFT} textAnchor="end" fontWeight="600">{k}</text>}
        </g>
      ))}
    </g>
  );
  return (
    <Panel icon="M4 6h16M4 12h16M4 18h16M9 6v12" crumbs={["Models", "sales_performance"]} tabs={["Diagram", "Columns", "Lineage"]} status="Gold" bar={["5 tables · star schema", "net_revenue = SUM(net_amount)"]}>
      <svg width={CW} height={CH} viewBox={`0 0 ${CW} ${CH}`} fill="none" style={{ fontFamily: UI }}>
        <g stroke={SOFT} strokeWidth="1.2">
          <path d={edge(156, 62, 198, 112)} />
          <path d={edge(156, 222, 198, 178)} />
          <path d={edge(338, 112, 380, 62)} />
          <path d={edge(338, 178, 380, 222)} />
          <path d="M198 106l-7-4M198 106l-7 3M198 172l-7-4M198 172l-7 3M338 106l7-4M338 106l7 3M338 172l7-4M338 172l7 3" />
        </g>
        {table(16, 22, "dim_customer", [["customer_id", "PK"], ["segment", ""], ["region_id", "FK"]])}
        {table(16, 186, "dim_region", [["region_id", "PK"], ["region", ""]])}
        {table(380, 22, "dim_product", [["product_id", "PK"], ["category", ""], ["list_price", ""]])}
        {table(380, 186, "dim_date", [["date_id", "PK"], ["quarter", ""]])}
        {table(198, 64, "fact_sales", [["order_id", "PK"], ["customer_id", "FK"], ["product_id", "FK"], ["region_id", "FK"], ["date_id", "FK"], ["net_amount", ""]], true)}
      </svg>
    </Panel>
  );
}

/* 3 · Machine Learning: the forecast past today, its band, one hover card. */
function Forecast() {
  const actual = [62, 66, 64, 70, 74, 72, 79, 84, 82, 88, 93, 96];
  const fc = [100, 104, 103, 109, 112, 117];
  const left = 40;
  const top = 64;
  const h = 170;
  const w = CW - left - 20;
  const n = actual.length + fc.length - 1;
  const x = (i: number) => left + (i / n) * w;
  const y = (v: number) => top + h - ((v - 50) / 90) * h;
  const t = actual.length - 1;
  const fcPts = [actual[t], ...fc];
  const line = (pts: number[], from: number) => pts.map((v, i) => `${i ? "L" : "M"}${x(from + i)} ${y(v)}`).join("");
  const band = `M${fcPts.map((v, i) => `${x(t + i)} ${y(v + i * 4.6)}`).join("L")}L${fcPts.map((v, i) => `${x(t + i)} ${y(v - i * 4.6)}`).reverse().join("L")}Z`;
  const hx = x(t + 4);
  const hy = y(fcPts[4]);
  return (
    <Panel icon="M4 19l5-6 4 3 7-9" crumbs={["Models", "demand_forecast"]} tabs={["Forecast", "Runs", "Monitors"]} status="v3 · production" bar={["Run #24 · MAPE 6.2% · best of 4", "Retrained weekly"]}>
      <div className="absolute left-4 top-3">
        <p className="text-[10px] uppercase tracking-[0.06em] text-tertiary-text">Next quarter</p>
        <p className="mt-0.5 text-[24px] font-semibold leading-none tracking-tight tabular-nums">≈12,400 <span className="text-[12px] font-normal text-secondary-text">units</span></p>
      </div>
      <div className="absolute right-4 top-4 flex items-center gap-4 text-[10.5px] text-secondary-text">
        <span className="flex items-center gap-1.5"><span className="h-[2px] w-4 bg-ink" />Actuals</span>
        <span className="flex items-center gap-1.5"><span className="w-4 border-t-2 border-dashed border-ink" />Forecast</span>
        <span className="flex items-center gap-1.5"><span className="h-2.5 w-4 rounded-sm border border-card-line bg-[rgb(var(--screen-raised))]" />P10–P90</span>
      </div>
      <svg width={CW} height={CH} viewBox={`0 0 ${CW} ${CH}`} fill="none" style={{ fontFamily: UI }}>
        {[0, 1, 2, 3].map((r) => (
          <g key={r}>
            <path d={`M${left} ${top + (h / 3) * r}H${left + w}`} stroke={LINE} />
            <text x={left - 8} y={top + (h / 3) * r + 3} fontSize="9.5" fill={SOFT} textAnchor="end">{["1.4k", "1.1k", "0.8k", "0.5k"][r]}</text>
          </g>
        ))}
        <path d={band} fill={RAISED} stroke={LINE} />
        <path d={line(actual, 0)} stroke={INK} strokeWidth="1.8" />
        <path d={line(fcPts, t)} stroke={INK} strokeWidth="1.8" strokeDasharray="5 4" />
        <path d={`M${x(t)} ${top - 6}V${top + h}`} stroke={SOFT} strokeDasharray="2 3" />
        <text x={x(t) + 5} y={top - 1} fontSize="9.5" fill={MID}>Today</text>
        <circle cx={hx} cy={hy} r="4" fill={SURFACE} stroke={INK} strokeWidth="1.6" />
        <g fontSize="10.5">
          <rect x={hx - 150.5} y={hy - 70.5} width="132" height="50" rx="7" fill={SURFACE} stroke={LINE} />
          <text x={hx - 140} y={hy - 52} fill={MID}>Week of 14 Oct</text>
          <text x={hx - 140} y={hy - 34} fill={INK} fontWeight="600">1,080 units · ±9%</text>
        </g>
        {["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((m, i) => (
          <text key={m} x={left + (i / 5) * w} y={top + h + 18} fontSize="9.5" fill={SOFT} textAnchor={i === 0 ? "start" : i === 5 ? "end" : "middle"}>{m}</text>
        ))}
      </svg>
    </Panel>
  );
}

/* 4 · Ask Akashic: a plain question, a cited answer, the evidence under it. */
function Ask() {
  const bars = [
    { name: "Direct", pct: 46 },
    { name: "Partner", pct: 32 },
    { name: "Online", pct: 22, focus: true },
  ];
  return (
    <Panel icon="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" crumbs={["Ask", "Channel growth"]} tabs={["Thread", "Sources"]} status="Grounded" bar={["2 sources · Sales Performance · gold", "1.4s"]}>
      <div className="flex h-full flex-col px-4 pb-3 pt-3">
        <div className="ml-auto max-w-[78%] rounded-[12px] rounded-br-[4px] bg-[rgb(var(--screen-raised))] px-3 py-2 text-[12.5px]">Which channel is growing fastest this quarter?</div>
        <div className="mt-3 flex gap-2.5">
          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-[6px] bg-ink text-[10px] font-semibold text-on-action">A</span>
          <div className="min-w-0 flex-1">
            <p className="text-[13px] leading-[1.45]">
              Online is your fastest-growing channel, up <span className="font-semibold">18% quarter on quarter</span>, and now 22% of revenue.
              <span className="ml-1 rounded-[4px] border border-card-line px-1 text-[9.5px] text-secondary-text">1</span>
              <span className="ml-0.5 rounded-[4px] border border-card-line px-1 text-[9.5px] text-secondary-text">2</span>
            </p>
            <div className="mt-2.5 rounded-[8px] border border-card-line px-3 py-2.5">
              <p className="text-[10px] uppercase tracking-[0.06em] text-tertiary-text">Share of net revenue · Q2</p>
              <div className="mt-2 space-y-1.5">
                {bars.map((b) => (
                  <div key={b.name} className="flex items-center gap-2.5 text-[11px]">
                    <span className="w-12 shrink-0 text-secondary-text">{b.name}</span>
                    <span className={`h-2 rounded-[2px] ${b.focus ? "bg-ink" : "bg-[rgb(var(--tertiary-text))]"}`} style={{ width: b.pct * 3.6 }} />
                    <span className={`tabular-nums ${b.focus ? "font-semibold" : "text-secondary-text"}`}>{b.pct}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-auto flex items-center justify-between rounded-[9px] border border-card-line px-3 py-2 text-[12px] text-tertiary-text">
          Ask a follow-up…
          <span className="flex h-5 w-5 items-center justify-center rounded-[5px] bg-ink">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="rgb(var(--on-action))" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </span>
        </div>
      </div>
    </Panel>
  );
}

/* 5 · Business Intelligence: two dashboard tiles, the gap to plan visible. */
function Dashboard() {
  const weeks = [1.62, 1.7, 1.66, 1.78, 1.84, 1.8, 1.92, 1.98, 2.02, 1.96, 2.08, 2.14, 2.2];
  const plan = weeks.map((_, i) => 1.7 + i * 0.04);
  const tw = 236;
  const th = 120;
  const px = (i: number) => 14 + (i / (weeks.length - 1)) * (tw - 28);
  const py = (v: number) => 34 + th - ((v - 1.5) / 0.8) * th;
  const path = (vs: number[]) => vs.map((v, i) => `${i ? "L" : "M"}${px(i)} ${py(v)}`).join("");
  const regions = [
    { name: "North", pct: 106 },
    { name: "West", pct: 102 },
    { name: "Central", pct: 99 },
    { name: "East", pct: 97 },
    { name: "South", pct: 92, focus: true },
  ];
  const bw = (pct: number) => ((pct - 70) / 40) * 150;
  return (
    <Panel icon="M4 20V10M10 20V4M16 20v-7M22 20H2" crumbs={["Dashboards", "Sales Overview"]} tabs={["Overview", "Regions", "Accounts"]} status="Live" bar={["On governed metrics · refreshed 2 min ago", "Q2 FY26"]}>
      <div className="grid h-full grid-cols-2 gap-3 p-3">
        <div className="relative rounded-[9px] border border-card-line">
          <div className="px-3 pt-2.5">
            <p className="text-[10px] uppercase tracking-[0.06em] text-tertiary-text">Net revenue</p>
            <p className="mt-0.5 text-[22px] font-semibold leading-none tabular-nums">$25.4M <span className="text-[11px] font-medium text-secondary-text">+6.4%</span></p>
          </div>
          <svg width={tw} height={th + 50} viewBox={`0 0 ${tw} ${th + 50}`} fill="none" className="absolute bottom-0 left-0" style={{ fontFamily: UI }}>
            {[0, 1, 2].map((r) => <path key={r} d={`M14 ${34 + (th / 2) * r}H${tw - 14}`} stroke={LINE} />)}
            <path d={path(plan)} stroke={SOFT} strokeWidth="1.4" strokeDasharray="4 3" />
            <path d={path(weeks)} stroke={INK} strokeWidth="1.8" />
            <circle cx={px(12)} cy={py(weeks[12])} r="3.5" fill={INK} />
            <text x="14" y={th + 46} fontSize="9.5" fill={SOFT}>Weekly revenue vs plan</text>
          </svg>
        </div>
        <div className="rounded-[9px] border border-card-line px-3 pt-2.5">
          <p className="text-[10px] uppercase tracking-[0.06em] text-tertiary-text">Attainment by region</p>
          <p className="mt-0.5 text-[22px] font-semibold leading-none tabular-nums">98% <span className="text-[11px] font-medium text-secondary-text">of plan</span></p>
          <svg width="212" height="150" viewBox="0 0 212 150" fill="none" className="mt-2" style={{ fontFamily: UI }}>
            {regions.map((r, i) => (
              <g key={r.name}>
                <text x="0" y={14 + i * 25} fontSize="10.5" fill={r.focus ? INK : MID} fontWeight={r.focus ? 600 : 400}>{r.name}</text>
                <rect x="48" y={5 + i * 25} width={bw(r.pct)} height="12" rx="2" fill={r.focus ? INK : SOFT} />
                <text x={52 + bw(r.pct)} y={15 + i * 25} fontSize="10.5" fill={INK} fontWeight={r.focus ? 600 : 400}>{r.pct}%</text>
              </g>
            ))}
            <path d={`M${48 + bw(100)} 0V124`} stroke={INK} strokeDasharray="2 3" />
            <text x={48 + bw(100) + 3} y="140" fontSize="9" fill={MID}>Plan</text>
          </svg>
        </div>
      </div>
    </Panel>
  );
}

const FACES = [Pipelines, MasterData, Warehouse, Forecast, Ask, Dashboard];

/* The face for plate `index` (0 Data Pipelines … 5 Business Intelligence). */
export default function AkashicPlateScreensMockup({ index }: { index: number }) {
  const Screen = FACES[index];
  return (
    <div className="pointer-events-none select-none" aria-hidden="true">
      <Screen />
    </div>
  );
}
