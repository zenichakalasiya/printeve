"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { PRODUCTS, getProduct, NEW_ARRIVALS, RECOMMENDED, CATEGORIES } from "./products-data";
import type { CartItem, Product } from "./products-data";

// Re-export the shared catalog so call sites can import from the context.
export { PRODUCTS, getProduct, NEW_ARRIVALS, RECOMMENDED, CATEGORIES };
export type { CartItem, Product };

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  placedAt: string;
  address: string;
  statusIndex: number;
}

interface AppContextType {
  // cart
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, "id">) => void;
  removeFromCart: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clearCart: () => void;
  // orders
  orders: Order[];
  placeOrder: (total: number) => string;
  advanceOrder: (id: string) => void;
  // delivery / misc
  selectedAddress: string;
  setSelectedAddress: (address: string) => void;
  isCouponApplied: boolean;
  setIsCouponApplied: (applied: boolean) => void;
  // onboarding
  onboarded: boolean;
  completeOnboarding: (phone: string) => void;
  userPhone: string;
  // push
  pushNotification: string | null;
  triggerPush: (message: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const ORDER_STEPS = [
  "Order Confirmed",
  "Assigned to Print Partner",
  "In Production",
  "Quality Checked",
  "Dispatched",
  "Delivered",
];

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedAddress, setSelectedAddress] = useState("Ahmedabad, Gujarat");
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const [pushNotification, setPushNotification] = useState<string | null>(null);

  // Onboarding gate — session-scoped so a fresh load replays the flow (nice for
  // demos) while client-side tab navigation keeps you signed in. Both start
  // false to match SSR, then hydrate from sessionStorage after mount (reading
  // storage in the initializer would cause a hydration mismatch).
  const [onboarded, setOnboarded] = useState(false);
  const [userPhone, setUserPhone] = useState("");

  useEffect(() => {
    if (sessionStorage.getItem("pe_app_onboarded") === "1") {
      setOnboarded(true);
      setUserPhone(sessionStorage.getItem("pe_app_phone") || "");
    }
  }, []);

  const triggerPush = useCallback((message: string) => {
    setPushNotification(message);
    setTimeout(() => setPushNotification(null), 4500);
  }, []);

  const addToCart = (item: Omit<CartItem, "id">) => {
    const newItem = { ...item, id: `${item.product.id}-${Date.now()}` };
    setCartItems((prev) => [...prev, newItem]);
    triggerPush(`🛒 Added ${item.qty} × ${item.product.name} to cart.`);
  };

  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    triggerPush("🗑️ Removed item from cart.");
  };

  const updateQty = (id: string, qty: number) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, qty: Math.max(100, qty) } : item))
    );
  };

  const clearCart = () => setCartItems([]);

  const placeOrder = (total: number) => {
    const id = `PE-${Math.floor(100000 + (Date.now() % 900000))}`;
    const order: Order = {
      id,
      items: cartItems,
      total,
      placedAt: "Just now",
      address: selectedAddress,
      statusIndex: 0,
    };
    setOrders((prev) => [order, ...prev]);
    setCartItems([]);
    setIsCouponApplied(false);
    return id;
  };

  const advanceOrder = (id: string) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === id ? { ...o, statusIndex: Math.min(ORDER_STEPS.length - 1, o.statusIndex + 1) } : o
      )
    );
  };

  const completeOnboarding = (phone: string) => {
    setOnboarded(true);
    setUserPhone(phone);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("pe_app_onboarded", "1");
      sessionStorage.setItem("pe_app_phone", phone);
    }
  };

  return (
    <AppContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
        orders,
        placeOrder,
        advanceOrder,
        selectedAddress,
        setSelectedAddress,
        isCouponApplied,
        setIsCouponApplied,
        onboarded,
        completeOnboarding,
        userPhone,
        pushNotification,
        triggerPush,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within an AppProvider");
  return ctx;
}
