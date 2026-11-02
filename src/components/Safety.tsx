import { ArrowRight, FileText, Phone, Truck, Wind, Wrench, type LucideIcon } from "lucide-react";
import { emergencyHelpline } from "@/data/company";
import { safetyItems, type SafetyIcon } from "@/data/safety";
import { LinkButton } from "./ContactAction";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

const icons: Record<SafetyIcon, LucideIcon> = {
  wind: Wind,
  wrench: Wrench,
  truck: Truck,
  file: FileText,
};

/** Shield with a cylinder inside, over concentric rings. */
function ShieldArt() {
  return (
    <svg viewBox="0 0 220 220" className="mx-auto h-44 w-44" role="img" aria-label="Shield with an LPG cylinder">
      <g fill="none" stroke="#fff" strokeOpacity="0.12">
        <circle cx="110" cy="110" r="108" />
        <circle cx="110" cy="110" r="88" />
        <circle cx="110" cy="110" r="68" />
      </g>
      <path
        d="M110 34 L170 56 V112 C170 148 143 170 110 184 C77 170 50 148 50 112 V56 Z"
        fill="none"
        stroke="#fff"
        strokeWidth="5"
        strokeLinejoin="round"
      />
      <path
        d="M110 44 L160 62 V112 C160 142 138 161 110 173 C82 161 60 142 60 112 V62 Z"
        fill="#fff"
        fillOpacity="0.06"
        stroke="#fff"
        strokeOpacity="0.5"
        strokeWidth="1.5"
      />
      <rect x="95" y="76" width="30" height="62" rx="12" fill="none" stroke="#fff" strokeWidth="4" />
      <rect x="103" y="66" width="14" height="10" rx="2" fill="none" stroke="#fff" strokeWidth="4" />
      <path d="M98 100 H122" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

export function Safety() {
  return (
    <Section id="safety" titleId="safety-title">
      <h2 id="safety-title" className="sr-only">
        Safety comes first
      </h2>
      <div className="rounded-2xl border border-line bg-white p-3 shadow-sm sm:p-4">
        <div className="grid gap-4 lg:grid-cols-12">
          <Reveal className="flex flex-col justify-between gap-8 rounded-xl bg-primary p-7 text-white lg:col-span-5 lg:p-9" y={44} scale={0.97}>
            <div className="space-y-4">
              <p className="flex items-center gap-3 font-mono text-[11px] font-bold tracking-widest uppercase">
                <span className="h-0.5 w-8 bg-signal" aria-hidden="true" /> LPG Safety
              </p>
              <p className="text-3xl leading-tight font-extrabold tracking-tight sm:text-4xl" aria-hidden="true">
                <span className="border-b-[3px] border-signal">Safe</span> kitchens. Start with awareness.
              </p>
              <p className="text-sm text-white/80">Essential LPG safety guidance for your business.</p>
            </div>
            <ShieldArt />
          </Reveal>

          <div className="py-2 lg:col-span-7 lg:px-4">
            <Reveal className="mb-3 space-y-3" y={24} delay={0.1}>
              <span className="block h-0.5 w-8 bg-signal" aria-hidden="true" />
              <h3 className="text-2xl font-bold">Good practices. Clear guidance.</h3>
            </Reveal>
            <ol className="divide-y divide-line">
              {safetyItems.map((item, i) => {
                const Icon = icons[item.icon];
                return (
                  <Reveal as="li" key={item.title} y={28} delay={0.15 + i * 0.1}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex min-h-20 items-center gap-4 py-3"
                      aria-label={`${item.title}: ${item.text}`}
                    >
                      <span className="w-6 shrink-0 font-mono text-xs text-primary/60" aria-hidden="true">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <Icon className="size-9 shrink-0 text-primary" strokeWidth={1.4} aria-hidden="true" />
                      <span className="min-w-0 flex-1">
                        <span className="block text-base font-bold text-primary">{item.title}</span>
                        <span className="block text-sm text-foreground/70">{item.text}</span>
                      </span>
                      <span
                        className="grid size-11 shrink-0 place-items-center rounded-full border border-primary text-primary transition-colors group-hover:bg-primary group-hover:text-white"
                        aria-hidden="true"
                      >
                        <ArrowRight className="size-4" />
                      </span>
                    </a>
                  </Reveal>
                );
              })}
            </ol>
          </div>
        </div>

        <Reveal className="mt-4 grid items-center gap-6 rounded-xl bg-signal px-6 py-6 text-white md:grid-cols-3 md:gap-0 md:py-5" y={40} scale={0.95}>
          <div className="md:pr-6">
            <p className="text-lg font-bold">Suspect an LPG leak?</p>
            <p className="text-sm text-white/90">Call from a safe location.</p>
          </div>
          <div className="text-center md:border-x md:border-white/25 md:px-6">
            <p className="font-mono text-[10px] font-semibold tracking-widest uppercase">LPG Emergency Helpline</p>
            <a href={`tel:${emergencyHelpline}`} className="inline-flex min-h-11 items-center text-6xl leading-none font-extrabold tracking-tight">
              {emergencyHelpline}
            </a>
            <p className="font-mono text-[10px] tracking-wider uppercase">Available 24 hours</p>
          </div>
          <div className="flex flex-col items-start gap-1 md:items-end md:pl-6">
            <LinkButton href={`tel:${emergencyHelpline}`} variant="outline" className="border-0 bg-white text-primary hover:bg-white/90 hover:text-primary">
              <Phone /> Call {emergencyHelpline}
            </LinkButton>
            <p className="text-xs text-white/90">Emergency support only</p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
