# tasuke-web

The marketing site for **Tasuke AI**: landing page, blog, Privacy Policy, Terms and Support.
English (en-US) only. Next.js 16 (App Router) · Tailwind CSS 4 · MDX · fully static.

The app itself lives in a separate repo (`tasuke-ai`). This site's `/privacy` and `/support`
are the URLs App Store Connect and Google Play point at.

## Run it

```bash
npm install
npm run dev                 # http://localhost:3000
npm run verify              # lint + typecheck + build (+ claims check)
```

## Deploy (Vercel)

1. Import the repo in Vercel. Framework: Next.js; no build settings to change.
2. Environment variable: `NEXT_PUBLIC_SITE_URL=https://your-domain` (no trailing slash).
   Without it, Vercel's production domain is used. Any other host fails the build on
   purpose, because a wrong origin would put `localhost` in every canonical URL.
3. Add the domain under Settings → Domains.
4. Optional: Analytics → enable Web Analytics (cookieless). It is only rendered on Vercel.

Preview deployments serve `Disallow: /` in robots.txt so they never compete with production
in search.

**Other hosts:** `npm run build && npm start` (Node ≥ 22), with `NEXT_PUBLIC_SITE_URL` set.

After the first deploy, point App Store Connect at it:

| App Store Connect field  | URL                           |
| ------------------------ | ----------------------------- |
| Privacy Policy URL       | `https://your-domain/privacy` |
| Support URL              | `https://your-domain/support` |
| Marketing URL (optional) | `https://your-domain`         |

## When the app goes live

Flip `live` in `src/config/stores.ts`:

- `ios.live = true`: the App Store badge becomes a link, iPhone Safari shows the native Smart
  App Banner, and the store URL is added to the JSON-LD.
- `android.live = true`: the same for Google Play.

## Honesty rules

Every claim about the app comes from `src/content/facts.ts`, and every block there names the
file in the app repo it was taken from. The voice demo only plays sentences and results copied
from the app's own test suite.

`scripts/check-claims.mjs` runs after every build and fails it if the rendered pages contain
star ratings, user or download counts, "trusted by", superlatives, fake urgency, accuracy
promises, or a "free trial" (there is none). Fix the copy; never weaken a rule. When real
store ratings exist, they may be mirrored from the store, never authored here.

## Legal texts

`content/legal/*.mdx` are generated from the app repo's `assets/legal/*.md`, the copies the
app bundles for offline reading. Do not edit them here:

```bash
npm run sync:legal                         # expects the app repo at ../tasuke-ai
TASUKE_APP_DIR=/path/to/tasuke-ai npm run sync:legal
npm run sync:legal -- --check              # exits 1 if out of date
```

## Content

- **Blog:** add `content/blog/NN-name.mdx` with frontmatter (`slug`, `title`, `description`,
  `date`, optional `updated`, `tags`, `draft`). Invalid frontmatter fails the build. Posts
  appear in the index and the sitemap and get `BlogPosting` JSON-LD automatically.
- **Screenshots:** `public/screenshots/*.webp` are real captures from the app's
  `integration_test/screenshots_test.dart`. Replace them with the iPhone set from the app
  repo's `ios-screenshots.yml` workflow when it exists (same names).
- **Store badges:** `public/badges/` hold Apple's and Google's official artwork, unmodified
  (Google's PNG only had its transparent margin trimmed). Do not recolour or redraw them.

## Layout

```
src/app/            routes, sitemap/robots/manifest, OG image, icons
src/components/     header, footer, sections/*, shared UI
src/config/         site origin & constants, store links
src/content/        facts.ts — the single source of claims
src/lib/            SEO metadata, JSON-LD builders, blog loader
content/            blog posts and legal texts (MDX)
scripts/            claims check, legal sync
```
# tasuke-web
