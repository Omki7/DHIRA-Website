import type { PageCloseBlock } from "../blocks";
import type { PageSection, Seo } from "../types";

export interface InsightsPage {
  seo: Seo;
  sections: PageSection[];
  hero: { label: string; setup: string; payoff: string; lede: string; featuredLabel: string; featuredSlug: string; readArticle: string };
  latest: {
    label: string; setup: string; payoff: string; lede: string;
    allLabel: string; searchLabel: string; searchPlaceholder: string; clearSearch: string;
    topicsLabel: string; resultsLabel: string; resultSingular: string; resultPlural: string;
    emptyTitle: string; emptyBody: string; resetLabel: string; readArticle: string;
  };
  subscribe: { label: string; setup: string; payoff: string; lede: string; rss: { link: string; href: string }; note: string };
  close: PageCloseBlock;
  rss: { title: string; description: string; language: string };
  article: {
    crumb: string; takeawayLabel: string; sourcesLabel: string; sourcesNote: string;
    agentLabel: string; relatedLabel: string; relatedSetup: string; relatedPayoff: string;
    backLabel: string; close: PageCloseBlock;
  };
}

export const insightsPage: InsightsPage = {
  seo: {
    title: "Insights",
    description: "Practical perspectives for leaders making decisions about data, AI and business. Original articles on investment, governance, delivery and the foundations behind useful AI.",
    path: "/insights",
  },
  sections: [
    { id: "hero", label: "Featured perspective" },
    { id: "latest", label: "Explore the library" },
    { id: "subscribe", label: "Follow Insights" },
    { id: "talk-to-our-team", label: "Talk to our team" },
  ],
  hero: {
    label: "Insights",
    setup: "See the decision",
    payoff: "behind the technology.",
    lede: "Perspectives for leaders turning data and AI into useful work. The costs, choices and operating realities behind the promise.",
    featuredLabel: "Featured perspective",
    featuredSlug: "why-ai-pilots-stall",
    readArticle: "Read the perspective",
  },
  latest: {
    label: "The library",
    setup: "Make your next decision",
    payoff: "with a clearer view.",
    lede: "Explore the questions behind AI investment, trusted data and accountable delivery. Each article connects evidence with a practical business decision.",
    allLabel: "All perspectives",
    searchLabel: "Search insights",
    searchPlaceholder: "Search a question or topic",
    clearSearch: "Clear search",
    topicsLabel: "Filter insights by topic",
    resultsLabel: "Matching insights",
    resultSingular: "perspective",
    resultPlural: "perspectives",
    emptyTitle: "No perspectives match this search.",
    emptyBody: "Try a broader term or choose another topic.",
    resetLabel: "Reset filters",
    readArticle: "Read the article",
  },
  subscribe: {
    label: "Keep a clear view",
    setup: "Good questions deserve",
    payoff: "a place in your reading list.",
    lede: "Follow new perspectives on the business of data and AI. Read every article in full, without an account.",
    rss: { link: "Follow the article feed", href: "/insights/rss.xml" },
    note: "An open feed for your preferred reader.",
  },
  close: {
    label: "From perspective to practice",
    setup: "Bring a question",
    payoff: "from your business.",
    body: "Discuss the data, decisions and delivery work behind your next AI initiative with the DHIRA team.",
    primary: { label: "Talk to our team", href: "#talk-to-our-team" },
    secondary: { label: "Explore Akashic", href: "/akashic" },
  },
  rss: { title: "DHIRA Insights", description: "Original perspectives on data, AI and the decisions behind useful technology.", language: "en-gb" },
  article: {
    crumb: "Insights",
    takeawayLabel: "The decision in brief",
    sourcesLabel: "Sources and further reading",
    sourcesNote: "Research is linked where used. Recommendations express DHIRA’s perspective; illustrative situations are not customer case studies.",
    agentLabel: "AI agent capabilities",
    relatedLabel: "Continue reading",
    relatedSetup: "Follow the question",
    relatedPayoff: "a little further.",
    backLabel: "All insights",
    close: {
      label: "Put the perspective to work",
      setup: "Start with the question",
      payoff: "your business needs answered.",
      body: "Explore the data foundation, platform choices and delivery responsibilities with the DHIRA team.",
      primary: { label: "Talk to our team", href: "#talk-to-our-team" },
      secondary: { label: "Explore our services", href: "/delivery" },
    },
  },
};
