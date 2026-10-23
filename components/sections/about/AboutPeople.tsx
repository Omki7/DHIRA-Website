import Image from "next/image";
import AboutSection, { AboutHeading } from "@/components/sections/about/AboutSection";
import type { Leader } from "@/content/collections/leaders";
import type { AboutHeadingContent } from "@/content/pages/about";

const PLACEMENT = ["lg:order-3", "lg:order-1 lg:pt-14", "lg:order-2 lg:pt-24", "lg:order-4 lg:pt-24", "lg:order-5 lg:pt-14"];

export default function AboutPeople({ content, leaders: ABOUT_LEADERS }: { content: AboutHeadingContent; leaders: Leader[] }) {
  return (
    <AboutSection id="people">
      <AboutHeading number={content.number} label={content.label} setup={content.setup} title={content.title} intro={content.intro} />
      <div className="about-content relative">
        <svg viewBox="0 0 1200 240" preserveAspectRatio="none" className="pointer-events-none absolute left-0 top-20 hidden h-60 w-full lg:block" aria-hidden="true"><path d="M26 140C186 220 234 178 365 100S550 30 600 30S744 36 835 100S1014 220 1174 140" fill="none" stroke="rgb(var(--lineSoft))" strokeWidth="1" /></svg>
        <div className="relative grid grid-cols-2 gap-x-5 gap-y-9 lg:grid-cols-5 lg:gap-x-7">
          {ABOUT_LEADERS.map((leader, index) => (
            <article key={leader.id} data-about-reveal={index * 65} className={`about-leader ${index === 0 ? "col-span-2 grid grid-cols-[112px_1fr] items-center gap-5 pb-4 sm:grid-cols-[160px_1fr] lg:col-span-1 lg:block lg:pb-0" : ""} ${PLACEMENT[index]}`}>
              <div className={`about-portrait relative mx-auto bg-panel ${index === 0 ? "h-[140px] w-[112px] sm:h-[200px] sm:w-[160px] lg:h-[280px] lg:w-full lg:max-w-[224px]" : "aspect-[4/5] w-full max-w-[184px]"}`}>
                <div className="about-portrait-photo"><Image src={leader.image} alt="" fill sizes={index === 0 ? "(min-width: 1024px) 224px, (min-width: 640px) 160px, 112px" : "(min-width: 640px) 184px, 45vw"} className={`object-cover grayscale ${leader.imageClass}`} /></div>
              </div>
              <div className={index === 0 ? "lg:mt-6 lg:text-center" : "mt-5 text-center"}>
                <h3 className="text-[19px] font-medium leading-tight tracking-tight text-ink sm:text-[21px]">{leader.name}</h3>
                <p className="mt-2 min-h-[38px] text-[12px] leading-relaxed text-secondary-text sm:text-[13px]">{leader.role}</p>
                <p className="mx-auto mt-2 max-w-[210px] text-[13px] leading-relaxed text-secondary-text">{leader.focus}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </AboutSection>
  );
}
