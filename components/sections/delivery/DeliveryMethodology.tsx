/*
 * [05] Methodology — One Process, No Hand-offs.
 * Four numbered stations on one unbroken, flowing dashed line (the visual
 * argument for "no hand-offs"), then the Engagement Console: a simulated
 * delivery dashboard (§8a — canned statuses, week counts, and artefact
 * names) showing what week four of a six-week deployment actually looks
 * like — phase tracker bars, the sprint ledger, and the artefact register
 * that is yours at handover. Complements [02]'s Gantt (the plan) with the
 * live operational view (the delivery). All accents blue.
 */

import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import { CardHeader, BlueChip } from "@/components/sections/akashic/AkashicCardChrome";

const steps = [
  {
    num: "01",
    name: "Discover",
    desc: "Map your current state, blockers, and the gap between investment and outcome. Zero assumptions.",
  },
  {
    num: "02",
    name: "Design",
    desc: "Architect the Sovereign Blueprint, timeline, and exact team configuration required.",
  },
  {
    num: "03",
    name: "Deliver",
    desc: "Execute engineering sprints or platform deployments. Governed, documented, and traceable.",
  },
  {
    num: "04",
    name: "Transfer",
    desc: "You own the outcome. We document lineage, train your team, and step back, or stay on as an accountable partner.",
  },
];

const phaseTracker = [
  { name: "Discover", width: "100%", state: "complete" as const },
  { name: "Design", width: "100%", state: "complete" as const },
  { name: "Deliver", width: "68%", state: "active" as const },
  { name: "Transfer", width: "0%", state: "queued" as const },
];

const sprintLedger = [
  { item: "Pipelines connected to ERP", status: "SHIPPED", state: "done" as const },
  { item: "Master data reconciliation", status: "IN REVIEW", state: "review" as const },
  { item: "BI rollout · district dashboards", status: "IN PROGRESS", state: "active" as const },
];

const artefacts = [
  { name: "Sovereign Blueprint", meta: "Signed · WK 2" },
  { name: "Governance Framework", meta: "v1.2" },
  { name: "Lineage documentation", meta: "Auto-updating", live: true },
];

function RailNode({ num, last }: { num: string; last?: boolean }) {
  return (
    <span
      className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border bg-white font-mono text-[10px] font-bold shadow-card ${
        last ? "border-blue bg-blue-subtle text-blue" : "border-blue-border text-blue"
      }`}
    >
      {num}
      {last && (
        <span className="absolute inset-0 rounded-full border border-blue/40 animate-[ps-ring_2.4s_ease-out_infinite]" aria-hidden />
      )}
    </span>
  );
}

function FlowSegment() {
  return (
    <span
      className="h-px flex-1 bg-[length:16px_1px] bg-repeat-x bg-[repeating-linear-gradient(90deg,#C8D2F5_0_8px,transparent_8px_16px)] animate-[ps-dash_1.4s_linear_infinite]"
      aria-hidden
    />
  );
}

function StatusChip({ label, state }: { label: string; state: "done" | "review" | "active" }) {
  if (state === "done") {
    return (
      <span className="inline-flex shrink-0 items-center rounded-[6px] bg-blue px-2 py-[3px] font-mono text-[8.5px] font-bold tracking-[0.05em] text-white">
        {label}
      </span>
    );
  }
  if (state === "active") {
    return (
      <span className="inline-flex shrink-0 items-center gap-1.5 rounded-[6px] border border-blue-border bg-blue-subtle px-2 py-[3px] font-mono text-[8.5px] font-bold tracking-[0.05em] text-blue">
        <span className="h-[5px] w-[5px] rounded-full bg-blue animate-[ps-pulse_2s_infinite]" aria-hidden />
        {label}
      </span>
    );
  }
  return (
    <span className="inline-flex shrink-0 items-center rounded-[6px] border border-subtle-stroke bg-white px-2 py-[3px] font-mono text-[8.5px] font-bold tracking-[0.05em] text-inkSoft">
      {label}
    </span>
  );
}

function EngagementConsole() {
  return (
    <div className="overflow-hidden rounded-[14px] border border-subtle-stroke bg-white shadow-frame">
      <CardHeader
        icon="Platform Deployment"
        name="Engagement console"
        sub="Simulated view · week four of a six-week deployment"
        chip={<BlueChip label="WK 4 / 6" />}
      />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.15fr_1fr]">
        {/* Phase tracker */}
        <div className="p-5 md:p-6">
          <p className="font-mono text-[9px] uppercase tracking-eyebrow text-overcast">
            Phase tracker
          </p>
          <div className="mt-4 space-y-4">
            {phaseTracker.map((phase) => (
              <div key={phase.name}>
                <div className="flex items-baseline justify-between gap-3">
                  <span
                    className={`text-[12.5px] font-medium ${
                      phase.state === "queued" ? "text-overcast" : "text-ink"
                    }`}
                  >
                    {phase.name}
                  </span>
                  <span className="font-mono text-[8.5px] uppercase tracking-[0.08em] text-overcast">
                    {phase.state === "complete" ? "Complete" : phase.state === "active" ? "In progress" : "Queued"}
                  </span>
                </div>
                <div className="mt-1.5 h-[6px] overflow-hidden rounded-full bg-primary-bg">
                  <div
                    className={`h-full rounded-full ${
                      phase.state === "complete"
                        ? "bg-blue/35"
                        : phase.state === "active"
                          ? "fl-sheen relative overflow-hidden bg-gradient-to-r from-[#4A6CE0] to-blue"
                          : ""
                    }`}
                    style={{ width: phase.width }}
                  />
                </div>
              </div>
            ))}
          </div>
          <p className="mt-5 border-t border-dashed border-lineSoft pt-3 font-mono text-[8.5px] uppercase tracking-[0.08em] text-inkSoft">
            One team, audit to handover
          </p>
        </div>

        {/* Sprint ledger */}
        <div className="border-t border-dashed border-lineSoft p-5 md:p-6 lg:border-l lg:border-t-0">
          <div className="flex items-baseline justify-between gap-3">
            <p className="font-mono text-[9px] uppercase tracking-eyebrow text-overcast">
              This sprint
            </p>
            <span className="flex items-center gap-1.5 font-mono text-[8.5px] uppercase tracking-[0.08em] text-blue">
              <span className="h-[5px] w-[5px] rounded-full bg-blue animate-[ps-pulse_2s_infinite]" aria-hidden />
              Live
            </span>
          </div>
          <div className="mt-4">
            {sprintLedger.map((row) => (
              <div
                key={row.item}
                className="flex items-center justify-between gap-3 border-b border-dashed border-lineSoft py-3 last:border-b-0"
              >
                <span className="min-w-0 truncate text-[13px] font-medium text-ink">{row.item}</span>
                <StatusChip label={row.status} state={row.state} />
              </div>
            ))}
          </div>
          <div className="mt-3 rounded-[8px] border border-subtle-stroke bg-primary-bg px-3 py-2.5">
            <p className="font-mono text-[8.5px] uppercase tracking-[0.08em] text-overcast">
              Stand-up note · your team in the room
            </p>
            <p className="mt-1 text-[12.5px] leading-relaxed text-inkSoft">
              District dashboards demoed to your analysts today. Their edits ship
              tomorrow.
            </p>
          </div>
        </div>

        {/* Artefact register */}
        <div className="border-t border-dashed border-lineSoft p-5 md:p-6 lg:border-l lg:border-t-0">
          <p className="font-mono text-[9px] uppercase tracking-eyebrow text-overcast">
            Artefact register · yours at handover
          </p>
          <div className="mt-4">
            {artefacts.map((artefact) => (
              <div
                key={artefact.name}
                className="flex items-center justify-between gap-3 border-b border-dashed border-lineSoft py-3"
              >
                <span className="min-w-0 truncate text-[13px] font-medium text-ink">
                  {artefact.name}
                </span>
                <span className="flex shrink-0 items-center gap-1.5 font-mono text-[8.5px] uppercase tracking-[0.08em] text-inkSoft">
                  {artefact.live && (
                    <span className="h-[5px] w-[5px] rounded-full bg-blue animate-[ps-pulse_2s_infinite]" aria-hidden />
                  )}
                  {artefact.meta}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-2.5">
            <span className="h-[8px] w-[8px] shrink-0 rotate-45 border border-blue bg-blue-subtle animate-[ps-pulse_2.4s_infinite]" aria-hidden />
            <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.08em] text-blue">
              Next milestone · go-live · WK 6
            </span>
          </div>
        </div>
      </div>

      <div className="border-t border-dashed border-lineSoft px-5 py-3 font-mono text-[8.5px] uppercase tracking-[0.08em] text-overcast md:px-6">
        Simulated engagement view &middot; every artefact on this screen is yours at handover
      </div>
    </div>
  );
}

export default function DeliveryMethodology() {
  return (
    <section id="methodology" className="scroll-mt-24 border-t border-lineSoft bg-background pt-12 pb-24 lg:pt-16 lg:pb-32">
      <ScrollRevealRail>
        <ScrollReveal>
          <div className="flex items-baseline justify-between font-mono text-[11px] uppercase tracking-eyebrow">
            <p>
              <span className="text-overcast">[05]</span>
              <span className="text-inkSoft">&nbsp;&nbsp;Methodology</span>
            </p>
            <span className="hidden text-overcast sm:inline">/ One unbroken line</span>
          </div>
          <h2 className="mt-5 text-heading-sm font-semibold text-ink md:text-heading-md lg:text-heading-lg">
            One process. Three models. No hand-offs.
          </h2>
        </ScrollReveal>

        {/* Desktop: one continuous horizontal rail */}
        <div className="mt-12 hidden md:grid md:grid-cols-4 lg:mt-16">
          {steps.map((step, idx) => (
            <ScrollReveal key={step.num} delay={100 + idx * 90}>
              <div className="relative">
                <span
                  className="pointer-events-none absolute -top-2 right-6 select-none text-[64px] font-semibold leading-none tracking-tighter text-ink/[0.04]"
                  aria-hidden
                >
                  {step.num}
                </span>
                <div className="flex items-center">
                  <RailNode num={step.num} last={idx === steps.length - 1} />
                  {idx < steps.length - 1 && <FlowSegment />}
                </div>
                <div className={idx < steps.length - 1 ? "pr-10" : ""}>
                  <h3 className="mt-5 text-[20px] font-semibold tracking-tight text-ink">
                    {step.name}
                  </h3>
                  <div className="mt-2.5 mb-3 w-8 border-t border-blue/40" aria-hidden />
                  <p className="text-[14.5px] leading-relaxed text-inkSoft">{step.desc}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Mobile: one continuous vertical rail */}
        <div className="relative mt-10 md:hidden">
          <span
            className="absolute bottom-4 left-4 top-4 w-px bg-[length:1px_16px] bg-repeat-y bg-[repeating-linear-gradient(180deg,#C8D2F5_0_8px,transparent_8px_16px)]"
            aria-hidden
          />
          <div className="space-y-9">
            {steps.map((step, idx) => (
              <ScrollReveal key={step.num} delay={100 + idx * 90}>
                <div className="flex gap-5">
                  <RailNode num={step.num} last={idx === steps.length - 1} />
                  <div className="min-w-0 pt-1">
                    <h3 className="text-[19px] font-semibold tracking-tight text-ink">{step.name}</h3>
                    <p className="mt-2 text-[14.5px] leading-relaxed text-inkSoft">{step.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* The Engagement Console — what week four actually looks like */}
        <ScrollReveal delay={160}>
          <div className="mt-12 lg:mt-14">
            <div className="mb-4 flex items-baseline justify-between gap-3">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-eyebrow text-blue">
                What week four actually looks like
              </p>
              <p className="hidden font-mono text-[9px] uppercase tracking-[0.08em] text-overcast sm:block">
                Simulated view
              </p>
            </div>
            <EngagementConsole />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <p className="mt-10 border-t border-dashed border-lineSoft pt-5 font-mono text-[10px] uppercase tracking-eyebrow text-overcast lg:mt-12">
            The same four moves govern every model &middot; platform, product, or advisory
          </p>
        </ScrollReveal>
      </ScrollRevealRail>
    </section>
  );
}
