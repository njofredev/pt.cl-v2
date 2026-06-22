"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Calendar,
  ChevronDown,
  User,
  Building2,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Clock,
  UserCheck,
  CreditCard,
  CheckCircle2,
  MessageSquare,
  X
} from "lucide-react";

// Mock data structures
interface Service {
  id: string;
  name: string;
  category: "dental" | "mental" | "general" | "terapias";
  duration: string;
  price: string;
  description: string;
}

const SERVICES_DATA: Service[] = [
  { id: "dent-1", name: "Limpieza Dental (Profilaxis)", category: "dental", duration: "45 min", price: "$45.000", description: "Eliminación de sarro y pulido." },
  { id: "dent-2", name: "Diagnóstico y Presupuesto", category: "dental", duration: "30 min", price: "$15.000", description: "Revisión completa con cámara intraoral." },
  { id: "dent-3", name: "Ortodoncia (Evaluación)", category: "dental", duration: "30 min", price: "Gratis", description: "Estudio para frenillos o Invisalign." },
  { id: "ment-1", name: "Psicoterapia Adultos", category: "mental", duration: "60 min", price: "$40.000", description: "Sesión individual de psicología." },
  { id: "ment-2", name: "Consulta Psiquiatría", category: "mental", duration: "45 min", price: "$70.000", description: "Evaluación médica y farmacológica." },
  { id: "gen-1", name: "Consulta Medicina General", category: "general", duration: "20 min", price: "$25.000", description: "Medicina familiar y recetas." },
  { id: "gen-2", name: "Evaluación Kinesiología", category: "general", duration: "45 min", price: "$20.000", description: "Diagnóstico inicial terapia física." },
  { id: "ter-1", name: "Acupuntura Médica", category: "terapias", duration: "60 min", price: "$35.000", description: "Manejo del dolor y estrés con agujas." },
  { id: "ter-2", name: "Terapia Floral (Flores de Bach)", category: "terapias", duration: "45 min", price: "$25.000", description: "Esencias naturales para equilibrio emocional." }
];

interface Professional {
  id: string;
  dentalinkId?: number;
  name: string;
  specialty: string;
  avatar: string;
  category: "dental" | "mental" | "general" | "terapias";
  availableSlots: string[];
}

const PROFESSIONALS_DATA: Professional[] = [
  { id: "p-1", dentalinkId: 40, name: "Dra. Carolina Martínez", specialty: "Rehabilitación Oral", avatar: "👩‍⚕️", category: "dental", availableSlots: ["09:00", "11:30", "15:00"] },
  { id: "p-2", name: "Ps. Valentina Paz", specialty: "Ansiedad y Estrés", avatar: "👩‍💼", category: "mental", availableSlots: ["09:30", "11:00", "14:30"] },
  { id: "p-3", name: "Dr. Roberto Valdés", specialty: "Medicina Familiar", avatar: "👨‍⚕️", category: "general", availableSlots: ["08:30", "10:00", "11:45"] },
  { id: "p-4", name: "Terapeuta Ignacia Solar", specialty: "Acupuntura y Flores de Bach", avatar: "🌿", category: "terapias", availableSlots: ["10:00", "12:30", "15:30"] }
];

export function VanguardScheduler() {
  // Tab states
  const [patientType, setPatientType] = useState<"general" | "mivita">("general");
  
  // Selection states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [modality, setModality] = useState("");
  
  // Autocomplete states
  const [suggestions, setSuggestions] = useState<Service[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  // Expandable panel states
  const [isExpanded, setIsExpanded] = useState(false);
  const [panelStep, setPanelStep] = useState(1); // 1: Calendar & Doctor, 2: RUT Fast-Pass, 3: Simulated Checkout, 4: WhatsApp Confirmation

  // Detail booking states
  const [selectedDate, setSelectedDate] = useState("Hoy, 22 Jun");
  const [selectedProf, setSelectedProf] = useState<Professional | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  // RUT states
  const [rut, setRut] = useState("");
  const [patientInfo, setPatientInfo] = useState<{ name: string; email: string } | null>(null);

  // Loading/Transbank simulation states
  const [isPaying, setIsPaying] = useState(false);

  // State for Dentalink API fetching
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [dentalinkProfs, setDentalinkProfs] = useState<Professional[]>([]);
  const [apiError, setApiError] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  // Click outside to close suggestions
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Suggestions search logic
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSuggestions([]);
      return;
    }
    const query = searchQuery.toLowerCase();
    
    // Suggest services by matching name, description or keywords
    const matches = SERVICES_DATA.filter(s => {
      const matchName = s.name.toLowerCase().includes(query);
      const matchDesc = s.description.toLowerCase().includes(query);
      
      // Extended Virtual keyword mapping
      let matchKeyword = false;
      
      // Dental keywords mapping
      if (query.includes("diente") || query.includes("limpieza") || query.includes("muela") || 
          query.includes("carie") || query.includes("frenillo") || query.includes("bracket") || 
          query.includes("ortodoncia") || query.includes("blanquea") || query.includes("sensibil") ||
          query.includes("implante") || query.includes("corona") || query.includes("bruxis") ||
          query.includes("dentista") || query.includes("ttm") || query.includes("urgencia")) {
        matchKeyword = s.category === "dental";
      }
      
      // Mental keywords mapping
      if (query.includes("ansiedad") || query.includes("estres") || query.includes("estrés") || 
          query.includes("depre") || query.includes("angustia") || query.includes("psicolog") || 
          query.includes("psiquiatr") || query.includes("insomnio") || query.includes("pena") || 
          query.includes("fobia") || query.includes("aprendizaje") || query.includes("coaching") ||
          query.includes("duelo")) {
        matchKeyword = s.category === "mental";
      }
      
      // General keywords mapping
      if (query.includes("resfri") || query.includes("receta") || query.includes("licencia") || 
          query.includes("presion") || query.includes("curacion") || query.includes("podolog") || 
          query.includes("pie") || query.includes("uña") || query.includes("kinesiolog") || 
          query.includes("espalda") || query.includes("cuello") || query.includes("lumbar") || 
          query.includes("esguince") || query.includes("lesion") || query.includes("lesión") || 
          query.includes("hombro") || query.includes("rehabilitacion") || query.includes("rehabilitación")) {
        matchKeyword = s.category === "general";
      }
      
      // Terapias keywords mapping
      if (query.includes("acupuntura") || query.includes("reiki") || query.includes("flores") || 
          query.includes("bach") || query.includes("iman") || query.includes("imanes") || 
          query.includes("biomagnet") || query.includes("energia") || query.includes("energía") || 
          query.includes("masaje") || query.includes("masoter") || query.includes("relaja")) {
        matchKeyword = s.category === "terapias";
      }

      return matchName || matchDesc || matchKeyword;
    });

    setSuggestions(matches);
  }, [searchQuery]);

  const selectSuggestion = (svc: Service) => {
    setSelectedService(svc);
    setSearchQuery(svc.name);
    setShowSuggestions(false);
    
    // Auto-select first professional of this category
    const defaultProf = PROFESSIONALS_DATA.find(p => p.category === svc.category) || PROFESSIONALS_DATA[0];
    setSelectedProf(defaultProf);
    
    // Clear slot
    setSelectedSlot(null);
  };

  const handleReservarClick = () => {
    if (selectedService) {
      setIsExpanded(true);
      setPanelStep(1);
    }
  };

  const handleRutCheck = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanRut = rut.replace(/\./g, "").replace(/-/g, "").trim();
    if (cleanRut === "12345678" || cleanRut.includes("12345")) {
      setPatientInfo({
        name: "Valentina Paz",
        email: "v.****@gmail.com"
      });
    } else {
      setPatientInfo({
        name: "Usuario Nuevo",
        email: "nuevo.paciente@correo.cl"
      });
    }
  };

  const getFormattedDateQuery = (dateStr: string) => {
    if (dateStr.includes("Hoy")) return "2026-06-22";
    if (dateStr.includes("Mañana")) return "2026-06-23";
    if (dateStr.includes("Miér")) return "2026-06-24";
    return "2026-06-22";
  };

  // Fetch agendas availability from local Next.js API proxy and group by professional
  useEffect(() => {
    if (selectedService?.category === "dental" && modality) {
      setLoadingSlots(true);
      setApiError(null);
      setDentalinkProfs([]);
      
      const queryDate = getFormattedDateQuery(selectedDate);
      const branchName = modality === "1" ? "Vitacura" : modality === "2" ? "Los Tribunales" : "Telemedicina";
      
      fetch(`/api/test/dentalink/agendas?fecha=${queryDate}&id_sucursal=${modality}&duracion=15`)
        .then(res => {
          if (!res.ok) throw new Error("Error en la respuesta de la API");
          return res.json();
        })
        .then(data => {
          if (data && Array.isArray(data.data)) {
            // Group slots by professional
            const profsMap: { [id: number]: Professional } = {};
            
            data.data.forEach((slot: any) => {
              if (slot.id_paciente === 0) { // Only available slots
                const pid = slot.id_profesional;
                const pname = slot.nombre_profesional || `Dr/a. Profesional ${pid}`;
                
                if (!profsMap[pid]) {
                  profsMap[pid] = {
                    id: `dl-${pid}`,
                    dentalinkId: pid,
                    name: pname,
                    specialty: `Odontología / Sede ${branchName}`,
                    avatar: pname.toLowerCase().includes("dra") ? "👩‍⚕️" : "👨‍⚕️",
                    category: "dental",
                    availableSlots: []
                  };
                }
                
                // Avoid duplicate slots in the list (unique keys)
                if (!profsMap[pid].availableSlots.includes(slot.hora_inicio)) {
                  profsMap[pid].availableSlots.push(slot.hora_inicio);
                }
              }
            });
            
            const list = Object.values(profsMap);
            list.forEach(p => {
              p.availableSlots.sort((a, b) => a.localeCompare(b));
            });
            
            setDentalinkProfs(list);
            
            // Auto-select the first professional
            if (list.length > 0) {
              setSelectedProf(list[0]);
            } else {
              setSelectedProf(null);
            }
          } else {
            setDentalinkProfs([]);
            setSelectedProf(null);
          }
        })
        .catch(err => {
          console.error(err);
          setApiError("No se pudieron cargar los profesionales y horas reales de Dentalink.");
          setDentalinkProfs([]);
          setSelectedProf(null);
        })
        .finally(() => {
          setLoadingSlots(false);
        });
    } else {
      setDentalinkProfs([]);
      // Clear selection or select default mock professional
      const defaults = PROFESSIONALS_DATA.filter(p => p.category === selectedService?.category);
      if (defaults.length > 0) {
        setSelectedProf(defaults[0]);
      } else {
        setSelectedProf(null);
      }
    }
  }, [selectedService, selectedDate, modality]);

  const getActiveProfessionals = () => {
    if (selectedService?.category === "dental") {
      return dentalinkProfs;
    }
    return PROFESSIONALS_DATA.filter(p => p.category === selectedService?.category);
  };

  const handlePayment = () => {
    setIsPaying(true);
    setTimeout(() => {
      setIsPaying(false);
      setPanelStep(4); // Direct to WhatsApp confirmation screen
    }, 2000);
  };

  return (
    <div ref={containerRef} className="w-full max-w-5xl mx-auto px-4 -mt-10 md:-mt-16 relative z-30 space-y-4">
      <div className="inline-flex flex-col items-start w-full">
        
        {/* Top Radio Tabs */}
        <div className="flex items-center gap-6 bg-white dark:bg-slate-900 px-6 py-2.5 rounded-t-[1.5rem] border-t border-l border-r border-slate-200/80 dark:border-slate-800 shadow-sm">
          
          <label className="flex items-center gap-2.5 cursor-pointer group">
            <input
              type="radio"
              name="patientType"
              checked={patientType === "general"}
              onChange={() => setPatientType("general")}
              className="sr-only"
            />
            <div className="relative flex items-center justify-center">
              <div className={`w-[18px] h-[18px] rounded-full border-2 transition-all flex items-center justify-center ${
                patientType === "general"
                  ? "border-[#00a499]"
                  : "border-slate-300 dark:border-slate-600 group-hover:border-slate-400"
              }`}>
                {patientType === "general" && (
                  <div className="w-2.5 h-2.5 rounded-full bg-[#00a499]" />
                )}
              </div>
            </div>
            <span className={`text-[13px] font-bold tracking-tight transition-colors ${
              patientType === "general" 
                ? "text-slate-800 dark:text-slate-100" 
                : "text-slate-500 dark:text-slate-400 group-hover:text-slate-700"
            }`}>
              Paciente General
            </span>
          </label>

          <label className="flex items-center gap-2.5 cursor-pointer group">
            <input
              type="radio"
              name="patientType"
              checked={patientType === "mivita"}
              onChange={() => {
                setPatientType("mivita");
              }}
              className="sr-only"
            />
            <div className="relative flex items-center justify-center">
              <div className={`w-[18px] h-[18px] rounded-full border-2 transition-all flex items-center justify-center ${
                patientType === "mivita"
                  ? "border-[#00a499]"
                  : "border-slate-300 dark:border-slate-600 group-hover:border-slate-400"
              }`}>
                {patientType === "mivita" && (
                  <div className="w-2.5 h-2.5 rounded-full bg-[#00a499]" />
                )}
              </div>
            </div>
            <span className={`text-[13px] font-bold tracking-tight transition-colors ${
              patientType === "mivita" 
                ? "text-slate-800 dark:text-slate-100" 
                : "text-slate-500 dark:text-slate-400 group-hover:text-slate-700"
            }`}>
              Convenio Mi Vita
            </span>
          </label>
        </div>

        {/* Main Selection Bar */}
        <div className="w-full bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-b-[2rem] rounded-tr-[2rem] p-4 md:p-5 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1),0_10px_20px_-10px_rgba(0,0,0,0.05)] dark:shadow-none transition-colors relative">
          
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            
            {/* Horizontal Fields */}
            <div className="flex-1 grid md:grid-cols-2 gap-4 relative">
              
              {/* Field 1: Symptom / Service Text Input */}
              <div className="relative flex flex-col justify-center">
                <div className="absolute left-4 text-slate-400 pointer-events-none">
                  <Search size={18} />
                </div>
                <input
                  type="text"
                  placeholder="Escribe lo que sientes o necesitas..."
                  value={searchQuery}
                  onFocus={() => setShowSuggestions(true)}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setSelectedService(null);
                    setModality("");
                    setIsExpanded(false);
                  }}
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 text-xs font-bold text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-[#00a499] shadow-sm"
                />
                
                {/* Autocomplete suggestions dropdown */}
                <AnimatePresence>
                  {showSuggestions && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      className="absolute left-0 right-0 top-full mt-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-2xl z-40 max-h-80 overflow-y-auto"
                    >
                      {!searchQuery.trim() ? (
                        <div className="space-y-3">
                          <div className="flex items-center gap-1.5 pb-1 border-b border-slate-100 dark:border-slate-850">
                            <Sparkles size={12} className="text-amber-500 animate-pulse" />
                            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Búsquedas Populares</span>
                          </div>
                          <div className="flex flex-wrap gap-2 pt-1">
                            {[
                              { label: "Dolor de Espalda ⚡", query: "dolor de espalda" },
                              { label: "Ansiedad o Estrés 🧠", query: "ansiedad" },
                              { label: "Limpieza Dental 🦷", query: "limpieza dental" },
                              { label: "Acupuntura 🌿", query: "acupuntura" },
                              { label: "Uña encarnada 👣", query: "uña encarnada" },
                              { label: "Frenillos / Brackets 🦷", query: "frenillos" }
                            ].map((item) => (
                              <button
                                key={item.query}
                                type="button"
                                onClick={() => {
                                  setSearchQuery(item.query);
                                }}
                                className="px-3 py-1.5 bg-slate-50 dark:bg-slate-800 hover:bg-[#00a499]/10 hover:text-[#00a499] rounded-full text-[10px] font-bold text-slate-600 dark:text-slate-350 transition-colors border border-slate-100 dark:border-slate-750"
                              >
                                {item.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      ) : suggestions.length > 0 ? (
                        <div>
                          <div className="flex items-center gap-1.5 mb-2 pb-1.5 border-b border-slate-100 dark:border-slate-850">
                            <Sparkles size={12} className="text-amber-500" />
                            <span className="text-[9px] font-black uppercase tracking-wider text-slate-400">Servicios Recomendados</span>
                          </div>
                          <div className="space-y-1">
                            {suggestions.map((svc) => (
                              <div
                                key={svc.id}
                                onClick={() => selectSuggestion(svc)}
                                className="p-2 hover:bg-slate-50 dark:hover:bg-slate-800/80 rounded-xl cursor-pointer text-left transition-colors flex justify-between items-center"
                              >
                                <div>
                                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200">{svc.name}</p>
                                  <p className="text-[9px] text-slate-400 font-semibold">{svc.description}</p>
                                </div>
                                <span className="text-[8px] bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded font-black text-slate-500 uppercase">{svc.category}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="p-3 text-center text-xs text-slate-400 font-semibold">
                          No encontramos resultados para tu búsqueda. Prueba con otro síntoma o especialidad.
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Field 2: Modalidad Select */}
              <div className="relative flex flex-col justify-center">
                <div className={`absolute left-4 pointer-events-none ${selectedService ? "text-slate-400" : "text-slate-300 dark:text-slate-700"}`}>
                  <Building2 size={18} />
                </div>
                <select
                  value={modality}
                  disabled={!selectedService}
                  onChange={(e) => setModality(e.target.value)}
                  className={`w-full pl-11 pr-10 py-3.5 rounded-xl border appearance-none text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#00a499] cursor-pointer ${
                    selectedService
                      ? "border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 text-slate-600 dark:text-slate-200"
                      : "border-slate-100 dark:border-slate-900 bg-slate-100/50 dark:bg-slate-950/20 text-slate-300 dark:text-slate-750 cursor-not-allowed"
                  }`}
                >
                  <option value="">Selecciona Sucursal / Sede</option>
                  <option value="1">Sucursal Vitacura</option>
                  <option value="2">Sede Los Tribunales</option>
                  {selectedService?.category === "mental" && (
                    <option value="telemedicina">Teleconsulta Online</option>
                  )}
                </select>
                <div className="absolute right-4 text-slate-400 pointer-events-none">
                  <ChevronDown size={14} />
                </div>
              </div>

            </div>

            {/* Right Action Controls */}
            <div className="flex items-center gap-6 justify-between lg:justify-end shrink-0 pl-2 lg:pl-0">
              <button
                onClick={handleReservarClick}
                disabled={!selectedService || !modality}
                className={`px-6 py-3.5 rounded-full font-black text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-md ${
                  selectedService && modality
                    ? "bg-[#00a499] hover:bg-[#00897b] text-white hover:scale-102"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed shadow-none"
                }`}
              >
                <Calendar size={14} />
                Reservar hora
              </button>

              <a
                href="#agendar"
                onClick={(e) => {
                  e.preventDefault();
                  setIsExpanded(false);
                  setSelectedService(null);
                  setSearchQuery("");
                }}
                className="text-xs font-bold text-[#00a499] hover:text-[#00897b] underline underline-offset-4 tracking-tight whitespace-nowrap"
              >
                Anular hora
              </a>
            </div>

          </div>

        </div>

      </div>

      {/* Dynamic Expandable Agendador Panel */}
      <AnimatePresence>
        {isExpanded && selectedService && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl overflow-hidden"
          >
            {/* STEP 1: Inline Calendar and professional slots */}
            {panelStep === 1 && (
              <div className="grid lg:grid-cols-12 gap-8">
                
                {/* Left side: Date Selector */}
                <div className="lg:col-span-4 space-y-4">
                  <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Paso 1: Fecha de Atención</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {["Hoy, 22 Jun", "Mañana, 23 Jun", "Miér, 24 Jun"].map((d) => (
                      <button
                        key={d}
                        onClick={() => setSelectedDate(d)}
                        className={`py-2 px-1 text-[10px] font-bold rounded-xl border text-center transition-all ${
                          selectedDate === d
                            ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900 dark:border-white"
                            : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-500 hover:border-slate-300"
                        }`}
                      >
                        {d}
                      </button>
                    ))}
                  </div>

                  <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 space-y-2 text-xs">
                    <p className="font-bold text-slate-700 dark:text-slate-200">Detalles de la cita:</p>
                    <p className="text-slate-500">• {selectedService.name}</p>
                    <p className="text-slate-500">• Valor: {selectedService.price}</p>
                    {patientType === "mivita" && (
                      <p className="text-emerald-500 font-bold">• 25% Descuento Mi Vita Pre-Aplicado</p>
                    )}
                  </div>
                </div>

                {/* Right side: Doctor availability */}
                <div className="lg:col-span-8 space-y-4">
                  <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Paso 2: Profesional y Hora</h4>
                  
                  <div className="space-y-3">
                    {selectedService.category === "dental" && loadingSlots ? (
                      <div className="flex flex-col items-center justify-center p-12 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm min-h-[220px]">
                        <div className="relative flex items-center justify-center">
                          {/* Animated outer rings */}
                          <div className="absolute w-12 h-12 rounded-full border-2 border-[#00a499]/20 border-t-[#00a499] animate-spin" />
                          <div className="absolute w-8 h-8 rounded-full border-2 border-dashed border-[#00a499]/40 animate-spin [animation-direction:reverse]" />
                          {/* Central Pulsing Sparkle Icon */}
                          <div className="w-5 h-5 text-[#00a499] animate-pulse">
                            <Sparkles className="w-5 h-5" />
                          </div>
                        </div>
                        <div className="text-center space-y-1">
                          <p className="text-xs font-bold text-slate-800 dark:text-slate-200 animate-pulse">Consultando disponibilidad en Dentalink...</p>
                          <p className="text-[10px] text-slate-400 font-semibold">Buscando profesionales y bloques disponibles en tiempo real</p>
                        </div>
                      </div>
                    ) : selectedService.category === "dental" && apiError ? (
                      <div className="flex flex-col items-center justify-center p-12 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center text-xs text-red-500 font-semibold min-h-[220px]">
                        <span>⚠ {apiError}</span>
                      </div>
                    ) : getActiveProfessionals().length === 0 ? (
                      <div className="flex flex-col items-center justify-center p-12 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 text-center text-xs text-slate-400 font-semibold min-h-[220px]">
                        <Building2 size={24} className="text-slate-350 dark:text-slate-650 mb-1" />
                        <p>No hay profesionales u horarios disponibles para este día y sede.</p>
                        <p className="text-[10px] font-normal text-slate-450">Intenta seleccionando otra fecha u otra sede.</p>
                      </div>
                    ) : (
                      getActiveProfessionals().map((prof) => (
                        <div
                          key={prof.id}
                          className={`p-4 rounded-2xl border bg-white dark:bg-slate-900 transition-all ${
                            selectedProf?.id === prof.id
                              ? "border-slate-900 dark:border-white"
                              : "border-slate-200 dark:border-slate-800/80"
                          }`}
                        >
                          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/50 pb-3 mb-3">
                            <div className="flex items-center gap-2">
                              <span className="text-xl">{prof.avatar}</span>
                              <div>
                                <p className="text-xs font-bold text-slate-800 dark:text-slate-100">{prof.name}</p>
                                <p className="text-[9px] text-slate-400 font-semibold">{prof.specialty}</p>
                              </div>
                            </div>
                            <span className="text-[8px] bg-emerald-500/10 text-emerald-600 px-2 py-0.5 rounded font-black uppercase tracking-wider">Disponible</span>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            {prof.availableSlots.length === 0 ? (
                              <div className="text-slate-400 text-[10px] font-semibold py-1">
                                No hay horas disponibles para este día.
                              </div>
                            ) : (
                              prof.availableSlots.map((slot, idx) => (
                                <button
                                  key={`${slot}-${idx}`}
                                  onClick={() => {
                                    setSelectedProf(prof);
                                    setSelectedSlot(slot);
                                  }}
                                  className={`px-3 py-1.5 text-[10px] font-bold rounded-lg border transition-all ${
                                    selectedProf?.id === prof.id && selectedSlot === slot
                                      ? "bg-[#00a499] text-white border-[#00a499]"
                                      : "bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-600 hover:border-slate-350"
                                  }`}
                                >
                                  {slot}
                                </button>
                              ))
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  <div className="flex justify-end gap-3 pt-4">
                    <button
                      onClick={() => setIsExpanded(false)}
                      className="px-4 py-2 text-[10px] font-black uppercase text-slate-400 tracking-wider hover:text-slate-600"
                    >
                      Cancelar
                    </button>
                    <button
                      disabled={!selectedSlot}
                      onClick={() => setPanelStep(2)}
                      className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                        selectedSlot
                          ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:scale-102"
                          : "bg-slate-250 text-slate-400 cursor-not-allowed"
                      } transition-all`}
                    >
                      Identificación Fast-Pass →
                    </button>
                  </div>
                </div>

              </div>
            )}

            {/* STEP 2: Fast-Pass RUT Identification */}
            {panelStep === 2 && (
              <div className="max-w-md mx-auto space-y-6 text-center py-4">
                <div className="w-12 h-12 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center mx-auto text-xl">
                  👤
                </div>
                <div>
                  <h4 className="text-md font-bold text-slate-800 dark:text-slate-100">Paciente Fast-Pass</h4>
                  <p className="text-[10px] text-slate-400 mt-1">Ingresa tu RUT para recuperar tus datos de manera express.</p>
                </div>

                <form onSubmit={handleRutCheck} className="space-y-4 max-w-xs mx-auto">
                  <input
                    type="text"
                    placeholder="Escribe tu RUT... (ej: 12345678)"
                    value={rut}
                    onChange={(e) => setRut(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary shadow-sm text-center"
                  />
                  <button
                    type="submit"
                    className="w-full py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-xl text-[10px] uppercase tracking-wider transition-all"
                  >
                    Buscar datos
                  </button>
                </form>

                <AnimatePresence>
                  {patientInfo && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-left space-y-3"
                    >
                      <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
                        <CheckCircle2 size={14} /> ¡Paciente Encontrado!
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Bienvenida <strong>{patientInfo.name}</strong>. Hemos pre-cargado tus datos y activado tu descuento. Enviaremos las instrucciones a: <strong>{patientInfo.email}</strong>.
                      </p>
                      
                      <div className="flex justify-end gap-3 pt-2">
                        <button
                          onClick={() => setPanelStep(3)}
                          className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold px-4 py-2 rounded-xl text-[10px] uppercase tracking-wider"
                        >
                          Proceder al Pago
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* STEP 3: Payment Checkout simulation */}
            {panelStep === 3 && (
              <div className="max-w-md mx-auto space-y-6 text-center py-4">
                <div className="w-12 h-12 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center mx-auto text-xl">
                  💳
                </div>
                <div>
                  <h4 className="text-md font-bold text-slate-800 dark:text-slate-100">Transacción de Copago</h4>
                  <p className="text-[10px] text-slate-400 mt-1">Simula tu copago seguro para registrar la cita.</p>
                </div>

                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 text-left text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Servicio:</span>
                    <span className="font-bold text-slate-700 dark:text-slate-200">{selectedService.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Especialista:</span>
                    <span className="font-bold text-slate-700 dark:text-slate-200">{selectedProf?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Fecha y Hora:</span>
                    <span className="font-bold text-slate-700 dark:text-slate-200">{selectedDate} a las {selectedSlot}</span>
                  </div>
                  <div className="flex justify-between border-t border-slate-100 dark:border-slate-800 pt-2 font-black text-sm mt-2">
                    <span className="text-slate-800 dark:text-slate-100">Total a Pagar:</span>
                    <span className="text-emerald-500">
                      {patientType === "mivita" ? "$33.750 (25% Dto)" : selectedService.price}
                    </span>
                  </div>
                </div>

                <div className="flex gap-3 justify-center">
                  <button
                    disabled={isPaying}
                    onClick={handlePayment}
                    className="bg-[#ff5a00] text-white font-bold px-6 py-2.5 rounded-full text-[10px] uppercase tracking-wider flex items-center gap-1.5"
                  >
                    {isPaying ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Validando...
                      </>
                    ) : (
                      <>✓ Pagar con Webpay</>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: WhatsApp Confirmation smartphone mockup */}
            {panelStep === 4 && (
              <div className="grid lg:grid-cols-12 gap-8 items-center">
                
                {/* Left text */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xl">
                    ✓
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">¡Agenda Reservada con éxito!</h3>
                  <p className="text-xs text-slate-400 font-semibold leading-relaxed">
                    Las agendas de Dentalink/Medilink se han actualizado de forma nativa. Hemos enviado una confirmación a tu WhatsApp.
                  </p>
                  <button
                    onClick={() => {
                      setIsExpanded(false);
                      setSelectedService(null);
                      setSearchQuery("");
                      setModality("");
                    }}
                    className="px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-slate-900 dark:bg-white text-white dark:text-slate-900"
                  >
                    Cerrar Agendador
                  </button>
                </div>

                {/* Right mockup */}
                <div className="lg:col-span-7 flex justify-center">
                  <div className="w-[280px] h-[480px] bg-slate-900 rounded-[2.5rem] p-2 border-4 border-slate-700 shadow-2xl relative overflow-hidden flex flex-col">
                    
                    {/* Simulated Notch */}
                    <div className="absolute top-3.5 left-1/2 -translate-x-1/2 w-28 h-3.5 bg-slate-950 rounded-full z-20 flex justify-center items-center">
                      <div className="w-8 h-0.5 bg-slate-800 rounded-full" />
                    </div>

                    <div className="flex-1 bg-[#efeae2] rounded-[2rem] overflow-hidden flex flex-col pt-5 relative text-slate-950">
                      
                      {/* WhatsApp Header */}
                      <div className="bg-[#005e54] text-white p-2.5 flex items-center gap-1.5">
                        <span className="text-md">🏥</span>
                        <div>
                          <p className="text-[10px] font-bold">Poli Tabancura</p>
                          <p className="text-[7px] opacity-75">Cuenta Verificada</p>
                        </div>
                      </div>

                      {/* Msg */}
                      <div className="flex-1 p-2 space-y-3 overflow-y-auto">
                        <div className="bg-white p-2.5 rounded-xl rounded-tl-none shadow-xs text-[9px] space-y-2 relative max-w-[90%]">
                          <p>¡Hola <strong>Valentina</strong>! 🌸</p>
                          <p>Confirmamos tu cita para hoy:</p>
                          <div className="bg-slate-50 p-1.5 rounded-lg border border-slate-100 text-[8px] space-y-1">
                            <p className="font-bold">🩺 {selectedService.name}</p>
                            <p>👤 {selectedProf?.name}</p>
                            <p>📅 Hoy a las {selectedSlot} hrs</p>
                            <p>📍 Sede Av. Vitacura 8620</p>
                          </div>

                          <div className="space-y-1 pt-1.5 border-t border-slate-100">
                            <a
                              href="#"
                              onClick={(e) => e.preventDefault()}
                              className="w-full py-1.5 bg-[#e8f5e9] text-[#2e7d32] font-black uppercase text-[7px] tracking-wider rounded block text-center"
                            >
                              📅 Agregar al Calendario
                            </a>
                            <a
                              href="#"
                              onClick={(e) => e.preventDefault()}
                              className="w-full py-1.5 bg-[#e3f2fd] text-[#1565c0] font-black uppercase text-[7px] tracking-wider rounded block text-center"
                            >
                              📍 Waze / Maps
                            </a>
                          </div>
                        </div>
                      </div>

                    </div>

                  </div>
                </div>

              </div>
            )}

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
