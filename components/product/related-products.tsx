"use client";

import type { Product } from "@/lib/data/products";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ProductCard } from "@/components/products/product-card";

export function RelatedProducts({
  products,
  heading,
}: {
  products: Product[];
  heading: string;
}) {
  if (products.length === 0) return null;

  return (
    <Carousel opts={{ align: "start" }} className="w-full">
      <div className="mb-6 flex items-end justify-between gap-4">
        <h2 className="font-serif text-2xl font-medium tracking-tight">
          {heading}
        </h2>
        <div className="relative flex gap-2">
          <CarouselPrevious className="static translate-y-0" />
          <CarouselNext className="static translate-y-0" />
        </div>
      </div>
      <CarouselContent className="-ml-4">
        {products.map((p) => (
          <CarouselItem
            key={p.slug}
            className="basis-2/3 pl-4 sm:basis-1/2 lg:basis-1/4"
          >
            <ProductCard product={p} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
