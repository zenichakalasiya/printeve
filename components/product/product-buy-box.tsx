"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Star,
  ShoppingCart,
  ShieldCheck,
  Truck,
  FileCheck2,
  Zap,
} from "lucide-react";
import { toast } from "sonner";

import {
  type Product,
  computePricing,
  productOptions,
  productTiers,
} from "@/lib/data/products";
import { useCart } from "@/components/providers/cart-provider";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ConfigSelects } from "@/components/product/config-selects";
import { QuantitySelector } from "@/components/product/quantity-selector";
import { UploadDropzone } from "@/components/product/upload-dropzone";
import { PriceDetails } from "@/components/product/price-details";

export function ProductBuyBox({ product }: { product: Product }) {
  const router = useRouter();
  const { addItem, setOpen } = useCart();
  const options = React.useMemo(() => productOptions(product), [product]);
  const tiers = React.useMemo(() => productTiers(product), [product]);

  const [selected, setSelected] = React.useState<Record<string, string>>(() =>
    Object.fromEntries(options.map((o) => [o.key, o.values[0]?.name ?? ""]))
  );
  const [qty, setQty] = React.useState(tiers[0].qty);

  const surcharges = React.useMemo(
    () =>
      options.map((o) => {
        const chosen = o.values.find((v) => v.name === selected[o.key]);
        return chosen?.surcharge ?? 0;
      }),
    [options, selected]
  );

  const pricing = React.useMemo(
    () => computePricing(product, qty, surcharges),
    [product, qty, surcharges]
  );

  function setOption(key: string, name: string) {
    setSelected((s) => ({ ...s, [key]: name }));
  }

  function buildCartItem() {
    return {
      slug: product.slug,
      name: product.name,
      image: product.image,
      category: product.category,
      categorySlug: product.categorySlug,
      options: options.map((o) => ({ label: o.label, value: selected[o.key] })),
      unit: product.units[0],
      surcharge: surcharges.reduce((a, b) => a + b, 0),
      qty,
    };
  }

  function addToCart() {
    addItem(buildCartItem());
    setOpen(true);
    toast.success(`Added ${qty.toLocaleString("en-IN")} × ${product.name} to cart.`);
  }

  function buyNow() {
    addItem(buildCartItem());
    router.push("/checkout");
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <Link
          href={`/category/${product.categorySlug}`}
          className="text-brand text-xs font-semibold tracking-[0.18em] uppercase"
        >
          {product.category}
        </Link>
        <h1 className="font-serif mt-2 text-3xl font-medium tracking-tight sm:text-4xl">
          {product.name}
        </h1>
        <div className="text-muted-foreground mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
          <span className="text-foreground flex items-center gap-1">
            <Star className="fill-chart-4 text-chart-4 size-4" />
            {product.rating}
          </span>
          <span>·</span>
          <span>{product.reviews.toLocaleString("en-IN")} reviews</span>
          {product.ordersComplete && (
            <>
              <span>·</span>
              <span>
                {product.ordersComplete.toLocaleString("en-IN")} orders
                completed
              </span>
            </>
          )}
        </div>
        <p className="text-muted-foreground mt-3 text-pretty">
          {product.description}
        </p>
        <div className="mt-4 flex items-baseline gap-2">
          <span className="text-muted-foreground text-sm">Starting at</span>
          <span className="text-2xl font-semibold tracking-tight">
            {formatPrice(product.startingPrice)}
          </span>
          <span className="text-muted-foreground text-sm">
            / {tiers[0].qty} pcs
          </span>
        </div>
      </div>

      <Separator />

      {/* Configurator */}
      <ConfigSelects options={options} value={selected} onChange={setOption} />
      <QuantitySelector
        tiers={tiers}
        qty={qty}
        step={tiers[0].qty}
        onChange={setQty}
      />
      <UploadDropzone />

      {/* Live price breakdown */}
      <PriceDetails pricing={pricing} />

      {/* Desktop CTAs — hidden on mobile (sticky bar takes over) */}
      <div className="hidden gap-3 lg:flex">
        <Button size="lg" variant="outline" className="flex-1" onClick={addToCart}>
          <ShoppingCart /> Add to cart
        </Button>
        <Button size="lg" className="flex-1" onClick={buyNow}>
          <Zap /> Buy now
        </Button>
      </div>
      <div className="hidden lg:block">
        <Button variant="link" asChild className="text-muted-foreground px-0">
          <Link href="/contact">Need 1,000+? Request a bulk quote →</Link>
        </Button>
      </div>

      {/* Trust row */}
      <div className="text-muted-foreground grid grid-cols-1 gap-2 text-sm sm:grid-cols-3">
        <span className="flex items-center gap-2">
          <ShieldCheck className="text-brand size-4" /> Proof before print
        </span>
        <span className="flex items-center gap-2">
          <Truck className="text-brand size-4" /> Live tracking
        </span>
        <span className="flex items-center gap-2">
          <FileCheck2 className="text-brand size-4" /> Free file check
        </span>
      </div>

      {/* Mobile sticky footer bar */}
      <div className="bg-background/95 fixed inset-x-0 bottom-0 z-40 border-t p-3 backdrop-blur lg:hidden">
        <div className="mx-auto flex max-w-7xl items-center gap-3">
          <div className="shrink-0">
            <p className="text-muted-foreground text-[11px]">Total</p>
            <p className="text-lg font-semibold tabular-nums">
              {formatPrice(pricing.total)}
            </p>
          </div>
          <Button
            variant="outline"
            size="icon"
            aria-label="Add to cart"
            onClick={addToCart}
            className="size-11 shrink-0"
          >
            <ShoppingCart />
          </Button>
          <Button className="h-11 flex-1" onClick={buyNow}>
            <Zap /> Buy now
          </Button>
        </div>
      </div>
      {/* Spacer so sticky bar doesn't cover content on mobile */}
      <div className="h-16 lg:hidden" aria-hidden />
    </div>
  );
}
