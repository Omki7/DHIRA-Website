/*
 * A section's one onward link: a quiet text link with an arrow, set UNDER the
 * lede inside `ui/SectionHeader` (pass it as `children`). Never a button and
 * never at the section's foot: sections end on their content (DESIGN_SYSTEM,
 * "Section grammar", founder 20 Oct 2026).
 */

import Link from "next/link";
import { cx } from "@/shared/utils/cx";
import styles from "./SectionLink.module.scss";

export interface SectionLinkProps {
  href: string;
  children: string;
  tone?: "light" | "depth";
}

export function SectionLink({ href, children, tone = "light" }: SectionLinkProps) {
  return (
    <Link
      href={href}
      className={cx(styles.link, tone === "depth" ? styles.depth : styles.light)}
    >
      {children}
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" className={styles.arrow} aria-hidden>
        <path d="M3 10h13m-5-5 5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </Link>
  );
}
