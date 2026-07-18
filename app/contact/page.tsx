import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

import { PageHeader } from "@/components/layout/page-header";
import { ContactForm } from "@/components/contact/contact-form";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Contact — PrintEve",
  description:
    "Have a question about an order, bulk pricing, or custom artwork? Get in touch with the PrintEve team.",
};

const contactInfo = [
  {
    icon: Phone,
    label: "Phone",
    value: "+91 12345 67890",
    href: "tel:+911234567890",
  },
  {
    icon: Mail,
    label: "Email",
    value: "support@printeve.com",
    href: "mailto:support@printeve.com",
  },
  {
    icon: MapPin,
    label: "Address",
    value: "4th Floor, Print House, MG Road, Bengaluru, Karnataka 560001",
  },
  {
    icon: Clock,
    label: "Business Hours",
    value: "Mon – Sat, 9:00 AM – 7:00 PM IST",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Get in Touch"
        description="Have a question about an order, bulk pricing, or custom artwork? Our team is happy to help."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-3 lg:gap-12">
          {/* Form */}
          <div className="lg:col-span-2">
            <Card className="p-6 sm:p-8">
              <ContactForm />
            </Card>
          </div>

          {/* Contact info */}
          <aside className="flex flex-col gap-4">
            {contactInfo.map((item) => {
              const Icon = item.icon;
              const content = (
                <Card className="flex-row items-start gap-4 p-5">
                  <span className="bg-primary/10 text-brand flex size-10 shrink-0 items-center justify-center rounded-lg">
                    <Icon className="size-5" />
                  </span>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-muted-foreground text-xs">
                      {item.label}
                    </span>
                    <span className="text-sm font-medium">{item.value}</span>
                  </div>
                </Card>
              );
              return item.href ? (
                <a
                  key={item.label}
                  href={item.href}
                  className="hover:[&_span:last-child]:text-brand transition-colors"
                >
                  {content}
                </a>
              ) : (
                <div key={item.label}>{content}</div>
              );
            })}
          </aside>
        </div>
      </div>
    </>
  );
}
