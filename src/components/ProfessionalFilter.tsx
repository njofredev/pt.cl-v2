"use client";

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, User, ChevronRight, Filter, X, Info, GraduationCap, MapPin } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { AREAS, Area, Professional } from '@/data/professionals';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export const ProfessionalFilter = ({ initialArea, professionals }: { initialArea?: Area, professionals: Professional[] }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedArea, setSelectedArea] = useState<Area | "Todas">(initialArea || "Todas");
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("Todas");

  const specialties = useMemo(() => {
    const relevantPros = selectedArea === "Todas" 
      ? professionals 
      : professionals.filter(p => p.area === selectedArea);
    
    const uniqueSpecialties = Array.from(new Set(relevantPros.map(p => p.specialty)));
    return ["Todas", ...uniqueSpecialties.sort()];
  }, [selectedArea]);

  const filteredProfessionals = useMemo(() => {
    return professionals.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           p.specialty.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesArea = selectedArea === "Todas" || p.area === selectedArea;
      const matchesSpecialty = selectedSpecialty === "Todas" || p.specialty === selectedSpecialty;
      
      return matchesSearch && matchesArea && matchesSpecialty;
    });
  }, [searchTerm, selectedArea, selectedSpecialty]);

  const areaLabel = useMemo(() => {
    if (!initialArea) return "Médico";
    switch (initialArea) {
      case "Salud Dental": return "Dental";
      case "Salud Mental": return "Mental";
      case "Medicina General": return "Médico";
      case "Terapias Alternativas": return "de Terapias";
      default: return "Especialista";
    }
  }, [initialArea]);

  return (
    <section id="buscador-profesionales" className="py-24 bg-slate-50/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-primary tracking-tighter mb-4">
            Nuestro Equipo <span className="text-secondary">{areaLabel}</span>
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto font-medium">
            Encuentra al especialista adecuado para tu cuidado entre más de 60 profesionales de la salud.
          </p>
        </div>

        {/* Barra de Filtros */}
        <div className="bg-white p-6 rounded-[2rem] shadow-xl shadow-primary/5 border border-slate-100 mb-12">
          <div className={`grid gap-6 items-end ${initialArea ? 'lg:grid-cols-3' : 'lg:grid-cols-4'}`}>
            <div className={`${initialArea ? 'lg:col-span-1' : 'lg:col-span-2'} space-y-2`}>
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-2">Buscar Profesional o Especialidad</label>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <Input 
                  placeholder="Ej: Patricia Montalva o Odontología..." 
                  className="pl-12 h-14 rounded-2xl border-slate-100 bg-slate-50 focus:bg-white focus:ring-secondary/20 transition-all text-base font-medium"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {!initialArea && (
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-2">Área</label>
                <select 
                  className="w-full h-14 rounded-2xl border-slate-100 bg-slate-50 px-4 text-primary font-bold focus:outline-none focus:ring-2 focus:ring-secondary/20 appearance-none cursor-pointer"
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
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-2">Especialidad</label>
              <select 
                className="w-full h-14 rounded-2xl border-slate-100 bg-slate-50 px-4 text-primary font-bold focus:outline-none focus:ring-2 focus:ring-secondary/20 appearance-none cursor-pointer"
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

          {(searchTerm || (!initialArea && selectedArea !== "Todas") || selectedSpecialty !== "Todas") && (
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
            {filteredProfessionals.map((pro, idx) => (
              <motion.div
                key={`${pro.name}-${pro.specialty}`}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2, delay: idx * 0.01 }}
              >
                <Card className="group h-full border-slate-100 hover:border-secondary/30 hover:shadow-xl hover:shadow-secondary/5 transition-all duration-300 rounded-[2rem] overflow-hidden bg-white">
                  <CardContent className="p-0 flex flex-col h-full">
                    <div className="p-8 flex-grow">
                      <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-secondary/10 transition-colors">
                        <User className="text-slate-300 group-hover:text-secondary transition-colors" size={32} />
                      </div>
                      <h3 className="text-lg font-bold text-primary mb-1 leading-tight">{pro.name}</h3>
                      <div className="flex flex-col gap-2 mt-4">
                        <Badge variant="outline" className="w-fit border-slate-100 text-slate-500 font-bold rounded-lg px-2 py-0.5 text-[10px]">
                          {pro.specialty}
                        </Badge>
                        <span className="text-[10px] font-bold text-secondary uppercase tracking-[0.2em]">{pro.area}</span>
                      </div>
                    </div>
                    
                    <Dialog>
                      <DialogTrigger asChild>
                        <button className="w-full bg-slate-50 p-4 flex justify-between items-center group-hover:bg-primary transition-colors text-left cursor-pointer border-t border-slate-100">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest group-hover:text-white/80">Ver Perfil Profesional</span>
                          <ChevronRight size={16} className="text-slate-300 group-hover:text-white group-hover:translate-x-1 transition-all" />
                        </button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[500px] rounded-[2.5rem] border-none p-0 overflow-hidden gap-0 bg-white">
                        <div className="bg-primary p-8 text-white">
                          <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center mb-6">
                            <User size={40} className="text-secondary" />
                          </div>
                          <DialogHeader>
                            <DialogTitle className="text-3xl font-bold tracking-tighter leading-none mb-2">{pro.name}</DialogTitle>
                            <div className="flex gap-2">
                              <Badge className="bg-secondary text-primary font-bold">{pro.specialty}</Badge>
                              <Badge variant="outline" className="text-white border-white/20">{pro.area}</Badge>
                            </div>
                          </DialogHeader>
                        </div>
                        <div className="bg-white p-8 space-y-6 max-h-[60vh] overflow-y-auto">
                          {pro.description && (
                            <div className="space-y-2">
                              <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
                                <Info size={14} className="text-secondary" /> Perfil
                              </h4>
                              <p className="text-slate-600 font-medium leading-relaxed">{pro.description}</p>
                            </div>
                          )}
                          {pro.education && (
                            <div className="space-y-2">
                              <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
                                <GraduationCap size={14} className="text-secondary" /> Formación Académica
                              </h4>
                              <p className="text-slate-600 font-medium leading-relaxed">{pro.education}</p>
                            </div>
                          )}
                          {pro.sucursal && (
                            <div className="space-y-2">
                              <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
                                <MapPin size={14} className="text-secondary" /> Ubicación
                              </h4>
                              <p className="text-slate-600 font-medium leading-relaxed">{pro.sucursal}</p>
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
            ))}
          </AnimatePresence>
        </div>

        {filteredProfessionals.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            className="text-center py-24 bg-white rounded-[3rem] border border-dashed border-slate-200"
          >
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Filter className="text-slate-300" size={32} />
            </div>
            <h3 className="text-xl font-bold text-primary mb-2">No encontramos resultados</h3>
            <p className="text-slate-500 font-medium">Intenta ajustando los filtros o el término de búsqueda.</p>
            <Button 
              variant="outline" 
              className="mt-8 rounded-full border-slate-200"
              onClick={() => {
                setSearchTerm("");
                setSelectedArea("Todas");
                setSelectedSpecialty("Todas");
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
