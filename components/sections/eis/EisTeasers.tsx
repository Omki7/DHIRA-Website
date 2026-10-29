"use client";

import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import SectionHeader from "@/components/ui/SectionHeader";
import EisTeaserCard from "./EisTeaserCard";
import type { EisPage } from "@/content/pages/solutions-eis";

interface EisTeasersProps {
  content: NonNullable<EisPage["teasers"]>;
}

export default function EisTeasers({ content }: EisTeasersProps) {
  return (
    <section
      id="use-cases"
      className="relative w-full scroll-mt-24 overflow-clip border-y border-lineSoft bg-card/60 py-16 lg:py-24"
    >
      <ScrollRevealRail>
        <SectionHeader
          num="03"
          label="FOUR STORIES, THIRTY SECONDS EACH"
          setup={content.setup}
          payoff={content.payoff}
          lede={content.lede}
        />

        {/* 2x2 Teaser Video Showcase */}
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-10">
          {content.items.map((item, idx) => (
            <ScrollReveal key={item.id} delay={idx * 60}>
              <EisTeaserCard item={item} />
            </ScrollReveal>
          ))}
        </div>
      </ScrollRevealRail>
    </section>
  );
}
