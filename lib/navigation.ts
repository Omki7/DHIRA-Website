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
   labels are written in full, never as abbreviations (15 Oct 2026, user). */

import { AKASHIC_DOCS_URL } from "./site";

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
   /akashic layers (data, intelligence, governance), then Start (Pricing
   and Documentation). Headings are one word each, so none wraps (user).
   No captions, so the sheet reads at a glance. AI agents close the
   Intelligence list with the Preview mark (the dashed strip that drew
   them across the modules was horizontal, and the user asked for vertical
   lists only). */
export const NAV_MENUS: NavMenu[] = [
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
          { label: "Pipelines", href: "/akashic#data-pipelines" },
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
        links: [
          { label: "Pricing", href: "/pricing" },
          { label: "Documentation", href: AKASHIC_DOCS_URL, external: true },
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
          { label: "Engineering @Scale", href: "/delivery#engineering", caption: "Data and AI systems, built and run" },
          { label: "AI Solutions & Accelerators", href: "/delivery#ai-solutions", caption: "Knowledge assistants, governed workflows" },
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
     content behind it, beside the pages an evaluation needs. */
  {
    id: "resources",
    label: "Resources",
    match: ["/insights", "/customers", "/events", "/glossary", "/integrations", "/trust"],
    lead: {
      title: "Resources",
      text: "Ideas, proof and the facts a review needs.",
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
          { label: "Events", href: "/events", caption: "Launches and walkthroughs" },
          { label: "Glossary", href: "/glossary", caption: "The terms we use, defined" },
        ],
      },
      {
        heading: "Evaluate",
        span: 3,
        links: [
          { label: "Customer stories", href: "/customers", caption: "Country-scale programmes" },
          { label: "Integrations", href: "/integrations", caption: "Every system Akashic reads" },
          { label: "Trust Center", href: "/trust", caption: "Security, privacy and AI" },
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
      text: "Built on data. Proven in production.",
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
   renders nothing, and the /about landscape only reaches up behind it while
   it exists (`:has(> .nav-announce)` in about-page.css). */
export const NAV_ANNOUNCEMENT: { label: string; text: string; href: string; cta: string } | null = {
  label: "Akashic 1.0",
  text: "Generally available 1 November 2026.",
  href: "/akashic/1-0",
  cta: "See what's in it",
};

/* Opens the global ContactModal, which intercepts every #talk-to-our-team anchor. */
export const NAV_CTA = { label: "Talk to our team", href: "#talk-to-our-team" };

/* No Sign in link in this version (removed 15 Oct 2026, user): not in the
   bar, the drawer or the footer. AKASHIC_APP_URL stays in lib/site.ts for
   when it returns. */

/* ------------------------------------------------------------------ */
/*  Footer: the same IA, one source with the header (15 Oct 2026)      */
/* ------------------------------------------------------------------ */
/* Mirrors NAV_MENUS (Akashic · Solutions · Services · Resources ·
   Company), replacing the old Insights / Delivery / "EIS" columns. Every
   href resolves to a route and an id that exists. LEGAL_LINKS is the
   founder's policy row (his footer: privacy, terms, accessibility,
   copyright and hyperlinking policies, sitemap). */
export type FooterLink = { label: string; href: string; external?: boolean };

export type FooterColumn = { heading: string; links: FooterLink[]; subHeading?: string; subLinks?: FooterLink[] };

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    heading: "Akashic",
    links: [
      { label: "Platform overview", href: "/akashic" },
      { label: "Modules", href: "/akashic#modules" },
      { label: "AI agents", href: "/akashic#agents" },
      { label: "Akashic 1.0", href: "/akashic/1-0" },
      { label: "Integrations", href: "/integrations" },
      { label: "Pricing", href: "/pricing" },
      { label: "Docs", href: AKASHIC_DOCS_URL, external: true },
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
      { label: "Engineering @Scale", href: "/delivery#engineering" },
      { label: "AI Solutions & Accelerators", href: "/delivery#ai-solutions" },
      { label: "Ways to engage", href: "/delivery#engagement-models" },
      { label: "How we deliver", href: "/delivery#methodology" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Insights", href: "/insights" },
      { label: "Customer stories", href: "/customers" },
      { label: "Events", href: "/events" },
      { label: "Glossary", href: "/glossary" },
      { label: "Trust Center", href: "/trust" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About DHIRA", href: "/about" },
      { label: "Leadership", href: "/about#people" },
      { label: "Newsroom", href: "/newsroom" },
      { label: "Careers", href: "/careers" },
      { label: "Partners", href: "/partners" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export const LEGAL_LINKS: FooterLink[] = [
  { label: "Privacy policy", href: "/privacy" },
  { label: "Terms of use", href: "/terms" },
  { label: "Cookie policy", href: "/cookies" },
  { label: "Accessibility", href: "/accessibility" },
  { label: "Website policies", href: "/legal" },
  { label: "Site map", href: "/site-map" },
];

/** True when `pathname` sits inside a menu's section. */
export function isCurrentSection(menu: NavMenu, pathname: string): boolean {
  return menu.match.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
}

/** True when a link points at the page being viewed (hash links never count). */
export function isCurrentPage(href: string, pathname: string): boolean {
  return !href.includes("#") && href === pathname;
}
