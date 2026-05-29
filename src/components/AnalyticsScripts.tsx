"use client";

import Script from 'next/script';
import { useEffect, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

function AnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
  const PIXEL_ID = process.env.NEXT_PUBLIC_PIXEL_ID;

  // Track automatic page views on pathname/searchParams changes
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // GA4 Page View
    if (GA_ID && window.gtag) {
      window.gtag('config', GA_ID, {
        page_path: pathname + searchParams.toString(),
      });
    }

    // Meta Pixel Page View
    if (PIXEL_ID && window.fbq) {
      window.fbq('track', 'PageView');
    }
  }, [pathname, searchParams, GA_ID, PIXEL_ID]);

  return null;
}

export function AnalyticsScripts() {
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
  const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
  const PIXEL_ID = process.env.NEXT_PUBLIC_PIXEL_ID;

  return (
    <>
      {/* SearchParams observer inside Suspense to prevent Next.js de-optimization warnings */}
      <Suspense fallback={null}>
        <AnalyticsTracker />
      </Suspense>

      {/* 1. Google Tag Manager */}
      {GTM_ID && (
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'sc' + 'ript','dataLayer','${GTM_ID}');
            `,
          }}
        />
      )}

      {/* 2. Google Analytics 4 */}
      {GA_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script
            id="ga4-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                window.gtag = gtag;
                gtag('js', new Date());
                gtag('config', '${GA_ID}', { send_page_view: false });
              `,
            }}
          />
        </>
      )}

      {/* 3. Meta Pixel */}
      {PIXEL_ID && (
        <Script
          id="meta-pixel-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'sc' + 'ript',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${PIXEL_ID}');
            `,
          }}
        />
      )}
    </>
  );
}
