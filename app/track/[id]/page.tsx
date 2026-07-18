import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { orders, getOrder } from "@/lib/data/orders";
import { OrderTrackerClient } from "@/components/track/order-tracker-client";

// Generate static routes at build time for all mock orders
export function generateStaticParams() {
  return orders.map((o) => ({ id: o.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const order = getOrder(id);
  if (!order) return { title: "Order Not Found — PrintEve" };
  return {
    title: `Track Order ${order.id} — PrintEve`,
    description: `Real-time printing and shipping status for order ${order.id}.`,
  };
}

export default async function OrderTrackerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const order = getOrder(id);

  if (!order) {
    notFound();
  }

  // Pass deep-copied data to avoid mutations during render lifecycle
  const serializedOrder = JSON.parse(JSON.stringify(order));

  return <OrderTrackerClient initialOrder={serializedOrder} orderId={id} />;
}
