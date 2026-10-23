"use client";

import { useState } from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import SectionHeader from "@/components/ui/SectionHeader";
import type { EisPage } from "@/content/pages/solutions-eis";

/* [capabilities] — Section [03]: Enterprise Governance
 * Rebuilt from generic card grid to an interactive Executive Governance Studio.
 * Adheres strictly to Section Grammar: FigureEyebrow [03] ENTERPRISE GOVERNANCE,
 * two-tone headline, lede directly below, ScrollRevealRail layout.
 */

type GuaranteeId = "metric" | "correlation" | "execution";

interface Guarantee {
  id: GuaranteeId;
  num: string;
  tag: string;
  title: string;
  headline: string;
  summary: string;
  proofs: string[];
}

const GUARANTEES: Guarantee[] = [
  {
    id: "metric",
    num: "01",
    tag: "GROUND TRUTH",
    title: "Governed Metric Layer",
    headline: "Every figure shows its mathematical working. Zero hallucinated SQL.",
    summary:
      "Questions resolve against pre-defined, permissioned business definitions rather than on-the-fly database queries. Every metric exposes its exact calculation, entity consolidations, FX rates, and upstream transaction lineage.",
    proofs: ["100% Deterministic Logic", "Row-Level Security Enforced", "Complete Data Lineage"],
  },
  {
    id: "correlation",
    num: "02",
    tag: "EARLY WARNING",
    title: "Continuous Risk Correlation",
    headline: "Cross-department risks detected 30 days before month-end.",
    summary:
      "Autonomous background agents continuously monitor the knowledge graph. When delivery milestones slip in Jira, invoices age in ERPNext, and key architects trigger attrition risks in Workday, leadership is alerted before margins erode.",
    proofs: ["Autonomous Graph Scanning", "Cross-Silo Triangulation", "Zero Polling Required"],
  },
  {
    id: "execution",
    num: "03",
    tag: "POLICY CONTROL",
    title: "Dual-Key Human Execution",
    headline: "Strict segregation of composition and executive authorization.",
    summary:
      "Decisions are structured, typed operational interventions, not informal emails. Composition rights are strictly separated from authorization rights, guaranteeing no automated action touches source systems without named human sign-off.",
    proofs: ["Segregation of Duties", "Dual-Key Sign-Off", "Cryptographic Audit Trail"],
  },
];

export default function EisCapabilities({ content }: { content: EisPage["capabilities"] }) {
  const [activeId, setActiveId] = useState<GuaranteeId>("metric");
  const [isAuthorized, setIsAuthorized] = useState(false);

  return (
    <section
      id="capabilities"
      className="relative w-full scroll-mt-24 overflow-clip bg-background pt-12 pb-16 lg:pt-16 lg:pb-24"
    >
      <ScrollRevealRail>
        <SectionHeader
          num="03"
          label="ENTERPRISE GOVERNANCE"
          setup={content.setup}
          payoff={content.payoff}
          lede={content.lede}
        />

        {/* Studio Container: Master-Detail Architecture */}
        <div className="mt-12 lg:mt-14">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8 items-stretch">
            
            {/* Left Column: 3 Architectural Guarantees (Selectors) */}
            <div className="flex flex-col gap-3 lg:col-span-5">
              {GUARANTEES.map((g) => {
                const isSelected = activeId === g.id;
                return (
                  <button
                    key={g.id}
                    type="button"
                    onClick={() => {
                      setActiveId(g.id);
                      if (g.id !== "execution") setIsAuthorized(false);
                    }}
                    className={`group relative flex flex-col text-left rounded-outer border p-5 sm:p-6 transition-all duration-200 ${
                      isSelected
                        ? "border-blue bg-primary-bg shadow-sm"
                        : "border-lineSoft bg-background hover:border-line hover:bg-primary-bg/50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span
                          className={`font-mono text-[10px] font-bold tracking-eyebrow uppercase px-2 py-0.5 rounded-[4px] border ${
                            isSelected
                              ? "bg-blue text-white border-blue"
                              : "bg-primary-bg text-secondary-text border-card-line"
                          }`}
                        >
                          {g.tag}
                        </span>
                        <span className="font-mono text-[11px] text-tertiary-text">
                          {g.num} / 03
                        </span>
                      </div>
                      <span
                        className={`h-2 w-2 rounded-full transition-transform duration-200 ${
                          isSelected ? "bg-blue scale-125" : "bg-lineSoft group-hover:bg-line"
                        }`}
                      />
                    </div>

                    <h3 className="mt-3 text-[17px] font-semibold tracking-tight text-ink sm:text-[19px]">
                      {g.title}
                    </h3>

                    <p className="mt-2 text-[13px] leading-relaxed text-secondary-text">
                      {g.headline}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-1.5 pt-3 border-t border-card-divide">
                      {g.proofs.map((proof) => (
                        <span
                          key={proof}
                          className="font-mono text-[9.5px] text-tertiary-text rounded-[4px] bg-background border border-card-line px-2 py-0.5"
                        >
                          {proof}
                        </span>
                      ))}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right Column: Live Governance Inspector Workbench */}
            <div className="lg:col-span-7">
              <ScrollReveal delay={100}>
                <div className="h-full flex flex-col rounded-outer border border-line bg-background shadow-sm overflow-hidden">
                  
                  {/* Console Header Bar */}
                  <div className="flex items-center justify-between border-b border-lineSoft bg-primary-bg px-4 py-3 sm:px-6">
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-red/60" />
                      <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/60" />
                      <span className="h-2.5 w-2.5 rounded-full bg-positive/60" />
                      <span className="ml-2 font-mono text-[10.5px] font-medium text-tertiary-text">
                        akashic.dhira.ai/governance/inspector
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="flex h-1.5 w-1.5 rounded-full bg-positive animate-pulse" />
                      <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-ink">
                        G-1 Verified
                      </span>
                    </div>
                  </div>

                  {/* Active Inspector Panel Content */}
                  <div className="flex-1 p-5 sm:p-7">
                    
                    {/* PANEL 1: Governed Metric Layer */}
                    {activeId === "metric" && (
                      <div className="flex flex-col gap-5 animate-in fade-in duration-200">
                        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-lineSoft pb-4">
                          <div>
                            <span className="font-mono text-[10px] uppercase tracking-wider text-blue font-semibold">
                              Metric Lineage Inspector
                            </span>
                            <h4 className="text-[20px] font-semibold text-ink tracking-tight mt-0.5">
                              Net ARR at Risk
                            </h4>
                          </div>
                          <div className="text-left sm:text-right">
                            <span className="font-heading text-[26px] font-bold text-ink leading-none tabular-nums">
                              $180,000
                            </span>
                            <span className="block font-mono text-[10px] text-positive font-medium mt-0.5">
                              100% Deterministic · Zero Hallucination
                            </span>
                          </div>
                        </div>

                        {/* Mathematical Definition Formula */}
                        <div className="rounded-card border border-lineSoft bg-primary-bg p-4">
                          <span className="block font-mono text-[9.5px] uppercase tracking-wider text-tertiary-text font-bold">
                            Governed Calculation Logic
                          </span>
                          <code className="mt-2 block font-mono text-[12px] text-ink bg-background p-2.5 rounded border border-card-line">
                            Net_Risk = &sum;(Contract_ARR &times; Weight) where (DSO &gt; 60 &or; Project_RAG = &quot;Red&quot;)
                          </code>
                          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-secondary-text">
                            <div>
                              <span className="font-semibold text-ink">Consolidation:</span> 12 entities, intercompany eliminated
                            </div>
                            <div>
                              <span className="font-semibold text-ink">Rate Policy:</span> Corporate FX locked 01 Oct 2026
                            </div>
                          </div>
                        </div>

                        {/* Upstream Lineage Node Trace */}
                        <div>
                          <span className="block font-mono text-[9.5px] uppercase tracking-wider text-tertiary-text font-bold mb-2.5">
                            Upstream Lineage Verification (Source-to-Screen)
                          </span>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between p-2.5 rounded border border-lineSoft bg-background text-[12px]">
                              <div className="flex items-center gap-2.5">
                                <span className="font-mono text-[10px] font-bold uppercase text-blue px-1.5 py-0.5 bg-blue-subtle rounded border border-blue-border">
                                  CRM
                                </span>
                                <span className="font-medium text-ink">Salesforce Opportunity</span>
                              </div>
                              <span className="font-mono text-[11px] text-tertiary-text">Opp #4012 · Northwind</span>
                            </div>

                            <div className="flex items-center justify-between p-2.5 rounded border border-lineSoft bg-background text-[12px]">
                              <div className="flex items-center gap-2.5">
                                <span className="font-mono text-[10px] font-bold uppercase text-positive px-1.5 py-0.5 bg-positive-subtle rounded border border-positive-border">
                                  ERP
                                </span>
                                <span className="font-medium text-ink">ERPNext Accounts Receivable</span>
                              </div>
                              <span className="font-mono text-[11px] text-tertiary-text">Inv #8942 · 74 Days Overdue</span>
                            </div>

                            <div className="flex items-center justify-between p-2.5 rounded border border-lineSoft bg-background text-[12px]">
                              <div className="flex items-center gap-2.5">
                                <span className="font-mono text-[10px] font-bold uppercase text-purple-600 px-1.5 py-0.5 bg-purple-50 rounded border border-purple-200">
                                  DELIVERY
                                </span>
                                <span className="font-medium text-ink">Jira Delivery Milestones</span>
                              </div>
                              <span className="font-mono text-[11px] text-tertiary-text">Project P-104 · CR-07 Scope Dispute</span>
                            </div>
                          </div>
                        </div>

                        <div className="rounded border border-positive-border bg-positive-subtle/50 px-3.5 py-2.5 flex items-center justify-between">
                          <span className="text-[12px] font-medium text-ink">
                            Row-level permission verified for Chief Executive seat.
                          </span>
                          <span className="font-mono text-[10px] text-positive font-bold uppercase">
                            Audited OK
                          </span>
                        </div>
                      </div>
                    )}

                    {/* PANEL 2: Continuous Risk Correlation Radar */}
                    {activeId === "correlation" && (
                      <div className="flex flex-col gap-5 animate-in fade-in duration-200">
                        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-lineSoft pb-4">
                          <div>
                            <span className="font-mono text-[10px] uppercase tracking-wider text-red font-semibold">
                              Triangulated Risk Signal
                            </span>
                            <h4 className="text-[20px] font-semibold text-ink tracking-tight mt-0.5">
                              Northwind Insurance Exposure
                            </h4>
                          </div>
                          <div className="text-left sm:text-right">
                            <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-bold text-red bg-red/10 border border-red/20 px-2.5 py-1 rounded-full">
                              <span className="h-1.5 w-1.5 rounded-full bg-red animate-pulse" />
                              RENEWAL IN 18 DAYS
                            </span>
                          </div>
                        </div>

                        {/* Triangulated Signal Cards */}
                        <div className="space-y-2.5">
                          <div className="rounded border border-red/20 bg-red/5 p-3 sm:p-3.5">
                            <div className="flex items-center justify-between font-mono text-[10px]">
                              <span className="font-bold text-red uppercase">Signal 01 · CRM</span>
                              <span className="text-tertiary-text">Updated 2 min ago</span>
                            </div>
                            <p className="mt-1 text-[13px] font-medium text-ink">
                              MSA renewal due 22 Oct. Primary executive sponsor (VP Claims) resigned; replacement unengaged.
                            </p>
                          </div>

                          <div className="rounded border border-yellow-500/25 bg-yellow-500/5 p-3 sm:p-3.5">
                            <div className="flex items-center justify-between font-mono text-[10px]">
                              <span className="font-bold text-yellow-600 uppercase">Signal 02 · Delivery</span>
                              <span className="text-tertiary-text">Updated 1 min ago</span>
                            </div>
                            <p className="mt-1 text-[13px] font-medium text-ink">
                              Project P-104 is 3 weeks behind plan. Fixed-price budget exceeded by $61,000 due to change request dispute.
                            </p>
                          </div>

                          <div className="rounded border border-yellow-500/25 bg-yellow-500/5 p-3 sm:p-3.5">
                            <div className="flex items-center justify-between font-mono text-[10px]">
                              <span className="font-bold text-yellow-600 uppercase">Signal 03 · Finance</span>
                              <span className="text-tertiary-text">Updated 4 min ago</span>
                            </div>
                            <p className="mt-1 text-[13px] font-medium text-ink">
                              Invoice #8942 for $118,000 is 74 days overdue. Account NPS dropped from 48 to 12.
                            </p>
                          </div>
                        </div>

                        {/* Correlation Insight Box */}
                        <div className="rounded-card border border-blue-border bg-blue-subtle/50 p-4">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-blue">
                              Autonomous Synthesis
                            </span>
                          </div>
                          <p className="mt-1.5 text-[12.5px] leading-relaxed text-ink">
                            Independent departmental tools treat these as three isolated low-priority items. When correlated across the knowledge graph, renewal probability drops from <span className="font-semibold">85%</span> to <span className="font-semibold text-red">22%</span>.
                          </p>
                        </div>
                      </div>
                    )}

                    {/* PANEL 3: Dual-Key Human Execution */}
                    {activeId === "execution" && (
                      <div className="flex flex-col gap-5 animate-in fade-in duration-200">
                        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-lineSoft pb-4">
                          <div>
                            <span className="font-mono text-[10px] uppercase tracking-wider text-blue font-semibold">
                              Executive Decision Gate · G-1
                            </span>
                            <h4 className="text-[20px] font-semibold text-ink tracking-tight mt-0.5">
                              Policy-Checked Intervention
                            </h4>
                          </div>
                          <div className="text-left sm:text-right">
                            <span className="font-mono text-[10px] text-secondary-text">
                              Segregation of Duties Enforced
                            </span>
                          </div>
                        </div>

                        {/* Action Details Card */}
                        <div className="rounded-card border border-lineSoft bg-primary-bg p-4 space-y-3">
                          <div>
                            <span className="block font-mono text-[9.5px] uppercase tracking-wider text-tertiary-text font-bold">
                              Proposed Action
                            </span>
                            <p className="mt-1 text-[13.5px] font-medium text-ink">
                              Escalate Northwind renewal to executive steering committee &amp; issue aged AR statement with credit freeze.
                            </p>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-card-divide text-[11.5px]">
                            <div>
                              <span className="text-secondary-text">Composed by:</span>{" "}
                              <span className="font-semibold text-ink">Neha P. (FP&amp;A)</span>
                              <span className="block font-mono text-[9.5px] text-tertiary-text">Cannot self-authorize</span>
                            </div>
                            <div>
                              <span className="text-secondary-text">Required Sign-off:</span>{" "}
                              <span className="font-semibold text-ink">Dilip H. (CEO)</span>
                              <span className="block font-mono text-[9.5px] text-blue font-medium">Dual-Key Authority</span>
                            </div>
                          </div>
                        </div>

                        {/* Live Interactive Authorization Simulation */}
                        <div className="rounded border border-lineSoft bg-background p-4 text-center">
                          {!isAuthorized ? (
                            <div className="flex flex-col items-center gap-3">
                              <p className="text-[12.5px] text-secondary-text">
                                Action is held behind the G-1 policy gate. Systems remain strictly read-only until human sign-off.
                              </p>
                              <button
                                type="button"
                                onClick={() => setIsAuthorized(true)}
                                className="btn-primary py-2.5 px-6 text-[13px]"
                              >
                                Sign &amp; Authorise Intervention
                              </button>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center gap-2 text-left w-full animate-in fade-in duration-300">
                              <div className="flex items-center gap-2 text-positive font-semibold text-[13.5px]">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                                  <polyline points="20 6 9 17 4 12" />
                                </svg>
                                <span>Action Authorised &amp; Committed</span>
                              </div>
                              <div className="w-full mt-2 font-mono text-[10.5px] text-secondary-text bg-primary-bg p-3 rounded border border-card-line space-y-1">
                                <div><span className="text-tertiary-text">SIGNATURE:</span> SHA-256: 8f9a2e1d7c4b0a...c41e</div>
                                <div><span className="text-tertiary-text">AUDIT LOG:</span> Immutable record committed at 18:25:40 UTC</div>
                                <div><span className="text-tertiary-text">WRITE-BACK:</span> Salesforce &amp; ERPNext updated via scoped principal</div>
                              </div>
                              <button
                                type="button"
                                onClick={() => setIsAuthorized(false)}
                                className="mt-2 text-[11px] font-mono text-tertiary-text underline hover:text-ink"
                              >
                                Reset simulation
                              </button>
                            </div>
                          )}
                        </div>

                      </div>
                    )}

                  </div>

                  {/* Console Footer Status */}
                  <div className="border-t border-lineSoft bg-primary-bg px-4 py-2.5 sm:px-6 flex items-center justify-between text-[11px] font-mono text-tertiary-text">
                    <span>Audit trail: cryptographically verified</span>
                    <span>Zero data mutation without executive consent</span>
                  </div>

                </div>
              </ScrollReveal>
            </div>

          </div>
        </div>
      </ScrollRevealRail>
    </section>
  );
}
