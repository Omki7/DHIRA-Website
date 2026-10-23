/*
 * The Insights hub below its hero: the newest article as a full-width lead,
 * then every article as a register row (date, category, title and dek,
 * reading time), the solutions-hub row grammar. Then the subscribe band, the
 * page's one soft blue band (Rule 5a). No thumbnails: the site's resource
 * pages are typographic, and stock imagery would read as filler.
 */

import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import SectionHeader from "@/components/ui/SectionHeader";
import SubscribeForm from "@/components/ui/SubscribeForm";
import type { Insight } from "@/content/collections/insights";
import type { InsightsPage } from "@/content/pages/insights";
import { formatDate, readingMinutes } from "@/lib/richText";

/* One line in the lead; stacked in a register row's narrow left column so
   the date never wraps mid-phrase. */
function Meta({ insight, minRead, stacked = false }: { insight: Insight; minRead: string; stacked?: boolean }) {
  const when = `${formatDate(insight.date)}  ·  ${readingMinutes(insight.blocks)} ${minRead}`;
  if (stacked) {
    return (
      <span className="block font-mono text-[11px] uppercase leading-[1.8] tracking-eyebrow text-overcast">
        <span className="block text-blue">{insight.category}</span>
        <span className="block">{when}</span>
      </span>
    );
  }
  return (
    <p className="font-mono text-[11px] uppercase tracking-eyebrow text-overcast">
      <span className="text-blue">{insight.category}</span>&nbsp;&nbsp;·&nbsp;&nbsp;{when}
    </p>
  );
}

/** `insights` newest first. */
export function InsightsLatest({ insights, content, minRead }: { insights: Insight[]; content: InsightsPage["latest"]; minRead: string }) {
  const [lead, ...rest] = insights;
  return (
    <section id="latest" className="scroll-mt-24 bg-background pb-20 pt-14 lg:pb-28 lg:pt-16">
      <ScrollRevealRail>
        <ScrollReveal>
          <article className="grid gap-8 border-b border-lineSoft pb-12 lg:grid-cols-12 lg:gap-10 lg:pb-16">
            <div className="lg:col-span-8">
              <Meta insight={lead} minRead={minRead} />
              <h2 className="mt-5 text-balance text-[32px] font-medium leading-[1.1] tracking-[-0.03em] text-ink lg:text-[44px]">
                <Link href={`/insights/${lead.slug}`} className="transition-colors duration-150 hover:text-blue">
                  {lead.title}
                </Link>
              </h2>
              <p className="mt-5 max-w-[40em] text-pretty text-lg leading-relaxed text-secondary-text">{lead.dek}</p>
            </div>
            <div className="flex flex-col justify-end lg:col-span-4 lg:items-end">
              <p className="text-[14px] text-secondary-text">{lead.author.name}</p>
              <Link
                href={`/insights/${lead.slug}`}
                className="group mt-3 inline-flex items-center gap-1.5 text-[15px] font-medium text-blue transition-colors duration-150 hover:text-blue-hover"
              >
                {content.readArticle}
                <span aria-hidden className="transition-transform duration-200 ease-settle group-hover:translate-x-0.5">
                  &rarr;
                </span>
              </Link>
            </div>
          </article>
        </ScrollReveal>

        <ScrollReveal delay={80}>
          <h2 className="mt-14 font-mono text-[11px] uppercase tracking-eyebrow text-overcast lg:mt-16">{content.allLabel}</h2>
          <ul className="mt-4 border-t border-lineSoft">
            {rest.map((insight) => (
              <li key={insight.slug}>
                <Link
                  href={`/insights/${insight.slug}`}
                  className="group grid gap-3 border-b border-lineSoft py-7 transition-colors duration-150 lg:grid-cols-12 lg:gap-10"
                >
                  <span className="lg:col-span-3">
                    <Meta insight={insight} minRead={minRead} stacked />
                  </span>
                  <span className="lg:col-span-8">
                    <span className="block text-balance text-[22px] font-semibold leading-snug tracking-[-0.02em] text-ink transition-colors duration-150 group-hover:text-blue">
                      {insight.title}
                    </span>
                    <span className="mt-2 block max-w-[44em] text-pretty text-[15px] leading-relaxed text-secondary-text">{insight.dek}</span>
                  </span>
                  <span aria-hidden className="hidden text-right text-overcast transition-transform duration-200 ease-settle group-hover:translate-x-0.5 group-hover:text-blue lg:col-span-1 lg:block">
                    &rarr;
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </ScrollReveal>
      </ScrollRevealRail>
    </section>
  );
}

export function InsightsSubscribe({ content: INSIGHTS_SUBSCRIBE, num = "01" }: { content: InsightsPage["subscribe"]; num?: string }) {
  return (
    <section
      id="subscribe"
      className="scroll-mt-24 bg-band pb-20 pt-16 lg:pb-28 lg:pt-20"
    >
      <ScrollRevealRail>
        <SectionHeader
          num={num}
          label={INSIGHTS_SUBSCRIBE.label}
          setup={INSIGHTS_SUBSCRIBE.setup}
          payoff={INSIGHTS_SUBSCRIBE.payoff}
          lede={INSIGHTS_SUBSCRIBE.lede}
        >
          <SubscribeForm id="insights-subscribe" />
          <p className="mt-4 font-mono text-[11px] uppercase tracking-eyebrow text-overcast">
            {INSIGHTS_SUBSCRIBE.rss.lead}{" "}
            <a href={INSIGHTS_SUBSCRIBE.rss.href} className="text-inkSoft underline decoration-line underline-offset-4 hover:text-blue">
              {INSIGHTS_SUBSCRIBE.rss.link}
            </a>
          </p>
        </SectionHeader>
      </ScrollRevealRail>
    </section>
  );
}
