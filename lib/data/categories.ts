import type { LucideIcon } from "lucide-react";
import {
  Megaphone,
  FileText,
  Sticker,
  BookOpen,
  Mail,
  Tag,
} from "lucide-react";

export type Subcategory = { slug: string; name: string };

export type Category = {
  slug: string;
  name: string;
  description: string;
  icon: LucideIcon;
  subcategories: Subcategory[];
};

function sub(name: string): Subcategory {
  return {
    name,
    slug: name
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, ""),
  };
}

/**
 * The six top-level product categories from the FigJam "Product Category"
 * progressive-disclosure list. Subcategories drive the navbar mega-menu, the
 * category pages, and the catalog filters.
 */
export const categories: Category[] = [
  {
    slug: "marketing-materials",
    name: "Marketing Materials",
    description: "Cards, brochures and posters that get you noticed.",
    icon: Megaphone,
    subcategories: [
      "Business Cards",
      "Brochures",
      "Flyers",
      "Posters",
      "Catalogues",
    ].map(sub),
  },
  {
    slug: "stationery",
    name: "Stationery",
    description: "Branded everyday essentials for your business.",
    icon: FileText,
    subcategories: [
      "Letterheads",
      "Envelopes",
      "Notepads",
      "Documents",
      "Certificates",
    ].map(sub),
  },
  {
    slug: "labels-stickers",
    name: "Labels & Stickers",
    description: "Custom labels and stickers for any surface.",
    icon: Sticker,
    subcategories: ["Stickers", "Product Labels", "Custom Labels"].map(sub),
  },
  {
    slug: "publishing",
    name: "Publishing",
    description: "Magazines, booklets and catalogues, print-ready.",
    icon: BookOpen,
    subcategories: ["Magazines", "Booklets", "Catalogues"].map(sub),
  },
  {
    slug: "cards-invitations",
    name: "Cards & Invitations",
    description: "Make every occasion memorable.",
    icon: Mail,
    subcategories: ["Greeting Cards", "Invitation Cards", "Postcards"].map(sub),
  },
  {
    slug: "tags-accessories",
    name: "Tags & Accessories",
    description: "Tags, badges and passes for events and products.",
    icon: Tag,
    subcategories: ["Hang Tags", "ID Cards", "Badges", "Tickets", "Coupons"].map(
      sub
    ),
  },
];

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}
