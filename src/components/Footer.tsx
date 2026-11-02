import type { ReactNode } from "react";
import { Clock, Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import { company, emergencyHelpline } from "@/data/company";
import { formatPhone, telHref } from "@/lib/links";
import { Link } from "@/lib/router";
import { nav } from "./Header";
import { MobileBar } from "./MobileBar";
import { Reveal } from "./Reveal";
import { Container } from "./Section";

const accent = "text-[#ff8a9a]";

function Detail({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span className={`mt-1 shrink-0 ${accent}`} aria-hidden="true">
        {icon}
      </span>
      <span className="min-w-0 text-white/85 [overflow-wrap:anywhere]">{children}</span>
    </li>
  );
}

export function Footer() {
  const noContact = !company.phone && !company.email && !company.hours;
  return (
    <>
      <footer
        className="relative bg-[#01244c] bg-[url('/img/footer-skyline.webp')] bg-[length:auto_300px] bg-[position:37%_bottom] bg-no-repeat text-white md:bg-[length:100%_auto] md:bg-bottom"
      >
        <Container className="grid gap-10 py-12 text-sm md:grid-cols-2 lg:grid-cols-12">
          <Reveal className="space-y-4 lg:col-span-5" y={28}>
            <div>
              <p className="text-xl font-bold">{company.legalName.replace(" Private Limited", " Pvt. Ltd.")}</p>
              <p className={`mt-1 font-mono text-[11px] font-bold tracking-wider uppercase ${accent}`}>Commercial LPG Specialist</p>
            </div>
            <p className="max-w-md leading-relaxed text-white/80">
              Commercial LPG cylinder supply for restaurants, hotels, caterers, cloud kitchens and institutional kitchens. Contact our team
              for availability, applicable rates and supply enquiries.
            </p>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-bold">
              <li className="flex items-center gap-1.5">
                <ShieldCheck className={`size-4 ${accent}`} aria-hidden="true" /> Commercial supply only
              </li>
              {company.affiliation && (
                <li className="flex items-center gap-1.5">
                  <ShieldCheck className={`size-4 ${accent}`} aria-hidden="true" /> {company.affiliation}
                </li>
              )}
            </ul>
          </Reveal>

          <Reveal className="lg:col-span-3 lg:col-start-7" y={28} delay={0.1}>
          <nav aria-label="Footer">
            <h2 className="mb-4 text-xl font-bold text-white">Quick Links</h2>
            <ul className="space-y-1">
              {nav.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="inline-flex min-h-9 items-center text-white/85 hover:text-white hover:underline">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          </Reveal>

          <Reveal className="lg:col-span-3" y={28} delay={0.2}>
            <h2 className="mb-4 text-xl font-bold text-white">Central Dispatch</h2>
            <ul className="space-y-3">
              {company.addressLines && <Detail icon={<MapPin className="size-4" />}>{company.addressLines.join(", ")}</Detail>}
              {company.phone && (
                <Detail icon={<Phone className="size-4" />}>
                  <a href={telHref(company.phone)} className="hover:underline">
                    {formatPhone(company.phone)}
                  </a>
                </Detail>
              )}
              {company.email && (
                <Detail icon={<Mail className="size-4" />}>
                  <a href={`mailto:${company.email}`} className="hover:underline">
                    {company.email}
                  </a>
                </Detail>
              )}
              {company.hours && <Detail icon={<Clock className="size-4" />}>{company.hours}</Detail>}
              {noContact && <li className="pl-7 text-white/60">Phone, email and hours will be published soon.</li>}
            </ul>
          </Reveal>
        </Container>

        <Container>
          <div className="border-t border-white/10" aria-hidden="true" />
        </Container>

        {/* Leaves the skyline visible between the notice and the legal bar. */}
        <div className="h-28 md:h-32 lg:h-36" aria-hidden="true" />

        <div className="bg-gradient-to-t from-[#01244c]/95 via-[#01244c]/70 to-transparent pt-10">
        <Container>
          <div className="flex flex-col items-start justify-between gap-3 py-6 text-xs font-bold text-white/90 sm:flex-row sm:items-center">
            <p>
              © <span suppressHydrationWarning>{new Date().getFullYear()}</span> {company.legalName}. All rights reserved.
            </p>
            <ul className="flex flex-wrap gap-x-6 gap-y-1">
              <li>
                <Link href="/#safety" className="inline-flex min-h-8 items-center hover:underline">
                  Safety Protocols
                </Link>
              </li>
              <li>
                <a href={`tel:${emergencyHelpline}`} className="inline-flex min-h-8 items-center hover:underline">
                  Emergency Helpline
                </a>
              </li>
              <li>
                <Link href="/#contact" className="inline-flex min-h-8 items-center hover:underline">
                  Enquiries
                </Link>
              </li>
            </ul>
          </div>
        </Container>
        </div>
      </footer>
      <MobileBar />
    </>
  );
}
