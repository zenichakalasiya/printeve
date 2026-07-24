"use client";

import React from "react";
import type { Product } from "./products-data";
import { Star, Clock, Bookmark } from "lucide-react";

// Horizontal-rail card (New Arrivals).
export function NewArrivalCard({ product, onAdd }: { product: Product; onAdd: (p: Product) => void }) {
  return (
    <button
      onClick={() => onAdd(product)}
      className="w-[156px] flex-none bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs text-left flex flex-col active:scale-[0.98] transition-transform"
    >
      <div className="h-[104px] bg-slate-100 relative">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        <span className="absolute top-0 left-0 bg-[#D9383A] text-white text-[8px] font-black px-2 py-1 rounded-br-xl tracking-wide">
          SAVE {product.save}%
        </span>
        <div className="absolute bottom-1.5 left-1.5 bg-white/95 text-[#14432A] text-[9px] font-bold py-0.5 px-1.5 rounded-md flex items-center gap-0.5 shadow-sm">
          <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" /> {product.rating}
        </div>
      </div>
      <div className="p-2.5 flex-1 flex flex-col">
        <h4 className="text-[12px] font-bold text-[#14432A] leading-snug line-clamp-1">{product.name}</h4>
        <span className="text-[10px] text-slate-400 font-semibold mt-0.5">{product.categoryLabel}</span>
        <div className="mt-2 flex items-center justify-between pt-2 border-t border-slate-100">
          <div className="leading-none">
            <span className="text-[8px] text-slate-400 block">from</span>
            <span className="text-[13px] font-black text-[#14432A]">₹{product.price}</span>
          </div>
          <span className="bg-[#16A34A] text-white text-[10px] font-black py-1.5 px-3.5 rounded-lg">ADD</span>
        </div>
      </div>
    </button>
  );
}

// 2-column grid card (Recommended / Explore).
export function RecommendedCard({ product, onAdd }: { product: Product; onAdd: (p: Product) => void }) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs flex flex-col">
      <button onClick={() => onAdd(product)} className="h-[118px] bg-slate-100 relative block">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        <span className="absolute top-0 left-0 bg-[#D9383A] text-white text-[8px] font-black px-2 py-1 rounded-br-xl tracking-wide">
          SAVE {product.save}%
        </span>
        <span className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-white/90 flex items-center justify-center shadow-sm">
          <Bookmark className="w-3.5 h-3.5 text-[#14432A]" />
        </span>
      </button>
      <div className="p-2.5 flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-1.5">
          <h4 className="text-[12.5px] font-bold text-[#14432A] leading-snug line-clamp-1">{product.name}</h4>
          <span className="flex-none text-[9px] font-bold text-[#166534] bg-[#DCFCE7] px-1.5 py-0.5 rounded-md flex items-center gap-0.5">
            {product.rating} <Star className="w-2.5 h-2.5 fill-current" />
          </span>
        </div>
        <div className="flex items-center gap-1 mt-1 text-[9px] text-slate-400 font-semibold">
          <Clock className="w-2.5 h-2.5" /> {product.deliveryEta}
          <span className="w-0.5 h-0.5 rounded-full bg-slate-300" />
          {product.reviews} orders
        </div>
        <div className="mt-2 flex items-center justify-between pt-2 border-t border-slate-100">
          <div className="leading-none">
            <span className="text-[8px] text-slate-400 block">from</span>
            <span className="text-[14px] font-black text-[#14432A]">₹{product.price}</span>
          </div>
          <button
            onClick={() => onAdd(product)}
            className="bg-[#16A34A] text-white text-[10px] font-black py-1.5 px-4 rounded-lg active:scale-95 transition-transform"
          >
            ADD
          </button>
        </div>
      </div>
    </div>
  );
}
