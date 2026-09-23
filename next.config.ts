import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
];

const nextConfig: NextConfig = {
  // `.md` is deliberately absent: it would turn a stray README.md under
  // src/app into a public route.
  pageExtensions: ["ts", "tsx", "mdx"],

  images: {
    formats: ["image/avif", "image/webp"],
    // Next 16 coerces any quality not listed here to the closest listed one.
    qualities: [75, 90],
  },

  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

/**
 * Turbopack cannot receive JavaScript functions, so remark/rehype plugins are
 * referenced by name with plain-data options. `remarkPlugins: [remarkGfm]` —
 * the form in most tutorials — breaks the build.
 */
const withMDX = createMDX({
  options: {
    remarkPlugins: [
      "remark-frontmatter",
      ["remark-mdx-frontmatter", { name: "frontmatter" }],
      "remark-gfm",
    ],
    rehypePlugins: ["rehype-slug"],
  },
});

export default withMDX(nextConfig);
