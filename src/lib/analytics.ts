// Declaración de tipos globales para prevenir errores de compilación TypeScript
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    fbq?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

// Catálogo de eventos de conversión solicitados
export type ConversionEvent =
  | 'click_reservar_hora'      // Clic en botón de reserva
  | 'click_whatsapp'           // Clic en WhatsApp
  | 'form_contacto_enviado'    // Envío de formulario (Alianzas)
  | 'click_llamar'             // Clic en teléfono
  | 'click_mapa'               // Clic en ubicación
  | 'view_especialidad'        // Vista de página de especialidad
  | 'click_promocion'          // Interacción con promociones (ej. barra dental)
  | 'click_convenio'           // Clic en convenios (ej. Tarjeta Mi Vita)
  | 'reserva_iniciada'         // Inicio del flujo de reserva
  | 'reserva_completada';      // Si el sistema permite medirlo (reserva exitosa)

interface EventParams {
  category?: string;
  label?: string;
  value?: number;
  [key: string]: any;
}

/**
 * Envía un evento de conversión a GA4, GTM y Meta Pixel
 */
export function trackEvent(eventName: ConversionEvent, params: EventParams = {}) {
  if (typeof window === 'undefined') return;

  // Log de consola en modo desarrollo para verificar que todo se dispare perfectamente
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Analytics Event] 📊 Disparado: "${eventName}"`, params);
  }

  // 1. Enviar a Google Tag Manager (GTM DataLayer)
  if (window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...params
    });
  }

  // 2. Enviar a Google Analytics 4 (GA4 gtag)
  if (window.gtag) {
    window.gtag('event', eventName, {
      event_category: params.category || 'conversion',
      event_label: params.label || '',
      value: params.value,
      ...params
    });
  }

  // 3. Enviar a Meta Pixel (fbq)
  if (window.fbq) {
    // Mapeo automático de eventos personalizados a estándares de Facebook si aplica
    if (eventName === 'click_reservar_hora' || eventName === 'reserva_iniciada') {
      window.fbq('track', 'InitiateCheckout', { content_name: params.label });
    } else if (eventName === 'reserva_completada') {
      window.fbq('track', 'Purchase', { value: params.value || 0, currency: 'CLP' });
    } else if (eventName === 'form_contacto_enviado') {
      window.fbq('track', 'Lead', { content_category: params.category });
    } else {
      window.fbq('trackCustom', eventName, params);
    }
  }
}
