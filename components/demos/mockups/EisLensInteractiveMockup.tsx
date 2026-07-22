/*
 * SIMULATED PRODUCT UI — Akashic EIS Interactive Lens Screen Mockup.
 * Sourced from the EIS prototype role model (eis/_Plan_Persona_Roles.html).
 * Interactive features:
 * - Interactive Role Selector (CE, CFO, Head of Delivery)
 * - Live UI Morphing in sky glass theme
 */

"use client";

import { useState } from "react";
import { LiveChip } from "@/components/sections/akashic/AkashicCardChrome";

type RoleId = "ce" | "cfo" | "hd";

type RoleConfig = {
  id: RoleId;
  role: string;
  monogram: string;
  accent: string;
  tint: string;
  question: string;
  kpis: Array<{ label: string; value: string; note: string; tone: string }>;
  primarySignal: {
    title: string;
    account: string;
    exposure: string;
    details: string;
    recommendedAction: string;
  };
  actions: string[];
};

const rolesData: Record<RoleId, RoleConfig> = {
  ce: {
    id: "ce",
    role: "Chief Executive",
    monogram: "CE",
    accent: "#3E63DD",
    tint: "rgba(62,99,221,0.25)",
    question: "What could take the firm down, and is the model shifting fast enough?",
    kpis: [
      { label: "CROSS-PILLAR EXPOSURE", value: "₹14.2 Cr", note: "Meridian Retail (10% ARR)", tone: "#C0883A" },
      { label: "REV PER EMPLOYEE", value: "₹42.8 L", note: "↑ 6.2% YoY growth", tone: "#1B7A47" },
      { label: "CLIENT CONCENTRATION", value: "32.4%", note: "Top 3 clients share", tone: "#3E63DD" },
    ],
    primarySignal: {
      title: "Concentrated Exposure & Renewal Convergence",
      account: "Meridian Retail Group",
      exposure: "₹14.2 Cr ARR",
      details: "MSA renewal in 18 days coincides with Orion Rollout milestone slip and Vikram Rao resignation risk.",
      recommendedAction: "Escalate to Executive Steering & Approve Sponsor Outreach",
    },
    actions: ["ESCALATE", "APPROVE RENEWAL", "HOLD KEY PERSON"],
  },
  cfo: {
    id: "cfo",
    role: "Chief Financial Officer",
    monogram: "CF",
    accent: "#8A78FF",
    tint: "rgba(138,120,255,0.25)",
    question: "What is stuck, and what is compressing?",
    kpis: [
      { label: "CASH POSITION", value: "₹38.4 Cr", note: "Liquidity reserve solid", tone: "#1B7A47" },
      { label: "DSO (DAYS SALES OUT.)", value: "42 Days", note: "↓ 4 days vs Q4 target", tone: "#1B7A47" },
      { label: "OVERDUE RECEIVABLES", value: "₹2.40 Cr", note: "INV-2026-0309 (82d old)", tone: "#E5484D" },
    ],
    primarySignal: {
      title: "Overdue Receivables & Unbilled Work Clearance",
      account: "Northwind Insurance / Cobalt",
      exposure: "₹4.80 Cr Outstanding",
      details: "INV-2026-0309 overdue by 82 days. Unbilled milestone M7 (₹1.20 Cr) ready for invoicing.",
      recommendedAction: "Issue Invoice INV-2026-0412 & Trigger Credit Hold Notice",
    },
    actions: ["RAISE INVOICE", "START COLLECTION", "RE-FORECAST"],
  },
  hd: {
    id: "hd",
    role: "Head of Delivery",
    monogram: "HD",
    accent: "#30A46C",
    tint: "rgba(48,164,108,0.25)",
    question: "Are projects healthy, and are the right people on them?",
    kpis: [
      { label: "PROJECTS GONE RED", value: "1 of 9", note: "Atlas Migration (-12d)", tone: "#E5484D" },
      { label: "SPOF KEY PERSONS", value: "3 Leads", note: "Vikram Rao, Meera Nair", tone: "#C0883A" },
      { label: "BENCH UTILISATION", value: "84%", note: "Kavya Sharma available", tone: "#1B7A47" },
    ],
    primarySignal: {
      title: "Single Point of Failure & Delivery Slippage",
      account: "Orion Commerce Rollout",
      exposure: "-11 Days Schedule",
      details: "Principal Architect Vikram Rao at 96% utilization with 88% exit risk driver (comp below market).",
      recommendedAction: "Approve Succession Backfill & Reassign 30% Capacity",
    },
    actions: ["APPROVE CHANGE REQ", "REDEPLOY BENCH", "NAME SUCCESSOR"],
  },
};

export default function EisLensInteractiveMockup() {
  const [activeRole, setActiveRole] = useState<RoleId>("ce");
  const [actionLogged, setActionLogged] = useState<string | null>(null);

  const current = rolesData[activeRole];

  return (
    <div className="w-full overflow-hidden rounded-[14px] border border-[#242D5A] bg-[#0D122B]/95 text-left shadow-2xl backdrop-blur-md transition-all">
      {/* Top Console Bar */}
      <div className="flex flex-wrap items-center justify-between border-b border-white/10 bg-white/[0.03] px-4 py-3 gap-3">
        <div className="flex items-center gap-2">
          <span className="flex h-3 w-3 items-center justify-center rounded-full bg-blue-400" />
          <span className="text-[13.5px] font-bold tracking-tight text-white">
            Akashic EIS &middot; Personalised Executive Lens
          </span>
        </div>

        {/* Role Picker Buttons */}
        <div className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.05] p-1">
          {(Object.keys(rolesData) as RoleId[]).map((rId) => {
            const r = rolesData[rId];
            const isActive = activeRole === rId;
            return (
              <button
                key={rId}
                onClick={() => {
                  setActiveRole(rId);
                  setActionLogged(null);
                }}
                className={`flex items-center gap-1.5 rounded-md px-3 py-1 font-mono text-[10.5px] font-bold uppercase transition-all ${
                  isActive
                    ? "bg-white/10 text-white shadow-sm ring-1 ring-white/20"
                    : "text-white/50 hover:text-white hover:bg-white/5"
                }`}
                style={{
                  color: isActive ? r.accent : undefined,
                }}
              >
                <span
                  className="flex h-4 w-4 items-center justify-center rounded text-[9px] font-extrabold border border-white/10"
                  style={{ background: r.tint, color: r.accent }}
                >
                  {r.monogram}
                </span>
                {r.role}
              </button>
            );
          })}
        </div>

        <LiveChip />
      </div>

      {/* Dynamic View Header */}
      <div className="border-b border-white/10 p-4.5 bg-gradient-to-b from-white/[0.02] to-transparent">
        <div className="flex items-center justify-between">
          <span
            className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.08em] border border-white/10"
            style={{ background: current.tint, color: current.accent }}
          >
            {current.monogram} Operating Loop &middot; Active Surface
          </span>
          <span className="font-mono text-[9px] uppercase tracking-eyebrow text-white/40">
            Filtered View &middot; Zero Noise
          </span>
        </div>

        <p className="mt-2.5 text-[15px] font-bold text-white">
          The Morning Question: <span className="font-normal italic text-white/70">&ldquo;{current.question}&rdquo;</span>
        </p>

        {/* Dynamic KPI Bar */}
        <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-3">
          {current.kpis.map((kpi) => (
            <div key={kpi.label} className="rounded-[9px] border border-white/10 bg-white/[0.04] p-3">
              <div className="font-mono text-[7.5px] font-bold uppercase tracking-[0.08em] text-white/40">
                {kpi.label}
              </div>
              <div className="mt-1 text-[17px] font-extrabold tracking-tight" style={{ color: kpi.tone }}>
                {kpi.value}
              </div>
              <div className="mt-0.5 text-[10px] text-white/60">{kpi.note}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Primary Signal & Action Surface */}
      <div className="p-4.5">
        <div className="font-mono text-[8.5px] font-bold uppercase tracking-[0.08em] text-blue-400">
          Prioritised Executive Signal &middot; {current.primarySignal.account}
        </div>

        <div className="mt-2 rounded-[10px] border border-white/10 bg-white/[0.03] p-3.5">
          <div className="flex items-center justify-between">
            <h4 className="text-[14px] font-bold text-white">
              {current.primarySignal.title}
            </h4>
            <span className="font-mono text-[9px] font-bold text-blue-400">
              {current.primarySignal.exposure}
            </span>
          </div>
          <p className="mt-1.5 text-[12px] leading-relaxed text-white/70">
            {current.primarySignal.details}
          </p>

          {/* Action Trigger Buttons */}
          <div className="mt-3.5 flex flex-wrap items-center justify-between gap-2 border-t border-dashed border-white/10 pt-3">
            <span className="text-[11px] font-semibold text-white">
              Recommended: <span className="text-white/60">{current.primarySignal.recommendedAction}</span>
            </span>
            <div className="flex items-center gap-1.5">
              {current.actions.map((act) => (
                <button
                  key={act}
                  onClick={() => setActionLogged(act)}
                  className="rounded-[6px] border border-white/15 bg-white/[0.08] px-2.5 py-1.5 font-mono text-[9px] font-bold uppercase tracking-[0.05em] text-white hover:border-blue-400 hover:bg-blue/30 transition-colors"
                >
                  {act}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Action Confirmation Banner */}
        {actionLogged && (
          <div className="mt-3 flex items-center justify-between rounded-[9px] border border-positive-border bg-positive-subtle/20 p-3 text-[11.5px] font-medium text-positive-text">
            <span>
              Action <strong className="font-mono uppercase text-white">{actionLogged}</strong> drafted with context intact. Approver routing initiated.
            </span>
            <button onClick={() => setActionLogged(null)} className="font-mono text-[10px] underline text-positive-text">
              Dismiss
            </button>
          </div>
        )}
      </div>

      {/* Record Footer */}
      <div className="flex items-center justify-between border-t border-dashed border-white/10 bg-white/[0.02] px-4.5 py-2.5 font-mono text-[8.5px] uppercase tracking-[0.06em] text-white/50">
        <span>Same Record &middot; Same Governance &middot; Custom Operating Surface</span>
        <span className="font-bold text-blue-400">Route Context Active &rsaquo;</span>
      </div>
    </div>
  );
}
