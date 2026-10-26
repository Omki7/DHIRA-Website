"use client";

import { useDeferredValue, useState } from "react";
import InsightCard, { InsightRow } from "./InsightCard";
import type { InsightsPage } from "@/content/pages/insights";
import type { InsightCardData } from "@/lib/insights";

/* The library (26 Oct 2026): topic tabs with their counts, a search, and two
   views of the same results. Gallery leads with the cover plates; Index is
   the archive, one dated row per essay. */

type View = "gallery" | "index";

export default function InsightsLibrary({ insights, content, minRead }: { insights: InsightCardData[]; content: InsightsPage["latest"]; minRead: string }) {
  const [topic, setTopic] = useState("");
  const [query, setQuery] = useState("");
  const [view, setView] = useState<View>("gallery");
  const search = useDeferredValue(query.trim().toLocaleLowerCase("en-GB"));
  const topics = [...new Set(insights.map(item => item.category))];
  const words = search.split(/\s+/).filter(Boolean);
  const matches = insights.filter(item => (!topic || item.category === topic) && words.every(word => `${item.title} ${item.dek} ${item.category} ${item.author}`.toLocaleLowerCase("en-GB").includes(word)));
  const count = (value: string) => value ? insights.filter(item => item.category === value).length : insights.length;
  const views: [View, string][] = [["gallery", content.galleryLabel], ["index", content.indexLabel]];

  return (
    <div className="mt-12 lg:mt-14">
      <div className="flex flex-col gap-5 border-b border-lineSoft lg:flex-row lg:items-end lg:justify-between">
        <div role="group" aria-label={content.topicsLabel} className="-mx-4 -mb-px flex gap-x-7 overflow-x-auto px-4 [scrollbar-width:none] sm:-mx-6 sm:px-6 lg:mx-0 lg:flex-wrap lg:overflow-visible lg:px-0 [&::-webkit-scrollbar]:hidden">
          {["", ...topics].map(value => (
            <button key={value} type="button" aria-pressed={topic === value} aria-controls="insight-results" onClick={() => setTopic(value)}
              className={`relative inline-flex min-h-11 flex-none items-center gap-2 whitespace-nowrap border-b pb-px text-[14px] transition-colors duration-150 ${topic === value ? "border-ink text-ink" : "border-transparent text-inkSoft hover:text-ink"}`}>
              {value || content.allLabel}
              <span className="font-mono text-[10px] text-overcast">{count(value)}</span>
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3 pb-3">
          <div className="relative min-w-0 flex-1 lg:w-[260px] lg:flex-none">
            <label htmlFor="insights-search" className="sr-only">{content.searchLabel}</label>
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="pointer-events-none absolute left-3.5 top-3 h-5 w-5 text-inkSoft"><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 5 5" /></svg>
            <input id="insights-search" type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder={content.searchPlaceholder} autoComplete="off"
              className="h-11 w-full rounded-btn border border-default-stroke bg-background pl-11 pr-11 text-sm text-ink placeholder:text-overcast focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue [&::-webkit-search-cancel-button]:appearance-none" />
            {query && <button type="button" aria-label={content.clearSearch} onClick={() => setQuery("")} className="absolute right-0 top-0 flex h-11 w-11 items-center justify-center rounded-btn text-inkSoft hover:text-ink"><span aria-hidden="true">×</span></button>}
          </div>
          <div role="group" aria-label={content.viewLabel} className="flex h-11 flex-none rounded-btn border border-default-stroke p-1">
            {views.map(([value, label]) => (
              <button key={value} type="button" aria-pressed={view === value} aria-controls="insight-results" onClick={() => setView(value)}
                className={`rounded-[6px] px-3 text-[13px] font-medium transition-colors duration-150 ${view === value ? "bg-primary-bg text-ink" : "text-inkSoft hover:text-ink"}`}>
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <p role="status" aria-live="polite" aria-atomic="true" className="pb-8 pt-5 font-mono text-[11px] uppercase tracking-eyebrow text-overcast">
        {matches.length} {matches.length === 1 ? content.resultSingular : content.resultPlural}
      </p>

      <div id="insight-results" aria-label={content.resultsLabel}>
        {!matches.length ? (
          <div className="rounded-outer border border-dashed border-line py-16 text-center">
            <h3 className="text-xl font-medium text-ink">{content.emptyTitle}</h3>
            <p className="mt-3 text-sm text-secondary-text">{content.emptyBody}</p>
            <button type="button" onClick={() => { setQuery(""); setTopic(""); }} className="mt-5 min-h-11 px-4 text-sm font-medium text-blue underline underline-offset-4">{content.resetLabel}</button>
          </div>
        ) : view === "gallery" ? (
          <ul className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-10 lg:gap-y-16">
            {matches.map(insight => <li key={insight.slug}><InsightCard insight={insight} minRead={minRead} /></li>)}
          </ul>
        ) : (
          <ul className="border-t border-lineSoft">
            {matches.map(insight => <li key={insight.slug} className="border-b border-lineSoft"><InsightRow insight={insight} minRead={minRead} /></li>)}
          </ul>
        )}
      </div>
    </div>
  );
}
