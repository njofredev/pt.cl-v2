"use client";

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Calendar as CalendarIcon,
  Clock,
  User,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Search,
  MapPin,
  Sparkles,
  Phone,
  Mail,
  ShieldCheck,
  Stethoscope,
  SmilePlus,
  RefreshCw,
  Download,
  CalendarPlus,
  ChevronLeft,
  ChevronRight,
  Printer,
  Check,
  UserCheck,
  Building2,
  HeartHandshake,
  FileText,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatRutDisplay, formatRutForHealthatom, isValidChileanRut } from '@/lib/healthatom/rut';
import { DayAvailability, CleanSlot, HealthatomPlatform } from '@/lib/healthatom/types';

interface ProfessionalItem {
  id: number;
  nombre: string;
  apellidos: string;
  nombreCompleto: string;
  imageUrl?: string | null;
  id_especialidad?: number;
  especialidad: string;
  id_sucursal?: number;
  sucursales_ids?: number[];
  intervalo?: number;
  agenda_online?: number;
}

interface BranchItem {
  id: number;
  nombre: string;
  direccion?: string;
  comuna?: string;
}

interface SpecialtyItem {
  id: number;
  nombre: string;
}

function DoctorAvatar({
  pro,
  size = 'md',
}: {
  pro: { nombre: string; apellidos: string; nombreCompleto: string; imageUrl?: string | null };
  size?: 'sm' | 'md' | 'lg';
}) {
  const [imageError, setImageError] = useState(false);

  const sizeClasses = {
    sm: 'w-10 h-10 text-xs rounded-xl',
    md: 'w-13 h-13 sm:w-14 sm:h-14 text-sm rounded-2xl',
    lg: 'w-16 h-16 text-base rounded-2xl',
  }[size];

  if (pro.imageUrl && !imageError) {
    return (
      <div
        className={`relative ${sizeClasses} overflow-hidden shrink-0 shadow-md border-2 border-white dark:border-slate-800 ring-2 ring-primary/10 group-hover:ring-[#259CF4]/40 transition-all bg-slate-100 dark:bg-slate-800`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={pro.imageUrl}
          alt={`Foto de ${pro.nombreCompleto}`}
          onError={() => setImageError(true)}
          className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
        />
      </div>
    );
  }

  const initial1 = (pro.nombre || '').trim()[0] || 'D';
  const initial2 = (pro.apellidos || '').trim()[0] || 'R';

  return (
    <div
      className={`${sizeClasses} bg-gradient-to-tr from-[#162158] to-[#259CF4] text-white font-bold flex items-center justify-center shrink-0 shadow-md ring-2 ring-primary/10`}
    >
      {initial1}
      {initial2}
    </div>
  );
}

export function RealBookingScheduler() {
  // -------------------------------------------------------------
  // Stepper State:
  // Paso 1: Identificación (RUT y Datos)
  // Paso 2: Área y Especialista (Salud Dental / Medicina)
  // Paso 3: Fecha y Horario
  // Paso 4: Resumen y Confirmación
  // -------------------------------------------------------------
  const [step, setStep] = useState<number>(1);

  // Paso 1: Identificación Paciente
  const [rawRut, setRawRut] = useState<string>('');
  const [rutLookupLoading, setRutLookupLoading] = useState<boolean>(false);
  const [patientLookupDone, setPatientLookupDone] = useState<boolean>(false);
  const [patientExists, setPatientExists] = useState<boolean>(false);
  const [patientToken, setPatientToken] = useState<string | null>(null);
  const [maskedPatientData, setMaskedPatientData] = useState<{
    first_name: string;
    masked_last_name: string;
    masked_email: string;
    masked_phone: string;
  } | null>(null);

  const [newPatientData, setNewPatientData] = useState({
    nombre: '',
    apellidos: '',
    email: '',
    celular: '',
    fecha_nacimiento: '',
    id_prevision: '1',
  });
  const [updateContactToggle, setUpdateContactToggle] = useState<boolean>(false);

  // Paso 2: Selección de Área y Profesionales
  const [platform, setPlatform] = useState<HealthatomPlatform | null>(null);
  const [catalogLoading, setCatalogLoading] = useState<boolean>(false);
  const [sucursales, setSucursales] = useState<BranchItem[]>([]);
  const [especialidades, setEspecialidades] = useState<SpecialtyItem[]>([]);
  const [profesionales, setProfesionales] = useState<ProfessionalItem[]>([]);
  const [selectedBranchId, setSelectedBranchId] = useState<number | 'all'>('all');
  const [currentBranchId, setCurrentBranchId] = useState<number | 'all'>('all');
  const [selectedReason, setSelectedReason] = useState<string>('Primera consulta / Diagnóstico y evaluación');

  const [searchTab, setSearchTab] = useState<'specialty' | 'doctor'>('doctor');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('all');
  const [doctorSearchQuery, setDoctorSearchQuery] = useState<string>('');
  const [selectedDoctor, setSelectedDoctor] = useState<ProfessionalItem | null>(null);

  // Paso 3: Disponibilidad Horaria
  const [availabilityLoading, setAvailabilityLoading] = useState<boolean>(false);
  const [availability, setAvailability] = useState<DayAvailability[]>([]);
  const [nextAvailableSlot, setNextAvailableSlot] = useState<{ fecha: string; hora: string; periodo: string } | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedSlot, setSelectedSlot] = useState<CleanSlot | null>(null);
  const [weekOffsetDays, setWeekOffsetDays] = useState<number>(0);

  // Paso 4: Confirmación Final
  const [bookingLoading, setBookingLoading] = useState<boolean>(false);
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [confirmationData, setConfirmationData] = useState<{
    folio: string;
    id_cita: number;
    fecha: string;
    hora_inicio: string;
    profesional_nombre: string;
    especialidad: string;
    motivo_consulta?: string;
    sucursal_nombre: string;
    paciente_nombre: string;
    paciente_email: string;
    google_calendar_url?: string;
    ics_content?: string;
  } | null>(null);

  // -------------------------------------------------------------
  // Manejo de RUT
  // -------------------------------------------------------------
  const handleRutInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatRutDisplay(e.target.value);
    setRawRut(formatted);
    setPatientLookupDone(false);
    setPatientExists(false);
    setPatientToken(null);
  };

  const isRutValid = useMemo(() => {
    return isValidChileanRut(rawRut);
  }, [rawRut]);

  const lookupPatientByRut = async () => {
    if (!isRutValid) return;

    setRutLookupLoading(true);
    try {
      const res = await fetch('/api/booking/patient-lookup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rut: rawRut,
          platform: 'dentalink', // Busca y ejecuta cross-sync si está en Medilink
        }),
      });

      const data = await res.json();
      setPatientLookupDone(true);

      if (res.ok && data.exists) {
        setPatientExists(true);
        setPatientToken(data.patient_token || null);
        setMaskedPatientData(data.masked_data || null);
      } else {
        setPatientExists(false);
        setPatientToken(null);
        setMaskedPatientData(null);
      }
    } catch (err) {
      console.error('Error buscando paciente:', err);
    } finally {
      setRutLookupLoading(false);
    }
  };

  // -------------------------------------------------------------
  // Cargar Catálogo Base para Área seleccionada
  // -------------------------------------------------------------
  const loadCatalog = useCallback(async (targetPlatform: HealthatomPlatform) => {
    setCatalogLoading(true);
    try {
      const res = await fetch(`/api/booking/catalog?platform=${targetPlatform}`);
      const data = await res.json();
      if (res.ok && data.success) {
        setSucursales(data.sucursales || []);
        setEspecialidades(data.especialidades || []);
        setProfesionales(data.profesionales || []);
        setSelectedBranchId('all');
      }
    } catch (err) {
      console.error('Error cargando catálogo:', err);
    } finally {
      setCatalogLoading(false);
    }
  }, []);

  const handleSelectArea = (chosenPlatform: HealthatomPlatform) => {
    setPlatform(chosenPlatform);
    setSelectedDoctor(null);
    setSelectedSlot(null);
    setSelectedDate('');
    setSelectedSpecialty('all');
    setDoctorSearchQuery('');
    loadCatalog(chosenPlatform);
  };

  // -------------------------------------------------------------
  // Filtros de Profesionales (Paso 2)
  // -------------------------------------------------------------
  const filteredProfessionals = useMemo(() => {
    return profesionales.filter((pro) => {
      if (selectedBranchId !== 'all') {
        const branchNum = Number(selectedBranchId);
        if (pro.sucursales_ids && pro.sucursales_ids.length > 0) {
          if (!pro.sucursales_ids.includes(branchNum)) {
            return false;
          }
        } else if (pro.id_sucursal && pro.id_sucursal !== branchNum) {
          return false;
        }
      }
      if (selectedSpecialty !== 'all' && pro.especialidad !== selectedSpecialty) {
        return false;
      }
      if (doctorSearchQuery.trim()) {
        const query = doctorSearchQuery.toLowerCase();
        const matchesName = pro.nombreCompleto.toLowerCase().includes(query);
        const matchesEsp = (pro.especialidad || '').toLowerCase().includes(query);
        return matchesName || matchesEsp;
      }
      return true;
    });
  }, [profesionales, selectedBranchId, selectedSpecialty, doctorSearchQuery]);

  // -------------------------------------------------------------
  // Cargar Disponibilidad (Paso 3)
  // -------------------------------------------------------------
  const loadAvailability = useCallback(async (pro: ProfessionalItem, branchId: number | 'all', offsetDays = 0) => {
    if (!platform) return;
    setAvailabilityLoading(true);
    setAvailability([]);
    setNextAvailableSlot(null);
    setSelectedSlot(null);

    const baseDate = new Date();
    baseDate.setDate(baseDate.getDate() + offsetDays);

    const startDateStr = baseDate.toISOString().split('T')[0];
    const endDate = new Date(baseDate.getTime() + 7 * 24 * 60 * 60 * 1000);
    const endDateStr = endDate.toISOString().split('T')[0];

    try {
      const sucursalesParam =
        pro.sucursales_ids && pro.sucursales_ids.length > 0
          ? `&id_sucursales=${pro.sucursales_ids.join(',')}`
          : '';
      const url = `/api/booking/availability?platform=${platform}&id_sucursal=${branchId}&id_profesional=${pro.id}&fecha_inicio=${startDateStr}&fecha_fin=${endDateStr}${sucursalesParam}`;
      const res = await fetch(url);
      const data = await res.json();

      if (res.ok && data.success) {
        setAvailability(data.availability || []);
        setNextAvailableSlot(data.next_available_slot || null);

        if (data.availability && data.availability.length > 0) {
          setSelectedDate((prevDate) => {
            if (prevDate && data.availability.some((a: DayAvailability) => a.fecha === prevDate)) {
              return prevDate;
            }
            const dayWithSlots = data.availability.find((a: DayAvailability) => a.total_disponibles > 0);
            return dayWithSlots ? dayWithSlots.fecha : data.availability[0].fecha;
          });
        } else {
          setSelectedDate(startDateStr);
        }
      }
    } catch (err) {
      console.error('Error cargando disponibilidad:', err);
    } finally {
      setAvailabilityLoading(false);
    }
  }, [platform]);

  const handleSelectDoctor = (pro: ProfessionalItem) => {
    setSelectedDoctor(pro);
    const branchToUse: number | 'all' = typeof selectedBranchId === 'number' ? selectedBranchId : 'all';
    setCurrentBranchId(branchToUse);
    setWeekOffsetDays(0);
    loadAvailability(pro, branchToUse, 0);
    setStep(3);
  };

  const handleWeekChange = (direction: 'prev' | 'next') => {
    if (!selectedDoctor) return;
    const newOffset = direction === 'next' ? weekOffsetDays + 7 : Math.max(0, weekOffsetDays - 7);
    setWeekOffsetDays(newOffset);
    loadAvailability(selectedDoctor, currentBranchId, newOffset);
  };

  const handleJumpToNextSlot = () => {
    if (!nextAvailableSlot || !selectedDoctor) return;
    setSelectedDate(nextAvailableSlot.fecha);

    const today = new Date();
    const targetDate = new Date(nextAvailableSlot.fecha + 'T12:00:00');
    const diffTime = targetDate.getTime() - today.getTime();
    const diffDays = Math.max(0, Math.floor(diffTime / (1000 * 60 * 60 * 24)));
    const roundedWeekOffset = Math.floor(diffDays / 7) * 7;

    setWeekOffsetDays(roundedWeekOffset);
    loadAvailability(selectedDoctor, currentBranchId, roundedWeekOffset);
  };

  const availableDoctorBranches = useMemo(() => {
    if (!selectedDoctor) return sucursales;
    if (selectedDoctor.sucursales_ids && selectedDoctor.sucursales_ids.length > 0) {
      const branches = sucursales.filter((s) => selectedDoctor.sucursales_ids!.includes(s.id));
      return branches.length > 0 ? branches : sucursales;
    }
    return sucursales;
  }, [selectedDoctor, sucursales]);

  const getBranchCleanName = useCallback(
    (branchId?: number) => {
      if (!branchId) return '';
      const b = sucursales.find((s) => s.id === branchId);
      if (!b) return '';
      return b.nombre.replace(/Policlínico\s+Tabancura/gi, '').replace(/[()]/g, '').trim() || b.nombre;
    },
    [sucursales]
  );

  const calendarDays = useMemo(() => {
    const days = [];
    const baseDate = new Date();
    baseDate.setDate(baseDate.getDate() + weekOffsetDays);

    for (let i = 0; i < 7; i++) {
      const d = new Date(baseDate);
      d.setDate(baseDate.getDate() + i);
      const isoStr = d.toISOString().split('T')[0];

      const dayData = availability.find((a) => a.fecha === isoStr);
      const slotsCount = dayData ? dayData.total_disponibles : 0;

      days.push({
        dateStr: isoStr,
        dayName: d.toLocaleDateString('es-CL', { weekday: 'short' }),
        dayNumber: d.getDate(),
        monthName: d.toLocaleDateString('es-CL', { month: 'short' }),
        slotsCount,
        hasSlots: slotsCount > 0,
      });
    }
    return days;
  }, [weekOffsetDays, availability]);

  const currentDaySlots = useMemo(() => {
    const dayData = availability.find((a) => a.fecha === selectedDate);
    if (!dayData) return { manana: [], tarde: [] };

    return {
      manana: dayData.slots.filter((s) => s.periodo === 'manana'),
      tarde: dayData.slots.filter((s) => s.periodo === 'tarde'),
    };
  }, [availability, selectedDate]);

  // -------------------------------------------------------------
  // Confirmar Cita (Paso 4)
  // -------------------------------------------------------------
  const handleConfirmBooking = async () => {
    if (!selectedDoctor || !selectedSlot || !platform) return;

    setBookingLoading(true);
    setBookingError(null);

    const branchToUse =
      selectedSlot.id_sucursal ||
      (typeof currentBranchId === 'number'
        ? currentBranchId
        : typeof selectedBranchId === 'number'
        ? selectedBranchId
        : selectedDoctor.sucursales_ids?.[0] || selectedDoctor.id_sucursal || 1);
    const branchName =
      (branchToUse ? sucursales.find((s) => s.id === branchToUse)?.nombre : null) ||
      'Policlínico Tabancura';

    try {
      const payload: any = {
        platform,
        id_sucursal: branchToUse,
        id_profesional: selectedDoctor.id,
        id_sillon: selectedSlot.id_sillon,
        fecha: selectedDate,
        hora_inicio: selectedSlot.hora, // En formato "H:i" ("18:15")
        duracion: selectedDoctor.intervalo || 30,
        profesional_nombre: selectedDoctor.nombreCompleto,
        especialidad: selectedDoctor.especialidad,
        motivo_consulta: selectedReason,
        sucursal_nombre: branchName,
      };

      if (patientExists && patientToken) {
        payload.patient_token = patientToken;
        if (updateContactToggle && (newPatientData.email || newPatientData.celular)) {
          payload.new_patient = {
            email: newPatientData.email || undefined,
            celular: newPatientData.celular || undefined,
          };
        }
      } else {
        payload.new_patient = {
          rut: formatRutForHealthatom(rawRut),
          nombre: newPatientData.nombre,
          apellidos: newPatientData.apellidos,
          email: newPatientData.email,
          celular: newPatientData.celular,
          fecha_nacimiento: newPatientData.fecha_nacimiento || undefined,
          id_prevision: parseInt(newPatientData.id_prevision, 10),
        };
      }

      const res = await fetch('/api/booking/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'No fue posible confirmar la hora.');
      }

      setConfirmationData(data);
      setStep(4);
    } catch (err: any) {
      setBookingError(err.message || 'Ocurrió un error al confirmar tu hora. Por favor intenta nuevamente.');
    } finally {
      setBookingLoading(false);
    }
  };

  const handleDownloadICS = () => {
    if (!confirmationData?.ics_content) return;
    const blob = new Blob([confirmationData.ics_content], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Cita_${confirmationData.folio}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleResetScheduler = () => {
    setStep(1);
    setPlatform(null);
    setSelectedDoctor(null);
    setSelectedSlot(null);
    setSelectedBranchId('all');
    setCurrentBranchId('all');
    setRawRut('');
    setPatientLookupDone(false);
    setPatientToken(null);
    setConfirmationData(null);
    setBookingError(null);
  };

  return (
    <div className="w-full max-w-5xl mx-auto rounded-3xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-2xl p-4 sm:p-6 md:p-8 transition-all">

      {/* STEPPER HEADER PROGRESS */}
      <div className="mb-8">
        <div className="grid grid-cols-4 gap-2 sm:gap-4 relative">
          {[
            { num: 1, title: 'Identificación', icon: UserCheck },
            { num: 2, title: 'Área y Médico', icon: Stethoscope },
            { num: 3, title: 'Fecha y Hora', icon: CalendarIcon },
            { num: 4, title: 'Confirmación', icon: CheckCircle2 },
          ].map((s) => {
            const Icon = s.icon;
            const isActive = step === s.num;
            const isDone = step > s.num;
            return (
              <button
                key={s.num}
                type="button"
                disabled={s.num > step}
                onClick={() => {
                  if (s.num < step && step !== 4) setStep(s.num);
                }}
                className={`flex flex-col items-center text-center group transition-all ${
                  s.num <= step ? 'opacity-100 cursor-pointer' : 'opacity-40 cursor-not-allowed'
                }`}
              >
                <div
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center font-bold text-sm sm:text-base transition-all duration-300 shadow-md ${
                    isDone
                      ? 'bg-emerald-500 text-white shadow-emerald-500/20'
                      : isActive
                      ? 'bg-[#162158] dark:bg-[#259CF4] text-white ring-4 ring-[#259CF4]/20 shadow-primary/30'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                  }`}
                >
                  {isDone ? <Check size={20} strokeWidth={3} /> : <Icon size={20} />}
                </div>
                <span
                  className={`mt-2 text-[11px] sm:text-xs font-semibold tracking-tight transition-colors line-clamp-1 ${
                    isActive
                      ? 'text-[#162158] dark:text-[#259CF4] font-bold'
                      : 'text-slate-500 dark:text-slate-400'
                  }`}
                >
                  {s.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <AnimatePresence mode="wait">

        {/* ========================================================
            PASO 1: IDENTIFICACIÓN INICIAL DEL PACIENTE (RUT)
           ======================================================== */}
        {step === 1 && (
          <motion.div
            key="step-1-rut"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="space-y-6 max-w-xl mx-auto"
          >
            <div className="text-center space-y-1">
              <span className="text-[10px] font-bold tracking-widest uppercase px-3 py-1 bg-cyan-100 dark:bg-cyan-950 text-cyan-800 dark:text-cyan-300 rounded-full inline-block mb-1">
                PASO 1 DE 4
              </span>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                Comencemos con tu RUT
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                Ingresa tu RUT chileno para verificar tu ficha clínica o registrarte en el sistema de atención.
              </p>
            </div>

            {/* Input de RUT */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
                RUT del Paciente:
              </label>
              <div className="relative">
                <input
                  type="text"
                  maxLength={12}
                  value={rawRut}
                  onChange={handleRutInputChange}
                  placeholder="Ej: 12.345.678-9"
                  className={`w-full bg-slate-50 dark:bg-slate-900 border rounded-2xl px-4 py-3.5 text-base sm:text-lg font-bold tracking-wider text-slate-900 dark:text-white focus:outline-none focus:ring-2 ${
                    rawRut && !isRutValid
                      ? 'border-red-400 focus:ring-red-400'
                      : rawRut && isRutValid
                      ? 'border-emerald-500 focus:ring-emerald-500'
                      : 'border-slate-300 dark:border-slate-700 focus:ring-[#259CF4]'
                  }`}
                />
                {isRutValid && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-emerald-600 font-bold text-xs bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-xl">
                    <CheckCircle2 size={16} />
                    <span>RUT Válido</span>
                  </div>
                )}
              </div>
              <p className="text-[11px] text-slate-400">
                El dígito verificador se valida en tiempo real mediante algoritmo Módulo 11.
              </p>
            </div>

            {/* Botón Buscar / Validar */}
            {!patientLookupDone && (
              <button
                type="button"
                disabled={!isRutValid || rutLookupLoading}
                onClick={lookupPatientByRut}
                className="w-full bg-[#162158] hover:bg-[#111827] dark:bg-[#259CF4] dark:hover:bg-cyan-500 text-white font-bold py-3.5 rounded-2xl text-sm flex items-center justify-center gap-2 transition-all shadow-md disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                {rutLookupLoading ? (
                  <>
                    <RefreshCw size={18} className="animate-spin" />
                    Consultando ficha clínica...
                  </>
                ) : (
                  <>
                    <Search size={18} />
                    Validar Ficha y Continuar
                  </>
                )}
              </button>
            )}

            {/* Caso A: Paciente Reconocido */}
            {patientLookupDone && patientExists && maskedPatientData && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 space-y-4"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-emerald-500 text-white shrink-0 shadow-md">
                    <CheckCircle2 size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-base text-emerald-900 dark:text-emerald-200">
                      ¡Hola, {maskedPatientData.first_name}!
                    </h4>
                    <p className="text-xs text-emerald-700 dark:text-emerald-300">
                      Encontramos tu ficha registrada en el Policlínico Tabancura.
                    </p>
                  </div>
                </div>

                <div className="bg-white/80 dark:bg-slate-900/80 p-3.5 rounded-xl border border-emerald-100 dark:border-emerald-900/60 space-y-2 text-xs">
                  <div className="flex justify-between text-slate-600 dark:text-slate-300">
                    <span className="font-semibold">Apellidos:</span>
                    <span>{maskedPatientData.masked_last_name}</span>
                  </div>
                  <div className="flex justify-between text-slate-600 dark:text-slate-300">
                    <span className="font-semibold">Correo registrado:</span>
                    <span>{maskedPatientData.masked_email}</span>
                  </div>
                  <div className="flex justify-between text-slate-600 dark:text-slate-300">
                    <span className="font-semibold">Teléfono móvil:</span>
                    <span>{maskedPatientData.masked_phone}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setUpdateContactToggle(!updateContactToggle)}
                    className="text-xs font-semibold text-emerald-700 dark:text-emerald-300 hover:underline cursor-pointer"
                  >
                    {updateContactToggle
                      ? '✓ Mantener mis datos actuales'
                      : '¿Cambiaste de teléfono o correo? Haz clic aquí para actualizar'}
                  </button>

                  {updateContactToggle && (
                    <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-emerald-200 dark:border-emerald-800">
                      <div>
                        <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                          Nuevo Celular:
                        </label>
                        <input
                          type="text"
                          placeholder="+56912345678"
                          value={newPatientData.celular}
                          onChange={(e) =>
                            setNewPatientData({ ...newPatientData, celular: e.target.value })
                          }
                          className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-1.5 text-xs text-slate-900 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                          Nuevo Email:
                        </label>
                        <input
                          type="email"
                          placeholder="tu@correo.cl"
                          value={newPatientData.email}
                          onChange={(e) =>
                            setNewPatientData({ ...newPatientData, email: e.target.value })
                          }
                          className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-1.5 text-xs text-slate-900 dark:text-white"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full bg-[#162158] hover:bg-[#111827] dark:bg-[#259CF4] dark:hover:bg-cyan-500 text-white font-bold py-3 rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer mt-2"
                >
                  Continuar a Selección de Área
                  <ArrowRight size={16} />
                </button>
              </motion.div>
            )}

            {/* Caso B: Paciente Nuevo */}
            {patientLookupDone && !patientExists && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-5 rounded-2xl bg-cyan-50/60 dark:bg-cyan-950/30 border border-cyan-200 dark:border-cyan-800 space-y-4"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-[#259CF4] text-white shrink-0 shadow-md">
                    <User size={22} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                      Registro de Paciente Nuevo
                    </h4>
                    <p className="text-xs text-slate-500">
                      No encontramos una ficha previa para este RUT. Completa tus datos para crear tu ficha médica oficial:
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Nombres *:
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej: Juan Andrés"
                      value={newPatientData.nombre}
                      onChange={(e) =>
                        setNewPatientData({ ...newPatientData, nombre: e.target.value })
                      }
                      className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Apellidos *:
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej: Pérez González"
                      value={newPatientData.apellidos}
                      onChange={(e) =>
                        setNewPatientData({ ...newPatientData, apellidos: e.target.value })
                      }
                      className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Celular de Contacto *:
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+56 9 1234 5678"
                      value={newPatientData.celular}
                      onChange={(e) =>
                        setNewPatientData({ ...newPatientData, celular: e.target.value })
                      }
                      className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Correo Electrónico *:
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="nombre@ejemplo.cl"
                      value={newPatientData.email}
                      onChange={(e) =>
                        setNewPatientData({ ...newPatientData, email: e.target.value })
                      }
                      className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Fecha de Nacimiento:
                    </label>
                    <input
                      type="date"
                      value={newPatientData.fecha_nacimiento}
                      onChange={(e) =>
                        setNewPatientData({ ...newPatientData, fecha_nacimiento: e.target.value })
                      }
                      className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Previsión / Convenio:
                    </label>
                    <select
                      value={newPatientData.id_prevision}
                      onChange={(e) =>
                        setNewPatientData({ ...newPatientData, id_prevision: e.target.value })
                      }
                      className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white"
                    >
                      <option value="1">Particular / General</option>
                      <option value="2">Fonasa</option>
                      <option value="3">Isapre Banmédica / Vida Tres</option>
                      <option value="4">Isapre Colmena / Cruz Blanca</option>
                      <option value="5">Convenio Tarjeta Mi Vita</option>
                    </select>
                  </div>
                </div>

                <button
                  type="button"
                  disabled={
                    !newPatientData.nombre ||
                    !newPatientData.apellidos ||
                    !newPatientData.email ||
                    !newPatientData.celular
                  }
                  onClick={() => setStep(2)}
                  className="w-full bg-[#162158] hover:bg-[#111827] dark:bg-[#259CF4] dark:hover:bg-cyan-500 text-white font-bold py-3 rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-md disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer mt-2"
                >
                  Continuar a Selección de Área
                  <ArrowRight size={16} />
                </button>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* ========================================================
            PASO 2: SELECCIÓN DE ÁREA Y PROFESIONALES
           ======================================================== */}
        {step === 2 && (
          <motion.div
            key="step-2-area"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            {/* Header del Paciente */}
            <div className="flex items-center justify-between p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs">
              <div className="flex items-center gap-2">
                <UserCheck size={16} className="text-emerald-500" />
                <span className="text-slate-500">Paciente:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  {patientExists && maskedPatientData
                    ? `${maskedPatientData.first_name} ${maskedPatientData.masked_last_name}`
                    : `${newPatientData.nombre} ${newPatientData.apellidos}`}
                </span>
                <span className="font-mono text-slate-400">({rawRut})</span>
              </div>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-slate-500 hover:text-slate-800 dark:hover:text-white font-semibold flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft size={13} />
                Cambiar RUT
              </button>
            </div>

            <div className="text-center space-y-1">
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                Selecciona el Área de Atención
              </h3>
              <p className="text-xs text-slate-500">
                Elige el servicio médico u odontológico que necesitas para desplegar los doctores disponibles.
              </p>
            </div>

            {/* Selector de Área: Salud Dental vs Medicina */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Odontología (Dentalink) */}
              <button
                type="button"
                onClick={() => handleSelectArea('dentalink')}
                className={`p-6 rounded-3xl border-2 text-left transition-all duration-300 relative overflow-hidden group cursor-pointer ${
                  platform === 'dentalink'
                    ? 'border-[#259CF4] bg-cyan-50/70 dark:bg-cyan-950/40 shadow-xl shadow-cyan-500/15 ring-2 ring-[#259CF4]/30 scale-101'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/60 dark:bg-slate-900/40 hover:scale-101'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`p-3.5 rounded-2xl transition-colors ${
                      platform === 'dentalink'
                        ? 'bg-[#259CF4] text-white shadow-md'
                        : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    <SmilePlus size={32} />
                  </div>
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-cyan-100 dark:bg-cyan-900/60 text-cyan-800 dark:text-cyan-200 mb-1">
                      Dentalink
                    </div>
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-[#259CF4] transition-colors">
                      Salud Dental
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                      Odontología General, Ortodoncia, Periodoncia, Endodoncia e Implantes.
                    </p>
                  </div>
                </div>
              </button>

              {/* Medicina y Especialidades (Medilink) */}
              <button
                type="button"
                onClick={() => handleSelectArea('medilink')}
                className={`p-6 rounded-3xl border-2 text-left transition-all duration-300 relative overflow-hidden group cursor-pointer ${
                  platform === 'medilink'
                    ? 'border-[#162158] dark:border-emerald-400 bg-emerald-50/70 dark:bg-emerald-950/40 shadow-xl shadow-emerald-500/15 ring-2 ring-emerald-500/30 scale-101'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/60 dark:bg-slate-900/40 hover:scale-101'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`p-3.5 rounded-2xl transition-colors ${
                      platform === 'medilink'
                        ? 'bg-[#162158] dark:bg-emerald-500 text-white shadow-md'
                        : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    <Stethoscope size={32} />
                  </div>
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200 mb-1">
                      Medilink
                    </div>
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors">
                      Medicina y Especialidades
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                      Medicina General, Psicología, Kinesiología, Psiquiatría y más.
                    </p>
                  </div>
                </div>
              </button>
            </div>

            {/* SECCIÓN DESPLEGADA SOLO CUANDO SE HA SELECCIONADO UN ÁREA */}
            {platform && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="space-y-6 pt-4 border-t border-slate-200 dark:border-slate-800"
              >
                {/* Barra de Filtros */}
                <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin size={18} className="text-[#259CF4] shrink-0" />
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Sede:</span>
                    <select
                      value={selectedBranchId}
                      onChange={(e) =>
                        setSelectedBranchId(e.target.value === 'all' ? 'all' : parseInt(e.target.value, 10))
                      }
                      className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-1.5 text-xs font-medium text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-[#259CF4]"
                    >
                      <option value="all">Todas las sedes</option>
                      {sucursales.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.nombre}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex bg-slate-200/70 dark:bg-slate-900 p-1 rounded-xl text-xs font-semibold">
                    <button
                      type="button"
                      onClick={() => setSearchTab('doctor')}
                      className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                        searchTab === 'doctor'
                          ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                      }`}
                    >
                      Buscar por Profesional
                    </button>
                    <button
                      type="button"
                      onClick={() => setSearchTab('specialty')}
                      className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                        searchTab === 'specialty'
                          ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                      }`}
                    >
                      Filtrar Especialidad
                    </button>
                  </div>
                </div>

                {searchTab === 'doctor' ? (
                  <div className="relative">
                    <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={doctorSearchQuery}
                      onChange={(e) => setDoctorSearchQuery(e.target.value)}
                      placeholder="Escribe el nombre del doctor o especialidad..."
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#259CF4] text-slate-900 dark:text-white placeholder-slate-400"
                    />
                    {doctorSearchQuery && (
                      <button
                        type="button"
                        onClick={() => setDoctorSearchQuery('')}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                      >
                        Limpiar
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2 max-h-36 overflow-y-auto pr-1">
                    <button
                      type="button"
                      onClick={() => setSelectedSpecialty('all')}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                        selectedSpecialty === 'all'
                          ? 'bg-[#162158] dark:bg-[#259CF4] text-white shadow-xs'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                      }`}
                    >
                      Todas ({profesionales.length})
                    </button>
                    {especialidades.map((esp) => {
                      const count = profesionales.filter((p) => p.especialidad === esp.nombre).length;
                      if (count === 0) return null;
                      return (
                        <button
                          key={esp.id}
                          type="button"
                          onClick={() => setSelectedSpecialty(esp.nombre)}
                          className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                            selectedSpecialty === esp.nombre
                              ? 'bg-[#162158] dark:bg-[#259CF4] text-white shadow-xs'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                          }`}
                        >
                          {esp.nombre} ({count})
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Listado de Médicos con Fotos */}
                {catalogLoading ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <div
                        key={i}
                        className="h-32 bg-slate-100 dark:bg-slate-800/50 rounded-2xl animate-pulse"
                      />
                    ))}
                  </div>
                ) : filteredProfessionals.length === 0 ? (
                  <div className="text-center py-12 bg-slate-50 dark:bg-slate-900/40 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800">
                    <AlertCircle size={36} className="mx-auto text-slate-400 mb-2" />
                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                      No se encontraron profesionales con estos filtros.
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      Prueba seleccionando otra especialidad o sede.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[520px] overflow-y-auto pr-1">
                    {filteredProfessionals.map((pro) => (
                      <div
                        key={pro.id}
                        className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-[#259CF4] dark:hover:border-[#259CF4] transition-all hover:shadow-lg flex flex-col justify-between group"
                      >
                        <div className="flex items-start gap-3">
                          <DoctorAvatar pro={pro} size="md" />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-sm text-slate-900 dark:text-white truncate group-hover:text-[#259CF4] transition-colors">
                              Dr(a). {pro.nombreCompleto}
                            </h4>
                            <span className="inline-block text-[11px] font-semibold text-[#259CF4] dark:text-cyan-400 truncate">
                              {pro.especialidad}
                            </span>
                            <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-1">
                              <Clock size={12} />
                              <span>Atención ~{pro.intervalo || 30} min</span>
                            </div>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleSelectDoctor(pro)}
                          className="mt-4 w-full bg-slate-100 hover:bg-[#162158] hover:text-white dark:bg-slate-800 dark:hover:bg-[#259CF4] dark:hover:text-white text-slate-800 dark:text-slate-200 font-bold py-2 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs"
                        >
                          Ver Horas Disponibles
                          <ChevronRight size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </motion.div>
        )}

        {/* ========================================================
            PASO 3: SELECCIÓN DE FECHA Y HORA
           ======================================================== */}
        {step === 3 && selectedDoctor && (
          <motion.div
            key="step-3-calendar"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            {/* Header del Profesional con selector de Sede */}
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <DoctorAvatar pro={selectedDoctor} size="md" />
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                      Dr(a). {selectedDoctor.nombreCompleto}
                    </h4>
                    <p className="text-xs text-[#259CF4] font-medium">{selectedDoctor.especialidad}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="text-xs text-slate-500 hover:text-slate-800 dark:hover:text-white flex items-center gap-1 font-semibold cursor-pointer"
                >
                  <ArrowLeft size={14} />
                  Cambiar médico
                </button>
              </div>

              {/* Selector / Indicador de Sede para el médico */}
              <div className="pt-2.5 border-t border-slate-200/70 dark:border-slate-700/70 flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-1.5 font-bold text-slate-700 dark:text-slate-300">
                  <MapPin size={14} className="text-[#259CF4]" />
                  <span>Sede de atención:</span>
                </div>

                <div className="flex items-center gap-1.5 flex-wrap">
                  {availableDoctorBranches.length > 1 && (
                    <button
                      type="button"
                      onClick={() => {
                        if (currentBranchId !== 'all') {
                          setCurrentBranchId('all');
                          loadAvailability(selectedDoctor, 'all', weekOffsetDays);
                        }
                      }}
                      className={`px-3 py-1 rounded-xl font-semibold transition-all cursor-pointer ${
                        currentBranchId === 'all'
                          ? 'bg-[#162158] dark:bg-[#259CF4] text-white shadow-xs scale-102 ring-2 ring-[#259CF4]/20'
                          : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      Todas las sedes
                    </button>
                  )}
                  {availableDoctorBranches.map((branch) => {
                    const isSelected = currentBranchId === branch.id;
                    const cleanName = branch.nombre.replace('Policlínico Tabancura', '').replace(/[()]/g, '').trim() || branch.nombre;
                    return (
                      <button
                        key={branch.id}
                        type="button"
                        onClick={() => {
                          if (currentBranchId !== branch.id) {
                            setCurrentBranchId(branch.id);
                            loadAvailability(selectedDoctor, branch.id, weekOffsetDays);
                          }
                        }}
                        className={`px-3 py-1 rounded-xl font-semibold transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#162158] dark:bg-[#259CF4] text-white shadow-xs scale-102 ring-2 ring-[#259CF4]/20'
                            : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                        }`}
                      >
                        {cleanName}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* SELECCIÓN DE MOTIVO DE LA VISITA */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 uppercase tracking-wider">
                  <Sparkles size={14} className="text-[#259CF4]" />
                  ¿Cuál es el motivo de tu visita?
                </span>
                <span className="text-[11px] text-slate-400 font-medium hidden sm:inline">
                  Selecciona la opción que mejor describe tu consulta
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  {
                    id: 'Primera consulta / Diagnóstico y evaluación',
                    title: 'Primera consulta / Diagnóstico y evaluación',
                    icon: Stethoscope,
                    desc: 'Evaluación general, revisión clínica completa y elaboración de presupuesto.',
                    badge: 'Frecuente',
                  },
                  {
                    id: 'Control o seguimiento de tratamiento',
                    title: 'Control o seguimiento de tratamiento',
                    icon: FileText,
                    desc: 'Revisión periódica de tratamiento activo (ortodoncia, rehabilitación o control médico).',
                    badge: null,
                  },
                  {
                    id: 'Urgencia o molestia específica',
                    title: 'Urgencia o molestia específica',
                    icon: Zap,
                    desc: 'Dolor dental o malestar agudo, caída de tapadura o molestia puntual.',
                    badge: 'Prioritario',
                  },
                  {
                    id: platform === 'dentalink' ? 'Procedimiento directo (ej: Limpieza dental)' : 'Procedimiento directo (ej: Kinesiología / Terapia)',
                    title: platform === 'dentalink' ? 'Procedimiento directo (ej: Limpieza dental)' : 'Procedimiento directo (ej: Kinesiología / Terapia)',
                    icon: Sparkles,
                    desc: platform === 'dentalink' ? 'Destartraje, profilaxis, limpieza profunda o higiene bucal preventiva.' : 'Sesión de kinesiología o terapia física programada.',
                    badge: null,
                  },
                ].map((item) => {
                  const IconComponent = item.icon;
                  const isSelected = selectedReason === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSelectedReason(item.id)}
                      className={`p-3.5 rounded-2xl border text-left transition-all relative cursor-pointer flex items-start gap-3 ${
                        isSelected
                          ? 'border-[#259CF4] bg-cyan-50/80 dark:bg-cyan-950/40 ring-2 ring-[#259CF4]/30 shadow-md'
                          : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-slate-300 dark:hover:border-slate-700'
                      }`}
                    >
                      <div
                        className={`p-2 rounded-xl shrink-0 transition-colors ${
                          isSelected
                            ? 'bg-[#259CF4] text-white shadow-xs'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                        }`}
                      >
                        <IconComponent size={18} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <h5 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">
                            {item.title}
                          </h5>
                          {item.badge && (
                            <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md uppercase tracking-wider ${
                              item.badge === 'Prioritario'
                                ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                                : 'bg-cyan-100 text-cyan-800 dark:bg-cyan-950/60 dark:text-cyan-300'
                            }`}>
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-tight line-clamp-2">
                          {item.desc}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Navegador Semanal Horizontal */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 uppercase tracking-wider">
                  <CalendarIcon size={14} className="text-[#259CF4]" />
                  Selecciona el día
                </span>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={weekOffsetDays === 0 || availabilityLoading}
                    onClick={() => handleWeekChange('prev')}
                    className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed text-slate-700 dark:text-slate-200 cursor-pointer"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    type="button"
                    disabled={availabilityLoading}
                    onClick={() => handleWeekChange('next')}
                    className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 cursor-pointer"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>

              {/* Barra de días */}
              <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
                {calendarDays.map((d) => {
                  const isSelected = selectedDate === d.dateStr;
                  return (
                    <button
                      key={d.dateStr}
                      type="button"
                      onClick={() => {
                        setSelectedDate(d.dateStr);
                        setSelectedSlot(null);
                      }}
                      className={`p-2.5 sm:p-3 rounded-2xl flex flex-col items-center justify-center transition-all cursor-pointer relative ${
                        isSelected
                          ? 'bg-[#162158] dark:bg-[#259CF4] text-white shadow-lg shadow-primary/20 scale-102 ring-2 ring-[#259CF4]/40'
                          : d.hasSlots
                          ? 'bg-cyan-50/70 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-800 text-slate-800 dark:text-slate-200 hover:bg-cyan-100'
                          : 'bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-slate-400 dark:text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <span className="text-[10px] font-bold uppercase tracking-wider">{d.dayName}</span>
                      <span className="text-base sm:text-lg font-black my-0.5">{d.dayNumber}</span>
                      <span className="text-[9px] uppercase">{d.monthName}</span>

                      {d.hasSlots && (
                        <span
                          className={`mt-1 text-[9px] font-extrabold px-1.5 py-0.2 rounded-full ${
                            isSelected
                              ? 'bg-white/20 text-white'
                              : 'bg-emerald-500 text-white'
                          }`}
                        >
                          {d.slotsCount}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Aviso de próxima hora si no hay slots en el día */}
            {nextAvailableSlot && availability.length === 0 && !availabilityLoading && (
              <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Sparkles size={24} className="text-amber-600 dark:text-amber-400 shrink-0" />
                  <div>
                    <h5 className="font-bold text-xs text-amber-900 dark:text-amber-200">
                      Próxima hora disponible encontrada:
                    </h5>
                    <p className="text-xs text-amber-800/80 dark:text-amber-300">
                      El {nextAvailableSlot.fecha} a las {nextAvailableSlot.hora} hrs
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleJumpToNextSlot}
                  className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold px-3 py-2 rounded-xl transition-all shadow-xs cursor-pointer shrink-0"
                >
                  Ir a esa fecha
                </button>
              </div>
            )}

            {/* Bloques Horarios */}
            <div className="space-y-4">
              {availabilityLoading ? (
                <div className="py-12 flex flex-col items-center justify-center gap-3 text-slate-400">
                  <RefreshCw size={24} className="animate-spin text-[#259CF4]" />
                  <span className="text-xs font-semibold">Consultando disponibilidad en tiempo real...</span>
                </div>
              ) : currentDaySlots.manana.length === 0 && currentDaySlots.tarde.length === 0 ? (
                <div className="py-12 text-center bg-slate-50 dark:bg-slate-900/40 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800">
                  <Clock size={32} className="mx-auto text-slate-400 mb-2" />
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    No hay horas disponibles para este día.
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Selecciona otro día marcado en celeste o navega con las flechas.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {currentDaySlots.manana.length > 0 && (
                    <div>
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">
                        🌅 Mañana (Antes de 14:00)
                      </span>
                      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                        {currentDaySlots.manana.map((slot) => {
                          const isSelected =
                            selectedSlot?.hora === slot.hora &&
                            selectedSlot?.id_sillon === slot.id_sillon &&
                            (selectedSlot?.id_sucursal ? selectedSlot.id_sucursal === slot.id_sucursal : true);
                          const slotKey = `${slot.id_sucursal || 'b'}-${slot.id_sillon || 's'}-${slot.hora}`;
                          return (
                            <button
                              key={slotKey}
                              type="button"
                              onClick={() => setSelectedSlot(slot)}
                              className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex flex-col items-center justify-center ${
                                isSelected
                                  ? 'bg-[#162158] dark:bg-[#259CF4] text-white shadow-md shadow-primary/20 ring-2 ring-[#259CF4]/40 scale-102'
                                  : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-[#259CF4] hover:text-white'
                              }`}
                            >
                              <span>{slot.hora}</span>
                              {currentBranchId === 'all' && slot.id_sucursal && (
                                <span
                                  className={`text-[9px] font-medium tracking-tight mt-0.5 ${
                                    isSelected ? 'text-cyan-200' : 'text-slate-400 group-hover:text-white'
                                  }`}
                                >
                                  {getBranchCleanName(slot.id_sucursal)}
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {currentDaySlots.tarde.length > 0 && (
                    <div>
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">
                        🌆 Tarde (Desde 14:00)
                      </span>
                      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                        {currentDaySlots.tarde.map((slot) => {
                          const isSelected =
                            selectedSlot?.hora === slot.hora &&
                            selectedSlot?.id_sillon === slot.id_sillon &&
                            (selectedSlot?.id_sucursal ? selectedSlot.id_sucursal === slot.id_sucursal : true);
                          const slotKey = `${slot.id_sucursal || 'b'}-${slot.id_sillon || 's'}-${slot.hora}`;
                          return (
                            <button
                              key={slotKey}
                              type="button"
                              onClick={() => setSelectedSlot(slot)}
                              className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex flex-col items-center justify-center ${
                                isSelected
                                  ? 'bg-[#162158] dark:bg-[#259CF4] text-white shadow-md shadow-primary/20 ring-2 ring-[#259CF4]/40 scale-102'
                                  : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-[#259CF4] hover:text-white'
                              }`}
                            >
                              <span>{slot.hora}</span>
                              {currentBranchId === 'all' && slot.id_sucursal && (
                                <span
                                  className={`text-[9px] font-medium tracking-tight mt-0.5 ${
                                    isSelected ? 'text-cyan-200' : 'text-slate-400 group-hover:text-white'
                                  }`}
                                >
                                  {getBranchCleanName(slot.id_sucursal)}
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Navegación Paso 3 */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-slate-900 flex items-center gap-1 cursor-pointer"
              >
                <ChevronLeft size={16} />
                Volver a Médicos
              </button>

              <button
                type="button"
                disabled={!selectedSlot}
                onClick={() => setStep(4)}
                className="bg-[#162158] hover:bg-[#111827] dark:bg-[#259CF4] dark:hover:bg-cyan-500 text-white font-bold px-6 py-2.5 rounded-xl text-xs flex items-center gap-2 transition-all shadow-md disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                Continuar al Resumen
                <ChevronRight size={16} />
              </button>
            </div>
          </motion.div>
        )}

        {/* ========================================================
            PASO 4: RESUMEN Y CONFIRMACIÓN FINAL
           ======================================================== */}
        {step === 4 && (
          <motion.div
            key="step-4-confirm"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="space-y-6 max-w-xl mx-auto"
          >
            {!confirmationData ? (
              <div className="space-y-6">
                <div className="text-center space-y-1">
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                    Resumen de tu Reserva Médica
                  </h3>
                  <p className="text-xs text-slate-500">
                    Revisa los datos antes de emitir tu reserva oficial en el sistema clínico.
                  </p>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800/60 rounded-3xl border border-slate-200 dark:border-slate-700 p-6 space-y-4 shadow-lg">
                  <div className="flex items-center gap-4 pb-4 border-b border-slate-200 dark:border-slate-700">
                    {selectedDoctor && <DoctorAvatar pro={selectedDoctor} size="lg" />}
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#259CF4]">
                        {selectedDoctor?.especialidad}
                      </span>
                      <h4 className="text-base font-bold text-slate-900 dark:text-white">
                        Dr(a). {selectedDoctor?.nombreCompleto}
                      </h4>
                      <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                        <MapPin size={12} className="text-[#259CF4]" />
                        {(selectedSlot?.id_sucursal
                          ? sucursales.find((s) => s.id === selectedSlot.id_sucursal)?.nombre
                          : null) ||
                          (typeof currentBranchId === 'number'
                            ? sucursales.find((s) => s.id === currentBranchId)?.nombre
                            : null) ||
                          'Policlínico Tabancura'}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div className="bg-white dark:bg-slate-900 p-3 rounded-2xl border border-slate-200 dark:border-slate-800">
                      <span className="text-slate-400 font-semibold block mb-1">Fecha de la Cita:</span>
                      <span className="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5 text-sm">
                        <CalendarIcon size={14} className="text-[#259CF4]" />
                        {selectedDate}
                      </span>
                    </div>

                    <div className="bg-white dark:bg-slate-900 p-3 rounded-2xl border border-slate-200 dark:border-slate-800">
                      <span className="text-slate-400 font-semibold block mb-1">Horario:</span>
                      <span className="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5 text-sm">
                        <Clock size={14} className="text-[#259CF4]" />
                        {selectedSlot?.hora} hrs
                      </span>
                    </div>
                  </div>

                  {/* Motivo de la atención seleccionado */}
                  <div className="bg-white dark:bg-slate-900 p-3 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs">
                    <span className="text-slate-400 font-semibold block mb-1">Motivo de la Atención:</span>
                    <span className="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
                      <Sparkles size={14} className="text-[#259CF4]" />
                      {selectedReason}
                    </span>
                  </div>

                  <div className="bg-white dark:bg-slate-900 p-3 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs space-y-1.5">
                    <div className="flex justify-between">
                      <span className="text-slate-400 font-semibold">Paciente:</span>
                      <span className="font-bold text-slate-800 dark:text-slate-200">
                        {patientExists && maskedPatientData
                          ? `${maskedPatientData.first_name} ${maskedPatientData.masked_last_name}`
                          : `${newPatientData.nombre} ${newPatientData.apellidos}`}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400 font-semibold">RUT:</span>
                      <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{rawRut}</span>
                    </div>
                  </div>

                  {bookingError && (
                    <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs flex items-center gap-2">
                      <AlertCircle size={16} className="shrink-0" />
                      <span>{bookingError}</span>
                    </div>
                  )}

                  <button
                    type="button"
                    disabled={bookingLoading}
                    onClick={handleConfirmBooking}
                    className="w-full bg-[#162158] hover:bg-[#111827] dark:bg-[#259CF4] dark:hover:bg-cyan-500 text-white font-bold py-3.5 rounded-2xl text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary/20 cursor-pointer disabled:opacity-50"
                  >
                    {bookingLoading ? (
                      <>
                        <RefreshCw size={18} className="animate-spin" />
                        Confirmando en Healthatom API...
                      </>
                    ) : (
                      <>
                        <CheckCircle2 size={18} />
                        Confirmar mi Reserva de Hora
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-1 text-[11px] text-slate-400">
                    <ShieldCheck size={14} className="text-emerald-500" />
                    <span>Conexión directa en tiempo real con Dentalink y Medilink</span>
                  </div>
                </div>

                <div className="flex justify-start">
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-slate-900 flex items-center gap-1 cursor-pointer"
                  >
                    <ChevronLeft size={16} />
                    Modificar horario
                  </button>
                </div>
              </div>
            ) : (
              /* COMPROBANTE TICKET DIGITAL */
              <div className="space-y-6">
                <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-950 border border-emerald-500/30 shadow-2xl relative overflow-hidden">
                  <div className="w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-500/30">
                    <Check size={32} strokeWidth={3} />
                  </div>

                  <div className="text-center space-y-1 mb-6">
                    <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 rounded-full">
                      CITA RESERVADA CON ÉXITO
                    </span>
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-2">
                      ¡Tu hora está confirmada!
                    </h3>
                    <p className="text-xs text-slate-500">
                      Folio Oficial de Reserva:{' '}
                      <strong className="text-slate-800 dark:text-slate-200 font-mono">
                        {confirmationData.folio}
                      </strong>
                    </p>
                  </div>

                  <div className="bg-white dark:bg-slate-900/80 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 space-y-3 text-xs mb-6">
                    <div className="flex justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                      <span className="text-slate-400 font-semibold">Médico / Especialista:</span>
                      <span className="font-bold text-slate-800 dark:text-slate-100">
                        Dr(a). {confirmationData.profesional_nombre}
                      </span>
                    </div>

                    <div className="flex justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                      <span className="text-slate-400 font-semibold">Especialidad:</span>
                      <span className="font-semibold text-[#259CF4]">{confirmationData.especialidad}</span>
                    </div>

                    <div className="flex justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                      <span className="text-slate-400 font-semibold">Motivo de Atención:</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-100">
                        {confirmationData.motivo_consulta || selectedReason}
                      </span>
                    </div>

                    <div className="flex justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                      <span className="text-slate-400 font-semibold">Fecha y Hora:</span>
                      <span className="font-bold text-slate-800 dark:text-slate-100">
                        {confirmationData.fecha} a las {confirmationData.hora_inicio} hrs
                      </span>
                    </div>

                    <div className="flex justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                      <span className="text-slate-400 font-semibold">Sede:</span>
                      <span className="font-medium text-slate-700 dark:text-slate-300">
                        {confirmationData.sucursal_nombre}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-slate-400 font-semibold">Paciente:</span>
                      <span className="font-bold text-slate-800 dark:text-slate-100">
                        {confirmationData.paciente_nombre}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {confirmationData.google_calendar_url && (
                      <a
                        href={confirmationData.google_calendar_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#259CF4] hover:bg-cyan-600 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-md"
                      >
                        <CalendarPlus size={16} />
                        Google Calendar
                      </a>
                    )}

                    <button
                      type="button"
                      onClick={handleDownloadICS}
                      className="bg-slate-800 hover:bg-slate-900 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
                    >
                      <Download size={16} />
                      Descargar (.ics)
                    </button>
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center text-xs">
                    <button
                      type="button"
                      onClick={() => window.print()}
                      className="text-slate-500 hover:text-slate-800 dark:hover:text-white flex items-center gap-1 font-semibold cursor-pointer"
                    >
                      <Printer size={14} />
                      Imprimir Comprobante
                    </button>

                    <button
                      type="button"
                      onClick={handleResetScheduler}
                      className="text-[#259CF4] hover:underline font-bold cursor-pointer"
                    >
                      Agendar otra hora →
                    </button>
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
