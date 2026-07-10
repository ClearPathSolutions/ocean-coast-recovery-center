import Reveal from "@/components/Reveal";

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  light = false,
  className = "",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
}) {
  return (
    <Reveal
      className={`${align === "center" ? "mx-auto text-center" : ""} max-w-2xl ${className}`}
    >
      {eyebrow && (
        <span
          className={`eyebrow ${light ? "!text-sand-300" : ""} ${
            align === "center" ? "justify-center" : ""
          }`}
        >
          <span className="h-px w-6 bg-current opacity-50" />
          {eyebrow}
        </span>
      )}
      <h2
        className={`mt-3 text-3xl font-semibold leading-tight sm:text-4xl ${
          light ? "!text-white" : ""
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 text-lg leading-relaxed ${
            light ? "text-white/80" : "text-navy/70"
          }`}
        >
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
