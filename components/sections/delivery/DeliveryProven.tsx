import ProvenAtScale from "@/components/sections/ProvenAtScale";
import type { ProvenAtScaleBlock } from "@/content/blocks";
import type { Story } from "@/content/collections/customer-stories";

/* [05] Proof: the shared deployment carousel with this page's own copy. */
export default function DeliveryProven({ content, stories }: { content: ProvenAtScaleBlock; stories: Story[] }) {
  return <ProvenAtScale id="proven-at-scale" content={content} stories={stories} />;
}
