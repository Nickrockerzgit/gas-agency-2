import { CircleCheck, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { company } from "@/data/company";
import { Parallax, Reveal } from "./Reveal";
import { Section } from "./Section";

const points = [
  "Restaurants, hotels, caterers, cloud kitchens and institutional kitchens.",
  "Rates published with the date they take effect, after checking the applicable official rate list.",
  "Product variants listed only once they are confirmed.",
];

export function About() {
  return (
    <Section id="about" titleId="about-title" tone="tonal" className="md:py-24">
      <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
        <Reveal className="lg:order-2 lg:col-span-6" y={40} delay={0.1}>
          <p className="font-mono text-xs font-bold tracking-widest text-signal uppercase">About Us</p>
          <h1 id="about-title" className="mt-1 text-3xl font-bold sm:text-4xl">
            About {company.legalName.replace(" Private Limited", " Pvt. Ltd.")}
          </h1>

          <div className="mt-5 max-w-xl space-y-4 text-base text-foreground/80">
            <p>
              {company.legalName} is a commercial LPG distributor. We supply cylinders to food and hospitality businesses, and we handle
              business customers only.
            </p>
            <p>
              Prices and product details on this website are published only after they are verified. Where something is not yet confirmed,
              we say so and ask you to contact us.
            </p>
          </div>

          <ul className="mt-6 max-w-xl space-y-3">
            {points.map((p) => (
              <li key={p} className="flex items-start gap-3 text-[15px] font-semibold text-primary">
                <CircleCheck className="mt-0.5 size-5 shrink-0 text-signal" aria-hidden="true" />
                {p}
              </li>
            ))}
          </ul>

          <div className="mt-7 flex flex-wrap gap-2">
            <Badge variant="tonal" className="gap-1.5 bg-white px-2.5 py-1">
              <ShieldCheck aria-hidden="true" /> Commercial supply only
            </Badge>
            {company.affiliation && (
              <Badge variant="tonal" className="gap-1.5 bg-white px-2.5 py-1">
                <ShieldCheck aria-hidden="true" /> {company.affiliation}
              </Badge>
            )}
          </div>
        </Reveal>

        <Reveal className="lg:order-1 lg:col-span-6" y={50} scale={0.95}>
          <Parallax amount={24}>
          <img
            src="/img/about-storefront.webp"
            alt="Munna United commercial LPG storefront with cylinders stored beside the entrance"
            width={1400}
            height={859}
            loading="lazy"
            className="mx-auto h-auto w-full max-w-[540px] lg:mr-auto"
          />
          </Parallax>
        </Reveal>
      </div>
    </Section>
  );
}
