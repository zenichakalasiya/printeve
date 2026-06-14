import type { LucideIcon } from "lucide-react";
import {
  Megaphone,
  FileText,
  Sticker,
  BookOpen,
  Mail,
  Tag,
} from "lucide-react";

export type Category = {
  slug: string;
  name: string;
  description: string;
  icon: LucideIcon;
  items: string[];
};

/**
 * The six top-level product categories from the FigJam "Product Category"
 * progressive-disclosure list. Sub-items drive the navbar mega-menu and the
 * homepage category cards.
 */
export const categories: Category[] = [
  {
    slug: "marketing-materials",
    name: "Marketing Materials",
    description: "Cards, brochures and posters that get you noticed.",
    icon: Megaphone,
    items: ["Business Cards", "Brochures", "Flyers", "Posters", "Catalogues"],
  },
  {
    slug: "stationery",
    name: "Stationery",
    description: "Branded everyday essentials for your business.",
    icon: FileText,
    items: ["Letterheads", "Envelopes", "Notepads", "Documents", "Certificates"],
  },
  {
    slug: "labels-stickers",
    name: "Labels & Stickers",
    description: "Custom labels and stickers for any surface.",
    icon: Sticker,
    items: ["Stickers", "Product Labels", "Custom Labels"],
  },
  {
    slug: "publishing",
    name: "Publishing",
    description: "Magazines, booklets and catalogues, print-ready.",
    icon: BookOpen,
    items: ["Magazines", "Booklets", "Catalogues"],
  },
  {
    slug: "cards-invitations",
    name: "Cards & Invitations",
    description: "Make every occasion memorable.",
    icon: Mail,
    items: ["Greeting Cards", "Invitation Cards", "Postcards"],
  },
  {
    slug: "tags-accessories",
    name: "Tags & Accessories",
    description: "Tags, badges and passes for events and products.",
    icon: Tag,
    items: ["Hang Tags", "ID Cards", "Badges", "Tickets", "Coupons"],
  },
];
