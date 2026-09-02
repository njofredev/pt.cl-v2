import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

interface ConsentLogPayload {
  consentId: string;
  action: 'accept_all' | 'reject_all' | 'custom_preferences';
  preferences: {
    essential: boolean;
    analytics: boolean;
    marketing: boolean;
  };
  version: string;
  timestamp: string;
}

/**
 * Anonimiza la dirección IP para estricto cumplimiento con Ley N° 21.719
 * Enmascara el último octeto en IPv4 (ej. 190.160.45.xxx) o la mitad final en IPv6
 */
function anonymizeIp(ip: string | null): string {
  if (!ip) return 'unknown';
  const clientIp = ip.split(',')[0].trim();

  if (clientIp.includes('.')) {
    const parts = clientIp.split('.');
    if (parts.length === 4) {
      return `${parts[0]}.${parts[1]}.${parts[2]}.0`;
    }
  } else if (clientIp.includes(':')) {
    const parts = clientIp.split(':');
    return `${parts.slice(0, 3).join(':')}::0`;
  }
  return 'anonymized';
}

/**
 * Archivo de respaldo de auditoría
 */
function getBackupFilePath(): string {
  const dir = path.join(process.cwd(), '.data');
  if (!fs.existsSync(dir)) {
    try {
      fs.mkdirSync(dir, { recursive: true });
    } catch (e) {
      console.warn('[Consent API] No se pudo crear directorio .data:', e);
    }
  }
  return path.join(dir, 'consent_audit.jsonl');
}

/**
 * POST /api/consent/log
 * Registra una decisión en la tabla `cookie_consent_logs` de la base de datos `db_sst`
 */
export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as ConsentLogPayload;

    if (!body || !body.consentId || !body.preferences) {
      return NextResponse.json({ error: 'Payload de consentimiento inválido' }, { status: 400 });
    }

    const rawIp = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip');
    const userAgent = req.headers.get('user-agent') || 'unknown';

    const logData = {
      consentId: body.consentId,
      action: body.action || 'custom_preferences',
      analytics: Boolean(body.preferences.analytics),
      marketing: Boolean(body.preferences.marketing),
      policyVersion: body.version || '1.0-ley21719',
      anonymizedIp: anonymizeIp(rawIp),
      userAgent: userAgent.slice(0, 255),
    };

    let savedInDb = false;

    // 1. Guardar en Base de Datos PostgreSQL db_sst (tabla cookie_consent_logs)
    try {
      await prisma.cookieConsentLog.create({
        data: logData,
      });
      savedInDb = true;
    } catch (dbErr) {
      console.error('[Consent API] Error al guardar en base de datos db_sst:', dbErr);
    }

    // 2. Guardar también en archivo local de contingencia (alta resiliencia)
    try {
      const filePath = getBackupFilePath();
      const backupEntry = {
        ...logData,
        clientTimestamp: body.timestamp || new Date().toISOString(),
        serverTimestamp: new Date().toISOString(),
      };
      fs.appendFileSync(filePath, JSON.stringify(backupEntry) + '\n', 'utf8');
    } catch (fileErr) {
      console.warn('[Consent API] No se pudo escribir respaldo en archivo:', fileErr);
    }

    console.log(`[Ley 21.719 Audit] 🛡️ Registrado en ${savedInDb ? 'db_sst (PostgreSQL)' : 'respaldo local'}: ${logData.consentId} | Acción: ${logData.action}`);

    return NextResponse.json({
      success: true,
      consentId: logData.consentId,
      dbSaved: savedInDb,
      recordedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('[Consent API] Error en el registro de consentimiento:', error);
    return NextResponse.json({ error: 'Error interno al registrar consentimiento' }, { status: 500 });
  }
}

/**
 * GET /api/consent/log
 * Consulta registros desde PostgreSQL db_sst (con fallback al archivo de contingencia)
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const isCsvExport = searchParams.get('export') === 'csv';

    let allEntries: any[] = [];

    // 1. Intentar consultar desde PostgreSQL db_sst
    try {
      const dbRecords = await prisma.cookieConsentLog.findMany({
        orderBy: { createdAt: 'desc' },
        take: 500, // Máximo 500 registros para alta velocidad
      });

      if (dbRecords && dbRecords.length > 0) {
        allEntries = dbRecords.map((r) => ({
          consentId: r.consentId,
          action: r.action,
          analytics: r.analytics,
          marketing: r.marketing,
          version: r.policyVersion,
          anonymizedIp: r.anonymizedIp || 'unknown',
          userAgent: r.userAgent || 'unknown',
          timestamp: r.createdAt.toISOString(),
        }));
      }
    } catch (dbErr) {
      console.warn('[Consent API] Fallo al consultar PostgreSQL db_sst, usando archivo local:', dbErr);
    }

    // 2. Si no hubo registros en BD, consultar archivo de contingencia
    if (allEntries.length === 0) {
      const filePath = getBackupFilePath();
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        const lines = content.trim().split('\n').filter(Boolean);
        for (const line of lines) {
          try {
            const item = JSON.parse(line);
            allEntries.push({
              consentId: item.consentId,
              action: item.action,
              analytics: Boolean(item.analytics ?? item.preferences?.analytics),
              marketing: Boolean(item.marketing ?? item.preferences?.marketing),
              version: item.policyVersion || item.version || '1.0-ley21719',
              anonymizedIp: item.anonymizedIp || 'unknown',
              userAgent: item.userAgent || 'unknown',
              timestamp: item.serverTimestamp || item.clientTimestamp || new Date().toISOString(),
            });
          } catch {
            // Ignorar
          }
        }
        allEntries.reverse(); // Más recientes primero
      }
    }

    // 3. Exportar a CSV si se solicita
    if (isCsvExport) {
      const csvHeader = '\uFEFFconsentId,action,analytics,marketing,version,ip,userAgent,timestamp\n';
      const csvRows = allEntries
        .map(
          (e) =>
            `"${e.consentId}","${e.action}","${e.analytics ? 'SI' : 'NO'}","${e.marketing ? 'SI' : 'NO'}","${e.version}","${e.anonymizedIp}","${(e.userAgent || '').replace(/"/g, '""')}","${e.timestamp}"`
        )
        .join('\n');

      return new NextResponse(csvHeader + csvRows, {
        headers: {
          'Content-Type': 'text/csv; charset=utf-8',
          'Content-Disposition': `attachment; filename="registro_consentimientos_ley21719_${new Date().toISOString().slice(0, 10)}.csv"`,
        },
      });
    }

    // 4. Calcular métricas agregadas
    let acceptAll = 0;
    let rejectAll = 0;
    let custom = 0;
    let analyticsAllowed = 0;
    let marketingAllowed = 0;

    for (const e of allEntries) {
      if (e.action === 'accept_all') acceptAll++;
      else if (e.action === 'reject_all') rejectAll++;
      else custom++;

      if (e.analytics) analyticsAllowed++;
      if (e.marketing) marketingAllowed++;
    }

    return NextResponse.json({
      totalRecords: allEntries.length,
      source: 'db_sst (PostgreSQL)',
      stats: {
        acceptAll,
        rejectAll,
        custom,
        analyticsAllowed,
        marketingAllowed,
        acceptanceRate: allEntries.length > 0 ? Math.round((acceptAll / allEntries.length) * 100) : 0,
      },
      entries: allEntries,
      compliance: {
        law: 'Ley N° 21.719 (Chile)',
        method: 'Privacy by Design - Registro Seudoanónimo Auditable en Base de Datos db_sst',
      },
    });
  } catch (error) {
    console.error('[Consent API] Error al leer auditoría:', error);
    return NextResponse.json({ error: 'Error al consultar auditoría' }, { status: 500 });
  }
}
