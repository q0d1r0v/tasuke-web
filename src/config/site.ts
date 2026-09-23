/**
 * Site-wide constants. Server-only values (the origin) are resolved here once
 * so metadata, sitemap, robots and JSON-LD can never disagree about the URL.
 */

function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/+$/, "");

  // Vercel exposes the production domain to every build, preview ones too.
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercel) return `https://${vercel}`;

  if (process.env.NODE_ENV === "production") {
    // A wrong canonical is worse than a failed build: every page would point
    // search engines at localhost.
    throw new Error(
      "NEXT_PUBLIC_SITE_URL is not set. Set it to the site's public origin, " +
        "e.g. https://tasuke.app — see .env.example.",
    );
  }
  return "http://localhost:3000";
}

export const site = {
  name: "Tasuke AI",
  url: resolveSiteUrl(),
  tagline: "Speak it. It becomes a task.",
  description:
    "Say your to-dos out loud. Tasuke AI turns one sentence into separate tasks with the right dates and reminders — processed entirely on your iPhone or Android phone, with no account and no internet connection.",
  supportEmail: "info@digital-group.uz",
  company: "Digital Group",
  locale: "en_US",
} as const;
