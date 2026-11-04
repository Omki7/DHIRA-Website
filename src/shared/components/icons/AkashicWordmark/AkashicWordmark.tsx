import type { ReactNode } from "react";
import { AkashicLogo } from "@/shared/components/icons/AkashicLogo";
import { cx } from "@/shared/utils/cx";
import styles from "./AkashicWordmark.module.scss";

export interface AkashicWordmarkProps {
  className?: string;
  primaryColor?: string;
  accentColor?: string;
}

/*
 * The Akashic wordmark: the logo stands in for the "A", then "kashic".
 * THE way Akashic is written wherever it stands alone as a name (badges,
 * labels, menu titles, card headers, the [03] base, mockup chrome); inside
 * a sentence it stays the plain word (user, 21 Oct 2026). Sized in em, so
 * it takes the size, weight, colour and case of the text around it.
 * Screen readers hear "Akashic".
 */
export function AkashicWordmark({ className = "", primaryColor, accentColor }: AkashicWordmarkProps) {
  return (
    <span className={cx(styles.wordmark, className)}>
      <span className={styles.srOnly}>Akashic</span>
      <AkashicLogo className={styles.logo} primaryColor={primaryColor} accentColor={accentColor} />
      <span aria-hidden="true" className={styles.rest}>
        kashic
      </span>
    </span>
  );
}

/** For content-driven labels: the wordmark when the label is the bare name
    "Akashic", the text as given otherwise ("Ask Akashic", "Akashic 1.0"). */
export function nameOrWordmark(label: string): ReactNode {
  return label.trim() === "Akashic" ? <AkashicWordmark /> : label;
}
