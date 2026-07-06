/*
 * [05] Careers — Join Us.
 * A teaser for the home page's full JoinTheTeam board: same four roles,
 * compact ledger rows with the NOW HIRING pulse signature, linking back
 * to /#careers rather than duplicating the filterable list.
 */

import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";

const roles = [
  { dept: "Engineering", title: "Senior Data Engineer", location: "Remote", type: "Full-time" },
  { dept: "Machine Learning", title: "ML Researcher, Grounding Systems", location: "Hyderabad", type: "Full-time" },
  { dept: "Product", title: "Product Manager, Akashic Platform", location: "New York", type: "Full-time" },
  { dept: "Delivery", title: "Implementation Lead, Government", location: "Remote", type: "Full-time" },
];

export default function AboutCareers() {
  return (
    <section id="careers" className="scroll-mt-24 border-t border-lineSoft bg-white">
      <div className="rail-container pt-12 pb-24 lg:pt-16 lg:pb-32">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <div>
            <ScrollReveal>
              <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-eyebrow lg:justify-start lg:gap-6">
                <p>
                  <span className="text-overcast">[05]</span>
                  <span className="text-inkSoft">&nbsp;&nbsp;Careers</span>
                </p>
                <span className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span
                      className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue opacity-50"
                      style={{ animationDuration: "2.4s" }}
                    />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-blue" />
                  </span>
                  <span className="text-[11px] font-medium tracking-eyebrow text-blue">NOW HIRING</span>
                </span>
              </div>
              <h2 className="mt-5 max-w-[12em] text-heading-sm font-semibold text-ink md:text-heading-md">
                Join us in building India&rsquo;s intelligence layer.
              </h2>
              <p className="mt-5 max-w-[28em] text-lg leading-relaxed text-secondary-text">
                We are a small team that ships. Our work runs inside national
                platforms, touches millions of people, and lasts beyond any single
                budget cycle. If that matters to you, we should talk.
              </p>
              <div className="mt-8">
                <Link href="/#careers" className="btn-secondary">
                  See all roles
                </Link>
              </div>
            </ScrollReveal>
          </div>

          <div>
            <ScrollReveal delay={120}>
              <p className="border-b border-dashed border-lineSoft pb-3 font-mono text-[10px] uppercase tracking-eyebrow text-overcast">
                Open now
              </p>
            </ScrollReveal>
            {roles.map((role, idx) => (
              <ScrollReveal key={role.title} delay={160 + idx * 80}>
                <Link
                  href="/#careers"
                  className="group relative flex items-center gap-4 border-b border-subtle-stroke py-5 transition-colors duration-250 ease-settle hover:bg-primary-bg/60"
                >
                  <span
                    className="absolute left-0 top-0 h-full w-0.5 origin-top scale-y-0 bg-blue transition-transform duration-200 ease-out group-hover:scale-y-100"
                    aria-hidden
                  />
                  <div className="min-w-0 flex-1 pl-2 transition-[padding] duration-200 ease-settle group-hover:pl-3">
                    <span className="font-mono text-[9.5px] uppercase tracking-eyebrow text-overcast">
                      {role.dept}
                    </span>
                    <p className="mt-1 truncate text-[16px] font-semibold tracking-tight text-ink">
                      {role.title}
                    </p>
                    <p className="mt-0.5 text-[12.5px] text-inkSoft">
                      {role.location} &middot; {role.type}
                    </p>
                  </div>
                  <span className="shrink-0 pr-1 text-sm font-semibold text-overcast transition-colors duration-150 group-hover:text-ink">
                    <span className="flex items-center gap-0.5">
                      Apply
                      <span className="inline-block transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                        &#8599;
                      </span>
                    </span>
                  </span>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
