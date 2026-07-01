"use client";

/**
 * SIMULATED PRODUCT UI — not real Akashic app code.
 * Self-contained "Business Intelligence" module card mockup for
 * PowerfulPlatform's Explore & Ask row: filter chips, rose chart, and
 * top/average/low stat tiles, all driven by fake local `biFilter` state.
 * No real data source — the ROSE figures below are hardcoded for visual
 * storytelling only.
 */

import { useState } from "react";
import { ModIcon } from "@/components/demos/mockups/PlatformConnectors";

type FilterKey = "Region" | "Product" | "Channel";

const ROSE: Record<FilterKey, { k: string; v: number }[]> = {
  Region: [{ k: "North", v: 101 }, { k: "West", v: 96 }, { k: "Central", v: 88 }, { k: "South", v: 71 }, { k: "East", v: 82 }, { k: "Pacific", v: 90 }],
  Product: [{ k: "Core", v: 112 }, { k: "Pro", v: 97 }, { k: "Ent", v: 88 }, { k: "Add-ons", v: 73 }, { k: "Service", v: 90 }, { k: "Legacy", v: 61 }],
  Channel: [{ k: "Direct", v: 104 }, { k: "Partner", v: 83 }, { k: "Online", v: 96 }, { k: "Reseller", v: 70 }, { k: "OEM", v: 67 }, { k: "Market", v: 88 }],
};

const band = (v: number) => v < 70 ? "#E98AA0" : v < 85 ? "#F0B27A" : v < 100 ? "#E7CF66" : v < 108 ? "#86C98E" : "#4FB06A";

function buildRose(biFilter: FilterKey) {
  const data = ROSE[biFilter];
  const cx = 140, cy = 138, inner = 19, maxR = 86, ceil = 120;
  const n = data.length, step = 360 / n, gap = 2.4;
  const P = (deg: number, rad: number) => {
    const x = cx + rad * Math.cos(deg * Math.PI / 180);
    const y = cy + rad * Math.sin(deg * Math.PI / 180);
    return [Number(x.toFixed(4)), Number(y.toFixed(4))];
  };
  const els: React.ReactNode[] = [];
  [60, 90].forEach((g, gi) => {
    const r = inner + (maxR - inner) * g / ceil;
    els.push(<circle key={"g" + gi} cx={cx} cy={cy} r={Number(r.toFixed(4))} fill="none" stroke="#ECECEF" strokeWidth={1} strokeDasharray="2 3" />);
  });
  const tr = inner + (maxR - inner) * 100 / ceil;
  els.push(<circle key="tgt" cx={cx} cy={cy} r={Number(tr.toFixed(4))} fill="none" stroke="#8A8F99" strokeWidth={1.2} strokeDasharray="4 3" />);
  data.forEach((d, i) => {
    const a0 = -90 + i * step + gap / 2, a1 = -90 + (i + 1) * step - gap / 2;
    const r = inner + (maxR - inner) * Math.min(d.v, ceil) / ceil;
    const o0 = P(a0, r), o1 = P(a1, r), i0 = P(a0, inner), i1 = P(a1, inner);
    const path = "M" + i0[0] + "," + i0[1] + " L" + o0[0] + "," + o0[1] +
      " A" + r.toFixed(4) + "," + r.toFixed(4) + " 0 0 1 " + o1[0] + "," + o1[1] +
      " L" + i1[0] + "," + i1[1] + " A" + inner + "," + inner + " 0 0 0 " + i0[0] + "," + i0[1] + " Z";
    els.push(<path key={"w" + i} d={path} fill={band(d.v)} stroke="#fff" strokeWidth={1.5} opacity={0.95} />);
  });
  data.forEach((d, i) => {
    const am = -90 + (i + 0.5) * step;
    const lp = P(am, maxR + 19);
    els.push(<text key={"n" + i} x={lp[0]} y={lp[1] - 3} textAnchor="middle" fontSize={9.5} fontWeight={600} fill="#16181D" style={{ fontFamily: "Inter,sans-serif" }}>{d.k}</text>);
    els.push(<text key={"v" + i} x={lp[0]} y={lp[1] + 8} textAnchor="middle" fontSize={9} fontWeight={600} fill={d.v >= 100 ? "#1B7A47" : "#B0526A"} style={{ fontFamily: "ui-monospace,monospace" }}>{d.v + "%"}</text>);
  });
  els.push(<circle key="hub" cx={cx} cy={cy} r={inner - 3} fill="#fff" stroke="#ECECEF" strokeWidth={1} />);
  return <svg viewBox="0 0 280 276" style={{ width: "100%", height: "auto", display: "block" }}>{els}</svg>;
}

const chip = (active: boolean) => ({
  display: "inline-block" as const, textAlign: "center" as const, fontSize: "10.5px", fontWeight: 600, padding: "5px 12px",
  borderRadius: "6px", cursor: "pointer", userSelect: "none" as const,
  color: active ? "#FFFFFF" : "#6E6F71",
  background: active ? "#3E63DD" : "transparent",
  transition: "color .2s ease, background .2s ease",
});

export default function PlatformBIChartMockup({ id }: { id?: string }) {
  const [biFilter, setBiFilter] = useState<FilterKey>("Region");

  const data = ROSE[biFilter];
  let top = data[0], low = data[0], sum = 0;
  data.forEach((d) => { sum += d.v; if (d.v > top.v) top = d; if (d.v < low.v) low = d; });
  const avg = Math.round(sum / data.length);

  return (
    <div className="ps-mc" id={id} style={{ flex: 1, minWidth: 0 }}>
      <div className="ps-mc-hd">
        <ModIcon text="Akashic BI" />
        <span style={{ fontSize: "14px", fontWeight: "600", color: "#1A1C1D", flex: 1, letterSpacing: "-0.01em" }}>Business Intelligence</span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: "5px", padding: "4px 9px", background: "#E1F5EB", border: "1px solid #A2E0C1", borderRadius: "7px" }}>
          <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#30A46C", animation: "ps-pulse 2s infinite" }} />
          <span style={{ fontSize: "9.5px", color: "#1B7A47", fontWeight: "700" }}>Live</span>
        </span>
      </div>
      <div style={{ padding: "12px 17px 17px", display: "flex", flexDirection: "column", gap: "12px" }}>
        {/* Filter row */}
        <div style={{ display: "flex", alignItems: "center", gap: "9px", flexWrap: "wrap" }}>
          <div style={{ display: "flex", background: "#F1F1F4", borderRadius: "8px", padding: "2px" }}>
            <span onClick={() => setBiFilter("Region")} style={chip(biFilter === "Region")}>Region</span>
            <span onClick={() => setBiFilter("Product")} style={chip(biFilter === "Product")}>Product</span>
            <span onClick={() => setBiFilter("Channel")} style={chip(biFilter === "Channel")}>Channel</span>
          </div>
          <span style={{ fontFamily: "ui-monospace,monospace", fontSize: "9.5px", color: "#7C828C", background: "#F6F6F8", border: "1px solid #EEEEF3", borderRadius: "6px", padding: "4px 9px" }}>Q2 &middot; FY26</span>
          <span style={{ fontSize: "11px", color: "#86888F", marginLeft: "auto" }}>Attainment vs target</span>
        </div>
        {/* Chart + stats */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", flex: 1, minHeight: 0 }}>
          <div style={{ width: "54%", flexShrink: 0 }}>{buildRose(biFilter)}</div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "8px" }}>

            {/* TOP PERFORMER */}
            <div style={{ border: "1px solid #EEEEF3", borderRadius: "9px", padding: "9px 11px", background: "#FBFBFE" }}>
              <div style={{ fontSize: "9px", fontFamily: "ui-monospace,monospace", letterSpacing: "0.06em", color: "#9A9AA0" }}>TOP PERFORMER</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: "6px", marginTop: "3px" }}>
                <span style={{ fontSize: "13px", fontWeight: 600, color: "#16181D" }}>{top.k}</span>
                <span style={{ fontSize: "13px", fontWeight: 750, color: "#1B7A47", marginLeft: "auto" }}>{top.v}%</span>
              </div>
            </div>

            {/* AVERAGE */}
            <div style={{ border: "1px solid #EEEEF3", borderRadius: "9px", padding: "9px 11px", background: "#FBFBFE" }}>
              <div style={{ fontSize: "9px", fontFamily: "ui-monospace,monospace", letterSpacing: "0.06em", color: "#9A9AA0" }}>AVERAGE</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: "6px", marginTop: "3px" }}>
                <span style={{ fontSize: "13px", fontWeight: 600, color: "#16181D" }}>All</span>
                <span style={{ fontSize: "13px", fontWeight: 750, color: "#16181D", marginLeft: "auto" }}>{avg}%</span>
              </div>
            </div>

            {/* NEEDS ATTENTION */}
            <div style={{ border: "1.5px solid #F1C7D1", borderRadius: "9px", padding: "9px 11px", background: "linear-gradient(180deg,#FEF5F7,#fff)" }}>
              <div style={{ fontSize: "9px", fontFamily: "ui-monospace,monospace", letterSpacing: "0.06em", color: "#C2546B" }}>NEEDS ATTENTION</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: "6px", marginTop: "3px" }}>
                <span style={{ fontSize: "13px", fontWeight: 600, color: "#16181D" }}>{low.k}</span>
                <span style={{ fontSize: "13px", fontWeight: 750, color: "#C2425F", marginLeft: "auto" }}>{low.v}%</span>
              </div>
            </div>

          </div>
        </div>
        {/* Legend */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", borderTop: "1px solid #F0F0F3", paddingTop: "11px" }}>
          <span style={{ fontSize: "9px", color: "#9A9AA0" }}>Below</span>
          <div style={{ display: "flex", gap: "3px" }}>
            {["#E98AA0", "#F0B27A", "#E7CF66", "#86C98E", "#4FB06A"].map((c) => (
              <span key={c} style={{ width: "18px", height: "9px", borderRadius: "2px", background: c, display: "inline-block" }} />
            ))}
          </div>
          <span style={{ fontSize: "9px", color: "#9A9AA0" }}>Above plan</span>
        </div>
      </div>
    </div>
  );
}
