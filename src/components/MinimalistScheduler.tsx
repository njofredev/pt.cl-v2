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
  Leaf,
  Microscope,
  SmilePlus,
  Info,
  Accessibility
} from "lucide-react";

interface ServiceOption {
  label: string;
  link: string;
}

interface Service {
  label: string;
  info: string;
  link?: string;
  isMulti?: boolean;
  options?: ServiceOption[];
}

interface Category {
  id: string;
  title: string;
  icon: React.ReactNode;
  services: Service[];
  color?: 'cyan' | 'purple' | 'rose' | 'blue' | 'green' | 'orange';
}

const COLOR_MAP = {
  cyan: {
    text: "text-cyan-500",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/30",
    hoverText: "group-hover:text-cyan-500",
    hoverBorder: "hover:border-cyan-500/30",
    iconBg: "bg-cyan-500/20",
    shadow: "shadow-cyan-500/20"
  },
  purple: {
    text: "text-purple-500",
    bg: "bg-purple-500/10",
    border: "border-purple-500/30",
    hoverText: "group-hover:text-purple-500",
    hoverBorder: "hover:border-purple-500/30",
    iconBg: "bg-purple-500/20",
    shadow: "shadow-purple-500/20"
  },
  rose: {
    text: "text-rose-500",
    bg: "bg-rose-500/10",
    border: "border-rose-500/30",
    hoverText: "group-hover:text-rose-500",
    hoverBorder: "hover:border-rose-500/30",
    iconBg: "bg-rose-500/20",
    shadow: "shadow-rose-500/20"
  },
  blue: {
    text: "text-blue-500",
    bg: "bg-blue-500/10",
    border: "border-blue-500/30",
    hoverText: "group-hover:text-blue-500",
    hoverBorder: "hover:border-blue-500/30",
    iconBg: "bg-blue-500/20",
    shadow: "shadow-blue-500/20"
  },
  green: {
    text: "text-green-500",
    bg: "bg-green-500/10",
    border: "border-green-500/30",
    hoverText: "group-hover:text-green-500",
    hoverBorder: "hover:border-green-500/30",
    iconBg: "bg-green-500/20",
    shadow: "shadow-green-500/20"
  },
  orange: {
    text: "text-orange-500",
    bg: "bg-orange-500/10",
    border: "border-orange-500/30",
    hoverText: "group-hover:text-orange-500",
    hoverBorder: "hover:border-orange-500/30",
    iconBg: "bg-orange-500/20",
    shadow: "shadow-orange-500/20"
  },
};

const SCHEDULE_DATA: Category[] = [
  {
    id: "saludDental",
    title: "Salud Dental",
    icon: <SmilePlus size={26} strokeWidth={1.5} />,
    color: 'cyan',
    services: [
      { label: "Diagnóstico Dental", info: "Evaluación inicial y presupuesto", link: "https://ff.healthatom.io/drrRF5" },
      { label: "Urgencia Dental", info: "Atención inmediata por dolor", link: "https://ff.healthatom.io/ULnJPR" },
      { label: "Limpieza Dental", info: "Profilaxis y eliminación de sarro", link: "https://ff.healthatom.io/tlmKaf" },
      { label: "Evaluación Frenillos", info: "Ortodoncia adultos y niños", link: "https://ff.healthatom.io/FGrUIj" },
      { label: "Cuidado Dental Niños", info: "Odontopediatría especializada", link: "https://ff.healthatom.io/hzazOC" },
      { label: "Blanqueamiento Dental", info: "Estética dental avanzada", link: "https://ff.healthatom.io/0RW6UD" },
      { label: "Consulta Especialidad", info: "Endodoncia, Implantes, Prótesis", link: "https://ff.healthatom.io/fesVZO" },
      { label: "Evaluación TTM", info: "Dolor orofacial y bruxismo", link: "https://ff.healthatom.io/Ifb484" }
    ]
  },
  {
    id: "saludMental",
    title: "Salud Mental",
    icon: <Brain size={26} strokeWidth={1.5} />,
    color: 'purple',
    services: [
      {
        label: "Atención Psicología",
        info: "Atención individual y parejas",
        isMulti: true,
        options: [
          { label: "Presencial", link: "https://ff.healthatom.io/wlP9EZ" },
          { label: "Teleconsulta", link: "https://ff.healthatom.io/7c4geA" }
        ]
      },
      { label: "Consulta Psiquiatría", info: "Control médico especializado", link: "https://ff.healthatom.io/SeOkpO" },
      { label: "Atención Fonoaudiología", info: "Lenguaje y deglución", link: "https://ff.healthatom.io/nTp5kE" },
      { label: "Consulta Psicopedagogía", info: "Dificultades de aprendizaje", link: "https://ff.healthatom.io/rIxNId" }
    ]
  },
  {
    id: "kinesiologia",
    title: "Kinesiología",
    icon: <Accessibility size={26} strokeWidth={1.5} />,
    color: 'orange',
    services: [{ label: "Evaluación Kinesiología", info: "Rehabilitación física integral", link: "https://ff.healthatom.io/xxzVqR" }]
  },
  {
    id: "medicinaGeneral",
    title: "Medicina General",
    icon: <Stethoscope size={26} strokeWidth={1.5} />,
    color: 'blue',
    services: [
      { label: "Consulta Médica", info: "Medicina familiar y preventiva", link: "https://ff.healthatom.io/N9Xjef" },
      { label: "Enfermería", info: "Procedimientos y curaciones", link: "https://ff.healthatom.io/vEOYZh" },
      { label: "Podología", info: "Cuidado clínico de pies", link: "https://ff.healthatom.io/9MdPUT" }
    ]
  },
  {
    id: "terapiasAlternativas",
    title: "Terapias Complementarias",
    icon: <Leaf size={26} strokeWidth={1.5} />,
    color: 'green',
    services: [
      { label: "Masoterapia", info: "Masajes descontracturantes", link: "https://ff.healthatom.io/B0htiL" },
      { label: "Biomagnetismo", info: "Terapia con imanes", link: "https://ff.healthatom.io/kQfeV2" }
    ]
  },
  {
    id: "tomaMuestras",
    title: "Toma de Muestras",
    icon: <Microscope size={26} strokeWidth={1.5} />,
    color: 'rose',
    services: [{ label: "Exámenes de Laboratorio", info: "Resultados rápidos en 24h", link: "https://ff.healthatom.io/FKV7ZY" }]
  }
];

export function MinimalistScheduler({ initialCategoryId }: { initialCategoryId?: string }) {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(() => {
    if (initialCategoryId) {
      const base = SCHEDULE_DATA.find(c => c.id === initialCategoryId);
      if (!base) return null;

      // Si estamos en Medicina General, inyectamos el servicio de Kinesiología y Toma de Muestras para esta vista
      if (initialCategoryId === 'medicinaGeneral') {
        const kine = SCHEDULE_DATA.find(c => c.id === 'kinesiologia');
        const toma = SCHEDULE_DATA.find(c => c.id === 'tomaMuestras');
        let mergedServices = [...base.services];
        if (kine) mergedServices.push(...kine.services);
        if (toma) mergedServices.push(...toma.services);
        
        return {
          ...base,
          services: mergedServices
        };
      }
      return base;
    }
    return null;
  });

  const handleCategoryClick = (category: Category) => {
    if (category.id === "tomaMuestras") {
      window.open(category.services[0].link, '_blank', 'noopener');
    } else {
      setSelectedCategory(category);
    }
  };

  const activeColors = selectedCategory ? COLOR_MAP[selectedCategory.color || 'blue'] : null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="w-full"
    >
      <div className="w-full bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-300 dark:border-slate-800 overflow-hidden transition-colors shadow-[0_30px_60px_-15px_rgba(15,23,42,0.12),0_15px_30px_-10px_rgba(0,0,0,0.06)] dark:shadow-none">
        {/* Header más Compacto */}
        <div className="border-b border-slate-300 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950 px-4 md:px-8 py-4 md:py-6 relative">
          <div className="max-w-5xl mx-auto flex items-center justify-between">

            <div className="w-24 sm:w-40 shrink-0">
              <AnimatePresence mode="wait">
                {selectedCategory && (
                  <motion.button
                    key="back"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    onClick={() => setSelectedCategory(null)}
                    className="flex items-center gap-2 text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-secondary transition-all group"
                  >
                    <div className="w-9 h-9 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                      <ArrowLeft size={16} />
                    </div>
                    <span>Volver</span>
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

            <div className="flex-1 flex flex-col items-center">
              <div className="relative">
                {/* Icono posicionado absolutamente para no desplazar el centro del texto */}
                <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 hidden md:block">
                  <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shadow-sm transition-colors duration-300 [&>svg]:w-5 [&>svg]:h-5 ${
                    activeColors 
                      ? `${activeColors.bg} ${activeColors.text} ${activeColors.border}`
                      : 'bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-primary dark:text-slate-200'
                  }`}>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={selectedCategory ? selectedCategory.id : 'calendar'}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                      >
                        {selectedCategory ? selectedCategory.icon : <Calendar size={20} />}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>

                <div className="text-center">
                  <h3 className="text-xl font-bold text-primary dark:text-white tracking-tight">Agendar Hora</h3>
                  <div className="flex items-center justify-center mt-1.5 sm:mt-2">
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={selectedCategory ? 'step2' : 'step1'}
                        initial={{ opacity: 0, y: 3 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -3 }}
                        className="text-[9px] sm:text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.2em] leading-relaxed text-center"
                      >
                        {selectedCategory ? 'Paso 2: Servicio' : 'Paso 1: Categoría'}
                      </motion.p>
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-24 sm:w-40 flex justify-end shrink-0">
              <div className="flex items-center gap-3 sm:gap-5 border-l border-slate-200 dark:border-slate-700 pl-4 sm:pl-6">
                <div className="flex flex-col items-center gap-1">
                  <div className={`w-2.5 h-2.5 rounded-full transition-colors duration-500 ${selectedCategory ? 'bg-secondary' : 'bg-[#FF8A00]'}`} />
                  <span className={`text-[8px] font-bold uppercase tracking-wider hidden sm:inline ${selectedCategory ? 'text-secondary' : 'text-[#FF8A00]'}`}>Categoría</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className={`w-2.5 h-2.5 rounded-full transition-colors duration-500 ${selectedCategory ? 'bg-[#FF8A00]' : 'bg-slate-200 dark:bg-slate-700'}`} />
                  <span className={`text-[8px] font-bold uppercase tracking-wider hidden sm:inline ${selectedCategory ? 'text-[#FF8A00]' : 'text-slate-500 dark:text-slate-400'}`}>Servicio</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Contenido Principal Compacto */}
        <div className="p-4 md:p-10 flex justify-center bg-white dark:bg-slate-900 min-h-[300px]">
          <div className="w-full max-w-5xl">
            <AnimatePresence mode="wait">
              {!selectedCategory ? (
                <motion.div
                  key="categories"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4"
                >
                  {SCHEDULE_DATA.map((cat) => {
                    const colors = COLOR_MAP[cat.color || 'blue'];
                    return (
                      <button
                        key={cat.id}
                        onClick={() => handleCategoryClick(cat)}
                        className={`flex flex-col sm:flex-row items-center gap-3 sm:gap-5 p-4 sm:p-6 rounded-[1.5rem] sm:rounded-[2rem] bg-slate-50/80 dark:bg-slate-950/50 hover:bg-white dark:hover:bg-slate-900/80 border border-slate-300/80 dark:border-slate-800 transition-all text-center sm:text-left group min-h-[110px] w-full shadow-sm shadow-slate-200/80 dark:shadow-none hover:shadow-2xl hover:shadow-slate-200/70 dark:hover:shadow-none hover:-translate-y-0.5 ${colors.hoverBorder}`}
                      >
                        <div className={`w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl ${colors.bg} border ${colors.border} flex items-center justify-center ${colors.text} group-hover:scale-110 transition-transform shrink-0 [&>svg]:w-5 [&>svg]:h-5 sm:[&>svg]:w-[26px] sm:[&>svg]:h-[26px]`}>
                          {cat.icon}
                        </div>
                        <span className={`text-sm sm:text-lg lg:text-xl font-bold text-slate-700 dark:text-slate-200 ${colors.hoverText} transition-colors leading-tight tracking-tight sm:tracking-tighter`}>
                          {cat.title}
                        </span>
                      </button>
                    );
                  })}
                </motion.div>
              ) : (
                <motion.div
                  key="services"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 p-4 -m-4 custom-scrollbar"
                >
                  {selectedCategory.services?.map((svc, idx) => (
                    <div key={idx} className="w-full">
                      {svc.isMulti ? (
                        <div className="p-4 sm:p-6 rounded-[1.5rem] sm:rounded-[2rem] bg-slate-50 dark:bg-slate-950 border border-slate-300/80 dark:border-slate-800 flex flex-col gap-4 min-h-[120px] sm:min-h-[110px] w-full h-full justify-between shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
                          <div className="flex flex-col gap-1 items-center sm:items-start w-full">
                            <span className="text-sm sm:text-xl font-bold text-slate-700 dark:text-slate-200 leading-tight">{svc.label}</span>
                            <span className="text-[9px] sm:text-[10px] font-medium text-slate-500 dark:text-slate-400 transition-colors leading-tight">{svc.info}</span>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full mt-1">
                            {svc.options?.map((opt, optIdx) => (
                              <button
                                key={optIdx}
                                onClick={() => window.open(opt.link, '_blank', 'noopener')}
                                className="text-[10px] sm:text-[11px] font-bold py-2 bg-white dark:bg-slate-800 rounded-full border border-secondary/40 hover:border-secondary dark:border-slate-700 text-secondary hover:bg-secondary hover:text-white dark:hover:bg-secondary dark:hover:text-slate-900 transition-all whitespace-nowrap cursor-pointer text-center uppercase tracking-wider"
                              >
                                {opt.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => window.open(svc.link, '_blank', 'noopener')}
                          className="w-full h-full p-4 sm:p-6 rounded-[1.5rem] sm:rounded-[2rem] border border-slate-300/80 dark:border-slate-800 hover:border-secondary/35 dark:hover:border-secondary/40 bg-slate-50/80 dark:bg-slate-950/50 hover:bg-white dark:hover:bg-slate-900 transition-all group/btn min-h-[120px] sm:min-h-[110px] flex flex-col justify-between gap-4 shadow-sm shadow-slate-200/80 dark:shadow-none hover:shadow-2xl hover:shadow-slate-200/70 dark:hover:shadow-none hover:-translate-y-0.5"
                        >
                          <div className="flex flex-col gap-1 items-start text-left w-full">
                            <span className="text-sm sm:text-xl font-bold text-slate-700 dark:text-slate-200 leading-tight group-hover/btn:text-secondary transition-colors">{svc.label}</span>
                            <span className="text-[9px] sm:text-[10px] font-medium text-slate-500 dark:text-slate-400 transition-colors leading-tight line-clamp-2 sm:line-clamp-none">{svc.info}</span>
                          </div>
                          <div className="w-full mt-auto pt-1">
                            <div className="w-full py-2.5 rounded-full border border-secondary/40 bg-white dark:bg-slate-800 text-secondary group-hover/btn:bg-secondary group-hover/btn:text-white dark:hover:text-slate-900 transition-all text-[10px] sm:text-[11px] font-bold uppercase tracking-wider leading-none text-center shadow-sm">
                              Agendar
                            </div>
                          </div>
                        </button>
                      )}
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Disclaimer */}
            <div className="mt-12 pt-8 text-center flex flex-col items-center">
              <div className="w-24 h-px bg-slate-100 dark:bg-slate-800/50 mb-8"></div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-2xl mx-auto">
                Seleccione una categoría y luego el servicio deseado. Posteriormente, será redirigido a nuestro sistema de agendamiento externo (Dentalink o Medilink) para finalizar su reserva según corresponda.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
