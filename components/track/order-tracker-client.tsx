"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowLeft, ChevronRight, PackageCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getOrder, Order } from "@/lib/data/orders";
import { TrackHeader } from "@/components/track/track-header";
import { TrackTimeline } from "@/components/track/track-timeline";
import { ArtworkHoldCard } from "@/components/track/artwork-hold-card";
import { CompletedProofCard } from "@/components/track/completed-proof-card";
import { TrackDetails } from "@/components/track/track-details";
import { TrackActions } from "@/components/track/track-actions";

interface OrderTrackerClientProps {
  initialOrder: Order;
  orderId: string;
}

export function OrderTrackerClient({ initialOrder, orderId }: OrderTrackerClientProps) {
  const [order, setOrder] = React.useState<Order>(initialOrder);

  // Reload order details when state is mutated (cancel or upload action triggers)
  const reloadOrder = React.useCallback(() => {
    const matchedOrder = getOrder(orderId);
    if (matchedOrder) {
      setOrder(JSON.parse(JSON.stringify(matchedOrder)));
    }
  }, [orderId]);

  const displayStatus = order.status;
  const isHold = !!order.holdReason;

  return (
    <div className="bg-background min-h-dvh">
      {/* Breadcrumbs */}
      <div className="border-b">
        <nav
          aria-label="Breadcrumb"
          className="text-muted-foreground mx-auto flex max-w-7xl items-center gap-1.5 px-4 py-4 text-sm sm:px-6 lg:px-8"
        >
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>
          <ChevronRight className="size-3.5 opacity-60" />
          <Link href="/track" className="hover:text-foreground">
            Track Order
          </Link>
          <ChevronRight className="size-3.5 opacity-60" />
          <span className="text-foreground font-medium font-mono">{order.id}</span>
        </nav>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Header navigation bar */}
        <div className="flex items-center gap-2 mb-8">
          <Button variant="ghost" size="sm" asChild className="px-2">
            <Link href="/track" className="text-muted-foreground hover:text-foreground text-xs flex items-center">
              <ArrowLeft className="mr-1.5 size-4" />
              Back to Tracking
            </Link>
          </Button>
        </div>

        {/* Dashboard Grid */}
        <div className="grid gap-8 lg:grid-cols-12">
          {/* LEFT Column: Status, Hold Action, Proof Photo, Timeline */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Header details block */}
            <TrackHeader order={order} />

            {/* Design Pre-flight hold alert */}
            {isHold && order.holdReason && (
              <ArtworkHoldCard
                orderId={order.id}
                holdReason={order.holdReason}
                onUploadSuccess={reloadOrder}
              />
            )}

            {/* Completed Print Proof photograph */}
            {(displayStatus === "READY" || displayStatus === "SHIPPED" || displayStatus === "DELIVERED") && (
              <CompletedProofCard
                proofPhotoUrl={order.proofPhoto}
                orderId={order.id}
              />
            )}

            {/* Interactive Timeline Stepper */}
            <TrackTimeline
              timeline={order.timeline}
              currentStatus={order.status}
              holdReason={order.holdReason}
            />
          </div>

          {/* RIGHT Column: Order summary cards (in order), then actions */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Items, Delivery & Receipt — stacked vertically */}
            <TrackDetails order={order} />

            {/* Quick Actions Panel */}
            <TrackActions
              orderId={order.id}
              status={order.status}
              onCancelSuccess={reloadOrder}
            />

            {/* Trust badge card */}
            <div className="bg-muted/30 border border-dashed rounded-xl p-5 flex items-start gap-3.5 font-normal text-muted-foreground text-xs leading-relaxed">
              <PackageCheck className="size-5 text-primary shrink-0 mt-0.5" />
              <div className="flex flex-col gap-1">
                <span className="font-semibold text-foreground">PrintEve Direct Delivery Guarantee</span>
                <span>We ensure high-density offset printing, anti-snag die cutting, and zero-defect checks on every batch. If you are not satisfied, raise a ticket for a free reprint.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
