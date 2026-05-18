"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Plus, 
  Trash2, 
  FileText, 
  User, 
  Mail, 
  Phone, 
  CreditCard, 
  Calendar,
  Microscope,
  ChevronRight,
  Info,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Exam, 
  PatientData, 
  fetchExams, 
  generateQuote, 
  fetchPatient 
} from '@/lib/api-cotizador';

interface CotizadorExamenesProps {
  step: number;
  onStepChange: (step: number) => void;
  priceType: 'particular_general' | 'bono_fonasa' | null;
  onPriceTypeChange: (type: 'particular_general' | 'bono_fonasa') => void;
}

export function CotizadorExamenes({ 
  step, 
  onStepChange, 
  priceType, 
  onPriceTypeChange 
}: CotizadorExamenesProps) {
  const [exams, setExams] = useState<Exam[]>([]);
  const [selectedExams, setSelectedExams] = useState<{ exam: Exam; quantity: number }[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [quoteUrl, setQuoteUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const [patient, setPatient] = useState<PatientData>({
    nombre_paciente: '',
    documento_id: '',
    tipo_documento: 'RUT',
    email: '',
    telefono: '',
    prevision: 'Particular',
    fecha_nacimiento: ''
  });
  
  useEffect(() => {
    if (priceType) {
      setPatient(prev => ({
        ...prev,
        prevision: priceType === 'particular_general' ? 'Particular' : 'Fonasa'
      }));
    }
  }, [priceType]);
  useEffect(() => {
    async function loadData() {
      try {
        const examData = await fetchExams();
        setExams(examData);
      } catch (err) {
        setError('Error al cargar datos del servidor. Por favor, intenta más tarde.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);


  const filteredExams = useMemo(() => {
    if (!searchQuery) return [];
    return exams.filter(e => 
      e.nombre.toLowerCase().includes(searchQuery.toLowerCase()) || 
      e.codigo.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 8);
  }, [exams, searchQuery]);

  const addExam = (exam: Exam) => {
    setSelectedExams(prev => {
      const existing = prev.find(item => item.exam.codigo === exam.codigo);
      if (existing) {
        return prev.map(item => 
          item.exam.codigo === exam.codigo ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { exam, quantity: 1 }];
    });
    setSearchQuery('');
  };


  const removeExam = (codigo: string) => {
    setSelectedExams(prev => prev.filter(item => item.exam.codigo !== codigo));
  };

  const updateQuantity = (codigo: string, delta: number) => {
    setSelectedExams(prev => prev.map(item => {
      if (item.exam.codigo === codigo) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const handleRutBlur = async () => {
    if (patient.documento_id.length >= 8) {
      try {
        const data = await fetchPatient(patient.documento_id);
        if (data) {
          setPatient(prev => ({
            ...prev,
            nombre_paciente: data.nombre_paciente || prev.nombre_paciente,
            email: data.email || prev.email,
            telefono: data.telefono || prev.telefono,
            fecha_nacimiento: data.fecha_nacimiento || prev.fecha_nacimiento,
            prevision: data.prevision || prev.prevision
          }));
        }
      } catch (err) {
        console.error("Error fetching patient", err);
      }
    }
  };

  const totals = useMemo(() => {
    return selectedExams.reduce((acc, item) => {
      const price = priceType === 'particular_general' 
        ? item.exam.valor_particular_general 
        : item.exam.valor_bono_fonasa;
      return acc + (price * item.quantity);
    }, 0);
  }, [selectedExams, priceType]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedExams.length === 0) {
      setError('Debes seleccionar al menos un examen.');
      return;
    }
    
    setGenerating(true);
    setError(null);
    try {
      const data = await generateQuote({
        ...patient,
        examenes: selectedExams.map(item => ({ 
          codigo: item.exam.codigo, 
          nombre: item.exam.nombre,
          cantidad: item.quantity,
          valor_bono_fonasa: item.exam.valor_bono_fonasa,
          valor_copago: item.exam.valor_copago,
          valor_particular_general: item.exam.valor_particular_general,
          valor_particular_preferencial: item.exam.valor_particular_preferencial
        }))
      });
      setQuoteUrl(data.url_pdf);
      window.open(data.url_pdf, '_blank');
    } catch (err: any) {
      setError(err.message || 'Ocurrió un error al generar la cotización.');
      console.error(err);
    } finally {
      setGenerating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-6">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-secondary/20 border-t-secondary rounded-full animate-spin" />
          <Microscope className="absolute inset-0 m-auto text-secondary" size={24} />
        </div>
        <div className="text-center">
          <p className="text-xl font-bold text-primary dark:text-white">Cargando catálogo</p>
          <p className="text-slate-500 dark:text-slate-400">Preparando aranceles actualizados...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6">
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div 
            key="step-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid lg:grid-cols-12 gap-10"
          >
            {/* IZQUIERDA: BUSCADOR Y SELECCIÓN */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* CABECERA DE PASO */}
              <div className="flex items-center justify-between bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-secondary/10 rounded-xl flex items-center justify-center text-secondary">
                    <CheckCircle2 size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Previsión Seleccionada</p>
                    <p className="font-bold text-primary dark:text-white">{priceType === 'particular_general' ? 'Paciente Particular' : 'Beneficiario Fonasa'}</p>
                  </div>
                </div>
                <button 
                  onClick={() => onStepChange(0)}
                  className="px-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-primary transition-all"
                >
                  Cambiar
                </button>
              </div>

              {/* BUSCADOR PREMIUM */}
              <div className="relative z-40">
                <div className="relative group">
                  <div className="absolute inset-0 bg-secondary/10 rounded-xl blur-xl opacity-0 group-focus-within:opacity-100 transition-all duration-500" />
                  <div className="relative bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 shadow-lg shadow-slate-200/20 dark:shadow-none p-3 flex items-center gap-4 transition-all focus-within:ring-2 focus-within:ring-secondary/20">
                    <div className="w-12 h-12 bg-primary text-white rounded-lg flex items-center justify-center shadow-md shadow-primary/10">
                      <Search size={24} strokeWidth={2.5} />
                    </div>
                    <div className="flex-1">
                      <p className="text-[9px] font-black uppercase tracking-[0.2em] text-secondary mb-0.5">Buscador Global de Exámenes</p>
                      <input 
                        type="text"
                        placeholder="Escribe el nombre o código del examen..."
                        className="w-full bg-transparent border-none outline-none text-lg font-bold text-slate-800 dark:text-slate-100 placeholder:text-slate-400"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                
                {/* DROPDOWN DE RESULTADOS */}
                <AnimatePresence>
                  {searchQuery.length > 2 && (
                    <motion.div 
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl shadow-2xl z-50 overflow-hidden"
                    >
                      {filteredExams.length > 0 ? (
                        <div className="divide-y divide-slate-50 dark:divide-slate-800/50">
                          {filteredExams.map(exam => (
                            <button 
                              key={exam.id || exam.codigo}
                              onClick={() => addExam(exam)}
                              className="w-full text-left p-5 hover:bg-slate-50 dark:hover:bg-slate-800/40 flex items-center justify-between group transition-all"
                            >
                              <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-slate-50 dark:bg-slate-800 rounded-lg flex items-center justify-center text-primary dark:text-secondary group-hover:bg-secondary group-hover:text-white transition-all">
                                  <Microscope size={20} />
                                </div>
                                <div>
                                  <p className="font-bold text-slate-800 dark:text-slate-100 group-hover:text-secondary transition-colors">{exam.nombre}</p>
                                  <Badge variant="outline" className="text-[9px] font-black tracking-widest border-slate-100 dark:border-slate-800 text-slate-400 mt-1 uppercase">Cód: {exam.codigo}</Badge>
                                </div>
                              </div>
                              <div className="flex items-center gap-6">
                                <div className="text-right">
                                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Valor</p>
                                  <p className="text-lg font-black text-primary dark:text-white">
                                    ${(priceType === 'particular_general' ? exam.valor_particular_general : exam.valor_bono_fonasa).toLocaleString('es-CL')}
                                  </p>
                                </div>
                                <div className="w-10 h-10 rounded-full border-2 border-secondary/20 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white group-hover:border-secondary transition-all">
                                  <Plus size={20} strokeWidth={3} />
                                </div>
                              </div>
                            </button>
                          ))}
                        </div>
                      ) : (
                        <div className="p-12 text-center">
                          <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-2xl mx-auto mb-3 flex items-center justify-center text-slate-300">
                            <AlertCircle size={40} />
                          </div>
                          <p className="text-lg font-bold text-slate-800 dark:text-white">No encontramos resultados</p>
                          <p className="text-slate-500 dark:text-slate-400">Intenta buscando por una palabra clave diferente.</p>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>


              {/* CARRITO DE EXÁMENES */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden shadow-lg shadow-slate-200/20 dark:shadow-none">
                <div className="bg-primary p-4 md:p-6 text-white flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center">
                      <FileText size={20} className="text-secondary" />
                    </div>
                    <div>
                      <h2 className="text-lg md:text-xl font-bold">Resumen de Selección</h2>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-white/60">{selectedExams.length} Prestaciones seleccionadas</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 md:p-6 min-h-[300px]">
                  {selectedExams.length === 0 ? (
                    <div className="py-20 text-center">
                      <div className="w-20 h-20 bg-slate-50 dark:bg-slate-950 rounded-2xl mx-auto mb-4 flex items-center justify-center relative">
                        <div className="absolute inset-0 bg-secondary/5 animate-pulse rounded-2xl" />
                        <Microscope size={40} className="text-slate-300 dark:text-slate-800 relative z-10" />
                      </div>
                      <h3 className="text-xl font-bold text-primary dark:text-white mb-2">Tu lista está vacía</h3>
                      <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto">Comienza buscando los exámenes de tu orden médica en el buscador superior.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <AnimatePresence mode="popLayout">
                        {selectedExams.map(item => (
                          <motion.div 
                            key={item.exam.codigo}
                            layout
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="group flex flex-wrap sm:flex-nowrap items-center gap-4 p-4 bg-slate-50/50 dark:bg-slate-800/20 rounded-xl border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-all"
                          >
                            <div className="flex-1 min-w-[200px]">
                              <div className="flex items-center gap-3 mb-1">
                                <h4 className="font-bold text-slate-800 dark:text-slate-100">{item.exam.nombre}</h4>
                                <span className="text-[10px] font-black bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 px-2 py-0.5 rounded-lg text-slate-400">#{item.exam.codigo}</span>
                              </div>
                              <p className="text-xs font-bold text-secondary uppercase tracking-widest">
                                Valor Unitario: ${(priceType === 'particular_general' ? item.exam.valor_particular_general : item.exam.valor_bono_fonasa || 0).toLocaleString('es-CL')}
                              </p>
                            </div>

                            <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                              <div className="flex items-center gap-3 bg-white dark:bg-slate-950 p-1 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm">
                                <button 
                                  type="button"
                                  onClick={() => updateQuantity(item.exam.codigo, -1)}
                                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-400 transition-colors"
                                >
                                  -
                                </button>
                                <span className="w-4 text-center font-black text-primary dark:text-white text-sm">{item.quantity}</span>
                                <button 
                                  type="button"
                                  onClick={() => updateQuantity(item.exam.codigo, 1)}
                                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-400 transition-colors"
                                >
                                  +
                                </button>
                              </div>
                              
                              <div className="text-right min-w-[120px]">
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Subtotal Item</p>
                                <p className="text-xl font-black text-primary dark:text-white">
                                  ${((priceType === 'particular_general' ? item.exam.valor_particular_general : item.exam.valor_bono_fonasa || 0) * item.quantity).toLocaleString('es-CL')}
                                </p>
                              </div>

                              <button 
                                type="button"
                                onClick={() => removeExam(item.exam.codigo)}
                                className="w-10 h-10 flex items-center justify-center bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 text-slate-300 hover:text-red-500 hover:border-red-500/20 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-all shadow-sm"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* DERECHA: TOTAL Y CONTINUAR (NO FORM HERE) */}
            <div className="lg:col-span-4">
              <div className="sticky top-44 space-y-6">
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 shadow-lg shadow-slate-200/20 dark:shadow-none overflow-hidden relative">
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-secondary" />
                  
                  <h3 className="text-lg font-bold text-primary dark:text-white mb-6">Resumen de Totales</h3>

                  <div className="bg-primary dark:bg-slate-950 p-6 rounded-2xl text-white mb-6 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10 animate-pulse" />
                    
                    <div className="relative z-10 space-y-4">
                      <div className="flex justify-between items-center text-white/60 text-sm font-bold uppercase tracking-widest">
                        <span>Subtotal</span>
                        <span>${totals.toLocaleString('es-CL')}</span>
                      </div>
                      <div className="pt-3 border-t border-white/10 flex justify-between items-end">
                        <div>
                          <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/40 mb-0.5">Total Estimado</p>
                          <p className="text-3xl font-black">${totals.toLocaleString('es-CL')}</p>
                        </div>
                        <Sparkles className="text-secondary animate-bounce" size={20} />
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => onStepChange(2)}
                    disabled={selectedExams.length === 0}
                    className="w-full relative group disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div className="absolute inset-0 bg-secondary blur-xl opacity-30 group-hover:opacity-50 transition-opacity rounded-full" />
                    <div className="relative h-14 bg-gradient-to-br from-secondary to-teal-600 text-primary px-6 rounded-xl flex items-center justify-between font-black text-xs uppercase tracking-widest shadow-lg transition-all group-hover:-translate-y-1 active:scale-95">
                      <span>Continuar</span>
                      <ArrowRight size={18} strokeWidth={3} />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div 
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="grid lg:grid-cols-12 gap-8 items-start"
          >
            {/* IZQUIERDA: RESUMEN FINAL */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <button 
                    onClick={() => onStepChange(1)}
                    className="w-9 h-9 bg-slate-50 dark:bg-slate-800 rounded-lg flex items-center justify-center text-slate-400 hover:text-primary transition-all"
                  >
                    <ChevronRight size={18} className="rotate-180" />
                  </button>
                  <h3 className="text-lg font-bold text-primary dark:text-white">Confirmar Selección</h3>
                </div>
                
                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                  {selectedExams.map(item => (
                    <div key={item.exam.codigo} className="flex justify-between items-center p-4 bg-slate-50 dark:bg-slate-800/30 rounded-2xl">
                      <div>
                        <p className="font-bold text-slate-800 dark:text-slate-100">{item.exam.nombre}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Cant: {item.quantity} • Cód: {item.exam.codigo}</p>
                      </div>
                      <p className="font-black text-primary dark:text-white">
                        ${((priceType === 'particular_general' ? item.exam.valor_particular_general : item.exam.valor_bono_fonasa || 0) * item.quantity).toLocaleString('es-CL')}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800 flex justify-between items-end">
                  <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Total Final</p>
                  <p className="text-3xl font-black text-primary dark:text-white">${totals.toLocaleString('es-CL')}</p>
                </div>
              </div>
            </div>

            {/* DERECHA: FORMULARIO PACIENTE */}
            <div className="lg:col-span-7">
              <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 shadow-lg shadow-slate-200/20 dark:shadow-none overflow-hidden relative">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-secondary" />
                
                <h3 className="text-lg font-bold text-primary dark:text-white mb-6 flex items-center gap-3">
                  <User size={20} className="text-secondary" />
                  Datos del Paciente
                </h3>
                
                <div className="space-y-6 mb-10">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Documento de Identidad (RUT)</label>
                    <Input 
                      placeholder="12.345.678-9"
                      className="h-12 rounded-xl bg-slate-50 dark:bg-slate-950 border-transparent focus:bg-white dark:focus:bg-slate-900 transition-all font-bold text-slate-800 dark:text-white"
                      value={patient.documento_id}
                      onChange={(e) => setPatient({...patient, documento_id: e.target.value})}
                      onBlur={handleRutBlur}
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Nombre Completo</label>
                    <Input 
                      placeholder="Ej: Nicolás Jofre"
                      className="h-12 rounded-xl bg-slate-50 dark:bg-slate-950 border-transparent focus:bg-white dark:focus:bg-slate-900 transition-all font-bold text-slate-800 dark:text-white"
                      value={patient.nombre_paciente}
                      onChange={(e) => setPatient({...patient, nombre_paciente: e.target.value})}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Correo Electrónico</label>
                      <Input 
                        type="email"
                        placeholder="paciente@correo.cl"
                        className="h-12 rounded-xl bg-slate-50 dark:bg-slate-950 border-transparent focus:bg-white dark:focus:bg-slate-900 transition-all font-bold text-slate-800 dark:text-white"
                        value={patient.email}
                        onChange={(e) => setPatient({...patient, email: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Teléfono Móvil</label>
                      <Input 
                        placeholder="+56 9 1234 5678"
                        className="h-12 rounded-xl bg-slate-50 dark:bg-slate-950 border-transparent focus:bg-white dark:focus:bg-slate-900 transition-all font-bold text-slate-800 dark:text-white"
                        value={patient.telefono}
                        onChange={(e) => setPatient({...patient, telefono: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Fecha de Nacimiento</label>
                    <Input 
                      type="date"
                      className="h-12 rounded-xl bg-slate-50 dark:bg-slate-950 border-transparent focus:bg-white dark:focus:bg-slate-900 transition-all font-bold text-slate-800 dark:text-white"
                      value={patient.fecha_nacimiento}
                      onChange={(e) => setPatient({...patient, fecha_nacimiento: e.target.value})}
                      required
                    />
                    <p className="text-[9px] text-slate-400 ml-1 font-medium italic">* Requerido para validar aranceles específicos por edad si aplica.</p>
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={generating}
                  className="w-full relative group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="absolute inset-0 bg-secondary blur-xl opacity-30 group-hover:opacity-50 transition-opacity rounded-full" />
                  <div className="relative h-14 bg-gradient-to-br from-secondary to-teal-600 text-primary px-6 rounded-xl flex items-center justify-between font-black text-xs uppercase tracking-widest shadow-lg transition-all group-hover:-translate-y-1 active:scale-95">
                    {generating ? (
                      <div className="flex items-center gap-3 mx-auto">
                        <Loader2 className="animate-spin" size={18} />
                        <span>Generando...</span>
                      </div>
                    ) : (
                      <>
                        <span>Generar Presupuesto</span>
                        <ArrowRight size={18} strokeWidth={3} />
                      </>
                    )}
                  </div>
                </button>

                <AnimatePresence>
                  {quoteUrl && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-6 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex flex-col items-center text-center gap-3 text-emerald-600 dark:text-emerald-400"
                    >
                      <CheckCircle2 size={20} className="text-emerald-500" />
                      <h4 className="font-black text-[10px] uppercase tracking-widest mb-0.5">¡Presupuesto Listo!</h4>
                      <a href={quoteUrl} target="_blank" className="w-full bg-emerald-500 text-white py-3 rounded-lg font-black text-[10px] uppercase tracking-widest shadow-lg">Descargar PDF</a>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
