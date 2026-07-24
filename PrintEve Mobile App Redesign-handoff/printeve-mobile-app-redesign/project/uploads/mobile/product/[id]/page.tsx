import { PRODUCTS, getProduct } from "../../products-data";
import ProductDetailClient from "./ProductDetailClient";

// Required by `output: "export"` for dynamic routes — pre-render one page per
// product id at build time.
export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ id: p.id }));
}

export default async function MobileProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getProduct(id) ?? PRODUCTS[0];
  return <ProductDetailClient product={product} />;
}
