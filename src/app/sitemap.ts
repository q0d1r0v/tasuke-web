import type { MetadataRoute } from "next";

import { site } from "@/config/site";
import { getAllPosts, postLastModified } from "@/lib/posts";

// Bump when the page's content meaningfully changes; a sitemap that claims
// every page changed on every deploy teaches crawlers to ignore <lastmod>.
const STATIC_UPDATED = "2026-09-23";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const url = (path: string) => new URL(path, site.url).toString();
  const posts = await getAllPosts();

  return [
    { url: url("/"), lastModified: STATIC_UPDATED, changeFrequency: "weekly", priority: 1 },
    {
      url: url("/blog"),
      lastModified: posts[0]?.date ?? STATIC_UPDATED,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...posts.map((post) => ({
      url: url(post.path),
      lastModified: postLastModified(post),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    {
      url: url("/support"),
      lastModified: STATIC_UPDATED,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: url("/privacy"),
      lastModified: STATIC_UPDATED,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    { url: url("/terms"), lastModified: STATIC_UPDATED, changeFrequency: "yearly", priority: 0.3 },
  ];
}
