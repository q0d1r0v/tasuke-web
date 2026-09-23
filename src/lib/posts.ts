import fs from "node:fs";
import path from "node:path";
import type { ComponentType } from "react";
import { z } from "zod";

/**
 * The blog content layer. Server-only.
 *
 * ONE module owns the post list: `generateStaticParams`, the blog index,
 * `generateMetadata` and `sitemap.ts` all import from here. If the sitemap
 * globbed the filesystem on its own, drafts would leak into it and nobody
 * would notice for months.
 *
 * IMPLEMENTATION NOTE — do not "modernise" this to `import.meta.glob`.
 * Turbopack in Next 16.3.1 does not implement it: every pattern returns an
 * empty object *silently*, with no build error, so the blog just goes blank.
 * Verified against this exact version. The filesystem listing plus the
 * documented template-literal dynamic import is the combination that works.
 */

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");

const frontmatterSchema = z.object({
  /**
   * The URL slug. Deliberately a frontmatter field rather than the filename:
   * files get renamed during editing, indexed URLs must not.
   */
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "slug must be lowercase-kebab-case"),
  title: z.string().min(1),
  /** Used verbatim as the meta description. Keep it under ~160 characters. */
  description: z.string().min(1),
  /** YYYY-MM-DD */
  date: z.iso.date(),
  /** YYYY-MM-DD. Feeds <lastmod> and BlogPosting.dateModified. */
  updated: z.iso.date().optional(),
  tags: z.array(z.string()).default([]),
  draft: z.boolean().default(false),
});

export type PostFrontmatter = z.infer<typeof frontmatterSchema>;

export type Post = PostFrontmatter & {
  /** The compiled MDX body. */
  Content: ComponentType;
  /** Site-relative canonical path. */
  path: string;
};

type MdxModule = {
  default: ComponentType;
  frontmatter?: unknown;
};

function listContentFiles(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""))
    .sort();
}

async function loadPosts(): Promise<Post[]> {
  const posts = await Promise.all(
    listContentFiles().map(async (name): Promise<Post> => {
      // The literal `.mdx` suffix is what lets Turbopack build the context
      // module for this directory. Do not move the extension into the variable.
      const mod = (await import(`../../content/blog/${name}.mdx`)) as unknown as MdxModule;

      const parsed = frontmatterSchema.safeParse(mod.frontmatter);

      if (!parsed.success) {
        // Fail the build, not a production request.
        throw new Error(
          `Invalid frontmatter in content/blog/${name}.mdx:\n${JSON.stringify(
            z.flattenError(parsed.error).fieldErrors,
            null,
            2,
          )}`,
        );
      }

      return {
        ...parsed.data,
        Content: mod.default,
        path: `/blog/${parsed.data.slug}`,
      };
    }),
  );

  const duplicate = posts
    .map((post) => post.slug)
    .find((slug, index, all) => all.indexOf(slug) !== index);

  if (duplicate) {
    throw new Error(`Duplicate blog slug: "${duplicate}"`);
  }

  // Newest first; same-day posts keep file-name order (01-, 02-, …).
  return posts.sort((a, b) => b.date.localeCompare(a.date));
}

// Memoised for the build. Skipped in development so edits show up immediately.
let cached: Promise<Post[]> | undefined;

function allPosts(): Promise<Post[]> {
  if (process.env.NODE_ENV === "development") return loadPosts();
  cached ??= loadPosts();
  return cached;
}

/** Published posts, newest first. Drafts are visible in `next dev` only. */
export async function getAllPosts(): Promise<Post[]> {
  const posts = await allPosts();
  if (process.env.NODE_ENV === "development") return posts;
  return posts.filter((post) => !post.draft);
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  const posts = await getAllPosts();
  return posts.find((post) => post.slug === slug);
}

/** ISO date this post should report as last modified. */
export function postLastModified(post: Post): string {
  return post.updated ?? post.date;
}
