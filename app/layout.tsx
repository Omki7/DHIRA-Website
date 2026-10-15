import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./theme.css";
import ContactModal from "@/components/layout/ContactModal";
import OffscreenAnimationGate from "@/components/layout/OffscreenAnimationGate";
import RegionSuggest from "@/components/layout/region/RegionSuggest";
import JsonLd from "@/components/ui/JsonLd";
import { SITE, SITE_URL, absoluteUrl } from "@/lib/site";
import { THEME_INIT_SCRIPT } from "@/lib/theme";

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  /* The founder's canonical domain (lib/site.ts). Pages set their own
     canonical; none is set here, or every page would inherit "/". */
  metadataBase: new URL(SITE_URL),
  title: {
    default: "DHIRA | Answers You Can Act On",
    template: "%s | DHIRA",
  },
  description:
    "From spreadsheets to PDFs to live streams, DHIRA gives your AI the full picture. Powered by Akashic, the intelligence layer behind every decision.",
  keywords: [
    "DHIRA",
    "Akashic",
    "Enterprise AI",
    "Knowledge Layer",
    "Data Platform",
    "Master Data",
    "Data Pipelines",
  ],
  authors: [{ name: "DHIRA" }],
  creator: "DHIRA",
  publisher: "DHIRA",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "DHIRA | Answers You Can Act On",
    description:
      "From spreadsheets to PDFs to live streams, DHIRA gives your AI the full picture. Powered by Akashic, the intelligence layer behind every decision.",
    url: "/",
    siteName: "DHIRA",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "DHIRA — Answers you can act on.",
        type: "image/png",
      },
    ],
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DHIRA | Answers You Can Act On",
    description:
      "From spreadsheets to PDFs to live streams, DHIRA gives your AI the full picture. Powered by Akashic, the intelligence layer behind every decision.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <link rel="alternate" type="text/plain" title="LLM summary" href="/llms.txt" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;500;600;700&family=Google+Sans+Text:wght@400;500;600;700&family=Google+Sans+Mono:wght@400;500;600;700&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400;1,6..72,500&family=Inter:opsz,wght@14..32,400..700&display=swap"
          rel="stylesheet"
        />
      </head>
      {/* suppressHydrationWarning: browser extensions (e.g. Grammarly) inject
          attributes onto <body> before React hydrates, which would otherwise
          log a hydration mismatch. Only affects this element's attributes. */}
      <body
        suppressHydrationWarning
        className="font-sans bg-background text-primary-text antialiased overflow-x-clip"
      >
        {/* Skip link (WCAG 2.4.1, GIGW): the first focusable element on every
            page. Every page composer gives its <main> id="main". */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-btn focus:bg-ink focus:px-4 focus:py-2.5 focus:text-[14px] focus:font-medium focus:text-white"
        >
          Skip to main content
        </a>
        <JsonLd
          data={{
            "@type": "Organization",
            "@id": absoluteUrl("/#org"),
            name: SITE.name,
            alternateName: ["DHIRA.ai", SITE.expansion],
            legalName: SITE.legalName,
            url: absoluteUrl("/"),
            logo: absoluteUrl("/brand/dhira-mark.svg"),
            email: SITE.email,
            foundingDate: SITE.founded,
            founder: { "@type": "Person", name: SITE.founder.name, jobTitle: SITE.founder.role },
            address: SITE.offices.map((office) => ({ "@type": "PostalAddress", addressLocality: office.city, addressCountry: office.country })),
            sameAs: SITE.social.map((profile) => profile.href),
          }}
        />
        <JsonLd
          data={{
            "@type": "WebSite",
            "@id": absoluteUrl("/#website"),
            url: absoluteUrl("/"),
            name: SITE.name,
            inLanguage: "en",
            publisher: { "@id": absoluteUrl("/#org") },
          }}
        />
        {children}
        <ContactModal />
        <RegionSuggest />
        <OffscreenAnimationGate />
      </body>
    </html>
  );
}
