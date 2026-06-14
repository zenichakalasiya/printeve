"use client";

import * as React from "react";
import Link from "next/link";
import { Menu } from "lucide-react";

import { categories } from "@/lib/data/categories";
import { mainNav } from "@/lib/data/site";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Logo } from "@/components/layout/logo";

export function MobileNav() {
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          aria-label="Open menu"
        >
          <Menu className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80 p-0">
        <SheetHeader className="border-b">
          <SheetTitle asChild>
            <Logo />
          </SheetTitle>
        </SheetHeader>

        <nav className="flex-1 overflow-y-auto px-4 pb-6">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="categories">
              <AccordionTrigger>Categories</AccordionTrigger>
              <AccordionContent className="flex flex-col gap-1">
                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <Link
                      key={category.slug}
                      href={`/category/${category.slug}`}
                      onClick={() => setOpen(false)}
                      className="hover:bg-accent flex items-center gap-3 rounded-md px-2 py-2 text-sm"
                    >
                      <Icon className="text-muted-foreground size-4" />
                      {category.name}
                    </Link>
                  );
                })}
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="mt-2 flex flex-col">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="hover:bg-accent rounded-md px-2 py-3 text-sm font-medium"
              >
                {item.title}
              </Link>
            ))}
          </div>

          <div className="mt-4 flex flex-col gap-2">
            <Button asChild onClick={() => setOpen(false)}>
              <Link href="/signup">Sign up</Link>
            </Button>
            <Button variant="outline" asChild onClick={() => setOpen(false)}>
              <Link href="/login">Login</Link>
            </Button>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
