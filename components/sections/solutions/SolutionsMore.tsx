/*
 * [02] More solutions: the founder's gallery as a hairline register, one
 * row per solution (area, name, one line). Rows are anchors so the industry
 * and function lists below can point at them.
 */

import PreviewTag from "@/components/ui/PreviewTag";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import SectionHeader from "@/components/ui/SectionHeader";
import { MORE_SOLUTIONS } from "@/lib/solutionsSections";

export default function SolutionsMore() {
  return (
    <section id="more-solutions" className="scroll-mt-24 border-t border-lineSoft bg-background pb-20 pt-16 lg:pb-28 lg:pt-20">
      <ScrollRevealRail>
        <SectionHeader
          num="02"
          label="More solutions"
          setup="More on the same foundation."
          payoff="Start with one. Add the next."
          lede="Each solution reuses the same data, governance and models, so the next one never starts from scratch."
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
