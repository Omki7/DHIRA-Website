/* [08] The closing card, built to the /akashic close recipe (AkashicClose,
   akashic-story.css .ak-close) so the two pages end the same way: the bare
   eyebrow, the headline and CTA pair left, numbered questions on a dotted
   rail right, a footer naming who does what and the flow in blue mono. */

import Link from "next/link";
import FigureEyebrow from "@/components/ui/FigureEyebrow";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import type { DeliveryPage } from "@/content/pages/delivery";

export default function DeliveryClose({ content: c }: { content: DeliveryPage["close"] }) {
  return (
    <section id="talk-to-our-team" className="scroll-mt-28 bg-background py-10 lg:py-16">
      <span id="login" />
      <ScrollRevealRail>
        <ScrollReveal>
          <div className="overflow-hidden rounded-outer border border-card-line bg-depth px-6 py-10 text-ink md:px-12 md:py-14">
            <FigureEyebrow num={c.eyebrow.number} label={c.eyebrow.label} bare />
            <div className="mt-10 grid gap-12 lg:grid-cols-[1.6fr_1fr] lg:gap-20">
              <div>
                <h2 className="text-balance text-[38px] font-medium leading-[1.07] tracking-tighter text-inkSoft md:text-[54px] lg:text-[60px]">
                  {c.title.setup}
                  <br />
                  <span className="text-ink">{c.title.payoff}</span>
                </h2>
                <p className="mt-6 max-w-[30em] text-pretty text-base leading-relaxed text-secondary-text">{c.lede}</p>
                <div className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                  <Link href={c.primary.href} className="btn-primary btn-lg justify-center">
                    {c.primary.label}
                    <svg aria-hidden viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5 shrink-0"><path d="M4 12h15M13 5l7 7-7 7" /></svg>
                  </Link>
                  <Link href={c.secondary.href} className="btn-secondary btn-lg justify-center">{c.secondary.label}</Link>
                </div>
              </div>
              <ol className="flex flex-col justify-center border-l border-line pl-7">
                {c.agenda.map((item, i) => (
                  <li key={item.label} className="relative py-5 before:absolute before:-left-[32px] before:top-7 before:h-[7px] before:w-[7px] before:rounded-full before:bg-blue-300">
                    <span className="font-mono text-[12px] font-medium uppercase tracking-[0.08em] text-blue-300">{String(i + 1).padStart(2, "0")} / {item.label}</span>
                    <p className="mt-2 max-w-[18em] text-lg leading-snug text-ink">{item.text}</p>
                  </li>
                ))}
              </ol>
            </div>
            <div className="mt-12 flex flex-wrap justify-between gap-4 border-t border-line pt-6 text-xs text-inkSoft">
              <span>{c.footer}</span>
              <span aria-hidden="true" className="font-mono text-[10px] text-blue-300">{c.flow}</span>
            </div>
          </div>
        </ScrollReveal>
      </ScrollRevealRail>
    </section>
  );
}
