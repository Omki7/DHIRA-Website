/*
 * [04] Question to Action — Ask, Simulate, Approve.
 * Two prototype screens side by side: Ask Akashic with scenario simulation
 * (grounded answers, save to board pack) and the Approvals queue with
 * audited write-backs to source systems. §8a demo data throughout.
 */

import ScrollReveal from "@/components/ui/ScrollReveal";

function AskPanel() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-frame border border-subtle-stroke bg-white shadow-card">
      <div className="flex items-center justify-between border-b border-blue/10 bg-gradient-to-b from-blue-subtle/70 to-transparent px-4 py-3">
        <span className="text-[13px] font-bold tracking-tight text-ink">Ask Akashic</span>
        <span className="font-mono text-[8px] uppercase tracking-[0.06em] text-overcast">
          Every answer is sourced
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex flex-wrap gap-1.5">
          {["Client: Meridian Retail", "Last 24 months", "CEO view"].map((chip) => (
            <span key={chip} className="rounded-[6px] border border-subtle-stroke bg-primary-bg px-2 py-[3px] font-mono text-[8.5px] text-inkSoft">
              {chip}
            </span>
          ))}
        </div>
        <div className="rounded-[9px] border border-blue-border bg-blue-subtle/60 px-3 py-2">
          <span className="text-[11.5px] text-ink">
            &ldquo;What happens to FY27 if we lose this client?&rdquo;
            <span className="ml-0.5 font-bold text-blue animate-[ps-caret-blink_1.1s_step-end_infinite]">|</span>
          </span>
        </div>
        <div className="rounded-[9px] border border-subtle-stroke bg-primary-bg px-3 py-2.5">
          <p className="text-[11px] leading-relaxed text-ink">
            Revenue impact:{" "}
            <span className="border-b border-dashed border-blue/50 font-bold">&minus;₹14.2 Cr ARR</span>{" "}
            (10% of run-rate). Two delivery teams free up;{" "}
            <span className="border-b border-dashed border-blue/50 font-bold">bench cost rises ₹0.4 Cr/mo</span>{" "}
            unless redeployed within a quarter.
          </p>
          <p className="mt-1.5 font-mono text-[7.5px] uppercase tracking-[0.06em] text-overcast">
            Sources: financial ledger &middot; staffing plan &middot; 2 min ago
          </p>
        </div>
        <div className="mt-auto border-t border-dashed border-lineSoft pt-3">
          <p className="font-mono text-[8px] font-bold uppercase tracking-[0.08em] text-inkSoft">
            Scenario simulation
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-1.5">
            {["Lose this client", "Utilisation −10%", "Renewal at +5%"].map((scenario) => (
              <span key={scenario} className="rounded-full border border-blue-border bg-blue-subtle px-2.5 py-1 font-mono text-[8.5px] font-bold text-blue">
                {scenario}
              </span>
            ))}
            <span className="ml-auto rounded-[7px] bg-ink px-2.5 py-1 font-mono text-[8.5px] font-bold text-white">
              Save to board pack
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ApprovalsPanel() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-frame border border-subtle-stroke bg-white shadow-card">
      <div className="flex items-center justify-between border-b border-blue/10 bg-gradient-to-b from-blue-subtle/70 to-transparent px-4 py-3">
        <span className="text-[13px] font-bold tracking-tight text-ink">Actions &amp; approvals</span>
        <span className="inline-flex items-center rounded-[6px] border border-blue-border bg-blue-subtle px-1.5 py-[2px] font-mono text-[8px] font-bold text-blue">
          2 PENDING
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <p className="font-mono text-[8px] font-bold uppercase tracking-[0.08em] text-inkSoft">
            Pending your approval
          </p>
          <div className="mt-2 space-y-1.5">
            {[
              { action: "Rate revision · Cobalt Energy SOW", target: "→ writes to billing system" },
              { action: "Redeploy 2 engineers · Atlas Migration", target: "→ writes to staffing plan" },
            ].map((row) => (
              <div key={row.action} className="flex items-center gap-2 rounded-[9px] border border-subtle-stroke bg-primary-bg px-3 py-2">
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[11px] font-semibold text-ink">{row.action}</div>
                  <div className="truncate font-mono text-[8px] text-overcast">{row.target}</div>
                </div>
                <span className="shrink-0 rounded-[6px] bg-ink px-2 py-1 font-mono text-[8px] font-bold text-white">
                  APPROVE
                </span>
                <span className="shrink-0 rounded-[6px] border border-subtle-stroke bg-white px-2 py-1 font-mono text-[8px] font-bold text-inkSoft">
                  HOLD
                </span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="font-mono text-[8px] font-bold uppercase tracking-[0.08em] text-inkSoft">
            In-flight write-back
          </p>
          <div className="mt-2 rounded-[9px] border border-subtle-stroke bg-primary-bg px-3 py-2">
            <div className="flex items-center justify-between text-[10.5px]">
              <span className="font-semibold text-ink">Invoice reminder &middot; INV-2026-0309</span>
              <span className="flex items-center gap-1.5 font-mono text-[8px] text-[#1B7A47]">
                <span className="h-[4px] w-[4px] rounded-full bg-[#30A46C] animate-[ps-pulse_2s_infinite]" aria-hidden />
                SYNCING
              </span>
            </div>
            <div className="mt-1.5 h-[4px] overflow-hidden rounded-full bg-tertiary-bg">
              <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-[#5B7BE8] to-blue" />
            </div>
          </div>
        </div>
        <div className="mt-auto flex items-center justify-between border-t border-dashed border-lineSoft pt-3 font-mono text-[8px] uppercase tracking-[0.06em]">
          <span className="text-inkSoft">Audit log &middot; every action recorded</span>
          <span className="text-overcast">Who &middot; what &middot; when &middot; why</span>
        </div>
      </div>
    </div>
  );
}

export default function EisAction() {
  return (
    <section id="question-to-action" className="scroll-mt-24 border-t border-lineSoft bg-white">
      <div className="rail-container pt-12 pb-24 lg:pt-16 lg:pb-32">
        <ScrollReveal>
          <div className="flex items-baseline justify-between font-mono text-[11px] uppercase tracking-eyebrow">
            <p>
              <span className="text-overcast">[04]</span>
              <span className="text-inkSoft">&nbsp;&nbsp;From question to action</span>
            </p>
            <span className="hidden text-overcast sm:inline">/ Ask &middot; simulate &middot; approve</span>
          </div>
          <h2 className="mt-5 text-heading-sm font-semibold text-ink md:text-heading-md lg:text-heading-lg">
            Ask the question. Simulate the answer. Approve the fix.
          </h2>
          <p className="mt-5 max-w-[40em] text-lg leading-relaxed text-secondary-text">
            EIS does not stop at insight. Ask in plain language and get a sourced
            answer. Simulate the scenario before you commit. Then approve the
            action, and EIS writes it back to the source system: logged, audited,
            reversible.
          </p>
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-1 gap-5 lg:mt-14 lg:grid-cols-2">
          <ScrollReveal delay={100}>
            <AskPanel />
          </ScrollReveal>
          <ScrollReveal delay={180}>
            <ApprovalsPanel />
          </ScrollReveal>
        </div>

        <ScrollReveal delay={220}>
          <p className="mt-8 text-center font-mono text-[10px] uppercase tracking-eyebrow text-overcast">
            Read-only by default &middot; writes only with your approval &middot; every action in the audit log
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
