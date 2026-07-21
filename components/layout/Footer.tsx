"use client";

import Link from "next/link";
import DhiraLogo from "@/components/icons/DhiraLogo";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";

type FooterColumn = {
  heading: string;
  links: string[];
  subHeading?: string;
  subLinks?: string[];
};

const footerColumns: FooterColumn[] = [
  {
    heading: "Akashic",
    links: [
      "Akashic Data Pipelines",
      "Akashic Master Data",
      "Akashic Data Warehouse",
      "Ask Akashic",
      "Akashic Machine Learning",
      "Akashic BI",
      "Akashic Governance",
    ],
  },
  /* Solutions and Sectors are two different things and used to share one
     list. EIS / Life / Knowledge are vertical solutions that run ON TOP of
     Akashic (they have /solutions/* pages); the rest are the domains we
     deliver into (/sectors/*). Merging them implied DHIRA sells a
     "Manufacturing product", which it does not. */
  {
    heading: "Akashic Solutions",
    links: ["EIS", "Life", "Knowledge"],
  },
  {
    heading: "Sectors",
    links: [
      "Public Sector",
      "Manufacturing",
      "Healthcare",
      "Finance",
      "Retail",
      "Education",
      "Energy",
    ],
  },
  /* Was a list of six deliverable names (AI Readiness Audit, Sovereign
     Blueprint, …) collapsed onto two generic anchors. /delivery is built
     around three ENGAGEMENT MODELS, so the footer now mirrors the page. */
  {
    heading: "Delivery",
    links: [
      "Akashic Deployment",
      "Product Engineering",
      "Advisory & Co-Engineering",
      "How We Work",
      "Partnership Fit",
      "FAQ",
    ],
  },
  {
    heading: "Insights",
    links: ["Customer Stories", "Perspectives", "Documentation", "Guides"],
    subHeading: "Company",
    subLinks: ["About Us", "Careers"],
  },
];

const slug = (s: string) =>
  `#${s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`;

const hrefOverrides: Record<string, string> = {
  // Akashic
  "Akashic Data Pipelines": "/akashic#modules-data-pipelines",
  "Akashic Master Data": "/akashic#modules-master-data",
  "Akashic Data Warehouse": "/akashic#modules-data-warehousing",
  "Ask Akashic": "/akashic#modules-ask-ai",
  "Akashic Machine Learning": "/akashic#modules-machine-learning",
  "Akashic BI": "/akashic#modules-business-intelligence",
  "Akashic Governance": "/akashic#modules-governance",

  // Akashic Solutions — vertical solutions on top of the platform
  "EIS": "/solutions/eis",
  "Life": "/solutions/life",
  "Knowledge": "/solutions/knowledge",

  // Sectors — domains we deliver into
  "Public Sector": "/sectors/public-sector",
  "Manufacturing": "/sectors/manufacturing",
  "Healthcare": "/sectors/healthcare",
  "Finance": "/sectors/finance",
  "Retail": "/sectors/retail",
  "Education": "/sectors/education",
  "Energy": "/sectors/energy",

  // Delivery — the three engagement models, plus real page sections
  "Akashic Deployment": "/delivery#akashic-deployment",
  "Product Engineering": "/delivery#product-engineering",
  "Advisory & Co-Engineering": "/delivery#advisory-co-engineering",
  "How We Work": "/delivery#methodology",
  "Partnership Fit": "/delivery#partnership-fit",
  "FAQ": "/delivery#faq",

  // Insights & Company
  /* Was "/#proven-at-scale", which is not an id on any page — the home
     ProvenAtScale renders with its default id="scale". */
  "Customer Stories": "/#scale",
  "Perspectives": "/#voices",
  "Documentation": "/akashic#open",
  "Guides": "/delivery#methodology",
  "About Us": "/about",
  "Careers": "/careers",
};

export default function Footer() {
  return (
    <footer className="bg-vault text-white pt-20 pb-10">
      <ScrollRevealRail dark>
        {/* 7 columns on lg: brand spans 2, then the five link columns
            (Akashic / Akashic Solutions / Sectors / Delivery / Insights).
            Was 6 before Sectors was split out of Solutions. */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-7 lg:gap-10 mb-20">
          {/* Brand column */}
          <div className="col-span-2 lg:col-span-2 flex flex-col">
            <Link
              href="/"
              aria-label="DHIRA homepage"
              className="flex items-center gap-1.5 text-white mb-6"
            >
              <DhiraLogo className="h-10 w-10 text-white" />
              <span className="text-[22px] font-semibold tracking-tight">DHIRA</span>
            </Link>
            <p className="text-white/55 text-sm leading-relaxed max-w-[240px]">
              Data and AI, grounded in one governed foundation.
            </p>
            <p className="text-white/30 text-xs mt-8 tracking-wide">
              New York · Hyderabad · Bangalore
            </p>
          </div>

          {/* Link columns */}
          {footerColumns.map((col) => (
            <div key={col.heading} className="col-span-1">
              <h4 className="font-mono text-[11px] font-medium uppercase tracking-eyebrow text-white/40 mb-5">
                {col.heading}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <Link
                      href={hrefOverrides[link] ?? slug(link)}
                      className="text-white/55 text-sm hover:text-white transition-colors duration-250 ease-settle"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>

              {col.subHeading && col.subLinks && (
                <div className="mt-8">
                  <h4 className="font-mono text-[11px] font-medium uppercase tracking-eyebrow text-white/40 mb-5">
                    {col.subHeading}
                  </h4>
                  <ul className="space-y-3">
                    {col.subLinks.map((link) => (
                      <li key={link}>
                        <Link
                          href={hrefOverrides[link] ?? slug(link)}
                          className="text-white/55 text-sm hover:text-white transition-colors duration-250 ease-settle"
                        >
                          {link}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* ⚠ RIBBON — NOT SHIPPABLE AS IS. Every link below is a placeholder
            in-page anchor that resolves to nothing:
              #privacy   → needs a real /privacy page or hosted policy URL
              #terms     → needs a real /terms page
              #twitter   → needs the real X/Twitter profile URL
              #linkedin  → needs the real LinkedIn company URL
            Privacy Policy and Terms are also a legal requirement for a site
            collecting enquiries, so these block launch rather than being
            cosmetic. Replace the hrefs, then delete this comment. */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-white/35">
            <span>&copy; {new Date().getFullYear()} DHIRA Technologies. All rights reserved.</span>
            <Link href="#privacy" className="hover:text-white/65 transition-colors duration-250 ease-settle">
              Privacy Policy
            </Link>
            <Link href="#terms" className="hover:text-white/65 transition-colors duration-250 ease-settle">
              Terms of Service
            </Link>
          </div>
          <div className="flex items-center gap-3 text-white/35">
            <Link href="#twitter" className="hover:text-white/65 transition-colors duration-250 ease-settle" aria-label="X (Twitter)">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 22.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </Link>
            <Link href="#linkedin" className="hover:text-white/65 transition-colors duration-250 ease-settle" aria-label="LinkedIn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
              </svg>
            </Link>
          </div>
        </div>
      </ScrollRevealRail>
    </footer>
  );
}
