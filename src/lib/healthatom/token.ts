import crypto from 'crypto';
import { MaskedPatientData } from './types';

const SECRET_KEY =
  process.env.BOOKING_SECRET_KEY ||
  process.env.ADMIN_PASSWORD ||
  'pt-tabancura-secure-booking-token-key-2026';

export interface PatientTokenPayload {
  id_paciente: number;
  platform: 'dentalink' | 'medilink';
  rut: string;
  nombre: string;
  apellidos: string;
  email?: string;
  celular?: string;
  exp: number; // expiration timestamp
}

/**
 * Genera un token firmado HMAC-SHA256 para el paciente, evitando exponer su ID o datos sin autenticar
 */
export function createPatientToken(data: Omit<PatientTokenPayload, 'exp'>): string {
  const payload: PatientTokenPayload = {
    ...data,
    exp: Date.now() + 1000 * 60 * 60 * 2, // 2 horas de validez para agendamiento
  };

  const payloadBase64 = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto
    .createHmac('sha256', SECRET_KEY)
    .update(payloadBase64)
    .digest('base64url');

  return `${payloadBase64}.${signature}`;
}

/**
 * Verifica y descifra el payload del token firmado del paciente
 */
export function verifyPatientToken(token: string): PatientTokenPayload | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 2) return null;

    const [payloadBase64, signature] = parts;
    const expectedSignature = crypto
      .createHmac('sha256', SECRET_KEY)
      .update(payloadBase64)
      .digest('base64url');

    if (
      !crypto.timingSafeEqual(
        Buffer.from(signature, 'utf-8'),
        Buffer.from(expectedSignature, 'utf-8')
      )
    ) {
      return null;
    }

    const payload: PatientTokenPayload = JSON.parse(
      Buffer.from(payloadBase64, 'base64url').toString('utf-8')
    );

    if (Date.now() > payload.exp) {
      return null; // Expirado
    }

    return payload;
  } catch (err) {
    return null;
  }
}

/**
 * Enmascara datos sensibles de acuerdo a la Ley 21.719
 */
export function maskLastName(apellidos: string): string {
  if (!apellidos) return '******';
  const parts = apellidos.trim().split(/\s+/);
  return parts
    .map((p) => (p.length > 1 ? p[0] + '*'.repeat(Math.min(p.length - 1, 5)) : p))
    .join(' ');
}

export function maskEmail(email?: string): string {
  if (!email || !email.includes('@')) return '******';
  const [user, domain] = email.split('@');
  const visibleUser = user.length > 2 ? user.slice(0, 2) + '***' : user[0] + '***';
  return `${visibleUser}@${domain}`;
}

export function maskPhone(phone?: string): string {
  if (!phone) return '******';
  const clean = phone.trim();
  if (clean.length < 6) return '******';
  const prefix = clean.slice(0, 4);
  const suffix = clean.slice(-4);
  return `${prefix}****${suffix}`;
}

export function sanitizePatientForResponse(patient: {
  nombre: string;
  apellidos: string;
  email?: string;
  celular?: string;
  telefono?: string;
}): MaskedPatientData {
  return {
    first_name: patient.nombre.trim().split(/\s+/)[0] || patient.nombre.trim(),
    masked_last_name: maskLastName(patient.apellidos),
    masked_email: maskEmail(patient.email),
    masked_phone: maskPhone(patient.celular || patient.telefono),
  };
}
