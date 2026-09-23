import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ProsePage } from "@/components/legal-page";
import { StoreBadges } from "@/components/store-badges";
import { Container } from "@/components/ui";
import { formatPostDate } from "@/lib/format";
import { JsonLd } from "@/lib/json-ld";
import { getAllPosts, getPostBySlug, postLastModified } from "@/lib/posts";
import { blogPostingSchema, breadcrumbSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

/**
 * Unknown slugs are rejected at the routing layer with a real 404. Do not add
 * a loading.tsx here: once a response starts streaming, the 404 degrades into
 * a soft-404 with a 200 status.
 */
export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  return buildMetadata({
    title: post.title,
    description: post.description,
    path: post.path,
    type: "article",
    publishedTime: post.date,
    modifiedTime: postLastModified(post),
  });
}

export default async function BlogPostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const { Content } = post;

  return (
    <>
      <JsonLd
        schema={blogPostingSchema({
          title: post.title,
          description: post.description,
          path: post.path,
          datePublished: post.date,
          dateModified: postLastModified(post),
        })}
      />
      <JsonLd
        schema={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title },
        ])}
      />

      <ProsePage
        eyebrow={
          <Link href="/blog" className="inline-flex items-center gap-1.5 hover:text-brand-800">
            <ArrowLeft className="size-4" /> Blog
          </Link>
        }
        title={post.title}
        intro={
          <time dateTime={post.date} className="text-base text-ink-3">
            {formatPostDate(post.date)}
          </time>
        }
      >
        <Content />
      </ProsePage>

      <Container className="pb-24">
        <aside className="mx-auto max-w-3xl rounded-3xl border border-brand-200 bg-gradient-to-br from-brand-50 to-white p-8 sm:p-10">
          <h2 className="text-2xl font-bold tracking-tight text-ink">Try it on your own to-dos</h2>
          <p className="mt-2 text-ink-2">
            Free to download, one free capture every day, no account.
          </p>
          <StoreBadges className="mt-6" />
        </aside>
      </Container>
    </>
  );
}
