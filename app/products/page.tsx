import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { ProductsCatalog } from "@/components/products/products-catalog";

export const metadata: Metadata = {
  title: "Products — PrintEve",
  description:
    "Browse every PrintEve product — business cards, stickers, posters, labels, booklets, invitations and more. Customise online or order in bulk.",
};

export default function ProductsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Catalog"
        title="Everything we print"
        description="Browse by category, customise online, and order one box or a bulk run. Upload your own design or start from a template."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Products" }]}
      />
      <ProductsCatalog />
    </>
  );
}
