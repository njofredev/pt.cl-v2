import React from 'react';
import dynamic from 'next/dynamic';
import { Hero } from '@/components/Hero';
import { MiVitaLink } from '@/components/MiVitaLink';
import { MinimalistScheduler } from '@/components/MinimalistScheduler';
import { PartnerCarousel } from '@/components/PartnerCarousel';
import { ServiceCarousel } from '@/components/ServiceCarousel';

const GoogleReviews = dynamic(() => import('@/components/GoogleReviews').then(mod => mod.GoogleReviews), {
  ssr: true,
  loading: () => <div className="h-96 animate-pulse bg-slate-50 dark:bg-slate-900/50 rounded-[3rem] mx-6 my-16" />
});

const Branches = dynamic(() => import('@/components/Branches').then(mod => mod.Branches), {
  ssr: true,
  loading: () => <div className="h-screen animate-pulse bg-slate-900 rounded-[3rem] mx-6" />
});
import Link from 'next/link';
import {
  Stethoscope,
  Microscope,
  Brain,
  HeartPulse,
  ChevronRight,
  Activity,
  LayoutDashboard,
  ShieldCheck,
  Phone
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import Image from 'next/image';

import { Area, getProfessionals } from '@/data/professionals';

export default async function Home() {
  const professionals = await getProfessionals();
  const totalPros = professionals.length;

  return (
    <main className="relative min-h-screen bg-transparent dark:bg-transparent antialiased overflow-x-hidden transition-colors duration-300">
      {/* 1. HERO SECTION DINÁMICO */}
      <Hero
        badgeText={`150+ Prestaciones • ${totalPros}+ Profesionales`}
        description={
          <>
            En Policlínico Tabancura te acompañamos en cada etapa con especialistas de excelencia y el trato humano que tú y tu familia merecen.
          </>
        }
        statsNumber={`+${totalPros}`}
        statsLabel="Profesionales de salud"
        showBranches={true}
      />

      <section className="py-8 bg-transparent dark:bg-transparent">
        <div className="container mx-auto px-6">
          <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-[0.3em] text-center mb-4">
            ¿Conoces nuestras alianzas y previsiones?
          </p>
          <PartnerCarousel />
        </div>
      </section>
      {/* 3. SERVICIOS DESTACADOS (Modern Grid) */}
      <section id="servicios" className="pt-10 pb-24 relative bg-slate-100/40 dark:bg-transparent transition-colors">
        <div className="container mx-auto px-6 relative z-10 mb-0">
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
              <h2 className="text-3xl md:text-5xl font-bold text-primary dark:text-white mb-4">Cuidado integral para ti y tu familia</h2>
              <p className="text-base md:text-lg text-slate-500 dark:text-slate-400 font-medium tracking-wide">Reserva tu atención de forma rápida, fácil y sin salir de casa.</p>
            </div>

            <MinimalistScheduler />
          </div>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-12 py-8 border-b border-slate-200 dark:border-slate-800/80 pb-12">
            {/* Left: Title & Subtitle */}
            <div className="lg:col-span-12">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary text-white text-[10px] font-bold uppercase tracking-widest mb-6">
                <HeartPulse size={14} fill="currentColor" className="text-secondary shrink-0" /> Servicios Médicos
              </div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-primary dark:text-white tracking-tighter leading-[0.95] mb-6">
                Innovación en cada <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-teal-400 to-secondary dark:from-white dark:via-secondary dark:to-teal-400">especialidad.</span>
              </h2>
              <p className="text-lg sm:text-xl text-slate-500 dark:text-slate-400 font-medium max-w-xl leading-relaxed">
                Todo lo que tu salud necesita: 55+ especialistas y más de 150 servicios a tu disposición.
              </p>
            </div>
          </div>

          <ServiceCarousel />

          {/* Centered Contact Banner */}
          <div className="mt-16 mb-4 max-w-4xl mx-auto px-6">
            <div className="flex justify-center mb-8">
              <a className="inline-flex items-center gap-2 px-6 py-3 bg-[#111827] hover:bg-[#1f2937] text-white rounded-full text-[11px] font-black uppercase tracking-[0.2em] transition-all shadow-lg border border-white/5">
                <Phone size={14} className="text-emerald-400" />
                ¿Aún con dudas? ¡Llámanos!
              </a>
            </div>

            <div className="flex flex-col md:flex-row justify-center items-center gap-10 md:gap-20 text-center">
              <div>
                <p className="text-[10px] font-bold text-emerald-500 dark:text-emerald-400 uppercase tracking-[0.2em] mb-2">Casa Matriz - Los Tribunales</p>
                <a href="tel:+56222172635" className="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white hover:text-emerald-500 transition-colors inline-block pb-2 border-b-4 border-slate-200 dark:border-white/10 hover:border-emerald-500 whitespace-nowrap">
                  +56 2 2217 2635
                </a>
              </div>
              <div className="hidden md:block w-px h-16 bg-slate-300 dark:bg-white/10 -rotate-12" />
              <div>
                <p className="text-[10px] font-bold text-emerald-500 dark:text-emerald-400 uppercase tracking-[0.2em] mb-2">Sucursal Vitacura</p>
                <a href="tel:+56229336740" className="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white hover:text-emerald-500 transition-colors inline-block pb-2 border-b-4 border-slate-200 dark:border-white/10 hover:border-emerald-500 whitespace-nowrap">
                  +56 2 2933 6740
                </a>
              </div>
            </div>

            <div className="mt-10 text-center space-y-2">
              <p className="text-[9px] font-bold text-slate-500 dark:text-slate-500 uppercase tracking-[0.2em]">
                CASA MATRIZ: LUNES A VIERNES DE 09:00 A 13:00 Y 14:00 A 18:30 HRS
              </p>
              <p className="text-[9px] font-bold text-slate-500 dark:text-slate-500 uppercase tracking-[0.2em]">
                SUCURSAL VITACURA: LUNES A VIERNES DE 08:30 A 20:00 Y SÁBADOS DE 09:00 A 13:00 HRS
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. VALIDADOR MI VITA */}
      <section id="mivita" className="py-16 relative overflow-hidden bg-transparent dark:bg-transparent scroll-mt-24">


        <div className="container mx-auto px-6 relative z-10">
          <div className="bg-white dark:bg-slate-950 rounded-[2rem] sm:rounded-[2.5rem] md:rounded-[4rem] border border-slate-300 dark:border-slate-800 p-6 sm:p-8 md:p-20 shadow-[0_30px_60px_-15px_rgba(15,23,42,0.12),0_15px_30px_-10px_rgba(0,0,0,0.06)] dark:shadow-none transition-all">
            <div className="grid lg:grid-cols-2 gap-16 items-center">

              {/* Columna Izquierda: Contexto */}
              <div className="max-w-xl">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary text-white text-[11px] font-bold uppercase tracking-widest mb-8">
                  <ShieldCheck size={14} fill="currentColor" className="text-secondary shrink-0" /> ¡Atención vecinos de Vitacura!
                </div>

                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary dark:text-white mb-6 leading-tight tracking-tighter">
                  Beneficio exclusivo <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-teal-400 to-secondary dark:from-white dark:via-secondary dark:to-teal-400">Tarjeta Mi Vita.</span>
                </h2>
                <p className="text-lg text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-8">
                  Accede a valores preferenciales en tus atenciones médicas y dentales. Ingresa tu RUT a continuación y verifica tu estado de convenio vigente al instante.
                </p>

                <div className="mb-10 flex items-start gap-4 flex-wrap">
                  <div className="group shrink-0">
                    <Image
                      src="/logos_convenios_prevision/mivita_v2_light.png"
                      alt="Logo Tarjeta Mi Vita"
                      width={180}
                      height={72}
                      style={{ width: 'auto', height: 'auto' }}
                      className="block dark:hidden object-contain drop-shadow-md transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-1"
                    />
                    <Image
                      src="/logos_convenios_prevision/mivita_v2_dark.png"
                      alt="Logo Tarjeta Mi Vita"
                      width={180}
                      height={72}
                      style={{ width: 'auto', height: 'auto' }}
                      className="hidden dark:block object-contain drop-shadow-md transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-1"
                    />
                  </div>
                  <MiVitaLink />
                </div>
                <div className="grid grid-cols-2 gap-3 sm:gap-6">
                  <div className="group flex items-center gap-2 sm:gap-4 bg-slate-50 dark:bg-slate-900 p-3 sm:p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-all cursor-pointer">
                    <div className="w-12 h-12 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm flex items-center justify-center font-black text-secondary text-xl group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-300">25%</div>
                    <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider leading-tight">Sobre el<br />arancel general</span>
                  </div>
                  <div className="group flex items-center gap-2 sm:gap-4 bg-slate-50 dark:bg-slate-900 p-3 sm:p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-all cursor-pointer">
                    <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
                      <div className="absolute w-7 h-7 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg shadow-sm flex items-center justify-center text-secondary/40 -translate-x-2.5 -translate-y-1.5 -rotate-12 group-hover:-translate-y-5 group-hover:-rotate-[20deg] group-hover:scale-110 transition-all duration-300"><Microscope size={14} /></div>
                      <div className="absolute w-7 h-7 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg shadow-sm flex items-center justify-center text-secondary/40 translate-x-2.5 -translate-y-1.5 rotate-12 group-hover:-translate-y-5 group-hover:rotate-[20deg] group-hover:scale-110 transition-all duration-300"><Brain size={14} /></div>
                      <div className="absolute w-9 h-9 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl shadow-md flex items-center justify-center text-secondary z-10 translate-y-1 group-hover:-translate-y-1 group-hover:scale-105 transition-all duration-300"><Stethoscope size={18} /></div>
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
                      Valida tu Convenio en Línea <ShieldCheck size={12} className="text-secondary" />
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
                      loading="lazy"
                      sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                      referrerPolicy="no-referrer-when-downgrade"
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