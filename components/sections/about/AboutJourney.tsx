/* The layer drawing and its complete, accessible chronological record. */

import JourneyLayers, { JourneyEmblem } from "@/components/demos/about/JourneyLayers";
import AboutSection, { AboutHeading } from "@/components/sections/about/AboutSection";
import SectionCoda from "@/components/ui/SectionCoda";
import type { AboutPage, JourneyLayerKind, JourneyTimeline } from "@/content/pages/about";

interface Entry {
  id: string;
  kind: JourneyLayerKind;
  title: string;
  detail: string;
  description: string;
}

/* The accessible chronology, in the editorial order the timeline's
   `ledger` gives within each year ("launch" is the 2022 launch). */
function ledgerOf(tl: JourneyTimeline): { year: string; entries: Entry[] }[] {
  const layers: Entry[] = [...tl.built, ...tl.proven, tl.ahead, { id: "launch", kind: "platform", ...tl.launch }];
  const pick = (id: string): Entry => {
    const layer = layers.find((item) => item.id === id);
    if (!layer) throw new Error(`Unknown journey layer: ${id}`);
    return layer;
  };
  return tl.ledger.map(({ year, ids }) => ({ year, entries: ids.map(pick) }));
}

const GLYPH: Record<JourneyLayerKind, string> = {
  foundation: "bg-blue-hover",
  platform: "border border-blue/60 bg-blue-subtle",
  programme: "border border-overcast/60 bg-panel",
  ahead: "border border-dashed border-blue",
};

function Ledger({ timeline }: { timeline: JourneyTimeline }) {
  return (
    <ol className="jl-ledger mt-8 border-t border-lineSoft lg:sr-only">
      {ledgerOf(timeline).map(({ year, entries }) => (
        <li key={year} className="grid grid-cols-[52px_1fr] gap-3 border-b border-lineSoft py-5">
          <p className={`font-mono text-[14px] leading-6 tabular-nums ${year === timeline.ahead.year ? "text-blue-hover" : "text-secondary-text"}`}>{year}</p>
          <ul className="space-y-4">
            {entries.map((entry) => (
              <li key={entry.id}>
                <h3 className="jl-title flex items-start gap-2.5">
                  <span aria-hidden className={`mt-[7px] h-2.5 w-2.5 shrink-0 rounded-[2px] ${GLYPH[entry.kind]}`} />
                  {entry.title}
                </h3>
                <p className={entry.kind === "ahead" ? "mt-2 pl-5 text-[15px] leading-relaxed text-secondary-text" : "sr-only"}>{entry.description}</p>
                {entry.kind === "ahead" && <ul className="mt-5 space-y-4 border-l border-dashed border-blue/50 pl-5">
                  {timeline.direction.map((direction) => <li key={direction.title}>
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

export default function AboutJourney({ content }: { content: AboutPage["journey"] }) {
  const { timeline } = content;
  return (
    <AboutSection id="journey" eyebrow={{ number: content.number, label: content.label }}>
      <JourneyLayers
        timeline={timeline}
        heading={<AboutHeading setup={content.setup} title={content.title} intro={content.intro} />}
      />
      <div className="mt-10 lg:hidden">
        <JourneyEmblem timeline={timeline} />
      </div>
      <Ledger timeline={timeline} />
      <SectionCoda lead={timeline.recognition.lead} payoff={timeline.recognition.payoff} className="jl-coda mt-6 md:mt-3" />
    </AboutSection>
  );
}
