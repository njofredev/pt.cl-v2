"use client";
import React, { useState } from 'react';
import { Phone, X, MapPin, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const CallCTA = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Full-width CTA Banner */}
      <section className="w-full bg-[#162158] py-8 flex justify-center items-center my-0">
        <div className="container mx-auto px-6 flex justify-center">
          <button
            onClick={() => setIsOpen(true)}
            className="bg-[#1ad1a5] hover:bg-[#15af8a] text-[#162158] font-bold px-8 py-4 rounded-2xl text-[15px] sm:text-lg tracking-tight transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg shadow-black/10 cursor-pointer"
          >
            Prefiero llamar para agendar una hora
          </button>
        </div>
      </section>

      {/* Modal / Dialog */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative bg-white dark:bg-slate-950 w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 dark:border-slate-800 z-10 overflow-hidden"
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2 text-[#162158] dark:text-white">
                  <Phone className="w-5 h-5 text-[#259CF4]" />
                  <h3 className="text-xl font-bold tracking-tight">Atención Telefónica</h3>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer"
                  aria-label="Cerrar modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Branch Cards */}
              <div className="space-y-4">
                {/* Los Tribunales */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                  <p className="text-[10px] font-black uppercase tracking-widest text-[#259CF4] mb-1">Casa Matriz</p>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-1.5 mb-2">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    Sucursal Los Tribunales
                  </h4>
                  <a
                    href="tel:+56222172635"
                    className="inline-flex items-center gap-2 text-2xl font-black text-[#162158] dark:text-emerald-400 hover:text-[#259CF4] transition-colors"
                  >
                    +56 2 2217 2635
                  </a>
                </div>

                {/* Vitacura */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                  <p className="text-[10px] font-black uppercase tracking-widest text-[#259CF4] mb-1">Centro Médico</p>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-1.5 mb-2">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    Sucursal Vitacura
                  </h4>
                  <a
                    href="tel:+56229336740"
                    className="inline-flex items-center gap-2 text-2xl font-black text-[#162158] dark:text-emerald-400 hover:text-[#259CF4] transition-colors"
                  >
                    +56 2 2933 6740
                  </a>
                </div>
              </div>

              {/* Schedule Info */}
              <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 space-y-2 text-slate-500 dark:text-slate-400">
                <div className="flex gap-2 items-start text-xs font-semibold">
                  <Clock className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="uppercase tracking-wider text-[10px] text-slate-400">Horarios de Atención</p>
                    <p className="leading-tight"><span className="font-bold text-slate-700 dark:text-slate-200">Los Tribunales:</span> Lun a Vie: 09:00 a 13:00 y 14:00 a 18:30 hrs.</p>
                    <p className="leading-tight"><span className="font-bold text-slate-700 dark:text-slate-200">Vitacura:</span> Lun a Vie: 08:30 a 20:00, Sáb: 09:00 a 13:00 hrs.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
