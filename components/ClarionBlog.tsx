import Script from "next/script";
import { clarion } from "@/lib/site";

/**
 * Clarion blog embed. Renders in its own section BELOW the existing hand-authored
 * posts — it only ever fills its own <div data-clarion-blog>, so old and new posts
 * coexist permanently. Note: these posts hydrate client-side, so they are not in
 * the static HTML (not SEO-crawled the way pre-rendered posts are).
 */
export default function ClarionBlog() {
  return (
    <>
      <div data-clarion-blog />
      <Script
        src={clarion.blogEmbed}
        strategy="afterInteractive"
        data-site-key={clarion.siteKey}
        data-api={clarion.api}
      />
    </>
  );
}
