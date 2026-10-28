import Link from "next/link";
import KolamCulture from "@/components/demos/about/KolamCulture";
import { AboutHeading } from "@/components/sections/about/AboutSection";
import type { AboutPage } from "@/content/pages/about";

export default function AboutClose({ content }: { content: AboutPage["close"] }) {
  return (
    <section id="talk-to-our-team" className="relative scroll-mt-24 pb-16 lg:pb-24">
      <span id="careers" className="absolute top-0 scroll-mt-24" />
      <span id="join-us" className="absolute top-0 scroll-mt-24" />
      <div className="about-shell">
        <div className="overflow-hidden rounded-frame border border-subtle-stroke bg-depth px-6 py-10 text-ink sm:px-10 sm:py-12 lg:px-14 lg:py-16">
          <div className="grid gap-12 lg:grid-cols-[1.35fr_1fr] lg:gap-20">
          <div>
            <AboutHeading number={content.number} label={content.label} setup={content.setup} title={content.title} intro={content.intro} dark card />
            <div data-about-reveal="160"><Link href={content.primary.href} className="btn-primary btn-lg mt-8">{content.primary.label} <span aria-hidden="true" className="ml-5">↗</span></Link></div>
          </div>
          <div data-about-reveal="100" className="flex flex-col justify-center border-t border-line pt-8 lg:border-l lg:border-t-0 lg:pl-14 lg:pt-5">
            <div>
              <h3 className="font-heading text-[26px] font-medium leading-tight tracking-tight">{content.careers.title}</h3>
              <p className="mt-4 max-w-[22rem] text-[15px] leading-relaxed text-uc-mute">{content.careers.body}</p>
              <Link href={content.careers.link.href} className="mt-5 inline-flex min-h-11 items-center gap-4 text-sm font-medium text-ink underline decoration-line underline-offset-[6px] hover:decoration-current">{content.careers.link.label} <span aria-hidden="true">↗</span></Link>
            </div>
            <div className="mt-7 max-w-[280px]"><KolamCulture /></div>
          </div>
          </div>
          <div className="mt-12 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3 border-t border-line pt-5">
            <p className="font-mono text-xs uppercase tracking-eyebrow text-uc-mute">{content.locationLabel}</p>
            <p className="text-[13px] leading-relaxed text-uc-mute">
              {content.offices.map((office, k) => (
                <span key={office}>
                  {k > 0 && <span aria-hidden="true"> · </span>}
                  {office}
                </span>
              ))}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
