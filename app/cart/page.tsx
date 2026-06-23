"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Minus, Plus, Trash2, ShoppingBag, FileCheck2, ArrowRight } from "lucide-react";

import {
  useCart,
  lineSubtotal,
} from "@/components/providers/cart-provider";
import { getProduct, productTiers } from "@/lib/data/products";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { OrderSummary } from "@/components/checkout/order-summary";
import { CouponInput } from "@/components/checkout/coupon-input";

export default function CartPage() {
  const { items, totals, updateQty, removeItem } = useCart();

  return (
    <div className="bg-background min-h-dvh">
      <title>Cart — PrintEve</title>

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
          <span className="text-foreground">Cart</span>
        </nav>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="font-serif text-3xl font-bold tracking-tight sm:text-4xl">
          Your Cart
        </h1>

        {items.length === 0 ? (
          <div className="mt-10 flex flex-col items-center gap-4 rounded-xl border border-dashed py-20 text-center">
            <span className="bg-muted text-muted-foreground flex size-16 items-center justify-center rounded-full">
              <ShoppingBag className="size-8" />
            </span>
            <div>
              <p className="text-lg font-medium">Your cart is empty</p>
              <p className="text-muted-foreground">
                Browse our products and add something to print.
              </p>
            </div>
            <Button asChild size="lg">
              <Link href="/products">Browse products</Link>
            </Button>
          </div>
        ) : (
          <div className="mt-8 grid gap-8 lg:grid-cols-3 lg:gap-12">
            {/* Line items */}
            <div className="lg:col-span-2">
              <ul className="flex flex-col divide-y rounded-xl border">
                {items.map((item) => {
                  const product = getProduct(item.slug);
                  const step = product ? productTiers(product)[0].qty : 25;
                  return (
                    <li key={item.key} className="flex gap-4 p-4 sm:p-5">
                      <Link
                        href={`/products/${item.slug}`}
                        className="bg-muted relative size-20 shrink-0 overflow-hidden rounded-lg border sm:size-24"
                      >
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="96px"
                          className="object-cover"
                        />
                      </Link>

                      <div className="flex min-w-0 flex-1 flex-col gap-1">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p className="text-muted-foreground text-xs">
                              {item.category}
                            </p>
                            <Link
                              href={`/products/${item.slug}`}
                              className="font-medium hover:text-brand"
                            >
                              {item.name}
                            </Link>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeItem(item.key)}
                            aria-label={`Remove ${item.name}`}
                            className="text-muted-foreground hover:text-destructive shrink-0"
                          >
                            <Trash2 className="size-4" />
                          </button>
                        </div>

                        {item.options.length > 0 && (
                          <p className="text-muted-foreground text-xs">
                            {item.options
                              .map((o) => `${o.label}: ${o.value}`)
                              .join(" · ")}
                          </p>
                        )}

                        <Badge
                          variant="secondary"
                          className="bg-chart-2/15 text-chart-2 mt-1 w-fit gap-1 border-transparent"
                        >
                          <FileCheck2 className="size-3" />
                          {item.designFile ?? "Artwork to be uploaded"}
                        </Badge>

                        <div className="mt-2 flex items-center justify-between">
                          <div className="flex items-center rounded-md border">
                            <button
                              type="button"
                              aria-label="Decrease quantity"
                              onClick={() => updateQty(item.key, item.qty - step)}
                              className="hover:bg-muted flex size-8 items-center justify-center rounded-l-md"
                            >
                              <Minus className="size-3.5" />
                            </button>
                            <span className="w-14 text-center text-sm tabular-nums">
                              {item.qty}
                            </span>
                            <button
                              type="button"
                              aria-label="Increase quantity"
                              onClick={() => updateQty(item.key, item.qty + step)}
                              className="hover:bg-muted flex size-8 items-center justify-center rounded-r-md"
                            >
                              <Plus className="size-3.5" />
                            </button>
                          </div>
                          <span className="font-semibold tabular-nums">
                            {formatPrice(lineSubtotal(item))}
                          </span>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>

              <Button variant="link" asChild className="mt-4 px-0">
                <Link href="/products">← Continue shopping</Link>
              </Button>
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <Card className="gap-5 p-6 lg:sticky lg:top-24">
                <h2 className="font-medium">Order Summary</h2>
                <CouponInput />
                <OrderSummary>
                  <Button asChild size="lg" className="mt-4 w-full">
                    <Link href="/checkout">
                      Proceed to checkout <ArrowRight />
                    </Link>
                  </Button>
                </OrderSummary>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
