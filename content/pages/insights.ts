/* ------------------------------------------------------------------ */
/*  Insights hub and article template                                  */
/* ------------------------------------------------------------------ */
/* The /insights hub, the strings every article page shares, and the RSS
   channel. The articles themselves are the insights collection
   (content/collections/insights.ts). Composers: app/insights/page.tsx,
   app/insights/[slug]/page.tsx, app/insights/rss.xml/route.ts. */

import type { PageCloseBlock } from "../blocks";
import type { Seo } from "../types";

export interface InsightsPage {
  seo: Seo;
  hero: {
    label: string;
    setup: string;
    payoff: string;
    lede: string;
    /** "6 articles · Perspectives · Product · Public sector": the count is computed. */
    metaSuffix: string;
    metaTopics: string;
  };
  latest: { readArticle: string; allLabel: string };
  subscribe: {
    label: string;
    setup: string;
    payoff: string;
    lede: string;
    rss: { lead: string; link: string; href: string };
  };
  close: PageCloseBlock;
  rss: { title: string; description: string; language: string };
  article: {
    /** The hub's name in breadcrumbs and BreadcrumbList JSON-LD. */
    crumb: string;
    close: PageCloseBlock;
  };
}

export const insightsPage: InsightsPage = {
  seo: {
    title: "Insights",
    description:
      "How governed data becomes decisions. Perspectives from the team building Akashic and delivering it at national scale: data made ready for AI, agents people can trust, and what it takes to run both.",
    path: "/insights",
  },
  hero: {
    label: "Insights",
    setup: "Insights.",
    payoff: "How governed data becomes decisions.",
    lede: "Perspectives from the team building Akashic and delivering it at national scale: data made ready for AI, agents people can trust, and what it takes to run both.",
    metaSuffix: "articles",
    metaTopics: "Perspectives · Product · Public sector",
  },
  latest: { readArticle: "Read the article", allLabel: "All insights" },
  subscribe: {
    label: "Subscribe",
    setup: "New insights, by email.",
    payoff: "One note when something ships.",
    lede: "Articles, product releases and event invitations. No more than one email a month.",
    rss: { lead: "Or follow the", link: "RSS feed", href: "/insights/rss.xml" },
  },
  close: {
    label: "Talk to our team",
    setup: "Have a question an article raised?",
    payoff: "Ask the people who wrote it.",
    body: "Our product, advisory and public sector teams answer every enquiry directly.",
    primary: { label: "Talk to our team", href: "#talk-to-our-team" },
    secondary: { label: "Explore Akashic", href: "/akashic" },
  },
  rss: { title: "DHIRA Insights", description: "Perspectives from the team building Akashic.", language: "en-gb" },
  article: {
    crumb: "Insights",
    close: {
      label: "Talk to our team",
      setup: "See it on your own data.",
      payoff: "Start with one use case.",
      body: "A solutions architect walks through Akashic with the question you most need answered.",
      primary: { label: "Talk to our team", href: "#talk-to-our-team" },
      secondary: { label: "See pricing", href: "/pricing" },
    },
  },
};
