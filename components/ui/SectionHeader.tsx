"use client";

/*
 * The section header for /about and /careers, in the homepage and /akashic
 * grammar: the eyebrow rail, then the two-tone headline, then the lede
 * directly beneath it, all on the left. Headline and lede never split into
 * two columns (user direction, 23 Sep 2026): a lede parked in a right column
 * reads as a caption to nothing, and the eye has to cross the page to find
 * the second half of the argument.
 *
 * `children` sits under the lede (a link, a control), still in the column.
 */

import type { ReactNode } from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import FigureEyebrow from "@/components/ui/FigureEyebrow";
import TwoToneTitle from "@/components/ui/TwoToneTitle";

type Tone = "light" | "depth";

export default function SectionHeader({
  num,
  label,
  live,
  setup,
  payoff,
  lede,
  tone = "light",
  children,
}: {
  num: string;
  label: string;
  live?: string;
  setup: ReactNode;
  payoff: ReactNode;
  lede?: ReactNode;
  tone?: Tone;
  children?: ReactNode;
}) {
  const dark = tone === "depth";
  return (
    <header>
      <ScrollReveal>
        <FigureEyebrow num={num} label={label} live={live} dark={dark} />
      </ScrollReveal>
      <div className="mt-10 max-w-[46rem] lg:mt-12">
        <ScrollReveal delay={80}>
          <TwoToneTitle setup={setup} payoff={payoff} tone={tone} />
        </ScrollReveal>
        {lede && (
          <ScrollReveal delay={140}>
            <p className={`mt-6 max-w-[36em] text-pretty text-base leading-relaxed sm:text-lg ${dark ? "text-uc-mute" : "text-inkSoft"}`}>
              {lede}
            </p>
          </ScrollReveal>
        )}
        {children && <ScrollReveal delay={180}>{children}</ScrollReveal>}
      </div>
    </header>
  );
}
