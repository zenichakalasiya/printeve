import Link from "next/link";
import { Printer } from "lucide-react";

import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/data/site";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn("flex items-center gap-2 font-semibold", className)}
    >
      <span className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-md">
        <Printer className="size-5" />
      </span>
      <span className="font-serif text-xl font-semibold tracking-tight">
        {siteConfig.name}
      </span>
    </Link>
  );
}
