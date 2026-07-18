import { LayoutGrid, UploadCloud, ShoppingCart, CreditCard, Truck } from "lucide-react";

import { SectionHeading } from "@/components/home/section-heading";

const steps = [
  {
    icon: LayoutGrid,
    title: "Select a category",
    description: "Pick a product or choose a custom category for your item.",
  },
  {
    icon: UploadCloud,
    title: "Upload & customise",
    description: "Add your design, set size and units, fill in the details.",
  },
  {
    icon: ShoppingCart,
    title: "Add to cart",
    description: "Review pricing by quantity, apply offers, and save your job.",
  },
  {
    icon: CreditCard,
    title: "Pay securely",
    description: "Checkout via UPI, card or wallet — with flexible options.",
  },
  {
    icon: Truck,
    title: "Track delivery",
    description: "Watch your order from printing to your doorstep, live.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-muted/40 scroll-mt-20 border-y">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <SectionHeading
          eyebrow="How it works"
          title="From idea to doorstep in five steps"
          description="No back-and-forth, no guesswork — just a clear path from design to delivery."
          align="center"
          className="mx-auto"
        />

        <ol className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <li key={step.title} className="relative flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <span className="bg-primary text-primary-foreground flex size-10 shrink-0 items-center justify-center rounded-full font-semibold">
                    {i + 1}
                  </span>
                  <span className="bg-border hidden h-px flex-1 lg:block" />
                </div>
                <Icon className="text-primary size-6" />
                <h3 className="font-semibold">{step.title}</h3>
                <p className="text-muted-foreground text-sm">
                  {step.description}
                </p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
