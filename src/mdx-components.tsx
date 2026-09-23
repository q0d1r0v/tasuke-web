import type { MDXComponents } from "mdx/types";
import Link from "next/link";

/**
 * Global component map for every MDX file. Required by @next/mdx with the App
 * Router. Typography comes from `prose` on the wrapper; this map only handles
 * what Typography cannot.
 */
const components: MDXComponents = {
  // The page template owns the <h1>, so a `#` inside a post becomes an <h2>.
  h1: ({ children, ...props }) => <h2 {...props}>{children}</h2>,

  a: ({ href, children, ...props }) => {
    const target = String(href ?? "");
    if (target.startsWith("/") || target.startsWith("#")) {
      return (
        <Link href={target} {...props}>
          {children}
        </Link>
      );
    }
    return (
      <a href={target} rel="noopener noreferrer" target="_blank" {...props}>
        {children}
      </a>
    );
  },
};

export function useMDXComponents(): MDXComponents {
  return components;
}
