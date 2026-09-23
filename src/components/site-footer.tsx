import Link from "next/link";

import { Logo } from "@/components/logo";
import { Container } from "@/components/ui";
import { site } from "@/config/site";

const columns = [
  {
    title: "Product",
    links: [
      { href: "/#how-it-works", label: "How it works" },
      { href: "/#features", label: "Features" },
      { href: "/#pricing", label: "Pricing" },
      { href: "/#faq", label: "FAQ" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "/blog", label: "Blog" },
      { href: "/support", label: "Support" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms of Service" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-white">
      <Container className="grid gap-12 py-14 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div className="max-w-xs">
          <Link href="/" aria-label="Tasuke AI — home">
            <Logo />
          </Link>
          <p className="mt-4 text-sm leading-relaxed text-ink-2">
            Voice to tasks, on your phone. No account, no cloud, no tracking.
          </p>
          <a
            href={`mailto:${site.supportEmail}`}
            className="mt-4 inline-block text-sm font-semibold text-brand-700 hover:text-brand-800"
          >
            {site.supportEmail}
          </a>
        </div>

        {columns.map((column) => (
          <nav key={column.title} aria-label={column.title}>
            <h2 className="text-sm font-semibold text-ink">{column.title}</h2>
            <ul className="mt-4 space-y-3">
              {column.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-ink-2 transition-colors hover:text-ink"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </Container>
      <div className="border-t border-line">
        <Container className="flex flex-col gap-2 py-6 text-xs text-ink-3 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.company}. All rights reserved.
          </p>
          <p>App Store is a service mark of Apple Inc. Google Play is a trademark of Google LLC.</p>
        </Container>
      </div>
    </footer>
  );
}
