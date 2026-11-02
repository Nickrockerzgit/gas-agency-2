import { company } from "../data/company";

const clean = (n: string) => n.replace(/[^\d+]/g, "");

export const telHref = (n: string) => `tel:${clean(n)}`;

/** "+917207394242" -> "+91 72073 94242" (Indian mobile numbers); anything else is shown as stored. */
export const formatPhone = (n: string) => {
  const m = clean(n).match(/^\+91(\d{5})(\d{5})$/);
  return m ? `+91 ${m[1]} ${m[2]}` : n;
};

export const whatsappHref = (n: string, text: string) =>
  `https://wa.me/${clean(n).replace("+", "")}?text=${encodeURIComponent(text)}`;

export const productEnquiryText = (label: string) =>
  `Hello, I would like to enquire about a ${label} LPG cylinder for my business.`;

export const generalEnquiryText = "Hello, I would like to enquire about commercial LPG supply for my business.";

export const hasContact = () => Boolean(company.phone || company.whatsapp);
