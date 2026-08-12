"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calculator, Search, Activity, ChevronLeft, ChevronRight,
  Info, Calendar, Stethoscope, HeartPulse, RefreshCw, AlertCircle,
  Filter, ChevronDown, MapPin, Phone, MessageSquare, Building2, RotateCcw
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { ArancelesHero } from '@/components/ArancelesHero';

interface ArancelItem {
  id: number;
  source: 'dentalink' | 'medilink';
  category: string;
  name: string;
  priceBase: number | null;
  pricePref: number | null;
  hasDiscount: boolean;
  discountPercentage: number;
}

const ARANCELES_HERO_IMAGES = [
  { src: '/generated/heroDental.webp', alt: 'Aranceles Odontología y Especialidades Dentales', location: 'Centro Odontológico' },
  { src: '/generated/heroMedica.webp', alt: 'Aranceles Consultas Médicas y Especialidades', location: 'Atención Médica' },
  { src: '/generated/heroLaboratorio.webp', alt: 'Aranceles Exámenes de Laboratorio', location: 'Toma de Muestras' },
  { src: '/Sucursales/heroActual.webp', alt: 'Policlínico Tabancura', location: 'Atención General' },
];

export default function ArancelesPage() {
  const [aranceles, setAranceles] = useState<ArancelItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filtros y Paginación
  const [activeTab, setActiveTab] = useState<'todos' | 'dental' | 'medico'>('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState<number | 'all'>(12);

  // Cargar datos desde la API
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const res = await fetch('/api/aranceles');
        if (!res.ok) throw new Error('Error al consultar los precios');
        const data = await res.json();
        setAranceles(data);
      } catch (err: any) {
        console.error('Failed to load aranceles:', err);
        setError(err.message || 'Ocurrió un error al cargar la información');
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Filtrado de aranceles según la pestaña activa
  const tabAranceles = useMemo(() => {
    if (activeTab === 'todos') return aranceles;
    const sourceKey = activeTab === 'dental' ? 'dentalink' : 'medilink';
    return aranceles.filter(item => item.source === sourceKey);
  }, [aranceles, activeTab]);

  // Obtener categorías agrupadas por tipo
  const dentalCategories = useMemo(() => {
    const cats = aranceles
      .filter(item => item.source === 'dentalink')
      .map(item => item.category)
      .filter(Boolean);
    return Array.from(new Set(cats)).sort();
  }, [aranceles]);

  const medicalCategories = useMemo(() => {
    const cats = aranceles
      .filter(item => item.source === 'medilink')
      .map(item => item.category)
      .filter(Boolean);
    return Array.from(new Set(cats)).sort();
  }, [aranceles]);

  const handleClearFilters = () => {
    setActiveTab('todos');
    setSearchQuery('');
    setSelectedCategory(null);
    setCurrentPage(1);
  };

  // Reiniciar filtros de categoría y buscador cuando cambiamos de pestaña
  const handleTabChange = (tab: 'todos' | 'dental' | 'medico') => {
    setActiveTab(tab);
    setSearchQuery('');
    setSelectedCategory(null);
    setCurrentPage(1);
  };

  // Filtrar los datos resultantes por buscador y por píldora de categoría
  const filteredAranceles = useMemo(() => {
    const rawQuery = searchQuery.trim();
    if (!rawQuery) {
      return selectedCategory 
        ? tabAranceles.filter(item => item.category === selectedCategory)
        : tabAranceles;
    }

    // Normalizar texto quitando tildes para búsqueda flexible e insensibles a mayúsculas
    const normalize = (str: string) => 
      str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

    const normalizedQuery = normalize(rawQuery);
    const queryWords = normalizedQuery.split(/\s+/).filter(Boolean);

    return tabAranceles.filter(item => {
      const itemText = normalize(`${item.name} ${item.category} ${item.source === 'dentalink' ? 'dental odontologia' : 'medica'}`);
      
      const matchesSearch = queryWords.every(word => {
        if (word === 'dental' && item.source === 'dentalink') return true;
        if (word === 'medica' || word === 'medico') return item.source === 'medilink' || itemText.includes('medic');
        if (word.startsWith('kinesio')) return itemText.includes('kinesio');
        if (word.startsWith('psico')) return itemText.includes('psico');
        if (word.startsWith('radio') || word.startsWith('rad')) return itemText.includes('rad') || itemText.includes('tele');
        return itemText.includes(word);
      });

      const matchesCategory = selectedCategory ? item.category === selectedCategory : true;
      return matchesSearch && matchesCategory;
    });
  }, [tabAranceles, searchQuery, selectedCategory]);

  // Resetear paginación al buscar o cambiar categoría
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory]);

  // Verificar si el usuario ha realizado alguna acción de búsqueda o filtro
  const hasUserInteracted = useMemo(() => {
    return Boolean(searchQuery.trim() || selectedCategory !== null || activeTab !== 'todos');
  }, [searchQuery, selectedCategory, activeTab]);

  // Datos paginados
  const paginatedAranceles = useMemo(() => {
    if (itemsPerPage === 'all') return filteredAranceles;
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAranceles.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAranceles, currentPage, itemsPerPage]);

  const totalPages = useMemo(() => {
    if (itemsPerPage === 'all') return 1;
    return Math.ceil(filteredAranceles.length / itemsPerPage);
  }, [filteredAranceles, itemsPerPage]);

  const formatPrice = (val: number | null) => {
    if (val === null || val === undefined || val === 0) return 'No aplica';
    return `$${val.toLocaleString('es-CL')}`;
  };

  return (
    <main className="min-h-screen bg-clinical-bg dark:bg-slate-950 transition-colors duration-500 overflow-x-hidden">

      {/* HIGH-IMPACT ARANCELES HERO (Matching User Reference Image) */}
      <ArancelesHero
        activeTab={activeTab}
        onTabChange={handleTabChange}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
        dentalCategories={dentalCategories}
        medicalCategories={medicalCategories}
        totalFilteredCount={filteredAranceles.length}
        loading={loading}
      />

      {/* DATA & RESULTS TABLE SECTION */}
      <section id="aranceles-tabla" className="container mx-auto px-6 py-10 relative z-20 scroll-mt-24">

        <div className="max-w-6xl mx-auto space-y-6">

          {/* Active Filter Indicators Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900/80 p-4.5 rounded-2xl border border-slate-200/80 dark:border-white/10 shadow-xl shadow-slate-900/10 backdrop-blur-md">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Resultados para:</span>
              <span className="text-xs font-black uppercase tracking-wider text-[#259CF4] bg-blue-50 dark:bg-slate-800 px-2.5 py-1 rounded-lg border border-blue-100 dark:border-slate-700">
                {activeTab === 'todos' ? 'Todas las Especialidades' : activeTab === 'dental' ? 'Odontología' : 'Especialidades Médicas'}
              </span>

              {selectedCategory && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#259CF4] text-white text-xs font-bold uppercase tracking-wider shadow-sm">
                  <span>Categoría: {selectedCategory}</span>
                  <button onClick={() => setSelectedCategory(null)} className="hover:text-red-200 font-black cursor-pointer">✕</button>
                </span>
              )}

              {searchQuery && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#259CF4] text-white text-xs font-bold">
                  <span>"{searchQuery}"</span>
                  <button onClick={() => setSearchQuery('')} className="hover:text-red-200 font-black cursor-pointer">✕</button>
                </span>
              )}
            </div>

            <div className="flex items-center gap-3 shrink-0">
              {hasUserInteracted && (
                <button
                  type="button"
                  onClick={handleClearFilters}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-red-500/10 text-slate-600 hover:text-red-600 dark:text-slate-300 dark:hover:text-red-400 text-xs font-bold transition-all cursor-pointer border border-slate-200/80 dark:border-white/10 active:scale-95 shadow-sm"
                >
                  <RotateCcw size={13} className="shrink-0" />
                  <span>Limpiar filtros</span>
                </button>
              )}

              <div className="text-right">
                <span className="text-xs font-semibold text-slate-400">Encontrados: </span>
                <span className="text-sm font-black text-[#259CF4]">
                  {!hasUserInteracted ? 'En espera de búsqueda' : loading ? '...' : `${filteredAranceles.length} procedimientos`}
                </span>
              </div>
            </div>
          </div>

          {/* 4. MAIN DATA TABLE */}
          <div className="bg-white dark:bg-slate-900/30 border border-slate-100 dark:border-white/5 rounded-[2.5rem] shadow-xl shadow-slate-100/50 dark:shadow-none overflow-hidden backdrop-blur-md">

            <AnimatePresence mode="wait">
              {!hasUserInteracted ? (
                // INITIAL WAITING STATE (UNTIL USER SEARCHES OR FILTERS)
                <motion.div
                  key="prompt"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="py-24 px-6 text-center flex flex-col items-center justify-center gap-4 text-slate-400"
                >
                  <div className="w-20 h-20 rounded-3xl bg-blue-500/10 dark:bg-blue-500/20 flex items-center justify-center text-[#259CF4] border border-[#259CF4]/20 shadow-lg shadow-[#259CF4]/5">
                    <Search size={36} strokeWidth={2.5} />
                  </div>
                  <div className="max-w-md space-y-2">
                    <h3 className="text-xl font-black text-slate-800 dark:text-slate-100">
                      Escribe o selecciona una prestación
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                      Utiliza el buscador superior o selecciona una categoría específica para consultar los valores generales y preferenciales en tiempo real.
                    </p>
                  </div>
                </motion.div>
              ) : loading ? (
                // LOADING STATE
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-32 flex flex-col items-center justify-center gap-4 text-slate-400"
                >
                  <RefreshCw className="w-10 h-10 animate-spin text-secondary" />
                  <p className="text-sm font-semibold tracking-wider uppercase">Consultando base de datos...</p>
                </motion.div>
              ) : error ? (
                // ERROR STATE
                <motion.div
                  key="error"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-24 text-center flex flex-col items-center gap-4 max-w-md mx-auto text-red-500"
                >
                  <AlertCircle className="w-16 h-16 text-red-500" />
                  <p className="font-bold text-lg">Error de Conexión</p>
                  <p className="text-sm text-slate-400 leading-relaxed">{error}</p>
                </motion.div>
              ) : filteredAranceles.length === 0 ? (
                // EMPTY STATE
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-28 text-center flex flex-col items-center gap-4 text-slate-400"
                >
                  <div className="w-16 h-16 rounded-3xl bg-slate-50 dark:bg-slate-950 flex items-center justify-center border border-slate-100 dark:border-slate-800">
                    <Search size={28} />
                  </div>
                  <div>
                    <p className="font-bold text-slate-600 dark:text-slate-300">No encontramos resultados</p>
                    <p className="text-xs text-slate-400 mt-1">Prueba reescribiendo la prestación o seleccionando otra categoría.</p>
                  </div>
                </motion.div>
              ) : (
                // TABLE RENDER
                <motion.div
                  key="table"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="overflow-x-auto"
                >
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-50 dark:border-white/5 bg-slate-50/50 dark:bg-slate-900/30 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
                        <th className="py-5 px-8">Procedimiento / Examen</th>
                        <th className="py-5 px-6 hidden sm:table-cell">Categoría</th>
                        <th className="py-5 px-6 text-right">Arancel General</th>
                        <th className="py-5 px-8 text-right">Preferencial</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 dark:divide-white/5">
                      {paginatedAranceles.map((item, idx) => (
                        <tr
                          key={item.id}
                          className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors duration-200 group text-slate-800 dark:text-slate-200"
                        >
                          {/* Procedimiento */}
                          <td className="py-5 px-8">
                            <span className="font-bold text-xs sm:text-[13.5px] group-hover:text-primary dark:group-hover:text-secondary transition-colors block leading-tight">
                              {item.name}
                            </span>
                            <div className="flex items-center gap-1.5 mt-1.5 sm:hidden flex-wrap">
                              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                                {item.category}
                              </span>
                              {activeTab === 'todos' && (
                                <span className={`text-[7px] font-black uppercase tracking-wider px-1 rounded ${item.source === 'dentalink'
                                    ? 'bg-cyan-500/10 text-cyan-500 border border-cyan-500/10'
                                    : 'bg-indigo-500/10 text-indigo-500 border border-indigo-500/10'
                                  }`}>
                                  {item.source === 'dentalink' ? 'Odontología' : 'Médica'}
                                </span>
                              )}
                            </div>
                          </td>
                          {/* Categoría */}
                          <td className="py-5 px-6 hidden sm:table-cell">
                            <div className="flex flex-col gap-1 items-start">
                              <span className="text-[11px] font-extrabold uppercase tracking-widest text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900 px-2.5 py-1 rounded-md border border-slate-100 dark:border-slate-800">
                                {item.category}
                              </span>
                              {activeTab === 'todos' && (
                                <span className={`text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded ${item.source === 'dentalink'
                                    ? 'bg-cyan-500/10 text-cyan-500 border border-cyan-500/20'
                                    : 'bg-indigo-500/10 text-indigo-500 border border-indigo-500/20'
                                  }`}>
                                  {item.source === 'dentalink' ? 'Odontología' : 'Esp. Médica'}
                                </span>
                              )}
                            </div>
                          </td>
                          {/* Arancel General */}
                          <td className="py-5 px-6 text-right font-medium text-xs sm:text-[13px] tabular-nums text-slate-500 dark:text-slate-400">
                            {formatPrice(item.priceBase)}
                          </td>
                          {/* Arancel Preferencial */}
                          <td className="py-5 px-8 text-right">
                            <div className="flex items-center justify-end flex-wrap gap-1.5">
                              <span className={`text-xs sm:text-[13.5px] font-black tabular-nums ${item.hasDiscount
                                  ? 'text-emerald-500 dark:text-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.05)]'
                                  : 'text-slate-800 dark:text-slate-200'
                                }`}>
                                {formatPrice(item.pricePref)}
                              </span>
                              {item.hasDiscount && (
                                <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-emerald-500/10 dark:bg-emerald-400/10 text-emerald-600 dark:text-emerald-400 text-[8.5px] font-black uppercase tracking-wider ml-1 shadow-sm">
                                  -{item.discountPercentage}%
                                </span>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </motion.div>
              )}
            </AnimatePresence>

            {/* 5. TABLE PAGINATION FOOTER */}
            {hasUserInteracted && !loading && (filteredAranceles.length > 0 || itemsPerPage !== 12) && (
              <div className="p-6 border-t border-slate-50 dark:border-white/5 bg-slate-50/20 dark:bg-slate-900/10 flex flex-col md:flex-row justify-between items-center gap-4">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
                  {itemsPerPage === 'all'
                    ? `Mostrando los ${filteredAranceles.length} registros`
                    : `Página ${currentPage} de ${totalPages} • Mostrando ${paginatedAranceles.length} de ${filteredAranceles.length}`}
                </span>

                <div className="flex flex-wrap items-center gap-6 justify-between md:justify-end w-full md:w-auto">
                  {/* Selector de cantidad de registros */}
                  <div className="flex items-center gap-2.5">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Mostrar:</span>
                    <div className="inline-flex bg-slate-50 dark:bg-slate-950 p-1 rounded-xl border border-slate-100 dark:border-slate-800/80 shadow-inner">
                      {([12, 20, 50, 100, 'all'] as const).map((size) => (
                        <button
                          key={size}
                          onClick={() => {
                            setItemsPerPage(size);
                            setCurrentPage(1);
                          }}
                          className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider transition-all cursor-pointer ${itemsPerPage === size
                              ? 'bg-[#259CF4] text-white shadow-sm font-black'
                              : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                            }`}
                        >
                          {size === 'all' ? 'Todos' : size}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Navegación por número de página interactivo */}
                  {itemsPerPage !== 'all' && totalPages > 1 && (
                    <div className="flex items-center gap-1.5 shrink-0 flex-wrap justify-end">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                        className="border-slate-200 dark:border-slate-800 h-9 px-2.5 text-xs font-bold uppercase tracking-wider flex items-center gap-1 active:scale-95 cursor-pointer dark:hover:bg-slate-800"
                      >
                        <ChevronLeft size={14} /> <span className="hidden sm:inline">Anterior</span>
                      </Button>

                      {/* Números de páginas con elipses inteligentes */}
                      {(() => {
                        const pages: (number | string)[] = [];
                        const maxVisible = 5;

                        if (totalPages <= maxVisible + 2) {
                          for (let i = 1; i <= totalPages; i++) pages.push(i);
                        } else {
                          pages.push(1);
                          let start = Math.max(2, currentPage - 1);
                          let end = Math.min(totalPages - 1, currentPage + 1);

                          if (currentPage <= 3) {
                            end = 4;
                          } else if (currentPage >= totalPages - 2) {
                            start = totalPages - 3;
                          }

                          if (start > 2) pages.push('...');
                          for (let i = start; i <= end; i++) pages.push(i);
                          if (end < totalPages - 1) pages.push('...');
                          pages.push(totalPages);
                        }

                        return pages.map((p, idx) => {
                          if (p === '...') {
                            return (
                              <span key={`dots-${idx}`} className="px-1.5 text-xs text-slate-400 font-bold select-none">
                                ...
                              </span>
                            );
                          }
                          const pageNum = p as number;
                          const isActive = pageNum === currentPage;
                          return (
                            <button
                              key={pageNum}
                              onClick={() => setCurrentPage(pageNum)}
                              className={`h-9 min-w-9 px-2.5 rounded-full text-xs font-black transition-all cursor-pointer ${isActive
                                  ? 'bg-[#259CF4] text-white shadow-md shadow-blue-500/20 font-black'
                                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                                }`}
                            >
                              {pageNum}
                            </button>
                          );
                        });
                      })()}

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                        disabled={currentPage === totalPages}
                        className="border-slate-200 dark:border-slate-800 h-9 px-2.5 text-xs font-bold uppercase tracking-wider flex items-center gap-1 active:scale-95 cursor-pointer dark:hover:bg-slate-800"
                      >
                        <span className="hidden sm:inline">Siguiente</span> <ChevronRight size={14} />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* 6. SUCURSALES DIRECT CONTACT BANNER */}
          <div className="bg-gradient-to-r from-primary to-[#1e3a8a] rounded-[2.5rem] p-8 md:p-10 text-white relative overflow-hidden shadow-xl shadow-primary/10">
            <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
              <div className="absolute top-0 right-0 w-80 h-80 bg-white rounded-full blur-3xl"></div>
            </div>

            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 relative z-10">

              {/* Left Column: Heading & Description */}
              <div className="space-y-3 max-w-md">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-[10px] font-black uppercase tracking-widest border border-white/15 backdrop-blur-sm">
                  <Building2 size={12} className="text-[#259CF4]" />
                  Atención Directa
                </div>
                <h3 className="text-2xl md:text-3xl font-black tracking-tight">¿Tienes dudas con una prestación?</h3>
                <p className="text-xs md:text-sm text-white/80 font-medium leading-relaxed">
                  Si no encuentras el procedimiento específico en nuestro arancel en línea, puedes comunicarte directamente con nuestras secretarías por sucursal:
                </p>
              </div>

              {/* Right Column: Cards for Both Sucursales */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full lg:w-auto shrink-0">

                {/* Sucursal 1: Casa Matriz (Los Tribunales) */}
                <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4.5 space-y-3 hover:bg-white/15 transition-all">
                  <div className="flex items-center gap-2 text-[#259CF4]">
                    <MapPin size={16} />
                    <span className="text-xs font-black uppercase tracking-wider text-white">Sucursal Casa Matriz</span>
                  </div>
                  <p className="text-[11px] text-white/70 font-medium leading-tight">Los Tribunales #1268, Vitacura</p>

                  <div className="pt-2 space-y-2 border-t border-white/10 text-xs">
                    <a
                      href="tel:+56222172635"
                      className="flex items-center gap-2 text-white/90 hover:text-white font-bold transition-colors"
                    >
                      <Phone size={13} className="text-[#259CF4] shrink-0" />
                      <span>+562 2217 2635</span>
                    </a>
                    <a
                      href="https://wa.me/56966187736"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-bold transition-colors"
                    >
                      <MessageSquare size={13} className="shrink-0" />
                      <span>+569 6618 7736 (WhatsApp)</span>
                    </a>
                  </div>
                </div>

                {/* Sucursal 2: Sucursal Vitacura */}
                <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4.5 space-y-3 hover:bg-white/15 transition-all">
                  <div className="flex items-center gap-2 text-[#259CF4]">
                    <MapPin size={16} />
                    <span className="text-xs font-black uppercase tracking-wider text-white">Sucursal Vitacura</span>
                  </div>
                  <p className="text-[11px] text-white/70 font-medium leading-tight">Av. Vitacura #8620, Vitacura</p>

                  <div className="pt-2 space-y-2 border-t border-white/10 text-xs">
                    <a
                      href="tel:+56229336740"
                      className="flex items-center gap-2 text-white/90 hover:text-white font-bold transition-colors"
                    >
                      <Phone size={13} className="text-[#259CF4] shrink-0" />
                      <span>+562 2933 6740</span>
                    </a>
                    <a
                      href="https://wa.me/56965781253"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-bold transition-colors"
                    >
                      <MessageSquare size={13} className="shrink-0" />
                      <span>+569 6578 1253 (WhatsApp)</span>
                    </a>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </section>

    </main>
  );
}
