"use client";

import React, { useState, useEffect, useMemo } from 'react';
import {
  Cookie,
  ShieldCheck,
  Download,
  RefreshCw,
  Search,
  CheckCircle2,
  XCircle,
  Clock,
  Filter,
  Users,
  BarChart3,
  Megaphone,
  Copy,
  Check,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ConsentEntry {
  consentId: string;
  action: 'accept_all' | 'reject_all' | 'custom_preferences';
  analytics: boolean;
  marketing: boolean;
  version: string;
  anonymizedIp: string;
  userAgent: string;
  timestamp: string;
}

interface ConsentStats {
  acceptAll: number;
  rejectAll: number;
  custom: number;
  analyticsAllowed: number;
  marketingAllowed: number;
  acceptanceRate: number;
}

export default function AdminCookiesPage() {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [entries, setEntries] = useState<ConsentEntry[]>([]);
  const [stats, setStats] = useState<ConsentStats>({
    acceptAll: 0,
    rejectAll: 0,
    custom: 0,
    analyticsAllowed: 0,
    marketingAllowed: 0,
    acceptanceRate: 0,
  });
  const [totalRecords, setTotalRecords] = useState(0);

  // Filtros
  const [searchTerm, setSearchTerm] = useState('');
  const [actionFilter, setActionFilter] = useState<'all' | 'accept_all' | 'reject_all' | 'custom_preferences'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setRefreshing(true);
      const res = await fetch('/api/consent/log', { cache: 'no-store' });
      if (!res.ok) throw new Error('Error al cargar consentimientos');
      const data = await res.json();
      setEntries(data.entries || []);
      setStats(data.stats || {
        acceptAll: 0,
        rejectAll: 0,
        custom: 0,
        analyticsAllowed: 0,
        marketingAllowed: 0,
        acceptanceRate: 0,
      });
      setTotalRecords(data.totalRecords || 0);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCopyId = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredEntries = useMemo(() => {
    return entries.filter((item) => {
      const matchesSearch =
        item.consentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.anonymizedIp.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.userAgent.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesAction = actionFilter === 'all' || item.action === actionFilter;

      return matchesSearch && matchesAction;
    });
  }, [entries, searchTerm, actionFilter]);

  const handleExportCsv = () => {
    window.open('/api/consent/log?export=csv', '_blank');
  };

  const formatDate = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleString('es-CL', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
    } catch {
      return isoString;
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      
      {/* 1. Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[11px] font-black uppercase tracking-widest text-[#259CF4] bg-[#259CF4]/10 px-2.5 py-0.5 rounded-full">
              Ley N° 21.719
            </span>
            <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">
              Libro de Consentimientos
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#162158] tracking-tight">
            Gestión de Cookies y Privacidad
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Registro auditable de las decisiones de consentimiento expreso otorgadas por los pacientes en el portal.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={fetchData}
            disabled={refreshing}
            className="rounded-xl border-slate-200 text-slate-700 hover:bg-slate-100 flex items-center gap-2 text-xs font-bold"
          >
            <RefreshCw size={14} className={refreshing ? 'animate-spin' : ''} />
            <span>Actualizar</span>
          </Button>

          <Button
            onClick={handleExportCsv}
            className="bg-[#1E40AF] hover:bg-[#1e3a8a] text-white rounded-xl shadow-sm text-xs font-bold flex items-center gap-2 cursor-pointer"
          >
            <Download size={14} />
            <span>Descargar CSV Legal</span>
          </Button>
        </div>
      </div>

      {/* 2. Tarjetas de Estadísticas Principales */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Total de Registros */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-600 flex items-center justify-center shrink-0">
            <Users size={22} />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Pacientes</p>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight mt-0.5">
              {loading ? '...' : totalRecords.toLocaleString('es-CL')}
            </h3>
            <span className="text-[10px] text-slate-500 font-semibold">Decisiones registradas</span>
          </div>
        </div>

        {/* Tasa de Aceptación Total */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
            <CheckCircle2 size={22} />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Aceptación Total</p>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                {loading ? '...' : `${stats.acceptanceRate}%`}
              </h3>
              <span className="text-xs text-slate-500 font-medium">({stats.acceptAll})</span>
            </div>
            <span className="text-[10px] text-emerald-600 font-bold">Aceptaron todas</span>
          </div>
        </div>

        {/* Analítica (GA4 / Clarity) */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#259CF4]/10 text-[#259CF4] flex items-center justify-center shrink-0">
            <BarChart3 size={22} />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Analítica Aprobada</p>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                {loading ? '...' : totalRecords > 0 ? `${Math.round((stats.analyticsAllowed / totalRecords) * 100)}%` : '0%'}
              </h3>
              <span className="text-xs text-slate-500 font-medium">({stats.analyticsAllowed})</span>
            </div>
            <span className="text-[10px] text-slate-500 font-semibold">GA4 & Clarity activos</span>
          </div>
        </div>

        {/* Marketing (Meta Pixel) */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-600 flex items-center justify-center shrink-0">
            <Megaphone size={22} />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Marketing Aprobado</p>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                {loading ? '...' : totalRecords > 0 ? `${Math.round((stats.marketingAllowed / totalRecords) * 100)}%` : '0%'}
              </h3>
              <span className="text-xs text-slate-500 font-medium">({stats.marketingAllowed})</span>
            </div>
            <span className="text-[10px] text-slate-500 font-semibold">Meta Pixel activo</span>
          </div>
        </div>

      </div>

      {/* 3. Filtros y Búsqueda */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        
        {/* Buscador */}
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por Consent ID, IP o dispositivo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E40AF]/20 focus:border-[#1E40AF]"
          />
        </div>

        {/* Botones de Filtro por Decisión */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <span className="text-xs font-bold text-slate-500 mr-1 flex items-center gap-1">
            <Filter size={12} />
            Filtro:
          </span>
          <button
            onClick={() => setActionFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              actionFilter === 'all'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Todos ({entries.length})
          </button>
          <button
            onClick={() => setActionFilter('accept_all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              actionFilter === 'accept_all'
                ? 'bg-emerald-600 text-white'
                : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
            }`}
          >
            Aceptó Todo ({stats.acceptAll})
          </button>
          <button
            onClick={() => setActionFilter('reject_all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              actionFilter === 'reject_all'
                ? 'bg-rose-600 text-white'
                : 'bg-rose-50 text-rose-700 hover:bg-rose-100'
            }`}
          >
            Rechazó Todo ({stats.rejectAll})
          </button>
          <button
            onClick={() => setActionFilter('custom_preferences')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              actionFilter === 'custom_preferences'
                ? 'bg-blue-600 text-white'
                : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
            }`}
          >
            Personalizado ({stats.custom})
          </button>
        </div>

      </div>

      {/* 4. Tabla de Auditoría */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        
        <div className="p-4 sm:p-6 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck size={18} className="text-[#1E40AF]" />
            <h2 className="text-base font-bold text-slate-900">
              Registros de Consentimiento en Vivo
            </h2>
            <span className="text-xs bg-slate-100 text-slate-600 font-bold px-2 py-0.5 rounded-full">
              {filteredEntries.length} mostrados
            </span>
          </div>
          <span className="text-xs text-slate-500 hidden sm:inline">
            Formato: Seudoanónimo (Ley N° 21.719)
          </span>
        </div>

        {loading ? (
          <div className="p-12 text-center text-slate-500 flex flex-col items-center justify-center gap-2">
            <RefreshCw size={24} className="animate-spin text-[#1E40AF]" />
            <p className="text-sm font-medium">Cargando libro de consentimientos...</p>
          </div>
        ) : filteredEntries.length === 0 ? (
          <div className="p-16 text-center text-slate-500 space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-100 mx-auto flex items-center justify-center text-slate-400">
              <Cookie size={24} />
            </div>
            <h4 className="text-base font-bold text-slate-800">No se encontraron registros</h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              {searchTerm || actionFilter !== 'all'
                ? 'No hay registros que coincidan con los filtros aplicados.'
                : 'Aún no se han registrado eventos de consentimiento desde el banner web.'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px] font-bold border-b border-slate-200">
                <tr>
                  <th className="py-3.5 px-4 sm:px-6">Consent ID (Paciente)</th>
                  <th className="py-3.5 px-4">Decisión</th>
                  <th className="py-3.5 px-4">Analítica (GA4)</th>
                  <th className="py-3.5 px-4">Marketing (Pixel)</th>
                  <th className="py-3.5 px-4">Fecha y Hora</th>
                  <th className="py-3.5 px-4">IP Anonimizada</th>
                  <th className="py-3.5 px-4 sm:px-6">Versión</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredEntries.map((item, idx) => {
                  return (
                    <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                      
                      {/* Consent ID */}
                      <td className="py-3.5 px-4 sm:px-6 font-mono text-xs text-slate-700">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{item.consentId}</span>
                          <button
                            type="button"
                            onClick={() => handleCopyId(item.consentId)}
                            className="text-slate-400 hover:text-slate-700 transition-colors p-1 rounded cursor-pointer"
                            title="Copiar ID de consentimiento"
                          >
                            {copiedId === item.consentId ? (
                              <Check size={12} className="text-emerald-600" />
                            ) : (
                              <Copy size={12} />
                            )}
                          </button>
                        </div>
                      </td>

                      {/* Decisión */}
                      <td className="py-3.5 px-4">
                        {item.action === 'accept_all' && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                            <CheckCircle2 size={12} />
                            Aceptó Todo
                          </span>
                        )}
                        {item.action === 'reject_all' && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-50 text-rose-700 border border-rose-200/60">
                            <XCircle size={12} />
                            Rechazó Todo
                          </span>
                        )}
                        {item.action === 'custom_preferences' && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200/60">
                            <Filter size={12} />
                            Personalizado
                          </span>
                        )}
                      </td>

                      {/* Analítica */}
                      <td className="py-3.5 px-4">
                        {item.analytics ? (
                          <span className="text-emerald-700 font-bold text-xs flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                            Permitido
                          </span>
                        ) : (
                          <span className="text-slate-400 font-medium text-xs flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                            Bloqueado
                          </span>
                        )}
                      </td>

                      {/* Marketing */}
                      <td className="py-3.5 px-4">
                        {item.marketing ? (
                          <span className="text-purple-700 font-bold text-xs flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                            Permitido
                          </span>
                        ) : (
                          <span className="text-slate-400 font-medium text-xs flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                            Bloqueado
                          </span>
                        )}
                      </td>

                      {/* Fecha y Hora */}
                      <td className="py-3.5 px-4 text-xs text-slate-600 font-medium whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <Clock size={12} className="text-slate-400" />
                          <span>{formatDate(item.timestamp)}</span>
                        </div>
                      </td>

                      {/* IP Anonimizada */}
                      <td className="py-3.5 px-4 font-mono text-xs text-slate-500 whitespace-nowrap">
                        {item.anonymizedIp}
                      </td>

                      {/* Versión */}
                      <td className="py-3.5 px-4 sm:px-6 text-xs text-slate-500 whitespace-nowrap font-medium">
                        <span className="bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                          {item.version}
                        </span>
                      </td>

                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

      </div>

    </div>
  );
}
