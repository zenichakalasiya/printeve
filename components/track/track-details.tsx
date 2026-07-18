"use client";

import * as React from "react";
import { Order } from "@/lib/data/orders";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { FileText, MapPin, CreditCard, ShoppingBag, Receipt } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface TrackDetailsProps {
  order: Order;
}

/**
 * Order summary cards — Items, Delivery, Receipt — rendered as a vertical
 * stack (in order) so they can sit in the right rail beside the timeline.
 * Returns a fragment so the parent flex column controls spacing.
 */
export function TrackDetails({ order }: TrackDetailsProps) {
  return (
    <>
      {/* Items in Order */}
      <Card className="shadow-xs">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <ShoppingBag className="size-4.5 text-muted-foreground" />
            Items in Order
          </CardTitle>
          <CardDescription>
            Configured options and uploaded assets.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          {order.items.map((item, idx) => (
            <div key={idx} className="flex flex-col gap-4">
              <div className="flex gap-4">
                <div className="relative size-20 rounded-lg overflow-hidden border bg-muted shrink-0 shadow-2xs">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div className="flex flex-col gap-0.5">
                    <h4 className="font-semibold text-sm text-foreground leading-tight">
                      {item.name}
                    </h4>
                    <span className="text-muted-foreground text-xs font-normal">
                      Category: {item.category}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground font-normal">
                      Qty: {item.qty} pcs
                    </span>
                    <span className="font-semibold text-foreground">
                      ₹{item.price.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Configurations */}
              <div className="bg-muted/40 rounded-lg border p-3.5 flex flex-col gap-2">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Selected Customisations
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {item.options.map((opt, oIdx) => (
                    <div key={oIdx} className="flex flex-col">
                      <span className="text-muted-foreground font-normal">{opt.label}</span>
                      <span className="text-foreground font-medium">{opt.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* File Attachment */}
              <div className="bg-background border border-dashed rounded-lg p-3 flex items-center justify-between gap-3 text-xs shadow-2xs">
                <div className="flex items-center gap-2 min-w-0">
                  <FileText className="size-4 text-primary shrink-0" />
                  <span className="font-mono text-muted-foreground truncate select-all">
                    {item.fileUrl}
                  </span>
                </div>
                <Badge variant="secondary" className="font-semibold text-[10px] rounded-full shrink-0">
                  Uploaded File
                </Badge>
              </div>

              {idx < order.items.length - 1 && <Separator />}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Delivery Details */}
      <Card className="shadow-xs">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <MapPin className="size-4.5 text-muted-foreground" />
            Delivery Details
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-1 text-sm font-normal text-muted-foreground">
          <span className="font-semibold text-foreground">
            {order.shippingAddress.name}
          </span>
          <span>{order.shippingAddress.line1}</span>
          {order.shippingAddress.line2 && (
            <span>{order.shippingAddress.line2}</span>
          )}
          <span>
            {order.shippingAddress.city}, {order.shippingAddress.state} -{" "}
            {order.shippingAddress.zip}
          </span>
          <span className="mt-2 text-xs">
            Phone: {order.shippingAddress.phone}
          </span>
        </CardContent>
      </Card>

      {/* Receipt & Billing Summary */}
      <Card className="shadow-xs">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Receipt className="size-4.5 text-muted-foreground" />
            Receipt Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 text-sm">
          <div className="flex flex-col gap-2 font-normal text-muted-foreground">
            <div className="flex justify-between">
              <span>Items Subtotal</span>
              <span className="text-foreground">₹{order.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Platform Fee</span>
              <span className="text-foreground">₹{order.platformFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Charges</span>
              <span className="text-foreground">
                {order.deliveryCharge === 0 ? (
                  <span className="text-emerald-600 font-semibold">FREE</span>
                ) : (
                  `₹${order.deliveryCharge.toFixed(2)}`
                )}
              </span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-emerald-600 font-medium">
                <span>Discounts Applied</span>
                <span>-₹{order.discount.toFixed(2)}</span>
              </div>
            )}
          </div>

          <Separator />

          <div className="flex justify-between font-bold text-base text-foreground">
            <span>Total Paid</span>
            <span className="font-serif">₹{order.total.toFixed(2)}</span>
          </div>

          <Separator />

          {/* Payment Meta */}
          <div className="flex items-start gap-2.5 text-xs text-muted-foreground font-normal">
            <CreditCard className="size-4 shrink-0 mt-0.5" />
            <div className="flex flex-col gap-0.5">
              <span className="text-foreground font-semibold">
                Paid via {order.paymentMethod}
              </span>
              <span className="font-mono truncate select-all">
                Transaction ID: {order.paymentId}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
