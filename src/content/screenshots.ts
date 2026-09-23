import type { StaticImageData } from "next/image";

import completed from "@/assets/screenshots/03_completed.webp";
import homeToday from "@/assets/screenshots/01_home_today.webp";
import settings from "@/assets/screenshots/05_settings.webp";
import stats from "@/assets/screenshots/04_stats.webp";
import upcoming from "@/assets/screenshots/02_upcoming.webp";

/**
 * Real in-app captures (integration_test/screenshots_test.dart in the app repo).
 *
 * ⚠️ Imported, not served from public/. A static import gets a content-hashed
 * URL, so replacing a file changes its URL and no cache — the browser's or
 * Next's image optimizer's — can keep showing the old picture. With a fixed
 * /public path both did, for hours.
 */
export const screenshots = {
  homeToday,
  upcoming,
  completed,
  stats,
  settings,
} satisfies Record<string, StaticImageData>;
