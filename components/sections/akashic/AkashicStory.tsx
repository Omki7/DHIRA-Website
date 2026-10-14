import type { ReactNode } from "react";

export function StoryLabel({ number, children }: { number: string; children: ReactNode }) {
  return <p className="ak-story-label"><span>[{number}]</span>{children}</p>;
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
