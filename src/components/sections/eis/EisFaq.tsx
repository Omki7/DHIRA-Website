import { FaqSection } from "@/shared/components/data-display";
import type { EisPage } from "@/content/pages/solutions-eis";

/* [questions] — Section [06]: Frequent Questions
 * Standard two-column split layout with sticky header on left and readable
 * grouped questions on right (site-wide standard from FaqSection).
 */
export default function EisFaq({ content }: { content: EisPage["faq"] }) {
  const groups = content.bands.map((band) => ({
    heading: band.label,
    items: band.items,
  }));

  return (
    <FaqSection
      id="questions"
      num="06"
      label="FREQUENT QUESTIONS"
      setup="Frequently asked"
      payoff="questions."
      lede={content.lede}
      link={{ label: "Talk to our team", href: "#talk-to-our-team" }}
      groups={groups}
    />
  );
}
