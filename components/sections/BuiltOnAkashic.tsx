/*
 * Homepage [03] Solutions. The header states the reader's gain (built on one
 * foundation, so each next solution goes live faster); the drawing shows the
 * mechanism: the solutions stand on Akashic and fan into the modules they
 * use (demos/SolutionsOnFoundation). Module use is the mapping shared with
 * /akashic and /solutions.
 */

import SolutionsOnFoundation from "@/components/demos/SolutionsOnFoundation";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import SectionHeader from "@/components/ui/SectionHeader";
import SectionLink from "@/components/ui/SectionLink";
import type { HomeSolutions } from "@/content/pages/home";

export default function BuiltOnAkashic({ content }: { content: HomeSolutions }) {
  return (
    <section id="solutions" className="relative bg-background pt-12 pb-16 lg:pt-16 lg:pb-24">
      <ScrollRevealRail>
        <SectionHeader num={content.eyebrow.number} label={content.eyebrow.label} setup={content.title.setup} payoff={content.title.payoff} lede={content.description}>
          <SectionLink href={content.cta.href}>{content.cta.label}</SectionLink>
        </SectionHeader>

        <ScrollReveal delay={140} className="mt-12 lg:mt-14">
          <SolutionsOnFoundation
            blocks={[...content.items, content.next]}
            modules={content.modules}
            foundation={content.foundation}
            usedLabel={content.usedLabel}
            legend={content.legend}
          />
        </ScrollReveal>
      </ScrollRevealRail>
    </section>
  );
}
