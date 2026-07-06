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
      "Data Pipelines",
      "Master Data",
      "Data Warehouse",
      "Machine Learning",
      "Business Intelligence",
      "Ask AI",
      "Data Governance",
    ],
  },
  {
    heading: "Solutions",
    links: ["EIS", "Life", "Knowledge"],
    subHeading: "Sectors",
    subLinks: ["Manufacturing", "Healthcare", "Finance", "Retail", "Education", "Energy"],
  },
  {
    heading: "Delivery",
    links: [
      "AI Readiness Audit",
      "Sovereign Blueprint",
      "Governance Framework",
      "Platform Deployment",
      "Legacy Modernization",
      "Custom Accelerators",
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

export default function Footer() {
  return (
    <footer className="bg-vault text-white pt-20 pb-10">
      <ScrollRevealRail dark>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-6 lg:gap-12 mb-20">
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
              Data and AI, grounded in the full picture.
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
                      href={slug(link)}
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
                          href={slug(link)}
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
