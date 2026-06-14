"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";

import { categories } from "@/lib/data/categories";
import { mainNav } from "@/lib/data/site";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Logo } from "@/components/layout/logo";
import { SearchBar } from "@/components/layout/search-bar";
import { AccountMenu } from "@/components/layout/account-menu";
import { ModeToggle } from "@/components/layout/mode-toggle";
import { MobileNav } from "@/components/layout/mobile-nav";

export function SiteHeader() {
  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/80 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        <MobileNav />
        <Logo />

        {/* Desktop primary nav */}
        <NavigationMenu className="hidden lg:flex" viewport={false}>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[640px] grid-cols-2 gap-2 p-2">
                  {categories.map((category) => {
                    const Icon = category.icon;
                    return (
                      <li key={category.slug}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={`/category/${category.slug}`}
                            className="hover:bg-accent flex gap-3 rounded-md p-3"
                          >
                            <span className="bg-muted text-foreground flex size-9 shrink-0 items-center justify-center rounded-md">
                              <Icon className="size-5" />
                            </span>
                            <span className="flex flex-col gap-1">
                              <span className="text-sm font-medium">
                                {category.name}
                              </span>
                              <span className="text-muted-foreground line-clamp-1 text-xs">
                                {category.items.join(" · ")}
                              </span>
                            </span>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    );
                  })}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {mainNav.map((item) => (
              <NavigationMenuItem key={item.href}>
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                  <Link href={item.href}>{item.title}</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Search — flexible center on desktop */}
        <div className="hidden flex-1 justify-center px-4 md:flex">
          <SearchBar className="max-w-md" />
        </div>

        {/* Right actions */}
        <div className="ml-auto flex items-center gap-1 md:ml-0">
          <ModeToggle />
          <Button
            variant="ghost"
            size="icon"
            asChild
            className="relative"
            aria-label="Cart"
          >
            <Link href="/cart">
              <ShoppingCart className="size-5" />
              <Badge className="absolute -top-0.5 -right-0.5 size-4 rounded-full px-0 tabular-nums">
                0
              </Badge>
            </Link>
          </Button>
          <AccountMenu />
          <div className="ml-1 hidden items-center gap-2 lg:flex">
            <Button variant="ghost" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Sign up</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile search row */}
      <div className="border-t px-4 py-2 md:hidden">
        <SearchBar />
      </div>
    </header>
  );
}
