// Business owner must confirm every value here before launch.
// Leave a field as null until it is verified: the site hides or falls back gracefully.
export interface Company {
  legalName: string;
  /** Corporate / tax identifiers shown on the registered-office signboard */
  cin: string | null;
  gstin: string | null;
  /** Approved affiliation wording only (as cleared by the owner). null = not published. */
  affiliation: string | null;
  /** E.164 format, e.g. "+919876543210" */
  phone: string | null;
  whatsapp: string | null;
  email: string | null;
  addressLines: string[] | null;
  /** City / distribution area, e.g. "Patna" */
  serviceArea: string | null;
  coverageNote: string | null;
  hours: string | null;
  /** Google Maps (or similar) link to the verified location */
  directionsUrl: string | null;
  /** Google Play listing of the Munna United app. null = badge is shown without a link. */
  playStoreUrl: string | null;
  /** Public site URL, e.g. "https://example.com" (also settable via SITE_URL at build time) */
  siteUrl: string | null;
}

export const company: Company = {
  legalName: "Munna United Distributors Private Limited",
  cin: "U46610TS2025TC193120",
  gstin: "36AASCM8686R1ZY",
  // Owner stated IOCL registration; confirm exact wording before launch.
  affiliation: "Registered Distributor with IOCL",
  phone: "+917207394242",
  whatsapp: "+917207394242",
  email: "support@munnauniteddistribution.com",
  addressLines: [
    "3rd Floor, Hero Building, Tilak Nagar Road",
    "New Nallakunta, Musheerabad",
    "Hyderabad, Telangana - 500044",
  ],
  serviceArea: null,
  coverageNote: null,
  hours: null,
  directionsUrl:
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent("Munna United Distributors Private Limited, Hero Building, Tilak Nagar Road, New Nallakunta, Musheerabad, Hyderabad 500044"),
  playStoreUrl: null,
  siteUrl: null,
};

/** Official IndianOil LPG leakage helpline (verify against iocl.com/contact-us before publishing). */
export const emergencyHelpline = "1906";
