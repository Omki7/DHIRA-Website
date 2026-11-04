import type { Metadata } from "next";
import { Footer } from "@/app/_components/Footer";
import { Nav } from "@/app/_components/Nav";
import { pageMetadata } from "@/app/_lib/metadata";
import { SolutionsPage } from "@/features/solutions";
import { getPage, getUiStrings } from "@/services/content/content";
import { PageMinimap } from "@/shared/components/navigation";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getPage("solutions");
  return pageMetadata(seo);
}

/* The body is features/solutions (SolutionsPage). */
export default async function Page() {
  const [page, ui] = await Promise.all([getPage("solutions"), getUiStrings()]);
  return (
    <>
      <Nav />
      <SolutionsPage page={page} indexLabel={ui.onThisPage} />
      <Footer />
      <PageMinimap sections={page.sections} aria-label={page.sectionsLabel} />
    </>
  );
}
