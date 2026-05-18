"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calculator, Search, Activity, ChevronLeft, ChevronRight, 
  Info, Calendar, Stethoscope, HeartPulse, RefreshCw, AlertCircle
} from 'lucide-react';
import { Button } from "@/components/ui/button";

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

  // Reiniciar filtros de categoría y buscador cuando cambiamos de pestaña
  const handleTabChange = (tab: 'todos' | 'dental' | 'medico') => {
    setActiveTab(tab);
    setSearchQuery('');
    setSelectedCategory(null);
    setCurrentPage(1);
  };

  // Filtrar los datos resultantes por buscador y por píldora de categoría
  const filteredAranceles = useMemo(() => {
    return tabAranceles.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory ? item.category === selectedCategory : true;
      return matchesSearch && matchesCategory;
    });
  }, [tabAranceles, searchQuery, selectedCategory]);

  // Resetear paginación al buscar o cambiar categoría
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory]);

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
    <main className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-500 overflow-x-hidden">
      
      {/* HERO SECTION PREMIUM */}
      <section className="relative pt-56 pb-20 overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2"></div>
          <div className="absolute top-40 right-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[100px]"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary text-white text-[10px] font-black uppercase tracking-widest mb-8 shadow-md shadow-primary/10">
                <Calculator size={14} strokeWidth={2.5} className="text-secondary" />
                Listado Transparente
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.1] mb-8">
                Nuestros Aranceles <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-teal-400 to-secondary dark:from-white dark:via-secondary dark:to-teal-400">
                  y Precios Preferenciales.
                </span>
              </h1>
              
              <p className="text-xl text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed">
                Consulta los valores generales y preferenciales asociados a nuestras especialidades clínicas y odontológicas en tiempo real.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FILTER & DATA SECTION */}
      <section className="container mx-auto px-6 pb-24 relative z-10">
        
        {/* MAIN CONTROLLER WRAPPER */}
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* 1. TABS SYSTEM (Todos vs Odontología vs Especialidades) */}
          <div className="flex justify-center">
            <div className="inline-flex bg-slate-100/80 dark:bg-slate-900/60 p-1.5 rounded-full border border-slate-100 dark:border-white/5 backdrop-blur-md shadow-inner flex-wrap justify-center gap-1 sm:gap-0">
              <button
                onClick={() => handleTabChange('todos')}
                className={`flex items-center gap-2 px-5 sm:px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all cursor-pointer ${
                  activeTab === 'todos'
                    ? 'bg-gradient-to-r from-primary to-[#1e3a8a] text-white shadow-md'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Activity size={15} />
                Todos los Aranceles
              </button>
              <button
                onClick={() => handleTabChange('dental')}
                className={`flex items-center gap-2 px-5 sm:px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all cursor-pointer ${
                  activeTab === 'dental'
                    ? 'bg-gradient-to-r from-primary to-[#1e3a8a] text-white shadow-md'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <HeartPulse size={15} />
                Odontología (Dentalink)
              </button>
              <button
                onClick={() => handleTabChange('medico')}
                className={`flex items-center gap-2 px-5 sm:px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all cursor-pointer ${
                  activeTab === 'medico'
                    ? 'bg-gradient-to-r from-primary to-[#1e3a8a] text-white shadow-md'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Stethoscope size={15} />
                Especialidades (Medilink)
              </button>
            </div>
          </div>

          {/* 2. SEARCH & TOTALS BAR */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center bg-white dark:bg-slate-900/40 p-5 rounded-[2rem] border border-slate-100 dark:border-white/5 shadow-md shadow-slate-100/50 dark:shadow-none backdrop-blur-md">
            
            {/* Buscador */}
            <div className="md:col-span-2 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Escribe el nombre de la prestación o código..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50/50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-2xl pl-12 pr-6 py-3.5 text-sm font-medium outline-none text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:border-secondary/30 transition-all shadow-inner"
              />
            </div>

            {/* Contador dinámico */}
            <div className="text-center md:text-right px-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-0.5">Procedimientos</span>
              <span className="text-2xl font-black text-secondary">
                {loading ? '...' : filteredAranceles.length}
              </span>
              <span className="text-xs font-semibold text-slate-500 ml-1">filtrados</span>
            </div>
          </div>

          {/* 3. CATEGORIES CAROUSEL */}
          {!loading && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pl-2">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
                  Filtrar por Especialidad / Categoría:
                </span>
                {selectedCategory && (
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className="text-[10px] font-extrabold uppercase tracking-wider text-secondary hover:underline cursor-pointer"
                  >
                    Limpiar Filtro
                  </button>
                )}
              </div>

              {/* Botón Todas global */}
              <div className="pl-2">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    selectedCategory === null
                      ? 'bg-secondary text-primary shadow-sm hover:scale-[1.02] active:scale-95'
                      : 'bg-slate-50 border border-slate-100 hover:bg-slate-100 dark:bg-slate-900 dark:border-white/5 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  Todas las Especialidades
                </button>
              </div>

              {/* Si es 'todos' o 'dental', mostramos Odontología */}
              {(activeTab === 'todos' || activeTab === 'dental') && dentalCategories.length > 0 && (
                <div className="space-y-2 bg-slate-50/50 dark:bg-slate-900/10 p-4 rounded-3xl border border-slate-50 dark:border-white/5">
                  <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1.5 pl-1">
                    <HeartPulse size={12} className="text-secondary" />
                    Especialidades Odontología
                  </span>
                  <div className="flex gap-2 max-md:overflow-x-auto max-md:flex-nowrap scrollbar-hide md:flex-wrap py-1 px-0.5 select-none max-w-full">
                    {dentalCategories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                        className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider shrink-0 transition-all cursor-pointer ${
                          selectedCategory === cat
                            ? 'bg-secondary text-primary shadow-sm hover:scale-[1.02] active:scale-95'
                            : 'bg-white border border-slate-100 hover:bg-slate-50 dark:bg-slate-900 dark:border-white/5 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 shadow-sm'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Si es 'todos' o 'medico', mostramos Especialidades Médicas */}
              {(activeTab === 'todos' || activeTab === 'medico') && medicalCategories.length > 0 && (
                <div className="space-y-2 bg-slate-50/50 dark:bg-slate-900/10 p-4 rounded-3xl border border-slate-50 dark:border-white/5">
                  <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1.5 pl-1">
                    <Stethoscope size={12} className="text-secondary" />
                    Especialidades Médicas y Exámenes
                  </span>
                  <div className="flex gap-2 max-md:overflow-x-auto max-md:flex-nowrap scrollbar-hide md:flex-wrap py-1 px-0.5 select-none max-w-full">
                    {medicalCategories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                        className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider shrink-0 transition-all cursor-pointer ${
                          selectedCategory === cat
                            ? 'bg-secondary text-primary shadow-sm hover:scale-[1.02] active:scale-95'
                            : 'bg-white border border-slate-100 hover:bg-slate-50 dark:bg-slate-900 dark:border-white/5 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 shadow-sm'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 4. MAIN DATA TABLE */}
          <div className="bg-white dark:bg-slate-900/30 border border-slate-100 dark:border-white/5 rounded-[2.5rem] shadow-xl shadow-slate-100/50 dark:shadow-none overflow-hidden backdrop-blur-md">
            
            <AnimatePresence mode="wait">
              {loading ? (
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
                                <span className={`text-[7px] font-black uppercase tracking-wider px-1 rounded ${
                                  item.source === 'dentalink'
                                    ? 'bg-cyan-500/10 text-cyan-500 border border-cyan-500/10'
                                    : 'bg-purple-500/10 text-purple-500 border border-purple-500/10'
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
                                <span className={`text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded ${
                                  item.source === 'dentalink'
                                    ? 'bg-cyan-500/10 text-cyan-500 border border-cyan-500/20'
                                    : 'bg-purple-500/10 text-purple-500 border border-purple-500/20'
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
                              <span className={`text-xs sm:text-[13.5px] font-black tabular-nums ${
                                item.hasDiscount 
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
            {!loading && (filteredAranceles.length > 0 || itemsPerPage !== 12) && (
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
                          className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider transition-all cursor-pointer ${
                            itemsPerPage === size
                              ? 'bg-secondary text-primary shadow-sm font-black'
                              : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                          }`}
                        >
                          {size === 'all' ? 'Todos' : size}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Navegación */}
                  {itemsPerPage !== 'all' && totalPages > 1 && (
                    <div className="flex gap-2 shrink-0">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                        className="border-slate-100 dark:border-slate-800 h-9 px-3 text-xs font-bold uppercase tracking-wider flex items-center gap-1 active:scale-95 cursor-pointer dark:hover:bg-slate-800"
                      >
                        <ChevronLeft size={14} /> Anterior
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                        disabled={currentPage === totalPages}
                        className="border-slate-100 dark:border-slate-800 h-9 px-3 text-xs font-bold uppercase tracking-wider flex items-center gap-1 active:scale-95 cursor-pointer dark:hover:bg-slate-800"
                      >
                        Siguiente <ChevronRight size={14} />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* 6. CALL TO ACTION FOOTER */}
          <div className="bg-gradient-to-r from-primary to-[#1e3a8a] rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden shadow-xl shadow-primary/10">
            <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
              <div className="absolute top-0 right-0 w-80 h-80 bg-white rounded-full blur-3xl"></div>
            </div>
            
            <div className="flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
              <div className="space-y-3 text-center md:text-left max-w-xl">
                <h3 className="text-2xl md:text-3xl font-black tracking-tight">¿Tienes dudas con una prestación?</h3>
                <p className="text-sm md:text-base text-white/80 font-medium leading-relaxed">
                  Si no encuentras el procedimiento específico que estás buscando en nuestro arancel en línea, puedes comunicarte directamente con nuestras secretarías para cotizaciones detalladas.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto shrink-0">
                <Button 
                  onClick={() => window.location.href = "https://wa.me/56965781253"}
                  className="bg-white hover:bg-white/90 text-primary rounded-full px-8 h-14 font-extrabold uppercase text-xs tracking-wider shadow-md hover:scale-[1.02] active:scale-95 cursor-pointer transition-all border-0"
                >
                  Consultar WhatsApp
                </Button>
                <Button 
                  onClick={() => window.location.href = "https://ff.healthatom.io/9p2Sq9"}
                  className="bg-secondary hover:bg-secondary/90 text-primary rounded-full px-8 h-14 font-extrabold uppercase text-xs tracking-wider shadow-md hover:scale-[1.02] active:scale-95 cursor-pointer transition-all border-0"
                >
                  Reservar Hora Online
                </Button>
              </div>
            </div>
          </div>

        </div>
      </section>

    </main>
  );
}
