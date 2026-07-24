"use client";

import React from "react";
import { AppProvider, useApp } from "./context";
import Onboarding from "./Onboarding";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Compass,
  ClipboardList,
  ShoppingCart,
  User,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const serif = { fontFamily: "var(--font-fraunces)" } as const;

// Tabs matching the Figma IA.
const TABS = [
  { route: "/app", label: "Home", icon: Home },
  { route: "/app/explore", label: "Explore", icon: Compass },
  { route: "/app/orders", label: "Orders", icon: ClipboardList },
  { route: "/app/cart", label: "Cart", icon: ShoppingCart },
  { route: "/app/profile", label: "Profile", icon: User },
];

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider>
      <Device>{children}</Device>
    </AppProvider>
  );
}

function Device({ children }: { children: React.ReactNode }) {
  const { onboarded, pushNotification, cartItems } = useApp();
  const pathname = usePathname();

  const isActive = (route: string) =>
    route === "/app" ? pathname === "/app" : pathname === route || pathname.startsWith(route + "/");

  const cartCount = cartItems.length;
  const cartSubtotal = cartItems.reduce((acc, i) => acc + i.unitPrice * i.qty, 0);
  const showCartBar = onboarded && cartCount > 0 && !pathname.startsWith("/app/cart");

  return (
    <div className="min-h-screen bg-[#F3F4F6] text-slate-800 flex items-center justify-center p-0 lg:p-8 mobile-app-root">
      {/* phone bezel (rounded frame on desktop, full-bleed on mobile) */}
      <div className="relative mx-auto flex-none shadow-2xl rounded-none lg:rounded-[48px] overflow-hidden border-0 lg:border-[12px] border-slate-950 bg-slate-950 w-full lg:w-[400px] h-[100dvh] lg:h-[860px] transition-all">
        {/* Dynamic island + status bar (desktop frame only) */}
        <div className="hidden lg:flex absolute top-2 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-full z-50" />
        <div className="hidden lg:flex absolute top-0 inset-x-0 h-10 px-6 items-center justify-between text-xs z-40 font-semibold text-[#14432A] bg-[#FCFAF7]">
          <span>9:41</span>
          <div className="flex items-center gap-1.5">
            <span className="text-[10px]">5G</span>
            <div className="w-5 h-2.5 border border-slate-400 rounded-sm p-0.5 flex items-center">
              <div className="h-full w-3.5 bg-slate-500 rounded-2xs" />
            </div>
          </div>
        </div>

        {/* push notification */}
        {pushNotification && (
          <div className="absolute top-12 inset-x-4 bg-white/95 backdrop-blur-md border border-slate-200 shadow-xl rounded-2xl p-3 z-[70] flex items-start gap-3 animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="bg-[#16A34A]/10 text-[#16A34A] p-2 rounded-xl flex-none">
              <Sparkles className="w-4.5 h-4.5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-[#14432A]">PrintEve</span>
                <span className="text-[10px] text-slate-400">now</span>
              </div>
              <p className="text-xs text-slate-600 mt-0.5 font-medium leading-relaxed">{pushNotification}</p>
            </div>
          </div>
        )}

        {/* screen */}
        <div className="w-full h-full bg-[#FCFAF7] pt-0 lg:pt-10 overflow-hidden flex flex-col relative">
          {onboarded ? (
            <>
              <div className="flex-1 flex flex-col overflow-y-auto scrollbar-none pb-16">{children}</div>

              {/* Swiggy-style persistent cart bar */}
              {showCartBar && (
                <Link
                  href="/app/cart"
                  className="absolute left-3 right-3 bottom-[74px] z-30 animate-in slide-in-from-bottom-4 fade-in duration-300"
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

              {/* Bottom tab bar */}
              <div className="absolute bottom-0 inset-x-0 h-16 bg-white border-t border-slate-200 px-2 flex items-center justify-between z-30">
                {TABS.map((tab) => {
                  const active = isActive(tab.route);
                  const badge = tab.label === "Cart" ? cartCount : 0;
                  return (
                    <Link
                      key={tab.route}
                      href={tab.route}
                      className={`flex flex-col items-center gap-1 min-w-12 relative active:scale-95 transition-transform ${
                        active ? "text-[#16A34A]" : "text-slate-400"
                      }`}
                    >
                      <div className="relative">
                        <tab.icon className="w-5 h-5" strokeWidth={active ? 2.4 : 2} />
                        {badge ? (
                          <span className="absolute -top-1.5 -right-2 w-4 h-4 bg-[#D9383A] text-white rounded-full text-[8px] font-black flex items-center justify-center">
                            {badge}
                          </span>
                        ) : null}
                      </div>
                      <span className="text-[9px] font-bold tracking-tight" style={serif}>
                        {tab.label}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </>
          ) : (
            <Onboarding />
          )}
        </div>

        {/* home indicator (desktop frame only) */}
        <div className="hidden lg:flex absolute bottom-0 inset-x-0 h-4 items-center justify-center pointer-events-none z-50">
          <div className="w-28 h-1 bg-slate-300 rounded-full" />
        </div>
      </div>
    </div>
  );
}
