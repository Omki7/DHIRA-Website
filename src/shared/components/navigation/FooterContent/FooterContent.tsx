import Link from "next/link";
import type { ReactNode } from "react";
import type { FooterColumn, FooterLink, Navigation } from "@/content/navigation";
import type { SiteSettings } from "@/content/site";
import type { UiStrings } from "@/content/ui";
import { AssistantLogo } from "@/shared/components/icons/AssistantLogo";
import { DhiraLogo } from "@/shared/components/icons/DhiraLogo";
import { ArrowUpRight } from "@/shared/components/icons/NavIcons";
import { RegionLink } from "@/shared/components/navigation/RegionLink";
import { ScrollRevealRail } from "@/shared/components/ui/ScrollRevealRail";
import { cx } from "@/shared/utils/cx";
import { REGIONAL_PATHS } from "@/shared/utils/region";
import styles from "./FooterContent.module.scss";

/* Rebuilt 15 Oct 2026 on the header's IA: the columns live in the
   Navigation document (content/navigation.ts) beside the header menus, so
   the two cannot drift again. The legal row is the founder's policy list,
   every link a real route. The company line is the founder's ("Akashic is
   a product of DHIRA Software Labs Pvt. Ltd."); the registered office and
   CIN (Rule 26) render once filled in content/site.ts.
   Internal links go through RegionLink, so India visitors reach /in pages
   where one exists. The region switch (`regionSwitch`) sits in the ribbon
   only while some page has an India version (shared/utils/region.ts
   REGIONAL_PATHS); none does today.
   Audited 21 Oct 2026: what qualifies for a footer link is set out above
   the columns in content/navigation.ts. The hand-kept "Last updated" date
   went: it had already gone stale, and none of the reference footers
   carries one.
   Regrouped 2 Nov 2026 on ThoughtSpot's footer (user): the brand block on
   the left, then four columns with short groups stacked, so no column
   stands alone with two links and none runs to 11. The brand block carries
   ThoughtSpot's two extras: "Ask AI for a summary" (assistant marks that
   open with the prompt asked) and "Stay in touch", a business email
   sign-up, simulated until the backend is built (the `subscribe` slot,
   FooterSubscribe). Together they fill the brand track to about the
   height of the longest link column: 672px at 1440, up from 448px after
   the 28 Oct resize. Headings carry the hierarchy: ink mono
   capitals over quiet grey links, the way ThoughtSpot's accent headings
   do, without colour (blue stays for links and live data, DESIGN_SYSTEM
   §4). Flat vault ground, not ThoughtSpot's dark field and spheres
   (§4: no permanently dark layout panels, no decorative gradients).
   Presentational: the route shell loads the documents and passes the
   subscribe form and region switch in as slots. */

/* inkSoft on vault measures 4.8:1 in light and 7.8:1 in dark, over the
   4.5:1 AA floor at these 12 to 14px sizes. */

/* leading-5 on the list, not only the links: each item's line box takes
   the list's line height. 20px lines 12px apart: a 32px pitch. */
function LinkList({ links }: { links: FooterLink[] }) {
  return (
    <ul className={styles.linkList}>
      {links.map((link) => (
        <li key={link.label}>
          <RegionLink href={link.href} className={cx(styles.link, link.external && styles.linkExternal)}>
            {link.label}
            {link.external && <ArrowUpRight className={styles.externalIcon} />}
          </RegionLink>
        </li>
      ))}
    </ul>
  );
}

export interface FooterContentProps {
  /** The Navigation document's `footer` field. */
  footer: Navigation["footer"];
  site: SiteSettings;
  ui: UiStrings;
  /** The business email sign-up, under the "Stay in touch" heading. */
  subscribe: ReactNode;
  /** The region switch, shown in the ribbon only while REGIONAL_PATHS is non-empty. */
  regionSwitch: ReactNode;
}

export function FooterContent({ footer, site, ui, subscribe, regionSwitch }: FooterContentProps) {
  const { askAi } = footer;
  const disclosure = [
    site.registeredOffice && `${ui.footer.registeredOffice} ${site.registeredOffice}`,
    site.cin && `${ui.footer.cin} ${site.cin}`,
  ].filter(Boolean);
  const linkCount = (col: FooterColumn) => col.groups.reduce((sum, group) => sum + group.links.length, 0);
  const longest = footer.columns.reduce((a, b) => (linkCount(b) > linkCount(a) ? b : a));
  return (
    <footer className={styles.root}>
      <ScrollRevealRail>
        {/* xl: the brand block on a quarter of the width, the link grid on
            the rest. Below xl the brand block takes its own row above the
            grid; on phones the four columns pair up. */}
        <div className={styles.main}>
          <div className={styles.brand}>
            <RegionLink href="/" aria-label={ui.homeLink} className={styles.homeLink}>
              <DhiraLogo className={styles.logo} />
              <span className={styles.name}>{site.name}</span>
            </RegionLink>
            <p className={styles.tagline}>{site.tagline}</p>
            <p className={styles.offices}>{site.offices.map((office) => office.city).join(" · ")}</p>
            <a href={footer.contact.href} className={cx(styles.contact, styles.ribbonLink)}>
              {footer.contact.label}
            </a>

            {/* Ask AI for a summary: each mark opens its assistant with the
                prompt already asked (content/navigation.ts `askAi`). */}
            <p className={styles.askLabel}>{askAi.label}</p>
            <ul className={styles.askList}>
              {askAi.assistants.map((assistant) => (
                <li key={assistant.id}>
                  <a
                    href={`${assistant.href}${encodeURIComponent(askAi.prompt.replace("{url}", askAi.url))}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={assistant.name}
                    className={styles.askLink}
                  >
                    <AssistantLogo id={assistant.id} className={styles.askIcon} />
                    <span className={styles.srOnly}>
                      {ui.askAssistant.before} {assistant.name} {ui.askAssistant.after} {ui.opensInNewTab}
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <h2 className={styles.subscribeHeading}>{ui.subscribe.heading}</h2>
            <p className={styles.subscribeLede}>{ui.subscribe.lede}</p>
            {subscribe}
          </div>

          {/* Link columns. h2, not h4: the footer starts a new top-level
              region, so h4 skipped two levels in the heading outline.
              On phones the longest column (Solutions with its industries)
              runs down the right beside the other three, stacked on the
              left, so neither side leaves a hole. Reading order stays the
              header's. */}
          <div className={styles.columns}>
            {footer.columns.map((col) => (
              <div key={col.groups[0].heading} className={cx(styles.column, col === longest && styles.columnLongest)}>
                {col.groups.map((group) => (
                  <div key={group.heading}>
                    <h2 className={styles.columnHeading}>{group.heading}</h2>
                    <LinkList links={group.links} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Ribbon: the company line on the left; the policy row, region
            switch and LinkedIn on the right, one row from xl. Stacked and left-aligned
            below that, to match the columns above. */}
        <div className={styles.ribbon}>
          <div className={styles.company}>
            <p>
              &copy; {new Date().getFullYear()} {site.name}. {ui.footer.rights} {site.productLine}
            </p>
            {disclosure.length > 0 && <p>{disclosure.join(" · ")}</p>}
          </div>
          <div className={styles.ribbonEnd}>
            <nav aria-label={ui.footer.policies}>
              <ul className={styles.policies}>
                {footer.legal.map((link) => (
                  <li key={link.href}>
                    <RegionLink href={link.href} className={styles.ribbonLink}>
                      {link.label}
                    </RegionLink>
                  </li>
                ))}
              </ul>
            </nav>
            {REGIONAL_PATHS.length > 0 && regionSwitch}
            {site.social.map((profile) => (
              <Link
                key={profile.href}
                href={profile.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.ribbonLink}
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
