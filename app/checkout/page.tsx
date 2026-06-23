"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ChevronRight,
  Lock,
  Loader2,
  Truck,
  Zap,
  ShieldCheck,
  Wallet,
  CreditCard,
  Building2,
  Smartphone,
} from "lucide-react";

import { useAuth } from "@/components/providers/auth-provider";
import { useCart } from "@/components/providers/cart-provider";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { OrderSummary } from "@/components/checkout/order-summary";
import { CheckoutSteps } from "@/components/checkout/checkout-steps";

const EXPRESS_SURCHARGE = 150;

const paymentMethods = [
  { id: "upi", label: "UPI", icon: Smartphone, hint: "Google Pay, PhonePe, Paytm" },
  { id: "card", label: "Card", icon: CreditCard, hint: "Credit / Debit" },
  { id: "netbanking", label: "Netbanking", icon: Building2, hint: "All major banks" },
  { id: "wallet", label: "Wallet", icon: Wallet, hint: "Paytm, Amazon Pay" },
];

export default function CheckoutPage() {
  const router = useRouter();
  const { user, hydrated: authHydrated } = useAuth();
  const { items, totals, hydrated: cartHydrated, clear } = useCart();

  const [step, setStep] = React.useState(1);
  const [processing, setProcessing] = React.useState(false);

  const [address, setAddress] = React.useState({
    name: "",
    phone: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    zip: "",
  });
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [delivery, setDelivery] = React.useState("standard");
  const [gstInvoice, setGstInvoice] = React.useState(false);
  const [gstin, setGstin] = React.useState("");
  const [method, setMethod] = React.useState("upi");
  const [plan, setPlan] = React.useState("full");

  // Prefill name once the user is known.
  React.useEffect(() => {
    if (user?.name) setAddress((a) => (a.name ? a : { ...a, name: user.name }));
  }, [user]);

  const expressFee = delivery === "express" ? EXPRESS_SURCHARGE : 0;
  const payable = totals.total + expressFee;
  const payNow = plan === "half" ? Math.round(payable / 2) : payable;
  const emiMonthly = Math.round(payable / 3);

  function set<K extends keyof typeof address>(key: K, value: string) {
    setAddress((a) => ({ ...a, [key]: value }));
  }

  function validateAddress() {
    const next: Record<string, string> = {};
    if (address.name.trim().length < 2) next.name = "Enter the recipient's name.";
    if (address.phone.replace(/\D/g, "").length < 10) next.phone = "Enter a valid phone number.";
    if (!address.line1.trim()) next.line1 = "Enter the address.";
    if (!address.city.trim()) next.city = "Enter the city.";
    if (!address.state.trim()) next.state = "Enter the state.";
    if (!/^\d{6}$/.test(address.zip.trim())) next.zip = "Enter a valid 6-digit PIN code.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function placeOrder() {
    setProcessing(true);
    setTimeout(() => {
      const id = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
      const order = {
        id,
        date: new Date().toISOString(),
        items,
        address,
        delivery,
        gstin: gstInvoice ? gstin : null,
        paymentMethod: method,
        plan,
        amountPaidNow: payNow,
        payable,
        totals: { ...totals, expressFee },
      };
      try {
        localStorage.setItem("printeve.lastOrder", JSON.stringify(order));
      } catch {
        // ignore
      }
      clear();
      router.push("/checkout/success");
    }, 1300);
  }

  // ---- Gates ---------------------------------------------------------------
  if (!authHydrated || !cartHydrated) {
    return <div className="min-h-[60dvh]" />;
  }

  if (!user) {
    return (
      <Gate
        icon={<Lock className="size-7" />}
        title="Login required to check out"
        body="Sign in to your PrintEve account to place an order and track it."
      >
        <Button asChild size="lg">
          <Link href="/login?next=/checkout">Login to continue</Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link href="/signup?next=/checkout">Create an account</Link>
        </Button>
      </Gate>
    );
  }

  if (items.length === 0) {
    return (
      <Gate
        icon={<Truck className="size-7" />}
        title="Your cart is empty"
        body="Add a product before heading to checkout."
      >
        <Button asChild size="lg">
          <Link href="/products">Browse products</Link>
        </Button>
      </Gate>
    );
  }

  // ---- Checkout ------------------------------------------------------------
  return (
    <div className="bg-background min-h-dvh">
      <title>Checkout — PrintEve</title>

      <div className="border-b">
        <nav
          aria-label="Breadcrumb"
          className="text-muted-foreground mx-auto flex max-w-7xl items-center gap-1.5 px-4 py-4 text-sm sm:px-6 lg:px-8"
        >
          <Link href="/" className="hover:text-foreground">Home</Link>
          <ChevronRight className="size-3.5 opacity-60" />
          <Link href="/cart" className="hover:text-foreground">Cart</Link>
          <ChevronRight className="size-3.5 opacity-60" />
          <span className="text-foreground">Checkout</span>
        </nav>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <h1 className="font-serif text-3xl font-bold tracking-tight sm:text-4xl">
          Checkout
        </h1>

        <div className="mt-8 max-w-2xl">
          <CheckoutSteps current={step} onStepClick={setStep} />
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-3 lg:gap-12">
          {/* Steps */}
          <div className="lg:col-span-2">
            {/* STEP 1 — Address */}
            {step === 1 && (
              <Card className="gap-5 p-6">
                <h2 className="font-medium">Delivery address</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Full name" error={errors.name} className="sm:col-span-2">
                    <Input value={address.name} onChange={(e) => set("name", e.target.value)} placeholder="Recipient name" aria-invalid={!!errors.name} />
                  </Field>
                  <Field label="Phone" error={errors.phone}>
                    <Input value={address.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+91 98765 43210" aria-invalid={!!errors.phone} />
                  </Field>
                  <Field label="PIN code" error={errors.zip}>
                    <Input value={address.zip} onChange={(e) => set("zip", e.target.value)} placeholder="560001" aria-invalid={!!errors.zip} />
                  </Field>
                  <Field label="Address line 1" error={errors.line1} className="sm:col-span-2">
                    <Input value={address.line1} onChange={(e) => set("line1", e.target.value)} placeholder="Flat / building / street" aria-invalid={!!errors.line1} />
                  </Field>
                  <Field label="Address line 2 (optional)" className="sm:col-span-2">
                    <Input value={address.line2} onChange={(e) => set("line2", e.target.value)} placeholder="Area / landmark" />
                  </Field>
                  <Field label="City" error={errors.city}>
                    <Input value={address.city} onChange={(e) => set("city", e.target.value)} placeholder="Bengaluru" aria-invalid={!!errors.city} />
                  </Field>
                  <Field label="State" error={errors.state}>
                    <Input value={address.state} onChange={(e) => set("state", e.target.value)} placeholder="Karnataka" aria-invalid={!!errors.state} />
                  </Field>
                </div>
                <Button
                  size="lg"
                  className="sm:w-fit"
                  onClick={() => validateAddress() && setStep(2)}
                >
                  Continue to review
                </Button>
              </Card>
            )}

            {/* STEP 2 — Review & delivery */}
            {step === 2 && (
              <div className="flex flex-col gap-6">
                <Card className="gap-4 p-6">
                  <div className="flex items-center justify-between">
                    <h2 className="font-medium">Deliver to</h2>
                    <Button variant="link" className="px-0" onClick={() => setStep(1)}>
                      Edit
                    </Button>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    <span className="text-foreground font-medium">{address.name}</span> · {address.phone}
                    <br />
                    {address.line1}{address.line2 ? `, ${address.line2}` : ""}, {address.city}, {address.state} {address.zip}
                  </p>
                </Card>

                <Card className="gap-4 p-6">
                  <h2 className="font-medium">Delivery method</h2>
                  <RadioGroup value={delivery} onValueChange={setDelivery} className="gap-3">
                    <DeliveryOption value="standard" title="Standard" desc="5–7 business days after proof approval" price={totals.delivery === 0 ? "FREE" : formatPrice(totals.delivery)} current={delivery} />
                    <DeliveryOption value="express" title="Express" desc="2–3 business days after proof approval" price={`+ ${formatPrice(EXPRESS_SURCHARGE)}`} current={delivery} />
                  </RadioGroup>
                </Card>

                <Card className="gap-4 p-6">
                  <Label className="font-normal">
                    <Checkbox checked={gstInvoice} onCheckedChange={(v) => setGstInvoice(v === true)} />
                    <span className="text-sm">I need a GST invoice (business)</span>
                  </Label>
                  {gstInvoice && (
                    <Input value={gstin} onChange={(e) => setGstin(e.target.value)} placeholder="GSTIN (e.g. 29ABCDE1234F1Z5)" className="uppercase" />
                  )}
                </Card>

                <div className="bg-muted/40 text-muted-foreground flex items-start gap-2.5 rounded-lg border p-4 text-sm">
                  <ShieldCheck className="text-brand mt-0.5 size-4 shrink-0" />
                  Production starts only after our team checks your artwork and you approve the proof. You can track every step after ordering.
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" size="lg" onClick={() => setStep(1)}>Back</Button>
                  <Button size="lg" className="flex-1 sm:flex-none" onClick={() => setStep(3)}>Continue to payment</Button>
                </div>
              </div>
            )}

            {/* STEP 3 — Payment */}
            {step === 3 && (
              <div className="flex flex-col gap-6">
                <Card className="gap-4 p-6">
                  <h2 className="font-medium">Payment method</h2>
                  <RadioGroup value={method} onValueChange={setMethod} className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {paymentMethods.map((m) => {
                      const Icon = m.icon;
                      return (
                        <Label
                          key={m.id}
                          className="has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary/5 flex cursor-pointer items-center gap-3 rounded-lg border p-3 font-normal"
                        >
                          <RadioGroupItem value={m.id} />
                          <Icon className="text-muted-foreground size-5" />
                          <span className="flex flex-col">
                            <span className="text-sm font-medium">{m.label}</span>
                            <span className="text-muted-foreground text-xs">{m.hint}</span>
                          </span>
                        </Label>
                      );
                    })}
                  </RadioGroup>
                  <p className="text-muted-foreground text-xs">
                    Secured by Razorpay. (Demo — no real payment is processed.)
                  </p>
                </Card>

                <Card className="gap-4 p-6">
                  <h2 className="font-medium">Payment plan</h2>
                  <RadioGroup value={plan} onValueChange={setPlan} className="gap-3">
                    <PlanOption value="full" title="Pay in full" desc="Pay the whole amount now" right={formatPrice(payable)} current={plan} />
                    <PlanOption value="half" title="Half advance" desc="50% now, 50% after printing" right={`${formatPrice(Math.round(payable / 2))} now`} current={plan} />
                    <PlanOption value="emi" title="EMI · 3 months" desc="Split into 3 monthly payments" right={`${formatPrice(emiMonthly)}/mo`} current={plan} />
                  </RadioGroup>
                </Card>

                <div className="flex gap-3">
                  <Button variant="outline" size="lg" onClick={() => setStep(2)} disabled={processing}>Back</Button>
                  <Button size="lg" className="flex-1" onClick={placeOrder} disabled={processing}>
                    {processing ? <Loader2 className="animate-spin" /> : <Zap />}
                    Pay {formatPrice(payNow)} & Place Order
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Sticky summary */}
          <div className="lg:col-span-1">
            <Card className="gap-4 p-6 lg:sticky lg:top-24">
              <h2 className="font-medium">Order Summary</h2>
              <OrderSummary />
              {(expressFee > 0 || plan !== "full") && (
                <>
                  <Separator />
                  {expressFee > 0 && (
                    <div className="flex items-center justify-between text-sm">
                      <span>Express delivery</span>
                      <span className="tabular-nums">+ {formatPrice(expressFee)}</span>
                    </div>
                  )}
                  <div className="flex items-baseline justify-between">
                    <span className="font-medium">
                      {plan === "half" ? "Pay now (50%)" : plan === "emi" ? "First instalment" : "Amount payable"}
                    </span>
                    <span className="text-brand text-lg font-semibold tabular-nums">
                      {formatPrice(plan === "emi" ? emiMonthly : payNow)}
                    </span>
                  </div>
                  {plan === "half" && (
                    <p className="text-muted-foreground text-xs">
                      {formatPrice(payable - Math.round(payable / 2))} due after printing.
                    </p>
                  )}
                </>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  error,
  className,
  children,
}: {
  label: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`flex flex-col gap-2 ${className ?? ""}`}>
      <Label>{label}</Label>
      {children}
      {error && <p className="text-destructive text-xs">{error}</p>}
    </div>
  );
}

function DeliveryOption({
  value,
  title,
  desc,
  price,
  current,
}: {
  value: string;
  title: string;
  desc: string;
  price: string;
  current: string;
}) {
  return (
    <Label className="has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary/5 flex cursor-pointer items-center gap-3 rounded-lg border p-4 font-normal">
      <RadioGroupItem value={value} />
      <span className="flex flex-1 flex-col">
        <span className="text-sm font-medium">{title}</span>
        <span className="text-muted-foreground text-xs">{desc}</span>
      </span>
      <span className="text-sm font-semibold tabular-nums">{price}</span>
    </Label>
  );
}

function PlanOption({
  value,
  title,
  desc,
  right,
  current,
}: {
  value: string;
  title: string;
  desc: string;
  right: string;
  current: string;
}) {
  return (
    <Label className="has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary/5 flex cursor-pointer items-center gap-3 rounded-lg border p-4 font-normal">
      <RadioGroupItem value={value} />
      <span className="flex flex-1 flex-col">
        <span className="text-sm font-medium">{title}</span>
        <span className="text-muted-foreground text-xs">{desc}</span>
      </span>
      <span className="text-sm font-semibold tabular-nums">{right}</span>
    </Label>
  );
}

function Gate({
  icon,
  title,
  body,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto flex min-h-[70dvh] max-w-md flex-col items-center justify-center gap-5 px-4 text-center">
      <span className="bg-primary/10 text-brand flex size-14 items-center justify-center rounded-full">
        {icon}
      </span>
      <div className="flex flex-col gap-1.5">
        <h1 className="font-serif text-2xl font-bold tracking-tight">{title}</h1>
        <p className="text-muted-foreground">{body}</p>
      </div>
      <div className="flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
        {children}
      </div>
    </div>
  );
}
