/* ------------------------------------------------------------------ */
/*  Akashic 1.0 release page (added 15 Oct 2026)                       */
/* ------------------------------------------------------------------ */
/* The founder's footer links "Akashic 1.0 release" (/akashic/1-0) and his
   GA date is 1 November 2026. The nav's Akashic feature card and the
   announcement bar point here. Module names and capabilities are read from
   the /akashic module data (content/pages/akashic.ts), so this page cannot
   claim more than the product page does; agents stay in preview
   (ui/PreviewTag). The anchors are the span ids AkashicModules renders
   (#data-pipelines ... #governance). After `release.launchAt` the
   countdown reads `countdown.live`; on launch day also move the hero and
   the nav announcement (content/navigation.ts) to the present tense.
   Composer: app/akashic/1-0/page.tsx. */

import type { PageCloseBlock } from "../blocks";
import type { Link, PageSection, Seo } from "../types";
import { dataLayerModules, intelligenceLayerModules } from "./akashic";

export interface ReleaseModule {
  name: string;
  sub: string;
  caps: string[];
  href: string;
}

interface ReleaseSectionHead {
  num: string;
  label: string;
  setup: string;
  payoff: string;
  lede: string;
}

export interface AkashicReleasePage {
  seo: Seo;
  sections: PageSection[];
  sectionsLabel: string;
  release: {
    version: string;
    /** The launch moment, ISO 8601 in UTC. */
    launchAt: string;
    /** SoftwareApplication structured data: where it runs. */
    operatingSystem: string;
  };
  hero: { label: string; setup: string; payoff: string; lede: string };
  /** ui sections/release/LaunchCountdown: "12 days  04 hours  31 minutes  to launch". */
  countdown: {
    /** Server render and first paint, before the count fills in. */
    before: string;
    /** After the launch moment. */
    live: string;
    days: string;
    hours: string;
    minutes: string;
    toLaunch: string;
    /** Screen reader phrasing: "12 days, 4 hours and 31 minutes until launch". */
    and: string;
    untilLaunch: string;
  };
  available: ReleaseSectionHead & { modules: ReleaseModule[] };
  preview: ReleaseSectionHead & { agents: { name: string; line: string }[]; link: Link };
  deployments: ReleaseSectionHead & { options: { name: string; line: string }[] };
  close: PageCloseBlock;
}

/* Module id (AkashicModules) to the /akashic anchor its span carries. */
const anchors: Record<string, string> = {
  "modules-data-pipelines": "data-pipelines",
  "modules-master-data": "master-data",
  "modules-data-warehousing": "data-warehousing",
  "modules-machine-learning": "machine-learning",
  "modules-ask-ai": "ask-ai",
  "modules-business-intelligence": "business-intelligence",
};

export const akashicRelease: AkashicReleasePage = {
  seo: {
    title: "Akashic 1.0",
    description:
      "Generally available 1 November 2026. Every module on one governed foundation, with the same access control, lineage and audit under each one.",
    path: "/akashic/1-0",
  },
  sections: [
    { id: "hero", label: "Akashic 1.0" },
    { id: "generally-available", label: "Generally available" },
    { id: "in-preview", label: "In preview" },
    { id: "where-it-runs", label: "Where it runs" },
    { id: "talk-to-our-team", label: "Start" },
  ],
  sectionsLabel: "Akashic 1.0 sections",
  release: {
    version: "1.0",
    /* The founder's launch moment: 1 Nov 2026, 04:00 UTC (09:30 IST). */
    launchAt: "2026-11-01T04:00:00Z",
    operatingSystem: "Multi-tenant SaaS; private cloud on AWS, Azure or GCP; on-premise on Docker and Kubernetes",
  },
  hero: {
    label: "Akashic 1.0",
    setup: "Akashic 1.0.",
    payoff: "Generally available 1 November 2026.",
    lede: "Every module on one governed foundation, with the same access control, lineage and audit under each one.",
  },
  countdown: {
    before: "Launch on 1 November 2026",
    live: "Generally available now",
    days: "days",
    hours: "hours",
    minutes: "minutes",
    toLaunch: "to launch",
    and: "and",
    untilLaunch: "until launch",
  },
  available: {
    num: "01",
    label: "Generally available",
    setup: "Seven modules.",
    payoff: "One governed foundation.",
    lede: "Every module reads the same entities, definitions and permissions as the rest.",
    modules: [
      ...[...dataLayerModules, ...intelligenceLayerModules].map((module) => ({
        name: module.name,
        sub: module.sub,
        caps: [...module.caps],
        href: `/akashic#${anchors[module.id] ?? "modules"}`,
      })),
      {
        name: "Governance",
        sub: "Permissions, lineage and audit under every module",
        caps: ["Row and column access", "Column-level lineage", "Append-only audit log", "PII classification"],
        href: "/akashic#governance",
      },
    ],
  },
  preview: {
    num: "02",
    label: "In preview",
    setup: "Agents, with design partners.",
    payoff: "The groundwork they need, already live.",
    lede: "Agents work on the governed foundation and stop for a person's approval. The access control, lineage and audit around them ship in 1.0.",
    agents: [
      { name: "Pipeline agents", line: "Help build and monitor data pipelines." },
      { name: "Matching agents", line: "Suggest entity matches for data stewards to approve." },
    ],
    link: { label: "How the agents are designed", href: "/insights/agents-do-the-legwork" },
  },
  deployments: {
    num: "03",
    label: "Where it runs",
    setup: "Three footprints.",
    payoff: "The same platform in each.",
    lede: "The modules, governance and answers are the same in all three.",
    options: [
      { name: "Multi-tenant SaaS", line: "Operated by DHIRA on AWS, isolated at the data, storage, identity and network levels." },
      { name: "Your private cloud", line: "Deployed in your own AWS, Azure or GCP account, for data residency and control." },
      { name: "On-premise", line: "Installed in your data centre on Docker and Kubernetes." },
    ],
  },
  close: {
    label: "Start",
    setup: "Start with one use case.",
    payoff: "Grow on the same foundation.",
    body: "Bring the question that matters most, on your own data. Move up a plan as use grows, with no data migration and no metrics to redefine.",
    primary: { label: "See plans and pricing", href: "/pricing" },
    secondary: { label: "Talk to our team", href: "#talk-to-our-team" },
  },
};
