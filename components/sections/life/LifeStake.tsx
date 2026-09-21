/*
 * [09] The stake — the last thing said on a light ground.
 *
 * Same two-tone construction as [05], set larger and closed by a small
 * centred kicker in the reference's manner. This is where the page stops
 * describing a product and states what is at stake, immediately before the
 * one place it asks for anything.
 */

import ScrollReveal from "@/components/ui/ScrollReveal";

export default function LifeStake() {
  return (
    <section id="the-stake" className="relative scroll-mt-20 bg-background">
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(180deg,#E7F5F9_0%,#F7FBFA_34%,#FFFFFF_100%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.5] [background:repeating-conic-gradient(from_186deg_at_50%_-10%,rgba(3,4,94,0.03)_0deg,transparent_1.1deg,transparent_3.4deg)]"
      />

      <div className="relative mx-auto w-full max-w-[1440px] px-6 py-28 text-center sm:px-10 lg:px-14 lg:py-44">
        <ScrollReveal>
          <p className="mx-auto max-w-[17em] text-[28px] font-medium leading-[1.32] tracking-[-0.005em] sm:text-[38px] lg:text-[50px]">
            <span className="text-life-navy">
              Every day of delay puts a mother at risk.{" "}
            </span>
            <span className="text-[#7FB4D8]">
              That gap is not a clinical problem. It is an infrastructure
              problem, and DHIRA has closed one before at the scale of a
              country.
            </span>
          </p>
        </ScrollReveal>

        <ScrollReveal delay={140}>
          <p className="mx-auto mt-16 max-w-[38em] text-[12px] font-bold uppercase leading-[1.7] tracking-[0.14em] text-life-navy lg:mt-20">
            Akashic Life reads risk at the edge today. The question left is
            whose district it runs in next.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
