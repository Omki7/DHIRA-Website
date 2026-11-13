/* Next.js configuration. Security headers follow the Next.js guide for a
   static site without nonces (nextjs.org/docs/app/guides/content-security-policy):
   nonces would force every page to render per request. The only third-party
   origin is Google Fonts (app/layout.tsx). A CMS whose images are served
   from its own CDN adds that host to `img-src` and to `images.remotePatterns`. */

import { fileURLToPath } from "node:url";

const isDev = process.env.NODE_ENV === "development";

const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data: blob: http://44.237.23.212:4000 http://localhost:4000 https://*.dhira.ai",
  `connect-src 'self'${isDev ? " ws:" : ""}`,
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "44.237.23.212",
        port: "4000",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "4000",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "**.dhira.ai",
        pathname: "/uploads/**",
      },
    ],
  },
  /* Server Actions take 1 MB by default. A job application may attach a
     resume of up to 4 MB (features/contact, 5 Nov 2026), so the limit is
     4.5 MB: the file plus the form's text and multipart overhead, and the
     most Vercel accepts in one request body. */
  experimental: {
    serverActions: {
      bodySizeLimit: "4.5mb",
    },
  },
  /* SCSS Modules resolve shared styles from src/: every module starts with
     `@use "assets/styles" as *;` for the tokens and mixins. */
  sassOptions: {
    loadPaths: [fileURLToPath(new URL("./src", import.meta.url))],
  },
  /* Every URL names its page as the menu does (26 Oct 2026, user: "when we
     click services, URL shows delivery"). Old paths redirect for good;
     browsers keep the #fragment across a redirect, so deep links such as
     /delivery#model-saas still land on their section. */
  async redirects() {
    return [
      { source: "/delivery", destination: "/services", permanent: true },
      { source: "/solutions/eis", destination: "/solutions/enterprise-intelligence", permanent: true },
    ];
  },
  /* The Platform and Resources menus name their URL as the menu does
     (/platform, /resources) while the pages themselves stay at /akashic
     (the product) and /insights (the hub), which the rest of the site and
     the section anchors reference. A rewrite serves that content under the
     menu's own path, so the address bar reads /platform and /resources
     without moving or duplicating the pages. */
  async rewrites() {
    return [
      { source: "/platform", destination: "/akashic" },
      { source: "/resources", destination: "/insights" },
    ];
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      /* Preview and test deployments on *.vercel.app stay out of search
         results (UX review, 23 Oct 2026). A header, not a robots.txt
         disallow: crawlers must fetch a page to see its noindex. */
      {
        source: "/:path*",
        has: [{ type: "host", value: ".*\\.vercel\\.app" }],
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
};

export default nextConfig;
