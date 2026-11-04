import { cx } from "@/shared/utils/cx";
import styles from "./NavIcons.module.scss";

/* Small stroke icons shared by the desktop sheet and the mobile drawer. */

export interface ChevronProps {
  open?: boolean;
  className?: string;
}

export function Chevron({ open = false, className = "" }: ChevronProps) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      className={cx(styles.chevron, open && styles.open, className)}
    >
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.5 6.25 8 9.75l3.5-3.5" />
    </svg>
  );
}

export interface ChevronRightProps {
  className?: string;
}

export function ChevronRight({ className = "" }: ChevronRightProps) {
  return (
    <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden className={cx(styles.icon, className)}>
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6.25 4.5 9.75 8l-3.5 3.5" />
    </svg>
  );
}

export interface ArrowProps {
  className?: string;
}

export function Arrow({ className = "" }: ArrowProps) {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden className={cx(styles.icon, className)}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.85 6.85a.5.5 0 0 0 0-.7L8.35 3.65a.5.5 0 1 0-.7.7L9.29 6H2.5a.5.5 0 0 0 0 1h6.79L7.65 8.65a.5.5 0 1 0 .7.7l2.5-2.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

export interface ArrowUpRightProps {
  className?: string;
}

/** Marks a link that leaves the site (the Akashic app, the docs). */
export function ArrowUpRight({ className = "" }: ArrowUpRightProps) {
  return (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden className={cx(styles.icon, className)}>
      <path d="M3 8 8 3M4 3h4v4" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export interface BackArrowProps {
  className?: string;
}

export function BackArrow({ className = "" }: BackArrowProps) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden className={cx(styles.icon, className)}>
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12.5 8h-9M7 4.5 3.5 8 7 11.5" />
    </svg>
  );
}

export function MenuIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 6H3M15 12H3" />
    </svg>
  );
}

export function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.5 4.5l9 9M13.5 4.5l-9 9" />
    </svg>
  );
}
