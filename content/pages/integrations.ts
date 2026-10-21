/* ------------------------------------------------------------------ */
/*  Integrations hub (added 15 Oct 2026)                               */
/* ------------------------------------------------------------------ */
/* Every word on /integrations around the connector directory. The
   connectors are the integrations collection
   (content/collections/integrations.ts). The 80+ and 61 figures are the
   founder's, already printed on /akashic [10]. Composer:
   app/integrations/page.tsx. */

import type { PageCloseBlock } from "../blocks";
import type { Link, PageSection, Seo } from "../types";

export interface IntegrationsPage {
  seo: Seo;
  sections: PageSection[];
  sectionsLabel: string;
  hero: { label: string; setup: string; payoff: string; lede: string; facts: string[] };
  directory: {
    num: string;
    label: string;
    setup: string;
    payoff: string;
    lede: string;
    /** Accessible label and placeholder of the filter field. */
    filterLabel: string;
    filterPlaceholder: string;
    /** "Showing 12 of 31": the counts are computed. */
    showing: string;
    of: string;
    /** Shown when the filter matches nothing; the link closes the sentence. */
    empty: { text: string; link: Link };
  };
  howItConnects: { num: string; label: string; setup: string; payoff: string; steps: { title: string; text: string }[] };
  close: PageCloseBlock;
}

export const integrationsPage: IntegrationsPage = {
  seo: {
    title: "Integrations",
    description:
      "Connect what you run. Replace nothing. Akashic reads from the systems you already run and leaves them in place: business applications, databases, cloud data platforms, streams, documents and the AI models you choose.",
    path: "/integrations",
  },
  sections: [
    { id: "hero", label: "Integrations" },
    { id: "directory", label: "Directory" },
    { id: "how-it-connects", label: "How it connects" },
    { id: "talk-to-our-team", label: "Talk to our team" },
  ],
  sectionsLabel: "Integrations sections",
  hero: {
    label: "Integrations",
    setup: "Integrations.",
    payoff: "Connect what you run. Replace nothing.",
    lede: "Akashic reads from the systems you already run and leaves them in place: business applications, databases, cloud data platforms, streams, documents and the AI models you choose.",
    facts: ["80+ metadata connectors", "61 BI data sources", "Streaming, batch and CDC"],
  },
  directory: {
    num: "01",
    label: "Directory",
    setup: "Seven kinds of system.",
    payoff: "One governed foundation.",
    lede: "Every connector below is part of Akashic today. Systems not listed connect through REST, webhooks or files.",
    filterLabel: "Find a connector",
    filterPlaceholder: "Find a connector, for example SAP or Kafka",
    showing: "Showing",
    of: "of",
    empty: {
      text: "No listed connector matches. Most systems connect through REST, webhooks or files.",
      link: { label: "Ask about yours", href: "#talk-to-our-team" },
    },
  },
  howItConnects: {
    num: "02",
    label: "How it connects",
    setup: "Read-only by default.",
    payoff: "Your systems stay in place.",
    steps: [
      { title: "Connect", text: "Point a connector at the system, with credentials scoped to read. The source stays as it is." },
      { title: "Validate", text: "Schemas are checked on arrival. Records that fail are quarantined, retried and backfilled." },
      { title: "Resolve", text: "Entities from every source resolve to one record, with the lineage of every merge." },
      { title: "Serve", text: "Dashboards, models and AI answers read the governed result. Nothing is copied back." },
    ],
  },
  close: {
    label: "Talk to our team",
    setup: "Running a system we did not list?",
    payoff: "Tell us which one.",
    body: "Most systems connect through REST, webhooks or files on day one. A solutions architect will confirm the route for yours.",
    primary: { label: "Talk to our team", href: "#talk-to-our-team" },
    secondary: { label: "See the module reference", href: "/akashic#stack" },
  },
};
