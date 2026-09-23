import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/ui";

// Next already emits `noindex` for not-found responses.
export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <p className="text-sm font-semibold text-brand-700">404</p>
      <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
        This page doesn’t exist
      </h1>
      <p className="mt-4 max-w-md text-lg text-ink-2">
        The link may be old, or the address mistyped.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-brand hover:bg-brand-700"
      >
        Back to the home page
      </Link>
    </Container>
  );
}
