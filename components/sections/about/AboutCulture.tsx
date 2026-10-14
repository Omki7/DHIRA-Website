import KolamCulture from "@/components/demos/about/KolamCulture";
import AboutSection, { AboutHeading } from "@/components/sections/about/AboutSection";
import { ABOUT_STORY } from "@/lib/aboutContent";

/* [05] Culture, the page's one answer to "why work here". The heading sits
   beside a kolam that draws a figure each run; the three kolam rules pair
   with how the team works, and the invitation hands off to /careers. */
export default function AboutCulture() {
  const content = ABOUT_STORY.culture;
  return (
    <AboutSection id="culture">
      <KolamCulture
        heading={<AboutHeading number="05" label={content.label} setup={content.setup} title={content.title} intro={content.intro} />}
      />
    </AboutSection>
  );
}
