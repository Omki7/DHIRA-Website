/*
 * [04] The record — one reading, and everyone downstream holds the same one.
 *
 * The page's light breather, and its one product view. The reference puts a
 * body in the middle and hangs organ findings off it; we put the handset in
 * the middle and hang the chain of custody off it, because that is what
 * Akashic Life actually produces. It does not read organs. It reads a
 * mother, once, and keeps the reading intact all the way up.
 *
 * The pale cyan ground is this page's equivalent of the site's one soft blue
 * band (Design Rule 5a): a single light breather between two dark movements.
 */

import ScrollReveal from "@/components/ui/ScrollReveal";
import LifeRecordAnatomyMockup from "@/components/demos/mockups/life/LifeRecordAnatomyMockup";
import { LifeEyebrow, LifeCornerArc } from "@/components/ui/life/LifeChrome";
import type { LifePage } from "@/content/pages/solutions-life";

export default function LifeRecord({ content }: { content: LifePage["record"] }) {
  return (
    <section id="the-record" className="relative scroll-mt-20 overflow-hidden bg-life-ice">
      <div
        aria-hidden
        className="absolute inset-0 life-paper"
      />
      {/* Two soft blooms so the ground is weather rather than a flat fill. */}
      
      
      <LifeCornerArc tone="light" />

      <div className="relative mx-auto w-full max-w-[1440px] px-6 pb-28 pt-28 sm:px-10 lg:px-14 lg:pb-40 lg:pt-40">
        <ScrollReveal className="flex flex-col items-center text-center">
          <LifeEyebrow num={content.eyebrow.num} tone="light">{content.eyebrow.label}</LifeEyebrow>
          <h2 className="mt-9 max-w-[17em] text-[30px] font-medium leading-[1.28] tracking-[-0.005em] text-life-navy sm:text-[38px] lg:text-[46px]">
            {content.title}
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={120} className="mt-20 lg:mt-24">
          <LifeRecordAnatomyMockup />
        </ScrollReveal>
      </div>
    </section>
  );
}
