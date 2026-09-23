import Image, { type StaticImageData } from "next/image";

import { cn } from "@/lib/cn";

/**
 * A plain device frame around a real in-app screenshot (see
 * content/screenshots.ts).
 */
export function PhoneFrame({
  src,
  alt,
  priority = false,
  className,
  sizes = "(min-width: 1024px) 300px, 70vw",
}: {
  src: StaticImageData;
  alt: string;
  priority?: boolean;
  className?: string;
  sizes?: string;
}) {
  return (
    <div
      className={cn(
        "relative rounded-[2.6rem] bg-[#0f1a2e] p-[10px] shadow-lift ring-1 ring-black/10",
        className,
      )}
    >
      <div className="relative aspect-[9/16] overflow-hidden rounded-[2rem] bg-surface">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          quality={90}
          placeholder="blur"
          className="object-cover object-top"
        />
      </div>
      <span
        aria-hidden="true"
        className="absolute top-[18px] left-1/2 h-[18px] w-[76px] -translate-x-1/2 rounded-full bg-[#0f1a2e]"
      />
    </div>
  );
}
