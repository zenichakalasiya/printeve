// Shared catalog + cart types for the /app final experience.
// Data-only module (no "use client") so it can be imported by both the client
// context and any future server component (e.g. product/[id] generateStaticParams
// under output: "export"). Mirrors the pattern in app/mobile/products-data.ts.

export interface Product {
  id: string;
  name: string;
  category: string; // slug used by pill filters
  categoryLabel: string;
  price: number;
  rating: number;
  reviews: number;
  save: number; // % discount shown on the ribbon
  image: string;
  gallery: string[];
  description: string;
  tagline: string;
  finish: string;
  size: string;
  deliveryEta: string;
  section: "new" | "recommended"; // drives the home sections
}

// picsum.photos is already allow-listed in next.config and loads reliably.
const img = (seed: string) => `https://picsum.photos/seed/${seed}/900/900`;
const gallery = (seed: string) => [img(seed), img(`${seed}-b`), img(`${seed}-c`), img(`${seed}-d`)];

export const PRODUCTS: Product[] = [
  // ---- New Arrivals (shown in the horizontal rail) -------------------------
  {
    id: "badges-circular",
    name: "Badges – Circular & Custom",
    category: "tags",
    categoryLabel: "Tags & Accessories",
    price: 208,
    rating: 4.8,
    reviews: 124,
    save: 15,
    image: img("pe-badges"),
    gallery: gallery("pe-badges"),
    description:
      "Durable pin-back badges printed edge-to-edge in full colour with a scratch-resistant gloss dome. Perfect for events, brands and merch.",
    tagline: "Wear your brand, everywhere",
    finish: "Gloss Dome Coat",
    size: "58 mm round",
    deliveryEta: "2–3 days",
    section: "new",
  },
  {
    id: "certificates",
    name: "Certificates",
    category: "stationery",
    categoryLabel: "Stationery",
    price: 158,
    rating: 4.7,
    reviews: 96,
    save: 10,
    image: img("pe-certificate"),
    gallery: gallery("pe-certificate"),
    description:
      "Premium certificate printing on 250 GSM textured ivory stock with optional foil borders — a keepsake finish for awards and courses.",
    tagline: "Recognition worth framing",
    finish: "Textured Ivory 250 GSM",
    size: "A4 Portrait",
    deliveryEta: "3–4 days",
    section: "new",
  },
  {
    id: "custom-shape-stickers",
    name: "Custom Shape Stickers",
    category: "stickers",
    categoryLabel: "Labels & Stickers",
    price: 100,
    rating: 4.9,
    reviews: 84,
    save: 20,
    image: img("pe-shape-sticker"),
    gallery: gallery("pe-shape-sticker"),
    description:
      "Waterproof vinyl stickers die-cut to any outline you like. Scratch- and UV-proof for laptops, packaging and shopfronts.",
    tagline: "Cut to your exact shape",
    finish: "Matte Vinyl",
    size: "Up to 4 in",
    deliveryEta: "2–3 days",
    section: "new",
  },
  {
    id: "round-stickers",
    name: "Round Stickers",
    category: "stickers",
    categoryLabel: "Labels & Stickers",
    price: 75,
    rating: 4.8,
    reviews: 210,
    save: 12,
    image: img("pe-round-sticker"),
    gallery: gallery("pe-round-sticker"),
    description:
      "Classic circular label stickers on a strong permanent adhesive. Ideal for jars, sealing packaging and product branding.",
    tagline: "The all-purpose brand seal",
    finish: "Glossy Coat",
    size: "2 in round",
    deliveryEta: "1–2 days",
    section: "new",
  },
  {
    id: "tri-fold-brochures",
    name: "Tri-Fold Brochures",
    category: "flyers",
    categoryLabel: "Marketing Materials",
    price: 153,
    rating: 4.7,
    reviews: 77,
    save: 18,
    image: img("pe-brochure"),
    gallery: gallery("pe-brochure"),
    description:
      "Crisp six-panel tri-fold brochures on 170 GSM silk art paper with vivid colour — the workhorse of any campaign.",
    tagline: "Your pitch, beautifully folded",
    finish: "Silk Art 170 GSM",
    size: "A4 → DL fold",
    deliveryEta: "2–4 days",
    section: "new",
  },
  {
    id: "conference-pads",
    name: "Conference Pads",
    category: "stationery",
    categoryLabel: "Stationery",
    price: 120,
    rating: 4.6,
    reviews: 58,
    save: 10,
    image: img("pe-notepad"),
    gallery: gallery("pe-notepad"),
    description:
      "Branded A5 writing pads with 50 tear-off sheets and a sturdy board back. A subtle brand touch for every meeting.",
    tagline: "Notes, on brand",
    finish: "80 GSM Uncoated",
    size: "A5 · 50 sheets",
    deliveryEta: "3–4 days",
    section: "new",
  },

  // ---- Recommended for you (shown in the 2-column grid) --------------------
  {
    id: "business-cards",
    name: "Business Cards",
    category: "cards",
    categoryLabel: "Cards",
    price: 750,
    rating: 4.9,
    reviews: 312,
    save: 20,
    image: img("pe-bcard"),
    gallery: gallery("pe-bcard"),
    description:
      "Premium 350 GSM business cards with a soft-touch matte laminate and optional spot UV. The card people keep.",
    tagline: "A handshake in print",
    finish: "Soft-Touch Matte",
    size: "3.5 × 2.0 in",
    deliveryEta: "24–48 hrs",
    section: "recommended",
  },
  {
    id: "die-cut-vinyl",
    name: "Die-Cut Vinyl Stickers",
    category: "stickers",
    categoryLabel: "Labels & Stickers",
    price: 250,
    rating: 4.9,
    reviews: 84,
    save: 15,
    image: img("pe-diecut"),
    gallery: gallery("pe-diecut"),
    description:
      "Thick, waterproof die-cut vinyl stickers with a glossy protective coat — built to survive dishwashers and weather alike.",
    tagline: "Built to last, cut to fit",
    finish: "Glossy Protective Coat",
    size: "3.0 × 3.0 in",
    deliveryEta: "2–3 days",
    section: "recommended",
  },
  {
    id: "vinyl-banners",
    name: "Vinyl Banners",
    category: "banners",
    categoryLabel: "Banners",
    price: 120,
    rating: 4.7,
    reviews: 96,
    save: 10,
    image: img("pe-banner"),
    gallery: gallery("pe-banner"),
    description:
      "Heavy 440 GSM outdoor vinyl banners with reinforced hems and eyelets. Weatherproof colour that holds up outdoors.",
    tagline: "Big brand, outdoor-ready",
    finish: "440 GSM Matt Vinyl",
    size: "Per sq. ft",
    deliveryEta: "3 days",
    section: "recommended",
  },
  {
    id: "gloss-flyers",
    name: "Gloss Flyers A5",
    category: "flyers",
    categoryLabel: "Marketing Materials",
    price: 300,
    rating: 4.7,
    reviews: 210,
    save: 12,
    image: img("pe-flyer2"),
    gallery: gallery("pe-flyer2"),
    description:
      "Double-sided A5 flyers on 170 GSM gloss with high-saturation colour that pops on the shelf and in the hand.",
    tagline: "Colour that grabs attention",
    finish: "High-Gloss 170 GSM",
    size: "A5 Standard",
    deliveryEta: "2–4 days",
    section: "recommended",
  },
  {
    id: "mailer-boxes",
    name: "Mailer Boxes",
    category: "packaging",
    categoryLabel: "Packaging",
    price: 900,
    rating: 4.6,
    reviews: 58,
    save: 18,
    image: img("pe-mailer"),
    gallery: gallery("pe-mailer"),
    description:
      "Self-locking corrugated mailer boxes printed inside and out. Premium unboxing that protects on the journey.",
    tagline: "Unboxing, on brand",
    finish: "E-Flute Corrugated",
    size: "Small / Medium / Large",
    deliveryEta: "4 days",
    section: "recommended",
  },
  {
    id: "foil-business-cards",
    name: "Foil Business Cards",
    category: "cards",
    categoryLabel: "Cards",
    price: 900,
    rating: 4.9,
    reviews: 77,
    save: 20,
    image: img("pe-foilcard"),
    gallery: gallery("pe-foilcard"),
    description:
      "Luxe 600 GSM cards with metallic gold or silver foil stamping on a velvet-matte base. Your most memorable card yet.",
    tagline: "Make a lasting impression",
    finish: "Velvet-Matte + Foil",
    size: "3.5 × 2.0 in",
    deliveryEta: "3 days",
    section: "recommended",
  },
  {
    id: "product-label-stickers",
    name: "Product Label Stickers",
    category: "stickers",
    categoryLabel: "Labels & Stickers",
    price: 200,
    rating: 4.8,
    reviews: 132,
    save: 14,
    image: img("pe-label"),
    gallery: gallery("pe-label"),
    description:
      "Rolled or sheeted product labels on premium adhesive stock, cut to size. Ideal for retail, cosmetics and food.",
    tagline: "Shelf-ready, every time",
    finish: "Semi-Gloss Adhesive",
    size: "Custom size",
    deliveryEta: "2 days",
    section: "recommended",
  },
];

export function getProduct(id: string | undefined): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export const NEW_ARRIVALS = PRODUCTS.filter((p) => p.section === "new");
export const RECOMMENDED = PRODUCTS.filter((p) => p.section === "recommended");

// Pill filter categories for the home + explore.
export const CATEGORIES = [
  { slug: "all", label: "All" },
  { slug: "cards", label: "Cards" },
  { slug: "stickers", label: "Stickers" },
  { slug: "banners", label: "Banners" },
  { slug: "flyers", label: "Flyers" },
  { slug: "stationery", label: "Stationery" },
  { slug: "packaging", label: "Packaging" },
];

export interface CartItem {
  id: string;
  product: Product;
  size: string;
  finish: string;
  quality: string;
  sides: string;
  qty: number;
  // Per-piece price incl. finish/GSM surcharges, captured at add time so the
  // cart total always matches what the configurator showed.
  unitPrice: number;
  file: string;
}
