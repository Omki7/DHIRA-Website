import type { NavAnnouncement } from "@/content/navigation";
import { Arrow } from "@/shared/components/icons/NavIcons";
import { RegionLink } from "@/shared/components/navigation/RegionLink";
import styles from "./AnnouncementBar.module.scss";

/* The founder's launch line. Sits ABOVE the sticky header in normal flow, so
   it scrolls away and the header keeps its 72px (sticky offsets across ~78
   files are measured against it). One link, quiet: white ground, hairline
   under, mono label in blue. z-[45]: above the menu scrim (z-40), so it
   stays crisp like the header. Renders nothing when the Navigation document's announcement is null. */
export interface AnnouncementBarProps {
  announcement: NavAnnouncement | null;
}

export function AnnouncementBar({ announcement }: AnnouncementBarProps) {
  if (!announcement) return null;
  const { label, text, href, cta } = announcement;

  return (
    <div className={`nav-announce ${styles.root}`}>
      <RegionLink href={href} className={styles.link}>
        <span className={styles.label}>{label}</span>
        <span aria-hidden className={styles.divider} />
        <span className={styles.text}>{text}</span>
        <span className={styles.cta}>
          {cta}
          <Arrow className={styles.ctaArrow} />
        </span>
        <Arrow className={styles.compactArrow} />
      </RegionLink>
    </div>
  );
}
