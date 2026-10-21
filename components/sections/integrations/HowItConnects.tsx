/*
 * /integrations [02] How it connects: four stations on the page's one soft
 * blue band (Rule 5a). Copy: content/pages/integrations.ts.
 */

import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import SectionHeader from "@/components/ui/SectionHeader";
import type { IntegrationsPage } from "@/content/pages/integrations";

const pad = (n: number) => String(n).padStart(2, "0");

export default function HowItConnects({ content: c }: { content: IntegrationsPage["howItConnects"] }) {
  return (
    <section
      id="how-it-connects"
      className="scroll-mt-24 bg-band pb-20 pt-16 lg:pb-28 lg:pt-20"
    >
      <ScrollRevealRail>
        <SectionHeader num={c.num} label={c.label} setup={c.setup} payoff={c.payoff} />
        <ScrollReveal delay={80}>
          <ol className="mt-12 grid border-t border-ink/80 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
            {c.steps.map((step, index) => (
              <li key={step.title} className={`border-b border-lineSoft py-8 sm:pr-6 lg:border-b-0 ${index > 0 ? "lg:border-l lg:pl-6" : ""} ${index % 2 === 1 ? "sm:border-l sm:pl-6" : ""}`}>
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
