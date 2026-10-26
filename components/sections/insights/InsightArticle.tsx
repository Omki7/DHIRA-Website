import Link from "next/link";
import FigureEyebrow from "@/components/ui/FigureEyebrow";
import PreviewTag from "@/components/ui/PreviewTag";
import RichText from "@/components/ui/RichText";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import SectionHeader from "@/components/ui/SectionHeader";
import ShareLinks from "@/components/ui/ShareLinks";
import InsightCover from "./InsightCover";
import InsightCard from "./InsightCard";
import type { Insight } from "@/content/collections/insights";
import type { InsightsPage } from "@/content/pages/insights";
import { getUiStrings } from "@/lib/content";
import { insightCardData } from "@/lib/insights";
import { formatDate, outline, readingMinutes } from "@/lib/richText";

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

export default async function InsightArticle({ insight, content, url }: { insight: Insight; content: InsightsPage["article"]; url: string }) {
  const ui = await getUiStrings();
  const contents = [...outline(insight.blocks), { id: "sources", text: content.sourcesLabel }];
  return (
    <article>
      <header className="border-b border-lineSoft pb-12 pt-10 lg:pb-16 lg:pt-14">
        <ScrollRevealRail>
          <nav aria-label={ui.longform.breadcrumb}>
            <Link href="/insights" className="inline-flex min-h-11 items-center gap-2 text-sm text-inkSoft hover:text-ink"><span aria-hidden="true">←</span>{content.backLabel}</Link>
          </nav>
          <div className="mt-8 grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-8">
              <FigureEyebrow bare label={insight.category} />
              <h1 className="mt-6 max-w-[21em] text-balance text-[36px] font-medium leading-[1.1] tracking-tighter text-ink sm:text-[44px] lg:text-[52px]">{insight.title}</h1>
              <p className="mt-6 max-w-[39em] text-pretty text-lg leading-relaxed text-inkSoft">{insight.dek}</p>
              <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 text-xs text-inkSoft">
                <span className="font-medium text-ink">{insight.author.name}</span>
                <time dateTime={insight.date}>{formatDate(insight.date)}</time>
                <span>{readingMinutes(insight.blocks)} {ui.longform.minRead}</span>
              </div>
              {insight.preview && <p className="mt-5 flex items-center gap-2 text-xs text-inkSoft">{content.agentLabel}<PreviewTag /></p>}
            </div>
            <InsightCover kind={insight.cover} className="aspect-[8/5] rounded-outer border border-subtle-stroke lg:col-span-4 lg:aspect-square" />
          </div>
        </ScrollRevealRail>
      </header>

      <ScrollRevealRail>
        <div className="grid gap-8 pb-16 pt-8 lg:grid-cols-12 lg:gap-14 lg:pb-24 lg:pt-14">
          <aside className="lg:col-span-3">
            <div className="lg:sticky lg:top-28">
              <div className="hidden lg:block">
                <p className="mb-4 font-mono text-[11px] uppercase tracking-eyebrow text-overcast">{ui.longform.contents}</p>
                <Contents items={contents} label={ui.longform.contents} />
              </div>
              <details className="rounded-btn border border-subtle-stroke px-4 lg:hidden">
                <summary className="cursor-pointer py-4 text-sm font-medium text-ink">{ui.longform.contents}</summary>
                <div className="pb-4"><Contents items={contents} label={ui.longform.contents} /></div>
              </details>
              <div className="hidden lg:mt-8 lg:block"><ShareLinks url={url} title={insight.title} /></div>
            </div>
          </aside>

          <div id="article-body" className="min-w-0 scroll-mt-28 lg:col-span-8">
            <div className="max-w-[43rem]">
              <aside className="mb-10 rounded-outer border border-subtle-stroke bg-primary-bg p-6 sm:p-8">
                <p className="font-mono text-[10px] uppercase tracking-eyebrow text-overcast">{content.takeawayLabel}</p>
                <p className="mt-3 text-pretty text-lg leading-relaxed text-ink">{insight.takeaway}</p>
              </aside>
              <div className="[&_h2]:font-medium [&_h3]:font-medium"><RichText blocks={insight.blocks} /></div>
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
              <div className="mt-8 border-t border-lineSoft pt-6 lg:hidden"><ShareLinks url={url} title={insight.title} /></div>
            </div>
          </div>
        </div>
      </ScrollRevealRail>
    </article>
  );
}

export function RelatedInsights({ insights, content, minRead }: { insights: Insight[]; content: InsightsPage["article"]; minRead: string }) {
  return (
    <section id="related" className="bg-background pb-16 pt-12 lg:pb-24 lg:pt-16">
      <ScrollRevealRail>
        <SectionHeader num="01" label={content.relatedLabel} setup={content.relatedSetup} payoff={content.relatedPayoff} />
        <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3">
          {insights.map(insight => <li key={insight.slug}><InsightCard insight={insightCardData(insight)} minRead={minRead} /></li>)}
        </ul>
      </ScrollRevealRail>
    </section>
  );
}
