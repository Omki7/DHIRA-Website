/*
 * [01] Built on Akashic: Enterprise Intelligence, IPMS and Akashic Life as
 * editorial rows (user-approved register, 14 Oct 2026), never cards. Left:
 * the name, the claim, one paragraph and the way in. Right: the working
 * points, numbered rather than ticked (Rule 2). Agent lines carry Preview.
 * Each row's id is an anchor: the nav links #ipms here, since IPMS has no
 * page of its own yet.
 */

import Link from "next/link";
import PreviewTag from "@/components/ui/PreviewTag";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import SectionHeader from "@/components/ui/SectionHeader";
import type { SolutionsPage } from "@/content/pages/solutions";

const pad = (n: number) => String(n).padStart(2, "0");

export default function SolutionsFeatured({ content }: { content: SolutionsPage["featured"] }) {
  const FEATURED_SOLUTIONS = content.items;
  return (
    <section id="built-on-akashic" className="scroll-mt-24 bg-background pb-20 pt-16 lg:pb-28 lg:pt-20">
      <ScrollRevealRail>
        <SectionHeader
          num={content.num}
          label={content.label}
          setup={content.setup}
          payoff={content.payoff}
          lede={content.lede}
        />

        <div className="mt-12 border-t border-lineSoft lg:mt-16">
          {FEATURED_SOLUTIONS.map((solution) => (
            <article
              key={solution.id}
              id={solution.id}
              className="grid scroll-mt-28 gap-8 border-b border-lineSoft py-10 lg:grid-cols-12 lg:gap-10 lg:py-14"
            >
              <ScrollReveal className="lg:col-span-5">
                <p className="font-mono text-[11px] uppercase tracking-eyebrow">
                  <span className="text-ink">{solution.name}</span>
                  <span className="text-overcast">&nbsp;&nbsp;·&nbsp;&nbsp;{solution.tagline}</span>
                </p>
                <h3 className="mt-4 text-balance text-[26px] font-semibold leading-[1.15] tracking-[-0.02em] text-ink lg:text-[30px]">
                  {solution.headline}
                </h3>
                <p className="mt-4 text-pretty text-[15px] leading-relaxed text-secondary-text">{solution.description}</p>
                <Link
                  href={solution.href}
                  className="group mt-6 inline-flex items-center gap-1.5 text-[15px] font-medium text-blue transition-colors duration-150 hover:text-blue-hover"
                >
                  {solution.cta}
                  <span aria-hidden className="transition-transform duration-250 ease-settle group-hover:translate-x-0.5">
                    &rarr;
                  </span>
                </Link>
              </ScrollReveal>

              <ScrollReveal delay={80} className="lg:col-span-7">
                <ol className="border-y border-dashed border-lineSoft">
                  {solution.points.map((point, index) => (
                    <li
                      key={point.text}
                      className="grid grid-cols-[36px_1fr] gap-4 border-b border-dashed border-lineSoft py-4 last:border-b-0"
                    >
                      <span className="pt-[3px] font-mono text-[11px] tracking-eyebrow text-overcast">{pad(index + 1)}</span>
                      <span className="text-pretty text-[15px] leading-relaxed text-ink">
                        {point.text}
                        {point.preview && <PreviewTag className="ml-2 align-[2px]" />}
                      </span>
                    </li>
                  ))}
                </ol>
              </ScrollReveal>
            </article>
          ))}
        </div>
      </ScrollRevealRail>
    </section>
  );
}
