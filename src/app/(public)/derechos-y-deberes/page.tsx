"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Info, ShieldCheck, Users, BookOpen, Scale } from 'lucide-react';

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
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300 pt-32 sm:pt-48">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-slate-50/50 dark:bg-slate-900/30 border-b border-slate-100 dark:border-slate-800 pb-16 md:pb-24">
        {/* Decor Orbs */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-[100px] -z-10" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-emerald-500/5 dark:bg-emerald-500/10 rounded-full blur-[120px] -z-10" />
        
        <div className="container mx-auto px-6 text-center max-w-4xl relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 dark:bg-white/5 border border-primary/10 dark:border-white/10 text-primary dark:text-secondary text-xs font-bold uppercase tracking-widest mb-6"
          >
            <Scale size={14} />
            Cartilla de Atención
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black tracking-tighter text-primary dark:text-white mb-6 leading-[1.1]"
          >
            Derechos y Deberes <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-emerald-500">del paciente.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-slate-500 dark:text-slate-400 font-medium"
          >
            En Policlínico Tabancura nos comprometemos con una atención de excelencia y respeto mutuo, regidos por la Ley de Derechos y Deberes de los Pacientes.
          </motion.p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Column Left: Derechos */}
          <div className="lg:col-span-7 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] p-8 md:p-12 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-4 mb-10">
                <div className="w-14 h-14 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary shrink-0">
                  <ShieldCheck size={28} strokeWidth={1.5} />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-primary dark:text-white">Derechos del Paciente</h2>
                  <p className="text-slate-400 dark:text-slate-500 font-medium text-sm mt-1">Por la atención que mereces.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                {DERECHOS.map((item, idx) => (
                  <motion.div 
                    key={idx} 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    className="flex gap-4 p-4 rounded-2xl bg-slate-50/50 dark:bg-slate-900/30 border border-transparent hover:border-secondary/20 hover:bg-white dark:hover:bg-slate-800/50 transition-all group"
                  >
                    <CheckCircle2 size={20} className="text-secondary shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                    <span className="text-slate-600 dark:text-slate-300 font-medium text-[15px] leading-relaxed">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Column Right: Deberes & Callout */}
          <div className="lg:col-span-5 space-y-10">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] p-8 md:p-10 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500 shrink-0">
                  <BookOpen size={28} strokeWidth={1.5} />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-primary dark:text-white">Deberes del Paciente</h2>
                  <p className="text-slate-400 dark:text-slate-500 font-medium text-sm mt-1">Para colaborar con tu salud.</p>
                </div>
              </div>

              <div className="space-y-3">
                {DEBERES.map((item, idx) => (
                  <motion.div 
                    key={idx} 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    className="flex gap-4 p-4 rounded-2xl bg-slate-50/50 dark:bg-slate-900/30 border border-transparent hover:border-blue-500/20 hover:bg-white dark:hover:bg-slate-800/50 transition-all group"
                  >
                    <div className="w-5 h-5 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-blue-500/20 transition-colors">
                       <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    </div>
                    <span className="text-slate-600 dark:text-slate-300 font-medium text-[15px] leading-relaxed">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Special Quote Box */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative p-8 rounded-[2.5rem] bg-gradient-to-br from-primary to-slate-900 text-white overflow-hidden shadow-xl shadow-primary/20"
            >
              <div className="absolute -right-10 -bottom-10 opacity-10">
                <Users size={200} />
              </div>
              <Info size={32} className="text-secondary mb-4 opacity-80" />
              <p className="italic font-medium text-slate-200 leading-relaxed relative z-10 text-base">
                "Con el proceso de envejecimiento de la población y el aumento de la prevalencia de enfermedades crónicas, se hace cada vez más importante el autocuidado como estrategia permanente en los modelos de atención de salud."
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
