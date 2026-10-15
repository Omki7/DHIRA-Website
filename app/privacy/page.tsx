import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import LegalDocument from "@/components/sections/legal/LegalDocument";
import { PRIVACY } from "@/lib/legal";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({ title: PRIVACY.title, description: PRIVACY.summary, path: "/privacy" });

export default function Page() {
  return (
    <>
      <Nav />
      <main id="main" className="bg-background">
        <LegalDocument doc={PRIVACY} />
      </main>
      <Footer />
    </>
  );
}
