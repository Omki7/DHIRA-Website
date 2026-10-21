/* ------------------------------------------------------------------ */
/*  Events (added 15 Oct 2026)                                         */
/* ------------------------------------------------------------------ */
/* Only events that exist. The launch is the founder's GA date; the
   walkthrough is his standing offer ("Book a 30-minute walkthrough of
   Akashic 1.0, Enterprise Intelligence or IPMS, built around one of your
   priority use cases"). No invented conferences, speakers or recordings.
   DRAFT: the launch format (online) and time need the founder's
   confirmation. Add past events with their recordings as they happen.
   Read through getEvents(). */

import type { Cta } from "../types";

export interface DhiraEvent {
  id: string;
  title: string;
  /** ISO date, or null for a standing, on-request session. */
  date: string | null;
  format: string;
  line: string;
  /** "#talk-to-our-team" opens the contact modal. */
  cta: Cta;
}

export const events: DhiraEvent[] = [
  {
    id: "akashic-1-0-launch",
    title: "Akashic 1.0 launch",
    date: "2026-11-01",
    format: "Online",
    line: "Every module on one governed foundation: what is generally available, what stays in preview, and a live walkthrough.",
    cta: { label: "Register", href: "#talk-to-our-team" },
  },
  {
    id: "walkthrough",
    title: "A 30-minute walkthrough, on your use case",
    date: null,
    format: "Online or in person",
    line: "Akashic 1.0, Enterprise Intelligence or IPMS, built around one of your priority use cases.",
    cta: { label: "Book a walkthrough", href: "#talk-to-our-team" },
  },
];
