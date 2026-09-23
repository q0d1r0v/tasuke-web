#!/usr/bin/env node
/**
 * Copies the Privacy Policy and Terms from the app repo into content/legal/.
 *
 * The app bundles these texts (assets/legal/*.md) so they open offline, and
 * App Store Connect points at this site's /privacy. Two copies of a legal text
 * drift unless one of them is generated, so this site's copy is generated.
 *
 *     npm run sync:legal                       # app repo at ../tasuke-ai
 *     TASUKE_APP_DIR=/path/to/app npm run sync:legal
 *     npm run sync:legal -- --check            # exit 1 if out of date (CI)
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import process from "node:process";

const appDir = path.resolve(process.env.TASUKE_APP_DIR ?? "../tasuke-ai");
const check = process.argv.includes("--check");

const files = [
  ["assets/legal/privacy_en.md", "content/legal/privacy.mdx"],
  ["assets/legal/terms_en.md", "content/legal/terms.mdx"],
];

if (!existsSync(appDir)) {
  console.error(`App repo not found at ${appDir}. Set TASUKE_APP_DIR.`);
  process.exit(1);
}

let stale = 0;

for (const [source, target] of files) {
  const lines = readFileSync(path.join(appDir, source), "utf8").split("\n");
  if (!lines[0].startsWith("# ")) {
    console.error(`${source}: expected a "# Title" first line.`);
    process.exit(1);
  }
  // The page template owns the <h1>, so the markdown title is dropped.
  const body = lines.slice(1).join("\n").replace(/^\n+/, "");
  const header =
    "{/*\n" +
    `  Copied verbatim from the app repo: tasuke-ai/${source}.\n` +
    "  Do not edit here — edit the app copy (and store/*.html with it),\n" +
    "  then run: npm run sync:legal\n" +
    "*/}\n\n";
  const next = header + body;
  const current = existsSync(target) ? readFileSync(target, "utf8") : "";

  if (current === next) {
    console.log(`✓ ${target} is up to date`);
    continue;
  }
  stale += 1;
  if (check) {
    console.error(`✗ ${target} differs from ${source}`);
  } else {
    writeFileSync(target, next);
    console.log(`↻ ${target} updated from ${source}`);
  }
}

if (check && stale > 0) process.exit(1);
