/* ------------------------------------------------------------------ */
/*  Site navigation: one source of truth                               */
/* ------------------------------------------------------------------ */
/* Read by the desktop sheet and the mobile drawer (components/layout/nav).
   The IA follows the founder's wireframe (DHIRA_ai_Website_v2, 12 Oct 2026):
   Platform · Solutions · Services · Resources · About. The first menu is
   labelled Platform and leads with Akashic (15 Oct 2026, user); Pricing
   lives inside it, not at the top level. Agents sit inside it with the
   Preview mark and never at the top level (DESIGN_SYSTEM claims rule:
   agents ship in preview). Insights left on 14 Oct 2026 for lack of content
   and returned under Resources on 15 Oct 2026 with articles behind it. There
   is no "Home" item: the logo is home (14 Oct 2026).

   Every href must resolve: a route that exists, or an id that exists on the
   target page. The /akashic module anchors are the span ids AkashicModules
   renders from `dataLayerModules` / `intelligenceLayerModules`.
   Captions are terse noun phrases, one line each, no em dashes. Solutions
   labels are written in full, never as abbreviations (15 Oct 2026, user).

   In a CMS this is a singleton "Navigation" document. `span` and `drawing`
   are presentation hints the editor picks from a fixed list. Matching and
   current-page logic lives in lib/navigation.ts. */

import { mailto, site } from "./site";
import type { Link } from "./types";

export type NavLink = {
  label: string;
  href: string;
  /** One terse line under the label. Omit for plain lists. */
  caption?: string;
  /** Ships in preview: carries the dashed PreviewTag. */
  preview?: boolean;
  /** Leaves the site (the app, the docs): drawn with a north-east arrow. */
  external?: boolean;
};

/** A block's relative width in the desktop sheet (one `fr` track each).
    Every menu's spans sum to 12, so the same span reads as the same width
    from menu to menu. */
export type NavSpan = number;

export type NavGroup = {
  heading: string;
  links: NavLink[];
  span: NavSpan;
  /** Lay the links out in two columns inside the group. */
  twoColumn?: boolean;
  /** Stands apart from the lists before it: a hairline to its left on the
      desktop sheet. For a list of ways in (Pricing) that follows lists of
      what a product contains. */
  divided?: boolean;
};

/** Which hairline drawing the featured card carries (nav/NavFeatured.tsx). */
export type NavDrawing = "release" | "foundation" | "method" | "library" | "seat";

export type NavFeature = {
  eyebrow: string;
  /** A line break ("\n") splits a two-sentence title at the sentence. */
  title: string;
  caption: string;
  href: string;
  cta: string;
  drawing: NavDrawing;
  span: NavSpan;
};

export type NavLead = {
  title: string;
  text: string;
  href: string;
  cta: string;
  span: NavSpan;
};

export type NavMenu = {
  id: string;
  label: string;
  /** Path prefixes that make this the current section. */
  match: string[];
  lead: NavLead;
  groups: NavGroup[];
  feature: NavFeature;
};

/* The Platform menu (redrawn again 15 Oct 2026, user): the same grammar as
   every other menu, lead, vertical lists, the featured card on the right.
   Four lists: the seven modules in the three categories that match the
   /akashic layers (data, intelligence, governance), then Start (Pricing;
   Documentation left on 21 Oct 2026, its host does not resolve yet). Headings are one word each, so none wraps (user).
   The module lists carry no captions, so they read at a glance. Start is
   a different kind of list, the ways in rather than what is inside, so it
   sits behind a hairline and only its link carries a caption: the one
   list with a second line of text is the one the eye finds first (16 Oct
   2026, user: nobody should get lost looking for pricing or docs). AI
   agents close the Intelligence list with the Preview mark (the dashed strip that drew
   them across the modules was horizontal, and the user asked for vertical
   lists only). */
const menus: NavMenu[] = [
  {
    id: "platform",
    label: "Platform",
    match: ["/akashic", "/pricing"],
    lead: {
      title: "Akashic",
      text: "The governed data and AI platform.",
      href: "/akashic",
      cta: "Platform overview",
      span: 2,
    },
    groups: [
      {
        heading: "Foundation",
        span: 1.75,
        links: [
          { label: "Data Pipelines", href: "/akashic#data-pipelines" },
          { label: "Master Data", href: "/akashic#master-data" },
          { label: "Warehouse", href: "/akashic#data-warehousing" },
        ],
      },
      {
        heading: "Intelligence",
        span: 1.75,
        links: [
          { label: "Business Intelligence", href: "/akashic#business-intelligence" },
          { label: "Ask Akashic", href: "/akashic#ask-ai" },
          { label: "Machine Learning", href: "/akashic#machine-learning" },
          { label: "AI agents", href: "/akashic#agents", preview: true },
        ],
      },
      {
        heading: "Trust",
        span: 1.75,
        links: [
          { label: "Governance", href: "/akashic#governance" },
          { label: "Security and privacy", href: "/akashic#trust" },
          { label: "Open foundations", href: "/akashic#open" },
        ],
      },
      {
        heading: "Start",
        span: 1.75,
        divided: true,
        links: [
          { label: "Pricing", href: "/pricing", caption: "Plans by capacity" },
        ],
      },
    ],
    feature: {
      eyebrow: "Akashic 1.0",
      title: "Generally available 1 November 2026.",
      caption: "Every module on one governed foundation.",
      href: "/akashic/1-0",
      cta: "See what's in 1.0",
      drawing: "release",
      span: 3,
    },
  },
  {
    id: "solutions",
    label: "Solutions",
    match: ["/solutions", "/sectors"],
    lead: {
      title: "Solutions",
      text: "Business problems, solved on one governed foundation.",
      href: "/solutions",
      cta: "All solutions",
      span: 2,
    },
    groups: [
      {
        heading: "Built on Akashic",
        span: 2.75,
        links: [
          { label: "Enterprise Intelligence", href: "/solutions/eis", caption: "Agentic financial planning and reporting" },
          { label: "Intelligent Procurement Management System", href: "/solutions#ipms", caption: "Indent to secured contract" },
          { label: "Akashic Life", href: "/solutions/life", caption: "Frontline maternal care" },
        ],
      },
      {
        heading: "By industry",
        span: 2.25,
        links: [
          { label: "Banking, financial services and insurance", href: "/sectors/finance" },
          { label: "Healthcare", href: "/sectors/healthcare" },
          { label: "Retail and consumer goods", href: "/sectors/retail" },
          { label: "Manufacturing", href: "/sectors/manufacturing" },
          { label: "Public sector", href: "/sectors/public-sector" },
          { label: "Education", href: "/sectors/education" },
          { label: "Energy and utilities", href: "/sectors/energy" },
        ],
      },
      {
        heading: "By function",
        span: 2,
        links: [
          { label: "Finance, planning and analysis", href: "/solutions#function-finance" },
          { label: "Procurement", href: "/solutions#function-procurement" },
          { label: "Supply chain", href: "/solutions#function-supply-chain" },
          { label: "Operations", href: "/solutions#function-operations" },
          { label: "Sales and marketing", href: "/solutions#function-sales-marketing" },
          { label: "Human resources and corporate", href: "/solutions#function-hr" },
          { label: "Customer service", href: "/solutions#function-customer-service" },
        ],
      },
    ],
    feature: {
      eyebrow: "Built on Akashic",
      title: "Not separate products.\nAkashic, configured.",
      caption: "Each solution switches on the modules its process needs.",
      href: "/akashic#solutions",
      cta: "See how they are built",
      drawing: "foundation",
      span: 3,
    },
  },
  {
    id: "services",
    label: "Services",
    match: ["/delivery"],
    lead: {
      title: "Services",
      text: "Advise. Engineer. Deploy. One partner, accountable for outcomes.",
      href: "/delivery",
      cta: "How we work with you",
      span: 3,
    },
    groups: [
      {
        heading: "What we do",
        span: 3,
        links: [
          { label: "Strategic Advisory", href: "/delivery#advisory", caption: "Readiness, use cases and a roadmap" },
          { label: "Engineering at Scale", href: "/delivery#engineering", caption: "Data and AI systems, built and run" },
          { label: "AI Solutions and Accelerators", href: "/delivery#ai-solutions", caption: "Knowledge assistants, governed workflows" },
        ],
      },
      {
        heading: "Ways to engage",
        span: 3,
        links: [
          { label: "Akashic SaaS", href: "/delivery#model-saas" },
          { label: "White Label", href: "/delivery#model-whitelabel" },
          { label: "Custom Tech & AI", href: "/delivery#model-customai" },
          { label: "Product Engineering", href: "/delivery#model-engineering" },
          { label: "Staff Augmentation", href: "/delivery#model-augmentation" },
        ],
      },
    ],
    feature: {
      eyebrow: "How we deliver",
      title: "Understand. Align. Build. Evolve.",
      caption: "Four stages, one accountable team.",
      href: "/delivery#methodology",
      cta: "See the method",
      drawing: "method",
      span: 3,
    },
  },
  /* Resources (added 15 Oct 2026): the founder's Insights returns with
     content behind it, beside the proof an evaluation needs. Events,
     Integrations and Trust Centre left the site on 21 Oct 2026 (user). */
  {
    id: "resources",
    label: "Resources",
    match: ["/insights", "/customers", "/glossary"],
    lead: {
      title: "Resources",
      text: "Ideas, proof and the terms we use.",
      href: "/insights",
      cta: "Read Insights",
      span: 3,
    },
    groups: [
      {
        heading: "Learn",
        span: 3,
        links: [
          { label: "Insights", href: "/insights", caption: "Perspectives on data and AI" },
          { label: "Glossary", href: "/glossary", caption: "The terms we use, defined" },
        ],
      },
      {
        heading: "Evaluate",
        span: 3,
        links: [
          { label: "Customer stories", href: "/customers", caption: "Country-scale programmes" },
        ],
      },
    ],
    feature: {
      eyebrow: "Insights",
      title: "Agents do the legwork.\nPeople make the call.",
      caption: "How Akashic's agents are designed.",
      href: "/insights/agents-do-the-legwork",
      cta: "Read the article",
      drawing: "library",
      span: 3,
    },
  },
  {
    id: "about",
    label: "About",
    match: ["/about", "/careers", "/newsroom", "/partners", "/contact"],
    lead: {
      title: "About",
      text: "Data you can trust. Decisions you can stand behind.",
      href: "/about",
      cta: "About DHIRA",
      span: 3,
    },
    groups: [
      {
        heading: "Who we are",
        span: 3,
        links: [
          { label: "Leadership", href: "/about#people", caption: "Founder and leadership team" },
          { label: "Impact", href: "/#scale", caption: "Proven at national scale" },
          { label: "Newsroom", href: "/newsroom", caption: "News, recognition, media kit" },
        ],
      },
      {
        heading: "Work with us",
        span: 3,
        links: [
          { label: "Careers", href: "/careers", caption: "Open roles and how we hire" },
          { label: "Partners", href: "/partners", caption: "Build, deliver and sell on Akashic" },
          { label: "Contact", href: "/contact", caption: "New York, Hyderabad, Bangalore" },
        ],
      },
    ],
    feature: {
      eyebrow: "Now hiring",
      title: "Find your seat.",
      caption: "See where you fit on the team.",
      href: "/careers",
      cta: "See open roles",
      drawing: "seat",
      span: 3,
    },
  },
];

/* The founder's launch bar. Set to null to remove it everywhere: the bar
   renders nothing. */
export type NavAnnouncement = { label: string; text: string; href: string; cta: string };

const announcement: NavAnnouncement | null = {
  label: "Akashic 1.0",
  text: "Generally available 1 November 2026.",
  href: "/akashic/1-0",
  cta: "See what's in it",
};

/* Opens the global ContactModal, which intercepts every #talk-to-our-team anchor. */
const cta: Link = { label: "Talk to our team", href: "#talk-to-our-team" };

/* No Sign in link in this version (removed 15 Oct 2026, user): not in the
   bar, the drawer or the footer. site.appUrl (content/site.ts) stays for
   when it returns. */

/* ------------------------------------------------------------------ */
/*  Footer: the same IA, one source with the header (15 Oct 2026)      */
/* ------------------------------------------------------------------ */
/* Mirrors the header menus (Akashic · Solutions · Services · Resources ·
   Company). The legal row is the founder's policy row (his footer:
   privacy, terms, accessibility, copyright and hyperlinking policies,
   sitemap).

   Audited 21 Oct 2026 (user: keep only what is used, made and worth its
   upkeep) against Linear, Scale, C3 AI, Anthropic, Palantir, Stripe and
   Vercel, whose footers run 32 to 45 links with no newsletter field and
   no "last updated" line. A footer link must be:
   - a page, not an in-page anchor to a page already listed (Modules,
     Leadership, Ways to engage and How we deliver went);
   - live: no placeholder hosts (Documentation went, docs.dhira.ai does
     not resolve yet);
   - shipped: nothing in preview, which the footer cannot mark (AI agents
     went; they keep the Preview mark in the Platform menu);
   - not dated: nothing that goes stale on its own (Events went, its one
     dated event was the 1 November launch).
   The same day the user removed Documentation, Events, Integrations and
   Trust Centre from the whole site. */
export type FooterLink = { label: string; href: string; external?: boolean };

export type FooterColumn = { heading: string; links: FooterLink[]; subHeading?: string; subLinks?: FooterLink[] };

const footerColumns: FooterColumn[] = [
  {
    heading: "Akashic",
    links: [
      { label: "Platform overview", href: "/akashic" },
      { label: "Akashic 1.0", href: "/akashic/1-0" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    heading: "Solutions",
    links: [
      { label: "Enterprise Intelligence", href: "/solutions/eis" },
      { label: "Intelligent Procurement Management System", href: "/solutions#ipms" },
      { label: "Akashic Life", href: "/solutions/life" },
      { label: "All solutions", href: "/solutions" },
    ],
    subHeading: "Industries",
    subLinks: [
      { label: "Public sector", href: "/sectors/public-sector" },
      { label: "Banking, financial services and insurance", href: "/sectors/finance" },
      { label: "Healthcare", href: "/sectors/healthcare" },
      { label: "Retail and consumer goods", href: "/sectors/retail" },
      { label: "Manufacturing", href: "/sectors/manufacturing" },
      { label: "Education", href: "/sectors/education" },
      { label: "Energy and utilities", href: "/sectors/energy" },
    ],
  },
  {
    heading: "Services",
    links: [
      { label: "Strategic Advisory", href: "/delivery#advisory" },
      { label: "Engineering at Scale", href: "/delivery#engineering" },
      { label: "AI Solutions and Accelerators", href: "/delivery#ai-solutions" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Insights", href: "/insights" },
      { label: "Customer stories", href: "/customers" },
      { label: "Glossary", href: "/glossary" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About DHIRA", href: "/about" },
      { label: "Newsroom", href: "/newsroom" },
      { label: "Careers", href: "/careers" },
      { label: "Partners", href: "/partners" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

const legalLinks: FooterLink[] = [
  { label: "Privacy policy", href: "/privacy" },
  { label: "Terms of use", href: "/terms" },
  { label: "Cookie policy", href: "/cookies" },
  { label: "Accessibility", href: "/accessibility" },
  { label: "Website policies", href: "/legal" },
  { label: "Site map", href: "/site-map" },
];

export interface Navigation {
  menus: NavMenu[];
  /** Set to null to remove the launch bar everywhere. */
  announcement: NavAnnouncement | null;
  cta: Link;
  /** `contact` is the brand column's inbox link (label: the address). */
  footer: { columns: FooterColumn[]; legal: FooterLink[]; contact: Link };
}

export const navigation: Navigation = {
  menus,
  announcement,
  cta,
  footer: { columns: footerColumns, legal: legalLinks, contact: { label: site.email, href: mailto("General enquiry") } },
};
