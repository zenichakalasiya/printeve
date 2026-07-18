import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";

import {
  products,
  getProduct,
  getProductsByCategory,
  productImages,
} from "@/lib/data/products";
import { getCategory } from "@/lib/data/categories";
import { ProductGallery } from "@/components/product/product-gallery";
import { ProductBuyBox } from "@/components/product/product-buy-box";
import { ProductDescription } from "@/components/product/product-description";
import { ProductInfoTabs } from "@/components/product/product-info-tabs";
import { RelatedProducts } from "@/components/product/related-products";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Product not found — PrintEve" };
  return {
    title: `${product.name} — PrintEve`,
    description: product.description,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const category = getCategory(product.categorySlug);
  const related = getProductsByCategory(product.categorySlug)
    .filter((p) => p.slug !== product.slug)
    .slice(0, 6);

  return (
    <>
      {/* Breadcrumb */}
      <div className="border-b">
        <nav
          aria-label="Breadcrumb"
          className="text-muted-foreground mx-auto flex max-w-7xl items-center gap-1.5 px-4 py-4 text-sm sm:px-6 lg:px-8"
        >
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>
          <ChevronRight className="size-3.5 opacity-60" />
          <Link href="/products" className="hover:text-foreground">
            Products
          </Link>
          {category && (
            <>
              <ChevronRight className="size-3.5 opacity-60" />
              <Link
                href={`/category/${category.slug}`}
                className="hover:text-foreground"
              >
                {category.name}
              </Link>
            </>
          )}
          <ChevronRight className="size-3.5 opacity-60" />
          <span className="text-foreground line-clamp-1">{product.name}</span>
        </nav>
      </div>

      {/* Gallery + Buy box */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="flex flex-col gap-8">
            <ProductGallery
              images={productImages(product)}
              alt={product.name}
              badge={product.badge}
            />
            <div className="hidden lg:block">
              <ProductDescription product={product} />
            </div>
          </div>

          <ProductBuyBox product={product} />

          {/* Description on mobile sits after the buy box */}
          <div className="lg:hidden">
            <ProductDescription product={product} />
          </div>
        </div>
      </div>

      {/* Info tabs */}
      <section className="border-t">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <ProductInfoTabs product={product} />
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="bg-muted/40 border-t">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
            <RelatedProducts
              products={related}
              heading={`More in ${product.category}`}
            />
          </div>
        </section>
      )}
    </>
  );
}
