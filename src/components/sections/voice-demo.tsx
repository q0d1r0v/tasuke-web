"use client";

import { CalendarDays, Mic, RotateCcw, Sparkles } from "lucide-react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

import { Container, SectionHeading } from "@/components/ui";
import { demoExamples, type DemoExample } from "@/content/facts";
import { cn } from "@/lib/cn";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";

type Phase = "typing" | "thinking" | "done";

const TAB_LABELS: Record<string, string> = {
  review: "Build & App Store",
  n02: "Dentist on Friday",
  n23: "Tonight",
  n17: "Four in one breath",
};

const TYPE_MS = 26;
const THINK_MS = 800;
const HOLD_MS = 4600;

export function VoiceDemo() {
  const reduce = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.35 });

  const [index, setIndex] = useState(0);
  const [chars, setChars] = useState(0);
  const [phase, setPhase] = useState<Phase>("typing");
  const [autoplay, setAutoplay] = useState(true);

  const example: DemoExample = demoExamples[index];
  const shownChars = reduce ? example.said.length : chars;
  const shownPhase: Phase = reduce ? "done" : phase;

  const go = useCallback((next: number) => {
    setIndex(next);
    setChars(0);
    setPhase("typing");
  }, []);

  useEffect(() => {
    if (reduce || !inView) return;
    let timer: ReturnType<typeof setTimeout> | undefined;

    if (phase === "typing") {
      timer =
        chars < example.said.length
          ? setTimeout(() => setChars((c) => Math.min(c + 2, example.said.length)), TYPE_MS)
          : setTimeout(() => setPhase("thinking"), 350);
    } else if (phase === "thinking") {
      timer = setTimeout(() => setPhase("done"), THINK_MS);
    } else if (autoplay) {
      timer = setTimeout(() => go((index + 1) % demoExamples.length), HOLD_MS);
    }
    return () => clearTimeout(timer);
  }, [reduce, inView, phase, chars, example.said.length, autoplay, index, go]);

  return (
    <section
      id="demo"
      aria-labelledby="demo-title"
      className="relative scroll-mt-20 bg-gradient-to-b from-white via-brand-50/60 to-white py-20 sm:py-28"
    >
      <Container>
        <SectionHeading
          id="demo-title"
          eyebrow="See it work"
          title={
            <>
              One sentence in. <span className="text-gradient">Separate tasks out.</span>
            </>
          }
          lead="People don’t think in forms. Say everything at once — Tasuke AI finds where each task ends, reads the dates and times, and hands you a list to confirm."
        />

        {/* Screen readers get the examples as plain content, not an animation. */}
        <div className="sr-only">
          <h3>Examples</h3>
          <ul>
            {demoExamples.map((ex) => (
              <li key={ex.id}>
                You say: “{ex.said}” — Tasuke AI saves:{" "}
                {ex.tasks
                  .map((task) => `${task.title}${task.when ? ` (${task.when})` : ""}`)
                  .join("; ")}
                .
              </li>
            ))}
          </ul>
        </div>

        <div ref={ref} className="mx-auto mt-14 max-w-5xl">
          <div className="grid overflow-hidden rounded-[2rem] border border-line bg-white shadow-lift md:grid-cols-2">
            {/* You say */}
            <div className="relative flex min-h-[20rem] flex-col border-b border-line bg-gradient-to-br from-brand-50 via-white to-white p-6 sm:p-8 md:border-r md:border-b-0">
              <div aria-hidden="true" className="flex items-center gap-3">
                <span className="relative inline-flex size-11 items-center justify-center rounded-full bg-gradient-to-br from-brand-400 to-brand-600 text-white shadow-brand">
                  {shownPhase === "typing" && !reduce ? (
                    <span className="absolute inset-0 animate-pulse-ring rounded-full bg-brand-400" />
                  ) : null}
                  <Mic className="relative size-5" />
                </span>
                <div>
                  <p className="text-xs font-semibold tracking-wide text-ink-3 uppercase">
                    You say
                  </p>
                  <p className="text-sm font-medium text-ink-2">
                    {shownPhase === "typing" ? "Listening…" : "Done speaking"}
                  </p>
                </div>
              </div>

              <p
                aria-hidden="true"
                className="mt-6 flex-1 text-xl leading-relaxed font-medium text-ink sm:text-2xl sm:leading-snug"
              >
                “{example.said.slice(0, shownChars)}
                {shownPhase === "typing" ? (
                  <span className="ml-0.5 inline-block h-[1.1em] w-[2px] translate-y-[3px] animate-caret bg-brand-500" />
                ) : (
                  "”"
                )}
              </p>

              <div
                role="group"
                aria-label="Choose an example"
                className="mt-8 flex flex-wrap gap-2"
              >
                {demoExamples.map((ex, i) => (
                  <button
                    key={ex.id}
                    type="button"
                    aria-pressed={i === index}
                    onClick={() => {
                      setAutoplay(false);
                      go(i);
                    }}
                    className={cn(
                      "rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors",
                      i === index
                        ? "border-brand-600 bg-brand-600 text-white"
                        : "border-line bg-white text-ink-2 hover:border-brand-300 hover:text-ink",
                    )}
                  >
                    {TAB_LABELS[ex.id] ?? `Example ${i + 1}`}
                  </button>
                ))}
                {!autoplay ? (
                  <button
                    type="button"
                    onClick={() => go(index)}
                    className="inline-flex items-center gap-1 rounded-full px-2 py-1.5 text-xs font-semibold text-brand-700 hover:text-brand-800"
                  >
                    <RotateCcw className="size-3.5" /> Replay
                  </button>
                ) : null}
              </div>
            </div>

            {/* Tasuke AI saves — styled after the app's own confirm screen. */}
            <div aria-hidden="true" className="flex min-h-[20rem] flex-col bg-surface p-6 sm:p-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold tracking-wide text-ink-3 uppercase">
                    Tasuke AI found
                  </p>
                  <p className="text-sm font-medium text-ink-2">
                    {shownPhase === "done"
                      ? `${example.tasks.length} tasks — confirm to save`
                      : shownPhase === "thinking"
                        ? "Reading dates and times…"
                        : "Waiting for you to finish"}
                  </p>
                </div>
                <Sparkles
                  className={cn(
                    "size-5 text-brand-500 transition-opacity",
                    shownPhase === "thinking" ? "animate-pulse opacity-100" : "opacity-40",
                  )}
                />
              </div>

              <div className="mt-6 min-h-[21.5rem] flex-1">
                <AnimatePresence mode="wait">
                  {shownPhase === "done" ? (
                    <motion.ul
                      key={`tasks-${example.id}`}
                      className="space-y-3"
                      initial="hidden"
                      animate="shown"
                      exit={{ opacity: 0, transition: { duration: 0.15 } }}
                      variants={{ shown: { transition: { staggerChildren: reduce ? 0 : 0.12 } } }}
                    >
                      {example.tasks.map((task) => (
                        <motion.li
                          key={task.title}
                          variants={{
                            hidden: reduce ? { opacity: 1 } : { opacity: 0, y: 14, scale: 0.98 },
                            shown: {
                              opacity: 1,
                              y: 0,
                              scale: 1,
                              transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
                            },
                          }}
                          className="flex items-center gap-4 rounded-2xl bg-white px-4 py-3.5 shadow-card"
                        >
                          <span className="size-5 shrink-0 rounded-full border-2 border-brand-200" />
                          <div className="min-w-0">
                            <p className="truncate text-[15px] font-semibold text-ink">
                              {task.title}
                            </p>
                            <p className="mt-1.5 inline-flex items-center gap-1.5 rounded-full bg-brand-100 px-2.5 py-1 text-xs font-medium text-ink-2">
                              <CalendarDays className="size-3.5 text-brand-600" />
                              {task.when ?? "No date"}
                            </p>
                          </div>
                        </motion.li>
                      ))}
                    </motion.ul>
                  ) : (
                    <motion.ul
                      key="skeleton"
                      className="space-y-3"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, transition: { duration: 0.12 } }}
                    >
                      {[0, 1].map((i) => (
                        <li
                          key={i}
                          className="flex items-center gap-4 rounded-2xl bg-white/70 px-4 py-3.5"
                        >
                          <span className="size-5 shrink-0 rounded-full border-2 border-line" />
                          <div className="flex-1 space-y-2">
                            <span
                              className={cn(
                                "block h-3.5 w-2/3 rounded-full bg-line",
                                shownPhase === "thinking" && "animate-pulse",
                              )}
                            />
                            <span
                              className={cn(
                                "block h-3 w-1/3 rounded-full bg-brand-100",
                                shownPhase === "thinking" && "animate-pulse",
                              )}
                            />
                          </div>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        <p className="mx-auto mt-5 max-w-2xl text-center text-sm text-ink-3">
          An illustration: the sentences come from the app’s test suite, and each result is what the
          app’s task extractor produces for it. In the app you speak, and the words are transcribed
          on your phone.
        </p>
      </Container>
    </section>
  );
}
