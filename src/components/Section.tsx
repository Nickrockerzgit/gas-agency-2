import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8", className)}>{children}</div>;
}

const tones = {
  white: "bg-white",
  tonal: "bg-tonal",
  navy: "bg-primary text-white",
} as const;

export function Section({
  id,
  titleId,
  tone = "white",
  className,
  children,
}: {
  id?: string;
  titleId?: string;
  tone?: keyof typeof tones;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={titleId} className={cn("border-b border-line py-14 md:py-20", tones[tone], className)}>
      <Container>{children}</Container>
    </section>
  );
}

export function SectionHeader({
  id,
  eyebrow,
  title,
  description,
  center,
  onDark,
}: {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  center?: boolean;
  onDark?: boolean;
}) {
  return (
    <Reveal className={cn("mb-10 max-w-3xl", center && "mx-auto text-center")} y={28}>
      <p className={cn("font-mono text-xs font-bold tracking-widest uppercase", onDark ? "text-white/70" : "text-signal")}>{eyebrow}</p>
      <h2 id={id} className={cn("mt-1 text-3xl font-bold sm:text-4xl", onDark && "text-white")}>
        {title}
      </h2>
      {description && <p className={cn("mt-3 text-base", onDark ? "text-white/80" : "text-foreground/80")}>{description}</p>}
    </Reveal>
  );
}
