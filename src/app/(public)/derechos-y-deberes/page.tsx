"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Info, ShieldCheck, Users, BookOpen, Scale, SmilePlus, Brain, Stethoscope, Leaf, ChevronLeft, ChevronRight, FileText } from 'lucide-react';
import Link from 'next/link';
import { OtherServices } from '@/components/OtherServices';

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
  "Consultar o reclamar respecto de la atención de salud recibida.",
  "Ser incluido en estudios de investigación científica solo si lo autoriza.",
  "Donde sea pertinente, se cuente con señalética y facilitadores en lengua originaria.",
  "Que el personal de salud porte una identificación.",
  "Inscribir el nacimiento de su hijo en el lugar de residencia.",
  "Que su médico le entregue un informe de la atención recibida durante su hospitalización.",
  "Toda persona mayor de 60 años y/o con discapacidad, tendrá derecho a Atención Preferente."
];

const DEBERES = [
  "Entregar información veraz acerca de su enfermedad, identidad y dirección.",
  "Conocer y cumplir el reglamento interno y resguardar su información médica.",
  "Cuidar las instalaciones y el equipamiento médico.",
  "Informarse acerca de los horarios de atención y formas de pago.",
  "Tratar respetuosamente al personal de salud.",
  "Informarse acerca de los procedimientos de reclamo.",
  "Dar prioridad a personas con derecho a Atención Preferente."
];

export default function DerechosDeberesPage() {
  return (
    <main className="min-h-screen bg-clinical-bg dark:bg-slate-950 transition-colors duration-500 overflow-x-hidden">

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
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#259CF4] text-white text-[10px] font-bold uppercase tracking-widest mb-8">
                <Scale size={14} strokeWidth={2.5} className="text-white" />
                Cartilla de Atención
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary dark:text-slate-50 tracking-tighter leading-[1.1] mb-8">
                Derechos y Deberes <br />
                <span className="text-[#259CF4] dark:text-[#259CF4]">
                  del paciente.
                </span>
              </h1>
              <p className="text-xl text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed mb-8">
                En Policlínico Tabancura nos comprometemos con una atención de excelencia y respeto mutuo, regidos por la Ley de Derechos y Deberes de los Pacientes.
              </p>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="inline-flex flex-wrap items-center justify-center gap-4 p-2.5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 shadow-md"
              >
                <span className="text-sm font-semibold text-slate-600 dark:text-slate-300 px-3">
                  Documento Oficial Ley Nº 20.584
                </span>
                <a
                  href="/doc/derechos-y-deberes.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#162158] hover:bg-[#259CF4] text-white font-bold px-6 py-2.5 rounded-2xl transition-all shadow-sm active:scale-95 text-sm"
                >
                  <FileText size={16} />
                  Ver PDF Oficial
                </a>
              </motion.div>
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

        {/* Section: DEBERES (Ancho total, lista distribuida) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-slate-900/50 border border-slate-100 dark:border-white/5 rounded-[3rem] p-8 md:p-12 shadow-xl shadow-slate-200/20 dark:shadow-none group transition-all hover:shadow-2xl duration-500"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-12 pb-8 border-b border-slate-100 dark:border-white/5">
            <div className="w-16 h-16 bg-primary/10 rounded-[1.25rem] flex items-center justify-center text-primary dark:text-white shrink-0 border border-primary/10 group-hover:scale-105 transition-transform">
              <BookOpen size={32} strokeWidth={1.5} />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">Deberes del Paciente</h2>
              <p className="text-slate-400 dark:text-slate-500 font-semibold text-sm uppercase tracking-widest mt-1">Para colaborar con tu salud y bienestar</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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

        {/* Section: Atención Preferente (Compact) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-slate-900/50 border border-slate-100 dark:border-white/5 rounded-[3rem] p-8 md:p-10 shadow-xl shadow-slate-200/20 dark:shadow-none transition-all hover:shadow-2xl duration-500"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8 pb-6 border-b border-slate-100 dark:border-white/5">
            <div className="w-14 h-14 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary shrink-0 border border-secondary/20">
              <Users size={28} strokeWidth={1.5} />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight">Atención Preferente</h2>
              <p className="text-slate-400 dark:text-slate-500 font-semibold text-xs uppercase tracking-widest mt-1">Derecho exclusivo para personas mayores de 60 años y personas con discapacidad</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 text-sm">
            <div className="bg-slate-50/50 dark:bg-white/5 p-6 rounded-2xl border border-transparent hover:border-secondary/20 hover:bg-white dark:hover:bg-slate-800/50 hover:shadow-md transition-all">
              <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-2 text-base">
                <span className="w-2.5 h-2.5 rounded-full bg-[#259CF4]" />
                Mayores de 60 años
              </h3>
              <p className="text-slate-500 dark:text-slate-400 mb-3 font-semibold">Se debe presentar uno de los siguientes documentos:</p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-600 dark:text-slate-300 font-medium">
                <li>Cédula de Identidad.</li>
                <li>Pasaporte.</li>
                <li>Otro documento oficial que acredite identidad y edad.</li>
              </ul>
            </div>

            <div className="bg-slate-50/50 dark:bg-white/5 p-6 rounded-2xl border border-transparent hover:border-secondary/20 hover:bg-white dark:hover:bg-slate-800/50 hover:shadow-md transition-all">
              <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-2 text-base">
                <span className="w-2.5 h-2.5 rounded-full bg-secondary" />
                Personas con discapacidad
              </h3>
              <p className="text-slate-500 dark:text-slate-400 mb-3 font-semibold">Se debe presentar uno de los siguientes documentos:</p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-600 dark:text-slate-300 font-medium">
                <li>Credencial o certificado vigente emitido por el Registro Civil.</li>
                <li>Comprobante de calificación y certificación COMPIN (vigencia máx. 60 días).</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100 dark:border-white/5 bg-slate-50/30 dark:bg-black/10 rounded-2xl p-4 text-center">
            <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold leading-relaxed">
              La Atención Preferente implica un acceso diferenciado a prestaciones que incluyen consultas de salud, prescripción y dispensación de medicamentos y toma de exámenes y procedimientos médicos.
            </p>
          </div>
        </motion.div>

      </div>

      {/* EXPLORA NUESTROS SERVICIOS */}
      <OtherServices />
    </main>
  );
}
