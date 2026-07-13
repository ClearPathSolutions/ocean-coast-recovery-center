import Script from "next/script";
import { clarion } from "@/lib/site";

const B = clarion.brand;

/**
 * Clarion chat widget. Mounted once at the bottom of <body> in app/layout.tsx.
 * Colors/typeface are driven from the BRAND block in lib/site.ts so the bubble
 * stays in sync with the site's design tokens.
 */
export default function Clarion() {
  return (
    <>
      <style>{`:root{--clarion-chat-color:${B.color};--clarion-chat-header-text:${B.headerText};--clarion-chat-position:${B.position};}`}</style>
      <Script
        src={clarion.widget}
        strategy="afterInteractive"
        data-site-key={clarion.siteKey}
        data-api={clarion.api}
        data-color={B.color}
        data-header-text={B.headerText}
        data-title={B.title}
        data-position={B.position}
        data-font={B.font}
      />
    </>
  );
}
