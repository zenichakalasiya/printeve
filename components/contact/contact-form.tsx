"use client";

import * as React from "react";
import { Loader2, Send } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactForm() {
  const [values, setValues] = React.useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [loading, setLoading] = React.useState(false);

  function set<K extends keyof typeof values>(key: K, value: string) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  function validate() {
    const next: Record<string, string> = {};
    if (values.name.trim().length < 2) next.name = "Please enter your name.";
    if (!EMAIL_RE.test(values.email)) next.email = "Enter a valid email address.";
    if (!values.subject.trim()) next.subject = "Please add a subject.";
    if (values.message.trim().length < 10)
      next.message = "Please add a few details (min 10 characters).";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setValues({ name: "", email: "", subject: "", message: "" });
      toast.success("Message sent! Our team will get back to you shortly.", {
        description: "Form isn't connected to the backend yet.",
      });
    }, 800);
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" htmlFor="name" error={errors.name}>
          <Input
            id="name"
            value={values.name}
            onChange={(e) => set("name", e.target.value)}
            placeholder="Your full name"
            aria-invalid={!!errors.name}
          />
        </Field>
        <Field label="Email" htmlFor="email" error={errors.email}>
          <Input
            id="email"
            type="email"
            value={values.email}
            onChange={(e) => set("email", e.target.value)}
            placeholder="you@company.com"
            aria-invalid={!!errors.email}
          />
        </Field>
      </div>

      <Field label="Subject" htmlFor="subject" error={errors.subject}>
        <Input
          id="subject"
          value={values.subject}
          onChange={(e) => set("subject", e.target.value)}
          placeholder="What's this about?"
          aria-invalid={!!errors.subject}
        />
      </Field>

      <Field label="Message" htmlFor="message" error={errors.message}>
        <Textarea
          id="message"
          rows={6}
          value={values.message}
          onChange={(e) => set("message", e.target.value)}
          placeholder="Tell us how we can help…"
          aria-invalid={!!errors.message}
        />
      </Field>

      <Button type="submit" size="lg" disabled={loading} className="sm:w-fit">
        {loading ? <Loader2 className="animate-spin" /> : <Send />}
        Send Message
      </Button>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
      {error && <p className="text-destructive text-xs">{error}</p>}
    </div>
  );
}
