import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { CheckCircle } from "@/components/icons";

/** Two-column split: text + image, alternating side. */
export function Split({
  eyebrow,
  title,
  paragraphs = [],
  bullets,
  image,
  imageAlt = "",
  imageSide = "right",
  tint = false,
  children,
}: {
  eyebrow?: string;
  title: string;
  paragraphs?: string[];
  bullets?: string[];
  /** Optional — omitted on population pages per IMG-07; the block then renders
   *  as a single centred text column instead of a two-column split. */
  image?: string;
  imageAlt?: string;
  imageSide?: "left" | "right";
  tint?: boolean;
  children?: React.ReactNode;
}) {
  const imageEl = image ? (
    <Reveal className="overflow-hidden rounded-4xl shadow-card">
      <Image
        src={image}
        alt={imageAlt}
        width={800}
        height={640}
        className="h-full max-h-[520px] w-full object-cover"
      />
    </Reveal>
  ) : null;
  return (
    <section className={`${tint ? "section-foam" : "bg-white"} py-20 sm:py-24`}>
      <div
        className={`container-x grid items-center gap-12 ${
          imageEl ? "lg:grid-cols-2" : "mx-auto max-w-3xl"
        }`}
      >
        {imageEl && imageSide === "left" && <div className="order-2 lg:order-1">{imageEl}</div>}
        <div className={imageEl && imageSide === "left" ? "order-1 lg:order-2" : ""}>
          <SectionHeading align="left" eyebrow={eyebrow} title={title} />
          <div className="mt-5 space-y-4">
            {paragraphs.map((p, i) => (
              <p key={i} className="leading-relaxed text-navy/70">{p}</p>
            ))}
          </div>
          {bullets && (
            <ul className="mt-6 space-y-3">
              {bullets.map((b) => (
                <li key={b} className="flex items-start gap-3 text-navy/75">
                  <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-ocean-500" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          )}
          {children}
        </div>
        {imageEl && imageSide === "right" && imageEl}
      </div>
    </section>
  );
}

/** Grid of titled cards (e.g. therapies, benefits). */
export function CardGrid({
  eyebrow,
  title,
  subtitle,
  items,
  cols = 3,
  tint = false,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  items: { title: string; text: string; href?: string }[];
  cols?: 2 | 3;
  tint?: boolean;
}) {
  return (
    <section className={`${tint ? "section-foam" : "bg-white"} py-20 sm:py-24`}>
      <div className="container-x">
        <SectionHeading eyebrow={eyebrow} title={title} subtitle={subtitle} />
        <div className={`mt-12 grid gap-6 sm:grid-cols-2 ${cols === 3 ? "lg:grid-cols-3" : ""}`}>
          {items.map((item, i) => (
            <Reveal
              key={item.title}
              delay={(i % 3) * 80}
              className="rounded-3xl border border-ocean-100 bg-white p-7 shadow-soft"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-ocean-50 font-display text-lg font-semibold text-ocean-600">
                {i + 1}
              </span>
              <h3 className="mt-4 text-lg font-semibold text-navy">
                {item.href ? (
                  <Link href={item.href} className="hover:text-ocean-700">
                    {item.title}
                  </Link>
                ) : (
                  item.title
                )}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-navy/65">{item.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Numbered process steps in a vertical timeline. */
export function Steps({
  eyebrow,
  title,
  subtitle,
  steps,
  tint = true,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  steps: { title: string; text: string }[];
  tint?: boolean;
}) {
  return (
    <section className={`${tint ? "section-foam" : "bg-white"} py-20 sm:py-24`}>
      <div className="container-x">
        <SectionHeading eyebrow={eyebrow} title={title} subtitle={subtitle} />
        <ol className="mx-auto mt-12 max-w-3xl space-y-4">
          {steps.map((s, i) => (
            <Reveal
              key={s.title}
              delay={i * 70}
              as="li"
              className="flex gap-5 rounded-3xl bg-white p-6 shadow-soft ring-1 ring-ocean-100"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-ocean-500 font-display text-xl font-semibold text-white">
                {i + 1}
              </span>
              <div>
                <h3 className="text-lg font-semibold text-navy">{s.title}</h3>
                <p className="mt-1.5 leading-relaxed text-navy/65">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
