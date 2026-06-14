export type Product = {
  slug: string;
  name: string;
  category: string;
  categorySlug: string;
  startingPrice: number;
  image: string;
  badge?: string;
};

/** Featured products shown on the homepage grid (mock data). */
export const featuredProducts: Product[] = [
  {
    slug: "premium-business-cards",
    name: "Premium Business Cards",
    category: "Marketing Materials",
    categorySlug: "marketing-materials",
    startingPrice: 299,
    image: "https://picsum.photos/seed/business-cards/800/600",
    badge: "Bestseller",
  },
  {
    slug: "vinyl-die-cut-stickers",
    name: "Vinyl Die-Cut Stickers",
    category: "Labels & Stickers",
    categorySlug: "labels-stickers",
    startingPrice: 149,
    image: "https://picsum.photos/seed/stickers/800/600",
    badge: "Popular",
  },
  {
    slug: "matte-finish-posters",
    name: "Matte Finish Posters",
    category: "Marketing Materials",
    categorySlug: "marketing-materials",
    startingPrice: 199,
    image: "https://picsum.photos/seed/posters/800/600",
  },
  {
    slug: "tri-fold-brochures",
    name: "Tri-Fold Brochures",
    category: "Marketing Materials",
    categorySlug: "marketing-materials",
    startingPrice: 349,
    image: "https://picsum.photos/seed/brochures/800/600",
  },
  {
    slug: "wedding-invitation-cards",
    name: "Wedding Invitation Cards",
    category: "Cards & Invitations",
    categorySlug: "cards-invitations",
    startingPrice: 499,
    image: "https://picsum.photos/seed/invitations/800/600",
    badge: "New",
  },
  {
    slug: "branded-letterheads",
    name: "Branded Letterheads",
    category: "Stationery",
    categorySlug: "stationery",
    startingPrice: 249,
    image: "https://picsum.photos/seed/letterheads/800/600",
  },
  {
    slug: "event-id-badges",
    name: "Event ID Badges",
    category: "Tags & Accessories",
    categorySlug: "tags-accessories",
    startingPrice: 129,
    image: "https://picsum.photos/seed/badges/800/600",
  },
  {
    slug: "perfect-bound-booklets",
    name: "Perfect-Bound Booklets",
    category: "Publishing",
    categorySlug: "publishing",
    startingPrice: 599,
    image: "https://picsum.photos/seed/booklets/800/600",
  },
];
