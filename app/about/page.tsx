import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Printer,
  Users,
  Truck,
  BadgeCheck,
  ShieldCheck,
  Heart,
  TrendingUp,
  Award,
  Clock,
  Headphones,
  ArrowRight,
} from "lucide-react";

import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "About — PrintEve",
  description:
    "PrintEve helps businesses of every size bring their brand to life — with consistent quality, transparent pricing and dependable delivery.",
};

const stats = [
  { value: "10,000+", label: "Businesses Served" },
  { value: "250,000+", label: "Orders Fulfilled" },
  { value: "40+", label: "Print Partners Nationwide" },
  { value: "4.8 / 5", label: "Average Rating" },
];

const attributes = [
  { icon: Printer, title: "Modern Equipment", body: "Offset & digital presses for every job size." },
  { icon: Users, title: "Expert Team", body: "Print specialists guiding every order." },
  { icon: Truck, title: "Pan-India Delivery", body: "Tracked shipping to every pincode." },
  { icon: BadgeCheck, title: "ISO 9001 Certified", body: "Consistent quality management standards." },
];

const values = [
  {
    icon: ShieldCheck,
    title: "Quality First",
    body: "Every order is quality-checked before it leaves our facilities — no exceptions.",
  },
  {
    icon: Heart,
    title: "Customer Obsessed",
    body: "We build long-term relationships by being responsive, honest and easy to work with.",
  },
  {
    icon: TrendingUp,
    title: "Continuous Improvement",
    body: "We invest in better materials, equipment and processes every year.",
  },
];

const reasons = [
  { icon: Award, title: "Premium Print Quality", body: "Professional offset & digital presses, quality-checked before dispatch." },
  { icon: Clock, title: "Reliable Turnaround", body: "Same-week turnaround on most products, with clear timelines up front." },
  { icon: Truck, title: "Fast Delivery Network", body: "Tracked shipping to every pincode through our partner network." },
  { icon: Headphones, title: "Dedicated Support", body: "Print specialists on hand to guide every order, big or small." },
];

const timeline = [
  { year: "2016", title: "Founded", body: "Started as a small print shop serving local businesses in Bengaluru." },
  { year: "2019", title: "Online Platform Launched", body: "Brought our catalog online, enabling custom orders nationwide." },
  { year: "2022", title: "Print Partner Network", body: "Expanded to a network of quality-checked print partners across India." },
  { year: "2025", title: "10,000+ Businesses", body: "Crossed 10,000 business customers with same-week turnaround on most products." },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About PrintEve"
        title="Premium printing, built on trust"
        description="PrintEve helps businesses of every size bring their brand to life — from business cards and marketing materials to packaging and large-format banners — with consistent quality, transparent pricing and dependable delivery."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
      />

      {/* Stats */}
      <section className="border-b">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px overflow-hidden px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
          {stats.map((s) => (
            <div key={s.label} className="px-2 py-8 text-center lg:py-10">
              <p className="font-serif text-3xl font-medium tracking-tight sm:text-4xl">
                {s.value}
              </p>
              <p className="text-muted-foreground mt-1 text-sm">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Our Story */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
          <div>
            <span className="text-brand flex items-center gap-2 text-xs font-semibold tracking-[0.18em] uppercase">
              <span className="bg-brand inline-block h-px w-6" />
              Our story
            </span>
            <h2 className="font-serif mt-3 text-3xl font-medium tracking-tight sm:text-4xl">
              From one print shop to a nationwide platform
            </h2>
            <div className="text-muted-foreground mt-5 flex flex-col gap-4 text-pretty">
              <p>
                PrintEve began with a simple idea: ordering custom prints
                shouldn&apos;t mean compromising on quality, clarity of pricing,
                or reliability. What started as a single print shop has grown
                into a nationwide platform connecting businesses with a network
                of quality-checked print partners.
              </p>
              <p>
                Today, we produce everything from business cards and brochures
                to packaging and bulk marketing materials — combining
                professional-grade equipment with an online ordering experience
                designed for speed, transparency and peace of mind.
              </p>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl border">
            <Image
              src="https://picsum.photos/seed/printeve-about/1000/800"
              alt="Inside a PrintEve print facility"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>

        {/* Core attributes */}
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {attributes.map((a) => {
            const Icon = a.icon;
            return (
              <Card key={a.title} className="gap-3 p-6">
                <span className="bg-primary/10 text-brand flex size-11 items-center justify-center rounded-lg">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-2 font-medium">{a.title}</h3>
                <p className="text-muted-foreground text-sm">{a.body}</p>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Values */}
      <section className="bg-muted/40 border-y">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <h2 className="font-serif text-3xl font-medium tracking-tight sm:text-4xl">
            What we stand for
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <Card key={v.title} className="gap-3 p-6">
                  <span className="bg-brand/10 text-brand flex size-11 items-center justify-center rounded-lg">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="mt-2 text-lg font-medium">{v.title}</h3>
                  <p className="text-muted-foreground text-sm">{v.body}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why businesses choose PrintEve */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <h2 className="font-serif text-3xl font-medium tracking-tight sm:text-4xl">
          Why businesses choose PrintEve
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2">
          {reasons.map((r) => {
            const Icon = r.icon;
            return (
              <div key={r.title} className="flex gap-4 border-t pt-6">
                <span className="text-brand mt-0.5 shrink-0">
                  <Icon className="size-6" />
                </span>
                <div>
                  <h3 className="font-medium">{r.title}</h3>
                  <p className="text-muted-foreground mt-1 text-sm">{r.body}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-muted/40 border-y">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <span className="text-brand flex items-center gap-2 text-xs font-semibold tracking-[0.18em] uppercase">
            <span className="bg-brand inline-block h-px w-6" />
            Our journey
          </span>
          <h2 className="font-serif mt-3 text-3xl font-medium tracking-tight sm:text-4xl">
            How we got here
          </h2>

          <ol className="mt-10 border-l">
            {timeline.map((t) => (
              <li key={t.year} className="relative pb-10 pl-8 last:pb-0">
                <span className="bg-brand absolute top-1.5 -left-[5px] size-2.5 rounded-full ring-4 ring-[var(--muted)]" />
                <p className="text-brand font-serif text-xl font-medium">
                  {t.year}
                </p>
                <h3 className="mt-1 font-medium">{t.title}</h3>
                <p className="text-muted-foreground mt-1 max-w-xl text-sm">
                  {t.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="bg-primary text-primary-foreground flex flex-col items-start gap-5 rounded-2xl px-6 py-12 sm:px-12 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="font-serif text-3xl font-medium tracking-tight text-balance">
              Let&apos;s print something great together
            </h2>
            <p className="text-primary-foreground/80 mt-2 max-w-xl text-pretty">
              Premium custom printing for businesses of every size — produced
              with precision and delivered on time, every time.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/products">
                Browse products <ArrowRight />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              <Link href="/contact">Talk to our team</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
