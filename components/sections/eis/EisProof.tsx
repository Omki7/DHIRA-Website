import Image from "next/image";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import SectionHeader from "@/components/ui/SectionHeader";
import type { EisPage } from "@/content/pages/solutions-eis";

/* [proof] — Section [05]: Proven at Scale
 * Adheres to Section Grammar: FigureEyebrow [05] PROVEN AT SCALE,
 * two-tone headline, lede directly below, ScrollRevealRail layout.
 */
export default function EisProof({ content }: { content: EisPage["proof"] }) {
  const DEPLOYMENTS = content.deployments;
  return (
    <section
      id="proof"
      className="relative w-full scroll-mt-24 overflow-clip bg-background pt-12 pb-16 lg:pt-16 lg:pb-24"
    >
      <ScrollRevealRail>
        <SectionHeader
          num="05"
          label="PROVEN AT SCALE"
          setup={content.setup}
          payoff={content.payoff}
          lede={content.lede}
        />

        <div className="mt-12 grid gap-6 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3">
          {DEPLOYMENTS.map((d, i) => (
            <ScrollReveal key={d.key} delay={i * 80}>
              <div className="flex h-full flex-col overflow-hidden rounded-outer border border-lineSoft bg-background transition-all duration-250 hover:border-line">
                <div className="relative h-[112px] w-full bg-primary-bg">
                  <Image
                    src={d.image}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
                    className="object-cover"
                  />
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-eyebrow text-blue">
                    {d.name}
                  </span>
                  <p className="mt-2 text-balance text-[17px] font-semibold leading-snug tracking-tight text-ink">
                    {d.line}
                  </p>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-secondary-text">
                    {d.body}
                  </p>

                  <div className="mt-auto grid grid-cols-2 gap-4 border-t border-lineSoft pt-5">
                    {d.figures.map((f) => (
                      <div key={f.label}>
                        <div className="flex items-baseline gap-1">
                          <span className="text-[30px] font-semibold leading-none tracking-tight text-ink tabular-nums sm:text-[34px]">
                            {f.value}
                          </span>
                          <span className="text-base font-medium tracking-tight text-inkSoft">
                            {f.unit}
                          </span>
                        </div>
                        <span className="mt-1.5 block font-mono text-[10.5px] uppercase tracking-wider text-tertiary-text">
                          {f.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={150}>
          <div className="mt-10 border-t border-lineSoft pt-6">
            <p className="max-w-[760px] text-balance text-base leading-relaxed text-secondary-text sm:text-lg">
              {content.closing}
            </p>
          </div>
        </ScrollReveal>
      </ScrollRevealRail>
    </section>
  );
}
