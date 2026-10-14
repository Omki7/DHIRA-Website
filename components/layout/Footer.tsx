"use client";

import Link from "next/link";
import DhiraLogo from "@/components/icons/DhiraLogo";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";

type FooterLink = { label: string; href: string };

type FooterColumn = {
  heading: string;
  links: FooterLink[];
  subHeading?: string;
  subLinks?: FooterLink[];
};

/* Every link carries its own href. There used to be a label → href lookup
   with a `#slug` fallback, so any label missing from the lookup silently
   became a dead in-page anchor. */
const footerColumns: FooterColumn[] = [
  {
    heading: "Akashic",
    links: [
      { label: "Akashic Data Pipelines", href: "/akashic#modules-data-pipelines" },
      { label: "Akashic Master Data", href: "/akashic#modules-master-data" },
      { label: "Akashic Data Warehouse", href: "/akashic#modules-data-warehousing" },
      { label: "Ask Akashic", href: "/akashic#modules-ask-ai" },
      { label: "Akashic Machine Learning", href: "/akashic#modules-machine-learning" },
      { label: "Akashic BI", href: "/akashic#modules-business-intelligence" },
      { label: "Akashic Governance", href: "/akashic#modules-governance" },
    ],
  },
  /* Solutions and Sectors are two different things and used to share one
     list. EIS / Life are vertical solutions that run ON TOP of
     Akashic (they have /solutions/* pages); the rest are the domains we
     deliver into (/sectors/*). Merging them implied DHIRA sells a
     "Manufacturing product", which it does not. */
  {
    heading: "Akashic Solutions",
    links: [
      { label: "EIS", href: "/solutions/eis" },
      { label: "Life", href: "/solutions/life" },
    ],
  },
  {
    heading: "Sectors",
    links: [
      { label: "Public Sector", href: "/sectors/public-sector" },
      { label: "Manufacturing", href: "/sectors/manufacturing" },
      { label: "Healthcare", href: "/sectors/healthcare" },
      { label: "Finance", href: "/sectors/finance" },
      { label: "Retail", href: "/sectors/retail" },
      { label: "Education", href: "/sectors/education" },
      { label: "Energy", href: "/sectors/energy" },
    ],
  },
  /* Mirrors the /delivery sections. Each engagement model used to have its
     own link, but the models are tabs inside one section with no per-tab
     anchor, so all four landed on the same first tab. */
  {
    heading: "Delivery",
    links: [
      { label: "Ways to Work", href: "/delivery#engagement-models" },
      { label: "Capabilities", href: "/delivery#capabilities" },
      { label: "How We Deliver", href: "/delivery#methodology" },
      { label: "Who This Is For", href: "/delivery#partnership-fit" },
      { label: "FAQ", href: "/delivery#faq" },
    ],
  },
  /* Documentation and Guides were dropped: neither exists yet (they pointed
     at /akashic#open and a duplicate of How We Deliver). Add them back when
     there is a real destination. */
  {
    heading: "Insights",
    links: [
      { label: "Customer Stories", href: "/#scale" },
      { label: "Perspectives", href: "/#voices" },
    ],
    subHeading: "Company",
    subLinks: [
      { label: "About Us", href: "/about" },
      { label: "Careers", href: "/careers" },
    ],
  },
];

/* Contrast on `vault` (#0a0a0c): white/50 is 5.3:1 and white/55 is 6.3:1,
   both over the 4.5:1 AA floor. The old /30, /35 and /40 greys measured
   2.6 to 3.8:1 and failed at these 11 to 12px sizes. */
const headingClass =
  "font-mono text-[11px] font-medium uppercase tracking-eyebrow text-white/50 mb-5";
const linkClass =
  "text-white/55 text-sm hover:text-white transition-colors duration-250 ease-settle";
const ribbonLinkClass = "hover:text-white/80 transition-colors duration-250 ease-settle";

function LinkList({ links }: { links: FooterLink[] }) {
  return (
    <ul className="space-y-3">
      {links.map((link) => (
        <li key={link.label}>
          <Link href={link.href} className={linkClass}>
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

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
            <p className="text-white/50 text-xs mt-8 tracking-wide">
              New York · Hyderabad · Bangalore
            </p>
          </div>

          {/* Link columns. h2, not h4: the footer starts a new top-level
              region, so h4 skipped two levels in the heading outline. */}
          {footerColumns.map((col) => (
            <div key={col.heading} className="col-span-1">
              <h2 className={headingClass}>{col.heading}</h2>
              <LinkList links={col.links} />

              {col.subHeading && col.subLinks && (
                <div className="mt-8">
                  <h2 className={headingClass}>{col.subHeading}</h2>
                  <LinkList links={col.subLinks} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* ⚠ RIBBON — NOT SHIPPABLE AS IS. Privacy Policy and Terms are
            placeholder in-page anchors that resolve to nothing:
              #privacy   → needs a real /privacy page or hosted policy URL
              #terms     → needs a real /terms page
            They are a legal requirement for a site collecting enquiries, so
            they block launch rather than being cosmetic. The X icon was
            removed for the same reason (#twitter went nowhere); restore it
            with the real profile URL. Replace the hrefs, then delete this
            comment.
            Left-aligned on mobile to match the columns above; copyright on
            its own line so the legal links never split across two rows. */}
        <div className="pt-8 border-t border-white/10 flex flex-col items-start gap-5 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-2 text-xs text-white/50 md:flex-row md:items-center md:gap-5">
            <span>&copy; {new Date().getFullYear()} DHIRA Technologies. All rights reserved.</span>
            <div className="flex items-center gap-5">
              <Link href="#privacy" className={ribbonLinkClass}>
                Privacy Policy
              </Link>
              <Link href="#terms" className={ribbonLinkClass}>
                Terms of Service
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-3 text-white/50">
            <Link
              href="https://www.linkedin.com/company/dhira"
              target="_blank"
              rel="noopener noreferrer"
              className={ribbonLinkClass}
              aria-label="DHIRA on LinkedIn"
            >
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
