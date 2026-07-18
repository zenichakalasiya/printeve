import { Palette, ScanLine, Sparkles, Users } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/home/section-heading";

const upcoming = [
  {
    icon: Palette,
    title: "In-browser design editor",
    description:
      "Design directly on the product surface — no external tools needed.",
  },
  {
    icon: ScanLine,
    title: "Smart label & roll printing",
    description:
      "Auto-layout labels manually or on a roll, with live measurement units.",
  },
  {
    icon: Users,
    title: "Team & bulk accounts",
    description:
      "Shared carts, approvals and reorder history for growing businesses.",
  },
  {
    icon: Sparkles,
    title: "AI design assist",
    description:
      "Generate print-ready artwork from a prompt, then fine-tune it.",
  },
];

export function UpcomingFeatures() {
  return (
    <section id="upcoming" className="scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <SectionHeading
          eyebrow="On the roadmap"
          title="Upcoming features"
          description="What we're building next to make custom printing even easier."
        />

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {upcoming.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card
                key={feature.title}
                className="border-dashed gap-3 p-6"
              >
                <div className="flex items-center justify-between">
                  <span className="bg-muted text-foreground flex size-11 items-center justify-center rounded-lg">
                    <Icon className="size-5" />
                  </span>
                  <Badge variant="secondary">Coming soon</Badge>
                </div>
                <h3 className="mt-2 font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">
                  {feature.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
