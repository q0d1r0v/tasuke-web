import Image from "next/image";

import { stores, type StoreKey } from "@/config/stores";
import { cn } from "@/lib/cn";

/**
 * Official badge artwork, unmodified (Apple and Google both forbid altering
 * it). Apple's SVG is 119.66×40; Google's PNG was trimmed of its transparent
 * margin only, so both render at the same height side by side.
 */
const artwork: Record<StoreKey, { src: string; width: number; height: number }> = {
  ios: { src: "/badges/app-store.svg", width: 132, height: 44 },
  android: { src: "/badges/google-play.png", width: 148, height: 44 },
};

function Badge({ store, tone }: { store: StoreKey; tone: "light" | "dark" }) {
  const config = stores[store];
  const art = artwork[store];
  const image = (
    <Image
      src={art.src}
      alt={config.label}
      width={art.width}
      height={art.height}
      className="h-11 w-auto"
      unoptimized
    />
  );

  if (config.live) {
    return (
      <a
        href={config.url}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-[10px] transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0"
      >
        {image}
      </a>
    );
  }

  return (
    <div className="flex flex-col items-start gap-1.5">
      <span aria-hidden="true">{image}</span>
      <span
        className={cn("text-xs font-medium", tone === "dark" ? "text-brand-100" : "text-ink-3")}
      >
        {config.comingSoon}
      </span>
    </div>
  );
}

export function StoreBadges({
  className,
  tone = "light",
}: {
  className?: string;
  tone?: "light" | "dark";
}) {
  return (
    <div className={cn("flex flex-wrap items-start gap-3", className)}>
      <Badge store="ios" tone={tone} />
      <Badge store="android" tone={tone} />
    </div>
  );
}
