"use client";

import * as React from "react";

import { useCart } from "@/components/providers/cart-provider";
import { cn, formatPrice } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

function Row({
  label,
  value,
  accent,
  muted,
}: {
  label: string;
  value: React.ReactNode;
  accent?: boolean;
  muted?: boolean;
}) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className={cn(muted && "text-muted-foreground")}>{label}</span>
      <span
        className={cn(
          "tabular-nums",
          accent && "text-brand font-medium",
          muted && "text-muted-foreground"
        )}
      >
        {value}
      </span>
    </div>
  );
}

export function OrderSummary({ children }: { children?: React.ReactNode }) {
  const { totals, coupon } = useCart();

  return (
    <div className="flex flex-col gap-2.5">
      <Row label="Subtotal" value={formatPrice(totals.listSubtotal)} />
      {totals.bulkDiscount > 0 && (
        <Row
          label="Bulk discount"
          value={`− ${formatPrice(totals.bulkDiscount)}`}
          accent
        />
      )}
      {totals.surchargeTotal > 0 && (
        <Row
          label="Customisation"
          value={`+ ${formatPrice(totals.surchargeTotal)}`}
        />
      )}
      {totals.couponDiscount > 0 && (
        <Row
          label={`Coupon${coupon ? ` (${coupon})` : ""}`}
          value={`− ${formatPrice(totals.couponDiscount)}`}
          accent
        />
      )}
      <Row label="GST (18%)" value={formatPrice(totals.gst)} muted />
      <Row label="Platform fee" value={formatPrice(totals.platformFee)} muted />
      <Row
        label="Delivery"
        value={totals.delivery === 0 ? "FREE" : formatPrice(totals.delivery)}
        muted
      />
      <Separator className="my-1" />
      <div className="flex items-baseline justify-between">
        <span className="font-medium">Total</span>
        <span className="text-xl font-semibold tabular-nums">
          {formatPrice(totals.total)}
        </span>
      </div>
      <p className="text-muted-foreground text-xs">Inclusive of all taxes.</p>
      {children}
    </div>
  );
}
