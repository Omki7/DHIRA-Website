/* The layer drawing and its complete, accessible chronological record. */

import JourneyLayers, { JourneyEmblem } from "@/components/demos/about/JourneyLayers";
import AboutSection, { AboutHeading } from "@/components/sections/about/AboutSection";
import SectionCoda from "@/components/ui/SectionCoda";
import { ABOUT_STORY } from "@/lib/aboutContent";
import {
  JOURNEY_AHEAD,
  JOURNEY_BUILT,
  JOURNEY_DIRECTION,
  JOURNEY_LAUNCH,
  JOURNEY_PROVEN,
  JOURNEY_RECOGNITION,
  type JourneyLayerKind,
} from "@/lib/aboutJourney";

interface Entry {
  id: string;
  kind: JourneyLayerKind;
  title: string;
  detail: string;
  description: string;
}

const LAYERS = [...JOURNEY_BUILT, ...JOURNEY_PROVEN, JOURNEY_AHEAD];
const pick = (id: string): Entry => {
  const layer = LAYERS.find((item) => item.id === id);
  if (!layer) throw new Error(`Unknown journey layer: ${id}`);
  return layer;
};

/* The supplied editorial order within each year. */
const LEDGER: readonly { year: string; entries: readonly Entry[] }[] = [
  { year: "2018", entries: [pick("founding")] },
  { year: "2019", entries: [pick("akashic")] },
  { year: "2020", entries: [pick("national-scale")] },
  { year: "2022", entries: [{ id: "launch", kind: "platform", ...JOURNEY_LAUNCH }] },
  { year: "2023", entries: [pick("national-learning"), pick("machine-learning")] },
  { year: "2024", entries: [pick("national-employment"), pick("artificial-intelligence")] },
  { year: "2025", entries: [pick("master-data"), pick("governance")] },
  { year: "2026", entries: [pick("documents"), pick("hybrid-answers")] },
  { year: "Ahead", entries: [pick("agents")] },
];

const GLYPH: Record<JourneyLayerKind, string> = {
  foundation: "bg-blue-hover",
  platform: "border border-blue/60 bg-blue-subtle",
  programme: "border border-overcast/60 bg-panel",
  ahead: "border border-dashed border-blue",
};

function Ledger() {
  return (
    <ol className="jl-ledger mt-8 border-t border-lineSoft lg:sr-only">
      {LEDGER.map(({ year, entries }) => (
        <li key={year} className="grid grid-cols-[52px_1fr] gap-3 border-b border-lineSoft py-5">
          <p className={`font-mono text-[14px] leading-6 tabular-nums ${year === "Ahead" ? "text-blue-hover" : "text-secondary-text"}`}>{year}</p>
          <ul className="space-y-4">
            {entries.map((entry) => (
              <li key={entry.id}>
                <h3 className="jl-title flex items-start gap-2.5">
                  <span aria-hidden className={`mt-[7px] h-2.5 w-2.5 shrink-0 rounded-[2px] ${GLYPH[entry.kind]}`} />
                  {entry.title}
                </h3>
                <p className={entry.kind === "ahead" ? "mt-2 pl-5 text-[15px] leading-relaxed text-secondary-text" : "sr-only"}>{entry.description}</p>
                {entry.kind === "ahead" && <ul className="mt-5 space-y-4 border-l border-dashed border-blue/50 pl-5">
                  {JOURNEY_DIRECTION.map((direction) => <li key={direction.title}>
                    <p className="font-heading text-[16px] font-medium leading-[22px] tracking-[-0.01em] text-ink">{direction.title}</p>
                    <p className="mt-1 text-[14px] leading-relaxed text-secondary-text">{direction.description}</p>
                  </li>)}
                </ul>}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  );
}

export default function AboutJourney() {
  const content = ABOUT_STORY.journey;
  return (
    <AboutSection id="journey">
      <JourneyLayers
        heading={<AboutHeading number="02" label={content.label} setup={content.setup} title={content.title} intro={content.intro} />}
      />
      <div className="mt-10 lg:hidden">
        <JourneyEmblem />
      </div>
      <Ledger />
      <SectionCoda lead={JOURNEY_RECOGNITION.lead} payoff={JOURNEY_RECOGNITION.payoff} className="jl-coda mt-6 md:mt-3" />
    </AboutSection>
  );
}
