import { cn } from "@/lib/cn";

/** The app icon's wave mark, drawn inline so it stays crisp at any size. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 512 512" aria-hidden="true" className={cn("size-8", className)}>
      <defs>
        <linearGradient
          id="tasuke-mark"
          x1="64"
          y1="32"
          x2="448"
          y2="480"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#4FA6FE" />
          <stop offset="1" stopColor="#2B75FA" />
        </linearGradient>
      </defs>
      <rect x="16" y="16" width="480" height="480" rx="120" fill="url(#tasuke-mark)" />
      <path
        d="M128 270C145 270 157 252 169 230L205 165C218 142 249 144 260 168L306 287C314 307 339 311 352 294L386 249"
        stroke="#fff"
        strokeWidth="38"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark />
      <span className="text-[1.05rem] font-bold tracking-tight text-ink">
        Tasuke <span className="text-brand-600">AI</span>
      </span>
    </span>
  );
}
