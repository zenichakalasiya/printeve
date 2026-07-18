"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Truck, Mail, ArrowRight, Package } from "lucide-react";

import { lineSubtotal, type CartItem } from "@/components/providers/cart-provider";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type PlacedOrder = {
  id: string;
  date: string;
  items: CartItem[];
  address: {
    name: string;
    phone: string;
    line1: string;
    line2?: string;
    city: string;
    state: string;
    zip: string;
  };
  delivery: string;
  plan: string;
  amountPaidNow: number;
  payable: number;
};

const PLAN_LABEL: Record<string, string> = {
  full: "Paid in full",
  half: "Half advance (50%)",
  emi: "EMI · 3 months",
};

export default function CheckoutSuccessPage() {
  const [order, setOrder] = React.useState<PlacedOrder | null>(null);
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    try {
      const raw = localStorage.getItem("printeve.lastOrder");
      if (raw) setOrder(JSON.parse(raw));
    } catch {
      // ignore
    }
    setLoaded(true);
  }, []);

  if (!loaded) return <div className="min-h-[60dvh]" />;

  if (!order) {
    return (
      <div className="mx-auto flex min-h-[70dvh] max-w-md flex-col items-center justify-center gap-5 px-4 text-center">
        <span className="bg-muted text-muted-foreground flex size-14 items-center justify-center rounded-full">
          <Package className="size-7" />
        </span>
        <div>
          <h1 className="font-serif text-2xl font-bold tracking-tight">No recent order</h1>
          <p className="text-muted-foreground">
            Looks like there's no order to show here yet.
          </p>
        </div>
        <Button asChild size="lg">
          <Link href="/products">Browse products</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-dvh">
      <title>Order confirmed — PrintEve</title>

      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Confirmation header */}
        <div className="flex flex-col items-center gap-4 text-center">
          <span className="bg-chart-2/15 text-chart-2 flex size-16 items-center justify-center rounded-full">
            <CheckCircle2 className="size-9" />
          </span>
          <div>
            <h1 className="font-serif text-3xl font-bold tracking-tight sm:text-4xl">
              Order confirmed!
            </h1>
            <p className="text-muted-foreground mt-2">
              Thank you for your order. Your order ID is{" "}
              <span className="text-foreground font-semibold font-mono">{order.id}</span>.
            </p>
          </div>
          <p className="text-muted-foreground flex items-center gap-2 text-sm">
            <Mail className="size-4" /> A confirmation email is on its way.
          </p>
        </div>

        {/* What happens next */}
        <Card className="mt-8 gap-3 p-6">
          <h2 className="font-medium">What happens next</h2>
          <ol className="text-muted-foreground flex flex-col gap-2 text-sm">
            <li>1. Our team runs a pre-press check on your artwork.</li>
            <li>2. You approve the proof (we'll flag anything that needs fixing).</li>
            <li>3. A verified printer produces your order.</li>
            <li>4. It's quality-checked, dispatched and delivered — track it live.</li>
          </ol>
        </Card>

        {/* Order items */}
        <Card className="mt-6 gap-4 p-6">
          <h2 className="font-medium">Order details</h2>
          <ul className="flex flex-col divide-y">
            {order.items.map((item) => (
              <li key={item.key} className="flex gap-4 py-3 first:pt-0 last:pb-0">
                <div className="bg-muted relative size-14 shrink-0 overflow-hidden rounded-md border">
                  <Image src={item.image} alt={item.name} fill sizes="56px" className="object-cover" />
                </div>
                <div className="flex flex-1 flex-col">
                  <span className="text-sm font-medium">{item.name}</span>
                  <span className="text-muted-foreground text-xs">
                    {item.qty.toLocaleString("en-IN")} pcs
                    {item.options.length > 0 && ` · ${item.options.map((o) => o.value).join(", ")}`}
                  </span>
                </div>
                <span className="text-sm font-semibold tabular-nums">
                  {formatPrice(lineSubtotal(item))}
                </span>
              </li>
            ))}
          </ul>
          <Separator />
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground text-sm">
              {PLAN_LABEL[order.plan] ?? "Payment"}
            </span>
            <div className="text-right">
              <p className="text-lg font-semibold tabular-nums">
                {formatPrice(order.amountPaidNow)} paid
              </p>
              {order.plan !== "full" && (
                <p className="text-muted-foreground text-xs">
                  of {formatPrice(order.payable)} total
                </p>
              )}
            </div>
          </div>
        </Card>

        {/* Delivery address */}
        <Card className="mt-6 gap-2 p-6">
          <h2 className="flex items-center gap-2 font-medium">
            <Truck className="text-brand size-4" /> Delivering to
          </h2>
          <p className="text-muted-foreground text-sm">
            <span className="text-foreground font-medium">{order.address.name}</span> · {order.address.phone}
            <br />
            {order.address.line1}
            {order.address.line2 ? `, ${order.address.line2}` : ""}, {order.address.city}, {order.address.state} {order.address.zip}
          </p>
        </Card>

        {/* CTAs */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button asChild size="lg">
            <Link href="/track">
              Track your order <ArrowRight />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/products">Continue shopping</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
