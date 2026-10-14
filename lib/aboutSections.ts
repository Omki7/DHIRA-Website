import type { PageSection } from "./pageSection";

export const ABOUT_HERO = {
  setup: "Built on data.",
  headline: "Proven in production.",
  description: "Since 2018, DHIRA has built data and AI systems for governments and enterprises. We give people a foundation for decisions they can explain and stand behind.",
  proof: [
    { value: "2018", label: "Founded, data first" },
    { value: "3", label: "National programmes live" },
    { value: "In-country", label: "Your cloud or data centre" },
  ],
  visual: {
    sources: ["Records", "Documents", "Streams"],
    foundation: "One governed foundation",
    outcome: "Decisions",
    caption: "Every answer, connected to its source.",
  },
};

export const ABOUT_GROWTH_ERAS = [
  { title: "Data engineering", period: "2018 to 2019", from: 2018, to: 2019, milestone: "Akashic research begins", year: 2019 },
  { title: "Country scale", period: "2020 to 2021", from: 2020, to: 2021, milestone: "Country scale", year: 2020 },
  { title: "Akashic and AI", period: "Since 2022", from: 2022, to: Infinity, milestone: "Akashic launches", year: 2022 },
] as const;

export const ABOUT_SECTIONS: PageSection[] = [
  { id: "hero", label: "About" },
  { id: "why-we-exist", label: "Why we exist" },
  { id: "journey", label: "Journey" },
  { id: "vision", label: "Vision" },
  { id: "people", label: "People" },
  { id: "culture", label: "Culture" },
  { id: "talk-to-our-team", label: "Join us" },
];
