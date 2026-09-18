"use client";

import { useEffect, useRef } from "react";

/**
 * Fades + lifts children into view on scroll — as a progressive enhancement.
 *
 * The server renders children **visible**. Previously this component emitted
 * `opacity-0` in the HTML and only flipped after hydration, which meant the
 * homepage <h1> (the LCP element) was invisible until JS ran, and 37 blocks on
 * `/` were blank with JS disabled or failed (CR-02). That is still true: the
 * hidden state is only ever applied on the client, and only to elements that
 * were off screen when first observed.
 *
 * Two costs were removed after the LCP work of 2026-09-18, where render delay
 * was 69% of a 6.1 s LCP and this component sat inside that window:
 *
 *   1. `getBoundingClientRect()` on every instance at mount — a forced reflow
 *      per block (Lighthouse measured 37 ms across them) purely to ask "am I on
 *      screen?". The IntersectionObserver's own first callback answers that for
 *      free, so the element is simply never hidden if it starts visible.
 *   2. One IntersectionObserver per instance. They all use identical options,
 *      so there is now a single shared observer for the whole page.
 *
 * `prefers-reduced-motion` is honoured by skipping the animation entirely
 * rather than relying on globals.css to zero out the duration.
 */

type State = { seen: boolean };

let observer: IntersectionObserver | null = null;
const tracked = new WeakMap<Element, State>();

function getObserver() {
  if (observer) return observer;
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const el = entry.target as HTMLElement;
        const state = tracked.get(el);
        if (!state) continue;

        if (entry.isIntersecting) {
          // Either it was already on screen the first time we looked — in which
          // case it was never hidden and this is a no-op — or it has scrolled
          // in and should transition.
          el.dataset.reveal = "shown";
          observer!.unobserve(el);
          tracked.delete(el);
        } else if (!state.seen) {
          // First sighting and off screen: safe to hide, nothing is painted yet
          // that the user can lose.
          el.dataset.reveal = "pending";
        }
        state.seen = true;
      }
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  return observer;
}

export default function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: React.ElementType;
}) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const io = getObserver();
    tracked.set(el, { seen: false });
    io.observe(el);
    return () => {
      io.unobserve(el);
      tracked.delete(el);
    };
  }, []);

  const Comp = Tag as React.ElementType;
  return (
    <Comp ref={ref} className={className} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </Comp>
  );
}
