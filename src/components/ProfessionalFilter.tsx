"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, User, ChevronRight, ChevronDown, Filter, X, Info, GraduationCap, MapPin,
  Sparkles, SmilePlus, Brain, Stethoscope, Leaf, CalendarDays, Video, Activity,
  Bone, Scissors, Ear, Smile, Users, ShieldAlert, Pill, Footprints, Baby,
  Syringe, ShieldPlus, Hand, Zap, Trash2
} from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { AREAS, Area, Professional } from '@/data/professionals';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';


// AQUÍ SE REEMPLAZAN LAS ESPECIALIDADES MOSTRADAS EN LA FICHA DEL PROFESIONAL

// Base de datos visual de descripciones e iconos para especialidades por área
const SPECIALTY_METADATA: Record<string, { description: string, icon: any, focus?: string[] }> = {
  // Salud Dental
  'Odontología General': {
    description: "Diagnóstico integral y prevención para mantener tu sonrisa sana todos los días.",
    icon: Smile,
    focus: ["Limpiezas profundas", "Restauraciones estéticas", "Prevención de caries", "Urgencias dentales"]
  },
  'Implantología': {
    description: "Restauración permanente de piezas dentales con prótesis seguras sobre implantes.",
    icon: Sparkles,
    focus: ["Cirugía mínimamente invasiva", "Carga inmediata", "Prótesis fijas", "Injertos óseos"]
  },
  'Ortodoncia': {
    description: "Alineación dental y corrección de mordida para una estética y funcionalidad perfecta.",
    icon: SmilePlus,
    focus: ["Brackets metálicos y cerámicos", "Ortodoncia invisible", "Alineación funcional", "Estética dental"]
  },
  'Endodoncia': {
    description: "Tratamiento especializado del conducto para salvar piezas dentales dañadas.",
    icon: Pill,
    focus: ["Tratamiento de conducto", "Alivio del dolor", "Tecnología rotatoria", "Salvamento dental"]
  },
  'Periodoncia': {
    description: "Cuidado, tratamiento y prevención de enfermedades en las encías y tejidos.",
    icon: Activity,
    focus: ["Gingivitis y Periodontitis", "Salud gingival", "Cirugía periodontal", "Mantenimiento óseo"]
  },
  'Rehabilitación Oral': {
    description: "Recuperación estética y funcional de la boca mediante prótesis avanzadas.",
    icon: ShieldPlus,
    focus: ["Coronas y puentes", "Diseño de sonrisa", "Prótesis removibles", "Oclusión funcional"]
  },
  'Odontopediatría': {
    description: "Atención odontológica delicada y enfocada en la salud bucal de los niños.",
    icon: Baby,
    focus: ["Prevención infantil", "Sellantes y flúor", "Manejo conductual", "Ortodoncia preventiva"]
  },
  'Trastornos Temporomandibulares': {
    description: "Diagnóstico y alivio del dolor de la articulación mandibular y el bruxismo.",
    icon: ShieldAlert,
    focus: ["Manejo del bruxismo", "Placas de relajación", "Dolor orofacial", "Disfunción articular"]
  },
  'Radiología': {
    description: "Diagnóstico por imagen de alta precisión para guiar tus tratamientos.",
    icon: Search,
    focus: ["Radiografías panorámicas", "Scanner 3D (CBCT)", "Cefalometrías", "Diagnóstico digital"]
  },
  'Cirugía, Implantología': {
    description: "Intervenciones quirúrgicas maxilofaciales y colocación de implantes.",
    icon: Scissors,
    focus: ["Extracciones complejas", "Terceros molares", "Implantes avanzados", "Cirugía oral"]
  },

  // Salud Mental
  'Psicología': {
    description: "Acompañamiento terapéutico para gestionar tus emociones y potenciar tu bienestar.",
    icon: Brain,
    focus: ["Terapia individual", "Manejo de ansiedad", "Apoyo emocional", "Desarrollo personal"]
  },
  'Psicología Clínica': {
    description: "Acompañamiento terapéutico para gestionar tus emociones y potenciar tu bienestar.",
    icon: Brain,
    focus: ["Terapia individual", "Manejo de ansiedad", "Apoyo emocional", "Desarrollo personal"]
  },
  'Psicología Infantil': {
    description: "Acompañamiento terapéutico especializado en el bienestar emocional de los niños.",
    icon: Brain,
    focus: ["Terapia infantil", "Desarrollo emocional", "Apoyo conductual", "Manejo de ansiedad"]
  },
  'Psicología Infanto Juvenil': {
    description: "Acompañamiento terapéutico especializado en el bienestar emocional de niños y adolescentes.",
    icon: Brain,
    focus: ["Terapia infantil y juvenil", "Desarrollo emocional", "Apoyo conductual", "Manejo de ansiedad"]
  },
  'Psiquiatría': {
    description: "Diagnóstico médico especializado y tratamiento farmacológico de la salud mental.",
    icon: Pill,
    focus: ["Tratamiento farmacológico", "Diagnóstico clínico", "Salud mental adulta", "Seguimiento médico"]
  },
  'Psiquiatría Adultos': {
    description: "Diagnóstico médico especializado y tratamiento farmacológico de la salud mental.",
    icon: Pill,
    focus: ["Tratamiento farmacológico", "Diagnóstico clínico", "Salud mental adulta", "Seguimiento médico"]
  },
  'Psicopedagogía': {
    description: "Orientación y potenciación de los procesos de aprendizaje infantil y juvenil.",
    icon: Users,
    focus: ["Apoyo escolar", "Dificultades de aprendizaje", "Evaluación cognitiva", "Habilidades de estudio"]
  },
  'Fonoaudiología': {
    description: "Terapia integral en la comunicación, el lenguaje, el habla y la deglución.",
    icon: Ear,
    focus: ["Terapia del lenguaje", "Trastornos del habla", "Deglución atípica", "Voz y comunicación"]
  },

  // Medicina General
  'Medicina': {
    description: "Atención médica primaria de confianza, chequeos y derivaciones preventivas.",
    icon: Stethoscope,
    focus: ["Consulta general", "Control de enfermedades", "Chequeo preventivo", "Certificados médicos"]
  },
  'Pediatría': {
    description: "Cuidado integral y seguimiento del crecimiento de los más pequeños.",
    icon: Baby,
    focus: ["Control niño sano", "Vacunatorio", "Enfermedades infantiles", "Crecimiento y desarrollo"]
  },
  'Kinesiología': {
    description: "Rehabilitación física motora, respiratoria y recuperación muscular integral.",
    icon: Activity,
    focus: ["Rehabilitación física", "Kinesiología respiratoria", "Lesiones deportivas", "Post-operatorios"]
  },
  'Enfermería': {
    description: "Atención clínica, administración de tratamientos y curaciones ambulatorias.",
    icon: Syringe,
    focus: ["Inyectables", "Curaciones", "Toma de presión", "Atención ambulatoria"]
  },
  'Podología': {
    description: "Cuidado profesional y tratamiento preventivo para la salud de tus pies.",
    icon: Footprints,
    focus: ["Onicocriptosis", "Cuidado del pie diabético", "Tratamiento de callosidades", "Salud podal"]
  },

  // Terapias
  'Masoterapia': {
    description: "Técnicas manuales enfocadas en aliviar contracturas, tensiones y relajar el cuerpo.",
    icon: Hand,
    focus: ["Masaje descontracturante", "Relajación integral", "Bienestar y salud", "Liberación miofascial"]
  },
  'Biomagnetismo': {
    description: "Terapia alternativa con imanes para equilibrar la energía del organismo.",
    icon: Zap,
    focus: ["Equilibrio energético", "Terapia complementaria", "Bienestar natural", "Armonización"]
  },
};

const CustomSelect = ({
  value,
  onChange,
  options,
  placeholder
}: {
  value: string,
  onChange: (val: string) => void,
  options: { label: string, value: string }[],
  placeholder?: string
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const clickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener('mousedown', clickOutside);
    return () => document.removeEventListener('mousedown', clickOutside);
  }, []);

  const activeOption = options.find(o => o.value === value) || options[0];

  return (
    <div className="relative w-full" ref={ref}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full h-14 flex items-center justify-between rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-5 text-slate-900 dark:text-slate-100 font-bold hover:border-secondary/30 dark:hover:border-secondary/30 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-secondary/20"
      >
        <span className="truncate text-sm sm:text-base">{activeOption?.label || placeholder}</span>
        <ChevronDown size={16} className={`text-slate-400 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 5, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="absolute z-[100] top-full mt-2 w-full max-h-60 overflow-y-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl shadow-black/10 p-2 backdrop-blur-xl custom-scrollbar"
          >
            {options.map((opt) => (
              <button
                key={opt.value}
                type="button"
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors mb-0.5 last:mb-0 cursor-pointer ${value === opt.value
                  ? 'bg-primary/5 dark:bg-white/10 text-primary dark:text-white font-bold'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/80 hover:text-primary dark:hover:text-white'
                  }`}
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                }}
              >
                {opt.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

import { Suspense } from 'react';

const ProfessionalFilterContent = ({ initialArea, professionals }: { initialArea?: Area, professionals: Professional[] }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedArea, setSelectedArea] = useState<Area | "Todas">(initialArea || "Todas");
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("Todas");
  const [selectedSucursal, setSelectedSucursal] = useState<string>("Todas");
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<string>("Todas");
  const [shuffledProfessionals, setShuffledProfessionals] = useState<Professional[]>([]);
  const searchParams = useSearchParams();
  const preSelectedSpecialty = searchParams.get('especialidad');

  useEffect(() => {
    // Barajar aleatoriamente los profesionales al cargar en el cliente (evita Hydration Mismatch)
    const shuffled = [...professionals].sort(() => Math.random() - 0.5);
    setShuffledProfessionals(shuffled);

    // Si viene una especialidad por URL, la seleccionamos
    if (preSelectedSpecialty) {
      setSelectedSpecialty(preSelectedSpecialty);
    }
  }, [professionals, preSelectedSpecialty]);

  const activeProfessionals = shuffledProfessionals.length > 0 ? shuffledProfessionals : professionals;

  const sucursales = ["Todas", "Los Tribunales", "Vitacura"];
  const ageGroups = [
    "Todas",
    "Niños (0 a 11 años)",
    "Adolescentes (12 a 17 años)",
    "Adulto - Joven (18 a 29 años)",
    "Adulto (30 a 59 años)",
    "Tercera Edad (60 años en adelante)"
  ];

  const specialties = useMemo(() => {
    const relevantPros = selectedArea === "Todas"
      ? activeProfessionals
      : activeProfessionals.filter(p => p.area === selectedArea);

    const uniqueSpecialties = Array.from(new Set(relevantPros.map(p => p.specialty)));
    return ["Todas", ...uniqueSpecialties.sort()];
  }, [selectedArea, activeProfessionals]);

  const specialtiesForGrid = useMemo(() => {
    // Solo mostramos la grilla si hay un área específica seleccionada
    if (selectedArea === "Todas") return [];

    // Obtenemos las especialidades actuales filtradas, quitando "Todas"
    const currentSpecs = specialties.filter(s => s !== "Todas");

    return currentSpecs.map(spec => {
      const info = SPECIALTY_METADATA[spec] || { description: "Atención experta enfocada en tu recuperación y bienestar integral.", icon: Activity };
      return {
        name: spec,
        description: info.description,
        Icon: info.icon
      };
    });
  }, [specialties, selectedArea]);

  const filteredProfessionals = useMemo(() => {
    return activeProfessionals.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.specialty.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesArea = selectedArea === "Todas" || p.area === selectedArea;
      const matchesSpecialty = selectedSpecialty === "Todas" || p.specialty === selectedSpecialty;
      const pSucursal = p.sucursal ? p.sucursal.toLowerCase() : "";
      const matchesSucursal = selectedSucursal === "Todas" ||
        !p.sucursal ||
        (selectedSucursal === "Los Tribunales" && (
          pSucursal.includes("tribunales") ||
          pSucursal.includes("matriz") ||
          pSucursal.includes("matríz")
        )) ||
        (selectedSucursal === "Vitacura" && pSucursal.includes("vitacura"));

      const matchesAge = selectedAgeGroup === "Todas" ||
        (p.ageGroup && p.ageGroup.toLowerCase().includes(selectedAgeGroup.toLowerCase().split('(')[0].trim()));

      return matchesSearch && matchesArea && matchesSpecialty && matchesSucursal && matchesAge;
    });
  }, [activeProfessionals, searchTerm, selectedArea, selectedSpecialty, selectedSucursal, selectedAgeGroup]);

  const handleSpecialtyClick = (specName: string) => {
    setSelectedSpecialty(specName);
    // Scroll suave hacia la zona de filtros/resultados para que el usuario note el cambio
    const el = document.getElementById('controles-filtro');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const areaLabel = useMemo(() => {
    if (!initialArea) return "Médico";
    switch (initialArea) {
      case "Salud Dental": return "Cuidado y salud dental";
      case "Salud Mental": return "Salud y bienestar mental";
      case "Medicina General": return "Medicina integral";
      case "Terapias Complementarias": return "Terapias complementarias";
      default: return "Especialista";
    }
  }, [initialArea]);

  const AreaIcon = useMemo(() => {
    if (!initialArea) return null;
    switch (initialArea) {
      case "Salud Dental": return <SmilePlus size={36} className="text-cyan-500" strokeWidth={1.5} />;
      case "Salud Mental": return <Brain size={36} className="text-indigo-500" strokeWidth={1.5} />;
      case "Medicina General": return <Stethoscope size={36} className="text-blue-500" strokeWidth={1.5} />;
      case "Terapias Complementarias": return <Leaf size={36} className="text-green-500" strokeWidth={1.5} />;
      default: return null;
    }
  }, [initialArea]);

  const highlightColorClass = useMemo(() => {
    if (!initialArea) return "text-[#259CF4] dark:text-[#259CF4]";
    switch (initialArea) {
      case "Salud Dental": return "text-cyan-500 dark:text-cyan-400";
      case "Salud Mental": return "text-indigo-500 dark:text-indigo-400";
      case "Medicina General": return "text-blue-500 dark:text-blue-400";
      case "Terapias Complementarias": return "text-green-500 dark:text-green-400";
      default: return "text-[#259CF4] dark:text-[#259CF4]";
    }
  }, [initialArea]);

  return (
    <section id="buscador-profesionales" className="pt-0 pb-24 bg-slate-100/40 dark:bg-slate-950 transition-colors">
      <div className="container mx-auto px-6">
        {/* Unified Control Center Panel */}
        <div id="controles-filtro" className="scroll-mt-32 bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-[0_30px_60px_-15px_rgba(15,23,42,0.12),0_15px_30px_-10px_rgba(0,0,0,0.06)] dark:shadow-none border border-slate-300 dark:border-slate-800 mb-12 relative group/filters">
          
          {/* 1. Header (Title & Area Icon) */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-300/80 dark:border-white/5">
            <div className="flex items-center gap-4">
              {AreaIcon && (
                <div className="w-14 h-14 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-center transform hover:scale-105 transition-all duration-500 shrink-0">
                  {AreaIcon}
                </div>
              )}
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-primary dark:text-slate-50 tracking-tighter">
                  Especialistas en <span className={highlightColorClass}>{areaLabel}</span>
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mt-1">
                  Profesionales de excelencia dedicados a brindar una atención integral y humana.
                </p>
              </div>
            </div>
            
            {/* Trash / Reset Filters Button */}
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedArea(initialArea || "Todas");
                setSelectedSpecialty("Todas");
                setSelectedSucursal("Todas");
                setSelectedAgeGroup("Todas");
              }}
              disabled={!searchTerm && selectedArea === (initialArea || "Todas") && selectedSpecialty === "Todas" && selectedSucursal === "Todas" && selectedAgeGroup === "Todas"}
              className="self-start md:self-center px-4 h-11 rounded-xl flex items-center gap-2 transition-all duration-300 disabled:opacity-0 disabled:pointer-events-none bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-400 hover:text-red-500 hover:border-red-200 dark:hover:border-red-900/50 hover:bg-red-50 dark:hover:bg-red-950/30 group/trash text-xs font-bold uppercase tracking-wider cursor-pointer"
              title="Limpiar todos los filtros"
            >
              <Trash2 size={14} className="group-hover/trash:scale-110 transition-transform" />
              Limpiar Filtros
            </button>
          </div>

          {/* 2. Specialty Quick Explorer (Marquee Carousel - Only if relevant) */}
          {specialtiesForGrid.length > 0 && (
            <div className="pt-6 pb-6 border-b border-slate-200 dark:border-white/5 overflow-hidden">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-slate-100 dark:bg-white/5 text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-300 mb-4 ml-1 border border-slate-200 dark:border-slate-800 shadow-sm">
                Explorar Especialidades
              </span>
              <style dangerouslySetInnerHTML={{ __html: `
                @keyframes marquee-pro-1 {
                  0% { transform: translateX(0%); }
                  100% { transform: translateX(-50%); }
                }
                .animate-marquee-pro-1 {
                  animation: marquee-pro-1 120s linear infinite;
                }
              `}} />
              <div className="relative w-full flex flex-col gap-3 group"
                   style={{
                     maskImage: 'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)',
                     WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)'
                   }}>
                
                {/* Fila Única Infinita */}
                <div className="flex gap-3 w-max animate-marquee-pro-1 group-hover:[animation-play-state:paused] py-1">
                  {[...specialtiesForGrid, ...specialtiesForGrid, ...specialtiesForGrid, ...specialtiesForGrid, ...specialtiesForGrid, ...specialtiesForGrid].map((item, idx) => {
                    const Icon = item.Icon;
                    const isSelected = selectedSpecialty === item.name;

                    return (
                      <div
                        key={`r1-${item.name}-${idx}`}
                        onClick={() => handleSpecialtyClick(item.name)}
                        className={`shrink-0 cursor-pointer relative px-4 py-2.5 rounded-[1rem] border transition-all duration-300 flex items-center gap-3 hover:-translate-y-0.5 ${isSelected
                          ? 'bg-[#259CF4] text-white border-[#259CF4] shadow-lg shadow-[#259CF4]/20'
                          : 'bg-slate-50 dark:bg-slate-950 border-slate-200/60 dark:border-white/[0.05] hover:shadow-md hover:border-secondary/40 shadow-sm dark:shadow-none'
                          }`}
                      >
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors duration-300 ${isSelected ? 'bg-white/20 text-white' : 'bg-secondary/15 text-secondary'
                          }`}>
                          <Icon size={14} strokeWidth={2.5} />
                        </div>
                        <h3 className={`font-bold text-[12px] tracking-tight transition-colors whitespace-nowrap ${isSelected ? 'text-white' : 'text-slate-700 dark:text-slate-200'}`}>
                          {item.name}
                        </h3>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* 3. Filter Selectors Grid */}
          <div className="pt-6 pb-6">
            <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 items-end ${!initialArea ? 'lg:grid-cols-5' : 'lg:grid-cols-4'}`}>
              <div className="space-y-2 md:col-span-2 lg:col-span-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 ml-2 flex items-center gap-1.5">
                  <User size={12} className="text-secondary shrink-0" /> Buscar Profesional
                </label>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <Input
                    placeholder="Ingresa el nombre del profesional..."
                    className="pl-12 h-13 rounded-2xl border-slate-300/80 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:bg-white dark:focus:bg-slate-950 focus:ring-secondary/20 dark:text-slate-100 transition-all text-sm font-medium"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {!initialArea && (
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 ml-2 flex items-center gap-1.5">
                    <Activity size={12} className="text-secondary shrink-0" /> Área
                  </label>
                  <CustomSelect
                    value={selectedArea}
                    onChange={(val) => {
                      setSelectedArea(val as Area | "Todas");
                      setSelectedSpecialty("Todas");
                    }}
                    options={[
                      { label: "Todas las Áreas", value: "Todas" },
                      ...AREAS.map(a => ({ label: a, value: a }))
                    ]}
                  />
                </div>
              )}

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 ml-2 flex items-center gap-1.5">
                  <MapPin size={12} className="text-secondary shrink-0" /> Sucursal
                </label>
                <CustomSelect
                  value={selectedSucursal}
                  onChange={(val) => setSelectedSucursal(val)}
                  options={sucursales.map(suc => ({
                    label: suc === "Todas" ? "Todas las Sucursales" : suc,
                    value: suc
                  }))}
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 ml-2 flex items-center gap-1.5">
                  <Users size={12} className="text-secondary shrink-0" /> Edad de Atención
                </label>
                <CustomSelect
                  value={selectedAgeGroup}
                  onChange={(val) => setSelectedAgeGroup(val)}
                  options={ageGroups.map(age => ({
                    label: age === "Todas" ? "Todas las Edades" : age,
                    value: age
                  }))}
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 ml-2 flex items-center gap-1.5">
                  <ShieldPlus size={12} className="text-secondary shrink-0" /> Especialidad
                </label>
                <CustomSelect
                  value={selectedSpecialty}
                  onChange={(val) => setSelectedSpecialty(val)}
                  options={specialties.map(spec => ({
                    label: spec === "Todas" ? "Todas las Especialidades" : spec,
                    value: spec
                  }))}
                />
              </div>
            </div>
          </div>

          {/* 4. Active Badges / Tags */}
          {(searchTerm || (!initialArea && selectedArea !== "Todas") || selectedSpecialty !== "Todas" || selectedSucursal !== "Todas" || selectedAgeGroup !== "Todas") && (
            <div className="pt-4 pb-4 border-t border-slate-100 dark:border-white/5">
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase mr-2">Filtros activos:</span>
                {searchTerm && (
                  <Badge variant="secondary" className="bg-secondary/10 text-secondary border-none rounded-lg px-3 py-1 flex items-center gap-1 text-[11px] font-bold">
                    &quot;{searchTerm}&quot; <X size={12} className="cursor-pointer" onClick={() => setSearchTerm("")} />
                  </Badge>
                )}
                {!initialArea && selectedArea !== "Todas" && (
                  <Badge variant="secondary" className="bg-secondary/10 text-secondary border-none rounded-lg px-3 py-1 flex items-center gap-1 text-[11px] font-bold">
                    {selectedArea} <X size={12} className="cursor-pointer" onClick={() => setSelectedArea("Todas")} />
                  </Badge>
                )}
                {selectedSucursal !== "Todas" && (
                  <Badge variant="secondary" className="bg-secondary/10 text-secondary border-none rounded-lg px-3 py-1 flex items-center gap-1 text-[11px] font-bold">
                    {selectedSucursal} <X size={12} className="cursor-pointer" onClick={() => setSelectedSucursal("Todas")} />
                  </Badge>
                )}
                {selectedAgeGroup !== "Todas" && (
                  <Badge variant="secondary" className="bg-secondary/10 text-secondary border-none rounded-lg px-3 py-1 flex items-center gap-1 text-[11px] font-bold">
                    {selectedAgeGroup} <X size={12} className="cursor-pointer" onClick={() => setSelectedAgeGroup("Todas")} />
                  </Badge>
                )}
                {selectedSpecialty !== "Todas" && (
                  <Badge variant="secondary" className="bg-secondary/10 text-secondary border-none rounded-lg px-3 py-1 flex items-center gap-1 text-[11px] font-bold">
                    {selectedSpecialty} <X size={12} className="cursor-pointer" onClick={() => setSelectedSpecialty("Todas")} />
                  </Badge>
                )}
              </div>
            </div>
          )}

          {/* 5. Selected Specialty Explanation & Sub-navigation */}
          {selectedSpecialty !== "Todas" && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="pt-6 border-t border-slate-100 dark:border-white/5 transition-all"
            >
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-secondary/15 text-secondary flex items-center justify-center shrink-0">
                      {(() => {
                        const meta = SPECIALTY_METADATA[selectedSpecialty];
                        const Icon = meta?.icon || Activity;
                        return <Icon size={20} strokeWidth={2.5} />;
                      })()}
                    </div>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white">{selectedSpecialty}</h3>
                  </div>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400 max-w-3xl leading-relaxed">
                    {SPECIALTY_METADATA[selectedSpecialty]?.description || "Atención experta enfocada en tu recuperación y bienestar integral."}
                  </p>
                </div>
                
                {specialties.length > 2 && (
                  <div className="shrink-0 flex items-center gap-4 lg:border-l border-slate-100 dark:border-white/5 lg:pl-6 w-full lg:w-auto mt-4 lg:mt-0">
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 w-24 shrink-0 text-right leading-tight">Otras Especialidades</span>
                    <div className="flex flex-wrap justify-end gap-2 max-w-full">
                      {specialties.filter(s => s !== "Todas" && s !== selectedSpecialty).map((spec) => {
                        const meta = SPECIALTY_METADATA[spec];
                        if (!meta) return null;
                        const Icon = meta.icon;
                        return (
                          <button
                            key={spec}
                            onClick={() => setSelectedSpecialty(spec)}
                            className="group relative w-10 h-10 shrink-0 rounded-xl bg-slate-100 dark:bg-slate-800 text-primary dark:text-white hover:bg-secondary/15 hover:text-secondary transition-all flex items-center justify-center transform hover:-translate-y-1"
                          >
                            <Icon size={16} strokeWidth={2.5} />
                            {/* Custom Tooltip */}
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 bg-slate-800 dark:bg-slate-700 text-white text-[10px] font-bold rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50 shadow-lg">
                              {spec}
                              <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800 dark:border-t-slate-700"></div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
          {/* 6. Professionals Grid Section */}
          <div className="pt-8 mt-8 border-t border-slate-300/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20 -mx-8 -mb-8 p-8 rounded-b-[2.5rem]">
            <div className="flex items-center justify-between gap-4 mb-6">
              <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 flex items-center gap-2">
                <Users size={14} className="text-secondary" /> Especialistas Disponibles ({filteredProfessionals.length})
              </h4>
              <div className="h-px flex-1 bg-slate-300/60 dark:bg-white/5"></div>
            </div>
            
            {/* Grid of Professional Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <AnimatePresence mode='popLayout'>
                {filteredProfessionals.map((pro, idx) => (
                  <ProfessionalCard key={`${pro.name}-${pro.specialty}`} pro={pro} idx={idx} />
                ))}
              </AnimatePresence>
            </div>

            {filteredProfessionals.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16 bg-slate-50/50 dark:bg-slate-950/20 rounded-[2rem] border border-dashed border-slate-200 dark:border-slate-800"
              >
                <div className="w-16 h-16 bg-slate-100 dark:bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Filter className="text-slate-300 dark:text-slate-500" size={24} />
                </div>
                <h3 className="text-lg font-bold text-primary dark:text-white mb-1">No encontramos resultados</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Intenta ajustando los filtros o el término de búsqueda.</p>
                <Button
                  variant="outline"
                  className="mt-6 rounded-full border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedArea(initialArea || "Todas");
                    setSelectedSpecialty("Todas");
                    setSelectedSucursal("Todas");
                  }}
                >
                  Restablecer Filtros
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const ProfessionalCard = ({ pro, idx }: { pro: Professional, idx: number }) => {
  const [showSpecInfo, setShowSpecInfo] = useState(false);

  const proImage = pro.image;
  const lowerSuc = pro.sucursal?.toLowerCase() || "";
  const isVitacura = lowerSuc.includes("vitacura");
  const isTribunales = lowerSuc.includes("tribunales") || lowerSuc.includes("matriz") || lowerSuc.includes("matríz");
  const hasTele = lowerSuc.includes("teleconsulta");

  const specMetadata = SPECIALTY_METADATA[pro.specialty] || { icon: Activity, description: "Atención experta enfocada en tu recuperación y bienestar integral." };
  const SpecIcon = specMetadata.icon;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.2, delay: idx * 0.01 }}
    >
      <div className="group h-full border border-slate-300/70 dark:border-slate-800 hover:border-[#259CF4]/30 dark:hover:border-[#259CF4]/30 shadow-[0_10px_30px_rgba(0,0,0,0.04)] dark:shadow-none hover:shadow-2xl hover:shadow-[#259CF4]/10 dark:hover:shadow-[#259CF4]/20 transition-all duration-500 rounded-[3rem] overflow-hidden bg-white dark:bg-slate-900 flex flex-col">
        <div className="p-0 flex flex-col h-full">
          {/* Área de Imagen - Avatar Circular Centrado */}
          <div className="pt-12 pb-6 flex justify-center">
            <div className="relative w-40 h-40 bg-slate-50 dark:bg-slate-950 rounded-full overflow-hidden border-4 border-slate-200 dark:border-slate-800 shadow-lg group-hover:scale-105 transition-transform duration-500">
              {proImage ? (
                <Image
                  src={proImage}
                  alt={pro.name}
                  fill
                  className="object-cover"
                  sizes="160px"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900">
                  <User className="text-slate-200 dark:text-slate-700" size={60} />
                </div>
              )}
            </div>
          </div>

          <div className="p-8 pt-2 flex-grow flex flex-col items-center text-center">
            <h3 className="text-xl font-bold text-primary dark:text-slate-50 mb-3 leading-tight group-hover:text-[#259CF4] dark:group-hover:text-[#259CF4] transition-colors w-full px-4">
              {pro.name}
            </h3>

            <div className="flex flex-col items-center gap-3 mt-auto">
              <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-[10px] font-bold uppercase tracking-widest shrink-0 shadow-sm shadow-slate-200/30 dark:shadow-none">
                <SpecIcon size={12} strokeWidth={2.5} className="text-secondary shrink-0" /> {pro.specialty}
              </div>
              <div className="flex flex-wrap justify-center gap-1.5 items-center">
                {isTribunales && (
                  <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-100 dark:bg-white/5 text-[9px] font-black text-slate-600 dark:text-slate-300 uppercase tracking-widest border border-slate-200/50 dark:border-white/5">
                    <MapPin size={10} className="text-teal-500 shrink-0" /> Los Tribunales
                  </div>
                )}
                {isVitacura && (
                  <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-100 dark:bg-white/5 text-[9px] font-black text-slate-600 dark:text-slate-300 uppercase tracking-widest border border-slate-200/50 dark:border-white/5">
                    <MapPin size={10} className="text-secondary shrink-0" /> Vitacura
                  </div>
                )}
                {hasTele && (
                  <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-900/20 text-[9px] font-black text-blue-600 dark:text-blue-300 uppercase tracking-widest border border-blue-200/50 dark:border-blue-800/50">
                    <Video size={10} className="shrink-0" /> Teleconsulta
                  </div>
                )}
              </div>

              {pro.ageGroup && (
                <div className="flex flex-wrap justify-center gap-1.5 mt-2.5 pt-2 border-t border-slate-100 dark:border-white/10 w-full">
                  {pro.ageGroup.split(',').map(s => s.replace(/\./g, '').trim()).filter(Boolean).map((age, i) => (
                    <span key={i} className="text-[10px] font-extrabold tracking-wider uppercase bg-secondary/10 text-secondary px-2.5 py-1 rounded-md">
                      {age.includes('(') ? age.split('(')[0].trim() : age}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="w-full p-6 pt-0 pb-8 flex flex-col items-center gap-3 mt-auto">
            {/* Botón Directo: Agendar Hora */}
            <a
              href={pro.bookingLink || "tel:+56222172635"}
              target={pro.bookingLink?.startsWith('http') ? "_blank" : undefined}
              rel={pro.bookingLink?.startsWith('http') ? "noopener noreferrer" : undefined}
              className="w-full max-w-[230px] bg-gradient-to-r from-primary to-[#1e3a8a] hover:from-[#111827] hover:to-[#1f2937] text-white font-bold h-11 rounded-full text-[10px] tracking-[0.15em] uppercase transition-all duration-300 shadow-md flex items-center justify-center gap-2 cursor-pointer select-none active:scale-95 whitespace-nowrap"
            >
              <CalendarDays size={14} className="text-white shrink-0" />
              <span>Agendar Hora</span>
            </a>

            <Dialog onOpenChange={(open) => !open && setShowSpecInfo(false)}>
              <DialogTrigger asChild>
                <button className="w-full max-w-[230px] bg-white dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700 hover:border-[#259CF4]/50 text-slate-800 dark:text-slate-200 hover:text-primary dark:hover:text-white font-bold h-11 rounded-full text-[10px] tracking-[0.15em] uppercase transition-all duration-300 shadow-sm hover:shadow-md flex items-center justify-center gap-2 cursor-pointer select-none active:scale-95 whitespace-nowrap">
                  <Search size={14} className="text-slate-800 dark:text-slate-200 shrink-0" />
                  <span>Ver Perfil Completo</span>
                </button>
              </DialogTrigger>
              <DialogContent showCloseButton={false} className="w-[95vw] max-w-[500px] md:max-w-[800px] max-h-[85vh] flex flex-col md:flex-row rounded-[2rem] border-none p-0 overflow-hidden gap-0 bg-white dark:bg-slate-900">
                {/* Lado Izquierdo: Avatar e Información Básica (Fondo Celeste) */}
                <div className="w-full md:w-[35%] bg-[#1d8cdb] p-6 md:p-8 text-white relative shrink-0 flex flex-col items-center justify-center text-center border-b md:border-b-0 md:border-r border-white/10">
                  <div className="relative w-20 h-20 sm:w-28 h-28 md:w-36 md:h-36 bg-white/15 rounded-full flex items-center justify-center mb-4 overflow-hidden border-4 border-white/25 shadow-2xl">
                    {proImage ? (
                      <Image
                        src={proImage}
                        alt={pro.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 112px, 144px"
                      />
                    ) : (
                      <User size={50} className="text-white" />
                    )}
                  </div>

                  <DialogHeader className="text-center w-full mb-4">
                    <DialogTitle className="text-lg sm:text-xl md:text-2xl font-black tracking-tight leading-tight mb-1 text-white">{pro.name}</DialogTitle>
                    <div className="text-white/90 font-extrabold text-[10px] md:text-xs uppercase tracking-widest">{pro.area}</div>
                  </DialogHeader>

                  {/* Categoría y Especialidad */}
                  <div className="flex flex-col items-center gap-3 w-full mt-auto pt-6 border-t border-white/15">
                    <span className="hidden sm:block text-[9px] font-black uppercase tracking-[0.2em] text-white/50">Categoría</span>
                    <div className="flex flex-col items-center gap-2">
                      <div className="flex flex-col items-center">
                        <button
                          onClick={() => setShowSpecInfo(!showSpecInfo)}
                          className={`group/specbtn inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border-none transition-all duration-300 relative ${showSpecInfo
                            ? 'bg-white text-[#1d8cdb] shadow-xl scale-105'
                            : 'bg-primary text-white font-bold shadow-lg shadow-black/10 hover:scale-105'
                            }`}
                        >
                          <SpecIcon size={11} strokeWidth={2.5} className={showSpecInfo ? 'text-[#1d8cdb]' : 'text-white'} />
                          <span className="text-[9px] font-bold uppercase tracking-widest">{pro.specialty}</span>
                          <ChevronRight size={11} className={`ml-1 transition-transform duration-300 ${showSpecInfo ? 'rotate-180 text-[#1d8cdb]' : 'group-hover/specbtn:translate-x-0.5 text-white'}`} />
                        </button>
                        {!showSpecInfo && (
                          <span className="text-[7.5px] font-bold text-white/80 tracking-[0.15em] uppercase mt-1.5 animate-pulse">
                            Clic para ver detalle
                          </span>
                        )}
                      </div>
                      <Badge variant="outline" className="text-white border-white/30 text-[9px] py-1 px-3 rounded-full bg-white/10 backdrop-blur-sm">
                        {pro.area}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Botón Cerrar (Extremo derecho superior) */}
                <DialogClose className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-primary dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 rounded-full transition-all outline-none group cursor-pointer z-[100]">
                  <X className="w-5 h-5" />
                </DialogClose>

                {/* Lado Derecho: Badges y Detalles (Scrollable) */}
                <div className="w-full md:w-[65%] flex flex-col bg-white dark:bg-slate-900 overflow-hidden">
                  <div className="p-5 sm:p-6 md:p-8 flex-1 overflow-y-auto custom-scrollbar space-y-6">

                    <AnimatePresence mode="wait">
                      {showSpecInfo ? (
                        <motion.div
                          key="specialty-info"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="space-y-5"
                        >
                          <div className="flex items-center justify-between">
                            <h3 className="text-[9px] font-black uppercase tracking-[0.2em] text-secondary flex items-center gap-2">
                              <Sparkles size={12} /> Sobre la Especialidad
                            </h3>
                            <button
                              onClick={() => setShowSpecInfo(false)}
                              className="text-[9px] font-black uppercase tracking-widest text-primary dark:text-white hover:text-secondary flex items-center gap-1.5 transition-colors mr-10"
                            >
                              <ChevronRight size={10} className="rotate-180" /> Volver al Perfil
                            </button>
                          </div>
                          <div className="bg-secondary/5 dark:bg-secondary/10 p-5 rounded-2xl border border-secondary/10">
                            <h4 className="text-xl font-bold text-primary dark:text-white mb-2">{pro.specialty}</h4>
                            <p className="text-slate-600 dark:text-slate-300 font-medium text-sm leading-relaxed">
                              {specMetadata.description}
                            </p>
                          </div>

                          {specMetadata.focus && (
                            <div className="space-y-3">
                              <h3 className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
                                {pro.specialty === "Kinesiología" ? "Áreas de tratamiento" : "Áreas de enfoque principal"}
                              </h3>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {specMetadata.focus.map((item, i) => (
                                  <div key={i} className="flex items-center gap-2 bg-slate-50 dark:bg-white/5 p-2 rounded-xl border border-slate-100 dark:border-white/5">
                                    <div className="w-5 h-5 rounded-lg bg-secondary/10 flex items-center justify-center shrink-0">
                                      <Activity size={10} className="text-secondary" />
                                    </div>
                                    <span className="text-[11px] font-bold text-slate-700 dark:text-slate-200">{item}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </motion.div>
                      ) : (
                        <motion.div
                          key="profile-info"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          className="space-y-6"
                        >
                          {/* 1. Formación Académica */}
                          {pro.education && (
                            <div className="space-y-1.5">
                              <h3 className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 flex items-center gap-2">
                                <GraduationCap size={12} className="text-secondary" /> Formación Académica
                              </h3>
                              <p className="text-slate-600 dark:text-slate-300 font-medium text-xs sm:text-sm leading-relaxed">{pro.education}</p>
                            </div>
                          )}

                          {/* 2. Perfil Profesional */}
                          {pro.description && (
                            <div className="space-y-1.5">
                              <h3 className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 flex items-center gap-2">
                                <Info size={12} className="text-secondary" /> Perfil Profesional
                              </h3>
                              <p className="text-slate-600 dark:text-slate-300 font-medium text-xs sm:text-sm leading-relaxed">{pro.description}</p>
                            </div>
                          )}

                          {/* 3. Edades de atención */}
                          {pro.ageGroup && (
                            <div className="flex flex-col items-center md:items-start gap-2.5 pt-4 border-t border-slate-100 dark:border-slate-800 w-full">
                              <span className="hidden sm:block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">Edades de atención</span>
                              <div className="flex flex-wrap justify-center md:justify-start gap-2">
                                {pro.ageGroup.split(',').map(s => s.replace(/\./g, '').trim()).filter(Boolean).map((age, i) => (
                                  <span key={i} className="text-xs font-bold tracking-normal bg-secondary/10 text-secondary px-3.5 py-1.5 rounded-xl border border-secondary/10 whitespace-nowrap">
                                    {age}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* 4. Sucursales */}
                          <div className="flex flex-col items-center md:items-start gap-2 pt-4 border-t border-slate-100 dark:border-slate-800 w-full">
                            <span className="hidden sm:block text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">Sucursales y Modalidad</span>
                            <div className="flex flex-wrap gap-1.5 justify-center md:justify-start">
                              {isTribunales && (
                                <Badge variant="secondary" className="bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:bg-slate-200 border-none flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[8px] font-black uppercase tracking-widest">
                                  <MapPin size={10} className="opacity-70 text-teal-500" /> Los Tribunales
                                </Badge>
                              )}
                              {isVitacura && (
                                <Badge variant="secondary" className="bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:bg-slate-200 border-none flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[8px] font-black uppercase tracking-widest">
                                  <MapPin size={10} className="opacity-70 text-secondary" /> Vitacura
                                </Badge>
                              )}
                              {hasTele && (
                                <Badge variant="secondary" className="bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-300 hover:bg-blue-100 border-none flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[8px] font-black uppercase tracking-widest">
                                  <Video size={10} className="opacity-70" /> Teleconsulta
                                </Badge>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Footer Fijo con CTA */}
                  <div className="bg-slate-50 dark:bg-slate-900/50 px-6 py-4 md:px-8 md:py-6 border-t border-slate-100 dark:border-slate-800 shrink-0">
                    {(() => {
                      const firstName = pro.name.split(' ').filter(p => !p.includes('.')).filter(p => p.length > 0)[0] || pro.name.split(' ')[0];
                      return (
                        <a
                          href={pro.bookingLink || "tel:+56222172635"}
                          target={pro.bookingLink?.startsWith('http') ? "_blank" : undefined}
                          rel={pro.bookingLink?.startsWith('http') ? "noopener noreferrer" : undefined}
                          className="w-full bg-gradient-to-r from-primary to-[#1e3a8a] hover:from-[#111827] hover:to-[#1f2937] text-white font-bold h-12 md:h-14 rounded-full text-xs md:text-sm tracking-tight shadow-xl shadow-primary/20 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer select-none active:scale-95 whitespace-nowrap"
                        >
                          <CalendarDays size={16} className="text-white shrink-0" />
                          <span>Agendar Hora con {firstName}</span>
                        </a>
                      );
                    })()}
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const ProfessionalFilter = (props: { initialArea?: Area, professionals: Professional[] }) => (
  <Suspense fallback={<div className='min-h-screen flex items-center justify-center'><div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary'></div></div>}>
    <ProfessionalFilterContent {...props} />
  </Suspense>
);
