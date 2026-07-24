"use client";

import React, { useState } from "react";
import { useMobile } from "../context";
import {
  FileCheck,
  CheckCircle,
  Truck,
  ArrowLeft,
  X,
  Play
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function MobileTracking() {
  const router = useRouter();
  const {
    orderId,
    orderStatusIndex,
    setOrderStatusIndex,
    triggerPush
  } = useMobile();

  const [proofModalOpen, setProofModalOpen] = useState(false);

  const orderSteps = [
    { title: "Order Confirmed", description: "Payment approved, files processing", time: "11:32 AM" },
    { title: "Assigned to Print Partner", description: "Allocated to PrimePress Noida", time: "11:35 AM" },
    { title: "In Production", description: "Printing and cutting in progress", time: "11:38 AM" },
    { title: "Quality Checked", description: "Printer uploaded proof verification", time: "Pending" },
    { title: "Dispatched", description: "Handed to Shadowfax Express", time: "Pending" },
    { title: "Delivered", description: "Arrived at your doorstep", time: "Pending" }
  ];

  // Mobile fallback simulation controls
  const advanceOrderStatus = () => {
    if (orderStatusIndex < orderSteps.length - 1) {
      const nextIndex = orderStatusIndex + 1;
      setOrderStatusIndex(nextIndex);
      
      const statusAlerts = [
        "Order Confirmed",
        "Print Partner has accepted the job",
        "Your order is now on the printing press",
        "📸 Print partner uploaded proof! Click VIEW PROOF.",
        "🚚 Order dispatched from printer vendor",
        "🏡 Delivered! Enjoy your premium prints."
      ];
      
      triggerPush(`Status Update: ${statusAlerts[nextIndex]}`);
    }
  };

  return (
    <div className="flex-1 flex flex-col animate-in fade-in duration-200">
      
      {/* Header title */}
      <div className="px-4 py-3 bg-[#FCFAF7] border-b border-slate-100 sticky top-0 z-30 flex items-center gap-3">
        <button onClick={() => router.push("/mobile")} className="p-1 rounded-lg">
          <ArrowLeft className="w-5 h-5 text-slate-700" />
        </button>
        <h1 className="text-base font-extrabold text-slate-800 font-serif">Track Order</h1>
      </div>

      <div className="p-4 space-y-4 flex-1 overflow-y-auto pb-10">
        
        {/* Status header summary */}
        <div className="bg-[#DCFCE7]/40 border border-[#16A34A]/10 rounded-2xl p-4 flex justify-between items-center">
          <div>
            <span className="text-[9px] text-[#16A34A] font-extrabold uppercase block tracking-wider">Order ID</span>
            <span className="text-sm font-black text-slate-800 block mt-0.5">{orderId}</span>
            <span className="text-[10px] text-slate-500 block mt-1">Allocation: PrimePress Noida</span>
          </div>
          <div className="bg-[#16A34A] text-white font-extrabold text-xs py-1.5 px-3 rounded-lg shadow-xs">
            {orderSteps[orderStatusIndex].title}
          </div>
        </div>

        {/* Mobile View local simulator helper */}
        <div className="block lg:hidden bg-slate-100 border border-slate-200 rounded-2xl p-3.5 space-y-2">
          <span className="text-[9px] text-slate-400 font-extrabold uppercase block">Mobile Preview Simulator</span>
          <p className="text-[10px] text-slate-500 font-medium">Use this button on phone screens to advance tracking status.</p>
          <button
            onClick={advanceOrderStatus}
            disabled={orderStatusIndex >= orderSteps.length - 1}
            className="w-full bg-[#16A34A] text-white text-[11px] font-bold py-2 rounded-xl flex items-center justify-center gap-1 disabled:opacity-40"
          >
            <Play className="w-3.5 h-3.5 fill-current" /> Advance Delivery Status
          </button>
        </div>

        {/* Print Proof Photo CTA */}
        {orderStatusIndex >= 3 && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3 flex justify-between items-center shadow-xs">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-white border border-emerald-100 flex items-center justify-center text-[#16A34A]">
                <FileCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-black text-slate-800 block">Artwork Proof Ready</span>
                <span className="text-[9px] text-slate-400 block mt-0.5">Printer uploaded completed proof</span>
              </div>
            </div>
            <button
              onClick={() => setProofModalOpen(true)}
              className="bg-[#16A34A] text-white text-[10px] font-bold py-1.5 px-3.5 rounded-lg shadow-xs"
            >
              VIEW PROOF
            </button>
          </div>
        )}

        {/* Step status timeline list */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
          <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-4">Delivery Progress</h3>
          
          <div className="relative pl-6 space-y-6">
            
            {/* Visual Timeline vertical bar */}
            <div className="absolute top-1.5 left-2.5 bottom-1.5 w-0.5 bg-slate-100">
              <div 
                className="w-full bg-[#16A34A] transition-all duration-500" 
                style={{ height: `${(orderStatusIndex / (orderSteps.length - 1)) * 100}%` }}
              ></div>
            </div>

            {orderSteps.map((step, idx) => {
              const isCompleted = idx < orderStatusIndex;
              const isActive = idx === orderStatusIndex;
              return (
                <div key={idx} className="relative flex justify-between items-start">
                  
                  {/* Dot indicator */}
                  <span className={`absolute -left-5.5 top-1.5 w-3.5 h-3.5 rounded-full border-2 transition-all ${
                    isCompleted 
                      ? "bg-[#16A34A] border-[#16A34A] shadow-xs" 
                      : isActive 
                        ? "bg-white border-[#16A34A] ring-4 ring-[#16A34A]/20 scale-110" 
                        : "bg-white border-slate-300"
                  }`}>
                    {isCompleted && (
                      <span className="absolute inset-0 bg-white/20 rounded-full animate-ping"></span>
                    )}
                  </span>

                  <div className="min-w-0">
                    <h4 className={`text-xs font-bold leading-none ${isActive ? "text-slate-800" : isCompleted ? "text-slate-500" : "text-slate-400"}`}>
                      {step.title}
                    </h4>
                    <p className={`text-[10px] mt-1 leading-normal ${isActive ? "text-slate-500 font-medium" : "text-slate-400"}`}>
                      {step.description}
                    </p>
                  </div>

                  <span className="text-[9px] text-slate-400 font-bold whitespace-nowrap">{step.time}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Print Partner anonymized information */}
        <div className="bg-slate-50 border border-slate-200/50 rounded-2xl p-3 text-[10px] text-slate-400 leading-relaxed font-medium">
          🔒 <strong className="text-slate-500 font-bold">Privacy Disclosure:</strong> In adherence to PrintEve's security protocol, your profile details are fully anonymized. Only order specifications and area locations are visible to printers.
        </div>

      </div>

      {/* PRINTER PROOF IMAGE MODAL */}
      {proofModalOpen && (
        <div className="absolute inset-0 bg-black/75 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-[90%] w-full overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-200">
            
            {/* Close button */}
            <button 
              onClick={() => setProofModalOpen(false)}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center"
            >
              <X className="w-4.5 h-4.5" />
            </button>

            <div className="p-5">
              <span className="text-[9px] font-extrabold text-[#16A34A] bg-[#DCFCE7] px-2 py-0.5 rounded-full uppercase tracking-wider">Proof Approved</span>
              <h3 className="text-sm font-black text-slate-800 mt-2 font-serif">Printer Proof Mockup</h3>
              <p className="text-[10px] text-slate-400 mt-1">This is a photo uploaded directly by the printer partner from the production press.</p>
            </div>

            {/* Photo representation */}
            <div className="h-56 bg-slate-200 relative border-y border-slate-100 flex items-center justify-center overflow-hidden">
              <img src="https://images.unsplash.com/photo-1589156280159-27698a70f29e?w=500&auto=format&fit=crop&q=60" alt="Proof" className="w-full h-full object-cover" />
              <div className="absolute top-3 left-3 bg-[#16A34A]/80 text-white text-[9px] font-bold py-1 px-2.5 rounded-lg">
                PASSED QC
              </div>
            </div>

            <div className="p-4 flex gap-2">
              <button 
                onClick={() => {
                  setProofModalOpen(false);
                  advanceOrderStatus();
                  triggerPush("✅ Proof confirmed! Order dispatched process started.");
                }}
                className="flex-1 bg-[#16A34A] text-white text-xs font-bold py-2.5 rounded-xl hover:bg-[#15803D]"
              >
                APPROVE & SHIP
              </button>
              <button 
                onClick={() => {
                  setProofModalOpen(false);
                  triggerPush("⚠️ Discrepancy logged. Customer support agent will connect.");
                }}
                className="bg-slate-100 text-slate-700 text-xs font-bold py-2.5 px-4 rounded-xl"
              >
                REPORT ISSUE
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
