import Image from "next/image";
import AboutSection, { AboutHeading } from "@/components/sections/about/AboutSection";
import SectionLink from "@/components/ui/SectionLink";
import type { Leader } from "@/content/collections/leaders";
import type { AboutPage } from "@/content/pages/about";

export default function AboutPeople({ content, leaders }: { content: AboutPage["people"]; leaders: Leader[] }) {
  const [founder, ...team] = leaders;
  return (
    <AboutSection id="leadership">
      <span id="people" aria-hidden="true" className="block scroll-mt-20" />
      <AboutHeading number={content.number} label={content.label} setup={content.setup} title={content.title} intro={content.intro} />
      <SectionLink href={content.link.href}>{content.link.label}</SectionLink>
      <div className="about-content">
        <div className="about-founder grid gap-8 border-y border-lineSoft py-8 md:grid-cols-[1.3fr_1fr] md:gap-12 lg:grid-cols-[1fr_360px] lg:gap-20 lg:py-10">
          <div data-about-reveal="0" className="flex flex-col justify-center">
            <p className="font-mono text-xs uppercase tracking-eyebrow text-secondary-text">{content.perspective.label}</p>
            <h3 className="mt-5 font-heading text-[30px] font-medium leading-[1.15] tracking-tighter text-ink sm:text-[40px]">{content.perspective.title}</h3>
            <div className="mt-5 max-w-[36rem] space-y-4 text-base leading-[1.75] text-secondary-text">
              {content.perspective.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </div>
          {founder && (
            <figure data-about-reveal="80" className="grid grid-cols-[112px_1fr] items-center gap-5 md:block">
              <div className="relative aspect-square overflow-hidden rounded-micro bg-panel md:aspect-[4/3]">
                <Image src={founder.image} alt={founder.name} fill sizes="(min-width: 1024px) 360px, (min-width: 768px) 38vw, 112px" className="object-cover object-[center_18%] grayscale" />
              </div>
              <figcaption className="md:mt-4">
                <p className="font-heading text-xl font-medium tracking-tight text-ink">{founder.name}</p>
                <p className="mt-1 text-[13px] leading-relaxed text-secondary-text">{founder.role}</p>
              </figcaption>
            </figure>
          )}
        </div>
        <p className="mt-8 font-mono text-xs uppercase tracking-eyebrow text-secondary-text">{content.leadersLabel}</p>
        <div className="mt-6 grid gap-x-10 gap-y-6 md:grid-cols-2 xl:gap-x-16">
          {team.map((leader, index) => (
            <article key={leader.id} data-about-reveal={index * 50} className="grid grid-cols-[88px_1fr] gap-5 border-b border-lineSoft pb-6 sm:grid-cols-[104px_1fr]">
              <div className="relative aspect-[4/5] self-start overflow-hidden rounded-micro bg-panel">
                <Image src={leader.image} alt={leader.name} fill sizes="(min-width: 640px) 104px, 88px" className="object-cover object-[center_12%] grayscale" />
              </div>
              <div className="self-center">
                <h3 className="font-heading text-xl font-medium leading-tight tracking-tight text-ink">{leader.name}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-secondary-text">{leader.role}</p>
                <p className="mt-3 text-sm leading-relaxed text-secondary-text">{leader.focus}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </AboutSection>
  );
}
