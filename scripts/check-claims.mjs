#!/usr/bin/env node
/**
 * Fails the build if the rendered site makes a claim we cannot back up.
 *
 * Tasuke AI has no ratings, no user counts, no press and no awards yet. Making
 * them up is dishonest, and in the US it is also an FTC Act §5 problem (the
 * FTC's 2024 rule bans fake reviews and testimonials outright); the App Store
 * guidelines forbid misleading marketing around the listing too.
 *
 * It scans the BUILT HTML, not the source — copy that reaches a visitor cannot
 * hide in a component, and a phrase in a code comment cannot trip it.
 *
 *     npm run build          # runs this automatically (postbuild)
 *
 * If a rule fires on legitimate copy, fix the copy or narrow the rule — never
 * delete a rule to make a build pass.
 */
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const BUILD_DIR = path.join(process.cwd(), ".next", "server", "app");

const RULES = [
  {
    pattern:
      /\b\d[\d,.]*\s*[km]?\+?\s*(downloads|users|installs|reviews|ratings|people|customers|teams)\b/gi,
    why: "Volume claim with nothing behind it.",
  },
  {
    pattern: /\b[1-5](\.\d)?\s*(-|\s)?stars?\b|★{2,}|\b(rated|rating of)\s+[1-5]/gi,
    why: "Star rating. The app has no store ratings yet; never author your own.",
  },
  {
    pattern:
      /\b(loved|trusted|used) by\b|\bjoin (thousands|millions|over)\b|\bas (seen|featured) (in|on)\b/gi,
    why: "Implies users or endorsements that do not exist.",
  },
  {
    pattern: /#\s?1\b|\bnumber one\b|\bbest (app|to-?do|voice)\b|\baward[-\s]?winning\b/gi,
    why: "Unsupported superlative.",
  },
  {
    pattern: /\b(world[-\s]?class|industry[-\s]?leading|best[-\s]?in[-\s]?class|revolutionary)\b/gi,
    why: "Unfalsifiable superlative.",
  },
  {
    pattern: /\blimited[-\s]time\b|\boffer ends\b|\bhurry\b|\bonly today\b|\blast chance\b/gi,
    why: "Fake urgency. There is no time-limited offer.",
  },
  {
    pattern: /\b100\s?% (accurate|accuracy)\b|\bnever (wrong|misses)\b|\bperfect accuracy\b/gi,
    why: "Accuracy promise. The app can be wrong — that is why it has a confirm screen.",
  },
  {
    pattern: /(?<!no )\bfree trial\b/gi,
    why: "There is no free trial (store/PRODUCTS.md). Only 'no free trial' is allowed.",
  },
  {
    pattern: /\bguarantee(d|s)?\b/gi,
    why: "No guarantee is offered.",
  },
  {
    pattern: /lorem ipsum|\bTODO\b|\bTBD\b/g,
    why: "Placeholder left in a shipped page.",
  },
];

async function htmlFiles(dir) {
  const found = [];
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return found;
  }
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) found.push(...(await htmlFiles(full)));
    else if (entry.name.endsWith(".html")) found.push(full);
  }
  return found;
}

/** Visible text only — scripts and styles carry framework noise, not copy. */
function visibleText(html) {
  return html
    .replace(/<script\b[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/\s+/g, " ");
}

const files = await htmlFiles(BUILD_DIR);

if (files.length === 0) {
  console.error("No prerendered HTML in .next/server/app — run `npm run build` first.");
  process.exit(1);
}

let violations = 0;

for (const file of files) {
  const text = visibleText(await readFile(file, "utf8"));
  const route =
    "/" +
    path
      .relative(BUILD_DIR, file)
      .replace(/\.html$/, "")
      .replace(/^index$/, "");

  for (const rule of RULES) {
    rule.pattern.lastIndex = 0;
    for (const hit of text.matchAll(rule.pattern)) {
      violations += 1;
      const start = Math.max(0, hit.index - 60);
      console.error(`\n✗ ${route}`);
      console.error(`  matched: "${hit[0]}"`);
      console.error(`  why:     ${rule.why}`);
      console.error(`  context: …${text.slice(start, hit.index + hit[0].length + 60).trim()}…`);
    }
  }
}

console.log(`\nclaims check: ${files.length} page(s), ${RULES.length} rules.`);

if (violations > 0) {
  console.error(`${violations} unsupported claim(s). Fix the copy — do not weaken the rule.`);
  process.exit(1);
}
console.log("No unsupported claims found.");
