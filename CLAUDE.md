**On session start:** If `HANDOFF.md` exists in this directory, read it before anything else for the latest state of the work.

# PrintEve

## What this is
PrintEve is an on-demand custom **bulk-printing** storefront for the Indian market — business cards, stickers, brochures, banners, flyers, packaging and more. Users configure a product, upload artwork, pay, and track the order live. The repo holds a **desktop/marketing web app** and **two mobile-app builds**, plus exported design prototypes.

## Tech stack
- **Next.js 15** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** (+ `tw-animate-css`), shadcn-style tokens in `styles/design-system.css`
- **lucide-react** icons, `next/font/google` for fonts
- Static export: `next.config.mjs` sets `output: "export"`, `trailingSlash: true`, `images.unoptimized`. Product images use `picsum.photos` (allow-listed).
- Deploy: **GitHub Pages** via `.github/workflows/deploy.yml` on push to `main`. Repo: `zenichakalasiya/printeve`. Live base: `https://zenichakalasiya.github.io/printeve/` (basePath `/printeve` in production).

## Structure
- `app/` — Next.js routes.
  - `app/page.tsx`, `app/layout.tsx` — desktop/marketing storefront (uses Inter).
  - `app/mobile/` — the **first** mobile PWA build (Home/Browse/Cart/Track/Profile-stub). Kept for reference.
  - `app/app/` — the **final** mobile app (see HANDOFF). 5-tab IA, onboarding, orders + tracking. This is the active work.
  - `app/globals.css` — Tailwind entry + custom keyframes (`pe-loading-bar`, `pe-float`) and the `.mobile-app-root` rule that hides the desktop header/footer on the mobile shells.
- `components/`, `lib/`, `styles/` — shared UI, helpers, design tokens.
- `public/proto/` — the V1/V2 HTML design prototypes, deployed live (index + v1.html + v2.html).
- `public/brand/printeve-logo.svg` — the PrintEve dove logo (used by `app/app`).
- `PrintEve Mobile App Redesign-handoff/` — the Claude-Design export bundle (V1/V2 source + assets) the redesign is based on.
- Planning docs: `prd.md`, `implementation_plan.md`, `printing_specifications_research.md`, `PRODUCT_DETAIL_PAGE_PLAN.md`.

## How to run
```bash
npm install
npm run dev      # dev server (localhost:3000, or next free port)
npm run build    # static export to ./out
```
Routes: desktop storefront `/` · first mobile app `/mobile/` · final mobile app `/app/`.
Prototypes served locally: `npx serve -l 4321 "PrintEve Mobile App Redesign-handoff/printeve-mobile-app-redesign/project"`.

## Key context
- Audience for wrap-ups is often **designers, not engineers** — keep notes plain.
- The mobile shells render full-screen on phones and inside an iPhone bezel on desktop (≥lg).
- Both mobile apps keep cart/state **in memory** — a full page reload clears the cart (in-app tab navigation preserves it).
- The `/app` build is a **prototype/demo**: auth (OTP), payment (slide-to-pay) and order tracking are simulated, no backend.
- Commit only when asked; branch off `main` for new work. GitHub remote is `zenichakalasiya/printeve`.

## Handoff
Latest session state is in [HANDOFF.md](HANDOFF.md) — read it first.
