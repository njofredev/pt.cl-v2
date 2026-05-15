"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Microscope, Zap, CheckCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Link from 'next/link';

export default function LaboratorioPage() {
  return (
    <main className="relative min-h-screen pt-48 pb-24 flex items-center justify-center overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center bg-white dark:bg-slate-900/60 backdrop-blur-xl border border-slate-100 dark:border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl">
            <div>
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 text-[9px] font-bold uppercase tracking-widest mb-6"
              >
                <Microscope size={12} />
                Novedades 2026
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight"
              >
                Laboratorio <br/> <span className="text-rose-600 dark:text-rose-400">Digital Dental</span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8"
              >
                Especializados en <strong>Rehabilitación Oral</strong> de alta precisión. Mediante tecnología <strong>chairside</strong>, utilizamos <strong>Primescan</strong> para escaneos 3D, procesados vía <strong>inLab CAD/CAM</strong> y fresados con <strong>CEREC MCX</strong> para entregarte tu pieza dental definitiva en tiempo récord.
              </motion.p>

              <motion.ul 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="space-y-3 mb-8"
              >
                {[
                  'Rehabilitación Oral en una sesión',
                  'Escaneo Intraoral Primescan',
                  'Diseño inLab CAD/CAM',
                  'Fresado CEREC MCX de Dentsply Sirona'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-medium text-slate-700 dark:text-slate-300">
                    <CheckCircle size={16} className="text-rose-500 shrink-0" />
                    {item}
                  </li>
                ))}
              </motion.ul>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Link href="/servicios/dental?especialidad=Rehabilitación Oral#equipo">
                  <Button className="bg-rose-600 hover:bg-rose-700 text-white rounded-full px-8 shadow-lg shadow-rose-600/20">
                    Agendar Consulta de Especialidad
                  </Button>
                </Link>
              </motion.div>
            </div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative aspect-square bg-slate-50 dark:bg-slate-800/50 rounded-3xl overflow-hidden flex items-center justify-center group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-rose-500/20 to-transparent opacity-50"></div>
              <Microscope size={80} className="text-rose-500 opacity-20 group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 flex items-center justify-center">
                 <span className="text-xs font-bold uppercase tracking-[0.3em] text-rose-600/50 dark:text-rose-400/50 bg-white dark:bg-slate-900 px-4 py-2 rounded-full shadow-xl border border-rose-500/20">Próximamente</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}
