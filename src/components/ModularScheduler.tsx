"use client";
import React, { useState, useMemo } from 'react';
import {
  Stethoscope,
  User,
  MapPin,
  Layers,
  ChevronRight,
  ChevronLeft,
  Search,
  Calendar,
  Clock,
  CheckCircle2,
  ArrowRight,
  SmilePlus,
  Brain,
  Zap,
  ShieldCheck,
  Building2,
  Info,
  Check,
  RotateCcw,
  Sparkles,
  Activity,
  Microscope,
  GraduationCap,
  Edit
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Area, Professional } from '@/data/professionals';

type SearchMode = 'especialidad' | 'profesional' | 'sucursal' | 'area';

// Mapeo de colores distintivos por área médica (Dental, Mental, Kine, General, Terapias, Muestras)
const AREA_COLOR_MAP: Record<string, {
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  specialtyColor: string;
  avatarBorder: string;
  pillActive: string;
  pillInactive: string;
  icon: any;
}> = {
  "Salud Dental": {
    badgeBg: "bg-cyan-50 dark:bg-cyan-950/80",
    badgeText: "text-[#259CF4] dark:text-cyan-300",
    badgeBorder: "border-cyan-200 dark:border-cyan-800",
    specialtyColor: "text-[#259CF4] dark:text-cyan-400",
    avatarBorder: "border-[#259CF4]",
    pillActive: "bg-[#259CF4] text-white ring-2 ring-[#259CF4]/40 shadow-md",
    pillInactive: "bg-cyan-50/80 dark:bg-cyan-950/40 text-cyan-800 dark:text-cyan-300 border-cyan-200 dark:border-cyan-800/60",
    icon: SmilePlus
  },
  "Salud Mental": {
    badgeBg: "bg-purple-50 dark:bg-purple-950/80",
    badgeText: "text-purple-700 dark:text-purple-300",
    badgeBorder: "border-purple-200 dark:border-purple-800",
    specialtyColor: "text-purple-600 dark:text-purple-400",
    avatarBorder: "border-purple-500",
    pillActive: "bg-purple-600 text-white ring-2 ring-purple-500/40 shadow-md",
    pillInactive: "bg-purple-50/80 dark:bg-purple-950/40 text-purple-800 dark:text-purple-300 border-purple-200 dark:border-purple-800/60",
    icon: Brain
  },
  "Kinesiología": {
    badgeBg: "bg-amber-50 dark:bg-amber-950/80",
    badgeText: "text-amber-700 dark:text-amber-300",
    badgeBorder: "border-amber-200 dark:border-amber-800",
    specialtyColor: "text-amber-600 dark:text-amber-400",
    avatarBorder: "border-amber-500",
    pillActive: "bg-amber-500 text-white ring-2 ring-amber-400/40 shadow-md",
    pillInactive: "bg-amber-50/80 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800/60",
    icon: Activity
  },
  "Medicina General": {
    badgeBg: "bg-blue-50 dark:bg-blue-950/80",
    badgeText: "text-blue-700 dark:text-blue-300",
    badgeBorder: "border-blue-200 dark:border-blue-800",
    specialtyColor: "text-blue-600 dark:text-blue-400",
    avatarBorder: "border-blue-500",
    pillActive: "bg-blue-600 text-white ring-2 ring-blue-500/40 shadow-md",
    pillInactive: "bg-blue-50/80 dark:bg-blue-950/40 text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-800/60",
    icon: Stethoscope
  },
  "Terapias Complementarias": {
    badgeBg: "bg-emerald-50 dark:bg-emerald-950/80",
    badgeText: "text-emerald-700 dark:text-emerald-300",
    badgeBorder: "border-emerald-200 dark:border-emerald-800",
    specialtyColor: "text-emerald-600 dark:text-emerald-400",
    avatarBorder: "border-emerald-500",
    pillActive: "bg-emerald-600 text-white ring-2 ring-emerald-500/40 shadow-md",
    pillInactive: "bg-emerald-50/80 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/60",
    icon: Sparkles
  },
  "Toma de Muestras": {
    badgeBg: "bg-rose-50 dark:bg-rose-950/80",
    badgeText: "text-rose-700 dark:text-rose-300",
    badgeBorder: "border-rose-200 dark:border-rose-800",
    specialtyColor: "text-rose-600 dark:text-rose-400",
    avatarBorder: "border-rose-500",
    pillActive: "bg-rose-600 text-white ring-2 ring-rose-500/40 shadow-md",
    pillInactive: "bg-rose-50/80 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 border-rose-200 dark:border-rose-800/60",
    icon: Microscope
  }
};

const getAreaColor = (area?: string) => {
  if (!area) return AREA_COLOR_MAP["Medicina General"];
  const normalized = area.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  if (normalized.includes("dental") || normalized.includes("odontologia")) return AREA_COLOR_MAP["Salud Dental"];
  if (normalized.includes("mental") || normalized.includes("psico")) return AREA_COLOR_MAP["Salud Mental"];
  if (normalized.includes("kinesiologia") || normalized.includes("kine")) return AREA_COLOR_MAP["Kinesiología"];
  if (normalized.includes("general") || normalized.includes("medicina")) return AREA_COLOR_MAP["Medicina General"];
  if (normalized.includes("terapia") || normalized.includes("complementaria")) return AREA_COLOR_MAP["Terapias Complementarias"];
  if (normalized.includes("muestra") || normalized.includes("examen")) return AREA_COLOR_MAP["Toma de Muestras"];
  return AREA_COLOR_MAP["Medicina General"];
};

// Comparador de sucursales tolerante a diferencias de formato ("Vitacura" vs "Los Tribunales / Casa Matriz")
const isSucursalMatch = (proSucursal?: string | null, targetSucursal?: string) => {
  if (!targetSucursal || targetSucursal === 'Todas' || targetSucursal === 'Seleccionar' || targetSucursal === '') return true;
  if (!proSucursal) return true;

  const proNorm = proSucursal.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const targetNorm = targetSucursal.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  if (targetNorm.includes("vitacura")) {
    return proNorm.includes("vitacura");
  }
  if (targetNorm.includes("tribunal") || targetNorm.includes("matriz")) {
    return proNorm.includes("tribunal") || proNorm.includes("matriz");
  }
  return proNorm.includes(targetNorm);
};

// Generador de insignias de ubicación compactas ("Tribunales", "Vitacura", "Teleconsulta")
const getLocationBadges = (sucursalStr?: string | null) => {
  if (!sucursalStr) {
    return [{ label: "Vitacura", bg: "bg-slate-100 dark:bg-slate-800", text: "text-slate-700 dark:text-slate-300", border: "border-slate-200 dark:border-slate-700" }];
  }

  const badges: { label: string; bg: string; text: string; border: string }[] = [];
  const norm = sucursalStr.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  if (norm.includes("matriz") || norm.includes("tribunal")) {
    badges.push({
      label: "Tribunales",
      bg: "bg-amber-50 dark:bg-amber-950/60",
      text: "text-amber-700 dark:text-amber-300",
      border: "border-amber-200 dark:border-amber-800"
    });
  }

  if (norm.includes("vitacura")) {
    badges.push({
      label: "Vitacura",
      bg: "bg-sky-50 dark:bg-sky-950/60",
      text: "text-sky-700 dark:text-sky-300",
      border: "border-sky-200 dark:border-sky-800"
    });
  }

  if (norm.includes("teleconsulta") || norm.includes("online") || norm.includes("remota")) {
    badges.push({
      label: "Teleconsulta",
      bg: "bg-purple-50 dark:bg-purple-950/60",
      text: "text-purple-700 dark:text-purple-300",
      border: "border-purple-200 dark:border-purple-800"
    });
  }

  if (badges.length === 0) {
    badges.push({
      label: "Vitacura",
      bg: "bg-slate-100 dark:bg-slate-800",
      text: "text-slate-700 dark:text-slate-300",
      border: "border-slate-200 dark:border-slate-700"
    });
  }

  return badges;
};

// Diccionario de información sobre especialidades (descripción y áreas de enfoque principal)
const SPECIALTY_DETAILS: Record<string, { description: string; focusAreas: string[] }> = {
  "Implantología": {
    description: "Rehabilitación oral avanzada dedicada a la sustitución de piezas dentales mediante implantes de alta tecnología, devolviendo estética y funcionalidad.",
    focusAreas: ["Implantes osteointegrados", "Rehabilitación sobre implantes", "Regeneración ósea", "Estética dental"]
  },
  "Odontología General": {
    description: "Diagnóstico, prevención y tratamiento integral de afecciones bucodentales comunes, limpiezas profundas y restauraciones estéticas.",
    focusAreas: ["Limpieza profesional", "Restauraciones y tapaduras", "Evaluación preventiva", "Salud de encías"]
  },
  "Ortodoncia": {
    description: "Corrección de la alineación de dientes y maxilares para mejorar la mordida, estética de la sonrisa y función de masticación.",
    focusAreas: ["Brackets estéticos", "Alineadores invisibles", "Ortodoncia interactiva", "Corrección de mordida"]
  },
  "Endodoncia": {
    description: "Tratamiento especializado de conductos orientado a aliviar el dolor agudo y salvar piezas dentales dañadas internamente.",
    focusAreas: ["Tratamiento de conductos", "Alivio del dolor agudo", "Reconstrucción pulpar", "Traumatismos dentales"]
  },
  "Periodoncia": {
    description: "Prevención y tratamiento de las enfermedades de las encías y tejidos de soporte dental (gingivitis y periodontitis).",
    focusAreas: ["Tratamiento de gingivitis", "Cirugía periodontal", "Limpieza subgingival", "Mantenimiento periodontal"]
  },
  "Odontopediatría": {
    description: "Atención odontológica adaptada para niños y jóvenes con enfoque preventivo, amigable y especializado.",
    focusAreas: ["Prevención de caries", "Sellantes y flúor", "Manejo de ansiedad infantil", "Guía de erupción dental"]
  },
  "Psicología": {
    description: "Acompañamiento psicoterapéutico centrado en la salud emocional, regulación afectiva, manejo del estrés y herramientas personales.",
    focusAreas: ["Manejo de ansiedad y estrés", "Terapia individual", "Bienestar emocional", "Desarrollo personal"]
  },
  "Psicopedagogía": {
    description: "Orientación, evaluación y potenciación de los procesos de aprendizaje infantil y juvenil, abordando hábitos y desempeño escolar.",
    focusAreas: ["Apoyo escolar", "Dificultades de aprendizaje", "Evaluación cognitiva", "Habilidades de estudio"]
  },
  "Psiquiatría": {
    description: "Diagnóstico médico y tratamiento clínico integral de trastornos del estado de ánimo, ansiedad, sueño y salud mental.",
    focusAreas: ["Evaluación psiquiátrica", "Tratamiento farmacológico", "Trastornos del ánimo", "Higiene del sueño"]
  },
  "Kinesiología": {
    description: "Rehabilitación física orientada a la recuperación de lesiones músculo-esqueléticas, alivio del dolor y optimización del movimiento.",
    focusAreas: ["Rehabilitación física", "Terapia del dolor", "Reeducación postural", "Recuperación de movilidad"]
  },
  "Nutrición": {
    description: "Evaluación del estado nutricional y diseño de planes de alimentación personalizados para promover la salud integral.",
    focusAreas: ["Planes personalizados", "Nutrición clínica", "Educación alimentaria", "Composición corporal"]
  },
  "Medicina General": {
    description: "Atención médica primaria integral para la prevención, diagnóstico oportuno y tratamiento de enfermedades del adulto.",
    focusAreas: ["Chequeo preventivo", "Evaluación de exámenes", "Enfermedades comunes", "Derivación a especialistas"]
  },
  "Fonoaudiología": {
    description: "Evaluación y terapia de trastornos de la voz, habla, lenguaje y deglución en niños y adultos.",
    focusAreas: ["Terapia de la voz", "Desarrollo del lenguaje", "Trastornos del habla", "Deglución atípica"]
  }
};

// Helper para obtener información extendida de la especialidad
const getSpecialtyDetail = (specName?: string) => {
  if (!specName || specName === 'Todas' || specName === 'Seleccionar') return null;

  const key = Object.keys(SPECIALTY_DETAILS).find(k =>
    specName.toLowerCase().includes(k.toLowerCase()) || k.toLowerCase().includes(specName.toLowerCase())
  );

  if (key) {
    return SPECIALTY_DETAILS[key];
  }

  return {
    description: `Atención profesional especializada en ${specName}, orientada a brindar un diagnóstico preciso y un tratamiento integral.`,
    focusAreas: ["Evaluación clínica", "Tratamiento personalizado", "Seguimiento médico"]
  };
};

// Helper para formatear nombres limpios y concisos de sucursal
const formatSucursalBadge = (rawName?: string | null) => {
  if (!rawName) return 'Vitacura';
  const lower = rawName.toLowerCase();
  if (lower.includes('tribunal')) return 'Tribunales';
  if (lower.includes('vitacura')) return 'Vitacura';
  if (lower.includes('tele') || lower.includes('linea') || lower.includes('línea')) return 'Teleconsulta';

  // Limpieza de paréntesis y direcciones largas
  const clean = rawName.replace(/\(.*\)/g, '').trim();
  const mainPart = clean.split(',')[0].trim();
  return mainPart.length > 20 ? mainPart.substring(0, 18) + '...' : mainPart || 'Vitacura';
};

interface ModularSchedulerProps {
  professionals?: Professional[];
}

export const ModularScheduler = ({ professionals = [] }: ModularSchedulerProps) => {
  // Estado para controlar el paso actual (1, 2 o 3)
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Estado para el buscador en tiempo real en Paso 1
  const [liveSearchQuery, setLiveSearchQuery] = useState<string>('');

  // Estado para buscar profesional por texto dentro del Paso 2
  const [proSearchInput, setProSearchInput] = useState<string>('');

  // Estados de selección (inician en 'Seleccionar' para no volcar profesionales automáticamente)
  const [searchMode, setSearchMode] = useState<SearchMode>('especialidad');
  const [selectedArea, setSelectedArea] = useState<string>('Seleccionar');
  const [selectedEspecialidad, setSelectedEspecialidad] = useState<string>('Seleccionar');
  const [selectedProfesionalId, setSelectedProfesionalId] = useState<string>('Todos');
  const [selectedSucursal, setSelectedSucursal] = useState<string>('Seleccionar');

  // Evaluador de si hay algún filtro activo para mostrar u ocultar la lista previa
  const hasActiveSelection = useMemo(() => {
    if (searchMode === 'profesional') {
      return proSearchInput.trim().length > 0 || (selectedArea !== 'Seleccionar' && selectedArea !== 'Todas');
    }
    if (searchMode === 'sucursal') {
      return (selectedSucursal !== 'Seleccionar' && selectedSucursal !== '') || (selectedArea !== 'Seleccionar' && selectedArea !== '');
    }
    // searchMode === 'especialidad'
    return (selectedArea !== 'Seleccionar' && selectedArea !== '') || (selectedEspecialidad !== 'Seleccionar' && selectedEspecialidad !== '') || (selectedSucursal !== 'Seleccionar' && selectedSucursal !== '' && selectedSucursal !== 'Todas');
  }, [searchMode, proSearchInput, selectedArea, selectedEspecialidad, selectedSucursal]);

  // Filtrado en tiempo real de profesionales en el Paso 2 por área, especialidad, sucursal y texto
  const proSearchFilteredList = useMemo(() => {
    return professionals.filter(p => {
      // 1. Filtro por Área Clínica
      if (selectedArea !== 'Todas' && selectedArea !== 'Seleccionar') {
        const pArea = (p.area || '').toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        const selArea = selectedArea.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        if (!pArea.includes(selArea) && !selArea.includes(pArea)) {
          return false;
        }
      }
      // 2. Filtro por Especialidad
      if (selectedEspecialidad !== 'Todas' && selectedEspecialidad !== 'Seleccionar' && p.specialty !== selectedEspecialidad) {
        return false;
      }
      // 3. Filtro por Sucursal
      if (!isSucursalMatch(p.sucursal, selectedSucursal)) {
        return false;
      }
      // 4. Búsqueda libre por Texto (Nombre / Especialidad / Área)
      if (proSearchInput.trim()) {
        const query = proSearchInput.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        const nameClean = p.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        const specClean = (p.specialty || '').toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        const areaClean = (p.area || '').toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        return nameClean.includes(query) || specClean.includes(query) || areaClean.includes(query);
      }
      return true;
    }).sort((a, b) => a.name.localeCompare(b.name));
  }, [professionals, selectedArea, selectedEspecialidad, selectedSucursal, proSearchInput]);

  // Cálculo en tiempo real de sugerencias para el buscador del Paso 1
  const searchSuggestions = useMemo(() => {
    const query = liveSearchQuery.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    if (!query) return { matchingPros: [], matchingSpecs: [] };

    const matchingPros = professionals.filter(p => {
      const nameClean = p.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      const specClean = (p.specialty || '').toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      return nameClean.includes(query) || specClean.includes(query);
    }).slice(0, 5);

    const allSpecs = Array.from(new Set(professionals.map(p => p.specialty).filter(Boolean)));
    const matchingSpecs = allSpecs.filter(spec => {
      const specClean = spec.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      return specClean.includes(query);
    }).slice(0, 4);

    return { matchingPros, matchingSpecs };
  }, [liveSearchQuery, professionals]);

  // Identificación Paciente
  const [docType, setDocType] = useState<'rut' | 'pasaporte'>('rut');
  const [rutInput, setRutInput] = useState<string>('');

  // Formateador dinámico de RUT chileno (ej: 12.345.678-K)
  const formatRut = (raw: string): string => {
    const cleaned = raw.replace(/[^0-9kK]/g, '').toUpperCase();
    if (!cleaned) return '';
    const body = cleaned.slice(0, -1);
    const dv = cleaned.slice(-1);
    if (cleaned.length <= 1) return cleaned;
    const formattedBody = body.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return `${formattedBody}-${dv}`;
  };

  const handleRutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (docType === 'rut') {
      setRutInput(formatRut(value));
    } else {
      setRutInput(value);
    }
  };

  const [isSearching, setIsSearching] = useState(false);
  const [searchDone, setSearchDone] = useState(false);

  // 1. ÁREAS DISPONIBLES REALES CON ORDEN SOLICITADO POR EL USUARIO
  const availableAreas = useMemo(() => {
    const setAreas = new Set<string>();
    professionals.forEach(p => {
      if (p.area) setAreas.add(p.area);
    });
    const customOrder = [
      "Salud Dental",
      "Salud Mental",
      "Medicina General",
      "Terapias Complementarias",
      "Kinesiología",
      "Toma de Muestras"
    ];
    const sorted = Array.from(setAreas).sort((a, b) => {
      const idxA = customOrder.findIndex(o => a.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(o.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")));
      const idxB = customOrder.findIndex(o => b.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(o.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")));
      return (idxA === -1 ? 99 : idxA) - (idxB === -1 ? 99 : idxB);
    });
    return ["Todas", ...sorted];
  }, [professionals]);

  // 2. ESPECIALIDADES SEGÚN ÁREA
  const availableSpecialties = useMemo(() => {
    let filtered = professionals;
    if (selectedArea !== 'Todas') {
      filtered = filtered.filter(p => p.area === selectedArea);
    }
    const setSpecs = new Set<string>();
    filtered.forEach(p => {
      if (p.specialty) setSpecs.add(p.specialty);
    });
    return ["Todas", ...Array.from(setSpecs)];
  }, [professionals, selectedArea]);

  // 3. PROFESIONALES FILTRADOS
  const filteredProfessionalsList = useMemo(() => {
    return professionals.filter(p => {
      if (selectedArea !== 'Todas') {
        const pArea = (p.area || '').toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        const selArea = selectedArea.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        if (!pArea.includes(selArea) && !selArea.includes(pArea)) return false;
      }
      if (selectedEspecialidad !== 'Todas' && p.specialty !== selectedEspecialidad) return false;
      if (!isSucursalMatch(p.sucursal, selectedSucursal)) return false;
      return true;
    });
  }, [professionals, selectedArea, selectedEspecialidad, selectedSucursal]);

  const selectedProObj = useMemo(() => {
    if (selectedProfesionalId === 'Todos') return null;
    return professionals.find(p => p.id.toString() === selectedProfesionalId) || null;
  }, [professionals, selectedProfesionalId]);

  const handleBuscarHoras = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rutInput.trim()) return;
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      setSearchDone(true);
    }, 750);
  };

  const handleReset = () => {
    setCurrentStep(1);
    setSelectedArea('Seleccionar');
    setSelectedEspecialidad('Seleccionar');
    setSelectedSucursal('Seleccionar');
    setSelectedProfesionalId('Todos');
    setRutInput('');
    setSearchDone(false);
  };

  // Título corto de pasos para encabezado móvil
  const stepTitles = ["1. ¿Qué buscas?", "2. Servicio y Profesional", "3. Tus Datos"];

  return (
    <div className="w-full max-w-4xl mx-auto py-2 sm:py-4 space-y-4 sm:space-y-6 px-1 sm:px-0">

      {/* CONTENEDOR PRINCIPAL DEL PASO A PASO SECUENCIAL */}
      <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl rounded-3xl sm:rounded-[2.5rem] border border-slate-200/80 dark:border-slate-800 shadow-[0_20px_50px_rgba(15,23,42,0.08)] overflow-hidden">

        {/* BARRA SUPERIOR RESPONSIVE STEPPER */}
        <div className="bg-gradient-to-r from-[#162158] via-[#1b2a6f] to-[#162158] p-4 sm:p-5 text-white">

          {/* VISTA MÓVIL (< sm): STEPPER COMPACTO CON PROGRESS BAR */}
          <div className="block sm:hidden space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-amber-500 text-white font-black text-xs flex items-center justify-center shadow-md">
                  {currentStep}
                </div>
                <span className="text-xs font-extrabold text-amber-400">
                  {stepTitles[currentStep - 1]}
                </span>
              </div>
              <span className="text-[10px] font-extrabold tracking-widest text-slate-300 uppercase">
                Paso {currentStep} de 3
              </span>
            </div>

            {/* Barra de Progreso Animada en Móvil */}
            <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-amber-400 to-emerald-400 rounded-full"
                initial={false}
                animate={{ width: `${(currentStep / 3) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* VISTA ESCRITORIO (≥ sm): STEPPER COMPLETO DE TRES PESTAÑAS */}
          <div className="hidden sm:flex items-center justify-between max-w-2xl mx-auto">

            {/* PASO 1 TAB */}
            <button
              onClick={() => setCurrentStep(1)}
              className={`flex items-center gap-2 transition-all cursor-pointer ${currentStep === 1 ? 'opacity-100 font-bold' : 'opacity-60 hover:opacity-100'
                }`}
            >
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black transition-all ${currentStep === 1
                ? 'bg-amber-500 text-white ring-4 ring-amber-400/40 shadow-lg shadow-amber-500/30'
                : currentStep > 1
                  ? 'bg-emerald-500 text-white'
                  : 'bg-white/20 text-white'
                }`}>
                {currentStep > 1 ? <Check size={14} /> : '1'}
              </div>
              <span className={`text-xs sm:text-sm font-bold ${currentStep === 1 ? 'text-amber-400' : 'text-white'}`}>1. Categoría</span>
            </button>

            <div className={`h-0.5 flex-1 mx-3 transition-colors ${currentStep >= 2 ? 'bg-emerald-500' : 'bg-white/20'}`} />

            {/* PASO 2 TAB */}
            <button
              onClick={() => currentStep >= 2 && setCurrentStep(2)}
              disabled={currentStep < 2}
              className={`flex items-center gap-2 transition-all ${currentStep === 2 ? 'opacity-100 font-bold' : currentStep > 2 ? 'opacity-90 cursor-pointer' : 'opacity-40 cursor-not-allowed'
                }`}
            >
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black transition-all ${currentStep === 2
                ? 'bg-amber-500 text-white ring-4 ring-amber-400/40 shadow-lg shadow-amber-500/30'
                : currentStep > 2
                  ? 'bg-emerald-500 text-white'
                  : 'bg-white/20 text-white'
                }`}>
                {currentStep > 2 ? <Check size={14} /> : '2'}
              </div>
              <span className={`text-xs sm:text-sm font-bold ${currentStep === 2 ? 'text-amber-400' : 'text-white'}`}>2. Servicio y Profesional</span>
            </button>

            <div className={`h-0.5 flex-1 mx-3 transition-colors ${currentStep >= 3 ? 'bg-emerald-500' : 'bg-white/20'}`} />

            {/* PASO 3 TAB */}
            <button
              onClick={() => currentStep >= 3 && setCurrentStep(3)}
              disabled={currentStep < 3}
              className={`flex items-center gap-2 transition-all ${currentStep === 3 ? 'opacity-100 font-bold' : 'opacity-40 cursor-not-allowed'
                }`}
            >
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black transition-all ${currentStep === 3
                ? 'bg-amber-500 text-white ring-4 ring-amber-400/40 shadow-lg shadow-amber-500/30'
                : 'bg-white/20 text-white'
                }`}>
                3
              </div>
              <span className={`text-xs sm:text-sm font-bold ${currentStep === 3 ? 'text-amber-400' : 'text-white'}`}>3. Tus Datos</span>
            </button>

          </div>
        </div>

        {/* BANNER DE INSTRUCCIÓN DINÁMICO Y CONCISO DEBAJO DE LOS STEPS */}
        <div className="bg-cyan-50/90 dark:bg-cyan-950/60 border-b border-cyan-100 dark:border-cyan-900/60 px-4 py-2.5 text-center">
          <p className="text-xs sm:text-xs font-bold text-[#162158] dark:text-cyan-300 flex items-center justify-center gap-1.5 leading-snug">
            <Info size={15} className="text-[#259CF4] shrink-0" />
            <span>
              {currentStep === 1 && "Selecciona una modalidad para consultar disponibilidad de horas médicas."}
              {currentStep === 2 && searchMode === 'sucursal' && "Elige tu centro médico y área clínica a la izquierda para ver los profesionales."}
              {currentStep === 2 && searchMode === 'especialidad' && "Selecciona un área y especialidad a la izquierda para ver los profesionales disponibles."}
              {currentStep === 2 && searchMode === 'profesional' && "Escribe el nombre de tu médico a la izquierda para consultar su agenda."}
              {currentStep === 3 && "Ingresa tus datos para acceder al agendamiento oficial (Dentalink / Medilink)."}
            </span>
          </p>
        </div>

        {/* CUERPO DEL COMPONENTE */}
        <div className="p-4 sm:p-8">
          <AnimatePresence mode="wait">

            {/* ================= PASO 1: SELECCIONAR MODO / CRITERIO ================= */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 15 }}
                transition={{ duration: 0.2 }}
                className="space-y-5 max-w-xl mx-auto"
              >
                <div className="text-center">
                  <span className="text-[10px] font-black text-[#259CF4] uppercase tracking-widest bg-cyan-50 dark:bg-cyan-950/60 px-3 py-1 rounded-full inline-block">
                    PASO 1 DE 3
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-2">
                    ¿Qué buscas hoy :)?
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Escribe directamente lo que necesitas o elige una opción para guiarte.
                  </p>
                </div>

                {/* BUSCADOR INTERACTIVO EN TIEMPO REAL CON IMÁGENES Y ESPECIALIDADES */}
                <div className="relative z-20">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#259CF4] w-5 h-5" />
                    <input
                      type="text"
                      inputMode="search"
                      placeholder="Escribe especialidad o nombre del tratante..."
                      value={liveSearchQuery}
                      onChange={(e) => setLiveSearchQuery(e.target.value)}
                      className="w-full bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 focus:border-[#259CF4] dark:focus:border-[#259CF4] rounded-2xl pl-12 pr-10 py-3.5 text-xs sm:text-sm font-medium text-slate-900 dark:text-white outline-none shadow-md transition-all min-h-[48px]"
                    />
                    {liveSearchQuery && (
                      <button
                        onClick={() => setLiveSearchQuery('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600 dark:hover:text-white bg-slate-100 dark:bg-slate-800 rounded-full w-7 h-7 flex items-center justify-center cursor-pointer active:scale-90 transition-transform"
                      >
                        ✕
                      </button>
                    )}
                  </div>

                  {/* DESPLEGABLE MOBILE-OPTIMIZED */}
                  <AnimatePresence>
                    {liveSearchQuery.trim().length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        className="absolute top-full left-0 w-full mt-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden max-h-80 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800"
                      >
                        {/* 1. PROFESIONALES MATCH */}
                        {searchSuggestions.matchingPros.length > 0 && (
                          <div className="p-3">
                            <span className="text-[10px] font-black uppercase tracking-widest text-[#259CF4] block mb-2 px-2">
                              Profesionales Encontrados ({searchSuggestions.matchingPros.length})
                            </span>
                            <div className="space-y-1">
                              {searchSuggestions.matchingPros.map((pro) => (
                                <button
                                  key={pro.id}
                                  onClick={() => {
                                    setSelectedArea(pro.area || 'Todas');
                                    setSelectedEspecialidad(pro.specialty || 'Todas');
                                    setSelectedProfesionalId(pro.id.toString());
                                    setLiveSearchQuery('');
                                    setCurrentStep(3);
                                  }}
                                  className="w-full text-left p-2.5 rounded-xl hover:bg-cyan-50 dark:hover:bg-slate-800 flex items-center gap-3 transition-colors cursor-pointer group active:bg-cyan-100 min-h-[48px]"
                                >
                                  <div className="relative w-10 h-10 rounded-full overflow-hidden bg-slate-200 dark:bg-slate-800 shrink-0 border border-slate-200 dark:border-slate-700">
                                    <Image
                                      src={pro.image || '/img_profesionales/perfilDefault.jpg'}
                                      alt={pro.name}
                                      fill
                                      className="object-cover group-hover:scale-105 transition-transform"
                                      onError={(e) => {
                                        (e.target as any).src = "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80";
                                      }}
                                    />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="text-xs font-black text-slate-900 dark:text-white truncate group-hover:text-[#259CF4] transition-colors">
                                      {pro.name}
                                    </div>
                                    <div className="text-[10px] text-slate-500 truncate flex items-center gap-1 mt-0.5">
                                      <span>{pro.specialty}</span>
                                      {getLocationBadges(pro.sucursal).map((b, idx) => (
                                        <span
                                          key={idx}
                                          className={`px-1.5 py-0.2 rounded font-extrabold text-[8px] border ${b.bg} ${b.text} ${b.border}`}
                                        >
                                          {b.label}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                  <ChevronRight size={16} className="text-slate-400 group-hover:text-[#259CF4] group-hover:translate-x-0.5 transition-transform" />
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* 2. ESPECIALIDADES MATCH */}
                        {searchSuggestions.matchingSpecs.length > 0 && (
                          <div className="p-3 bg-slate-50/50 dark:bg-slate-950/50">
                            <span className="text-[10px] font-black uppercase tracking-widest text-[#162158] dark:text-cyan-400 block mb-2 px-2">
                              Especialidades ({searchSuggestions.matchingSpecs.length})
                            </span>
                            <div className="space-y-1">
                              {searchSuggestions.matchingSpecs.map((spec, i) => (
                                <button
                                  key={i}
                                  onClick={() => {
                                    setSelectedEspecialidad(spec);
                                    setLiveSearchQuery('');
                                    setCurrentStep(2);
                                  }}
                                  className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-white dark:hover:bg-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center justify-between transition-colors cursor-pointer active:bg-slate-100 min-h-[44px]"
                                >
                                  <div className="flex items-center gap-2">
                                    <Stethoscope size={14} className="text-[#259CF4]" />
                                    <span>{spec}</span>
                                  </div>
                                  <ChevronRight size={16} className="text-slate-400" />
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* SIN RESULTADOS */}
                        {searchSuggestions.matchingPros.length === 0 && searchSuggestions.matchingSpecs.length === 0 && (
                          <div className="p-4 text-center text-xs text-slate-400">
                            No se encontraron profesionales ni especialidades para "{liveSearchQuery}".
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>



                {/* MODOS EN TARJETAS DE TOQUE COMPACTAS */}
                <div className="grid grid-cols-1 gap-3">
                  {[
                    { mode: 'sucursal', title: 'Buscar por Centro Médico', desc: 'Selecciona entre Sucursal Vitacura o Tribunales.', icon: Building2 },
                    { mode: 'especialidad', title: 'Buscar por Especialidad', desc: 'Odontología, Medicina General, Salud Mental y más.', icon: Stethoscope },
                    { mode: 'profesional', title: 'Buscar por Profesional', desc: 'Encuentra a tu médico o especialista por su nombre.', icon: User },
                  ].map((item) => {
                    const Icon = item.icon;
                    const isSelected = searchMode === item.mode;

                    return (
                      <button
                        key={item.mode}
                        onClick={() => {
                          setSearchMode(item.mode as SearchMode);
                          setSelectedArea("Seleccionar");
                          setSelectedEspecialidad("Seleccionar");
                          setSelectedSucursal("Seleccionar");
                          setSelectedProfesionalId("Todos");
                          setProSearchInput("");
                          setCurrentStep(2);
                        }}
                        className={`w-full text-left p-3.5 sm:p-4 rounded-2xl border transition-all duration-200 flex items-center justify-between group cursor-pointer active:scale-98 ${isSelected
                          ? 'bg-white dark:bg-slate-800 border-[#259CF4] shadow-md ring-2 ring-[#259CF4]/20'
                          : 'bg-slate-50/70 dark:bg-slate-950/40 border-slate-200 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-800'
                          }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-2xl flex items-center justify-center shrink-0 transition-colors ${isSelected ? 'bg-[#259CF4] text-white shadow-md' : 'bg-white dark:bg-slate-800 text-[#162158] dark:text-cyan-400 border border-slate-200 dark:border-slate-700'
                            }`}>
                            <Icon size={18} />
                          </div>
                          <div>
                            <div className="text-xs sm:text-sm font-black text-slate-900 dark:text-white group-hover:text-[#259CF4] transition-colors">
                              {item.title}
                            </div>
                            <div className="text-[11px] text-slate-500 dark:text-slate-400">
                              {item.desc}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 text-xs font-bold text-[#259CF4] shrink-0">
                          <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* ================= PASO 2: FILTROS DINÁMICOS Y PROFESIONALES (2 COLUMNAS EN DESKTOP) ================= */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.2 }}
                className="space-y-5 max-w-4xl mx-auto"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                  {/* COLUMNA 1 (IZQUIERDA): ENCABEZADO, FILTROS DE ÁREA Y CONTROLES */}
                  <div className="lg:col-span-5 space-y-5">
                    <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                      <div>
                        <span className="text-[10px] font-black text-[#259CF4] uppercase tracking-widest">
                          PASO 2 DE 3
                        </span>
                        <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white mt-0.5">
                          Servicio y Profesional
                        </h3>
                      </div>
                      <button
                        onClick={() => setCurrentStep(1)}
                        className="text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-white flex items-center gap-1 cursor-pointer active:scale-95"
                      >
                        <ChevronLeft size={14} /> Paso 1
                      </button>
                    </div>

                    {/* SI ES MODO BÚSQUEDA POR PROFESIONAL: BUSCADOR POR NOMBRE ARRIBA DE ÁREAS */}
                    {searchMode === 'profesional' && (
                      <div className="space-y-1.5 bg-slate-50/80 dark:bg-slate-950/40 p-4 rounded-3xl border border-slate-200/60 dark:border-slate-800">
                        <div className="flex items-center justify-between mb-1">
                          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                            Buscar por Nombre del Médico
                          </label>
                          {(proSearchInput || selectedArea !== 'Todas') && (
                            <button
                              type="button"
                              onClick={() => {
                                setProSearchInput('');
                                setSelectedArea('Todas');
                                setSelectedEspecialidad('Todas');
                                setSelectedProfesionalId('Todos');
                              }}
                              className="text-[11px] font-extrabold text-[#259CF4] hover:text-[#162158] dark:hover:text-cyan-300 flex items-center gap-1 cursor-pointer transition-colors active:scale-95"
                            >
                              <RotateCcw size={11} /> Limpiar
                            </button>
                          )}
                        </div>
                        <div className="relative">
                          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#259CF4] w-4 h-4" />
                          <input
                            type="text"
                            placeholder="Escribe el nombre del médico o especialidad..."
                            value={proSearchInput}
                            onChange={(e) => setProSearchInput(e.target.value)}
                            className="w-full bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 focus:border-[#259CF4] rounded-xl pl-10 pr-8 py-2.5 text-xs text-slate-800 dark:text-white font-bold outline-none transition-all shadow-sm min-h-[44px]"
                          />
                          {proSearchInput && (
                            <button
                              type="button"
                              onClick={() => setProSearchInput('')}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600 dark:hover:text-white bg-slate-100 dark:bg-slate-800 rounded-full w-5 h-5 flex items-center justify-center cursor-pointer"
                            >
                              ✕
                            </button>
                          )}
                        </div>
                      </div>
                    )}

                    {/* SELECCIÓN DE ÁREAS CLÍNICAS (SI NO ES BÚSQUEDA POR CENTRO MÉDICO) */}
                    {searchMode !== 'sucursal' ? (
                      <div className="space-y-2 bg-slate-50/80 dark:bg-slate-950/40 p-4 rounded-3xl border border-slate-200/60 dark:border-slate-800">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block px-1">
                          Filtrar Área Clínica:
                        </span>
                        <div className="flex flex-wrap lg:flex-col gap-2">
                          {availableAreas.map((area) => {
                            const areaColor = getAreaColor(area);
                            const isSelected = selectedArea === area;
                            const AreaIcon = area === 'Todas' ? Sparkles : areaColor.icon;
                            return (
                              <button
                                key={area}
                                type="button"
                                onClick={() => {
                                  setSelectedArea(area as Area | "Todas");
                                  setSelectedEspecialidad("Todas");
                                  setSelectedProfesionalId("Todos");
                                }}
                                className={`w-full text-left px-3 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer active:scale-95 border flex items-center justify-between group ${isSelected
                                  ? (area === 'Todas' ? 'bg-[#162158] text-white ring-2 ring-[#162158]/30 shadow-md border-transparent' : areaColor.pillActive)
                                  : (area === 'Todas' ? 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-slate-300' : areaColor.pillInactive)
                                  }`}
                              >
                                <div className="flex items-center gap-2.5 min-w-0">
                                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 ${isSelected
                                    ? 'bg-white/20 text-white'
                                    : `${areaColor.badgeBg} ${areaColor.specialtyColor} border ${areaColor.badgeBorder}`
                                    }`}>
                                    <AreaIcon size={14} />
                                  </div>
                                  <span className="truncate">{area === 'Todas' ? 'Todas las Áreas' : area}</span>
                                </div>
                                {isSelected && <Check size={14} className="shrink-0" />}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ) : (
                      /* SI ES BÚSQUEDA POR CENTRO MÉDICO: PRIMERO SUCURSAL, LUEGO DROPDOWN ÁREA CLÍNICA */
                      <div className="space-y-4 bg-slate-50/80 dark:bg-slate-950/40 p-4 rounded-3xl border border-slate-200/60 dark:border-slate-800">
                        <div className="flex items-center justify-between pb-1 border-b border-slate-200/60 dark:border-slate-800">
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                            Filtro Centro Médico
                          </span>
                          {(selectedSucursal !== 'Seleccionar' || selectedArea !== 'Seleccionar') && (
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedSucursal('Seleccionar');
                                setSelectedArea('Seleccionar');
                                setSelectedEspecialidad('Todas');
                                setSelectedProfesionalId('Todos');
                              }}
                              className="text-[11px] font-extrabold text-[#259CF4] hover:text-[#162158] dark:hover:text-cyan-300 flex items-center gap-1 cursor-pointer transition-colors active:scale-95"
                            >
                              <RotateCcw size={11} /> Limpiar
                            </button>
                          )}
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center justify-between">
                            <span>1. Selecciona Centro Médico</span>
                            <Building2 size={15} className="text-[#259CF4]" />
                          </label>
                          <select
                            value={selectedSucursal}
                            onChange={(e) => setSelectedSucursal(e.target.value)}
                            className="w-full bg-white dark:bg-slate-900 border-2 border-[#259CF4] rounded-xl py-2.5 px-3 text-xs text-slate-800 dark:text-white font-bold focus:outline-none ring-2 ring-[#259CF4]/20 min-h-[44px]"
                          >
                            <option value="Seleccionar">-- Selecciona una Sucursal --</option>
                            <option value="Vitacura">Sucursal Vitacura (Av. Vitacura #8620)</option>
                            <option value="Los Tribunales">Sucursal Los Tribunales (Calle Los Tribunales #1268)</option>
                            <option value="Todas">Todas las Sucursales (Ver todos)</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center justify-between">
                            <span>2. Área Clínica a buscar</span>
                            <Layers size={15} className="text-[#259CF4]" />
                          </label>
                          <select
                            value={selectedArea}
                            onChange={(e) => {
                              setSelectedArea(e.target.value);
                              setSelectedEspecialidad("Todas");
                              setSelectedProfesionalId("Todos");
                            }}
                            className="w-full bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 rounded-xl py-2.5 px-3 text-xs text-slate-800 dark:text-white font-bold focus:outline-none focus:ring-2 focus:ring-[#259CF4] min-h-[44px]"
                          >
                            <option value="Seleccionar">-- Selecciona Área Clínica --</option>
                            {availableAreas.map((area) => (
                              <option key={area} value={area}>
                                {area === 'Todas' ? 'Todas las Áreas Clínicas (Ver todas)' : area}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    )}

                    {/* CONTROLES ADICIONALES (SELECCIÓN DE ESPECIALIDAD / SUCURSAL) */}
                    {searchMode === 'especialidad' && (
                      <div className="space-y-4 bg-slate-50/80 dark:bg-slate-950/40 p-4 rounded-3xl border border-slate-200/60 dark:border-slate-800">
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                              <span>Especialidad Clínica</span>
                              {selectedArea !== 'Todas' && (
                                <span className="text-[10px] font-black text-[#259CF4] uppercase">({selectedArea})</span>
                              )}
                            </label>
                            {(selectedEspecialidad !== 'Todas' || selectedSucursal !== 'Todas') && (
                              <button
                                type="button"
                                onClick={() => {
                                  setSelectedEspecialidad('Todas');
                                  setSelectedSucursal('Todas');
                                  setSelectedProfesionalId('Todos');
                                }}
                                className="text-[11px] font-extrabold text-[#259CF4] hover:text-[#162158] dark:hover:text-cyan-300 flex items-center gap-1 cursor-pointer transition-colors active:scale-95"
                              >
                                <RotateCcw size={11} /> Limpiar
                              </button>
                            )}
                          </div>
                          <select
                            value={selectedEspecialidad}
                            onChange={(e) => {
                              setSelectedEspecialidad(e.target.value);
                              setSelectedProfesionalId("Todos");
                            }}
                            className="w-full bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 rounded-xl py-2.5 px-3 text-xs text-slate-800 dark:text-white font-bold focus:outline-none focus:ring-2 focus:ring-[#259CF4] min-h-[44px]"
                          >
                            {availableSpecialties.map((esp) => (
                              <option key={esp} value={esp}>
                                {esp === 'Todas'
                                  ? (selectedArea !== 'Todas' ? `Todas las especialidades de ${selectedArea}` : 'Todas las especialidades disponibles')
                                  : esp}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                            Filtro Opcional de Sucursal
                          </label>
                          <select
                            value={selectedSucursal}
                            onChange={(e) => setSelectedSucursal(e.target.value)}
                            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl py-2.5 px-3 text-xs text-slate-800 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-[#259CF4] min-h-[44px]"
                          >
                            <option value="Todas">Todas las Sucursales</option>
                            <option value="Vitacura">Sucursal Vitacura #8620</option>
                            <option value="Los Tribunales">Sucursal Los Tribunales</option>
                          </select>
                        </div>
                      </div>
                    )}

                    {/* BOTÓN GENERAL DE REINICIO DE FILTROS PASO 2 */}
                    {(selectedArea !== 'Todas' || selectedEspecialidad !== 'Todas' || selectedSucursal !== 'Todas' || proSearchInput || selectedProfesionalId !== 'Todos') && (
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedArea('Todas');
                          setSelectedEspecialidad('Todas');
                          setSelectedSucursal('Todas');
                          setSelectedProfesionalId('Todos');
                          setProSearchInput('');
                        }}
                        className="w-full py-2.5 px-3 bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700/80 text-slate-600 dark:text-slate-300 hover:text-[#259CF4] rounded-2xl text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-98 border border-slate-200/60 dark:border-slate-700/60"
                      >
                        <RotateCcw size={13} /> Limpiar todos los filtros
                      </button>
                    )}

                  </div>

                  {/* COLUMNA 2 (DERECHA): VISTA Y SELECCIÓN DE PROFESIONALES CON FOTOS */}
                  <div className="lg:col-span-7 bg-slate-50/80 dark:bg-slate-950/40 p-4 sm:p-5 rounded-3xl border border-slate-200/60 dark:border-slate-800 space-y-4">

                    {/* BANNER DE MODALIDAD */}
                    <div className="bg-cyan-50/80 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-800/60 p-3 rounded-2xl flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span className="font-bold text-slate-500 shrink-0">Buscando:</span>
                        <span className="font-black text-[#162158] dark:text-cyan-300 uppercase tracking-wider truncate">
                          {searchMode === 'especialidad' && 'Por Especialidad'}
                          {searchMode === 'profesional' && 'Por Profesional'}
                          {searchMode === 'sucursal' && 'Por Sucursal'}
                        </span>
                      </div>
                      <span className="text-[10px] font-bold text-[#259CF4] bg-white dark:bg-slate-900 px-2.5 py-1 rounded-md shrink-0 border border-cyan-100 dark:border-slate-800">
                        {searchMode === 'profesional' ? proSearchFilteredList.length : filteredProfessionalsList.length} disponibles
                      </span>
                    </div>

                    {/* LISTA CON FOTOS DE PERFIL Y COLORES DE ÁREA */}
                    {!hasActiveSelection ? (
                      /* ESTADO INICIAL SIN RESULTADOS (INCENTIVA A SELECCIONAR OPCIONES A LA IZQUIERDA) */
                      <div className="p-8 text-center bg-white/60 dark:bg-slate-900/60 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 space-y-3 my-4">
                        <div className="w-12 h-12 rounded-full bg-cyan-50 dark:bg-cyan-950/60 text-[#259CF4] flex items-center justify-center mx-auto border border-cyan-200 dark:border-cyan-800">
                          {searchMode === 'sucursal' ? <Building2 size={22} /> : searchMode === 'especialidad' ? <Stethoscope size={22} /> : <Search size={22} />}
                        </div>
                        <div className="space-y-1">
                          <h4 className="text-xs font-black text-slate-900 dark:text-white">
                            {searchMode === 'sucursal' && 'Selecciona Centro Médico o Área'}
                            {searchMode === 'especialidad' && 'Selecciona un Área o Especialidad'}
                            {searchMode === 'profesional' && 'Busca a tu Profesional por Nombre'}
                          </h4>
                          <p className="text-[11px] text-slate-500 max-w-xs mx-auto leading-relaxed">
                            {searchMode === 'sucursal' && 'Elige una sucursal o un área médica en los desplegables de la izquierda para ver a los especialistas disponibles.'}
                            {searchMode === 'especialidad' && 'Selecciona un área médica o especialidad a la izquierda para ver a los profesionales disponibles.'}
                            {searchMode === 'profesional' && 'Escribe el nombre de tu médico a la izquierda o selecciona un Área Clínica para ver a los especialistas disponibles.'}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2.5 max-h-[440px] overflow-y-auto pr-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">

                        {/* Lista de Profesionales con Fotos de Perfil y Colores de Área */}
                        {proSearchFilteredList.map((pro) => {
                          const isSelected = selectedProfesionalId === pro.id.toString();
                          const areaColor = getAreaColor(pro.area);
                          return (
                            <button
                              key={pro.id}
                              type="button"
                              onClick={() => {
                                setSelectedProfesionalId(pro.id.toString());
                                if (pro.area) setSelectedArea(pro.area);
                                if (pro.specialty) setSelectedEspecialidad(pro.specialty);
                                setSearchDone(false);
                                setCurrentStep(3);
                              }}
                              className={`w-full text-left p-3 rounded-2xl border transition-all flex items-center gap-3.5 cursor-pointer group ${isSelected
                                ? 'bg-white dark:bg-slate-800 border-[#259CF4] ring-2 ring-[#259CF4]/20 shadow-sm'
                                : 'bg-white/70 dark:bg-slate-900/70 border-slate-200 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-800'
                                }`}
                            >
                              {/* Foto de Perfil del Profesional con Borde del Color de su Área */}
                              <div className={`relative w-12 h-12 rounded-full overflow-hidden bg-slate-200 dark:bg-slate-800 shrink-0 border-2 ${areaColor.avatarBorder} group-hover:scale-105 transition-all shadow-xs`}>
                                <Image
                                  src={pro.image || '/img_profesionales/perfilDefault.jpg'}
                                  alt={pro.name}
                                  fill
                                  className="object-cover group-hover:scale-105 transition-transform"
                                  onError={(e) => {
                                    (e.target as any).src = "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80";
                                  }}
                                />
                              </div>

                              <div className="flex-1 min-w-0">
                                <div className="text-xs sm:text-sm font-black text-slate-900 dark:text-white truncate group-hover:text-[#259CF4] transition-colors">
                                  {pro.name}
                                </div>
                                <div className={`text-[11px] font-bold truncate ${areaColor.specialtyColor}`}>
                                  {pro.specialty}
                                </div>
                                <div className="text-[10px] text-slate-500 flex flex-wrap items-center gap-1 mt-1">
                                  <span className={`px-1.5 py-0.5 rounded-md font-black text-[9px] border ${areaColor.badgeBg} ${areaColor.badgeText} ${areaColor.badgeBorder}`}>
                                    {pro.area || 'Salud'}
                                  </span>
                                  {getLocationBadges(pro.sucursal).map((b, idx) => (
                                    <span
                                      key={idx}
                                      className={`px-1.5 py-0.5 rounded-md font-extrabold text-[9px] border ${b.bg} ${b.text} ${b.border}`}
                                    >
                                      {b.label}
                                    </span>
                                  ))}
                                </div>
                              </div>

                              {isSelected ? (
                                <CheckCircle2 size={20} className="text-[#259CF4] shrink-0" />
                              ) : (
                                <ChevronRight size={18} className="text-slate-400 group-hover:text-[#259CF4] transition-colors shrink-0" />
                              )}
                            </button>
                          );
                        })}

                        {proSearchFilteredList.length === 0 && (
                          <div className="p-4 text-center text-xs text-slate-400">
                            No se encontraron profesionales con la búsqueda seleccionada.
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* BARRA DE NAVEGACIÓN PASO 2 - ALINEADA A LA DERECHA */}
                  <div className="lg:col-span-12 flex items-center justify-end gap-3 pt-4 border-t border-slate-200/80 dark:border-slate-800">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="px-5 py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-2xl text-xs font-bold transition-all cursor-pointer active:scale-95 min-h-[46px]"
                    >
                      Atrás
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSearchDone(false);
                        setCurrentStep(3);
                      }}
                      className="px-6 py-3.5 bg-[#162158] hover:bg-[#259CF4] text-white rounded-full text-xs sm:text-sm font-bold shadow-md transition-all flex items-center gap-2 cursor-pointer active:scale-98 min-h-[48px]"
                    >
                      Continuar con la Reserva <ArrowRight size={16} />
                    </button>
                  </div>

                </div>
              </motion.div>
            )}

            {/* ================= PASO 3: IDENTIFICACIÓN DEL PACIENTE Y DISPONIBILIDAD ================= */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.2 }}
                className="space-y-6 max-w-4xl mx-auto w-full"
              >
                {/* ENCABEZADO PASO 3 Y EDITAR FILTROS */}
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                  <div>
                    <span className="text-[10px] font-black text-[#259CF4] uppercase tracking-widest">
                      PASO 3 DE 3
                    </span>
                    <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white mt-0.5">
                      Ingresa Tus Datos
                    </h3>
                  </div>
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-white flex items-center gap-1 cursor-pointer active:scale-95"
                  >
                    <ChevronLeft size={14} /> Editar Filtros
                  </button>
                </div>

                {/* FILA 1 (ANCHO COMPLETO): TARJETA UNIFICADA PROFESIONAL EN 1 SOLO FRAME CON 2 COLUMNAS INTERNAS */}
                {(() => {
                  const currentSpecName = selectedProObj?.specialty || (selectedEspecialidad !== 'Seleccionar' && selectedEspecialidad !== 'Todas' ? selectedEspecialidad : null);
                  const specDetail = getSpecialtyDetail(currentSpecName || undefined);
                  const areaColor = getAreaColor(selectedProObj?.area || selectedArea);

                  return (
                    <div className="bg-gradient-to-r from-slate-50/90 via-white to-cyan-50/50 dark:from-slate-900/90 dark:via-slate-900/70 dark:to-cyan-950/30 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-4 sm:p-5 shadow-sm w-full">
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                        
                        {/* COLUMNA IZQUIERDA (5 COLS): FOTO, NOMBRE, ÁREA Y SUCURSAL */}
                        <div className="md:col-span-5 flex items-center gap-3.5 pr-0 md:pr-2">
                          <div className={`relative w-13 h-13 sm:w-14 sm:h-14 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0 border-2 ${areaColor.avatarBorder} shadow-sm`}>
                            {selectedProObj ? (
                              <Image
                                src={selectedProObj.image || '/img_profesionales/perfilDefault.jpg'}
                                alt={selectedProObj.name}
                                fill
                                className="object-cover"
                                onError={(e) => {
                                  (e.target as any).src = "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80";
                                }}
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#162158] to-[#259CF4] text-white">
                                <Stethoscope size={22} />
                              </div>
                            )}
                          </div>

                          <div className="space-y-1 min-w-0 flex-1">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="text-[10px] font-black text-[#259CF4] uppercase tracking-wider">
                                Resumen de Reserva
                              </span>
                              {selectedSucursal && selectedSucursal !== 'Seleccionar' && (
                                <span className="text-[9px] font-extrabold text-slate-700 dark:text-cyan-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2 py-0.5 rounded-md shadow-2xs flex items-center gap-1">
                                  <MapPin size={11} className="text-[#259CF4]" />
                                  <span>{selectedSucursal}</span>
                                </span>
                              )}
                            </div>
                            
                            <div className="font-black text-sm sm:text-base text-[#162158] dark:text-white truncate">
                              {selectedProObj ? selectedProObj.name : 'Cualquier Profesional'}
                            </div>

                            <div className="flex flex-wrap items-center gap-1.5 text-xs">
                              <span className={`px-2 py-0.5 rounded-md font-black text-[10px] border ${areaColor.badgeBg} ${areaColor.badgeText} ${areaColor.badgeBorder}`}>
                                {selectedArea}
                              </span>
                              <span className="text-slate-400">•</span>
                              <span className="font-extrabold text-[#259CF4] dark:text-cyan-400">
                                {selectedEspecialidad}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* DIVISOR VERTICAL ELEGANTE */}
                        <div className="hidden md:block md:col-span-1 flex justify-center">
                          <div className="h-16 w-px bg-slate-200 dark:bg-slate-800" />
                        </div>

                        {/* COLUMNA DERECHA (6 COLS): SOBRE LA ESPECIALIDAD Y ÁREAS DE ENFOQUE */}
                        <div className="md:col-span-6 space-y-2">
                          <div className="flex items-center gap-1.5 text-xs font-black text-[#162158] dark:text-cyan-300 uppercase tracking-wider">
                            <Sparkles size={14} className="text-[#259CF4]" />
                            <span>Sobre la Especialidad{currentSpecName ? `: ${currentSpecName}` : ''}</span>
                          </div>

                          {specDetail ? (
                            <>
                              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium line-clamp-2">
                                {specDetail.description}
                              </p>

                              {specDetail.focusAreas && specDetail.focusAreas.length > 0 && (
                                <div className="flex flex-wrap gap-1.5 pt-0.5">
                                  {specDetail.focusAreas.slice(0, 3).map((area, i) => (
                                    <span
                                      key={i}
                                      className="text-[10px] font-bold text-slate-700 dark:text-slate-200 bg-white/90 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 px-2 py-0.5 rounded-md shadow-2xs flex items-center gap-1"
                                    >
                                      <CheckCircle2 size={10} className="text-[#259CF4]" />
                                      <span>{area}</span>
                                    </span>
                                  ))}
                                </div>
                              )}
                            </>
                          ) : (
                            <p className="text-xs text-slate-400 font-medium italic">
                              Atención médica profesional en {selectedArea}.
                            </p>
                          )}
                        </div>

                      </div>
                    </div>
                  );
                })()}
                {/* FILA 2: FORMULARIO DE INGRESO RUT / PASAPORTE (SE OCULTA AL CONSULTAR) */}
                {!searchDone && (
                  <form onSubmit={handleBuscarHoras} className="space-y-4 max-w-xl mx-auto w-full pt-1">
                    {/* Selector RUT / Pasaporte */}
                    <div className="bg-slate-200 dark:bg-slate-800 p-1 rounded-2xl flex">
                      <button
                        type="button"
                        onClick={() => setDocType('rut')}
                        className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer active:scale-95 ${docType === 'rut'
                          ? 'bg-[#162158] text-white shadow-sm'
                          : 'text-slate-600 dark:text-slate-400'
                          }`}
                      >
                        RUT
                      </button>
                      <button
                        type="button"
                        onClick={() => setDocType('pasaporte')}
                        className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer active:scale-95 ${docType === 'pasaporte'
                          ? 'bg-[#162158] text-white shadow-sm'
                          : 'text-slate-600 dark:text-slate-400'
                          }`}
                      >
                        Pasaporte
                      </button>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        {docType === 'rut' ? 'Ingresa tu RUT (ej: 12.345.678-9)' : 'N° Pasaporte'}
                      </label>
                      <input
                        type="text"
                        inputMode={docType === 'rut' ? "numeric" : "text"}
                        required
                        placeholder={docType === 'rut' ? '12.345.678-K' : 'A12345678'}
                        value={rutInput}
                        onChange={handleRutChange}
                        maxLength={docType === 'rut' ? 12 : 20}
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl py-3 px-3 text-xs sm:text-sm text-slate-800 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-[#259CF4] min-h-[48px]"
                      />
                    </div>

                    {/* BUTTON DE CONSULTAR */}
                    <div className="pt-2 sticky bottom-2 sm:static z-10">
                      <button
                        type="submit"
                        disabled={isSearching}
                        className="w-full bg-[#162158] hover:bg-[#259CF4] text-white font-bold py-3.5 px-4 rounded-full text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98 min-h-[48px]"
                      >
                        {isSearching ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Consultando Disponibilidad...
                          </>
                        ) : (
                          <>
                            <Search size={16} />
                            Consultar Disponibilidad
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}

                {/* FILA 3 (ANCHO COMPLETO ABAJO): CONTENEDOR DE RESULTADOS DE DISPONIBILIDAD */}
                <AnimatePresence>
                  {searchDone && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.3 }}
                      className="w-full bg-slate-50/80 dark:bg-slate-950/70 p-5 sm:p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-md pt-4"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/80 dark:border-slate-800 pb-3.5">
                        <div className="space-y-1">
                          <h4 className="text-sm sm:text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                            <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
                            Disponibilidad Encontrada ({filteredProfessionalsList.length} Médicos)
                          </h4>
                          <div className="flex items-center gap-2 flex-wrap text-xs">
                            <span className="text-slate-500 font-medium">Consulta realizada para paciente:</span>
                            <span className="inline-flex items-center gap-1 font-extrabold text-[#162158] dark:text-cyan-300 bg-white dark:bg-slate-800 border border-cyan-200 dark:border-cyan-800 px-2.5 py-0.5 rounded-lg shadow-2xs">
                              <User size={11} className="text-[#259CF4]" />
                              <span>{docType === 'rut' ? 'RUT' : 'Pasaporte'}: <strong className="font-black">{rutInput}</strong></span>
                            </span>
                            <button
                              type="button"
                              onClick={() => setSearchDone(false)}
                              className="text-xs font-bold text-[#259CF4] hover:underline cursor-pointer flex items-center gap-0.5 ml-1"
                            >
                              <Edit size={11} /> Cambiar
                            </button>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={handleReset}
                          className="text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-white flex items-center justify-center gap-1 cursor-pointer bg-white dark:bg-slate-800 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 active:scale-95 self-start sm:self-auto shrink-0 shadow-sm"
                        >
                          <RotateCcw size={12} /> Nueva Búsqueda
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 max-h-[480px] overflow-y-auto pr-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                        {filteredProfessionalsList.slice(0, 6).map((pro) => {
                          const areaColor = getAreaColor(pro.area);
                          return (
                            <div key={pro.id} className="group border border-slate-200/90 dark:border-slate-800 rounded-2xl p-3.5 hover:border-[#259CF4] transition-all bg-white dark:bg-slate-900 flex flex-col justify-between shadow-xs space-y-3">
                              <div>
                                <div className="flex justify-between items-start mb-1.5 gap-1">
                                  <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-md border ${areaColor.badgeBg} ${areaColor.badgeText} ${areaColor.badgeBorder} truncate`}>
                                    {pro.area}
                                  </span>
                                  <span className="text-[9px] font-extrabold text-[#162158] dark:text-cyan-300 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2 py-0.5 rounded-md shrink-0 flex items-center gap-1 shadow-2xs">
                                    <MapPin size={10} className="text-[#259CF4]" />
                                    <span>{formatSucursalBadge(pro.sucursal)}</span>
                                  </span>
                                </div>

                                <div className="text-xs font-black text-[#162158] dark:text-white mb-0.5">
                                  {pro.name}
                                </div>
                                <div className={`text-[11px] font-bold mb-2 ${areaColor.specialtyColor}`}>
                                  {pro.specialty}
                                </div>

                                <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                                  <Clock size={11} /> Próximo bloque en 24h
                                </div>
                              </div>

                              <a
                                href={pro.bookingLink || "https://ff.healthatom.io/gNJNh6"}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full bg-[#162158] group-hover:bg-[#259CF4] hover:bg-[#259CF4] text-white font-bold text-xs py-2.5 px-3 rounded-full transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-98 min-h-[44px]"
                              >
                                Agendar Hora en Línea <ArrowRight size={13} />
                              </a>
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};
