import type { LifePage } from "@/content/pages/solutions-life";
import { FaqSection } from "@/shared/components/data-display";

export interface LifeFaqProps {
  content: LifePage["faq"];
  /** The section's place in the page's order. */
  num: string;
}

/* [questions] The site's FAQ section, grouped by where the question sits:
   at the visit, or above it. Every answer restates a claim the page
   already makes (FaqSection's rule). */
export function LifeFaq({ content, num }: LifeFaqProps) {
  const groups = content.bands.map((band) => ({ heading: band.label, items: band.items }));

  return (
    <FaqSection
      id="questions"
      num={num}
      label="QUESTIONS"
      setup={content.setup}
      payoff={content.payoff}
      lede={content.lede}
      link={content.link}
      groups={groups}
    />
  );
}
