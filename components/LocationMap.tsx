import { site } from "@/lib/site";
import { MapPin, Phone } from "@/components/icons";

/**
 * VIS-1625 — Google map band. Previously the map appeared only on /contact, so
 * every other page ended without any indication of where the facility is.
 * Rendered above the footer sitewide; `/contact` keeps its own larger map.
 *
 * `loading="lazy"` keeps it off the critical path — it sits below the fold on
 * every page that uses it.
 */
export default function LocationMap() {
  const query = encodeURIComponent(site.address.full);
  return (
    <section className="bg-white">
      <div className="grid lg:grid-cols-[1fr_1.4fr]">
        <div className="flex flex-col justify-center bg-navy px-6 py-12 sm:px-10 lg:px-14">
          <span className="eyebrow !text-sand-300">Find us</span>
          <h2 className="mt-3 font-display text-3xl font-semibold text-white">
            {site.address.city}, California
          </h2>
          <p className="mt-4 flex items-start gap-3 text-white/80">
            <MapPin className="mt-1 h-5 w-5 shrink-0 text-ocean-300" />
            {site.address.full}
          </p>
          <p className="mt-3 text-sm text-white/60">{site.hours}</p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a href={site.phoneHref} className="btn-primary whitespace-nowrap">
              <Phone className="h-4 w-4" /> {site.phone}
            </a>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${query}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline whitespace-nowrap"
            >
              Get Directions
            </a>
          </div>
        </div>
        <iframe
          title={`Map showing ${site.name} in ${site.address.city}, California`}
          src={`https://www.google.com/maps?q=${query}&output=embed`}
          width="100%"
          height="100%"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="min-h-[340px] w-full border-0"
        />
      </div>
    </section>
  );
}
