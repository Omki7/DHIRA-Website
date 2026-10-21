/* ------------------------------------------------------------------ */
/*  Site map: every public route, in one list (added 15 Oct 2026)      */
/* ------------------------------------------------------------------ */
/* The static page list and the copy around it. lib/routes.ts merges in the
   collection entries (articles, customer stories, press releases) under
   their hubs, and app/sitemap.ts, app/site-map and app/llms.txt all read
   that result, so a new page is listed everywhere or nowhere. Add a page
   here in the same change that adds its route. India versions are added
   by sitemap.ts and the site map from lib/region.ts REGIONAL_PATHS. In a
   CMS the titles and descriptions come from each page's own document. */

import type { Seo } from "./types";

export interface SiteRoute {
  path: string;
  title: string;
  /** One line, used by llms.txt and the HTML site map. */
  description: string;
  /** ISO date of the last content change, when known. */
  updated?: string;
}

export interface RouteGroup {
  heading: string;
  routes: SiteRoute[];
}

export interface SiteMapContent {
  groups: RouteGroup[];
  page: {
    seo: Seo;
    label: string;
    setup: string;
    payoff: string;
    lede: string;
    /** Follows the page count: "48 pages". */
    countSuffix: string;
    regionalHeading: string;
    /** Appended to a page title in the regional list: "Plans and pricing, India". */
    regionalSuffix: string;
  };
  /** The /llms.txt preamble (llmstxt.org). */
  llms: { note: string; offices: string; contact: string };
}

export const siteMap: SiteMapContent = {
  groups: [
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
        { path: "/delivery", title: "Services", description: "Strategic Advisory, Engineering at Scale and AI Solutions and Accelerators, from one accountable partner." },
      ],
    },
    {
      heading: "Resources",
      routes: [
        { path: "/insights", title: "Insights", description: "Perspectives from the team building Akashic." },
        { path: "/customers", title: "Customer stories", description: "Country-scale programmes where Akashic is the intelligence layer." },
        { path: "/events", title: "Events", description: "The Akashic 1.0 launch and walkthroughs on your own use case." },
        { path: "/glossary", title: "Glossary", description: "The data and AI terms used on this site, defined once." },
        { path: "/trust", title: "Trust Centre", description: "Security controls, privacy commitments, responsible AI, documents and vulnerability disclosure." },
      ],
    },
    {
      heading: "Company",
      routes: [
        { path: "/about", title: "About DHIRA", description: "A data company since 2018, offices in New York, Hyderabad and Bangalore." },
        { path: "/careers", title: "Careers", description: "Open roles and how DHIRA hires." },
        { path: "/newsroom", title: "Newsroom", description: "Announcements, recognition and the media kit." },
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
  ],
    page: {
      seo: { title: "Site map", description: "Every page on the DHIRA website, grouped the way the navigation is.", path: "/site-map" },
      label: "Site map",
      setup: "Site map.",
      payoff: "Every page, in one place.",
      lede: "Grouped the way the navigation is. Articles, stories and press releases sit under their hubs.",
      countSuffix: "pages",
      regionalHeading: "India",
      regionalSuffix: ", India",
    },
    llms: {
      note: "DHIRA is the company; Akashic is its platform. Keep the two distinct. Akashic 1.0 is generally available on 1 November 2026. AI agents are in preview: they gather evidence and explain, and a person approves every consequential step. Customer programmes are described by sector and are not named.",
      offices: "Offices",
      contact: "Contact",
    },
  };
