import type { ComponentProps, ReactNode } from "react";
import { MessageCircle, Navigation, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { company } from "@/data/company";
import { generalEnquiryText, productEnquiryText, telHref, whatsappHref } from "@/lib/links";
import { Link } from "@/lib/router";
import { cn } from "@/lib/utils";

type ButtonProps = Pick<ComponentProps<typeof Button>, "variant" | "size" | "className">;

export function LinkButton({
  href,
  external,
  children,
  ...rest
}: ButtonProps & { href: string; external?: boolean; children: ReactNode }) {
  return (
    <Button asChild {...rest}>
      {href.startsWith("/") ? (
        <Link href={href}>{children}</Link>
      ) : (
        <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
          {children}
        </a>
      )}
    </Button>
  );
}

/** Call button. Links to the contact section until a verified number is added. */
export function CallButton({
  label = "Call for Enquiry",
  variant = "signal",
  icon = <Phone />,
  ...rest
}: ButtonProps & { label?: ReactNode; icon?: ReactNode }) {
  return (
    <LinkButton href={company.phone ? telHref(company.phone) : "/#contact"} variant={variant} {...rest}>
      {icon} {label}
    </LinkButton>
  );
}

/** WhatsApp button; pass a product label for a product-specific enquiry text. */
export function WhatsAppButton({
  productLabel,
  label,
  variant = "outline",
  icon = <MessageCircle />,
  ...rest
}: ButtonProps & { productLabel?: string; label?: ReactNode; icon?: ReactNode }) {
  const text = label ?? (productLabel ? `Enquire about ${productLabel}` : "WhatsApp Us");
  if (!company.whatsapp) {
    return (
      <LinkButton href="/#contact" variant={variant} {...rest}>
        {icon} {text}
      </LinkButton>
    );
  }
  const msg = productLabel ? productEnquiryText(productLabel) : generalEnquiryText;
  return (
    <LinkButton href={whatsappHref(company.whatsapp, msg)} variant={variant} external {...rest}>
      {icon} {text}
    </LinkButton>
  );
}

export function DirectionsButton({ variant = "outline", ...rest }: ButtonProps) {
  if (!company.directionsUrl) return null;
  return (
    <LinkButton href={company.directionsUrl} variant={variant} external {...rest}>
      <Navigation /> Get Directions
    </LinkButton>
  );
}

/** "Get it on Google Play" badge. Links out once company.playStoreUrl is set; until then it is shown without a link. */
export function PlayStoreBadge({ className }: { className?: string }) {
  const img = (
    <img
      src="/img/google-play-badge.webp"
      alt="Get it on Google Play"
      width={600}
      height={189}
      className={cn("block h-14 w-auto", className)}
    />
  );
  if (!company.playStoreUrl) return <span title="Android app coming soon">{img}</span>;
  return (
    <a
      href={company.playStoreUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block transition-transform duration-200 hover:-translate-y-0.5"
    >
      {img}
    </a>
  );
}
