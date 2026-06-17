import * as React from "react";
import { ShieldCheck, Truck, Wallet } from "lucide-react";

import { Logo } from "@/components/layout/logo";

const highlights = [
  { icon: ShieldCheck, text: "Verified printer network with proof before dispatch" },
  { icon: Truck, text: "Live order tracking from printing to delivery" },
  { icon: Wallet, text: "Flexible payments — UPI, cards, EMI & half-advance" },
];

export function AuthShell({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto flex min-h-[calc(100dvh-4rem)] max-w-6xl items-center px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid w-full overflow-hidden rounded-2xl border shadow-sm lg:grid-cols-2">
        {/* Form side */}
        <div className="bg-card flex flex-col justify-center p-6 sm:p-10">
          <div className="mx-auto w-full max-w-sm">
            <div className="flex flex-col gap-2">
              <h1 className="font-serif text-3xl font-medium tracking-tight">
                {title}
              </h1>
              <p className="text-muted-foreground text-sm">{description}</p>
            </div>
            <div className="mt-8">{children}</div>
          </div>
        </div>

        {/* Brand side */}
        <div className="bg-primary text-primary-foreground relative hidden flex-col justify-between p-10 lg:flex">
          <div className="bg-primary-foreground/10 pointer-events-none absolute inset-0 [mask-image:radial-gradient(80%_60%_at_70%_10%,black,transparent)]" />
          <div className="relative">
            <Logo className="text-primary-foreground [&_span:first-child]:bg-primary-foreground [&_span:first-child]:text-primary" />
          </div>
          <div className="relative flex flex-col gap-6">
            <p className="font-serif text-3xl font-medium text-balance">
              Print anything, your way — designed, ordered and tracked in one
              place.
            </p>
            <ul className="flex flex-col gap-4">
              {highlights.map((h) => {
                const Icon = h.icon;
                return (
                  <li key={h.text} className="flex items-center gap-3">
                    <span className="bg-primary-foreground/15 flex size-9 shrink-0 items-center justify-center rounded-lg">
                      <Icon className="size-5" />
                    </span>
                    <span className="text-primary-foreground/90 text-sm">
                      {h.text}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
          <p className="text-primary-foreground/70 relative text-sm">
            Trusted by 5,000+ orders across India.
          </p>
        </div>
      </div>
    </div>
  );
}
