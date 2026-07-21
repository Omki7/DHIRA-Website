/*
 * [01] The Work — Production Is a Country.
 * Why the work matters: narrative beside a slow-turning 24-spoke wheel
 * (demos/AshokaChakra, brand-blue ornament), then the same one-project-at-a-
 * time carousel the homepage and /akashic run (demos/ProvenStories), authored
 * in careers voice — the national systems DHIRA's work already runs inside,
 * framed as the work a candidate would join. Figures are the same defensible
 * public-record numbers (Rule 4); platforms stay unnamed, as in the proof
 * carousel. Left-aligned eyebrow kept to match the rest of the careers page.
 */

import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import AshokaChakra from "@/components/demos/AshokaChakra";
import ProvenStories, { type Story } from "@/components/demos/ProvenStories";

const CAREERS_STORIES: Story[] = [
  {
    id: "learning",
    platform: "National Learning Platform",
    authority: "Education · Country-scale deployment",
    title: "One learning record across 36 states and 135 languages",
    description:
      "The intelligence layer inside a national education platform. You'd turn transaction logs from every state into curriculum, retention, and resource signals programme owners act on — real ownership from your first weeks.",
    image: "/proof/learning.jpg",
    alt: "Students at their desks in a school classroom",
    metrics: [{ value: "5.75B+", label: "Learning interactions connected" }],
  },
  {
    id: "mobility",
    platform: "Overseas Employment Registry",
    authority: "Labour mobility · Country-scale deployment",
    title: "Four million worker clearances, traceable end to end",
    description:
      "Visa clearances, immigration logs, and employer records unified into one auditable view. Correctness isn't optional here — the users are real people crossing borders for work.",
    image: "/proof/mobility.jpg",
    alt: "Travellers crossing a sunlit airport departure hall",
    metrics: [{ value: "4M+", label: "Worker clearances on record" }],
  },
  {
    id: "immunisation",
    platform: "National Immunisation Registry",
    authority: "Public health · Country-scale deployment",
    title: "Two billion vaccinations, recorded and reconciled",
    description:
      "The intelligence layer behind a country's immunisation record. You'd reconcile doses, sessions, and coverage into figures health authorities defend in public — ship it wrong and it shows up in the news, not a bug tracker.",
    image: "/proof/vaccination.jpg",
    alt: "A health worker vaccinating an infant at an immunisation clinic",
    metrics: [{ value: "2 Billion+", label: "Vaccinations recorded" }],
  },
];

export default function CareersImpact() {
  return (
    <section id="the-work" className="scroll-mt-24 border-t border-lineSoft bg-background pt-12 pb-24 lg:pt-16 lg:pb-32">
      <ScrollRevealRail>
        <ScrollReveal>
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-16">
            <div>
              <div className="flex items-baseline justify-between font-mono text-[11px] uppercase tracking-eyebrow">
                <p>
                  <span className="text-overcast">[01]</span>
                  <span className="text-inkSoft">&nbsp;&nbsp;The work</span>
                </p>
                <span className="hidden text-overcast sm:inline">/ Not a sandbox</span>
              </div>
              <h2 className="mt-5 text-heading-sm font-semibold text-ink md:text-heading-md lg:text-heading-lg">
                Ship to production. Production is a country.
              </h2>
              <p className="mt-5 max-w-[38em] text-lg leading-relaxed text-secondary-text">
                Most engineering work ships to a dashboard nobody opens. Ours runs
                inside national platforms where the numbers are public record and the
                stakes don&rsquo;t allow for guesswork. You will work on systems like
                these from your first week.
              </p>
            </div>
            <div className="mx-auto w-[190px] sm:w-[210px] lg:mr-4 lg:w-[230px]">
              <AshokaChakra className="w-full" />
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={140}>
          <div className="mt-12 lg:mt-14">
            <ProvenStories
              stories={CAREERS_STORIES}
              ariaLabel="The national systems DHIRA's work runs inside"
              itemNoun="project"
            />
          </div>
        </ScrollReveal>
      </ScrollRevealRail>
    </section>
  );
}
