"use client";

import * as React from "react";

import { getProduct, computePricing } from "@/lib/data/products";

export type CartOption = { label: string; value: string };

export type CartItem = {
  key: string; // unique per product + option combination
  slug: string;
  name: string;
  image: string;
  category: string;
  categorySlug: string;
  options: CartOption[];
  unit: string;
  designFile?: string;
  surcharge: number; // flat sum of selected option surcharges
  qty: number;
};

export type CartTotals = {
  count: number; // distinct line items
  units: number; // total pieces across lines
  listSubtotal: number;
  bulkDiscount: number;
  surchargeTotal: number;
  couponDiscount: number;
  taxable: number;
  gst: number;
  platformFee: number;
  delivery: number;
  total: number;
};

const GST_RATE = 0.18;
const PLATFORM_FEE = 49;
const DELIVERY = 79;
const FREE_DELIVERY_OVER = 2000;

// Demo coupon codes (no backend).
const COUPONS: Record<string, { kind: "pct" | "flat"; value: number; cap?: number }> = {
  PRINT10: { kind: "pct", value: 10, cap: 500 },
  FLAT100: { kind: "flat", value: 100 },
  WELCOME15: { kind: "pct", value: 15, cap: 750 },
};

function couponDiscountFor(code: string | null, goods: number) {
  if (!code) return 0;
  const c = COUPONS[code.toUpperCase()];
  if (!c) return 0;
  if (c.kind === "flat") return Math.min(c.value, goods);
  return Math.min(Math.round((goods * c.value) / 100), c.cap ?? Infinity);
}

export function isValidCoupon(code: string) {
  return !!COUPONS[code.trim().toUpperCase()];
}

/** Per-line goods value (after bulk discount, incl. option surcharge). */
export function lineSubtotal(item: CartItem) {
  const product = getProduct(item.slug);
  if (!product) return 0;
  const p = computePricing(product, item.qty, [item.surcharge]);
  return p.basePrice - p.discount + p.customisation;
}

type CartContextValue = {
  items: CartItem[];
  coupon: string | null;
  hydrated: boolean;
  totals: CartTotals;
  open: boolean;
  setOpen: (open: boolean) => void;
  addItem: (item: Omit<CartItem, "key">) => void;
  updateQty: (key: string, qty: number) => void;
  removeItem: (key: string) => void;
  clear: () => void;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
};

const STORAGE_KEY = "printeve.cart";
const CartContext = React.createContext<CartContextValue | null>(null);

function keyFor(slug: string, options: CartOption[]) {
  return `${slug}__${options.map((o) => `${o.label}:${o.value}`).join("|")}`;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = React.useState<CartItem[]>([]);
  const [coupon, setCoupon] = React.useState<string | null>(null);
  const [hydrated, setHydrated] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  // Load persisted cart.
  React.useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setItems(parsed.items ?? []);
        setCoupon(parsed.coupon ?? null);
      }
    } catch {
      // ignore
    }
    setHydrated(true);
  }, []);

  // Persist on change (after hydration).
  React.useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ items, coupon }));
    } catch {
      // ignore
    }
  }, [items, coupon, hydrated]);

  const addItem = React.useCallback((item: Omit<CartItem, "key">) => {
    const key = keyFor(item.slug, item.options);
    setItems((prev) => {
      const existing = prev.find((i) => i.key === key);
      if (existing) {
        return prev.map((i) =>
          i.key === key ? { ...i, qty: i.qty + item.qty } : i
        );
      }
      return [...prev, { ...item, key }];
    });
  }, []);

  const updateQty = React.useCallback((key: string, qty: number) => {
    setItems((prev) =>
      prev.map((i) => (i.key === key ? { ...i, qty: Math.max(1, qty) } : i))
    );
  }, []);

  const removeItem = React.useCallback((key: string) => {
    setItems((prev) => prev.filter((i) => i.key !== key));
  }, []);

  const clear = React.useCallback(() => {
    setItems([]);
    setCoupon(null);
  }, []);

  const applyCoupon = React.useCallback((code: string) => {
    if (!isValidCoupon(code)) return false;
    setCoupon(code.trim().toUpperCase());
    return true;
  }, []);

  const removeCoupon = React.useCallback(() => setCoupon(null), []);

  const totals = React.useMemo<CartTotals>(() => {
    let listSubtotal = 0;
    let bulkDiscount = 0;
    let surchargeTotal = 0;
    let units = 0;

    for (const it of items) {
      const product = getProduct(it.slug);
      if (!product) continue;
      const p = computePricing(product, it.qty, [it.surcharge]);
      listSubtotal += p.basePrice;
      bulkDiscount += p.discount;
      surchargeTotal += p.customisation;
      units += it.qty;
    }

    const goodsBeforeCoupon = listSubtotal - bulkDiscount + surchargeTotal;
    const couponDiscount = couponDiscountFor(coupon, goodsBeforeCoupon);
    const taxable = Math.max(0, goodsBeforeCoupon - couponDiscount);
    const gst = Math.round(taxable * GST_RATE);
    const platformFee = items.length ? PLATFORM_FEE : 0;
    const delivery =
      taxable === 0 ? 0 : taxable >= FREE_DELIVERY_OVER ? 0 : DELIVERY;
    const total = taxable + gst + platformFee + delivery;

    return {
      count: items.length,
      units,
      listSubtotal,
      bulkDiscount,
      surchargeTotal,
      couponDiscount,
      taxable,
      gst,
      platformFee,
      delivery,
      total,
    };
  }, [items, coupon]);

  const value = React.useMemo(
    () => ({
      items,
      coupon,
      hydrated,
      totals,
      open,
      setOpen,
      addItem,
      updateQty,
      removeItem,
      clear,
      applyCoupon,
      removeCoupon,
    }),
    [items, coupon, hydrated, totals, open, addItem, updateQty, removeItem, clear, applyCoupon, removeCoupon]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = React.useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
