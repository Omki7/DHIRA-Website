import type { EisPage } from "@/content/pages/solutions-eis";
import { FaqSection } from "@/shared/components/data-display";

export interface EisFaqProps {
  content: EisPage["faq"];
}

/* [questions] Section [07]: the site's FAQ section, the questions grouped
   by what the reader is deciding. */
export function EisFaq({ content }: EisFaqProps) {
  const groups = content.bands.map((band) => ({ heading: band.label, items: band.items }));

  return (
    <FaqSection
      id="questions"
      num={content.eyebrow.number}
      label={content.eyebrow.label}
      setup={content.setup}
      payoff={content.payoff}
      lede={content.lede}
      link={content.link}
      groups={groups}
    />
  );
}
