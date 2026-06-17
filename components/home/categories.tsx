import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { categories } from "@/lib/data/categories";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/home/section-heading";

export function Categories() {
  return (
    <section id="categories" className="scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <SectionHeading
          eyebrow="Shop by category"
          title="Everything you need to print"
          description="Six curated categories covering 25+ product types — each with its own options, sizes and finishes."
        />

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Link key={category.slug} href={`/category/${category.slug}`}>
                <Card className="group hover:border-primary/40 h-full justify-between gap-4 p-6 transition-colors hover:shadow-md">
                  <div className="flex items-start justify-between">
                    <span className="bg-primary/10 text-primary flex size-12 items-center justify-center rounded-lg">
                      <Icon className="size-6" />
                    </span>
                    <ArrowUpRight className="text-muted-foreground group-hover:text-primary size-5 transition-colors" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <h3 className="text-lg font-semibold">{category.name}</h3>
                    <p className="text-muted-foreground text-sm">
                      {category.description}
                    </p>
                  </div>
                  <p className="text-muted-foreground border-t pt-3 text-xs">
                    {category.subcategories.map((s) => s.name).join(" · ")}
                  </p>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
