import * as React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

type Crumb = { label: string; href?: string };

export function PageHeader({
  eyebrow,
  title,
  description,
  breadcrumbs,
  align = "left",
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  breadcrumbs?: Crumb[];
  align?: "left" | "center";
  children?: React.ReactNode;
}) {
  return (
    <section className="border-b">
      <div
        className={cn(
          "mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16",
          align === "center" && "text-center"
        )}
      >
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav
            aria-label="Breadcrumb"
            className="text-muted-foreground mb-6 flex items-center gap-1.5 text-sm"
          >
            {breadcrumbs.map((c, i) => (
              <span key={i} className="flex items-center gap-1.5">
                {i > 0 && <ChevronRight className="size-3.5 opacity-60" />}
                {c.href ? (
                  <Link href={c.href} className="hover:text-foreground">
                    {c.label}
                  </Link>
                ) : (
                  <span className="text-foreground">{c.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}

        {eyebrow && (
          <span
            className={cn(
              "text-brand flex items-center gap-2 text-xs font-semibold tracking-[0.18em] uppercase",
              align === "center" && "justify-center"
            )}
          >
            <span className="bg-brand inline-block h-px w-6" />
            {eyebrow}
          </span>
        )}
        <h1 className="font-serif mt-3 text-4xl font-medium tracking-tight text-balance sm:text-5xl lg:text-[3.25rem] lg:leading-[1.03]">
          {title}
        </h1>
        {description && (
          <p
            className={cn(
              "text-muted-foreground mt-4 max-w-2xl text-lg text-pretty",
              align === "center" && "mx-auto"
            )}
          >
            {description}
          </p>
        )}
        {children && <div className="mt-6">{children}</div>}
      </div>
    </section>
  );
}
