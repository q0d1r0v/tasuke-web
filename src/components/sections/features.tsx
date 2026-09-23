import { BellRing, CalendarClock, ListChecks, ListTree, Search, Split } from "lucide-react";

import { Reveal } from "@/components/reveal";
import { Container, SectionHeading } from "@/components/ui";
import { features } from "@/content/facts";

const icons = {
  split: Split,
  dates: CalendarClock,
  review: ListChecks,
  reminders: BellRing,
  search: Search,
  groups: ListTree,
} as const;

export function Features() {
  return (
    <section id="features" aria-labelledby="features-title" className="py-24 sm:py-32">
      <Container>
        <SectionHeading
          id="features-title"
          eyebrow="Features"
          title="Built for the way you actually remember things"
          lead="In the car, on a walk, halfway through something else. Capture it in seconds and get back to what you were doing."
        />

        <ul className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => {
            const Icon = icons[feature.key];
            return (
              <li key={feature.key}>
                <Reveal delay={(i % 3) * 0.06} className="h-full">
                  <div className="h-full rounded-3xl border border-line bg-white p-7 shadow-card transition-[box-shadow,transform,border-color] duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lift">
                    <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-100 to-brand-200 text-brand-700">
                      <Icon className="size-6" />
                    </span>
                    <h3 className="mt-5 text-lg font-bold tracking-tight text-ink">
                      {feature.title}
                    </h3>
                    <p className="mt-2 leading-relaxed text-ink-2">{feature.body}</p>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
