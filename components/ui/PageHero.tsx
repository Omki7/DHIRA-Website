/*
 * The text-only hero for hub and resource pages (pricing, insights, trust,
 * newsroom, legal), generalised from the /solutions hub hero (user-approved
 * editorial register, 14 Oct 2026). Label, two-tone h1, lede under it on the
 * left (never a right column, see SectionHeader), then an on-page index,
 * because a hub's first job is to route the reader.
 *
 * `index` lists the page's sections, numbered as their eyebrows are.
 * `meta` sits above the index (a date line, a count); `children` below it.
 */

import type { ReactNode } from "react";
import FigureEyebrow from "@/components/ui/FigureEyebrow";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import TwoToneTitle from "@/components/ui/TwoToneTitle";
import { getUiStrings } from "@/lib/content";

export type HeroIndexItem = { id: string; label: string };

export default async function PageHero({
  label,
  setup,
  payoff,
  lede,
  index,
  meta,
  children,
}: {
  label: string;
  setup: ReactNode;
  payoff: ReactNode;
  lede: ReactNode;
  index?: HeroIndexItem[];
  meta?: ReactNode;
  children?: ReactNode;
}) {
  const ui = await getUiStrings();
  return (
    <section id="hero" className="relative border-b border-lineSoft bg-background pb-14 pt-16 lg:pb-20 lg:pt-24">
      <ScrollRevealRail>
        <ScrollReveal>
          <FigureEyebrow bare label={label} />
        </ScrollReveal>
        <div className="mt-8 max-w-[52rem]">
          <ScrollReveal delay={80}>
            <TwoToneTitle as="h1" setup={setup} payoff={payoff} />
          </ScrollReveal>
          <ScrollReveal delay={140}>
            <p className="mt-6 max-w-[38em] text-pretty text-base leading-relaxed text-secondary-text sm:text-lg">{lede}</p>
          </ScrollReveal>
          {meta && (
            <ScrollReveal delay={160}>
              <div className="mt-6 font-mono text-[11px] uppercase tracking-eyebrow text-overcast">{meta}</div>
            </ScrollReveal>
          )}
          {index && index.length > 0 && (
            <ScrollReveal delay={180}>
              <nav
                aria-label={ui.onThisPage}
                className="mt-10 flex flex-wrap gap-x-7 gap-y-3 border-t border-dashed border-lineSoft pt-5 font-mono text-[11px] uppercase tracking-eyebrow"
              >
                {index.map((item, k) => (
                  <a key={item.id} href={`#${item.id}`} className="text-inkSoft transition-colors duration-150 hover:text-ink">
                    <span className="text-overcast">[{String(k + 1).padStart(2, "0")}]</span>&nbsp;&nbsp;{item.label}
                  </a>
                ))}
              </nav>
            </ScrollReveal>
          )}
          {children && <ScrollReveal delay={200}>{children}</ScrollReveal>}
        </div>
      </ScrollRevealRail>
    </section>
  );
}
