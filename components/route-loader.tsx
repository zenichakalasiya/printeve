"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { Printer } from "lucide-react";

/**
 * Full-screen branded loader shown during client-side page transitions.
 *
 * Strategy: intercept clicks on internal links to show the overlay the moment
 * navigation starts, then hide it once the new route commits (pathname change),
 * keeping it on screen for a short minimum so the animation always reads.
 */
const MIN_VISIBLE_MS = 550;
const MAX_VISIBLE_MS = 6000;

export function RouteLoader() {
  const pathname = usePathname();
  const [loading, setLoading] = React.useState(false);
  const shownAt = React.useRef(0);

  // Hide once the new route is committed (respecting a minimum visible time).
  React.useEffect(() => {
    if (!loading) return;
    const elapsed = Date.now() - shownAt.current;
    const t = setTimeout(
      () => setLoading(false),
      Math.max(0, MIN_VISIBLE_MS - elapsed)
    );
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Safety net: never let the loader get stuck.
  React.useEffect(() => {
    if (!loading) return;
    const t = setTimeout(() => setLoading(false), MAX_VISIBLE_MS);
    return () => clearTimeout(t);
  }, [loading]);

  // Show the loader when an internal navigation begins.
  React.useEffect(() => {
    function onClick(e: MouseEvent) {
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const anchor = (e.target as HTMLElement)?.closest("a");
      if (!anchor) return;
      if (anchor.target === "_blank" || anchor.hasAttribute("download")) return;

      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("mailto:") || href.startsWith("tel:")) return;

      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      // Ignore in-page anchors and clicks to the current page.
      if (url.pathname === window.location.pathname) return;

      shownAt.current = Date.now();
      setLoading(true);
    }

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  if (!loading) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading page"
      className="bg-background/85 fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6 backdrop-blur-sm"
    >
      {/* Logo mark with spinning ring */}
      <div className="relative flex size-16 items-center justify-center">
        <span className="border-primary/15 border-t-primary absolute inset-0 animate-spin rounded-2xl border-2" />
        <span className="bg-primary text-primary-foreground flex size-12 items-center justify-center rounded-xl shadow-[var(--shadow-brand)]">
          <Printer className="size-6 animate-pulse" />
        </span>
      </div>

      {/* Wordmark + indeterminate bar */}
      <div className="flex flex-col items-center gap-3">
        <span className="font-semibold tracking-tight">PrintEve</span>
        <div className="bg-muted h-1 w-40 overflow-hidden rounded-full">
          <div className="bg-primary pe-loading-bar h-full w-1/3 rounded-full" />
        </div>
      </div>

      <span className="sr-only">Loading…</span>
    </div>
  );
}
