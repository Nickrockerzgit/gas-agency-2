import { useEffect, useState } from "react";
import { BadgeCheck, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { company } from "@/data/company";
import { formatPhone } from "@/lib/links";
import { Link, useRoute } from "@/lib/router";
import { getLenis } from "@/lib/smoothScroll";
import { cn } from "@/lib/utils";
import { CallButton } from "./ContactAction";

export const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#safety", label: "Safety" },
  { href: "/#contact", label: "Contact" },
];

export function TopStrip() {
  return (
    <div className="bg-primary text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 text-[11px] font-bold tracking-wider uppercase md:px-12">
        <div className="flex items-center gap-2">
          <BadgeCheck className="size-3.5 shrink-0 text-signal" aria-hidden="true" />
          <span>
            Commercial LPG enquiries only
            {company.affiliation && <> | {company.affiliation}</>}
          </span>
        </div>
        <div className="hidden items-center gap-4 font-normal text-white/70 md:flex">
          {company.cin && <span>CIN: {company.cin}</span>}
          {company.cin && company.phone && <span aria-hidden="true">|</span>}
          {company.phone && <span>Hotline: {formatPhone(company.phone)}</span>}
        </div>
      </div>
    </div>
  );
}

/** On /about the About link is active; on the home page the section nearest the top of the viewport wins. */
function useActiveHref() {
  const route = useRoute();
  const [active, setActive] = useState("/");
  useEffect(() => {
    if (route !== "/") return;
    const update = () => {
      let current = "/";
      for (const n of nav) {
        const hash = n.href.split("#")[1];
        const el = hash && document.getElementById(hash);
        if (el && el.getBoundingClientRect().top <= 140) current = n.href;
      }
      setActive(current);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [route]);
  return route === "/about" ? "/about" : active;
}

export function Header() {
  const [open, setOpen] = useState(false);
  const active = useActiveHref();
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 md:px-12">
        <Link href="/" className="flex flex-col leading-tight">
          <span className="text-lg font-bold tracking-tight text-primary sm:text-xl">
            {company.legalName.replace(" Private Limited", " Pvt. Ltd.")}
          </span>
          <span className="text-[11px] font-bold tracking-widest text-signal uppercase">Commercial LPG Specialist</span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-6 lg:flex">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              aria-current={active === n.href ? "true" : undefined}
              className={cn(
                "border-b-2 py-1 text-sm font-semibold transition-colors",
                active === n.href ? "border-primary font-bold text-primary" : "border-transparent text-foreground/70 hover:text-primary",
              )}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <CallButton label="Call Now" size="sm" className="rounded shadow-sm" />
          </div>
          <Sheet
            open={open}
            onOpenChange={(o) => {
              setOpen(o);
              // Keep the page still behind the open menu.
              if (o) getLenis()?.stop();
              else getLenis()?.start();
            }}
          >
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden" aria-label="Open menu">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle className="text-primary">Menu</SheetTitle>
                <SheetDescription className="sr-only">Site navigation</SheetDescription>
              </SheetHeader>
              <nav aria-label="Mobile" className="flex flex-col px-2">
                {nav.map((n) => (
                  <SheetClose asChild key={n.href}>
                    <Link href={n.href} className="flex min-h-12 items-center rounded-lg px-3 font-semibold text-primary hover:bg-tonal">
                      {n.label}
                    </Link>
                  </SheetClose>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
