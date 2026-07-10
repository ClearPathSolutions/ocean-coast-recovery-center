"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X } from "@/components/icons";

export default function Gallery({ images }: { images: { src: string; alt: string }[] }) {
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
        {images.map((img, i) => (
          <button
            key={img.src}
            onClick={() => setActive(i)}
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
          onClick={() => setActive(null)}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-navy-deepest/90 p-4 backdrop-blur-sm animate-fade-up"
        >
          <button
            aria-label="Close"
            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
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
