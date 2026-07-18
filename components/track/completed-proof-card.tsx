"use client";

import * as React from "react";
import { ShieldCheck, Eye, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CompletedProofCardProps {
  proofPhotoUrl?: string;
  orderId: string;
}

export function CompletedProofCard({ proofPhotoUrl, orderId }: CompletedProofCardProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  if (!proofPhotoUrl) return null;

  return (
    <>
      <div className="bg-card border-border rounded-xl border p-6 shadow-xs flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-lg font-bold tracking-tight flex items-center gap-2">
            <Sparkles className="size-4.5 text-primary" />
            Vendor Print Proof
          </h3>
          <span className="bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-900/30 flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold">
            <ShieldCheck className="size-3.5" />
            QC Checked
          </span>
        </div>

        <p className="text-muted-foreground text-sm font-normal">
          This is an actual photo of your completed print batch uploaded by the vendor at our sorting hub for quality review.
        </p>

        {/* Thumbnail Preview */}
        <div className="relative group overflow-hidden rounded-lg border bg-muted aspect-16/10 cursor-pointer shadow-2xs"
             onClick={() => setIsOpen(true)}>
          <img
            src={proofPhotoUrl}
            alt={`Print proof for order ${orderId}`}
            className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Button variant="secondary" size="sm" className="pointer-events-none flex items-center gap-1.5 shadow-md">
              <Eye className="size-4" />
              Inspect Details
            </Button>
          </div>
        </div>

        <div className="text-xs text-muted-foreground bg-muted/40 rounded-lg p-3 border flex flex-col gap-1.5 font-normal">
          <span className="font-semibold text-foreground">Pre-shipment verification parameters:</span>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1">
            <span>• Paper Quality: Checked</span>
            <span>• Colour Calibration: CMYK Match</span>
            <span>• Trim Boundaries: 85x55mm Passed</span>
            <span>• Finish: Smooth Corners Passed</span>
          </div>
        </div>
      </div>

      {/* Custom light box modal overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-xs p-4 animate-fadeIn"
          onClick={() => setIsOpen(false)}
        >
          <div 
            className="relative max-w-4xl w-full bg-card rounded-xl overflow-hidden shadow-2xl flex flex-col border animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <div className="flex flex-col">
                <span className="font-serif text-lg font-bold">Print Proof Inspector</span>
                <span className="text-muted-foreground text-xs font-mono">{orderId} · Quality Check Output</span>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                className="size-9 rounded-full hover:bg-muted"
                onClick={() => setIsOpen(false)}
              >
                <X className="size-5" />
              </Button>
            </div>

            {/* Modal Image Area */}
            <div className="bg-black/95 p-2 flex items-center justify-center max-h-[70vh] min-h-[40vh] overflow-hidden">
              <img
                src={proofPhotoUrl}
                alt={`Full size print proof for ${orderId}`}
                className="max-h-[68vh] max-w-full object-contain"
              />
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t bg-muted/40 text-xs text-muted-foreground flex justify-between items-center">
              <span>Photo snapped automatically during post-cut packaging check.</span>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">100% Quality Audited</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
