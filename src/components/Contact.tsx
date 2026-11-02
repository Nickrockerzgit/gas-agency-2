import type { ReactNode } from "react";
import { Info, Mail, MapPin, Navigation, Phone, Store } from "lucide-react";
import { company } from "@/data/company";
import { formatPhone, telHref } from "@/lib/links";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

function DeskRow({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <li className="flex items-start gap-5 border-b border-line py-5 first:pt-0">
      <span className="mt-0.5 shrink-0 text-signal" aria-hidden="true">
        {icon}
      </span>
      <div>
        <p className="text-lg font-bold text-primary">{label}</p>
        <div className="text-base text-foreground/60">{children}</div>
      </div>
    </li>
  );
}

const ComingSoon = () => <span>Details coming soon</span>;

export function Contact() {
  const phone = company.phone ?? company.whatsapp;
  const address = company.addressLines?.map((line, i, all) => {
    const text = line.replace(" - ", " – ");
    return i < all.length - 1 && !text.endsWith(",") ? `${text},` : text;
  });

  return (
    <Section id="contact" titleId="contact-title" tone="white">
      <div className="grid items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
        <Reveal className="lg:col-span-6" y={40}>
          <p className="flex items-center gap-4 font-mono text-xs font-bold tracking-[0.2em] text-signal uppercase">
            Contact Munna United
            <span className="h-0.5 w-10 bg-signal" aria-hidden="true" />
          </p>
          <h2 id="contact-title" className="mt-4 text-4xl leading-[1.05] font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Let’s discuss your LPG requirements.
          </h2>
          <p className="mt-4 text-lg text-foreground/60">Commercial LPG enquiries for businesses in Hyderabad.</p>

          <h3 className="mt-10 text-2xl font-extrabold sm:text-3xl">Commercial LPG enquiry desk</h3>
          <ul className="mt-6">
            <DeskRow icon={<Phone className="size-7" />} label="Phone & WhatsApp">
              {phone ? (
                <a href={telHref(phone)} className="hover:underline">
                  {formatPhone(phone)}
                </a>
              ) : (
                <ComingSoon />
              )}
            </DeskRow>
            <DeskRow icon={<Mail className="size-7" />} label="Email">
              {company.email ? (
                <a href={`mailto:${company.email}`} className="hover:underline">
                  {company.email}
                </a>
              ) : (
                <ComingSoon />
              )}
            </DeskRow>
          </ul>

          <div className="mt-2 flex items-start gap-4 rounded-xl bg-[#e8f1fc] px-5 py-4">
            <Info className="mt-1 size-6 shrink-0 text-[#1d6fdc]" aria-hidden="true" />
            <div>
              <p className="font-bold text-primary">For your enquiry</p>
              <p className="text-[15px] text-foreground/70">Keep your cylinder size, quantity and delivery location ready.</p>
            </div>
          </div>
        </Reveal>

        <Reveal className="flex flex-col overflow-hidden rounded-2xl bg-[#012a52] text-white lg:col-span-6" y={40} delay={0.15} scale={0.97}>
          <div className="px-8 pt-10 pb-8 sm:px-10">
            <MapPin className="size-10 fill-signal text-signal" aria-hidden="true" />
            <h3 className="mt-3 text-3xl font-extrabold text-white sm:text-4xl">Visit our registered office</h3>
            {address && (
              <address className="mt-6 text-base leading-8 text-white/90 not-italic sm:text-lg xl:text-xl xl:leading-9">
                {address.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
            )}
            <hr className="mt-6 border-white/20" />
            <p className="mt-5 text-base text-white/80">Please confirm your visit with our team in advance.</p>
            {company.directionsUrl && (
              <a
                href={company.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-3 rounded-lg border-2 border-white px-6 py-3.5 text-lg font-bold text-white transition-colors hover:bg-white hover:text-primary"
              >
                <Navigation className="size-5 fill-current" aria-hidden="true" /> Get Directions
              </a>
            )}
          </div>
          <img
            src="/img/contact-depot.webp"
            alt="Illustration of the LPG depot with a warehouse, storage tanks and a cylinder delivery truck"
            width={658}
            height={213}
            loading="lazy"
            className="mt-auto block h-auto w-full"
          />
        </Reveal>
      </div>

      <Reveal className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5" y={20}>
        <p className="flex items-center gap-3 font-bold text-primary">
          <Store className="size-6 text-signal" aria-hidden="true" /> Commercial supply only
        </p>
        <span className="hidden h-6 w-px bg-line sm:block" aria-hidden="true" />
        <p className="text-sm text-foreground/60">Availability, rates and supply arrangements are confirmed by our team.</p>
      </Reveal>
    </Section>
  );
}
