"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Info, ShieldCheck, Users, BookOpen, Scale, SmilePlus, Brain, Stethoscope, Leaf, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const DERECHOS = [
  "Tener información oportuna y comprensible de su estado de salud.",
  "Recibir un trato digno, respetando su privacidad.",
  "Ser llamado por su nombre y ser atendido con amabilidad.",
  "Recibir una atención de salud de calidad y segura, según protocolos establecidos.",
  "Ser informado de los costos de su atención de salud.",
  "No ser grabado ni fotografiado con fines de difusión sin su consentimiento.",
  "Que su información médica no se entregue a personas no relacionadas con su atención.",
  "Aceptar o rechazar cualquier tratamiento y pedir el alta voluntaria.",
  "Recibir visitas, compañía y asistencia espiritual.",
  "Ser incluido en estudios de investigación científica solo si lo autoriza.",
  "Donde sea pertinente, se cuente con señalética y facilitadores en lengua originaria.",
  "Que el personal de salud porte una identificación.",
  "Inscribir el nacimiento de su hijo en el lugar de residencia.",
  "Que su médico le entregue un informe de la atención recibida durante su hospitalización."
];

const DEBERES = [
  "Entregar información veraz acerca de su enfermedad, identidad y dirección.",
  "Conocer y cumplir el reglamento interno y resguardar su información médica.",
  "Cuidar las instalaciones y el equipamiento médico.",
  "Informarse acerca de los horarios de atención y formas de pago.",
  "Tratar respetuosamente al personal de salud.",
  "Informarse acerca de los procedimientos de reclamo."
];

export default function DerechosDeberesPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-500 overflow-x-hidden">
      
      {/* HERO SECTION MODERNO - Estilo Nosotros */}
      <section className="relative pt-56 pb-20 overflow-hidden">
        {/* Background accents */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2"></div>
          <div className="absolute top-40 right-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[100px]"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary text-white text-[10px] font-black uppercase tracking-widest mb-8 shadow-md shadow-primary/10">
                <Scale size={14} strokeWidth={2.5} className="text-secondary" />
                Cartilla de Atención
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.1] mb-8">
                Derechos y Deberes <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-teal-500 to-secondary">
                  del paciente.
                </span>
              </h1>
              <p className="text-xl text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed">
                En Policlínico Tabancura nos comprometemos con una atención de excelencia y respeto mutuo, regidos por la Ley de Derechos y Deberes de los Pacientes.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content Stacked */}
      <div className="container mx-auto px-6 pb-24 space-y-12 relative z-10">
        
        {/* Section: DERECHOS (Ancho total, lista distribuida) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-slate-900/50 border border-slate-100 dark:border-white/5 rounded-[3rem] p-8 md:p-12 shadow-xl shadow-slate-200/20 dark:shadow-none group transition-all hover:shadow-2xl duration-500"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-12 pb-8 border-b border-slate-100 dark:border-white/5">
            <div className="w-16 h-16 bg-secondary/10 rounded-[1.25rem] flex items-center justify-center text-secondary shrink-0 border border-secondary/20 group-hover:scale-105 transition-transform">
              <ShieldCheck size={32} strokeWidth={1.5} />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">Derechos del Paciente</h2>
              <p className="text-slate-400 dark:text-slate-500 font-semibold text-sm uppercase tracking-widest mt-1">Por la atención de calidad que mereces</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {DERECHOS.map((item, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.03 }}
                className="flex gap-4 p-5 rounded-2xl bg-slate-50/50 dark:bg-white/5 border border-transparent hover:border-secondary/20 hover:bg-white dark:hover:bg-slate-800/50 hover:shadow-md transition-all h-full group/item"
              >
                <CheckCircle2 size={18} className="text-secondary shrink-0 mt-1 group-hover/item:scale-110 transition-transform" />
                <span className="text-slate-600 dark:text-slate-300 font-medium text-[14px] leading-relaxed">{item}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Section: DEBERES */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-8 bg-white dark:bg-slate-900/50 border border-slate-100 dark:border-white/5 rounded-[3rem] p-8 md:p-12 shadow-xl shadow-slate-200/20 dark:shadow-none group transition-all hover:shadow-2xl duration-500"
          >
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-10">
              <div className="w-16 h-16 bg-primary/10 rounded-[1.25rem] flex items-center justify-center text-primary dark:text-white shrink-0 border border-primary/10">
                <BookOpen size={32} strokeWidth={1.5} />
              </div>
              <div>
                <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Deberes del Paciente</h2>
                <p className="text-slate-400 dark:text-slate-500 font-semibold text-sm uppercase tracking-widest mt-1">Para colaborar con tu salud y bienestar</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {DEBERES.map((item, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex gap-4 p-5 rounded-2xl bg-slate-50/50 dark:bg-white/5 border border-transparent hover:border-primary/20 hover:bg-white dark:hover:bg-slate-800/50 hover:shadow-md transition-all group/item"
                >
                  <div className="w-6 h-6 rounded-full bg-primary/10 dark:bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary dark:bg-secondary" />
                  </div>
                  <span className="text-slate-600 dark:text-slate-300 font-medium text-[14px] leading-relaxed">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Quote Box: Se usa para equilibrar la fila con los Deberes */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-4 relative p-10 rounded-[3rem] bg-gradient-to-br from-primary via-slate-900 to-[#0d1630] text-white overflow-hidden shadow-2xl shadow-primary/20 flex flex-col justify-center"
          >
            <div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none">
              <Users size={220} />
            </div>
            <div className="relative z-10">
              <Info size={40} className="text-secondary mb-6 opacity-90 drop-shadow-md" />
              <p className="text-lg italic font-medium text-slate-200 leading-relaxed mb-2">
                &quot;Con el proceso de envejecimiento de la población y el aumento de la prevalencia de enfermedades crónicas, se hace cada vez más importante el autocuidado como estrategia permanente.&quot;
              </p>
              <div className="w-12 h-1 bg-secondary/40 rounded-full mt-4"></div>
            </div>
          </motion.div>

        </div>

      </div>

      {/* EXPLORA NUESTROS SERVICIOS */}
      <section className="py-20 bg-slate-50/30 dark:bg-slate-900/20 border-t border-slate-100 dark:border-white/5">
        <div className="container mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary text-white text-[10px] font-black uppercase tracking-widest mb-6 shadow-md shadow-primary/10">
            <Stethoscope size={14} strokeWidth={2.5} className="text-secondary shrink-0" /> Nuestra Oferta Médica
          </div>
          <div className="flex items-center justify-center gap-4 md:gap-8 max-w-5xl mx-auto mb-10">
            <Link href="/nosotros" className="hidden md:flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 hover:text-secondary transition-colors shrink-0">
              <ChevronLeft size={14} /> Quiénes Somos
            </Link>

            <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              Explora Todos Nuestros Servicios
            </h2>

            <Link href="/#sucursales" className="hidden md:flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 hover:text-secondary transition-colors shrink-0">
              Sucursales <ChevronRight size={14} />
            </Link>
          </div>

          {/* Mobile alternative links simple */}
          <div className="flex md:hidden items-center justify-between w-full px-4 mb-8 text-[10px] font-bold uppercase tracking-wider">
            <Link href="/nosotros" className="flex items-center gap-1 text-slate-400 dark:text-slate-500">
              <ChevronLeft size={12} /> Quiénes Somos
            </Link>
            <Link href="/#sucursales" className="flex items-center gap-1 text-slate-400 dark:text-slate-500">
              Sucursales <ChevronRight size={12} />
            </Link>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 max-w-5xl mx-auto">
            {[
              { slug: 'dental', name: 'Salud Dental', icon: <SmilePlus size={20} />, color: 'text-cyan-500 bg-cyan-500/10' },
              { slug: 'mental', name: 'Salud Mental', icon: <Brain size={20} />, color: 'text-purple-500 bg-purple-500/10' },
              { slug: 'medicina', name: 'Medicina General', icon: <Stethoscope size={20} />, color: 'text-blue-500 bg-blue-500/10' },
              { slug: 'terapias', name: 'Terapias Complementarias', icon: <Leaf size={20} />, color: 'text-emerald-500 bg-emerald-500/10' },
            ].map((item) => (
              <Link 
                key={item.slug} 
                href={`/servicios/${item.slug}`}
                className="group flex items-center gap-3 px-5 py-3 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-100 dark:border-white/10 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${item.color} group-hover:scale-110 transition-transform duration-300`}>
                  {item.icon}
                </div>
                <div className="text-left pr-2">
                  <span className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider leading-none mb-0.5">Área Especializada</span>
                  <span className="block text-sm md:text-base font-bold text-slate-800 dark:text-slate-200 leading-tight">
                    {item.name}
                  </span>
                </div>
                <ChevronRight size={16} className="text-slate-300 dark:text-slate-600 group-hover:text-primary dark:group-hover:text-secondary group-hover:translate-x-0.5 transition-all ml-1" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
