"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Order } from "@/lib/data/orders";
import { Calendar, Clipboard, Check, ExternalLink, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

interface TrackHeaderProps {
  order: Order;
}

export function TrackHeader({ order }: TrackHeaderProps) {
  const [copied, setCopied] = React.useState(false);

  const getStatusDetails = (status: string, holdReason?: string) => {
    if (holdReason) {
      return {
        label: "On Hold",
        description: "Action Required: Artwork Pre-flight issue detected.",
        color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-900/50",
      };
    }

    switch (status) {
      case "PENDING":
        return {
          label: "Payment Pending",
          description: "Awaiting payment verification.",
          color: "bg-slate-100 text-slate-800 dark:bg-slate-900/30 dark:text-slate-400 border-slate-200 dark:border-slate-800",
        };
      case "CONFIRMED":
        return {
          label: "Confirmed",
          description: "Artwork verified. Queued for print run.",
          color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-900/50",
        };
      case "PRINTING":
        return {
          label: "In Production",
          description: "Your files are actively printing and cutting.",
          color: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-900/50",
        };
      case "READY":
        return {
          label: "Ready for Dispatch",
          description: "Quality passed. Handing over to courier.",
          color: "bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-400 border-teal-200 dark:border-teal-900/50",
        };
      case "SHIPPED":
        return {
          label: "Shipped",
          description: "Order is in transit with courier partner.",
          color: "bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-400 border-sky-200 dark:border-sky-900/50",
        };
      case "DELIVERED":
        return {
          label: "Delivered",
          description: "Prints successfully delivered.",
          color: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900/50",
        };
      case "CANCELLED":
        return {
          label: "Cancelled",
          description: "Order has been cancelled.",
          color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-900/50",
        };
      case "REFUNDED":
        return {
          label: "Refunded",
          description: "Payment fully returned.",
          color: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400 border-purple-200 dark:border-purple-900/50",
        };
      default:
        return {
          label: status,
          description: "Order status updated.",
          color: "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-400 border-slate-200 dark:border-slate-700",
        };
    }
  };

  const statusInfo = getStatusDetails(order.status, order.holdReason);

  const copyToClipboard = () => {
    if (!order.trackingId) return;
    navigator.clipboard.writeText(order.trackingId);
    setCopied(true);
    toast.success("Tracking ID copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const getEstimatedText = () => {
    if (order.status === "DELIVERED") {
      const delEvent = order.timeline.find((t) => t.status === "DELIVERED");
      if (delEvent && delEvent.date) {
        return `Delivered on ${new Date(delEvent.date).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}`;
      }
      return "Delivered";
    }
    if (order.status === "CANCELLED") {
      return "Delivery Cancelled";
    }
    if (order.status === "REFUNDED") {
      return "Refund Complete";
    }
    return `Estimated Delivery: ${order.estimatedDelivery}`;
  };

  return (
    <div className="bg-card border-border rounded-xl border p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="text-muted-foreground font-mono text-sm uppercase">
            Order ID:
          </span>
          <span className="font-serif text-xl font-bold tracking-tight">
            {order.id}
          </span>
          <Badge className={`border font-semibold rounded-full px-3 py-0.5 text-xs ${statusInfo.color}`}>
            {statusInfo.label}
          </Badge>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <Calendar className="text-muted-foreground size-4" />
          <span className="font-medium text-foreground">
            {getEstimatedText()}
          </span>
          {order.status !== "DELIVERED" && order.status !== "CANCELLED" && order.status !== "REFUNDED" && (
            <span className="text-muted-foreground text-xs">
              (Processing on schedule)
            </span>
          )}
        </div>

        <p className="text-muted-foreground text-sm font-normal">
          {statusInfo.description}
        </p>
      </div>

      {order.trackingId && (
        <div className="bg-muted/40 border border-dashed rounded-lg p-4 flex flex-col gap-2 shrink-0 md:max-w-xs w-full md:w-auto">
          <span className="text-muted-foreground text-xs font-semibold uppercase tracking-wider">
            Logistics Handoff
          </span>
          <div className="flex items-center justify-between gap-3">
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground">
                Carrier: {order.trackingCarrier}
              </span>
              <span className="font-mono text-sm font-semibold select-all">
                {order.trackingId}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Button
                variant="ghost"
                size="icon"
                className="size-8"
                onClick={copyToClipboard}
                title="Copy tracking ID"
              >
                {copied ? <Check className="size-4 text-emerald-600" /> : <Clipboard className="size-4" />}
              </Button>
              {order.trackingLink && (
                <Button
                  variant="outline"
                  size="icon"
                  className="size-8"
                  asChild
                  title="Track on courier site"
                >
                  <a href={order.trackingLink} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="size-4" />
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
