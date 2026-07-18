import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

import type { Product } from "@/lib/data/products";
import { formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="group overflow-hidden p-0 pb-4 transition-shadow hover:shadow-md">
      <Link
        href={`/products/${product.slug}`}
        className="relative block aspect-[4/3] overflow-hidden"
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {product.badge && (
          <Badge className="absolute top-3 left-3">{product.badge}</Badge>
        )}
      </Link>
      <CardContent className="pt-4">
        <div className="text-muted-foreground flex items-center justify-between text-xs">
          <span>{product.category}</span>
          <span className="text-foreground flex items-center gap-1">
            <Star className="fill-chart-4 text-chart-4 size-3" />
            {product.rating}
          </span>
        </div>
        <h3 className="mt-1 font-medium">
          <Link href={`/products/${product.slug}`} className="hover:text-brand">
            {product.name}
          </Link>
        </h3>
        <p className="text-muted-foreground mt-1 line-clamp-2 text-sm">
          {product.description}
        </p>
        <p className="text-muted-foreground mt-3 text-sm">
          From{" "}
          <span className="text-foreground font-semibold">
            {formatPrice(product.startingPrice)}
          </span>
        </p>
      </CardContent>
    </Card>
  );
}
