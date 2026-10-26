"use client";

import { useDeferredValue, useState } from "react";
import InsightCard from "./InsightCard";
import type { InsightsPage } from "@/content/pages/insights";
import type { InsightCardData } from "@/lib/insights";

export default function InsightsLibrary({ insights, content, minRead }: { insights: InsightCardData[]; content: InsightsPage["latest"]; minRead: string }) {
  const [topic, setTopic] = useState("");
  const [query, setQuery] = useState("");
  const search = useDeferredValue(query.trim().toLocaleLowerCase("en-GB"));
  const topics = [...new Set(insights.map(item => item.category))];
  const words = search.split(/\s+/).filter(Boolean);
  const matches = insights.filter(item => (!topic || item.category === topic) && words.every(word => `${item.title} ${item.dek} ${item.category}`.toLocaleLowerCase("en-GB").includes(word)));
  return (
    <div className="mt-12 lg:mt-14">
      <div className="flex flex-wrap items-center justify-between gap-x-5 gap-y-5 border-b border-lineSoft pb-5">
        <div role="group" aria-label={content.topicsLabel} className="flex flex-wrap gap-1">
          {["", ...topics].map(value => (
            <button key={value} type="button" aria-pressed={topic === value} aria-controls="insight-results" onClick={() => setTopic(value)}
              className={`min-h-11 rounded-btn px-3 text-[13px] font-medium transition-colors duration-150 ${topic === value ? "bg-action text-on-action" : "text-inkSoft hover:bg-primary-bg hover:text-ink"}`}>
              {value || content.allLabel}
            </button>
          ))}
        </div>
        <div className="relative w-full sm:w-[280px]">
          <label htmlFor="insights-search" className="sr-only">{content.searchLabel}</label>
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="pointer-events-none absolute left-3.5 top-3 h-5 w-5 text-inkSoft"><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 5 5" /></svg>
          <input id="insights-search" type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder={content.searchPlaceholder} autoComplete="off"
            className="h-11 w-full rounded-btn border border-default-stroke bg-background pl-11 pr-11 text-sm text-ink placeholder:text-overcast focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue [&::-webkit-search-cancel-button]:appearance-none" />
          {query && <button type="button" aria-label={content.clearSearch} onClick={() => setQuery("")} className="absolute right-0 top-0 flex h-11 w-11 items-center justify-center rounded-btn text-inkSoft hover:text-ink"><span aria-hidden="true">×</span></button>}
        </div>
      </div>
      <p role="status" aria-live="polite" aria-atomic="true" className="pb-6 pt-5 text-xs text-inkSoft">
        {matches.length} {matches.length === 1 ? content.resultSingular : content.resultPlural}
      </p>
      <div id="insight-results" aria-label={content.resultsLabel}>
        {matches.length ? <ul className="grid gap-x-7 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-9 lg:gap-y-12">
          {matches.map(insight => <li key={insight.slug}><InsightCard insight={insight} minRead={minRead} /></li>)}
        </ul> : <div className="rounded-outer border border-dashed border-line py-16 text-center">
          <h3 className="text-xl font-medium text-ink">{content.emptyTitle}</h3>
          <p className="mt-3 text-sm text-secondary-text">{content.emptyBody}</p>
          <button type="button" onClick={() => { setQuery(""); setTopic(""); }} className="mt-5 min-h-11 px-4 text-sm font-medium text-blue underline underline-offset-4">{content.resetLabel}</button>
        </div>}
      </div>
    </div>
  );
}
