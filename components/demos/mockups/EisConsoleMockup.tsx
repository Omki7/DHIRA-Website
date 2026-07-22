/*
 * SIMULATED PRODUCT UI — Akashic EIS, the full console mockup.
 * Sourced from EIS prototype (eis/data.js).
 */

"use client";

import { useState } from "react";

const sources = [
  { name: "Salesforce", kind: "CRM", sync: "2 min" },
  { name: "SAP", kind: "ERP", sync: "2 min" },
  { name: "Workday", kind: "HR", sync: "6 min" },
  { name: "Jira", kind: "Delivery", sync: "1 min" },
];

const standings = [
  { label: "Largest exposure", value: "₹14.2", unit: "Cr", note: "Meridian Retail", tone: "warn" },
  { label: "Days to act", value: "18", unit: "days", note: "Before renewal lapses", tone: "warn" },
  { label: "Waiting on you", value: "5", unit: "approvals", note: "2 over ₹25 L", tone: "calm" },
];

const pillars = [
  { name: "Clients", count: "48", dot: true, icon: "M3 21h18M5 21V7l7-4 7 4v14M10 21v-4h4v4" },
  { name: "Projects", count: "31", icon: "M3 7h6l2 2h10v10H3z" },
  { name: "Employees", count: "1,840", icon: "M12 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM5 20a7 7 0 0 1 14 0" },
  { name: "Financials", count: "₹142Cr", icon: "M4 20V11M10 20V4M16 20v-6M2 20h20" },
];

function NavIcon({ path }: { path: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-[14px] w-[14px] shrink-0"
      aria-hidden
    >
      <path d={path} />
    </svg>
  );
}

export default function EisConsoleMockup() {
  const [approved, setApproved] = useState(false);

  return (
    <div className="w-full overflow-hidden rounded-[14px] border border-[#242D5A] bg-[#0D122B]/95 text-left shadow-2xl backdrop-blur-md">
      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden w-[186px] shrink-0 flex-col border-r border-white/10 bg-white/[0.02] lg:flex">
          <div className="flex items-center gap-2.5 border-b border-white/10 px-4 py-3.5">
            <span className="flex h-[26px] w-[26px] items-center justify-center rounded-[7px] bg-blue-400 text-[12px] font-semibold text-slate-900">
              A
            </span>
            <span className="min-w-0">
              <span className="block text-[12.5px] font-semibold leading-tight tracking-tight text-white">
                Akashic
              </span>
              <span className="block font-mono text-[7.5px] uppercase tracking-[0.1em] text-white/40">
                Nexora &middot; EIS
              </span>
            </span>
          </div>

          <nav className="px-2.5 pt-3">
            <span className="flex items-center gap-2.5 rounded-[7px] bg-blue/20 px-2.5 py-[7px] text-[12px] font-semibold text-blue-400 border border-blue-400/30">
              <NavIcon path="M3 10.5 12 3l9 7.5M5.5 9.5V20h13V9.5" />
              Home
            </span>
            <span className="mt-0.5 flex items-center gap-2.5 rounded-[7px] px-2.5 py-[7px] text-[12px] text-white/60">
              <NavIcon path="M12 3a9 9 0 1 0 4.5 16.8L21 21l-1.2-4.5A9 9 0 0 0 12 3Z" />
              Ask Akashic
            </span>
            <span className="mt-0.5 flex items-center gap-2.5 rounded-[7px] px-2.5 py-[7px] text-[12px] text-white/60">
              <NavIcon path="M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18Zm-3 9 2.2 2.2L15 10" />
              Approvals
              <span className="ml-auto rounded-[5px] bg-[#FDF9F1]/10 px-1.5 py-[1px] font-mono text-[8.5px] font-bold text-[#E3D5BC]">
                5
              </span>
            </span>
          </nav>

          <p className="px-4 pb-1.5 pt-4 font-mono text-[7.5px] font-bold uppercase tracking-[0.12em] text-white/40">
            Pillars
          </p>
          <nav className="px-2.5">
            {pillars.map((p) => (
              <span
                key={p.name}
                className="mt-0.5 flex items-center gap-2.5 rounded-[7px] px-2.5 py-[7px] text-[12px] text-white/60"
              >
                <NavIcon path={p.icon} />
                <span className="truncate">{p.name}</span>
                {p.dot && <span className="h-[4px] w-[4px] shrink-0 rounded-full bg-blue-400" aria-hidden />}
                <span className="ml-auto shrink-0 rounded-[5px] bg-white/10 px-1.5 py-[1px] font-mono text-[8.5px] text-white/50">
                  {p.count}
                </span>
              </span>
            ))}
          </nav>

          <p className="px-4 pb-1.5 pt-4 font-mono text-[7.5px] font-bold uppercase tracking-[0.12em] text-white/40">
            Trust layer
          </p>
          <nav className="px-2.5 pb-4">
            <span className="flex items-center gap-2.5 rounded-[7px] px-2.5 py-[7px] text-[12px] text-white/60">
              <NavIcon path="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8zM14 3v5h5" />
              Documents
              <span className="ml-auto rounded-[5px] bg-white/10 px-1.5 py-[1px] font-mono text-[8.5px] text-white/50">
                14
              </span>
            </span>
          </nav>
        </aside>

        {/* Main Console */}
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex items-center gap-3 border-b border-white/10 px-4 py-2.5 md:px-5">
            <span className="hidden items-center gap-1.5 font-mono text-[9.5px] uppercase tracking-[0.08em] text-white/40 sm:flex">
              Home
              <span className="text-white/20">&rsaquo;</span>
              <span className="text-white">Intelligence feed</span>
            </span>
            <span className="ml-auto flex h-[27px] min-w-0 flex-1 items-center gap-2 rounded-[8px] border border-white/10 bg-white/[0.04] px-2.5 sm:max-w-[220px]">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-3 w-3 shrink-0 text-white/40" aria-hidden>
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" strokeLinecap="round" />
              </svg>
              <span className="truncate text-[11px] text-white/40">Search anything</span>
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 border-b border-white/10 bg-white/[0.02] px-4 py-2.5 md:px-5">
            <span className="flex items-center gap-1.5 font-mono text-[8px] font-bold uppercase tracking-[0.1em] text-white/40">
              <span className="h-[5px] w-[5px] rounded-full bg-positive animate-[ps-pulse_2s_infinite]" aria-hidden />
              Reading
            </span>
            <div className="flex flex-wrap items-center gap-1.5">
              {sources.map((s) => (
                <span
                  key={s.name}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.05] px-2 py-[3px]"
                >
                  <span className="text-[10.5px] font-semibold text-white">{s.name}</span>
                  <span className="font-mono text-[8px] uppercase tracking-[0.06em] text-white/40">
                    {s.kind}
                  </span>
                  <span className="font-mono text-[8px] text-positive-text">{s.sync}</span>
                </span>
              ))}
            </div>
          </div>

          <div className="px-4 pt-4 md:px-5">
            <p className="font-mono text-[8.5px] font-bold uppercase tracking-[0.12em] text-blue-400">
              Monday &middot; 04 June 2026
              <span className="text-white/40"> &middot; 06:00 &middot; CEO view</span>
            </p>
            <h3 className="mt-1.5 text-[21px] font-semibold tracking-tight text-white md:text-[25px]">
              Good morning, Arjun.
            </h3>

            <p className="mt-2 max-w-[54em] text-[12.5px] leading-relaxed text-white/80 md:text-[13px]">
              <span className="font-semibold text-white">Meridian Retail is your single largest exposure.</span>{" "}
              A{" "}
              <span className="border-b border-dashed border-blue-400/60 font-medium text-blue-400">renewal</span>,
              a{" "}
              <span className="border-b border-dashed border-blue-400/60 font-medium text-blue-400">delivery slip</span>,
              and a{" "}
              <span className="border-b border-dashed border-blue-400/60 font-medium text-blue-400">key-person exit</span>{" "}
              converge on the same account in the next 18 days.
            </p>

            <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-3">
              {standings.map((s) => (
                <div
                  key={s.label}
                  className="rounded-[10px] border border-white/10 bg-white/[0.03] px-3 py-2"
                >
                  <span className="block font-mono text-[8px] font-bold uppercase tracking-[0.09em] text-white/40">
                    {s.label}
                  </span>
                  <span className="mt-1 flex items-baseline gap-1">
                    <span
                      className={`border-b border-dashed text-[19px] font-semibold tracking-tight ${
                        s.tone === "warn"
                          ? "border-[#C0883A]/50 text-[#E3D5BC]"
                          : "border-blue-400/50 text-white"
                      }`}
                    >
                      {s.value}
                    </span>
                    <span className="text-[10px] font-medium text-white/40">{s.unit}</span>
                  </span>
                  <span className="mt-0.5 block truncate text-[9.5px] text-white/60">{s.note}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 border-t border-white/10 bg-white/[0.02] px-4 py-3.5 md:px-5">
            <div className="flex items-baseline justify-between gap-3">
              <p className="font-mono text-[8px] font-bold uppercase tracking-[0.11em] text-white/40">
                Decision, ready to send
              </p>
            </div>

            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2.5 rounded-[10px] border border-white/10 bg-white/[0.04] px-3 py-2.5">
              <span className="min-w-0">
                <span className="block text-[13px] font-semibold tracking-tight text-white">
                  Escalate renewal to steering
                </span>
                <span className="mt-0.5 flex flex-wrap items-center gap-x-1.5 font-mono text-[8.5px] uppercase tracking-[0.07em] text-white/40">
                  Writes to <span className="text-white">Salesforce</span>
                  <span className="text-white/20">&middot;</span>
                  Approver <span className="text-white">CFO</span>
                  <span className="text-white/20">&middot;</span>
                  ACT-4417
                </span>
              </span>

              <span className="ml-auto shrink-0">
                {approved ? (
                  <span className="inline-flex items-center gap-1.5 rounded-[8px] border border-positive-border bg-positive-subtle/20 px-3 py-1.5 font-mono text-[9.5px] font-bold uppercase tracking-[0.06em] text-positive-text">
                    <span className="h-[5px] w-[5px] rounded-full bg-positive" aria-hidden />
                    Sent and logged
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => setApproved(true)}
                    className="rounded-[8px] bg-white px-3.5 py-1.5 font-mono text-[9.5px] font-bold uppercase tracking-[0.06em] text-slate-900 hover:bg-blue-400 transition-colors"
                  >
                    Approve
                  </button>
                )}
              </span>
            </div>

            {approved && (
              <p className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[8.5px] uppercase tracking-[0.07em] text-white/60">
                <span className="font-bold text-white">09:14</span>
                <span className="text-white/20">&middot;</span> A. Mehta
                <span className="text-white/20">&middot;</span> Escalate renewal
                <span className="text-white/20">&middot;</span> Approved by CFO
                <span className="text-white/20">&middot;</span> Written to Salesforce
                <span className="text-white/20">&middot;</span>
                <span className="text-blue-400">ACT-4417</span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
