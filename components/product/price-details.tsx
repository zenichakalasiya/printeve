"use client";

import type { PriceBreakdown } from "@/lib/data/products";
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

export function PriceDetails({ pricing }: { pricing: PriceBreakdown }) {
  return (
    <div className="bg-muted/40 flex flex-col gap-2.5 rounded-lg border p-4">
      <Row
        label={`Base price (${pricing.qty.toLocaleString("en-IN")} pcs)`}
        value={formatPrice(pricing.basePrice)}
      />
      {pricing.discount > 0 && (
        <Row
          label={`Bulk discount${pricing.savePct ? ` (${pricing.savePct}%)` : ""}`}
          value={`− ${formatPrice(pricing.discount)}`}
          accent
        />
      )}
      {pricing.customisation > 0 && (
        <Row
          label="Customisation"
          value={`+ ${formatPrice(pricing.customisation)}`}
        />
      )}
      <Row label="Platform fee" value={formatPrice(pricing.platformFee)} muted />
      <Row
        label="Delivery"
        value={pricing.delivery === 0 ? "FREE" : formatPrice(pricing.delivery)}
        muted
      />
      <Separator className="my-1" />
      <div className="flex items-baseline justify-between">
        <span className="font-medium">Total</span>
        <span className="text-xl font-semibold tabular-nums">
          {formatPrice(pricing.total)}
        </span>
      </div>
      <p className="text-muted-foreground text-xs">
        Inclusive of taxes. Final price confirmed at checkout.
      </p>
    </div>
  );
}
