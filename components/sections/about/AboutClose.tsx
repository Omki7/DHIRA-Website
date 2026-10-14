import Link from "next/link";
import { AboutHeading } from "@/components/sections/about/AboutSection";
import { ABOUT_STORY } from "@/lib/aboutContent";

export default function AboutClose() {
  const content = ABOUT_STORY.close;
  return (
    <section id="talk-to-our-team" className="relative scroll-mt-24 pb-16 lg:pb-24">
      <span id="careers" className="absolute top-0 scroll-mt-24" />
      <span id="join-us" className="absolute top-0 scroll-mt-24" />
      <div className="about-shell">
        <div className="grid gap-10 bg-depth px-6 py-10 text-white sm:px-10 sm:py-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16 lg:px-14 lg:py-14">
          <div>
            <AboutHeading number="06" label={content.label} setup={content.setup} title={content.title} intro={content.intro} dark />
            <div data-about-reveal="160"><Link href="#get-started" className="btn-primary-invert btn-lg mt-8">Talk to our team <span aria-hidden="true" className="ml-5">↗</span></Link></div>
          </div>
          <div data-about-reveal="100" className="flex flex-col justify-between border-t border-white/20 pt-8 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
            <div>
              <h3 className="text-[24px] font-medium leading-tight tracking-tight">{content.careers}</h3>
              <p className="mt-4 max-w-[22rem] text-[15px] leading-relaxed text-uc-mute">{content.careersBody}</p>
              <Link href="/careers" className="mt-4 inline-flex min-h-11 items-center gap-4 text-sm font-medium text-white underline decoration-white/40 underline-offset-[6px] hover:decoration-white">Explore careers <span aria-hidden="true">↗</span></Link>
            </div>
            <p className="mt-10 border-t border-white/20 pt-5 text-[13px] leading-relaxed text-uc-mute">New York <span aria-hidden="true">·</span> Hyderabad <span aria-hidden="true">·</span> Bangalore</p>
          </div>
        </div>
      </div>
    </section>
  );
}
