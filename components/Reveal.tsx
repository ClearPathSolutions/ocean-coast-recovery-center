"use client";

import { useEffect, useRef } from "react";

/**
 * Fades + lifts children into view on scroll — as a progressive enhancement.
 *
 * The server renders children **visible**. Previously this component emitted
 * `opacity-0` in the HTML and only flipped after hydration, which meant the
 * homepage <h1> (the LCP element) was invisible until JS ran, and 37 blocks on
 * `/` were blank with JS disabled or failed (CR-02).
 *
 * Now the hidden state is only ever applied on the client, and only to elements
 * that are still below the fold at mount — so anything already on screen (the
 * LCP element included) is never hidden and never flashes. With no JS,
 * `data-reveal` is never set and everything simply stays visible.
 *
 * `prefers-reduced-motion` is honoured by skipping the animation entirely
 * rather than relying on globals.css to zero out the duration.
 */
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

    // Already on screen: leave it alone. Hiding it here would cause a visible
    // flash and would re-break the LCP element.
    if (el.getBoundingClientRect().top < window.innerHeight) return;

    el.dataset.reveal = "pending";
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.dataset.reveal = "shown";
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const Comp = Tag as React.ElementType;
  return (
    <Comp ref={ref} className={className} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </Comp>
  );
}
