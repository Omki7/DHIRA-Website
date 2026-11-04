/*
 * SIMULATED PRODUCT UI — not real Akashic app code.
 * The faces of the /akashic [02] teardown plates: one crop of the product
 * per module, drawn at the plate's own size (536 × 376) so it reads in the
 * scene instead of shrinking with a whole app window.
 */

import type { ReactNode } from "react";
import { AkashicLogo } from "@/shared/components/icons";
import styles from "./AkashicPlateScreensMockup.module.scss";

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

function Panel({
  icon,
  crumbs,
  tabs,
  status,
  bar,
  children,
}: {
  icon: string;
  crumbs: [string, string];
  tabs: string[];
  status: string;
  bar: [string, string];
  children: ReactNode;
}) {
  return (
    <div className={styles.panel} style={{ width: FACE_W, height: FACE_H, fontFamily: UI }}>
      <div className={styles.header}>
        <span className={styles.crumbs}>
          <Icon d={icon} />
          <span className={styles.crumbDim}>{crumbs[0]}</span>
          <span className={styles.crumbSlash}>/</span>
          <span className={styles.crumbCurrent}>{crumbs[1]}</span>
        </span>
        <span className={styles.headerActions}>
          <span className={styles.tabs}>
            {tabs.map((t, i) => (
              <span key={t} className={i === 0 ? styles.tabActive : styles.tabInactive}>
                {t}
              </span>
            ))}
          </span>
          <span className={styles.statusChip}>
            <span className={styles.statusDot} />
            {status}
          </span>
        </span>
      </div>
      <div className={styles.body}>{children}</div>
      <div className={styles.statusBar}>
        <span>{bar[0]}</span>
        <span className={styles.tabular}>{bar[1]}</span>
      </div>
    </div>
  );
}

/* A node on a canvas: name over one line of meta, the selected one in ink. */
function Node({
  x,
  y,
  w,
  name,
  meta,
  selected = false,
}: {
  x: number;
  y: number;
  w: number;
  name: string;
  meta: string;
  selected?: boolean;
}) {
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

const edge = (x1: number, y1: number, x2: number, y2: number) =>
  `M${x1} ${y1}C${(x1 + x2) / 2} ${y1} ${(x1 + x2) / 2} ${y2} ${x2} ${y2}`;

/* 0 · Data Pipelines: the run graph, three systems into one gold table. */
export function Pipelines() {
  const src = [
    { y: 28, name: "Salesforce", meta: "Source · 82,401 orders" },
    { y: 126, name: "NetSuite", meta: "Source · 81,072 invoices" },
    { y: 224, name: "Sales plan", meta: "Source · 60 targets" },
  ];
  return (
    <Panel
      icon="M4 6h6v4H4zM14 14h6v4h-6zM10 8h2a2 2 0 0 1 2 2v4"
      crumbs={["Pipelines", "unify_sales"]}
      tabs={["Canvas", "Runs", "Schedule"]}
      status="Healthy"
      bar={["Last run 6 min ago · 0 rejected", "82,401 rows"]}
    >
      <svg width={CW} height={CH} viewBox={`0 0 ${CW} ${CH}`} fill="none" style={{ fontFamily: UI }}>
        <defs>
          <pattern id="plate-dots" width="16" height="16" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.8" fill={LINE} />
          </pattern>
        </defs>
        <rect width={CW} height={CH} fill="url(#plate-dots)" />
        {src.map((s) => (
          <path key={s.name} d={edge(160, s.y + 24, 206, 150)} stroke={SOFT} strokeWidth="1.3" />
        ))}
        <path d={edge(322, 150, 362, 150)} stroke={INK} strokeWidth="1.5" />
        {src.map((s) => (
          <Node key={s.name} x={16} y={s.y} w={144} name={s.name} meta={s.meta} />
        ))}
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

/* 1 · Master Data: the customer hierarchy and how it is managed. */
export function MasterData() {
  const root = { x: 178, y: 14, w: 180 };
  const kids = [
    { cx: 96, name: "US retail arm", meta: "Salesforce · $2.1M", sites: "18 stores" },
    { cx: 268, name: "India subsidiary", meta: "NetSuite · $1.4M", sites: "9 stores" },
    { cx: 440, name: "Online business", meta: "Shopify · $0.7M", sites: "1 website" },
  ];
  const kidW = 156;
  const kidY = 100;
  const siteY = 178;
  const cells = [
    ["Owner", "Finance data team"],
    ["Sources", "3 systems"],
    ["Completeness", "98%"],
    ["Last change", "Steward · 2h ago"],
  ];
  return (
    <Panel
      icon="M12 3v6M12 9H5v6M12 9h7v6M3 15h4v4H3zM10 15h4v4h-4zM17 15h4v4h-4z"
      crumbs={["Master Data", "Customers"]}
      tabs={["Hierarchy", "Records", "Rules"]}
      status="Governed"
      bar={["3 companies · 28 locations · 3 systems", "Rolls up to $4.2M"]}
    >
      <svg width={CW} height={CH} viewBox={`0 0 ${CW} ${CH}`} fill="none" style={{ fontFamily: UI }}>
        <g stroke={SOFT} strokeWidth="1.2">
          <path d={`M268 ${root.y + 48}V80M${kids[0].cx} 80H${kids[2].cx}`} />
          {kids.map((k) => (
            <path key={k.name} d={`M${k.cx} 80V${kidY}M${k.cx} ${kidY + 48}V${siteY}`} />
          ))}
        </g>
        <rect x={root.x + 0.5} y={root.y + 0.5} width={root.w - 1} height="47" rx="8" fill={SURFACE} stroke={INK} strokeWidth="1.5" />
        <text x={root.x + 12} y={root.y + 20} fontSize="12" fontWeight="600" fill={INK}>Largest customer group</text>
        <text x={root.x + 12} y={root.y + 36} fontSize="10.5" fill={MID}>Group · $4.2M rolled up</text>
        {kids.map((k) => (
          <g key={k.name}>
            <rect x={k.cx - kidW / 2 + 0.5} y={kidY + 0.5} width={kidW - 1} height="47" rx="8" fill={SURFACE} stroke={LINE} />
            <text x={k.cx - kidW / 2 + 12} y={kidY + 20} fontSize="12" fontWeight="600" fill={INK}>{k.name}</text>
            <text x={k.cx - kidW / 2 + 12} y={kidY + 36} fontSize="10.5" fill={MID}>{k.meta}</text>
            <rect x={k.cx - 42.5} y={siteY + 0.5} width="85" height="23" rx="11.5" fill={RAISED} stroke={LINE} />
            <text x={k.cx} y={siteY + 16} fontSize="10.5" fill={MID} textAnchor="middle">{k.sites}</text>
          </g>
        ))}
        <rect x="16.5" y="220.5" width={CW - 33} height="66" rx="8" fill={RAISED} stroke={LINE} />
        {cells.map(([k, v], i) => {
          const x = 30 + i * ((CW - 60) / 4);
          return (
            <g key={k}>
              {i > 0 && <path d={`M${x - 12} 232V276`} stroke={LINE} />}
              <text x={x} y="244" fontSize="9.5" fill={SOFT} letterSpacing="0.6">{k.toUpperCase()}</text>
              <text x={x} y="264" fontSize="12" fontWeight="600" fill={INK}>{v}</text>
              {k === "Completeness" && (
                <>
                  <rect x={x + 34} y="257" width="64" height="5" rx="2.5" fill={LINE} />
                  <rect x={x + 34} y="257" width={64 * 0.98} height="5" rx="2.5" fill={INK} />
                </>
              )}
            </g>
          );
        })}
      </svg>
    </Panel>
  );
}

/* 2 · Data Warehouse: the schema diagram behind one governed metric. */
export function Warehouse() {
  const table = (x: number, y: number, name: string, cols: [string, string][], selected = false) => (
    <g key={name}>
      <rect x={x + 0.5} y={y + 0.5} width="139" height={30 + cols.length * 19} rx="8" fill={SURFACE} stroke={selected ? INK : LINE} strokeWidth={selected ? 1.5 : 1} />
      <rect x={x + 1} y={y + 1} width="138" height="26" rx="7" fill={RAISED} />
      <text x={x + 11} y={y + 18} fontSize="11.5" fontWeight="600" fill={INK}>{name}</text>
      {cols.map(([c, k], i) => (
        <g key={c}>
          <text x={x + 11} y={y + 44 + i * 19} fontSize="10.5" fill={k ? INK : MID}>{c}</text>
          {k && (
            <text x={x + 129} y={y + 44 + i * 19} fontSize="9" fill={SOFT} textAnchor="end" fontWeight="600">
              {k}
            </text>
          )}
        </g>
      ))}
    </g>
  );
  return (
    <Panel
      icon="M4 6h16M4 12h16M4 18h16M9 6v12"
      crumbs={["Models", "sales_performance"]}
      tabs={["Diagram", "Columns", "Lineage"]}
      status="Gold"
      bar={["5 tables · star schema", "net_revenue = SUM(net_amount)"]}
    >
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
export function Forecast() {
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
    <Panel
      icon="M4 19l5-6 4 3 7-9"
      crumbs={["Models", "demand_forecast"]}
      tabs={["Forecast", "Runs", "Monitors"]}
      status="v3 · production"
      bar={["Run #24 · MAPE 6.2% · best of 4", "Retrained weekly"]}
    >
      <div className={styles.fcMeta}>
        <p className={styles.fcEyebrow}>Next quarter</p>
        <p className={styles.fcNumber}>
          ≈12,400 <span className={styles.fcUnit}>units</span>
        </p>
      </div>
      <div className={styles.fcLegend}>
        <span className={styles.fcLegendItem}>
          <span className={styles.legendLineSolid} />
          Actuals
        </span>
        <span className={styles.fcLegendItem}>
          <span className={styles.legendLineDashed} />
          Forecast
        </span>
        <span className={styles.fcLegendItem}>
          <span className={styles.legendBox} />
          P10–P90
        </span>
      </div>
      <svg width={CW} height={CH} viewBox={`0 0 ${CW} ${CH}`} fill="none" style={{ fontFamily: UI }}>
        {[0, 1, 2, 3].map((r) => (
          <g key={r}>
            <path d={`M${left} ${top + (h / 3) * r}H${left + w}`} stroke={LINE} />
            <text x={left - 8} y={top + (h / 3) * r + 3} fontSize="9.5" fill={SOFT} textAnchor="end">
              {["1.4k", "1.1k", "0.8k", "0.5k"][r]}
            </text>
          </g>
        ))}
        <path d={band} fill={RAISED} stroke={LINE} />
        <path d={line(actual, 0)} stroke={INK} strokeWidth="1.8" />
        <path d={line(fcPts, t)} stroke={INK} strokeWidth="1.8" strokeDasharray="5 4" />
        <path d={`M${x(t)} ${top - 6}V${top + h}`} stroke={SOFT} strokeDasharray="2 3" />
        <text x={x(t) + 5} y={top - 1} fontSize="9.5" fill={MID}>
          Today
        </text>
        <circle cx={hx} cy={hy} r="4" fill={SURFACE} stroke={INK} strokeWidth="1.6" />
        <g fontSize="10.5">
          <rect x={hx - 150.5} y={hy - 70.5} width="132" height="50" rx="7" fill={SURFACE} stroke={LINE} />
          <text x={hx - 140} y={hy - 52} fill={MID}>Week of 14 Oct</text>
          <text x={hx - 140} y={hy - 34} fill={INK} fontWeight="600">1,080 units · ±9%</text>
        </g>
        {["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((m, i) => (
          <text
            key={m}
            x={left + (i / 5) * w}
            y={top + h + 18}
            fontSize="9.5"
            fill={SOFT}
            textAnchor={i === 0 ? "start" : i === 5 ? "end" : "middle"}
          >
            {m}
          </text>
        ))}
      </svg>
    </Panel>
  );
}

/* 4 · Ask Akashic: a plain question, a cited answer, the evidence under it. */
export function Ask() {
  const bars = [
    { name: "Direct", pct: 46 },
    { name: "Partner", pct: 32 },
    { name: "Online", pct: 22, focus: true },
  ];
  return (
    <Panel
      icon="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
      crumbs={["Ask", "Channel growth"]}
      tabs={["Thread", "Sources"]}
      status="Grounded"
      bar={["2 sources · Sales Performance · gold", "1.4s"]}
    >
      <div className={styles.askWrap}>
        <div className={styles.askBubbleUser}>Which channel is growing fastest this quarter?</div>
        <div className={styles.askAnswerRow}>
          <AkashicLogo className={styles.askLogo} primaryColor="rgb(var(--ink))" />
          <div className={styles.askAnswerContent}>
            <p className={styles.askAnswerText}>
              Online is your fastest-growing channel, up <span style={{ fontWeight: 600 }}>18% quarter on quarter</span>, and now 22% of revenue.
              <span className={styles.citeNum}>1</span>
              <span className={styles.citeNumFollow}>2</span>
            </p>
            <div className={styles.askCard}>
              <p className={styles.askCardTitle}>Share of net revenue · Q2</p>
              <div className={styles.askBars}>
                {bars.map((b) => (
                  <div key={b.name} className={styles.askBarRow}>
                    <span className={styles.askBarLabel}>{b.name}</span>
                    <span
                      className={b.focus ? styles.askBarFillFocus : styles.askBarFillMuted}
                      style={{ width: b.pct * 3.6 }}
                    />
                    <span className={b.focus ? styles.askBarValFocus : styles.askBarValMuted}>
                      {b.pct}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.askInput}>
          Ask a follow-up…
          <span className={styles.askSendBtn}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="rgb(var(--on-action))" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </span>
        </div>
      </div>
    </Panel>
  );
}

/* 5 · Business Intelligence: two dashboard tiles, the gap to plan visible. */
export function Dashboard() {
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
    <Panel
      icon="M4 20V10M10 20V4M16 20v-7M22 20H2"
      crumbs={["Dashboards", "Sales Overview"]}
      tabs={["Overview", "Regions", "Accounts"]}
      status="Live"
      bar={["On governed metrics · refreshed 2 min ago", "Q2 FY26"]}
    >
      <div className={styles.dashGrid}>
        <div className={styles.dashTileRelative}>
          <div className={styles.dashTileHeader}>
            <p className={styles.dashEyebrow}>Net revenue</p>
            <p className={styles.dashNumber}>
              $25.4M <span className={styles.dashDelta}>+6.4%</span>
            </p>
          </div>
          <svg width={tw} height={th + 50} viewBox={`0 0 ${tw} ${th + 50}`} fill="none" className={styles.dashSvgAbsolute} style={{ fontFamily: UI }}>
            {[0, 1, 2].map((r) => (
              <path key={r} d={`M14 ${34 + (th / 2) * r}H${tw - 14}`} stroke={LINE} />
            ))}
            <path d={path(plan)} stroke={SOFT} strokeWidth="1.4" strokeDasharray="4 3" />
            <path d={path(weeks)} stroke={INK} strokeWidth="1.8" />
            <circle cx={px(12)} cy={py(weeks[12])} r="3.5" fill={INK} />
            <text x="14" y={th + 46} fontSize="9.5" fill={SOFT}>Weekly revenue vs plan</text>
          </svg>
        </div>
        <div className={styles.dashTile}>
          <p className={styles.dashEyebrow}>Attainment by region</p>
          <p className={styles.dashNumber}>
            98% <span className={styles.dashDelta}>of plan</span>
          </p>
          <svg width="212" height="150" viewBox="0 0 212 150" fill="none" className={styles.dashSvgMt} style={{ fontFamily: UI }}>
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
