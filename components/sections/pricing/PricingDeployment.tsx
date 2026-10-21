/*
 * [04] Deployment: the founder's three footprints and how each is billed,
 * as three hairline columns. The page's one soft blue band (Rule 5a), the
 * same ground SolutionsIndex runs. The SaaS line names Mumbai on /in/pricing
 * (data residency in India, the workbook's ap-south-1 region).
 */

import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import SectionHeader from "@/components/ui/SectionHeader";
import type { PricingPage } from "@/content/pages/pricing";
import type { Region } from "@/lib/region";

const pad = (n: number) => String(n).padStart(2, "0");

export default function PricingDeployment({ region, content: DEPLOYMENT }: { region: Region; content: PricingPage["deployment"] }) {
  return (
    <section
      id="deployment"
      className="scroll-mt-24 bg-band pb-20 pt-16 lg:pb-28 lg:pt-20"
    >
      <ScrollRevealRail>
        <SectionHeader num="04" label={DEPLOYMENT.label} setup={DEPLOYMENT.setup} payoff={DEPLOYMENT.payoff} lede={DEPLOYMENT.lede} />

        <div className="mt-12 grid border-t border-ink/80 lg:mt-16 lg:grid-cols-3">
          {DEPLOYMENT.options.map((option, index) => (
            <ScrollReveal
              key={option.name}
              delay={index * 60}
              className={`flex flex-col border-b border-lineSoft py-8 lg:border-b-0 lg:py-10 lg:pr-8 ${index > 0 ? "lg:border-l lg:pl-8" : ""}`}
            >
              <p className="font-mono text-[11px] uppercase tracking-eyebrow text-overcast">[{pad(index + 1)}]</p>
              <h3 className="mt-3 text-[24px] font-semibold leading-tight tracking-[-0.02em] text-ink">{option.name}</h3>
              <p className="mt-3 text-pretty text-[15px] leading-relaxed text-secondary-text">{typeof option.line === "string" ? option.line : option.line[region]}</p>
              <div className="mt-auto pt-8">
                <div className="border-t border-dashed border-lineSoft pt-4">
                  <p className="font-mono text-[11px] uppercase tracking-eyebrow text-overcast">{DEPLOYMENT.billedAs}</p>
                  <p className="mt-1.5 text-[15px] font-medium text-ink">{option.billing}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </ScrollRevealRail>
    </section>
  );
}
