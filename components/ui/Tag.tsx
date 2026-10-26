import type { ReactNode } from "react";
import PreviewTag from "@/components/ui/PreviewTag";

/* The site's tag: a short name read as part of a set (scope, deliverables,
   modules, systems), never a bullet list (DESIGN_SYSTEM §7, Lists; user,
   26 Oct 2026: bullets read legacy). Three words or fewer. `tone` carries
   meaning, not decoration: `akashic` for an Akashic module, `custom` for
   work on your own stack, `muted` for a name at rest in a figure, `neutral`
   otherwise. A preview item is dashed and carries the PreviewTag. */
const TONES = {
  neutral: "border-card-line bg-background text-ink",
  muted: "border-line bg-background text-secondary-text",
  akashic: "border-blue-border bg-blue-subtle text-blue",
  custom: "border-ink bg-background text-ink",
} as const;

export default function Tag({
  children,
  tone = "neutral",
  preview = false,
  className = "",
}: {
  children: ReactNode;
  tone?: keyof typeof TONES;
  preview?: boolean;
  className?: string;
}) {
  return (
    <span className={`inline-flex h-7 items-center gap-1.5 whitespace-nowrap rounded-full border px-3 text-[12.5px] font-medium ${TONES[tone]} ${preview ? "border-dashed" : ""} ${className}`}>
      {children}
      {preview && <PreviewTag />}
    </span>
  );
}
