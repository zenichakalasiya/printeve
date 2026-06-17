"use client";

import * as React from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { categories } from "@/lib/data/categories";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const inquiryTypes = [
  "General enquiry",
  "Bulk / wholesale order",
  "Custom product request",
  "Help with an existing order",
  "Become a printing partner",
  "Other",
];

const orderSizes = [
  "Just exploring",
  "Under 100 pcs",
  "100 – 500 pcs",
  "500 – 2,000 pcs",
  "2,000+ pcs",
];

const hearAboutOptions = [
  "Google search",
  "Instagram / Facebook",
  "Friend or colleague",
  "Existing customer",
  "Other",
];

const bestTimes = ["Morning", "Afternoon", "Evening", "Anytime"];

export function ContactForm() {
  const [values, setValues] = React.useState({
    fullName: "",
    email: "",
    phone: "",
    business: "",
    inquiryType: "",
    category: "",
    orderSize: "",
    city: "",
    preferredContact: "Email",
    bestTime: "",
    hearAbout: "",
    message: "",
    consent: false,
  });
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [loading, setLoading] = React.useState(false);

  function set<K extends keyof typeof values>(
    key: K,
    value: (typeof values)[K]
  ) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  function validate() {
    const next: Record<string, string> = {};
    if (values.fullName.trim().length < 2) next.fullName = "Please enter your name.";
    if (!EMAIL_RE.test(values.email)) next.email = "Enter a valid email.";
    if (values.phone.replace(/\D/g, "").length < 10)
      next.phone = "Enter a valid phone number.";
    if (!values.inquiryType) next.inquiryType = "Select an enquiry type.";
    if (!values.city.trim()) next.city = "Tell us your city / delivery area.";
    if (values.message.trim().length < 10)
      next.message = "Please add a few details (min 10 characters).";
    if (!values.consent) next.consent = "Please allow us to contact you.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please fix the highlighted fields.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Thanks! Our team will reach out within one business day.", {
        description: "Form isn't connected to the backend yet.",
      });
    }, 800);
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
      {/* Name + Business */}
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" required error={errors.fullName} htmlFor="fullName">
          <Input
            id="fullName"
            value={values.fullName}
            onChange={(e) => set("fullName", e.target.value)}
            placeholder="Aarav Sharma"
            aria-invalid={!!errors.fullName}
          />
        </Field>
        <Field label="Business / company" htmlFor="business" hint="optional">
          <Input
            id="business"
            value={values.business}
            onChange={(e) => set("business", e.target.value)}
            placeholder="Brew & Bean Coffee"
          />
        </Field>
      </div>

      {/* Email + Phone */}
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Email" required error={errors.email} htmlFor="email">
          <Input
            id="email"
            type="email"
            value={values.email}
            onChange={(e) => set("email", e.target.value)}
            placeholder="you@example.com"
            aria-invalid={!!errors.email}
          />
        </Field>
        <Field label="Phone" required error={errors.phone} htmlFor="phone">
          <Input
            id="phone"
            type="tel"
            value={values.phone}
            onChange={(e) => set("phone", e.target.value)}
            placeholder="+91 98765 43210"
            aria-invalid={!!errors.phone}
          />
        </Field>
      </div>

      {/* Inquiry type + Category */}
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="What's this about?" required error={errors.inquiryType}>
          <Select
            value={values.inquiryType}
            onValueChange={(v) => set("inquiryType", v)}
          >
            <SelectTrigger aria-invalid={!!errors.inquiryType}>
              <SelectValue placeholder="Select an enquiry type" />
            </SelectTrigger>
            <SelectContent>
              {inquiryTypes.map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field label="Product of interest" hint="optional">
          <Select
            value={values.category}
            onValueChange={(v) => set("category", v)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((c) => (
                <SelectItem key={c.slug} value={c.name}>
                  {c.name}
                </SelectItem>
              ))}
              <SelectItem value="Not sure yet">Not sure yet</SelectItem>
            </SelectContent>
          </Select>
        </Field>
      </div>

      {/* Order size + City */}
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Estimated order size" hint="optional">
          <Select
            value={values.orderSize}
            onValueChange={(v) => set("orderSize", v)}
          >
            <SelectTrigger>
              <SelectValue placeholder="How many do you need?" />
            </SelectTrigger>
            <SelectContent>
              {orderSizes.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field label="City / delivery area" required error={errors.city} htmlFor="city">
          <Input
            id="city"
            value={values.city}
            onChange={(e) => set("city", e.target.value)}
            placeholder="Bengaluru, KA"
            aria-invalid={!!errors.city}
          />
        </Field>
      </div>

      {/* Preferred contact */}
      <Field label="Preferred way to reach you">
        <RadioGroup
          value={values.preferredContact}
          onValueChange={(v) => set("preferredContact", v)}
          className="flex flex-wrap gap-4 pt-1"
        >
          {["Email", "Phone", "WhatsApp"].map((opt) => (
            <Label key={opt} className="font-normal">
              <RadioGroupItem value={opt} /> {opt}
            </Label>
          ))}
        </RadioGroup>
      </Field>

      {/* Best time + Hear about */}
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Best time to reach you" hint="optional">
          <Select
            value={values.bestTime}
            onValueChange={(v) => set("bestTime", v)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Anytime" />
            </SelectTrigger>
            <SelectContent>
              {bestTimes.map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field label="How did you hear about us?" hint="optional">
          <Select
            value={values.hearAbout}
            onValueChange={(v) => set("hearAbout", v)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select one" />
            </SelectTrigger>
            <SelectContent>
              {hearAboutOptions.map((o) => (
                <SelectItem key={o} value={o}>
                  {o}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
      </div>

      {/* Message */}
      <Field label="How can we help?" required error={errors.message} htmlFor="message">
        <Textarea
          id="message"
          rows={5}
          value={values.message}
          onChange={(e) => set("message", e.target.value)}
          placeholder="Tell us about your project — product, quantity, deadline, and anything else that helps us help you."
          aria-invalid={!!errors.message}
        />
      </Field>

      {/* Consent */}
      <div className="flex flex-col gap-1">
        <Label className="items-start font-normal">
          <Checkbox
            checked={values.consent}
            onCheckedChange={(v) => set("consent", v === true)}
            className="mt-0.5"
            aria-invalid={!!errors.consent}
          />
          <span className="text-muted-foreground text-sm">
            I agree to be contacted by PrintEve about my enquiry.
          </span>
        </Label>
        {errors.consent && (
          <p className="text-destructive text-xs">{errors.consent}</p>
        )}
      </div>

      <Button type="submit" size="lg" disabled={loading} className="sm:w-fit">
        {loading && <Loader2 className="animate-spin" />}
        Send enquiry
      </Button>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  required,
  hint,
  error,
  children,
}: {
  label: string;
  htmlFor?: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <Label htmlFor={htmlFor}>
          {label}
          {required && <span className="text-brand"> *</span>}
        </Label>
        {hint && <span className="text-muted-foreground text-xs">{hint}</span>}
      </div>
      {children}
      {error && <p className="text-destructive text-xs">{error}</p>}
    </div>
  );
}
