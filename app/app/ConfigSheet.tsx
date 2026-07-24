"use client";

import React, { useState, useEffect } from "react";
import { useApp } from "./context";
import type { Product } from "./products-data";
import {
  ShoppingCart,
  UploadCloud,
  Plus,
  Minus,
  X,
  FileCheck,
  Star,
} from "lucide-react";

// Configurator option catalog. surcharge is per-piece and reflected live.
const SIZE_OPTIONS = ["Standard", "Compact", "Large"];
const FINISH_OPTIONS = [
  { value: "Smooth Matte", surcharge: 0 },
  { value: "High Gloss", surcharge: 0 },
  { value: "Soft Velvet", surcharge: 0.5 },
  { value: "Metallic Foil", surcharge: 1.5 },
];
const GSM_OPTIONS = [
  { value: "300 GSM", surcharge: 0 },
  { value: "350 GSM", surcharge: 0.3 },
  { value: "400 GSM", surcharge: 0.6 },
];
const SIDES_OPTIONS = ["Double-Sided", "Single-Sided"];
const TIERS = [
  { qty: 100, discount: "5% Off" },
  { qty: 500, discount: "15% Off" },
  { qty: 1000, discount: "25% Off" },
];

const serif = { fontFamily: "var(--font-fraunces)" } as const;

export default function ConfigSheet({
  product,
  open,
  onClose,
}: {
  product: Product | null;
  open: boolean;
  onClose: () => void;
}) {
  const { addToCart, triggerPush } = useApp();

  const [paperSize, setPaperSize] = useState(SIZE_OPTIONS[0]);
  const [paperFinish, setPaperFinish] = useState(FINISH_OPTIONS[0].value);
  const [paperQuality, setPaperQuality] = useState(GSM_OPTIONS[1].value);
  const [printSides, setPrintSides] = useState(SIDES_OPTIONS[0]);
  const [quantity, setQuantity] = useState(100);

  const [uploadedFile, setUploadedFile] = useState<{ name: string; size: string } | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  // Reset configuration whenever a different product opens.
  useEffect(() => {
    if (open && product) {
      setPaperSize(SIZE_OPTIONS[0]);
      setPaperFinish(FINISH_OPTIONS[0].value);
      setPaperQuality(GSM_OPTIONS[1].value);
      setPrintSides(SIDES_OPTIONS[0]);
      setQuantity(100);
      setUploadedFile(null);
      setUploadProgress(0);
      setIsUploading(false);
    }
  }, [open, product]);

  if (!open || !product) return null;

  const simulateUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setUploadedFile({ name: `artwork_${product.id}.pdf`, size: "12.4 MB" });
          triggerPush("📂 Artwork uploaded & pre-flight checks passed!");
          return 100;
        }
        return prev + 25;
      });
    }, 160);
  };

  const perCardBase = product.price / 100;
  const finishSurcharge = FINISH_OPTIONS.find((f) => f.value === paperFinish)?.surcharge ?? 0;
  const gsmSurcharge = GSM_OPTIONS.find((g) => g.value === paperQuality)?.surcharge ?? 0;
  const perCard = perCardBase + finishSurcharge + gsmSurcharge;
  const itemTotal = perCard * quantity;
  const gst = itemTotal * 0.18;
  const platformFee = 3;
  const shipping = itemTotal > 1000 ? 0 : 60;
  const grandTotal = itemTotal + gst + shipping + platformFee;

  return (
    <div className="absolute inset-0 z-50 flex flex-col justify-end animate-in fade-in duration-150">
      {/* scrim */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Sheet — opens to ~75% of the screen */}
      <div className="relative bg-[#FCFAF7] rounded-t-[28px] h-[75%] flex flex-col shadow-2xl animate-in slide-in-from-bottom duration-300">
        {/* Grabber + header */}
        <div className="px-5 pt-3 pb-3 border-b border-slate-100 flex-none">
          <div className="w-10 h-1 bg-slate-300 rounded-full mx-auto mb-3" />
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-100 flex-none">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="text-[15px] font-black text-[#14432A] leading-tight truncate" style={serif}>
                {product.name}
              </h2>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[10px] font-bold text-amber-600 flex items-center gap-0.5">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> {product.rating}
                </span>
                <span className="text-[10px] text-slate-400 font-semibold">{product.categoryLabel}</span>
              </div>
            </div>
            <button
              onClick={onClose}
              aria-label="Close"
              className="w-8 h-8 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center flex-none"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto scrollbar-none px-5 pt-4 pb-4 flex flex-col gap-5">
          <Segmented label="Size & style" cols={3}>
            {SIZE_OPTIONS.map((opt) => (
              <Pill key={opt} active={paperSize === opt} onClick={() => setPaperSize(opt)} compact>
                {opt}
              </Pill>
            ))}
          </Segmented>

          <Segmented label="Finish type" cols={2}>
            {FINISH_OPTIONS.map((opt) => (
              <Pill key={opt.value} active={paperFinish === opt.value} onClick={() => setPaperFinish(opt.value)}>
                {opt.value}
                {opt.surcharge > 0 && (
                  <span className="block text-[9px] font-bold text-emerald-600 mt-0.5">+₹{opt.surcharge}/pc</span>
                )}
              </Pill>
            ))}
          </Segmented>

          <div className="grid grid-cols-2 gap-4">
            <Segmented label="Paper GSM" cols={1}>
              {GSM_OPTIONS.map((opt) => (
                <Pill key={opt.value} active={paperQuality === opt.value} onClick={() => setPaperQuality(opt.value)} compact>
                  {opt.value}
                  {opt.surcharge > 0 && <span className="text-[9px] font-bold text-emerald-600 ml-1">+₹{opt.surcharge}</span>}
                </Pill>
              ))}
            </Segmented>
            <Segmented label="Sides" cols={1}>
              {SIDES_OPTIONS.map((opt) => (
                <Pill key={opt} active={printSides === opt} onClick={() => setPrintSides(opt)} compact>
                  {opt}
                </Pill>
              ))}
            </Segmented>
          </div>

          {/* Quantity */}
          <div>
            <div className="flex justify-between items-center mb-2.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Quantity (pieces)</label>
              <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-full px-2 py-1 shadow-2xs">
                <button
                  onClick={() => setQuantity((p) => Math.max(100, p - 100))}
                  aria-label="Decrease quantity"
                  className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center active:scale-90 transition-transform"
                >
                  <Minus className="w-3.5 h-3.5 text-slate-600" />
                </button>
                <span className="text-sm font-black text-slate-800 min-w-10 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity((p) => p + 100)}
                  aria-label="Increase quantity"
                  className="w-6 h-6 rounded-full bg-[#16A34A] flex items-center justify-center active:scale-90 transition-transform"
                >
                  <Plus className="w-3.5 h-3.5 text-white" />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2.5">
              {TIERS.map((tier) => {
                const active = quantity === tier.qty;
                return (
                  <button
                    key={tier.qty}
                    onClick={() => setQuantity(tier.qty)}
                    className={`relative border rounded-2xl p-2.5 text-center transition-all ${
                      active ? "bg-[#16A34A] border-[#16A34A] text-white shadow-md" : "bg-white border-slate-200 text-slate-600"
                    }`}
                  >
                    <span className="text-sm font-black block">{tier.qty}</span>
                    <span className={`text-[9px] font-semibold block ${active ? "text-white/80" : "text-slate-400"}`}>pcs</span>
                    <span
                      className={`text-[8px] font-extrabold rounded-md px-1 py-0.5 block mt-1.5 ${
                        active ? "bg-white/20 text-white" : "bg-emerald-50 text-emerald-600 border border-emerald-100"
                      }`}
                    >
                      {tier.discount}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Artwork upload (optional) */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Attach artwork (optional)</label>
              <button
                onClick={() => triggerPush("ℹ️ Keep text 3 mm inside edges. Colour CMYK, 300 DPI.")}
                className="text-[9px] font-bold text-[#16A34A] hover:underline"
              >
                Guidelines ⓘ
              </button>
            </div>
            {!uploadedFile && !isUploading ? (
              <button
                onClick={simulateUpload}
                className="w-full border-2 border-dashed border-slate-300 hover:border-[#16A34A] hover:bg-[#DCFCE7]/30 rounded-2xl p-4 bg-white text-center flex flex-col items-center justify-center transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center mb-2">
                  <UploadCloud className="w-5 h-5" />
                </div>
                <span className="text-xs font-extrabold text-slate-700 block">Tap to upload your design</span>
                <span className="text-[10px] text-slate-400 block mt-1">PDF, AI, CDR or PNG · up to 3 GB</span>
              </button>
            ) : isUploading ? (
              <div className="border border-slate-200 rounded-2xl p-4 bg-white">
                <div className="flex justify-between text-[11px] font-semibold text-slate-600 mb-2">
                  <span>Uploading artwork…</span>
                  <span className="font-bold">{uploadProgress}%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#16A34A] rounded-full transition-all duration-300" style={{ width: `${uploadProgress}%` }} />
                </div>
              </div>
            ) : (
              <div className="border border-emerald-200 rounded-2xl p-3 bg-emerald-50/60 flex items-center justify-between">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-white border border-emerald-100 flex items-center justify-center flex-none">
                    <FileCheck className="w-5 h-5 text-[#16A34A]" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-xs font-bold text-slate-700 block truncate">{uploadedFile?.name}</span>
                    <span className="text-[10px] text-emerald-600 font-semibold block mt-0.5">{uploadedFile?.size} · Pre-flight OK</span>
                  </div>
                </div>
                <button onClick={() => setUploadedFile(null)} className="text-slate-400 flex-none p-1" aria-label="Remove file">
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Price breakdown */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs">
            <div className="space-y-2 text-xs font-semibold text-slate-500">
              <div className="flex justify-between">
                <span>Prints ({quantity} × ₹{perCard.toFixed(2)})</span>
                <span className="text-slate-700">₹{itemTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>GST (18%)</span>
                <span className="text-slate-700">₹{gst.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Platform fee</span>
                <span className="text-slate-700">₹{platformFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery</span>
                <span>{shipping === 0 ? <span className="text-[#16A34A] font-bold">FREE</span> : `₹${shipping.toFixed(2)}`}</span>
              </div>
              <div className="border-t border-slate-100 pt-2.5 mt-1 flex justify-between text-sm font-black text-slate-900">
                <span>Total</span>
                <span>₹{grandTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sticky add-to-cart */}
        <div className="flex-none border-t border-slate-200 bg-white/95 backdrop-blur px-5 py-3">
          <button
            onClick={() => {
              addToCart({
                product,
                size: paperSize,
                finish: paperFinish,
                quality: paperQuality,
                sides: printSides,
                qty: quantity,
                unitPrice: perCard,
                file: uploadedFile ? uploadedFile.name : "artwork_upload.pdf",
              });
              onClose();
            }}
            className="w-full bg-[#16A34A] hover:bg-[#15803D] text-white text-sm font-bold py-3.5 rounded-2xl shadow-md flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
          >
            <ShoppingCart className="w-4 h-4" /> Add to Cart · ₹{grandTotal.toFixed(0)}
          </button>
        </div>
      </div>
    </div>
  );
}

// ---- helpers ---------------------------------------------------------------
function Segmented({ label, cols, children }: { label: string; cols: 1 | 2 | 3; children: React.ReactNode }) {
  const gridCols = cols === 3 ? "grid-cols-3" : cols === 2 ? "grid-cols-2" : "grid-cols-1";
  return (
    <div>
      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block mb-2">{label}</label>
      <div className={`grid gap-2 ${gridCols}`}>{children}</div>
    </div>
  );
}

function Pill({
  active,
  onClick,
  children,
  compact,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  compact?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-xl border text-xs font-bold transition-all text-center active:scale-[0.98] ${
        compact ? "py-2 px-2" : "py-2.5 px-3"
      } ${
        active
          ? "bg-[#DCFCE7] border-[#16A34A] text-[#166534] shadow-2xs"
          : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
      }`}
    >
      {children}
    </button>
  );
}
