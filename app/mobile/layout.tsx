"use client";

import React, { useState } from "react";
import { MobileProvider, useMobile } from "./context";
import {
  Sparkles,
  ArrowRight,
  Megaphone,
  Search,
  ShoppingCart,
  Truck,
  User,
  X
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function DeviceContainer({ children }: { children: React.ReactNode }) {
  const {
    orderStatusIndex,
    setOrderStatusIndex,
    pushNotification,
    triggerPush,
    cartItems
  } = useMobile();

  const pathname = usePathname();

  // Helper to check if a route is active
  const isActiveRoute = (route: string) => {
    if (route === "/mobile") return pathname === "/mobile";
    return pathname === route || pathname.startsWith(route + "/");
  };

  // Persistent "View Cart" bar (Swiggy-style). Shows on Home / Browse / Track
  // when the cart has items; hidden on Cart & Product pages, which have their
  // own sticky bottom action bars.
  const cartCount = cartItems.length;
  const cartSubtotal = cartItems.reduce(
    (acc, item) => acc + item.unitPrice * item.qty,
    0
  );
  const showCartBar =
    cartCount > 0 &&
    !pathname.startsWith("/mobile/cart") &&
    !pathname.startsWith("/mobile/product");

  // Timeline simulation steps
  const orderSteps = [
    { title: "Order Confirmed" },
    { title: "Assigned to Print Partner" },
    { title: "In Production" },
    { title: "Quality Checked" },
    { title: "Dispatched" },
    { title: "Delivered" }
  ];

  const advanceOrderStatus = () => {
    if (orderStatusIndex < orderSteps.length - 1) {
      const nextIndex = orderStatusIndex + 1;
      setOrderStatusIndex(nextIndex);
      
      const statusAlerts = [
        "Order Confirmed",
        "Print Partner has accepted the job",
        "Your order is now on the printing press",
        "📸 Print partner uploaded proof! Tap 'Track' tab to view.",
        "🚚 Order dispatched from printer vendor",
        "🏡 Delivered! Enjoy your premium prints."
      ];
      
      triggerPush(`Status Update: ${statusAlerts[nextIndex]}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#F3F4F6] text-slate-800 font-sans flex flex-col items-center justify-center p-0 lg:p-8 mobile-app-root">
      
      {/* HEADER LOGO */}
      <div className="hidden lg:flex flex-col items-center mb-6">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2 font-serif">
          <span className="bg-[#16A34A] text-white py-0.5 px-2 rounded-lg text-lg">PE</span> PrintEve PWA Storefront
        </h1>
        <p className="text-xs text-slate-500 mt-1 max-w-sm text-center">
          Interactive mobile application view. Responsive layout hides device frames automatically on mobile screens.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-stretch justify-center max-w-6xl w-full">
        
        {/* INTERACTIVE PHONE BEZEL */}
        <div className="relative mx-auto flex-none shadow-2xl rounded-none lg:rounded-[48px] overflow-hidden border-0 lg:border-[12px] border-slate-950 bg-slate-950 w-full lg:w-[390px] h-screen lg:h-[844px] transition-all duration-300">
          
          {/* iOS Dynamic Island (hidden on mobile layout) */}
          <div className="hidden lg:flex absolute top-2 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-full z-50 items-center justify-between px-3 text-[10px] text-white">
            <div className="w-2.5 h-2.5 rounded-full bg-slate-900"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-slate-900 mr-2"></div>
          </div>

          {/* iOS Top Status Bar (hidden on mobile layout) */}
          <div className="hidden lg:flex absolute top-0 inset-x-0 h-10 px-6 items-center justify-between text-xs z-40 font-semibold text-slate-800 bg-[#FCFAF7] border-b border-slate-100">
            <span>9:41</span>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] text-slate-600">5G</span>
              <div className="w-5 h-2.5 border border-slate-400 rounded-sm p-0.5 flex items-center"><div className="h-full w-3.5 bg-slate-500 rounded-2xs"></div></div>
            </div>
          </div>

          {/* SIMULATED PUSH NOTIFICATIONS BAR */}
          {pushNotification && (
            <div className="absolute top-12 inset-x-4 bg-white/95 backdrop-blur-md border border-slate-200 shadow-xl rounded-2xl p-3 z-50 flex items-start gap-3 animate-in fade-in slide-in-from-top-4 duration-300">
              <div className="bg-[#16A34A]/10 text-[#16A34A] p-2 rounded-xl flex-none">
                <Sparkles className="w-4.5 h-4.5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-800">PrintEve Alert</span>
                  <span className="text-[10px] text-slate-400">now</span>
                </div>
                <p className="text-xs text-slate-600 mt-0.5 font-medium leading-relaxed">{pushNotification}</p>
              </div>
            </div>
          )}

          {/* SUB-APP SCREEN CONTENT HOLDER */}
          <div className="w-full h-full bg-[#FCFAF7] pt-0 lg:pt-10 pb-16 overflow-y-auto scrollbar-none flex flex-col relative">
            <div className="flex-1 flex flex-col overflow-y-auto scrollbar-none">
              {children}
            </div>

            {/* PERSISTENT VIEW-CART BAR (Swiggy-style) */}
            {showCartBar && (
              <Link
                href="/mobile/cart"
                className="absolute left-3 right-3 bottom-[70px] z-30 animate-in slide-in-from-bottom-4 fade-in duration-300"
              >
                <div className="bg-[#16A34A] text-white rounded-2xl pl-3 pr-4 py-2.5 flex items-center justify-between shadow-[0_8px_24px_-6px_rgba(22,163,74,0.5)] active:scale-[0.98] transition-transform">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="relative w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center flex-none">
                      <ShoppingCart className="w-4.5 h-4.5" />
                      <span className="absolute -top-1 -right-1 w-4 h-4 bg-white text-[#16A34A] rounded-full text-[8px] font-black flex items-center justify-center">
                        {cartCount}
                      </span>
                    </div>
                    <div className="min-w-0 leading-tight">
                      <span className="text-[11px] font-bold block">
                        {cartCount} item{cartCount > 1 ? "s" : ""} added
                      </span>
                      <span className="text-[10px] text-white/80 font-semibold block">
                        ₹{cartSubtotal.toFixed(0)} · excl. taxes
                      </span>
                    </div>
                  </div>
                  <span className="flex items-center gap-1 text-xs font-extrabold flex-none">
                    View Cart <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            )}

            {/* STICKY BOTTOM NAVIGATION BAR TABS */}
            <div className="absolute bottom-0 inset-x-0 h-16 bg-white border-t border-slate-200 px-3 flex items-center justify-between z-30">
              {[
                { route: "/mobile", label: "Home", icon: Megaphone },
                { route: "/mobile/search", label: "Browse", icon: Search },
                { route: "/mobile/cart", label: "Cart", icon: ShoppingCart, badge: cartItems.length },
                { route: "/mobile/track", label: "Track", icon: Truck },
                { route: "/mobile/profile", label: "Profile", icon: User }
              ].map((tab, idx) => {
                const routeToCheck = tab.route === "/mobile/profile" ? "/mobile/track" : tab.route;
                const isActive = isActiveRoute(routeToCheck);
                return (
                  <Link
                    key={idx}
                    href={tab.route}
                    className={`flex flex-col items-center gap-1 min-w-12 relative active:scale-95 transition-transform ${
                      isActive ? "text-[#16A34A]" : "text-slate-400"
                    }`}
                  >
                    <div className="relative">
                      <tab.icon className="w-5 h-5" />
                      {tab.badge ? (
                        <span className="absolute -top-1.5 -right-2 w-4 h-4 bg-[#D9383A] text-white rounded-full text-[8px] font-black flex items-center justify-center">
                          {tab.badge}
                        </span>
                      ) : null}
                    </div>
                    <span className="text-[9px] font-bold tracking-tight">{tab.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* iOS Home Indicator Bar */}
          <div className="hidden lg:flex absolute bottom-0 inset-x-0 h-4 items-center justify-center pointer-events-none z-50">
            <div className="w-28 h-1 bg-slate-300 rounded-full"></div>
          </div>
        </div>

        {/* SIDE PREVIEW CONTROL CONSOLE (Desktop only) */}
        <div className="hidden lg:flex flex-col gap-5 w-[360px] bg-white border border-slate-200 shadow-xl rounded-3xl p-6 self-start">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <div className="w-2.5 h-2.5 rounded-full bg-[#16A34A] animate-pulse"></div>
            <h2 className="text-md font-black text-slate-800 font-serif">PWA Preview Console</h2>
          </div>

          <div className="space-y-4">
            <div>
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block mb-2">Simulate State Actions</span>
              <div className="space-y-2">
                <button
                  onClick={advanceOrderStatus}
                  disabled={orderStatusIndex >= orderSteps.length - 1}
                  className="w-full bg-[#16A34A] hover:bg-[#15803D] text-white text-xs font-bold py-2.5 px-4 rounded-xl shadow-2xs flex justify-between items-center transition-colors disabled:opacity-40"
                >
                  <span>Advance Delivery Stage</span>
                  <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded-md">Step {orderStatusIndex + 1}/6</span>
                </button>

                <button
                  onClick={() => {
                    setOrderStatusIndex(0);
                    triggerPush("🔄 Order tracking simulation reset back to Step 1.");
                  }}
                  className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold py-2 px-4 rounded-xl text-center transition-colors"
                >
                  Reset Tracker State
                </button>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-4">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block mb-1">Architecture Features</span>
              <ul className="text-[10px] text-slate-400 space-y-2.5 font-medium leading-relaxed">
                <li className="flex items-start gap-1.5">
                  <span className="text-[#16A34A] font-bold">✔</span> Zepto style location picker header with instant address selectors.
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-[#16A34A] font-bold">✔</span> Swiggy style visual category cards and product add buttons.
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-[#16A34A] font-bold">✔</span> Uber layout slide-up configurators keeping contextual views intact.
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-[#16A34A] font-bold">✔</span> Friction-free UPI payment lists and custom slide-to-pay drawers.
                </li>
              </ul>
            </div>
            
            <div className="border-t border-slate-100 pt-4 text-center">
              <span className="text-[10px] text-slate-400 block font-medium">Open this URL directly on a smartphone to preview a full-screen, native experience.</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default function MobileLayout({ children }: { children: React.ReactNode }) {
  return (
    <MobileProvider>
      <DeviceContainer>{children}</DeviceContainer>
    </MobileProvider>
  );
}
