"use client";

import * as React from "react";

import { categories } from "@/lib/data/categories";
import { products } from "@/lib/data/products";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProductCard } from "@/components/products/product-card";

type Sort = "featured" | "price-asc" | "price-desc" | "rating";

export function ProductsCatalog({
  initialCategory,
}: {
  initialCategory?: string;
}) {
  const [activeCat, setActiveCat] = React.useState<string>(
    initialCategory ?? "all"
  );
  const [activeSub, setActiveSub] = React.useState<string>("all");
  const [sort, setSort] = React.useState<Sort>("featured");

  const currentCategory = categories.find((c) => c.slug === activeCat);

  const filtered = React.useMemo(() => {
    let list = products.filter(
      (p) => activeCat === "all" || p.categorySlug === activeCat
    );
    if (activeSub !== "all") {
      list = list.filter((p) => p.subcategorySlug === activeSub);
    }
    const sorted = [...list];
    switch (sort) {
      case "price-asc":
        sorted.sort((a, b) => a.startingPrice - b.startingPrice);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.startingPrice - a.startingPrice);
        break;
      case "rating":
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      default:
        sorted.sort(
          (a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured))
        );
    }
    return sorted;
  }, [activeCat, activeSub, sort]);

  function selectCategory(slug: string) {
    setActiveCat(slug);
    setActiveSub("all");
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Category filter chips */}
      <div className="flex flex-wrap gap-2">
        <FilterChip
          active={activeCat === "all"}
          onClick={() => selectCategory("all")}
        >
          All products
        </FilterChip>
        {categories.map((c) => (
          <FilterChip
            key={c.slug}
            active={activeCat === c.slug}
            onClick={() => selectCategory(c.slug)}
          >
            {c.name}
          </FilterChip>
        ))}
      </div>

      {/* Subcategory chips + sort */}
      <div className="mt-4 flex flex-col gap-4 border-t pt-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {currentCategory && (
            <>
              <FilterChip
                size="sm"
                active={activeSub === "all"}
                onClick={() => setActiveSub("all")}
              >
                All {currentCategory.name}
              </FilterChip>
              {currentCategory.subcategories.map((s) => (
                <FilterChip
                  key={s.slug}
                  size="sm"
                  active={activeSub === s.slug}
                  onClick={() => setActiveSub(s.slug)}
                >
                  {s.name}
                </FilterChip>
              ))}
            </>
          )}
        </div>

        <div className="flex items-center gap-3">
          <span className="text-muted-foreground hidden text-sm sm:inline">
            {filtered.length} product{filtered.length !== 1 && "s"}
          </span>
          <Select value={sort} onValueChange={(v) => setSort(v as Sort)}>
            <SelectTrigger size="sm" className="w-44">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="price-asc">Price: low to high</SelectItem>
              <SelectItem value="price-desc">Price: high to low</SelectItem>
              <SelectItem value="rating">Top rated</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="mt-8 grid grid-cols-2 gap-5 lg:grid-cols-4">
          {filtered.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      ) : (
        <div className="mt-12 flex flex-col items-center gap-3 py-16 text-center">
          <p className="text-muted-foreground">
            No products here yet — more coming soon.
          </p>
          <Button variant="outline" onClick={() => selectCategory("all")}>
            View all products
          </Button>
        </div>
      )}
    </div>
  );
}

function FilterChip({
  active,
  size = "default",
  onClick,
  children,
}: {
  active: boolean;
  size?: "default" | "sm";
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border transition-colors",
        size === "sm" ? "px-3 py-1 text-xs" : "px-4 py-1.5 text-sm",
        active
          ? "bg-foreground text-background border-foreground"
          : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
      )}
    >
      {children}
    </button>
  );
}
