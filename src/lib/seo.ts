import type { Metadata } from "next";

import { site } from "@/config/site";

type PageMeta = {
  title?: string;
  description?: string;
  /** Site-relative path, e.g. "/privacy". Becomes the canonical URL. */
  path: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
};

/**
 * One builder for every page's metadata, so canonical, Open Graph and Twitter
 * never drift apart. The OG image comes from app/opengraph-image.tsx, which
 * Next attaches to every route automatically.
 */
export function buildMetadata({
  title,
  description = site.description,
  path,
  type = "website",
  publishedTime,
  modifiedTime,
}: PageMeta): Metadata {
  const fullTitle = title ? `${title} — ${site.name}` : undefined;

  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      url: path,
      siteName: site.name,
      locale: site.locale,
      title: fullTitle ?? `${site.name} — ${site.tagline}`,
      description,
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle ?? `${site.name} — ${site.tagline}`,
      description,
    },
  };
}
