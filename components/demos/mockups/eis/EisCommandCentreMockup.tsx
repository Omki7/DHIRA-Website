/* ------------------------------------------------------------------------
 * SIMULATED PRODUCT UI — Akashic Enterprise Intelligence (AEI), the full
 * role-based command centre. Not live software. Not real customer data.
 *
 * WHAT THIS SHOWS. The CEO's wireframe is a complete, interactive product
 * simulation. This mockup renders the most important idea from it on the
 * marketing page: one platform, five roles, every person's first question
 * answered the moment they open it.
 *
 * The five roles map directly from the wireframe's role selector:
 *   CEO         → Overview: KPIs, forecast, "What needs you"
 *   Finance     → Rolling forecast + P&L + AR ageing
 *   Sales       → Pipeline by stage + customer health board
 *   Delivery    → Project RAG + resource utilisation
 *   HR          → Headcount + bench + flight risks
 *
 * DESIGN DECISIONS.
 * - Left sidebar mirrors the wireframe's nav structure exactly.
 * - Each role panel shows the TOP of that role's primary view — KPI strip +
 *   one chart or table. This is the "tease, never reveal" rule: shapes and
 *   labels read, internal detail does not.
 * - The ask bar (AI) stays visible across every role because that is the
 *   cross-cutting capability the CEO put in every role's overview.
 * - Tab-switching is client-side state (no router) and works without JS
 *   by defaulting to CEO view.
 * --------------------------------------------------------------------- */

"use client";

import { useState } from "react";

/* ------------------------------------------------------------------ types */

type Role = "ceo" | "finance" | "sales" | "delivery" | "hr";

type NavGroup = {
  label: string;
  items: { id: string; label: string; roles: Role[] }[];
};

/* ------------------------------------------------------------------ data */

const NAV: NavGroup[] = [
  {
    label: "",
    items: [
      { id: "overview", label: "Overview", roles: ["ceo", "finance", "sales", "delivery", "hr"] },
      { id: "assist", label: "DHIRA Assist", roles: ["ceo", "finance", "sales", "delivery", "hr"] },
    ],
  },
  {
    label: "Lifecycles",
    items: [
      { id: "customers", label: "Customers", roles: ["ceo", "finance", "sales", "delivery"] },
      { id: "pipeline", label: "Pipeline", roles: ["ceo", "sales", "finance"] },
      { id: "projects", label: "Projects", roles: ["ceo", "delivery", "sales"] },
      { id: "people", label: "Employees", roles: ["ceo", "delivery", "hr"] },
    ],
  },
  {
    label: "Departments",
    items: [
      { id: "hr", label: "Human Resources", roles: ["ceo", "hr"] },
      { id: "pl", label: "Profit & Loss", roles: ["ceo", "finance"] },
      { id: "ar", label: "Accounts receivable", roles: ["ceo", "finance"] },
      { id: "forecast", label: "Rolling forecast", roles: ["ceo", "finance"] },
      { id: "contracts", label: "Contracts", roles: ["ceo", "finance", "sales"] },
    ],
  },
  {
    label: "Platform",
    items: [
      { id: "signals", label: "Signals & actions", roles: ["ceo", "finance", "sales", "delivery", "hr"] },
      { id: "data", label: "ERPNext sync", roles: ["ceo"] },
    ],
  },
];

const ROLE_HOME: Record<Role, string> = {
  ceo: "overview",
  finance: "forecast",
  sales: "customers",
  delivery: "projects",
  hr: "hr",
};

const ROLES: { id: Role; label: string; initials: string; title: string }[] = [
  { id: "ceo", label: "CEO — Dilip H", initials: "DH", title: "Chief Executive" },
  { id: "finance", label: "Finance & FP&A — Neha P", initials: "NP", title: "Finance & FP&A" },
  { id: "sales", label: "Solutions & Sales — Rupa S", initials: "RS", title: "Solutions & Sales" },
  { id: "delivery", label: "Delivery lead — Arjun M", initials: "AM", title: "Delivery lead" },
  { id: "hr", label: "Talent & HR — Rajiv K", initials: "RK", title: "Talent & HR" },
];

/* ----------------------------------------------------------------- content */

/* CEO overview KPIs */
const CEO_KPIS = [
  { label: "FY 26-27 revenue outlook", value: "$11.4 M", note: "Plan $10.8 M — $0.6 M ahead", good: true },
  { label: "Next 12 months revenue", value: "$11.2 M", note: "Oct 26 – Sep 27 · updated 3 min ago", good: null },
  { label: "FY EBITDA margin", value: "19.4%", note: "Plan 17.0%", good: true },
  { label: "Overdue receivables", value: "$392 K", note: "of $1.1 M open · DSO 58 days", good: false },
  { label: "Billable utilisation MTD", value: "82%", note: "9 on bench · target 80%", good: true },
  { label: "Weighted pipeline", value: "$1.1 M", note: "9 open · $2.4 M unweighted", good: null },
];

/* Finance forecast stub — monthly bars (6 actuals + 6 forecast) */
const FORECAST_BARS = [
  { month: "Apr", rev: 74, cost: 61, actual: true },
  { month: "May", rev: 78, cost: 63, actual: true },
  { month: "Jun", rev: 82, cost: 64, actual: true },
  { month: "Jul", rev: 86, cost: 65, actual: true },
  { month: "Aug", rev: 89, cost: 66, actual: true },
  { month: "Sep", rev: 91, cost: 67, actual: true },
  { month: "Oct", rev: 90, cost: 68, actual: false },
  { month: "Nov", rev: 92, cost: 68, actual: false },
  { month: "Dec", rev: 94, cost: 69, actual: false },
  { month: "Jan", rev: 96, cost: 70, actual: false },
  { month: "Feb", rev: 98, cost: 71, actual: false },
  { month: "Mar", rev: 100, cost: 72, actual: false },
];

/* Sales customer board */
const CUST_STAGES = [
  { label: "Prospect", count: 4, value: "$2.4 M TCV", color: "bg-eis-line" },
  { label: "Onboarding", count: 2, value: "$264 K ARR", color: "bg-blue-subtle border-blue-border" },
  { label: "Active", count: 4, value: "$708 K ARR", color: "bg-positive-subtle border-positive-border" },
  { label: "Expanding", count: 2, value: "$576 K ARR", color: "bg-positive-subtle border-positive-border" },
  { label: "At risk", count: 2, value: "$240 K ARR", color: "bg-red/10 border-red/20" },
];

const CUSTS = [
  { name: "Lumen Bank", stage: "Expanding", arr: "$312 K", health: 84, overdue: null },
  { name: "Meridian Health", stage: "Expanding", arr: "$264 K", health: 88, overdue: null },
  { name: "Northwind Insurance", stage: "At risk", arr: "$180 K", health: 46, overdue: "$118 K" },
  { name: "State Education Mission", stage: "Renewal due", arr: "$228 K", health: 69, overdue: null },
];

/* Delivery projects */
const PROJECTS = [
  { id: "P-101", name: "Risk data hub", cust: "Lumen Bank", stage: "Build", rag: "G", margin: "41%", budget: "$220 K" },
  { id: "P-103", name: "Cancer care CDSS", cust: "Meridian Health", stage: "UAT", rag: "A", margin: "38%", budget: "$180 K" },
  { id: "P-104", name: "Claims intelligence", cust: "Northwind Insurance", stage: "Build", rag: "R", margin: "19%", budget: "$340 K" },
  { id: "P-106", name: "Dropout prediction", cust: "State Education", stage: "Build", rag: "G", margin: "29%", budget: "$280 K" },
  { id: "P-109", name: "Civic Digital kickoff", cust: "Civic Digital Authority", stage: "SOW signed", rag: "G", margin: "31%", budget: "$210 K" },
];

/* HR people */
const HR_KPIS = [
  { label: "Headcount", value: "96", note: "89 engineers & specialists · 7 G&A" },
  { label: "Utilisation MTD", value: "82%", note: "target 80%", good: true },
  { label: "On bench", value: "9", note: "costs $29.7 K / month", good: false },
  { label: "Flight risks", value: "3", note: "attrition score ≥ 65", good: false },
  { label: "Open roles", value: "11", note: "3 offers out or accepted" },
];

/* AI advisories */
const ADVISORIES = [
  {
    id: "ADV-1041",
    sev: "bad",
    area: "Customer",
    title: "Northwind Insurance: $118 K overdue, sponsor change",
    facts: ["Oldest invoice 74 days past due", "New VP Claims since 1 Sep has not engaged", "NPS fell from 48 to 12"],
    action: "Schedule executive sponsor call · attach aged AR statement",
    owner: "rupa",
    impact: "Rev –$180 K ARR at risk if not renewed",
  },
  {
    id: "ADV-1042",
    sev: "warn",
    area: "Delivery",
    title: "Project P-104 is 18% over budget with 4 months remaining",
    facts: ["Fixed-price contract · $61 K over NTE estimate", "UAT delayed 3 weeks by scope dispute CR-07"],
    action: "Raise change request CR-08 · move to T&M for remaining scope",
    owner: "arjun",
    impact: "Margin –12 pts if not re-scoped",
  },
  {
    id: "ADV-1043",
    sev: "warn",
    area: "People",
    title: "Civic Digital kickoff: 8 engineers needed by 19 Oct",
    facts: ["SOW signed 29 Sep · kickoff 20 Oct", "6 bench engineers match required skills", "2 must be redeployed from P-103 post-UAT"],
    action: "Confirm allocations · send staffing plan to client",
    owner: "dilip",
    impact: "Mobilisation advance $78 K released on kickoff",
  },
];

/* ---------------------------------------------------------------- helpers */

function Kpi({
  label, value, note, good,
}: { label: string; value: string; note: string; good?: boolean | null }) {
  return (
    <div className={`rounded-card border p-3 ${good === true ? "border-positive-border bg-positive-subtle" : good === false ? "border-red/25 bg-red/5" : "border-eis-line bg-background"}`}>
      <div className="font-mono text-[9.5px] uppercase tracking-eyebrow text-eis-caption">{label}</div>
      <div className={`mt-1 font-heading text-[20px] font-medium tracking-tight leading-tight ${good === true ? "text-positive" : good === false ? "text-red" : "text-eis-ink"}`}>{value}</div>
      <div className="mt-0.5 text-[10.5px] leading-tight text-eis-caption">{note}</div>
    </div>
  );
}

function RagDot({ rag }: { rag: string }) {
  const cls = rag === "G" ? "bg-positive" : rag === "A" ? "bg-yellow-400" : "bg-red";
  return <span className={`inline-block h-2 w-2 rounded-full ${cls}`} aria-label={rag === "G" ? "On track" : rag === "A" ? "Watch" : "At risk"} />;
}

function HealthBar({ score }: { score: number }) {
  const color = score >= 80 ? "bg-positive" : score >= 65 ? "bg-blue" : score >= 50 ? "bg-yellow-400" : "bg-red";
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-14 overflow-hidden rounded-full bg-eis-line">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${score}%` }} />
      </div>
      <span className="font-mono text-[10.5px] text-eis-ink">{score}</span>
    </div>
  );
}

/* ---------------------------------------------------------------- views */

function CeoView() {
  return (
    <div className="flex flex-col gap-3">
      {/* Ask bar */}
      <div className="flex items-center gap-2 rounded-card border border-blue-border bg-blue-subtle px-3 py-2.5">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgb(var(--blue))" strokeWidth="2" strokeLinecap="round" aria-hidden>
          <path d="M12 3a9 9 0 1 0 4.5 16.8L21 21l-1.2-4.5A9 9 0 0 0 12 3Z" />
        </svg>
        <span className="flex-1 text-[12px] text-eis-body">Will we hit the FY plan?</span>
        <span className="rounded-chip border border-positive-border bg-positive-subtle px-2 py-0.5 font-mono text-[9px] font-medium text-positive">Answer ready</span>
      </div>
      {/* KPI grid */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {CEO_KPIS.map((k) => <Kpi key={k.label} {...k} />)}
      </div>
      {/* What needs you */}
      <div className="rounded-card border border-eis-line bg-background">
        <div className="flex items-center justify-between border-b border-eis-line px-3 py-2">
          <span className="text-[11.5px] font-medium text-eis-ink">What needs you</span>
          <span className="rounded-full bg-red px-2 py-0.5 font-mono text-[9px] font-bold text-white">3 open</span>
        </div>
        <div className="divide-y divide-eis-line">
          {ADVISORIES.slice(0, 2).map((a) => (
            <div key={a.id} className={`flex items-start gap-2.5 px-3 py-2.5 ${a.sev === "bad" ? "border-l-2 border-red" : "border-l-2 border-yellow-400"}`}>
              <div className="flex-1 min-w-0">
                <div className="font-mono text-[9px] font-medium uppercase tracking-eyebrow text-eis-caption">{a.area} · {a.id}</div>
                <div className="mt-0.5 text-[11.5px] font-medium leading-tight text-eis-ink">{a.title}</div>
                <div className="mt-1 text-[10.5px] text-eis-caption">{a.action}</div>
              </div>
              <div className="flex flex-shrink-0 gap-1">
                <span className="rounded-chip border border-positive-border bg-positive-subtle px-2 py-0.5 text-[9px] font-medium text-positive">Approve</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FinanceView() {
  const maxRev = Math.max(...FORECAST_BARS.map((b) => b.rev));
  return (
    <div className="flex flex-col gap-3">
      <div className="rounded-card border border-eis-line bg-background p-3">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-[11.5px] font-medium text-eis-ink">Revenue and cost: 6 months actual, 12 months rolling</span>
          <span className="font-mono text-[10px] text-eis-caption">FY plan $10.8 M</span>
        </div>
        {/* Mini bar chart */}
        <div className="flex items-end gap-[3px] h-24">
          {FORECAST_BARS.map((b) => (
            <div key={b.month} className="flex flex-1 flex-col items-center gap-[2px]">
              <div className="relative flex w-full flex-col items-center justify-end gap-[2px]" style={{ height: "76px" }}>
                <div
                  className={`w-full rounded-sm ${b.actual ? "bg-blue" : "bg-blue/40"}`}
                  style={{ height: `${(b.rev / maxRev) * 60}px` }}
                />
                <div
                  className={`w-full rounded-sm ${b.actual ? "bg-yellow-400/80" : "bg-yellow-400/30"}`}
                  style={{ height: `${(b.cost / maxRev) * 60}px`, marginTop: "-2px" }}
                />
              </div>
              <span className="font-mono text-[7.5px] text-eis-muted">{b.month}</span>
            </div>
          ))}
        </div>
        <div className="mt-2 flex gap-3">
          {[["bg-blue", "Revenue"], ["bg-yellow-400/80", "Cost"], ["bg-positive", "EBITDA"]].map(([c, l]) => (
            <span key={l} className="flex items-center gap-1 text-[9px] text-eis-caption">
              <span className={`h-2 w-2 rounded-sm ${c}`} />
              {l}
            </span>
          ))}
          <span className="ml-auto font-mono text-[9px] text-eis-caption">Dashed = forecast</span>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <Kpi label="FY revenue outlook" value="$11.4 M" note="$0.6 M ahead of plan" good={true} />
        <Kpi label="FY EBITDA margin" value="19.4%" note="plan 17.0%" good={true} />
        <Kpi label="Overdue receivables" value="$392 K" note="DSO 58 days" good={false} />
      </div>
    </div>
  );
}

function SalesView() {
  return (
    <div className="flex flex-col gap-3">
      {/* Stage board */}
      <div className="flex items-start gap-1 overflow-x-auto pb-1">
        {CUST_STAGES.map((s, i) => (
          <div key={s.label} className={`flex min-w-[90px] flex-1 flex-col gap-1 rounded-card border p-2.5 ${s.color}`}>
            <span className="font-heading text-[20px] font-medium leading-tight text-eis-ink">{s.count}</span>
            <span className="text-[11px] font-medium text-eis-ink">{s.label}</span>
            <span className="font-mono text-[9.5px] text-eis-caption">{s.value}</span>
            {i < CUST_STAGES.length - 1 && (
              <svg className="absolute right-[-8px] top-3 hidden" width="8" height="12" viewBox="0 0 8 12" fill="none" aria-hidden>
                <path d="M0 0l8 6-8 6" stroke="rgb(var(--eis-line))" />
              </svg>
            )}
          </div>
        ))}
      </div>
      {/* Customer table */}
      <div className="overflow-hidden rounded-card border border-eis-line">
        <table className="w-full text-[11px]">
          <thead>
            <tr className="border-b border-eis-line bg-eis-chip">
              <th className="px-3 py-2 text-left font-mono text-[9px] uppercase tracking-eyebrow text-eis-caption">Customer</th>
              <th className="px-3 py-2 text-left font-mono text-[9px] uppercase tracking-eyebrow text-eis-caption">Stage</th>
              <th className="px-3 py-2 text-right font-mono text-[9px] uppercase tracking-eyebrow text-eis-caption">ARR</th>
              <th className="px-3 py-2 text-right font-mono text-[9px] uppercase tracking-eyebrow text-eis-caption">Overdue</th>
              <th className="px-3 py-2 text-left font-mono text-[9px] uppercase tracking-eyebrow text-eis-caption">Health</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-eis-line">
            {CUSTS.map((c) => (
              <tr key={c.name} className="hover:bg-eis-chip/50">
                <td className="px-3 py-2 font-medium text-eis-ink">{c.name}</td>
                <td className="px-3 py-2">
                  <span className={`rounded-chip px-1.5 py-0.5 text-[9px] font-medium ${c.stage === "At risk" ? "bg-red/10 text-red" : c.stage === "Expanding" ? "bg-positive-subtle text-positive" : c.stage === "Renewal due" ? "bg-yellow-50 text-yellow-700" : "bg-blue-subtle text-blue"}`}>
                    {c.stage}
                  </span>
                </td>
                <td className="px-3 py-2 text-right font-mono text-eis-ink">{c.arr}</td>
                <td className={`px-3 py-2 text-right font-mono ${c.overdue ? "text-red" : "text-eis-caption"}`}>{c.overdue ?? "—"}</td>
                <td className="px-3 py-2"><HealthBar score={c.health} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function DeliveryView() {
  const rag = { G: PROJECTS.filter((p) => p.rag === "G").length, A: PROJECTS.filter((p) => p.rag === "A").length, R: PROJECTS.filter((p) => p.rag === "R").length };
  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-3 gap-2">
        <div className="rounded-card border border-positive-border bg-positive-subtle p-3 text-center">
          <div className="font-heading text-[24px] font-medium text-positive">{rag.G}</div>
          <div className="font-mono text-[9px] uppercase tracking-eyebrow text-positive">On track</div>
        </div>
        <div className="rounded-card border border-yellow-300 bg-yellow-50 p-3 text-center">
          <div className="font-heading text-[24px] font-medium text-yellow-700">{rag.A}</div>
          <div className="font-mono text-[9px] uppercase tracking-eyebrow text-yellow-700">Watch</div>
        </div>
        <div className="rounded-card border border-red/25 bg-red/5 p-3 text-center">
          <div className="font-heading text-[24px] font-medium text-red">{rag.R}</div>
          <div className="font-mono text-[9px] uppercase tracking-eyebrow text-red">At risk</div>
        </div>
      </div>
      <div className="overflow-hidden rounded-card border border-eis-line">
        <table className="w-full text-[11px]">
          <thead>
            <tr className="border-b border-eis-line bg-eis-chip">
              <th className="px-3 py-2 text-left font-mono text-[9px] uppercase tracking-eyebrow text-eis-caption">Project</th>
              <th className="px-3 py-2 text-left font-mono text-[9px] uppercase tracking-eyebrow text-eis-caption">Stage</th>
              <th className="px-3 py-2 text-center font-mono text-[9px] uppercase tracking-eyebrow text-eis-caption">RAG</th>
              <th className="px-3 py-2 text-right font-mono text-[9px] uppercase tracking-eyebrow text-eis-caption">Margin</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-eis-line">
            {PROJECTS.map((p) => (
              <tr key={p.id} className="hover:bg-eis-chip/50">
                <td className="px-3 py-2">
                  <div className="font-medium text-eis-ink">{p.name}</div>
                  <div className="font-mono text-[9px] text-eis-caption">{p.id} · {p.cust}</div>
                </td>
                <td className="px-3 py-2 text-eis-body">{p.stage}</td>
                <td className="px-3 py-2 text-center"><RagDot rag={p.rag} /></td>
                <td className="px-3 py-2 text-right font-mono text-eis-ink">{p.margin}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function HrView() {
  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {HR_KPIS.map((k) => (
          <div key={k.label} className={`rounded-card border p-3 ${k.good === true ? "border-positive-border bg-positive-subtle" : k.good === false ? "border-red/25 bg-red/5" : "border-eis-line bg-background"}`}>
            <div className="font-mono text-[9.5px] uppercase tracking-eyebrow text-eis-caption">{k.label}</div>
            <div className={`mt-1 font-heading text-[22px] font-medium tracking-tight ${k.good === true ? "text-positive" : k.good === false ? "text-red" : "text-eis-ink"}`}>{k.value}</div>
            <div className="mt-0.5 text-[10.5px] leading-tight text-eis-caption">{k.note}</div>
          </div>
        ))}
      </div>
      {/* Utilisation by team */}
      <div className="rounded-card border border-eis-line bg-background p-3">
        <div className="mb-2 text-[11.5px] font-medium text-eis-ink">Utilisation by role · MTD</div>
        <div className="space-y-2">
          {[["Senior engineers", 87], ["Engineers", 82], ["Data engineers", 79], ["Architects", 91], ["Analysts", 74], ["G&A", 100]].map(([role, pct]) => (
            <div key={role} className="flex items-center gap-2 text-[10.5px]">
              <span className="w-28 shrink-0 text-eis-body">{role}</span>
              <div className="flex-1 overflow-hidden rounded-full bg-eis-line h-1.5">
                <div className={`h-full rounded-full ${(pct as number) >= 80 ? "bg-positive" : (pct as number) >= 70 ? "bg-blue" : "bg-yellow-400"}`} style={{ width: `${(pct as number) / 110 * 100}%` }} />
              </div>
              <span className="w-8 text-right font-mono text-eis-ink">{pct}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SignalsFullView() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-[12px] font-medium text-eis-ink">Active Advisories & Proposed Interventions</span>
        <span className="rounded-full bg-red px-2 py-0.5 font-mono text-[9px] font-bold text-white">3 open</span>
      </div>
      <div className="divide-y divide-eis-line rounded-card border border-eis-line bg-background">
        {ADVISORIES.map((a) => (
          <div key={a.id} className={`flex flex-col gap-2 p-3 ${a.sev === "bad" ? "border-l-4 border-red" : "border-l-4 border-yellow-400"}`}>
            <div className="flex items-center justify-between">
              <span className="font-mono text-[9.5px] font-medium uppercase tracking-eyebrow text-eis-caption">
                {a.area} · {a.id}
              </span>
              <span className="rounded-chip border border-eis-line px-1.5 py-0.5 font-mono text-[9px] text-eis-caption">
                Owner: {a.owner}
              </span>
            </div>
            <div className="text-[12px] font-medium text-eis-ink">{a.title}</div>
            <ul className="space-y-0.5 text-[10.5px] text-eis-caption">
              {a.facts.map((f, i) => (
                <li key={i} className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-eis-muted" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <div className="mt-1 flex flex-wrap items-center justify-between gap-2 border-t border-eis-line pt-2">
              <span className="font-mono text-[10px] text-red">{a.impact}</span>
              <div className="flex items-center gap-2">
                <span className="text-[10.5px] text-eis-caption">{a.action}</span>
                <button type="button" className="rounded-chip border border-positive-border bg-positive-subtle px-2 py-0.5 text-[9.5px] font-medium text-positive hover:bg-positive/20">
                  Approve
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- shell */

const VIEW_COMPONENTS: Record<Role, React.FC> = {
  ceo: CeoView,
  finance: FinanceView,
  sales: SalesView,
  delivery: DeliveryView,
  hr: HrView,
};

function resolveViewComponent(role: Role, view: string): React.FC {
  if (view === "signals") return SignalsFullView;
  if (view === "customers" || view === "pipeline") return SalesView;
  if (view === "projects") return DeliveryView;
  if (view === "people" || view === "hr") return HrView;
  if (view === "pl" || view === "ar" || view === "forecast" || view === "contracts") return FinanceView;
  return VIEW_COMPONENTS[role] ?? CeoView;
}

function SideNavItem({
  id, label, active, accessible, onClick,
}: { id: string; label: string; active: boolean; accessible: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!accessible}
      className={`flex w-full items-center gap-2 rounded-[7px] px-2.5 py-1.5 text-left text-[11.5px] transition-colors ${
        active
          ? "bg-blue text-white font-medium"
          : accessible
          ? "text-eis-body hover:bg-eis-chip hover:text-eis-ink"
          : "cursor-not-allowed text-eis-idle opacity-40"
      }`}
      aria-current={active ? "page" : undefined}
    >
      {label}
      {!accessible && (
        <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden className="ml-auto flex-shrink-0">
          <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      )}
    </button>
  );
}

export default function EisCommandCentreMockup() {
  const [role, setRole] = useState<Role>("ceo");
  const [view, setView] = useState<string>(ROLE_HOME["ceo"]);
  const ViewComponent = resolveViewComponent(role, view);

  const handleRoleChange = (newRole: Role) => {
    setRole(newRole);
    setView(ROLE_HOME[newRole]);
  };

  const currentRole = ROLES.find((r) => r.id === role)!;

  return (
    <div className="flex flex-col gap-3">
      {/* Quick role tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Executive roles">
        <span className="mr-1 text-[11px] font-mono uppercase tracking-eyebrow text-tertiary-text">Role:</span>
        {ROLES.map((r) => {
          const active = r.id === role;
          return (
            <button
              key={r.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => handleRoleChange(r.id)}
              className={`flex items-center gap-2 rounded-chip border px-3.5 py-1.5 text-[12px] transition-all whitespace-nowrap ${
                active
                  ? "border-blue bg-blue text-white font-semibold shadow-sm"
                  : "border-lineSoft bg-background text-secondary-text hover:border-line hover:bg-primary-bg hover:text-ink"
              }`}
            >
              <span className={`flex h-4 w-4 items-center justify-center rounded-[3px] text-[8.5px] font-bold ${
                active ? "bg-white text-blue" : "bg-ink text-on-action"
              }`}>
                {r.initials}
              </span>
              <span>{r.label}</span>
            </button>
          );
        })}
        <div className="ml-auto hidden items-center gap-2 lg:flex">
          <span className="flex h-1.5 w-1.5 rounded-full bg-positive animate-pulse" />
          <span className="font-mono text-[10px] text-tertiary-text">
            5 Cockpits · Segregated Entitlements
          </span>
        </div>
      </div>

      <div className="overflow-hidden rounded-outer border border-eis-line bg-background">
        {/* Top bar */}
        <div className="flex h-10 items-center gap-2.5 border-b border-eis-line bg-eis-chip px-3">
          {/* App mark */}
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-[5px] bg-ink text-[9.5px] font-bold text-on-action">A</span>
          <span className="text-[11.5px] font-bold text-ink">Akashic EIS</span>
          <span className="mx-1 h-4 w-px bg-eis-line" />
          {/* Role selector dropdown */}
          <div className="relative flex items-center gap-1">
            <select
              value={role}
              onChange={(e) => handleRoleChange(e.target.value as Role)}
              className="appearance-none rounded-chip border border-eis-line bg-background py-0.5 pl-2 pr-5 font-mono text-[10px] text-eis-ink focus:outline-none"
              aria-label="Switch role"
            >
              {ROLES.map((r) => (
                <option key={r.id} value={r.id}>{r.label}</option>
              ))}
            </select>
            <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="rgb(var(--eis-caption))" strokeWidth="3" strokeLinecap="round" aria-hidden className="pointer-events-none absolute right-1.5">
              <path d="m6 9 6 6 6-6" />
            </svg>
          </div>
          <span className="ml-auto flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-positive animate-pulse" aria-hidden />
            <span className="font-mono text-[9.5px] font-medium text-positive">Live · ERPNext</span>
          </span>
        </div>

        {/* Body: sidebar + main */}
        <div className="flex" style={{ minHeight: "460px" }}>
          {/* Sidebar */}
          <nav className="hidden w-44 flex-shrink-0 flex-col gap-1 border-r border-eis-line bg-eis-chip p-2 sm:flex" aria-label="AEI navigation">
            {/* User chip */}
            <div className="mb-2 flex items-center gap-2 rounded-chip border border-eis-line bg-background px-2 py-1.5">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-[5px] bg-ink text-[9px] font-bold text-on-action">{currentRole.initials}</span>
              <span className="min-w-0">
                <span className="block truncate font-mono text-[9.5px] font-medium text-eis-ink">{currentRole.title}</span>
              </span>
            </div>
            {NAV.map((group) => {
              const visible = group.items.filter((i) => true);
              return (
                <div key={group.label || "top"} className="mt-1">
                  {group.label && (
                    <div className="mb-0.5 px-2 font-mono text-[8.5px] font-medium uppercase tracking-eyebrow text-eis-muted">{group.label}</div>
                  )}
                  {visible.map((item) => (
                    <SideNavItem
                      key={item.id}
                      id={item.id}
                      label={item.label}
                      active={view === item.id}
                      accessible={item.roles.includes(role)}
                      onClick={() => item.roles.includes(role) && setView(item.id)}
                    />
                  ))}
                </div>
              );
            })}
          </nav>

          {/* Main content */}
          <main className="flex-1 min-w-0 overflow-hidden p-3">
            {/* Mobile view switcher */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:hidden border-b border-eis-line mb-2.5">
              <span className="font-mono text-[9px] uppercase tracking-eyebrow text-eis-caption shrink-0">View:</span>
              {NAV.flatMap((g) => g.items)
                .filter((item) => item.roles.includes(role))
                .map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setView(item.id)}
                    className={`rounded-chip px-2 py-0.5 text-[10.5px] whitespace-nowrap transition-colors ${
                      view === item.id
                        ? "bg-blue text-white font-medium"
                        : "bg-eis-chip text-eis-body hover:text-eis-ink"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
            </div>

            {/* Page head */}
            <div className="mb-3">
              <h2 className="font-mono text-[10px] font-medium uppercase tracking-eyebrow text-eis-caption">
                Enterprise Intelligence &rsaquo; {NAV.flatMap((g) => g.items).find((i) => i.id === view)?.label ?? "Overview"}
              </h2>
              <p className="mt-0.5 text-[13px] font-medium text-eis-ink">
                {role === "ceo" && "Know where DHIRA will land this year, every hour."}
                {role === "finance" && "Revenue and cost: 6 months actual, 12 months rolling."}
                {role === "sales" && "Customer health and pipeline by stage."}
                {role === "delivery" && "Project delivery: RAG, utilisation, milestones."}
                {role === "hr" && "People: headcount, bench, flight risks, hiring."}
              </p>
              <div className="mt-1 flex flex-wrap gap-1">
                {(role === "ceo" ? ["Akashic BI", "Akashic Agents", "ADP"] :
                  role === "finance" ? ["ADW", "Akashic BI", "Akashic Agents"] :
                  role === "sales" ? ["ADW", "Akashic BI", "Akashic Agents"] :
                  role === "delivery" ? ["ADW", "Akashic BI", "AKL"] :
                  ["ADW", "Akashic BI", "AWM"]
                ).map((m) => (
                  <span key={m} className="inline-flex items-center gap-1 rounded-chip border border-blue-border bg-blue-subtle px-1.5 py-0.5 font-mono text-[9px] font-medium text-blue">
                    <span className="h-[4px] w-[4px] rounded-full bg-current opacity-70" aria-hidden />
                    {m}
                  </span>
                ))}
              </div>
            </div>

            {/* Role view */}
            <ViewComponent />
          </main>
        </div>

      {/* Footer */}
      <div className="flex items-center gap-2 border-t border-eis-line bg-eis-chip px-3 py-2">
        <span className="font-mono text-[9px] text-eis-muted">
          Row-level security applied · every figure cites its ERPNext source
        </span>
        <span className="ml-auto font-mono text-[9px] text-eis-caption">
          akashic.dhira.ai/eis
        </span>
      </div>
    </div>
  </div>
);
}

