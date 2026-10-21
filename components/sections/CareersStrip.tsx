/* The unnumbered hiring strip after the close (it stays out of the minimap).
   Same eyebrow, headline and onward link as every section; the open seats
   come from the roles collection. */
import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import FigureEyebrow from "@/components/ui/FigureEyebrow";
import SectionLink from "@/components/ui/SectionLink";
import TwoToneTitle from "@/components/ui/TwoToneTitle";
import type { Role } from "@/content/collections/roles";
import type { HomeCareers } from "@/content/pages/home";

export default function CareersStrip({ content, roles }: { content: HomeCareers; roles: Role[] }) {
  return (
    <section id="careers" aria-labelledby="careers-h" className="relative scroll-mt-24 bg-background pb-16 lg:pb-24">
      <ScrollRevealRail>
        <ScrollReveal>
          <FigureEyebrow label={content.eyebrow} />
          <div className="relative grid gap-10 border-b border-lineSoft py-10 sm:py-12 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-20 lg:py-14">
            <div>
              <TwoToneTitle id="careers-h" setup={content.title.setup} payoff={content.title.payoff} />
              <SectionLink href={content.cta.href}>{content.cta.label}</SectionLink>
            </div>
            <div className="relative pl-14 sm:pl-24">
              <svg aria-hidden="true" viewBox="0 0 100 280" preserveAspectRatio="none" className="pointer-events-none absolute inset-y-0 left-0 h-full w-12 text-blue sm:w-20" fill="none">
                {[35, 105, 175, 245].map((y, i) => <path key={y} d={`M0 140 C${20 + i * 5} 140, 30 ${y}, 96 ${y}`} stroke="currentColor" strokeOpacity={0.25 + i * 0.16} strokeWidth="1" vectorEffect="non-scaling-stroke" />)}
                <circle cx="3" cy="140" r="3" fill="currentColor" />
              </svg>
              {roles.map((role, index) => (
                <Link key={role.dept} href={content.rolesHref} className="group flex min-h-[70px] items-center gap-4 border-b border-lineSoft last:border-b-0">
                  <span className="font-mono text-[10px] text-overcast">0{index + 1}</span>
                  <span className="text-[19px] font-medium tracking-tight text-ink transition-colors group-hover:text-blue motion-reduce:transition-none sm:text-[22px]">{role.seat}</span>
                  <span aria-hidden="true" className="ml-auto flex h-8 w-8 items-center justify-center rounded-full text-inkSoft transition-colors group-hover:bg-blue-subtle group-hover:text-blue motion-reduce:transition-none">↗</span>
                </Link>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </ScrollRevealRail>
    </section>
  );
}
