"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CotizadorExamenes } from '@/components/CotizadorExamenes';
import { Microscope, Calculator, ShieldCheck, Sparkles, MapPin, Clock, Phone } from 'lucide-react';
import { OtherServices } from '@/components/OtherServices';

const WhatsAppIcon = ({ size = 18, className = "" }: { size?: number, className?: string }) => (
  <svg width={size} height={size} fill="currentColor" viewBox="0 0 24 24" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export default function CotizadorPage() {
  const [step, setStep] = React.useState(0);
  const [priceType, setPriceType] = React.useState<'particular_general' | 'bono_fonasa' | null>(null);

  const handlePriceSelect = (type: 'particular_general' | 'bono_fonasa') => {
    setPriceType(type);
    setStep(1);
  };

  // Scroll to top when switching to step 1
  React.useEffect(() => {
    if (step === 1) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [step]);

  return (
    <div className="min-h-screen bg-clinical-bg dark:bg-slate-950 transition-colors duration-500">

      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div
            key="header-guide"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* HEADER SECTION - Simplified */}
            <section className="relative pt-44 pb-24 overflow-hidden">
              {/* Background Ornaments */}
              <div className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] bg-secondary/5 rounded-full blur-[120px] -z-10 animate-pulse" />

              <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                  {/* Left Column: Text Content */}
                  <div className="flex-1 lg:max-w-2xl text-center lg:text-left relative">
                    {/* Premium Fluid SVG Background Backplate - ONLY IN LIGHT MODE */}
                    <div className="absolute -inset-x-8 -inset-y-12 -z-10 pointer-events-none opacity-100 dark:opacity-0 transition-opacity duration-300 select-none">
                      <svg viewBox="0 0 400 400" className="w-[130%] h-[130%] absolute -top-12 -left-12 text-slate-100/60 dark:text-transparent blur-xl">
                        <path
                          fill="currentColor"
                          d="M38.1,-66.2C48.7,-59.4,56.2,-48.5,63.1,-37C70,-25.6,76.2,-13.7,77.7,-1C79.2,11.7,75.9,25.3,69.5,37.3C63.1,49.3,53.5,59.8,41.9,67.8C30.3,75.7,16.7,81.1,2.8,80.4C-11,79.7,-24.8,72.9,-37.2,64.8C-49.7,56.7,-60.7,47.4,-67.9,35.5C-75.1,23.6,-78.4,9.2,-77.8,-4.9C-77.2,-19,-72.6,-32.8,-64.5,-44.3C-56.3,-55.9,-44.5,-65.2,-31.8,-70.8C-19.1,-76.3,-5.4,-78.2,5.8,-79.8C17.1,-81.4,27.5,-73.1,38.1,-66.2Z"
                          transform="translate(200, 200) scale(1.7)"
                        />
                      </svg>
                      <div className="absolute inset-0 bg-gradient-to-tr from-secondary/10 via-primary/5 to-transparent rounded-[3rem] blur-2xl" />
                    </div>

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary text-white text-[10px] font-black uppercase tracking-widest mb-8 shadow-lg shadow-primary/20"
                    >
                      <Sparkles size={14} className="text-secondary" />
                      Compromiso con tu Salud
                    </motion.div>

                    <motion.h1
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-6xl md:text-8xl font-black text-primary dark:text-white tracking-tighter leading-[0.85] mb-8"
                    >
                      Cotizador <br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-teal-400 to-secondary dark:from-white dark:via-secondary dark:to-teal-400">
                        en línea.
                      </span>
                    </motion.h1>

                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="text-xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-8 max-w-xl"
                    >
                      Selecciona tu previsión y obtén presupuestos oficiales de laboratorio en segundos para una Toma de muestras en Policlínico Tabancura.
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 }}
                      className="text-[11px] font-black uppercase tracking-[0.2em] text-secondary mb-4 flex items-center justify-center lg:justify-start gap-2 select-none"
                    >
                      <span className="w-2 h-2 rounded-full bg-secondary animate-pulse shrink-0" />
                      Selecciona tu previsión de salud para comenzar:
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-12"
                    >
                      <button
                        onClick={() => handlePriceSelect('particular_general')}
                        className="group relative flex items-center gap-4 bg-primary dark:bg-slate-800 text-white pl-8 pr-2 py-2 rounded-full font-bold text-sm hover:scale-105 transition-all shadow-xl shadow-primary/20"
                      >
                        Cotizar Particular
                        <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center text-primary group-hover:rotate-12 transition-transform">
                          <Microscope size={18} />
                        </div>
                      </button>

                      <button
                        onClick={() => handlePriceSelect('bono_fonasa')}
                        className="group relative flex items-center gap-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-primary dark:text-white pl-8 pr-2 py-2 rounded-full font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-xl"
                      >
                        Beneficiario Fonasa
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary dark:text-secondary group-hover:-rotate-12 transition-transform">
                          <ShieldCheck size={18} />
                        </div>
                      </button>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="flex items-center justify-center lg:justify-start gap-4 p-4 bg-white/5 dark:bg-slate-900/5 backdrop-blur-sm rounded-2xl"
                    >
                      <div className="w-10 h-10 bg-secondary/10 rounded-xl flex items-center justify-center text-secondary shrink-0">
                        <MapPin size={20} />
                      </div>
                      <div className="text-left">
                        <p className="text-[9px] font-black uppercase tracking-[0.2em] text-secondary mb-0.5">Sucursal de Toma de Muestras</p>
                        <p className="text-[13px] font-bold text-primary dark:text-white leading-tight">Vitacura 8620, Vitacura</p>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium mt-0.5">Resultados rápidos en 24h</p>
                      </div>
                    </motion.div>
                  </div>

                  {/* Right Column: Visual Element Matching Salud Mental Style */}
                  <div className="flex-1 relative hidden lg:block">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9, x: 20 }}
                      animate={{ opacity: 1, scale: 1, x: 0 }}
                      className="relative z-10"
                    >
                      <div className="relative aspect-[4/3] rounded-[3.5rem] overflow-hidden border-[12px] border-white dark:border-slate-900 shadow-2xl">
                        <img
                          src="/generated/heroLaboratorio.webp"
                          alt="Laboratorio Policlínico Tabancura"
                          className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-700"
                        />

                        {/* Location Badge */}
                        <div className="absolute top-6 left-6 bg-primary/90 backdrop-blur-md px-4 py-2 rounded-2xl flex items-center gap-2 border border-white/10">
                          <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
                          <span className="text-[10px] font-black text-white uppercase tracking-widest">Centro Médico Vitacura</span>
                        </div>
                      </div>

                      {/* Stats Floating Badge */}
                      <div className="absolute -bottom-8 -left-8 bg-slate-50 dark:bg-slate-900 p-6 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-2xl">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary">
                            <Calculator size={24} />
                          </div>
                          <div>
                            <p className="text-3xl font-black text-primary dark:text-white">+800</p>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Exámenes Disponibles</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECCIÓN CÓMO FUNCIONA - Refined Guide */}
            <section className="py-20 bg-white dark:bg-slate-950 border-y border-slate-100 dark:border-slate-900 relative overflow-hidden">
              <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-black text-primary dark:text-white tracking-tighter mb-4">
                    ¿Cómo cotizo mis exámenes?
                  </h2>
                  <div className="w-24 h-1.5 bg-gradient-to-r from-secondary to-primary mx-auto rounded-full opacity-80"></div>
                </div>
                <div className="grid md:grid-cols-3 gap-12">
                  <div className="group flex items-start gap-6 p-8 rounded-[2.5rem] bg-slate-50 dark:bg-slate-900/50 border border-transparent hover:border-secondary/20 transition-all">
                    <div className="w-14 h-14 bg-white dark:bg-slate-800 shadow-lg rounded-2xl flex items-center justify-center shrink-0 font-black text-2xl text-secondary">1</div>
                    <div>
                      <h3 className="font-bold text-primary dark:text-white text-xl mb-2">Selecciona</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">Escoge entre previsión Particular o Fonasa para ver valores exactos.</p>
                    </div>
                  </div>

                  <div className="group flex items-start gap-6 p-8 rounded-[2.5rem] bg-slate-50 dark:bg-slate-900/50 border border-transparent hover:border-secondary/20 transition-all">
                    <div className="w-14 h-14 bg-white dark:bg-slate-800 shadow-lg rounded-2xl flex items-center justify-center shrink-0 font-black text-2xl text-secondary">2</div>
                    <div>
                      <h3 className="font-bold text-primary dark:text-white text-xl mb-2">Busca</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">Encuentra tus exámenes por nombre o código en tiempo real.</p>
                    </div>
                  </div>

                  <div className="group flex items-start gap-6 p-8 rounded-[2.5rem] bg-slate-50 dark:bg-slate-900/50 border border-transparent hover:border-secondary/20 transition-all">
                    <div className="w-14 h-14 bg-white dark:bg-slate-800 shadow-lg rounded-2xl flex items-center justify-center shrink-0 font-black text-2xl text-secondary">3</div>
                    <div>
                      <h3 className="font-bold text-primary dark:text-white text-xl mb-2">Obtén</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">Descarga tu PDF oficial con validez institucional inmediata.</p>
                    </div>
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mt-16 flex flex-col items-center gap-5"
                >
                  <div className="text-[11px] font-black uppercase tracking-[0.2em] text-secondary flex items-center gap-2 select-none">
                    <span className="w-2 h-2 rounded-full bg-secondary animate-pulse shrink-0" />
                    Selecciona tu previsión para comenzar:
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-4">
                    <button
                      onClick={() => handlePriceSelect('particular_general')}
                      className="group relative flex items-center gap-4 bg-primary dark:bg-slate-800 text-white pl-8 pr-2 py-2 rounded-full font-bold text-sm hover:scale-105 transition-all shadow-xl shadow-primary/20"
                    >
                      Cotizar Particular
                      <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center text-primary group-hover:rotate-12 transition-transform">
                        <Microscope size={18} />
                      </div>
                    </button>

                    <button
                      onClick={() => handlePriceSelect('bono_fonasa')}
                      className="group relative flex items-center gap-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-primary dark:text-white pl-8 pr-2 py-2 rounded-full font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-xl"
                    >
                      Beneficiario Fonasa
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary dark:text-secondary group-hover:-rotate-12 transition-transform">
                        <ShieldCheck size={18} />
                      </div>
                    </button>
                  </div>
                </motion.div>
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>

      {/* COMPONENTE PRINCIPAL (COTIZADOR POR PASOS) */}
      <section className={`transition-all duration-500 ${step >= 1 ? 'pt-44 pb-24' : 'pb-24'} relative z-10`}>
        <CotizadorExamenes
          step={step}
          onStepChange={setStep}
          priceType={priceType}
          onPriceTypeChange={setPriceType}
        />
      </section>

      {/* INFO FOOTER SECTION */}
      {step === 0 && (
        <section className="pb-40 container mx-auto px-6">
          <div className="max-w-5xl mx-auto bg-primary dark:bg-slate-900 rounded-[4rem] p-12 md:p-20 text-white relative overflow-hidden shadow-2xl shadow-primary/20">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl" />
            <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tighter leading-tight">
                  ¿Tienes dudas con <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-secondary to-teal-400">
                    tu orden médica?
                  </span>
                </h2>
                <p className="text-lg text-white/70 mb-10 leading-relaxed font-medium">
                  Consulta por la disponibilidad de exámenes en nuestra sucursal de Vitacura. ¡Llámanos o escríbenos directamente!
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="tel:+56229336740"
                    className="flex items-center gap-4 bg-white/10 hover:bg-white/20 backdrop-blur-md px-6 py-4 rounded-[1.5rem] border border-white/5 transition-all hover:scale-105 active:scale-95 text-left"
                  >
                    <Phone className="text-secondary shrink-0" size={22} />
                    <div>
                      <p className="text-[8px] font-black text-white/50 uppercase tracking-widest mb-0.5">Llamar a Sucursal</p>
                      <p className="text-sm font-black text-white">+56 2 2933 6740</p>
                    </div>
                  </a>

                  <a
                    href="https://wa.me/56965781253"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 bg-emerald-500/10 hover:bg-emerald-500/20 backdrop-blur-md px-6 py-4 rounded-[1.5rem] border border-emerald-500/10 transition-all hover:scale-105 active:scale-95 text-left"
                  >
                    <WhatsAppIcon className="text-emerald-400 shrink-0" size={22} />
                    <div>
                      <p className="text-[8px] font-black text-emerald-400/70 uppercase tracking-widest mb-0.5">WhatsApp</p>
                      <p className="text-sm font-black text-white">+56 9 6578 1253</p>
                    </div>
                  </a>
                </div>
              </div>
              <div className="relative group/vitacura overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 backdrop-blur-md shadow-2xl text-left">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src="/Sucursales/sucursal_vitacura.webp"
                    alt="Sucursal Vitacura Policlínico Tabancura"
                    className="w-full h-full object-cover group-hover/vitacura:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                    <div>
                      <span className="text-[9px] font-black text-secondary uppercase tracking-[0.25em] mb-1 block">Sala de Toma de Muestras</span>
                      <h3 className="text-xl font-bold text-white leading-tight">Sucursal Vitacura</h3>
                    </div>
                    <div className="bg-white/90 dark:bg-slate-900/90 text-primary dark:text-white backdrop-blur-sm px-3 py-1.5 rounded-xl flex items-center gap-2 text-[10px] font-black select-none">
                      <Clock size={12} className="text-secondary" />
                      <span>Abierto</span>
                    </div>
                  </div>
                </div>
                <div className="p-8 space-y-4">
                  <div className="flex gap-4 items-start text-white/80">
                    <MapPin className="text-secondary shrink-0 mt-1" size={18} />
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-wider text-white/50 mb-0.5">Ubicación</p>
                      <p className="text-sm font-bold text-white">Av. Vitacura 8620, Vitacura</p>
                      <p className="text-[11px] text-white/40 mt-0.5">Estacionamiento liberado para pacientes por Av. Vitacura</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start text-white/80 border-t border-white/5 pt-4">
                    <Clock className="text-secondary shrink-0 mt-1" size={18} />
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-wider text-white/50 mb-0.5">Horarios de Toma de Muestras</p>
                      <p className="text-sm font-bold text-white">Lunes a Viernes: 08:30 am a 11:30 am</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* PRE-FOOTER: EXPLORA NUESTRAS ESPECIALIDADES */}
      <OtherServices />
    </div>
  );
}
