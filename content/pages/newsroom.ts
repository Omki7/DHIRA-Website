/* ------------------------------------------------------------------ */
/*  Newsroom hub and press release template                            */
/* ------------------------------------------------------------------ */
/* Announcements, recognition and the media kit. The releases are the
   press releases collection (content/collections/press-releases.ts); the
   leadership portraits are the leaders collection. Recognition is the
   site's existing proof points. Composers: app/newsroom/page.tsx and
   app/newsroom/[slug]/page.tsx.

   DRAFT: the boilerplate needs review before distribution. */

import type { PageCloseBlock } from "../blocks";
import { mailto, site } from "../site";
import type { PageSection, Seo } from "../types";

export interface NewsroomPage {
  seo: Seo;
  sections: PageSection[];
  sectionsLabel: string;
  hero: { label: string; setup: string; payoff: string; lede: string };
  announcements: { num: string; label: string; setup: string; payoff: string; lede: string; kind: string };
  recognition: { label: string; setup: string; payoff: string; items: { year: string; name: string; detail: string }[] };
  mediaKit: {
    label: string;
    setup: string;
    payoff: string;
    lede: string;
    logos: { name: string; note: string; file: string; dark: boolean }[];
    colours: { name: string; value: string }[];
    typeface: string;
    labels: { marks: string; download: string; boilerplate: string; colours: string; typeface: string; leadership: string; portrait: string };
  };
  boilerplate: string;
  close: PageCloseBlock;
  release: { crumb: string; kind: string; readingHeading: string; close: PageCloseBlock };
}

export const newsroomPage: NewsroomPage = {
  seo: {
    title: "Newsroom",
    description:
      "News, recognition and the media kit. Announcements from DHIRA and Akashic, the recognition the team has earned, and what a journalist needs to write about either.",
    path: "/newsroom",
  },
  sections: [
    { id: "hero", label: "Newsroom" },
    { id: "announcements", label: "Announcements" },
    { id: "recognition", label: "Recognition" },
    { id: "media-kit", label: "Media kit" },
    { id: "talk-to-our-team", label: "Media contact" },
  ],
  sectionsLabel: "Newsroom sections",
  hero: {
    label: "Newsroom",
    setup: "Newsroom.",
    payoff: "News, recognition and the media kit.",
    lede: "Announcements from DHIRA and Akashic, the recognition the team has earned, and what a journalist needs to write about either.",
  },
  announcements: {
    num: "01",
    label: "Announcements",
    setup: "What we have announced.",
    payoff: "Newest first.",
    lede: "Product releases and company news, each with its full release and media contact.",
    kind: "Press release",
  },
  recognition: {
    label: "Recognition",
    setup: "Recognised by the people",
    payoff: "who run public technology.",
    items: [
      { year: "2025", name: "Maha Hackathon", detail: "Winner" },
      { year: "2025", name: "Telangana AI Rising", detail: "Winner" },
      { year: "", name: "Startup India", detail: "DPIIT-recognised startup" },
    ],
  },
  mediaKit: {
    label: "Media kit",
    setup: "Logos, people and words.",
    payoff: "Everything to write the story.",
    lede: "Use the marks as supplied, on a clear ground. Please keep DHIRA (the company) and Akashic (the platform) distinct in copy.",
    logos: [
      { name: "DHIRA mark", note: "For light grounds", file: "/brand/dhira-mark.svg", dark: false },
      { name: "DHIRA mark, reversed", note: "For dark grounds", file: "/brand/dhira-mark-white.svg", dark: true },
      { name: "Akashic mark", note: "For light grounds", file: "/brand/akashic-mark.svg", dark: false },
    ],
    colours: [
      { name: "Slate ink", value: "#233247" },
      { name: "DHIRA blue", value: "#365DCE" },
      { name: "Pastel blue", value: "#EDF3FC" },
      { name: "Porcelain", value: "#FCFDFE" },
      { name: "Midnight", value: "#0B1220" },
      { name: "Moonlight blue", value: "#9AB8FF" },
    ],
    typeface: "Google Sans and Google Sans Mono",
    labels: {
      marks: "Marks",
      download: "Download SVG",
      boilerplate: "Boilerplate",
      colours: "Colours and type",
      typeface: "Typeface:",
      leadership: "Leadership",
      portrait: "Portrait",
    },
  },
  boilerplate: site.boilerplate,
  close: {
    label: "Media contact",
    setup: "Writing about DHIRA or Akashic?",
    payoff: "Reach the team directly.",
    body: "Interview requests, product briefings and fact checks go to one inbox, read by the people who can answer.",
    primary: { label: "Email the press team", href: mailto("Press enquiry") },
    secondary: { label: "Get the media kit", href: "#media-kit" },
  },
  release: {
    crumb: "Newsroom",
    kind: "Press release",
    readingHeading: "From Insights",
    close: {
      label: "Media contact",
      setup: "Writing about this announcement?",
      payoff: "Reach the team directly.",
      body: "Interview requests, product briefings and fact checks go to one inbox.",
      primary: { label: "Email the press team", href: mailto("Press enquiry") },
      secondary: { label: "Get the media kit", href: "/newsroom#media-kit" },
    },
  },
};
