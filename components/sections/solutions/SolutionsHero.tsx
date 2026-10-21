/*
 * [00] /solutions hero. Text only, left aligned, in the /about and /careers
 * header grammar; an on-page index under the lede, because a hub's first
 * job is to route the reader. Copy: lib/solutionsSections.ts.
 */

import FigureEyebrow from "@/components/ui/FigureEyebrow";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import TwoToneTitle from "@/components/ui/TwoToneTitle";
import type { PageSection } from "@/content/types";
import type { SolutionsPage } from "@/content/pages/solutions";
import { getUiStrings } from "@/lib/content";

/* The four content sections, numbered as their eyebrows are. */

export default async function SolutionsHero({ content: SOLUTIONS_HERO, sections }: { content: SolutionsPage["hero"]; sections: PageSection[] }) {
  const ui = await getUiStrings();
  /* The on-page index lists the body sections, not the hero or the close. */
  const INDEX = sections.slice(1, -1);
  return (
    <section id="hero" className="relative border-b border-lineSoft bg-background pb-14 pt-16 lg:pb-20 lg:pt-24">
      <ScrollRevealRail>
        <ScrollReveal>
          <FigureEyebrow bare label={SOLUTIONS_HERO.label} />
        </ScrollReveal>
        <div className="mt-8 max-w-[52rem]">
          <ScrollReveal delay={80}>
            <TwoToneTitle as="h1" setup={SOLUTIONS_HERO.setup} payoff={SOLUTIONS_HERO.payoff} />
          </ScrollReveal>
          <ScrollReveal delay={140}>
            <p className="mt-6 max-w-[38em] text-pretty text-base leading-relaxed text-secondary-text sm:text-lg">
              {SOLUTIONS_HERO.lede}
            </p>
          </ScrollReveal>
          <ScrollReveal delay={180}>
            <nav
              aria-label={ui.onThisPage}
              className="mt-10 flex flex-wrap gap-x-7 gap-y-3 border-t border-dashed border-lineSoft pt-5 font-mono text-[11px] uppercase tracking-eyebrow"
            >
              {INDEX.map((section, index) => (
                <a key={section.id} href={`#${section.id}`} className="text-inkSoft transition-colors duration-150 hover:text-ink">
                  <span className="text-overcast">[{String(index + 1).padStart(2, "0")}]</span>&nbsp;&nbsp;{section.label}
                </a>
              ))}
            </nav>
          </ScrollReveal>
        </div>
      </ScrollRevealRail>
    </section>
  );
}
