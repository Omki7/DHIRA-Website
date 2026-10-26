import FaqSection from "@/components/ui/FaqSection";
import type { ServicesPage } from "@/content/pages/services";

export default function ServicesFAQ({ content: c }: { content: ServicesPage["faq"] }) {
  return <FaqSection num={c.eyebrow.number} label={c.eyebrow.label} setup={c.title.setup} payoff={c.title.payoff} lede={c.lede} groups={c.groups} />;
}
