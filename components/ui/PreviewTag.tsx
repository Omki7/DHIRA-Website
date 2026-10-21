"use client";

import { useUi } from "@/components/providers/UiProvider";

/* The site's one status mark for capabilities that ship in preview (AI
   agents in Data Pipelines and Master Data, 30 Sep 2026). Dashed, like every
   not-yet-general line in the drawings: solid means live. Never a sparkle
   or a gradient; the word does the work.
   Lives in ui/ (not sections/akashic) because the nav and the /akashic
   demos both carry it, and neither may import from sections/. */
export default function PreviewTag({ className = "" }: { className?: string }) {
  const ui = useUi();
  return (
    <span
      className={`inline-flex items-center rounded-chip border border-dashed border-blue px-1.5 font-mono text-[9.5px] font-medium uppercase leading-[1.6] tracking-[0.08em] text-blue ${className}`}
    >
      {ui.preview}
    </span>
  );
}
