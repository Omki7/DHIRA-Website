import { env } from "./env";

/* URL helpers. Company facts are content (content/site.ts). */

/** The canonical origin (lib/env.ts): the root layout's metadataBase. */
export const SITE_URL = env.siteUrl;

/** Absolute URL for a site path, for canonical tags and structured data. */
export const absoluteUrl = (path = "/") => `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
