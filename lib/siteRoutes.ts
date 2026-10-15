import { INSIGHTS_BY_DATE } from "./insights";
import { STORIES } from "./customerStories";
import { PRESS_RELEASES } from "./newsroom";

/* ------------------------------------------------------------------ */
/*  Every public route, in one list (added 15 Oct 2026)                */
/* ------------------------------------------------------------------ */
/* Read by app/sitemap.ts (sitemap.xml), app/site-map (the HTML site map,
   GIGW 3.0) and app/llms.txt, so a new page is listed everywhere or
   nowhere. Add a page here in the same change that adds its route.
   India versions are not listed here: sitemap.ts adds them from
   lib/region.ts REGIONAL_PAGES, so they follow the region work. */

export type SiteRoute = {
  path: string;
  title: string;
  /** One line, used by llms.txt and the HTML site map. */
  description: string;
  /** ISO date of the last content change, when known. */
  updated?: string;
};

export type RouteGroup = { heading: string; routes: SiteRoute[] };

const insights: SiteRoute[] = INSIGHTS_BY_DATE.map((insight) => ({
  path: `/insights/${insight.slug}`,
  title: insight.title,
  description: insight.dek,
  updated: insight.date,
}));

const stories: SiteRoute[] = STORIES.map((story) => ({
  path: `/customers/${story.id}`,
  title: story.title,
  description: story.description,
}));

const releases: SiteRoute[] = PRESS_RELEASES.map((release) => ({
  path: `/newsroom/${release.slug}`,
  title: release.title,
  description: release.dek,
  updated: release.date,
}));

export const ROUTE_GROUPS: RouteGroup[] = [
  {
    heading: "Akashic",
    routes: [
      { path: "/", title: "Home", description: "DHIRA and Akashic, the governed data and AI platform: the intelligence layer behind every decision." },
      { path: "/akashic", title: "Akashic", description: "The governed data and AI platform: seven modules on one foundation, from pipelines to AI answers with citations." },
      { path: "/akashic/1-0", title: "Akashic 1.0", description: "What is generally available on 1 November 2026, what stays in preview, and where it runs." },
      { path: "/integrations", title: "Integrations", description: "The business applications, databases, cloud data platforms, documents and AI models Akashic connects to." },
      { path: "/pricing", title: "Plans and pricing", description: "Four plans with every data module in each, sized by capacity: limits per plan, terms, deployment, services and how to buy." },
    ],
  },
  {
    heading: "Solutions",
    routes: [
      { path: "/solutions", title: "Solutions", description: "Business problems solved on Akashic, by solution, industry and function." },
      { path: "/solutions/eis", title: "Enterprise Intelligence", description: "Agentic FP&A and MIS on the ERP as the system of record." },
      { path: "/solutions/life", title: "Akashic Life", description: "Frontline maternal care, built on Akashic." },
      { path: "/sectors/public-sector", title: "Public sector", description: "Governed data and AI for government programmes at national scale." },
      { path: "/sectors/finance", title: "BFSI", description: "Akashic for banking, financial services and insurance." },
      { path: "/sectors/healthcare", title: "Healthcare", description: "Akashic for healthcare providers and programmes." },
      { path: "/sectors/retail", title: "Retail and CPG", description: "Akashic for retail and consumer goods." },
      { path: "/sectors/manufacturing", title: "Manufacturing", description: "Akashic for manufacturing and specialty chemicals." },
      { path: "/sectors/education", title: "Education", description: "Akashic for education systems and institutions." },
      { path: "/sectors/energy", title: "Energy and utilities", description: "Akashic for energy and utilities." },
    ],
  },
  {
    heading: "Services",
    routes: [
      { path: "/delivery", title: "Services", description: "Strategic Advisory, Engineering @Scale and AI Solutions & Accelerators, from one accountable partner." },
    ],
  },
  {
    heading: "Resources",
    routes: [
      { path: "/insights", title: "Insights", description: "Perspectives from the team building Akashic." },
      ...insights,
      { path: "/customers", title: "Customer stories", description: "Country-scale programmes where Akashic is the intelligence layer." },
      ...stories,
      { path: "/events", title: "Events", description: "The Akashic 1.0 launch and walkthroughs on your own use case." },
      { path: "/glossary", title: "Glossary", description: "The data and AI terms used on this site, defined once." },
      { path: "/trust", title: "Trust Center", description: "Security controls, privacy commitments, responsible AI, documents and vulnerability disclosure." },
    ],
  },
  {
    heading: "Company",
    routes: [
      { path: "/about", title: "About DHIRA", description: "A data company since 2018, offices in New York, Hyderabad and Bangalore." },
      { path: "/careers", title: "Careers", description: "Open roles and how DHIRA hires." },
      { path: "/newsroom", title: "Newsroom", description: "Announcements, recognition and the media kit." },
      ...releases,
      { path: "/partners", title: "Partners", description: "Delivery, technology, white label and reseller partnerships." },
      { path: "/contact", title: "Contact", description: "Sales, partnerships, press, security, support and offices." },
    ],
  },
  {
    heading: "Legal",
    routes: [
      { path: "/privacy", title: "Privacy policy", description: "What personal data the website collects, why, and your rights." },
      { path: "/terms", title: "Terms of use", description: "The terms on which you may use this website." },
      { path: "/cookies", title: "Cookie policy", description: "What the website stores in your browser and how to control it." },
      { path: "/accessibility", title: "Accessibility statement", description: "WCAG 2.2 AA and GIGW 3.0: what we do and how to report a barrier." },
      { path: "/legal", title: "Website policies", description: "Copyright, hyperlinking, trademarks and disclaimer." },
      { path: "/site-map", title: "Site map", description: "Every page on this site." },
    ],
  },
];

export const ALL_ROUTES: SiteRoute[] = ROUTE_GROUPS.flatMap((group) => group.routes);
