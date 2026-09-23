import { ArrowDown, Check, Mic } from "lucide-react";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";

import { PhoneFrame } from "@/components/phone-frame";
import { StoreBadges } from "@/components/store-badges";
import { Container } from "@/components/ui";
import { site } from "@/config/site";
import { screenshots } from "@/content/screenshots";

const proofPoints = ["No account", "No tracking", "Works in airplane mode"];

/** CSS-only entrance (globals.css `.enter`): visible without waiting for JS. */
function Enter({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <div
      className={className ? `enter ${className}` : "enter"}
      style={{ "--enter-delay": `${delay}s` } as CSSProperties}
    >
      {children}
    </div>
  );
}

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden">
      {/* Background: soft brand glow + a dotted grid that fades out. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute -top-40 left-1/2 h-[42rem] w-[72rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(79_166_254/0.22),transparent)]" />
        <div className="absolute top-40 -right-40 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(closest-side,rgb(43_117_250/0.14),transparent)]" />
        <div className="bg-dots absolute inset-0" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-white" />
      </div>

      <Container className="grid items-center gap-14 pt-10 pb-20 sm:pt-16 lg:grid-cols-[1.2fr_0.8fr] lg:gap-10 lg:pt-20 lg:pb-20">
        <div className="text-center lg:text-left">
          <Enter>
            <p className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white/80 px-3.5 py-1.5 text-[13px] font-semibold text-brand-700 shadow-card backdrop-blur">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand-400 opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-brand-500" />
              </span>
              On-device speech · Works offline
            </p>
          </Enter>

          <Enter delay={0.06}>
            <h1
              id="hero-title"
              className="mt-6 text-[2.35rem] leading-[1.04] font-extrabold tracking-[-0.035em] text-ink min-[400px]:text-[2.6rem] sm:text-6xl lg:text-[4rem] xl:text-[4.4rem]"
            >
              Speak it.
              <br />
              <span className="text-gradient whitespace-nowrap">It becomes a task.</span>
            </h1>
          </Enter>

          <Enter delay={0.12}>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-pretty text-ink-2 sm:text-xl lg:mx-0">
              Say your to-dos out loud, in one breath. {site.name} splits them into separate tasks
              with the right dates and reminders — entirely on your phone, with no account and no
              internet connection.
            </p>
          </Enter>

          <Enter delay={0.18}>
            <div className="mt-8 flex flex-col items-center gap-5 lg:items-start">
              <StoreBadges className="justify-center lg:justify-start" />
              <Link
                href="#demo"
                className="group inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-800"
              >
                See it split a sentence
                <ArrowDown className="size-4 transition-transform group-hover:translate-y-0.5" />
              </Link>
            </div>
          </Enter>

          <Enter delay={0.24}>
            <ul className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-medium text-ink-2 lg:justify-start">
              {proofPoints.map((point) => (
                <li key={point} className="inline-flex items-center gap-1.5">
                  <span className="inline-flex size-5 items-center justify-center rounded-full bg-brand-100 text-brand-700">
                    <Check className="size-3.5" strokeWidth={3} />
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </Enter>
        </div>

        <Enter delay={0.15} className="relative mx-auto w-full max-w-[20rem] sm:max-w-[22rem]">
          <div
            aria-hidden="true"
            className="absolute -inset-10 -z-10 rounded-full bg-[radial-gradient(closest-side,rgb(43_127_255/0.28),transparent)]"
          />
          <div className="motion-safe:animate-float">
            <PhoneFrame
              src={screenshots.homeToday}
              alt="Tasuke AI home screen showing today's tasks, each with a time chip"
              priority
            />
          </div>

          {/* The spoken sentence that produced the second task on screen. */}
          <div
            aria-hidden="true"
            className="absolute bottom-[20%] -left-6 hidden max-w-[15rem] rounded-2xl border border-line bg-white/95 p-3 shadow-lift backdrop-blur sm:-left-28 sm:block"
          >
            <div className="flex items-start gap-2.5">
              <span className="relative mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-400 to-brand-600 text-white">
                <span className="absolute inset-0 rounded-full bg-brand-400 motion-safe:animate-pulse-ring" />
                <Mic className="relative size-4" />
              </span>
              <p className="text-[13px] leading-snug text-ink-2">
                “…at 3 PM send the build to Emily”
              </p>
            </div>
          </div>

          <div
            aria-hidden="true"
            className="absolute top-[45%] right-[-0.5rem] hidden items-center gap-2 rounded-full border border-line bg-white/95 py-2 pr-4 pl-2 text-[13px] font-semibold text-ink shadow-lift backdrop-blur sm:right-[-4rem] sm:flex"
          >
            <span className="inline-flex size-6 items-center justify-center rounded-full bg-brand-600 text-white">
              <Check className="size-3.5" strokeWidth={3} />
            </span>
            Reminder set · 7:00 PM
          </div>
        </Enter>
      </Container>
    </section>
  );
}
