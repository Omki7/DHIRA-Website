import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

/* robots.txt (added 15 Oct 2026). Everything public is crawlable, /api/ is
   not. AI crawlers are named explicitly so the policy is stated rather than
   implied: answer and search bots are allowed, so AI assistants can cite
   the site. The training crawlers (GPTBot, Google-Extended, CCBot,
   anthropic-ai) are allowed too; move them to `disallow: "/"` if the
   founder decides site content should not be used for model training. */

const AI_CRAWLERS = [
  "OAI-SearchBot",
  "ChatGPT-User",
  "GPTBot",
  "Claude-SearchBot",
  "Claude-User",
  "ClaudeBot",
  "anthropic-ai",
  "PerplexityBot",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: "/api/" },
      { userAgent: AI_CRAWLERS, allow: "/", disallow: "/api/" },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: absoluteUrl("/"),
  };
}
