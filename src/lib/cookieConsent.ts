/**
 * Utilidad de Gestión de Consentimiento de Cookies
 * Cumplimiento Ley N° 21.719 (Protección de Datos Personales - Chile)
 * Privacy by Design / Opt-in Explícito / Registro Auditable
 */

export interface CookiePreferences {
  consentId: string;  // Identificador único seudoanónimo (UUID v4)
  essential: boolean; // Siempre true (técnicas y de seguridad)
  analytics: boolean; // Google Analytics, Clarity, etc.
  marketing: boolean; // Meta Pixel, Google Ads, etc.
  timestamp: string;  // Fecha ISO de otorgamiento/modificación
  version: string;    // Versión de la política
}

export type ConsentAction = 'accept_all' | 'reject_all' | 'custom_preferences';

export const COOKIE_CONSENT_KEY = 'cookie_consent_preferences';
export const COOKIE_CONSENT_ID_KEY = 'cookie_consent_id';
export const COOKIE_CONSENT_EVENT = 'cookie_consent_updated';
export const COOKIE_CONSENT_OPEN_EVENT = 'open_cookie_preferences';
export const CURRENT_POLICY_VERSION = '1.0-ley21719';

export const DEFAULT_PREFERENCES: CookiePreferences = {
  consentId: '',
  essential: true,
  analytics: false,
  marketing: false,
  timestamp: '',
  version: CURRENT_POLICY_VERSION,
};

/**
 * Obtiene o genera un Identificador Seudoanónimo Único de Consentimiento (UUID)
 * Garantiza trazabilidad legal sin almacenar datos de salud sensibles
 */
export function getOrCreateConsentId(): string {
  if (typeof window === 'undefined') return '';

  try {
    const existing = localStorage.getItem(COOKIE_CONSENT_ID_KEY);
    if (existing) return existing;

    // Generación de identificador único seguro
    const newId =
      'pt_' +
      (typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : Math.random().toString(36).substring(2, 12) + '-' + Date.now().toString(36));

    localStorage.setItem(COOKIE_CONSENT_ID_KEY, newId);
    return newId;
  } catch {
    return 'pt_' + Date.now().toString(36);
  }
}

/**
 * Obtiene las preferencias almacenadas en localStorage o cookies
 */
export function getStoredConsent(): CookiePreferences | null {
  if (typeof window === 'undefined') return null;

  try {
    const raw = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CookiePreferences;
    if (parsed && typeof parsed.essential === 'boolean') {
      return parsed;
    }
  } catch (err) {
    console.warn('[CookieConsent] Error al leer preferencias de localStorage', err);
  }
  return null;
}

/**
 * Envía el registro de consentimiento al servidor para el libro de auditoría de Ley N° 21.719
 */
function sendConsentToAuditServer(prefs: CookiePreferences, action: ConsentAction) {
  if (typeof window === 'undefined') return;

  const payload = {
    consentId: prefs.consentId,
    action,
    preferences: {
      essential: prefs.essential,
      analytics: prefs.analytics,
      marketing: prefs.marketing,
    },
    version: prefs.version,
    timestamp: prefs.timestamp,
  };

  try {
    fetch('/api/consent/log', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true, // Asegura que la petición finalice incluso si el usuario navega o cierra
    }).catch((err) => {
      console.warn('[CookieConsent] No se pudo enviar log de auditoría al servidor:', err);
    });
  } catch (err) {
    console.warn('[CookieConsent] Excepción al despachar auditoría:', err);
  }
}

/**
 * Guarda las preferencias de consentimiento tanto en cliente como en el libro de auditoría del servidor
 */
export function saveConsent(
  prefs: Omit<CookiePreferences, 'essential' | 'timestamp' | 'version' | 'consentId'> & Partial<CookiePreferences>,
  action: ConsentAction = 'custom_preferences'
): CookiePreferences {
  const consentId = prefs.consentId || getOrCreateConsentId();

  const finalPrefs: CookiePreferences = {
    consentId,
    essential: true, // No revocable por razones técnicas
    analytics: Boolean(prefs.analytics),
    marketing: Boolean(prefs.marketing),
    timestamp: new Date().toISOString(),
    version: CURRENT_POLICY_VERSION,
  };

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(finalPrefs));

      // Guardar también como cookie con expiración de 12 meses
      const maxAge = 60 * 60 * 24 * 365; // 1 año
      document.cookie = `${COOKIE_CONSENT_KEY}=${encodeURIComponent(JSON.stringify(finalPrefs))}; path=/; max-age=${maxAge}; SameSite=Lax`;

      // Registrar en el libro de auditoría del servidor (Ley N° 21.719)
      sendConsentToAuditServer(finalPrefs, action);

      // Despachar evento para que componentes reactivos se activen sin recargar
      window.dispatchEvent(new CustomEvent(COOKIE_CONSENT_EVENT, { detail: finalPrefs }));
    } catch (err) {
      console.error('[CookieConsent] Error al guardar consentimiento', err);
    }
  }

  return finalPrefs;
}

/**
 * Comprueba si una categoría específica cuenta con consentimiento activo
 */
export function hasConsent(category: 'essential' | 'analytics' | 'marketing'): boolean {
  if (category === 'essential') return true;
  const stored = getStoredConsent();
  if (!stored) return false; // Por defecto: Opt-in (Ley N° 21.719)
  return Boolean(stored[category]);
}

/**
 * Abre el panel modal de preferencias de cookies desde cualquier parte de la app
 */
export function openConsentModal(): void {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(COOKIE_CONSENT_OPEN_EVENT));
  }
}
