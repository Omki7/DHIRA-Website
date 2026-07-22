import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#0A0E24",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://dhira-website-ve4y.vercel.app"
  ),
  title: {
    default: "DHIRA | Answers You Can Act On",
    template: "%s | DHIRA",
  },
  description:
    "From spreadsheets to PDFs to live streams, DHIRA gives your AI the full picture. Powered by Akashic, the complete record of your data, ready to answer.",
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
      "From spreadsheets to PDFs to live streams, DHIRA gives your AI the full picture. Powered by Akashic, the complete record of your data, ready to answer.",
    url: "https://dhira-website-ve4y.vercel.app",
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
      "From spreadsheets to PDFs to live streams, DHIRA gives your AI the full picture. Powered by Akashic, the complete record of your data, ready to answer.",
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
    <html lang="en">
      <head>
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
        {children}
      </body>
    </html>
  );
}
