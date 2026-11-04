import type { NavLink, NavMenu } from "@/content/navigation";
import { nameOrWordmark } from "@/shared/components/icons/AkashicWordmark";
import { Arrow, ArrowUpRight } from "@/shared/components/icons/NavIcons";
import { NavFeatured } from "@/shared/components/navigation/NavFeatured";
import { RegionLink } from "@/shared/components/navigation/RegionLink";
import { PreviewTag } from "@/shared/components/ui/PreviewTag";
import { cx } from "@/shared/utils/cx";
import { isCurrentPage } from "@/shared/utils/navigation";
import styles from "./MenuPanel.module.scss";

/* One menu's contents inside the desktop sheet, the same grammar for every
   menu: lead (hairline to its right), vertical link lists, featured card on
   the right. Type leads, no icon per row: a 15px title, an optional 13px
   caption in `secondary-text` (6.5:1; `inkSoft` is only 4.4:1 at this size)
   and an 11px mono group label in `overcast` (4.8:1).
   Each block is one `fr` track sized by its `span`; gutters are 24px below
   xl and 32px from xl. Headings share the first
   row (CSS subgrid) and sit on its baseline, so when one wraps to two lines
   every list still starts on the same line. A `divided` group draws the
   lead's hairline again, centred in the gutter before it, so it costs the
   list no width. */

export interface MenuRowProps {
  link: NavLink;
  pathname: string;
}

export function MenuRow({ link, pathname }: MenuRowProps) {
  return (
    <RegionLink
      href={link.href}
      aria-current={isCurrentPage(link.href, pathname) ? "page" : undefined}
      className={cx(styles.row, link.caption ? styles.rowCaptioned : undefined)}
    >
      {/* Every row has the same top padding, so a captioned list's first
          label lines up with an uncaptioned neighbour's.
          The hover arrow hangs past the label instead of taking room from
          it, so a label only wraps when its own words do not fit; a tag
          that does not fit drops under the label rather than breaking it. */}
      <span className={styles.rowTitle}>
        <span className={styles.rowLabel}>{link.label}</span>
        {link.preview && <PreviewTag />}
        {link.external ? (
          <ArrowUpRight className={styles.rowExternal} />
        ) : (
          <Arrow className={styles.rowArrow} />
        )}
      </span>
      {link.caption && <span className={styles.rowCaption}>{link.caption}</span>}
    </RegionLink>
  );
}

export interface MenuPanelProps {
  menu: NavMenu;
  drawn: boolean;
  pathname: string;
}

export function MenuPanel({ menu, drawn, pathname }: MenuPanelProps) {
  const { lead, groups, feature } = menu;
  const columns = [lead.span, ...groups.map((group) => group.span), feature.span]
    .map((span) => `minmax(0, ${span}fr)`)
    .join(" ");

  return (
    <div className={styles.root} style={{ gridTemplateColumns: columns }}>
      <div className={styles.lead}>
        <p className={styles.leadTitle}>{nameOrWordmark(lead.title)}</p>
        <p className={styles.leadText}>{lead.text}</p>
        <RegionLink
          href={lead.href}
          aria-current={isCurrentPage(lead.href, pathname) ? "page" : undefined}
          className={styles.leadLink}
        >
          {lead.cta}
          <Arrow className={styles.leadArrow} />
        </RegionLink>
      </div>

      {groups.map((group) => {
        const headingId = `nav-${menu.id}-${group.heading.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
        return (
          <div key={group.heading} className={cx(styles.group, group.divided && styles.groupDivided)}>
            <p id={headingId} className={styles.groupHeading}>
              {group.heading}
            </p>
            <ul aria-labelledby={headingId} className={group.twoColumn ? styles.listTwoColumn : styles.list}>
              {group.links.map((link) => (
                <li key={`${link.label}-${link.href}`}>
                  <MenuRow link={link} pathname={pathname} />
                </li>
              ))}
            </ul>
          </div>
        );
      })}

      <NavFeatured feature={feature} drawn={drawn} className={styles.featured} />
    </div>
  );
}
