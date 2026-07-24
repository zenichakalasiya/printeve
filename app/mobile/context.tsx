"use client";

import React, { createContext, useContext, useState } from "react";
import { PRODUCTS, getProduct } from "./products-data";
import type { CartItem, Product } from "./products-data";

// Re-export the shared catalog so existing `import { PRODUCTS } from "../context"`
// call sites keep working. The data itself lives in the non-client module.
export { PRODUCTS, getProduct };
export type { CartItem, Product };

interface MobileContextType {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, "id">) => void;
  removeFromCart: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clearCart: () => void;
  selectedAddress: string;
  setSelectedAddress: (address: string) => void;
  isCouponApplied: boolean;
  setIsCouponApplied: (applied: boolean) => void;
  orderId: string;
  setOrderId: (id: string) => void;
  orderStatusIndex: number;
  setOrderStatusIndex: (index: number) => void;
  pushNotification: string | null;
  triggerPush: (message: string) => void;
}

const MobileContext = createContext<MobileContextType | undefined>(undefined);

export function MobileProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedAddress, setSelectedAddress] = useState("Sector 62, Noida");
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const [orderId, setOrderId] = useState("PE-890241");
  const [orderStatusIndex, setOrderStatusIndex] = useState(0);
  const [pushNotification, setPushNotification] = useState<string | null>(null);

  const triggerPush = (message: string) => {
    setPushNotification(message);
    setTimeout(() => {
      setPushNotification(null);
    }, 4500);
  };

  const addToCart = (item: Omit<CartItem, "id">) => {
    const newItem = { ...item, id: `${item.product.id}-${Date.now()}` };
    setCartItems((prev) => [...prev, newItem]);
    triggerPush(`🛒 Added ${item.qty}x ${item.product.name} to cart.`);
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

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <MobileContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
        selectedAddress,
        setSelectedAddress,
        isCouponApplied,
        setIsCouponApplied,
        orderId,
        setOrderId,
        orderStatusIndex,
        setOrderStatusIndex,
        pushNotification,
        triggerPush
      }}
    >
      {children}
    </MobileContext.Provider>
  );
}

export function useMobile() {
  const context = useContext(MobileContext);
  if (!context) {
    throw new Error("useMobile must be used within a MobileProvider");
  }
  return context;
}
