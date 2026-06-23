# PrintEve Design System

A green-branded design system for **PrintEve** — an online custom-printing marketplace that connects customers with vetted local printing partners. *"Order any print. Delivered by trusted local printing partners."*

PrintEve lets businesses order **business cards, flyers, brochures, posters, banners, stickers, packaging, marketing materials and bulk print runs** online: configure the product, get an instant quote, upload artwork, and track the job from press to doorstep. The audience is Indian SMBs, founders, marketing and ops leads; pricing is in **₹ (INR)** and fulfilment is pan-India.

This system packages PrintEve's foundations (color, type, spacing, elevation), reusable React UI primitives, brand assets, and a full homepage UI kit so design agents can produce on-brand interfaces and marketing assets.

---

## ⚠️ Important: green rebrand vs. the source repo

The deliverable brief specifies a **green brand identity** (primary `#16A34A`). The production source repo (`globals.css`) actually ships a **blue** primary (`#2563EB`) with orange/green secondaries. **This design system follows the brief and is green.** If you want it re-aligned to the repo's blue palette, that's a one-file change in `tokens/colors.css` — flag it and we'll switch.

## Sources

- **GitHub:** [`tarangsachaniya/printeve`](https://github.com/tarangsachaniya/printeve) — the Next.js 16 + Tailwind v4 storefront. Structure, copy, content, category illustrations and component contracts were lifted from here. Related repos exist for the API, admin and printer panels (`printeve-api`, `printeve-admin`, `printeve-printer`) — explore them to build partner/admin surfaces.
- Tech in the source: Next.js (App Router), Tailwind v4 `@theme`, Radix UI primitives, `class-variance-authority`, **lucide-react** icons, Inter via `next/font`.

Readers with repo access should explore it to recreate flows beyond the homepage (product configurator, cart, checkout, account, track-order).

---

## Content Fundamentals

How PrintEve writes:

- **Voice:** confident, professional, reassuring — a premium B2B print partner, not a discount printer. Benefit-led and concrete ("produced within 24–72 hours", "3mm bleed", "350gsm") rather than hypey.
- **Person:** addresses the customer as **"you / your brand"**; the company is **"we / PrintEve"**. ("Premium prints, made for your brand.")
- **Casing:** Sentence case for body and subheads; **Title Case for section headings and nav** ("Shop by Category", "How It Works", "Why Businesses Choose PrintEve"). Buttons are Title Case verbs-first: *Start Printing, Browse Products, Become a Printing Partner, Track Order*.
- **Headlines:** short, declarative, often a two-part line with the back half emphasised in green ("Professional printing **made simple**").
- **Numbers as proof:** trust is carried by specifics — *10,000+ orders, 500+ partners, 99% satisfaction, 24-hour response, 48-hour turnaround, ISO 9001*. Use sparingly and only where true to the brand; don't invent stats.
- **No emoji.** Iconography does the lightweight visual work instead.
- **Indian context:** ₹ pricing, pan-India delivery, cities like Bengaluru, +91 phone format.
- **Microcopy examples:** "Free design proofing on every order · Pan-India delivery"; "From business cards to bulk packaging — order professional print jobs online."

---

## Visual Foundations

- **Color:** green-forward on a clean near-white canvas. Primary `#16A34A` (green-600), hover `#15803D`, secondary `#22C55E`, soft accent surface `#DCFCE7`. Neutrals are a **slate** scale (text `#0F172A`, muted `#64748B`, border `#E2E8F0`, surface `#F8FAFC`). Status: danger `#DC2626`, warning `#F59E0B`, info `#0EA5E9`, success = brand green. Full dark-mode token set is included (`[data-theme="dark"]` / `.dark`).
- **Type:** **Inter** throughout (400/500/600/700/800). Tight tracking on large headings (`-0.02em`); relaxed 1.65 line-height on body. Display up to 60px; section titles ~30px bold; body 16px; labels 14px medium; eyebrows 12px uppercase with wide tracking in primary green.
- **Backgrounds:** predominantly flat white/`surface`. The one signature flourish is a **subtle green wash** — `--gradient-hero` (radial green-100 glow fading into green-50→white) behind the hero, and `--gradient-brand` (600→500 diagonal) on the partner panel and final-CTA blocks. No noisy gradients elsewhere, no photographic backgrounds, no textures.
- **Imagery:** lightweight **flat vector illustrations** (the category set), not photography. Cool/green-toned, geometric, friendly. Rendered on soft-green chips or `surface` tiles.
- **Corners:** soft and generous. Inputs/chips 6px, buttons 8px, cards 12px, feature cards & CTAs 16px, hero/partner panels & modals 24px, pills/avatars full.
- **Shadows:** low-spread, cool grey (`rgb(15 23 42 / …)`). `card` is barely-there; `card-hover` lifts; `lg`/`popover` for overlays. Primary CTAs get a tinted green glow (`--shadow-brand`).
- **Borders:** 1px `--color-border` (slate-200) define most surfaces; cards rely on border + subtle shadow rather than heavy elevation.
- **Hover:** cards/tiles **lift `-4px`** and gain `card-hover` + a green-tinted border; links nudge their arrow / underline; primary buttons darken to `primary-hover` and add the brand glow; icon buttons fill with `surface` and turn green.
- **Press:** buttons translate down ~0.5px (no aggressive scale).
- **Motion:** quick and restrained — 0.15–0.2s ease on color/shadow/transform. One continuous **testimonial marquee** (48s linear, pauses on hover, disabled under `prefers-reduced-motion`). Drawers slide 0.28s; toast fades up. No bounces.
- **Transparency / blur:** the sticky header uses a translucent background + `backdrop-filter: blur` once scrolled. Soft-green tints use low-alpha green for badge/icon chips.
- **Layout:** centered container `max-w 80rem`, side padding 20px (32px ≥1024px). Sections breathe with ~56–88px vertical rhythm; alternating white / `surface` bands create section separation.

---

## Iconography

- **System:** [**lucide**](https://lucide.dev) — the production app uses `lucide-react`. Icons are **2px stroke, round caps/joins, 24×24**, currentColor. Consume via the lucide CDN, or use the bundled `ui_kits/homepage/Icons.jsx` set, which reproduces the exact lucide paths for the icons PrintEve uses (Printer, Search, ShoppingCart, User, ShieldCheck, Truck, Clock, Zap, Award, Headset, CreditCard, BadgeCheck, MapPin, etc.).
- **Brand / category illustrations:** flat multi-shape SVGs in `assets/illustrations/` — one per product category. These are PrintEve's own illustrations (from the repo's `custom-svgs.tsx`), **recolored to the green palette** for brand cohesion. Use these, not hand-drawn shapes, for category and product imagery.
- **Logo:** `assets/logo-mark.svg` — a green rounded-square with a white printer glyph. Pair with the "PrintEve" wordmark (Inter 700, `-0.02em`) as a lockup.
- **Social icons:** brand glyphs (facebook/instagram/x/linkedin) are inline `currentColor` SVG paths (see footer in the UI kit).
- **Emoji:** never used.

---

## Index / Manifest

**Root**
- `styles.css` — global entry point (consumers link this one file). `@import`s the token layer.
- `tokens/` — `colors.css`, `typography.css`, `spacing.css`, `shadows.css`, `fonts.css` (Inter via Google Fonts), `base.css` (resets + `.pe-container`).
- `assets/` — `logo-mark.svg` + `illustrations/*.svg` (9 category illustrations).
- `readme.md` (this file) · `SKILL.md` (Agent-Skill manifest).

**Components** (`components/<group>/` — React primitives styled with the tokens)
- `buttons/` — **Button**
- `forms/` — **Input**, **Textarea**, **Select**
- `feedback/` — **Badge**, **Avatar**, **Rating**
- `surfaces/` — **Card** (+ CardHeader / CardBody / CardFooter)
- `navigation/` — **Accordion**, **Tabs**
- `commerce/` — **CategoryCard**, **StatCard**, **ProductCard**

Each component has a `.jsx`, a `.d.ts` contract, a `.prompt.md` usage note, and its directory carries one `@dsCard` HTML specimen. Reference compiled components as `const { Button } = window.PrintEveDesignSystem_a6adda`.

**Guidelines** (`guidelines/` — Design System tab specimen cards)
- Colors: brand greens, semantic roles, neutrals, status hues.
- Type: display & headings, body & labels, type scale.
- Spacing: spacing scale, radii, elevation.
- Brand: logo, category illustrations.

**UI kits** (`ui_kits/`)
- `homepage/` — the full PrintEve marketing homepage: sticky nav with mega-menu + search + cart + dark-mode toggle, hero, trust stats, categories, how-it-works, why-choose-us, featured products, printing-partner CTA, testimonial marquee, FAQ accordion, final CTA, footer, plus a working cart drawer and auth modal. See its own README for the screen breakdown.
