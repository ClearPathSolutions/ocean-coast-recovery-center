"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { nav, site } from "@/lib/site";
import { ChevronDown, Menu, X, Phone } from "@/components/icons";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false); // mobile drawer
  const [expanded, setExpanded] = useState<string | null>(null); // mobile accordion
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile drawer on route change + lock body scroll while open
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <>
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        solid
          ? "bg-white/95 shadow-soft backdrop-blur-md"
          : "bg-gradient-to-b from-navy-deepest/50 to-transparent"
      }`}
    >
      <nav className="container-wide flex h-[120px] items-center justify-between gap-4 lg:h-[148px]">
        {/* Logo */}
        <Link href="/" aria-label={`${site.name} home`} className="relative flex shrink-0 items-center">
          <Image
            src={solid ? "/images/logos/logo-color.png" : "/images/logos/logo-white.png"}
            alt={site.name}
            width={260}
            height={195}
            priority
            className="h-28 w-auto lg:h-[136px]"
          />
        </Link>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <li key={item.label} className="group relative">
              <Link
                href={item.href}
                className={`flex items-center gap-1 rounded-full px-3.5 py-2 text-[15px] font-medium transition-colors ${
                  solid
                    ? "text-navy hover:text-ocean-600"
                    : "text-white/90 hover:text-white"
                }`}
              >
                {item.label}
                {item.children && (
                  <ChevronDown className="h-3.5 w-3.5 opacity-70 transition-transform group-hover:rotate-180" />
                )}
              </Link>

              {item.children && (
                <div className="invisible absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                  <div className="w-72 overflow-hidden rounded-2xl border border-ocean-100 bg-white p-2 shadow-card">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        className="block rounded-xl px-4 py-2.5 transition-colors hover:bg-foam"
                      >
                        <span className="block text-[15px] font-semibold text-navy">
                          {child.label}
                        </span>
                        {child.desc && (
                          <span className="mt-0.5 block text-[13px] leading-snug text-navy/55">
                            {child.desc}
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>

        {/* Desktop CTAs */}
        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/admissions#verify"
            className={`text-sm font-semibold transition-colors ${
              solid ? "text-ocean-700 hover:text-ocean-800" : "text-white hover:text-sand-200"
            }`}
          >
            Verify Insurance
          </Link>
          <a href={site.phoneHref} className="btn-primary !px-5 !py-2.5">
            <Phone className="h-4 w-4" />
            {site.phone}
          </a>
        </div>

        {/* Mobile: call + hamburger */}
        <div className="flex items-center gap-1.5 lg:hidden">
          <a
            href={site.phoneHref}
            aria-label={`Call ${site.phone}`}
            className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
              solid ? "bg-sand-300 text-navy-dark" : "bg-white/15 text-white backdrop-blur"
            }`}
          >
            <Phone className="h-[18px] w-[18px]" />
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
              solid ? "text-navy hover:bg-foam" : "text-white hover:bg-white/15"
            }`}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>
    </header>

      {/* Mobile drawer — sibling of <header> so it's not trapped by the
          header's backdrop-filter containing block */}
      <div
        className={`fixed inset-x-0 bottom-0 top-[120px] z-40 origin-top overflow-y-auto bg-white transition-all duration-300 lg:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div className="flex min-h-full flex-col px-5 pb-10 pt-2">
          <ul className="divide-y divide-ocean-100">
            {nav.map((item) => (
              <li key={item.label} className="py-1">
                {item.children ? (
                  <div>
                    <button
                      onClick={() =>
                        setExpanded((v) => (v === item.label ? null : item.label))
                      }
                      aria-expanded={expanded === item.label}
                      className="flex w-full items-center justify-between py-3.5 text-left text-lg font-semibold text-navy"
                    >
                      {item.label}
                      <ChevronDown
                        className={`h-5 w-5 text-ocean-500 transition-transform ${
                          expanded === item.label ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <div
                      className={`grid transition-all duration-300 ${
                        expanded === item.label
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="flex flex-col gap-0.5 pb-3 pl-1">
                          {item.children.map((child) => (
                            <Link
                              key={child.label}
                              href={child.href}
                              className="rounded-lg px-3 py-2.5 text-[15px] text-navy/75 hover:bg-foam hover:text-ocean-700"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className="block py-3.5 text-lg font-semibold text-navy"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          <div className="mt-auto space-y-3 pt-8">
            <a href={site.phoneHref} className="btn-primary w-full">
              <Phone className="h-4 w-4" />
              Call {site.phone}
            </a>
            <Link href="/admissions#verify" className="btn-outline-navy w-full">
              Verify Your Insurance
            </Link>
            <p className="pt-2 text-center text-sm text-navy/50">{site.hours}</p>
          </div>
        </div>
      </div>
    </>
  );
}
