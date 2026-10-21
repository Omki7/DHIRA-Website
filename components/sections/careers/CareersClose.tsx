"use client";

/*
 * [05] Close: "Built something real? Let's talk."
 *
 * Built on `ui/DrawingSetClose` (`bg-ink`, Rule 5b), the same card and title
 * block the /about close ends on, so the two Company pages close the same
 * way. Its stamp is the hero's empty chair.
 *
 * Carries #talk-to-our-team, which every Apply link on the page targets.
 */

import Link from "next/link";
import DrawingSetClose, { type TitleCell } from "@/components/ui/DrawingSetClose";
import type { Role } from "@/content/collections/roles";
import type { CareersPage } from "@/content/pages/careers";

function ChairStamp() {
  return (
    <svg viewBox="0 0 96 64" className="h-14 w-20" aria-hidden>
      <rect x="10" y="8" width="76" height="20" rx="6" fill="none" stroke="rgb(var(--background))" strokeOpacity="0.25" strokeWidth="1.3" />
      <rect x="10" y="36" width="76" height="20" rx="6" fill="none" stroke="rgb(var(--blue-400))" strokeWidth="1.6" />
      <line x1="48" y1="28" x2="48" y2="36" stroke="rgb(var(--blue-400))" strokeWidth="1.4" />
    </svg>
  );
}

export default function CareersClose({ content, roles }: { content: CareersPage["close"]; roles: Role[] }) {
  const { cells } = content;
  const titleBlock: TitleCell[] = [
    cells.company,
    { label: cells.seats, value: String(roles.length) },
    cells.answer,
    cells.sheet,
  ];
  return (
    <DrawingSetClose
      num={content.num}
      label={content.label}
      setup={content.setup}
      payoff={content.payoff}
      body={content.body}
      actions={
        <>
          <Link href={content.primary.href} className="btn-primary btn-lg">
            {content.primary.label}
          </Link>
          <Link href={content.secondary.href} className="btn-secondary btn-lg">
            {content.secondary.label}
          </Link>
        </>
      }
      cells={titleBlock}
      wide={content.where}
      drawnBy={content.drawnBy}
      stamp={<ChairStamp />}
      anchors={["login"]}
    />
  );
}
