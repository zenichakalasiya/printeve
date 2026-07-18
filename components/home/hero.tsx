import Link from "next/link";
import { ArrowRight, Upload, ShieldCheck, Star } from "lucide-react";

import { Button } from "@/components/ui/button";

const trust = [
  { icon: ShieldCheck, label: "Verified printer network" },
  { icon: Upload, label: "Upload PNG · PDF · AI" },
  { icon: Star, label: "Live order tracking" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b">
      <div className="bg-primary/5 pointer-events-none absolute inset-0 [mask-image:radial-gradient(60%_60%_at_50%_0%,black,transparent)]" />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-12 lg:py-24 lg:px-8">
        <div className="flex flex-col items-start gap-6">
          <span className="text-brand flex items-center gap-2 text-xs font-semibold tracking-[0.18em] uppercase">
            <span className="bg-brand inline-block h-px w-6" />
            On-demand custom printing
          </span>
          <h1 className="font-serif text-5xl font-medium tracking-tight text-balance sm:text-6xl lg:text-7xl lg:leading-[0.98]">
            Print anything, <em className="text-brand not-italic">your way</em>{" "}
            — delivered fast.
          </h1>
          <p className="text-muted-foreground max-w-lg text-lg text-pretty">
            From business cards and stickers to posters and packaging labels.
            Upload your design, customise it, and let our verified printers
            handle the rest — with transparent pricing and live tracking.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/products">
                Start your design <ArrowRight />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/#categories">Browse categories</Link>
            </Button>
          </div>
          <ul className="text-muted-foreground mt-2 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {trust.map((t) => {
              const Icon = t.icon;
              return (
                <li key={t.label} className="flex items-center gap-2">
                  <Icon className="text-primary size-4" />
                  {t.label}
                </li>
              );
            })}
          </ul>
        </div>

        {/* Visual */}
        <div className="relative">
          <div className="bg-card grid grid-cols-2 gap-4 rounded-2xl border p-4 shadow-sm">
            {[
              { title: "Business Cards", tone: "bg-chart-1/15" },
              { title: "Die-Cut Stickers", tone: "bg-chart-2/15" },
              { title: "Posters", tone: "bg-chart-4/15" },
              { title: "Custom Labels", tone: "bg-chart-5/15" },
            ].map((item, i) => (
              <div
                key={item.title}
                className={`flex aspect-[4/3] flex-col justify-end rounded-xl border p-4 ${item.tone} ${
                  i % 3 === 0 ? "translate-y-2" : ""
                }`}
              >
                <span className="text-sm font-medium">{item.title}</span>
                <span className="text-muted-foreground text-xs">
                  Fully customisable
                </span>
              </div>
            ))}
          </div>
          <div className="bg-background absolute -bottom-4 -left-4 hidden rounded-xl border px-4 py-3 shadow-md sm:block">
            <p className="text-2xl font-bold">5,000+</p>
            <p className="text-muted-foreground text-xs">orders delivered</p>
          </div>
        </div>
      </div>
    </section>
  );
}
