// Shared mobile product catalog + cart types.
// NOTE: no "use client" here on purpose — this module is imported by the
// server component `product/[id]/page.tsx` (for generateStaticParams under
// `output: "export"`) as well as by the client context. Keep it data-only.

export interface Product {
  id: string;
  name: string;
  category: string;
  categoryLabel: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  gallery: string[];
  description: string;
  tagline: string;
  finish: string;
  size: string;
  deliveryEta: string;
}

// picsum.photos is reliable and already allow-listed in next.config (the web
// app uses it too) — unlike the previous Unsplash URLs which failed to load.
const img = (seed: string) => `https://picsum.photos/seed/${seed}/900/900`;
const gallery = (seed: string) => [
  img(seed),
  img(`${seed}-b`),
  img(`${seed}-c`),
  img(`${seed}-d`),
];

export const PRODUCTS: Product[] = [
  {
    id: "vcard-round",
    name: "Rounded Corner Business Card",
    category: "marketing-materials",
    categoryLabel: "Business Cards",
    price: 299,
    rating: 4.8,
    reviews: 124,
    image: img("pe-vcard"),
    gallery: gallery("pe-vcard"),
    description:
      "Premium 350 GSM business cards with elegant smooth rounded edges and a soft matte finish that feels as good as it looks.",
    tagline: "Soft to hold, sharp to look at",
    finish: "Smooth Matte Lamination",
    size: "3.5 x 2.0 in",
    deliveryEta: "24–48 hrs",
  },
  {
    id: "sticker-diecut",
    name: "Custom Die-Cut Stickers",
    category: "labels-stickers",
    categoryLabel: "Stickers & Labels",
    price: 199,
    rating: 4.9,
    reviews: 84,
    image: img("pe-sticker"),
    gallery: gallery("pe-sticker"),
    description:
      "Waterproof, thick vinyl stickers custom-cut to your logo's exact shape. Scratch-proof and UV-resistant for indoor or outdoor use.",
    tagline: "Cut to your shape, built to last",
    finish: "Glossy Protective Coat",
    size: "3.0 x 3.0 in",
    deliveryEta: "2–3 days",
  },
  {
    id: "flyer-bulk",
    name: "High-Gloss Marketing Flyers",
    category: "marketing-materials",
    categoryLabel: "Flyers & Leaflets",
    price: 499,
    rating: 4.7,
    reviews: 210,
    image: img("pe-flyer"),
    gallery: gallery("pe-flyer"),
    description:
      "Stunning double-sided flyers printed on 170 GSM gloss paper with vivid, high-saturation colour reproduction that pops.",
    tagline: "Bold colour that grabs attention",
    finish: "High-Gloss Finish",
    size: "A5 Standard",
    deliveryEta: "2–4 days",
  },
  {
    id: "letterhead-premium",
    name: "Corporate Letterheads",
    category: "stationery",
    categoryLabel: "Office Stationery",
    price: 399,
    rating: 4.6,
    reviews: 65,
    image: img("pe-letterhead"),
    gallery: gallery("pe-letterhead"),
    description:
      "Elegant company letterheads printed on textured Royal Executive paper — the premium first impression your brand deserves.",
    tagline: "A premium first impression",
    finish: "Uncoated Fine Texture",
    size: "A4 Letter Size",
    deliveryEta: "3–4 days",
  },
];

export function getProduct(id: string | undefined): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export interface CartItem {
  id: string;
  product: Product;
  size: string;
  finish: string;
  quality: string;
  sides: string;
  qty: number;
  // Price per single piece incl. finish/GSM surcharges — captured at add time
  // so the cart total always matches what the configurator showed.
  unitPrice: number;
  file: string;
}
