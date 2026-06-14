export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  image: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "choosing-the-right-paper-stock",
    title: "Choosing the Right Paper Stock for Your Print Job",
    excerpt:
      "GSM, finishes, coatings — a plain-English guide to picking paper that makes your design look its best.",
    category: "Guides",
    readTime: "5 min read",
    date: "May 28, 2026",
    image: "https://picsum.photos/seed/paper-stock/800/500",
  },
  {
    slug: "prep-artwork-for-print",
    title: "How to Prep Your Artwork So It Prints Perfectly",
    excerpt:
      "Bleed, safe zones, CMYK and resolution — avoid the five mistakes that delay print orders.",
    category: "Design",
    readTime: "6 min read",
    date: "May 14, 2026",
    image: "https://picsum.photos/seed/prep-artwork/800/500",
  },
  {
    slug: "custom-labels-for-small-business",
    title: "Custom Labels That Make Small Products Feel Premium",
    excerpt:
      "From coffee bottles to candle jars — how the right label turns a product into a brand.",
    category: "Inspiration",
    readTime: "4 min read",
    date: "Apr 30, 2026",
    image: "https://picsum.photos/seed/custom-labels/800/500",
  },
];
