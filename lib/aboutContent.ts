export const ABOUT_STORY = {
  conviction: {
    label: "Why we exist",
    setup: "Data first.",
    title: "AI built on it.",
    intro: "Useful intelligence starts with information people can trust. That has been our focus from the beginning.",
    beliefs: [
      { title: "Bring the records together.", body: "Connect information scattered across systems, documents and streams." },
      { title: "Build a foundation people trust.", body: "Resolve, govern and trace the data before asking more of it." },
      { title: "Put intelligence to work.", body: "Build AI on that foundation, for the people making decisions." },
    ],
  },
  journey: {
    label: "Our journey",
    setup: "Eight years of layers.",
    title: "One foundation.",
    intro: "Above the line, what we built, release by release. Below the line, national programmes, live since 2020.",
  },
  method: {
    label: "How we work",
    setup: "Built for the work.",
    title: "Ready for daily use.",
    intro: "Products, platforms and intelligence, connected to the systems your people already use.",
    principles: [
      { title: "Start with the need.", body: "Understand the people and the decision before choosing the architecture." },
      { title: "Stay through daily use.", body: "Build for reliability in production, beyond the first launch." },
      { title: "Leave ownership with you.", body: "Your data and technology stay under your control." },
    ],
    layers: [
      { title: "Products", body: "Applications people use." },
      { title: "Platforms", body: "Akashic, the shared foundation." },
      { title: "Intelligence", body: "AI connected to the underlying data." },
    ],
  },
  vision: {
    label: "Our ambition",
    setup: "Intelligence as",
    title: "public infrastructure.",
    intro: "Citizens should tell their story once. Our ambition is a governed foundation connecting public systems.",
    evidenceLabel: "Our delivery record in India",
    deployments: [
      { name: "National Learning Platform", value: "187M+", detail: "enrolments resolved", sector: "Education" },
      { name: "National Immunisation Registry", value: "2 Billion+", detail: "dose records reconciled", sector: "Health" },
      { name: "Overseas Employment Registry", value: "4M+", detail: "worker clearances reconciled", sector: "Labour" },
    ],
  },
  people: {
    label: "Leadership",
    setup: "Meet the leaders",
    title: "behind our work.",
    intro: "Engineering, solutions, people and partnerships, brought together by a shared commitment to the work.",
  },
  /* DRAFT for review (7 Oct 2026). Rules are the three real sikku kolam
     rules; each pairs with how the team works. No location or work mode
     claims, no national systems (owned by journey and vision), and no count
     of open roles: the invitation names teams people join, so nothing here
     has to track the jobs board. */
  culture: {
    label: "Our culture",
    setup: "A kolam has three rules.",
    title: "So do we.",
    intro: "Every morning, South Indian homes draw a kolam at the doorstep: one line around every dot.",
    rules: [
      { rule: "Loop every dot.", title: "Everyone is looped in.", body: "Plans and numbers reach everyone. Credit does too, fresher to founder." },
      { rule: "Never lift the hand.", title: "Learning never stops.", body: "AI changes faster than any syllabus. Seniors and freshers learn together." },
      { rule: "End where you began.", title: "We close the loop.", body: "First look to last fix, one owner. Then teach the next person." },
    ],
    /* The invitation, not a fourth rule: unnumbered, one ink line, its own
       band. The link text differs from the close's "Explore careers". */
    welcome: {
      label: "At the doorstep",
      title: "Find your seat.",
      body: "Every team here is a way in, from internships to applied research.",
      link: "See where you fit",
    },
    /* Teams people join, never a count of open roles. */
    teams: [
      { group: "Build", items: ["Product engineering", "AI/ML"] },
      { group: "Discover", items: ["Data science", "Applied research"] },
      { group: "Foundations", items: ["Data engineering", "Distributed systems"] },
      { group: "Ways in", items: ["Freshers", "Internships"] },
    ],
    redraw: "Draw another",
    redrawNote: "Same rules, any shape.",
  },
  close: {
    label: "What comes next",
    setup: "Build something",
    title: "people rely on.",
    intro: "Tell us what needs to work better. We will start with the data, the people and the decision.",
    careers: "Make your next chapter count.",
    careersBody: "Explore opportunities to build data and AI systems with DHIRA.",
  },
} as const;

export interface AboutLeader {
  id: string;
  name: string;
  role: string;
  focus: string;
  image: string;
  imageClass: string;
}

export const ABOUT_LEADERS: readonly AboutLeader[] = [
  { id: "dilip", name: "Dilip Hanumara", role: "Founder and CEO", focus: "Company direction and architecture strategy.", image: "/avatars/dilip-executive-v1.webp", imageClass: "object-center" },
  { id: "sirish", name: "Sirish Simha", role: "Head of Technology", focus: "Platform engineering and distributed systems.", image: "/avatars/sirish-executive-v1.webp", imageClass: "object-center" },
  { id: "rupa", name: "Rupa Sridhar", role: "Head of Solutions", focus: "Enterprise AI and data systems.", image: "/avatars/rupa-executive-v1.webp", imageClass: "object-center" },
  { id: "rajiv", name: "Rajiv Kumar", role: "Head of Talent and HR", focus: "Engineering culture and team development.", image: "/avatars/rajiv-executive-v1.webp", imageClass: "object-center" },
  { id: "pratheep", name: "Pratheep Menon", role: "Head of Business Development", focus: "Strategic partnerships and enterprise relationships.", image: "/avatars/pratheep-executive-v1.webp", imageClass: "object-center" },
];

export type Milestone = {
  year: number;
  label?: string;
  at: number;
  up: boolean;
  month: boolean;
  title: string;
  body: string;
};

export const ABOUT_MILESTONES: Milestone[] = [
  { year: 2018, at: 2018.5, up: true, month: false, title: "DHIRA founded", body: "A data company from day one. New York and Hyderabad." },
  { year: 2019, label: "Mid 2019", at: 2019.5, up: false, month: true, title: "Akashic research begins", body: "One governed knowledge layer for every source." },
  { year: 2020, label: "Late 2020", at: 2020.9, up: true, month: true, title: "Country scale", body: "First national digital public infrastructure, live." },
  { year: 2022, at: 2022.5, up: false, month: false, title: "Akashic launches", body: "Pipelines, data warehousing and BI on a cloud agnostic platform." },
  { year: 2023, label: "Mid 2023", at: 2023.5, up: true, month: true, title: "First programme live", body: "National Learning Platform, running on Akashic." },
  { year: 2025, at: 2025.5, up: true, month: false, title: "Two state AI awards", body: "Telangana AI Rising. Maha Hackathon." },
];
