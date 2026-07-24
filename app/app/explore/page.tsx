"use client";

import React, { useState, useMemo } from "react";
import { useApp, PRODUCTS, CATEGORIES } from "../context";
import type { Product } from "../products-data";
import ConfigSheet from "../ConfigSheet";
import { RecommendedCard } from "../ProductCard";
import { Search, X, SlidersHorizontal } from "lucide-react";

const serif = { fontFamily: "var(--font-fraunces)" } as const;
const FOREST = "#14432A";

export default function AppExplore() {
  const { triggerPush } = useApp();
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState("all");
  const [sheetProduct, setSheetProduct] = useState<Product | null>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PRODUCTS.filter((p) => {
      const catOk = activeCat === "all" || p.category === activeCat;
      const qOk = !q || p.name.toLowerCase().includes(q) || p.categoryLabel.toLowerCase().includes(q);
      return catOk && qOk;
    });
  }, [query, activeCat]);

  return (
    <div className="flex-1 flex flex-col animate-in fade-in duration-200">
      {/* Header + search (sticky) */}
      <div className="bg-[#FCFAF7]/95 backdrop-blur border-b border-slate-100 sticky top-0 z-30 px-4 pt-3 pb-2.5">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-black" style={{ ...serif, color: FOREST }}>
            Explore
          </h1>
          <button
            onClick={() => triggerPush("⚙️ Advanced filters are coming soon.")}
            className="w-9 h-9 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-[#14432A]"
            aria-label="Filters"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-2.5 h-11 bg-white border border-slate-200 shadow-sm rounded-2xl px-3.5 flex items-center gap-2.5">
          <Search className="w-4.5 h-4.5 text-[#16A34A]" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search prints, e.g. stickers…"
            className="flex-1 bg-transparent text-sm font-medium text-slate-700 placeholder:text-slate-400 outline-none"
          />
          {query && (
            <button onClick={() => setQuery("")} aria-label="Clear" className="text-slate-400">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex gap-2 overflow-x-auto scrollbar-none mt-2.5">
          {CATEGORIES.map((cat) => {
            const active = activeCat === cat.slug;
            return (
              <button
                key={cat.slug}
                onClick={() => setActiveCat(cat.slug)}
                className={`flex-none text-[12px] font-bold py-1.5 px-3.5 rounded-full border transition-colors ${
                  active ? "bg-[#16A34A] border-[#16A34A] text-white shadow-sm" : "bg-white border-slate-200 text-[#14432A]"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Results */}
      <div className="px-4 pt-3 pb-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">
            {results.length} product{results.length !== 1 ? "s" : ""}
          </span>
          <span className="text-[11px] text-slate-400 font-semibold">Sorted by popularity</span>
        </div>

        {results.length > 0 ? (
          <div className="grid grid-cols-2 gap-3">
            {results.map((p) => (
              <RecommendedCard key={p.id} product={p} onAdd={setSheetProduct} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center py-16">
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center">
              <Search className="w-7 h-7 text-slate-300" />
            </div>
            <p className="text-sm font-bold text-[#14432A] mt-4">No prints match “{query}”</p>
            <p className="text-xs text-slate-400 font-medium mt-1">Try another keyword or category.</p>
          </div>
        )}
      </div>

      <ConfigSheet product={sheetProduct} open={!!sheetProduct} onClose={() => setSheetProduct(null)} />
    </div>
  );
}
