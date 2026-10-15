import { INSIGHTS_BY_DATE } from "@/lib/insights";
import { SITE, absoluteUrl } from "@/lib/site";

/* RSS 2.0 for /insights, built from the same typed content as the pages, so
   the feed can never drift from the hub. Static at build time. */

export const dynamic = "force-static";

const escape = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function GET() {
  const items = INSIGHTS_BY_DATE.map((insight) => {
    const url = absoluteUrl(`/insights/${insight.slug}`);
    return [
      "<item>",
      `<title>${escape(insight.title)}</title>`,
      `<link>${url}</link>`,
      `<guid isPermaLink="true">${url}</guid>`,
      `<description>${escape(insight.dek)}</description>`,
      `<category>${escape(insight.category)}</category>`,
      `<pubDate>${new Date(`${insight.date}T09:00:00Z`).toUTCString()}</pubDate>`,
      "</item>",
    ].join("");
  }).join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${SITE.name} Insights</title><link>${absoluteUrl(
    "/insights"
  )}</link><description>Perspectives from the team building Akashic.</description><language>en-gb</language>${items}</channel></rss>`;

  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
