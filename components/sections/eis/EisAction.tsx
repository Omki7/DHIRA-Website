/*
 * [04] Question to Action — Ask, Simulate, Approve.
 * One console, three zones (Jul 2026 simplification): a plain three-step
 * rail on the left, and a single dashboard window on the right whose
 * numbered zones mirror the rail 1:1 — question in, scenario tested,
 * action approved and written back. §8a demo data throughout.
 */

import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";

const steps = [
  {
    num: "01",
    name: "Ask",
    line: "A plain-language question in. A sourced answer out.",
  },
  {
    num: "02",
    name: "Simulate",
    line: "Test the scenario before you commit to it.",
  },
  {
    num: "03",
    name: "Approve",
    line: "One click, and EIS writes it back to the source system. Logged and reversible.",
  },
];

function ZoneTag({ num, label }: { num: string; label: string }) {
  return (
    <p className="flex items-center gap-2 font-mono text-[9px] font-bold uppercase tracking-[0.08em] text-blue">
      <span className="flex h-[18px] w-[18px] items-center justify-center rounded-full border border-blue-border bg-blue-subtle text-[8.5px]">
        {num}
      </span>
      {label}
    </p>
  );
}

function ActionConsole() {
  return (
    <div className="overflow-hidden rounded-frame border border-subtle-stroke bg-white shadow-frame">
      <div className="flex items-center justify-between border-b border-subtle-stroke bg-gradient-to-b from-primary-bg to-transparent px-4 py-3">
        <span className="flex items-center gap-2">
          <span className="flex gap-1.5" aria-hidden>
            <span className="h-[9px] w-[9px] rounded-full bg-[#E4E7EC]" />
            <span className="h-[9px] w-[9px] rounded-full bg-[#E4E7EC]" />
            <span className="h-[9px] w-[9px] rounded-full bg-[#E4E7EC]" />
          </span>
          <span className="text-[13px] font-bold tracking-tight text-ink">
            Akashic EIS &middot; Meridian Retail
          </span>
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-[6px] border border-blue-border bg-blue-subtle px-2 py-[3px] font-mono text-[8.5px] font-bold text-blue">
          <span className="h-[5px] w-[5px] rounded-full bg-blue animate-[ps-pulse_2s_infinite]" aria-hidden />
          LIVE
        </span>
      </div>

      <div className="px-5 py-5">
        <ZoneTag num="01" label="Ask" />
        <div className="mt-3 rounded-[10px] border border-blue-border bg-blue-subtle/60 px-3.5 py-2.5">
          <span className="text-[13px] text-ink">
            &ldquo;What happens to FY27 if we lose this client?&rdquo;
            <span className="ml-0.5 font-bold text-blue animate-[ps-caret-blink_1.1s_step-end_infinite]">|</span>
          </span>
        </div>
        <p className="mt-3 text-[13px] leading-relaxed text-ink">
          Revenue impact:{" "}
          <span className="border-b border-dashed border-blue/50 font-bold">&minus;₹14.2 Cr ARR</span>{" "}
          (10% of run-rate).
        </p>
        <p className="mt-1.5 font-mono text-[8.5px] uppercase tracking-[0.06em] text-overcast">
          Source: financial ledger &middot; 2 min ago
        </p>
      </div>

      <div className="border-t border-dashed border-lineSoft px-5 py-5">
        <ZoneTag num="02" label="Simulate" />
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-blue bg-blue-subtle px-3 py-1.5 font-mono text-[9.5px] font-bold text-blue">
            <span className="h-[5px] w-[5px] rounded-full bg-blue" aria-hidden />
            Lose this client
          </span>
          <span className="rounded-full border border-subtle-stroke bg-white px-3 py-1.5 font-mono text-[9.5px] text-inkSoft">
            Renewal at +5%
          </span>
        </div>
        <div className="mt-4">
          <div className="flex items-baseline justify-between font-mono text-[8.5px] uppercase tracking-[0.06em]">
            <span className="text-inkSoft">FY27 run-rate</span>
            <span className="font-bold text-ink">&minus;10%</span>
          </div>
          <div className="relative mt-2 h-[8px] rounded-full bg-tertiary-bg shadow-[inset_0_1px_2px_rgba(26,28,29,0.06)]">
            <div className="absolute inset-y-0 left-0 w-[90%] rounded-full bg-gradient-to-r from-[#5B7BE8] to-blue" />
            <span className="absolute inset-y-[-3px] left-[90%] w-px border-l border-dashed border-ink/40" aria-hidden />
          </div>
          <div className="mt-1.5 flex justify-between font-mono text-[9px] uppercase tracking-[0.06em] text-overcast">
            <span>Scenario</span>
            <span>Plan</span>
          </div>
        </div>
      </div>

      <div className="border-t border-dashed border-lineSoft px-5 py-5">
        <ZoneTag num="03" label="Approve" />
        <div className="mt-3 flex items-center gap-3 rounded-[10px] border border-subtle-stroke bg-primary-bg px-3.5 py-3">
          <div className="min-w-0 flex-1">
            <div className="truncate text-[13px] font-semibold text-ink">
              Redeploy 2 engineers &middot; Atlas Migration
            </div>
            <div className="truncate font-mono text-[8.5px] uppercase tracking-[0.05em] text-overcast">
              Writes to staffing plan
            </div>
          </div>
          <span className="shrink-0 rounded-[7px] bg-ink px-3 py-1.5 font-mono text-[9px] font-bold text-white">
            APPROVE
          </span>
          <span className="shrink-0 rounded-[7px] border border-subtle-stroke bg-white px-3 py-1.5 font-mono text-[9px] font-bold text-inkSoft">
            HOLD
          </span>
        </div>
        <p className="mt-3 flex items-center gap-1.5 font-mono text-[8.5px] uppercase tracking-[0.06em] text-inkSoft">
          <span className="h-[5px] w-[5px] rounded-full bg-blue animate-[ps-pulse_2s_infinite]" aria-hidden />
          Logged in the audit trail &middot; reversible
        </p>
      </div>
    </div>
  );
}

export default function EisAction() {
  return (
    <section id="question-to-action" className="scroll-mt-24 border-t border-lineSoft bg-background pt-12 pb-24 lg:pt-16 lg:pb-32">
      <ScrollRevealRail>
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

        <div className="mt-12 grid grid-cols-1 items-center gap-12 lg:mt-14 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
          <ScrollReveal delay={100}>
            <div className="relative">
              <span
                className="absolute bottom-5 left-4 top-5 w-px bg-[length:1px_16px] bg-repeat-y bg-[repeating-linear-gradient(180deg,#C8D2F5_0_8px,transparent_8px_16px)]"
                aria-hidden
              />
              <div className="space-y-10">
                {steps.map((step, idx) => (
                  <div key={step.num} className="flex gap-5">
                    <span
                      className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border bg-white font-mono text-[10px] font-bold shadow-card ${
                        idx === steps.length - 1
                          ? "border-blue bg-blue-subtle text-blue"
                          : "border-blue-border text-blue"
                      }`}
                    >
                      {step.num}
                      {idx === steps.length - 1 && (
                        <span
                          className="absolute inset-0 rounded-full border border-blue/40 animate-[ps-ring_2.4s_ease-out_infinite]"
                          aria-hidden
                        />
                      )}
                    </span>
                    <div className="min-w-0 pt-0.5">
                      <h3 className="text-[21px] font-semibold tracking-tight text-ink md:text-[23px]">
                        {step.name}
                      </h3>
                      <p className="mt-1.5 max-w-[24em] text-[15px] leading-relaxed text-inkSoft">
                        {step.line}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={180}>
            <ActionConsole />
          </ScrollReveal>
        </div>

        <ScrollReveal delay={220}>
          <p className="mt-10 text-center font-mono text-[10px] uppercase tracking-eyebrow text-overcast lg:mt-12">
            Read-only by default &middot; writes only with your approval &middot; every action in the audit log
          </p>
        </ScrollReveal>
      </ScrollRevealRail>
    </section>
  );
}
