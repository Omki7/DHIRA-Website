"use client";

/*
 * [03] How we work: "Not beside the system. Inside the system."
 *
 * One section of method (23 Sep 2026 warmth pass). What had been two, the
 * point-of-view redlines and the build drawing, now share this section so
 * the page spends one stop on how DHIRA works, not two.
 *
 * `SystemSection` is a section drawing cut through an organisation's
 * systems: products are the skin people touch, platforms the mass beneath,
 * and intelligence the blue threads rising from the data through both. The
 * pilot beside the cut is the thing we do not build.
 *
 * Under it, three promises drawn as an editor's redline: the industry habit
 * struck through in blue pen, DHIRA's word written after it. Markup is
 * <del>/<ins>, so assistive tech reads the same correction the eye sees.
 * The strike draws once on view (`.ad-strike`), then the correction fades
 * in; under reduced motion both are simply there.
 *
 * DRAFT: promise bodies rewritten toward the people served; review.
 *
 * Ground: white, continuing the opening's atmospheric fade.
 */

import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import SystemSection from "@/components/demos/about/SystemSection";
import SectionHeader from "@/components/ui/SectionHeader";
import SectionCoda from "@/components/ui/SectionCoda";
import useDrawn from "@/hooks/useDrawn";

type Vow = {
  num: string;
  before: string;
  struck: string;
  correction: string;
  after: string;
  body: string;
};

const PROMISES: Vow[] = [
  {
    num: "01",
    before: "Start from ",
    struck: "the trend",
    correction: "the need",
    after: ".",
    body: "The people using the system first. Architecture second.",
  },
  {
    num: "02",
    before: "",
    struck: "Launch",
    correction: "Daily use",
    after: " is the real test.",
    body: "Success is a system people rely on every morning, years on.",
  },
  {
    num: "03",
    before: "Build ",
    struck: "dependency",
    correction: "ownership",
    after: ".",
    body: "Your product, your data, your technology. Always yours.",
  },
];

function Redline({ promise, index }: { promise: Vow; index: number }) {
  const [ref, drawn] = useDrawn<HTMLLIElement>(0.6);
  const strikeAt = 0.25 + index * 0.1;

  return (
    <li ref={ref} data-drawn={drawn} className="py-6 md:py-0">
      <span className="font-mono text-[11px] tracking-[0.08em] text-overcast">{promise.num}</span>
      <p className="mt-3 text-[24px] font-semibold leading-[1.2] tracking-tighter text-ink sm:text-[26px]">
        {promise.before}
        <del className="relative whitespace-nowrap text-inkSoft no-underline decoration-transparent">
          {promise.struck}
          <span
            aria-hidden
            className="ad-strike absolute inset-x-[-0.06em] top-[54%] h-[0.075em] rounded-full bg-blue"
            style={{ ["--ad-delay" as string]: `${strikeAt}s` }}
          />
        </del>{" "}
        <ins
          className="ad-fade inline-block no-underline"
          style={{ ["--ad-delay" as string]: `${strikeAt + 0.45}s` }}
        >
          {promise.correction}
        </ins>
        {promise.after}
      </p>
      <p className="mt-2 text-pretty text-[15px] leading-relaxed text-inkSoft sm:text-base">{promise.body}</p>
    </li>
  );
}

export default function AboutWhatWeBuild() {
  return (
    <section
      id="how-we-work"
      className="scroll-mt-24 bg-background pt-12 pb-20 lg:pt-16 lg:pb-24"
    >
      <ScrollRevealRail>
        <SectionHeader
          num="03"
          label="How we work"
          setup="Not beside the system."
          payoff="Inside the system."
          lede="Answers arrive inside the systems your people already use, where the decision gets made. Never a pilot on the side."
        />

        {/* The drawing's viewBox carries its own headroom above the people
            row, so the gap under the lede stays tight. */}
        <ScrollReveal delay={180}>
          <div className="mt-8 md:mt-2">
            <SystemSection />
          </div>
        </ScrollReveal>

        <ol className="mt-10 grid grid-cols-1 divide-y divide-lineSoft border-t border-dashed border-lineSoft pt-4 md:grid-cols-3 md:gap-10 md:divide-y-0 md:pt-8">
          {PROMISES.map((promise, index) => (
            <Redline key={promise.num} promise={promise} index={index} />
          ))}
        </ol>

        <ScrollReveal delay={120}>
          <SectionCoda lead="Not slogans for a wall." payoff="Promises to the people we build for." />
        </ScrollReveal>
      </ScrollRevealRail>
    </section>
  );
}
