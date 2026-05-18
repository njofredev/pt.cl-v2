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
  'Psiquiatría': {
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
        className="w-full h-14 flex items-center justify-between rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-5 text-slate-900 dark:text-slate-100 font-bold hover:border-secondary/30 dark:hover:border-secondary/30 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-secondary/20"
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
            className="absolute z-[100] top-full mt-2 w-full max-h-60 overflow-y-auto bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-2xl shadow-black/10 p-2 backdrop-blur-xl custom-scrollbar"
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
      case "Salud Mental": return <Brain size={36} className="text-purple-500" strokeWidth={1.5} />;
      case "Medicina General": return <Stethoscope size={36} className="text-blue-500" strokeWidth={1.5} />;
      case "Terapias Complementarias": return <Leaf size={36} className="text-green-500" strokeWidth={1.5} />;
      default: return null;
    }
  }, [initialArea]);

  return (
    <section id="buscador-profesionales" className="pt-0 pb-24 bg-slate-50/50 dark:bg-slate-950 transition-colors">
      <div className="container mx-auto px-6">
        {/* Grilla de Especialidades del Área (Solo se muestra en vistas de área) */}
        {specialtiesForGrid.length > 0 && (
          <div className="mt-8 sm:-mt-8 relative z-10 mb-10 border-b border-slate-100 dark:border-white/5 pb-10 overflow-hidden">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-slate-100 dark:bg-white/5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-300 mb-6 ml-1 border border-slate-200 dark:border-white/5 shadow-sm">
              Nuestras Especialidades
            </span>
            <style dangerouslySetInnerHTML={{ __html: `
              @keyframes marquee-pro-1 {
                0% { transform: translateX(0%); }
                100% { transform: translateX(-50%); }
              }
              @keyframes marquee-pro-2 {
                0% { transform: translateX(-50%); }
                100% { transform: translateX(0%); }
              }
              .animate-marquee-pro-1 {
                animation: marquee-pro-1 50s linear infinite;
              }
              .animate-marquee-pro-2 {
                animation: marquee-pro-2 50s linear infinite;
              }
            `}} />
            <div className="relative w-full flex flex-col gap-3 group"
                 style={{
                   maskImage: 'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)',
                   WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)'
                 }}>
              
              {/* Fila 1 */}
              <div className="flex gap-3 w-max animate-marquee-pro-1 group-hover:[animation-play-state:paused] pt-1 pb-1">
                {[...specialtiesForGrid.slice(0, Math.ceil(specialtiesForGrid.length / 2)), ...specialtiesForGrid.slice(0, Math.ceil(specialtiesForGrid.length / 2)), ...specialtiesForGrid.slice(0, Math.ceil(specialtiesForGrid.length / 2)), ...specialtiesForGrid.slice(0, Math.ceil(specialtiesForGrid.length / 2)), ...specialtiesForGrid.slice(0, Math.ceil(specialtiesForGrid.length / 2)), ...specialtiesForGrid.slice(0, Math.ceil(specialtiesForGrid.length / 2))].map((item, idx) => {
                  const Icon = item.Icon;
                  const isSelected = selectedSpecialty === item.name;

                  return (
                    <div
                      key={`r1-${item.name}-${idx}`}
                      onClick={() => handleSpecialtyClick(item.name)}
                      className={`shrink-0 cursor-pointer relative px-4 py-3 sm:px-5 sm:py-3.5 rounded-[1.25rem] border transition-all duration-300 flex items-center gap-3 hover:-translate-y-1 ${isSelected
                        ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20'
                        : 'bg-white dark:bg-slate-900 border-slate-200/60 dark:border-white/[0.05] hover:shadow-md hover:border-secondary/40 shadow-sm dark:shadow-none'
                        }`}
                    >
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-300 ${isSelected ? 'bg-white/20 text-secondary' : 'bg-secondary/15 text-secondary'
                        }`}>
                        <Icon size={16} strokeWidth={2.5} />
                      </div>
                      <h3 className={`font-bold text-[13px] tracking-tight transition-colors whitespace-nowrap ${isSelected ? 'text-white' : 'text-slate-700 dark:text-slate-200'}`}>
                        {item.name}
                      </h3>
                    </div>
                  );
                })}
              </div>

              {/* Fila 2 (Inversa) */}
              {specialtiesForGrid.length > 1 && (
                <div className="flex gap-3 w-max animate-marquee-pro-2 group-hover:[animation-play-state:paused] pb-2">
                  {[...specialtiesForGrid.slice(Math.ceil(specialtiesForGrid.length / 2)), ...specialtiesForGrid.slice(Math.ceil(specialtiesForGrid.length / 2)), ...specialtiesForGrid.slice(Math.ceil(specialtiesForGrid.length / 2)), ...specialtiesForGrid.slice(Math.ceil(specialtiesForGrid.length / 2)), ...specialtiesForGrid.slice(Math.ceil(specialtiesForGrid.length / 2)), ...specialtiesForGrid.slice(Math.ceil(specialtiesForGrid.length / 2))].map((item, idx) => {
                    const Icon = item.Icon;
                    const isSelected = selectedSpecialty === item.name;

                    return (
                      <div
                        key={`r2-${item.name}-${idx}`}
                        onClick={() => handleSpecialtyClick(item.name)}
                        className={`shrink-0 cursor-pointer relative px-4 py-3 sm:px-5 sm:py-3.5 rounded-[1.25rem] border transition-all duration-300 flex items-center gap-3 hover:-translate-y-1 ${isSelected
                          ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20'
                          : 'bg-white dark:bg-slate-900 border-slate-200/60 dark:border-white/[0.05] hover:shadow-md hover:border-secondary/40 shadow-sm dark:shadow-none'
                          }`}
                      >
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-300 ${isSelected ? 'bg-white/20 text-secondary' : 'bg-secondary/15 text-secondary'
                          }`}>
                          <Icon size={16} strokeWidth={2.5} />
                        </div>
                        <h3 className={`font-bold text-[13px] tracking-tight transition-colors whitespace-nowrap ${isSelected ? 'text-white' : 'text-slate-700 dark:text-slate-200'}`}>
                          {item.name}
                        </h3>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* 
        {initialArea === "Salud Dental" && selectedSpecialty === "Todas" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 bg-gradient-to-r from-primary/5 via-secondary/10 to-primary/5 rounded-[2.5rem] p-8 md:p-12 border border-secondary/20 relative overflow-hidden group shadow-2xl shadow-secondary/5"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-700">
              <Zap size={140} className="text-secondary" />
            </div>
            <div className="relative z-10 grid md:grid-cols-3 gap-8 items-center">
              <div className="md:col-span-2">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary text-primary text-[10px] font-black uppercase tracking-widest mb-6">
                  <Zap size={14} fill="currentColor" /> Innovación Dental 2026
                </div>
                <h3 className="text-2xl md:text-5xl font-black text-primary dark:text-white mb-6 tracking-tighter leading-tight">
                  Laboratorio <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Digital Dental</span>
                </h3>
                <p className="text-slate-600 dark:text-slate-300 font-medium max-w-xl text-base md:text-lg leading-relaxed">
                  Creamos tus piezas dentales en una sola sesión mediante tecnología <strong>Chairside</strong>. Escaneamos con <strong>Primescan</strong> para modelos 3D procesados vía <strong>inLab CAD/CAM</strong> y fresados con <strong>CEREC MCX</strong>.
                </p>
              </div>
              <div className="flex justify-center md:justify-end">
                <Link href="/servicios/dental?especialidad=Rehabilitación Oral#equipo">
                  <Button className="bg-primary hover:bg-primary/90 text-white rounded-full px-10 h-16 text-base font-bold shadow-2xl shadow-primary/20 transform hover:-translate-y-1 transition-all duration-300 group/btn">
                    Agendar Rehabilitación <ChevronRight className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
        */}

        <div id="equipo" className="scroll-mt-32 text-center mb-10 flex flex-col items-center">
          {AreaIcon && (
            <div className="w-16 h-16 rounded-full bg-white dark:bg-slate-900 shadow-xl shadow-primary/5 dark:shadow-none border border-slate-100 dark:border-slate-800 flex items-center justify-center mb-6 transform hover:scale-110 transition-all duration-500">
              {AreaIcon}
            </div>
          )}
          <h2 className="text-3xl md:text-5xl font-bold text-primary dark:text-slate-50 tracking-tighter mb-4">
            Especialistas en <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-teal-400 to-secondary dark:from-white dark:via-secondary dark:to-teal-400">{areaLabel}</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-medium">
            Profesionales de excelencia dedicados a brindar una atención integral y humana para tu bienestar.
          </p>
        </div>

        {/* Barra de Filtros */}
        <div id="controles-filtro" className="scroll-mt-32 bg-white dark:bg-slate-900 p-6 rounded-[2rem] shadow-xl shadow-primary/5 dark:shadow-none border border-slate-100 dark:border-slate-800 mb-12 relative group/filters">
          {/* Botón Limpiar Filtros (Flotante Desktop/Tablet) */}
          <div className="absolute top-6 right-6 z-20">
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedArea(initialArea || "Todas");
                setSelectedSpecialty("Todas");
                setSelectedSucursal("Todas");
                setSelectedAgeGroup("Todas");
              }}
              disabled={!searchTerm && selectedArea === (initialArea || "Todas") && selectedSpecialty === "Todas" && selectedSucursal === "Todas" && selectedAgeGroup === "Todas"}
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 disabled:opacity-0 disabled:pointer-events-none bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 text-slate-400 hover:text-red-500 hover:border-red-200 dark:hover:border-red-900/50 hover:bg-red-50 dark:hover:bg-red-950/30 group/trash"
              title="Limpiar todos los filtros"
            >
              <Trash2 size={16} className="group-hover/trash:scale-110 transition-transform" />
            </button>
          </div>

          <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 items-end ${!initialArea ? 'lg:grid-cols-5' : 'lg:grid-cols-4'}`}>
            <div className="space-y-2 md:col-span-2 lg:col-span-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 ml-2">Buscar Profesional o Especialidad</label>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <Input
                  placeholder="Ingresa el nombre del profesional o especialidad..."
                  className="pl-12 h-14 rounded-2xl border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:bg-white dark:focus:bg-slate-950 focus:ring-secondary/20 dark:text-slate-100 transition-all text-base font-medium"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {!initialArea && (
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 ml-2">Área</label>
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
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 ml-2">Sucursal</label>
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
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 ml-2">Edad de Atención</label>
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
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 ml-2">Especialidad</label>
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

          {(searchTerm || (!initialArea && selectedArea !== "Todas") || selectedSpecialty !== "Todas" || selectedSucursal !== "Todas" || selectedAgeGroup !== "Todas") && (
            <div className="mt-6">
              <div className="w-32 h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-700 to-transparent mx-auto mb-6"></div>
              <div className="flex flex-wrap gap-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase self-center mr-2">Filtros activos:</span>
                {searchTerm && (
                  <Badge variant="secondary" className="bg-secondary/10 text-secondary border-none rounded-lg px-3 py-1 flex items-center gap-1">
                    &quot;{searchTerm}&quot; <X size={12} className="cursor-pointer" onClick={() => setSearchTerm("")} />
                  </Badge>
                )}
                {!initialArea && selectedArea !== "Todas" && (
                  <Badge variant="secondary" className="bg-secondary/10 text-secondary border-none rounded-lg px-3 py-1 flex items-center gap-1">
                    {selectedArea} <X size={12} className="cursor-pointer" onClick={() => setSelectedArea("Todas")} />
                  </Badge>
                )}
                {selectedSucursal !== "Todas" && (
                  <Badge variant="secondary" className="bg-secondary/10 text-secondary border-none rounded-lg px-3 py-1 flex items-center gap-1">
                    {selectedSucursal} <X size={12} className="cursor-pointer" onClick={() => setSelectedSucursal("Todas")} />
                  </Badge>
                )}
                {selectedAgeGroup !== "Todas" && (
                  <Badge variant="secondary" className="bg-secondary/10 text-secondary border-none rounded-lg px-3 py-1 flex items-center gap-1">
                    {selectedAgeGroup} <X size={12} className="cursor-pointer" onClick={() => setSelectedAgeGroup("Todas")} />
                  </Badge>
                )}
                {selectedSpecialty !== "Todas" && (
                  <Badge variant="secondary" className="bg-secondary/10 text-secondary border-none rounded-lg px-3 py-1 flex items-center gap-1">
                    {selectedSpecialty} <X size={12} className="cursor-pointer" onClick={() => setSelectedSpecialty("Todas")} />
                  </Badge>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-[10px] font-black uppercase tracking-widest text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 transition-colors flex items-center gap-1.5"
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedArea(initialArea || "Todas");
                    setSelectedSpecialty("Todas");
                    setSelectedSucursal("Todas");
                  }}
                >
                  <X size={12} className="shrink-0" />
                  Limpiar Todo
                </Button>
              </div>
            </div>
          )}

          {/* Descripción de Especialidad Escogida (Solo Desktop) - AHORA DENTRO DEL FILTRO */}
          {selectedSpecialty !== "Todas" && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="hidden md:block mt-6 pt-6 border-t border-slate-100 dark:border-white/5 transition-all"
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
        </div>



        {/* Grid de Profesionales */}
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
            className="text-center py-24 bg-white dark:bg-slate-900 rounded-[3rem] border border-dashed border-slate-200 dark:border-slate-800"
          >
            <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <Filter className="text-slate-300 dark:text-slate-500" size={32} />
            </div>
            <h3 className="text-xl font-bold text-primary dark:text-white mb-2">No encontramos resultados</h3>
            <p className="text-slate-500 dark:text-slate-400 font-medium">Intenta ajustando los filtros o el término de búsqueda.</p>
            <Button
              variant="outline"
              className="mt-8 rounded-full border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
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
      <div className="group h-full border border-slate-200/80 dark:border-slate-800 hover:border-secondary/30 dark:hover:border-secondary/30 shadow-md shadow-slate-200/30 dark:shadow-none hover:shadow-2xl hover:shadow-secondary/10 dark:hover:shadow-secondary/20 transition-all duration-500 rounded-[3rem] overflow-hidden bg-white dark:bg-slate-900 flex flex-col">
        <div className="p-0 flex flex-col h-full">
          {/* Área de Imagen - Avatar Circular Centrado */}
          <div className="pt-12 pb-6 flex justify-center">
            <div className="relative w-40 h-40 bg-slate-50 dark:bg-slate-950 rounded-full overflow-hidden border-4 border-white dark:border-slate-800 shadow-lg group-hover:scale-105 transition-transform duration-500">
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
            <h3 className="text-xl font-bold text-primary dark:text-slate-50 mb-3 leading-tight group-hover:text-secondary dark:group-hover:text-secondary transition-colors w-full px-4">
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
                <div className="flex flex-wrap justify-center gap-1 mt-2 pt-2 border-t border-slate-100 dark:border-white/10 w-full">
                  {pro.ageGroup.split(',').map(s => s.replace(/\./g, '').trim()).filter(Boolean).map((age, i) => (
                    <span key={i} className="text-[8px] font-black tracking-wider uppercase bg-secondary/10 text-secondary px-2 py-0.5 rounded-md">
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
              className="relative inline-flex w-full max-w-[230px] cursor-pointer select-none group/agendadirect outline-none no-underline h-12 items-center"
            >
              <div className="bg-gradient-to-r from-primary to-[#1e3a8a] text-white w-full px-6 h-full flex items-center justify-center rounded-full text-[9px] font-black tracking-[0.15em] uppercase shadow-lg shadow-primary/20 dark:shadow-primary/10 transition-all duration-500 transform group-hover/agendadirect:-translate-y-1 group-active/agendadirect:scale-95 relative z-10 whitespace-nowrap">
                Agendar Hora
              </div>
              <div className="absolute -top-1.5 -right-1.5 w-8 h-8 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center text-secondary shadow-xl transition-all duration-500 transform group-hover/agendadirect:-translate-y-1.5 group-hover/agendadirect:rotate-[-12deg] group-hover/agendadirect:scale-110 group-active/agendadirect:scale-95 z-20 border-4 border-slate-50 dark:border-slate-900">
                <CalendarDays className="w-3.5 h-3.5" strokeWidth={3} />
              </div>
            </a>

            <Dialog onOpenChange={(open) => !open && setShowSpecInfo(false)}>
              <DialogTrigger asChild>
                <button className="relative inline-flex w-full max-w-[230px] cursor-pointer select-none group/profbtn outline-none border-none bg-transparent h-12 items-center">
                  {/* Cuerpo del Botón Secundario */}
                  <div className="bg-white dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700 text-slate-600 dark:text-slate-300 w-full px-6 h-full flex items-center justify-center rounded-full text-[9px] font-black tracking-[0.15em] uppercase shadow-sm shadow-slate-200/30 dark:shadow-none transition-all duration-500 transform group-hover/profbtn:-translate-y-1 group-hover/profbtn:border-secondary/50 group-hover/profbtn:text-primary dark:group-hover/profbtn:text-white group-hover/profbtn:shadow-lg dark:group-hover/profbtn:shadow-none group-active/profbtn:scale-95 relative z-10 whitespace-nowrap">
                    Ver Perfil Completo
                  </div>

                  {/* Icono Badge Flotante Secundario */}
                  <div className="absolute -top-1.5 -right-1.5 w-8 h-8 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center text-slate-500 dark:text-slate-300 shadow-sm transition-all duration-500 transform group-hover/profbtn:-translate-y-1.5 group-active/profbtn:scale-95 z-20 border-4 border-white dark:border-slate-900">
                    <Search className="w-3 h-3" strokeWidth={3.5} />
                  </div>
                </button>
              </DialogTrigger>
              <DialogContent showCloseButton={false} className="w-[95vw] max-w-[500px] md:max-w-[800px] max-h-[85vh] flex flex-col md:flex-row rounded-[2rem] border-none p-0 overflow-hidden gap-0 bg-white dark:bg-slate-900">
                {/* Lado Izquierdo: Avatar e Información Básica (Fondo Azul) */}
                <div className="w-full md:w-[35%] bg-primary p-6 md:p-8 text-white relative shrink-0 flex flex-col items-center justify-center text-center border-b md:border-b-0 md:border-r border-white/10">
                  <div className="relative w-20 h-20 sm:w-28 h-28 md:w-36 md:h-36 bg-white/10 rounded-full flex items-center justify-center mb-4 overflow-hidden border-4 border-white/20 shadow-2xl">
                    {proImage ? (
                      <Image
                        src={proImage}
                        alt={pro.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 112px, 144px"
                      />
                    ) : (
                      <User size={50} className="text-secondary" />
                    )}
                  </div>

                  <DialogHeader className="text-center w-full mb-4">
                    <DialogTitle className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight leading-tight mb-1">{pro.name}</DialogTitle>
                    <div className="text-secondary font-bold text-[10px] md:text-xs uppercase tracking-widest opacity-90">{pro.area}</div>
                  </DialogHeader>

                  {/* Categoría y Especialidad */}
                  <div className="flex flex-col items-center gap-3 w-full mt-auto pt-6 border-t border-white/10">
                    <span className="hidden sm:block text-[9px] font-black uppercase tracking-[0.2em] text-white/40">Categoría</span>
                    <div className="flex flex-col items-center gap-2">
                      <div className="flex flex-col items-center">
                        <button
                          onClick={() => setShowSpecInfo(!showSpecInfo)}
                          className={`group/specbtn inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border-none transition-all duration-300 relative ${showSpecInfo
                            ? 'bg-white text-primary shadow-xl scale-105'
                            : 'bg-secondary text-primary font-bold shadow-lg shadow-secondary/20 hover:scale-105'
                            }`}
                        >
                          <SpecIcon size={11} strokeWidth={2.5} className={showSpecInfo ? 'text-secondary' : ''} />
                          <span className="text-[9px] font-bold uppercase tracking-widest">{pro.specialty}</span>
                          <ChevronRight size={11} className={`ml-1 transition-transform duration-300 ${showSpecInfo ? 'rotate-180 text-secondary' : 'group-hover/specbtn:translate-x-0.5'}`} />
                        </button>
                        {!showSpecInfo && (
                          <span className="text-[7.5px] font-bold text-secondary/90 tracking-[0.15em] uppercase mt-1.5 animate-pulse">
                            Clic para ver detalle
                          </span>
                        )}
                      </div>
                      <Badge variant="outline" className="text-white border-white/20 text-[9px] py-1 px-3 rounded-full backdrop-blur-sm">
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
                              <h3 className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">Áreas de enfoque principal</h3>
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
                            <div className="flex flex-col items-center md:items-start gap-2 pt-4 border-t border-slate-100 dark:border-slate-800 w-full">
                              <span className="hidden sm:block text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">Edades de atención</span>
                              <div className="flex flex-wrap justify-center md:justify-start gap-1.5">
                                {pro.ageGroup.split(',').map(s => s.replace(/\./g, '').trim()).filter(Boolean).map((age, i) => (
                                  <span key={i} className="text-[8px] font-bold tracking-tight bg-secondary/10 text-secondary px-2.5 py-1 rounded-lg border border-secondary/10 whitespace-nowrap">
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
                          className="relative inline-flex w-full cursor-pointer select-none group no-underline h-12 md:h-14 items-center"
                        >
                          <div className="bg-gradient-to-r from-primary to-[#1e3a8a] text-white w-full px-6 h-full flex items-center justify-center rounded-full text-xs md:text-sm font-black tracking-tight shadow-xl shadow-primary/20 transition-all duration-500 transform group-hover:-translate-y-1 group-active:scale-95 relative z-10 whitespace-nowrap">
                            Agendar Hora con {firstName}
                          </div>
                          <div className="absolute -top-1 -right-1 w-8 h-8 md:w-10 md:h-10 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center text-secondary shadow-xl transition-all duration-500 transform group-hover:-translate-y-1.5 group-hover:rotate-[-15deg] group-hover:scale-110 group-active:scale-95 z-20 border-4 border-slate-50 dark:border-slate-900">
                            <CalendarDays className="w-3.5 h-3.5 md:w-4 md:h-4" strokeWidth={3} />
                          </div>
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
