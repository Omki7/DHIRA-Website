import type { Insight } from "@/content/collections/insights";
import { readingMinutes } from "@/lib/richText";

export type InsightCardData = Pick<Insight, "slug" | "title" | "dek" | "category" | "cover" | "date"> & { minutes: number };

/** Keep article bodies and source lists out of the interactive library payload. */
export function insightCardData(insight: Insight): InsightCardData {
  const { slug, title, dek, category, cover, date } = insight;
  return { slug, title, dek, category, cover, date, minutes: readingMinutes(insight.blocks) };
}
