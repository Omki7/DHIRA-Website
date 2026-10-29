import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import SectionHeader from "@/components/ui/SectionHeader";
import EisGapTimelineMockup from "@/components/demos/mockups/eis/EisGapTimelineMockup";
import type { EisPage } from "@/content/pages/solutions-eis";

/* [the-gap] — Section [02]: The Decision Gap
 * Adheres to Section Grammar: FigureEyebrow [02] THE DECISION GAP,
 * two-tone headline, lede directly below, ScrollRevealRail layout.
 */
export default function EisGap({ content }: { content: EisPage["gap"] }) {
  return (
    <section
      id="the-gap"
      className="relative w-full scroll-mt-24 overflow-clip bg-eis-band pt-12 pb-16 lg:pt-16 lg:pb-24"
    >
      <ScrollRevealRail>
        <SectionHeader
          num="02"
          label="THE DECISION GAP"
          setup={content.setup}
          payoff={content.payoff}
          lede={content.lede}
        />

        <ScrollReveal delay={90}>
          <div className="mt-12 lg:mt-14">
            <EisGapTimelineMockup />
          </div>
        </ScrollReveal>

        {/* 5-Department Lifecycle Ripple Chain from CEO brief */}
        {content.departments && (
          <ScrollReveal delay={110}>
            <div className="mt-10">
              <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-tertiary-text">
                Cross-Department Latency
              </span>
              <div
                className="mt-3 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3"
                aria-label="A leave in HR moves a milestone in Delivery and an invoice in Finance"
              >
                {content.departments.map((dept) => (
                  <div
                    key={dept.system}
                    className={`flex min-h-[110px] flex-col justify-between rounded-xl p-3.5 sm:p-4 border transition-colors ${
                      dept.hit
                        ? "border-[#F08A24] bg-gradient-to-t from-[#FDEBD8] to-card dark:from-[#3A2614] dark:to-card shadow-sm"
                        : "border-lineSoft bg-card"
                    }`}
                  >
                    <div>
                      <span className="block font-mono text-[10px] font-semibold uppercase tracking-wider text-secondary-text">
                        {dept.system}
                      </span>
                      <strong className="mt-1 block font-heading text-lg font-bold tracking-tight text-ink">
                        {dept.dept}
                      </strong>
                    </div>

                    {dept.breach && (
                      <p className="mt-2 text-xs font-medium leading-snug text-[#A65A0B] dark:text-[#F7B26A]">
                        {dept.breach}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        )}

        {/* 4 Industry Benchmark Statistics from CEO brief */}
        {content.stats && (
          <ScrollReveal delay={130}>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {content.stats.map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col justify-between rounded-xl border border-lineSoft bg-card p-5"
                >
                  <div>
                    <div className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-[#1100CC] dark:text-[#A49DFF] tabular-nums">
                      {item.value}
                    </div>
                    <p className="mt-2 text-xs sm:text-sm leading-relaxed text-secondary-text">
                      {item.label}
                    </p>
                  </div>
                  <cite className="mt-4 block font-mono text-[10px] not-italic text-tertiary-text">
                    {item.citation}
                  </cite>
                </div>
              ))}
            </div>
          </ScrollReveal>
        )}

        <ScrollReveal delay={150}>
          <div className="mt-8 flex flex-col gap-4 border-t border-lineSoft pt-6 sm:flex-row sm:items-baseline sm:justify-between">
            <p className="max-w-[620px] text-balance text-base leading-relaxed text-secondary-text sm:text-lg">
              {content.conclusion}
            </p>
            <p className="flex-shrink-0 font-mono text-[11px] uppercase tracking-wider text-tertiary-text">
              {content.note}
            </p>
          </div>
        </ScrollReveal>
      </ScrollRevealRail>
    </section>
  );
}
