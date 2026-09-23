import { BellRing } from "lucide-react";
import Image from "next/image";

import { Reveal } from "@/components/reveal";
import { Container, SectionHeading } from "@/components/ui";

const steps = [
  {
    n: "01",
    title: "Tap and speak",
    body: "No forms to fill in. Tap the microphone and say what’s on your mind — several things at once is fine.",
    art: "/brand/guide_voice.svg",
  },
  {
    n: "02",
    title: "Check the list",
    body: "Each task appears with its own date and time. Fix anything that’s off, then save. Nothing is saved without you seeing it.",
    art: "/brand/guide_tasks.svg",
  },
  {
    n: "03",
    title: "Get reminded",
    body: "Tasks with a time get a reminder scheduled by your phone, so it arrives on time even when the app is closed.",
    art: null,
  },
] as const;

export function HowItWorks() {
  return (
    <section id="how-it-works" aria-labelledby="how-title" className="py-24 sm:py-32">
      <Container>
        <SectionHeading
          id="how-title"
          eyebrow="How it works"
          title="From thought to reminder in three steps"
          lead="No typing into date pickers, no deciding where one task ends and the next begins."
        />

        <ol className="mt-16 grid gap-6 md:grid-cols-3">
          {steps.map((step, i) => (
            <li key={step.n}>
              <Reveal delay={i * 0.08} className="h-full">
                <div className="group relative h-full overflow-hidden rounded-3xl border border-line bg-white p-7 shadow-card transition-[box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-lift">
                  <div className="relative mx-auto flex h-40 items-center justify-center">
                    {step.art ? (
                      <Image src={step.art} alt="" width={160} height={160} className="size-40" />
                    ) : (
                      <span className="relative inline-flex size-28 items-center justify-center rounded-full bg-[radial-gradient(closest-side,rgb(47_139_255/0.22),transparent)]">
                        <span className="inline-flex size-20 items-center justify-center rounded-[1.6rem] bg-gradient-to-br from-brand-400 to-brand-600 text-white shadow-brand">
                          <BellRing className="size-9" strokeWidth={2.2} />
                        </span>
                      </span>
                    )}
                  </div>
                  <p className="mt-6 text-sm font-bold text-brand-700">{step.n}</p>
                  <h3 className="mt-1 text-xl font-bold tracking-tight text-ink">{step.title}</h3>
                  <p className="mt-2 leading-relaxed text-ink-2">{step.body}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
