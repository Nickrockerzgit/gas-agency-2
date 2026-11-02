import { ArrowRight, CircleCheck, Hourglass, Phone } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { prices, type PriceRecord } from "@/data/pricing";
import { products, type Product } from "@/data/products";
import { formatDate, formatInr, rateState, type RateState } from "@/lib/rates";
import { useToday } from "@/lib/today";
import { cn } from "@/lib/utils";
import { CallButton } from "./ContactAction";
import { Reveal } from "./Reveal";
import { Section, SectionHeader } from "./Section";

/** Short descriptor under the size, as in the rate registry. */
const sublabel: Record<string, string> = {
  "2kg": "Compact Portable",
  "5kg": "Buffet / Mobile",
  "10kg": "Light Kitchen Range",
  "19kg": "Standard 19 kg Net",
  "47.5kg": "Manifold Bank Supply",
};

interface Row {
  product: Product;
  record?: PriceRecord;
  state: RateState;
}

const th = "px-4 text-sm font-bold text-primary";

function RateCell({ row }: { row: Row }) {
  const { record: r, state } = row;
  const amount = r?.amountInr != null && r.amountInr > 0 ? formatInr(r.amountInr) : null;
  if (state === "verified" && r && amount) {
    return (
      <div>
        <div className="text-lg font-extrabold text-primary">{amount}</div>
        <div className="text-xs text-foreground/70">{[r.priceBasis, r.locality].filter(Boolean).join(" · ")}</div>
        {r.chargesNote && <div className="text-xs text-foreground/70">{r.chargesNote}</div>}
        {r.reviewedAt && <div className="text-xs text-foreground/70">Verified on {formatDate(r.reviewedAt)}</div>}
      </div>
    );
  }
  return (
    <div className="space-y-1">
      <span className="text-[15px] font-semibold text-primary/80">
        {state === "unavailable" && r ? "Currently unavailable — contact the agency" : "Contact for rate"}
      </span>
      {state === "future" && amount && r?.effectiveFrom && (
        <div className="text-xs text-foreground/70">
          New rate {amount} takes effect on {formatDate(r.effectiveFrom)}.
        </div>
      )}
      {state === "stale" && amount && r?.effectiveFrom && (
        <div className="text-xs text-foreground/70">
          Historical rate, not current: {amount} (effective {formatDate(r.effectiveFrom)}).
        </div>
      )}
    </div>
  );
}

const effective = (row: Row) =>
  row.state === "verified" && row.record?.effectiveFrom ? formatDate(row.record.effectiveFrom) : "Pending verification";

function Dot({ tone }: { tone: "signal" | "navy" }) {
  return <span className={cn("size-1.5 rounded-full", tone === "signal" ? "bg-signal" : "bg-primary")} aria-hidden="true" />;
}

function Title({ row }: { row: Row }) {
  const { product: p } = row;
  const dot = p.id === "19kg" ? "signal" : p.id === "47.5kg" ? "navy" : null;
  return (
    <>
      <span className="flex items-center gap-1.5 font-bold text-primary">
        {p.label} {p.status === "published" ? "cylinder" : "cylinder"}
        {dot && <Dot tone={dot} />}
      </span>
      <span className="text-[13px] text-foreground/60">{sublabel[p.id] ?? p.variant}</span>
    </>
  );
}

function Action({ row, full }: { row: Row; full?: boolean }) {
  const id = row.product.id;
  if (id === "19kg" || id === "47.5kg") {
    return (
      <CallButton
        label={
          <>
            Requisition <ArrowRight />
          </>
        }
        icon={null}
        variant={id === "19kg" ? "signal" : "default"}
        size="sm"
        className={cn("rounded", full && "w-full")}
      />
    );
  }
  return (
    <CallButton
      label={
        <>
          Enquire <Phone />
        </>
      }
      icon={null}
      variant="ghost"
      size="sm"
      className={cn("text-signal hover:bg-signal/5 hover:text-signal-dark", full && "w-full justify-start px-0")}
    />
  );
}

export function Pricing() {
  const today = useToday();
  const rows: Row[] = products.map((product) => {
    const record = prices.find((x) => x.productId === product.id);
    return { product, record, state: rateState(record, today) };
  });
  const verified = rows.filter((r) => r.state === "verified");
  const zone = verified.find((r) => r.record?.locality)?.record?.locality;
  const effectiveDate = verified.find((r) => r.record?.effectiveFrom)?.record?.effectiveFrom;
  const anyPending = rows.filter((r) => r.product.status === "published").some((r) => r.state !== "verified");

  return (
    <Section id="pricing" titleId="price-title" tone="tonal">
      <SectionHeader
        id="price-title"
        eyebrow="Tariff Schedule & MRP"
        title="Clear, dated pricing"
        description="Check the published rate details or contact our team for the latest applicable MRP."
      />
      <div className="grid gap-8 lg:grid-cols-12">
        <Reveal className="lg:col-span-8" y={44}>
        <Card className="h-full gap-0 overflow-hidden py-0 shadow-sm">
          <div className="space-y-1 border-b border-line p-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xl font-extrabold tracking-tight text-primary">Commercial Tariff Registry</span>
              <span className="rounded-full border border-line bg-tonal px-3 py-0.5 text-xs font-semibold text-primary">
                {zone ?? "Rate zone to be confirmed"}
              </span>
            </div>
            <p className="text-sm text-foreground/70">
              Effective:{" "}
              <span className="font-bold text-primary">{effectiveDate ? formatDate(effectiveDate) : "Pending verification"}</span>
            </p>
          </div>

          <Table className="hidden md:table">
            <TableHeader>
              <TableRow className="bg-tonal hover:bg-tonal">
                <TableHead className={th}>Cylinder / Variant</TableHead>
                <TableHead className={th}>Published MRP</TableHead>
                <TableHead className={th}>Effective from</TableHead>
                <TableHead className={cn(th, "text-right")}>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.product.id} className={cn(row.product.id === "19kg" && "bg-primary/5 hover:bg-primary/10")}>
                  <TableCell className="px-4 py-3.5 whitespace-normal">
                    <div className="flex flex-col">
                      <Title row={row} />
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3.5 whitespace-normal">
                    <RateCell row={row} />
                  </TableCell>
                  <TableCell className="px-4 py-3.5 text-sm whitespace-normal text-foreground/70">{effective(row)}</TableCell>
                  <TableCell className="px-4 py-3.5 text-right">
                    <Action row={row} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <ul className="divide-y divide-line md:hidden">
            {rows.map((row) => (
              <li key={row.product.id} className={cn("space-y-3 p-4", row.product.id === "19kg" && "bg-primary/5")}>
                <div className="flex flex-col">
                  <Title row={row} />
                </div>
                <RateCell row={row} />
                <p className="text-sm text-foreground/70">Effective from: {effective(row)}</p>
                <Action row={row} full />
              </li>
            ))}
          </ul>

          <p className="flex items-center gap-1.5 border-t border-line p-3.5 text-xs font-bold text-primary">
            <CircleCheck className="size-4" aria-hidden="true" />
            Confirm the applicable rate, price basis and availability before placing an order.
          </p>
        </Card>
        </Reveal>

        <Reveal className="lg:col-span-4" y={44} delay={0.15}>
        <Card className="h-full gap-4 p-5 shadow-sm lg:justify-between">
          <p className="flex items-center gap-2 border-b border-line pb-3 text-base font-extrabold tracking-tight text-primary">
            <Hourglass className="size-4 text-signal" aria-hidden="true" /> Regulatory rate cycle
          </p>
          <div className="rounded-lg border border-line bg-tonal p-4">
            <span className="mb-2 inline-block rounded bg-primary px-2.5 py-0.5 text-xs font-bold text-white">
              Rate schedule
            </span>
            <h3 className="text-base font-bold">{anyPending ? "Latest rate pending verification" : "Rates verified for this period"}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-foreground/80">
              Rates are subject to monthly revision. Published rates are updated once the new rate list has been verified.
            </p>
          </div>
          <dl className="space-y-2 text-sm">
            {[
              ["Revision Cycle:", "1st of Every Calendar Month", false],
              ["Invoicing Basis:", "Confirmed on enquiry", false],
              ["Delivery Terms:", "Confirmed on enquiry", true],
            ].map(([k, v, red]) => (
              <div key={String(k)} className="flex items-center justify-between gap-4 border-b border-line py-1">
                <dt className="text-foreground/70">{k}</dt>
                <dd className={cn("text-right font-bold", red ? "text-signal" : "text-primary")}>{v}</dd>
              </div>
            ))}
          </dl>
          <CallButton label="Inquire Today's Rate" variant="default" className="w-full" />
        </Card>
        </Reveal>
      </div>
    </Section>
  );
}
