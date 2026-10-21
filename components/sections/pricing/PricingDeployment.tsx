/*
 * [04] Deployment: the founder's three footprints and how each is billed.
 * The page's one soft blue band (Rule 5a). Redesigned 21 Oct 2026 to draw
 * the section's claim, "same platform, three footprints": each footprint
 * is a boundary with the same Akashic inside it, and only the boundary
 * changes. A solid blue boundary is operated by DHIRA, a dashed ink one by
 * your team (the legend says so in words). The DHIRA cloud shows your
 * organisation beside two other tenants, drawn pale and dashed, isolated
 * from yours; the other two hold one dedicated instance. Built in HTML so
 * the labels set in the site's own type at every width.
 */

import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import SectionHeader from "@/components/ui/SectionHeader";
import AkashicWordmark from "@/components/icons/AkashicWordmark";
import type { Footprint, Operator, PricingPage } from "@/content/pages/pricing";

const pad = (n: number) => String(n).padStart(2, "0");

const BOUNDARY: Record<Operator, string> = {
  dhira: "border-[1.5px] border-solid border-blue",
  customer: "border-[1.5px] border-dashed border-default-stroke",
};

function Instance({ caption }: { caption: string }) {
  return (
    <div className="flex min-w-0 flex-col items-center rounded-tile border border-subtle-stroke bg-background px-4 pb-3 pt-3.5">
      <span className="text-[15px] font-semibold text-ink">
        <AkashicWordmark />
      </span>
      <span aria-hidden className="mt-2.5 flex items-center gap-1.5">
        {Array.from({ length: 5 }, (_, i) => (
          <span key={i} className="h-[5px] w-[5px] rounded-full bg-blue" />
        ))}
      </span>
      <span className="mt-2 whitespace-nowrap font-mono text-[9.5px] uppercase tracking-[0.12em] text-overcast">{caption}</span>
    </div>
  );
}

function Tenant() {
  return <div aria-hidden className="hidden w-10 shrink-0 self-stretch rounded-tile border border-dashed border-line sm:block" />;
}

function Boundary({ option, modules }: { option: Footprint; modules: string }) {
  const shared = option.operator === "dhira";
  return (
    <div className={`relative rounded-inner px-4 pb-4 pt-9 ${BOUNDARY[option.operator]}`}>
      <span className="absolute left-4 top-3 font-mono text-[10.5px] uppercase tracking-eyebrow text-inkSoft">{option.boundary}</span>
      <div className="flex items-stretch justify-center gap-2.5">
        {shared && <Tenant />}
        <Instance caption={modules} />
        {shared && <Tenant />}
      </div>
    </div>
  );
}

export default function PricingDeployment({ content }: { content: PricingPage["deployment"] }) {
  return (
    <section id="deployment" className="scroll-mt-24 bg-band pb-16 pt-12 lg:pb-24 lg:pt-16">
      <ScrollRevealRail>
        <SectionHeader num="04" label={content.label} setup={content.setup} payoff={content.payoff} lede={content.lede}>
          <p className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-eyebrow text-inkSoft">
            <span className="inline-flex items-center gap-2">
              <span aria-hidden className={`h-3 w-4 rounded-[3px] ${BOUNDARY.dhira}`} />
              {content.legend.dhira}
            </span>
            <span className="inline-flex items-center gap-2">
              <span aria-hidden className={`h-3 w-4 rounded-[3px] ${BOUNDARY.customer}`} />
              {content.legend.customer}
            </span>
          </p>
        </SectionHeader>

        <div className="mt-12 grid gap-x-8 gap-y-12 lg:mt-14 lg:grid-cols-3">
          {content.options.map((option, index) => (
            <ScrollReveal key={option.name} delay={index * 70} className="flex flex-col">
              <Boundary option={option} modules={content.modules} />
              <p className="mt-7 font-mono text-[11px] tracking-eyebrow text-overcast">{pad(index + 1)}</p>
              <h3 className="mt-2 text-[22px] font-semibold leading-tight tracking-[-0.02em] text-ink">{option.name}</h3>
              <p className="mt-2.5 text-pretty text-[15px] leading-relaxed text-secondary-text">{option.line}</p>
              <div className="mt-auto pt-6">
                <div className="border-t border-line pt-4">
                  <p className="font-mono text-[11px] uppercase tracking-eyebrow text-overcast">{content.billedAs}</p>
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
