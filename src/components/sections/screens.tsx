import { PhoneFrame } from "@/components/phone-frame";
import { Reveal } from "@/components/reveal";
import { Container, SectionHeading } from "@/components/ui";
import { screenshots } from "@/content/screenshots";
import { cn } from "@/lib/cn";

const screens = [
  {
    src: screenshots.upcoming,
    alt: "Upcoming tab with tasks grouped by day",
    label: "Upcoming, grouped by day",
  },
  {
    src: screenshots.homeToday,
    alt: "Today tab with four timed tasks",
    label: "Today at a glance",
  },
  {
    src: screenshots.stats,
    alt: "Stats screen with pending and completed counts, a streak and the last seven days",
    label: "Stats and streaks",
  },
] as const;

export function Screens() {
  return (
    <section aria-labelledby="screens-title" className="overflow-hidden bg-surface py-24 sm:py-32">
      <Container>
        <SectionHeading
          id="screens-title"
          eyebrow="Inside the app"
          title="Calm, clear, and out of your way"
          lead="Real screens from the app. No feeds and no ads — just what you have to do, and when."
        />

        {/* Mobile: a swipeable row. Desktop: three phones, the middle one raised. */}
        <ul className="-mx-4 mt-16 flex snap-x snap-mandatory [scrollbar-width:none] gap-6 overflow-x-auto px-4 pb-6 sm:-mx-6 sm:px-6 lg:mx-0 lg:grid lg:grid-cols-3 lg:items-end lg:gap-10 lg:overflow-visible lg:px-0">
          {screens.map((screen, i) => (
            <li
              key={screen.label}
              className={cn(
                "w-[68vw] max-w-[17rem] shrink-0 snap-center lg:w-auto lg:max-w-none",
                i === 1 && "lg:-translate-y-10",
              )}
            >
              <Reveal delay={i * 0.08}>
                <PhoneFrame
                  src={screen.src}
                  alt={screen.alt}
                  sizes="(min-width: 1024px) 320px, 68vw"
                  className="mx-auto lg:max-w-[18.5rem]"
                />
                <p className="mt-5 text-center text-sm font-semibold text-ink-2">{screen.label}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
