"use client";

import * as React from "react";
import { Download, ShoppingCart, HelpCircle, XCircle, ArrowLeft, Loader2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { cancelOrder } from "@/lib/data/orders";

interface TrackActionsProps {
  orderId: string;
  status: string;
  onCancelSuccess: () => void;
}

export function TrackActions({ orderId, status, onCancelSuccess }: TrackActionsProps) {
  const [downloading, setDownloading] = React.useState(false);
  const [showCancelModal, setShowCancelModal] = React.useState(false);
  const [cancelling, setCancelling] = React.useState(false);

  // Invoice simulation
  const handleDownloadInvoice = () => {
    setDownloading(true);
    toast.loading("Generating PDF invoice...", { id: "invoice-toast" });

    setTimeout(() => {
      setDownloading(false);
      toast.success("Invoice PDF downloaded!", {
        id: "invoice-toast",
        description: `Tax invoice for order ${orderId} saved.`,
      });
      // Simulate file download
      const link = document.createElement("a");
      link.href = "#";
      link.setAttribute("download", `invoice-${orderId}.pdf`);
      // We don't actually navigate
    }, 1200);
  };

  // Reorder simulation
  const handleReorder = () => {
    toast.success("Specifications added to cart!", {
      description: "Redirecting to checkout shortly...",
    });
  };

  // Cancel order handler
  const handleCancelOrder = () => {
    setCancelling(true);
    setTimeout(() => {
      const success = cancelOrder(orderId);
      setCancelling(false);
      setShowCancelModal(false);
      if (success) {
        toast.success("Order cancelled successfully!", {
          description: "Refund has been processed.",
        });
        onCancelSuccess();
      } else {
        toast.error("Cancellation failed", {
          description: "This order is already in production and cannot be cancelled.",
        });
      }
    }, 1000);
  };

  // Cancel order button is only active when order is confirmed or pending
  const isCancellable = status === "PENDING" || status === "CONFIRMED";

  return (
    <>
      <Card className="shadow-xs overflow-hidden">
        <CardContent className="p-5 flex flex-col gap-3">
          <h4 className="font-semibold text-sm text-foreground">
            Order Management Actions
          </h4>

          <div className="flex flex-col gap-2">
            {/* Download Invoice */}
            <Button
              variant="outline"
              onClick={handleDownloadInvoice}
              disabled={downloading || status === "CANCELLED"}
              className="w-full justify-start gap-2 text-sm"
            >
              {downloading ? (
                <Loader2 className="animate-spin size-4 shrink-0" />
              ) : (
                <Download className="size-4 shrink-0" />
              )}
              Download Invoice (PDF)
            </Button>

            {/* Reorder */}
            <Button
              variant="outline"
              onClick={handleReorder}
              className="w-full justify-start gap-2 text-sm text-foreground hover:bg-muted"
            >
              <ShoppingCart className="size-4 shrink-0" />
              Reorder / Buy Again
            </Button>

            {/* Need Help */}
            <Button
              variant="outline"
              asChild
              className="w-full justify-start gap-2 text-sm"
            >
              <a href={`/contact?subject=Order%20Help&body=Hi,%20I%20need%20help%20with%20my%20order%20${orderId}`}>
                <HelpCircle className="size-4 shrink-0" />
                Contact Helpdesk
              </a>
            </Button>

            {/* Cancel Order */}
            {isCancellable && (
              <Button
                variant="ghost"
                onClick={() => setShowCancelModal(true)}
                className="w-full justify-start gap-2 text-sm text-destructive hover:bg-destructive/10 hover:text-destructive mt-1.5 border border-dashed border-destructive/20"
              >
                <XCircle className="size-4 shrink-0" />
                Cancel Print Order
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Cancel Order Modal overlay */}
      {showCancelModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-2xs p-4 animate-fadeIn"
          onClick={() => setShowCancelModal(false)}
        >
          <div 
            className="max-w-md w-full bg-card rounded-xl border shadow-xl p-6 flex flex-col gap-5 animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col gap-2">
              <h3 className="font-serif text-lg font-bold text-destructive flex items-center gap-2">
                <XCircle className="size-5 shrink-0" />
                Cancel Print Order
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed font-normal">
                Are you sure you want to cancel order <strong className="text-foreground">{orderId}</strong>?
                This action is irreversible and prints will not be run. A full refund of your payment will be returned.
              </p>
            </div>

            <div className="flex items-center gap-3 justify-end border-t pt-4">
              <Button 
                variant="outline" 
                onClick={() => setShowCancelModal(false)}
                disabled={cancelling}
              >
                Keep Order
              </Button>
              <Button 
                variant="destructive" 
                onClick={handleCancelOrder}
                disabled={cancelling}
                className="flex items-center gap-2"
              >
                {cancelling && <Loader2 className="animate-spin size-4" />}
                Yes, Cancel Order
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
