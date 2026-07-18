"use client";

import * as React from "react";
import { Check, ChevronDown } from "lucide-react";

import type { Product } from "@/lib/data/products";
import { cn } from "@/lib/utils";

export function ProductDescription({ product }: { product: Product }) {
  const [open, setOpen] = React.useState(false);

  return (
    <section className="rounded-xl border p-6">
      <h2 className="font-serif text-xl font-medium tracking-tight">
        About this product
      </h2>
      <p
        className={cn(
          "text-muted-foreground mt-3 text-pretty",
          !open && "line-clamp-3"
        )}
      >
        {product.longDescription}
      </p>

      {open && (
        <ul className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          {product.highlights.map((h) => (
            <li key={h} className="flex items-start gap-2 text-sm">
              <Check className="text-brand mt-0.5 size-4 shrink-0" />
              {h}
            </li>
          ))}
        </ul>
      )}

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="text-brand mt-4 inline-flex items-center gap-1 text-sm font-medium"
      >
        {open ? "Show less" : "Read more"}
        <ChevronDown
          className={cn("size-4 transition-transform", open && "rotate-180")}
        />
      </button>
    </section>
  );
}
