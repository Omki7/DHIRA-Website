import RegionLink from "@/components/ui/RegionLink";
import type { NavAnnouncement } from "@/content/navigation";
import { Arrow } from "./NavIcons";

/* The founder's launch line. Sits ABOVE the sticky header in normal flow, so
   it scrolls away and the header keeps its 72px (sticky offsets across ~78
   files are measured against it). One link, quiet: white ground, hairline
   under, mono label in blue. z-[45]: above the menu scrim (z-40), so it
   stays crisp like the header. Renders nothing when the Navigation document's announcement is null. */
export default function AnnouncementBar({ announcement }: { announcement: NavAnnouncement | null }) {
  if (!announcement) return null;
  const { label, text, href, cta } = announcement;

  return (
    <div className="nav-announce relative z-[45] border-b border-subtle-stroke bg-background">
      <RegionLink
        href={href}
        className="group mx-auto flex h-9 max-w-[1440px] items-center justify-center gap-2.5 px-4 text-[12px] sm:px-6 sm:text-[13px] lg:px-8"
      >
        <span className="font-mono text-[11px] font-medium uppercase tracking-eyebrow text-blue">{label}</span>
        <span aria-hidden className="h-3 w-px bg-line" />
        <span className="text-secondary-text">{text}</span>
        <span className="hidden items-center gap-1 font-medium text-ink transition-colors duration-150 group-hover:text-blue sm:inline-flex">
          {cta}
          <Arrow className="transition-transform duration-200 ease-settle group-hover:translate-x-0.5" />
        </span>
        <Arrow className="text-ink sm:hidden" />
      </RegionLink>
    </div>
  );
}
