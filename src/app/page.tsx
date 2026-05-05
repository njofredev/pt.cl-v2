"use client";

import React from 'react';
import { Hero } from '@/components/Hero';
import { MinimalistScheduler } from '@/components/MinimalistScheduler';
import { PartnerCarousel } from '@/components/PartnerCarousel';
import { ServiceCarousel } from '@/components/ServiceCarousel';
import { Branches } from '@/components/Branches';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Stethoscope,
  Microscope,
  Brain,
  HeartPulse,
  ChevronRight,
  Activity,
  LayoutDashboard,
  ShieldCheck
} from 'lucide-react';
import { Button } from "@/components/ui/button";

// Variantes de animación ultra-rápidas para evitar lag
const fadeInUp = {
  initial: { opacity: 0, y: 15 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-10px" },
  transition: { duration: 0.4, ease: "easeOut" as const }
};

export default function Home() {
  return (
    <main className="relative min-h-screen bg-white antialiased overflow-x-hidden">
      {/* 1. HERO SECTION DINÁMICO */}
      <Hero />

      <section className="py-8 border-b border-slate-50 bg-white">
        <div className="container mx-auto px-6">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] text-center mb-4">
            Atención con Previsión y Convenios Directos
          </p>
          <PartnerCarousel />
        </div>
      </section>

      {/* 3. SERVICIOS DESTACADOS (Modern Grid) */}
      <section id="servicios" className="pt-10 pb-32 relative">
        <div className="container mx-auto px-6 relative z-10">
          {/* Nueva posición CTA del Programador */}
          <div className="mb-20 text-center">
            <div className="mb-12">
              <p className="text-lg md:text-xl font-medium text-slate-600 mb-2">
                Somos una corporación <span className="text-secondary relative">sin fines de lucro<span className="absolute bottom-0 left-0 w-full h-1 bg-secondary/30 rounded-full" /></span>.
              </p>
              <h3 className="text-3xl md:text-5xl font-bold text-primary mb-4">Atención especializada por áreas</h3>
              <p className="text-base md:text-lg text-slate-400 font-medium tracking-wide">Agenda en línea y obtén valores preferenciales</p>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="w-full"
            >
              <MinimalistScheduler />
            </motion.div>
          </div>

          <div className="flex flex-col gap-10 mb-12 py-8">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-[10px] font-bold uppercase tracking-widest mb-8">
                <HeartPulse size={14} /> Servicios Médicos
              </div>
              <h2 className="text-4xl md:text-6xl font-bold text-primary tracking-tighter leading-[0.9] mb-8">
                Innovación en cada <br /> <span className="text-secondary">especialidad.</span>
              </h2>
              <p className="text-xl md:text-2xl text-slate-500 font-medium max-w-2xl leading-relaxed">Equipos de vanguardia y especialistas de primer nivel en un solo lugar.</p>
            </div>
          </div>

          <ServiceCarousel />
        </div>
      </section>
      {/* 4. VALIDADOR MI VITA */}
      <section className="py-16 bg-slate-50 relative overflow-hidden">
        {/* Elementos decorativos de fondo */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-secondary/5 rounded-full blur-3xl -mt-96 -mr-96 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -mb-64 -ml-64 pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="bg-white rounded-[2rem] sm:rounded-[2.5rem] md:rounded-[4rem] border border-slate-100 p-6 sm:p-8 md:p-20 shadow-[0_10px_60px_rgba(0,0,0,0.02)]">
            <div className="grid lg:grid-cols-2 gap-16 items-center">

              {/* Columna Izquierda: Contexto */}
              <div className="max-w-xl">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-[11px] font-bold uppercase tracking-widest mb-8">
                  <ShieldCheck size={14} /> ¡Atención vecinos de Vitacura!
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-6 leading-tight tracking-tighter">
                  Valida tus descuentos con <br />
                  <span className="text-secondary">Tarjeta Mi Vita.</span>
                </h2>
                <p className="text-lg text-slate-500 font-medium leading-relaxed mb-10">
                  En Policlínico Tabancura estamos comprometidos con la comunidad. Si eres vecino de Vitacura y posees la Tarjeta Mi Vita vigente, accede a beneficios y valores preferenciales en tus atenciones. Ingresa tu RUT para verificar tu estado de convenio al instante.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center font-black text-secondary text-xl">15%</div>
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">En Consulta<br />Dental</span>
                  </div>
                  <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center font-black text-secondary text-xl">10%</div>
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">En Exámenes<br />y Muestras</span>
                  </div>
                </div>
              </div>

              {/* Columna Derecha: Iframe del Validador */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-secondary/20 to-primary/5 rounded-[3rem] transform rotate-3 scale-105 transition-transform duration-700 hover:rotate-6" />
                <div className="relative bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 h-[440px] sm:h-[520px] w-full flex flex-col">
                  {/* Falso header de navegador para estilo nativo */}
                  <div className="bg-slate-50 border-b border-slate-100 p-4 flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-400" />
                      <div className="w-3 h-3 rounded-full bg-amber-400" />
                      <div className="w-3 h-3 rounded-full bg-green-400" />
                    </div>
                    <div className="mx-auto text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                      Portal Mi Vita <ShieldCheck size={12} className="text-secondary" />
                    </div>
                  </div>
                  {/* Iframe */}
                  <iframe
                    src="https://mivita.policlinicotabancura.cl/"
                    className="w-full h-full flex-1 overflow-hidden"
                    style={{ overflow: 'hidden' }}
                    scrolling="no"
                    frameBorder="0"
                    title="Validador Tarjeta Mi Vita"
                  />
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 5. NUESTRAS SUCURSALES (Modern Style) */}
      <Branches />

    </main>
  );
}