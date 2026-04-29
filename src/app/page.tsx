"use client";

import React from 'react';
import { Hero } from '@/components/Hero';
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

      {/* 2. BARRA DE CONVENIOS (Identidad Chilena - Premium) */}
      <section className="py-16 border-y border-slate-50 bg-white/50 backdrop-blur-md">
        <div className="container mx-auto px-6">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.4em] text-center mb-12">
            Atención con Previsión y Convenios Directos
          </p>
          <div className="flex flex-wrap justify-center items-center gap-10 md:gap-24 opacity-40 grayscale hover:grayscale-0 transition-all duration-1000">
            <img src="https://upload.wikimedia.org/wikipedia/commons/e/e0/Logo_Fonasa.svg" className="h-10" alt="Fonasa" />
            <img src="https://logodownload.org/wp-content/uploads/2019/08/isapre-banmedica-logo.png" className="h-7" alt="Banmédica" />
            <img src="https://www.colmena.cl/wp-content/uploads/2021/03/logo-colmena.png" className="h-10" alt="Colmena" />
            <img src="https://www.consalud.cl/wp-content/uploads/2022/07/logo-consalud-web.png" className="h-7" alt="Consalud" />
            <img src="https://www.isaprecruzblanca.cl/static/images/logo-cruz-blanca.svg" className="h-7" alt="Cruz Blanca" />
          </div>
        </div>
      </section>

      {/* 3. SERVICIOS DESTACADOS (Modern Grid) */}
      <section id="servicios" className="py-32 relative">
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-[10px] font-bold uppercase tracking-widest mb-6">
                <HeartPulse size={14} /> Servicios Médicos
              </div>
              <h2 className="text-4xl md:text-6xl font-bold text-primary tracking-tighter leading-[0.9] mb-6">
                Innovación en cada <br /> <span className="text-secondary">especialidad.</span>
              </h2>
              <p className="text-xl text-slate-500 font-medium max-w-lg">Equipos de vanguardia y especialistas de primer nivel en un solo lugar.</p>
            </div>
            <Button variant="outline" className="rounded-full border-slate-200 px-8 h-12 font-bold hover:bg-secondary/10 transition-all hover:scale-105">
              Explorar todo el catálogo <ChevronRight size={18} />
            </Button>
          </div>

          <div className="relative w-full overflow-hidden pt-8 pb-12 -mx-6 px-6">
            {/* Gradientes laterales para suavizar el slider */}
            <div className="absolute top-0 left-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-20 pointer-events-none" />
            <div className="absolute top-0 right-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-20 pointer-events-none" />

            <div className="flex gap-8 w-max animate-marquee hover:[animation-play-state:paused]">
              {[...Array(2)].map((_, loopIndex) => (
                <React.Fragment key={loopIndex}>
                  {[
                    { title: "Salud Dental", desc: "Odontología avanzada con tecnología digital de última generación.", icon: "/ico_dental.png", link: "/servicios/dental" },
                    { title: "Salud Mental", desc: "Acompañamiento psicológico y psiquiátrico con enfoque humano.", icon: "/ico_mental.png", link: "/servicios/mental" },
                    { title: "Toma de Muestras", desc: "Laboratorio clínico con resultados rápidos y precisos en 24h.", icon: "/ico_lab.png", link: "/servicios/medicina" },
                    { title: "Medicina General", desc: "Atención integral para el cuidado primario de toda tu familia.", icon: "/ico_med_general.png", link: "/servicios/medicina" },
                    { title: "Terapias Alternativas", desc: "Enfoque holístico para tu salud con profesionales certificados.", icon: "/ico_terapias_alternativas.png", link: "/servicios/terapias" }
                  ].map((s, i) => (
                    <div
                      key={`${loopIndex}-${i}`}
                      className="w-[350px] shrink-0 group p-10 rounded-[3rem] bg-white border-2 border-slate-50 shadow-[0_10px_40px_rgba(0,0,0,0.02)] hover:border-secondary/40 hover:shadow-[0_30px_70px_rgba(25,228,162,0.15)] hover:-translate-y-4 transition-all duration-500 cursor-pointer relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-full -mr-16 -mt-16 group-hover:bg-secondary/10 group-hover:scale-[2.5] transition-all duration-700" />
                      <div className="relative z-10 w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-white group-hover:shadow-xl group-hover:scale-110 transition-all duration-500">
                        {typeof s.icon === 'string' ? (
                          <img src={s.icon} alt={`Icono ${s.title}`} className="w-12 h-12 object-contain drop-shadow-sm group-hover:drop-shadow-md transition-all" />
                        ) : (
                          React.cloneElement(s.icon as any, { size: 28 })
                        )}
                      </div>
                      <h3 className="relative z-10 text-2xl font-bold text-primary mb-4 group-hover:text-secondary transition-colors">{s.title}</h3>
                      <p className="relative z-10 text-slate-500 font-medium leading-relaxed mb-8">{s.desc}</p>
                      <Link href={s.link} className="relative z-10 inline-flex items-center gap-2 text-[11px] font-bold text-primary uppercase tracking-widest group-hover:gap-4 transition-all">
                        Ver detalles <ChevronRight size={14} className="text-secondary" />
                      </Link>
                    </div>
                  ))}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* 4. VALIDADOR MI VITA */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        {/* Elementos decorativos de fondo */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-secondary/5 rounded-full blur-3xl -mt-96 -mr-96 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -mb-64 -ml-64 pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="bg-white rounded-[4rem] border border-slate-100 p-12 md:p-20 shadow-[0_20px_80px_rgba(0,0,0,0.04)]">
            <div className="grid lg:grid-cols-2 gap-16 items-center">

              {/* Columna Izquierda: Contexto */}
              <div className="max-w-xl">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-[11px] font-bold uppercase tracking-widest mb-8">
                  <ShieldCheck size={14} /> ¡Atención vecinos de Vitacura!
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6 leading-tight tracking-tighter">
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
                <div className="relative bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-slate-100 h-[520px] w-full flex flex-col">
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

      {/* 5. DASHBOARD DE PACIENTE (Bento Style) */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="bg-primary rounded-[4rem] p-12 md:p-24 text-white relative overflow-hidden shadow-2xl shadow-primary/20">
            <div className="grid lg:grid-cols-2 gap-20 items-center relative z-10">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-secondary text-[11px] font-bold uppercase tracking-widest mb-8 border border-white/5">
                  <LayoutDashboard size={14} /> Sistema Cerebro v2
                </div>
                <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-[0.9] tracking-tighter">
                  Tus resultados, <br /> <span className="text-secondary">al instante.</span>
                </h2>
                <p className="text-slate-300 text-xl mb-12 leading-relaxed font-medium max-w-xl">
                  Hemos desarrollado una plataforma digital única para que accedas a tus exámenes, recetas médicas y presupuestos sin filas ni esperas.
                </p>
                <div className="flex flex-col sm:flex-row gap-6">
                  <Button className="bg-secondary hover:bg-secondary/90 text-primary rounded-2xl px-10 h-16 font-bold shadow-lg shadow-secondary/20 transition-all hover:scale-105 active:scale-95">
                    Acceso Pacientes
                  </Button>
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 rounded-2xl px-10 h-16 font-bold transition-all">
                    ¿Cómo funciona?
                  </Button>
                </div>
              </div>
              <div className="relative group">
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className="rounded-[2.5rem] border-[12px] border-white/5 shadow-2xl overflow-hidden relative"
                >
                  <img src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1200" className="w-full aspect-[4/3] object-cover grayscale hover:grayscale-0 transition-all duration-1000" alt="Dashboard preview" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
                </motion.div>

                {/* Floating elements for "Cerebro" system feel */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -top-10 -right-10 bg-white/10 backdrop-blur-xl p-6 rounded-3xl border border-white/10 shadow-2xl"
                >
                  <Activity className="text-secondary" size={32} />
                </motion.div>

                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 5, repeat: Infinity }}
                  className="absolute -bottom-10 -left-10 bg-secondary p-6 rounded-3xl shadow-2xl"
                >
                  <HeartPulse className="text-primary" size={32} />
                </motion.div>
              </div>
            </div>
            {/* Background Orbs */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[150px]" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[120px]" />
          </div>
        </div>
      </section>

      <section className="py-32 bg-slate-50/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-primary tracking-tighter mb-6">Excelencia en cada atención</h2>
            <p className="text-slate-500 font-medium max-w-2xl mx-auto">Nuestro compromiso es brindarte una experiencia médica superior, combinando calidez humana con la mejor tecnología.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { title: "Tecnología Médica", desc: "Contamos con equipos de última generación para diagnósticos precisos.", icon: <Activity className="text-secondary" /> },
              { title: "Convenios Amplios", desc: "Trabajamos con las principales Isapres y Fonasa para tu tranquilidad.", icon: <ShieldCheck className="text-secondary" /> },
              { title: "Agendamiento Digital", desc: "Reserva tu hora en segundos desde cualquier dispositivo.", icon: <LayoutDashboard className="text-secondary" /> }
            ].map((item, i) => (
              <div key={i} className="text-center group">
                <div className="w-20 h-20 bg-white rounded-3xl shadow-sm border border-slate-100 flex items-center justify-center mx-auto mb-8 group-hover:scale-110 group-hover:shadow-md transition-all duration-500">
                  {React.cloneElement(item.icon as any, { size: 36 })}
                </div>
                <h4 className="text-xl font-bold text-primary mb-4">{item.title}</h4>
                <p className="text-slate-500 font-medium leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}