import type { MetadataRoute } from "next";

import { site } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  // Vercel preview deployments must not compete with production in search.
  const isPreview = process.env.VERCEL_ENV === "preview";

  return {
    rules: isPreview ? { userAgent: "*", disallow: "/" } : { userAgent: "*", allow: "/" },
    sitemap: new URL("/sitemap.xml", site.url).toString(),
    host: site.url,
  };
}
