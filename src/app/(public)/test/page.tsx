"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Code, Layout, ShieldAlert } from 'lucide-react';

export default function TestPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-32 pb-24 transition-colors duration-500 relative overflow-hidden">
      {/* Background soft ambient blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary dark:bg-slate-800 dark:text-white text-[10px] font-black uppercase tracking-widest mb-6 shadow-md"
          >
            <Sparkles size={14} className="text-secondary animate-spin-slow" />
            Entorno de Pruebas Seguro
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black text-primary dark:text-white tracking-tighter mb-6"
          >
            Component <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-teal-400 to-secondary dark:from-white dark:via-secondary dark:to-teal-400">
              Playground.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-500 dark:text-slate-400 font-medium max-w-xl mx-auto leading-relaxed"
          >
            Este es nuestro laboratorio aislado. Aquí podemos crear, maquetar y testear nuevos componentes de manera segura antes de implementarlos en las páginas de producción.
          </motion.p>
        </div>

        {/* Development Workspace */}
        <div className="max-w-5xl mx-auto grid lg:grid-cols-3 gap-8">
          {/* Main Showcase Panel (Col Span 2) */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-8 md:p-12 border border-slate-100 dark:border-slate-800 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[9px] font-black uppercase tracking-widest text-emerald-500">Playground Activo</span>
              </div>

              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary">
                  <Layout size={22} />
                </div>
                <div>
                  <h2 className="text-xl font-black text-primary dark:text-white">Lienzo de Pruebas</h2>
                  <p className="text-xs font-semibold text-slate-400">Renderizado en tiempo real</p>
                </div>
              </div>

              {/* TEST COMPONENT AREA: Put components here to test */}
              <div className="min-h-[300px] rounded-[2rem] border-2 border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center p-8 bg-slate-50/50 dark:bg-slate-950/30 transition-all duration-300">
                <Code className="text-slate-300 dark:text-slate-700 mb-4 animate-pulse" size={48} />
                <p className="text-sm font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest text-center">Área lista para recibir componentes</p>
                <p className="text-xs font-medium text-slate-400 dark:text-slate-600 text-center mt-2 max-w-sm">Escribe o monta tus nuevos componentes dentro de este contenedor en el código para verlos en acción.</p>
              </div>
            </div>
          </div>

          {/* Sidebar Panel */}
          <div className="space-y-8">
            {/* Component History & Status */}
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-100 dark:border-slate-800 shadow-xl">
              <h3 className="text-xs font-black uppercase tracking-widest text-primary dark:text-white mb-6 flex items-center gap-2">
                <Code size={16} className="text-secondary" />
                Historial de Testeo
              </h3>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-800 flex items-start gap-4">
                  <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0 mt-1.5" />
                  <div>
                    <p className="text-xs font-bold text-primary dark:text-white">Ningún componente activo</p>
                    <p className="text-[10px] text-slate-400 font-semibold mt-1">Listo para iniciar el siguiente desarrollo.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Safety Alert Disclaimer */}
            <div className="bg-slate-900 text-white rounded-[2.5rem] p-8 relative overflow-hidden shadow-xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-8 -mt-8 blur-2xl" />
              <ShieldAlert className="text-secondary mb-6" size={32} />
              <h3 className="text-md font-bold mb-2">Entorno Seguro</h3>
              <p className="text-xs text-white/70 leading-relaxed font-medium">
                Cualquier cambio realizado en este lienzo no afectará las rutas de producción (como el inicio, servicios o el cotizador oficial). Esto nos permite iterar ágilmente y garantizar la estabilidad del portal de cara al usuario final.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
