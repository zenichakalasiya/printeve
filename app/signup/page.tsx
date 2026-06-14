import type { Metadata } from "next";

import { AuthShell } from "@/components/auth/auth-shell";
import { SignupForm } from "@/components/auth/signup-form";

export const metadata: Metadata = {
  title: "Sign up — PrintEve",
  description:
    "Create a PrintEve account to design, order and track custom print products.",
};

export default function SignupPage() {
  return (
    <AuthShell
      title="Create your account"
      description="Start designing and ordering custom prints in minutes."
    >
      <SignupForm />
    </AuthShell>
  );
}
