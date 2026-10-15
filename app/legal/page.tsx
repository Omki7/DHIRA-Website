import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import LegalDocument from "@/components/sections/legal/LegalDocument";
import { WEBSITE_POLICIES } from "@/lib/legal";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({ title: WEBSITE_POLICIES.title, description: WEBSITE_POLICIES.summary, path: "/legal" });

export default function Page() {
  return (
    <>
      <Nav />
      <main id="main" className="bg-background">
        <LegalDocument doc={WEBSITE_POLICIES} />
      </main>
      <Footer />
    </>
  );
}
