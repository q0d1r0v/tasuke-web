import { LogoMark } from "@/components/logo";
import { Reveal } from "@/components/reveal";
import { StoreBadges } from "@/components/store-badges";
import { Container } from "@/components/ui";

export function FinalCta() {
  return (
    <section id="download" aria-labelledby="download-title" className="py-24 sm:py-32">
      <Container>
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-[2.5rem] border border-brand-200 bg-gradient-to-b from-brand-50 to-white px-6 py-16 text-center sm:px-12 sm:py-20">
            <div aria-hidden="true" className="bg-dots absolute inset-0 -z-10 opacity-70" />
            <div
              aria-hidden="true"
              className="absolute -top-32 left-1/2 -z-10 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(43_127_255/0.25),transparent)]"
            />

            <LogoMark className="mx-auto size-16 drop-shadow-[0_12px_24px_rgb(43_127_255/0.35)]" />
            <h2
              id="download-title"
              className="mx-auto mt-6 max-w-2xl text-3xl font-bold tracking-tight text-balance text-ink sm:text-5xl sm:leading-[1.08]"
            >
              Your next to-do is <span className="text-gradient">one sentence away.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-ink-2">
              Free to download, with one free capture every day for as long as you like. No account
              to create — open it and start talking.
            </p>
            <StoreBadges className="mt-9 justify-center" />
            <p className="mt-6 text-sm text-ink-3">
              For iPhone (iOS 16.4 or later) and Android phones. Speech recognition is in English.
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
