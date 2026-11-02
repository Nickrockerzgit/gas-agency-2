import { motion } from "motion/react";
import { CircleCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { company, emergencyHelpline } from "@/data/company";
import { publishedProducts } from "@/data/products";
import { cn } from "@/lib/utils";
import { CallButton, PlayStoreBadge } from "./ContactAction";
import { HeroCylinders } from "./HeroCylinders";
import { Container } from "./Section";

function Fact({ label, value, signal }: { label: string; value: string; signal?: boolean }) {
  return (
    <div className="rounded border border-line bg-tonal p-3">
      <span className="block font-mono text-[11px] text-primary/70 uppercase">{label}</span>
      <span className={cn("text-sm font-bold", signal ? "text-signal" : "text-primary")}>{value}</span>
    </div>
  );
}

export function Hero() {
  const area = company.serviceArea ? ` in ${company.serviceArea}` : "";
  const sizes = publishedProducts.map((p) => p.capacityKg);
  const range = sizes.length > 1 ? `${Math.min(...sizes)} kg to ${Math.max(...sizes)} kg` : `${sizes[0]} kg`;
  return (
    <section id="home" aria-labelledby="hero-title" className="overflow-x-clip border-b border-line bg-white py-12 md:py-16">
      <Container className="relative grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
        {/* Content is always visible; motion only nudges position (no opacity gate). */}
        <motion.div className="relative z-10 space-y-6 lg:col-span-6" initial={{ y: 14 }} animate={{ y: 0 }} transition={{ duration: 0.5, ease: "easeOut" }}>
          <Badge variant="tonal" className="rounded-full border-primary/15 bg-tonal px-3 py-1 font-mono text-xs tracking-wider">
            <span className="size-2 rounded-full bg-signal" aria-hidden="true" /> Commercial LPG Supply
          </Badge>
          <h1 id="hero-title" className="text-4xl font-extrabold sm:text-5xl lg:text-[64px] lg:leading-[1.08]">
            Commercial LPG for Your Business
          </h1>
          <p className="max-w-xl text-lg text-primary/80">
            Explore cylinder options for your commercial kitchen{area}. Contact our team for availability, applicable rates and supply enquiries.
          </p>
          <div className="flex flex-col items-stretch gap-4 pt-2 sm:flex-row sm:items-center">
            <CallButton size="lg" className="shadow-md" />
            <PlayStoreBadge />
          </div>
          <p className="flex items-center gap-2 pt-1 text-sm font-semibold text-primary">
            <CircleCheck className="size-[18px]" aria-hidden="true" /> For restaurants, hotels, caterers and commercial kitchens.
          </p>
          <div className="grid grid-cols-3 gap-3 border-t border-line pt-6">
            <Fact label="Dispatches" value="Commercial LPG" />
            <Fact label="Scale" value={range} />
            <Fact label="Support" value={`Helpline ${emergencyHelpline}`} signal />
          </div>
        </motion.div>

        <div className="lg:col-span-6">
          <HeroCylinders />
        </div>
      </Container>
    </section>
  );
}
