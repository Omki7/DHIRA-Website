import ScrollReveal from "@/components/ui/ScrollReveal";
import UCFeatureIcon from "./UCFeatureIcon";

const FEATURES = [
  {
    title: "Every source, connected.",
    sub: "Structured, unstructured, streaming. All in, all live.",
  },
  {
    title: "One record of truth.",
    sub: "Customers, products, places: resolved into one golden record.",
  },
  {
    title: "Forecasts you can trust.",
    sub: "Demand, revenue, and risk, modelled on governed data.",
  },
  {
    title: "Ask in plain language.",
    sub: "Every answer returns with its sources attached.",
  },
  {
    title: "Governed by default.",
    sub: "Lineage, masking, access, audit. Always on.",
  },
];

export default function UCFeatureGrid() {
  return (
    <div className="relative grid grid-cols-1 border-t border-uc-line lg:grid-cols-5">
      {FEATURES.map((feature, i) => (
        <ScrollReveal
          key={feature.title}
          delay={i * 70}
          className="flex flex-col justify-between gap-8 px-6 py-8 first:pl-6 last:pr-6 max-lg:items-center max-lg:gap-4 max-lg:text-center max-lg:[&:not(:first-child)]:border-t md:first:pl-10 md:last:pr-10 lg:aspect-[5/4] lg:px-7 lg:[&:not(:first-child)]:border-l [&:not(:first-child)]:border-uc-stroke xl:first:pl-14 xl:last:pr-14 2xl:aspect-[3/2]"
        >
          <UCFeatureIcon index={i} className="size-8 text-uc-mute" />
          <div className="flex flex-col gap-1.5">
            <p className="text-balance text-[16px] font-medium leading-[1.4] tracking-[-0.16px] text-uc-text">
              {feature.title}
            </p>
            <p className="text-balance text-[14px] font-medium leading-[1.45] tracking-[-0.14px] text-uc-mute">
              {feature.sub}
            </p>
          </div>
        </ScrollReveal>
      ))}
    </div>
  );
}
