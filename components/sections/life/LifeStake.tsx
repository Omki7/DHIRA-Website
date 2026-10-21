/*
 * [09] The stake — the last thing said on a light ground.
 *
 * Same two-tone construction as [05], set larger and closed by a small
 * centred kicker in the reference's manner. This is where the page stops
 * describing a product and states what is at stake, immediately before the
 * one place it asks for anything.
 */

import ScrollReveal from "@/components/ui/ScrollReveal";
import type { LifePage } from "@/content/pages/solutions-life";

export default function LifeStake({ content }: { content: LifePage["stake"] }) {
  return (
    <section id="the-stake" className="relative scroll-mt-20 bg-background">
      <div
        aria-hidden
        className="absolute inset-0 life-paper"
      />
      

      <div className="relative mx-auto w-full max-w-[1440px] px-6 py-28 text-center sm:px-10 lg:px-14 lg:py-44">
        <ScrollReveal>
          <p className="mx-auto max-w-[17em] text-[28px] font-medium leading-[1.32] tracking-[-0.005em] sm:text-[38px] lg:text-[50px]">
            <span className="text-life-navy">{content.lead} </span>
            <span className="text-life-blue">{content.tail}</span>
          </p>
        </ScrollReveal>

        <ScrollReveal delay={140}>
          <p className="mx-auto mt-16 max-w-[38em] text-[12px] font-bold uppercase leading-[1.7] tracking-[0.14em] text-life-navy lg:mt-20">
            {content.footer}
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
