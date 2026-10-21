import KolamCulture from "@/components/demos/about/KolamCulture";
import AboutSection, { AboutHeading } from "@/components/sections/about/AboutSection";
import type { AboutPage } from "@/content/pages/about";

/* [05] Culture, the page's one answer to "why work here". The heading sits
   beside a kolam that draws a figure each run; the three kolam rules pair
   with how the team works, and the invitation hands off to /careers. */
export default function AboutCulture({ content }: { content: AboutPage["culture"] }) {
  return (
    <AboutSection id="culture" eyebrow={{ number: content.number, label: content.label }}>
      <KolamCulture
        content={content}
        heading={<AboutHeading setup={content.setup} title={content.title} intro={content.intro} />}
      />
    </AboutSection>
  );
}
