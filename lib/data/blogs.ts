export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "quote"; text: string };

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  readTime: string;
  date: string;
  image: string;
  featured?: boolean;
  content: BlogBlock[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "print-ready-files-checklist",
    title: "The Print-Ready Checklist: How to Send Files That Print Perfectly",
    excerpt:
      "Bleed, resolution, colour mode and fonts — the five things that decide whether your print comes out crisp or comes back to haunt you. A plain-English checklist before you upload.",
    category: "Guides",
    author: "The PrintEve Team",
    readTime: "6 min read",
    date: "June 12, 2026",
    image: "https://picsum.photos/seed/print-ready/1200/700",
    featured: true,
    content: [
      {
        type: "p",
        text: "Most print problems don't happen at the printer — they happen in the file. The good news: almost all of them are avoidable in about five minutes. Here's the checklist we run every PrintEve order through, so you can get it right before you even upload.",
      },
      { type: "h2", text: "1. Add bleed (and keep important stuff away from the edge)" },
      {
        type: "p",
        text: "Printers cut through stacks of sheets at once, so the cut can shift by a millimetre or two. \"Bleed\" means extending your background colour or image 3 mm past every edge, so a slight shift never leaves a thin white strip. Just as important: keep text and logos at least 3–4 mm inside the cut line so nothing critical gets trimmed.",
      },
      { type: "h2", text: "2. Use the right resolution" },
      {
        type: "p",
        text: "For anything held in the hand — business cards, flyers, labels — your artwork should be 300 DPI at its final printed size. A photo that looks sharp on screen can still print blurry if it's low resolution. Large-format posters can go lower (150 DPI is usually fine) because you view them from further away.",
      },
      { type: "h2", text: "3. Design in CMYK, not RGB" },
      {
        type: "p",
        text: "Screens use RGB light; presses use CMYK ink. Bright RGB blues and greens can print duller than expected. If your tool lets you, work in CMYK so what you see is closer to what you get — and avoid building rich blacks from a single channel.",
      },
      { type: "h2", text: "4. Outline or embed your fonts" },
      {
        type: "p",
        text: "If we don't have your exact font, your text can reflow or substitute. Exporting a PDF with fonts embedded — or converting text to outlines — locks your typography in place. This is the single most common cause of \"that's not how it looked in my file.\"",
      },
      { type: "h2", text: "5. Send the right file format" },
      {
        type: "ul",
        items: [
          "PDF (print-ready, with bleed) — best for almost everything",
          "AI / vector — ideal for logos and line art; stays crisp at any size",
          "PNG — fine for raster artwork at 300 DPI; use a transparent background for die-cut stickers",
        ],
      },
      {
        type: "p",
        text: "On PrintEve you can upload PNG, PDF or AI files up to 3GB, and set your dimensions in MM, CM, INCH, METER or pixels — so you're never forced to guess at sizing.",
      },
      {
        type: "quote",
        text: "If you only do one thing: export a print-ready PDF with 3 mm bleed and embedded fonts. That alone prevents the majority of reprints.",
      },
      {
        type: "p",
        text: "Not sure if your file is ready? Upload it anyway — our team checks every design before it goes to print and flags anything that needs fixing.",
      },
    ],
  },
  {
    slug: "choosing-the-right-paper-stock",
    title: "GSM, Finishes & Stocks: Choosing the Right Paper for Your Print Job",
    excerpt:
      "What does 300 GSM actually mean, and when should you pay for 400? A practical guide to picking paper weight and finish for cards, brochures, labels and more.",
    category: "Guides",
    author: "The PrintEve Team",
    readTime: "5 min read",
    date: "May 28, 2026",
    image: "https://picsum.photos/seed/paper-stock/1200/700",
    content: [
      {
        type: "p",
        text: "Paper choice changes how your print feels in the hand — and how your brand is perceived. Two numbers do most of the work: GSM (weight) and finish (the surface). Here's how to choose without overthinking it.",
      },
      { type: "h2", text: "GSM in one line" },
      {
        type: "p",
        text: "GSM (grams per square metre) is how heavy and thick the paper is. Higher GSM feels more premium and rigid. A flyer might be 130 GSM; a business card is usually 300–400 GSM.",
      },
      { type: "h2", text: "A quick GSM cheat-sheet" },
      {
        type: "ul",
        items: [
          "130–170 GSM — flyers, brochure pages, magazine inners",
          "250–300 GSM — posters, postcards, folded cards",
          "300–350 GSM — standard business cards",
          "400+ GSM — premium business cards and hang tags that feel substantial",
        ],
      },
      { type: "h2", text: "Matte, gloss or something special?" },
      {
        type: "p",
        text: "Gloss makes colours pop and resists fingerprints — great for photo-heavy posters and brochures. Matte is understated and easy to read, and it takes a pen (essential for letterheads and forms). For an extra touch, soft-touch lamination feels velvety, and spot-UV adds a shiny highlight over a matte background.",
      },
      { type: "h2", text: "When to spend more" },
      {
        type: "p",
        text: "Spend on weight and finish for anything a customer holds and judges you by — business cards, invitations, premium packaging. Save on internal or short-lived items like single-use flyers, where volume and value matter more.",
      },
      {
        type: "quote",
        text: "Rule of thumb: the longer someone holds it, the more the paper matters.",
      },
    ],
  },
  {
    slug: "custom-labels-for-small-business",
    title: "Custom Labels That Make Small Products Feel Premium",
    excerpt:
      "From coffee bottles to candle jars — how the right label turns a product into a brand. What to choose for curved surfaces, waterproofing and small runs.",
    category: "Inspiration",
    author: "The PrintEve Team",
    readTime: "4 min read",
    date: "April 30, 2026",
    image: "https://picsum.photos/seed/custom-labels/1200/700",
    content: [
      {
        type: "p",
        text: "For small businesses, the label is often the first physical thing a customer touches. The e-commerce boom has made great labelling a competitive edge — and you don't need a huge run to get it right.",
      },
      { type: "h2", text: "Match the material to the surface" },
      {
        type: "ul",
        items: [
          "White vinyl — durable, opaque, great all-rounder for bottles and jars",
          "Transparent — the \"no-label\" look for glass and clear packaging",
          "Kraft paper — warm, natural feel for artisanal and organic brands",
        ],
      },
      { type: "h2", text: "Mind the curve" },
      {
        type: "p",
        text: "Labels on bottles and jars wrap around a curved surface, so a design that looks centred when flat can drift when applied. We account for the wrap when we set your file — but leave a little breathing room around key elements just in case.",
      },
      { type: "h2", text: "Waterproof if it gets wet" },
      {
        type: "p",
        text: "Anything that lives in a fridge, bathroom or kitchen should be a waterproof vinyl with a laminate, so it survives condensation and handling without smudging or peeling.",
      },
      { type: "h2", text: "Rolls vs sheets" },
      {
        type: "p",
        text: "Applying by hand in small batches? Sheets are fine. Scaling up or using an applicator? Order on a roll for speed and consistency. PrintEve supports both, so you can start on sheets and move to rolls as you grow.",
      },
      {
        type: "quote",
        text: "A ₹15 label upgrade can do more for perceived value than almost anything else on a small product.",
      },
    ],
  },
];

export function getBlogPost(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}
