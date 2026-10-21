/*
 * [08] Built on Akashic — what is actually underneath.
 *
 * The reference gives this slot to the team. Ours goes to the platform,
 * because on this page that is the same claim: the reason a village app can
 * be trusted at a ministry is that it is not a village app. It is three
 * Akashic modules pointed at a village.
 *
 * Light ground, centred headline, three columns hung off a hairline. No
 * cards: the page has spent five sections establishing that a rule and a
 * label are enough (Design Rule 1).
 */

import ScrollReveal from "@/components/ui/ScrollReveal";
import { LifeEyebrow, LifeCornerArc } from "@/components/ui/life/LifeChrome";
import type { LifePage } from "@/content/pages/solutions-life";


export default function LifeBuilt({ content }: { content: LifePage["built"] }) {
  const { layers } = content;
  return (
    <section id="how-its-built" className="relative scroll-mt-20 bg-life-cream">
      <div
        aria-hidden
        className="absolute inset-0 life-paper"
      />
      <LifeCornerArc tone="light" />

      <div className="relative mx-auto w-full max-w-[1440px] px-6 pb-28 pt-28 sm:px-10 lg:px-14 lg:pb-36 lg:pt-40">
        <ScrollReveal className="flex flex-col items-center text-center">
          <LifeEyebrow num={content.eyebrow.num} tone="light">{content.eyebrow.label}</LifeEyebrow>
          <h2 className="mt-9 max-w-[15em] text-[30px] font-medium leading-[1.28] tracking-[-0.005em] text-life-navy sm:text-[38px] lg:text-[46px]">
            {content.title}
          </h2>
        </ScrollReveal>

        <div className="mt-20 grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8 lg:mt-28 lg:gap-12">
          {layers.map((layer, i) => (
            <ScrollReveal key={layer.module} delay={i * 90}>
              <div className="border-t border-life-navy/20 pt-7">
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-life-blue">
                  {layer.module}
                </p>
                <h3 className="mt-5 text-[22px] font-medium leading-[1.28] text-life-navy lg:text-[25px]">
                  {layer.name}
                </h3>
                <p className="mt-4 text-[15.5px] leading-[1.6] text-life-body">
                  {layer.body}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
