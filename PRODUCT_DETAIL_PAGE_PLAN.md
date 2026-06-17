# Product Detail Page — IA & Implementation Plan (Handoff for Antigravity Agent)

> **Purpose:** Build the **Product Detail Page** for PrintEve as a single, self-contained
> route with easy in-page navigation (no separate "guidelines" page — the guidelines live
> in a slide-over panel on the same page). This doc is the source of truth: it contains the
> full information architecture scanned from Figma, the exact tokens/conventions of this
> codebase, and a step-by-step build plan.
>
> **Audience:** an AI coding agent (Antigravity) with access to this repo and, optionally,
> the Figma MCP server. Read this top to bottom before writing code.

---

## 0. Figma source (open these if Figma MCP is available)

All nodes live on the **"Website UX"** page (`canvas 36:3353`) of the PrintEve Figma file.
If you have the Figma desktop MCP, call `get_design_context` / `get_screenshot` on these node IDs
to pull exact spacing, colors and reference code. **Adapt** what you pull to this repo's tokens
(Section 2) — do not copy raw hex/px blindly.

| What | Node ID | Notes |
|---|---|---|
| **Product Detail Page** (canonical) | `50:2858` (`Desktop - 2`) | The full page — primary reference |
| **Product Detail Page – Guideline** (with panel open) | `50:3088` (`Desktop - 4`) | Same page + guidelines slide-over |
| **Guidelines slide-over panel** | `50:3203` (`Frame 60`) | Right-side overlay content |
| **Tabs component** | `50:2968` | 5-tab strip + divider |
| **UI Inspiration (Product Category show)** | `63:1898` (section) | Aesthetic reference only — see §6 |

> The "Product Detail Page" and "Product Detail Page - Guideline" are **the same page** in two
> states. The guideline is an overlay, **not** a separate route. That is the core of "easy user
> navigation in 1 page."

---

## 1. Information Architecture

The page is a classic e-commerce **product detail / configurator** with a two-column core,
a tabbed info section, and a related-products rail. Top to bottom:

### 1.1 Global chrome (already built — reuse)
- **Site header / navbar** — reuse `components/layout/site-header.tsx` (logo, Products mega-menu, Track Order, search, account, cart).
- **Breadcrumb** — `Home / {Category} / {Product Name}` (e.g. `Home / Business card / Rounded Corner Business Card`).

### 1.2 Core: two-column layout
Desktop ≈ 1440 wide, content max-width ~1272 (`84px` side gutters). Two columns, **left ~626 / right ~626** with a gap.

#### LEFT — Product gallery (`Frame 33`, node `50:2954`)
- **Main image** — large rounded rectangle (~626×421). Aspect ~3:2.
- **Thumbnail row** — 4 thumbnails (144×143 each), click to swap the main image. First is active.

#### RIGHT — Buy box / configurator (`Frame 8`, node `50:2861`)
Vertical stack:
1. **Title** — product name, display serif, large (`Rounded Corner Visiting Cards`).
2. **Meta row** (`Frame 6`):
   - Rating value `4` + 5 star icons.
   - `Orders complete (124)`.
   - **Share** icon button (right-aligned).
3. **Description** (`Frame 11`) — **collapsible** (chevron-down, default open). Body is a spec list:
   `Material: 350 GSM Ninbo Star Art Paper · Finish: Smooth 0.6cm rounded corners · Size: 3.5×2in (standard) · Print Options: Single/Double-sided · Font Tip: Bold 8pt+ · Design: Upload or customize online · MOQ: 100 cards`.
   (Render as a bulleted spec list — see screenshot.)
4. **Upload Your Files** (`Frame 15`):
   - Section label `Upload Your Files` (left) + **`ⓘ Guidelines`** link (right) → **opens the Guidelines slide-over** (§1.4). This is the key interaction.
   - **Dropzone** — dashed bordered area, cloud-upload icon, `Click or Drag & Drop to upload`, helper text: `Supported formats: .pdf, .ai, .psd, .cdr, .png, .jpeg, .jpg, .tiff, .tif, .bmp`.
5. **Configuration selects** (`Frame 16`) — 5 dropdowns (label + select), stacked:
   1. **Print Location** — e.g. `Front`
   2. **Paper Size** — e.g. `Regular 3.5 × 2 in`
   3. **Type** — e.g. `Normal`
   4. **Finish** — e.g. `Normal`
   5. **Paper Quality** — e.g. `70 GSM (Light weight)`
6. **Quantity** (`Frame 27`):
   - Label `Quantity`.
   - **Stepper**: `+ / value / −` (note Figma order is `+ 1 −`).
   - **Quantity preset cards** (3): each shows `{qty} Pics`, `{price} Rs`, `Save upto {n}%`.
     - `100 Pics · 500 Rs · Save upto 12%`
     - `500 Pics · 1200 Rs · Save upto 15%`
     - `1000 Pics · 3000 Rs · Save upto 25%`
   - Selecting a preset sets quantity + tier price.
7. **Price Details card** (`Frame 37`, node `50:2927`) — line items:
   - `Price ₹3000.00`
   - `Platform fee ₹3.00`
   - `Delivery Charges ₹50.00`
   - `Total ₹3053.00`
   - `Discount Applied −₹15.00`
   - **`Final Total ₹3038.00`** (emphasized).
8. **Primary actions** (`Frame 43`) — two equal-width buttons side by side:
   - **`🛒 Add to Cart`** (secondary/outline) — per PRD this "saves" the configured product to the cart.
   - **`Buy Now`** (primary, ink-black) — straight to checkout.

### 1.3 Tabbed info section (`Tabs` node `50:2968`, full width below core)
Horizontal tab strip with bottom divider. **5 tabs:**
`Finish Types` · `Paper Specifications` · `Lamination Types` · `Design Guidelines` · `FAQs`

- Active-tab content example (`Frame 57`): heading **`Gold Foiling`** + paragraph
  ("…Gold foiling gives your design a premium, eye-catching shine…").
- Below content: a wide banner image (1200×331, `image 11`).

### 1.4 Guidelines slide-over (the "Guideline page", `Frame 60` node `50:3203`)
- Triggered by the **`ⓘ Guidelines`** link in the Upload section (§1.2.4).
- A **right-anchored overlay panel** (~497 wide, full height) over a dimmed page scrim.
- Title **`Guidelines`** + bulleted list:
  - **Size & Bleed:** 91mm × 61mm (includes 3mm bleed); final trim 85mm × 55mm. Add 2–3mm on all sides.
  - **Safe Zone:** keep text & key elements 5mm inside the trim area.
  - **Resolution:** 300–500 DPI.
  - **Color Mode:** CMYK.
  - **Fonts:** min 8pt; convert text to outlines/curves.
  - **Edges:** avoid content in corners / too close to edges.
  - **File Format:** PDF (preferred), PNG, or JPG.
  - **For Front & Back:** upload per chosen spec — front-only = 1 file; front & back = 2 files.
- **Implementation:** use the existing **`components/ui/sheet.tsx`** (`side="right"`). Closes on scrim click / Esc / X. This is what keeps everything on one page.

### 1.5 Related products rail ("You might be interested in")
- Heading + **horizontal carousel** of product cards (reuse `embla-carousel` via `components/ui/carousel.tsx`).
- Cards from `lib/data/products.ts` (e.g. Letterheads, Envelopes, Rubber Stamps, ID Cards, Labels…), with a right-arrow next control.

---

## 2. Codebase conventions (MUST follow)

This is a **Next.js 15 App Router** project, **React 19**, **Tailwind v4**, **shadcn/ui (new-york)**, **lucide** icons, **npm** (not bun).

- **Tokens** live in `styles/design-system.css` (imported by `app/globals.css`). **Aesthetic: Editorial / Magazine** — warm paper bg, ink-black text, a single editorial **red** accent (`--brand`) used sparingly. Display serif **Fraunces** (`font-serif`), sans **DM Sans** (`font-sans`). Low radius (`--radius: 0.35rem`).
- **Use semantic token classes only** — `bg-background`, `text-foreground`, `bg-card`, `text-muted-foreground`, `border-border`, `bg-primary`, `text-brand`, etc. **Do not** introduce raw hex or new colors. Map Figma colors → nearest token.
- **Use `font-serif` for the product title and section headings**; `font-sans` for body/UI.
- **Path aliases:** `@/components`, `@/components/ui`, `@/lib`, `@/lib/utils` (`cn`), `@/hooks`.
- **Reuse existing UI primitives** (already installed): `button`, `card`, `badge`, `separator`, `accordion`, `carousel`, `dropdown-menu`, `input`, `label`, `sheet`, `sonner` (toasts), `avatar`, `checkbox`, `navigation-menu`.
- **Reuse layout:** `site-header`, `site-footer` already exist. The page renders between them (see `app/layout.tsx` / `app/page.tsx` for the pattern).
- **Data:** types & mock data in `lib/data/`. `Product` type is in `lib/data/products.ts`; categories in `lib/data/categories.ts`. Extend these — don't invent a parallel data layer.
- **Server vs client:** RSC is on. The page shell is a Server Component; the **configurator (state: gallery, selects, quantity, live price, sheet open)** must be a **Client Component** (`"use client"`).
- **Components naming:** kebab-case files under `components/product/…` (new folder), matching `components/home/…` style.

---

## 3. Recommended file structure (new code)

```
app/
  products/
    [slug]/
      page.tsx                # RSC: fetch product by slug, compose sections
components/
  product/
    product-gallery.tsx       # client: main image + thumbnails
    product-buy-box.tsx       # client: orchestrates selects + qty + price + actions + guidelines trigger
    product-description.tsx   # collapsible spec list (accordion)
    upload-dropzone.tsx       # client: drag & drop file input
    config-selects.tsx        # client: the 5 dropdowns
    quantity-selector.tsx     # client: stepper + 3 preset tier cards
    price-details.tsx         # price line items + Add to Cart / Buy Now
    guidelines-sheet.tsx      # shadcn Sheet (side=right) with the guideline bullets
    product-info-tabs.tsx     # 5-tab section (Finish Types … FAQs)
    related-products.tsx      # carousel reusing lib/data/products
lib/
  data/
    products.ts               # EXTEND: add fields below
```

### 3.1 Extend the `Product` type
Add the configurator-driving fields (keep existing ones):
```ts
export type PriceTier = { qty: number; price: number; savePct: number };
export type ConfigOption = { label: string; values: string[] };

export type Product = {
  slug: string;
  name: string;
  category: string;
  categorySlug: string;
  startingPrice: number;
  image: string;
  images?: string[];          // gallery (main + thumbnails)
  badge?: string;
  rating?: number;            // e.g. 4
  ordersComplete?: number;    // e.g. 124
  description?: string;       // spec blurb
  specs?: { label: string; value: string }[];  // Material, Finish, Size…
  options?: ConfigOption[];   // Print Location, Paper Size, Type, Finish, Paper Quality
  tiers?: PriceTier[];        // the 3 quantity preset cards
  platformFee?: number;       // 3
  deliveryCharge?: number;    // 50
};
```
Add one fully-populated sample product (`rounded-corner-business-card`) matching the Figma content so the page renders end-to-end.

---

## 4. Step-by-step build plan

> Build in vertical slices; the page should render after each step. Use `lucide` icons
> (`Star`, `Share2`, `ChevronDown`, `Info`, `UploadCloud`, `Plus`, `Minus`, `ShoppingCart`).

1. **Route + data.** Create `app/products/[slug]/page.tsx` (RSC). Extend `Product` (§3.1) and add the sample product. Resolve product by `params.slug`; `notFound()` if missing. Render breadcrumb + a two-column grid shell (`lg:grid-cols-2`, single column on mobile).
2. **Gallery** (`product-gallery.tsx`, client). Main image + 4 thumbnails; clicking a thumb swaps main. Rounded via `rounded-lg`, `bg-muted` placeholder.
3. **Buy-box header.** Title (`font-serif text-3xl/4xl`), meta row (rating number + `Star` icons filled to rating, `Orders complete (n)`, `Share2` icon button).
4. **Description** (`product-description.tsx`). Use `accordion` (single, default open) — label "Description", body = bulleted `specs`.
5. **Upload section** (`upload-dropzone.tsx`). Header row: "Upload Your Files" + a right-aligned **Guidelines** trigger button (`Info` icon). Dashed dropzone with `UploadCloud`, prompt, and supported-formats helper. Wire a hidden `<input type="file" multiple>` + drag handlers (state only; no real upload backend yet).
6. **Guidelines sheet** (`guidelines-sheet.tsx`). `Sheet` + `SheetTrigger` (the Guidelines button) + `SheetContent side="right"`. Title "Guidelines" + the bullet list from §1.4. **This satisfies the one-page requirement.**
7. **Config selects** (`config-selects.tsx`). Map `product.options` → 5 labeled selects. Use shadcn `select` — **note:** `select.tsx` is **not yet installed**, run `npx shadcn@latest add select`. Hold selections in buy-box state.
8. **Quantity** (`quantity-selector.tsx`). `−/value/+` stepper + 3 tier preset cards (qty / price / "Save upto n%"). Selecting a card sets qty & active tier; highlight active with `border-brand`.
9. **Price details** (`price-details.tsx`). Compute Price (tier or unit×qty), + platform fee, + delivery, Total, − discount, **Final Total** (bold, larger). Then two buttons: **Add to Cart** (`variant="outline"`, `ShoppingCart` icon) and **Buy Now** (`variant="default"` = ink primary). Add to Cart fires a `sonner` toast ("Added to cart") for now.
10. **Info tabs** (`product-info-tabs.tsx`). 5 tabs (`Finish Types`, `Paper Specifications`, `Lamination Types`, `Design Guidelines`, `FAQs`) + content + banner image. **`tabs.tsx` is not installed** — run `npx shadcn@latest add tabs`. (FAQs tab can reuse `accordion`.)
11. **Related products** (`related-products.tsx`). "You might be interested in" heading + `carousel` of product cards from `lib/data/products.ts` (exclude current slug).
12. **Responsive pass.** Mobile: single column (gallery → buy box → tabs → related). Make the **primary actions sticky at the bottom** on mobile for easy navigation. Sheet becomes full-width-ish on small screens.
13. **A11y & polish.** Focus rings via `--ring`; labelled controls; keyboard-operable stepper, tabs, sheet; alt text on images. Verify dark mode (tokens already handle it).

---

## 5. Interaction / "easy navigation on one page" principles

- **Guidelines = slide-over, not a route.** Keeps the user in their upload context (`Sheet`, right side).
- **Sticky buy box on desktop** (`lg:sticky lg:top-24`) so price + CTAs stay visible while reading specs/tabs.
- **Sticky action bar on mobile** for Add to Cart / Buy Now.
- **Live price** updates instantly as quantity/tier/options change — no page reload.
- **Tabs** keep secondary info (finish types, specs, FAQs) on the same page without scrolling walls of text.
- **One decision at a time:** description → upload → configure → quantity → price → buy. Vertical flow matches the PRD: *select category → upload file & details → save (to cart)*.

---

## 6. UI inspiration — section `63:1898` ("UI Inspiration for Product Category show")

This board is **aesthetic reference** (screenshots, not a spec). Pull the *patterns*, keep PrintEve's editorial tokens. Useful takeaways to apply to the detail page & configurator:

- **Compact config panel** with `Material / Orientation / Printing Location / Quantity` rows and a bold price + dual CTA **"Upload your File" / "Create a Design"** — mirrors our buy-box; consider adding a secondary "Create a Design" path next to upload later.
- **Clean card grids** with generous whitespace and soft shadows for the related-products rail and tier cards.
- **Category pills / chips** for filtering (relevant if you also build the Product Category page).
- **Live pricing emphasis** — price is the visual anchor of the panel.
- **Browse-by-category** strip with circular icon thumbnails — matches our `categories.ts` icons.

> Note: this board is labelled for the **Product Category** screen, so treat it as inspiration for
> overall look-and-feel and the configurator panel, not as the detail-page layout itself
> (the detail-page layout is defined by §1 / nodes `50:2858` & `50:3088`).

---

## 7. Out of scope (mock for now)

- Real file upload / storage backend (state only + format validation).
- Real cart persistence & checkout (Add to Cart → toast; Buy Now → route stub).
- Real pricing engine (use tier data from `products.ts`).
- Auth gating.

---

## 8. Acceptance checklist

- [ ] `/products/rounded-corner-business-card` renders full page using extended `products.ts` data.
- [ ] Gallery thumbnails swap the main image.
- [ ] Description collapses/expands.
- [ ] Guidelines link opens a right slide-over with the full bullet list; closes via scrim/Esc/X — **no navigation away**.
- [ ] 5 config selects work; quantity stepper + 3 tier cards drive a **live** price-details block (Price → fee → delivery → Total → discount → Final Total).
- [ ] Add to Cart shows a toast; Buy Now is wired (stub route ok).
- [ ] 5-tab info section + related-products carousel render.
- [ ] Fully responsive; mobile has sticky primary actions.
- [ ] Only design-system tokens used; serif headings; dark mode intact.
- [ ] `npm run build` passes.
