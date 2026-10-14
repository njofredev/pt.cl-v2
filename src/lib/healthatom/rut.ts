/**
 * Utilidades para validación y formateo de RUT chileno
 * Policlínico Tabancura - Healthatom Integration
 */

/**
 * Limpia y formatea un RUT al estándar exigido por Dentalink/Medilink:
 * "12345678-9" (sin puntos, con guion, K mayúscula)
 */
export function formatRutForHealthatom(rawRut: string): string {
  const clean = (rawRut || '').replace(/[^0-9kK]/g, '').toUpperCase();
  if (clean.length < 2) return clean;
  const body = clean.slice(0, -1);
  const dv = clean.slice(-1);
  return `${body}-${dv}`;
}

/**
 * Formatea un RUT para visualización amigable con puntos y guión:
 * ej. "123456789" -> "12.345.678-9"
 */
export function formatRutDisplay(rawRut: string): string {
  const clean = (rawRut || '').replace(/[^0-9kK]/g, '').toUpperCase();
  if (clean.length === 0) return '';
  if (clean.length === 1) return clean;

  const dv = clean.slice(-1);
  let body = clean.slice(0, -1);

  // Formatear body con separadores de miles
  let formattedBody = '';
  while (body.length > 3) {
    formattedBody = '.' + body.slice(-3) + formattedBody;
    body = body.slice(0, -3);
  }
  formattedBody = body + formattedBody;

  return `${formattedBody}-${dv}`;
}

/**
 * Valida un RUT chileno mediante algoritmo Módulo 11
 */
export function isValidChileanRut(rawRut: string): boolean {
  const clean = (rawRut || '').replace(/[^0-9kK]/g, '').toUpperCase();
  if (clean.length < 7 || clean.length > 9) return false;

  const body = clean.slice(0, -1);
  const dv = clean.slice(-1);

  let sum = 0;
  let multiplier = 2;

  for (let i = body.length - 1; i >= 0; i--) {
    sum += parseInt(body.charAt(i), 10) * multiplier;
    multiplier = multiplier === 7 ? 2 : multiplier + 1;
  }

  const expectedDvResult = 11 - (sum % 11);
  const expectedDv =
    expectedDvResult === 11 ? '0' : expectedDvResult === 10 ? 'K' : expectedDvResult.toString();

  return dv === expectedDv;
}

/**
 * Limpia completamente el RUT dejando solo dígitos y K
 */
export function cleanRutOnly(rawRut: string): string {
  return (rawRut || '').replace(/[^0-9kK]/g, '').toUpperCase();
}
