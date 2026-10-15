/* ------------------------------------------------------------------ */
/*  Company facts: one source for metadata, JSON-LD, footer, contact   */
/* ------------------------------------------------------------------ */
/* The canonical domain is the founder's (DHIRA_ai_Website_v2, 12 Oct 2026:
   https://www.dhira.ai). It replaced the vercel.app preview host that every
   canonical, Open Graph and Twitter URL pointed at until 15 Oct 2026.
   NEXT_PUBLIC_SITE_URL still overrides it for preview deployments.

   The legal line follows the founder's footer ("Akashic is a product of DHIRA
   Software Labs Pvt. Ltd."). The old footer said "DHIRA Technologies".
   DRAFT: the registered office, CIN and grievance contact are for the
   founder to supply (Companies (Incorporation) Rules 2014, Rule 26). They
   render only once filled in, so no placeholder reaches the page. */

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.dhira.ai").replace(/\/$/, "");

export type Office = {
  city: string;
  country: string;
  region: string;
  /** Time zone abbreviation shown beside the city. */
  zone: string;
};

export const SITE = {
  name: "DHIRA",
  expansion: "Digital Human Interfaces & Robotic Agents",
  legalName: "DHIRA Software Labs Pvt. Ltd.",
  productLine: "Akashic is a product of DHIRA Software Labs Pvt. Ltd.",
  description:
    "DHIRA builds Akashic, the governed data and AI platform, and delivers it as one accountable partner. The intelligence layer behind every decision.",
  founded: "2018",
  founder: { name: "Dilip Hanumara", role: "Founder & CEO" },
  email: "info@dhira.ai",
  offices: [
    { city: "New York", country: "United States", region: "Americas", zone: "ET" },
    { city: "Hyderabad", country: "India", region: "India", zone: "IST" },
    { city: "Bangalore", country: "India", region: "India", zone: "IST" },
  ] as Office[],
  social: [{ label: "LinkedIn", href: "https://www.linkedin.com/company/dhira" }],
  /* DRAFT, founder to supply. Empty strings render nothing. */
  registeredOffice: "",
  cin: "",
  grievanceContact: "",
  /** The footer's "Last updated" line (GIGW 3.0; the founder's footer has one). Bump on content changes. */
  lastUpdated: "2026-10-15",
} as const;

/* The Akashic app and its documentation live off this site (user, 15 Oct
   2026: Sign in and Docs link out, no pages here). DRAFT: both hosts are
   placeholders until the product team confirms them. */
export const AKASHIC_APP_URL = "https://app.dhira.ai";
export const AKASHIC_DOCS_URL = "https://docs.dhira.ai";

/** A mailto link to the one published inbox, with a subject that routes it. */
export const mailto = (subject: string) => `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}`;

/** Absolute URL for a site path, for canonical tags and structured data. */
export const absoluteUrl = (path = "/") => `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
