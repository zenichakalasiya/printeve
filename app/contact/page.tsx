import type { Metadata } from "next";
import { Mail, Phone, MessageCircle, Clock, MapPin } from "lucide-react";

import { PageHeader } from "@/components/layout/page-header";
import { ContactForm } from "@/components/contact/contact-form";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Contact & Support — PrintEve",
  description:
    "Get in touch with the PrintEve team for orders, bulk quotes, custom products and support. We respond within one business day.",
};

const channels = [
  { icon: Mail, label: "Email", value: "support@printeve.in", href: "mailto:support@printeve.in" },
  { icon: Phone, label: "Phone", value: "+91 98765 43210", href: "tel:+919876543210" },
  { icon: MessageCircle, label: "WhatsApp", value: "Chat with us", href: "#" },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact & Support"
        title="Let's get your print sorted"
        description="Questions, bulk quotes or custom requests — tell us a little about your project and the right person will get back to you within one business day."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-3 lg:gap-12">
          {/* Form */}
          <div className="lg:col-span-2">
            <h2 className="font-serif text-2xl font-medium tracking-tight">
              Send us an enquiry
            </h2>
            <p className="text-muted-foreground mt-1 text-sm">
              The more you share, the faster we can help — fields marked{" "}
              <span className="text-brand">*</span> are required.
            </p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>

          {/* Sidebar */}
          <aside className="flex flex-col gap-6">
            <Card className="gap-4 p-6">
              <h3 className="font-medium">Talk to us directly</h3>
              <ul className="flex flex-col gap-4">
                {channels.map((c) => {
                  const Icon = c.icon;
                  return (
                    <li key={c.label}>
                      <a
                        href={c.href}
                        className="group flex items-center gap-3"
                      >
                        <span className="bg-primary/10 text-brand flex size-10 items-center justify-center rounded-lg">
                          <Icon className="size-5" />
                        </span>
                        <span className="flex flex-col">
                          <span className="text-muted-foreground text-xs">
                            {c.label}
                          </span>
                          <span className="group-hover:text-brand text-sm font-medium">
                            {c.value}
                          </span>
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </Card>

            <Card className="gap-4 p-6">
              <h3 className="font-medium">Support hours</h3>
              <p className="text-muted-foreground flex items-start gap-3 text-sm">
                <Clock className="text-brand mt-0.5 size-5 shrink-0" />
                Mon – Sat, 9:30 AM – 7:00 PM IST. We reply to all enquiries
                within one business day.
              </p>
              <p className="text-muted-foreground flex items-start gap-3 text-sm">
                <MapPin className="text-brand mt-0.5 size-5 shrink-0" />
                PrintEve, Bengaluru, India — serving customers nationwide
                through a verified printer network.
              </p>
            </Card>

            <Card className="bg-muted/40 gap-2 p-6">
              <h3 className="font-medium">Are you a print shop?</h3>
              <p className="text-muted-foreground text-sm">
                Join our verified printer network and receive a steady stream of
                jobs. Choose “Become a printing partner” in the form.
              </p>
            </Card>
          </aside>
        </div>
      </div>
    </>
  );
}
