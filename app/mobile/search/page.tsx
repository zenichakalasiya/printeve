"use client";

import React, { useState, useEffect, Suspense } from "react";
import { PRODUCTS } from "../context";
import {
  Search,
  ArrowLeft,
  X,
  AlertCircle,
  Star,
  Clock
} from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

function SearchContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Search parameters trigger
  const initialQuery = searchParams.get("q") || "";
  const initialCat = searchParams.get("cat") || null;

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(initialCat);

  // Sync state if search params change
  useEffect(() => {
    setSearchQuery(searchParams.get("q") || "");
    setSelectedCategory(searchParams.get("cat") || null);
  }, [searchParams]);

  const filteredProducts = PRODUCTS.filter((prod) => {
    const matchesSearch = searchQuery 
      ? prod.name.toLowerCase().includes(searchQuery.toLowerCase()) || prod.description.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    const matchesCat = selectedCategory 
      ? prod.name.toLowerCase().includes(selectedCategory.toLowerCase()) || prod.category.toLowerCase().includes(selectedCategory.toLowerCase())
      : true;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="flex-1 flex flex-col animate-in fade-in duration-200">
      
      {/* Sticky top search row with back button */}
      <div className="px-4 py-3 bg-[#FCFAF7] border-b border-slate-100 sticky top-0 z-30 flex items-center gap-2">
        <button 
          onClick={() => {
            router.push("/mobile");
          }} 
          className="p-1 rounded-lg hover:bg-slate-100"
        >
          <ArrowLeft className="w-5 h-5 text-slate-700" />
        </button>
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search items to print..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 bg-white border border-slate-200 shadow-sm rounded-xl pl-9 pr-8 text-xs font-semibold focus:outline-none focus:border-[#16A34A]"
            autoFocus={!initialQuery}
          />
          <Search className="w-4.5 h-4.5 text-slate-400 absolute left-3 top-3" />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery("")}
              className="absolute right-2 top-2 p-1 text-slate-400"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Filter tags */}
      <div className="flex gap-2 px-4 py-2 border-b border-slate-100 overflow-x-auto scrollbar-none bg-[#FCFAF7]">
        {["All Items", "Business Cards", "Stickers", "Banners", "Flyers"].map((filter) => {
          const isActive = selectedCategory === filter || (filter === "All Items" && !selectedCategory);
          return (
            <button
              key={filter}
              onClick={() => setSelectedCategory(filter === "All Items" ? null : filter)}
              className={`flex-none text-[10px] font-bold py-1.5 px-3 rounded-lg border transition-all ${
                isActive 
                  ? "bg-[#16A34A] text-white border-[#16A34A] shadow-3xs" 
                  : "bg-white text-slate-600 border-slate-200 hover:border-[#16A34A]/50"
              }`}
            >
              {filter}
            </button>
          );
        })}
      </div>

      {/* Listing Results */}
      <div className="flex-1 p-4">
        <div className="grid grid-cols-2 gap-3">
          {filteredProducts.map((prod) => (
            <div 
              key={prod.id}
              className="bg-white border border-slate-200 shadow-xs rounded-2xl overflow-hidden flex flex-col justify-between"
            >
              <div className="h-28 bg-slate-100 relative">
                <img src={prod.image} alt={prod.name} className="w-full h-full object-cover" />
                {/* discount ribbon */}
                <div className="absolute top-0 left-0 bg-[#16A34A] text-white text-[8px] font-black px-2 py-1 rounded-br-xl tracking-wide">
                  SAVE 25%
                </div>
                {/* rating pill */}
                <div className="absolute bottom-1.5 left-1.5 bg-white/95 text-slate-800 text-[9px] font-bold py-0.5 px-1.5 rounded-md flex items-center gap-0.5 shadow-sm">
                  <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" /> {prod.rating}
                </div>
              </div>
              <div className="p-3 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[9px] font-bold text-[#16A34A] uppercase tracking-wider">{prod.size}</span>
                  <h4 className="text-[11px] font-extrabold text-slate-800 mt-0.5 line-clamp-2 leading-snug">{prod.name}</h4>
                  <div className="flex items-center gap-1 mt-1.5 text-[8px] text-slate-400 font-semibold">
                    <Clock className="w-2.5 h-2.5" /> {prod.deliveryEta}
                    <span className="w-0.5 h-0.5 rounded-full bg-slate-300" />
                    {prod.reviews} orders
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[8px] text-slate-400 block">Start at</span>
                    <span className="text-xs font-black text-slate-800">₹{prod.price}</span>
                  </div>
                  <Link 
                    href={`/mobile/product/${prod.id}`}
                    className="bg-[#16A34A] text-white text-[9px] font-bold py-1.5 px-2.5 rounded-lg active:scale-95 transition-transform"
                  >
                    CONFIGURE
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {filteredProducts.length === 0 && (
          <div className="py-12 text-center">
            <AlertCircle className="w-8 h-8 text-slate-400 mx-auto" />
            <p className="text-slate-500 text-xs font-bold mt-2">No matching products found</p>
            <p className="text-slate-400 text-[10px] mt-1">Try searching for other print categories</p>
          </div>
        )}
      </div>

    </div>
  );
}

export default function MobileSearchScreen() {
  return (
    <Suspense fallback={<div className="flex-1 flex items-center justify-center text-xs text-slate-400">Loading catalog...</div>}>
      <SearchContent />
    </Suspense>
  );
}
