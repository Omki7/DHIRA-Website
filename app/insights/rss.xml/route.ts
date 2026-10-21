import { getInsights, getPage } from "@/lib/content";
import { absoluteUrl } from "@/lib/site";

/* RSS 2.0 for /insights, built from the same content as the pages, so the
   feed can never drift from the hub. Static at build time. */

export const dynamic = "force-static";

const escape = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export async function GET() {
  const [insights, { rss }] = await Promise.all([getInsights(), getPage("insights")]);
  const items = insights
    .map((insight) => {
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
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${escape(rss.title)}</title><link>${absoluteUrl(
    "/insights"
  )}</link><description>${escape(rss.description)}</description><language>${rss.language}</language>${items}</channel></rss>`;

  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
