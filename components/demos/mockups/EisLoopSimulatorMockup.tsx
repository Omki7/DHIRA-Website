/*
 * SIMULATED PRODUCT UI — Akashic EIS Interactive Decision Loop Console Simulator.
 * Sourced from the EIS prototype (eis/actions.js).
 * Interactive features in sky glass theme.
 */

"use client";

import { useState } from "react";

type ScenarioType = "lose" | "util" | "renew";

export default function EisLoopSimulatorMockup() {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [activeScenario, setActiveScenario] = useState<ScenarioType>("lose");
  const [selectedQuestion, setSelectedQuestion] = useState<string>("What happens to FY27 if we lose this client?");
  const [approvalState, setApprovalState] = useState<"idle" | "approved">("idle");
  const [auditLog, setAuditLog] = useState<string[]>([]);

  const questions = [
    "What happens to FY27 if we lose this client?",
    "Which principal architect can backfill Orion Commerce?",
    "Has Hanseatic Bank approved milestone M7?",
  ];

  const handleApprove = () => {
    setApprovalState("approved");
    const newEntry = `09:14 IST · D. Rao · Raise milestone invoice · ₹48 L · Approver: CFO · Wrote to SAP Billing · ACT-${Math.floor(
      1000 + Math.random() * 9000
    )}`;
    setAuditLog((prev) => [newEntry, ...prev]);
    setActiveStep(5);
  };

  return (
    <div className="w-full overflow-hidden rounded-[14px] border border-[#242D5A] bg-[#0D122B]/95 text-left shadow-2xl backdrop-blur-md">
      {/* Header Chrome */}
      <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.03] px-4.5 py-3">
        <div className="flex items-center gap-2">
          <span className="flex gap-1.5" aria-hidden>
            <span className="h-[9px] w-[9px] rounded-full bg-white/20" />
            <span className="h-[9px] w-[9px] rounded-full bg-white/20" />
            <span className="h-[9px] w-[9px] rounded-full bg-white/20" />
          </span>
          <span className="text-[13.5px] font-bold tracking-tight text-white">
            Akashic EIS &middot; Decision Loop Simulator
          </span>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-[6px] border border-blue-400/40 bg-blue/20 px-2 py-0.5 font-mono text-[8.5px] font-bold text-blue-400">
          <span className="h-[5px] w-[5px] rounded-full bg-blue-400 animate-[ps-pulse_2s_infinite]" />
          SIMULATOR READY
        </span>
      </div>

      {/* 5-Station Stepper Bar */}
      <div className="flex border-b border-white/10 bg-white/[0.02] px-2 pt-2">
        {[
          { num: "01", label: "Signal" },
          { num: "02", label: "Question" },
          { num: "03", label: "Scenario" },
          { num: "04", label: "Decision" },
          { num: "05", label: "Record" },
        ].map((s, idx) => {
          const stepNum = idx + 1;
          const isActive = activeStep === stepNum;
          return (
            <button
              key={s.num}
              onClick={() => setActiveStep(stepNum)}
              className={`flex flex-1 items-center justify-center gap-1.5 border-b-2 py-2 text-center font-mono text-[10px] font-bold uppercase transition-all ${
                isActive
                  ? "border-blue-400 bg-blue/20 text-blue-400 shadow-sm"
                  : "border-transparent text-white/50 hover:text-white"
              }`}
            >
              <span className={`flex h-4 w-4 items-center justify-center rounded-full text-[9px] ${
                isActive ? "bg-blue-400 text-slate-900 font-extrabold" : "bg-white/10 text-white/40"
              }`}>
                {s.num}
              </span>
              <span className="hidden sm:inline">{s.label}</span>
            </button>
          );
        })}
      </div>

      {/* Dynamic Console Body per Step */}
      <div className="p-5">
        {activeStep === 1 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between font-mono text-[8.5px] font-bold uppercase tracking-[0.08em] text-blue-400">
              <span>Step 01 &middot; Prioritised Signal Discovery</span>
              <span>Rank 1 of 11</span>
            </div>
            <div className="flex items-start gap-3 rounded-[10px] border border-[#E3D5BC]/30 bg-[#FDF9F1]/10 p-3.5">
              <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-[#C0883A] animate-[ps-pulse_2s_infinite]" />
              <div>
                <h4 className="text-[14px] font-bold text-white">
                  Meridian Retail Group &middot; High Converged Risk
                </h4>
                <p className="mt-1 text-[12.5px] leading-relaxed text-white/80">
                  Contract renewal (18d), delivery slip (-11d), and key-person exit risk (Vikram Rao) converge on the same account.
                </p>
              </div>
            </div>
            <div className="flex justify-end pt-2">
              <button
                onClick={() => setActiveStep(2)}
                className="btn-primary text-xs"
              >
                Ask Questions &rsaquo;
              </button>
            </div>
          </div>
        )}

        {activeStep === 2 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between font-mono text-[8.5px] font-bold uppercase tracking-[0.08em] text-blue-400">
              <span>Step 02 &middot; Grounded Plain-Language Question</span>
              <span>Ask Akashic Powered</span>
            </div>

            <div className="space-y-1.5">
              <span className="font-mono text-[8px] uppercase tracking-eyebrow text-white/40 block">Select a question:</span>
              <div className="flex flex-wrap gap-1.5">
                {questions.map((q) => (
                  <button
                    key={q}
                    onClick={() => setSelectedQuestion(q)}
                    className={`rounded-[7px] border px-3 py-1.5 text-[11.5px] text-left transition-colors ${
                      selectedQuestion === q
                        ? "border-blue-400 bg-blue/20 text-blue-300 font-semibold"
                        : "border-white/10 bg-white/[0.04] text-white/70 hover:text-white"
                    }`}
                  >
                    &ldquo;{q}&rdquo;
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-[10px] border border-blue-400/30 bg-blue/10 p-3.5">
              <p className="text-[13px] font-semibold text-white">
                &ldquo;{selectedQuestion}&rdquo;
              </p>
              <div className="mt-2 text-[12.5px] leading-relaxed text-white/90">
                Revenue Impact: <strong className="border-b border-dashed border-blue-400/60 text-blue-400">&minus;₹14.2 Cr ARR</strong> (10% of total run-rate). Margin impact: &minus;1.8pts.
              </div>
              <p className="mt-2 font-mono text-[8.5px] text-white/40 uppercase">
                Sources cited: SAP Financial Ledger &middot; Salesforce Contract K01 &middot; Workday HR
              </p>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setActiveStep(3)}
                className="btn-primary text-xs"
              >
                Test Scenarios &rsaquo;
              </button>
            </div>
          </div>
        )}

        {activeStep === 3 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between font-mono text-[8.5px] font-bold uppercase tracking-[0.08em] text-blue-400">
              <span>Step 03 &middot; Named Scenario Modelling</span>
              <span>Named Scenarios Only (Rule 4)</span>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveScenario("lose")}
                className={`rounded-full border px-3 py-1.5 font-mono text-[9.5px] font-bold uppercase transition-all ${
                  activeScenario === "lose"
                    ? "border-blue-400 bg-blue-400 text-slate-900 shadow-sm"
                    : "border-white/10 bg-white/[0.04] text-white/60 hover:text-white"
                }`}
              >
                Lose this Client (-10%)
              </button>
              <button
                onClick={() => setActiveScenario("util")}
                className={`rounded-full border px-3 py-1.5 font-mono text-[9.5px] font-bold uppercase transition-all ${
                  activeScenario === "util"
                    ? "border-blue-400 bg-blue-400 text-slate-900 shadow-sm"
                    : "border-white/10 bg-white/[0.04] text-white/60 hover:text-white"
                }`}
              >
                Utilisation &minus;10%
              </button>
              <button
                onClick={() => setActiveScenario("renew")}
                className={`rounded-full border px-3 py-1.5 font-mono text-[9.5px] font-bold uppercase transition-all ${
                  activeScenario === "renew"
                    ? "border-blue-400 bg-blue-400 text-slate-900 shadow-sm"
                    : "border-white/10 bg-white/[0.04] text-white/60 hover:text-white"
                }`}
              >
                Renewal at +5%
              </button>
            </div>

            <div className="rounded-[10px] border border-white/10 bg-white/[0.03] p-3.5">
              <div className="flex items-baseline justify-between font-mono text-[9px] uppercase tracking-[0.06em]">
                <span className="text-white/60">FY27 Projected Run-Rate Variance</span>
                <span className="font-bold text-white">
                  {activeScenario === "lose" ? "-10.0%" : activeScenario === "util" ? "-4.2%" : "+5.0%"}
                </span>
              </div>
              <div className="relative mt-3 h-[10px] rounded-full bg-white/10 overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-400 to-positive transition-all duration-500"
                  style={{
                    width: activeScenario === "lose" ? "70%" : activeScenario === "util" ? "82%" : "98%",
                  }}
                />
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setActiveStep(4)}
                className="btn-primary text-xs"
              >
                Compose Action &rsaquo;
              </button>
            </div>
          </div>
        )}

        {activeStep === 4 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between font-mono text-[8.5px] font-bold uppercase tracking-[0.08em] text-blue-400">
              <span>Step 04 &middot; Governed Decision Gate</span>
              <span>Requires Named Approver</span>
            </div>

            <div className="rounded-[10px] border border-white/10 bg-white/[0.03] p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-[14px] font-bold text-white">Raise Milestone Invoice &middot; ₹48 L</h4>
                  <p className="font-mono text-[9px] uppercase text-white/40 mt-0.5">
                    Target System: SAP Billing &middot; Approver: CFO
                  </p>
                </div>
                {approvalState === "approved" ? (
                  <span className="rounded-[7px] bg-positive px-3.5 py-2 font-mono text-[10px] font-bold text-white flex items-center gap-1.5">
                    ✓ APPROVED &amp; LOGGED
                  </span>
                ) : (
                  <button
                    onClick={handleApprove}
                    className="rounded-[7px] bg-white px-4 py-2 font-mono text-[10px] font-bold text-slate-900 hover:bg-blue-400 transition-colors shadow-sm"
                  >
                    APPROVE ACTION
                  </button>
                )}
              </div>
            </div>

            {approvalState === "approved" && (
              <p className="font-mono text-[10px] text-positive-text font-bold">
                ✓ Decision committed. Audit log entry recorded in Step 05 below.
              </p>
            )}
          </div>
        )}

        {activeStep === 5 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between font-mono text-[8.5px] font-bold uppercase tracking-[0.08em] text-blue-400">
              <span>Step 05 &middot; Immutable Append-Only Audit Log</span>
              <span>Governed Record</span>
            </div>

            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 rounded-[10px] border border-blue-400/40 bg-blue/20 p-3 font-mono text-[9.5px] text-white font-semibold">
                <span className="h-[6px] w-[6px] rounded-full bg-blue-400 animate-[ps-pulse_2s_infinite]" />
                <span>09:14 IST</span>
                <span className="text-white/30">&middot;</span> D. Rao
                <span className="text-white/30">&middot;</span> Raise milestone invoice
                <span className="text-white/30">&middot;</span> ₹48 L
                <span className="text-white/30">&middot;</span> CFO Approved
                <span className="text-white/30">&middot;</span> <span className="text-blue-400">ACT-4417</span>
              </div>

              {auditLog.map((log, idx) => (
                <div
                  key={idx}
                  className="flex flex-wrap items-center gap-x-2 gap-y-1 rounded-[10px] border border-white/10 bg-white/[0.03] p-3 font-mono text-[9px] text-white/70"
                >
                  <span className="h-[5px] w-[5px] rounded-full bg-positive" />
                  <span>{log}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer bar */}
      <div className="flex items-center justify-between border-t border-dashed border-white/10 bg-white/[0.02] px-4.5 py-2.5 font-mono text-[8.5px] uppercase tracking-[0.06em] text-white/50">
        <span>One Surface &middot; Description Meets Decision</span>
        <span className="font-bold text-blue-400">Tomorrow's Brief Ready &rsaquo;</span>
      </div>
    </div>
  );
}
