import RegionLink from "@/components/ui/RegionLink";
import PreviewTag from "@/components/ui/PreviewTag";
import { NAV_SIGN_IN, isCurrentPage, type NavFeature, type NavLink, type NavMenu, type NavSpan } from "@/lib/navigation";
import NavFeatured from "./NavFeatured";
import { Arrow, ArrowUpRight } from "./NavIcons";

/* One menu's contents inside the desktop sheet: lead, link groups, featured
   card, on a 12-column grid. Type leads, no icon per row: a 15px title, an
   optional 13px caption in `secondary-text` (6.5:1; `inkSoft` is only
   4.4:1 at this size) and an 11px mono group label in `overcast` (4.8:1).
   A menu with a `strip` (Akashic: AI agents across every module) draws it as
   a dashed band under its groups, with the lead and the featured card
   spanning both rows; a menu with a `footer` closes on a hairline row of
   quiet links, Sign in at its right end. `compactFeature` moves the
   featured card into that row as one line (Akashic: the 1.0 release), so
   the groups get the card's columns. */

const SPAN: Record<NavSpan, string> = {
  2: "col-span-2",
  3: "col-span-3",
  4: "col-span-4",
  5: "col-span-5",
};

/* The strip spans exactly the columns its groups take. */
const STRIP_SPAN: Record<number, string> = {
  4: "col-span-4",
  5: "col-span-5",
  6: "col-span-6",
  7: "col-span-7",
  8: "col-span-8",
  9: "col-span-9",
};

export function MenuRow({ link, pathname }: { link: NavLink; pathname: string }) {
  return (
    <RegionLink
      href={link.href}
      aria-current={isCurrentPage(link.href, pathname) ? "page" : undefined}
      className={`group flex flex-col rounded-tile px-3 transition-colors duration-150 hover:bg-tertiary-bg focus-visible:bg-tertiary-bg aria-[current=page]:bg-tertiary-bg/70 ${
        link.caption ? "py-2" : "py-1.5"
      }`}
    >
      <span className="flex items-center gap-2 text-[15px] font-medium leading-snug text-ink">
        <span>{link.label}</span>
        {link.preview && <PreviewTag />}
        <Arrow className="-translate-x-1 text-blue opacity-0 transition duration-150 ease-settle group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100" />
      </span>
      {link.caption && <span className="mt-0.5 text-[13px] leading-snug text-secondary-text">{link.caption}</span>}
    </RegionLink>
  );
}

/** The dashed band for a capability that runs across every group. */
export function MenuStrip({ strip, className = "" }: { strip: NonNullable<NavMenu["strip"]>; className?: string }) {
  const { label, link } = strip;
  return (
    <RegionLink
      href={link.href}
      className={`group flex flex-wrap items-center gap-x-4 gap-y-1 rounded-tile border border-dashed border-blue/45 px-4 py-3 transition-colors duration-150 hover:border-blue hover:bg-tertiary-bg/60 focus-visible:bg-tertiary-bg/60 ${className}`}
    >
      <span className="font-mono text-[11px] font-medium uppercase tracking-eyebrow text-overcast">{label}</span>
      <span aria-hidden className="hidden h-3.5 w-px bg-lineSoft sm:block" />
      <span className="flex items-center gap-2 text-[15px] font-medium text-ink">
        {link.label}
        {link.preview && <PreviewTag />}
      </span>
      {link.caption && <span className="text-[13px] text-secondary-text">{link.caption}</span>}
      <Arrow className="ml-auto text-blue transition-transform duration-250 ease-settle group-hover:translate-x-0.5" />
    </RegionLink>
  );
}

/** The quiet foot row: plain links, the external ones marked, then an
    optional one-line feature and Sign in at the right end. */
export function MenuFoot({ links, feature, className = "" }: { links: NavLink[]; feature?: NavFeature; className?: string }) {
  const item = "inline-flex min-h-[32px] items-center gap-1 text-[14px] font-medium transition-colors duration-150";
  return (
    <div className={`flex flex-wrap items-center gap-x-7 gap-y-1 ${className}`}>
      {links.map((link) => (
        <RegionLink key={link.href} href={link.href} className={`${item} text-secondary-text hover:text-ink`}>
          {link.label}
          {link.external && <ArrowUpRight className="text-overcast" />}
        </RegionLink>
      ))}
      {feature && (
        <RegionLink
          href={feature.href}
          className="group inline-flex items-center gap-2.5 rounded-chip border border-subtle-stroke bg-primary-bg px-3 py-1.5 text-[13px] transition-colors duration-150 hover:border-blue-border sm:ml-auto"
        >
          <span className="font-mono text-[11px] font-medium uppercase tracking-eyebrow text-blue">{feature.eyebrow}</span>
          <span aria-hidden className="h-3 w-px bg-lineSoft" />
          <span className="text-ink">{feature.title}</span>
          <Arrow className="text-blue transition-transform duration-250 ease-settle group-hover:translate-x-0.5" />
        </RegionLink>
      )}
      <RegionLink href={NAV_SIGN_IN.href} className={`${item} text-blue hover:text-blue-hover ${feature ? "sm:ml-4" : "sm:ml-auto"}`}>
        {NAV_SIGN_IN.label} to Akashic
        <ArrowUpRight />
      </RegionLink>
    </div>
  );
}

export default function MenuPanel({ menu, drawn, pathname }: { menu: NavMenu; drawn: boolean; pathname: string }) {
  const { lead, groups, feature, strip, footer, compactFeature } = menu;
  const tall = strip ? "row-span-2" : "";
  const groupSpan = groups.reduce((sum, group) => sum + group.span, 0);

  return (
    <div className={`grid grid-cols-12 gap-x-8 pt-8 ${footer ? "pb-5" : "pb-9"}`}>
      <div className={`${SPAN[lead.span]} ${tall} border-r border-lineSoft pr-8`}>
        <p className="font-heading text-[24px] font-semibold leading-[1.15] tracking-[-0.02em] text-ink">{lead.title}</p>
        <p className="mt-3 text-balance text-[14px] leading-[1.55] text-secondary-text">{lead.text}</p>
        <RegionLink
          href={lead.href}
          aria-current={isCurrentPage(lead.href, pathname) ? "page" : undefined}
          className="group mt-5 inline-flex items-center gap-1.5 text-[14px] font-medium text-blue transition-colors duration-150 hover:text-blue-hover"
        >
          {lead.cta}
          <Arrow className="transition-transform duration-250 ease-settle group-hover:translate-x-0.5" />
        </RegionLink>
      </div>

      {groups.map((group) => {
        const headingId = `nav-${menu.id}-${group.heading.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
        return (
          <div key={group.heading} className={SPAN[group.span]}>
            <p id={headingId} className="px-3 pb-2.5 font-mono text-[11px] font-medium uppercase tracking-eyebrow text-overcast">
              {group.heading}
            </p>
            <ul aria-labelledby={headingId} className={group.twoColumn ? "grid grid-cols-2 gap-x-2 gap-y-0.5" : "space-y-0.5"}>
              {group.links.map((link) => (
                <li key={`${link.label}-${link.href}`}>
                  <MenuRow link={link} pathname={pathname} />
                </li>
              ))}
            </ul>
          </div>
        );
      })}

      {!compactFeature && <NavFeatured feature={feature} drawn={drawn} className={`${SPAN[feature.span]} ${tall} self-start`} />}

      {strip && <MenuStrip strip={strip} className={`${STRIP_SPAN[groupSpan] ?? "col-span-6"} mt-6 self-start`} />}

      {footer && (
        <MenuFoot links={footer} feature={compactFeature ? feature : undefined} className="col-span-12 mt-7 border-t border-lineSoft pt-3" />
      )}
    </div>
  );
}
