import Link from "next/link";
import PreviewTag from "@/components/ui/PreviewTag";
import { isCurrentPage, type NavLink, type NavMenu, type NavSpan } from "@/lib/navigation";
import NavFeatured from "./NavFeatured";
import { Arrow } from "./NavIcons";

/* One menu's contents inside the desktop sheet: lead, link groups, featured
   card, on a 12-column grid. Type leads, no icon per row: a 15px title, an
   optional 13px caption in `secondary-text` (6.5:1; `inkSoft` is only
   4.4:1 at this size) and an 11px mono group label in `overcast` (4.8:1). */

const SPAN: Record<NavSpan, string> = {
  2: "col-span-2",
  3: "col-span-3",
  4: "col-span-4",
  5: "col-span-5",
};

export function MenuRow({ link, pathname }: { link: NavLink; pathname: string }) {
  return (
    <Link
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
    </Link>
  );
}

export default function MenuPanel({ menu, drawn, pathname }: { menu: NavMenu; drawn: boolean; pathname: string }) {
  const { lead, groups, feature } = menu;

  return (
    <div className="grid grid-cols-12 gap-x-8 pb-9 pt-8">
      <div className={`${SPAN[lead.span]} border-r border-lineSoft pr-8`}>
        <p className="font-heading text-[24px] font-semibold leading-[1.15] tracking-[-0.02em] text-ink">{lead.title}</p>
        <p className="mt-3 text-balance text-[14px] leading-[1.55] text-secondary-text">{lead.text}</p>
        <Link
          href={lead.href}
          aria-current={isCurrentPage(lead.href, pathname) ? "page" : undefined}
          className="group mt-5 inline-flex items-center gap-1.5 text-[14px] font-medium text-blue transition-colors duration-150 hover:text-blue-hover"
        >
          {lead.cta}
          <Arrow className="transition-transform duration-250 ease-settle group-hover:translate-x-0.5" />
        </Link>
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

      <NavFeatured feature={feature} drawn={drawn} className={`${SPAN[feature.span]} self-start`} />
    </div>
  );
}
