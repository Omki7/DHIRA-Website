import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import LegalDocument from "@/components/sections/legal/LegalDocument";
import { TERMS } from "@/lib/legal";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({ title: TERMS.title, description: TERMS.summary, path: "/terms" });

export default function Page() {
  return (
    <>
      <Nav />
      <main id="main" className="bg-background">
        <LegalDocument doc={TERMS} />
      </main>
      <Footer />
    </>
  );
}
