"use client";

import React, { useState, useEffect } from "react";
import { useApp, NEW_ARRIVALS, RECOMMENDED, CATEGORIES } from "./context";
import type { Product } from "./products-data";
import ConfigSheet from "./ConfigSheet";
import { NewArrivalCard, RecommendedCard } from "./ProductCard";
import { Search, MapPin, Bell, ChevronDown, Mic, ArrowRight, X } from "lucide-react";

const serif = { fontFamily: "var(--font-fraunces)" } as const;
const FOREST = "#14432A";

const PROMOS = [
  {
    badge: "FESTIVE OFFER",
    title: "Corporate gifting, up to 30% off",
    sub: "Order in bulk before 30 Jul",
    seed: "pe-promo-leaf",
  },
  {
    badge: "BULK DEAL",
    title: "Custom stickers, flat 20% off",
    sub: "Minimum 500 pcs · auto-applied",
    seed: "pe-promo-sticker",
  },
  {
    badge: "NEW",
    title: "Premium business cards, reinvented",
    sub: "Soft-touch matte + spot UV",
    seed: "pe-promo-card",
  },
];

const ADDRESSES = ["Ahmedabad, Gujarat", "Sector 62, Noida", "Indiranagar, Bengaluru", "Connaught Place, New Delhi"];

export default function AppHome() {
  const { selectedAddress, setSelectedAddress, triggerPush } = useApp();
  const [activeCat, setActiveCat] = useState("all");
  const [sheetProduct, setSheetProduct] = useState<Product | null>(null);
  const [locationOpen, setLocationOpen] = useState(false);

  const openSheet = (p: Product) => setSheetProduct(p);

  const recommended =
    activeCat === "all" ? RECOMMENDED : RECOMMENDED.filter((p) => p.category === activeCat);

  return (
    <div className="flex-1 flex flex-col animate-in fade-in duration-200">
      {/* Header */}
      <div className="px-4 pt-3 pb-2 flex items-center justify-between bg-[#FCFAF7]">
        <button onClick={() => setLocationOpen(true)} className="flex items-center gap-2 text-left min-w-0">
          <div className="bg-[#16A34A]/10 text-[#16A34A] p-1.5 rounded-lg flex-none">
            <MapPin className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <div className="text-[15px] font-black flex items-center gap-1 truncate" style={{ ...serif, color: FOREST }}>
              {selectedAddress.split(",")[0]} <ChevronDown className="w-4 h-4 flex-none" />
            </div>
            <div className="text-[11px] text-slate-400 font-semibold truncate">
              {selectedAddress.split(",")[1]?.trim() || "India"} · 2–3 day delivery
            </div>
          </div>
        </button>
        <div className="flex items-center gap-2.5 flex-none">
          <button
            onClick={() => triggerPush("🔔 No new notifications right now.")}
            className="relative w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-[#14432A]"
          >
            <Bell className="w-4.5 h-4.5" />
            <span className="absolute top-2 right-2.5 w-2 h-2 rounded-full bg-[#D9383A]" />
          </button>
          <div className="w-10 h-10 rounded-full flex items-center justify-center font-black text-white text-sm" style={{ backgroundColor: FOREST }}>
            Z
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="px-4 pt-1.5 pb-1">
        <button
          onClick={() => triggerPush("🔎 Search opens in the Explore build.")}
          className="w-full h-12 bg-white border border-slate-200 shadow-sm rounded-2xl px-4 flex items-center gap-3 text-slate-400"
        >
          <Search className="w-5 h-5 text-[#16A34A]" />
          <span className="text-sm font-medium flex-1 text-left">Search &ldquo;business cards&rdquo;</span>
          <Mic className="w-4.5 h-4.5 text-[#16A34A]" />
        </button>
      </div>

      {/* Pills */}
      <div className="flex gap-2 overflow-x-auto scrollbar-none px-4 pt-2.5 pb-1">
        {CATEGORIES.map((cat) => {
          const active = activeCat === cat.slug;
          return (
            <button
              key={cat.slug}
              onClick={() => setActiveCat(cat.slug)}
              className={`flex-none text-[13px] font-bold py-2 px-4 rounded-full border transition-colors ${
                active
                  ? "bg-[#16A34A] border-[#16A34A] text-white shadow-sm"
                  : "bg-white border-slate-200 text-[#14432A]"
              }`}
            >
              {cat.slug === "all" && active ? "✓ " : ""}
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Promo carousel */}
      <div className="px-4 mt-3">
        <PromoCarousel />
      </div>

      {/* New Arrivals — horizontal rail */}
      <section className="mt-6">
        <div className="px-4 flex items-center justify-between">
          <h2 className="text-lg font-black" style={{ ...serif, color: FOREST }}>
            New Arrivals
          </h2>
          <button onClick={() => triggerPush("🆕 Full listing arrives with Explore.")} className="text-[12px] font-bold text-[#16A34A] flex items-center gap-0.5">
            See all <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="flex gap-3 overflow-x-auto scrollbar-none px-4 pt-3 pb-1">
          {NEW_ARRIVALS.map((p) => (
            <NewArrivalCard key={p.id} product={p} onAdd={openSheet} />
          ))}
        </div>
      </section>

      {/* Recommended — 2-col grid */}
      <section className="mt-6">
        <div className="px-4 flex items-center justify-between">
          <h2 className="text-lg font-black" style={{ ...serif, color: FOREST }}>
            Recommended for you
          </h2>
          <span className="text-[11px] text-slate-400 font-semibold">Curated for print</span>
        </div>
        <div className="px-4 pt-3 grid grid-cols-2 gap-3">
          {recommended.map((p) => (
            <RecommendedCard key={p.id} product={p} onAdd={openSheet} />
          ))}
        </div>
        {recommended.length === 0 && (
          <p className="px-4 py-8 text-center text-sm text-slate-400 font-medium">
            Nothing in this category yet — try another filter.
          </p>
        )}
      </section>

      {/* Free-delivery green card */}
      <div className="px-4 mt-6 mb-5">
        <div className="relative overflow-hidden rounded-2xl p-4 flex items-center gap-3 bg-gradient-to-r from-[#15803D] to-[#22C55E] shadow-md">
          <div className="absolute -right-6 -top-8 w-32 h-32 rounded-full bg-white/10 blur-xl" />
          <div className="text-4xl flex-none relative">📦</div>
          <div className="relative min-w-0">
            <span className="inline-block bg-[#FDE047] text-[#14432A] text-[10px] font-black uppercase tracking-wide px-2 py-0.5 rounded-md">
              Free Delivery
            </span>
            <h3 className="text-white text-[17px] font-black mt-1.5 leading-tight" style={serif}>
              on your first bulk order
            </h3>
            <p className="text-white/80 text-[12px] font-semibold mt-0.5">min. 100 pcs · auto-applied at checkout</p>
          </div>
        </div>
      </div>

      {/* Add-to-cart configurator */}
      <ConfigSheet product={sheetProduct} open={!!sheetProduct} onClose={() => setSheetProduct(null)} />

      {/* Location picker */}
      {locationOpen && (
        <div className="absolute inset-0 bg-black/50 z-50 flex items-end animate-in fade-in duration-150">
          <div className="w-full bg-[#FCFAF7] rounded-t-[28px] p-5 pb-8 flex flex-col gap-4 animate-in slide-in-from-bottom duration-300">
            <div className="w-10 h-1 bg-slate-300 rounded-full mx-auto" />
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <h2 className="text-base font-black" style={{ ...serif, color: FOREST }}>
                Choose delivery location
              </h2>
              <button onClick={() => setLocationOpen(false)} className="w-8 h-8 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-2">
              {ADDRESSES.map((address) => (
                <button
                  key={address}
                  onClick={() => {
                    setSelectedAddress(address);
                    setLocationOpen(false);
                    triggerPush(`📍 Delivery location set to ${address}`);
                  }}
                  className={`w-full p-3 rounded-xl border text-left text-sm font-bold flex items-center gap-2.5 transition-colors ${
                    selectedAddress === address
                      ? "bg-[#DCFCE7] border-[#16A34A] text-[#166534]"
                      : "bg-white border-slate-200 text-slate-700"
                  }`}
                >
                  <MapPin className="w-4 h-4 text-[#16A34A]" /> {address}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------------------------- Promo carousel ------------------------------ */
function PromoCarousel() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % PROMOS.length), 3600);
    return () => clearInterval(t);
  }, []);
  return (
    <div>
      <div className="relative overflow-hidden rounded-2xl">
        <div className="flex transition-transform duration-500 ease-out" style={{ transform: `translateX(-${index * 100}%)` }}>
          {PROMOS.map((promo) => (
            <div key={promo.seed} className="w-full flex-none">
              <div className="relative h-[150px] overflow-hidden">
                <img src={`https://picsum.photos/seed/${promo.seed}/800/400`} alt="" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0F3D24]/95 via-[#14432A]/80 to-transparent" />
                <div className="relative h-full p-4 flex flex-col justify-center max-w-[75%]">
                  <span className="inline-block w-fit bg-[#FDE047] text-[#14432A] text-[10px] font-black uppercase tracking-wide px-2 py-0.5 rounded-md">
                    {promo.badge}
                  </span>
                  <h3 className="text-white text-[20px] font-black mt-2 leading-tight" style={serif}>
                    {promo.title}
                  </h3>
                  <p className="text-white/75 text-[12px] font-semibold mt-1">{promo.sub}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-1.5 mt-2.5 px-1">
        {PROMOS.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-1.5 rounded-full transition-all ${i === index ? "w-5 bg-[#16A34A]" : "w-1.5 bg-slate-300"}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

