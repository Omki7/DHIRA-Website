/*
 * SIMULATED PRODUCT UI — not real Akashic app code.
 * One MOMENT per module, not one screen.
 */

import { Fragment, type CSSProperties, type ReactNode } from "react";
import styles from "./AkashicModuleMomentsMockup.module.scss";

export const C = {
  sf: "#2A9BE0", // Salesforce
  plan: "#E0A93B", // Sales plan, fiscal 2026
  ns: "#7C5CFC", // NetSuite
  blue: "rgb(var(--blue))",
  mute: "rgb(var(--tertiary-text) / 0.45)",
  blueLine: "rgb(var(--blue) / 0.55)",
};
export const EASE = "cubic-bezier(0.2,0.8,0.2,1)";

export const at = (x: number, y: number, extra?: CSSProperties): CSSProperties => ({
  position: "absolute",
  left: x,
  top: y,
  ...extra,
});

export const play = (name: string, delay: number, dur = 520, fill = "both"): CSSProperties => ({
  animation: `${name} ${dur}ms ${EASE} ${delay}ms ${fill}`,
});

export function Tag({
  name,
  meta,
  color,
  upper = true,
  stack = false,
  style,
}: {
  name: string;
  meta?: string;
  color?: string;
  upper?: boolean;
  stack?: boolean;
  style?: CSSProperties;
}) {
  return (
    <span
      style={{
        display: "flex",
        whiteSpace: "nowrap",
        fontFamily: "var(--font-mono)",
        fontSize: "10px",
        lineHeight: 1,
        flexDirection: stack ? "column" : "row",
        alignItems: stack ? "flex-start" : "center",
        gap: stack ? "4px" : "6px",
        ...style,
      }}
    >
      <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
        {color && <span style={{ height: "6px", width: "6px", flexShrink: 0, borderRadius: "9999px", background: color }} />}
        <span
          style={{
            textTransform: upper ? "uppercase" : "none",
            letterSpacing: upper ? "0.08em" : "normal",
            color: "rgb(var(--secondary-text))",
          }}
        >
          {name}
        </span>
      </span>
      {meta && <span style={{ color: "rgb(var(--tertiary-text))" }}>{meta}</span>}
    </span>
  );
}

export function HLine({
  x,
  y,
  w,
  fade,
  color = C.mute,
  delay = 0,
}: {
  x: number;
  y: number;
  w: number;
  fade?: "in" | "out";
  color?: string;
  delay?: number;
}) {
  const bg =
    fade === "in"
      ? `linear-gradient(to right, transparent, ${color} 45%)`
      : fade === "out"
        ? `linear-gradient(to left, transparent, ${color} 45%)`
        : color;
  return <span aria-hidden style={{ ...at(x, y, { width: w, height: 1, background: bg }), ...play("mm-fade", delay, 600) }} />;
}

export function Flow({
  x,
  y,
  run,
  n = 3,
  dur = 3200,
  color = C.blue,
  kind = "dot",
  delay = 0,
}: {
  x: number;
  y: number;
  run: number;
  n?: number;
  dur?: number;
  color?: string;
  kind?: "dot" | "capsule" | "joined";
  delay?: number;
}) {
  return (
    <>
      {Array.from({ length: n }, (_, i) => {
        const style = {
          ...at(x, y),
          "--run": `${run}px`,
          animation: `mm-run ${dur}ms linear ${delay + (i * dur) / n}ms infinite both`,
        } as CSSProperties;
        return (
          <span key={i} aria-hidden className={styles.flowItem} style={style}>
            {kind === "dot" && (
              <span style={{ position: "absolute", top: "-2.5px", display: "block", height: "5px", width: "5px", borderRadius: "9999px", background: color }} />
            )}
            {kind === "capsule" && (
              <span style={{ position: "absolute", top: "-3px", display: "block", height: "6px", width: "16px", borderRadius: "9999px", background: color }} />
            )}
            {kind === "joined" && (
              <span style={{ position: "absolute", top: "-3px", display: "flex", gap: "1px" }}>
                <span style={{ display: "block", height: "6px", width: "9px", borderTopLeftRadius: "9999px", borderBottomLeftRadius: "9999px", background: C.sf }} />
                <span style={{ display: "block", height: "6px", width: "9px", background: C.plan }} />
                <span style={{ display: "block", height: "6px", width: "9px", borderTopRightRadius: "9999px", borderBottomRightRadius: "9999px", background: C.ns }} />
              </span>
            )}
          </span>
        );
      })}
    </>
  );
}

export function Typed({ text, start, step = 24 }: { text: string; start: number; step?: number }) {
  return (
    <>
      {Array.from(text).map((ch, i) => (
        <span key={i} style={play("mm-fade", start + i * step, 90)}>
          {ch}
        </span>
      ))}
      <span className={styles.caretBlink} />
    </>
  );
}

/* 01 Data Pipelines: three streams, one join, one table */
export function PipelinesMoment() {
  const lanes = [
    { y: 92, name: "Salesforce", meta: "82,400 orders", c: C.sf },
    { y: 160, name: "Sales plan 2026", meta: "60 targets", c: C.plan },
    { y: 228, name: "NetSuite", meta: "81,100 invoices", c: C.ns },
  ];
  return (
    <>
      {lanes.map((l, i) => (
        <Fragment key={l.name}>
          <HLine x={0} y={l.y} w={432} fade="in" delay={i * 90} />
          <Tag name={l.name} meta={l.meta} color={l.c} style={{ ...at(84, l.y - 17), ...play("mm-fade", 120 + i * 120) }} />
          <Flow x={-16} y={l.y} run={446} n={4} dur={3600} kind="capsule" color={l.c} delay={i * 340} />
        </Fragment>
      ))}

      <span
        className={`${styles.eyebrow} ${styles.textTertiary}`}
        style={{ ...at(392, 42, { width: 100, textAlign: "center" }), ...play("mm-fade", 300) }}
      >
        Join
      </span>
      <span
        style={{
          ...at(430, 62, { width: 24, height: 196, transformOrigin: "center" }),
          ...play("mm-growy", 220, 700),
          borderRadius: "9999px",
          border: "1px solid rgb(var(--default-stroke))",
          background: "rgb(var(--screen-surface))",
        }}
      >
        {lanes.map((l) => (
          <span
            key={l.y}
            style={{ position: "absolute", left: "8px", height: "6px", width: "6px", borderRadius: "9999px", top: l.y - 62 - 3, background: l.c }}
          />
        ))}
      </span>
      <span
        style={{
          ...at(332, 270, { width: 220, textAlign: "center" }),
          ...play("mm-fade", 520),
          fontFamily: "var(--font-mono)",
          fontSize: "9.5px",
          color: "rgb(var(--tertiary-text))",
        }}
      >
        on order_no · region + month
      </span>

      <HLine x={455} y={160} w={154} color={C.blueLine} delay={600} />
      <Flow x={458} y={160} run={128} n={3} dur={2400} kind="joined" delay={900} />

      <div
        className={styles.panel}
        style={{
          ...at(610, 86, { width: 200 }),
          ...play("mm-slide", 700, 600),
          overflow: "hidden",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid rgb(var(--card-line))", padding: "8px 12px" }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", fontWeight: 600, color: "rgb(var(--primary-text))" }}>fact_sales</span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "rgb(var(--tertiary-text))" }}>1 row per sale</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", columnGap: "8px", padding: "8px 12px 0", fontFamily: "var(--font-mono)", fontSize: "8.5px", textTransform: "uppercase", letterSpacing: "0.08em" }}>
          <span style={{ color: C.sf }}>order</span>
          <span style={{ color: C.plan }}>plan</span>
          <span style={{ color: C.ns }}>invoice</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "7px", padding: "8px 12px 10px" }}>
          {[0, 1, 2, 3, 4].map((r) => (
            <div key={r} style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", columnGap: "8px", ...play("mm-slide", 1000 + r * 170, 420) }}>
              {[C.sf, C.plan, C.ns].map((c) => (
                <span key={c} style={{ display: "block", height: "5px", borderRadius: "9999px", background: c, opacity: 0.75 - r * 0.1 }} />
              ))}
            </div>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "6px", borderTop: "1px solid rgb(var(--card-line))", padding: "6px 12px", fontFamily: "var(--font-mono)", fontSize: "9.5px", color: "rgb(var(--secondary-text))" }}>
          <span className={styles.softpulse} style={{ height: "6px", width: "6px", borderRadius: "9999px", background: "rgb(var(--positive))" }} />
          82,401 rows · 0 rejected
        </div>
      </div>

      <HLine x={811} y={160} w={149} fade="out" color={C.blueLine} delay={1600} />
      <Flow x={814} y={160} run={150} n={2} dur={2600} delay={1800} />
      <Tag name="Sales Performance" meta="3 dashboards" upper={false} stack style={{ ...at(826, 128), ...play("mm-fade", 1700) }} />
    </>
  );
}

/* 02 Master Data: three records resolve to one golden record */
export function MasterDataMoment() {
  const recs = [
    { y: 62, src: "Salesforce · account", name: "Account #4471", attrs: "tax_id 94-2404110 · Harbor Blvd", c: C.sf, match: "tax_id · exact" },
    { y: 134, src: "NetSuite · customer", name: "Customer 4471-B", attrs: "tax_id 94-2404110 · Ste 2 · net-45", c: C.ns, match: "tax_id · exact" },
    { y: 206, src: "Invoice PDF · bill-to", name: "Bill-to on invoice", attrs: "no tax_id · 500 Harbor Blvd", c: C.plan, match: "address · fuzzy 0.97" },
  ];
  const fields = [
    { k: "tax_id", v: <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px" }}>94-2404110</span>, why: "exact match" },
    { k: "address", v: "500 Harbor Blvd, Ste 2", why: "most recent" },
    { k: "terms", v: "net-45", why: "prefer finance system" },
  ];
  return (
    <>
      {recs.map((r, i) => {
        const mid = r.y + 24;
        return (
          <Fragment key={r.src}>
            <HLine x={0} y={mid} w={40} fade="in" delay={i * 90} />
            <div
              style={{
                ...at(44, r.y, { width: 250 }),
                animation: `mm-slide 520ms ${EASE} ${100 + i * 140}ms both, mm-dim 700ms ${EASE} ${3500 + i * 80}ms forwards`,
                display: "flex",
                gap: "12px",
              }}
            >
              <span style={{ width: "2px", flexShrink: 0, borderRadius: "9999px", background: r.c }} />
              <div style={{ minWidth: 0 }}>
                <div className={styles.eyebrow} style={{ color: r.c }}>{r.src}</div>
                <div style={{ marginTop: "4px", fontSize: "14px", fontWeight: 500, lineHeight: 1.25, color: "rgb(var(--primary-text))" }}>{r.name}</div>
                <div style={{ marginTop: "4px", fontFamily: "var(--font-mono)", fontSize: "9.5px", color: "rgb(var(--tertiary-text))" }}>{r.attrs}</div>
              </div>
            </div>
          </Fragment>
        );
      })}

      <svg aria-hidden width={960} height={320} style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}>
        {recs.map((r, i) => {
          const y = r.y + 24;
          return (
            <path
              key={r.src}
              d={`M272 ${y} L 404 ${y} C 450 ${y}, 462 160, 512 160`}
              fill="none"
              stroke={i === 2 ? C.mute : C.blueLine}
              strokeWidth={1}
              strokeDasharray={i === 2 ? "3 3" : undefined}
              style={play("mm-fade", 700 + i * 150, 600)}
            />
          );
        })}
      </svg>
      {recs.map((r, i) => {
        const y = r.y + 24;
        return (
          <span
            key={r.match + i}
            style={{
              ...at(300, y - 8),
              ...play("mm-fade", 1050 + i * 150),
              display: "flex",
              borderRadius: "9999px",
              border: "1px solid rgb(var(--card-line))",
              background: "rgb(var(--screen-surface))",
              padding: "3px 8px",
              fontFamily: "var(--font-mono)",
              fontSize: "9px",
              lineHeight: 1,
              color: "rgb(var(--secondary-text))",
            }}
          >
            {r.match}
          </span>
        );
      })}

      <span
        style={{
          ...at(510, 153, { width: 14, height: 14 }),
          ...play("mm-fade", 1500),
          borderRadius: "9999px",
          border: "1px solid rgb(var(--blue))",
          background: "rgb(var(--screen-surface))",
        }}
      >
        <span style={{ position: "absolute", inset: "3.5px", borderRadius: "9999px", background: "rgb(var(--blue))" }} />
      </span>
      <span
        className={`${styles.eyebrow} ${styles.textTertiary}`}
        style={{ ...at(467, 176, { width: 100, textAlign: "center" }), ...play("mm-fade", 1600) }}
      >
        survivorship
      </span>
      <HLine x={526} y={160} w={78} color={C.blueLine} delay={1700} />

      <div
        className={`${styles.panel} ${styles.panelBlueBorder}`}
        style={{
          ...at(604, 58, { width: 300 }),
          ...play("mm-slide", 1800, 600),
          overflow: "hidden",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px 0" }}>
          <span className={`${styles.eyebrow} ${styles.textBlue}`}>Golden record</span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "9.5px", color: "rgb(var(--tertiary-text))" }}>CU-9042</span>
        </div>
        <div style={{ padding: "4px 16px 10px", fontSize: "16px", fontWeight: 600, letterSpacing: "-0.025em", color: "rgb(var(--primary-text))" }}>
          Largest retail customer
        </div>
        {fields.map((f, i) => (
          <div
            key={f.k}
            style={{
              display: "grid",
              gridTemplateColumns: "58px 1fr auto",
              alignItems: "baseline",
              columnGap: "12px",
              borderTop: "1px solid rgb(var(--card-line))",
              padding: "7px 16px",
              ...play("mm-slide", 2150 + i * 220, 460),
            }}
          >
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "9.5px", color: "rgb(var(--tertiary-text))" }}>{f.k}</span>
            <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontSize: "12px", color: "rgb(var(--primary-text))" }}>{f.v}</span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "rgb(var(--blue))" }}>{f.why}</span>
          </div>
        ))}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            borderTop: "1px solid rgb(var(--card-line))",
            padding: "8px 16px",
            fontSize: "10.5px",
            color: "rgb(var(--secondary-text))",
            ...play("mm-fade", 2900),
          }}
        >
          <span className={styles.softpulse} style={{ height: "6px", width: "6px", borderRadius: "9999px", background: "rgb(var(--positive))" }} />
          Confidence 0.98 · 3 sources · steward approved
        </div>
      </div>

      <span
        style={{
          ...at(58, 272),
          ...play("mm-fade", 3700),
          fontFamily: "var(--font-mono)",
          fontSize: "9.5px",
          color: "rgb(var(--tertiary-text))",
        }}
      >
        2 superseded · lineage kept
      </span>
    </>
  );
}

/* 03 Warehouse: one star schema, one metric, every surface */
export function WarehouseMoment() {
  const dims = [
    { x: 40, y: 58, name: "Customer", rows: "12,447" },
    { x: 40, y: 222, name: "Region", rows: "5" },
    { x: 372, y: 58, name: "Product", rows: "3,412" },
    { x: 372, y: 222, name: "Date", rows: "1,096" },
  ];
  const links = [
    { d: "M168 78 L 236 126", one: [176, 70], n: [222, 108] },
    { d: "M168 242 L 236 194", one: [176, 246], n: [222, 202] },
    { d: "M372 78 L 306 126", one: [356, 70], n: [312, 108] },
    { d: "M372 242 L 306 194", one: [356, 246], n: [312, 202] },
  ];
  const surfaces = [
    { y: 116, name: "Business Intelligence", meta: "Sales Overview" },
    { y: 160, name: "Ask Akashic", meta: "answers" },
    { y: 204, name: "Machine Learning", meta: "demand_forecast" },
  ];
  return (
    <>
      <svg aria-hidden width={960} height={320} style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}>
        {links.map((l, i) => (
          <g key={l.d} style={play("mm-fade", 500 + i * 120, 600)}>
            <path d={l.d} stroke={C.mute} strokeWidth={1} fill="none" />
            <text x={l.one[0]} y={l.one[1]} fill="rgb(var(--tertiary-text))" fontFamily="var(--font-mono)" fontSize="9">1</text>
            <text x={l.n[0]} y={l.n[1]} fill="rgb(var(--tertiary-text))" fontFamily="var(--font-mono)" fontSize="9">N</text>
          </g>
        ))}
      </svg>
      {dims.map((d, i) => (
        <div
          key={d.name}
          style={{
            ...at(d.x, d.y, { width: 128, height: 40 }),
            ...play("mm-slide", 150 + i * 110),
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderRadius: "8px",
            border: "1px solid rgb(var(--card-line))",
            background: "rgb(var(--screen-surface))",
            paddingInline: "12px",
          }}
        >
          <span style={{ fontSize: "12px", fontWeight: 500, color: "rgb(var(--primary-text))" }}>{d.name}</span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "9.5px", color: "rgb(var(--tertiary-text))" }}>{d.rows}</span>
        </div>
      ))}
      <div
        className={styles.panel}
        style={{
          ...at(196, 126, { width: 150, height: 68 }),
          ...play("mm-fade", 350, 600),
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          paddingInline: "16px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: "14px", fontWeight: 600, color: "rgb(var(--primary-text))" }}>Sales</span>
          <span style={{ borderRadius: "4px", background: "rgb(var(--blue-subtle))", padding: "2px 6px", fontFamily: "var(--font-mono)", fontSize: "8.5px", color: "rgb(var(--blue))" }}>FACT</span>
        </div>
        <span style={{ marginTop: "4px", fontFamily: "var(--font-mono)", fontSize: "9.5px", color: "rgb(var(--tertiary-text))" }}>82,401 rows</span>
      </div>

      <HLine x={346} y={160} w={214} color={C.blueLine} delay={1100} />
      <Flow x={350} y={160} run={196} n={2} dur={2600} delay={1300} />

      <div
        className={`${styles.panel} ${styles.panelBlueBorder}`}
        style={{
          ...at(560, 92, { width: 200 }),
          ...play("mm-slide", 1300, 600),
          overflow: "hidden",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px 0" }}>
          <span className={`${styles.eyebrow} ${styles.textBlue}`}>Metric</span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "rgb(var(--tertiary-text))" }}>verified · v1.4</span>
        </div>
        <div style={{ padding: "6px 16px 0", fontSize: "16px", fontWeight: 600, letterSpacing: "-0.025em", color: "rgb(var(--primary-text))" }}>Revenue</div>
        <div style={{ padding: "4px 16px 0", fontFamily: "var(--font-mono)", fontSize: "12px", color: "rgb(var(--primary-text))" }}>= Σ paid value</div>
        <div style={{ marginTop: "10px", borderTop: "1px solid rgb(var(--card-line))", padding: "8px 16px", fontFamily: "var(--font-mono)", fontSize: "9.5px", color: "rgb(var(--tertiary-text))" }}>
          grain · one completed sale
        </div>
      </div>

      {surfaces.map((s, i) => (
        <Fragment key={s.name}>
          <HLine x={760} y={s.y} w={200} fade="out" color={C.blueLine} delay={2000 + i * 200} />
          <Flow x={764} y={s.y} run={196} n={2} dur={2800} delay={2300 + i * 260} />
          <Tag name={s.name} meta={s.meta} upper={false} stack style={{ ...at(790, s.y - 28), ...play("mm-fade", 2100 + i * 200) }} />
        </Fragment>
      ))}
    </>
  );
}

/* 04 ML: runs compete on the holdout, the winner forecasts */
export function MlMoment() {
  const runs = [
    { id: "#19", mape: "9.8%", pts: "410,192 450,150 490,148 530,128 560,122" },
    { id: "#22", mape: "7.4%", pts: "410,192 450,160 490,162 530,142 560,136" },
    { id: "#23", mape: "6.9%", pts: "410,192 450,166 490,170 530,150 560,146" },
    { id: "#24", mape: "6.2%", pts: "410,192 450,172 490,177 530,159 560,154", best: true },
  ];
  const months = ["July", "August", "September", "October", "November", "December"];
  return (
    <>
      <div
        className={`${styles.eyebrow} ${styles.textTertiary}`}
        style={{ ...at(64, 74, { width: 150 }), ...play("mm-fade", 600) }}
      >
        Runs · forecast error
      </div>
      {runs.map((r, i) => (
        <div
          key={r.id}
          style={{
            ...at(64, 96 + i * 22, { width: 160 }),
            ...play("mm-slide", 1000 + i * 420, 420),
            display: "flex",
            alignItems: "center",
            gap: "12px",
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
          }}
        >
          <span style={{ color: r.best ? "rgb(var(--blue))" : "rgb(var(--tertiary-text))" }}>{r.id}</span>
          <span style={{ fontWeight: r.best ? 600 : 400, color: r.best ? "rgb(var(--primary-text))" : "rgb(var(--secondary-text))" }}>{r.mape}</span>
          {r.best && <span style={{ borderRadius: "4px", background: "rgb(var(--positive-subtle))", padding: "2px 6px", fontSize: "8.5px", color: "rgb(var(--positive-text))" }}>live</span>}
        </div>
      ))}
      <HLine x={0} y={248} w={246} fade="in" delay={200} />
      <Flow x={-10} y={248} run={250} n={3} dur={3000} />
      <Tag name="Feature store" meta="42 governed features" style={{ ...at(64, 231), ...play("mm-fade", 300) }} />

      <svg aria-hidden width={960} height={320} style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}>
        <rect x={410} y={48} width={150} height={214} fill="rgb(var(--tertiary-bg) / 0.7)" style={play("mm-fade", 600, 600)} />
        <text x={416} y={62} fill="rgb(var(--tertiary-text))" fontFamily="var(--font-mono)" fontSize="8.5" letterSpacing="0.1em" style={play("mm-fade", 700)}>TEST PERIOD · 12 WEEKS</text>
        <line x1={250} y1={262} x2={750} y2={262} stroke={C.mute} strokeWidth={1} style={play("mm-fade", 100)} />
        {months.map((m, i) => (
          <text key={m} x={250 + i * 100} y={278} textAnchor="middle" fill="rgb(var(--tertiary-text))" fontFamily="var(--font-mono)" fontSize="9" style={play("mm-fade", 150)}>{m}</text>
        ))}
        <polyline points="250,214 290,200 330,207 370,186 410,192 450,174 490,180 530,162 560,156" fill="none" stroke="rgb(var(--primary-text))" strokeWidth={1.75} strokeLinejoin="round" style={play("mm-fade", 250, 600)} />
        {runs.map((r, i) => (
          <polyline
            key={r.id}
            points={r.pts}
            fill="none"
            stroke={r.best ? C.blue : C.mute}
            strokeWidth={r.best ? 1.5 : 1}
            strokeDasharray={r.best ? undefined : "3 3"}
            strokeLinejoin="round"
            style={play("mm-fade", 1000 + i * 420, 500)}
          />
        ))}
        <line x1={560} y1={44} x2={560} y2={262} stroke={C.blueLine} strokeDasharray="2 3" style={play("mm-fade", 2700)} />
        <text x={566} y={52} fill="rgb(var(--blue))" fontFamily="var(--font-mono)" fontSize="9" style={play("mm-fade", 2700)}>today</text>
        <polygon points="560,156 750,100 750,164" fill="rgb(var(--blue) / 0.1)" style={{ transformBox: "fill-box", transformOrigin: "left center", ...play("progressFill", 2950, 900) }} />
        <polyline points="560,156 750,132" fill="none" stroke={C.blue} strokeWidth={1.75} strokeDasharray="5 4" style={play("mm-fade", 3100)} />
      </svg>
      <span
        style={{
          ...at(762, 120),
          ...play("mm-slide", 3500),
          borderRadius: "6px",
          border: "1px solid rgb(var(--card-line))",
          background: "rgb(var(--screen-surface))",
          padding: "4px 8px",
          fontSize: "11px",
          fontWeight: 500,
          color: "rgb(var(--primary-text))",
        }}
      >
        ≈12,400 units next quarter
      </span>

      <HLine x={754} y={236} w={206} fade="out" color={C.blueLine} delay={3700} />
      <Flow x={758} y={236} run={200} n={2} dur={2600} delay={3900} />
      <Tag name="Model 3 in use" meta="1.2 million forecasts a day" upper={false} stack style={{ ...at(776, 205), ...play("mm-fade", 3800) }} />
    </>
  );
}

/* 05 Ask Akashic: the answer as annotated text */
function Cited({ children, n, delay }: { children: ReactNode; n: number; delay: number }) {
  return (
    <>
      <span style={{ position: "relative", whiteSpace: "nowrap" }}>
        {children}
        <span
          style={{
            position: "absolute",
            bottom: "-1px",
            left: 0,
            right: 0,
            height: "1.5px",
            transformOrigin: "left",
            background: "rgb(var(--blue))",
            ...play("progressFill", delay, 600),
          }}
        />
      </span>
      <sup
        style={{
          marginLeft: "2px",
          fontFamily: "var(--font-mono)",
          fontSize: "10px",
          fontWeight: 600,
          color: "rgb(var(--blue))",
          ...play("mm-fade", delay + 300),
        }}
      >
        {n}
      </sup>
    </>
  );
}

const CHANNELS = [
  { name: "Direct", pct: 46 },
  { name: "Partner", pct: 32 },
  { name: "Online", pct: 22, answer: true },
];

export function AskMoment() {
  const X = 236;
  return (
    <>
      <div className={`${styles.eyebrow} ${styles.textTertiary}`} style={{ ...at(X, 34, { width: 360 }), ...play("mm-fade", 0) }}>
        Ask Akashic · Sales Performance
      </div>
      <div style={{ ...at(X, 54, { width: 360 }), fontSize: "14px", lineHeight: 1.35, color: "rgb(var(--secondary-text))" }}>
        <Typed text="Which channel is growing fastest this quarter?" start={250} step={22} />
      </div>
      <span style={{ ...at(X, 84, { width: 360, height: 1 }), ...play("mm-fade", 200), background: "rgb(var(--card-line))" }} />

      <p style={{ ...at(X, 98, { width: 360 }), ...play("mm-slide", 1500, 600), fontSize: "16px", lineHeight: 1.55, letterSpacing: "-0.005em", color: "rgb(var(--primary-text))" }}>
        Online is your fastest-growing channel, <Cited n={1} delay={2300}>up 18% quarter on quarter</Cited> and now <Cited n={2} delay={2700}>22% of revenue</Cited>.
      </p>

      <span style={{ ...at(X, 196, { width: 360, height: 1, transformOrigin: "left" }), ...play("progressFill", 3000, 600), background: "rgb(var(--card-line))" }} />
      {[
        { n: "1", t: "net_revenue · gold · warehouse" },
        { n: "2", t: "share = channel_revenue ÷ net_revenue" },
      ].map((f, i) => (
        <div key={f.n} style={{ ...at(X, 208 + i * 20, { width: 360 }), ...play("mm-slide", 3200 + i * 180, 420), display: "flex", gap: "10px", fontFamily: "var(--font-mono)", fontSize: "10px" }}>
          <span style={{ fontWeight: 600, color: "rgb(var(--blue))" }}>{f.n}</span>
          <span style={{ color: "rgb(var(--secondary-text))" }}>{f.t}</span>
        </div>
      ))}
      <div style={{ ...at(X, 258), ...play("mm-fade", 3700), display: "flex", alignItems: "center", gap: "6px", fontSize: "10.5px", color: "rgb(var(--tertiary-text))" }}>
        <span className={styles.softpulse} style={{ height: "6px", width: "6px", borderRadius: "9999px", background: "rgb(var(--positive))" }} />
        Row-level access applied · answered in 1.4s
      </div>

      <HLine x={0} y={214} w={X - 12} fade="in" delay={3300} />
      <HLine x={0} y={234} w={X - 12} fade="in" delay={3480} />
      <Flow x={-10} y={214} run={X} n={2} dur={2800} delay={3500} />
      <Flow x={-10} y={234} run={X} n={2} dur={2800} delay={3900} />

      <div style={{ ...at(650, 104, { width: 250 }), ...play("mm-fade", 1900) }}>
        <div className={`${styles.eyebrow} ${styles.textTertiary}`}>Share of $25.4 million this quarter</div>
        <div style={{ marginTop: "12px", display: "flex", height: "8px", gap: "3px" }}>
          {CHANNELS.map((c, i) => (
            <span
              key={c.name}
              style={{
                display: "block",
                height: "100%",
                transformOrigin: "left",
                borderRadius: "9999px",
                width: `${c.pct}%`,
                background: c.answer ? "rgb(var(--blue))" : "rgb(var(--tertiary-text) / 0.3)",
                ...play("progressFill", 2100 + i * 160, 520),
              }}
            />
          ))}
        </div>
        <div style={{ marginTop: "12px", display: "flex", flexDirection: "column", gap: "6px" }}>
          {CHANNELS.map((c, i) => (
            <div key={c.name} style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", fontSize: "12px", ...play("mm-slide", 2300 + i * 140, 420) }}>
              <span style={{ fontWeight: c.answer ? 500 : 400, color: c.answer ? "rgb(var(--primary-text))" : "rgb(var(--secondary-text))" }}>{c.name}</span>
              <span style={{ display: "flex", alignItems: "baseline", gap: "8px", fontFamily: "var(--font-mono)", fontSize: "11px" }}>
                {c.answer && <span style={{ fontSize: "10px", color: "rgb(var(--positive-text))" }}>+18% this quarter</span>}
                <span style={{ fontWeight: c.answer ? 600 : 400, color: c.answer ? "rgb(var(--blue))" : "rgb(var(--secondary-text))" }}>{c.pct}%</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

/* 06 BI: a tile is built, and lands on a withheld dashboard */
const PLAN_D = "M0 44 L18 40 L36 38 L54 33 L72 30 L90 26 L108 24 L126 20 L144 17 L162 14 L180 11 L200 8";
const ACTUAL_D = "M0 52 L18 46 L36 48 L54 40 L72 43 L90 34 L108 38 L126 30 L144 35 L162 26 L180 30 L200 22";

export function TileChart({ height, delay, axis = true }: { height: number; delay: number; axis?: boolean }) {
  return (
    <svg viewBox="0 0 200 80" preserveAspectRatio="none" style={{ display: "block", width: "100%", height }} aria-hidden>
      {axis && [20, 40, 60].map((y) => (
        <line key={y} x1={0} y1={y} x2={200} y2={y} stroke="rgb(var(--tertiary-bg))" strokeWidth={1} vectorEffect="non-scaling-stroke" />
      ))}
      <path d={PLAN_D} fill="none" stroke="rgb(var(--tertiary-text))" strokeWidth={1.4} strokeDasharray="4 3" vectorEffect="non-scaling-stroke" style={play("mm-fade", delay, 500)} />
      <path d={`${ACTUAL_D} L200 80 L0 80 Z`} fill="rgb(var(--blue) / 0.1)" style={play("mm-fade", delay + 600, 600)} />
      <path d={ACTUAL_D} fill="none" stroke="rgb(var(--blue))" strokeWidth={1.8} strokeLinejoin="round" vectorEffect="non-scaling-stroke" style={play("mm-fade", delay + 300, 500)} />
    </svg>
  );
}

export function BiMoment() {
  return (
    <>
      <div className={`${styles.eyebrow} ${styles.textTertiary}`} style={{ ...at(48, 96, { width: 290 }), ...play("mm-fade", 0) }}>
        Ask Akashic · Sales Overview
      </div>
      <div style={{ ...at(48, 116, { width: 290 }), fontSize: "13.5px", color: "rgb(var(--primary-text))" }}>
        <Typed text="Add a tile: revenue against plan, weekly" start={200} step={24} />
      </div>
      <span style={{ ...at(48, 142, { width: 290, height: 1 }), ...play("mm-fade", 100), background: "rgb(var(--card-line))" }} />
      {["net_revenue · gold", "plan_attainment · target 100%"].map((m, i) => (
        <span
          key={m}
          style={{
            ...at(48 + i * 116, 156),
            ...play("mm-fade", 1150 + i * 160),
            display: "inline-block",
            borderRadius: "9999px",
            border: "1px solid rgb(var(--card-line))",
            background: "rgb(var(--screen-surface))",
            padding: "3px 8px",
            fontFamily: "var(--font-mono)",
            fontSize: "9px",
            color: "rgb(var(--secondary-text))",
          }}
        >
          {m}
        </span>
      ))}
      <HLine x={0} y={124} w={40} fade="in" delay={100} />
      <HLine x={338} y={163} w={36} color={C.blueLine} delay={1300} />

      <div
        className={styles.panel}
        style={{
          ...at(374, 60, { width: 268 }),
          ...play("mm-slide", 1350, 600),
          padding: "12px 16px",
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
          <span style={{ fontSize: "12.5px", fontWeight: 600, color: "rgb(var(--primary-text))" }}>Revenue against plan</span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "rgb(var(--tertiary-text))" }}>$ million · weekly</span>
        </div>
        <div style={{ position: "relative", marginTop: "12px", height: "124px" }}>
          {[["2.4", "25%"], ["1.6", "50%"], ["0.8", "75%"]].map(([v, top]) => (
            <span key={v} style={{ position: "absolute", left: 0, transform: "translateY(-50%)", fontFamily: "var(--font-mono)", fontSize: "8px", color: "rgb(var(--tertiary-text))", top }}>
              {v}
            </span>
          ))}
          <div style={{ position: "absolute", insetBlock: 0, left: "36px", right: "36px" }}>
            <TileChart height={124} delay={1800} />
          </div>
          <span style={{ position: "absolute", right: 0, fontFamily: "var(--font-mono)", fontSize: "8.5px", color: "rgb(var(--tertiary-text))", top: "6%", ...play("mm-fade", 2100) }}>
            plan
          </span>
          <span style={{ position: "absolute", right: 0, fontFamily: "var(--font-mono)", fontSize: "8.5px", fontWeight: 500, color: "rgb(var(--blue))", top: "24%", ...play("mm-fade", 2400) }}>
            actual
          </span>
        </div>
        <div style={{ marginLeft: "36px", marginRight: "36px", marginTop: "6px", display: "flex", justifyContent: "space-between", fontFamily: "var(--font-mono)", fontSize: "8.5px", color: "rgb(var(--tertiary-text))" }}>
          {["Week 1", "Week 4", "Week 8", "Week 12"].map((w) => (
            <span key={w}>{w}</span>
          ))}
        </div>
      </div>

      <div
        style={{
          ...at(690, 70, { width: 232, height: 180 }),
          ...play("mm-fade", 900, 600),
          borderRadius: "12px",
          border: "1px dashed rgb(var(--default-stroke))",
          padding: "12px",
        }}
      >
        <div className={`${styles.eyebrow} ${styles.textTertiary}`} style={{ marginBottom: "10px" }}>Sales Overview</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "8px" }}>
          <div
            className={`${styles.panel} ${styles.panelBlueBorder}`}
            style={{
              position: "relative",
              height: "62px",
              overflow: "hidden",
              borderRadius: "8px",
              padding: "6px",
              "--dx": "-300px",
              "--dy": "10px",
              "--s": "2.6",
              ...play("mm-land", 3000, 800),
            } as CSSProperties}
          >
            <TileChart height={46} delay={3400} axis={false} />
          </div>
          {[0, 1, 2].map((i) => (
            <div key={i} style={{ height: "62px", borderRadius: "8px", border: "1px dashed rgb(var(--default-stroke) / 0.8)" }} />
          ))}
        </div>
      </div>
      <HLine x={922} y={160} w={38} fade="out" delay={3600} />
    </>
  );
}

/* 07 Governance: traced in, traced out, masked by role */
export function GovernanceMoment() {
  const ins = [
    { y: 116, name: "sf.orders", meta: "Salesforce", c: C.sf },
    { y: 156, name: "ns.invoices", meta: "NetSuite", c: C.ns },
  ];
  const outs = [
    { y: 110, name: "tableau_sales", meta: "dashboard" },
    { y: 160, name: "demand_forecast", meta: "model" },
    { y: 210, name: "finance_ledger", meta: "table" },
  ];
  const rowStyle: CSSProperties = {
    display: "grid",
    gridTemplateColumns: "64px 1fr 124px",
    alignItems: "center",
    columnGap: "12px",
    borderTop: "1px solid rgb(var(--card-line))",
    padding: "10px 16px",
  };
  return (
    <>
      {ins.map((l, i) => (
        <Fragment key={l.name}>
          <HLine x={0} y={l.y} w={306} fade="in" delay={i * 100} />
          <Flow x={-10} y={l.y} run={312} n={3} dur={3200} kind="capsule" color={l.c} delay={i * 400} />
          <Tag name={l.name} meta={l.meta} color={l.c} upper={false} style={{ ...at(84, l.y - 17), ...play("mm-fade", 150 + i * 120) }} />
        </Fragment>
      ))}

      <div
        className={styles.panel}
        style={{
          ...at(310, 66, { width: 340 }),
          ...play("mm-slide", 300, 600),
          overflow: "hidden",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 16px" }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", fontWeight: 600, color: "rgb(var(--primary-text))" }}>
            fact_sales <span style={{ fontWeight: 400, color: "rgb(var(--tertiary-text))" }}>· gold</span>
          </span>
          <span style={{ borderRadius: "4px", background: "rgb(var(--blue-subtle))", padding: "2px 6px", fontFamily: "var(--font-mono)", fontSize: "8.5px", color: "rgb(var(--blue))" }}>Tier 1</span>
        </div>
        <div
          className={styles.eyebrow}
          style={{
            display: "grid",
            gridTemplateColumns: "64px 1fr 124px",
            columnGap: "12px",
            borderTop: "1px solid rgb(var(--card-line))",
            padding: "6px 16px",
            color: "rgb(var(--tertiary-text))",
          }}
        >
          <span>Seen by</span>
          <span>customer</span>
          <span>tax_id</span>
        </div>
        <div style={{ ...rowStyle, ...play("mm-slide", 700, 420) }}>
          <span style={{ width: "fit-content", borderRadius: "4px", background: "rgb(var(--tertiary-bg))", padding: "2px 6px", fontSize: "10px", color: "rgb(var(--secondary-text))" }}>Finance</span>
          <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontSize: "12px", color: "rgb(var(--primary-text))" }}>Account #4471</span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "rgb(var(--primary-text))" }}>94-2404110</span>
        </div>
        <div style={{ ...rowStyle, ...play("mm-slide", 900, 420) }}>
          <span style={{ width: "fit-content", borderRadius: "4px", background: "rgb(var(--tertiary-bg))", padding: "2px 6px", fontSize: "10px", color: "rgb(var(--secondary-text))" }}>Analyst</span>
          <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontSize: "12px", color: "rgb(var(--primary-text))" }}>Account #4471</span>
          <span style={{ position: "relative", display: "flex", alignItems: "center", gap: "8px", fontFamily: "var(--font-mono)", fontSize: "11px" }}>
            <span style={{ position: "relative" }}>
              <span style={{ color: "rgb(var(--primary-text))", ...play("mm-out", 1900, 300) }}>94-2404110</span>
              <span style={{ position: "absolute", left: 0, top: 0, color: "rgb(var(--tertiary-text))", ...play("mm-fade", 2100, 300) }}>••-•••••••</span>
            </span>
            <span style={{ borderRadius: "4px", background: "rgb(var(--red) / 0.1)", padding: "1px 4px", fontSize: "8.5px", color: "rgb(var(--red))", ...play("mm-slide", 2400, 360) }}>masked</span>
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "6px", borderTop: "1px solid rgb(var(--card-line))", padding: "8px 16px", fontSize: "10.5px", color: "rgb(var(--secondary-text))", ...play("mm-fade", 2700) }}>
          <span className={styles.softpulse} style={{ height: "6px", width: "6px", borderRadius: "9999px", background: "rgb(var(--positive))" }} />
          Row-level security · 4,211 events audited
        </div>
      </div>

      {outs.map((o, i) => (
        <Fragment key={o.name}>
          <HLine x={650} y={o.y} w={310} fade="out" color={C.blueLine} delay={1300 + i * 160} />
          <Flow x={654} y={o.y} run={306} n={2} dur={3000} delay={1600 + i * 300} />
          <Tag name={o.name} meta={o.meta} upper={false} style={{ ...at(700, o.y - 17), ...play("mm-fade", 1400 + i * 160) }} />
        </Fragment>
      ))}
    </>
  );
}

export type Moment = {
  module: string;
  caption: string;
  focus: number;
  Draw: () => ReactNode;
};

export const MOMENTS: Moment[] = [
  { module: "Data Pipelines", caption: "Three sources join into one governed table. Nothing rejected.", focus: 700, Draw: PipelinesMoment },
  { module: "Master Data", caption: "Three records, one customer. Every field keeps its source.", focus: 754, Draw: MasterDataMoment },
  { module: "Data Warehouse", caption: "A metric defined once. Dashboards, answers and forecasts all read the same one.", focus: 640, Draw: WarehouseMoment },
  { module: "Machine Learning", caption: "Models are tested on past data. The most accurate one makes the forecast.", focus: 600, Draw: MlMoment },
  { module: "Ask Akashic", caption: "Plain questions, answered from governed metrics, every figure cited.", focus: 416, Draw: AskMoment },
  { module: "Business Intelligence", caption: "Ask for a chart. It is built on the agreed figures and lands on the dashboard.", focus: 508, Draw: BiMoment },
  { module: "Governance", caption: "Every field traced to its source. Private details hidden by role.", focus: 480, Draw: GovernanceMoment },
];
