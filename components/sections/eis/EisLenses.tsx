import EisPill from "@/components/ui/eis/EisPill";
import ScrollReveal from "@/components/ui/ScrollReveal";
import EisLensCompareMockup from "@/components/demos/mockups/eis/EisLensCompareMockup";

/* [your-lens] — one system, three operating loops.
 *
 * Three things were wrong with the previous build:
 *
 *   1. NO HEADLINE. The section opened on a 16px line ("Built for the people
 *      who answer for the numbers"), so next to every other section on the
 *      page it read as an orphaned caption.
 *   2. THE CLAIM WAS THE SMALLEST TEXT ON SCREEN. "Same record, same
 *      governance, different first screen" is the entire argument and it sat
 *      at 9px in grey at the foot of a panel. It is the headline now.
 *   3. IT ASSERTED A DIFFERENCE IT WOULD NOT SHOW. A role switcher renders
 *      one screen at a time, so noticing what changes between seats required
 *      clicking and then remembering. Printed together, nothing has to be
 *      remembered, and the identical governance line under three different
 *      screens does the arguing.
 *
 * That also removes about 250px of dead space that sat between the role list
 * and the per-role prose in the old two-column layout.
 */

export default function EisLenses() {
  return (
    <section
      id="your-lens"
      className="scroll-mt-24 bg-background px-6 pb-20 pt-20 sm:pt-24 lg:pb-28 lg:pt-32"
    >
      <div className="mx-auto max-w-[1180px]">
        <ScrollReveal>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className="max-w-[20ch] font-heading text-4xl font-medium leading-[1.05] tracking-tighter sm:text-5xl md:text-6xl">
                <span className="text-eis-body">Same record.</span>
                <br />
                <span className="text-eis-ink">Different first screen.</span>
              </h2>
              <p className="mt-5 max-w-[620px] text-balance text-base leading-[1.5] tracking-tight text-eis-body sm:mt-6 sm:text-lg">
                EIS is one system running three operating loops, not one
                dashboard that everybody filters down to the fifth of it that
                concerns them. Same governed record underneath all three. What
                changes is which question the screen opens with.
              </p>
            </div>

            <EisPill
              href="#talk-to-our-team"
              tone="outline"
              className="flex-shrink-0 self-start lg:self-auto"
            >
              Talk to our team
            </EisPill>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={90}>
          <div className="mt-10 sm:mt-14">
            <EisLensCompareMockup />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
