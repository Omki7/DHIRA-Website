/* ------------------------------------------------------------------ */
/*  Site navigation: one source of truth                               */
/* ------------------------------------------------------------------ */
/* Read by the desktop sheet and the mobile drawer (components/layout/nav).
   The IA follows the founder's wireframe (DHIRA_ai_Website_v2, 12 Oct 2026):
   Akashic · Solutions · Services · Company. Agents sit inside Akashic with
   the Preview mark and never at the top level (DESIGN_SYSTEM claims rule:
   agents ship in preview). Insights was removed, and so was a "Home" item:
   the logo is home (14 Oct 2026).

   Every href must resolve: a route that exists, or an id that exists on the
   target page. The /akashic module anchors are the span ids AkashicModules
   renders from `dataLayerModules` / `intelligenceLayerModules`.
   Captions are terse noun phrases, one line each, no em dashes. */

export type NavLink = {
  label: string;
  href: string;
  /** One terse line under the label. Omit for plain lists. */
  caption?: string;
  /** Ships in preview: carries the dashed PreviewTag. */
  preview?: boolean;
};

/** Columns out of 12 that a block spans in the desktop sheet. */
export type NavSpan = 2 | 3 | 4 | 5;

export type NavGroup = {
  heading: string;
  links: NavLink[];
  span: NavSpan;
  /** Lay the links out in two columns inside the group. */
  twoColumn?: boolean;
};

/** Which hairline drawing the featured card carries (nav/NavFeatured.tsx). */
export type NavDrawing = "release" | "foundation" | "method" | "seat";

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

export const NAV_MENUS: NavMenu[] = [
  {
    id: "akashic",
    label: "Akashic",
    match: ["/akashic"],
    lead: {
      title: "Akashic",
      text: "The governed data and AI platform.",
      href: "/akashic",
      cta: "Platform overview",
      span: 2,
    },
    groups: [
      {
        heading: "Platform",
        span: 2,
        links: [
          { label: "How it works", href: "/akashic#how-it-works" },
          { label: "Where it runs", href: "/akashic#architecture" },
          { label: "Security and privacy", href: "/akashic#trust" },
          { label: "Open foundations", href: "/akashic#open" },
          { label: "Capability reference", href: "/akashic#stack" },
        ],
      },
      {
        heading: "Modules",
        span: 5,
        twoColumn: true,
        links: [
          { label: "Pipelines", href: "/akashic#data-pipelines", caption: "Ingest and validate every source" },
          { label: "Master Data", href: "/akashic#master-data", caption: "Entity resolution, one record" },
          { label: "Warehouse", href: "/akashic#data-warehousing", caption: "Model data, define metrics once" },
          { label: "Machine Learning", href: "/akashic#machine-learning", caption: "Train, deploy and monitor models" },
          { label: "Ask Akashic", href: "/akashic#ask-ai", caption: "Cited answers in plain language" },
          { label: "Business Intelligence", href: "/akashic#business-intelligence", caption: "Serve metrics to every surface" },
          { label: "Governance", href: "/akashic#governance", caption: "Permissions, lineage and audit" },
          { label: "AI agents", href: "/akashic#agents", caption: "Agents do the legwork, people decide", preview: true },
        ],
      },
    ],
    feature: {
      eyebrow: "Akashic 1.0",
      title: "Generally available 1 November 2026.",
      caption: "Every module on one governed foundation.",
      href: "/akashic#modules",
      cta: "See the modules",
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
        span: 3,
        links: [
          { label: "Enterprise Intelligence", href: "/solutions/eis", caption: "Agentic FP&A and MIS" },
          { label: "IPMS", href: "/solutions#ipms", caption: "Procurement, indent to secured contract" },
          { label: "Akashic Life", href: "/solutions/life", caption: "Frontline maternal care" },
        ],
      },
      {
        heading: "By industry",
        span: 2,
        links: [
          { label: "BFSI", href: "/sectors/finance" },
          { label: "Healthcare", href: "/sectors/healthcare" },
          { label: "Retail and CPG", href: "/sectors/retail" },
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
          { label: "Finance and FP&A", href: "/solutions#function-finance" },
          { label: "Procurement", href: "/solutions#function-procurement" },
          { label: "Supply chain", href: "/solutions#function-supply-chain" },
          { label: "Operations", href: "/solutions#function-operations" },
          { label: "Sales and marketing", href: "/solutions#function-sales-marketing" },
          { label: "HR and corporate", href: "/solutions#function-hr" },
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
  {
    id: "company",
    label: "Company",
    match: ["/about", "/careers"],
    lead: {
      title: "Company",
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
        ],
      },
      {
        heading: "Work with us",
        span: 3,
        links: [
          { label: "Careers", href: "/careers", caption: "Open roles and how we hire" },
          { label: "Contact", href: "#talk-to-our-team", caption: "New York, Hyderabad, Bangalore" },
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
  href: "/akashic#modules",
  cta: "See what's in it",
};

/* Opens the global ContactModal, which intercepts every #talk-to-our-team anchor. */
export const NAV_CTA = { label: "Talk to our team", href: "#talk-to-our-team" };

/** True when `pathname` sits inside a menu's section. */
export function isCurrentSection(menu: NavMenu, pathname: string): boolean {
  return menu.match.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
}

/** True when a link points at the page being viewed (hash links never count). */
export function isCurrentPage(href: string, pathname: string): boolean {
  return !href.includes("#") && href === pathname;
}
