/*
 * SIMULATED PRODUCT UI — Akashic EIS Interactive Provenance Inspector.
 * Demonstrates how every figure in Akashic EIS carries verifiable provenance
 * in sky glass theme.
 */

"use client";

import { useState } from "react";

type ProvenanceItem = {
  id: string;
  label: string;
  figure: string;
  unit: string;
  sourceSystem: string;
  ledgerTable: string;
  sqlQuery: string;
  freshness: string;
  confidence: number;
  documents: string[];
};

const items: ProvenanceItem[] = [
  {
    id: "arr",
    label: "ACCOUNT ARR EXPOSURE",
    figure: "₹14.2 Cr",
    unit: "Annual Recurring Revenue",
    sourceSystem: "Salesforce CRM & NetSuite ERP",
    ledgerTable: "dbo.contract_agreements UNION dbo.arr_ledger",
    sqlQuery: "SELECT sum(annual_value) FROM msa_contracts WHERE client_id='C01' AND status='active'",
    freshness: "Synced 2 mins ago (06:00 IST)",
    confidence: 99,
    documents: ["Meridian_MSA_2019.pdf", "SOW-04_Orion.pdf"],
  },
  {
    id: "util",
    label: "LEAD ARCHITECT UTILISATION",
    figure: "96%",
    unit: "Vikram Rao Allocation",
    sourceSystem: "Workday HR & OpenAir PSA",
    ledgerTable: "hr.employee_deployments",
    sqlQuery: "SELECT (billable_hours / target_hours) * 100 FROM timesheet_summary WHERE emp_id='E01'",
    freshness: "Synced 15 mins ago (05:47 IST)",
    confidence: 96,
    documents: ["Workday_Talent_Record_E01.pdf"],
  },
  {
    id: "overdue",
    label: "OVERDUE RECEIVABLES",
    figure: "₹2.40 Cr",
    unit: "INV-2026-0309 Aging",
    sourceSystem: "SAP Financials & NetSuite",
    ledgerTable: "finance.ar_aging_buckets",
    sqlQuery: "SELECT sum(amount) FROM ar_invoices WHERE status='overdue' AND client_id='C05'",
    freshness: "Synced 1 min ago (06:01 IST)",
    confidence: 99,
    documents: ["INV-2026-0309_Northwind.pdf"],
  },
];

export default function EisProvenanceInspectorMockup() {
  const [selectedId, setSelectedId] = useState<string>("arr");

  const active = items.find((i) => i.id === selectedId) || items[0];

  return (
    <div className="w-full overflow-hidden rounded-[14px] border border-[#242D5A] bg-[#0D122B]/95 text-left shadow-2xl backdrop-blur-md">
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.03] px-4.5 py-3">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-blue-400" />
          <span className="text-[13.5px] font-bold text-white">
            Akashic EIS &middot; Provenance Inspector
          </span>
        </div>
        <span className="font-mono text-[9px] uppercase tracking-eyebrow text-white/50">
          Click figure to inspect working
        </span>
      </div>

      {/* Figures Selector Bar */}
      <div className="grid grid-cols-1 divide-y sm:grid-cols-3 sm:divide-x sm:divide-y-0 divide-white/10 border-b border-white/10 bg-white/[0.02]">
        {items.map((item) => {
          const isSelected = item.id === selectedId;
          return (
            <button
              key={item.id}
              onClick={() => setSelectedId(item.id)}
              className={`p-4 text-left transition-all ${
                isSelected
                  ? "bg-blue/20 shadow-inner border-b-2 border-blue-400"
                  : "hover:bg-white/[0.04]"
              }`}
            >
              <div className="font-mono text-[8px] font-bold uppercase tracking-[0.08em] text-white/40">
                {item.label}
              </div>
              <div className="mt-1 inline-block border-b-2 border-dashed border-blue-400/60 text-[22px] font-extrabold tracking-tight text-white">
                {item.figure}
              </div>
              <div className="mt-0.5 text-[11px] text-white/60">{item.unit}</div>
            </button>
          );
        })}
      </div>

      {/* Live Unfolded Provenance Drawer */}
      <div className="bg-gradient-to-b from-white/[0.02] to-transparent p-5">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <span className="rounded bg-blue-400 px-2 py-0.5 font-mono text-[9px] font-bold uppercase text-slate-900">
              VERIFIED
            </span>
            <span className="font-mono text-[11px] font-bold text-white">
              {active.figure} &mdash; Provenance Working Paper
            </span>
          </div>
          <span className="flex items-center gap-1.5 font-mono text-[9.5px] font-bold text-positive-text bg-positive-subtle/20 px-2.5 py-1 rounded-full border border-positive-border">
            <span className="h-1.5 w-1.5 rounded-full bg-positive" />
            {active.confidence}% Extraction Confidence
          </span>
        </div>

        {/* Technical Provenance Details */}
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-3">
            <div>
              <span className="font-mono text-[8.5px] font-bold uppercase tracking-[0.08em] text-white/40 block">
                Primary System of Record
              </span>
              <span className="text-[13px] font-semibold text-white">{active.sourceSystem}</span>
            </div>
            <div>
              <span className="font-mono text-[8.5px] font-bold uppercase tracking-[0.08em] text-white/40 block">
                Source Table / Entity
              </span>
              <span className="font-mono text-[11.5px] text-blue-400">{active.ledgerTable}</span>
            </div>
            <div>
              <span className="font-mono text-[8.5px] font-bold uppercase tracking-[0.08em] text-white/40 block">
                Sync Freshness
              </span>
              <span className="text-[12px] text-white/70">{active.freshness}</span>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <span className="font-mono text-[8.5px] font-bold uppercase tracking-[0.08em] text-white/40 block">
                Exact Extraction Expression
              </span>
              <div className="mt-1 overflow-x-auto rounded-[8px] border border-white/15 bg-[#050814] p-2.5 font-mono text-[10.5px] text-blue-300">
                <code>{active.sqlQuery}</code>
              </div>
            </div>
            <div>
              <span className="font-mono text-[8.5px] font-bold uppercase tracking-[0.08em] text-white/40 block">
                Underlying Documents Verified ({active.documents.length})
              </span>
              <div className="mt-1 flex flex-wrap gap-1.5">
                {active.documents.map((doc) => (
                  <span
                    key={doc}
                    className="inline-flex items-center gap-1 rounded border border-blue-400/40 bg-blue/20 px-2 py-1 font-mono text-[9.5px] font-bold text-blue-300 shadow-sm"
                  >
                    📄 {doc}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer bar */}
      <div className="flex items-center justify-between border-t border-dashed border-white/10 bg-white/[0.02] px-4.5 py-2.5 font-mono text-[8.5px] uppercase tracking-[0.06em] text-white/50">
        <span>No Invented Data &middot; Every Number Cross-Examinable</span>
        <span className="font-bold text-blue-400">The Board Test &rsaquo;</span>
      </div>
    </div>
  );
}
