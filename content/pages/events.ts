/* ------------------------------------------------------------------ */
/*  Events page (added 15 Oct 2026)                                    */
/* ------------------------------------------------------------------ */
/* Every word on /events around the listings. The events are the events
   collection (content/collections/events.ts). Composer:
   app/events/page.tsx. */

import type { PageCloseBlock } from "../blocks";
import type { Seo } from "../types";

interface EventsSectionHead {
  num: string;
  label: string;
  setup: string;
  payoff: string;
}

export interface EventsPage {
  seo: Seo;
  hero: { label: string; setup: string; payoff: string; lede: string };
  /** `standing` stands in the date column for an event with no date. */
  upcoming: EventsSectionHead & { standing: string };
  invitations: EventsSectionHead & { lede: string; cta: string };
  close: PageCloseBlock;
}

export const eventsPage: EventsPage = {
  seo: {
    title: "Events",
    description:
      "Launches, briefings and walkthroughs. Where to see Akashic working and meet the team that builds it: the Akashic 1.0 launch, and walkthroughs built around your own use case.",
    path: "/events",
  },
  hero: {
    label: "Events",
    setup: "Events.",
    payoff: "Launches, briefings and walkthroughs.",
    lede: "Where to see Akashic working and meet the team that builds it: the Akashic 1.0 launch, and walkthroughs built around your own use case.",
  },
  upcoming: {
    num: "01",
    label: "Upcoming",
    setup: "What is next.",
    payoff: "And what you can book any day.",
    standing: "Any weekday",
  },
  invitations: {
    num: "02",
    label: "Invitations",
    setup: "Hear about the next one.",
    payoff: "Invitations, by email.",
    lede: "Launches, briefings and recordings as they are published. No more than one email a month.",
    cta: "Get invitations",
  },
  close: {
    label: "Talk to our team",
    setup: "Prefer a session of your own?",
    payoff: "We will build it around your data.",
    body: "Bring one priority use case. A solutions architect walks through Akashic on a problem like yours.",
    primary: { label: "Book a walkthrough", href: "#talk-to-our-team" },
    secondary: { label: "Read Insights", href: "/insights" },
  },
};
