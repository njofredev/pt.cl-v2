"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  ChevronRight,
  ArrowLeft,
  Brain,
  Stethoscope,
  Activity,
  HeartPulse,
  Microscope,
  Smile,
  Info,
} from "lucide-react";

const SCHEDULE_DATA = [
  { 
    id: "saludDental", 
    title: "Salud Dental", 
    icon: <Smile size={28} />, 
    services: [
      { label: "Diagnóstico", info: "Evaluación inicial y presupuesto", link: "https://ff.healthatom.io/drrRF5" }, 
      { label: "Urgencia", info: "Atención inmediata por dolor", link: "https://ff.healthatom.io/ULnJPR" }, 
      { label: "Limpieza", info: "Profilaxis y eliminación de sarro", link: "https://ff.healthatom.io/tlmKaf" }, 
      { label: "Frenillos", info: "Ortodoncia adultos y niños", link: "https://ff.healthatom.io/FGrUIj" }, 
      { label: "Niños", info: "Odontopediatría especializada", link: "https://ff.healthatom.io/hzazOC" }, 
      { label: "Blanqueamiento", info: "Estética dental avanzada", link: "https://ff.healthatom.io/0RW6UD" }, 
      { label: "Especialidad", info: "Endodoncia, Implantes, Prótesis", link: "https://ff.healthatom.io/fesVZO" }, 
      { label: "TTM", info: "Dolor orofacial y bruxismo", link: "https://ff.healthatom.io/Ifb484" }
    ] 
  },
  { 
    id: "saludMental", 
    title: "Salud Mental", 
    icon: <Brain size={28} />, 
    services: [
      { 
        label: "Psicología", 
        info: "Atención individual y parejas",
        isMulti: true, 
        options: [
          { label: "Presencial", link: "https://ff.healthatom.io/wlP9EZ" }, 
          { label: "Teleconsulta", link: "https://ff.healthatom.io/7c4geA" }
        ] 
      }, 
      { label: "Psiquiatría", info: "Control médico especializado", link: "https://ff.healthatom.io/SeOkpO" }, 
      { label: "Fonoaudiología", info: "Lenguaje y deglución", link: "https://ff.healthatom.io/nTp5kE" }, 
      { label: "Psicopedagogía", info: "Dificultades de aprendizaje", link: "https://ff.healthatom.io/rIxNId" }
    ] 
  },
  { 
    id: "kinesiologia", 
    title: "Kinesiología", 
    icon: <Activity size={28} />, 
    services: [{ label: "Evaluación Kine", info: "Rehabilitación física integral", link: "https://ff.healthatom.io/xxzVqR" }] 
  },
  { 
    id: "medicinaGeneral", 
    title: "Medicina General", 
    icon: <Stethoscope size={28} />, 
    services: [
      { label: "Consulta Médica", info: "Medicina familiar y preventiva", link: "https://ff.healthatom.io/N9Xjef" }, 
      { label: "Enfermería", info: "Procedimientos y curaciones", link: "https://ff.healthatom.io/vEOYZh" }, 
      { label: "Podología", info: "Cuidado clínico de pies", link: "https://ff.healthatom.io/9MdPUT" }
    ] 
  },
  { 
    id: "terapiasAlternativas", 
    title: "Terapias Alternativas", 
    icon: <HeartPulse size={28} />, 
    services: [
      { label: "Masoterapia", info: "Masajes descontracturantes", link: "https://ff.healthatom.io/B0htiL" }, 
      { label: "Biomagnetismo", info: "Terapia con imanes", link: "https://ff.healthatom.io/kQfeV2" }
    ] 
  },
  { 
    id: "tomaMuestras", 
    title: "Toma de Muestras", 
    icon: <Microscope size={28} />, 
    services: [{ label: "Laboratorio", info: "Resultados rápidos en 24h", link: "https://ff.healthatom.io/FKV7ZY" }] 
  }
];

export function MinimalistScheduler() {
  const [selectedCategory, setSelectedCategory] = useState<any>(null);

  const handleCategoryClick = (category: any) => {
    if (category.id === "tomaMuestras") {
      window.open(category.services[0].link, '_blank');
    } else {
      setSelectedCategory(category);
    }
  };

  return (
    <div className="w-full bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden">
      {/* Header más Compacto */}
      <div className="border-b border-slate-100 bg-slate-50/50 px-8 py-6 relative">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          
          <div className="w-40">
            <AnimatePresence mode="wait">
              {selectedCategory ? (
                <motion.button 
                  key="back"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  onClick={() => setSelectedCategory(null)}
                  className="flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-primary transition-all group"
                >
                  <div className="w-9 h-9 rounded-xl bg-white border border-slate-100 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                    <ArrowLeft size={16} />
                  </div>
                  <span>Volver</span>
                </motion.button>
              ) : (
                <motion.div 
                  key="icon"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary"
                >
                  <Calendar size={18} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex-1 text-center">
            <h4 className="text-xl font-bold text-primary tracking-tight">Agendar Hora</h4>
            <div className="h-4 flex items-center justify-center mt-0.5">
              <AnimatePresence mode="wait">
                <motion.p 
                  key={selectedCategory ? 'step2' : 'step1'}
                  initial={{ opacity: 0, y: 3 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -3 }}
                  className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]"
                >
                  {selectedCategory ? `Paso 2: ${selectedCategory.title}` : 'Paso 1: Categoría'}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>

          <div className="w-40 flex justify-end">
            <div className="flex items-center gap-5 border-l border-slate-200 pl-6">
              <div className="flex flex-col items-center gap-1.5">
                <div className={`w-2.5 h-2.5 rounded-full transition-colors duration-500 ${selectedCategory ? 'bg-secondary' : 'bg-secondary/40'}`} />
                <span className={`text-[8px] font-bold uppercase tracking-wider ${selectedCategory ? 'text-secondary' : 'text-slate-400'}`}>Selección</span>
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <div className={`w-2.5 h-2.5 rounded-full transition-colors duration-500 ${selectedCategory ? 'bg-[#FF8A00]' : 'bg-slate-200'}`} />
                <span className={`text-[8px] font-bold uppercase tracking-wider ${selectedCategory ? 'text-[#FF8A00]' : 'text-slate-400'}`}>Servicio</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Contenido Principal Compacto */}
      <div className="p-8 md:p-10 flex justify-center bg-white min-h-[300px]">
        <div className="w-full max-w-5xl">
          <AnimatePresence mode="wait">
            {!selectedCategory ? (
              <motion.div
                key="categories"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              >
                {SCHEDULE_DATA.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryClick(cat)}
                    className="flex items-center gap-5 p-6 rounded-[2rem] bg-slate-50/50 hover:bg-white border border-slate-50 hover:border-primary/10 transition-all text-left group min-h-[110px]"
                  >
                    <div className="w-13 h-13 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-primary group-hover:scale-105 transition-transform shadow-sm shrink-0">
                      {cat.icon}
                    </div>
                    <span className="text-xl font-bold text-slate-700 group-hover:text-primary transition-colors leading-tight">
                      {cat.title}
                    </span>
                  </button>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="services"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 -m-4 custom-scrollbar"
              >
                {selectedCategory.services?.map((svc: any, idx: number) => (
                  <div key={idx} className="w-full">
                    {svc.isMulti ? (
                      <div className="p-6 rounded-[2rem] bg-slate-50 border border-slate-100 flex flex-col gap-4 min-h-[110px]">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-black text-slate-400 px-1 uppercase tracking-widest">{svc.label}</span>
                          <div className="group relative">
                            <Info size={16} className="text-slate-300 cursor-help" />
                            <div className="absolute bottom-full right-0 mb-2 w-56 p-4 bg-primary text-white text-[10px] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 shadow-lg">
                              {svc.info}
                            </div>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          {svc.options.map((opt: any, optIdx: number) => (
                            <button
                              key={optIdx}
                              onClick={() => window.open(opt.link, '_blank')}
                              className="text-[12px] font-bold py-4 bg-white rounded-xl border border-slate-100 text-slate-600 hover:bg-primary hover:text-white transition-all whitespace-nowrap"
                            >
                              {opt.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => window.open(svc.link, '_blank')}
                        className="w-full flex items-center justify-between p-6 rounded-[2rem] border border-slate-100 hover:border-secondary/20 bg-slate-50/50 hover:bg-white transition-all text-left group/btn min-h-[110px]"
                      >
                        <div className="flex flex-col gap-1">
                          <span className="text-xl font-bold text-slate-700">{svc.label}</span>
                          <span className="text-[10px] font-medium text-slate-400 group-hover/btn:text-secondary transition-colors">{svc.info}</span>
                        </div>
                        <div className="w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center text-secondary group-hover/btn:bg-secondary group-hover/btn:text-white transition-all shrink-0">
                          <ChevronRight size={20} />
                        </div>
                      </button>
                    )}
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
