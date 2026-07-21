/*
 * [01] The Gap — Risk vs Rescue.
 * The 4-days-versus-2-minutes comparison as two pathway panels: the
 * traditional referral chain as a long muted step sequence, the Akashic Life
 * chain as a short blue one with a pulse. Anchored by the Poshan precedent.
 */

import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";

const traditional = [
  "Symptoms appear",
  "Travel to clinic",
  "Manual checks",
  "Sample transport",
  "Lab processing",
  "Return travel",
  "Diagnosis",
];

const akashic = ["Vitals input", "On-device AI", "Instant risk score", "Hospital alerted"];

function StepChain({ steps, blue }: { steps: string[]; blue?: boolean }) {
  return (
    <div className="mt-4 flex flex-wrap items-center gap-y-2">
      {steps.map((step, idx) => (
        <span key={step} className="flex items-center">
          <span
            className={`rounded-[6px] border px-2 py-[3px] font-mono text-[9px] uppercase tracking-[0.05em] ${
              blue
                ? "border-blue-border bg-blue-subtle text-blue"
                : "border-subtle-stroke bg-white text-inkSoft"
            }`}
          >
            {step}
          </span>
          {idx < steps.length - 1 && (
            <svg width="14" height="8" viewBox="0 0 14 8" fill="none" aria-hidden className="mx-0.5 shrink-0">
              <path d="M1 4h10M8.5 1.5L11 4 8.5 6.5" stroke={blue ? "#3E63DD" : "#B0B1B3"} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </span>
      ))}
    </div>
  );
}

export default function LifeGap() {
  return (
    <section id="the-gap" className="scroll-mt-24 border-t border-lineSoft bg-background pt-12 pb-24 lg:pt-16 lg:pb-32">
      <ScrollRevealRail>
        <ScrollReveal>
          <div className="flex items-baseline justify-between font-mono text-[11px] uppercase tracking-eyebrow">
            <p>
              <span className="text-overcast">[01]</span>
              <span className="text-inkSoft">&nbsp;&nbsp;Risk and rescue</span>
            </p>
            <span className="hidden text-overcast sm:inline">/ The distance between them</span>
          </div>
          <h2 className="mt-5 text-heading-sm font-semibold text-ink md:text-heading-md lg:text-heading-lg">
            In rural healthcare, the enemy isn&rsquo;t pathology. It&rsquo;s time.
          </h2>
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-1 gap-5 lg:mt-14 lg:grid-cols-2">
          <ScrollReveal delay={100}>
            <div className="h-full overflow-hidden rounded-frame border border-subtle-stroke bg-primary-bg p-6 opacity-70 md:p-8">
              <p className="font-mono text-[10px] uppercase tracking-eyebrow text-overcast">
                Traditional care
              </p>
              <div className="mt-4 flex items-baseline gap-3">
                <span className="text-[52px] font-semibold leading-none tracking-tighter text-inkSoft md:text-[60px]">
                  4 days
                </span>
                <span className="font-mono text-[10px] uppercase tracking-eyebrow text-overcast">
                  to identify high risk
                </span>
              </div>
              <div className="mt-5 h-[6px] w-full rounded-full bg-default-stroke" aria-hidden />
              <StepChain steps={traditional} />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={180}>
            <div className="h-full overflow-hidden rounded-frame border border-blue-border bg-white p-6 shadow-card md:p-8">
              <div className="flex items-center justify-between">
                <p className="font-mono text-[10px] font-semibold uppercase tracking-eyebrow text-blue">
                  Akashic Life
                </p>
                <span className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.08em] text-positive-text">
                  <span className="h-[5px] w-[5px] rounded-full bg-positive animate-[ps-pulse_2s_infinite]" aria-hidden />
                  Live at the edge
                </span>
              </div>
              <div className="mt-4 flex items-baseline gap-3">
                <span className="text-[52px] font-semibold leading-none tracking-tighter text-ink md:text-[60px]">
                  2 min
                </span>
                <span className="font-mono text-[10px] uppercase tracking-eyebrow text-inkSoft">
                  to identify high risk
                </span>
              </div>
              <div className="mt-5 flex items-center gap-1.5" aria-hidden>
                <span className="h-[6px] w-[9%] rounded-full bg-gradient-to-r from-[#5B7BE8] to-blue" />
                <span className="h-1.5 w-1.5 rounded-full bg-blue animate-[ps-pulse_2s_infinite]" />
              </div>
              <StepChain steps={akashic} blue />
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={220}>
          <p className="mt-12 max-w-[52em] border-t border-dashed border-lineSoft pt-8 text-lg leading-relaxed text-secondary-text lg:mt-14">
            This is the same gap DHIRA closed at national scale with Poshan Tracker,
            which today tracks nutrition and health indicators for 10 crore+
            children and mothers across India. Akashic Life takes that same
            philosophy, close the gap between a health signal and a response, down
            to the level of a single ASHA worker, a single village, a single mother.
          </p>
        </ScrollReveal>
      </ScrollRevealRail>
    </section>
  );
}
