"use client";

import * as React from "react";
import { Tag, X } from "lucide-react";
import { toast } from "sonner";

import { useCart } from "@/components/providers/cart-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function CouponInput() {
  const { coupon, applyCoupon, removeCoupon } = useCart();
  const [code, setCode] = React.useState("");

  function apply(e: React.FormEvent) {
    e.preventDefault();
    if (!code.trim()) return;
    if (applyCoupon(code)) {
      toast.success(`Coupon ${code.trim().toUpperCase()} applied!`);
      setCode("");
    } else {
      toast.error("That coupon code isn't valid.");
    }
  }

  if (coupon) {
    return (
      <div className="border-brand/30 bg-brand/5 flex items-center justify-between rounded-md border px-3 py-2 text-sm">
        <span className="flex items-center gap-2">
          <Tag className="text-brand size-4" />
          <span className="font-medium">{coupon}</span>
          <span className="text-muted-foreground">applied</span>
        </span>
        <button
          type="button"
          onClick={removeCoupon}
          aria-label="Remove coupon"
          className="text-muted-foreground hover:text-destructive"
        >
          <X className="size-4" />
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={apply} className="flex gap-2">
      <Input
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Coupon code (try PRINT10)"
        aria-label="Coupon code"
        className="uppercase"
      />
      <Button type="submit" variant="outline">
        Apply
      </Button>
    </form>
  );
}
