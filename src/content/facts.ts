/**
 * Every factual claim the site makes about the app, in one place.
 *
 * ⚠️ Nothing goes in here that cannot be pointed at in the app repo
 * (github.com/q0d1r0v/tasuke-ai). The source of each block is named above it;
 * when the app changes, change the source first, then this file.
 *
 * Never add: ratings, review counts, download numbers, testimonials, press
 * logos, or countdown/"limited offer" urgency. scripts/check-claims.mjs fails
 * the build on the common shapes of those.
 */

// Source: store/PRODUCTS.md, lib/core/purchases/product_ids.dart
export const pricing = {
  currency: "USD",
  monthly: { price: 4.99, label: "$4.99", period: "month" },
  yearly: {
    price: 39.99,
    label: "$39.99",
    period: "year",
    // 39.99 / (4.99 × 12) = 0.668 → 33% saved; 39.99 / 12 = 3.3325
    perMonthLabel: "$3.33",
    savingsLabel: "Save 33%",
  },
  freeTrial: false,
} as const;

// Source: store/REVIEW_NOTES.md "Free tier and the paywall", assets/legal/terms_en.md §3
export const freeTier = {
  capturesPerDay: 1,
  resetsAt: "local midnight",
  unlimited: ["reminders", "search", "history"],
} as const;

// Source: store/store-listing.txt "WHAT IT DOES"
export const features = [
  {
    key: "split",
    title: "Several tasks in one breath",
    body: "Speak naturally. One sentence with three to-dos becomes three separate tasks.",
  },
  {
    key: "dates",
    title: "Understands real dates",
    body: "“Tomorrow at 3”, “next Friday”, “in two weeks”, “the 14th”, “Monday morning”.",
  },
  {
    key: "review",
    title: "You check it before it saves",
    body: "Every extracted task is shown on a confirmation screen first. Nothing lands in your list unchecked.",
  },
  {
    key: "reminders",
    title: "Reminders that arrive on time",
    body: "Local notifications scheduled by your phone, so they fire even with the app closed.",
  },
  {
    key: "search",
    title: "Search everything",
    body: "Search across every task you have ever captured — offline, like everything else.",
  },
  {
    key: "groups",
    title: "Your week, already sorted",
    body: "Today, Upcoming and Completed tabs, with upcoming tasks grouped by day.",
  },
] as const;

// Source: store/store-listing.txt "WHAT IT DOES NOT DO", store/REVIEW_NOTES.md
export const privacyPoints = [
  { title: "No account", body: "No email address, no password, no sign-up screen." },
  {
    title: "No tracking",
    body: "No analytics, no crash reporting, no ads, no attribution SDK.",
  },
  {
    title: "No cloud",
    body: "There is no server. Your tasks live in a database on your phone.",
  },
  {
    title: "No recordings kept",
    body: "Audio streams into the on-device speech model and is discarded. No audio file is ever written.",
  },
] as const;

// Source: store/REVIEW_NOTES.md, README.md, store/METRICS.md
export const limitations = {
  speechLanguages: ["English"],
  platforms: "iPhone and Android phones",
  iosMinimum: "iOS 16.4",
  iPad: false,
} as const;

/**
 * The voice demo. Every sentence and every expected result below comes from
 * the app's own test fixtures, so the demo only ever shows an
 * output the extractor is tested to produce:
 *   - #1: the App Review test script in store/REVIEW_NOTES.md, with the person's
 *     name changed to Emily. The rule-based extractor was re-run on this exact
 *     sentence (2026-09-23): same two tasks, same dates, same reminder.
 *   - #2–#4: test/fixtures/nl/extraction_typed_pairs_corpus.json (n02, n23, n17),
 *     a corpus test/features/extraction/extraction_quality_test.dart holds at
 *     100 % exact today.
 * The corpus is dated Wednesday 2026-09-23; dates are shown relative to that day.
 */
export type DemoTask = { title: string; when?: string };
export type DemoExample = { id: string; said: string; tasks: DemoTask[] };

export const demoExamples: DemoExample[] = [
  {
    id: "review",
    said: "Tomorrow at 3 PM send the build to Emily and Friday check App Store",
    tasks: [
      { title: "Send the build to Emily", when: "Tomorrow, 3:00 PM" },
      { title: "Check App Store", when: "Friday" },
    ],
  },
  {
    id: "n02",
    said: "On Friday at 10am I have a dentist appointment, and after that buy flowers for mom.",
    tasks: [
      { title: "Dentist appointment", when: "Friday, 10:00 AM" },
      { title: "Buy flowers for mom", when: "Friday" },
    ],
  },
  {
    id: "n23",
    said: "Water the garden plants tonight and take out the trash.",
    tasks: [
      { title: "Water the garden plants", when: "Today, 8:00 PM" },
      { title: "Take out the trash", when: "Today" },
    ],
  },
  {
    id: "n17",
    said: "Remind me to call Otabek at 5, to order the cake on Friday, to check the hall tomorrow and to buy candles.",
    tasks: [
      { title: "Call Otabek", when: "Today, 5:00 PM" },
      { title: "Order the cake", when: "Friday" },
      { title: "Check the hall", when: "Tomorrow" },
      { title: "Buy candles" },
    ],
  },
];

export type Faq = { q: string; a: string };

// Sources: store/REVIEW_NOTES.md, assets/legal/privacy_en.md, assets/legal/terms_en.md
export const faqs: Faq[] = [
  {
    q: "Does Tasuke AI really work without internet?",
    a: "Yes. The speech model is built into the app, and turning what you said into tasks happens on your phone. Voice capture, tasks and reminders all work in airplane mode from the first launch. Only viewing, buying and restoring Tasuke Pro go through the App Store or Google Play and need a connection.",
  },
  {
    q: "Where is my data stored?",
    a: "Only on your phone, in the app's private storage. There is no account and no server, so we have no copy of your voice, transcripts or tasks. If your phone's own backup (iCloud or Google) is switched on, the app data is included in that encrypted backup.",
  },
  {
    q: "Is my voice recorded?",
    a: "No audio file is ever written. While the recording screen is open, audio streams into the on-device speech model and is discarded as it is processed. The microphone is never used in the background.",
  },
  {
    q: "Which languages does it understand?",
    a: "English, for now. The built-in speech model is an English model, so speak your tasks in English.",
  },
  {
    q: "What do I get for free?",
    a: "One capture every day, spoken or typed, with no time limit. Reminders, search and history are unlimited. The counter resets at local midnight, and a capture that failed — silence, or speech that could not be transcribed — does not count.",
  },
  {
    q: "What does Tasuke Pro add, and what does it cost?",
    a: "Pro removes the daily capture limit. It is $4.99 per month or $39.99 per year in the US; your store shows the price in your local currency. There is no free trial — the free tier is the trial.",
  },
  {
    q: "How do I cancel?",
    a: "In your App Store or Google Play subscription settings, at any time. Cancel at least 24 hours before the end of the current period to stop the next renewal. Refunds are handled by Apple or Google under their policies.",
  },
  {
    q: "Is it always right?",
    a: "No automatic interpretation is. It can mishear a word or pick the wrong Friday — which is exactly why every task is shown on a confirmation screen before anything is saved. Check it, and do not rely on it as the only record of something critical.",
  },
  {
    q: "Which devices are supported?",
    a: "iPhone with iOS 16.4 or later, and Android phones. There is no iPad version.",
  },
];
