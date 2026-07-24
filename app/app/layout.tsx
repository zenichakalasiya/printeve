import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { Funnel_Sans } from "next/font/google";
import AppShell from "./AppShell";

// Single typeface for the whole /app product — Funnel Sans for both headings and
// UI. The `--font-fraunces` / `--font-dm` variables (referenced throughout the
// app) are repointed here so every screen switches in one place.
const funnel = Funnel_Sans({ subsets: ["latin"], variable: "--font-funnel", display: "swap" });

export const metadata: Metadata = {
  title: "PrintEve — Mobile App",
  description: "PrintEve on-demand bulk printing — the mobile app experience.",
};

export default function AppRouteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={funnel.variable}
      style={
        {
          fontFamily: "var(--font-funnel)",
          "--font-fraunces": "var(--font-funnel)",
          "--font-dm": "var(--font-funnel)",
        } as CSSProperties
      }
    >
      <AppShell>{children}</AppShell>
    </div>
  );
}
