"use client";

import { Minus, Plus } from "lucide-react";

import type { PriceTier } from "@/lib/data/products";
import { cn, formatPrice } from "@/lib/utils";
import { Label } from "@/components/ui/label";

export function QuantitySelector({
  tiers,
  qty,
  step,
  onChange,
}: {
  tiers: PriceTier[];
  qty: number;
  step: number;
  onChange: (qty: number) => void;
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <Label>Quantity</Label>
        <span className="text-muted-foreground text-xs">
          Min {tiers[0].qty} pcs
        </span>
      </div>

      {/* Tiered preset cards */}
      <div className="grid grid-cols-3 gap-2">
        {tiers.map((tier) => {
          const active = qty === tier.qty;
          return (
            <button
              key={tier.qty}
              type="button"
              onClick={() => onChange(tier.qty)}
              aria-pressed={active}
              className={cn(
                "relative flex flex-col gap-0.5 rounded-lg border p-3 text-left transition-colors",
                active
                  ? "border-foreground bg-foreground/[0.03] ring-foreground ring-1"
                  : "border-border hover:border-foreground/40"
              )}
            >
              {tier.savePct > 0 && (
                <span className="bg-brand text-brand-foreground absolute -top-2 right-2 rounded-full px-1.5 py-0.5 text-[10px] font-semibold">
                  Save {tier.savePct}%
                </span>
              )}
              <span className="text-sm font-semibold">
                {tier.qty.toLocaleString("en-IN")}
              </span>
              <span className="text-muted-foreground text-xs">pcs</span>
              <span className="mt-1 text-xs">{formatPrice(tier.price)}</span>
            </button>
          );
        })}
      </div>

      {/* Custom stepper */}
      <div className="flex items-center gap-3">
        <div className="flex items-center rounded-md border">
          <button
            type="button"
            aria-label="Decrease quantity"
            onClick={() => onChange(Math.max(tiers[0].qty, qty - step))}
            className="hover:bg-muted flex size-9 items-center justify-center rounded-l-md"
          >
            <Minus className="size-4" />
          </button>
          <input
            type="number"
            value={qty}
            min={tiers[0].qty}
            step={step}
            onChange={(e) =>
              onChange(Math.max(tiers[0].qty, Number(e.target.value) || tiers[0].qty))
            }
            aria-label="Quantity"
            className="h-9 w-24 border-x bg-transparent text-center text-sm outline-none"
          />
          <button
            type="button"
            aria-label="Increase quantity"
            onClick={() => onChange(qty + step)}
            className="hover:bg-muted flex size-9 items-center justify-center rounded-r-md"
          >
            <Plus className="size-4" />
          </button>
        </div>
        <span className="text-muted-foreground text-xs">
          Custom quantity in steps of {step}
        </span>
      </div>
    </div>
  );
}
