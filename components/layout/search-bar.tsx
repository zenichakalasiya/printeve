"use client";

import * as React from "react";
import { Search } from "lucide-react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

export function SearchBar({ className }: { className?: string }) {
  const [query, setQuery] = React.useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    toast.info(`Search isn't wired up yet — you searched "${query}".`);
  }

  return (
    <form onSubmit={onSubmit} className={cn("relative w-full", className)}>
      <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
      <Input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search products, e.g. business cards…"
        className="pl-9"
        aria-label="Search products"
      />
    </form>
  );
}
