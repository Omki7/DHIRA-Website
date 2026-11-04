import type { ReactNode } from "react";
import { FigureEyebrow } from "@/shared/components/ui";
import styles from "./AkashicStory.module.scss";

export interface StoryLabelProps {
  number: string;
  children: string;
  tag?: ReactNode;
  tone?: "light" | "depth" | "card";
}

/* The /akashic section label IS the site's one eyebrow (ui/FigureEyebrow):
   dashed rail, `[NN]  LABEL`, left. It rendered its own unruled mono line
   until 20 Oct 2026, which is what made /akashic read differently from the
   homepage (founder: one eyebrow format across the site). `tag` sets a
   required status mark after the label (PreviewTag on agents); `tone="card"`
   drops the rail inside the closing card. */
export function StoryLabel({
  number,
  children,
  tag,
  tone = "light",
}: StoryLabelProps) {
  return (
    <FigureEyebrow
      num={number}
      label={children}
      tag={tag}
      dark={tone === "depth"}
      bare={tone === "card"}
    />
  );
}

export interface StoryTitleProps {
  setup: string;
  children: ReactNode;
}

export function StoryTitle({ setup, children }: StoryTitleProps) {
  return (
    <h2 className={styles.title}>
      <span>{setup}</span>
      <br />
      {children}
    </h2>
  );
}

export function StoryArrow() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={styles.arrow}
    >
      <path d="M4 12h15M13 5l7 7-7 7" />
    </svg>
  );
}

/* Promoted to ui/ (14 Oct 2026) so the nav can carry it too; re-exported
   here so the section imports keep working. */
export { PreviewTag } from "@/shared/components/ui";
