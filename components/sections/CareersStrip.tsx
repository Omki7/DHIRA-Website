import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import { ROLES } from "@/lib/careersRoles";

export default function CareersStrip() {
  return (
    <section id="careers" aria-labelledby="careers-h" className="relative scroll-mt-24 bg-background">
      <ScrollRevealRail>
        <ScrollReveal>
          <div className="relative grid gap-10 border-y border-lineSoft py-10 sm:py-12 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-20 lg:py-14">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-eyebrow text-blue">Now hiring <span aria-hidden="true" className="mx-2 text-line">/</span> Come build with us</p>
              <h2 id="careers-h" className="mt-6 text-[34px] font-semibold leading-[1.08] tracking-tighter sm:text-[42px] lg:text-[48px]">
                <span className="block text-inkSoft">Join us in building</span>
                <span className="block text-ink">India&apos;s intelligence layer.</span>
              </h2>
              <Link href="/careers" className="btn-primary mt-7">Explore open roles <span aria-hidden="true">↗</span></Link>
            </div>
            <div className="relative pl-14 sm:pl-24">
              <svg aria-hidden="true" viewBox="0 0 100 280" preserveAspectRatio="none" className="pointer-events-none absolute inset-y-0 left-0 h-full w-12 text-blue sm:w-20" fill="none">
                {[35, 105, 175, 245].map((y, i) => <path key={y} d={`M0 140 C${20 + i * 5} 140, 30 ${y}, 96 ${y}`} stroke="currentColor" strokeOpacity={0.25 + i * 0.16} strokeWidth="1" vectorEffect="non-scaling-stroke" />)}
                <circle cx="3" cy="140" r="3" fill="currentColor" />
              </svg>
              {ROLES.map((role, index) => (
                <Link key={role.dept} href="/careers#open-roles" className="group flex min-h-[70px] items-center gap-4 border-b border-lineSoft last:border-b-0">
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
