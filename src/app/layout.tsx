import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { site } from "@/config/site";
import { stores } from "@/config/stores";
import { JsonLd } from "@/lib/json-ld";
import { organizationSchema } from "@/lib/schema";

import "./globals.css";

// The app itself is set in Inter, so the site and the screenshots match.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Voice to Tasks, Offline & Private`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "voice to-do app",
    "voice task manager",
    "offline to-do list",
    "private task app",
    "speech to tasks",
    "voice reminders",
    "on-device AI",
    "iPhone to-do app",
    "Android to-do app",
  ],
  authors: [{ name: site.company, url: site.url }],
  creator: site.company,
  publisher: site.company,
  category: "productivity",
  formatDetection: { telephone: false, email: false, address: false },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: site.locale,
    url: "/",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  // iPhone Safari shows a native "Open in App Store" banner. Only once the
  // listing is live: a banner for an app that is not out yet shows nothing.
  ...(stores.ios.live ? { itunes: { appId: stores.ios.appId } } : {}),
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-US" className={`${inter.variable} antialiased`} suppressHydrationWarning>
      <head>
        {/* Before first paint: lets CSS hide scroll-reveal content only when JS
            will be there to reveal it. suppressHydrationWarning above covers
            the class this adds to <html>. */}
        <script
          dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }}
        />
      </head>
      <body className="flex min-h-dvh flex-col bg-white font-sans">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-brand-700 focus:shadow-lift"
        >
          Skip to content
        </a>
        <JsonLd schema={organizationSchema()} />
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        {/* Cookieless and only on Vercel, where the endpoint exists. */}
        {process.env.VERCEL ? <Analytics /> : null}
      </body>
    </html>
  );
}
