import React from 'react';
import { Hero } from '@/components/Hero';
import { MinimalistScheduler } from '@/components/MinimalistScheduler';
import { PartnerCarousel } from '@/components/PartnerCarousel';
import { ServiceCarousel } from '@/components/ServiceCarousel';
import { Branches } from '@/components/Branches';
import { GoogleReviews } from '@/components/GoogleReviews';
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
import Image from 'next/image';

export default function Home() {
  return (
    <main className="relative min-h-screen bg-transparent dark:bg-transparent antialiased overflow-x-hidden transition-colors duration-300">
      {/* 1. HERO SECTION DINÁMICO */}
      <Hero 
        description={
          <>
            En Policlínico Tabancura te acompañamos en cada etapa con especialistas de excelencia y el trato humano que tú y tu familia merecen.
            <span className="block mt-4 font-bold text-slate-700 dark:text-white">Todo lo que necesitas, <span className="text-secondary">en un solo lugar.</span></span>
          </>
        }
      />

      <section className="py-8 bg-transparent dark:bg-transparent">
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
          <div id="agendar" className="mb-20 text-center scroll-mt-48">
            <div className="mb-12">
              <p className="text-lg md:text-xl font-medium text-slate-600 dark:text-slate-400 mb-2">
                Somos una corporación <span className="text-secondary relative inline-block">sin fines de lucro.
                  <svg className="absolute -bottom-1.5 left-0 w-full h-2.5 text-secondary/40" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M2,8 Q50,2 98,8" stroke="currentColor" strokeWidth="4" strokeLinecap="round" fill="none" />
                  </svg>
                </span>
              </p>
              <h3 className="text-3xl md:text-5xl font-bold text-primary dark:text-white mb-4">Atención especializada por áreas</h3>
              <p className="text-base md:text-lg text-slate-400 dark:text-slate-500 font-medium tracking-wide">Agenda en línea y obtén valores preferenciales</p>
            </div>
            
            <MinimalistScheduler />
          </div>

          <div className="flex flex-col gap-10 mb-12 py-8">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary text-white text-[10px] font-bold uppercase tracking-widest mb-8">
                <HeartPulse size={14} fill="currentColor" className="text-secondary shrink-0" /> Servicios Médicos
              </div>
              <h2 className="text-4xl md:text-6xl font-bold text-primary dark:text-white tracking-tighter leading-[0.9] mb-8">
                Innovación en cada <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-teal-500 to-secondary">especialidad.</span>
              </h2>
              <p className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 font-medium max-w-2xl leading-relaxed">Equipos de vanguardia y especialistas de primer nivel en un solo lugar.</p>
            </div>
          </div>

          <ServiceCarousel />
        </div>
      </section>
      {/* 4. VALIDADOR MI VITA */}
      <section id="mivita" className="py-16 relative overflow-hidden bg-transparent dark:bg-transparent scroll-mt-24">


        <div className="container mx-auto px-6 relative z-10">
          <div className="bg-white dark:bg-slate-950 rounded-[2rem] sm:rounded-[2.5rem] md:rounded-[4rem] border border-slate-100 dark:border-slate-800 p-6 sm:p-8 md:p-20 shadow-[0_10px_60px_rgba(0,0,0,0.02)]">
            <div className="grid lg:grid-cols-2 gap-16 items-center">

              {/* Columna Izquierda: Contexto */}
              <div className="max-w-xl">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary text-white text-[11px] font-bold uppercase tracking-widest mb-8">
                  <ShieldCheck size={14} fill="currentColor" className="text-secondary shrink-0" /> ¡Atención vecinos de Vitacura!
                </div>

                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary dark:text-white mb-6 leading-tight tracking-tighter">
                  Valida tus descuentos con <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-teal-500 to-secondary">Tarjeta Mi Vita.</span>
                </h2>
                <p className="text-lg text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-8">
                  Accede a valores preferenciales en tus atenciones médicas y dentales. Ingresa tu RUT a continuación y verifica tu estado de convenio vigente al instante.
                </p>

                <div className="mb-10 group hidden md:block">
                  <Image 
                    src="/logos_convenios_prevision/mivita_v2_light.png" 
                    alt="Logo Tarjeta Mi Vita" 
                    width={220} 
                    height={88} 
                    style={{ width: 'auto', height: 'auto' }}
                    className="block dark:hidden object-contain drop-shadow-md transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-1"
                  />
                  <Image 
                    src="/logos_convenios_prevision/mivita_v2_dark.png" 
                    alt="Logo Tarjeta Mi Vita" 
                    width={220} 
                    height={88} 
                    style={{ width: 'auto', height: 'auto' }}
                    className="hidden dark:block object-contain drop-shadow-md transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-1"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3 sm:gap-6">
                  <div className="group flex items-center gap-2 sm:gap-4 bg-slate-50 dark:bg-slate-900 p-3 sm:p-4 rounded-2xl border border-slate-100 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-all cursor-pointer">
                    <div className="w-12 h-12 bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-xl shadow-sm flex items-center justify-center font-black text-secondary text-xl group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-300">25%</div>
                    <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider leading-tight">Sobre el<br />arancel general</span>
                  </div>
                  <div className="group flex items-center gap-2 sm:gap-4 bg-slate-50 dark:bg-slate-900 p-3 sm:p-4 rounded-2xl border border-slate-100 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-all cursor-pointer">
                    <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
                      <div className="absolute w-7 h-7 bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-lg shadow-sm flex items-center justify-center text-secondary/40 -translate-x-2.5 -translate-y-1.5 -rotate-12 group-hover:-translate-y-5 group-hover:-rotate-[20deg] group-hover:scale-110 transition-all duration-300"><Microscope size={14} /></div>
                      <div className="absolute w-7 h-7 bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-lg shadow-sm flex items-center justify-center text-secondary/40 translate-x-2.5 -translate-y-1.5 rotate-12 group-hover:-translate-y-5 group-hover:rotate-[20deg] group-hover:scale-110 transition-all duration-300"><Brain size={14} /></div>
                      <div className="absolute w-9 h-9 bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-xl shadow-md flex items-center justify-center text-secondary z-10 translate-y-1 group-hover:-translate-y-1 group-hover:scale-105 transition-all duration-300"><Stethoscope size={18} /></div>
                    </div>
                    <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider leading-tight">Descuentos en<br />todas las categorías</span>
                  </div>
                </div>
              </div>

              {/* Columna Derecha: Iframe del Validador */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-secondary/20 to-primary/5 rounded-[3rem] transform rotate-3 scale-105 transition-transform duration-700 hover:rotate-6" />
                <div className="relative bg-[#121e42] rounded-[2.5rem] overflow-hidden border border-slate-100 dark:border-slate-800 h-[580px] sm:h-[520px] w-full flex flex-col">
                  {/* Falso header de navegador para estilo nativo */}
                  <div className="bg-[#0d1630] border-b border-[#1e316b] p-4 flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-400" />
                      <div className="w-3 h-3 rounded-full bg-amber-400" />
                      <div className="w-3 h-3 rounded-full bg-green-400" />
                    </div>
                    <div className="mx-auto text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                      Portal Mi Vita <ShieldCheck size={12} className="text-secondary" />
                    </div>
                  </div>
                  {/* Adaptive High-Bottom Crop Iframe */}
                  <div className="relative w-full h-full flex-1 overflow-hidden bg-[#121e42]">
                    <iframe
                      src="https://mivita.policlinicotabancura.cl/"
                      className="absolute w-full h-[105%] left-0 -top-[2%] sm:w-[120%] sm:h-[160%] sm:-left-[10%] sm:-top-[5%] pointer-events-auto origin-center scale-95 sm:scale-100"
                      style={{ 
                        colorScheme: 'light'
                      }}
                      scrolling="no"
                      frameBorder="0"
                      title="Validador Tarjeta Mi Vita"
                    />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
      
      {/* BLOQUE RESEÑAS DE GOOGLE */}
      <GoogleReviews />

      {/* 5. NUESTRAS SUCURSALES (Modern Style) */}
      <div id="sucursales" className="scroll-mt-24">
        <Branches />
      </div>

    </main>
  );
}