"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

import { cn } from "@/lib/cn";

/**
 * Fades and lifts its children in the first time they scroll into view.
 *
 * ⚠️ Deliberately CSS + IntersectionObserver, not a motion component. A JS
 * animation library renders `style="opacity:0"` into the server HTML, which
 * (1) hides the content until hydration — bad for LCP and for anyone without
 * JS — and (2) under prefers-reduced-motion hydrates to different markup than
 * the server sent, and React does not patch attribute mismatches, so the
 * content can stay invisible. Here the server and client markup are identical;
 * the observer only adds a class. The hidden state only applies once the
 * `js` class is on <html> (set inline in the layout), and reduced motion
 * shows everything immediately (globals.css).
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn("reveal", className)}
      style={delay ? ({ "--reveal-delay": `${delay}s` } as CSSProperties) : undefined}
    >
      {children}
    </div>
  );
}
