"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowLeft, Loader2, MailCheck } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ForgotPasswordForm() {
  const [email, setEmail] = React.useState("");
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [sent, setSent] = React.useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!EMAIL_RE.test(email)) {
      setError("Enter a valid email address.");
      return;
    }
    setError("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
      toast.success("If that email exists, a reset code is on its way.");
    }, 700);
  }

  if (sent) {
    return (
      <div className="flex flex-col items-start gap-4">
        <span className="bg-chart-2/15 text-chart-2 flex size-11 items-center justify-center rounded-lg">
          <MailCheck className="size-5" />
        </span>
        <div className="flex flex-col gap-1">
          <p className="font-medium">Check your inbox</p>
          <p className="text-muted-foreground text-sm">
            We&apos;ve sent a password reset code to{" "}
            <span className="text-foreground font-medium">{email}</span>. The
            code expires in 10 minutes.
          </p>
        </div>
        <Button variant="outline" asChild className="w-full">
          <Link href="/login">
            <ArrowLeft /> Back to login
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={!!error}
        />
        {error && <p className="text-destructive text-xs">{error}</p>}
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading && <Loader2 className="animate-spin" />}
        Send reset code
      </Button>

      <Link
        href="/login"
        className="text-muted-foreground hover:text-foreground flex items-center justify-center gap-1.5 text-sm"
      >
        <ArrowLeft className="size-4" /> Back to login
      </Link>
    </form>
  );
}
