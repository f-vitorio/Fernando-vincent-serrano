import { siteConfig } from '../types';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
    fbq: (...args: unknown[]) => void;
  }
}

export function initTracking(): void {
  if (typeof window === 'undefined') return;

  // Initialize dataLayer
  window.dataLayer = window.dataLayer || [];

  // GA4 + GTM
  if (siteConfig.gtmId) {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${siteConfig.gtmId}`;
    document.head.appendChild(script);

    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', siteConfig.gtmId);
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

  // Google Ads Conversion (base)
  if (siteConfig.googleAdsConversionId) {
    window.gtag = window.gtag || function() { window.dataLayer.push(arguments); };
    window.gtag('config', `AW-${siteConfig.googleAdsConversionId}`);
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

  // Google Ads Conversion
  if (siteConfig.googleAdsConversionId && siteConfig.googleAdsConversionLabel && window.gtag) {
    const conversionEvents = ['generate_lead', 'contact'];
    if (conversionEvents.includes(event)) {
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

export function trackFormSubmit(formType: 'treinamento' | 'corrida' | 'consultoria' | 'contato', estimatedValue: number): void {
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

  if (window.gtag) {
    window.gtag('event', 'page_view', {
      page_title: pageName,
      page_location: window.location.href,
    });
  }

  if (window.fbq) {
    window.fbq('track', 'PageView');
  }
}