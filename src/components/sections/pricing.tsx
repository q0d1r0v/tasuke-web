"use client";

import { Check } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Reveal } from "@/components/reveal";
import { Container, SectionHeading } from "@/components/ui";
import { pricing } from "@/content/facts";
import { cn } from "@/lib/cn";

type Billing = "yearly" | "monthly";

const freeIncludes = [
  "1 capture every day, spoken or typed",
  "Unlimited reminders",
  "Unlimited search and history",
  "Works fully offline",
  "No account, no ads",
];

const proIncludes = [
  "Unlimited captures",
  "Everything in Free",
  "Cancel anytime in your store settings",
];

export function Pricing() {
  const [billing, setBilling] = useState<Billing>("yearly");
  const plan = pricing[billing];

  return (
    <section id="pricing" aria-labelledby="pricing-title" className="py-24 sm:py-32">
      <Container>
        <SectionHeading
          id="pricing-title"
          eyebrow="Pricing"
          title="Free every day. Pro when you need more."
          lead="The free version has no time limit and no trial clock. Upgrade only if one capture a day isn’t enough."
        />

        <div className="mt-10 flex justify-center">
          <div
            role="radiogroup"
            aria-label="Billing period"
            className="inline-flex rounded-full border border-line bg-surface p-1"
          >
            {(["yearly", "monthly"] as const).map((option) => (
              <button
                key={option}
                type="button"
                role="radio"
                aria-checked={billing === option}
                onClick={() => setBilling(option)}
                className={cn(
                  "relative rounded-full px-5 py-2 text-sm font-semibold transition-colors",
                  billing === option
                    ? "bg-white text-ink shadow-card"
                    : "text-ink-2 hover:text-ink",
                )}
              >
                {option === "yearly" ? "Yearly" : "Monthly"}
                {option === "yearly" ? (
                  <span className="ml-2 rounded-full bg-brand-100 px-2 py-0.5 text-[11px] font-bold text-brand-700">
                    {pricing.yearly.savingsLabel}
                  </span>
                ) : null}
              </button>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-10 grid max-w-4xl gap-6 md:grid-cols-2">
          <Reveal className="h-full">
            <div className="flex h-full flex-col rounded-[2rem] border border-line bg-white p-8 shadow-card">
              <h3 className="text-lg font-bold text-ink">Free</h3>
              <p className="mt-1 text-sm text-ink-2">For everyday essentials.</p>
              <p className="mt-6 flex items-baseline gap-1.5">
                <span className="text-5xl font-extrabold tracking-tight text-ink">$0</span>
                <span className="text-ink-3">forever</span>
              </p>
              <ul className="mt-8 flex-1 space-y-3">
                {freeIncludes.map((item) => (
                  <li key={item} className="flex gap-3 text-[15px] text-ink-2">
                    <Check className="mt-0.5 size-5 shrink-0 text-brand-600" strokeWidth={2.5} />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="#download"
                className="mt-8 inline-flex items-center justify-center rounded-full border border-line bg-white px-5 py-3 text-sm font-semibold text-ink transition-colors hover:border-brand-300 hover:bg-brand-50"
              >
                Download free
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="h-full">
            <div className="relative flex h-full flex-col overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand-600 to-brand-800 p-8 text-white shadow-lift">
              <div
                aria-hidden="true"
                className="absolute -top-20 -right-20 size-64 rounded-full bg-[radial-gradient(closest-side,rgb(255_255_255/0.18),transparent)]"
              />
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold">Tasuke Pro</h3>
                <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold ring-1 ring-white/25">
                  Unlimited
                </span>
              </div>
              <p className="mt-1 text-sm text-brand-100">
                For people who put their whole day into their phone.
              </p>
              <p className="mt-6 flex items-baseline gap-1.5" aria-live="polite">
                <span className="text-5xl font-extrabold tracking-tight">{plan.label}</span>
                <span className="text-brand-100">/ {plan.period}</span>
              </p>
              <p className="mt-1 h-5 text-sm text-brand-100">
                {billing === "yearly"
                  ? `That’s ${pricing.yearly.perMonthLabel} a month, billed yearly.`
                  : "Billed monthly."}
              </p>
              <ul className="mt-6 flex-1 space-y-3">
                {proIncludes.map((item) => (
                  <li key={item} className="flex gap-3 text-[15px] text-white">
                    <Check className="mt-0.5 size-5 shrink-0 text-brand-200" strokeWidth={2.5} />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="#download"
                className="mt-8 inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-brand-800 transition-transform hover:-translate-y-px"
              >
                Get the app, upgrade inside
              </Link>
            </div>
          </Reveal>
        </div>

        <p className="mx-auto mt-8 max-w-2xl text-center text-xs leading-relaxed text-ink-3">
          Prices in US dollars; the App Store and Google Play show the price in your local currency.
          Tasuke Pro is an auto-renewing subscription, charged to your Apple or Google account at
          confirmation of purchase. It renews automatically unless cancelled at least 24 hours
          before the end of the current period. Manage or cancel anytime in your store account
          settings. See the{" "}
          <Link href="/terms" className="font-medium text-brand-700 underline underline-offset-2">
            Terms
          </Link>
          .
        </p>
      </Container>
    </section>
  );
}
