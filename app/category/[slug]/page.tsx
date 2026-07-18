import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { categories, getCategory } from "@/lib/data/categories";
import { PageHeader } from "@/components/layout/page-header";
import { ProductsCatalog } from "@/components/products/products-catalog";

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return { title: "Category not found — PrintEve" };
  return {
    title: `${category.name} — PrintEve`,
    description: category.description,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  return (
    <>
      <PageHeader
        eyebrow="Category"
        title={category.name}
        description={category.description}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products" },
          { label: category.name },
        ]}
      />
      <ProductsCatalog initialCategory={category.slug} />
    </>
  );
}
