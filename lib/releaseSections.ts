import type { PageSection } from "./pageSection";
import { dataLayerModules, intelligenceLayerModules } from "./akashicSections";

/* ------------------------------------------------------------------ */
/*  /akashic/1-0, the release page (added 15 Oct 2026)                 */
/* ------------------------------------------------------------------ */
/* The founder's footer links "Akashic 1.0 release" (/akashic/1-0) and his
   GA date is 1 November 2026. The nav's Akashic feature card and the
   announcement bar point here. Module names and capabilities are read from
   the /akashic module data, so this page cannot claim more than the
   product page does; agents stay in preview (PreviewTag). The anchors are
   the span ids AkashicModules renders (#data-pipelines ... #governance).
   Launch day: flip RELEASE.live to true so the copy moves to present
   tense, and update NAV_ANNOUNCEMENT and the nav feature card with it. */

export const RELEASE = {
  version: "1.0",
  /** The founder's launch moment: 1 Nov 2026, 04:00 UTC (09:30 IST). */
  launchAt: "2026-11-01T04:00:00Z",
  live: false,
};

export const RELEASE_SECTIONS: PageSection[] = [
  { id: "hero", label: "Akashic 1.0" },
  { id: "generally-available", label: "Generally available" },
  { id: "in-preview", label: "In preview" },
  { id: "where-it-runs", label: "Where it runs" },
  { id: "talk-to-our-team", label: "Start" },
];

export const RELEASE_HERO = {
  label: "Akashic 1.0",
  setup: "Akashic 1.0.",
  payoff: "Generally available 1 November 2026.",
  lede: "Every module on one governed foundation, with the same access control, lineage and audit under each one.",
};

const ANCHORS: Record<string, string> = {
  "modules-data-pipelines": "data-pipelines",
  "modules-master-data": "master-data",
  "modules-data-warehousing": "data-warehousing",
  "modules-machine-learning": "machine-learning",
  "modules-ask-ai": "ask-ai",
  "modules-business-intelligence": "business-intelligence",
};

export type ReleaseModule = { name: string; sub: string; caps: string[]; href: string };

export const RELEASE_MODULES: ReleaseModule[] = [
  ...[...dataLayerModules, ...intelligenceLayerModules].map((module) => ({
    name: module.name,
    sub: module.sub,
    caps: [...module.caps],
    href: `/akashic#${ANCHORS[module.id] ?? "modules"}`,
  })),
  {
    name: "Akashic Governance",
    sub: "Permissions, lineage and audit under every module",
    caps: ["Row and column access", "Column-level lineage", "Append-only audit log", "PII classification"],
    href: "/akashic#governance",
  },
];

export const RELEASE_PREVIEW = [
  { name: "Pipeline agents", line: "Help build and monitor pipelines." },
  { name: "Matching agents", line: "Suggest entity matches for data stewards to approve." },
];

export const RELEASE_DEPLOYMENTS = [
  { name: "Multi-tenant SaaS", line: "Operated by DHIRA on AWS, isolated at the data, storage, identity and network levels." },
  { name: "Your private cloud", line: "Deployed in your own AWS, Azure or GCP account, for data residency and control." },
  { name: "On-premise", line: "Installed in your data centre on Docker and Kubernetes." },
];
