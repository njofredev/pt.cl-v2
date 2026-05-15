"use client";

import React from 'react';
import Image from 'next/image';
import { 
  CheckCircle2, 
  Users, 
  Calendar, 
  FileText, 
  ArrowRight,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function AlianzasPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 font-sans selection:bg-secondary/30">
      
      {/* 1. NAVEGACIÓN SIMPLIFICADA (Aislada) */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-900">
        <div className="container mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Image 
              src="/logo.svg" 
              alt="Logo" 
              width={120} 
              height={40} 
              className="dark:brightness-0 dark:invert"
            />
          </div>
          <Button 
            className="bg-primary text-white rounded-full px-6 font-bold text-xs uppercase tracking-widest hidden sm:flex"
            onClick={() => document.getElementById('agendar')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Quiero Agendar
          </Button>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <section className="relative pt-20 overflow-hidden">
        <div className="absolute inset-0 bg-[#f8faff] dark:bg-slate-950 z-0" />
        
        {/* Curva decorativa */}
        <div className="absolute right-0 top-0 h-full w-[45%] bg-white dark:bg-slate-900 z-10 hidden lg:block rounded-l-[10rem] shadow-[-20px_0_60px_rgba(0,0,0,0.02)]" />
        
        <div className="container mx-auto px-6 relative z-20">
          <div className="flex flex-col lg:flex-row items-center min-h-[85vh] gap-16 py-12 lg:py-0">
            
            {/* Contenido Izquierda */}
            <div className="flex-1 max-w-2xl text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-[11px] font-black uppercase tracking-widest mb-8">
                <ShieldCheck size={14} className="animate-pulse" /> Beneficio Exclusivo Alianzas
              </div>
              
              <h1 className="text-5xl md:text-7xl font-black text-primary dark:text-white mb-8 tracking-tighter leading-[0.95]">
                Vuelve a sonreír <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-teal-500 to-secondary italic">
                  sin preocuparte
                </span> <br />
                por nada.
              </h1>
              
              <p className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-10">
                Con el programa de <span className="text-primary dark:text-white font-bold">Alianzas Policlínico Tabancura</span> tienes <span className="bg-secondary/10 text-secondary px-2 py-0.5 rounded-lg font-black">25% de descuento</span> sobre el arancel general en tu atención.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button 
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-white rounded-2xl h-16 px-10 text-base font-bold shadow-xl shadow-primary/20 transition-all hover:-translate-y-1 active:scale-95"
                  onClick={() => document.getElementById('agendar')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Agenda Ahora <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <div className="flex items-center justify-center gap-3 px-6 h-16 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 bg-slate-200" />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400">+5000 pacientes felices</span>
                </div>
              </div>
            </div>

            {/* Imagen Derecha */}
            <div className="flex-1 relative w-full h-[400px] lg:h-[600px] group">
              <div className="absolute inset-0 bg-gradient-to-tr from-secondary/20 to-primary/20 rounded-[4rem] blur-3xl opacity-30 group-hover:opacity-50 transition-opacity duration-700" />
              <div className="relative w-full h-full rounded-[4rem] overflow-hidden border-8 border-white dark:border-slate-800 shadow-2xl transform lg:rotate-3 group-hover:rotate-0 transition-transform duration-700">
                <Image 
                  src="/alianzas_hero_family.png" 
                  alt="Familia feliz" 
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. PASOS SECTION */}
      <section className="py-24 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-primary dark:text-white mb-4 tracking-tighter">
              Sigue los pasos para poder <br /> <span className="text-secondary">optar al beneficio</span>
            </h2>
            <div className="inline-flex items-center gap-2 text-slate-400 dark:text-slate-500 font-bold uppercase tracking-[0.3em] text-xs">
              <ChevronRight size={14} className="text-secondary" /> ¿Cómo funciona?
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
            {[
              { 
                step: "01",
                title: "Rellena el formulario de inscripción", 
                icon: <FileText className="text-white" size={28} />,
                color: "bg-blue-500"
              },
              { 
                step: "02",
                title: "Nuestro equipo te llamará a la brevedad", 
                icon: <Users className="text-white" size={28} />,
                color: "bg-blue-500"
              },
              { 
                step: "03",
                title: "Asiste a tu hora", 
                icon: <Calendar className="text-white" size={28} />,
                color: "bg-blue-500"
              }
            ].map((item, idx) => (
              <div key={idx} className="relative group p-10 bg-slate-50 dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-900 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 text-center flex flex-col items-center">
                <div className={`w-20 h-20 rounded-[2rem] ${item.color} flex items-center justify-center mb-8 shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform duration-500`}>
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 leading-tight px-4">
                  {item.title}
                </h3>
                <div className="absolute top-6 right-8 text-4xl font-black text-slate-100 dark:text-slate-800 transition-colors group-hover:text-blue-500/10">
                  {item.step}
                </div>
              </div>
            ))}
          </div>

          <div className="max-w-4xl mx-auto space-y-6 text-center">
            <div className="p-6 rounded-2xl bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/30">
               <p className="text-sm font-bold text-amber-700 dark:text-amber-400">
                Si solicitaste una hora sin rellenar el formulario, debes avisar en recepción que vienes por el convenio de alianzas y mencionar tu establecimiento.
              </p>
            </div>
            <p className="text-xs font-medium text-slate-400 dark:text-slate-500 italic">
               * Beneficio sujeto a validación de convenio vigente con la institución mencionada.
            </p>
          </div>
        </div>
      </section>

      {/* 4. FORMULARIO TALLY */}
      <section id="agendar" className="py-24 bg-slate-50 dark:bg-slate-900/50 relative overflow-hidden">
        {/* Background Decor */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-primary dark:text-white mb-6 tracking-tighter italic">
              Agenda una hora
            </h2>
            <p className="text-xl text-slate-500 dark:text-slate-400 font-medium">
              Antes de empezar, necesitamos saber un poco de ti
            </p>
          </div>

          <div className="bg-white dark:bg-slate-950 rounded-[3rem] p-4 sm:p-8 md:p-12 shadow-2xl shadow-black/5 border border-slate-100 dark:border-slate-800">
            <div className="tally-wrapper">
              <iframe
                src="https://tally.so/embed/nG8j1Z?hideTitle=1&amp;transparentBackground=1"
                loading="lazy"
                title="Alianzas"
                className="w-full min-h-[574px] md:min-h-[654px] border-0"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 5. FOOTER SIMPLIFICADO */}
      <footer className="py-12 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-900">
        <div className="container mx-auto px-6 text-center">
          <div className="flex justify-center gap-6 mb-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-900 flex items-center justify-center grayscale hover:grayscale-0 transition-all cursor-pointer border border-slate-100 dark:border-slate-800">
                 <div className="w-6 h-6 bg-slate-200 dark:bg-slate-800 rounded" />
              </div>
            ))}
          </div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            © 2026 Policlínico Tabancura - Todos los derechos reservados
          </p>
        </div>
      </footer>

    </main>
  );
}
