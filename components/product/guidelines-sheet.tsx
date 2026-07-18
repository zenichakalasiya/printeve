"use client";

import { Info, Ruler, ShieldCheck, ScanLine, Palette, Type, FileText } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const guidelines = [
  {
    icon: Ruler,
    title: "Size & Bleed",
    body: "91mm × 61mm (3mm bleed included). Trim size is 85mm × 55mm.",
  },
  {
    icon: ShieldCheck,
    title: "Safe Zone",
    body: "Keep critical text and logos 5mm inside the borders.",
  },
  {
    icon: ScanLine,
    title: "Resolution",
    body: "300 to 500 DPI for crisp, sharp printing.",
  },
  {
    icon: Palette,
    title: "Colour Mode",
    body: "CMYK colours only — convert RGB files before uploading.",
  },
  {
    icon: Type,
    title: "Fonts",
    body: "Minimum size 8pt. Convert text layers to outlines / curves.",
  },
  {
    icon: FileText,
    title: "Formats",
    body: "PDF (preferred), PNG, JPG.",
  },
];

export function GuidelinesSheet() {
  return (
    <Sheet>
      <SheetTrigger className="text-brand hover:text-brand/80 inline-flex items-center gap-1 text-xs font-medium">
        <Info className="size-3.5" /> Guidelines
      </SheetTrigger>
      <SheetContent side="right" className="w-full gap-0 overflow-y-auto sm:max-w-md">
        <SheetHeader className="border-b">
          <SheetTitle className="font-serif text-2xl font-medium">
            Design guidelines
          </SheetTitle>
          <SheetDescription>
            Follow these to make sure your file prints exactly as you expect.
          </SheetDescription>
        </SheetHeader>
        <ul className="flex flex-col gap-5 p-6">
          {guidelines.map((g, i) => {
            const Icon = g.icon;
            return (
              <li key={g.title} className="flex gap-4">
                <span className="bg-primary/10 text-brand flex size-10 shrink-0 items-center justify-center rounded-lg">
                  <Icon className="size-5" />
                </span>
                <div>
                  <p className="text-sm font-medium">
                    {i + 1}. {g.title}
                  </p>
                  <p className="text-muted-foreground mt-0.5 text-sm">
                    {g.body}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </SheetContent>
    </Sheet>
  );
}
