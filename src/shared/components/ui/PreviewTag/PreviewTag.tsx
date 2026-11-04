"use client";

import { useUi } from "@/shared/providers/UiProvider";
import { cx } from "@/shared/utils/cx";
import styles from "./PreviewTag.module.scss";

/* The site's one status mark for capabilities that ship in preview (AI
   agents in Data Pipelines and Master Data, 30 Sep 2026). Dashed, like every
   not-yet-general line in the drawings: solid means live. Never a sparkle
   or a gradient; the word does the work.
   Lives in ui/ (not sections/akashic) because the nav and the /akashic
   demos both carry it, and neither may import from sections/. */
export interface PreviewTagProps {
  className?: string;
}

export function PreviewTag({ className = "" }: PreviewTagProps) {
  const ui = useUi();
  return (
    <span
      className={cx(styles.tag, className)}
    >
      {ui.preview}
    </span>
  );
}
