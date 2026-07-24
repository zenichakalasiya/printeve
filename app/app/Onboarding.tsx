"use client";

import React, { useState, useRef, useEffect } from "react";
import { useApp } from "./context";
import { ArrowRight, ArrowLeft, X, ChevronDown, Smartphone } from "lucide-react";

const serif = { fontFamily: "var(--font-fraunces)" } as const;

const CREAM = "#F4EEDE";
const FOREST = "#14432A";

// Base-path aware so the logo resolves both locally ("") and on GitHub Pages ("/printeve").
const LOGO_SRC = `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/brand/printeve-logo.svg`;

type Step = "loading" | "splash" | "auth" | "phone" | "otp";

/* -------------------------------------------------------------------------- */
/*  Brand mark — PrintEve dove. Sourced from /public/brand/printeve-logo.svg.  */
/*  To use the exact original asset, replace that one file (or drop a          */
/*  printeve-logo.png beside it and point this <img> at it).                   */
/* -------------------------------------------------------------------------- */
function BrandMark({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const h = size === "lg" ? 60 : size === "sm" ? 34 : 46;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={LOGO_SRC}
      alt="PrintEve"
      style={{ height: h }}
      className="w-auto select-none"
      draggable={false}
    />
  );
}

function Wordmark({ className = "text-3xl" }: { className?: string }) {
  return (
    <span className={`${className} font-black tracking-tight`} style={serif}>
      <span style={{ color: FOREST }}>Print</span>
      <span className="text-[#16A34A]">Eve</span>
    </span>
  );
}

export default function Onboarding() {
  const { completeOnboarding } = useApp();
  const [step, setStep] = useState<Step>("loading");
  const [phone, setPhone] = useState("");

  // Loading → splash
  useEffect(() => {
    if (step !== "loading") return;
    const t = setTimeout(() => setStep("splash"), 1700);
    return () => clearTimeout(t);
  }, [step]);

  return (
    <div className="absolute inset-0 z-[60] overflow-hidden" style={{ backgroundColor: CREAM }}>
      {step === "loading" && <LoadingScreen />}
      {step === "splash" && <SplashScreen onStart={() => setStep("auth")} onLogin={() => setStep("auth")} />}
      {step === "auth" && (
        <AuthScreen
          onBack={() => setStep("splash")}
          onPhone={() => setStep("phone")}
          onSocial={() => completeOnboarding("social")}
        />
      )}
      {step === "phone" && (
        <PhoneScreen
          onBack={() => setStep("auth")}
          onClose={() => setStep("splash")}
          onContinue={(p) => {
            setPhone(p);
            setStep("otp");
          }}
        />
      )}
      {step === "otp" && (
        <OtpScreen
          phone={phone}
          onBack={() => setStep("phone")}
          onVerify={() => completeOnboarding(phone)}
        />
      )}
    </div>
  );
}

/* ----------------------------- 1 · Loading -------------------------------- */
function LoadingScreen() {
  return (
    <div className="h-full flex flex-col items-center justify-center gap-6 animate-in fade-in duration-300">
      <div className="animate-in zoom-in-75 fade-in duration-500 flex flex-col items-center gap-5">
        <div
          className="w-24 h-24 rounded-[26px] flex items-center justify-center shadow-xl shadow-[#0c3a22]/40"
          style={{ background: "linear-gradient(145deg,#0c3a22,#17683a)" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={LOGO_SRC} alt="PrintEve" style={{ height: 52 }} className="w-auto" draggable={false} />
        </div>
        <Wordmark className="text-4xl" />
      </div>
      <div className="w-32 h-1 rounded-full overflow-hidden bg-[#14432A]/10 mt-2">
        <div className="h-full w-1/2 bg-[#16A34A] rounded-full pe-loading-bar" />
      </div>
      <span className="text-[11px] font-semibold text-[#14432A]/50 tracking-wide">
        premium bulk printing
      </span>
    </div>
  );
}

/* ------------------------------ 2 · Splash -------------------------------- */
// Scattered mockup cards — exact positions/rotations from the V2 prototype.
const SPLASH_CARDS = [
  { label: "🪪 Cards", pos: "top-[24px] -left-6 w-[118px] h-[132px]", r: "rotate(-11deg)", delay: "0s", labelPos: "-bottom-2 left-3", Mock: MockCards },
  { label: "📄 Brochures", pos: "top-[64px] -right-5 w-[112px] h-[124px]", r: "rotate(9deg)", delay: ".8s", labelPos: "-bottom-2 right-3", Mock: MockBrochure },
  { label: "✨ Stickers", pos: "top-[268px] -left-8 w-[104px] h-[116px]", r: "rotate(8deg)", delay: "1.4s", labelPos: "-bottom-2 left-2", Mock: MockStickers },
  { label: "📣 Banners", pos: "top-[300px] -right-7 w-[110px] h-[122px]", r: "rotate(-8deg)", delay: ".4s", labelPos: "-bottom-2 right-2", Mock: MockBanner },
];

function SplashScreen({ onStart, onLogin }: { onStart: () => void; onLogin: () => void }) {
  return (
    <div className="h-full relative overflow-hidden animate-in fade-in duration-300">
      {/* scattered mockup cards */}
      <div className="absolute inset-0">
        {SPLASH_CARDS.map((c) => (
          <div
            key={c.label}
            className={`absolute pe-float ${c.pos}`}
            style={{ ["--r"]: c.r, animationDelay: c.delay } as React.CSSProperties}
          >
            <div
              className="w-full h-full rounded-[18px] overflow-hidden bg-white border border-black/5"
              style={{ boxShadow: "0 16px 30px -14px rgba(20,64,44,.4)" }}
            >
              <c.Mock />
            </div>
            <span
              className={`absolute ${c.labelPos} bg-white text-[9px] font-bold text-[#14432A] px-2 py-1 rounded-full shadow flex items-center gap-1`}
            >
              {c.label}
            </span>
          </div>
        ))}
      </div>

      {/* center brand block */}
      <div className="relative h-full flex flex-col items-center justify-center px-8 text-center pointer-events-none">
        <div className="flex items-center gap-2.5 mb-4">
          <BrandMark size="sm" />
          <Wordmark className="text-3xl" />
        </div>
        <h1 className="text-[27px] leading-[1.14] font-black max-w-[270px]" style={{ ...serif, color: FOREST }}>
          premium bulk printing, <em className="text-[#16A34A]">delivered</em> to your door
        </h1>
        <p className="text-[12.5px] text-[#14432A]/60 font-medium mt-3 leading-relaxed max-w-[250px]">
          Cards, stickers, brochures &amp; more — configured, proofed and shipped pan-India.
        </p>
      </div>

      {/* CTA */}
      <div className="absolute bottom-8 inset-x-6">
        <button
          onClick={onStart}
          className="w-full text-white text-[15px] font-bold py-4 rounded-full shadow-lg flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
          style={{ backgroundColor: FOREST }}
        >
          Get Started <ArrowRight className="w-4.5 h-4.5" />
        </button>
        <p className="text-[13px] text-[#14432A]/60 font-medium mt-4 text-center">
          Already have an account?{" "}
          <button onClick={onLogin} className="font-bold text-[#16A34A]">
            Log in
          </button>
        </p>
      </div>
    </div>
  );
}

/* --- Splash product mockups (pure CSS/SVG — no photos) -------------------- */
function MockCards() {
  return (
    <div className="w-full h-full flex items-center justify-center relative" style={{ background: "linear-gradient(150deg,#EAF7EF,#CDEAD8)" }}>
      <div className="absolute w-[74px] h-[46px] rounded-[8px] rotate-[8deg] translate-x-2 translate-y-3 shadow-md" style={{ background: "linear-gradient(135deg,#14432A,#1c5c3a)" }} />
      <div className="relative w-[78px] h-[48px] rounded-[8px] bg-white rotate-[-6deg] shadow-lg p-2 flex flex-col justify-between">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={LOGO_SRC} alt="" style={{ height: 11 }} className="w-auto" draggable={false} />
        <div className="space-y-[3px]">
          <div className="h-[3px] w-9 rounded-full" style={{ background: "#14432A" }} />
          <div className="h-[2px] w-7 rounded-full bg-slate-300" />
          <div className="h-[2px] w-8 rounded-full bg-slate-300" />
        </div>
      </div>
    </div>
  );
}

function MockBrochure() {
  return (
    <div className="w-full h-full flex items-center justify-center relative" style={{ background: "linear-gradient(150deg,#FEF4E4,#FADFBE)" }}>
      <div className="flex items-stretch rotate-[-5deg]" style={{ filter: "drop-shadow(0 8px 10px rgba(20,64,44,.18))", height: 82 }}>
        <div className="w-[17px] rounded-l-[4px]" style={{ background: "#E7DCC4" }} />
        <div className="w-[38px] bg-white px-[6px] py-[7px] flex flex-col gap-[3px]">
          <div className="h-[23px] rounded-[3px]" style={{ background: "linear-gradient(135deg,#16A34A,#22C55E)" }} />
          <div className="h-[3px] w-full rounded-full" style={{ background: "#14432A" }} />
          <div className="h-[2px] w-4/5 rounded-full bg-slate-300" />
          <div className="h-[2px] w-full rounded-full bg-slate-300" />
          <div className="mt-auto h-[6px] w-6 rounded-full" style={{ background: "#FDE047" }} />
        </div>
        <div className="w-[15px] rounded-r-[4px]" style={{ background: "#F4ECDD" }} />
      </div>
    </div>
  );
}

function MockStickers() {
  return (
    <div className="w-full h-full relative" style={{ background: "linear-gradient(150deg,#F1ECFF,#DFD3FF)" }}>
      {/* circle — dove */}
      <div className="absolute top-[9px] left-[9px] w-[38px] h-[38px] rounded-full bg-white flex items-center justify-center rotate-[-8deg]" style={{ boxShadow: "0 4px 8px rgba(20,64,44,.2)" }}>
        <div className="w-[30px] h-[30px] rounded-full flex items-center justify-center" style={{ background: "#DCFCE7" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={LOGO_SRC} alt="" style={{ height: 13 }} className="w-auto" draggable={false} />
        </div>
      </div>
      {/* star */}
      <div className="absolute top-[13px] right-[6px] rotate-[12deg]" style={{ filter: "drop-shadow(0 3px 5px rgba(20,64,44,.22))" }}>
        <svg width="32" height="32" viewBox="0 0 24 24" aria-hidden>
          <path d="M12 2l2.9 6.3 6.9.7-5.1 4.6 1.4 6.8L12 17.8 5.9 20.4l1.4-6.8L2.2 9l6.9-.7z" fill="#FDE047" stroke="#fff" strokeWidth="1.6" strokeLinejoin="round" />
        </svg>
      </div>
      {/* rounded square — sale */}
      <div className="absolute bottom-[10px] left-[14px] w-[30px] h-[30px] rounded-[9px] rotate-[6deg] flex items-center justify-center" style={{ background: "#3B82F6", border: "2.5px solid #fff", boxShadow: "0 4px 8px rgba(20,64,44,.2)" }}>
        <span className="text-white text-[13px] font-black leading-none">%</span>
      </div>
      {/* heart */}
      <div className="absolute bottom-[11px] right-[9px] rotate-[-10deg]" style={{ filter: "drop-shadow(0 3px 5px rgba(20,64,44,.22))" }}>
        <svg width="30" height="30" viewBox="0 0 24 24" aria-hidden>
          <path d="M12 21s-7-4.6-9.3-8.9C1.2 9 2.6 5.5 6 5.5c2 0 3.2 1.2 4 2.4.8-1.2 2-2.4 4-2.4 3.4 0 4.8 3.5 3.3 6.6C19 16.4 12 21 12 21z" fill="#EF4444" stroke="#fff" strokeWidth="1.6" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}

function MockBanner() {
  return (
    <div className="w-full h-full flex items-center justify-center relative" style={{ background: "linear-gradient(150deg,#E6F0FF,#C9DDFB)" }}>
      <div className="relative w-[90px] h-[56px] rounded-[6px] overflow-hidden rotate-[-3deg]" style={{ background: "linear-gradient(135deg,#15803D,#22C55E)", boxShadow: "0 8px 14px -6px rgba(20,64,44,.5)" }}>
        <span className="absolute top-[3px] left-[3px] w-[5px] h-[5px] rounded-full bg-white/80" />
        <span className="absolute top-[3px] right-[3px] w-[5px] h-[5px] rounded-full bg-white/80" />
        <span className="absolute bottom-[3px] left-[3px] w-[5px] h-[5px] rounded-full bg-white/80" />
        <span className="absolute bottom-[3px] right-[3px] w-[5px] h-[5px] rounded-full bg-white/80" />
        <div className="h-full flex flex-col items-center justify-center px-2">
          <div className="text-[8px] font-black text-white tracking-tight leading-[1.05]">GRAND</div>
          <div className="text-[8px] font-black text-white tracking-tight leading-[1.05]">OPENING</div>
          <div className="h-[3px] w-10 rounded-full mt-[3px]" style={{ background: "#FDE047" }} />
          <div className="text-[5.5px] font-bold text-white/85 mt-[2px] tracking-wide">50% OFF TODAY</div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------- 3 · Auth --------------------------------- */
function AuthScreen({
  onBack,
  onPhone,
  onSocial,
}: {
  onBack: () => void;
  onPhone: () => void;
  onSocial: () => void;
}) {
  return (
    <div className="h-full flex flex-col px-7 pt-6 animate-in fade-in slide-in-from-right-4 duration-300">
      <button
        onClick={onBack}
        aria-label="Back"
        className="w-11 h-11 rounded-full bg-white/70 flex items-center justify-center shadow-sm"
      >
        <ArrowLeft className="w-5 h-5 text-[#14432A]" />
      </button>

      <div className="flex-1 flex flex-col items-center justify-center">
        <BrandMark size="lg" />
        <h1 className="text-[34px] font-black mt-5" style={{ ...serif, color: FOREST }}>
          Sign up or log in
        </h1>
        <p className="text-[14px] text-[#14432A]/60 font-medium mt-1.5">to start your first print order</p>

        <div className="w-full mt-9 space-y-3">
          <SocialButton onClick={onSocial} bg="#FFFFFF" text="#14432A" border>
            <GoogleGlyph /> Continue with Google
          </SocialButton>
          <SocialButton onClick={onSocial} bg="#111111" text="#FFFFFF">
            <AppleGlyph /> Continue with Apple
          </SocialButton>
          <SocialButton onClick={onSocial} bg="#1877F2" text="#FFFFFF">
            <FacebookGlyph /> Continue with Facebook
          </SocialButton>
        </div>

        <div className="w-full flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-[#14432A]/15" />
          <span className="text-[12px] font-semibold text-[#14432A]/40">or</span>
          <div className="flex-1 h-px bg-[#14432A]/15" />
        </div>

        <button
          onClick={onPhone}
          className="w-full py-4 rounded-full border border-[#14432A]/25 flex items-center justify-center gap-2 text-[15px] font-bold active:scale-[0.98] transition-transform"
          style={{ color: FOREST }}
        >
          <Smartphone className="w-4.5 h-4.5" /> Use phone number
        </button>
      </div>

      <p className="text-center text-[12px] text-[#14432A]/45 font-medium pb-7">
        By continuing you agree to our <span className="font-bold text-[#14432A]/70">Terms</span> &amp;{" "}
        <span className="font-bold text-[#16A34A]">Privacy Policy</span>.
      </p>
    </div>
  );
}

/* ------------------------------- 4 · Phone -------------------------------- */
function PhoneScreen({
  onBack,
  onClose,
  onContinue,
}: {
  onBack: () => void;
  onClose: () => void;
  onContinue: (phone: string) => void;
}) {
  const [value, setValue] = useState("");
  const digits = value.replace(/\D/g, "");
  const valid = digits.length >= 10;

  return (
    <div className="h-full flex flex-col px-7 pt-6 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="flex items-center justify-between">
        <button onClick={onBack} aria-label="Back" className="w-11 h-11 rounded-full bg-white/70 flex items-center justify-center shadow-sm">
          <ArrowLeft className="w-5 h-5 text-[#14432A]" />
        </button>
        <button onClick={onClose} aria-label="Close" className="w-11 h-11 rounded-full bg-white/70 flex items-center justify-center shadow-sm">
          <X className="w-5 h-5 text-[#14432A]" />
        </button>
      </div>

      <h1 className="text-[32px] leading-tight font-black mt-6" style={{ ...serif, color: FOREST }}>
        Please enter your phone number below:
      </h1>

      <div className="mt-8">
        <label className="text-[13px] font-bold text-[#14432A]/60">Country / Region</label>
        <button className="w-full mt-2 h-14 bg-white rounded-2xl px-4 flex items-center justify-between shadow-sm">
          <span className="flex items-center gap-2.5 text-[15px] font-bold" style={{ color: FOREST }}>
            <span className="font-black">🇮🇳</span> India (+91)
          </span>
          <ChevronDown className="w-5 h-5 text-[#14432A]/40" />
        </button>
      </div>

      <div className="mt-5">
        <label className="text-[13px] font-bold text-[#14432A]/60">Phone number</label>
        <div className="w-full mt-2 h-14 bg-white rounded-2xl px-4 flex items-center gap-3 shadow-sm">
          <span className="text-[15px] font-black" style={{ color: FOREST }}>
            +91
          </span>
          <span className="w-px h-6 bg-[#14432A]/15" />
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            inputMode="numeric"
            placeholder="00000 00000"
            className="flex-1 bg-transparent outline-none text-[16px] font-bold tracking-wide placeholder:text-[#14432A]/30"
            style={{ color: FOREST }}
          />
        </div>
        <p className="text-[13px] text-[#14432A]/45 font-medium mt-3 leading-relaxed">
          We&apos;ll text you a one-time code to verify. Message &amp; data rates may apply.
        </p>
      </div>

      <button
        onClick={() => valid && onContinue(digits)}
        disabled={!valid}
        className="mt-8 w-full py-4 rounded-full text-white text-[15px] font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-40"
        style={{ backgroundColor: valid ? FOREST : "#B9B4A3" }}
      >
        Continue <ArrowRight className="w-4.5 h-4.5" />
      </button>
    </div>
  );
}

/* -------------------------------- 5 · OTP --------------------------------- */
function OtpScreen({ phone, onBack, onVerify }: { phone: string; onBack: () => void; onVerify: () => void }) {
  const [code, setCode] = useState(["", "", "", ""]);
  const refs = useRef<Array<HTMLInputElement | null>>([]);
  const full = code.every((c) => c !== "");

  const pretty = phone && phone !== "social" ? phone.replace(/(\d{5})(\d{5})/, "$1$2") : phone;

  const handle = (i: number, v: string) => {
    const d = v.replace(/\D/g, "").slice(-1);
    setCode((prev) => {
      const next = [...prev];
      next[i] = d;
      return next;
    });
    if (d && i < 3) refs.current[i + 1]?.focus();
  };

  const handleKey = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !code[i] && i > 0) refs.current[i - 1]?.focus();
  };

  return (
    <div className="h-full flex flex-col px-7 pt-6 animate-in fade-in slide-in-from-right-4 duration-300">
      <button onClick={onBack} aria-label="Back" className="w-11 h-11 rounded-full bg-white/70 flex items-center justify-center shadow-sm">
        <ArrowLeft className="w-5 h-5 text-[#14432A]" />
      </button>

      <h1 className="text-[34px] leading-tight font-black mt-6" style={{ ...serif, color: FOREST }}>
        Enter the 4-digit code
      </h1>
      <p className="text-[14px] text-[#14432A]/55 font-medium mt-2">
        Sent to <span className="font-bold text-[#14432A]">+91 {pretty}</span>
      </p>

      <div className="flex gap-3.5 mt-9">
        {code.map((c, i) => (
          <input
            key={i}
            ref={(el) => {
              refs.current[i] = el;
            }}
            value={c}
            onChange={(e) => handle(i, e.target.value)}
            onKeyDown={(e) => handleKey(i, e)}
            inputMode="numeric"
            maxLength={1}
            className={`flex-1 aspect-square rounded-2xl bg-white text-center text-2xl font-black shadow-sm outline-none border-2 transition-colors ${
              c ? "border-[#16A34A]" : "border-transparent focus:border-[#14432A]/40"
            }`}
            style={{ color: FOREST }}
          />
        ))}
      </div>

      <p className="text-center text-[13px] text-[#14432A]/50 font-medium mt-6">
        Didn&apos;t get it? <span className="font-bold" style={{ color: FOREST }}>Resend in 0:24</span>
      </p>

      <button
        onClick={() => full && onVerify()}
        disabled={!full}
        className="mt-6 w-full py-4 rounded-full text-white text-[15px] font-bold transition-all active:scale-[0.98] disabled:opacity-40"
        style={{ backgroundColor: full ? FOREST : "#B9B4A3" }}
      >
        Verify &amp; continue
      </button>
      <p className="text-center text-[12px] text-[#14432A]/40 font-medium mt-4">Demo tip: type any 4 digits</p>
    </div>
  );
}

/* ------------------------------- helpers ---------------------------------- */
function SocialButton({
  onClick,
  bg,
  text,
  border,
  children,
}: {
  onClick: () => void;
  bg: string;
  text: string;
  border?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full py-4 rounded-full flex items-center justify-center gap-2.5 text-[15px] font-bold shadow-sm active:scale-[0.98] transition-transform ${
        border ? "border border-black/10" : ""
      }`}
      style={{ backgroundColor: bg, color: text }}
    >
      {children}
    </button>
  );
}

function GoogleGlyph() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden>
      <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.6l6.7-6.7C35.6 2.6 30.2 0 24 0 14.6 0 6.4 5.4 2.5 13.3l7.8 6.1C12.2 13.3 17.6 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.5 3-2.2 5.5-4.7 7.2l7.3 5.7C43.6 37.9 46.5 31.8 46.5 24.5z" />
      <path fill="#FBBC05" d="M10.3 28.6c-.5-1.5-.8-3-.8-4.6s.3-3.1.8-4.6l-7.8-6.1C.9 16.5 0 20.1 0 24s.9 7.5 2.5 10.7l7.8-6.1z" />
      <path fill="#34A853" d="M24 48c6.2 0 11.4-2 15.2-5.5l-7.3-5.7c-2 1.4-4.7 2.3-7.9 2.3-6.4 0-11.8-3.8-13.7-9.3l-7.8 6.1C6.4 42.6 14.6 48 24 48z" />
    </svg>
  );
}
function AppleGlyph() {
  return (
    <svg width="16" height="18" viewBox="0 0 24 24" fill="#fff" aria-hidden>
      <path d="M17.05 12.04c-.02-2.02 1.65-2.99 1.72-3.04-.94-1.37-2.4-1.56-2.92-1.58-1.24-.13-2.42.73-3.05.73-.63 0-1.6-.71-2.63-.69-1.35.02-2.6.79-3.29 2-1.4 2.43-.36 6.02 1.01 7.99.67.96 1.47 2.04 2.51 2 1.01-.04 1.39-.65 2.61-.65 1.22 0 1.56.65 2.63.63 1.09-.02 1.78-.98 2.44-1.95.77-1.12 1.09-2.21 1.11-2.27-.02-.01-2.13-.82-2.15-3.25zM15.1 5.82c.56-.68.94-1.62.84-2.57-.81.03-1.79.54-2.37 1.22-.52.6-.98 1.56-.86 2.48.9.07 1.83-.46 2.39-1.13z" />
    </svg>
  );
}
function FacebookGlyph() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="#fff" aria-hidden>
      <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07z" />
    </svg>
  );
}
