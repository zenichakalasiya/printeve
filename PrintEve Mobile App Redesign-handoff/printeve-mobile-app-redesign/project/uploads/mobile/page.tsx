"use client";

import React, { useState } from "react";
import { useMobile, PRODUCTS } from "./context";
import {
  Megaphone,
  FileText,
  Sticker,
  BookOpen,
  Mail,
  Tag,
  Search,
  MapPin,
  Bell,
  ChevronRight,
  ChevronDown,
  Sparkles,
  ArrowRight,
  Plus,
  X,
  Percent,
  Zap,
  Truck,
  Clock,
  Star
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function MobileHomeScreen() {
  const { selectedAddress, setSelectedAddress, triggerPush } = useMobile();
  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const router = useRouter();

  return (
    <div className="flex-1 flex flex-col animate-in fade-in duration-200">
      
      {/* Location selector / Header */}
      <div className="px-4 py-3 flex items-center justify-between border-b border-slate-100 bg-[#FCFAF7] sticky top-0 z-30">
        <button 
          onClick={() => setLocationModalOpen(true)}
          className="flex items-center gap-1.5 text-left"
        >
          <div className="bg-[#16A34A]/10 text-[#16A34A] p-1.5 rounded-lg">
            <MapPin className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] font-bold text-[#16A34A] uppercase tracking-wider">Deliver to</div>
            <div className="text-xs font-extrabold text-slate-800 flex items-center gap-0.5">
              {selectedAddress} <ChevronDown className="w-3.5 h-3.5" />
            </div>
          </div>
        </button>
        
        <div className="flex items-center gap-2">
          <button className="relative w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 hover:bg-slate-200">
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#D9383A]"></span>
          </button>
          <div className="w-8 h-8 rounded-full bg-[#D9383A] text-white flex items-center justify-center font-bold text-xs">
            ZC
          </div>
        </div>
      </div>

      {/* Zepto style sticky search */}
      <div className="px-4 pt-3 pb-2 bg-[#FCFAF7] sticky top-0 z-30">
        <div 
          onClick={() => router.push("/mobile/search")}
          className="w-full h-11 bg-white border border-slate-200 shadow-sm rounded-xl px-3 flex items-center gap-2 text-slate-400 cursor-pointer"
        >
          <Search className="w-4.5 h-4.5 text-[#16A34A]" />
          <span className="text-xs font-medium">Search for stickers, banners, business cards...</span>
        </div>
        <div className="flex gap-1.5 overflow-x-auto scrollbar-none mt-2.5 pb-1">
          {["Business Cards", "Custom Stickers", "Flyers", "Posters"].map((tag) => (
            <button
              key={tag}
              onClick={() => {
                router.push(`/mobile/search?q=${encodeURIComponent(tag)}`);
              }}
              className="flex-none bg-white text-slate-600 border border-slate-200 text-[10px] font-semibold py-1 px-2.5 rounded-lg shadow-2xs hover:border-[#16A34A] hover:text-[#16A34A]"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Banners Carousel with CTA */}
      <div className="px-4 mt-3">
        <div className="bg-gradient-to-r from-[#16A34A] to-[#22C55E] text-white rounded-2xl p-4 relative overflow-hidden shadow-md">
          <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-white/10 blur-xl"></div>
          <div className="relative z-10 max-w-[70%]">
            <span className="bg-white/20 text-[9px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded-full">Fast Printing</span>
            <h3 className="text-base font-serif font-bold mt-2 leading-tight">Need Custom Prints Instantly?</h3>
            <p className="text-[10px] text-white/80 mt-1">Upload layout and place order in under 5 minutes.</p>
            <Link 
              href="/mobile/product/vcard-round"
              className="mt-3.5 inline-flex bg-white text-[#16A34A] text-xs font-bold py-1.5 px-4 rounded-xl shadow-sm items-center gap-1 active:scale-95 transition-transform"
            >
              Start Printing <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Swiggy-style offer tiles strip */}
      <div className="mt-4">
        <div className="flex gap-2.5 overflow-x-auto scrollbar-none px-4 pb-1">
          {[
            { icon: Percent, title: "FLAT ₹150 OFF", sub: "First bulk order", tint: "bg-[#FEF3C7] text-[#B45309]" },
            { icon: Zap, title: "FLASH DEALS", sub: "Up to 25% off", tint: "bg-[#DCFCE7] text-[#166534]" },
            { icon: Truck, title: "FREE DELIVERY", sub: "On ₹1000+ orders", tint: "bg-[#DBEAFE] text-[#1D4ED8]" },
            { icon: Clock, title: "10-MIN QUOTE", sub: "Instant pricing", tint: "bg-[#FCE7F3] text-[#BE185D]" }
          ].map((offer, idx) => (
            <div
              key={idx}
              className="flex-none w-[136px] bg-white border border-slate-200 rounded-2xl p-2.5 shadow-2xs flex items-center gap-2"
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-none ${offer.tint}`}>
                <offer.icon className="w-4 h-4 stroke-[2.4]" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-black text-slate-800 block leading-tight truncate">{offer.title}</span>
                <span className="text-[8px] text-slate-400 font-semibold block leading-tight truncate">{offer.sub}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Instamart grid categories */}
      <div className="px-4 mt-5">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-extrabold text-slate-800 tracking-tight font-serif">Browse Categories</h2>
          <span 
            onClick={() => router.push("/mobile/search")}
            className="text-[10px] font-extrabold text-[#16A34A] cursor-pointer flex items-center gap-0.5"
          >
            See All <ChevronRight className="w-3.5 h-3.5" />
          </span>
        </div>
        
        <div className="grid grid-cols-4 gap-x-2 gap-y-4 mt-3.5">
          {[
            { name: "Business Cards", icon: Mail, slug: "Business Cards" },
            { name: "Stickers", icon: Sticker, slug: "Stickers" },
            { name: "Banners", icon: Megaphone, slug: "Banners" },
            { name: "Flyers", icon: Tag, slug: "Flyers" },
            { name: "Stationery", icon: FileText, slug: "Stationery" },
            { name: "Publishing", icon: BookOpen, slug: "Publishing" },
            { name: "Tags", icon: Tag, slug: "Tags" },
            { name: "More", icon: Plus, slug: "" }
          ].map((cat, idx) => (
            <button 
              key={idx}
              onClick={() => {
                if (cat.slug) {
                  router.push(`/mobile/search?cat=${encodeURIComponent(cat.slug)}`);
                } else {
                  router.push("/mobile/search");
                }
              }}
              className="flex flex-col items-center gap-1.5 active:scale-95 transition-transform"
            >
              <div className="w-11 h-11 rounded-xl bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center shadow-xs">
                <cat.icon className="w-5 h-5 stroke-[2.2]" />
              </div>
              <span className="text-[10px] font-bold text-slate-700 text-center leading-tight truncate w-full">
                {cat.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Popular Products Row */}
      <div className="px-4 mt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-extrabold text-slate-800 tracking-tight font-serif">Popular Near You</h2>
          <span className="text-[10px] text-slate-400 font-semibold">15-min dispatch</span>
        </div>

        <div className="flex gap-3 overflow-x-auto scrollbar-none mt-3.5 pb-2">
          {PRODUCTS.map((prod) => (
            <div
              key={prod.id}
              className="w-40 bg-white border border-slate-200 shadow-xs rounded-2xl overflow-hidden flex-none flex flex-col justify-between"
            >
              <div className="h-24 bg-slate-100 relative">
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
              <div className="p-2.5 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-[11px] font-bold text-slate-800 line-clamp-1 leading-snug">{prod.name}</h4>
                  <div className="flex items-center gap-1 mt-1 text-[8px] text-slate-400 font-semibold">
                    <Clock className="w-2.5 h-2.5" /> {prod.deliveryEta}
                    <span className="w-0.5 h-0.5 rounded-full bg-slate-300" />
                    {prod.reviews} orders
                  </div>
                </div>
                <div className="mt-2 flex items-center justify-between pt-2 border-t border-slate-100">
                  <div className="leading-none">
                    <span className="text-[8px] text-slate-400 block">from</span>
                    <span className="text-xs font-extrabold text-slate-800">₹{prod.price}</span>
                  </div>
                  <Link
                    href={`/mobile/product/${prod.id}`}
                    className="bg-[#16A34A] text-white text-[9px] font-bold py-1.5 px-3 rounded-lg active:scale-95 transition-transform"
                  >
                    ADD
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How it Works Stepper */}
      <div className="px-4 mt-6 mb-4">
        <div className="bg-[#DCFCE7]/40 border border-[#16A34A]/10 rounded-2xl p-3.5">
          <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#16A34A]" /> How PrintEve Works
          </h3>
          <div className="flex items-start justify-between gap-2 mt-3">
            {[
              { step: "1", title: "Configure", desc: "Select options" },
              { step: "2", title: "Upload", desc: "Attach PDF/AI" },
              { step: "3", title: "Delivered", desc: "Pan-India delivery" }
            ].map((item, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center text-center">
                <div className="w-6 h-6 rounded-full bg-[#16A34A] text-white text-[10px] font-bold flex items-center justify-center">
                  {item.step}
                </div>
                <span className="text-[10px] font-bold text-slate-800 mt-1.5 leading-tight">{item.title}</span>
                <span className="text-[8px] text-slate-400 mt-0.5 leading-tight">{item.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* LOCATION PICKER MODAL */}
      {locationModalOpen && (
        <div className="absolute inset-0 bg-black/60 z-50 flex items-end animate-in fade-in duration-150">
          <div className="flex-1 h-[40%] bg-[#FCFAF7] rounded-t-[32px] p-5 pb-8 flex flex-col gap-4 relative animate-in slide-in-from-bottom duration-300">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <h2 className="text-sm font-extrabold text-slate-800 font-serif">Choose Delivery Location</h2>
              <button onClick={() => setLocationModalOpen(false)} className="w-7 h-7 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2">
              {[
                "Sector 62, Noida",
                "Indiranagar, Bengaluru",
                "DLF Phase 3, Gurugram",
                "Connaught Place, New Delhi"
              ].map((address) => (
                <button
                  key={address}
                  onClick={() => {
                    setSelectedAddress(address);
                    setLocationModalOpen(false);
                    triggerPush(`📍 Delivery location changed to ${address}`);
                  }}
                  className={`w-full p-3 rounded-xl border text-left text-xs font-bold flex items-center gap-2.5 transition-colors ${
                    selectedAddress === address 
                      ? "bg-[#16A34A]/10 border-[#16A34A] text-[#16A34A]" 
                      : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
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
