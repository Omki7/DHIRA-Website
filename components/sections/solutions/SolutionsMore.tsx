/*
 * [02] More solutions: the founder's gallery as a hairline register, one
 * row per solution (area, name, one line). Rows are anchors so the industry
 * and function lists below can point at them.
 */

import PreviewTag from "@/components/ui/PreviewTag";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import SectionHeader from "@/components/ui/SectionHeader";
import type { SolutionsPage } from "@/content/pages/solutions";

export default function SolutionsMore({ content }: { content: SolutionsPage["more"] }) {
  const MORE_SOLUTIONS = content.items;
  return (
    <section id="more-solutions" className="scroll-mt-24 border-t border-lineSoft bg-background pb-20 pt-16 lg:pb-28 lg:pt-20">
      <ScrollRevealRail>
        <SectionHeader
          num={content.num}
          label={content.label}
          setup={content.setup}
          payoff={content.payoff}
          lede={content.lede}
        />

        <ul className="mt-12 border-t border-lineSoft lg:mt-16">
          {MORE_SOLUTIONS.map((solution, index) => (
            <li key={solution.id} id={solution.id} className="scroll-mt-28 border-b border-lineSoft">
              <ScrollReveal delay={Math.min(index * 40, 240)} className="grid gap-2 py-6 lg:grid-cols-12 lg:gap-10 lg:py-7">
                <p className="font-mono text-[11px] uppercase tracking-eyebrow text-overcast lg:col-span-3 lg:pt-2">{solution.area}</p>
                <h3 className="text-[20px] font-semibold leading-snug tracking-[-0.01em] text-ink lg:col-span-4">
                  {solution.name}
                  {solution.preview && <PreviewTag className="ml-2 align-[3px]" />}
                </h3>
                <p className="text-pretty text-[15px] leading-relaxed text-secondary-text lg:col-span-5">{solution.text}</p>
              </ScrollReveal>
            </li>
          ))}
        </ul>
      </ScrollRevealRail>
    </section>
  );
}
