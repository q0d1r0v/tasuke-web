import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { Container, Eyebrow } from "@/components/ui";
import { formatPostDate } from "@/lib/format";
import { getAllPosts } from "@/lib/posts";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Blog",
  description:
    "Notes from the team behind Tasuke AI: how an offline voice to-do app works, and why it has no account and no cloud.",
  path: "/blog",
});

export default async function BlogIndexPage() {
  const posts = await getAllPosts();

  return (
    <div className="relative isolate">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-80 bg-gradient-to-b from-brand-50 to-white"
      />
      <Container className="py-16 sm:py-24">
        <header className="mx-auto max-w-2xl text-center">
          <Eyebrow>Blog</Eyebrow>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-balance text-ink sm:text-5xl">
            How Tasuke AI works
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-ink-2">
            Plain explanations of what happens on your phone when you speak a task — and the choices
            behind it.
          </p>
        </header>

        <ul className="mx-auto mt-14 grid max-w-4xl gap-5">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={post.path}
                className="group block rounded-3xl border border-line bg-white p-7 shadow-card transition-[box-shadow,transform,border-color] duration-300 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-lift sm:p-8"
              >
                <time dateTime={post.date} className="text-sm font-medium text-ink-3">
                  {formatPostDate(post.date)}
                </time>
                <h2 className="mt-2 text-2xl font-bold tracking-tight text-ink group-hover:text-brand-700">
                  {post.title}
                </h2>
                <p className="mt-3 leading-relaxed text-ink-2">{post.description}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700">
                  Read the article
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
}
