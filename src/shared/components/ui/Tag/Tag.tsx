import type { ReactNode } from "react";
import { PreviewTag } from "@/shared/components/ui/PreviewTag";
import { cx } from "@/shared/utils/cx";
import styles from "./Tag.module.scss";

/* The site's tag: a short name read as part of a set (scope, deliverables,
   modules, systems), never a bullet list (DESIGN_SYSTEM §7, Lists; user,
   26 Oct 2026: bullets read legacy). Three words or fewer. `tone` carries
   meaning, not decoration: `akashic` for an Akashic module, `custom` for
   work on your own stack, `muted` for a name at rest in a figure, `neutral`
   otherwise. A preview item is dashed and carries the PreviewTag. */
const TONES = {
  neutral: styles.neutral,
  muted: styles.muted,
  akashic: styles.akashic,
  custom: styles.custom,
} as const;

export interface TagProps {
  children: ReactNode;
  tone?: keyof typeof TONES;
  preview?: boolean;
  className?: string;
}

export function Tag({
  children,
  tone = "neutral",
  preview = false,
  className = "",
}: TagProps) {
  return (
    <span className={cx(styles.tag, TONES[tone], preview && styles.preview, className)}>
      {children}
      {preview && <PreviewTag />}
    </span>
  );
}
