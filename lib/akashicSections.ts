export interface AkashicSection {
  id: string;
  label: string;
  preview: string;
  eyebrow?: string;
}

export const AKASHIC_SECTIONS: AkashicSection[] = [
  {
    id: "hero",
    label: "Introduction",
    preview: "Every answer your business needs is already in your data.",
  },
  {
    id: "platform-screens",
    label: "Platform screens",
    preview: "The product, on seven screens.",
  },
  {
    id: "akashic-in-action",
    label: "Akashic in action",
    preview: "Ask a real question. Watch Akashic answer it.",
    eyebrow: "[01]",
  },
  {
    id: "how-it-works",
    label: "How it works",
    preview: "That answer took seven modules. Here they are.",
    eyebrow: "[02]",
  },
  {
    id: "architecture",
    label: "Your architecture",
    preview: "Deploy where your data has to live.",
    eyebrow: "[03]",
  },
  {
    id: "modules",
    label: "How it composes",
    preview: "Seven modules. Three layers. One circuit.",
    eyebrow: "[04]",
  },
  {
    id: "trust",
    label: "Enterprise trust",
    preview: "An answer you can't trace is just an opinion.",
    eyebrow: "[05]",
  },
  {
    id: "open",
    label: "Open architecture",
    preview: "Open by design. Yours to leave.",
    eyebrow: "[06]",
  },
  {
    id: "build-vs-buy",
    label: "Build vs. buy",
    preview: "Your team could build this. The question is what else they'd stop doing.",
    eyebrow: "[07]",
  },
  {
    id: "stack",
    label: "The stack",
    preview: "What each module runs on.",
    eyebrow: "[08]",
  },
  {
    id: "solutions",
    label: "Built on Akashic",
    preview: "Same foundation. Built for what you actually do.",
    eyebrow: "[09]",
  },
  {
    id: "scale",
    label: "Proven at scale",
    preview: "Live systems. National scale. Not a demo environment.",
    eyebrow: "[10]",
  },
  {
    id: "talk-to-our-team",
    label: "Ready when you are",
    preview: "Grounded data. Trusted AI. Decisions you can defend.",
    eyebrow: "[11]",
  },
];
