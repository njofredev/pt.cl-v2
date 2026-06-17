"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Microscope, 
  Clock, 
  MapPin, 
  Phone, 
  ShieldCheck, 
  Sparkles, 
  FileText,
  CalendarCheck,
  ChevronDown,
  Info,
  Car
} from 'lucide-react';
import { OtherServices } from '@/components/OtherServices';

const WhatsAppIcon = ({ size = 18, className = "" }: { size?: number, className?: string }) => (
  <svg width={size} height={size} fill="currentColor" viewBox="0 0 24 24" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export default function TomaMuestrasPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const keyFeatures = [
    {
      icon: <CalendarCheck size={28} className="text-[#259CF4]" />,
      title: "Orden de Llegada",
      description: "No necesitas agendar hora previa. Te atendemos de manera expedita por orden de llegada durante toda la mañana."
    },
    {
      icon: <Clock size={28} className="text-secondary" />,
      title: "Resultados en 24 Horas",
      description: "La mayoría de tus exámenes estarán listos y disponibles en línea en menos de 24 horas a través de nuestra web."
    },
    {
      icon: <ShieldCheck size={28} className="text-emerald-500" />,
      title: "Convenios Fonasa e Isapres",
      description: "Emitimos bonos en línea para Fonasa e Isapres. También contamos con valores preferenciales particulares."
    },
    {
      icon: <Car size={28} className="text-[#259CF4]" />,
      title: "Estacionamiento Gratuito",
      description: "Disponemos de estacionamiento liberado exclusivo para nuestros pacientes directamente en el recinto por Av. Vitacura."
    }
  ];

  const preparationSteps = [
    {
      title: "Ayuno Requerido",
      desc: "Muchos exámenes de sangre (como Glicemia, Insulina o Perfil Lipídico) requieren un ayuno estricto de 8 a 12 horas. Solo puedes consumir agua pura en ese periodo.",
      tag: "Sangre"
    },
    {
      title: "Orden Médica",
      desc: "Debes traer tu orden médica (física o digital en tu celular). Debe ser legible, incluir el nombre del médico, firma, timbre y los exámenes claramente indicados.",
      tag: "Obligatorio"
    },
    {
      title: "Exámenes de Orina",
      desc: "Para exámenes de orina (Urocultivo u Orina Completa), se recomienda recolectar el primer chorro matutino en un frasco estéril (disponible en farmacias) o solicitar uno en nuestra recepción.",
      tag: "Orina / Cultivos"
    }
  ];

  const faqs = [
    {
      q: "¿En qué horario atiende la toma de muestras?",
      a: "El horario de toma de muestras es de Lunes a Viernes desde las 08:30 am hasta las 11:30 am en nuestra Sucursal Vitacura."
    },
    {
      q: "¿Necesito llevar una orden médica obligatoriamente?",
      a: "Sí, para realizar cualquier examen de laboratorio clínico es mandatorio presentar una orden emitida por un profesional de la salud habilitado (médico, matrona, etc.)."
    },
    {
      q: "¿Cómo puedo consultar y descargar mis resultados?",
      a: "Tus resultados son procesados por el prestigioso laboratorio Laboval. Podrás consultarlos y descargarlos en línea ingresando al portal de pacientes con tu RUT. El enlace directo lo encuentras en la sección Novedades -> Resultados de Exámenes de nuestro menú."
    },
    {
      q: "¿Qué tipo de muestras se reciben?",
      a: "Realizamos tomas de muestras sanguíneas convencionales y especiales, y recibimos muestras de orina, cultivos bacteriológicos y parasitológicos. Para dudas con exámenes complejos, contáctanos previamente."
    }
  ];

  return (
    <div className="min-h-screen bg-clinical-bg dark:bg-slate-950 transition-colors duration-500">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-40 pb-24 overflow-hidden">
        {/* Background Ornaments */}
        <div className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] bg-secondary/5 rounded-full blur-[120px] -z-10 animate-pulse" />

        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            {/* Left Column: Text Content */}
            <div className="flex-1 lg:max-w-2xl text-center lg:text-left relative">
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#259CF4] text-white text-[10px] font-black uppercase tracking-widest mb-8 shadow-lg shadow-primary/20"
              >
                <Microscope size={14} className="text-white" />
                Laboratorio Clínico
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl md:text-7xl font-black text-primary dark:text-white tracking-tighter leading-[1.0] mb-8"
              >
                Toma de muestras <br />
                <span className="text-[#259CF4]">
                  rápida y confiable.
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-lg text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-8 max-w-xl"
              >
                Realiza tus exámenes generales y específicos en nuestra moderna sala de toma de muestras en Vitacura. Sin filas innecesarias y con la máxima calidez profesional.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-12"
              >
                <a
                  href="https://wa.me/56965781253"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex items-center gap-4 bg-emerald-600 text-white pl-8 pr-2 py-2 rounded-full font-bold text-sm hover:scale-105 transition-all shadow-xl shadow-emerald-600/20"
                >
                  Consultar por WhatsApp
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-emerald-600 group-hover:rotate-12 transition-transform">
                    <WhatsAppIcon size={18} />
                  </div>
                </a>

                <a
                  href="#indicaciones"
                  className="group relative flex items-center gap-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-primary dark:text-white pl-8 pr-2 py-2 rounded-full font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-md"
                >
                  Ver Preparación
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary dark:text-secondary group-hover:translate-y-0.5 transition-transform">
                    <Info size={16} />
                  </div>
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex items-center justify-center lg:justify-start gap-4 p-4 bg-white/50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800/80 backdrop-blur-sm rounded-2xl"
              >
                <div className="w-10 h-10 bg-[#259CF4]/10 rounded-xl flex items-center justify-center text-[#259CF4] shrink-0">
                  <MapPin size={20} />
                </div>
                <div className="text-left">
                  <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#259CF4] mb-0.5">Sucursal Vitacura</p>
                  <p className="text-[13px] font-bold text-primary dark:text-white leading-tight">Av. Vitacura 8620, Vitacura</p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium mt-0.5">Estacionamiento exclusivo gratuito</p>
                </div>
              </motion.div>
            </div>

            {/* Right Column: Visual Hero */}
            <div className="flex-1 relative hidden lg:block">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                className="relative z-10"
              >
                <div className="relative aspect-[4/3] rounded-[3.5rem] overflow-hidden border-[12px] border-white dark:border-slate-900 shadow-2xl">
                  <img
                    src="/generated/heroLaboratorio.webp"
                    alt="Sala de Toma de Muestras Policlínico Tabancura"
                    className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-700"
                  />

                  {/* Location Badge */}
                  <div className="absolute top-6 left-6 bg-primary/90 backdrop-blur-md px-4 py-2 rounded-2xl flex items-center gap-2 border border-white/10">
                    <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
                    <span className="text-[10px] font-black text-white uppercase tracking-widest">Atención de Lunes a Viernes</span>
                  </div>
                </div>

                {/* Floating Badge */}
                <div className="absolute -bottom-8 -left-8 bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-2xl">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#259CF4]/10 rounded-2xl flex items-center justify-center text-[#259CF4]">
                      <Microscope size={24} />
                    </div>
                    <div>
                      <p className="text-2xl font-black text-primary dark:text-white">Laboval</p>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Laboratorio en convenio</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. KEY FEATURES GRID */}
      <section className="py-20 bg-white dark:bg-slate-900/20 border-y border-slate-100 dark:border-slate-900">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {keyFeatures.map((feat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-8 rounded-[2.5rem] bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 hover:border-[#259CF4]/30 dark:hover:border-[#259CF4]/30 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center shadow-md mb-6 group-hover:scale-105 transition-transform">
                  {feat.icon}
                </div>
                <h3 className="font-bold text-primary dark:text-white text-lg mb-3">{feat.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{feat.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. PREPARATION GUIDE */}
      <section id="indicaciones" className="py-24 scroll-mt-24">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[10px] font-black text-[#259CF4] uppercase tracking-[0.25em] mb-3 block">Preparación del Paciente</span>
            <h2 className="text-4xl md:text-5xl font-black text-primary dark:text-white tracking-tighter mb-4">
              Instrucciones para tus exámenes
            </h2>
            <div className="w-20 h-1 bg-[#259CF4] mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {preparationSteps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-8 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] shadow-sm relative group hover:shadow-md transition-shadow"
              >
                <span className="absolute top-6 right-6 px-3 py-1 bg-[#259CF4]/10 text-[#259CF4] rounded-full text-[9px] font-black uppercase tracking-wider">
                  {step.tag}
                </span>
                <h3 className="text-xl font-bold text-primary dark:text-white mb-4 pt-4">{step.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FAQS */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900/40 border-y border-slate-100 dark:border-slate-800">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-16">
            <span className="text-[10px] font-black text-[#259CF4] uppercase tracking-[0.25em] mb-3 block">Resolviendo Inquietudes</span>
            <h2 className="text-3xl md:text-4xl font-black text-primary dark:text-white tracking-tighter">
              Preguntas Frecuentes
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-slate-900 rounded-[1.8rem] border border-slate-100 dark:border-slate-800/80 overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full px-8 py-5 flex items-center justify-between text-left font-bold text-primary dark:text-white hover:text-[#259CF4] transition-colors focus:outline-none"
                >
                  <span className="text-base pr-4">{faq.q}</span>
                  <ChevronDown
                    size={18}
                    className={`shrink-0 transition-transform duration-300 ${openFaq === idx ? 'rotate-180 text-[#259CF4]' : 'text-slate-400'}`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-8 pb-6 text-sm text-slate-500 dark:text-slate-400 leading-relaxed border-t border-slate-50 dark:border-slate-800/50 pt-4 font-medium">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CONTACT & MAP SECTION */}
      <section className="py-24 container mx-auto px-6">
        <div className="max-w-5xl mx-auto bg-primary dark:bg-slate-900 rounded-[4rem] p-12 md:p-20 text-white relative overflow-hidden shadow-2xl shadow-primary/20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl" />
          
          <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
            <div className="text-left">
              <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tighter leading-tight">
                ¿Tienes dudas con <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-secondary to-teal-400">
                  tu orden médica?
                </span>
              </h2>
              <p className="text-lg text-white/70 mb-10 leading-relaxed font-medium">
                Consulta por la disponibilidad de exámenes y convenios específicos en nuestra sucursal de Vitacura. ¡Escríbenos o llámanos!
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

      {/* 6. OTHER SERVICES */}
      <OtherServices />
    </div>
  );
}
