"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, User, ChevronRight, ChevronDown, Filter, X, Info, GraduationCap, MapPin, Sparkles, SmilePlus, Brain, Stethoscope, Leaf, CalendarDays, Video } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { AREAS, Area, Professional } from '@/data/professionals';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import Image from 'next/image';
import { Activity, Bone, Scissors, Ear, Smile, Users, ShieldAlert, Pill, Footprints, Baby, Syringe, ShieldPlus, Hand, Zap } from 'lucide-react';

// Base de datos visual de descripciones e iconos para especialidades por área
const SPECIALTY_METADATA: Record<string, { description: string, icon: any }> = {
  // Salud Dental
  'Odontología General': { description: "Diagnóstico integral y prevención para mantener tu sonrisa sana todos los días.", icon: Smile },
  'Implantología': { description: "Restauración permanente de piezas dentales con prótesis seguras sobre implantes.", icon: Sparkles },
  'Ortodoncia': { description: "Alineación dental y corrección de mordida para una estética y funcionalidad perfecta.", icon: SmilePlus },
  'Endodoncia': { description: "Tratamiento especializado del conducto para salvar piezas dentales dañadas.", icon: Pill },
  'Periodoncia': { description: "Cuidado, tratamiento y prevención de enfermedades en las encías y tejidos.", icon: Activity },
  'Rehabilitación Oral': { description: "Recuperación estética y funcional de la boca mediante prótesis avanzadas.", icon: ShieldPlus },
  'Odontopediatría': { description: "Atención odontológica delicada y enfocada en la salud bucal de los niños.", icon: Baby },
  'Trastornos Temporomandibulares': { description: "Diagnóstico y alivio del dolor de la articulación mandibular y el bruxismo.", icon: ShieldAlert },
  'Radiología': { description: "Diagnóstico por imagen de alta precisión para guiar tus tratamientos.", icon: Search },
  'Cirugía, Implantología': { description: "Intervenciones quirúrgicas maxilofaciales y colocación de implantes.", icon: Scissors },
  
  // Salud Mental
  'Psicología': { description: "Acompañamiento terapéutico para gestionar tus emociones y potenciar tu bienestar.", icon: Brain },
  'Psiquiatría': { description: "Diagnóstico médico especializado y tratamiento farmacológico de la salud mental.", icon: Pill },
  'Psicopedagogía': { description: "Orientación y potenciación de los procesos de aprendizaje infantil y juvenil.", icon: Users },
  'Fonoaudiología': { description: "Terapia integral en la comunicación, el lenguaje, el habla y la deglución.", icon: Ear },

  // Medicina General
  'Medicina': { description: "Atención médica primaria de confianza, chequeos y derivaciones preventivas.", icon: Stethoscope },
  'Pediatría': { description: "Cuidado integral y seguimiento del crecimiento de los más pequeños.", icon: Baby },
  'Kinesiología': { description: "Rehabilitación física motora, respiratoria y recuperación muscular integral.", icon: Activity },
  'Enfermería': { description: "Atención clínica, administración de tratamientos y curaciones ambulatorias.", icon: Syringe },
  'Podología': { description: "Cuidado profesional y tratamiento preventivo para la salud de tus pies.", icon: Footprints },

  // Terapias
  'Masoterapia': { description: "Técnicas manuales enfocadas en aliviar contracturas, tensiones y relajar el cuerpo.", icon: Hand },
  'Biomagnetismo': { description: "Terapia alternativa con imanes para equilibrar la energía del organismo.", icon: Zap },
};

const CustomSelect = ({ 
  value, 
  onChange, 
  options, 
  placeholder 
}: { 
  value: string, 
  onChange: (val: string) => void, 
  options: {label: string, value: string}[],
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
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors mb-0.5 last:mb-0 cursor-pointer ${
                  value === opt.value 
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

export const ProfessionalFilter = ({ initialArea, professionals }: { initialArea?: Area, professionals: Professional[] }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedArea, setSelectedArea] = useState<Area | "Todas">(initialArea || "Todas");
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("Todas");
  const [selectedSucursal, setSelectedSucursal] = useState<string>("Todas");
  const [shuffledProfessionals, setShuffledProfessionals] = useState<Professional[]>([]);

  useEffect(() => {
    // Barajar aleatoriamente los profesionales al cargar en el cliente (evita Hydration Mismatch)
    const shuffled = [...professionals].sort(() => Math.random() - 0.5);
    setShuffledProfessionals(shuffled);
  }, [professionals]);

  const activeProfessionals = shuffledProfessionals.length > 0 ? shuffledProfessionals : professionals;

  const sucursales = ["Todas", "Los Tribunales", "Vitacura"];

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
      
      return matchesSearch && matchesArea && matchesSpecialty && matchesSucursal;
    });
  }, [searchTerm, selectedArea, selectedSpecialty, selectedSucursal, activeProfessionals]);

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
      case "Salud Dental": return "Dental";
      case "Salud Mental": return "Mental";
      case "Medicina General": return "Médico";
      case "Terapias Complementarias": return "de Terapias";
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
          <div className="-mt-8 relative z-10 mb-16 border-b border-slate-100 dark:border-white/5 pb-16">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-slate-100 dark:bg-white/5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 mb-6 ml-1 border border-slate-200 dark:border-white/5 shadow-sm">
              Nuestras Especialidades
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
              {specialtiesForGrid.map((item, idx) => {
                const Icon = item.Icon;
                const isSelected = selectedSpecialty === item.name;
                
                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.03 }}
                    onClick={() => handleSpecialtyClick(item.name)}
                    className={`group cursor-pointer relative p-3 sm:p-4 rounded-xl sm:rounded-2xl border transition-all duration-300 flex flex-col h-full hover:-translate-y-0.5 ${
                      isSelected 
                        ? 'bg-primary text-white border-primary shadow-lg shadow-primary/10' 
                        : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 hover:shadow-md hover:border-secondary/40 shadow-sm dark:shadow-none'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-0 sm:mb-2.5">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                        isSelected ? 'bg-white/10 text-secondary' : 'bg-secondary/10 text-secondary group-hover:bg-secondary group-hover:text-white'
                      }`}>
                        <Icon size={16} strokeWidth={2} />
                      </div>
                      <h4 className={`font-bold text-[13px] sm:text-sm leading-tight tracking-tight ${isSelected ? 'text-white' : 'text-slate-900 dark:text-white group-hover:text-secondary'}`}>
                        {item.name}
                      </h4>
                    </div>
                    <p className={`text-[11px] leading-relaxed font-medium hidden sm:line-clamp-2 ${isSelected ? 'text-white/80' : 'text-slate-500 dark:text-slate-400'}`}>
                      {item.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        <div id="equipo" className="scroll-mt-32 text-center mb-10 flex flex-col items-center">
          {AreaIcon && (
            <div className="w-16 h-16 rounded-full bg-white dark:bg-slate-900 shadow-xl shadow-primary/5 dark:shadow-none border border-slate-100 dark:border-slate-800 flex items-center justify-center mb-6 transform hover:scale-110 transition-all duration-500">
              {AreaIcon}
            </div>
          )}
          <h2 className="text-3xl md:text-5xl font-bold text-primary dark:text-slate-50 tracking-tighter mb-4">
            Nuestro Equipo <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-teal-500 to-secondary">{areaLabel}</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-medium">
            Encuentra al especialista adecuado para tu cuidado entre más de 60 profesionales de la salud.
          </p>
        </div>

        {/* Barra de Filtros */}
        <div id="controles-filtro" className="scroll-mt-32 bg-white dark:bg-slate-900 p-6 rounded-[2rem] shadow-xl shadow-primary/5 dark:shadow-none border border-slate-100 dark:border-slate-800 mb-12">
          <div className={`grid gap-6 items-end ${initialArea ? 'lg:grid-cols-3' : 'lg:grid-cols-4'}`}>
            <div className="lg:col-span-1 space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-2">Buscar Profesional o Especialidad</label>
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
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-2">Área</label>
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
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-2">Sucursal</label>
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
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-2">Especialidad</label>
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

          {(searchTerm || (!initialArea && selectedArea !== "Todas") || selectedSpecialty !== "Todas" || selectedSucursal !== "Todas") && (
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
        </div>

        {/* Grid de Profesionales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence mode='popLayout'>
            {filteredProfessionals.map((pro, idx) => {
              // Mapeo directo para asegurar que la imagen aparezca en las pruebas
              const proImage = pro.image;
              const lowerSuc = pro.sucursal?.toLowerCase() || "";
              const isVitacura = lowerSuc.includes("vitacura");
              const isTribunales = lowerSuc.includes("tribunales") || lowerSuc.includes("matriz") || lowerSuc.includes("matríz");
              const hasTele = lowerSuc.includes("teleconsulta");
              
              const specInfo = SPECIALTY_METADATA[pro.specialty] || { icon: Activity };
              const SpecIcon = specInfo.icon;
              
              return (
                <motion.div
                  key={`${pro.name}-${pro.specialty}`}
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
                          <div className="absolute -top-1.5 -right-1.5 w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-primary shadow-lg transition-all duration-500 transform group-hover/agendadirect:-translate-y-1.5 group-hover/agendadirect:rotate-[-12deg] group-hover/agendadirect:scale-110 group-active/agendadirect:scale-95 z-20 border-4 border-white dark:border-slate-900">
                            <CalendarDays className="w-3 h-3" strokeWidth={3.5} />
                          </div>
                        </a>

                        <Dialog>
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
                        <DialogContent showCloseButton={false} className="sm:max-w-[500px] rounded-[2.5rem] border-none p-0 overflow-hidden gap-0 bg-white dark:bg-slate-900">
                          <div className="bg-primary p-8 text-white relative">
                            <DialogClose className="absolute top-6 right-6 p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all outline-none group cursor-pointer">
                              <X className="w-6 h-6" />
                            </DialogClose>
                            <div className="relative w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mb-6 overflow-hidden mx-auto border-2 border-white/20">
                              {proImage ? (
                                <Image 
                                  src={proImage} 
                                  alt={pro.name} 
                                  fill
                                  className="object-cover"
                                  sizes="96px"
                                />
                              ) : (
                                <User size={48} className="text-secondary" />
                              )}
                            </div>
                            <DialogHeader className="text-center">
                              <DialogTitle className="text-2xl sm:text-3xl font-bold tracking-tight leading-[1.2] mb-3 text-center w-full px-2">{pro.name}</DialogTitle>
                              <div className="flex gap-2 justify-center">
                                <Badge className="bg-secondary text-primary font-bold flex items-center gap-1">
                                  <SpecIcon size={12} strokeWidth={2.5} />
                                  {pro.specialty}
                                </Badge>
                                <Badge variant="outline" className="text-white border-white/20">{pro.area}</Badge>
                              </div>
                              <div className="flex gap-1.5 justify-center mt-2">
                                {isTribunales && (
                                  <Badge variant="secondary" className="bg-white/10 text-white hover:bg-white/20 border-none flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider">
                                    <MapPin size={10} className="opacity-70 text-teal-300" /> Los Tribunales
                                  </Badge>
                                )}
                                {isVitacura && (
                                  <Badge variant="secondary" className="bg-white/10 text-white hover:bg-white/20 border-none flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider">
                                    <MapPin size={10} className="opacity-70 text-secondary" /> Vitacura
                                  </Badge>
                                )}
                                {hasTele && (
                                  <Badge variant="secondary" className="bg-indigo-500/30 text-indigo-50 hover:bg-indigo-500/40 border-none flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider">
                                    <Video size={10} className="opacity-70" /> Teleconsulta
                                  </Badge>
                                )}
                              </div>
                              {pro.ageGroup && (
                                <div className="flex flex-wrap justify-center gap-1.5 mt-4">
                                  {pro.ageGroup.split(',').map(s => s.replace(/\./g, '').trim()).filter(Boolean).map((age, i) => (
                                    <span key={i} className="text-[9px] font-black tracking-widest uppercase bg-white/10 text-white/90 px-2.5 py-1 rounded-lg border border-white/5 backdrop-blur-sm">
                                      {age}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </DialogHeader>
                          </div>
                          <div className="bg-white dark:bg-slate-900 p-8 space-y-6 max-h-[60vh] overflow-y-auto">
                            {pro.description && (
                              <div className="space-y-2">
                                <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 flex items-center gap-2">
                                  <Info size={14} className="text-secondary" /> Perfil
                                </h4>
                                <p className="text-slate-600 dark:text-slate-300 font-medium leading-relaxed">{pro.description}</p>
                              </div>
                            )}
                            {pro.education && (
                              <div className="space-y-2">
                                <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 flex items-center gap-2">
                                  <GraduationCap size={14} className="text-secondary" /> Formación Académica
                                </h4>
                                <p className="text-slate-600 dark:text-slate-300 font-medium leading-relaxed">{pro.education}</p>
                              </div>
                            )}
                            {pro.sucursal && (
                              <div className="space-y-2">
                                <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 flex items-center gap-2">
                                  <MapPin size={14} className="text-secondary" /> Ubicación
                                </h4>
                                <p className="text-slate-600 dark:text-slate-300 font-medium leading-relaxed">{pro.sucursal}</p>
                              </div>
                            )}
                            
                            {/* Helper to get first name */}
                            {(() => {
                              const firstName = pro.name.split(' ').filter(p => !p.includes('.')).filter(p => p.length > 0)[0] || pro.name.split(' ')[0];
                              return (
                                <a 
                                  href={pro.bookingLink || "tel:+56222172635"}
                                  target={pro.bookingLink?.startsWith('http') ? "_blank" : undefined}
                                  rel={pro.bookingLink?.startsWith('http') ? "noopener noreferrer" : undefined}
                                  className="relative inline-flex w-full cursor-pointer select-none group pt-2 no-underline"
                                >
                                  {/* Cuerpo del Botón con Degradado */}
                                  <div className="bg-gradient-to-r from-primary to-[#1e3a8a] text-white w-full px-8 h-16 flex items-center justify-center rounded-full text-base sm:text-lg font-black tracking-tight shadow-xl shadow-primary/20 dark:shadow-primary/20 transition-all duration-500 transform group-hover:-translate-y-1 group-active:scale-95 relative z-10 whitespace-nowrap">
                                    Agendar Hora con {firstName}
                                  </div>
                                  
                                  {/* Icono Badge Flotante */}
                                  <div className="absolute top-0 -right-1 sm:-right-2 w-11 h-11 bg-secondary rounded-full flex items-center justify-center text-primary shadow-lg transition-all duration-500 transform group-hover:-translate-y-1 group-hover:rotate-[-15deg] group-hover:scale-110 group-active:scale-95 z-20 border-4 border-white dark:border-slate-900">
                                    <CalendarDays className="w-4 h-4" strokeWidth={3} />
                                  </div>
                                </a>
                              );
                            })()}
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
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
