/*
 * SIMULATED PRODUCT UI — Akashic EIS Interactive Hero Morning Brief Mockup.
 * Sourced from the EIS prototype data (eis/data.js).
 * Interactive features:
 * - Live Signal Tabs (Meridian Retail, Hanseatic Bank, Northwind Insurance)
 * - Clickable Pulse tiles with inline provenance popover
 */

"use client";

import { useState } from "react";
import DynamicSketchIcon from "@/components/icons/DynamicSketchIcon";
import { LiveChip } from "@/components/sections/akashic/AkashicCardChrome";

type SignalKey = "meridian" | "hanseatic" | "northwind";

type SignalData = {
  client: string;
  logo: string;
  exposure: string;
  daysWarning: number;
  briefText: string;
  clauseCount: number;
  provenanceSource: string;
  confidence: number;
  pulse: Array<{ label: string; value: string; delta: string; tone: string; source: string }>;
};

const signals: Record<SignalKey, SignalData> = {
  meridian: {
    client: "Meridian Retail Group",
    logo: "MR",
    exposure: "₹14.2 Cr ARR",
    daysWarning: 18,
    briefText:
      "Meridian Retail is now your single largest exposure: contract renewal, delivery milestone slip (-11 days), and key-person exit risk (Vikram Rao, Principal Architect) converge on the same account in the next 18 days.",
    clauseCount: 3,
    provenanceSource: "Salesforce CRM + Jira + Workday",
    confidence: 96,
    pulse: [
      { label: "REVENUE RUN-RATE", value: "₹142 Cr", delta: "↑ 4.2% vs plan", tone: "#1B7A47", source: "NetSuite ERP · Ledger 4100" },
      { label: "ACCOUNT EXPOSURE", value: "₹14.2 Cr", delta: "18 days to expiry", tone: "#C0883A", source: "Salesforce · Contract K01" },
      { label: "DELIVERY SLIP", value: "-11 Days", delta: "P01 Orion Rollout", tone: "#E5484D", source: "Jira · Project P01" },
    ],
  },
  hanseatic: {
    client: "Hanseatic Bank",
    logo: "HB",
    exposure: "₹11.8 Cr ARR",
    daysWarning: 21,
    briefText:
      "Hanseatic Core Banking MSA renewal window opens in 21 days. Billing backlog of ₹2.95 Cr reconciled today. Single point of failure identified on Lena Fischer (Onsite Coordinator).",
    clauseCount: 2,
    provenanceSource: "NetSuite + Workday + SAP",
    confidence: 92,
    pulse: [
      { label: "REVENUE RUN-RATE", value: "₹142 Cr", delta: "↑ 4.2% vs plan", tone: "#1B7A47", source: "NetSuite ERP · Ledger 4100" },
      { label: "UNBILLED BACKLOG", value: "₹2.95 Cr", delta: "Reconciled today", tone: "#3E63DD", source: "SAP Core Billing · INV-0301" },
      { label: "SPOF RISK", value: "1 Onsite", delta: "Lena Fischer (98%)", tone: "#C0883A", source: "Workday HR · Talent Matrix" },
    ],
  },
  northwind: {
    client: "Northwind Insurance",
    logo: "NW",
    exposure: "₹6.4 Cr ARR",
    daysWarning: 14,
    briefText:
      "Northwind Insurance carries overdue receivable INV-2026-0309 (₹2.40 Cr, 82 days old). Renewal probability dropped 12% due to unresolved SLA tickets.",
    clauseCount: 2,
    provenanceSource: "SAP Finance + Zendesk",
    confidence: 88,
    pulse: [
      { label: "OVERDUE AGING", value: "82 Days", delta: "₹2.40 Cr outstanding", tone: "#E5484D", source: "SAP Ledger · INV-2026-0309" },
      { label: "SLA COMPLIANCE", value: "91.2%", delta: "↓ 4.8% target slip", tone: "#C0883A", source: "Zendesk Enterprise" },
      { label: "CHURN RISK", value: "42%", delta: "Renewal risk high", tone: "#E5484D", source: "Ask Akashic ML Model" },
    ],
  },
};

export default function EisHeroBriefMockup() {
  const [activeSignal, setActiveSignal] = useState<SignalKey>("meridian");
  const [selectedPulseIndex, setSelectedPulseIndex] = useState<number | null>(null);

  const current = signals[activeSignal];

  return (
    <div className="w-full max-w-[580px] overflow-hidden rounded-[14px] border border-[#242D5A] bg-[#0D122B]/95 text-left shadow-2xl backdrop-blur-md transition-all">
      {/* Header bar */}
      <div className="flex items-center gap-2.5 border-b border-white/10 bg-gradient-to-b from-blue/20 to-transparent px-4 py-3">
        <div className="flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-[8px] border border-blue/30 bg-blue/20 shadow-sm">
          <DynamicSketchIcon text="Akashic EIS" className="h-[16px] w-[16px] text-blue-400" />
        </div>
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex items-center gap-2">
            <span className="truncate text-[13.5px] font-bold tracking-tight text-white">
              Akashic EIS &middot; Executive Morning Brief
            </span>
          </div>
          <span className="truncate text-[10.5px] font-medium text-white/60">
            Live Connected Model &middot; {current.provenanceSource}
          </span>
        </div>
        <LiveChip />
      </div>

      {/* Signal Switcher Tabs */}
      <div className="flex border-b border-white/10 bg-white/[0.03] px-3 pt-2">
        {(Object.keys(signals) as SignalKey[]).map((key) => {
          const s = signals[key];
          const isActive = activeSignal === key;
          return (
            <button
              key={key}
              onClick={() => {
                setActiveSignal(key);
                setSelectedPulseIndex(null);
              }}
              className={`flex items-center gap-2 border-b-2 px-3 py-2 text-left font-mono text-[10px] font-bold uppercase tracking-[0.05em] transition-colors ${
                isActive
                  ? "border-blue-400 bg-blue/20 text-blue-400 shadow-sm"
                  : "border-transparent text-white/50 hover:text-white"
              }`}
            >
              <span className="flex h-4 w-4 items-center justify-center rounded bg-blue/20 text-[9px] font-extrabold text-blue-400">
                {s.logo}
              </span>
              <span className="truncate">{s.client.split(" ")[0]}</span>
              <span
                className={`rounded px-1 py-0.5 text-[8px] font-mono ${
                  isActive ? "bg-blue/30 text-blue-300" : "bg-white/10 text-white/40"
                }`}
              >
                {s.daysWarning}d
              </span>
            </button>
          );
        })}
      </div>

      {/* Brief Content Box */}
      <div className="p-4.5">
        <div className="flex items-center justify-between font-mono text-[8.5px] font-bold uppercase tracking-[0.1em] text-blue-400">
          <span>Monday Brief &middot; 06:00 IST</span>
          <span className="flex items-center gap-1.5 rounded-full border border-positive-border bg-positive-subtle/20 px-2 py-0.5 text-positive-text">
            <span className="h-1.5 w-1.5 rounded-full bg-positive" />
            {current.confidence}% Confidence
          </span>
        </div>

        <h4 className="mt-2 text-[15px] font-bold tracking-tight text-white">
          {current.client} Signal Alert
        </h4>

        <div className="mt-2.5 rounded-[10px] border border-blue/30 bg-blue/10 p-3">
          <p className="text-[12.5px] leading-relaxed text-white/90">
            &ldquo;{current.briefText}&rdquo;
          </p>
        </div>

        {/* Pulse Grid with Clickable Provenance Popovers */}
        <div className="mt-4">
          <div className="flex items-baseline justify-between font-mono text-[8px] uppercase tracking-[0.08em] text-white/50">
            <span className="font-bold text-white/80">Business Pulse (Click tile to inspect trace)</span>
            <span>3 Connected Ledgers</span>
          </div>

          <div className="mt-2 grid grid-cols-3 gap-2">
            {current.pulse.map((tile, idx) => {
              const isSelected = selectedPulseIndex === idx;
              return (
                <button
                  key={tile.label}
                  onClick={() => setSelectedPulseIndex(isSelected ? null : idx)}
                  className={`group relative rounded-[9px] border p-2.5 text-left transition-all ${
                    isSelected
                      ? "border-blue-400 bg-blue/30 ring-1 ring-blue-400"
                      : "border-white/10 bg-white/[0.04] hover:border-white/20"
                  }`}
                >
                  <div className="truncate font-mono text-[7.5px] font-bold tracking-[0.07em] text-white/50">
                    {tile.label}
                  </div>
                  <div className="mt-1 inline-block whitespace-nowrap border-b border-dashed border-blue-400/60 font-mono text-[14px] font-bold tracking-tight text-white">
                    {tile.value}
                  </div>
                  <div className="mt-1 truncate text-[8.5px] font-semibold" style={{ color: tile.tone }}>
                    {tile.delta}
                  </div>
                </button>
              );
            })}
          </div>

          {selectedPulseIndex !== null && (
            <div className="mt-2.5 rounded-[9px] border border-blue-400/40 bg-blue/20 p-3 text-[11px] text-white shadow-sm">
              <div className="flex items-center justify-between font-mono text-[8.5px] font-bold uppercase tracking-[0.08em] text-blue-300">
                <span>Provenance Trace &middot; {current.pulse[selectedPulseIndex].label}</span>
                <span className="font-mono text-white/50">Real-time Sync</span>
              </div>
              <p className="mt-1 text-[11.5px] font-semibold text-white">
                Source System: <span className="font-mono text-blue-400">{current.pulse[selectedPulseIndex].source}</span>
              </p>
              <p className="mt-0.5 text-[10.5px] text-white/70">
                Verified against Akashic Master Data spine with zero manual aggregation.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Footer Record Strip */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-dashed border-white/10 bg-white/[0.02] px-4 py-2.5 font-mono text-[8.5px] uppercase tracking-[0.06em] text-white/60">
        <span className="flex items-center gap-1.5">
          <span className="h-[5px] w-[5px] rounded-full bg-blue-400 animate-[ps-pulse_2s_infinite]" />
          <span className="font-bold text-white">06:00</span>
          <span>&middot; 4 SOURCES READ</span>
          <span>&middot; 11 SIGNALS RANKED</span>
        </span>
        <span className="font-bold text-blue-400">CLICK TILES FOR TRACE &rsaquo;</span>
      </div>
    </div>
  );
}
