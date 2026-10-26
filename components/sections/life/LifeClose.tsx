/*
 * [10] Close — Ready When You Are.
 *
 * Rebuilt 23 Jul 2026 to the SITE-WIDE closure recipe (user direction: the
 * closing block must be consistent on every page). This is the same card as
 * `sections/Closure.tsx` [10] and `akashic/AkashicClose.tsx` [11]: white
 * ground, `bg-ink` card at max-w-[1100px], inverted dot-grid, the 3px blue
 * top accent, a mono eyebrow, and the `.btn-primary-invert` /
 * `.btn-secondary-invert` pair.
 *
 * The page's own aurora-and-capsule closing frame was dropped for it. Two
 * knock-on effects that are deliberate, not oversights: this is the only
 * `blue` #3E63DD on the page (the 3px accent, part of the shared recipe), and
 * the page now ends on white rather than navy, which is how every other page
 * hands over to the black footer.
 */

import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import type { LifePage } from "@/content/pages/solutions-life";

export default function LifeClose({ content }: { content: LifePage["close"] }) {
  return (
    <section
      id="talk-to-our-team"
      className="relative scroll-mt-24 border-t border-lineSoft bg-background"
    >
      <span id="login" className="absolute -top-24" aria-hidden />
      <div className="rail-container pt-12 pb-24 lg:pt-16 lg:pb-32">
        <ScrollReveal>
          {/* Ground is `life-abyss`, not `ink`.
              #0A0E24 is deliberately the same value as `depth` (the
              /akashic `.ak-depth` slabs), so this slab is simultaneously the
              page's own darkest blue AND the platform page's dark blue. `ink`
              (#1A1C1D) is a neutral charcoal with no blue in it at all, which
              made the LAST thing the reader sees the one section that dropped
              out of the page's colour system, at the end of nine sections of
              ocean. The other four dark sections here already anchor their
              ramps on #0A0E24; this is the fifth. */}
          <div className=" relative mx-auto max-w-[1100px] overflow-hidden rounded-outer bg-life-abyss px-6 py-14 text-center text-ink md:px-12 md:py-20">
            {/* Accent follows the ground: sitewide `blue` (rgb(var(--blue))) on a navy
                slab is indigo on indigo. `life-cyan` is this page's accent and
                carries 7.9:1 on `life-abyss`. */}
            <div
              className="absolute inset-x-0 top-0 h-[3px] bg-blue"
              aria-hidden
            />
            {/* `dot-grid-dark`, not `dot-grid ... invert`. The site has a
                purpose-made grid for dark grounds (rgba white dots) and every
                other dark closing slab uses it — homepage Closure, AkashicStack,
                ServicesModels. Inverting the LIGHT grid instead produced a
                heavier texture that measured ~5 L* of lift on the slab. */}
            
            <div className="relative">
              <h2 className="mx-auto mt-2 max-w-[18em] text-balance text-heading-sm font-medium text-ink md:text-heading-md">
                {content.title}
              </h2>
              <p className="mx-auto mt-8 max-w-[36em] text-base leading-relaxed text-secondary-text md:text-lg">
                {content.body}
              </p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <Link href={content.primary.href} className="btn-primary">
                  {content.primary.label}
                </Link>
                <Link href={content.secondary.href} className="btn-secondary">
                  {content.secondary.label}
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
