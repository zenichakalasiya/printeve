"use client";

import React, { useState, useEffect, useRef } from "react";
import { useApp } from "../context";
import {
  ShoppingCart,
  X,
  MapPin,
  Tag,
  ArrowRight,
  ArrowLeft,
  FileCheck,
  Plus,
  Minus,
  ShieldCheck,
  Trash2,
  Truck,
  BadgeCheck,
  ChevronRight,
} from "lucide-react";
import { useRouter } from "next/navigation";

const serif = { fontFamily: "var(--font-fraunces)" } as const;
const FOREST = "#14432A";
const FREE_DELIVERY_THRESHOLD = 1000;
const MIN_ORDER = 200;

const PAYMENT_METHODS = [
  { name: "Google Pay", tag: "UPI", initials: "G", color: "#4285F4" },
  { name: "PhonePe", tag: "UPI", initials: "Pe", color: "#5F259F" },
  { name: "Paytm", tag: "Wallet / UPI", initials: "P", color: "#00BAF2" },
];

export default function AppCart() {
  const router = useRouter();
  const {
    cartItems,
    removeFromCart,
    updateQty,
    clearCart,
    selectedAddress,
    setSelectedAddress,
    isCouponApplied,
    setIsCouponApplied,
    placeOrder,
    triggerPush,
  } = useApp();

  const [checkoutStep, setCheckoutStep] = useState<"review" | "payment">("review");
  const [couponCode, setCouponCode] = useState("");
  const [locationOpen, setLocationOpen] = useState(false);
  const [selectedPay, setSelectedPay] = useState(0);

  const [slide, setSlide] = useState(0);
  const [paying, setPaying] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const itemTotal = cartItems.reduce((acc, i) => acc + i.unitPrice * i.qty, 0);
  const totalPieces = cartItems.reduce((acc, i) => acc + i.qty, 0);
  const cgst = itemTotal * 0.09;
  const sgst = itemTotal * 0.09;
  const platformFee = cartItems.length > 0 ? 10 : 0;
  const shipping = itemTotal > FREE_DELIVERY_THRESHOLD || itemTotal === 0 ? 0 : 60;
  const couponDiscount = isCouponApplied ? itemTotal * 0.2 : 0;
  const grandTotal = itemTotal + cgst + sgst + shipping + platformFee - couponDiscount;
  const amountToFree = Math.max(0, FREE_DELIVERY_THRESHOLD - itemTotal);
  const freeProgress = Math.min(100, (itemTotal / FREE_DELIVERY_THRESHOLD) * 100);
  const belowMin = itemTotal > 0 && itemTotal < MIN_ORDER;

  const onMove = (e: any) => {
    if (!dragging.current || !trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const pct = Math.min(Math.max(Math.round(((clientX - rect.left) / rect.width) * 100), 0), 100);
    setSlide(pct);
  };
  const onUp = () => {
    dragging.current = false;
    if (slide >= 90) {
      setSlide(100);
      execPay();
    } else setSlide(0);
  };
  useEffect(() => {
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchend", onUp);
    };
  }, [slide]);

  const execPay = () => {
    setPaying(true);
    setTimeout(() => {
      const id = placeOrder(grandTotal);
      setPaying(false);
      setSlide(0);
      setCheckoutStep("review");
      triggerPush(`🎉 Order ${id} confirmed! Track it live below.`);
      router.push("/app/orders");
    }, 1400);
  };

  const applyCoupon = (code: string) => {
    if (code.toUpperCase() === "PRINTEVE20") {
      setIsCouponApplied(true);
      setCouponCode("PRINTEVE20");
      triggerPush("🏷️ Coupon applied! 20% discount unlocked.");
    } else triggerPush("❌ Invalid coupon code.");
  };

  return (
    <div className="flex-1 flex flex-col animate-in fade-in duration-200">
      {/* Header */}
      <div className="px-4 py-3 bg-[#FCFAF7]/95 backdrop-blur border-b border-slate-100 sticky top-0 z-30 flex items-center gap-3">
        <button
          onClick={() => (checkoutStep === "payment" ? setCheckoutStep("review") : router.push("/app"))}
          className="p-1 rounded-lg hover:bg-slate-100"
          aria-label="Back"
        >
          <ArrowLeft className="w-5 h-5 text-[#14432A]" />
        </button>
        <div className="flex-1">
          <h1 className="text-lg font-black leading-none" style={{ ...serif, color: FOREST }}>
            {checkoutStep === "review" ? "Cart" : "Secure Payment"}
          </h1>
          <span className="text-[10px] text-slate-400 font-semibold">
            {cartItems.length > 0 ? `${cartItems.length} item${cartItems.length > 1 ? "s" : ""} · ${totalPieces} pcs` : "No items yet"}
          </span>
        </div>
      </div>

      {checkoutStep === "review" ? (
        cartItems.length === 0 ? (
          /* Empty state */
          <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
            <div className="w-24 h-24 rounded-full bg-[#DCFCE7]/60 flex items-center justify-center">
              <ShoppingCart className="w-11 h-11 text-[#16A34A]" strokeWidth={1.6} />
            </div>
            <h2 className="text-lg font-black mt-5" style={{ ...serif, color: FOREST }}>
              Your cart is empty
            </h2>
            <p className="text-xs text-slate-400 font-medium mt-1.5 leading-relaxed">
              Browse premium print products and configure your first custom order.
            </p>
            <button
              onClick={() => router.push("/app")}
              className="mt-6 bg-[#16A34A] hover:bg-[#15803D] text-white text-xs font-bold py-3 px-7 rounded-2xl shadow-md flex items-center gap-1.5 active:scale-[0.98] transition-transform"
            >
              Start browsing <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 p-4 space-y-3.5">
              {/* Free delivery nudge */}
              <div className="bg-white border border-slate-200 rounded-2xl p-3.5 shadow-2xs">
                <div className="flex items-center gap-2 text-[11px] font-bold">
                  <Truck className={`w-4 h-4 ${shipping === 0 ? "text-[#16A34A]" : "text-slate-500"}`} />
                  {shipping === 0 ? (
                    <span className="text-[#16A34A]">Yay! You&apos;ve unlocked FREE delivery 🎉</span>
                  ) : (
                    <span className="text-slate-600">
                      Add <span className="text-[#16A34A]">₹{amountToFree.toFixed(0)}</span> more for FREE delivery
                    </span>
                  )}
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mt-2">
                  <div className="h-full bg-gradient-to-r from-[#16A34A] to-[#22C55E] rounded-full transition-all duration-500" style={{ width: `${freeProgress}%` }} />
                </div>
              </div>

              {/* Items */}
              {cartItems.map((item) => (
                <div key={item.id} className="bg-white border border-slate-200 rounded-2xl p-3 shadow-2xs">
                  <div className="flex gap-3">
                    <div className="w-[68px] h-[68px] rounded-xl bg-slate-100 overflow-hidden flex-none">
                      <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-[13px] font-black text-[#14432A] leading-snug line-clamp-2">{item.product.name}</h4>
                        <button onClick={() => removeFromCart(item.id)} aria-label="Remove item" className="text-slate-300 hover:text-[#D9383A] flex-none p-0.5 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        {[item.size, item.finish, item.quality, item.sides].map((chip, i) => (
                          <span key={i} className="text-[9px] font-semibold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded-md">
                            {chip}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center gap-1 text-[9px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-1 rounded-md mt-1.5 w-fit max-w-full">
                        <FileCheck className="w-3 h-3 flex-none" />
                        <span className="truncate">{item.file}</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-2.5 pt-2.5 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2.5 bg-slate-50 border border-slate-200 rounded-full px-1.5 py-1">
                      <button onClick={() => updateQty(item.id, item.qty - 100)} aria-label="Decrease" disabled={item.qty <= 100} className="w-6 h-6 rounded-full bg-white border border-slate-200 flex items-center justify-center active:scale-90 transition-transform disabled:opacity-40">
                        <Minus className="w-3 h-3 text-slate-600" />
                      </button>
                      <span className="text-xs font-black text-[#14432A] min-w-9 text-center">{item.qty}</span>
                      <button onClick={() => updateQty(item.id, item.qty + 100)} aria-label="Increase" className="w-6 h-6 rounded-full bg-[#16A34A] flex items-center justify-center active:scale-90 transition-transform">
                        <Plus className="w-3 h-3 text-white" />
                      </button>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-black text-[#14432A]">₹{(item.unitPrice * item.qty).toFixed(0)}</span>
                      <span className="text-[9px] text-slate-400 font-semibold block leading-none mt-0.5">₹{item.unitPrice.toFixed(2)}/pc</span>
                    </div>
                  </div>
                </div>
              ))}

              <button onClick={() => router.push("/app")} className="w-full text-[11px] font-bold text-[#16A34A] py-2 flex items-center justify-center gap-1">
                <Plus className="w-3.5 h-3.5" /> Add more items
              </button>

              {/* Address */}
              <div className="bg-white border border-slate-200 rounded-2xl p-3.5 shadow-2xs flex items-center justify-between">
                <div className="flex items-start gap-2.5 min-w-0">
                  <div className="bg-[#DCFCE7] text-[#16A34A] p-2 rounded-xl mt-0.5 flex-none">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wide">Deliver to</span>
                    <span className="text-xs font-black text-[#14432A] block mt-0.5 truncate">{selectedAddress}</span>
                    <span className="text-[9px] text-slate-400 block mt-0.5">Estimated delivery: 24–48 hours</span>
                  </div>
                </div>
                <button onClick={() => setLocationOpen(true)} className="text-[10px] font-extrabold text-[#16A34A] flex-none flex items-center gap-0.5">
                  Change <ChevronRight className="w-3 h-3" />
                </button>
              </div>

              {/* Coupon */}
              <div className="bg-white border border-slate-200 rounded-2xl p-3.5 shadow-2xs">
                {isCouponApplied ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <BadgeCheck className="w-5 h-5 text-[#16A34A]" />
                      <div>
                        <span className="text-xs font-black text-[#14432A] block">PRINTEVE20 applied</span>
                        <span className="text-[9px] text-emerald-600 font-semibold">You saved ₹{couponDiscount.toFixed(0)} (20%)</span>
                      </div>
                    </div>
                    <button onClick={() => { setIsCouponApplied(false); setCouponCode(""); triggerPush("Coupon removed."); }} className="text-[10px] font-bold text-slate-400 hover:text-[#D9383A]">
                      Remove
                    </button>
                  </div>
                ) : (
                  <>
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block mb-1.5">Apply discount coupon</label>
                    <div className="flex gap-2">
                      <input type="text" placeholder="Enter code" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} className="flex-1 h-10 px-3 border border-slate-200 rounded-xl text-xs font-semibold uppercase focus:outline-none focus:border-[#16A34A]" />
                      <button onClick={() => applyCoupon(couponCode)} className="bg-[#14432A] text-white text-xs font-bold px-5 rounded-xl active:scale-95 transition-transform">Apply</button>
                    </div>
                    <button onClick={() => applyCoupon("PRINTEVE20")} className="mt-2.5 w-full bg-[#DCFCE7]/50 border border-dashed border-[#16A34A]/30 p-2.5 rounded-xl flex items-center justify-between text-left">
                      <div className="flex items-center gap-2">
                        <Tag className="w-4 h-4 text-[#16A34A]" />
                        <div>
                          <span className="text-[10px] font-extrabold text-[#14432A] block">PRINTEVE20</span>
                          <span className="text-[8px] text-slate-400 block mt-0.5">Save 20% on your first bulk order</span>
                        </div>
                      </div>
                      <span className="text-[10px] font-extrabold text-[#16A34A]">Apply</span>
                    </button>
                  </>
                )}
              </div>

              {/* Bill */}
              <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs">
                <h3 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wide mb-2.5">Bill details</h3>
                <div className="space-y-2 text-xs font-semibold text-slate-500">
                  <div className="flex justify-between"><span>Item total ({totalPieces} pcs)</span><span className="text-slate-700">₹{itemTotal.toFixed(2)}</span></div>
                  <div className="flex justify-between"><span>CGST (9%)</span><span className="text-slate-700">₹{cgst.toFixed(2)}</span></div>
                  <div className="flex justify-between"><span>SGST (9%)</span><span className="text-slate-700">₹{sgst.toFixed(2)}</span></div>
                  <div className="flex justify-between"><span>Platform fee</span><span className="text-slate-700">₹{platformFee.toFixed(2)}</span></div>
                  <div className="flex justify-between"><span>Delivery</span><span>{shipping === 0 ? <span className="text-[#16A34A] font-bold">FREE</span> : `₹${shipping.toFixed(2)}`}</span></div>
                  {isCouponApplied && (
                    <div className="flex justify-between text-[#16A34A]"><span>Coupon (PRINTEVE20)</span><span>−₹{couponDiscount.toFixed(2)}</span></div>
                  )}
                  <div className="border-t border-slate-100 pt-2.5 mt-1 flex justify-between text-sm font-black text-[#14432A]"><span>To pay</span><span>₹{grandTotal.toFixed(2)}</span></div>
                </div>
              </div>

              <button onClick={clearCart} className="w-full text-[11px] font-bold text-slate-400 hover:text-[#D9383A] py-1 transition-colors">
                Clear Cart
              </button>
            </div>

            {/* Sticky checkout */}
            <div className="sticky bottom-0 bg-white/95 backdrop-blur border-t border-slate-200 px-4 py-3 z-20">
              {belowMin && (
                <div className="mb-2 text-[11px] font-bold text-[#D9383A] bg-[#D9383A]/10 border border-[#D9383A]/20 rounded-xl px-3 py-2 text-center">
                  Minimum order ₹{MIN_ORDER}. Add ₹{(MIN_ORDER - itemTotal).toFixed(0)} more to check out.
                </div>
              )}
              <div className="flex items-center justify-between gap-3">
                <div className="flex-none">
                  <span className="text-lg font-black text-[#14432A] leading-none block">₹{grandTotal.toFixed(0)}</span>
                  <span className="text-[10px] text-slate-400 font-semibold">Total incl. taxes</span>
                </div>
                <button
                  onClick={() => setCheckoutStep("payment")}
                  disabled={belowMin}
                  className="flex-1 bg-[#16A34A] hover:bg-[#15803D] text-white text-sm font-bold py-3.5 rounded-2xl shadow-md flex items-center justify-center gap-1.5 active:scale-[0.98] transition-transform disabled:opacity-40"
                >
                  Proceed to Checkout <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </>
        )
      ) : (
        /* Payment */
        <>
          <div className="flex-1 p-4 space-y-4">
            <div className="bg-slate-950 text-white rounded-2xl p-5 relative overflow-hidden">
              <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-[#16A34A]/20 blur-2xl" />
              <div className="relative">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Amount payable</span>
                <span className="text-3xl font-black block mt-1.5 text-[#4ADE80]">₹{grandTotal.toFixed(2)}</span>
                <div className="flex items-center gap-1.5 mt-2 text-[10px] text-slate-400"><MapPin className="w-3 h-3" /> {selectedAddress}</div>
              </div>
            </div>

            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block mb-2">Pay using</label>
              <div className="space-y-2.5">
                {PAYMENT_METHODS.map((pay, idx) => {
                  const active = selectedPay === idx;
                  return (
                    <button key={idx} onClick={() => setSelectedPay(idx)} className={`w-full border rounded-2xl p-3.5 flex items-center justify-between transition-all ${active ? "border-[#16A34A] bg-[#DCFCE7]/30 shadow-2xs" : "border-slate-200 bg-white"}`}>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-white text-sm" style={{ backgroundColor: pay.color }}>{pay.initials}</div>
                        <div className="text-left">
                          <span className="text-xs font-black text-[#14432A] block">{pay.name}</span>
                          <span className="text-[9px] text-slate-400 font-semibold">{pay.tag}</span>
                        </div>
                      </div>
                      <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${active ? "border-[#16A34A]" : "border-slate-300"}`}>
                        {active && <span className="w-2.5 h-2.5 rounded-full bg-[#16A34A]" />}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center gap-1.5 justify-center py-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#16A34A]" />
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">256-bit secured · Razorpay</span>
            </div>
          </div>

          <div className="sticky bottom-0 bg-[#FCFAF7]/95 backdrop-blur border-t border-slate-100 p-4 z-20">
            {paying ? (
              <div className="w-full bg-[#16A34A] text-white py-4 rounded-2xl shadow-lg flex items-center justify-center gap-2 font-bold animate-pulse">Processing payment…</div>
            ) : (
              <div ref={trackRef} onMouseMove={onMove} onTouchMove={onMove} className="w-full h-14 bg-slate-900 rounded-2xl p-1.5 relative select-none cursor-pointer flex items-center justify-center overflow-hidden">
                <div className="absolute inset-y-0 left-0 bg-[#16A34A]/30 transition-all" style={{ width: `${slide}%` }} />
                <div className="text-white text-xs font-bold opacity-70 pointer-events-none relative">Slide to pay ₹{grandTotal.toFixed(0)}</div>
                <div onMouseDown={() => (dragging.current = true)} onTouchStart={() => (dragging.current = true)} style={{ left: `${Math.min(slide, 88)}%` }} className="absolute top-1.5 bottom-1.5 aspect-square bg-[#16A34A] hover:bg-[#15803D] rounded-xl text-white flex items-center justify-center shadow-lg active:scale-95 cursor-grab transition-[left] duration-75">
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>
            )}
          </div>
        </>
      )}

      {/* Location modal */}
      {locationOpen && (
        <div className="absolute inset-0 bg-black/50 z-50 flex items-end animate-in fade-in duration-150">
          <div className="w-full bg-[#FCFAF7] rounded-t-[28px] p-5 pb-8 flex flex-col gap-4 animate-in slide-in-from-bottom duration-300">
            <div className="w-10 h-1 bg-slate-300 rounded-full mx-auto" />
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <h2 className="text-base font-black" style={{ ...serif, color: FOREST }}>Choose delivery location</h2>
              <button onClick={() => setLocationOpen(false)} className="w-8 h-8 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center"><X className="w-4 h-4" /></button>
            </div>
            <div className="space-y-2">
              {["Ahmedabad, Gujarat", "Sector 62, Noida", "Indiranagar, Bengaluru", "Connaught Place, New Delhi"].map((address) => (
                <button key={address} onClick={() => { setSelectedAddress(address); setLocationOpen(false); triggerPush(`📍 Delivery location set to ${address}`); }} className={`w-full p-3 rounded-xl border text-left text-sm font-bold flex items-center gap-2.5 transition-colors ${selectedAddress === address ? "bg-[#DCFCE7] border-[#16A34A] text-[#166534]" : "bg-white border-slate-200 text-slate-700"}`}>
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
