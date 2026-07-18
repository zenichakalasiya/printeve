import { products } from "./products";

export type OrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "PRINTING"
  | "READY"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED"
  | "REFUNDED";

export type OrderItem = {
  slug: string;
  name: string;
  category: string;
  qty: number;
  price: number;
  image: string;
  options: { label: string; value: string }[];
  fileUrl: string;
};

export type Address = {
  name: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
};

export type TimelineEvent = {
  status: OrderStatus | "HOLD";
  label: string;
  description: string;
  date: string;
  isCompleted: boolean;
};

export type Order = {
  id: string;
  date: string;
  status: OrderStatus;
  estimatedDelivery: string;
  items: OrderItem[];
  proofPhoto?: string;
  trackingCarrier?: string;
  trackingId?: string;
  trackingLink?: string;
  shippingAddress: Address;
  paymentMethod: string;
  paymentId: string;
  platformFee: number;
  deliveryCharge: number;
  discount: number;
  subtotal: number;
  total: number;
  timeline: TimelineEvent[];
  holdReason?: string; // used when files need attention
};

// Mock product design proof photos
const PROOF_PHOTOS = {
  businessCard: "https://images.unsplash.com/photo-1589254065878-42c9da997008?w=800&auto=format&fit=crop&q=60", // stack of cards on a table
  stickers: "https://images.unsplash.com/photo-1572375995501-4b0894dbe054?w=800&auto=format&fit=crop&q=60", // sheets of cut stickers
};

export const orders: Order[] = [
  {
    id: "ORD-9821",
    date: "2026-06-16T10:30:00Z",
    status: "DELIVERED",
    estimatedDelivery: "June 20, 2026",
    items: [
      {
        slug: "rounded-corner-business-card",
        name: "Rounded Corner Visiting Cards",
        category: "Marketing Materials",
        qty: 500,
        price: 1200,
        image: "https://picsum.photos/seed/rounded-card/900/700",
        fileUrl: "visiting_card_final_v2_cmyk.pdf",
        options: [
          { label: "Print Location", value: "Front & Back" },
          { label: "Paper Size", value: 'Standard 3.5" × 2"' },
          { label: "Quality", value: "Premium 350 GSM" },
          { label: "Finish", value: "Matte Laminate" },
        ],
      },
    ],
    proofPhoto: PROOF_PHOTOS.businessCard,
    trackingCarrier: "Delhivery",
    trackingId: "DH8492048194",
    trackingLink: "https://www.delhivery.com/track/package/DH8492048194",
    shippingAddress: {
      name: "Zeni Chakalasiya",
      line1: "402, Elite Residency",
      line2: "Link Road, Andheri West",
      city: "Mumbai",
      state: "Maharashtra",
      zip: "400053",
      phone: "+91 98765 43210",
    },
    paymentMethod: "Razorpay UPI (Google Pay)",
    paymentId: "pay_Rzp98716254",
    platformFee: 49,
    deliveryCharge: 0, // Free over threshold
    discount: 15,
    subtotal: 1200,
    total: 1234, // 1200 + 49 - 15
    timeline: [
      {
        status: "PENDING",
        label: "Payment Initiated",
        description: "Payment checkout session started via Razorpay.",
        date: "2026-06-16T10:28:11Z",
        isCompleted: true,
      },
      {
        status: "CONFIRMED",
        label: "Order Confirmed",
        description: "Payment confirmed successfully. High-res design assets verified for production.",
        date: "2026-06-16T10:30:00Z",
        isCompleted: true,
      },
      {
        status: "PRINTING",
        label: "In Production",
        description: "Print Job assigned and accepted by verified printer (Mumbai Central Hub). Offset press running.",
        date: "2026-06-17T09:15:00Z",
        isCompleted: true,
      },
      {
        status: "READY",
        label: "Quality Passed & Packed",
        description: "Product printing, lamination, and rounded-corner die-cutting completed. Final proof photograph verified by Quality Team.",
        date: "2026-06-18T14:45:00Z",
        isCompleted: true,
      },
      {
        status: "SHIPPED",
        label: "Dispatched",
        description: "Handed over to Delhivery logistics. Package in transit from Mumbai to local sorting hub.",
        date: "2026-06-19T11:00:00Z",
        isCompleted: true,
      },
      {
        status: "DELIVERED",
        label: "Delivered",
        description: "Successfully delivered. Thank you for printing with PrintEve!",
        date: "2026-06-20T16:20:00Z",
        isCompleted: true,
      },
    ],
  },
  {
    id: "ORD-4412",
    date: "2026-06-19T14:20:00Z",
    status: "SHIPPED",
    estimatedDelivery: "June 24, 2026",
    items: [
      {
        slug: "branded-letterheads",
        name: "Branded Letterheads",
        category: "Stationery",
        qty: 250,
        price: 748,
        image: "https://picsum.photos/seed/letterheads/900/700",
        fileUrl: "corporate_letterhead_hq.pdf",
        options: [
          { label: "Paper Type", value: "120 GSM Uncoated" },
          { label: "Sides", value: "Single-sided" },
        ],
      },
    ],
    trackingCarrier: "Blue Dart",
    trackingId: "BD209471928",
    trackingLink: "https://www.bluedart.com/tracking?id=BD209471928",
    shippingAddress: {
      name: "Ritesh Gupta",
      line1: "G-12, Sector 63",
      line2: "Noida Industrial Area",
      city: "Noida",
      state: "Uttar Pradesh",
      zip: "201301",
      phone: "+91 99887 76655",
    },
    paymentMethod: "Razorpay Net Banking",
    paymentId: "pay_Rzp4421094",
    platformFee: 49,
    deliveryCharge: 79,
    discount: 0,
    subtotal: 748,
    total: 876,
    timeline: [
      {
        status: "PENDING",
        label: "Payment Initiated",
        description: "Payment checkout started.",
        date: "2026-06-19T14:15:00Z",
        isCompleted: true,
      },
      {
        status: "CONFIRMED",
        label: "Order Confirmed",
        description: "Razorpay payment received. Pre-flight files checked and validated.",
        date: "2026-06-19T14:20:00Z",
        isCompleted: true,
      },
      {
        status: "PRINTING",
        label: "In Production",
        description: "Assigned to printing house (Noida Print Partners). Letterhead layout queued for printing.",
        date: "2026-06-20T10:00:00Z",
        isCompleted: true,
      },
      {
        status: "READY",
        label: "Quality Checked",
        description: "Printing finished. Trim and cut verified. Packed for courier collection.",
        date: "2026-06-21T12:30:00Z",
        isCompleted: true,
      },
      {
        status: "SHIPPED",
        label: "Dispatched",
        description: "Handed over to Blue Dart courier service. Tracking number BD209471928.",
        date: "2026-06-21T18:00:00Z",
        isCompleted: true,
      },
      {
        status: "DELIVERED",
        label: "Out for Delivery",
        description: "Courier out for delivery to address. Expected today.",
        date: "2026-06-21T18:00:00Z",
        isCompleted: false,
      },
    ],
  },
  {
    id: "ORD-3321",
    date: "2026-06-20T11:00:00Z",
    status: "PRINTING",
    estimatedDelivery: "June 25, 2026",
    items: [
      {
        slug: "vinyl-die-cut-stickers",
        name: "Vinyl Die-Cut Stickers",
        category: "Labels & Stickers",
        qty: 200,
        price: 596,
        image: "https://picsum.photos/seed/stickers/900/700",
        fileUrl: "laptop_stickers_cmyk_outlines.ai",
        options: [
          { label: "Shape", value: "Die-cut" },
          { label: "Material", value: "White Vinyl" },
          { label: "Finish", value: "Matte" },
        ],
      },
    ],
    shippingAddress: {
      name: "Sneha Patil",
      line1: "B-201, Shanti Niketan",
      line2: "Aundh Road, opposite University Gate",
      city: "Pune",
      state: "Maharashtra",
      zip: "411007",
      phone: "+91 88776 65544",
    },
    paymentMethod: "Razorpay Card (Visa)",
    paymentId: "pay_Rzp110293",
    platformFee: 49,
    deliveryCharge: 79,
    discount: 25,
    subtotal: 596,
    total: 699,
    timeline: [
      {
        status: "PENDING",
        label: "Payment Initiated",
        description: "Razorpay card transaction in validation.",
        date: "2026-06-20T10:55:00Z",
        isCompleted: true,
      },
      {
        status: "CONFIRMED",
        label: "Order Confirmed",
        description: "Payment confirmed. Customer design pre-press check passed.",
        date: "2026-06-20T11:00:00Z",
        isCompleted: true,
      },
      {
        status: "PRINTING",
        label: "In Production",
        description: "Design assigned and accepted by Pune Offset Printers. High-definition vinyl printing and plotter-cutting in progress.",
        date: "2026-06-21T09:00:00Z",
        isCompleted: true,
      },
      {
        status: "READY",
        label: "Quality Checked",
        description: "Pending print run completion and plotter QA.",
        date: "2026-06-21T09:00:00Z",
        isCompleted: false,
      },
      {
        status: "SHIPPED",
        label: "Dispatched",
        description: "Awaiting handoff to logistics carrier.",
        date: "2026-06-21T09:00:00Z",
        isCompleted: false,
      },
      {
        status: "DELIVERED",
        label: "Delivered",
        description: "Awaiting shipment arrival.",
        date: "2026-06-21T09:00:00Z",
        isCompleted: false,
      },
    ],
  },
  {
    id: "ORD-2101",
    date: "2026-06-21T10:00:00Z",
    status: "CONFIRMED", // still confirmed, but showing design hold
    estimatedDelivery: "June 27, 2026",
    holdReason: "Resolution too low (72 DPI detected, 300+ DPI recommended to avoid blurry/pixelated stickers).",
    items: [
      {
        slug: "vinyl-die-cut-stickers",
        name: "Vinyl Die-Cut Stickers",
        category: "Labels & Stickers",
        qty: 100,
        price: 298,
        image: "https://picsum.photos/seed/stickers/900/700",
        fileUrl: "whatsapp_logo_lowres.png",
        options: [
          { label: "Shape", value: "Circle" },
          { label: "Material", value: "White Vinyl" },
          { label: "Finish", value: "Gloss" },
        ],
      },
    ],
    shippingAddress: {
      name: "Amit Sharma",
      line1: "Flat 102, Block A",
      line2: "Sunrise Apartments, Whitefield",
      city: "Bangalore",
      state: "Karnataka",
      zip: "560066",
      phone: "+91 91234 56789",
    },
    paymentMethod: "Razorpay UPI",
    paymentId: "pay_Rzp10294819",
    platformFee: 49,
    deliveryCharge: 79,
    discount: 0,
    subtotal: 298,
    total: 426,
    timeline: [
      {
        status: "PENDING",
        label: "Payment Initiated",
        description: "Payment transaction validated.",
        date: "2026-06-21T09:55:00Z",
        isCompleted: true,
      },
      {
        status: "CONFIRMED",
        label: "Order Confirmed",
        description: "Order registered and payment verified via Razorpay webhook.",
        date: "2026-06-21T10:00:00Z",
        isCompleted: true,
      },
      {
        status: "HOLD",
        label: "Pre-Press Audit: Action Required",
        description: "Our design team flagged the uploaded artwork file. Resolution is 72 DPI, which will print blurry. Please re-upload a file at 300+ DPI or vector format (.pdf, .ai) to resume printing.",
        date: "2026-06-21T11:30:00Z",
        isCompleted: true,
      },
      {
        status: "PRINTING",
        label: "In Production",
        description: "Assigned to printing hub. (Awaiting artwork re-upload).",
        date: "2026-06-21T11:30:00Z",
        isCompleted: false,
      },
      {
        status: "SHIPPED",
        label: "Dispatched",
        description: "Awaiting production completion.",
        date: "2026-06-21T11:30:00Z",
        isCompleted: false,
      },
      {
        status: "DELIVERED",
        label: "Delivered",
        description: "Awaiting shipping.",
        date: "2026-06-21T11:30:00Z",
        isCompleted: false,
      },
    ],
  },
  {
    id: "ORD-1090",
    date: "2026-06-21T21:00:00Z",
    status: "CONFIRMED",
    estimatedDelivery: "June 26, 2026",
    items: [
      {
        slug: "premium-business-cards",
        name: "Premium Business Cards",
        category: "Marketing Materials",
        qty: 100,
        price: 299,
        image: "https://picsum.photos/seed/business-cards/900/700",
        fileUrl: "my_business_card_v2.pdf",
        options: [
          { label: "Paper Quality", value: "350 GSM Matte" },
          { label: "Corners", value: "Rounded" },
        ],
      },
    ],
    shippingAddress: {
      name: "Meera Nair",
      line1: "15, Jubilee Hills Road",
      line2: "Near Metro Pillar 24",
      city: "Hyderabad",
      state: "Telangana",
      zip: "500033",
      phone: "+91 90000 88888",
    },
    paymentMethod: "Razorpay Wallet (Paytm)",
    paymentId: "pay_Rzp1102901",
    platformFee: 49,
    deliveryCharge: 79,
    discount: 10,
    subtotal: 299,
    total: 417,
    timeline: [
      {
        status: "PENDING",
        label: "Payment Initiated",
        description: "Razorpay session confirmed.",
        date: "2026-06-21T20:58:00Z",
        isCompleted: true,
      },
      {
        status: "CONFIRMED",
        label: "Order Confirmed",
        description: "Payment confirmed. Artwork pre-flight check completed (dimensions and resolution verified). Assigned to operations queue.",
        date: "2026-06-21T21:00:00Z",
        isCompleted: true,
      },
      {
        status: "PRINTING",
        label: "In Production",
        description: "Awaiting print job assignment by operations admin to local Hyderabad print house.",
        date: "2026-06-21T21:00:00Z",
        isCompleted: false,
      },
      {
        status: "READY",
        label: "Quality Checked",
        description: "Pending printing runs.",
        date: "2026-06-21T21:00:00Z",
        isCompleted: false,
      },
      {
        status: "SHIPPED",
        label: "Dispatched",
        description: "Pending production.",
        date: "2026-06-21T21:00:00Z",
        isCompleted: false,
      },
      {
        status: "DELIVERED",
        label: "Delivered",
        description: "Awaiting shipping logistics.",
        date: "2026-06-21T21:00:00Z",
        isCompleted: false,
      },
    ],
  },
];

export function getOrder(id: string): Order | undefined {
  return orders.find((o) => o.id.toUpperCase() === id.toUpperCase());
}

export function updateOrderArtwork(id: string, newFileName: string) {
  const order = getOrder(id);
  if (!order) return false;

  // Update file name
  if (order.items[0]) {
    order.items[0].fileUrl = newFileName;
  }

  // Clear hold status and update timeline
  order.holdReason = undefined;
  
  // Find HOLD in timeline and mark as resolved / remove, then change status
  // For a premium simulation, we can update the timeline
  const holdEventIndex = order.timeline.findIndex((e) => e.status === "HOLD");
  if (holdEventIndex !== -1) {
    order.timeline[holdEventIndex].label = "Artwork Re-uploaded & Verified";
    order.timeline[holdEventIndex].description = `New artwork file "${newFileName}" uploaded, verified at 300+ DPI, and approved.`;
    order.timeline[holdEventIndex].status = "CONFIRMED";
  }

  // Put in-production as pending/active
  const printingEvent = order.timeline.find((e) => e.status === "PRINTING");
  if (printingEvent) {
    printingEvent.isCompleted = true;
    printingEvent.description = "Design assigned to Mumbai Print Partners. Offset printing in preparation.";
  }
  
  order.status = "PRINTING";
  return true;
}

export function cancelOrder(id: string): boolean {
  const order = getOrder(id);
  if (!order) return false;

  // Can only cancel before printing
  if (order.status !== "PENDING" && order.status !== "CONFIRMED") {
    return false;
  }

  order.status = "CANCELLED";
  
  // Add cancelled event to timeline
  const cancelTime = new Date().toISOString();
  
  // Mark remaining items in timeline as false, append CANCELLED
  order.timeline = order.timeline.filter(e => e.isCompleted);
  order.timeline.push({
    status: "CANCELLED",
    label: "Order Cancelled",
    description: "Cancelled by the customer. Refund of ₹" + order.total.toFixed(2) + " initiated to your original payment method.",
    date: cancelTime,
    isCompleted: true,
  });

  return true;
}
