import RegionLink from "@/components/ui/RegionLink";
import PreviewTag from "@/components/ui/PreviewTag";
import type { NavLink, NavMenu } from "@/content/navigation";
import { isCurrentPage } from "@/lib/navigation";
import NavFeatured from "./NavFeatured";
import { Arrow, ArrowUpRight } from "./NavIcons";
import { nameOrWordmark } from "@/components/icons/AkashicWordmark";

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

export function MenuRow({ link, pathname }: { link: NavLink; pathname: string }) {
  return (
    <RegionLink
      href={link.href}
      aria-current={isCurrentPage(link.href, pathname) ? "page" : undefined}
      className={`group flex flex-col rounded-tile px-3 transition-colors duration-150 hover:bg-tertiary-bg focus-visible:bg-tertiary-bg aria-[current=page]:bg-tertiary-bg ${
        link.caption ? "pb-2 pt-1.5" : "py-1.5"
      }`}
    >
      {/* Every row has the same top padding, so a captioned list's first
          label lines up with an uncaptioned neighbour's.
          The hover arrow hangs past the label instead of taking room from
          it, so a label only wraps when its own words do not fit; a tag
          that does not fit drops under the label rather than breaking it. */}
      <span className="relative flex flex-wrap items-center gap-x-2 gap-y-1 self-start text-[15px] font-medium leading-snug text-ink">
        <span className="text-balance">{link.label}</span>
        {link.preview && <PreviewTag />}
        {link.external ? (
          <ArrowUpRight className="absolute left-full top-1/2 ml-1.5 -translate-y-1/2 text-overcast" />
        ) : (
          <Arrow className="absolute left-full top-1/2 ml-2 -translate-x-1 -translate-y-1/2 text-blue opacity-0 transition duration-150 ease-settle group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100" />
        )}
      </span>
      {link.caption && <span className="mt-0.5 text-[13px] leading-snug text-secondary-text">{link.caption}</span>}
    </RegionLink>
  );
}

export default function MenuPanel({ menu, drawn, pathname }: { menu: NavMenu; drawn: boolean; pathname: string }) {
  const { lead, groups, feature } = menu;
  const columns = [lead.span, ...groups.map((group) => group.span), feature.span]
    .map((span) => `minmax(0, ${span}fr)`)
    .join(" ");

  return (
    <div className="grid grid-rows-[auto_1fr] gap-x-6 pb-9 pt-8 xl:gap-x-8" style={{ gridTemplateColumns: columns }}>
      <div className="row-span-2 border-r border-lineSoft pr-6 xl:pr-8">
        <p className="font-heading text-[24px] font-semibold leading-[1.15] tracking-[-0.02em] text-ink">{nameOrWordmark(lead.title)}</p>
        <p className="mt-3 text-balance text-[14px] leading-[1.55] text-secondary-text">{lead.text}</p>
        <RegionLink
          href={lead.href}
          aria-current={isCurrentPage(lead.href, pathname) ? "page" : undefined}
          className="group mt-5 inline-flex items-center gap-1.5 text-[14px] font-medium text-blue transition-colors duration-150 hover:text-blue-hover"
        >
          {lead.cta}
          <Arrow className="transition-transform duration-200 ease-settle group-hover:translate-x-0.5" />
        </RegionLink>
      </div>

      {groups.map((group) => {
        const headingId = `nav-${menu.id}-${group.heading.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
        return (
          <div
            key={group.heading}
            className={`row-span-2 grid grid-rows-subgrid ${
              group.divided
                ? "relative before:absolute before:inset-y-0 before:-left-3 before:w-px before:bg-lineSoft xl:before:-left-4"
                : ""
            }`}
          >
            <p
              id={headingId}
              className="self-end text-balance px-3 pb-2.5 font-mono text-[11px] font-medium uppercase leading-[1.5] tracking-eyebrow text-overcast"
            >
              {group.heading}
            </p>
            <ul aria-labelledby={headingId} className={group.twoColumn ? "grid grid-cols-2 content-start gap-x-2 gap-y-0.5" : "space-y-0.5"}>
              {group.links.map((link) => (
                <li key={`${link.label}-${link.href}`}>
                  <MenuRow link={link} pathname={pathname} />
                </li>
              ))}
            </ul>
          </div>
        );
      })}

      <NavFeatured feature={feature} drawn={drawn} className="row-span-2 self-start" />
    </div>
  );
}
