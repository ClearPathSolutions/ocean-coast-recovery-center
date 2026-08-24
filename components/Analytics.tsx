import Script from "next/script";
import { analytics } from "@/lib/site";

/**
 * CR-08 — GA4 / Google Tag Manager.
 *
 * Renders nothing unless a measurement ID is configured, so the site ships
 * safely without one and starts reporting the moment it is set. Add whichever
 * you use in Vercel → Settings → Environment Variables:
 *
 *   NEXT_PUBLIC_GA_ID   e.g. G-XXXXXXXXXX   (GA4)
 *   NEXT_PUBLIC_GTM_ID  e.g. GTM-XXXXXXX    (Tag Manager)
 *
 * Both are NEXT_PUBLIC_ because they are read in the browser; neither is a
 * secret. If you add a host beyond Google, extend the CSP in next.config.mjs
 * or the script will be blocked.
 */
export default function Analytics() {
  const ga = process.env.NEXT_PUBLIC_GA_ID;
  const gtm = process.env.NEXT_PUBLIC_GTM_ID || analytics.gtmId;

  if (!ga && !gtm) return null;

  return (
    <>
      {ga && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${ga}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
gtag('js',new Date());gtag('config','${ga}',{anonymize_ip:true});`}
          </Script>
        </>
      )}
      {gtm && (
        <Script id="gtm-init" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtm}');`}
        </Script>
      )}
      {gtm && (
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${gtm}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
      )}
    </>
  );
}
