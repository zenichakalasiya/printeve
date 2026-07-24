"use client";

import React, { useState, useEffect } from "react";
import { useMobile } from "../../context";
import type { Product } from "../../products-data";
import {
  ShoppingCart,
  UploadCloud,
  CheckCircle,
  Plus,
  Minus,
  ArrowLeft,
  X,
  FileCheck,
  Star,
  Truck,
  ShieldCheck,
  Share2,
  Ruler,
  Layers,
  ChevronDown,
} from "lucide-react";
import { useRouter } from "next/navigation";

// ---- Configurator option catalog -------------------------------------------
// surcharge is charged per piece and reflected live in the price breakdown.
const SIZE_OPTIONS = ["Regular 3.5 × 2.0 in", "Square 2.56 in", "Slim 3.5 × 1.77 in"];
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

export default function ProductDetailClient({ product }: { product: Product }) {
  const router = useRouter();
  const { addToCart, cartItems } = useMobile();
  const { triggerPush } = useMobile();

  // Gallery
  const [activeImage, setActiveImage] = useState(0);

  // Configuration (shared between the detail view + the sheet)
  const [paperSize, setPaperSize] = useState(SIZE_OPTIONS[0]);
  const [paperFinish, setPaperFinish] = useState(FINISH_OPTIONS[0].value);
  const [paperQuality, setPaperQuality] = useState(GSM_OPTIONS[1].value);
  const [printSides, setPrintSides] = useState(SIDES_OPTIONS[0]);
  const [quantity, setQuantity] = useState(100);

  // File upload simulation
  const [uploadedFile, setUploadedFile] = useState<{ name: string; size: string } | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  // Accordion + sheet
  const [specsOpen, setSpecsOpen] = useState(false);
  const [configSheetOpen, setConfigSheetOpen] = useState(false);

  useEffect(() => {
    setUploadedFile(null);
    setUploadProgress(0);
    setIsUploading(false);
    setConfigSheetOpen(false);
    setActiveImage(0);
  }, [product.id]);

  const simulateUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setUploadedFile({ name: `artwork_${product.id}_final.pdf`, size: "12.4 MB" });
          triggerPush("📂 Artwork uploaded & pre-flight checks passed!");
          return 100;
        }
        return prev + 20;
      });
    }, 180);
  };

  // ---- Pricing ------------------------------------------------------------
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
    <div className="flex-1 flex flex-col relative animate-in fade-in duration-200">

      {/* Floating top controls */}
      <div className="absolute top-3 left-4 right-4 z-20 flex justify-between">
        <button
          onClick={() => router.back()}
          aria-label="Go back"
          className="w-9 h-9 rounded-full bg-white/85 backdrop-blur text-slate-800 flex items-center justify-center shadow-sm hover:bg-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2">
          <button
            onClick={() => triggerPush("🔗 Product link copied to clipboard!")}
            aria-label="Share"
            className="w-9 h-9 rounded-full bg-white/85 backdrop-blur text-slate-800 flex items-center justify-center shadow-sm hover:bg-white transition-colors"
          >
            <Share2 className="w-4.5 h-4.5" />
          </button>
          <button
            onClick={() => router.push("/mobile/cart")}
            aria-label="View cart"
            className="w-9 h-9 rounded-full bg-white/85 backdrop-blur text-slate-800 flex items-center justify-center shadow-sm hover:bg-white relative transition-colors"
          >
            <ShoppingCart className="w-4.5 h-4.5" />
            {cartItems.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#D9383A] text-white rounded-full text-[8px] font-black flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Hero gallery */}
      <div className="flex-none bg-slate-100">
        <div className="h-[290px] relative overflow-hidden">
          <img
            key={activeImage}
            src={product.gallery[activeImage]}
            alt={product.name}
            className="w-full h-full object-cover animate-in fade-in duration-300"
          />
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#FCFAF7] to-transparent" />
          {/* image dots */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {product.gallery.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all ${
                  i === activeImage ? "w-5 bg-[#16A34A]" : "w-1.5 bg-white/70"
                }`}
              />
            ))}
          </div>
        </div>
        {/* thumbnail strip */}
        <div className="flex gap-2 px-4 -mt-8 relative z-10 pb-1">
          {product.gallery.map((src, i) => (
            <button
              key={i}
              onClick={() => setActiveImage(i)}
              className={`w-14 h-14 rounded-xl overflow-hidden border-2 bg-white transition-all ${
                i === activeImage ? "border-[#16A34A] shadow-sm scale-105" : "border-white/80 opacity-80"
              }`}
            >
              <img src={src} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* Detail content */}
      <div className="px-4 pb-6 flex-1 flex flex-col mt-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="bg-[#DCFCE7] text-[#166534] text-[9px] font-extrabold uppercase px-2.5 py-1 rounded-full tracking-wide">
            {product.categoryLabel}
          </span>
          <span className="flex items-center gap-1 text-[10px] font-bold text-amber-600 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded-full">
            <Star className="w-3 h-3 fill-current" /> {product.rating}
            <span className="text-slate-400 font-semibold">({product.reviews})</span>
          </span>
        </div>

        <h1 className="text-[22px] font-black text-slate-900 leading-tight mt-2.5 tracking-tight">
          {product.name}
        </h1>
        <p className="text-xs text-slate-500 font-medium mt-1">{product.tagline}</p>

        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-2xl font-black text-slate-900">₹{product.price}</span>
          <span className="text-[11px] text-slate-400 font-semibold">/ 100 pcs onwards</span>
          <span className="ml-auto text-[10px] text-emerald-700 font-bold bg-emerald-50 border border-emerald-100 px-2 py-1 rounded-lg">
            Save up to 25%
          </span>
        </div>

        {/* Quick facts scroll row */}
        <div className="flex gap-2.5 overflow-x-auto scrollbar-none mt-4 pb-1 -mx-4 px-4">
          {[
            { icon: Layers, label: "Finish", value: product.finish },
            { icon: Ruler, label: "Print Area", value: product.size },
            { icon: Truck, label: "Delivery", value: product.deliveryEta },
            { icon: ShieldCheck, label: "Guarantee", value: "Pre-flight QC" },
          ].map((fact, i) => (
            <div
              key={i}
              className="flex-none w-[132px] bg-white border border-slate-200 rounded-2xl p-3 shadow-2xs"
            >
              <div className="w-7 h-7 rounded-lg bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center">
                <fact.icon className="w-4 h-4" />
              </div>
              <span className="text-[8px] text-slate-400 block font-bold uppercase tracking-wide mt-2">
                {fact.label}
              </span>
              <span className="text-[11px] font-extrabold text-slate-700 block leading-tight mt-0.5">
                {fact.value}
              </span>
            </div>
          ))}
        </div>

        {/* Description */}
        <div className="mt-5">
          <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">About this product</h3>
          <p className="text-[13px] text-slate-500 mt-2 leading-relaxed font-medium">{product.description}</p>
        </div>

        {/* Specs accordion */}
        <button
          onClick={() => setSpecsOpen((v) => !v)}
          className="mt-4 w-full flex items-center justify-between bg-white border border-slate-200 rounded-2xl px-4 py-3.5 shadow-2xs"
        >
          <span className="text-xs font-extrabold text-slate-700">Full specifications</span>
          <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${specsOpen ? "rotate-180" : ""}`} />
        </button>
        {specsOpen && (
          <div className="bg-white border-x border-b border-slate-200 rounded-b-2xl -mt-2 px-4 pt-4 pb-3 shadow-2xs animate-in fade-in slide-in-from-top-2 duration-200">
            {[
              ["Base finish", product.finish],
              ["Print area", product.size],
              ["Default GSM", "350 GSM Premium"],
              ["Colour mode", "CMYK · 300 DPI Offset"],
              ["Turnaround", product.deliveryEta],
            ].map(([k, v], i, arr) => (
              <div
                key={k}
                className={`flex justify-between py-2 text-xs ${i < arr.length - 1 ? "border-b border-slate-100" : ""}`}
              >
                <span className="text-slate-400 font-semibold">{k}</span>
                <span className="text-slate-700 font-bold">{v}</span>
              </div>
            ))}
          </div>
        )}

        {/* Quality guarantee */}
        <div className="mt-5">
          <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Print quality guarantee</h3>
          <div className="mt-2.5 space-y-2">
            {[
              "Free artwork pre-flight verification",
              "High-resolution 500 DPI offset production",
              "Secured, robust shipping packaging",
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2.5 bg-emerald-50/60 border border-emerald-100/70 rounded-xl px-3 py-2.5"
              >
                <CheckCircle className="w-4 h-4 text-[#16A34A] flex-none" />
                <span className="text-xs text-slate-600 font-semibold">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews summary */}
        <div className="mt-5 bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs flex items-center gap-4">
          <div className="text-center flex-none">
            <div className="text-2xl font-black text-slate-900">{product.rating}</div>
            <div className="flex items-center gap-0.5 mt-0.5 justify-center">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  className={`w-3 h-3 ${s <= Math.round(product.rating) ? "text-amber-400 fill-amber-400" : "text-slate-200 fill-slate-200"}`}
                />
              ))}
            </div>
            <div className="text-[9px] text-slate-400 font-semibold mt-1">{product.reviews} reviews</div>
          </div>
          <div className="flex-1 border-l border-slate-100 pl-4">
            <p className="text-[11px] text-slate-600 font-medium leading-relaxed italic">
              &ldquo;Colours came out crisp and the paper feels genuinely premium. Reorder incoming.&rdquo;
            </p>
            <span className="text-[9px] text-slate-400 font-bold block mt-1.5">— Verified buyer, Noida</span>
          </div>
        </div>
      </div>

      {/* Persistent bottom action bar */}
      <div className="sticky bottom-0 bg-white/95 backdrop-blur border-t border-slate-200 px-4 py-3 flex items-center justify-between gap-3 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] z-30">
        <div className="flex-none">
          <span className="text-[9px] text-slate-400 block font-bold uppercase tracking-wider">Est. total</span>
          <span className="text-lg font-black text-slate-900 leading-none">₹{grandTotal.toFixed(0)}</span>
          <span className="text-[10px] text-slate-400 font-semibold ml-1">/ {quantity} pcs</span>
        </div>
        <button
          onClick={() => setConfigSheetOpen(true)}
          className="flex-1 bg-[#16A34A] hover:bg-[#15803D] text-white text-sm font-bold py-3.5 px-4 rounded-2xl shadow-md flex items-center justify-center gap-1.5 active:scale-[0.98] transition-transform"
        >
          <UploadCloud className="w-4 h-4" /> Configure & Upload
        </button>
      </div>

      {/* Configurator sheet */}
      {configSheetOpen && (
        <div className="absolute inset-0 bg-black/60 z-40 flex flex-col justify-end animate-in fade-in duration-150">
          <div className="flex-1" onClick={() => setConfigSheetOpen(false)} />
          <div className="bg-[#FCFAF7] rounded-t-[28px] max-h-[88%] overflow-y-auto scrollbar-none pb-8 relative flex flex-col shadow-2xl animate-in slide-in-from-bottom duration-300">

            {/* Grabber + sticky header */}
            <div className="sticky top-0 bg-[#FCFAF7] z-10 px-5 pt-3 pb-3 border-b border-slate-100">
              <div className="w-10 h-1 bg-slate-300 rounded-full mx-auto mb-3" />
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-base font-black text-slate-900 tracking-tight">Configure your order</h2>
                  <p className="text-[10px] text-slate-400 font-semibold mt-0.5">{product.name}</p>
                </div>
                <button
                  onClick={() => setConfigSheetOpen(false)}
                  className="w-8 h-8 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center flex-none"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="px-5 pt-4 flex flex-col gap-5">

              {/* Size */}
              <Segmented label="Paper size & style" cols={1}>
                {SIZE_OPTIONS.map((opt) => (
                  <Pill key={opt} active={paperSize === opt} onClick={() => setPaperSize(opt)}>
                    {opt}
                  </Pill>
                ))}
              </Segmented>

              {/* Finish */}
              <Segmented label="Finish type" cols={2}>
                {FINISH_OPTIONS.map((opt) => (
                  <Pill key={opt.value} active={paperFinish === opt.value} onClick={() => setPaperFinish(opt.value)}>
                    {opt.value}
                    {opt.surcharge > 0 && <span className="block text-[9px] font-bold text-emerald-600 mt-0.5">+₹{opt.surcharge}/pc</span>}
                  </Pill>
                ))}
              </Segmented>

              {/* GSM + Sides */}
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

              {/* File upload */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Attach artwork file</label>
                  <button
                    onClick={() => triggerPush("ℹ️ Guidelines: Keep text 3mm inside edges. Colour CMYK, 300 DPI.")}
                    className="text-[9px] font-bold text-[#16A34A] hover:underline"
                  >
                    Guidelines ⓘ
                  </button>
                </div>

                {!uploadedFile && !isUploading ? (
                  <button
                    onClick={simulateUpload}
                    className="w-full border-2 border-dashed border-slate-300 hover:border-[#16A34A] hover:bg-[#DCFCE7]/30 rounded-2xl p-5 bg-white text-center cursor-pointer shadow-2xs flex flex-col items-center justify-center transition-colors"
                  >
                    <div className="w-11 h-11 rounded-full bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center mb-2">
                      <UploadCloud className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-extrabold text-slate-700 block">Tap to upload your design</span>
                    <span className="text-[10px] text-slate-400 block mt-1">PDF, AI, CDR or PNG · up to 3GB</span>
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
                    <button onClick={() => setUploadedFile(null)} className="text-slate-400 flex-none p-1">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Quantity */}
              <div>
                <div className="flex justify-between items-center mb-2.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Quantity (pieces)</label>
                  <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-full px-2 py-1 shadow-2xs">
                    <button
                      onClick={() => setQuantity((p) => Math.max(100, p - 100))}
                      className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center active:scale-90 transition-transform"
                    >
                      <Minus className="w-3.5 h-3.5 text-slate-600" />
                    </button>
                    <span className="text-sm font-black text-slate-800 min-w-10 text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity((p) => p + 100)}
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
                          active
                            ? "bg-[#16A34A] border-[#16A34A] text-white shadow-md"
                            : "bg-white border-slate-200 text-slate-600"
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

              {/* Save to cart */}
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
                    file: uploadedFile ? uploadedFile.name : "artwork_upload_final.pdf",
                  });
                  setConfigSheetOpen(false);
                  router.push("/mobile/cart");
                }}
                className="w-full bg-[#16A34A] hover:bg-[#15803D] text-white text-sm font-bold py-4 rounded-2xl shadow-md flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
              >
                <ShoppingCart className="w-4 h-4" /> Add to Cart · ₹{grandTotal.toFixed(0)}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ---- Small presentational helpers ------------------------------------------
function Segmented({
  label,
  cols,
  children,
}: {
  label: string;
  cols: 1 | 2;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block mb-2">{label}</label>
      <div className={`grid gap-2 ${cols === 2 ? "grid-cols-2" : "grid-cols-1"}`}>{children}</div>
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
