import type { Metadata } from "next";

import { ProsePage } from "@/components/legal-page";
import { buildMetadata } from "@/lib/seo";

import PrivacyPolicy from "../../../content/legal/privacy.mdx";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description:
    "Tasuke AI collects nothing. No account, no server, no analytics — your voice, transcripts and tasks stay on your phone.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <ProsePage eyebrow="Legal" title="Privacy Policy">
      <PrivacyPolicy />

      <hr />
      <h2 id="this-website">About this website</h2>
      <p>
        The policy above covers the Tasuke AI app. This website sets no cookies and has no sign-up
        or contact form. If page-view statistics are enabled on the hosting platform (Vercel Web
        Analytics), they are anonymous and aggregated, use no cookies, and cannot identify you.
      </p>
    </ProsePage>
  );
}
