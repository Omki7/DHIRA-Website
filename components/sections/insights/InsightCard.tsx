import Link from "next/link";
import InsightCover from "./InsightCover";
import PreviewTag from "@/components/ui/PreviewTag";
import type { InsightCardData } from "@/lib/insights";

export default function InsightCard({ insight, minRead }: { insight: InsightCardData; minRead: string }) {
  return (
    <article className="h-full">
      <Link href={`/insights/${insight.slug}`} aria-labelledby={`card-${insight.slug}`} className="group flex h-full flex-col rounded-outer">
        <InsightCover kind={insight.cover} className="aspect-[8/5] rounded-outer border border-subtle-stroke transition-transform duration-200 motion-safe:group-hover:-translate-y-1" />
        <div className="flex flex-1 flex-col px-1 pb-3 pt-6">
          <p className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-eyebrow text-overcast">{insight.category}{insight.cover === "authority" && <PreviewTag />}</p>
          <h3 id={`card-${insight.slug}`} className="mt-3 text-balance text-[23px] font-medium leading-[1.25] tracking-tight text-ink transition-colors duration-150 group-hover:text-blue">{insight.title}</h3>
          <p className="mt-3 text-pretty text-[15px] leading-relaxed text-secondary-text">{insight.dek}</p>
          <div className="mt-auto flex items-center justify-between pt-6 text-xs text-inkSoft">
            <span>{insight.minutes} {minRead}</span>
            <span aria-hidden="true" className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-lg text-ink transition-colors duration-150 group-hover:border-blue group-hover:text-blue">↗</span>
          </div>
        </div>
      </Link>
    </article>
  );
}
