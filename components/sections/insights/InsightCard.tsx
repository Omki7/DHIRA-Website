import Link from "next/link";
import InsightCover from "./InsightCover";
import PreviewTag from "@/components/ui/PreviewTag";
import type { InsightCardData } from "@/lib/insights";
import { formatShortDate } from "@/lib/richText";

/* The two ways the library shows an essay (26 Oct 2026): a gallery card led
   by its cover plate, and an archive row for scanning by date. Both carry
   the byline, date and reading time, the way long-form publications do. */

function Byline({ insight, minRead }: { insight: InsightCardData; minRead: string }) {
  return (
    <p className="text-[12.5px] leading-relaxed text-inkSoft">
      <span className="text-ink">{insight.author}</span>
      <span aria-hidden="true"> · </span>
      <time dateTime={insight.date}>{formatShortDate(insight.date)}</time>
      <span aria-hidden="true"> · </span>
      {insight.minutes} {minRead}
    </p>
  );
}

export function Kicker({ insight, className = "" }: { insight: Pick<InsightCardData, "category" | "preview">; className?: string }) {
  return (
    <p className={`flex items-center gap-3 font-mono text-[10.5px] uppercase tracking-eyebrow text-overcast ${className}`}>
      {insight.category}
      {insight.preview && <PreviewTag />}
    </p>
  );
}

export default function InsightCard({ insight, minRead, headingLevel = 3 }: { insight: InsightCardData; minRead: string; headingLevel?: 2 | 3 }) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  return (
    <article className="h-full">
      <Link href={`/insights/${insight.slug}`} aria-labelledby={`card-${insight.slug}`} className="group flex h-full flex-col rounded-outer">
        <InsightCover kind={insight.cover} className="aspect-[8/5] rounded-outer border border-subtle-stroke transition-colors duration-200 group-hover:border-blue-border" />
        <Kicker insight={insight} className="mt-6" />
        <Heading id={`card-${insight.slug}`} className="mt-3 text-balance text-[21px] font-medium leading-[1.25] tracking-tight text-ink transition-colors duration-150 group-hover:text-blue">{insight.title}</Heading>
        <p className="mt-3 line-clamp-3 text-pretty text-[15px] leading-relaxed text-secondary-text">{insight.dek}</p>
        <div className="mt-auto pt-5"><Byline insight={insight} minRead={minRead} /></div>
      </Link>
    </article>
  );
}

export function InsightRow({ insight, minRead }: { insight: InsightCardData; minRead: string }) {
  return (
    <article>
      <Link href={`/insights/${insight.slug}`} aria-labelledby={`row-${insight.slug}`}
        className="group grid gap-x-8 gap-y-2 py-6 sm:grid-cols-[112px_minmax(0,1fr)] lg:grid-cols-[132px_minmax(0,1fr)_230px_96px] lg:items-baseline">
        <time dateTime={insight.date} className="font-mono text-[11px] uppercase tracking-eyebrow text-overcast">{formatShortDate(insight.date)}</time>
        <div className="min-w-0">
          <h3 id={`row-${insight.slug}`} className="text-balance text-[19px] font-medium leading-snug tracking-tight text-ink transition-colors duration-150 group-hover:text-blue">{insight.title}</h3>
          <p className="mt-1.5 line-clamp-2 max-w-[44rem] text-pretty text-[14.5px] leading-relaxed text-secondary-text">{insight.dek}</p>
          <p className="mt-2 text-[12.5px] text-inkSoft lg:hidden">{insight.author}<span aria-hidden="true"> · </span>{insight.category}<span aria-hidden="true"> · </span>{insight.minutes} {minRead}</p>
        </div>
        <Kicker insight={insight} className="hidden flex-wrap gap-y-2 lg:flex" />
        <p className="hidden text-right text-[12.5px] text-inkSoft lg:block">{insight.minutes} {minRead}</p>
      </Link>
    </article>
  );
}
