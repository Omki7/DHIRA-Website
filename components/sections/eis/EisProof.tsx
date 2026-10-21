import Image from "next/image";
import ScrollReveal from "@/components/ui/ScrollReveal";
import type { EisPage } from "@/content/pages/solutions-eis";

/* [proof] — the only section on this page whose figures are real.
 *
 * DESIGN RULE 4 APPLIES HARDEST HERE. Every figure below is one already
 * published on this site's proof section: none is estimated, rounded up, or
 * summed across deployments. They are deliberately NOT added together into
 * one headline number, because "learning interactions", "worker clearances"
 * and "dose records" are different units and a combined total would be a
 * claim nobody could verify.
 *
 * WHAT CHANGED. The previous build put all three deployments behind a pill
 * switcher, so a reader saw one national system and had to click twice to
 * learn there were three. The cumulative weight IS the argument, so all
 * three are on screen. The photographs also shrank from a 220px hero strip
 * to a band: they are mood, per Design Rule 7, and they were sitting above
 * the evidence in the most valuable space on the card.
 *
 * The section also now states the bridge it only implied. An executive who
 * accepts that we run national systems still has to be told, in a sentence,
 * why that matters for twelve plants.
 */


export default function EisProof({ content }: { content: EisPage["proof"] }) {
  const DEPLOYMENTS = content.deployments;
  return (
    <section
      id="proof"
      className="scroll-mt-24 bg-background px-6 pb-20 pt-20 sm:pt-24 lg:pb-28 lg:pt-32"
    >
      <div className="mx-auto max-w-[1180px]">
        <ScrollReveal>
          <h2 className="max-w-[24ch] font-heading text-4xl font-medium leading-[1.05] tracking-tighter sm:text-5xl md:text-6xl">
            <span className="text-eis-body">{content.setup}</span>
            <br />
            <span className="text-eis-ink">{content.payoff}</span>
          </h2>
          <p className="mt-5 max-w-[620px] text-balance text-base leading-[1.5] tracking-tight text-eis-body sm:mt-6 sm:text-lg">
            {content.lede}
          </p>
        </ScrollReveal>

        <div className="mt-10 grid gap-5 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3">
          {DEPLOYMENTS.map((d, i) => (
            <ScrollReveal key={d.key} delay={i * 80}>
              <div className="flex h-full flex-col overflow-hidden rounded-outer border border-eis-line bg-background">
                <div className="relative h-[104px] w-full">
                  <Image
                    src={d.image}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
                    className="object-cover"
                  />
                  {/* The photograph is a mood, not evidence. It fades into the
                      panel so the figures below stay the loudest thing. */}
                  
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <span className="block text-[9.5px] font-medium uppercase tracking-eyebrow text-eis-caption">
                    {d.name}
                  </span>
                  <p className="mt-2 text-balance text-[17px] font-medium leading-snug tracking-tight text-eis-ink">
                    {d.line}
                  </p>
                  <p className="mt-2 text-[13px] leading-[1.45] text-eis-caption">
                    {d.body}
                  </p>

                  <div className="mt-auto grid grid-cols-2 gap-4 border-t border-eis-line pt-5">
                    {d.figures.map((f) => (
                      <div key={f.label}>
                        <span className="flex items-baseline gap-0.5">
                          <span className="font-heading text-[34px] font-medium leading-none tracking-tighter text-eis-ink">
                            {f.value}
                          </span>
                          <span className="text-base font-medium tracking-tight text-eis-body">
                            {f.unit}
                          </span>
                        </span>
                        <span className="mt-1.5 block text-[11.5px] leading-tight text-eis-caption">
                          {f.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* The bridge the section previously left the reader to make alone. */}
        <ScrollReveal delay={150}>
          <p className="mt-8 max-w-[760px] text-balance text-base leading-[1.5] text-eis-body sm:text-lg">
            {content.closing}
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
