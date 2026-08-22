"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { recordPageview } from "@/lib/session";

/**
 * Records a pageview into the first-touch attribution store on every route
 * change. Mounted once, sitewide, in app/layout.tsx.
 *
 * `usePathname` rather than `useSearchParams` on purpose: `useSearchParams`
 * forces a Suspense boundary and opts every static page into dynamic rendering.
 * The campaign parameters are read from `window.location.search` inside
 * `recordPageview()` instead, which costs the build nothing.
 */
export default function SessionTracker() {
  const pathname = usePathname();

  useEffect(() => {
    recordPageview();
  }, [pathname]);

  return null;
}
