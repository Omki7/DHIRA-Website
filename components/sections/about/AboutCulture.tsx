import Image from "next/image";
import AboutSection, { AboutHeading } from "@/components/sections/about/AboutSection";
import SectionLink from "@/components/ui/SectionLink";
import type { AboutPage } from "@/content/pages/about";

export default function AboutCulture({ content }: { content: AboutPage["culture"] }) {
  return (
    <AboutSection id="culture">
      <AboutHeading number={content.number} label={content.label} setup={content.setup} title={content.title} intro={content.intro} />
      <SectionLink href={content.link.href}>{content.link.label}</SectionLink>

      <div className="about-content grid items-center gap-8 lg:grid-cols-[1.35fr_1fr] lg:gap-14">
        <figure data-about-reveal="0">
          {/* Illustrative, not a record of a DHIRA meeting. Replace via the content asset. */}
          <div className="relative aspect-[3/2] overflow-hidden rounded-micro bg-panel">
            <Image src={content.workspace.src} alt={content.workspace.alt} fill sizes="(min-width: 1440px) 740px, (min-width: 1024px) 55vw, 100vw" className="object-cover grayscale" />
          </div>
          <figcaption className="mt-3 text-xs leading-relaxed text-secondary-text">{content.imageNote}</figcaption>
        </figure>
        <div data-about-reveal="80">
          <p className="font-mono text-xs uppercase leading-relaxed tracking-eyebrow text-secondary-text">{content.working.label}</p>
          <h3 className="mt-4 max-w-[25rem] font-heading text-[28px] font-medium leading-[1.2] tracking-tight text-ink lg:text-[32px]">{content.working.title}</h3>
          <p className="mt-4 max-w-[28rem] text-[15px] leading-[1.75] text-secondary-text">{content.working.body}</p>
          <dl className="mt-6 divide-y divide-lineSoft border-y border-lineSoft">
            {content.working.principles.map((principle) => (
              <div key={principle.title} className="py-4">
                <dt className="font-heading text-[17px] font-medium text-ink">{principle.title}</dt>
                <dd className="mt-1.5 text-sm leading-relaxed text-secondary-text">{principle.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="mt-10 lg:mt-14">
        <div className="border-t border-lineSoft pt-7">
          <p className="font-mono text-xs uppercase tracking-eyebrow text-secondary-text">{content.team.label}</p>
          <h3 className="mt-4 font-heading text-[28px] font-medium tracking-tight text-ink sm:text-[34px]">{content.team.title}</h3>
        </div>
        <div className="about-team mt-8 grid gap-x-8 sm:grid-cols-2 xl:grid-cols-3 xl:gap-x-12">
          {content.team.members.map((member, index) => (
            <figure key={member.name} data-about-reveal={(index % 3) * 40} className="grid grid-cols-[88px_1fr] items-center gap-5 border-b border-lineSoft py-5 first:pt-0 sm:first:pt-5 lg:grid-cols-[104px_1fr]">
              <div className="relative aspect-[4/5] overflow-hidden rounded-micro bg-panel">
                <Image src={member.image.src} alt={member.image.alt} fill sizes="(min-width: 1024px) 104px, 88px" className="object-cover grayscale" style={{ objectPosition: member.position }} />
              </div>
              <figcaption>
                <p className="font-heading text-[17px] font-medium leading-snug tracking-tight text-ink">{member.name}</p>
                <p className="mt-1.5 text-[13px] leading-relaxed text-ink">{member.role}</p>
                <p className="mt-2 text-xs leading-relaxed text-secondary-text">{member.interest}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </AboutSection>
  );
}
