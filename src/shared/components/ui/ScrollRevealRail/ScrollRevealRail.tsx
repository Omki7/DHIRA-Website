import { cx } from "@/shared/utils/cx";
import styles from "./ScrollRevealRail.module.scss";

export interface ScrollRevealRailProps {
  children: React.ReactNode;
  className?: string;
}

/* The centred 1440px column every section sits in, with the site's side
   gutters. It used to draw a hairline and a gold scroll trail down both
   edges; those were removed on every page on 15 Oct 2026 (user), so the
   column is now invisible and only sets width and padding. */
export function ScrollRevealRail({ children, className }: ScrollRevealRailProps) {
  return (
    <div className={cx(styles.root, className)}>
      <div className={styles.gutter}>{children}</div>
    </div>
  );
}
