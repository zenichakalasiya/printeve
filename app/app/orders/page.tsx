"use client";

import React, { useState } from "react";
import { useApp, ORDER_STEPS } from "../context";
import type { Order } from "../context";
import {
  ClipboardList,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  UserCheck,
  Printer,
  ShieldCheck,
  Truck,
  PackageCheck,
  MapPin,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { useRouter } from "next/navigation";

const serif = { fontFamily: "var(--font-fraunces)" } as const;
const FOREST = "#14432A";

const STEP_ICONS = [CheckCircle2, UserCheck, Printer, ShieldCheck, Truck, PackageCheck];
const STEP_DESC = [
  "We’ve received your order",
  "A verified print partner picked it up",
  "Your job is on the press",
  "Pre-flight & quality checks passed",
  "On the way to your address",
  "Enjoy your premium prints!",
];

export default function AppOrders() {
  const router = useRouter();
  const { orders } = useApp();
  const [trackingId, setTrackingId] = useState<string | null>(null);

  const tracked = orders.find((o) => o.id === trackingId);
  if (tracked) return <TrackView order={tracked} onBack={() => setTrackingId(null)} />;

  return (
    <div className="flex-1 flex flex-col animate-in fade-in duration-200">
      {/* Header */}
      <div className="px-4 pt-3 pb-3 bg-[#FCFAF7] border-b border-slate-100 sticky top-0 z-30">
        <h1 className="text-2xl font-black" style={{ ...serif, color: FOREST }}>
          My Orders
        </h1>
        <span className="text-[11px] text-slate-400 font-semibold">
          {orders.length > 0 ? `${orders.length} order${orders.length > 1 ? "s" : ""}` : "Track every job live"}
        </span>
      </div>

      {orders.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
          <div className="w-24 h-24 rounded-full bg-[#DCFCE7]/60 flex items-center justify-center">
            <ClipboardList className="w-11 h-11 text-[#16A34A]" strokeWidth={1.6} />
          </div>
          <h2 className="text-lg font-black mt-5" style={{ ...serif, color: FOREST }}>
            No orders yet
          </h2>
          <p className="text-xs text-slate-400 font-medium mt-1.5 leading-relaxed">
            Your next great print is waiting. Place your first order — it&apos;ll show up here with live tracking.
          </p>
          <button
            onClick={() => router.push("/app")}
            className="mt-6 bg-[#16A34A] hover:bg-[#15803D] text-white text-xs font-bold py-3 px-7 rounded-2xl shadow-md flex items-center gap-1.5 active:scale-[0.98] transition-transform"
          >
            Start an Order <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="p-4 space-y-3">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} onTrack={() => setTrackingId(order.id)} />
          ))}
        </div>
      )}
    </div>
  );
}

function OrderCard({ order, onTrack }: { order: Order; onTrack: () => void }) {
  const delivered = order.statusIndex >= ORDER_STEPS.length - 1;
  const pieces = order.items.reduce((a, i) => a + i.qty, 0);
  return (
    <button
      onClick={onTrack}
      className="w-full text-left bg-white border border-slate-200 rounded-2xl p-3.5 shadow-2xs active:scale-[0.99] transition-transform"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-[13px] font-black text-[#14432A]">#{order.id}</span>
          <span className="text-[10px] text-slate-400 font-semibold">· {order.placedAt}</span>
        </div>
        <span
          className={`text-[9px] font-black uppercase tracking-wide px-2 py-1 rounded-md ${
            delivered ? "bg-[#DCFCE7] text-[#166534]" : "bg-amber-50 text-amber-700 border border-amber-100"
          }`}
        >
          {ORDER_STEPS[order.statusIndex]}
        </span>
      </div>

      {/* thumbnails */}
      <div className="flex items-center gap-2 mt-3">
        <div className="flex -space-x-2">
          {order.items.slice(0, 3).map((it) => (
            <div key={it.id} className="w-10 h-10 rounded-xl border-2 border-white overflow-hidden bg-slate-100 shadow-sm">
              <img src={it.product.image} alt={it.product.name} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[12px] font-bold text-slate-700 truncate">
            {order.items[0]?.product.name}
            {order.items.length > 1 ? ` + ${order.items.length - 1} more` : ""}
          </p>
          <p className="text-[10px] text-slate-400 font-semibold">{pieces} pcs · ₹{order.total.toFixed(0)}</p>
        </div>
        <span className="flex items-center gap-0.5 text-[11px] font-extrabold text-[#16A34A] flex-none">
          Track <ChevronRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </button>
  );
}

function TrackView({ order, onBack }: { order: Order; onBack: () => void }) {
  const { advanceOrder, triggerPush } = useApp();
  const delivered = order.statusIndex >= ORDER_STEPS.length - 1;
  const pieces = order.items.reduce((a, i) => a + i.qty, 0);

  const simulate = () => {
    if (delivered) return;
    advanceOrder(order.id);
    triggerPush(`📦 ${order.id}: ${STEP_DESC[order.statusIndex + 1]}`);
  };

  return (
    <div className="flex-1 flex flex-col animate-in fade-in slide-in-from-right-4 duration-200">
      {/* Header */}
      <div className="px-4 py-3 bg-[#FCFAF7] border-b border-slate-100 sticky top-0 z-30 flex items-center gap-3">
        <button onClick={onBack} aria-label="Back" className="p-1 rounded-lg hover:bg-slate-100">
          <ArrowLeft className="w-5 h-5 text-[#14432A]" />
        </button>
        <div>
          <h1 className="text-lg font-black leading-none" style={{ ...serif, color: FOREST }}>
            Track Order
          </h1>
          <span className="text-[10px] text-slate-400 font-semibold">#{order.id} · {pieces} pcs</span>
        </div>
      </div>

      <div className="flex-1 p-4 space-y-4">
        {/* Status hero */}
        <div className="rounded-2xl p-4 relative overflow-hidden" style={{ background: "linear-gradient(135deg,#0f3d24,#17683a)" }}>
          <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-white/10 blur-2xl" />
          <div className="relative">
            <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest">
              {delivered ? "Completed" : "In progress"}
            </span>
            <h2 className="text-xl font-black text-white mt-1" style={serif}>
              {ORDER_STEPS[order.statusIndex]}
            </h2>
            <p className="text-[12px] text-white/70 font-medium mt-0.5">{STEP_DESC[order.statusIndex]}</p>
            <div className="flex items-center gap-1.5 mt-3 text-[11px] text-white/80 font-semibold">
              <Truck className="w-3.5 h-3.5" />
              {delivered ? "Delivered to " : "Arriving at "}
              {order.address}
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs">
          <h3 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wide mb-3">Progress</h3>
          <div className="relative">
            {ORDER_STEPS.map((step, i) => {
              const Icon = STEP_ICONS[i];
              const done = i < order.statusIndex;
              const current = i === order.statusIndex;
              const last = i === ORDER_STEPS.length - 1;
              return (
                <div key={step} className="flex gap-3 relative">
                  {/* connector */}
                  {!last && (
                    <span
                      className={`absolute left-[15px] top-8 bottom-0 w-0.5 ${done ? "bg-[#16A34A]" : "bg-slate-200"}`}
                    />
                  )}
                  <div
                    className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center flex-none ${
                      done
                        ? "bg-[#16A34A] text-white"
                        : current
                          ? "bg-[#DCFCE7] text-[#16A34A] ring-4 ring-[#16A34A]/15"
                          : "bg-slate-100 text-slate-300"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className={`pb-6 ${last ? "pb-0" : ""}`}>
                    <p className={`text-[13px] font-bold leading-tight ${done || current ? "text-[#14432A]" : "text-slate-400"}`}>
                      {step}
                    </p>
                    <p className="text-[10.5px] text-slate-400 font-medium mt-0.5">{STEP_DESC[i]}</p>
                    {current && !delivered && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#16A34A] mt-1">
                        <Sparkles className="w-3 h-3" /> Happening now
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Order summary */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs">
          <h3 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wide mb-3">Order summary</h3>
          <div className="space-y-2.5">
            {order.items.map((it) => (
              <div key={it.id} className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl overflow-hidden bg-slate-100 flex-none">
                  <img src={it.product.image} alt={it.product.name} className="w-full h-full object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[12.5px] font-bold text-[#14432A] truncate">{it.product.name}</p>
                  <p className="text-[10px] text-slate-400 font-semibold">{it.qty} pcs · {it.finish}</p>
                </div>
                <span className="text-[12px] font-black text-[#14432A]">₹{(it.unitPrice * it.qty).toFixed(0)}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-slate-100 mt-3 pt-3 flex justify-between items-center">
            <span className="flex items-center gap-1.5 text-[11px] text-slate-500 font-semibold">
              <MapPin className="w-3.5 h-3.5 text-[#16A34A]" /> {order.address}
            </span>
            <span className="text-sm font-black text-[#14432A]">₹{order.total.toFixed(0)}</span>
          </div>
        </div>
      </div>

      {/* Sticky simulate/advance */}
      <div className="sticky bottom-0 bg-white/95 backdrop-blur border-t border-slate-200 px-4 py-3 z-20">
        {delivered ? (
          <div className="w-full bg-[#DCFCE7] text-[#166534] py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2">
            <PackageCheck className="w-4.5 h-4.5" /> Delivered — thanks for printing with us!
          </div>
        ) : (
          <button
            onClick={simulate}
            className="w-full bg-[#16A34A] hover:bg-[#15803D] text-white text-sm font-bold py-3.5 rounded-2xl shadow-md flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
          >
            <Sparkles className="w-4 h-4" /> Simulate next update
          </button>
        )}
      </div>
    </div>
  );
}
