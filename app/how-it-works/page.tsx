import type { Metadata } from "next";
import Link from "next/link";
import {
  LayoutGrid,
  UploadCloud,
  ShoppingCart,
  CreditCard,
  Truck,
} from "lucide-react";

import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const steps = [
  { icon: LayoutGrid, title: "Select a category", description: "Pick a product or a custom category for your item." },
  { icon: UploadCloud, title: "Upload & customise", description: "Add your design, set size and units, fill in details." },
  { icon: ShoppingCart, title: "Add to cart", description: "Review pricing by quantity, apply offers, save your job." },
  { icon: CreditCard, title: "Pay securely", description: "Checkout via UPI, card or wallet — flexible options." },
  { icon: Truck, title: "Track delivery", description: "Follow your order from printing to your doorstep." },
];

export const metadata: Metadata = {
  title: "How it works — PrintEve",
  description:
    "A walkthrough of ordering custom prints on PrintEve — select, upload, customise, pay and track. Full guide coming soon.",
};

export default function HowItWorksPage() {
  return (
    <>
      <PageHeader
        eyebrow="How it works"
        title="From idea to doorstep"
        description="We're putting the finishing touches on a full, step-by-step walkthrough. Here's the short version while we build it out."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "How it works" }]}
      >
        <Badge variant="secondary" className="rounded-full px-3 py-1">
          Detailed guide coming soon
        </Badge>
      </PageHeader>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <ol className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <li key={step.title} className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <span className="bg-primary text-primary-foreground flex size-10 shrink-0 items-center justify-center rounded-full font-semibold">
                    {i + 1}
                  </span>
                  <span className="bg-border hidden h-px flex-1 lg:block" />
                </div>
                <Icon className="text-brand size-6" />
                <h3 className="font-medium">{step.title}</h3>
                <p className="text-muted-foreground text-sm">
                  {step.description}
                </p>
              </li>
            );
          })}
        </ol>

        <div className="mt-14 flex flex-col items-start gap-4 rounded-2xl border border-dashed p-8 text-center sm:items-center">
          <h2 className="font-serif text-2xl font-medium tracking-tight">
            The full walkthrough is on its way
          </h2>
          <p className="text-muted-foreground max-w-md">
            Want to get started now? Browse the catalog and upload your design —
            our team will guide you through the rest.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild>
              <Link href="/products">Browse products</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/contact">Talk to our team</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
