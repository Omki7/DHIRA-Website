import Link from "next/link";
import FigureEyebrow from "@/components/ui/FigureEyebrow";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import SectionHeader from "@/components/ui/SectionHeader";
import SectionLink from "@/components/ui/SectionLink";
import TwoToneTitle from "@/components/ui/TwoToneTitle";
import InsightCover from "./InsightCover";
import InsightsLibrary from "./InsightsLibrary";
import type { Insight } from "@/content/collections/insights";
import type { InsightsPage } from "@/content/pages/insights";
import { insightCardData } from "@/lib/insights";
import { formatDate, readingMinutes } from "@/lib/richText";

export function InsightsHero({ content, insight, minRead }: { content: InsightsPage["hero"]; insight: Insight; minRead: string }) {
  return (
    <section id="hero" className="bg-background pb-12 pt-12 lg:pb-16 lg:pt-20">
      <ScrollRevealRail>
        <ScrollReveal>
          <FigureEyebrow bare label={content.label} />
          <div className="mt-8 max-w-[52rem]">
            <TwoToneTitle as="h1" setup={content.setup} payoff={content.payoff} className="sm:!text-[56px] lg:!text-[64px]" />
            <p className="mt-6 max-w-[38rem] text-pretty text-lg leading-relaxed text-inkSoft">{content.lede}</p>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={120}>
          <article className="mt-12 overflow-hidden rounded-outer border border-subtle-stroke bg-primary-bg lg:mt-14">
            <Link href={`/insights/${insight.slug}`} aria-labelledby="featured-title" className="group grid md:grid-cols-2">
              <InsightCover kind={insight.cover} className="aspect-[8/5] border-b border-subtle-stroke md:aspect-auto md:min-h-[440px] md:border-b-0 md:border-r" />
              <div className="flex flex-col items-start justify-center px-6 py-8 sm:px-9 lg:px-12 lg:py-12">
                <p className="font-mono text-[11px] uppercase tracking-eyebrow text-overcast">{content.featuredLabel}</p>
                <h2 id="featured-title" className="mt-5 max-w-[17em] text-balance text-[30px] font-medium leading-[1.13] tracking-tighter text-ink transition-colors duration-150 group-hover:text-blue lg:text-[40px]">{insight.title}</h2>
                <p className="mt-5 max-w-[34em] text-pretty text-base leading-relaxed text-secondary-text">{insight.dek}</p>
                <p className="mt-6 text-xs text-inkSoft"><time dateTime={insight.date}>{formatDate(insight.date)}</time><span aria-hidden="true"> · </span>{readingMinutes(insight.blocks)} {minRead}</p>
                <span className="mt-7 inline-flex items-center gap-3 text-[15px] font-medium text-ink">{content.readArticle}<span aria-hidden="true" className="transition-transform duration-150 motion-safe:group-hover:translate-x-1">→</span></span>
              </div>
            </Link>
          </article>
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
        <p className="mt-8 text-sm text-inkSoft">{content.note}</p>
      </ScrollRevealRail>
    </section>
  );
}
