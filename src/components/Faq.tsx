import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { faqs } from "@/data/faqs";
import { Reveal } from "./Reveal";
import { Section, SectionHeader } from "./Section";

export function Faq() {
  return (
    <Section id="faq" titleId="faq-title">
      <SectionHeader
        id="faq-title"
        center
        eyebrow="Clarity on Commercial Supply"
        title="Frequently Asked Questions"
        description="Clear guidelines on non-domestic cylinder booking, billing, and distribution."
      />
      <Accordion type="single" collapsible className="mx-auto max-w-2xl space-y-2">
        {faqs.map((f, i) => (
          <Reveal key={f.q} y={24} delay={(i % 4) * 0.07}>
          <AccordionItem value={`q${i}`} className="rounded-lg border border-line bg-white px-4 shadow-sm last:border-b">
            <AccordionTrigger indicator="plus" className="min-h-11 items-center py-2.5 text-[15px] font-bold text-primary hover:no-underline">
              {f.q}
            </AccordionTrigger>
            {/* forceMount keeps every answer in the prerendered HTML */}
            <AccordionContent forceMount className="text-sm text-foreground/80">
              {f.a}
            </AccordionContent>
          </AccordionItem>
          </Reveal>
        ))}
      </Accordion>
    </Section>
  );
}
