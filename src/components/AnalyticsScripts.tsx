"use client";

import Script from 'next/script';
import { useEffect, useState, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import {
  hasConsent,
  COOKIE_CONSENT_EVENT,
  CookiePreferences,
  getStoredConsent
} from '@/lib/cookieConsent';

/**
 * Rastreador de páginas automático que respeta el consentimiento del usuario
 * Cumplimiento Ley N° 21.719: Solo registra vistas de página si el usuario aprobó analítica o marketing
 */
function AnalyticsTracker({
  analyticsAllowed,
  marketingAllowed,
}: {
  analyticsAllowed: boolean;
  marketingAllowed: boolean;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
  const PIXEL_ID = process.env.NEXT_PUBLIC_PIXEL_ID;

  // Track automatic page views on pathname/searchParams changes
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // GA4 Page View (Solo si el consentimiento analítico está activo)
    if (analyticsAllowed && GA_ID && window.gtag) {
      window.gtag('config', GA_ID, {
        page_path: pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : ''),
      });
    }

    // Meta Pixel Page View (Solo si el consentimiento de marketing está activo)
    if (marketingAllowed && PIXEL_ID && window.fbq) {
      window.fbq('track', 'PageView');
    }
  }, [pathname, searchParams, GA_ID, PIXEL_ID, analyticsAllowed, marketingAllowed]);

  return null;
}

/**
 * Inyección Condicional de Scripts de Terceros según Ley N° 21.719
 * PRIVACY BY DESIGN: Ningún script de rastreo se ejecuta previo al consentimiento activo (Opt-In).
 */
export function AnalyticsScripts() {
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
  const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
  const PIXEL_ID = process.env.NEXT_PUBLIC_PIXEL_ID;
  const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID || "r2hh1kkn17";

  // Estados reactivos de consentimiento
  const [consent, setConsent] = useState<{
    analytics: boolean;
    marketing: boolean;
  }>({
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // 1. Verificación inicial de consentimiento almacenado
    const stored = getStoredConsent();
    if (stored) {
      setConsent({
        analytics: Boolean(stored.analytics),
        marketing: Boolean(stored.marketing),
      });
    }

    // 2. Escuchar actualización dinámica cuando el usuario interactúe con el Banner de Cookies
    const handleConsentUpdate = (event: Event) => {
      const customEvent = event as CustomEvent<CookiePreferences>;
      if (customEvent.detail) {
        setConsent({
          analytics: Boolean(customEvent.detail.analytics),
          marketing: Boolean(customEvent.detail.marketing),
        });
      }
    };

    window.addEventListener(COOKIE_CONSENT_EVENT, handleConsentUpdate);
    return () => {
      window.removeEventListener(COOKIE_CONSENT_EVENT, handleConsentUpdate);
    };
  }, []);

  return (
    <>
      {/* Tracker reactivo dentro de Suspense para evitar de-optimizaciones en Next.js */}
      <Suspense fallback={null}>
        <AnalyticsTracker
          analyticsAllowed={consent.analytics}
          marketingAllowed={consent.marketing}
        />
      </Suspense>

      {/* =========================================================================
          CATEGORÍA 1: COOKIES ESTADÍSTICAS Y ANALÍTICAS (Opt-In Ley N° 21.719)
          Solo se cargan si el usuario aceptó explícitamente "analytics"
          ========================================================================= */}
      {consent.analytics && (
        <>
          {/* A. Google Tag Manager (GTM) */}
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

          {/* B. Google Analytics 4 (GA4) */}
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

          {/* C. Microsoft Clarity */}
          {CLARITY_ID && (
            <Script
              id="clarity-script"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  (function(c,l,a,r,i,t,y){
                    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                  })(window, document, "clarity", "script", "${CLARITY_ID}");
                `,
              }}
            />
          )}
        </>
      )}

      {/* =========================================================================
          CATEGORÍA 2: COOKIES DE PUBLICIDAD Y MARKETING (Opt-In Ley N° 21.719)
          Solo se cargan si el usuario aceptó explícitamente "marketing"
          ========================================================================= */}
      {consent.marketing && (
        <>
          {/* A. Meta Pixel (Facebook / Instagram Ads) */}
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
      )}
    </>
  );
}
