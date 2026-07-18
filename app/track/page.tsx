"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Search, Loader2, ArrowRight, Package } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getOrder } from "@/lib/data/orders";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function TrackOrderPage() {
  const router = useRouter();
  const [orderId, setOrderId] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [loading, setLoading] = React.useState(false);

  function validate() {
    const next: Record<string, string> = {};
    if (!orderId.trim()) {
      next.orderId = "Please enter an Order ID.";
    } else if (!/^ORD-\d+$/i.test(orderId.trim())) {
      next.orderId = "Order ID must match the format 'ORD-XXXX' (e.g. ORD-9821).";
    }

    if (!email.trim()) {
      next.email = "Please enter your email address.";
    } else if (!EMAIL_RE.test(email.trim())) {
      next.email = "Enter a valid email address.";
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    // Simulate lookup delay
    setTimeout(() => {
      setLoading(false);
      const cleanId = orderId.trim().toUpperCase();
      const match = getOrder(cleanId);

      if (match) {
        toast.success(`Order ${cleanId} found!`);
        router.push(`/track/${cleanId}`);
      } else {
        toast.error(`Order not found`, {
          description: "We couldn't find an order matching that ID and email.",
        });
        setErrors({
          form: "No matching order found. Please double-check your Order ID and the email used to place it.",
        });
      }
    }, 600);
  }

  return (
    <div className="bg-background min-h-dvh">
      {/* Breadcrumbs */}
      <div className="border-b">
        <nav
          aria-label="Breadcrumb"
          className="text-muted-foreground mx-auto flex max-w-7xl items-center gap-1.5 px-4 py-4 text-sm sm:px-6 lg:px-8"
        >
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>
          <ArrowRight className="size-3.5 opacity-60" />
          <span className="text-foreground">Track Order</span>
        </nav>
      </div>

      <div className="mx-auto max-w-xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mb-8 text-center">
          <h1 className="font-serif text-3xl font-bold tracking-tight sm:text-4xl">
            Track Your Order
          </h1>
          <p className="text-muted-foreground mt-2 text-lg">
            Check the live printing progress and shipment status of your custom prints.
          </p>
        </div>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Enter Details</CardTitle>
            <CardDescription>
              Look up your order using the receipt details sent to your registered email.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} noValidate className="flex flex-col gap-4">
              {errors.form && (
                <div className="bg-destructive/10 text-destructive rounded-md p-3 text-sm">
                  {errors.form}
                </div>
              )}

              <div className="flex flex-col gap-2">
                <Label htmlFor="orderId">Order ID</Label>
                <div className="relative">
                  <Package className="text-muted-foreground absolute top-2.5 left-3 size-4.5" />
                  <Input
                    id="orderId"
                    type="text"
                    placeholder="ORD-XXXX"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    className="pl-10 uppercase"
                    aria-invalid={!!errors.orderId}
                  />
                </div>
                {errors.orderId && (
                  <p className="text-destructive text-xs">{errors.orderId}</p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-invalid={!!errors.email}
                />
                {errors.email && (
                  <p className="text-destructive text-xs">{errors.email}</p>
                )}
              </div>

              <Button type="submit" size="lg" className="mt-2 w-full" disabled={loading}>
                {loading ? (
                  <Loader2 className="animate-spin mr-2 size-4" />
                ) : (
                  <Search className="mr-2 size-4" />
                )}
                Track Order Progress
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="text-muted-foreground mt-4 text-center text-sm">
          Can&apos;t find your Order ID? Check your confirmation email or{" "}
          <Link href="/contact" className="text-brand font-medium hover:underline">
            contact support
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
