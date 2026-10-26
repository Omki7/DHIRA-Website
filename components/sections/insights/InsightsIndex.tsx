import Link from "next/link";
import FigureEyebrow from "@/components/ui/FigureEyebrow";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import SectionHeader from "@/components/ui/SectionHeader";
import SectionLink from "@/components/ui/SectionLink";
import TwoToneTitle from "@/components/ui/TwoToneTitle";
import SubscribeForm from "@/components/ui/SubscribeForm";
import InsightCover from "./InsightCover";
import { Kicker } from "./InsightCard";
import InsightsLibrary from "./InsightsLibrary";
import type { Insight } from "@/content/collections/insights";
import type { InsightsPage } from "@/content/pages/insights";
import { insightCardData } from "@/lib/insights";
import { formatDate, formatShortDate, readingMinutes } from "@/lib/richText";
import { absoluteUrl } from "@/lib/site";

/*
 * DESIGN INTENT:
 * /insights reads as a gallery of essays (26 Oct 2026, user: "class leading
 * and feel like gallery"). The hero is a front page in the manner of
 * Anthropic's newsroom: the featured essay large with its cover plate, the
 * three newest beside it, under a dated masthead rule. The library below is
 * the full archive (InsightsLibrary).
 */

function Byline({ insight, minRead }: { insight: Insight; minRead: string }) {
  return (
    <p className="text-[13px] leading-relaxed text-inkSoft">
      <span className="text-ink">{insight.author.name}</span>
      <span aria-hidden="true"> · </span>
      <time dateTime={insight.date}>{formatShortDate(insight.date)}</time>
      <span aria-hidden="true"> · </span>
      {readingMinutes(insight.blocks)} {minRead}
    </p>
  );
}

export function InsightsHero({ content, insights, minRead }: { content: InsightsPage["hero"]; insights: Insight[]; minRead: string }) {
  const lead = insights.find(item => item.slug === content.featuredSlug) ?? insights[0];
  const [first, ...rest] = insights.filter(item => item.slug !== lead.slug).slice(0, 3);
  return (
    <section id="hero" className="bg-background pb-16 pt-10 lg:pb-24 lg:pt-14">
      <ScrollRevealRail>
        <ScrollReveal>
          <FigureEyebrow bare label={content.label} />
          <div className="mt-6 max-w-[50rem]">
            <TwoToneTitle as="h1" setup={content.setup} payoff={content.payoff} className="sm:!text-[52px] lg:!text-[60px]" />
            <p className="mt-5 max-w-[38rem] text-pretty text-lg leading-relaxed text-inkSoft">{content.lede}</p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={120}>
          <div className="mt-12 flex items-center justify-between gap-6 border-t border-ink pt-3 font-mono text-[11px] uppercase tracking-eyebrow lg:mt-14">
            <p className="text-ink">{content.latestLabel}</p>
            <p className="text-overcast">{content.updatedLabel} <time dateTime={insights[0].date}>{formatDate(insights[0].date)}</time></p>
          </div>

          <div className="mt-8 grid gap-12 lg:grid-cols-12 lg:gap-0">
            <article className="lg:col-span-8 lg:pr-12">
              <Link href={`/insights/${lead.slug}`} aria-labelledby="lead-title" className="group block">
                <InsightCover kind={lead.cover} className="aspect-[8/5] rounded-outer lg:aspect-[16/9] border border-subtle-stroke transition-colors duration-200 group-hover:border-blue-border" />
                <p className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[10.5px] uppercase tracking-eyebrow">
                  <span className="text-ink">{content.featuredLabel}</span>
                  <span aria-hidden="true" className="h-3 w-px bg-line" />
                  <span className="text-overcast">{lead.category}</span>
                </p>
                <h2 id="lead-title" className="mt-4 max-w-[20em] text-balance text-[30px] font-medium leading-[1.1] tracking-tighter text-ink transition-colors duration-150 group-hover:text-blue sm:text-[38px] lg:text-[44px]">{lead.title}</h2>
                <p className="mt-5 max-w-[40em] text-pretty text-[17px] leading-relaxed text-secondary-text lg:text-lg">{lead.dek}</p>
                <div className="mt-6"><Byline insight={lead} minRead={minRead} /></div>
              </Link>
            </article>

            <div className="border-t border-lineSoft pt-10 lg:col-span-4 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
              <h2 className="sr-only">{content.moreLabel}</h2>
              <ol className="divide-y divide-lineSoft">
                {[first, ...rest].map((item, index) => (
                  <li key={item.slug} className={index ? "py-7 last:pb-0" : "pb-7"}>
                    <article>
                      <Link href={`/insights/${item.slug}`} aria-labelledby={`latest-${item.slug}`} className="group block">
                        {index === 0 && <InsightCover kind={item.cover} className="mb-6 aspect-[8/5] rounded-outer border border-subtle-stroke transition-colors duration-200 group-hover:border-blue-border" />}
                        <Kicker insight={item} />
                        <h3 id={`latest-${item.slug}`} className="mt-3 text-balance text-[21px] font-medium leading-[1.25] tracking-tight text-ink transition-colors duration-150 group-hover:text-blue">{item.title}</h3>
                        {index > 0 && <p className="mt-2.5 line-clamp-2 text-pretty text-[14.5px] leading-relaxed text-secondary-text">{item.dek}</p>}
                        <div className="mt-4"><Byline insight={item} minRead={minRead} /></div>
                      </Link>
                    </article>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </ScrollReveal>
      </ScrollRevealRail>
    </section>
  );
}

export function InsightsLatest({ insights, content, minRead }: { insights: Insight[]; content: InsightsPage["latest"]; minRead: string }) {
  return (
    <section id="latest" className="scroll-mt-24 bg-background pb-16 pt-12 lg:pb-24 lg:pt-16">
      <ScrollRevealRail>
        <SectionHeader num="01" label={content.label} setup={content.setup} payoff={content.payoff} lede={content.lede} />
        <InsightsLibrary insights={insights.map(insightCardData)} content={content} minRead={minRead} />
      </ScrollRevealRail>
    </section>
  );
}

export function InsightsSubscribe({ content, num = "02" }: { content: InsightsPage["subscribe"]; num?: string }) {
  return (
    <section id="subscribe" className="scroll-mt-24 bg-band pb-16 pt-12 lg:pb-24 lg:pt-16">
      <ScrollRevealRail>
        <SectionHeader num={num} label={content.label} setup={content.setup} payoff={content.payoff} lede={content.lede}>
          <SectionLink href={content.rss.href}>{content.rss.link}</SectionLink>
        </SectionHeader>
        <SubscribeForm href={absoluteUrl(content.rss.href)} content={content.feed} />
        <p className="mt-3 text-sm text-inkSoft">{content.note}</p>
      </ScrollRevealRail>
    </section>
  );
}
