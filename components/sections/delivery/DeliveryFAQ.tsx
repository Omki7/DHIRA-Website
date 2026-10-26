import FaqSection from "@/components/ui/FaqSection";
import type { DeliveryPage } from "@/content/pages/delivery";

export default function DeliveryFAQ({ content: c }: { content: DeliveryPage["faq"] }) {
  return <FaqSection num={c.eyebrow.number} label={c.eyebrow.label} setup={c.title.setup} payoff={c.title.payoff} lede={c.lede} groups={c.groups} />;
}
