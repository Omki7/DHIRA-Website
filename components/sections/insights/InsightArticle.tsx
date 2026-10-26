import Link from "next/link";
import DhiraLogo from "@/components/icons/DhiraLogo";
import FigureEyebrow from "@/components/ui/FigureEyebrow";
import PreviewTag from "@/components/ui/PreviewTag";
import RichText from "@/components/ui/RichText";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import SectionHeader from "@/components/ui/SectionHeader";
import ShareLinks from "@/components/ui/ShareLinks";
import InsightCover from "./InsightCover";
import InsightCard from "./InsightCard";
import ReadingProgress from "./ReadingProgress";
import type { Insight } from "@/content/collections/insights";
import type { InsightsPage } from "@/content/pages/insights";
import { getUiStrings } from "@/lib/content";
import { insightCardData } from "@/lib/insights";
import { formatDate, outline, readingMinutes } from "@/lib/richText";

/*
 * DESIGN INTENT:
 * An Insights essay reads like the best long-form blogs (26 Oct 2026, user:
 * "should feel like written in medium and other big blog posts"): one
 * centred reading column of about 70 characters, a title block with the
 * byline above a wide cover plate, larger ink body text, pull quotes in
 * Newsreader and a reading line across the top. Contents and sharing sit in
 * the left margin on wide screens and fold away on smaller ones.
 */

function Contents({ items, label }: { items: { id: string; text: string }[]; label: string }) {
  return (
    <nav aria-label={label}>
      <ol className="space-y-1 border-l border-lineSoft">
        {items.map(item => <li key={item.id}>
          <a href={`#${item.id}`} className="-ml-px block border-l border-transparent py-2 pl-4 text-[13px] leading-relaxed text-inkSoft transition-colors duration-150 hover:border-blue hover:text-ink">{item.text}</a>
        </li>)}
      </ol>
    </nav>
  );
}

function TeamMark({ size }: { size: "sm" | "lg" }) {
  return (
    <span aria-hidden="true" className={`flex flex-none items-center justify-center rounded-full border border-subtle-stroke bg-primary-bg ${size === "lg" ? "h-14 w-14" : "h-11 w-11"}`}>
      <DhiraLogo className={`text-ink ${size === "lg" ? "h-6 w-6" : "h-5 w-5"}`} />
    </span>
  );
}

export default async function InsightArticle({ insight, content, url }: { insight: Insight; content: InsightsPage["article"]; url: string }) {
  const ui = await getUiStrings();
  const contents = [...outline(insight.blocks), { id: "sources", text: content.sourcesLabel }];
  return (
    <article>
      <ReadingProgress target="article-body" />
      <header className="pt-6 lg:pt-10">
        <ScrollRevealRail>
          <div className="mx-auto max-w-[44rem]">
            <nav aria-label={ui.longform.breadcrumb}>
              <Link href="/insights" className="inline-flex min-h-11 items-center gap-2 text-sm text-inkSoft transition-colors duration-150 hover:text-ink"><span aria-hidden="true">←</span>{content.backLabel}</Link>
            </nav>
            <div className="mt-6"><FigureEyebrow bare label={insight.category} /></div>
            <h1 className="mt-6 text-balance text-[34px] font-medium leading-[1.1] tracking-tighter text-ink sm:text-[46px] lg:text-[54px]">{insight.title}</h1>
            <p className="mt-6 text-pretty text-[19px] leading-[1.6] text-inkSoft lg:text-[21px]">{insight.dek}</p>
            {insight.preview && <p className="mt-5 flex items-center gap-2 text-xs text-inkSoft">{content.agentLabel}<PreviewTag /></p>}
            <div className="mt-9 flex flex-wrap items-center gap-x-4 gap-y-3 border-y border-lineSoft py-4">
              <TeamMark size="sm" />
              <div className="min-w-0 flex-1">
                <p className="text-[15px] font-medium text-ink">{insight.author.name}</p>
                <p className="text-[13px] text-inkSoft">{insight.author.role}</p>
              </div>
              <p className="w-full text-[13px] text-inkSoft sm:w-auto">
                <time dateTime={insight.date}>{formatDate(insight.date)}</time>
                <span aria-hidden="true"> · </span>
                {readingMinutes(insight.blocks)} {ui.longform.minRead}
              </p>
            </div>
          </div>
          <InsightCover kind={insight.cover} className="mx-auto mt-10 aspect-[8/5] max-w-[72rem] rounded-outer border border-subtle-stroke sm:aspect-[2/1] lg:mt-12 lg:aspect-[12/5]" />
        </ScrollRevealRail>
      </header>

      <ScrollRevealRail>
        <div className="grid pb-16 pt-12 lg:pb-24 lg:pt-16 xl:grid-cols-[minmax(0,1fr)_44rem_minmax(0,1fr)] xl:gap-x-12">
          <aside className="hidden xl:block xl:justify-self-end">
            <div className="sticky top-28 w-[15rem]">
              <p className="mb-4 font-mono text-[11px] uppercase tracking-eyebrow text-overcast">{ui.longform.contents}</p>
              <Contents items={contents} label={ui.longform.contents} />
              <div className="mt-10"><ShareLinks url={url} title={insight.title} /></div>
            </div>
          </aside>

          <div id="article-body" className="mx-auto w-full min-w-0 max-w-[44rem] scroll-mt-28">
            <details className="mb-10 rounded-btn border border-subtle-stroke px-4 xl:hidden">
              <summary className="cursor-pointer py-4 text-sm font-medium text-ink">{ui.longform.contents}</summary>
              <div className="pb-4"><Contents items={contents} label={ui.longform.contents} /></div>
            </details>

            <aside className="mb-12 border-y border-lineSoft py-6">
              <p className="font-mono text-[11px] uppercase tracking-eyebrow text-overcast">{content.takeawayLabel}</p>
              <p className="mt-3 text-pretty text-[19px] font-medium leading-[1.55] tracking-[-0.005em] text-ink">{insight.takeaway}</p>
            </aside>

            <div className="[&_h2]:font-medium [&_h3]:font-medium"><RichText blocks={insight.blocks} size="essay" /></div>

            <div className="mt-16 flex items-center gap-5 border-t border-lineSoft pt-8">
              <TeamMark size="lg" />
              <div>
                <p className="font-mono text-[11px] uppercase tracking-eyebrow text-overcast">{content.writtenBy}</p>
                <p className="mt-1.5 text-[17px] font-medium text-ink">{insight.author.name}</p>
                <p className="text-sm text-inkSoft">{insight.author.role}</p>
              </div>
            </div>

            <section id="sources" aria-labelledby="sources-title" className="mt-12 scroll-mt-28 border-t border-lineSoft pt-8">
              <h2 id="sources-title" className="text-xl font-medium tracking-tight text-ink">{content.sourcesLabel}</h2>
              <p className="mt-3 text-sm leading-relaxed text-inkSoft">{content.sourcesNote}</p>
              <ul className="mt-6 divide-y divide-lineSoft">
                {insight.sources.map(source => <li key={source.href} className="py-4">
                  <p className="text-xs text-inkSoft">{source.publisher}</p>
                  <a href={source.href} {...(source.href.startsWith("https:") ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="mt-1 inline-block text-[15px] leading-relaxed text-blue underline decoration-blue-border underline-offset-4 hover:decoration-blue">{source.title}<span aria-hidden="true"> ↗</span></a>
                </li>)}
              </ul>
            </section>
            <div className="mt-8 border-t border-lineSoft pt-6 xl:hidden"><ShareLinks url={url} title={insight.title} /></div>
          </div>
        </div>
      </ScrollRevealRail>
    </article>
  );
}

export function RelatedInsights({ insights, content, minRead }: { insights: Insight[]; content: InsightsPage["article"]; minRead: string }) {
  return (
    <section id="related" className="border-t border-lineSoft bg-background pb-16 pt-12 lg:pb-24 lg:pt-16">
      <ScrollRevealRail>
        <SectionHeader num="01" label={content.relatedLabel} setup={content.relatedSetup} payoff={content.relatedPayoff} />
        <ul className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-x-10">
          {insights.map(insight => <li key={insight.slug}><InsightCard insight={insightCardData(insight)} minRead={minRead} /></li>)}
        </ul>
      </ScrollRevealRail>
    </section>
  );
}
