import {
  UploadCloud,
  ShieldCheck,
  BadgeIndianRupee,
  Truck,
  Wallet,
  Headphones,
  ArrowUpRight,
} from "lucide-react";

import { SectionHeading } from "@/components/home/section-heading";
import { SpotlightCard } from "@/components/home/spotlight-card";

const fileTypes = ["PNG", "PDF", "AI"];
const units = ["MM", "CM", "INCH", "METER", "PX"];

const usps = [
  {
    icon: ShieldCheck,
    title: "Verified printer network",
    description:
      "Every order is fulfilled by a vetted print partner — with a proof photo before dispatch.",
    span: "sm:col-span-2 lg:col-span-2",
  },
  {
    icon: BadgeIndianRupee,
    title: "Transparent pricing",
    description: "See pricing by quantity up front. No hidden charges.",
    span: "lg:col-span-1",
  },
  {
    icon: Truck,
    title: "Live tracking",
    description: "Follow every order from printing to your doorstep.",
    span: "lg:col-span-1",
  },
  {
    icon: Wallet,
    title: "Flexible payments",
    description:
      "UPI, cards, netbanking & wallets — plus half-advance and EMI for bulk orders.",
    span: "sm:col-span-2 lg:col-span-2",
  },
  {
    icon: Headphones,
    title: "Real human support",
    description:
      "Questions about specs or files? Our team helps you get print-ready, fast.",
    span: "sm:col-span-2 lg:col-span-2",
  },
];

export function UspCards() {
  return (
    <section className="scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <SectionHeading
          eyebrow="Why PrintEve"
          title="A better way to order custom prints"
          description="Built to fix everything that's painful about ordering print today."
          align="center"
          className="mx-auto"
        />

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:auto-rows-fr lg:grid-cols-4">
          {/* Featured card — upload */}
          <SpotlightCard className="from-primary/[0.07] bg-gradient-to-br to-transparent sm:col-span-2 lg:col-span-2 lg:row-span-2">
            <div className="flex items-start justify-between">
              <span className="bg-primary text-primary-foreground flex size-12 items-center justify-center rounded-xl shadow-sm">
                <UploadCloud className="size-6" />
              </span>
              <ArrowUpRight className="text-muted-foreground/60 size-5" />
            </div>

            <h3 className="mt-5 text-xl font-semibold tracking-tight">
              Upload your own design
            </h3>
            <p className="text-muted-foreground mt-2 max-w-sm text-sm">
              Bring your artwork in any pro format — up to 3GB — and set exact
              dimensions in your preferred unit. We keep it print-ready.
            </p>

            {/* Mini visual: dropzone + file types + units */}
            <div className="mt-auto pt-6">
              <div className="border-primary/30 bg-background/60 flex items-center gap-3 rounded-xl border border-dashed p-4">
                <UploadCloud className="text-primary size-5 shrink-0" />
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">
                    Drop your file here
                  </p>
                  <p className="text-muted-foreground text-xs">
                    or browse — max 3GB
                  </p>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-1.5">
                {fileTypes.map((t) => (
                  <span
                    key={t}
                    className="bg-primary/10 text-primary rounded-md px-2 py-0.5 text-xs font-medium"
                  >
                    {t}
                  </span>
                ))}
                <span className="bg-border mx-1 h-4 w-px" />
                {units.map((u) => (
                  <span
                    key={u}
                    className="bg-muted text-muted-foreground rounded-md px-2 py-0.5 text-xs"
                  >
                    {u}
                  </span>
                ))}
              </div>
            </div>
          </SpotlightCard>

          {/* Supporting cards */}
          {usps.map((usp) => {
            const Icon = usp.icon;
            return (
              <SpotlightCard key={usp.title} className={usp.span}>
                <span className="bg-primary/10 text-primary flex size-11 items-center justify-center rounded-xl">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-4 font-semibold tracking-tight">
                  {usp.title}
                </h3>
                <p className="text-muted-foreground mt-1.5 text-sm">
                  {usp.description}
                </p>
              </SpotlightCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
