"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, X, Calendar, User, ArrowRight, Activity, Command, HeartPulse, Brain, 
  Stethoscope, Zap, Sparkles, Calculator, Laptop, ShieldCheck, Home, Phone, 
  Microscope, Info, GraduationCap, MapPin, CalendarDays, ChevronLeft 
} from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { type Professional } from '@/data/professionals';

interface SearchResult {
  id: string;
  title: string;
  category: string;
  type: "pagina" | "servicio" | "profesional";
  link: string;
  icon?: React.ReactNode;
  rawPro?: Professional; // Atar el objeto real del profesional
}

const STATIC_RESULTS: SearchResult[] = [
  // NAVEGACIÓN PRINCIPAL
  { id: "home", title: "Inicio", category: "Navegación", type: "pagina", link: "/", icon: <Home size={20} /> },
  { id: "contact", title: "Contacto y Ubicación", category: "Navegación", type: "pagina", link: "/#contacto", icon: <Phone size={20} /> },
  
  // ESPECIALIDADES
  { id: "p1", title: "Salud Dental", category: "Especialidades", type: "pagina", link: "/servicios/dental", icon: <HeartPulse size={20} /> },
  { id: "p2", title: "Salud Mental", category: "Especialidades", type: "pagina", link: "/servicios/mental", icon: <Brain size={20} /> },
  { id: "p3", title: "Medicina General", category: "Especialidades", type: "pagina", link: "/servicios/medicina", icon: <Stethoscope size={20} /> },
  
  // BENEFICIOS Y CONVENIOS
  { id: "c1", title: "Convenios y Beneficios", category: "Convenios", type: "pagina", link: "/convenios", icon: <ShieldCheck size={20} /> },
  { id: "c2", title: "PAD Dental (Bono Fonasa)", category: "Convenios", type: "pagina", link: "/bonopad", icon: <Sparkles size={20} /> },
  { id: "c3", title: "Validador Mi Vita", category: "Beneficios", type: "servicio", link: "/#mivita", icon: <Sparkles size={20} /> },
  
  // HERRAMIENTAS Y PACIENTES
  // { id: "t2", title: "Cotizador de Exámenes", category: "Herramientas", type: "pagina", link: "/cotizador-examenes", icon: <Calculator size={20} /> },
  { id: "t3", title: "Intranet Pacientes", category: "Mi Cuenta", type: "servicio", link: "#", icon: <Laptop size={20} /> },
  
  // INSTITUCIONAL
  { id: "p5", title: "Quiénes Somos", category: "Institucional", type: "pagina", link: "/nosotros", icon: <Activity size={20} /> },
  { id: "p6", title: "Derechos y Deberes", category: "Institucional", type: "pagina", link: "/derechos-y-deberes", icon: <Info size={20} /> },
];

export function SearchModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [selectedPro, setSelectedPro] = useState<Professional | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // 1. Cargar profesionales al montar para búsqueda dinámica
  useEffect(() => {
    const loadProfessionals = async () => {
      try {
        const response = await fetch('/api/professionals');
        if (response.ok) {
          const data = await response.json();
          setProfessionals(data);
        }
      } catch (error) {
        console.error('Failed to load professionals for search:', error);
      }
    };
    loadProfessionals();
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = "hidden";
      setSelectedIndex(0);
      setSelectedPro(null);
    } else {
      document.body.style.overflow = "unset";
      setQuery("");
      setSelectedPro(null);
    }
  }, [isOpen]);

  // Mapear profesionales al formato de búsqueda
  const dynamicResults: SearchResult[] = professionals.map(p => ({
    id: `pro-${p.id}`,
    title: p.name,
    category: p.specialty,
    type: "profesional" as const,
    link: "#", // No redireccionamos, abrimos vista local
    icon: <User size={20} />,
    rawPro: p
  }));

  const combinedDatabase = [...STATIC_RESULTS, ...dynamicResults];

  const filteredResults = query.length > 1 
    ? combinedDatabase.filter(r => 
        r.title.toLowerCase().includes(query.toLowerCase()) || 
        r.category.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 8)
    : [];

  // Reset selection when query or context changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleSelection = (result: SearchResult) => {
    if (result.type === "profesional" && result.rawPro) {
      setSelectedPro(result.rawPro);
    } else {
      onClose();
      window.location.href = result.link;
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.altKey && e.key === "k") {
        e.preventDefault();
        onClose();
      }
      
      if (e.key === "Escape") {
        if (selectedPro) {
          setSelectedPro(null); // Primero cerramos la vista detalle si existe
          setTimeout(() => inputRef.current?.focus(), 50);
        } else {
          onClose();
        }
      }

      if (selectedPro) return; // Desactivar navegación por flechas si estamos en modo Detalle

      // Keyboard Navigation en la lista
      if (filteredResults.length > 0) {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          setSelectedIndex(prev => (prev + 1) % filteredResults.length);
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          setSelectedIndex(prev => (prev - 1 + filteredResults.length) % filteredResults.length);
        } else if (e.key === "Enter") {
          e.preventDefault();
          const selected = filteredResults[selectedIndex];
          if (selected) {
            handleSelection(selected);
          }
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, filteredResults, selectedIndex, selectedPro]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-primary/20 backdrop-blur-md z-[60]"
          />

          <div className="fixed inset-0 z-[70] flex items-start justify-center pt-[8vh] pb-[4vh] px-4 pointer-events-none overflow-y-auto scrollbar-hide">
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="w-full max-w-2xl bg-white dark:bg-slate-950 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-[0_40px_100px_rgba(0,0,0,0.1)] dark:shadow-none overflow-hidden pointer-events-auto relative"
            >
              
              <AnimatePresence mode="wait">
                {selectedPro ? (
                  // MODO 2: DETALLE DEL PROFESIONAL (Copied verbatim design from ProfessionalFilter)
                  <motion.div 
                    key="detail"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="w-full flex flex-col max-h-[85vh]"
                  >
                    {/* Sticky Header - SUPER COMPACT */}
                    <div className="bg-primary px-6 py-6 text-white relative shrink-0">
                      <button 
                        onClick={() => setSelectedPro(null)}
                        className="absolute top-4 left-4 p-2 bg-white/10 text-white rounded-full hover:bg-white/20 transition-all flex items-center gap-1.5 text-[10px] font-bold pr-3"
                      >
                        <ChevronLeft size={14} /> Volver
                      </button>
                      <button 
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all"
                      >
                        <X className="w-5 h-5" />
                      </button>

                      <div className="relative w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mb-4 overflow-hidden mx-auto border-2 border-white/20 mt-6">
                        {selectedPro.image ? (
                          <Image 
                            src={selectedPro.image} 
                            alt={selectedPro.name} 
                            fill
                            className="object-cover"
                            sizes="80px"
                          />
                        ) : (
                          <User size={40} className="text-secondary" />
                        )}
                      </div>
                      
                      <div className="text-center px-2">
                        <h3 className="text-xl sm:text-2xl font-bold tracking-tight leading-[1.2] mb-3 text-center w-full">{selectedPro.name}</h3>
                        <div className="flex gap-1.5 justify-center flex-wrap">
                          <Badge className="bg-secondary text-primary font-bold text-[10px] py-0.5">{selectedPro.specialty}</Badge>
                          <Badge variant="outline" className="text-white border-white/20 text-[10px] py-0.5">{selectedPro.area}</Badge>
                        </div>
                      </div>
                    </div>

                    {/* Scrollable Body Content */}
                    <div className="bg-white dark:bg-slate-950 p-6 space-y-4 overflow-y-auto custom-scrollbar flex-1">
                      {selectedPro.ageGroup && (
                        <div className="flex flex-wrap justify-center gap-1.5 mb-2">
                          {selectedPro.ageGroup.split(',').map(s => s.replace(/\./g, '').trim()).filter(Boolean).map((age, i) => (
                            <span key={i} className="text-[8px] font-black tracking-widest uppercase bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-300 px-2 py-1 rounded-md border border-slate-200/50 dark:border-white/5">
                              {age}
                            </span>
                          ))}
                        </div>
                      )}

                      {selectedPro.description && (
                        <div className="space-y-1.5">
                          <h3 className="text-[9px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                            <Info size={12} className="text-secondary" /> Perfil
                          </h3>
                          <p className="text-slate-600 dark:text-slate-300 font-medium leading-relaxed text-xs sm:text-sm">{selectedPro.description}</p>
                        </div>
                      )}
                      {selectedPro.education && (
                        <div className="space-y-1.5">
                          <h3 className="text-[9px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                            <GraduationCap size={12} className="text-secondary" /> Formación Académica
                          </h3>
                          <p className="text-slate-600 dark:text-slate-300 font-medium leading-relaxed text-xs sm:text-sm">{selectedPro.education}</p>
                        </div>
                      )}
                      {selectedPro.sucursal && (
                        <div className="space-y-1.5">
                          <h3 className="text-[9px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                            <MapPin size={12} className="text-secondary" /> Ubicación
                          </h3>
                          <p className="text-slate-600 dark:text-slate-300 font-medium leading-relaxed text-xs sm:text-sm">{selectedPro.sucursal}</p>
                        </div>
                      )}
                    </div>

                    {/* Sticky Action Footer ALWAYS VISIBLE */}
                    <div className="bg-white dark:bg-slate-950 p-5 border-t border-slate-100 dark:border-slate-800 shrink-0">
                      <button 
                        onClick={() => {
                          onClose();
                          window.location.href = "https://ff.healthatom.io/9p2Sq9";
                        }}
                        className="relative inline-flex w-full cursor-pointer select-none group"
                      >
                        <div className="bg-gradient-to-r from-primary to-[#1e3a8a] text-white w-full px-6 h-14 flex items-center justify-center rounded-full text-sm sm:text-base font-black tracking-tight shadow-lg shadow-primary/20 dark:shadow-primary/20 transition-all duration-500 transform group-hover:-translate-y-0.5 group-active:scale-95 relative z-10 whitespace-nowrap">
                          Agendar Hora Ahora
                        </div>
                        
                        <div className="absolute top-0 -right-1 sm:-right-2 w-10 h-10 bg-secondary rounded-full flex items-center justify-center text-primary shadow-md transition-all duration-500 transform group-hover:-translate-y-0.5 group-hover:rotate-[-12deg] group-hover:scale-105 group-active:scale-95 z-20 border-4 border-white dark:border-slate-950">
                          <CalendarDays className="w-3.5 h-3.5" strokeWidth={3} />
                        </div>
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  // MODO 1: BÚSQUEDA GENERAL
                  <motion.div
                    key="search"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="p-6 border-b border-slate-50 dark:border-slate-800 flex items-center gap-4 bg-slate-50/50 dark:bg-slate-900/50">
                      <Search size={22} className="text-slate-400" />
                      <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Escribe el nombre de un profesional o servicio..."
                        className="flex-1 bg-transparent border-none outline-none text-lg font-medium text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-600"
                      />
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl shadow-sm text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest hidden sm:flex">
                        <span className="text-[9px]">ALT</span> K
                      </div>
                      <button onClick={onClose} className="p-2 hover:bg-white dark:hover:bg-slate-800 rounded-xl transition-colors text-slate-400">
                        <X size={20} />
                      </button>
                    </div>

                    <div className="max-h-[60vh] overflow-y-auto p-4 custom-scrollbar">
                      {query.length === 0 ? (
                        <div className="py-12 text-center flex flex-col items-center gap-4">
                          <div className="w-16 h-16 rounded-3xl bg-slate-50 dark:bg-slate-900 flex items-center justify-center text-slate-300 dark:text-slate-600">
                            <Search size={32} />
                          </div>
                          <div>
                            <p className="text-slate-500 dark:text-slate-300 font-bold">Búsqueda Inteligente</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Escribe nombres de doctores, especialidades o servicios.</p>
                          </div>
                        </div>
                      ) : query.length > 0 && filteredResults.length === 0 ? (
                        <div className="py-12 text-center text-slate-400">
                          <p className="font-medium">No encontramos resultados para "{query}"</p>
                          <p className="text-xs mt-2">Prueba con el apellido, "Kinesiología" o un área.</p>
                        </div>
                      ) : (
                        <div className="grid gap-2">
                          {filteredResults.map((result, idx) => (
                            <button
                              key={result.id}
                              onMouseEnter={() => setSelectedIndex(idx)}
                              onClick={() => handleSelection(result)}
                              className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all group text-left border ${
                                idx === selectedIndex 
                                  ? "bg-slate-50 dark:bg-slate-900 border-secondary/30 shadow-md translate-x-1" 
                                  : "bg-transparent border-transparent hover:bg-slate-50/50 dark:hover:bg-slate-900/50"
                              }`}
                            >
                              <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-all shadow-sm overflow-hidden relative ${
                                  idx === selectedIndex ? "bg-secondary/10 border-secondary/20 text-secondary scale-110" : "bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700 text-primary dark:text-slate-100"
                                }`}>
                                  {result.type === "profesional" && result.rawPro?.image ? (
                                    <Image src={result.rawPro.image} alt={result.title} fill className="object-cover" sizes="48px" />
                                  ) : (
                                    result.icon || <Activity size={20} />
                                  )}
                                </div>
                                <div>
                                  <p className={`text-sm font-bold transition-colors ${idx === selectedIndex ? "text-primary dark:text-secondary" : "text-slate-800 dark:text-slate-100"}`}>{result.title}</p>
                                  <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">{result.category}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <span className={`text-[9px] font-black text-secondary uppercase tracking-widest transition-opacity ${idx === selectedIndex ? "opacity-100" : "opacity-0"}`}>
                                  {result.type === "profesional" ? "Ver Ficha" : "Ir a la página"}
                                </span>
                                <ArrowRight size={16} className={`transition-all ${
                                  idx === selectedIndex ? "text-primary translate-x-0 opacity-100" : "text-slate-300 translate-x-[-10px] opacity-0"
                                }`} />
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="p-4 bg-slate-50/50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center px-8">
                      <div className="flex gap-4">
                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase">
                          <span className="px-1.5 py-0.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-[9px] dark:text-slate-400">ENTER</span> Seleccionar
                        </div>
                      </div>
                      <div className="text-[10px] font-black text-secondary uppercase tracking-[0.2em]">{professionals.length > 0 ? `${professionals.length} Profesionales Activos` : "Buscador Global"}</div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
