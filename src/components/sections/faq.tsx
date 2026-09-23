import { Plus } from "lucide-react";

import { Container, SectionHeading } from "@/components/ui";
import { site } from "@/config/site";
import { faqs } from "@/content/facts";
import { JsonLd } from "@/lib/json-ld";
import { faqSchema } from "@/lib/schema";

/**
 * Native <details>: works without JavaScript, is keyboard- and
 * screen-reader-friendly for free, and the answers stay in the HTML that
 * search engines read. The open/close height animation is CSS-only
 * (globals.css), so browsers without ::details-content just skip it.
 */
export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="bg-surface py-24 sm:py-32">
      <JsonLd schema={faqSchema()} />
      <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            id="faq-title"
            eyebrow="FAQ"
            align="left"
            title="Questions, answered honestly"
            lead={
              <>
                Something else on your mind? Write to{" "}
                <a
                  href={`mailto:${site.supportEmail}`}
                  className="font-semibold text-brand-700 underline underline-offset-2"
                >
                  {site.supportEmail}
                </a>
                .
              </>
            }
          />
        </div>

        <div className="space-y-3">
          {faqs.map((faq) => (
            <details
              key={faq.q}
              className="faq group rounded-2xl border border-line bg-white shadow-card open:shadow-lift"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 rounded-2xl px-6 py-5 text-left text-base font-semibold text-ink">
                {faq.q}
                <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700 transition-transform duration-300 group-open:rotate-45">
                  <Plus className="size-4" strokeWidth={2.5} />
                </span>
              </summary>
              <p className="px-6 pb-6 leading-relaxed text-ink-2">{faq.a}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
