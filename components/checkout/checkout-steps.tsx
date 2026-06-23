"use client";

import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

const STEPS = ["Address", "Review", "Payment"];

export function CheckoutSteps({
  current,
  onStepClick,
}: {
  current: number; // 1-based
  onStepClick?: (step: number) => void;
}) {
  return (
    <ol className="flex items-center gap-2">
      {STEPS.map((label, i) => {
        const step = i + 1;
        const done = step < current;
        const active = step === current;
        return (
          <li key={label} className="flex flex-1 items-center gap-2 last:flex-none">
            <button
              type="button"
              disabled={!done || !onStepClick}
              onClick={() => done && onStepClick?.(step)}
              className={cn(
                "flex items-center gap-2",
                done && onStepClick && "cursor-pointer"
              )}
            >
              <span
                className={cn(
                  "flex size-7 shrink-0 items-center justify-center rounded-full border text-sm font-semibold transition-colors",
                  active && "bg-primary text-primary-foreground border-primary",
                  done && "bg-primary/15 text-primary border-primary/30",
                  !active && !done && "text-muted-foreground border-border"
                )}
              >
                {done ? <Check className="size-4" /> : step}
              </span>
              <span
                className={cn(
                  "text-sm font-medium",
                  active ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {label}
              </span>
            </button>
            {step < STEPS.length && (
              <span
                className={cn(
                  "hidden h-px flex-1 sm:block",
                  done ? "bg-primary/40" : "bg-border"
                )}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}
