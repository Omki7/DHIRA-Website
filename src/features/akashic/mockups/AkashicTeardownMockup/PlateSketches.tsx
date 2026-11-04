import { AkashicWordmark } from "@/shared/components/icons";
import { FaceChip } from "./PlateShell";
import {
  ACC,
  FRAG_GRID,
  FRAG_ROTS,
  FRAG_SCATTER,
  H,
  PIPE_SOURCES,
  PIPE_STREAMS,
  W,
  accA,
  inkA,
  mono,
} from "./teardownData";
import styles from "./AkashicTeardownMockup.module.scss";

export function Plate0PipelinesSketch() {
  return (
    <>
      <div style={{ position: "absolute", left: 172, top: 159, width: 216, height: 82, border: `1px dashed ${accA(0.5)}`, borderRadius: 10 }} />
      <div style={{ position: "absolute", left: 185, top: 172, width: 190, height: 56, border: `1px solid rgb(var(--blue-border))`, borderRadius: 6, background: "rgb(var(--blue-subtle))", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "none" }}>
        <span style={{ ...mono, fontSize: 11, fontWeight: 500, letterSpacing: "0.2em", color: ACC }}>INGEST · VALIDATE</span>
      </div>
      {PIPE_SOURCES.map((s) => (
        <FaceChip key={s.label} label={s.label} dot={s.dot} style={s.style} />
      ))}
      <div style={{ position: "absolute", inset: 0 }}>
        {PIPE_STREAMS.flatMap((s, si) =>
          Array.from({ length: 5 }, (_, j) => (
            <span
              key={`${si}-${j}`}
              data-ak-dot
              data-px={s.p[0]} data-py={s.p[1]} data-qx={s.q[0]} data-qy={s.q[1]}
              data-phase={(j / 5 + si * 0.137).toFixed(3)}
              style={{ position: "absolute", left: -2.5, top: -2.5, width: 5.5, height: 5.5, borderRadius: "50%", background: inkA(0.5), opacity: 0 }}
            />
          )),
        )}
      </div>
    </>
  );
}

export function Plate1MasterDataSketch() {
  return (
    <>
      <div style={{ position: "absolute", left: 137, top: 132, width: 296, height: 140, border: `1px dashed ${inkA(0.22)}`, borderRadius: 8 }} />
      <div style={{ position: "absolute", inset: 0 }}>
        {FRAG_SCATTER.map((p, i) => {
          const merge = i >= 10;
          const end = merge ? FRAG_GRID[i === 10 ? 5 : 6] : FRAG_GRID[i];
          return (
            <div
              key={i}
              data-ak-frag
              data-x0={p[0]} data-y0={p[1]} data-x1={end[0]} data-y1={end[1]} data-r0={FRAG_ROTS[i]}
              data-merge={merge ? "1" : "0"}
              style={{ position: "absolute", left: 0, top: 0, width: 52, height: 34, border: `1px solid ${inkA(0.5)}`, borderRadius: 4, background: "rgb(var(--background) / 0.94)", boxSizing: "border-box", padding: "5px 6px", boxShadow: "none" }}
            >
              <div style={{ height: 4, width: `${56 + ((i * 13) % 4) * 8}%`, background: inkA(0.28), borderRadius: 2 }} />
              <div style={{ height: 4, width: `${30 + ((i * 7) % 4) * 8}%`, background: inkA(0.18), borderRadius: 2, marginTop: 5 }} />
            </div>
          );
        })}
        <div
          data-ak="gold"
          style={{ position: "absolute", left: 213, top: 184, width: 52, height: 34, border: `1.5px solid ${ACC}`, borderRadius: 5, background: "rgb(var(--background) / 0.96)", boxSizing: "border-box", padding: "5px 6px", boxShadow: "none", opacity: 0 }}
        >
          <div style={{ height: 4, width: "72%", background: accA(0.55), borderRadius: 2 }} />
          <div style={{ height: 4, width: "46%", background: accA(0.3), borderRadius: 2, marginTop: 5 }} />
        </div>
        <div
          data-ak="goldlab"
          style={{ position: "absolute", left: 0, top: 290, width: "100%", textAlign: "center", ...mono, fontSize: 11, fontWeight: 500, letterSpacing: "0.18em", color: ACC, opacity: 0 }}
        >
          ONE GOLDEN RECORD · LINEAGE KEPT
        </div>
      </div>
    </>
  );
}

export function Plate2WarehouseSketch() {
  return (
    <>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ position: "absolute", inset: 0 }} fill="none">
        <g data-ak="wh-g0" style={{ opacity: 0 }}>
          <path data-ak="wh-l0" d="M210,110 C268,110 272,138 330,138" stroke={ACC} strokeWidth="1.8" />
          <circle cx="210" cy="110" r="2.5" fill={ACC} />
          <circle cx="330" cy="138" r="2.5" fill={ACC} />
        </g>
        <g data-ak="wh-g1" style={{ opacity: 0 }}>
          <path data-ak="wh-l1" d="M415,192 C415,244 322,282 250,282" stroke={ACC} strokeWidth="1.8" />
          <circle cx="415" cy="192" r="2.5" fill={ACC} />
          <circle cx="250" cy="282" r="2.5" fill={ACC} />
        </g>
        <g data-ak="wh-g2" style={{ opacity: 0 }}>
          <path data-ak="wh-l2" d="M135,156 C135,198 175,196 175,236" stroke={ACC} strokeWidth="1.8" />
          <circle cx="135" cy="156" r="2.5" fill={ACC} />
          <circle cx="175" cy="236" r="2.5" fill={ACC} />
        </g>
      </svg>
      {[
        { id: "wh-t0", left: 60, top: 64, w: 150, h: 92, name: "DIM_CUSTOMER", fact: false, cols: ["customer_id", "name", "region"] },
        { id: "wh-t1", left: 330, top: 84, w: 170, h: 108, name: "FCT_ORDERS", fact: true, cols: ["order_id", "customer_id", "net_amount", "order_date"] },
        { id: "wh-t2", left: 100, top: 236, w: 150, h: 92, name: "DIM_VENDOR", fact: false, cols: ["vendor_id", "name", "terms"] },
      ].map((t) => (
        <div
          key={t.id}
          data-ak={t.id}
          style={{ position: "absolute", left: t.left, top: t.top, width: t.w, height: t.h, border: `1px solid ${t.fact ? "rgb(var(--blue-border))" : inkA(0.5)}`, borderRadius: 6, background: "rgb(var(--background) / 0.96)", overflow: "hidden", opacity: 0, boxShadow: "none" }}
        >
          <div style={{ height: 24, borderBottom: `1px solid ${t.fact ? "rgb(var(--blue-border))" : inkA(0.18)}`, background: t.fact ? "rgb(var(--blue-subtle))" : inkA(0.045), display: "flex", alignItems: "center", padding: "0 9px", ...mono, fontSize: 10.5, fontWeight: 600, letterSpacing: "0.08em", color: t.fact ? ACC : inkA(0.88) }}>
            {t.name}
          </div>
          <div style={{ padding: "7px 9px", display: "flex", flexDirection: "column", gap: 4 }}>
            {t.cols.map((col, ci) => (
              <div key={col} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ display: "block", width: 4, height: 4, borderRadius: "50%", background: t.fact && ci === 0 ? accA(0.6) : inkA(0.25), flex: "none" }} />
                <span style={{ ...mono, fontSize: 10, lineHeight: "13px", letterSpacing: "0.02em", color: inkA(0.8) }}>{col}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
      <div style={{ position: "absolute", right: 20, bottom: 16, ...mono, fontSize: 11, fontWeight: 500, letterSpacing: "0.14em", color: inkA(0.78) }}>RELATIONSHIPS BUILT IN</div>
    </>
  );
}

export function Plate3MlSketch() {
  return (
    <>
      <div data-ak="ml-dots" style={{ position: "absolute", inset: 0, opacity: 0 }}>
        {Array.from({ length: 60 }, (_, i) => (
          <span
            key={i}
            style={{ position: "absolute", left: 58 + (i % 10) * 48, top: 78 + Math.floor(i / 10) * 46, width: 3, height: 3, borderRadius: "50%", background: (i * 7) % 4 === 0 ? accA(0.55) : inkA(0.26) }}
          />
        ))}
      </div>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ position: "absolute", inset: 0 }} fill="none">
        <path data-ak="ml-band" d="M452,118 L536,84 L536,116 L452,148 Z" fill={accA(0.1)} style={{ opacity: 0 }} />
        <path data-ak="ml-fit" d="M56,308 C150,296 192,198 292,168 C360,148 418,140 452,132" stroke={inkA(0.82)} strokeWidth="2" />
        <path data-ak="ml-fc" d="M452,132 C486,124 512,112 534,100" stroke={ACC} strokeWidth="2" strokeDasharray="5 5" style={{ opacity: 0 }} />
      </svg>
      <div style={{ position: "absolute", left: 26, top: 22, ...mono, fontSize: 11, fontWeight: 500, letterSpacing: "0.16em", color: inkA(0.8) }}>FORECAST MODEL</div>
      <FaceChip label="DEPLOYED" dot={ACC} style={{ right: 20, top: 16 }} />
      <div style={{ position: "absolute", left: 26, bottom: 20, ...mono, fontSize: 11, fontWeight: 500, letterSpacing: "0.16em", color: inkA(0.78) }}>TRAINED ON GOVERNED DATA · NO EXPORTS</div>
      <div data-ak="ml-fclab" style={{ position: "absolute", right: 22, top: 58, ...mono, fontSize: 10.5, fontWeight: 500, letterSpacing: "0.16em", color: ACC, opacity: 0 }}>FORECAST</div>
    </>
  );
}

export function Plate4AskSketch() {
  return (
    <>
      <div style={{ position: "absolute", left: 100, top: 132, width: 360, height: 56, border: `1px solid rgb(var(--blue-border))`, borderRadius: 10, background: "rgb(var(--background))", boxShadow: "none", display: "flex", alignItems: "center", gap: 11, padding: "0 18px", boxSizing: "border-box" }}>
        <span style={{ display: "block", width: 8, height: 8, borderRadius: "50%", background: ACC, flex: "none" }} />
        <span data-ak="ask-q" style={{ fontSize: 14.5, letterSpacing: "-0.01em", color: "rgb(var(--ink))", whiteSpace: "nowrap", overflow: "hidden" }} />
        <span style={{ display: "block", width: 1.5, height: 20, background: "rgb(var(--ink))", animation: "global(ps-caret-blink) 1.1s step-end infinite" }} />
      </div>
      <div data-ak="ask-a" style={{ position: "absolute", left: 100, top: 206, width: 360, opacity: 0, borderLeft: `2px solid ${accA(0.5)}`, paddingLeft: 14 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, paddingTop: 3 }}>
          <div style={{ height: 5, width: "88%", background: inkA(0.32), borderRadius: 2.5 }} />
          <div style={{ height: 5, width: "62%", background: inkA(0.22), borderRadius: 2.5 }} />
        </div>
        <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 8, ...mono, fontSize: 11, fontWeight: 500, letterSpacing: "0.12em", color: ACC }}>
          <span style={{ display: "block", width: 6, height: 6, borderRadius: "50%", background: ACC }} />
          <span>GROUNDED · LINEAGE VERIFIED · 3 SOURCES</span>
        </div>
      </div>
    </>
  );
}

export function Plate5ExtraWordmark() {
  return (
    <div data-ak="word" style={{ position: "absolute", inset: 0 }}>
      <div style={{ position: "absolute", left: 12, top: 12, bottom: 12, width: 3, borderRadius: 2, background: ACC }} />
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 13 }}>
        <AkashicWordmark className={styles.wordmark} primaryColor="rgb(var(--ink))" />
        <div style={{ ...mono, fontSize: 10.5, letterSpacing: "0.22em", color: "rgb(var(--secondary-text))" }}>UNIFIED DATA &amp; AI PLATFORM</div>
      </div>
      <div style={{ position: "absolute", left: 26, top: 22, ...mono, fontSize: 10, letterSpacing: "0.16em", color: "rgb(var(--secondary-text))" }}>DHIRA · DATA SYSTEMS</div>
      <div style={{ position: "absolute", right: 26, top: 22, ...mono, fontSize: 10, letterSpacing: "0.16em", color: "rgb(var(--secondary-text))" }}>UNIT 07</div>
      <div style={{ position: "absolute", left: 26, bottom: 20, ...mono, fontSize: 10, letterSpacing: "0.16em", color: "rgb(var(--secondary-text))" }}>07 MODULES · ONE FOUNDATION</div>
      <div style={{ position: "absolute", right: 26, bottom: 20, display: "flex", alignItems: "center", gap: 7 }}>
        <span data-ak="faceled" style={{ display: "block", width: 6, height: 6, borderRadius: "50%", background: ACC }} />
        <span style={{ ...mono, fontSize: 10, fontWeight: 500, letterSpacing: "0.16em", color: ACC }}>GOVERNED</span>
      </div>
    </div>
  );
}

export function Plate5BiSketch() {
  return (
    <>
      <div style={{ position: "absolute", left: 36, top: 44, width: 150, height: 112, border: `1px solid ${inkA(0.28)}`, borderRadius: 8, background: "rgb(var(--background) / 0.92)", padding: "12px 14px", boxSizing: "border-box" }}>
        <div style={{ ...mono, fontSize: 10, fontWeight: 500, letterSpacing: "0.1em", color: inkA(0.72) }}>ON-TIME DELIVERY</div>
        <div data-ak="kpi" style={{ marginTop: 12, fontSize: 32, fontWeight: 600, letterSpacing: "-0.02em", color: "rgb(var(--ink))" }}>0.0%</div>
        <div style={{ marginTop: 8, display: "inline-block", padding: "2px 6px", borderRadius: 4, background: "rgb(var(--blue-subtle))", ...mono, fontSize: 10, fontWeight: 500, letterSpacing: "0.08em", color: ACC }}>+2.4 PTS · QTD</div>
      </div>
      <div style={{ position: "absolute", left: 210, top: 44, width: 160, height: 112, border: `1px solid ${inkA(0.28)}`, borderRadius: 8, background: "rgb(var(--background) / 0.92)", padding: "12px 14px", boxSizing: "border-box" }}>
        <div style={{ ...mono, fontSize: 10, fontWeight: 500, letterSpacing: "0.1em", color: inkA(0.72) }}>ORDERS / WEEK</div>
        <div style={{ position: "absolute", left: 14, right: 14, bottom: 12, height: 60, display: "flex", alignItems: "flex-end", gap: 8 }}>
          {[
            { h: 26, c: accA(0.25) },
            { h: 38, c: accA(0.35) },
            { h: 31, c: accA(0.45) },
            { h: 47, c: accA(0.6) },
            { h: 42, c: accA(0.75) },
            { h: 58, c: ACC },
          ].map((bar, j) => (
            <span
              key={j}
              data-ak={`bar-${j}`}
              style={{ display: "block", flex: 1, height: bar.h, background: bar.c, borderRadius: "2px 2px 0 0", transform: "scaleY(0)", transformOrigin: "bottom" }}
            />
          ))}
        </div>
      </div>
      <div style={{ position: "absolute", left: 394, top: 44, width: 130, height: 112, border: `1px solid ${inkA(0.28)}`, borderRadius: 8, background: "rgb(var(--background) / 0.92)", padding: "12px 14px", boxSizing: "border-box" }}>
        <div style={{ ...mono, fontSize: 10, fontWeight: 500, letterSpacing: "0.1em", color: inkA(0.72) }}>MARGIN TREND</div>
        <svg width="102" height="60" viewBox="0 0 102 60" style={{ position: "absolute", left: 14, bottom: 12 }} fill="none">
          <path data-ak="spark" d="M4,48 L22,32 L40,38 L58,18 L76,26 L98,10" stroke={ACC} strokeWidth="2" />
        </svg>
      </div>
      <div style={{ position: "absolute", left: 36, top: 190, width: 488, height: 58, border: "1px solid rgb(var(--blue-border))", borderRadius: 8, background: accA(0.04), display: "flex", alignItems: "center", justifyContent: "center", gap: 10, ...mono, fontSize: 10, fontWeight: 500, letterSpacing: "0.14em", color: inkA(0.75) }}>
        <span style={{ padding: "2px 6px", borderRadius: 4, background: "rgb(var(--blue-subtle))", color: ACC }}>METRIC</span>
        <span>ON_TIME_RATE · DEFINED ONCE · USED EVERYWHERE</span>
      </div>
      <div style={{ position: "absolute", right: 20, bottom: 16, ...mono, fontSize: 11, fontWeight: 500, letterSpacing: "0.14em", color: inkA(0.78) }}>SAME NUMBER · EVERY SURFACE</div>
    </>
  );
}
