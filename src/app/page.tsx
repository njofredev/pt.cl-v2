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
  MapPin, 
  ChevronRight,
  Zap,
  Clock,
  Phone
} from 'lucide-react';
import { Button } from "@/components/ui/button";

// Data extraída del scrapeo
const sedesReal = [
  {
    nombre: "Sede Los Tribunales",
    direccion: "Calle Los Tribunales #1268, Vitacura",
    horario: "Lun-Vie: 09:00 - 13:00 | 14:00 - 18:30",
    imagen: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2070",
    badge: "CENTRO DENTAL"
  },
  {
    nombre: "Sede Vitacura",
    direccion: "Avenida Vitacura #8620, Vitacura",
    horario: "Lun-Vie: 08:30 - 20:00 | Sáb: 09:00 - 13:00",
    imagen: "https://images.unsplash.com/photo-1586773860418-d3b9a8ec81a2?q=80&w=2070",
    badge: "CENTRO MÉDICO"
  }
];

export default function Home() {
  return (
    <main className="relative min-h-screen bg-white">
      <Navbar />
      <Hero />

      {/* Servicios Reales Scrapeados */}
      <section id="servicios" className="py-24 bg-slate-50">
        <div className="container mx-auto px-6 text-center">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="inline-block px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-[11px] font-black uppercase tracking-widest mb-6"
          >
            Atención Especializada
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-16 tracking-tight">
            Nuestras <span className="text-blue-600">Áreas Médicas</span>
          </h2>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { title: "Salud Dental", desc: "Recupera estética y funcionalidad.", icon: <HeartPulse className="text-pink-500"/>, color: "hover:border-pink-200" },
              { title: "Salud Mental", desc: "Apoyo profesional para tu bienestar.", icon: <Brain className="text-purple-500"/>, color: "hover:border-purple-200" },
              { title: "Medicina General", desc: "Atención integral para toda la familia.", icon: <Stethoscope className="text-blue-500"/>, color: "hover:border-blue-200" },
              { title: "Toma de Muestras", desc: "Exámenes de sangre cercanos a tu hogar.", icon: <Microscope className="text-emerald-500"/>, color: "hover:border-emerald-200" }
            ].map((s, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className={`bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm transition-all ${s.color}`}
              >
                <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center mb-6">{s.icon}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{s.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sedes Reales con Info Scrapeada */}
      <section id="sedes" className="py-24">
        <div className="container mx-auto px-6">
          <div className="mb-12">
            <h2 className="text-3xl font-black text-slate-900">Ubicaciones y Horarios</h2>
            <div className="h-1.5 w-20 bg-blue-600 mt-4 rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {sedesReal.map((sede, i) => (
              <div key={i} className="group bg-white rounded-[3rem] overflow-hidden border border-slate-100 shadow-2xl transition-all hover:shadow-blue-100">
                <div className="relative h-64 overflow-hidden">
                  <img src={sede.imagen} alt={sede.nombre} className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-6 left-6 bg-white/90 backdrop-blur px-4 py-1 rounded-full text-[10px] font-black tracking-widest text-blue-600">{sede.badge}</div>
                </div>
                <div className="p-10">
                  <h3 className="text-2xl font-black text-slate-900 mb-6">{sede.nombre}</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4 text-slate-600">
                      <MapPin size={20} className="text-blue-600 shrink-0" />
                      <span className="text-sm font-medium">{sede.direccion}</span>
                    </div>
                    <div className="flex items-start gap-4 text-slate-600">
                      <Clock size={20} className="text-blue-600 shrink-0" />
                      <span className="text-sm font-medium">{sede.horario}</span>
                    </div>
                  </div>
                  <Button className="w-full mt-8 bg-slate-900 hover:bg-blue-600 rounded-2xl h-14 font-bold transition-colors">
                    Cómo llegar
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA con Datos de Contacto Reales */}
      <section className="py-20 px-6">
        <div className="container mx-auto bg-blue-600 rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl">
          <h2 className="text-3xl md:text-5xl font-black mb-8">¿Dudas con tu atención?</h2>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="flex items-center gap-3">
              <Phone size={24} className="text-blue-200" />
              <div className="text-left">
                <p className="text-[10px] font-bold text-blue-200 uppercase tracking-widest">Vitacura</p>
                <p className="font-bold">+56 2 2933 6740</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone size={24} className="text-blue-200" />
              <div className="text-left">
                <p className="text-[10px] font-bold text-blue-200 uppercase tracking-widest">Los Tribunales</p>
                <p className="font-bold">+56 2 2217 2635</p>
              </div>
            </div>
          </div>
          <Button className="mt-12 bg-white text-blue-600 hover:bg-slate-100 rounded-full px-10 h-14 font-black shadow-xl">
            AGENDA POR WHATSAPP
          </Button>
          <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        </div>
      </section>

      <footer className="py-12 text-center text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em]">
        © {new Date().getFullYear()} POLICLÍNICO TABANCURA • Corporación sin fines de lucro
      </footer>
    </main>
  );
}