import type { Metadata } from "next";
import { Footer } from "@/app/_components/Footer";
import { Nav } from "@/app/_components/Nav";
import { pageMetadata } from "@/app/_lib/metadata";
import { EnterpriseIntelligencePage } from "@/features/solutions";
import { getPage } from "@/services/content/content";
import { PageMinimap } from "@/shared/components/navigation";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getPage("solutions/enterprise-intelligence");
  return pageMetadata(seo);
}

/* The body is features/solutions (EnterpriseIntelligencePage). */
export default async function Page() {
  const page = await getPage("solutions/enterprise-intelligence");
  return (
    <>
      <Nav />
      <EnterpriseIntelligencePage page={page} />
      <Footer />
      <PageMinimap sections={page.sections} aria-label={page.sectionsLabel} />
    </>
  );
}
