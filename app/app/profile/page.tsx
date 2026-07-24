"use client";

import React from "react";
import { useApp } from "../context";
import { useRouter } from "next/navigation";
import {
  User,
  Pencil,
  ShieldCheck,
  MapPin,
  Palette,
  Truck,
  Bell,
  Globe,
  ChevronRight,
  LogOut,
  HelpCircle,
} from "lucide-react";

const serif = { fontFamily: "var(--font-fraunces)" } as const;
const FOREST = "#14432A";

export default function AppProfile() {
  const router = useRouter();
  const { userPhone, orders, triggerPush } = useApp();

  const phone = userPhone && userPhone !== "social" ? `+91 ${userPhone}` : "+91 98251 60522";
  const soon = (label: string) => triggerPush(`🚧 ${label} is coming soon.`);

  const account = [
    { icon: Pencil, label: "Edit Profile", onClick: () => soon("Edit Profile") },
    { icon: ShieldCheck, label: "Security", onClick: () => soon("Security") },
    { icon: MapPin, label: "Saved Addresses", onClick: () => soon("Saved Addresses") },
    { icon: Palette, label: "Saved Designs", onClick: () => soon("Saved Designs") },
    { icon: Truck, label: "Track an Order", value: orders.length ? `${orders.length} active` : undefined, onClick: () => router.push("/app/orders") },
    { icon: Bell, label: "Notification Settings", onClick: () => soon("Notifications") },
  ];

  const replayOnboarding = () => {
    sessionStorage.removeItem("pe_app_onboarded");
    sessionStorage.removeItem("pe_app_phone");
    window.location.reload();
  };

  return (
    <div className="flex-1 flex flex-col animate-in fade-in duration-200 bg-[#FCFAF7]">
      {/* Profile header */}
      <div className="pt-6 pb-5 flex flex-col items-center">
        <div className="w-20 h-20 rounded-full bg-[#DCFCE7] flex items-center justify-center ring-4 ring-white shadow-sm">
          <User className="w-10 h-10 text-[#16A34A]" strokeWidth={1.8} />
        </div>
        <h1 className="text-xl font-black mt-3" style={{ ...serif, color: FOREST }}>
          Zeni
        </h1>
        <span className="text-[12px] text-slate-400 font-semibold mt-0.5">{phone}</span>
      </div>

      <div className="px-4 pb-6 space-y-5">
        {/* Account */}
        <Section title="Account">
          {account.map((row, i) => (
            <Row key={row.label} {...row} last={i === account.length - 1} />
          ))}
        </Section>

        {/* Preferences */}
        <Section title="Preferences">
          <Row icon={Globe} label="Language" value="English (US)" onClick={() => soon("Language")} />
          <Row icon={HelpCircle} label="Help & Support" onClick={() => soon("Help & Support")} last />
        </Section>

        {/* Logout / replay onboarding */}
        <button
          onClick={replayOnboarding}
          className="w-full bg-white border border-slate-200 rounded-2xl px-4 py-3.5 shadow-2xs flex items-center justify-center gap-2 text-[13px] font-bold text-[#D9383A] active:scale-[0.99] transition-transform"
        >
          <LogOut className="w-4 h-4" /> Log out
        </button>

        <p className="text-center text-[10px] text-slate-300 font-semibold">PrintEve · v1.0 · made in India 🇮🇳</p>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-2 px-1">{title}</h2>
      <div className="bg-white border border-slate-200 rounded-2xl shadow-2xs overflow-hidden">{children}</div>
    </div>
  );
}

function Row({
  icon: Icon,
  label,
  value,
  onClick,
  last,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value?: string;
  onClick?: () => void;
  last?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3.5 active:bg-slate-50 transition-colors ${
        last ? "" : "border-b border-slate-100"
      }`}
    >
      <span className="w-9 h-9 rounded-xl bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center flex-none">
        <Icon className="w-4.5 h-4.5" />
      </span>
      <span className="text-[13.5px] font-bold text-[#14432A] flex-1 text-left">{label}</span>
      {value && <span className="text-[11px] font-bold text-[#16A34A]">{value}</span>}
      <ChevronRight className="w-4 h-4 text-slate-300 flex-none" />
    </button>
  );
}
