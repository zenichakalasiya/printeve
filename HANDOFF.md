# Handoff — 2026-07-24 11:00

## Read first
See `CLAUDE.md` for full project context. The active work is the **final mobile app in `app/app/`** — start there. It merges the V1/V2 prototypes (`public/proto/`) and a Figma reference into one build.

## What we worked on this session
Built the complete **final PrintEve mobile app at the `/app` route** from scratch — a 10-screen flow merging V1 + V2 prototypes and a Figma reference (8 UI screenshots). Delivered in phases, verified in-browser at each step.

## Completed
- **Onboarding** (`app/app/Onboarding.tsx`): loading tile → splash → "Sign up or log in" (Google/Apple/Facebook + phone) → phone entry → 4-digit OTP. Matches the V2 prototype. Splash uses V2's exact scattered-card layout with **custom CSS/SVG product mockups** (business card, tri-fold brochure, die-cut stickers, banner) instead of photos.
- **Home** (`app/app/page.tsx`): header + search + category pills, animated promo carousel, horizontal New Arrivals rail, Recommended 2-col grid, green "FREE DELIVERY" card. (Categories/filters rows intentionally removed per the brief.)
- **Add-to-cart**: `app/app/ConfigSheet.tsx` — a 75%-height bottom sheet (size/finish/GSM/sides/qty tiers/upload/live price). Tapping any product opens it; adding shows a Swiggy-style "N items added → View Cart" bar (in `AppShell.tsx`).
- **Cart** (`app/app/cart/page.tsx`): items, coupon (`PRINTEVE20`), CGST/SGST bill split, ₹200 min-order gate, payment step + slide-to-pay → places order → routes to Orders.
- **Explore** (`app/app/explore/page.tsx`): search + pills + 2-col grid of all products.
- **Orders** (`app/app/orders/page.tsx`): empty state, My Orders list, and an in-page live **tracking timeline** (6 steps, "Simulate next update" advances it).
- **Profile** (`app/app/profile/page.tsx`): avatar/name/phone, account rows (Track an Order shows active count), preferences, "Log out" = replay onboarding.
- **Logo**: `public/brand/printeve-logo.svg` — a green dove recreated as SVG from the user's pasted brand mark; used on loading/splash/auth via `BrandMark`.
- **Typeface**: whole `/app` switched to **Funnel Sans** (headings + body), set in `app/app/layout.tsx`.
- Shared `app/app/ProductCard.tsx` (rail + grid cards) used by Home & Explore. All 5 tabs are real routes. Full flow verified end-to-end, zero console errors.

## In progress
Nothing mid-flight. The `/app` build is feature-complete for the agreed scope and about to be published.

## Next steps
- (Optional) Dedicated product-detail route `/app/product/[id]` — currently tapping a product opens the ConfigSheet directly (the Figma had no detail screen). If added, needs `generateStaticParams` for static export.
- Decide whether `/app` should eventually replace `/mobile` (it was built as a non-destructive sibling).
- If the user sends the exact original logo file, drop it at `public/brand/printeve-logo.png` and repoint `BrandMark` (my SVG is a faithful recreation, not byte-identical).

## Decisions made
- Built at a **new `/app` route** (non-destructive) so `/mobile`, V1 and V2 all stay intact for comparison. Adopted the Figma **5-tab IA** (Home · Explore · Orders · Cart · Profile).
- Order tracking is **in-page state**, not a dynamic route, because orders are created at runtime/in-memory — keeps it compatible with `output: "export"`.
- Onboarding gate uses **sessionStorage** (`pe_app_onboarded`) read in a `useEffect` (not the `useState` initializer) — the initializer version caused a hydration mismatch, now fixed.
- Font switch done by **repointing the `--font-fraunces`/`--font-dm` CSS vars** to Funnel Sans in one file, so no per-file edits were needed.

## Gotchas & notes
- Cart is **in-memory**: navigating by full URL reload clears it — test flows using in-app tab links.
- The slide-to-pay control needs a real drag; when scripting it, dispatch mousemoves then a delayed mouseup so React re-binds the release handler with the updated slide value.
- **Deploy caveat**: the logo is referenced as an absolute path `/brand/printeve-logo.svg`; on GitHub Pages (basePath `/printeve`) it will 404 unless prefixed. Fix before/at deploy if the logo must show on the live site.
- Onboarding replays on every fresh browser load (sessionStorage) — intended for demos; in-app navigation stays signed in.
