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
import { ROLES } from "@/lib/careersRoles";

const TITLE_BLOCK: TitleCell[] = [
  { label: "Company", value: "DHIRA" },
  { label: "Seats open", value: String(ROLES.length) },
  { label: "Answer", value: "Yes or no" },
  { label: "Sheet", value: "05 of 05" },
];

function ChairStamp() {
  return (
    <svg viewBox="0 0 96 64" className="h-14 w-20" aria-hidden>
      <rect x="10" y="8" width="76" height="20" rx="6" fill="none" stroke="#FFFFFF" strokeOpacity="0.25" strokeWidth="1.3" />
      <rect x="10" y="36" width="76" height="20" rx="6" fill="none" stroke="#8AA8FB" strokeWidth="1.6" />
      <line x1="48" y1="28" x2="48" y2="36" stroke="#8AA8FB" strokeWidth="1.4" />
    </svg>
  );
}

export default function CareersClose() {
  return (
    <DrawingSetClose
      num="05"
      label="Talk to us"
      setup="Built something real?"
      payoff={<>Let&rsquo;s talk.</>}
      body="Share shipped work and the role you want. Every note gets an answer."
      actions={
        <>
          <Link href="/#get-started" className="btn-primary-invert btn-lg">
            Talk to our team
          </Link>
          <Link href="/about#people" className="btn-secondary-invert btn-lg">
            Meet the team
          </Link>
        </>
      }
      cells={TITLE_BLOCK}
      wide={{ label: "Where", value: <>New York &middot; Hyderabad &middot; Bangalore &middot; Remote</> }}
      drawnBy="A small team shipping across three time zones."
      stamp={<ChairStamp />}
      anchors={["login"]}
    />
  );
}
