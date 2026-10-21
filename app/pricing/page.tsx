import type { Metadata } from "next";
import PricingPage from "@/components/pages/PricingPage";
import { getPage } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

/* Pricing, in US dollars only (user, 21 Oct 2026). The page body is
   components/pages/PricingPage. */

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getPage("pricing");
  return pageMetadata(seo);
}

export default async function Page() {
  const content = await getPage("pricing");
  return <PricingPage content={content} />;
}
