import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { featuredProducts } from "@/lib/data/products";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { SectionHeading } from "@/components/home/section-heading";

export function FeaturedProducts() {
  return (
    <section className="bg-muted/40 border-y">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Featured"
            title="Popular products this week"
            description="Crowd favourites our customers keep coming back to."
          />
          <Button variant="outline" asChild className="shrink-0">
            <Link href="/products">
              View all products <ArrowRight />
            </Link>
          </Button>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-5 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <Card
              key={product.slug}
              className="group overflow-hidden p-0 pb-4 transition-shadow hover:shadow-md"
            >
              <Link
                href={`/products/${product.slug}`}
                className="relative block aspect-[4/3] overflow-hidden"
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {product.badge && (
                  <Badge className="absolute top-3 left-3">
                    {product.badge}
                  </Badge>
                )}
              </Link>
              <CardContent className="pt-4">
                <p className="text-muted-foreground text-xs">
                  {product.category}
                </p>
                <h3 className="mt-1 font-semibold">
                  <Link href={`/products/${product.slug}`}>{product.name}</Link>
                </h3>
                <p className="text-muted-foreground mt-2 text-sm">
                  From{" "}
                  <span className="text-foreground font-semibold">
                    {formatPrice(product.startingPrice)}
                  </span>
                </p>
              </CardContent>
              <CardFooter>
                <Button size="sm" className="w-full" asChild>
                  <Link href={`/products/${product.slug}`}>Customize</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
