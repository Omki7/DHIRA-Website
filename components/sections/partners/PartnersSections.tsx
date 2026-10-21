/*
 * /partners: four ways to partner as hairline columns, what partners get as
 * a numbered register, how to join as four stations on the page's one soft
 * blue band (Rule 5a). Copy is DRAFT (content/pages/partners.ts); no
 * partner is named until one is confirmed.
 */

import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import SectionHeader from "@/components/ui/SectionHeader";
import type { PartnersPage } from "@/content/pages/partners";

const pad = (n: number) => String(n).padStart(2, "0");
const columnBorders = ["", "sm:border-l sm:pl-6", "lg:border-l lg:pl-6", "sm:border-l sm:pl-6"];

export function PartnersTypes({ content: c }: { content: PartnersPage["types"] }) {
  return (
    <section id="ways-to-partner" className="scroll-mt-24 bg-background pb-20 pt-16 lg:pb-28 lg:pt-20">
      <ScrollRevealRail>
        <SectionHeader num={c.num} label={c.label} setup={c.setup} payoff={c.payoff} lede={c.lede} />
        <div className="mt-12 grid border-t border-ink/80 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {c.items.map((type, index) => (
            <ScrollReveal key={type.name} delay={index * 60} className={`border-b border-lineSoft py-8 sm:pr-6 lg:border-b-0 ${columnBorders[index]}`}>
              <p className="font-mono text-[11px] uppercase tracking-eyebrow text-overcast">[{pad(index + 1)}]</p>
              <h3 className="mt-3 text-[22px] font-semibold tracking-[-0.02em] text-ink">{type.name}</h3>
              <p className="mt-3 text-pretty text-[15px] leading-relaxed text-secondary-text">{type.line}</p>
            </ScrollReveal>
          ))}
        </div>
      </ScrollRevealRail>
    </section>
  );
}

export function PartnersBenefits({ content: c }: { content: PartnersPage["benefits"] }) {
  return (
    <section id="what-partners-get" className="scroll-mt-24 border-t border-lineSoft bg-background pb-20 pt-16 lg:pb-28 lg:pt-20">
      <ScrollRevealRail>
        <SectionHeader num={c.num} label={c.label} setup={c.setup} payoff={c.payoff} />
        <ScrollReveal delay={80}>
          <ol className="mt-12 grid border-t border-lineSoft md:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-x-16">
            {c.items.map((benefit, index) => (
              <li key={benefit.title} className="grid grid-cols-[44px_1fr] gap-4 border-b border-lineSoft py-6">
                <span className="pt-[5px] font-mono text-[11px] tracking-eyebrow text-overcast">{pad(index + 1)}</span>
                <span>
                  <span className="block text-[18px] font-semibold leading-snug tracking-[-0.01em] text-ink">{benefit.title}</span>
                  <span className="mt-1.5 block text-pretty text-[15px] leading-relaxed text-secondary-text">{benefit.text}</span>
                </span>
              </li>
            ))}
          </ol>
        </ScrollReveal>
      </ScrollRevealRail>
    </section>
  );
}

export function PartnersJoin({ content: c }: { content: PartnersPage["join"] }) {
  return (
    <section
      id="how-to-join"
      className="scroll-mt-24 bg-band pb-20 pt-16 lg:pb-28 lg:pt-20"
    >
      <ScrollRevealRail>
        <SectionHeader num={c.num} label={c.label} setup={c.setup} payoff={c.payoff} />
        <ScrollReveal delay={80}>
          <ol className="mt-12 grid border-t border-ink/80 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
            {c.steps.map((step, index) => (
              <li key={step.title} className={`border-b border-lineSoft py-8 sm:pr-6 lg:border-b-0 ${columnBorders[index]}`}>
                <p className="font-mono text-[11px] uppercase tracking-eyebrow text-overcast">[{pad(index + 1)}]</p>
                <h3 className="mt-3 text-[22px] font-semibold tracking-[-0.02em] text-ink">{step.title}</h3>
                <p className="mt-3 text-pretty text-[15px] leading-relaxed text-secondary-text">{step.text}</p>
              </li>
            ))}
          </ol>
        </ScrollReveal>
      </ScrollRevealRail>
    </section>
  );
}
