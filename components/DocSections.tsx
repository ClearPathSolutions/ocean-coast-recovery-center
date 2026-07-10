import SectionHeading from "@/components/SectionHeading";
import { CheckCircle } from "@/components/icons";
import type { ContentSection } from "@/lib/contentPages";

export default function DocSections({
  sections,
  startTint = false,
}: {
  sections: ContentSection[];
  startTint?: boolean;
}) {
  return (
    <>
      {sections.map((sec, idx) => {
        const tint = startTint ? idx % 2 === 0 : idx % 2 === 1;
        return (
          <section key={sec.title + idx} className={`${tint ? "section-foam" : "bg-white"} py-14 sm:py-16`}>
            <div className="container-x mx-auto max-w-3xl">
              <SectionHeading align="left" title={sec.title} />
              <div className="mt-5 space-y-4">
                {sec.body.map((p, i) => (
                  <p key={i} className="leading-relaxed text-navy/70">{p}</p>
                ))}
              </div>
              {sec.bullets && sec.bullets.length > 0 && (
                <ul className="mt-6 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
                  {sec.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3 text-navy/75">
                      <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-ocean-500" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        );
      })}
    </>
  );
}
