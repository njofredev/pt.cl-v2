"use client";

import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { motion } from 'framer-motion';
import { 
  Stethoscope, 
  Microscope, 
  Brain, 
  HeartPulse, 
  ChevronRight,
  Zap,
  Activity,
  ShieldCheck,
  LayoutDashboard
} from 'lucide-react';
import { Button } from "@/components/ui/button";

// Variantes de animación ultra-rápidas para evitar lag
const fadeInUp = {
  initial: { opacity: 0, y: 15 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-10px" },
  transition: { duration: 0.4, ease: "easeOut" }
};

export default function Home() {
  return (
    <main className="relative min-h-screen bg-white antialiased overflow-x-hidden">
      <Navbar />

      {/* 1. HERO SECTION DINÁMICO */}
      <Hero />

      {/* 2. BARRA DE CONVENIOS (Identidad Chilena) */}
      <section className="py-12 border-y border-slate-50 bg-white">
        <div className="container mx-auto px-6">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] text-center mb-8">
            Atención con Previsión y Convenios Directos
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
            <img src="https://upload.wikimedia.org/wikipedia/commons/e/e0/Logo_Fonasa.svg" className="h-8 md:h-10" alt="Fonasa" />
            <img src="https://logodownload.org/wp-content/uploads/2019/08/isapre-banmedica-logo.png" className="h-6 md:h-8" alt="Banmédica" />
            <img src="https://www.colmena.cl/wp-content/uploads/2021/03/logo-colmena.png" className="h-8 md:h-10" alt="Colmena" />
            <img src="https://www.consalud.cl/wp-content/uploads/2022/07/logo-consalud-web.png" className="h-6 md:h-8" alt="Consalud" />
            <img src="https://www.isaprecruzblanca.cl/static/images/logo-cruz-blanca.svg" className="h-6 md:h-8" alt="Cruz Blanca" />
          </div>
        </div>
      </section>

      {/* 3. SERVICIOS DESTACADOS (UX Intuitiva) */}
      <section id="servicios" className="py-24 relative overflow-hidden">
        {/* GIF de fondo sutil para dar textura tecnológica */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <img src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHJqZ3R4Z3R4Z3R4Z3R4Z3R4Z3R4Z3R4Z3R4Z3R4Z3R/3o7TKVUn7iM8FMEU24/giphy.gif" className="w-full h-full object-cover" alt="bg-animation" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-xl">
              <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter leading-none mb-4">
                Innovación en cada <br/> <span className="text-blue-600 italic">especialidad.</span>
              </h2>
              <p className="text-lg text-slate-500 font-medium">Equipos de vanguardia y especialistas de primer nivel en un solo lugar.</p>
            </div>
            <Button variant="outline" className="rounded-full border-slate-200 font-bold hover:bg-blue-50 transition-colors">
              Explorar todo el catálogo <ChevronRight size={18} />
            </Button>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { title: "Salud Dental", desc: "Estética y funcionalidad avanzada.", icon: <HeartPulse className="text-pink-500" />, bg: "hover:bg-pink-50/50" },
              { title: "Salud Mental", desc: "Psicología y Psiquiatría integral.", icon: <Brain className="text-purple-500" />, bg: "hover:bg-purple-50/50" },
              { title: "Toma de Muestras", desc: "Laboratorio digital en 24h.", icon: <Microscope className="text-emerald-500" />, bg: "hover:bg-emerald-50/50" },
              { title: "Medicina General", desc: "Atención primaria para la familia.", icon: <Stethoscope className="text-blue-500" />, bg: "hover:bg-blue-50/50" }
            ].map((s, i) => (
              <motion.div 
                key={i}
                {...fadeInUp}
                className={`group p-8 rounded-[2.5rem] bg-white border border-slate-100 shadow-sm transition-all duration-300 cursor-pointer ${s.bg}`}
              >
                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {s.icon}
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-2">{s.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. DASHBOARD DE PACIENTE (El valor agregado de Ingeniería) */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="bg-slate-950 rounded-[3.5rem] p-12 md:p-24 text-white relative overflow-hidden">
            <div className="grid md:grid-cols-2 gap-16 items-center relative z-10">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-widest mb-6">
                  <LayoutDashboard size={14} /> Sistema Cerebro v2
                </div>
                <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight tracking-tighter">
                  Tus resultados, <br/> <span className="text-blue-500">al instante.</span>
                </h2>
                <p className="text-slate-400 text-lg mb-10 leading-relaxed font-medium">
                  Hemos desarrollado una plataforma digital única para que accedas a tus exámenes, recetas médicas y presupuestos sin filas ni esperas.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-2xl px-8 h-14 font-black">
                    Acceso Pacientes
                  </Button>
                  <Button variant="outline" className="border-slate-700 text-white hover:bg-slate-900 rounded-2xl px-8 h-14 font-black">
                    ¿Cómo funciona?
                  </Button>
                </div>
              </div>
              <div className="relative">
                {/* Un GIF o Mockup que simule el Dashboard */}
                <div className="rounded-3xl border-8 border-slate-800 shadow-2xl overflow-hidden shadow-blue-500/10">
                  <img src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1000" className="w-full grayscale brightness-75" alt="Dashboard preview" />
                </div>
                <div className="absolute -top-6 -right-6 bg-blue-600 p-4 rounded-2xl animate-bounce shadow-xl">
                  <Activity className="text-white" size={24} />
                </div>
              </div>
            </div>
            {/* Efecto visual de fondo */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]" />
          </div>
        </div>
      </section>

      {/* 5. FOOTER CON IDENTIDAD */}
      <footer className="py-16 border-t border-slate-100 bg-white">
        <div className="container mx-auto px-6 text-center">
          <div className="flex justify-center gap-4 mb-8">
            <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 hover:text-blue-600 transition-colors cursor-pointer"><Activity size={16}/></div>
            <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 hover:text-blue-600 transition-colors cursor-pointer"><ShieldCheck size={16}/></div>
          </div>
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.4em]">
            © {new Date().getFullYear()} POLICLÍNICO TABANCURA • TECNOLOGÍA AL SERVICIO DE LA VIDA
          </p>
        </div>
      </footer>
    </main>
  );
}