/* ------------------------------------------------------------------ */
/*  Site settings: company facts and default metadata                  */
/* ------------------------------------------------------------------ */
/* One source for the header, footer, JSON-LD, contact routes and default
   SEO. In a CMS this is a singleton "Site settings" document.

   The legal line follows the founder's footer ("Akashic is a product of
   DHIRA Software Labs Pvt. Ltd."). DRAFT: the registered office, CIN and
   grievance contact are for the founder to supply (Companies
   (Incorporation) Rules 2014, Rule 26). They render only once filled in,
   so no placeholder reaches the page. */

import type { Link } from "./types";

export interface Office {
  city: string;
  country: string;
  region: string;
  /** Time zone abbreviation shown beside the city. */
  zone: string;
}

export interface SiteSettings {
  name: string;
  /** Other names the company is known by (Organization JSON-LD). */
  alternateName: string;
  /** Square brand mark, used as the Organization logo. */
  logo: string;
  /** The full form of DHIRA. The header sets each initial in bold, never in colour. */
  expansion: string;
  legalName: string;
  productLine: string;
  /** One-line brand statement under the footer logo. */
  tagline: string;
  /** The company boilerplate for press releases and the media kit. DRAFT: review before distribution. */
  boilerplate: string;
  description: string;
  founded: string;
  founder: { name: string; role: string };
  email: string;
  offices: Office[];
  social: Link[];
  registeredOffice: string;
  cin: string;
  grievanceContact: string;
  /** sitemap.xml's lastModified for routes that set no `updated` date. ISO date.
      No longer printed in the footer (21 Oct 2026). */
  lastUpdated: string;
  /** The off-site product host. DRAFT placeholder until the product team confirms it. */
  appUrl: string;
  /** Default metadata for pages that set none, and the social card. */
  seo: {
    title: string;
    description: string;
    keywords: string[];
    ogImage: string;
    ogImageAlt: string;
    locale: string;
  };
}

export const site: SiteSettings = {
  name: "DHIRA",
  alternateName: "DHIRA.ai",
  logo: "/brand/dhira-mark.svg",
  expansion: "Digital Human Interfaces & Robotic Agents",
  legalName: "DHIRA Software Labs Pvt. Ltd.",
  productLine: "Akashic is a product of DHIRA Software Labs Private Limited.",
  tagline: "Data and AI, grounded in one governed foundation.",
  boilerplate:
    "DHIRA is a data and AI company founded in 2018, with offices in New York, Hyderabad and Bangalore. It builds Akashic, the governed data and AI platform, and delivers it as one accountable partner, from advisory to engineering and deployment. Akashic is the intelligence layer inside country-scale public programmes in education, public health and labour mobility.",
  description:
    "DHIRA builds Akashic, the governed data and AI platform, and delivers it as one accountable partner. The intelligence layer behind every decision.",
  founded: "2018",
  founder: { name: "Dilip Hanumara", role: "Founder & CEO" },
  email: "info@dhira.ai",
  offices: [
    { city: "New York", country: "United States", region: "Americas", zone: "ET" },
    { city: "Hyderabad", country: "India", region: "India", zone: "IST" },
    { city: "Bangalore", country: "India", region: "India", zone: "IST" },
  ],
  social: [{ label: "LinkedIn", href: "https://www.linkedin.com/company/dhira" }],
  /* DRAFT, founder to supply. Empty strings render nothing. */
  registeredOffice: "",
  cin: "",
  grievanceContact: "",
  lastUpdated: "2026-10-15",
  /* The Akashic app lives off this site (user, 15 Oct 2026: no pages here).
     It has no Sign in link in this version. Documentation (docs.dhira.ai)
     was removed on 21 Oct 2026 (user): the host does not resolve yet. */
  appUrl: "https://app.dhira.ai",
  seo: {
    title: "DHIRA | Answers You Can Act On",
    description:
      "From spreadsheets to PDFs to live streams, DHIRA gives your AI the full picture. Powered by Akashic, the intelligence layer behind every decision.",
    keywords: ["DHIRA", "Akashic", "Enterprise AI", "Knowledge Layer", "Data Platform", "Master Data", "Data Pipelines"],
    ogImage: "/og-image.png",
    ogImageAlt: "DHIRA: answers you can act on.",
    locale: "en_GB",
  },
};

/** A mailto href to the one published inbox, with a subject that routes it. */
export const mailto = (subject: string) => `mailto:${site.email}?subject=${encodeURIComponent(subject)}`;
