"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Trash2, Minus, Plus } from "lucide-react";

import { useCart, lineSubtotal } from "@/components/providers/cart-provider";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

export function MiniCart() {
  const { open, setOpen, items, totals, updateQty, removeItem } = useCart();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="right" className="w-full gap-0 sm:max-w-md">
        <SheetHeader className="border-b">
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="size-5" />
            Your cart{" "}
            {totals.count > 0 && (
              <span className="text-muted-foreground font-normal">
                ({totals.count})
              </span>
            )}
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
            <span className="bg-muted text-muted-foreground flex size-14 items-center justify-center rounded-full">
              <ShoppingBag className="size-7" />
            </span>
            <div>
              <p className="font-medium">Your cart is empty</p>
              <p className="text-muted-foreground text-sm">
                Add a product to get started.
              </p>
            </div>
            <Button asChild onClick={() => setOpen(false)}>
              <Link href="/products">Browse products</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-4">
              <ul className="flex flex-col gap-4">
                {items.map((item) => (
                  <li key={item.key} className="flex gap-3">
                    <div className="bg-muted relative size-16 shrink-0 overflow-hidden rounded-md border">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col gap-1">
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          href={`/products/${item.slug}`}
                          onClick={() => setOpen(false)}
                          className="line-clamp-1 text-sm font-medium hover:text-brand"
                        >
                          {item.name}
                        </Link>
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
                        <p className="text-muted-foreground line-clamp-1 text-xs">
                          {item.options.map((o) => o.value).join(" · ")}
                        </p>
                      )}
                      <div className="mt-1 flex items-center justify-between">
                        <div className="flex items-center rounded-md border">
                          <button
                            type="button"
                            aria-label="Decrease quantity"
                            onClick={() => updateQty(item.key, item.qty - 25)}
                            className="hover:bg-muted flex size-7 items-center justify-center rounded-l-md"
                          >
                            <Minus className="size-3" />
                          </button>
                          <span className="w-12 text-center text-xs tabular-nums">
                            {item.qty}
                          </span>
                          <button
                            type="button"
                            aria-label="Increase quantity"
                            onClick={() => updateQty(item.key, item.qty + 25)}
                            className="hover:bg-muted flex size-7 items-center justify-center rounded-r-md"
                          >
                            <Plus className="size-3" />
                          </button>
                        </div>
                        <span className="text-sm font-semibold tabular-nums">
                          {formatPrice(lineSubtotal(item))}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <SheetFooter className="border-t">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-semibold tabular-nums">
                  {formatPrice(totals.taxable)}
                </span>
              </div>
              <p className="text-muted-foreground text-xs">
                Taxes, fees & delivery calculated at checkout.
              </p>
              <Separator className="my-1" />
              <Button asChild size="lg" onClick={() => setOpen(false)}>
                <Link href="/checkout">Checkout</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                onClick={() => setOpen(false)}
              >
                <Link href="/cart">View full cart</Link>
              </Button>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
