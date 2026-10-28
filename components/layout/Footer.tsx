import Link from "next/link";
import DhiraLogo from "@/components/icons/DhiraLogo";
import { ArrowUpRight } from "@/components/layout/nav/NavIcons";
import RegionSwitch from "@/components/layout/region/RegionSwitch";
import RegionLink from "@/components/ui/RegionLink";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import type { FooterLink } from "@/content/navigation";
import { getNavigation, getSiteSettings, getUiStrings } from "@/lib/content";
import { REGIONAL_PATHS } from "@/lib/region";
import { nameOrWordmark } from "@/components/icons/AkashicWordmark";

/* Rebuilt 15 Oct 2026 on the header's IA: the columns live in the
   Navigation document (content/navigation.ts) beside the header menus, so
   the two cannot drift again. The legal row is the founder's policy list,
   every link a real route. The company line is the founder's ("Akashic is
   a product of DHIRA Software Labs Pvt. Ltd."); the registered office and
   CIN (Rule 26) render once filled in content/site.ts.
   Internal links go through RegionLink, so India visitors reach /in pages
   where one exists. RegionSwitch sits in the ribbon only while some page
   has an India version (lib/region.ts REGIONAL_PATHS); none does today.
   Audited 21 Oct 2026: what qualifies for a footer link is set out above
   the columns in content/navigation.ts. The hand-kept "Last updated" date
   went: it had already gone stale, and none of the reference footers
   carries one.
   Resized 28 Oct 2026 (user: too big), 826px to about 450px at 1440,
   measured against Linear (494px, 37 links), Notion (396px), OpenAI and
   Vercel: no column past 7 links, a 28px link pitch (Vercel and
   Databricks use 28), 64/32px padding, and the company line and policy
   row share one row from xl. */

/* inkSoft on vault measures 4.8:1 in light and 7.8:1 in dark, over the
   4.5:1 AA floor at these 11 to 14px sizes. Every heading is one fixed
   16px row, so the Akashic wordmark's taller logo cannot push its column
   below the others. */
const headingClass = "font-mono text-[11px] font-medium uppercase tracking-eyebrow text-inkSoft mb-4 flex h-4 items-center";
const linkClass = "text-inkSoft text-sm hover:text-ink transition-colors duration-200 ease-settle";
const ribbonLinkClass = "hover:text-secondary-text transition-colors duration-200 ease-settle";

/* leading-5 on the list, not only the links: each item's line box takes
   the list's line height, and the inherited body leading made the pitch
   36px. */
function LinkList({ links }: { links: FooterLink[] }) {
  return (
    <ul className="space-y-2 text-sm leading-5">
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

export default async function Footer() {
  const [{ footer }, site, ui] = await Promise.all([getNavigation(), getSiteSettings(), getUiStrings()]);
  const disclosure = [
    site.registeredOffice && `${ui.footer.registeredOffice} ${site.registeredOffice}`,
    site.cin && `${ui.footer.cin} ${site.cin}`,
  ].filter(Boolean);
  return (
    <footer className="border-t border-lineSoft bg-vault text-ink pt-16 pb-8">
      <ScrollRevealRail>
        {/* xl: brand on a wider track, then Akashic / Solutions /
            Industries / Services / Resources / Company. Below xl the brand
            takes its own row, so six link columns keep room on a 1024px
            screen. */}
        <div className="mb-12 grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:grid-cols-6 xl:grid-cols-[minmax(0,1.5fr)_repeat(6,minmax(0,1fr))]">
          {/* Brand column */}
          <div className="col-span-2 flex flex-col sm:col-span-3 lg:col-span-6 xl:col-span-1">
            <RegionLink href="/" aria-label={ui.homeLink} className="mb-5 flex items-center gap-1.5 text-ink">
              <DhiraLogo className="h-8 w-8 text-ink" />
              <span className="text-xl font-semibold tracking-tight">{site.name}</span>
            </RegionLink>
            <p className="max-w-[240px] text-sm leading-relaxed text-inkSoft">{site.tagline}</p>
            <p className="mt-6 text-xs tracking-wide text-inkSoft">{site.offices.map((office) => office.city).join(" · ")}</p>
            <a href={footer.contact.href} className={`mt-2 text-xs tracking-wide text-inkSoft ${ribbonLinkClass}`}>
              {footer.contact.label}
            </a>
          </div>

          {/* Link columns. h2, not h4: the footer starts a new top-level
              region, so h4 skipped two levels in the heading outline. */}
          {footer.columns.map((col) => (
            <div key={col.heading} className="col-span-1">
              <h2 className={headingClass}>{nameOrWordmark(col.heading)}</h2>
              <LinkList links={col.links} />
            </div>
          ))}
        </div>

        {/* Ribbon: the company line on the left; the legal row, region
            switch and LinkedIn on the right, one row from xl. Stacked and
            left-aligned below that, to match the columns above. */}
        <div className="flex flex-col items-start gap-4 border-t border-line pt-6 text-xs text-inkSoft xl:flex-row xl:items-center xl:justify-between">
          <div className="space-y-1">
            <p>
              &copy; {new Date().getFullYear()} {site.name}. {ui.footer.rights} {site.productLine}
            </p>
            {disclosure.length > 0 && <p>{disclosure.join(" · ")}</p>}
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <nav aria-label={ui.footer.policies}>
              <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
                {footer.legal.map((link) => (
                  <li key={link.href}>
                    <RegionLink href={link.href} className={ribbonLinkClass}>
                      {link.label}
                    </RegionLink>
                  </li>
                ))}
              </ul>
            </nav>
            {REGIONAL_PATHS.length > 0 && <RegionSwitch />}
            {site.social.map((profile) => (
              <Link
                key={profile.href}
                href={profile.href}
                target="_blank"
                rel="noopener noreferrer"
                className={ribbonLinkClass}
                aria-label={`${ui.footer.socialPrefix} ${profile.label}`}
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
