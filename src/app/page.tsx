import type { Metadata } from "next";

import { Faq } from "@/components/sections/faq";
import { Features } from "@/components/sections/features";
import { FinalCta } from "@/components/sections/final-cta";
import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Pricing } from "@/components/sections/pricing";
import { PrivacySection } from "@/components/sections/privacy";
import { Screens } from "@/components/sections/screens";
import { VoiceDemo } from "@/components/sections/voice-demo";
import { JsonLd } from "@/lib/json-ld";
import { appSchema } from "@/lib/schema";

// Canonical lives here, not in the layout: a layout canonical would be
// inherited by the 404 page and point it at the home page.
export const metadata: Metadata = { alternates: { canonical: "/" } };

export default function HomePage() {
  return (
    <>
      <JsonLd schema={appSchema()} />
      <Hero />
      <VoiceDemo />
      <HowItWorks />
      <PrivacySection />
      <Features />
      <Screens />
      <Pricing />
      <Faq />
      <FinalCta />
    </>
  );
}
