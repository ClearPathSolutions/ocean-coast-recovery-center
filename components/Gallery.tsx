"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { X } from "@/components/icons";

export default function Gallery({ images }: { images: { src: string; alt: string }[] }) {
  const [active, setActive] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);

  // CR-12 — keyboard handling for the lightbox: Escape closes, arrows move
  // between images, and Tab is trapped inside the dialog while it is open.
  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setActive(null); return; }
      if (e.key === "ArrowRight") { setActive((i) => (i === null ? i : (i + 1) % images.length)); return; }
      if (e.key === "ArrowLeft") { setActive((i) => (i === null ? i : (i - 1 + images.length) % images.length)); return; }
      if (e.key !== "Tab") return;
      const focusables = dialogRef.current?.querySelectorAll<HTMLElement>(
        'button, [href], [tabindex]:not([tabindex="-1"])'
      );
      if (!focusables?.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, images.length]);

  // Move focus into the dialog on open, and back to the thumbnail on close.
  useEffect(() => {
    if (active !== null) {
      dialogRef.current?.querySelector<HTMLElement>("button")?.focus();
    } else {
      openerRef.current?.focus();
      openerRef.current = null;
    }
  }, [active]);

  // Lock background scroll while the lightbox is open.
  useEffect(() => {
    document.body.style.overflow = active !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [active]);

  return (
    <>
      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
        {images.map((img, i) => (
          <button
            key={img.src}
            onClick={(e) => { openerRef.current = e.currentTarget; setActive(i); }}
            aria-haspopup="dialog"
            className="group block w-full overflow-hidden rounded-3xl shadow-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-ocean-500 focus-visible:ring-offset-2"
          >
            <Image
              src={img.src}
              alt={img.alt}
              width={800}
              height={600}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </button>
        ))}
      </div>

      {active !== null && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={`Image ${active + 1} of ${images.length}: ${images[active].alt}`}
          onClick={() => setActive(null)}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-navy-deepest/90 p-4 backdrop-blur-sm animate-fade-up"
        >
          <button
            type="button"
            aria-label="Close image viewer"
            onClick={() => setActive(null)}
            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <X className="h-6 w-6" />
          </button>
          <div className="relative max-h-[85vh] max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <Image
              src={images[active].src}
              alt={images[active].alt}
              width={1600}
              height={1200}
              className="max-h-[85vh] w-auto rounded-2xl object-contain"
            />
            <p className="mt-3 text-center text-sm text-white/70">{images[active].alt}</p>
          </div>
        </div>
      )}
    </>
  );
}
