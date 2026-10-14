import ThreadConvergence from "@/components/demos/about/ThreadConvergence";
import AboutSection, { AboutHeading } from "@/components/sections/about/AboutSection";
import { ABOUT_STORY } from "@/lib/aboutContent";

export default function AboutConviction() {
  const content = ABOUT_STORY.conviction;
  return (
    <AboutSection id="why-we-exist">
      <div className="grid items-center gap-12 lg:grid-cols-[1.08fr_1fr] lg:gap-20">
        <div>
          <AboutHeading number="01" label={content.label} setup={content.setup} title={content.title} intro={content.intro} />
          <ol className="mt-8 border-t border-lineSoft">
            {content.beliefs.map((belief, index) => (
              <li key={belief.title} data-about-reveal={index * 65} className="grid grid-cols-[24px_1fr] gap-4 border-b border-lineSoft py-5">
                <span className="pt-1 font-mono text-[11px] text-overcast">0{index + 1}</span>
                <div>
                  <h3 className="text-[18px] font-medium leading-snug tracking-tight text-ink">{belief.title}</h3>
                  <p className="mt-2 max-w-[27rem] text-[15px] leading-relaxed text-secondary-text">{belief.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div data-about-reveal="120" className="mx-auto w-full max-w-[470px] px-7 py-7 sm:px-9">
          <ThreadConvergence />
        </div>
      </div>
    </AboutSection>
  );
}
