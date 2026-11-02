import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { products } from "@/data/products";
import { cn } from "@/lib/utils";

const sizes = products.filter((p) => p.image);

/** Height of the tallest silhouette (47.5 kg) in the size row; the others follow their true relative height. */
const ROW_H = 60;

/** The product photo reduced to a flat single-colour shape, so the row shows each cylinder's real outline. */
function Silhouette({ src, scale, active }: { src: string; scale: number; active: boolean }) {
  const mask = { WebkitMaskImage: `url(${src})`, maskImage: `url(${src})` };
  return (
    <span className="relative inline-block" style={{ height: ROW_H * scale }} aria-hidden="true">
      {/* Invisible copy gives the span the image's natural width. */}
      <img src={src} alt="" className="block h-full w-auto opacity-0" />
      <span
        className={cn(
          "absolute inset-0 bg-contain bg-no-repeat transition-colors duration-300 [mask-position:bottom] [mask-repeat:no-repeat] [mask-size:contain]",
          active ? "bg-signal" : "bg-primary/25 group-hover:bg-primary/55",
        )}
        style={mask}
      />
    </span>
  );
}

/**
 * Hero visual: pick a size from the row of cylinder silhouettes and that cylinder stands on the stage, drawn at the
 * same relative height as the silhouettes (47.5 kg = full height).
 */
export function HeroCylinders() {
  const [id, setId] = useState("19kg");
  const current = sizes.find((p) => p.id === id) ?? sizes[0];

  // Warm the cache so switching sizes never waits on an image.
  useEffect(() => {
    sizes.forEach((p) => {
      new Image().src = p.image!;
    });
  }, []);

  return (
    <div className="flex flex-col gap-5">
      <div className="relative h-[300px] sm:h-[370px] lg:h-[400px]">
        <div className="absolute inset-x-4 top-4 bottom-14 flex items-end justify-center">
          <AnimatePresence mode="wait" initial={false}>
            <motion.img
              key={current.id}
              src={current.image}
              alt={`${current.label} LPG cylinder`}
              initial={{ y: 28, opacity: 0, scale: 0.96 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -14, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              style={{ height: `${(current.scale ?? 1) * 100}%` }}
              className="relative w-auto max-w-full object-contain object-bottom drop-shadow-[0_18px_18px_rgba(0,33,71,0.25)]"
            />
          </AnimatePresence>
        </div>
        <span className="absolute inset-x-[30%] bottom-[46px] h-3 rounded-[50%] bg-primary/15 blur-md" aria-hidden="true" />
        <p className="absolute right-2 bottom-2 left-2 flex items-center justify-between gap-3" aria-live="polite">
          <span className="text-2xl font-extrabold text-primary">{current.label}</span>
          <span className="rounded-full border border-line bg-white px-3 py-1 text-xs font-semibold text-primary">{current.badge}</span>
        </p>
      </div>

      <div
        role="group"
        aria-label="Choose a cylinder size"
        className="mx-auto flex w-full max-w-md items-end justify-between gap-2 border-t border-line pt-5"
      >
        {sizes.map((p) => {
          const active = p.id === current.id;
          return (
            <button
              key={p.id}
              type="button"
              aria-pressed={active}
              onClick={() => setId(p.id)}
              className="group flex min-w-12 flex-col items-center gap-2 rounded-md px-1 pt-1"
            >
              <Silhouette src={p.image!} scale={p.scale ?? 1} active={active} />
              <span
                className={cn(
                  "text-sm transition-colors duration-300",
                  active ? "font-extrabold text-primary" : "font-semibold text-primary/50 group-hover:text-primary",
                )}
              >
                {p.label.replace(" kg", "")}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
