"use client";

import Link from "next/link";
import DhiraLogo from "@/components/icons/DhiraLogo";
import { ArrowUpRight } from "@/components/layout/nav/NavIcons";
import RegionSwitch from "@/components/layout/region/RegionSwitch";
import RegionLink from "@/components/ui/RegionLink";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import { FOOTER_COLUMNS, LEGAL_LINKS, type FooterLink } from "@/lib/navigation";
import { formatDate } from "@/lib/richText";
import { SITE, mailto } from "@/lib/site";

/* Rebuilt 15 Oct 2026 on the header's IA: the columns live in
   lib/navigation.ts (FOOTER_COLUMNS) beside NAV_MENUS, so the two cannot
   drift again. The old Insights / Delivery / "EIS" columns and the dead
   #privacy / #terms anchors are gone: the legal row is the founder's policy
   list, every link a real route. The company line is the founder's
   ("Akashic is a product of DHIRA Software Labs Pvt. Ltd."); the registered
   office and CIN (Rule 26) render once filled in lib/site.ts.
   Internal links go through RegionLink, so India visitors reach /in pages
   where one exists; RegionSwitch sits in the ribbon (lib/region.ts). */

/* Contrast on `vault` (#0a0a0c): white/50 is 5.3:1 and white/55 is 6.3:1,
   both over the 4.5:1 AA floor. The old /30, /35 and /40 greys measured
   2.6 to 3.8:1 and failed at these 11 to 12px sizes. */
const headingClass = "font-mono text-[11px] font-medium uppercase tracking-eyebrow text-white/50 mb-5";
const linkClass = "text-white/55 text-sm hover:text-white transition-colors duration-250 ease-settle";
const ribbonLinkClass = "hover:text-white/80 transition-colors duration-250 ease-settle";

function LinkList({ links }: { links: FooterLink[] }) {
  return (
    <ul className="space-y-3">
      {links.map((link) => (
        <li key={link.label}>
          <RegionLink href={link.href} className={`${linkClass} ${link.external ? "inline-flex items-center gap-1" : ""}`}>
            {link.label}
            {link.external && <ArrowUpRight className="opacity-70" />}
          </RegionLink>
        </li>
      ))}
    </ul>
  );
}

export default function Footer() {
  const disclosure = [SITE.registeredOffice && `Registered office: ${SITE.registeredOffice}`, SITE.cin && `CIN ${SITE.cin}`].filter(Boolean);
  return (
    <footer className="bg-vault text-white pt-20 pb-10">
      <ScrollRevealRail dark>
        {/* 7 columns on lg: brand spans 2, then Akashic / Solutions /
            Services / Resources / Company. */}
        <div className="mb-20 grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-3 lg:grid-cols-7 lg:gap-10">
          {/* Brand column */}
          <div className="col-span-2 flex flex-col sm:col-span-3 lg:col-span-2">
            <RegionLink href="/" aria-label="DHIRA homepage" className="mb-6 flex items-center gap-1.5 text-white">
              <DhiraLogo className="h-10 w-10 text-white" />
              <span className="text-[22px] font-semibold tracking-tight">DHIRA</span>
            </RegionLink>
            <p className="max-w-[240px] text-sm leading-relaxed text-white/55">Data and AI, grounded in one governed foundation.</p>
            <p className="mt-8 text-xs tracking-wide text-white/50">{SITE.offices.map((office) => office.city).join(" · ")}</p>
            <a href={mailto("General enquiry")} className={`mt-2 text-xs tracking-wide text-white/55 ${ribbonLinkClass}`}>
              {SITE.email}
            </a>
          </div>

          {/* Link columns. h2, not h4: the footer starts a new top-level
              region, so h4 skipped two levels in the heading outline. */}
          {FOOTER_COLUMNS.map((col) => (
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

        {/* Ribbon: the company line, the legal row and the last-updated date
            on the left; the region switch and LinkedIn on the right.
            Left-aligned on mobile to match the columns above. */}
        <div className="flex flex-col items-start gap-6 border-t border-white/10 pt-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-3 text-xs text-white/50">
            <p>
              &copy; {new Date().getFullYear()} {SITE.name}. All rights reserved. {SITE.productLine}
            </p>
            {disclosure.length > 0 && <p>{disclosure.join(" · ")}</p>}
            <nav aria-label="Website policies">
              <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
                {LEGAL_LINKS.map((link) => (
                  <li key={link.href}>
                    <RegionLink href={link.href} className={ribbonLinkClass}>
                      {link.label}
                    </RegionLink>
                  </li>
                ))}
                <li className="text-white/40">Last updated {formatDate(SITE.lastUpdated)}</li>
              </ul>
            </nav>
          </div>
          <div className="flex items-center gap-6 text-white/50">
            <RegionSwitch />
            {SITE.social.map((profile) => (
              <Link
                key={profile.href}
                href={profile.href}
                target="_blank"
                rel="noopener noreferrer"
                className={ribbonLinkClass}
                aria-label={`DHIRA on ${profile.label}`}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                </svg>
              </Link>
            ))}
          </div>
        </div>
      </ScrollRevealRail>
    </footer>
  );
}
