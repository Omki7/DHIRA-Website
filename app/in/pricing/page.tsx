import type { Metadata } from "next";
import PricingPage from "@/components/pages/PricingPage";
import { getPage } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

/* India pricing: quotes in INR, GST, GeM. The international version is app/pricing;
   both render components/pages/PricingPage (lib/region.ts). */

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getPage("pricing");
  return pageMetadata({ ...seo.in, region: "in" });
}

export default async function Page() {
  const content = await getPage("pricing");
  return <PricingPage region="in" content={content} />;
}
