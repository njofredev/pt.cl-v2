"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, User, ChevronRight, Filter, X, Info, GraduationCap, MapPin, Sparkles, SmilePlus, Brain, Stethoscope, Leaf } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { AREAS, Area, Professional } from '@/data/professionals';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Image from 'next/image';

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
    <section id="buscador-profesionales" className="py-24 bg-slate-50/50 dark:bg-slate-950 transition-colors">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 flex flex-col items-center">
          {AreaIcon && (
            <div className="w-16 h-16 rounded-full bg-white dark:bg-slate-900 shadow-xl shadow-primary/5 dark:shadow-none border border-slate-100 dark:border-slate-800 flex items-center justify-center mb-6 transform hover:scale-110 transition-all duration-500">
              {AreaIcon}
            </div>
          )}
          <h2 className="text-3xl md:text-5xl font-bold text-primary dark:text-slate-50 tracking-tighter mb-4">
            Nuestro Equipo <span className="text-secondary">{areaLabel}</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-medium">
            Encuentra al especialista adecuado para tu cuidado entre más de 60 profesionales de la salud.
          </p>
        </div>

        {/* Barra de Filtros */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] shadow-xl shadow-primary/5 dark:shadow-none border border-slate-100 dark:border-slate-800 mb-12">
          <div className={`grid gap-6 items-end ${initialArea ? 'lg:grid-cols-3' : 'lg:grid-cols-4'}`}>
            <div className="lg:col-span-1 space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-2">Buscar Profesional o Especialidad</label>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <Input 
                  placeholder="Ej: Patricia Montalva o Odontología..." 
                  className="pl-12 h-14 rounded-2xl border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:bg-white dark:focus:bg-slate-950 focus:ring-secondary/20 dark:text-slate-100 transition-all text-base font-medium"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {!initialArea && (
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-2">Área</label>
                <select 
                  className="w-full h-14 rounded-2xl border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-4 text-primary dark:text-slate-100 font-bold focus:outline-none focus:ring-2 focus:ring-secondary/20 appearance-none cursor-pointer"
                  value={selectedArea}
                  onChange={(e) => {
                    setSelectedArea(e.target.value as Area | "Todas");
                    setSelectedSpecialty("Todas");
                  }}
                >
                  <option value="Todas">Todas las Áreas</option>
                  {AREAS.map(area => (
                    <option key={area} value={area}>{area}</option>
                  ))}
                </select>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-2">Sucursal</label>
              <select 
                className="w-full h-14 rounded-2xl border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-4 text-primary dark:text-slate-100 font-bold focus:outline-none focus:ring-2 focus:ring-secondary/20 appearance-none cursor-pointer"
                value={selectedSucursal}
                onChange={(e) => setSelectedSucursal(e.target.value)}
              >
                {sucursales.map(suc => (
                  <option key={suc} value={suc}>
                    {suc === "Todas" ? "Todas las Sucursales" : suc}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-2">Especialidad</label>
              <select 
                className="w-full h-14 rounded-2xl border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-4 text-primary dark:text-slate-100 font-bold focus:outline-none focus:ring-2 focus:ring-secondary/20 appearance-none cursor-pointer"
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                disabled={specialties.length <= 1}
              >
                {specialties.map(spec => (
                  <option key={spec} value={spec}>{spec}</option>
                ))}
              </select>
            </div>
          </div>

          {(searchTerm || (!initialArea && selectedArea !== "Todas") || selectedSpecialty !== "Todas" || selectedSucursal !== "Todas") && (
            <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-slate-100">
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
                className="text-[10px] font-bold uppercase tracking-widest hover:bg-transparent hover:text-red-500 transition-colors"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedArea(initialArea || "Todas");
                  setSelectedSpecialty("Todas");
                  setSelectedSucursal("Todas");
                }}
              >
                Limpiar Todo
              </Button>
            </div>
          )}
        </div>

        {/* Grid de Profesionales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence mode='popLayout'>
            {filteredProfessionals.map((pro, idx) => {
              // Mapeo directo para asegurar que la imagen aparezca en las pruebas
              const proImage = pro.image || (pro.name.toLowerCase().includes("andro") && pro.name.toLowerCase().includes("sapunar") ? "/img_profesionales/perfilAndroSapunar.jpg" : null);
              
              return (
                <motion.div
                  key={`${pro.name}-${pro.specialty}`}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2, delay: idx * 0.01 }}
                >
                  <Card className="group h-full border-slate-100 dark:border-slate-800 hover:border-secondary/30 dark:hover:border-secondary/40 hover:shadow-2xl hover:shadow-secondary/10 transition-all duration-500 rounded-[3rem] overflow-hidden bg-white dark:bg-slate-900 flex flex-col">
                    <CardContent className="p-0 flex flex-col h-full">
                      {/* Área de Imagen - Avatar Circular Centrado */}
                      <div className="pt-12 pb-6 flex justify-center">
                        <div className="relative w-40 h-40 bg-slate-50 dark:bg-slate-950 rounded-full overflow-hidden border-4 border-white dark:border-slate-800 shadow-lg group-hover:scale-105 transition-transform duration-500">
                          {proImage ? (
                            <Image 
                              src={proImage} 
                              alt={pro.name} 
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900">
                              <User className="text-slate-200 dark:text-slate-700" size={60} />
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="p-8 pt-2 flex-grow flex flex-col text-center">
                        <h3 className="text-xl font-bold text-primary dark:text-slate-50 mb-3 leading-tight group-hover:text-secondary transition-colors">
                          {pro.name}
                        </h3>
                        
                        <div className="flex flex-col items-center gap-3 mt-auto">
                          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-primary text-white text-[10px] font-bold uppercase tracking-widest shrink-0">
                            <Sparkles size={12} fill="currentColor" className="text-secondary shrink-0" /> {pro.specialty}
                          </div>
                          <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                            <MapPin size={12} className="text-secondary" />
                            {pro.sucursal?.split('(')[0] || "Sucursal Vitacura"}
                          </div>
                        </div>
                      </div>
                      
                      <Dialog>
                        <DialogTrigger asChild>
                          <button className="w-full bg-slate-50 dark:bg-slate-950 p-5 flex justify-between items-center group-hover:bg-primary transition-colors text-left cursor-pointer border-t border-slate-100 dark:border-slate-800">
                            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest group-hover:text-white/80">Ver Perfil Completo</span>
                            <ChevronRight size={16} className="text-slate-300 dark:text-slate-600 group-hover:text-white group-hover:translate-x-1 transition-all" />
                          </button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px] rounded-[2.5rem] border-none p-0 overflow-hidden gap-0 bg-white dark:bg-slate-900">
                          <div className="bg-primary p-8 text-white">
                            <div className="w-24 h-24 bg-white/10 rounded-3xl flex items-center justify-center mb-6 overflow-hidden mx-auto">
                              {proImage ? (
                                <Image 
                                  src={proImage} 
                                  alt={pro.name} 
                                  width={96} 
                                  height={96} 
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <User size={48} className="text-secondary" />
                              )}
                            </div>
                            <DialogHeader className="text-center">
                              <DialogTitle className="text-3xl font-bold tracking-tighter leading-none mb-2">{pro.name}</DialogTitle>
                              <div className="flex gap-2 justify-center">
                                <Badge className="bg-secondary text-primary font-bold">{pro.specialty}</Badge>
                                <Badge variant="outline" className="text-white border-white/20">{pro.area}</Badge>
                              </div>
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
                            <Button className="w-full bg-primary hover:bg-primary/90 text-white h-14 rounded-2xl font-bold shadow-xl shadow-primary/10">
                              Agendar Hora con Especialista
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </CardContent>
                  </Card>
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
