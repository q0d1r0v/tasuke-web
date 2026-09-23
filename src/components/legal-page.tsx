import type { ReactNode } from "react";

import { Container } from "@/components/ui";

/** Shared shell for the long-form text pages (legal, support, blog posts). */
export function ProsePage({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow?: ReactNode;
  title: string;
  intro?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="relative isolate">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-80 bg-gradient-to-b from-brand-50 to-white"
      />
      <Container className="py-16 sm:py-24">
        <article className="mx-auto max-w-3xl">
          <header className="border-b border-line pb-8">
            {eyebrow ? <div className="text-sm font-semibold text-brand-700">{eyebrow}</div> : null}
            <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-balance text-ink sm:text-5xl">
              {title}
            </h1>
            {intro ? <div className="mt-4 text-lg leading-relaxed text-ink-2">{intro}</div> : null}
          </header>
          <div className="prose prose-lg mt-10 max-w-[68ch] prose-headings:tracking-tight prose-a:font-medium prose-a:underline-offset-2">
            {children}
          </div>
        </article>
      </Container>
    </div>
  );
}
