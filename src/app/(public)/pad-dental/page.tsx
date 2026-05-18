"use client";

import React from 'react';
import { motion } from 'framer-motion';
import {
  SmilePlus,
  ShieldCheck,
  Check,
  Activity,
  Phone,
  ArrowRight,
  Sparkles,
  HelpCircle,
  Info,
  HeartHandshake,
  Calendar,
  Building2,
  Users
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { OtherServices } from '@/components/OtherServices';

const PAD_TREATMENTS = [
  {
    code: '2503001',
    title: 'Tapadura de un diente',
    badge: 'BONO PAD',
    color: 'border-l-amber-500 bg-amber-50/50 dark:bg-amber-950/10',
    dotColor: 'bg-amber-500',
    desc: 'Obturación (tapadura), diagnóstico y tratamiento integral para 1 pieza dental.',
    copago: '$59.340'
  },
  {
    code: '2503004',
    title: 'Tratamiento de conducto incisivo',
    badge: 'BONO PAD',
    color: 'border-l-rose-500 bg-rose-50/50 dark:bg-rose-950/10',
    dotColor: 'bg-rose-500',
    desc: 'Tratamiento de endodoncia completo para dientes incisivos y caninos (una pieza dental).',
    copago: '$80.050'
  },
  {
    code: '2503002',
    title: 'Tapaduras (2 a 4 piezas)',
    badge: 'BONO PAD',
    color: 'border-l-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/10',
    dotColor: 'bg-emerald-500',
    desc: 'Obturación (tapadura) y tratamiento complementario para 2 y hasta 4 piezas dentales.',
    copago: '$55.700'
  },
  {
    code: '2503005',
    title: 'Tratamiento de conducto Premolar',
    badge: 'BONO PAD',
    color: 'border-l-cyan-500 bg-cyan-50/50 dark:bg-cyan-950/10',
    dotColor: 'bg-cyan-500',
    desc: 'Tratamiento de endodoncia completo para piezas premolares (una pieza dental).',
    copago: '$100.370'
  },
  {
    code: '2503003',
    title: 'Tapaduras (Más de 5 piezas)',
    badge: 'BONO PAD',
    color: 'border-l-sky-500 bg-sky-50/50 dark:bg-sky-950/10',
    dotColor: 'bg-sky-500',
    desc: 'Obturación (tapadura) y tratamiento complementario completo para más de cinco piezas dentales.',
    copago: '$82.100'
  },
  {
    code: '2503006',
    title: 'Tratamiento de conducto Molar',
    badge: 'BONO PAD',
    color: 'border-l-fuchsia-500 bg-fuchsia-50/50 dark:bg-fuchsia-950/10',
    dotColor: 'bg-fuchsia-500',
    desc: 'Tratamiento de endodoncia completo para piezas molares (una pieza dental).',
    copago: '$110.520'
  }
];

const WhatsAppIcon = ({ size = 18, className = "" }: { size?: number, className?: string }) => (
  <svg width={size} height={size} fill="currentColor" viewBox="0 0 24 24" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export default function PadDentalPage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-500 overflow-x-hidden">

      {/* 1. HERO SECTION */}
      <section className="relative pt-48 pb-20 overflow-hidden">
        {/* Orbes de fondo */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[140px] -translate-y-1/3"></div>
          <div className="absolute top-40 right-10 w-[450px] h-[450px] bg-primary/5 rounded-full blur-[120px]"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center max-w-7xl mx-auto">

            {/* Texto Hero */}
            <div className="lg:col-span-7 text-left space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                {/* Badge Superior */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary/10">
                  <SmilePlus size={14} className="text-secondary shrink-0" />
                  Bono Fonasa Directo
                </div>

                <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tight leading-[0.95]">
                  PAD <br className="hidden md:inline" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-teal-400 to-secondary dark:from-white dark:via-secondary dark:to-teal-400">
                    Dental.
                  </span>
                </h1>

                <p className="text-xl text-slate-600 dark:text-slate-300 font-medium leading-relaxed max-w-xl">
                  Más de 50 años acompañando a las familias en el cuidado de su salud. Accede a tratamientos dentales con copago fijo conocido, sin cobros sorpresa.
                </p>

                <div className="flex flex-wrap gap-4 pt-4">
                  <a
                    href="#requisitos"
                    className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-primary text-white font-bold text-sm hover:bg-slate-800 transition-all hover:scale-105 shadow-xl shadow-primary/10 select-none cursor-pointer"
                  >
                    ¿Quiénes acceden?
                    <ArrowRight size={16} className="text-secondary group-hover:translate-x-1.5 transition-transform" />
                  </a>
                  <a
                    href="#contacto"
                    className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-white dark:bg-slate-900 text-slate-700 dark:text-white font-bold text-sm border border-slate-200 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/20 transition-all hover:scale-105 hover:bg-slate-50 dark:hover:bg-slate-800 select-none cursor-pointer"
                  >
                    ¿Cómo adquirir?
                  </a>
                </div>
              </motion.div>
            </div>

            {/* Flyer Gráfico Estilizado / Contenedor Fonasa */}
            <div className="lg:col-span-5 relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="relative overflow-hidden p-8 rounded-[3rem] bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-950 border border-slate-100 dark:border-white/5 shadow-2xl dark:shadow-none flex flex-col items-center text-center group"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full blur-2xl pointer-events-none" />

                {/* Logo Institucional Fonasa */}
                <div className="relative w-36 h-20 mb-6 flex items-center justify-center">
                  <Image
                    src="/logos_convenios_prevision/fonasa.png"
                    alt="Logo Fonasa"
                    fill
                    style={{ objectFit: 'contain' }}
                    className="dark:brightness-105 dark:drop-shadow-[0_0_15px_rgba(255,255,255,0.15)]"
                  />
                </div>

                <span className="text-[10px] font-black uppercase tracking-[0.25em] text-secondary mb-2">Resolución en Sucursal</span>
                <h3 className="text-2xl font-black text-primary dark:text-white tracking-tight leading-none mb-3">Valor Fijo Protegido</h3>
                <p className="text-slate-500 dark:text-slate-400 font-medium text-sm leading-relaxed max-w-xs">
                  Tu bono PAD incluye los honorarios de todo el equipo médico, insumos, pabellón, anestesia y todos los controles posteriores hasta tu alta clínica.
                </p>

                <div className="mt-8 pt-6 border-t border-slate-100 dark:border-white/5 w-full flex items-center justify-center gap-6">
                  <div className="text-center">
                    <span className="block text-2xl font-black text-primary dark:text-white tracking-tight leading-none">6</span>
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Tratamientos</span>
                  </div>
                  <div className="h-8 w-px bg-slate-100 dark:bg-white/5" />
                  <div className="text-center">
                    <span className="block text-2xl font-black text-secondary tracking-tight leading-none">100%</span>
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Garantizado</span>
                  </div>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. GRILLA DE TRATAMIENTOS PAD */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-6 max-w-7xl">

          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/15 text-secondary text-[10px] font-bold uppercase tracking-wider">
              Códigos de Prestación Minsal
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-none">
              Tratamientos Incluidos en el Bono
            </h2>
            <p className="text-lg text-slate-500 dark:text-slate-400 font-medium">
              Conoce el valor exacto de tu copago para tapaduras y tratamientos de conducto en Policlínico Tabancura.
            </p>
          </div>

          {/* Grilla 3x2 de Tarjetas PAD */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PAD_TREATMENTS.map((pad, idx) => (
              <motion.div
                key={pad.code}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className={`relative overflow-hidden p-8 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 hover:border-slate-200 dark:hover:border-white/10 hover:shadow-xl dark:shadow-none transition-all duration-500 group border-l-4 ${pad.color} flex flex-col justify-between`}
              >
                <div>
                  {/* Fila superior: Badge y Código */}
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${pad.dotColor}`} />
                      {pad.badge}
                    </span>
                    <span className="text-[11px] font-bold text-primary dark:text-secondary bg-slate-50 dark:bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-100 dark:border-white/5 font-mono">
                      Cód: {pad.code}
                    </span>
                  </div>

                  {/* Nombre y descripción */}
                  <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight leading-snug mb-3 group-hover:text-primary dark:group-hover:text-secondary transition-colors">
                    {pad.title}
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 font-medium text-sm leading-relaxed mb-8">
                    {pad.desc}
                  </p>
                </div>

                {/* Copago */}
                <div className="pt-5 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tu Copago Fijo</span>
                  <div className="bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-white/5 rounded-full px-5 py-2 flex items-center justify-center font-black text-slate-900 dark:text-white text-base group-hover:scale-105 group-hover:border-secondary/20 transition-all duration-300">
                    <span className="text-secondary mr-1">$</span> {pad.copago.replace('$', '')}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 3. REQUISITOS Y PREGUNTAS CLAVE */}
      <section id="requisitos" className="py-20 bg-white dark:bg-slate-900/40 relative overflow-hidden z-10 scroll-mt-24">
        {/* Accent Sphere */}
        <div className="absolute -left-20 top-1/2 w-80 h-80 bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 items-stretch">

            {/* Columna Requisitos */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-primary via-slate-950 to-[#0c142c] text-white p-8 md:p-12 rounded-[3.5rem] shadow-2xl relative overflow-hidden flex flex-col justify-between"
            >
              {/* background decoration icon */}
              <div className="absolute right-0 bottom-0 translate-x-1/4 translate-y-1/4 opacity-[0.03] text-white pointer-events-none">
                <Users size={450} />
              </div>

              <div className="relative z-10">
                <div className="w-20 h-14 bg-white/10 rounded-2xl border border-white/20 flex items-center justify-center text-secondary mb-8 relative p-2 overflow-hidden backdrop-blur-sm">
                  <Image 
                    src="/logos_convenios_prevision/fonasa.png" 
                    alt="Logo Fonasa" 
                    fill 
                    sizes="80px"
                    className="object-contain p-2" 
                  />
                </div>

                <h3 className="text-3xl md:text-4xl font-black tracking-tight leading-none mb-6">
                  ¿Quiénes pueden acceder al Bono PAD?
                </h3>
                <p className="text-slate-300 font-medium leading-relaxed mb-8">
                  El beneficio de Bono PAD Dental está diseñado específicamente para garantizar acceso de calidad a la salud bucal en afiliados Fonasa.
                </p>

                <div className="space-y-6">
                  <div className="flex gap-4 items-start">
                    <div className="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center shrink-0 text-secondary mt-1">
                      <Check size={14} strokeWidth={3} />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-lg">Tramos Fonasa Habilitados</h4>
                      <p className="text-slate-300 text-sm font-medium mt-1">
                        Afiliados o cargas acreditadas de Fonasa pertenecientes a los **Tramos B, C o D**.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center shrink-0 text-secondary mt-1">
                      <Check size={14} strokeWidth={3} />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-lg">Rango de Edad Autorizado</h4>
                      <p className="text-slate-300 text-sm font-medium mt-1">
                        Válido para niños, jóvenes y adultos entre **12 y 34 años** inclusive.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative z-10 mt-12 pt-6 border-t border-white/5 flex items-center justify-between text-xs text-slate-400 font-bold uppercase tracking-wider">
                <span>Tratamiento 100% Cubierto</span>
                <span className="text-secondary font-black">Validación en Línea</span>
              </div>
            </motion.div>

            {/* Columna Garantías y Cobertura */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col justify-center space-y-8"
            >
              <div className="space-y-3">
                <span className="text-[10px] font-black uppercase tracking-[0.25em] text-secondary">Garantías Policlínico Tabancura</span>
                <h3 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-none">
                  ¿Qué cubre exactamente tu Bono PAD Dental?
                </h3>
                <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                  Bajo la modalidad PAD, el precio es final e incluye todas las etapas del procedimiento clínico de forma garantizada:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 hover:border-secondary/20 transition-all">
                  <span className="block font-bold text-slate-900 dark:text-white mb-2">Diagnóstico y Examen</span>
                  <p className="text-slate-500 dark:text-slate-400 text-xs font-medium leading-relaxed">
                    Evaluación clínica, insumos y radiografías necesarias para planificar tu tratamiento.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 hover:border-secondary/20 transition-all">
                  <span className="block font-bold text-slate-900 dark:text-white mb-2">El Procedimiento</span>
                  <p className="text-slate-500 dark:text-slate-400 text-xs font-medium leading-relaxed">
                    Uso de pabellón dental, anestesia local, materiales de obturación y endodoncia de alta gama.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 hover:border-secondary/20 transition-all">
                  <span className="block font-bold text-slate-900 dark:text-white mb-2">Controles Post-Operarios</span>
                  <p className="text-slate-500 dark:text-slate-400 text-xs font-medium leading-relaxed">
                    Consultas posteriores de seguimiento y retiro de puntos si fuera necesario, sin costo adicional.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 hover:border-secondary/20 transition-all">
                  <span className="block font-bold text-slate-900 dark:text-white mb-2">Insumos y Materiales</span>
                  <p className="text-slate-500 dark:text-slate-400 text-xs font-medium leading-relaxed">
                    Materiales dentales clínicamente testeados y sellados bajo estándares sanitarios de la Seremi.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-teal-500/5 border border-teal-500/10 p-5 rounded-2xl">
                <Info size={20} className="text-secondary shrink-0" />
                <p className="text-xs font-medium text-slate-600 dark:text-slate-400 leading-relaxed">
                  **Importante:** El Bono PAD no tiene cobros extras en sucursal. El valor del copago que adquieres en Fonasa es lo único que cancelas. ¡Nosotros te guiamos en todo el proceso!
                </p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 4. CONTACTO Y ASISTENCIA */}
      <section id="contacto" className="py-20 relative z-10 scroll-mt-24">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 p-8 md:p-16 rounded-[3.5rem] shadow-xl dark:shadow-none relative overflow-hidden">

            <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="grid lg:grid-cols-2 gap-12 items-center">

              {/* Texto Asistencia */}
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary text-white text-[10px] font-bold uppercase tracking-wider">
                  Te Acompañamos en el Proceso
                </div>
                <h3 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-none">
                  ¿Cómo adquirir tu Bono PAD Dental?
                </h3>
                <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                  Nuestro equipo de secretaría dental te ayuda a verificar tu tramo y edad, emitir tu presupuesto clínico para Fonasa y agendar tus horas de atención en la sucursal de tu conveniencia.
                </p>

                <div className="pt-4 flex flex-col sm:flex-row gap-4">
                  <a
                    href="https://wa.me/56965781253"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-emerald-500 text-white font-bold text-sm hover:bg-emerald-600 transition-all hover:scale-105 shadow-xl shadow-emerald-500/10 select-none cursor-pointer"
                  >
                    <WhatsAppIcon size={18} className="shrink-0" />
                    Consultar en WhatsApp
                  </a>
                </div>
              </div>

              {/* Grid Sucursales de Contacto Directo */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Casa Matriz */}
                <div className="bg-slate-50 dark:bg-slate-950 p-6 rounded-3xl border border-slate-100 dark:border-white/5 flex flex-col justify-between h-full group hover:border-secondary/20 transition-all duration-300">
                  <div>
                    <div className="w-10 h-10 bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 rounded-xl flex items-center justify-center text-secondary mb-4 group-hover:scale-105 transition-transform">
                      <Building2 size={20} />
                    </div>
                    <h4 className="font-black text-slate-900 dark:text-white text-base leading-none mb-1">Casa Matriz</h4>
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Los Tribunales</span>
                    <p className="text-slate-500 dark:text-slate-400 text-xs font-semibold mt-3">Calle Los Tribunales #1268</p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 dark:border-white/5 space-y-2">
                    <a href="tel:+56222172635" className="flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-white transition-colors text-xs font-bold font-mono">
                      <Phone size={12} className="text-secondary shrink-0" /> +56 2 2217 2635
                    </a>
                    <a href="https://wa.me/56966187736" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors text-xs font-bold font-mono">
                      <WhatsAppIcon size={12} className="text-emerald-500 shrink-0" /> +56 9 6618 7736
                    </a>
                  </div>
                </div>

                {/* Sucursal Vitacura */}
                <div className="bg-slate-50 dark:bg-slate-950 p-6 rounded-3xl border border-slate-100 dark:border-white/5 flex flex-col justify-between h-full group hover:border-secondary/20 transition-all duration-300">
                  <div>
                    <div className="w-10 h-10 bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 rounded-xl flex items-center justify-center text-secondary mb-4 group-hover:scale-105 transition-transform">
                      <Building2 size={20} />
                    </div>
                    <h4 className="font-black text-slate-900 dark:text-white text-base leading-none mb-1">Sucursal Dental</h4>
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Vitacura</span>
                    <p className="text-slate-500 dark:text-slate-400 text-xs font-semibold mt-3">Av. Vitacura #8620</p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 dark:border-white/5 space-y-2">
                    <a href="tel:+56229336740" className="flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-white transition-colors text-xs font-bold font-mono">
                      <Phone size={12} className="text-secondary shrink-0" /> +56 2 2933 6740
                    </a>
                    <a href="https://wa.me/56965781253" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors text-xs font-bold font-mono">
                      <WhatsAppIcon size={12} className="text-emerald-500 shrink-0" /> +56 9 6578 1253
                    </a>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 5. OTROS SERVICIOS DESTACADOS (PRE-FOOTER) */}
      <OtherServices />
    </main>
  );
}
