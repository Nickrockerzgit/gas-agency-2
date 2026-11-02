import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/** Soft ease-out with a long tail: things glide in and settle instead of snapping. */
const settle = [0.22, 1, 0.36, 1] as const;

/** False on the server and on the first client render, so prerendered content is always fully visible. */
function useLive() {
  const [live, setLive] = useState(false);
  useIsoLayoutEffect(() => setLive(true), []);
  return live;
}

const watchers = new Map<Element, () => void>();
let queued = false;

function checkWatchers() {
  queued = false;
  const limit = window.innerHeight * 0.9;
  watchers.forEach((reach, el) => {
    if (el.getBoundingClientRect().top < limit) reach();
  });
}

function queueCheck() {
  if (queued) return;
  queued = true;
  requestAnimationFrame(checkWatchers);
}

/**
 * True once the element's top has come into the lower part of the viewport, or has been scrolled past. Position is
 * checked on scroll rather than with an IntersectionObserver, which never fires for elements a jump skips over and
 * would leave gaps behind an anchor click or a fast scroll.
 */
function useReached<T extends Element>(ref: React.RefObject<T | null>, enabled: boolean) {
  const [reached, setReached] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!enabled || !el) return;
    const reach = () => {
      watchers.delete(el);
      if (watchers.size === 0) {
        window.removeEventListener("scroll", queueCheck);
        window.removeEventListener("resize", queueCheck);
      }
      setReached(true);
    };
    if (watchers.size === 0) {
      window.addEventListener("scroll", queueCheck, { passive: true });
      window.addEventListener("resize", queueCheck);
    }
    watchers.set(el, reach);
    queueCheck();
    return () => {
      watchers.delete(el);
    };
  }, [ref, enabled]);
  return reached;
}

const tags = { div: motion.div, li: motion.li, p: motion.p } as const;

interface RevealProps {
  children: ReactNode;
  className?: string;
  as?: keyof typeof tags;
  /** Seconds to wait once the element is reached; use index * 0.08 to stagger siblings. */
  delay?: number;
  /** Starting offset in px. */
  y?: number;
  x?: number;
  scale?: number;
  /** Starting tilt in degrees; it straightens as the element settles. */
  tilt?: number;
}

/**
 * Fades and rises into place when scrolled to. Starts hidden only after mount, never for reduced motion,
 * so the page is complete without JavaScript.
 */
export function Reveal({ children, className, as = "div", delay = 0, y = 36, x = 0, scale = 1, tilt = 0 }: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const live = useLive();
  const enabled = live && !reduce;
  const reached = useReached(ref, enabled);
  const hidden = enabled && !reached;
  const Tag = tags[as] as typeof motion.div;

  return (
    <Tag
      ref={ref as React.RefObject<HTMLDivElement>}
      className={className}
      initial={false}
      animate={hidden ? { opacity: 0, y, x, scale, rotate: tilt } : { opacity: 1, y: 0, x: 0, scale: 1, rotate: 0 }}
      transition={hidden ? { duration: 0 } : { duration: 0.9, delay, ease: settle }}
    >
      {children}
    </Tag>
  );
}

/** Slow vertical drift tied to scroll: the wrapped image moves a little against the page, giving depth. */
export function Parallax({ children, className, amount = 40 }: { children: ReactNode; className?: string; amount?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const live = useLive();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const p = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.6 });
  const y = useTransform(p, [0, 1], [amount, -amount]);
  return (
    <motion.div ref={ref} className={className} style={live && !reduce ? { y } : undefined}>
      {children}
    </motion.div>
  );
}
