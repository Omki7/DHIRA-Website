import type { ReactNode } from "react";
import FigureEyebrow from "@/components/ui/FigureEyebrow";

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
}: {
  number: string;
  children: string;
  tag?: ReactNode;
  tone?: "light" | "depth" | "card";
}) {
  return <FigureEyebrow num={number} label={children} tag={tag} dark={tone === "depth"} bare={tone === "card"} />;
}

export function StoryTitle({ setup, children }: { setup: string; children: ReactNode }) {
  return <h2 className="ak-story-title"><span>{setup}</span><br />{children}</h2>;
}

export function StoryArrow() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5 shrink-0"><path d="M4 12h15M13 5l7 7-7 7" /></svg>;
}

/* Promoted to ui/ (14 Oct 2026) so the nav can carry it too; re-exported
   here so the section imports keep working. */
export { default as PreviewTag } from "@/components/ui/PreviewTag";
