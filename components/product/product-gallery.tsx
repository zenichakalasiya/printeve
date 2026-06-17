"use client";

import * as React from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export function ProductGallery({
  images,
  alt,
  badge,
}: {
  images: string[];
  alt: string;
  badge?: string;
}) {
  const [active, setActive] = React.useState(images[0]);

  return (
    <div className="flex flex-col gap-4 lg:sticky lg:top-24">
      <div className="bg-muted relative aspect-square overflow-hidden rounded-lg border">
        <Image
          src={active}
          alt={alt}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
          priority
        />
        {badge && <Badge className="absolute top-4 left-4">{badge}</Badge>}
      </div>
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(src)}
              aria-label={`View image ${i + 1}`}
              aria-current={active === src}
              className={cn(
                "relative aspect-square overflow-hidden rounded-md border transition-colors",
                active === src
                  ? "border-foreground"
                  : "border-border hover:border-foreground/40"
              )}
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="120px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
