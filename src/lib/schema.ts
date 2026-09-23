import type {
  BlogPosting,
  BreadcrumbList,
  FAQPage,
  MobileApplication,
  Organization,
  WithContext,
} from "schema-dts";

import { site } from "@/config/site";
import { stores } from "@/config/stores";
import { faqs, pricing } from "@/content/facts";

const abs = (path: string) => new URL(path, site.url).toString();

export function organizationSchema(): WithContext<Organization> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.company,
    url: site.url,
    email: site.supportEmail,
    logo: abs("/brand/icon-square-512.png"),
  };
}

/**
 * ⚠️ No `aggregateRating`, ever, until real store ratings exist — and even then
 * only mirrored from the store. Google treats self-authored ratings on an
 * app's own site as a structured-data policy violation.
 */
export function appSchema(): WithContext<MobileApplication> {
  const liveUrls: string[] = [];
  if (stores.ios.live) liveUrls.push(stores.ios.url);
  if (stores.android.live) liveUrls.push(stores.android.url);

  return {
    "@context": "https://schema.org",
    "@type": "MobileApplication",
    name: site.name,
    description: site.description,
    url: site.url,
    image: abs("/brand/icon-square-512.png"),
    applicationCategory: "ProductivityApplication",
    operatingSystem: "iOS 16.4 or later, Android",
    inLanguage: "en",
    isAccessibleForFree: true,
    publisher: { "@type": "Organization", name: site.company, url: site.url },
    ...(liveUrls.length > 0 ? { sameAs: liveUrls } : {}),
    offers: [
      {
        "@type": "Offer",
        name: "Free",
        price: "0",
        priceCurrency: pricing.currency,
      },
      {
        "@type": "Offer",
        name: "Tasuke Pro — Monthly",
        price: pricing.monthly.price.toFixed(2),
        priceCurrency: pricing.currency,
      },
      {
        "@type": "Offer",
        name: "Tasuke Pro — Yearly",
        price: pricing.yearly.price.toFixed(2),
        priceCurrency: pricing.currency,
      },
    ],
  };
}

export function faqSchema(): WithContext<FAQPage> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };
}

export function blogPostingSchema(post: {
  title: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified: string;
}): WithContext<BlogPosting> {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    url: abs(post.path),
    mainEntityOfPage: abs(post.path),
    datePublished: post.datePublished,
    dateModified: post.dateModified,
    inLanguage: "en-US",
    author: { "@type": "Organization", name: site.company, url: site.url },
    publisher: {
      "@type": "Organization",
      name: site.company,
      logo: { "@type": "ImageObject", url: abs("/brand/icon-square-512.png") },
    },
    image: abs("/opengraph-image"),
  };
}

export function breadcrumbSchema(
  items: { name: string; path?: string }[],
): WithContext<BreadcrumbList> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      ...(item.path ? { item: abs(item.path) } : {}),
    })),
  };
}
