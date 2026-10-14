"use client";

/*
 * [03] Point of view: "Eight years of shipping. Three strong opinions."
 *
 * Intent: convictions, stated as corrections. Each opinion is drawn as an
 * editor's redline over the sentence the industry usually says: the default
 * is struck through in blue pen and DHIRA's word is written after it. A
 * strong opinion is only strong against something, and the redline shows
 * what that something is without a second sentence to explain it.
 *
 * Markup is <del>/<ins>, so assistive tech reads the same correction the eye
 * sees. The strike draws once on view (`.ad-strike`), then the correction
 * fades in; under reduced motion both are simply there.
 *
 * Placement: straight after [02] Journey. The eight years are that journey, and
 * [04]'s headline is the first of these opinions put to work.
 *
 * Ground: the page's one soft blue band (Rule 5a), the breather between the
 * journey above and the drawings below.
 */

import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import useDrawn from "@/hooks/useDrawn";
import SectionHeader from "@/components/ui/SectionHeader";
import SectionCoda from "@/components/ui/SectionCoda";

type Opinion = {
  num: string;
  before: string;
  struck: string;
  correction: string;
  after: string;
  body: string;
};

const OPINIONS: Opinion[] = [
  {
    num: "01",
    before: "Technology follows ",
    struck: "the trend",
    correction: "the problem",
    after: ".",
    body: "Architecture serves the problem, never the fashion.",
  },
  {
    num: "02",
    before: "",
    struck: "The demo",
    correction: "Production",
    after: " is the real test.",
    body: "Stage demos prove nothing. Daily dependence does.",
  },
  {
    num: "03",
    before: "Good engineering builds ",
    struck: "dependency",
    correction: "ownership",
    after: ".",
    body: "Your product, your data, your technology. Always yours.",
  },
];

function Redline({ opinion, index }: { opinion: Opinion; index: number }) {
  const [ref, drawn] = useDrawn<HTMLLIElement>(0.6);
  const strikeAt = 0.25 + index * 0.1;

  return (
    <li
      ref={ref}
      data-drawn={drawn}
      className="grid grid-cols-[32px_1fr] gap-x-3 py-7 sm:grid-cols-[56px_1fr] sm:gap-x-4 lg:py-9"
    >
      <span className="pt-[0.9em] font-mono text-[11px] tracking-[0.08em] text-overcast">{opinion.num}</span>
      <div>
        <p className="text-[28px] font-semibold leading-[1.15] tracking-tighter text-ink sm:text-[38px] lg:text-[44px]">
          {opinion.before}
          <del className="relative whitespace-nowrap text-inkSoft no-underline decoration-transparent">
            {opinion.struck}
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
            {opinion.correction}
          </ins>
          {opinion.after}
        </p>
        <p className="mt-3 max-w-[36em] text-pretty text-base leading-relaxed text-inkSoft sm:text-[17px]">{opinion.body}</p>
      </div>
    </li>
  );
}

export default function AboutPointOfView() {
  return (
    <section
      id="point-of-view"
      className="scroll-mt-24 bg-[linear-gradient(180deg,#FFFFFF_0%,#F1F5FE_16%,#F1F5FE_84%,#FFFFFF_100%)] pt-12 pb-20 lg:pt-16 lg:pb-24"
    >
      <ScrollRevealRail>
        <SectionHeader
          num="03"
          label="What experience taught us"
          setup="Eight years of shipping."
          payoff="Three strong opinions."
          lede="Each opinion corrects an industry default, struck through in blue pen."
        />

        <ol className="mt-10 lg:mt-12 divide-y divide-blue-border/70 border-y border-blue-border/70">
          {OPINIONS.map((opinion, index) => (
            <Redline key={opinion.num} opinion={opinion} index={index} />
          ))}
        </ol>

        <ScrollReveal delay={120}>
          <SectionCoda lead="Not slogans for a wall." payoff="Rules for every system we ship." />
        </ScrollReveal>
      </ScrollRevealRail>
    </section>
  );
}
