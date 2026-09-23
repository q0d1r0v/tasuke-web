import { CloudOff, EyeOff, MicOff, Plane, UserX } from "lucide-react";
import Link from "next/link";

import { Reveal } from "@/components/reveal";
import { Container } from "@/components/ui";
import { privacyPoints } from "@/content/facts";

const icons = {
  "No account": UserX,
  "No tracking": EyeOff,
  "No cloud": CloudOff,
  "No recordings kept": MicOff,
} as const;

export function PrivacySection() {
  return (
    <section id="privacy" aria-labelledby="privacy-title" className="py-12 sm:py-16">
      <Container>
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#1e5fd8] via-brand-800 to-brand-900 px-6 py-14 sm:px-12 sm:py-20 lg:px-16">
            <div
              aria-hidden="true"
              className="absolute -top-24 -right-24 -z-10 size-[28rem] rounded-full bg-[radial-gradient(closest-side,rgb(79_166_254/0.45),transparent)]"
            />
            <div
              aria-hidden="true"
              className="absolute -bottom-32 -left-20 -z-10 size-[24rem] rounded-full bg-[radial-gradient(closest-side,rgb(255_255_255/0.12),transparent)]"
            />

            <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.05fr]">
              <div>
                <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold tracking-wide text-white uppercase ring-1 ring-white/20">
                  <Plane className="size-3.5" /> Works in airplane mode
                </p>
                <h2
                  id="privacy-title"
                  className="mt-5 text-3xl font-bold tracking-tight text-balance text-white sm:text-4xl lg:text-5xl lg:leading-[1.08]"
                >
                  Everything happens on your phone.
                </h2>
                <p className="mt-5 max-w-xl text-lg leading-relaxed text-brand-100">
                  The speech model is built into the app, and so are the rules that turn words into
                  tasks. Nothing to download after you install it, nothing uploaded while you use it
                  — so it works on a plane, in a basement, or on a train through a tunnel.
                </p>
                <Link
                  href="/privacy"
                  className="mt-7 inline-flex items-center gap-1 text-sm font-semibold text-white underline decoration-white/40 underline-offset-4 hover:decoration-white"
                >
                  Read the privacy policy
                </Link>
              </div>

              <ul className="grid gap-4 sm:grid-cols-2">
                {privacyPoints.map((point) => {
                  const Icon = icons[point.title];
                  return (
                    <li
                      key={point.title}
                      className="rounded-2xl bg-white/[0.08] p-5 ring-1 ring-white/15 backdrop-blur-sm"
                    >
                      <span className="inline-flex size-10 items-center justify-center rounded-xl bg-white text-brand-700">
                        <Icon className="size-5" />
                      </span>
                      <h3 className="mt-4 text-lg font-semibold text-white">{point.title}</h3>
                      <p className="mt-1.5 text-[15px] leading-relaxed text-brand-100">
                        {point.body}
                      </p>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
