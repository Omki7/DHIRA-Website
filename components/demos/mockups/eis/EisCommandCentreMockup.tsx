"use client";

/* ------------------------------------------------------------------------
 * SIMULATED PRODUCT UI — Akashic Enterprise Intelligence (EIS).
 * Dynamic Tease Visual — modelled on the Akashic hero showcase grammar.
 *
 * THE TEASE (DESIGN_SYSTEM §8):
 * 1. Short & compact. Capped at ~360px height so it teases rather than reveals.
 * 2. Dissolves over its lower third using a linear gradient mask.
 * 3. Dynamic role switching across all five executive seats (CEO, Finance,
 *    Sales, Delivery, HR) with instant visual updates.
 * 4. Legible caption under the stage that carries the claim.
 * --------------------------------------------------------------------- */

import { useState } from "react";
import Link from "next/link";

type RoleId = "ceo" | "finance" | "sales" | "delivery" | "hr";

interface RoleConfig {
  id: RoleId;
  label: string;
  initials: string;
  title: string;
  caption: string;
  kpis: { label: string; value: string; note: string; tone?: "positive" | "negative" | "neutral" }[];
  preview: {
    title: string;
    badge: string;
    meta: string;
    items: { label: string; value: string; sub: string; status?: "ok" | "warn" | "bad" }[];
  };
}

const ROLES: RoleConfig[] = [
  {
    id: "ceo",
    label: "CEO",
    initials: "DH",
    title: "Chief Executive Cockpit",
    caption: "Know where the enterprise lands this year, every hour. Real-time EBITDA, cash runway, and prioritized risks.",
    kpis: [
      { label: "FY Revenue Outlook", value: "$11.4M", note: "Plan $10.8M · +$600K ahead", tone: "positive" },
      { label: "FY EBITDA Margin", value: "19.4%", note: "Target 17.0% · +2.4 pts", tone: "positive" },
      { label: "Overdue Receivables", value: "$392K", note: "of $1.1M open · DSO 58d", tone: "negative" },
    ],
    preview: {
      title: "Top Enterprise Exposure & Advisory",
      badge: "Priority 01",
      meta: "Triangulated across ERPNext + Salesforce",
      items: [
        { label: "Northwind Insurance", value: "$180K ARR", sub: "74-day overdue invoice · VP Claims sponsor departure", status: "bad" },
        { label: "Project P-104 (Claims Engine)", value: "19% Margin", sub: "3 weeks behind schedule · CR-07 scope dispute", status: "warn" },
        { label: "Civic Digital Kickoff", value: "8 Engineers", sub: "Kickoff in 14 days · Bench deployment plan ready", status: "ok" },
      ],
    },
  },
  {
    id: "finance",
    label: "Finance & FP&A",
    initials: "NP",
    title: "Finance & FP&A Cockpit",
    caption: "Rolling 12-month P&L, aged receivables, and cash conversion without waiting for end-of-month reconciliations.",
    kpis: [
      { label: "Rolling 12M Revenue", value: "$11.2M", note: "Oct 26 – Sep 27 model", tone: "neutral" },
      { label: "Overdue Receivables", value: "$392K", note: "DSO 58d · Target <45d", tone: "negative" },
      { label: "Net Cash Runway", value: "14.2 Mo", note: "Current burn $142K/mo", tone: "positive" },
    ],
    preview: {
      title: "Aged Receivables by Tier",
      badge: "Real-time Ledger",
      meta: "ERPNext Accounts sync · 2 min ago",
      items: [
        { label: "Northwind Insurance (Inv #8942)", value: "$118,000", sub: "74 days past due · Sponsor contact held", status: "bad" },
        { label: "Hanseatic Holdings (Inv #8911)", value: "$94,000", sub: "48 days past due · Expected 28 Oct", status: "warn" },
        { label: "Lumen Bank Corp (Inv #8890)", value: "$62,000", sub: "Current · Net-30 payment scheduled", status: "ok" },
      ],
    },
  },
  {
    id: "sales",
    label: "Solutions & Sales",
    initials: "RS",
    title: "Solutions & Sales Cockpit",
    caption: "Pipeline health, deal velocity, and account expansion signals correlated with engineering delivery health.",
    kpis: [
      { label: "Weighted Pipeline", value: "$1.1M", note: "9 open deals · $2.4M unweighted", tone: "neutral" },
      { label: "Net Revenue Retention", value: "118%", note: "Target 115% · Strong expansion", tone: "positive" },
      { label: "Contracts at Risk", value: "$240K", note: "2 accounts under renewal watch", tone: "negative" },
    ],
    preview: {
      title: "Active Account Health & Renewals",
      badge: "CRM + Delivery",
      meta: "Salesforce + Jira sync · 1 min ago",
      items: [
        { label: "Lumen Bank Corp", value: "$312K ARR", sub: "Health 84/100 · Expansion opportunity $90K", status: "ok" },
        { label: "Meridian Health", value: "$264K ARR", sub: "Health 88/100 · UAT milestone approved", status: "ok" },
        { label: "Northwind Insurance", value: "$180K ARR", sub: "Health 46/100 · Renewal due in 18 days", status: "bad" },
      ],
    },
  },
  {
    id: "delivery",
    label: "Delivery Lead",
    initials: "AM",
    title: "Project Delivery Cockpit",
    caption: "Project RAG status, fixed-price budget burn, and engineering allocation across all active client engagements.",
    kpis: [
      { label: "Active Engagements", value: "14", note: "9 on track · 3 watch · 2 at risk", tone: "neutral" },
      { label: "Delivery Margin MTD", value: "36.8%", note: "Target 35.0% · +1.8 pts", tone: "positive" },
      { label: "Unbilled Milestones", value: "$210K", note: "2 milestones pending client sign-off", tone: "negative" },
    ],
    preview: {
      title: "Critical Project Health & Margin Watch",
      badge: "Jira + ERP",
      meta: "Sprint velocity & budget burn",
      items: [
        { label: "P-101 · Risk Data Hub (Lumen)", value: "41% Margin", sub: "Build phase · Milestone 3 delivered on plan", status: "ok" },
        { label: "P-103 · Cancer Care CDSS (Meridian)", value: "38% Margin", sub: "UAT phase · Client review underway", status: "warn" },
        { label: "P-104 · Claims Intelligence (Northwind)", value: "19% Margin", sub: "Build phase · 18% over budget; CR-07 dispute", status: "bad" },
      ],
    },
  },
  {
    id: "hr",
    label: "Talent & HR",
    initials: "RK",
    title: "People & Workforce Cockpit",
    caption: "Billable utilisation, bench allocation costs, and flight risks cross-referenced with upcoming project kickoffs.",
    kpis: [
      { label: "Total Headcount", value: "96", note: "89 technical · 7 G&A", tone: "neutral" },
      { label: "Utilisation MTD", value: "82%", note: "Target 80% · 9 on bench", tone: "positive" },
      { label: "Bench Holding Cost", value: "$29.7K", note: "Per month · 6 match upcoming kickoffs", tone: "negative" },
    ],
    preview: {
      title: "Workforce Allocation & Readiness",
      badge: "Workday Sync",
      meta: "HRMS + Delivery staffing plan",
      items: [
        { label: "Civic Digital Kickoff (20 Oct)", value: "8 Needed", sub: "6 bench engineers matched · 2 reallocated", status: "ok" },
        { label: "Critical Flight Risks", value: "3 Staff", sub: "Lead architect on P-104 flagged · Compensation review", status: "bad" },
        { label: "Engineering Bench", value: "9 Staff", sub: "Average bench duration 18 days (industry 32d)", status: "warn" },
      ],
    },
  },
];

export default function EisCommandCentreMockup() {
  const [selectedRole, setSelectedRole] = useState<RoleId>("ceo");
  const role = ROLES.find((r) => r.id === selectedRole)!;

  return (
    <div className="mx-auto w-full max-w-[1152px]">
      {/* Dynamic Role Switcher Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-lineSoft pb-3">
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          <span className="mr-1 font-mono text-[11px] uppercase tracking-wider text-tertiary-text font-semibold">
            Executives:
          </span>
          {ROLES.map((r) => {
            const isActive = r.id === selectedRole;
            return (
              <button
                key={r.id}
                type="button"
                onClick={() => setSelectedRole(r.id)}
                className={`flex items-center rounded-chip border px-3 py-1.5 text-[12px] font-medium transition-all ${
                  isActive
                    ? "border-blue bg-blue text-white shadow-sm font-semibold"
                    : "border-lineSoft bg-background text-secondary-text hover:border-line hover:bg-primary-bg hover:text-ink"
                }`}
              >
                <span>{r.label}</span>
              </button>
            );
          })}
        </div>

        <div className="hidden items-center gap-2 sm:flex">
          <span className="flex h-1.5 w-1.5 rounded-full bg-positive animate-pulse" />
          <span className="font-mono text-[10.5px] text-tertiary-text">
            Live ERPNext Sync
          </span>
        </div>
      </div>

      {/* Short Dynamic Teaser Window (Lower-third dissolves into the page) */}
      <div className="relative mt-4 overflow-hidden rounded-outer border border-line bg-background shadow-sm">
        
        {/* App Topbar */}
        <div className="flex h-10 items-center justify-between border-b border-lineSoft bg-primary-bg px-4">
          <div className="flex items-center gap-2.5">
            <span className="flex h-5 w-5 items-center justify-center rounded bg-ink font-mono text-[10px] font-bold text-on-action">
              A
            </span>
            <span className="text-[12px] font-bold text-ink">Akashic EIS</span>
            <span className="h-3 w-px bg-lineSoft" />
            <span className="font-mono text-[11px] text-secondary-text">{role.title}</span>
          </div>

          <div className="flex items-center gap-2 font-mono text-[10px] text-secondary-text">
            <span className="rounded bg-blue-subtle px-2 py-0.5 text-blue font-semibold border border-blue-border">
              Role: {role.label}
            </span>
            <span className="hidden sm:inline text-tertiary-text">· 0 open data conflicts</span>
          </div>
        </div>

        {/* Short Teaser Stage Container (Max Height ~340px with bottom gradient dissolve mask) */}
        <div
          className="p-4 sm:p-6 [mask-image:linear-gradient(to_bottom,black_60%,transparent_98%)]"
          style={{ maxHeight: "350px", overflow: "hidden" }}
        >
          {/* Top 3-KPI Executive Strip */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
            {role.kpis.map((k) => (
              <div
                key={k.label}
                className={`rounded-card border p-3.5 transition-colors ${
                  k.tone === "positive"
                    ? "border-positive-border bg-positive-subtle/50"
                    : k.tone === "negative"
                    ? "border-red/20 bg-red/5"
                    : "border-lineSoft bg-background"
                }`}
              >
                <div className="font-mono text-[10px] uppercase tracking-wider text-secondary-text">
                  {k.label}
                </div>
                <div
                  className={`mt-1 font-heading text-[24px] font-bold tracking-tight leading-tight ${
                    k.tone === "positive"
                      ? "text-positive"
                      : k.tone === "negative"
                      ? "text-red"
                      : "text-ink"
                  }`}
                >
                  {k.value}
                </div>
                <div className="mt-1 text-[11px] text-tertiary-text leading-tight">{k.note}</div>
              </div>
            ))}
          </div>

          {/* Dynamic Cockpit Preview Feed */}
          <div className="mt-4 rounded-card border border-lineSoft bg-primary-bg p-4">
            <div className="flex items-center justify-between border-b border-card-divide pb-2.5">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-blue">
                  {role.preview.badge}
                </span>
                <span className="text-[13px] font-semibold text-ink">
                  {role.preview.title}
                </span>
              </div>
              <span className="font-mono text-[10px] text-tertiary-text">
                {role.preview.meta}
              </span>
            </div>

            <div className="mt-3 divide-y divide-card-divide">
              {role.preview.items.map((item) => (
                <div key={item.label} className="py-2.5 flex items-center justify-between text-[12px]">
                  <div className="min-w-0 pr-4">
                    <span className="font-medium text-ink block truncate">{item.label}</span>
                    <span className="text-[11px] text-secondary-text block truncate mt-0.5">{item.sub}</span>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span
                      className={`font-mono text-[12px] font-bold ${
                        item.status === "bad"
                          ? "text-red"
                          : item.status === "warn"
                          ? "text-yellow-600"
                          : "text-ink"
                      }`}
                    >
                      {item.value}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tease Caption Below Stage */}
      <p className="mt-4 text-center text-[13.5px] leading-relaxed text-secondary-text">
        <span className="font-semibold text-ink">[{role.label} Cockpit]</span> {role.caption}{" "}
        <Link
          href="#talk-to-our-team"
          className="font-medium text-blue underline-offset-4 hover:underline whitespace-nowrap"
        >
          See it with your own data &rarr;
        </Link>
      </p>
    </div>
  );
}
