export type ProductVariant = { name: string; options: string[] };

export type PriceTier = {
  qty: number;
  price: number; // total base price for this tier quantity
  savePct: number;
};

export type ConfigOptionValue = {
  name: string;
  surcharge: number; // added to the order subtotal when selected
};

export type ConfigOption = {
  label: string;
  key: string;
  values: ConfigOptionValue[];
};

export type ProductSpec = { label: string; value: string };

export type ProductFaq = { q: string; a: string };

export type Product = {
  slug: string;
  name: string;
  category: string;
  categorySlug: string;
  subcategorySlug: string;
  description: string;
  longDescription: string;
  startingPrice: number;
  image: string;
  gallery: string[];
  images?: string[];
  badge?: string;
  featured?: boolean;
  rating: number;
  reviews: number;
  ordersComplete?: number;
  highlights: string[];
  variants: ProductVariant[];
  units: string[];
  minQty: number;
  bulkThreshold: number;
  // Configurator / pricing (optional — fallbacks derived below)
  specs?: ProductSpec[];
  options?: ConfigOption[];
  tiers?: PriceTier[];
  faqs?: ProductFaq[];
  platformFee?: number;
  deliveryCharge?: number;
};

const UNITS = ["MM", "CM", "INCH"];

function img(seed: string) {
  return `https://picsum.photos/seed/${seed}/900/700`;
}
function gallery(seed: string) {
  return [img(seed), img(`${seed}-2`), img(`${seed}-3`), img(`${seed}-4`)];
}

export const products: Product[] = [
  // ---- Marketing Materials ----
  {
    slug: "rounded-corner-business-card",
    name: "Rounded Corner Visiting Cards",
    category: "Marketing Materials",
    categorySlug: "marketing-materials",
    subcategorySlug: "business-cards",
    description:
      "Smooth rounded-corner visiting cards on premium art paper — soft to hold, sharp to look at.",
    longDescription:
      "Our rounded-corner visiting cards are printed on heavyweight art paper and die-cut with smooth, snag-free corners. Choose your finish, paper weight and print sides, then upload a print-ready file — our team verifies every design before it goes to press.",
    startingPrice: 500,
    image: img("rounded-card"),
    gallery: gallery("rounded-card"),
    images: gallery("rounded-card"),
    badge: "Bestseller",
    featured: true,
    rating: 4.9,
    reviews: 1840,
    ordersComplete: 12400,
    highlights: [
      "350 GSM premium art paper",
      "Smooth die-cut rounded corners",
      "Matte, gloss or velvet finishes",
      "Free design check before print",
    ],
    variants: [],
    units: UNITS,
    minQty: 100,
    bulkThreshold: 1000,
    platformFee: 49,
    deliveryCharge: 79,
    tiers: [
      { qty: 100, price: 500, savePct: 0 },
      { qty: 500, price: 1200, savePct: 52 },
      { qty: 1000, price: 3000, savePct: 40 },
    ],
    options: [
      {
        label: "Print Location",
        key: "print-location",
        values: [
          { name: "Front only", surcharge: 0 },
          { name: "Front & Back", surcharge: 150 },
        ],
      },
      {
        label: "Paper Size",
        key: "paper-size",
        values: [
          { name: 'Standard 3.5" × 2"', surcharge: 0 },
          { name: 'Large 3.5" × 2.25"', surcharge: 50 },
        ],
      },
      {
        label: "Quality",
        key: "quality",
        values: [
          { name: "Standard 300 GSM", surcharge: 0 },
          { name: "Premium 350 GSM", surcharge: 100 },
        ],
      },
      {
        label: "Finish",
        key: "finish",
        values: [
          { name: "Matte Laminate", surcharge: 0 },
          { name: "Gloss Laminate", surcharge: 80 },
          { name: "Velvet Finish", surcharge: 120 },
        ],
      },
    ],
    specs: [
      { label: "Material", value: "350 GSM Art Paper" },
      { label: "Finish", value: "Smooth rounded corners" },
      { label: "Trim size", value: '85mm × 55mm (3.5" × 2")' },
      { label: "Bleed", value: "3mm on all sides" },
      { label: "Print options", value: "Front only or front & back" },
      { label: "Lamination", value: "Matte, gloss or velvet" },
      { label: "Colour", value: "Full colour (CMYK)" },
      { label: "Turnaround", value: "3–5 business days" },
    ],
    faqs: [
      {
        q: "Can I print on both sides?",
        a: "Yes — choose “Front & Back” under Print Location. Upload a single file containing both sides.",
      },
      {
        q: "What file format should I upload?",
        a: "A print-ready PDF is preferred. We also accept AI, PSD, PNG and JPG at 300–500 DPI in CMYK.",
      },
      {
        q: "Do you check my design before printing?",
        a: "Always. Our team reviews every file for bleed, resolution and colour, and flags anything that needs fixing before it goes to press.",
      },
      {
        q: "Is bulk pricing available?",
        a: "Yes. Larger quantities unlock better per-card rates, and orders above 1,000 qualify for negotiable bulk pricing with half-advance and EMI options.",
      },
    ],
  },
  {
    slug: "premium-business-cards",
    name: "Premium Business Cards",
    category: "Marketing Materials",
    categorySlug: "marketing-materials",
    subcategorySlug: "business-cards",
    description: "Thick, tactile cards that make a first impression count.",
    longDescription:
      "Our most popular business cards are printed on heavyweight 350–400 GSM stock with a choice of matte, gloss or spot-UV finishes. Upload your design or send us your logo and we'll set it print-ready with full bleed and crisp edges.",
    startingPrice: 299,
    image: img("business-cards"),
    gallery: gallery("business-cards"),
    badge: "Bestseller",
    featured: true,
    rating: 4.9,
    reviews: 1284,
    highlights: [
      "300–400 GSM premium stock",
      "Matte, gloss & spot-UV finishes",
      "Square or rounded corners",
      "Double-sided printing",
    ],
    variants: [
      { name: "Size", options: ["Standard 3.5×2 in", "Square 2.5×2.5 in", "MOO 3.3×2.16 in"] },
      { name: "Paper", options: ["300 GSM Matte", "350 GSM Matte", "400 GSM Premium"] },
      { name: "Finish", options: ["Matte", "Gloss", "Spot UV"] },
      { name: "Corners", options: ["Square", "Rounded"] },
    ],
    units: UNITS,
    minQty: 100,
    bulkThreshold: 1000,
  },
  {
    slug: "tri-fold-brochures",
    name: "Tri-Fold Brochures",
    category: "Marketing Materials",
    categorySlug: "marketing-materials",
    subcategorySlug: "brochures",
    description: "Six panels to tell your story, folded and ready to hand out.",
    longDescription:
      "Tri-fold brochures give you six panels to showcase services, menus or product ranges. Printed on vibrant gloss or premium matte art paper with precise folding.",
    startingPrice: 349,
    image: img("brochures"),
    gallery: gallery("brochures"),
    featured: true,
    rating: 4.7,
    reviews: 412,
    highlights: [
      "130–250 GSM gloss art paper",
      "Tri-fold, Z-fold or gate-fold",
      "Full-colour both sides",
      "A4 or DL sizes",
    ],
    variants: [
      { name: "Fold", options: ["Tri-fold", "Z-fold", "Gate-fold"] },
      { name: "Size", options: ["A4", "A5", "DL"] },
      { name: "Paper", options: ["130 GSM Gloss", "170 GSM Gloss", "250 GSM Matte"] },
    ],
    units: UNITS,
    minQty: 50,
    bulkThreshold: 500,
  },
  {
    slug: "matte-finish-posters",
    name: "Matte Finish Posters",
    category: "Marketing Materials",
    categorySlug: "marketing-materials",
    subcategorySlug: "posters",
    description: "Big, bold and glare-free — perfect for walls and windows.",
    longDescription:
      "High-impact posters in A-series sizes, printed on heavyweight matte or gloss stock with rich, accurate colour. Great for launches, events and store displays.",
    startingPrice: 199,
    image: img("posters"),
    gallery: gallery("posters"),
    rating: 4.6,
    reviews: 256,
    highlights: [
      "A3, A2 & A1 sizes",
      "Matte or gloss finish",
      "Fade-resistant inks",
      "Indoor & short-term outdoor",
    ],
    variants: [
      { name: "Size", options: ["A3", "A2", "A1"] },
      { name: "Paper", options: ["170 GSM Gloss", "250 GSM Matte", "300 GSM Premium"] },
    ],
    units: UNITS,
    minQty: 10,
    bulkThreshold: 200,
  },
  {
    slug: "promotional-flyers",
    name: "Promotional Flyers",
    category: "Marketing Materials",
    categorySlug: "marketing-materials",
    subcategorySlug: "flyers",
    description: "Cost-effective handouts that move fast.",
    longDescription:
      "Single-sheet flyers for offers, events and announcements. Affordable at volume and printed full-colour on a range of stocks.",
    startingPrice: 149,
    image: img("flyers"),
    gallery: gallery("flyers"),
    featured: true,
    rating: 4.5,
    reviews: 198,
    highlights: [
      "A4, A5 & A6 sizes",
      "Single or double-sided",
      "130–170 GSM stock",
      "Best value at volume",
    ],
    variants: [
      { name: "Size", options: ["A4", "A5", "A6"] },
      { name: "Sides", options: ["Single-sided", "Double-sided"] },
      { name: "Paper", options: ["130 GSM Gloss", "170 GSM Gloss"] },
    ],
    units: UNITS,
    minQty: 100,
    bulkThreshold: 1000,
  },

  // ---- Stationery ----
  {
    slug: "branded-letterheads",
    name: "Branded Letterheads",
    category: "Stationery",
    categorySlug: "stationery",
    subcategorySlug: "letterheads",
    description: "Put your brand on every document you send.",
    longDescription:
      "Professional A4 letterheads printed on premium uncoated stock that takes a pen beautifully. Consistent brand colours on every sheet.",
    startingPrice: 249,
    image: img("letterheads"),
    gallery: gallery("letterheads"),
    featured: true,
    rating: 4.8,
    reviews: 142,
    highlights: [
      "A4 premium uncoated",
      "100–120 GSM",
      "Pen-friendly surface",
      "Exact brand colours",
    ],
    variants: [
      { name: "Paper", options: ["100 GSM Uncoated", "120 GSM Uncoated", "120 GSM Linen"] },
      { name: "Sides", options: ["Single-sided", "Double-sided"] },
    ],
    units: UNITS,
    minQty: 100,
    bulkThreshold: 1000,
  },
  {
    slug: "custom-envelopes",
    name: "Custom Envelopes",
    category: "Stationery",
    categorySlug: "stationery",
    subcategorySlug: "envelopes",
    description: "Branded envelopes that match your letterheads.",
    longDescription:
      "Custom-printed envelopes in standard business sizes, with your logo and return address. Available in self-seal and gum options.",
    startingPrice: 299,
    image: img("envelopes"),
    gallery: gallery("envelopes"),
    rating: 4.6,
    reviews: 88,
    highlights: ["DL, C5 & C4 sizes", "Self-seal or gum", "100 GSM stock", "Window option"],
    variants: [
      { name: "Size", options: ["DL", "C5", "C4"] },
      { name: "Closure", options: ["Self-seal", "Gum"] },
      { name: "Window", options: ["No window", "Window"] },
    ],
    units: UNITS,
    minQty: 100,
    bulkThreshold: 1000,
  },
  {
    slug: "corporate-notepads",
    name: "Corporate Notepads",
    category: "Stationery",
    categorySlug: "stationery",
    subcategorySlug: "notepads",
    description: "Glued notepads for desks, meetings and giveaways.",
    longDescription:
      "Tear-off notepads glued at the top, printed with your branding on every sheet. A practical, everyday brand touchpoint.",
    startingPrice: 199,
    image: img("notepads"),
    gallery: gallery("notepads"),
    rating: 4.5,
    reviews: 64,
    highlights: ["A4, A5 & A6 sizes", "50 or 100 sheets", "Top-glued", "Optional backing board"],
    variants: [
      { name: "Size", options: ["A4", "A5", "A6"] },
      { name: "Sheets", options: ["50 sheets", "100 sheets"] },
    ],
    units: UNITS,
    minQty: 25,
    bulkThreshold: 250,
  },

  // ---- Labels & Stickers ----
  {
    slug: "vinyl-die-cut-stickers",
    name: "Vinyl Die-Cut Stickers",
    category: "Labels & Stickers",
    categorySlug: "labels-stickers",
    subcategorySlug: "stickers",
    description: "Durable, waterproof stickers cut to any shape.",
    longDescription:
      "Premium vinyl stickers, die-cut to your artwork's exact outline. Waterproof and scratch-resistant — ideal for products, laptops and packaging.",
    startingPrice: 149,
    image: img("stickers"),
    gallery: gallery("stickers"),
    badge: "Popular",
    featured: true,
    rating: 4.9,
    reviews: 932,
    highlights: [
      "Waterproof vinyl",
      "Die-cut to any shape",
      "Matte, gloss or transparent",
      "Indoor & outdoor grade",
    ],
    variants: [
      { name: "Shape", options: ["Die-cut", "Circle", "Square", "Rectangle"] },
      { name: "Material", options: ["White Vinyl", "Transparent", "Holographic"] },
      { name: "Finish", options: ["Matte", "Gloss"] },
    ],
    units: UNITS,
    minQty: 50,
    bulkThreshold: 500,
  },
  {
    slug: "product-labels-roll",
    name: "Product Labels on a Roll",
    category: "Labels & Stickers",
    categorySlug: "labels-stickers",
    subcategorySlug: "product-labels",
    description: "Roll-fed labels for fast, consistent application.",
    longDescription:
      "Labels supplied on a roll for easy hand or machine application — perfect for bottles, jars and packaging lines. Choose your roll size and core.",
    startingPrice: 249,
    image: img("product-labels"),
    gallery: gallery("product-labels"),
    featured: true,
    rating: 4.7,
    reviews: 311,
    highlights: [
      "Supplied on a roll",
      "Waterproof options",
      "Custom shape & size",
      "Machine-applicator ready",
    ],
    variants: [
      { name: "Material", options: ["Paper", "White Vinyl", "Transparent"] },
      { name: "Finish", options: ["Matte", "Gloss"] },
      { name: "Roll core", options: ['1" core', '3" core'] },
    ],
    units: UNITS,
    minQty: 250,
    bulkThreshold: 2000,
  },
  {
    slug: "custom-bottle-labels",
    name: "Custom Bottle Labels",
    category: "Labels & Stickers",
    categorySlug: "labels-stickers",
    subcategorySlug: "custom-labels",
    description: "Curved-surface labels that wrap perfectly.",
    longDescription:
      "Made for curved surfaces like coffee bottles, jars and cosmetics. We account for the wrap so your design lines up on every unit.",
    startingPrice: 179,
    image: img("bottle-labels"),
    gallery: gallery("bottle-labels"),
    rating: 4.8,
    reviews: 176,
    highlights: [
      "Curved-surface ready",
      "Waterproof & oil-resistant",
      "Matte or gloss",
      "Wrap alignment handled for you",
    ],
    variants: [
      { name: "Material", options: ["White Vinyl", "Transparent", "Kraft Paper"] },
      { name: "Finish", options: ["Matte", "Gloss"] },
    ],
    units: UNITS,
    minQty: 100,
    bulkThreshold: 1000,
  },

  // ---- Publishing ----
  {
    slug: "perfect-bound-booklets",
    name: "Perfect-Bound Booklets",
    category: "Publishing",
    categorySlug: "publishing",
    subcategorySlug: "booklets",
    description: "Square-spine booklets for a premium, book-like feel.",
    longDescription:
      "Perfect-bound booklets with a glued square spine — ideal for product catalogues, reports and lookbooks of 32+ pages.",
    startingPrice: 599,
    image: img("booklets"),
    gallery: gallery("booklets"),
    featured: true,
    rating: 4.7,
    reviews: 154,
    highlights: [
      "Square glued spine",
      "32–200 pages",
      "Gloss or matte cover lamination",
      "A4, A5 & square sizes",
    ],
    variants: [
      { name: "Size", options: ["A4", "A5", "Square 21×21 cm"] },
      { name: "Pages", options: ["32", "48", "64", "96"] },
      { name: "Cover", options: ["Gloss laminate", "Matte laminate", "Soft-touch"] },
    ],
    units: UNITS,
    minQty: 25,
    bulkThreshold: 250,
  },
  {
    slug: "saddle-stitch-magazines",
    name: "Saddle-Stitch Magazines",
    category: "Publishing",
    categorySlug: "publishing",
    subcategorySlug: "magazines",
    description: "Stapled magazines for newsletters and zines.",
    longDescription:
      "Saddle-stitched (stapled) magazines — the economical choice for newsletters, programmes and zines up to 64 pages.",
    startingPrice: 449,
    image: img("magazines"),
    gallery: gallery("magazines"),
    rating: 4.5,
    reviews: 92,
    highlights: ["Stapled spine", "8–64 pages", "Gloss or matte inners", "A4 & A5"],
    variants: [
      { name: "Size", options: ["A4", "A5"] },
      { name: "Pages", options: ["8", "16", "24", "32", "48"] },
      { name: "Paper", options: ["130 GSM Gloss", "170 GSM Gloss"] },
    ],
    units: UNITS,
    minQty: 25,
    bulkThreshold: 250,
  },
  {
    slug: "product-catalogues",
    name: "Product Catalogues",
    category: "Publishing",
    categorySlug: "publishing",
    subcategorySlug: "catalogues",
    description: "Showcase your full range in one polished book.",
    longDescription:
      "Multi-page catalogues that present your entire product range with rich imagery and clean layouts. Bound to your preference.",
    startingPrice: 699,
    image: img("catalogues"),
    gallery: gallery("catalogues"),
    rating: 4.6,
    reviews: 73,
    highlights: ["Perfect or saddle bound", "Premium art paper", "Full-bleed imagery", "Custom page count"],
    variants: [
      { name: "Binding", options: ["Perfect bound", "Saddle-stitch", "Wire-O"] },
      { name: "Size", options: ["A4", "A5", "Square"] },
      { name: "Cover", options: ["Gloss laminate", "Matte laminate"] },
    ],
    units: UNITS,
    minQty: 25,
    bulkThreshold: 250,
  },

  // ---- Cards & Invitations ----
  {
    slug: "wedding-invitation-cards",
    name: "Wedding Invitation Cards",
    category: "Cards & Invitations",
    categorySlug: "cards-invitations",
    subcategorySlug: "invitation-cards",
    description: "Elegant invitations for your special day.",
    longDescription:
      "Premium invitation cards with foil, embossing and textured-stock options. Make a beautiful first impression for weddings and events.",
    startingPrice: 499,
    image: img("invitations"),
    gallery: gallery("invitations"),
    badge: "New",
    featured: true,
    rating: 4.9,
    reviews: 221,
    highlights: [
      "Foil & emboss options",
      "Textured premium stocks",
      "Matching envelopes",
      "Single or folded",
    ],
    variants: [
      { name: "Style", options: ["Flat card", "Folded", "Pocket-fold"] },
      { name: "Paper", options: ["300 GSM Matte", "350 GSM Textured", "Pearl Shimmer"] },
      { name: "Finish", options: ["None", "Gold Foil", "Silver Foil", "Emboss"] },
    ],
    units: UNITS,
    minQty: 25,
    bulkThreshold: 250,
  },
  {
    slug: "greeting-cards",
    name: "Greeting Cards",
    category: "Cards & Invitations",
    categorySlug: "cards-invitations",
    subcategorySlug: "greeting-cards",
    description: "Folded cards for festivals, thanks and celebrations.",
    longDescription:
      "Folded greeting cards printed inside and out, supplied flat or pre-creased with optional envelopes.",
    startingPrice: 199,
    image: img("greeting-cards"),
    gallery: gallery("greeting-cards"),
    rating: 4.6,
    reviews: 110,
    highlights: ["Folded A5/A6", "Print inside & out", "Optional envelopes", "Matte or gloss"],
    variants: [
      { name: "Size", options: ["A5 folded", "A6 folded", "Square"] },
      { name: "Paper", options: ["300 GSM Matte", "350 GSM Gloss"] },
    ],
    units: UNITS,
    minQty: 25,
    bulkThreshold: 250,
  },
  {
    slug: "postcards",
    name: "Postcards",
    category: "Cards & Invitations",
    categorySlug: "cards-invitations",
    subcategorySlug: "postcards",
    description: "Double-sided cards for mailers and thank-yous.",
    longDescription:
      "Sturdy double-sided postcards for direct mail, promotions and pack-in thank-you cards. Bright colour on a heavyweight stock.",
    startingPrice: 149,
    image: img("postcards"),
    gallery: gallery("postcards"),
    featured: true,
    rating: 4.5,
    reviews: 96,
    highlights: ["A6 & DL sizes", "Double-sided", "350 GSM stock", "Matte or gloss"],
    variants: [
      { name: "Size", options: ["A6", "DL", "A5"] },
      { name: "Finish", options: ["Matte", "Gloss"] },
    ],
    units: UNITS,
    minQty: 50,
    bulkThreshold: 500,
  },

  // ---- Tags & Accessories ----
  {
    slug: "event-id-badges",
    name: "Event ID Badges",
    category: "Tags & Accessories",
    categorySlug: "tags-accessories",
    subcategorySlug: "id-cards",
    description: "Personalised passes for conferences and events.",
    longDescription:
      "Durable ID badges and event passes, optionally with lanyard slots and variable names. Great for conferences, staff and visitors.",
    startingPrice: 129,
    image: img("badges"),
    gallery: gallery("badges"),
    featured: true,
    rating: 4.7,
    reviews: 134,
    highlights: ["PVC or laminated card", "Lanyard slot", "Variable names", "Single or double-sided"],
    variants: [
      { name: "Material", options: ["Laminated card", "PVC"] },
      { name: "Size", options: ["Standard 86×54 mm", "Portrait 54×86 mm"] },
      { name: "Slot", options: ["No slot", "Punched slot"] },
    ],
    units: UNITS,
    minQty: 25,
    bulkThreshold: 500,
  },
  {
    slug: "hang-tags",
    name: "Hang Tags",
    category: "Tags & Accessories",
    categorySlug: "tags-accessories",
    subcategorySlug: "hang-tags",
    description: "Branded tags for apparel and products.",
    longDescription:
      "Premium hang tags with a punched hole and optional string. Perfect for clothing, handmade goods and gift packaging.",
    startingPrice: 159,
    image: img("hang-tags"),
    gallery: gallery("hang-tags"),
    rating: 4.6,
    reviews: 87,
    highlights: ["400 GSM stock", "Punched hole", "Optional string", "Custom shapes"],
    variants: [
      { name: "Shape", options: ["Rectangle", "Rounded", "Custom"] },
      { name: "Paper", options: ["350 GSM Matte", "400 GSM Kraft", "400 GSM Premium"] },
      { name: "String", options: ["No string", "With string"] },
    ],
    units: UNITS,
    minQty: 50,
    bulkThreshold: 500,
  },
  {
    slug: "event-tickets",
    name: "Event Tickets",
    category: "Tags & Accessories",
    categorySlug: "tags-accessories",
    subcategorySlug: "tickets",
    description: "Numbered, tear-off tickets for events.",
    longDescription:
      "Sequentially numbered tickets with optional perforated tear-off stubs — ideal for shows, raffles and entry passes.",
    startingPrice: 139,
    image: img("tickets"),
    gallery: gallery("tickets"),
    rating: 4.5,
    reviews: 58,
    highlights: ["Sequential numbering", "Perforated stub", "Full-colour", "Custom size"],
    variants: [
      { name: "Stub", options: ["No stub", "Perforated stub"] },
      { name: "Numbering", options: ["None", "Sequential"] },
      { name: "Paper", options: ["250 GSM Matte", "300 GSM Gloss"] },
    ],
    units: UNITS,
    minQty: 100,
    bulkThreshold: 1000,
  },
];

/** Featured products shown on the homepage grid. */
export const featuredProducts: Product[] = products.filter((p) => p.featured);

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(categorySlug: string) {
  return products.filter((p) => p.categorySlug === categorySlug);
}

const DEFAULT_PLATFORM_FEE = 49;
const DEFAULT_DELIVERY = 79;
const FREE_DELIVERY_OVER = 2000;

export function productImages(p: Product): string[] {
  return p.images?.length ? p.images : p.gallery;
}

/** Use authored tiers, or derive three sensible tiers from minQty/startingPrice. */
export function productTiers(p: Product): PriceTier[] {
  if (p.tiers?.length) return [...p.tiers].sort((a, b) => a.qty - b.qty);
  const base = p.minQty;
  const unit = p.startingPrice / base;
  return [
    { qty: base, price: p.startingPrice, savePct: 0 },
    { qty: base * 5, price: Math.round(unit * base * 5 * 0.85), savePct: 15 },
    { qty: base * 10, price: Math.round(unit * base * 10 * 0.75), savePct: 25 },
  ];
}

/** Use authored config options, or map legacy variants (no surcharge). */
export function productOptions(p: Product): ConfigOption[] {
  if (p.options?.length) return p.options;
  return p.variants.map((v) => ({
    label: v.name,
    key: v.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    values: v.options.map((name) => ({ name, surcharge: 0 })),
  }));
}

/** Use authored specs, or derive a table from existing fields. */
export function productSpecs(p: Product): ProductSpec[] {
  if (p.specs?.length) return p.specs;
  const derived: ProductSpec[] = [
    { label: "Category", value: p.category },
    { label: "Minimum order", value: `${p.minQty} pcs` },
    { label: "Size units", value: p.units.join(", ") },
  ];
  for (const v of p.variants) {
    derived.push({ label: v.name, value: v.options.join(" · ") });
  }
  return derived;
}

const DEFAULT_FAQS: ProductFaq[] = [
  {
    q: "What file format should I upload?",
    a: "A print-ready PDF is preferred. We also accept AI, PSD, PNG and JPG at 300–500 DPI in CMYK.",
  },
  {
    q: "Do you check my design before printing?",
    a: "Yes — our team reviews every file for bleed, resolution and colour before it goes to press.",
  },
  {
    q: "Is bulk pricing available?",
    a: "Larger quantities unlock better rates, and big orders qualify for negotiable bulk pricing with flexible payment options.",
  },
];

export function productFaqs(p: Product): ProductFaq[] {
  return p.faqs?.length ? p.faqs : DEFAULT_FAQS;
}

export type PriceBreakdown = {
  qty: number;
  basePrice: number; // regular (list) price at the smallest-tier unit rate
  discount: number; // savings from the applicable tier
  customisation: number; // sum of selected option surcharges
  platformFee: number;
  delivery: number;
  total: number;
  savePct: number;
};

/** Live price breakdown for a given quantity + selected option surcharges. */
export function computePricing(
  p: Product,
  qty: number,
  surcharges: number[]
): PriceBreakdown {
  const tiers = productTiers(p);
  const unitBase = tiers[0].price / tiers[0].qty;
  const applicable =
    [...tiers].reverse().find((t) => qty >= t.qty) ?? tiers[0];
  const tierUnit = applicable.price / applicable.qty;

  const basePrice = Math.round(unitBase * qty);
  const tierPrice = Math.round(tierUnit * qty);
  const discount = Math.max(0, basePrice - tierPrice);
  const customisation = surcharges.reduce((a, b) => a + b, 0);

  const goods = tierPrice + customisation;
  const platformFee = p.platformFee ?? DEFAULT_PLATFORM_FEE;
  const delivery =
    goods >= FREE_DELIVERY_OVER ? 0 : p.deliveryCharge ?? DEFAULT_DELIVERY;
  const total = goods + platformFee + delivery;

  return {
    qty,
    basePrice,
    discount,
    customisation,
    platformFee,
    delivery,
    total,
    savePct: applicable.savePct,
  };
}
