import { useSyncExternalStore, type ComponentProps, type MouseEvent } from "react";
import { getLenis } from "./smoothScroll";

/** Minimal History API router: the site only has a home page and an /about page. */
export const routes = ["/", "/about"] as const;
export type Route = (typeof routes)[number];

const listeners = new Set<() => void>();
let serverPath = "/";

/** Path used while rendering on the server (prerender), where there is no window. */
export const setServerPath = (p: string) => {
  serverPath = p;
};

export const normalizePath = (p: string): Route => {
  const clean = p.replace(/\/+$/, "") || "/";
  return (routes as readonly string[]).includes(clean) ? (clean as Route) : "/";
};

const subscribe = (cb: () => void) => {
  listeners.add(cb);
  window.addEventListener("popstate", cb);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("popstate", cb);
  };
};

export const useRoute = (): Route =>
  useSyncExternalStore(
    subscribe,
    () => normalizePath(window.location.pathname),
    () => (typeof window === "undefined" ? normalizePath(serverPath) : normalizePath(window.location.pathname)),
  );

const HEADER_OFFSET = 88;
let scrollRun = 0;

function scrollToHash(hash: string, retries = 0, run = ++scrollRun) {
  const el = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null;
  const lenis = getLenis();
  if (el) {
    // Sticky header is 80px tall: keep the target below it.
    if (lenis) lenis.scrollTo(el, { offset: -HEADER_OFFSET });
    else el.scrollIntoView();
    // Lazy images above the target load while scrolling and push it down: re-check once the scroll has settled,
    // unless the visitor has taken over or started another navigation.
    if (retries < 3) {
      const cancel = () => void (scrollRun === run && scrollRun++);
      window.addEventListener("wheel", cancel, { once: true, passive: true });
      window.addEventListener("touchstart", cancel, { once: true, passive: true });
      setTimeout(() => {
        window.removeEventListener("wheel", cancel);
        window.removeEventListener("touchstart", cancel);
        if (scrollRun === run && Math.abs(el.getBoundingClientRect().top - HEADER_OFFSET) > 12) scrollToHash(hash, retries + 1, run);
      }, 1200);
    }
  } else if (lenis) lenis.scrollTo(0, { immediate: true });
  else window.scrollTo(0, 0);
}

export function navigate(to: string) {
  const url = new URL(to, window.location.href);
  if (url.pathname !== window.location.pathname) {
    window.history.pushState(null, "", url.pathname + url.hash);
    listeners.forEach((l) => l());
    // The route's DOM is committed synchronously by useSyncExternalStore; wait one task so layout settles.
    setTimeout(() => scrollToHash(url.hash), 0);
  } else {
    if (url.hash !== window.location.hash) window.history.pushState(null, "", url.pathname + url.hash);
    scrollToHash(url.hash);
  }
}

/** Anchor that navigates in-app (no reload) for plain left clicks and falls back to a normal link otherwise. */
export function Link({ href, onClick, ...rest }: ComponentProps<"a"> & { href: string }) {
  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (rest.target && rest.target !== "_self") return;
    e.preventDefault();
    navigate(href);
  };
  return <a href={href} onClick={handle} {...rest} />;
}
