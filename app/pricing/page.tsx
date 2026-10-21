import type { Metadata } from "next";
import PricingPage from "@/components/pages/PricingPage";
import { getPage } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

/* International pricing. The India version is app/in/pricing;
   both render components/pages/PricingPage (lib/region.ts). */

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getPage("pricing");
  return pageMetadata({ ...seo.intl, region: "intl" });
}

export default async function Page() {
  const content = await getPage("pricing");
  return <PricingPage region="intl" content={content} />;
}
