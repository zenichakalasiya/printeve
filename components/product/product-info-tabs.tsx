"use client";

import {
  type Product,
  productSpecs,
  productFaqs,
} from "@/lib/data/products";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const finishGuidelines = [
  "Matte laminate: low-glare, premium and fingerprint-resistant — our most popular finish.",
  "Gloss laminate: vivid colours and high shine, best for photo-rich designs.",
  "Velvet finish: soft, tactile, suede-like feel for a luxury impression.",
  "Keep laminated cards away from prolonged direct sunlight to preserve colour.",
];

export function ProductInfoTabs({ product }: { product: Product }) {
  const specs = productSpecs(product);
  const faqs = productFaqs(product);

  return (
    <Tabs defaultValue="specs" className="gap-6">
      <TabsList>
        <TabsTrigger value="specs">Specifications</TabsTrigger>
        <TabsTrigger value="faqs">FAQs</TabsTrigger>
        <TabsTrigger value="finish">Finish & Care</TabsTrigger>
      </TabsList>

      <TabsContent value="specs">
        <dl className="grid grid-cols-1 gap-x-10 gap-y-0 sm:grid-cols-2">
          {specs.map((s) => (
            <div
              key={s.label}
              className="flex items-center justify-between gap-4 border-b py-3 text-sm"
            >
              <dt className="text-muted-foreground">{s.label}</dt>
              <dd className="text-right font-medium">{s.value}</dd>
            </div>
          ))}
        </dl>
      </TabsContent>

      <TabsContent value="faqs">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`faq-${i}`}>
              <AccordionTrigger>{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </TabsContent>

      <TabsContent value="finish">
        <ul className="flex flex-col gap-3">
          {finishGuidelines.map((g) => (
            <li key={g} className="flex items-start gap-2.5 text-sm">
              <span className="bg-brand mt-2 inline-block size-1.5 shrink-0 rounded-full" />
              <span className="text-muted-foreground">{g}</span>
            </li>
          ))}
        </ul>
      </TabsContent>
    </Tabs>
  );
}
