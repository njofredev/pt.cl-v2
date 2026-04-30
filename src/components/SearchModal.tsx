"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Calendar, User, ArrowRight, Activity, Command, HeartPulse, Brain, Stethoscope, Zap, Sparkles, Calculator, Laptop, ShieldCheck } from "lucide-react";

interface SearchResult {
  id: string;
  title: string;
  category: string;
  type: "pagina" | "servicio" | "profesional";
  link: string;
  icon?: React.ReactNode;
}

const SEARCH_RESULTS: SearchResult[] = [
  // PÁGINAS PRINCIPALES
  { id: "p1", title: "Salud Dental", category: "Especialidades", type: "pagina", link: "/servicios/dental", icon: <HeartPulse size={20} /> },
  { id: "p2", title: "Salud Mental", category: "Especialidades", type: "pagina", link: "/servicios/mental", icon: <Brain size={20} /> },
  { id: "p3", title: "Medicina General", category: "Especialidades", type: "pagina", link: "/servicios/medicina", icon: <Stethoscope size={20} /> },
  { id: "p4", title: "Terapias Alternativas", category: "Especialidades", type: "pagina", link: "/servicios/terapias", icon: <Zap size={20} /> },
  { id: "p5", title: "Quiénes Somos", category: "Institucional", type: "pagina", link: "/nosotros", icon: <Activity size={20} /> },
  { id: "p6", title: "Misión y Visión", category: "Institucional", type: "pagina", link: "/mision", icon: <ShieldCheck size={20} /> },
  
  // TECNOLOGÍAS / HERRAMIENTAS
  { id: "t1", title: "Validador Mi Vita", category: "Beneficios", type: "servicio", link: "#mivita", icon: <Sparkles size={20} /> },
  { id: "t2", title: "Cotizador Digital", category: "Herramientas", type: "servicio", link: "#", icon: <Calculator size={20} /> },
  { id: "t3", title: "Intranet Pacientes", category: "Mi Cuenta", type: "servicio", link: "#", icon: <Laptop size={20} /> },
  
  // PROFESIONALES
  { id: "dr1", title: "Nuestro Equipo Médico", category: "Profesionales", type: "profesional", link: "#buscador-profesionales", icon: <User size={20} /> },
];

export function SearchModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      setQuery("");
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        onClose();
      }
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const filteredResults = query.length > 1 
    ? SEARCH_RESULTS.filter(r => 
        r.title.toLowerCase().includes(query.toLowerCase()) || 
        r.category.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 8)
    : [];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-primary/20 backdrop-blur-sm z-[60]"
          />

          <div className="fixed inset-0 z-[70] flex items-start justify-center pt-[10vh] px-6 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="w-full max-w-2xl bg-white rounded-[2.5rem] border border-slate-100 shadow-[0_40px_100px_rgba(0,0,0,0.1)] overflow-hidden pointer-events-auto"
            >
              <div className="p-6 border-b border-slate-50 flex items-center gap-4 bg-slate-50/50">
                <Search size={22} className="text-slate-400" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Busca páginas, servicios o especialistas..."
                  className="flex-1 bg-transparent border-none outline-none text-lg font-medium text-slate-800 placeholder:text-slate-400"
                />
                <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-100 rounded-xl shadow-sm text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  <Command size={10} /> K
                </div>
                <button onClick={onClose} className="p-2 hover:bg-white rounded-xl transition-colors text-slate-400">
                  <X size={20} />
                </button>
              </div>

              <div className="max-h-[60vh] overflow-y-auto p-4">
                {query.length === 0 ? (
                  <div className="py-12 text-center flex flex-col items-center gap-4">
                    <div className="w-16 h-16 rounded-3xl bg-slate-50 flex items-center justify-center text-slate-300">
                      <Search size={32} />
                    </div>
                    <div>
                      <p className="text-slate-500 font-bold">Explora Policlínico Tabancura</p>
                      <p className="text-xs text-slate-400 mt-1">Navega rápidamente por todas las secciones del sitio</p>
                    </div>
                  </div>
                ) : query.length > 0 && filteredResults.length === 0 ? (
                  <div className="py-12 text-center text-slate-400">
                    <p className="font-medium">No encontramos resultados para "{query}"</p>
                    <p className="text-xs mt-2">Prueba con "Dental", "Nosotros" o "Mi Vita".</p>
                  </div>
                ) : (
                  <div className="grid gap-2">
                    {filteredResults.map((result) => (
                      <button
                        key={result.id}
                        onClick={() => {
                          onClose();
                          window.location.href = result.link;
                        }}
                        className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all group text-left"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-primary group-hover:scale-110 transition-transform shadow-sm">
                            {result.icon || <Activity size={20} />}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-800">{result.title}</p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{result.category}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-[9px] font-black text-secondary uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Ir a la página</span>
                          <ArrowRight size={16} className="text-slate-300 group-hover:text-primary transition-colors translate-x-[-10px] group-hover:translate-x-0 opacity-0 group-hover:opacity-100 transition-all" />
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="p-4 bg-slate-50/50 border-top border-slate-100 flex justify-between items-center px-8">
                <div className="flex gap-4">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase">
                    <span className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-[9px]">ENTER</span> Navegar
                  </div>
                </div>
                <div className="text-[10px] font-black text-secondary uppercase tracking-[0.2em]">Policlínico Tabancura</div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
