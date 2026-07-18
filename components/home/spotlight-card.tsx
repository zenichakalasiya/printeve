"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Bento card with a cursor-following spotlight glow and a gradient border that
 * lights up on hover. Pointer position is written to CSS custom properties so
 * the radial-gradient overlay tracks the mouse without re-rendering React.
 */
export function SpotlightCard({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - rect.top}px`);
  }

  return (
    <div
      onMouseMove={onMouseMove}
      className={cn(
        "group/spot bg-card relative overflow-hidden rounded-2xl border p-6 transition-colors duration-300 hover:border-primary/40",
        className
      )}
      {...props}
    >
      {/* Spotlight glow that follows the cursor */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/spot:opacity-100"
        style={{
          background:
            "radial-gradient(380px circle at var(--x, 50%) var(--y, 0px), color-mix(in oklch, var(--primary) 14%, transparent), transparent 72%)",
        }}
      />
      <div className="relative flex h-full flex-col">{children}</div>
    </div>
  );
}
