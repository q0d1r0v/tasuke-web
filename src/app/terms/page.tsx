import type { Metadata } from "next";

import { ProsePage } from "@/components/legal-page";
import { buildMetadata } from "@/lib/seo";

import Terms from "../../../content/legal/terms.mdx";

export const metadata: Metadata = buildMetadata({
  title: "Terms of Service",
  description:
    "The terms for using Tasuke AI: the free allowance, Tasuke Pro subscriptions, your content, and what the app can and cannot promise.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <ProsePage eyebrow="Legal" title="Terms of Service">
      <Terms />
    </ProsePage>
  );
}
