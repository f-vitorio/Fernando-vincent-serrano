import { siteConfig, type FormData } from '../types';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
    fbq: (...args: unknown[]) => void;
  }
}

export function initTracking(): void {
  if (typeof window === 'undefined') return;

  window.dataLayer = window.dataLayer || [];

  (window as any).__trackEvent = trackEvent;
  (window as any).trackWhatsAppClick = trackWhatsAppClick;
  (window as any).trackFormSubmit = trackFormSubmit;

  const ga4Id = siteConfig.ga4Id as string | undefined;
  const gtmId = siteConfig.gtmId as string | undefined;
  const adsId = siteConfig.googleAdsConversionId as string | undefined;

  // Define gtag sempre que houver GA4, GTM (via dataLayer) ou Google Ads
  if (ga4Id || gtmId || adsId) {
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };
  }

  // GA4 via gtag.js (config envia page_view automaticamente)
  if (ga4Id) {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${ga4Id}`;
    document.head.appendChild(script);

    window.gtag('js', new Date());
    window.gtag('config', ga4Id);
  }

  // GTM via snippet padrão do container
  if (gtmId) {
    (function (w: Window, d: Document, s: string, id: string) {
      const dl = ((w as any).dataLayer = (w as any).dataLayer || []);
      dl.push({ gtm: new Date().getTime(), event: 'gtm.js' });
      const f = d.getElementsByTagName(s)[0] as HTMLScriptElement;
      const j = d.createElement(s) as HTMLScriptElement;
      j.async = true;
      j.src = `https://www.googletagmanager.com/gtm.js?id=${id}`;
      f.parentNode?.insertBefore(j, f);
    })(window, document, 'script', gtmId);
  }

  // Meta Pixel
  if (siteConfig.metaPixelId) {
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    window.fbq('init', siteConfig.metaPixelId);
    window.fbq('track', 'PageView');
  }

  // Google Ads (base) — page_view do gtag config não conta como conversão
  if (adsId && window.gtag) {
    window.gtag('config', `AW-${adsId}`, { send_page_view: false });
  }
}

export interface TrackingEventParams {
  event: string;
  parameters: Record<string, unknown>;
}

export function trackEvent({ event, parameters }: TrackingEventParams): void {
  if (typeof window === 'undefined') return;

  // GA4 / GTM
  if (window.gtag) {
    window.gtag('event', event, parameters);
  }

  // Meta Pixel
  if (window.fbq) {
    const fbEventMap: Record<string, string> = {
      generate_lead: 'Lead',
      contact: 'Contact',
      view_item: 'ViewContent',
      whatsapp_click: 'Contact',
    };
    const fbEvent = fbEventMap[event] || event;
    window.fbq('track', fbEvent, parameters);
  }

  // Google Ads Conversion — apenas no lead real do formulário (evita duplicidade)
  if (siteConfig.googleAdsConversionId && siteConfig.googleAdsConversionLabel && window.gtag) {
    if (event === 'generate_lead') {
      window.gtag('event', 'conversion', {
        send_to: `${siteConfig.googleAdsConversionId}/${siteConfig.googleAdsConversionLabel}`,
        value: parameters.value || 1.0,
        currency: 'BRL',
        transaction_id: `lead_${Date.now()}`,
      });
    }
  }

  // Console log for debugging
  if (import.meta.env.DEV) {
    console.log('[Tracking]', event, parameters);
  }
}

export function trackFormSubmit(formType: FormData['source'], estimatedValue: number): void {
  trackEvent({
    event: 'generate_lead',
    parameters: {
      form_type: formType,
      value: estimatedValue,
      currency: 'BRL',
    },
  });
}

export function trackWhatsAppClick(source: 'hero' | 'cta' | 'float' | 'footer' | 'form'): void {
  trackEvent({
    event: 'contact',
    parameters: {
      method: 'whatsapp',
      source,
    },
  });
}

export function trackServiceView(serviceName: string, price: number): void {
  trackEvent({
    event: 'view_item',
    parameters: {
      service_name: serviceName,
      price,
      currency: 'BRL',
    },
  });
}

export function trackPageView(pageName: string): void {
  if (typeof window === 'undefined') return;

  // GA4 (gtag config) já envia page_view automático — não duplicar.
  // GTM consome page_view via dataLayer do gtag config.
  if (!siteConfig.ga4Id && window.gtag) {
    window.gtag('event', 'page_view', {
      page_title: pageName,
      page_location: window.location.href,
    });
  }

  if (window.fbq) {
    window.fbq('track', 'PageView');
  }
}