"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function SupportCta() {
  const [email, setEmail] = React.useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    toast.success("Thanks! We'll keep you posted on offers and new features.");
    setEmail("");
  }

  return (
    <section className="scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="bg-primary text-primary-foreground relative overflow-hidden rounded-2xl px-6 py-12 sm:px-12">
          <div className="relative grid gap-8 lg:grid-cols-2 lg:items-center">
            <div className="flex flex-col gap-4">
              <h2 className="text-3xl font-bold tracking-tight text-balance">
                Ready to bring your design to life?
              </h2>
              <p className="text-primary-foreground/80 max-w-md text-pretty">
                Start an order in minutes, or talk to our team about bulk and
                custom print jobs.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/products">
                    Start your order <ArrowRight />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
                >
                  <Link href="/contact">Contact support</Link>
                </Button>
              </div>
            </div>

            <div className="lg:justify-self-end">
              <p className="font-medium">Get offers & product updates</p>
              <form
                onSubmit={onSubmit}
                className="mt-3 flex w-full max-w-sm flex-col gap-2 sm:flex-row"
              >
                <div className="relative flex-1">
                  <Mail className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                  <Input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="bg-background text-foreground pl-9"
                    aria-label="Email address"
                  />
                </div>
                <Button type="submit" variant="secondary">
                  Subscribe
                </Button>
              </form>
              <p className="text-primary-foreground/70 mt-2 text-xs">
                No spam. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
