import type { Metadata } from "next";

import { AuthShell } from "@/components/auth/auth-shell";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "Login — PrintEve",
  description: "Log in to your PrintEve account to order and track custom prints.",
};

export default function LoginPage() {
  return (
    <AuthShell
      title="Welcome back"
      description="Log in to continue your custom print orders."
    >
      <LoginForm />
    </AuthShell>
  );
}
