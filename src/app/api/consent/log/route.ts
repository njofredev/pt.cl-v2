import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

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
  // Si viene con múltiples IPs en x-forwarded-for, tomar la primera
  const clientIp = ip.split(',')[0].trim();

  if (clientIp.includes('.')) {
    // IPv4
    const parts = clientIp.split('.');
    if (parts.length === 4) {
      return `${parts[0]}.${parts[1]}.${parts[2]}.0`;
    }
  } else if (clientIp.includes(':')) {
    // IPv6
    const parts = clientIp.split(':');
    return `${parts.slice(0, 3).join(':')}::0`;
  }
  return 'anonymized';
}

/**
 * Obtiene la ruta del archivo de registro de auditoría
 */
function getLogFilePath(): string {
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
 * Registra una decisión de consentimiento en el libro de auditoría de Ley N° 21.719
 */
export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as ConsentLogPayload;

    if (!body || !body.consentId || !body.preferences) {
      return NextResponse.json({ error: 'Payload de consentimiento inválido' }, { status: 400 });
    }

    const rawIp = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip');
    const userAgent = req.headers.get('user-agent') || 'unknown';

    const logEntry = {
      consentId: body.consentId,
      action: body.action || 'custom_preferences',
      preferences: {
        essential: true,
        analytics: Boolean(body.preferences.analytics),
        marketing: Boolean(body.preferences.marketing),
      },
      policyVersion: body.version || '1.0-ley21719',
      clientTimestamp: body.timestamp || new Date().toISOString(),
      serverTimestamp: new Date().toISOString(),
      anonymizedIp: anonymizeIp(rawIp),
      userAgent: userAgent.slice(0, 200), // truncado para optimización de almacenamiento
    };

    // Guardar en archivo estructurado JSONL (1 línea por evento)
    try {
      const filePath = getLogFilePath();
      fs.appendFileSync(filePath, JSON.stringify(logEntry) + '\n', 'utf8');
    } catch (fileErr) {
      console.error('[Consent API] Error al escribir en archivo de auditoría:', fileErr);
    }

    // Log en consola de servidor para visibilidad en entornos cloud (Vercel, Docker, etc.)
    console.log(`[Ley 21.719 Audit] 🛡️ Consentimiento registrado: ${logEntry.consentId} | Acción: ${logEntry.action} | Analítica: ${logEntry.preferences.analytics} | Marketing: ${logEntry.preferences.marketing}`);

    return NextResponse.json({
      success: true,
      consentId: logEntry.consentId,
      recordedAt: logEntry.serverTimestamp,
    });
  } catch (error) {
    console.error('[Consent API] Error en el registro de consentimiento:', error);
    return NextResponse.json({ error: 'Error interno al registrar consentimiento' }, { status: 500 });
  }
}

/**
 * GET /api/consent/log
 * Consulta estadísticas y registros del libro de auditoría (para dashboard admin y descargas legales)
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const isCsvExport = searchParams.get('export') === 'csv';

    const filePath = getLogFilePath();
    if (!fs.existsSync(filePath)) {
      if (isCsvExport) {
        return new NextResponse('consentId,action,analytics,marketing,version,ip,userAgent,timestamp\n', {
          headers: {
            'Content-Type': 'text/csv; charset=utf-8',
            'Content-Disposition': 'attachment; filename="registro_consentimientos_ley21719.csv"',
          },
        });
      }
      return NextResponse.json({
        totalRecords: 0,
        stats: { acceptAll: 0, rejectAll: 0, custom: 0, analyticsAllowed: 0, marketingAllowed: 0 },
        entries: [],
      });
    }

    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.trim().split('\n').filter(Boolean);

    let acceptAll = 0;
    let rejectAll = 0;
    let custom = 0;
    let analyticsAllowed = 0;
    let marketingAllowed = 0;

    const allEntries: any[] = [];

    for (const line of lines) {
      try {
        const item = JSON.parse(line);
        if (item.action === 'accept_all') acceptAll++;
        else if (item.action === 'reject_all') rejectAll++;
        else custom++;

        if (item.preferences?.analytics) analyticsAllowed++;
        if (item.preferences?.marketing) marketingAllowed++;

        allEntries.push({
          consentId: item.consentId,
          action: item.action,
          analytics: Boolean(item.preferences?.analytics),
          marketing: Boolean(item.preferences?.marketing),
          version: item.policyVersion || '1.0-ley21719',
          anonymizedIp: item.anonymizedIp || 'unknown',
          userAgent: item.userAgent || 'unknown',
          timestamp: item.serverTimestamp || item.clientTimestamp,
        });
      } catch {
        // Ignorar líneas corruptas
      }
    }

    // Si se solicita descarga formal en CSV para auditoría
    if (isCsvExport) {
      const csvHeader = '\uFEFFconsentId,action,analytics,marketing,version,ip,userAgent,timestamp\n';
      const csvRows = allEntries
        .map(
          (e) =>
            `"${e.consentId}","${e.action}","${e.analytics ? 'SI' : 'NO'}","${e.marketing ? 'SI' : 'NO'}","${e.version}","${e.anonymizedIp}","${e.userAgent.replace(/"/g, '""')}","${e.timestamp}"`
        )
        .join('\n');

      return new NextResponse(csvHeader + csvRows, {
        headers: {
          'Content-Type': 'text/csv; charset=utf-8',
          'Content-Disposition': `attachment; filename="registro_consentimientos_ley21719_${new Date().toISOString().slice(0, 10)}.csv"`,
        },
      });
    }

    return NextResponse.json({
      totalRecords: allEntries.length,
      stats: {
        acceptAll,
        rejectAll,
        custom,
        analyticsAllowed,
        marketingAllowed,
        acceptanceRate: allEntries.length > 0 ? Math.round((acceptAll / allEntries.length) * 100) : 0,
      },
      entries: allEntries.reverse(), // Más recientes primero
      compliance: {
        law: 'Ley N° 21.719 (Chile)',
        method: 'Privacy by Design - Registro Seudoanónimo Auditable',
      },
    });
  } catch (error) {
    console.error('[Consent API] Error al leer estadísticas de auditoría:', error);
    return NextResponse.json({ error: 'Error al consultar auditoría' }, { status: 500 });
  }
}
