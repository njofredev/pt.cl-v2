"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, Building2 } from 'lucide-react';

const VITACURA_RAW = [
  {
    author: "Paula Urrutia M.",
    text: "El lugar es buenísimo, vine por las recomendaciones de los otros usuarios y me encantó. Me atendí por la parte dental, y todos fueron muy amables. Lo más importante y que me dio confianza, es que el lugar es muy limpio, me atendieron a la hora y quedé feliz.",
    nota: 5
  },
  {
    author: "Andrea Ponce",
    text: "Excelente experiencia en el área Dental. Tanto las recepcionistas, asistentes dentales como los profesionales odontólogos nos han brindado un servicio excepcional, siempre muy atentos y preocupados por nuestro bienestar. Se nota el compromiso.",
    nota: 5
  },
  {
    author: "Cristina Gonzalez",
    text: "El edificio es moderno, muy limpio y bien ubicado.. Me sentí bien atendida en mis procedimientos.",
    nota: 5
  }
];

const TRIBUNALES_RAW = [
  {
    author: "Francisca Miquel",
    text: "Atienden muy bien todos muy amables y precios muy razonables. Se agradece la disposición de todo el personal.",
    nota: 5
  },
  {
    author: "Francisco Miño Kraus",
    text: "Constanza y todo el equipo son de verdad muy buenas. Médicos excelentes. Mi experiencia fue fantástica.",
    nota: 5
  },
  {
    author: "Juan Pablo Verschueren",
    text: "Todo impecable y excelente atención. Instalaciones muy cómodas y buena disposición horaria.",
    nota: 5
  }
];

const DATA = {
  vitacura: {
    name: "Sucursal Vitacura",
    rating: "4.9",
    count: 53,
    // Multiplicamos por 10 para que el buffer de scroll sea enorme y no haya cortes
    reviews: Array(10).fill(VITACURA_RAW).flat()
  },
  tribunales: {
    name: "Sucursal Tribunales",
    rating: "4.4",
    count: 30,
    // Multiplicamos por 10
    reviews: Array(10).fill(TRIBUNALES_RAW).flat()
  }
};

export const GoogleReviews = () => {
  const [branch, setBranch] = useState<'vitacura' | 'tribunales'>('vitacura');
  const activeData = DATA[branch];
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Efecto para reiniciar el scroll a la mitad cada vez que cambiamos de sucursal
  useEffect(() => {
    if (scrollRef.current) {
      const { scrollWidth } = scrollRef.current;
      scrollRef.current.scrollLeft = scrollWidth / 2;
    }
  }, [branch]);

  // Lógica de Scroll Infinito Matemático
  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth } = scrollRef.current;
    const singleSetWidth = scrollWidth / 10; 

    // Si avanza hacia el final (10 sets), vuelve al set 4 para mantener centro
    if (scrollLeft >= singleSetWidth * 8) {
      scrollRef.current.scrollLeft = singleSetWidth * 3;
    }
    // Si retrocede por debajo del set 2, salta al set 6
    if (scrollLeft <= singleSetWidth * 1) {
      scrollRef.current.scrollLeft = singleSetWidth * 5;
    }
  };

  // Ticker de Movimiento Continuo
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused && scrollRef.current) {
        scrollRef.current.scrollBy({ left: 0.8, behavior: "auto" }); // Velocidad lenta elegante
      }
    }, 16);
    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section className="py-16 relative overflow-hidden bg-transparent dark:bg-transparent">
      <div className="container mx-auto px-6 relative z-10">
        
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 mb-16">
          <div className="flex flex-col max-w-lg w-full lg:text-left text-center items-center lg:items-start">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="#EA4335" className="text-[#EA4335]" />
                ))}
              </div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">Reseñas Verificadas</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-primary dark:text-white tracking-tighter leading-[0.9] mb-6">
              Tu opinión nos importa. <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-teal-500 to-secondary">Experiencias reales.</span>
            </h2>
            
            {/* Selector de Sucursales */}
            <div className="flex p-1.5 bg-slate-100 dark:bg-slate-900 rounded-2xl border border-slate-200/50 dark:border-slate-800 w-fit shadow-inner">
              {(['vitacura', 'tribunales'] as const).map((b) => (
                <button
                  key={b}
                  onClick={() => setBranch(b)}
                  className={`relative px-5 py-2.5 text-[11px] font-black uppercase tracking-widest rounded-xl transition-all duration-300 ${
                    branch === b 
                    ? 'text-white shadow-lg shadow-primary/20 bg-primary' 
                    : 'text-slate-500 hover:text-primary dark:hover:text-white'
                  }`}
                >
                  <div className="relative z-10 flex items-center gap-2">
                    <Building2 size={12} />
                    {b === 'vitacura' ? 'Vitacura' : 'Tribunales'}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Resumen Numérico Dinámico */}
          <AnimatePresence mode="wait">
            <motion.div 
              key={branch}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-[2.5rem] shadow-xl shadow-primary/5 border border-slate-100 dark:border-slate-800 flex items-center gap-6 relative overflow-hidden shrink-0"
            >
              {/* Watermark Google */}
              <svg className="absolute -right-4 -bottom-4 w-24 h-24 opacity-[0.03] dark:opacity-[0.05]" viewBox="0 0 24 24">
                 <path fill="currentColor" d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
              </svg>

              <div className="flex flex-col items-center shrink-0">
                <span className="text-5xl font-black text-primary dark:text-white tracking-tighter leading-none">{activeData.rating}</span>
                <div className="flex gap-0.5 mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill="#FBBC05" className="text-[#FBBC05]" />
                  ))}
                </div>
              </div>
              <div className="h-16 w-px bg-slate-100 dark:bg-slate-800"></div>
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-1.5">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Google Rating</span>
                </div>
                <p className="text-[13px] font-medium text-slate-600 dark:text-slate-300">
                  Basado en <span className="font-black text-primary dark:text-secondary">{activeData.count} opiniones</span> reales
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Sistema Carrusel Infinito 100% Confiable con Detección Matemática de Scroll */}
      <div 
        className="relative w-full [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] group py-2"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-6 overflow-x-auto hide-scrollbar py-4 px-6 select-none"
          style={{ scrollBehavior: 'auto' }}
        >
          {activeData.reviews.map((review, idx) => (
            <motion.div 
              key={`${branch}-${idx}`}
              whileHover={{ y: -4 }}
              className="w-[320px] md:w-[380px] bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col shrink-0 group/card transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-5">
                <div className="flex gap-0.5">
                  {[...Array(review.nota)].map((_, i) => (
                    <Star key={i} size={14} fill="#FBBC05" className="text-[#FBBC05]" />
                  ))}
                </div>
                <Quote size={22} className="text-slate-200 dark:text-slate-800 group-hover/card:text-secondary/20 transition-colors rotate-180" />
              </div>

              <p className="text-[14px] md:text-[15px] text-slate-600 dark:text-slate-300 font-medium leading-relaxed mb-6 flex-1 italic">
                "{review.text}"
              </p>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-50 dark:border-slate-800 mt-auto">
                <div className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xs font-black text-slate-500 dark:text-slate-400 shrink-0">
                  {review.author.split(' ').map((n: string) => n[0]).join('').substring(0, 2)}
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-bold text-primary dark:text-white truncate leading-tight">{review.author}</span>
                  <div className="flex items-center gap-1 text-[9px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">
                     Google Local Guide
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA: Dejar Reseña en Google */}
      <div className="container mx-auto px-6 mt-12 relative z-10 text-center">
        <div className="flex flex-col items-center justify-center gap-3">
          <p className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">
            ¿Te has atendido con nosotros recientemente?
          </p>
          <h4 className="text-lg md:text-xl font-bold text-primary dark:text-white mb-2">
            Comparte tu experiencia en Google
          </h4>
          <div className="flex flex-wrap gap-4 justify-center">
            <a 
              href="https://g.page/r/CQnnnRuZmSXvEAE/review"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-white border border-slate-200/60 dark:border-slate-800 rounded-full text-[11px] font-black uppercase tracking-widest hover:shadow-md hover:-translate-y-0.5 active:scale-95 transition-all group"
            >
              <svg className="w-4 h-4 shrink-0 transition-transform group-hover:scale-110" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Reseñar Vitacura
            </a>
            <a 
              href="https://g.page/r/CQIjawVKOBfhEAE/review"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-white border border-slate-200/60 dark:border-slate-800 rounded-full text-[11px] font-black uppercase tracking-widest hover:shadow-md hover:-translate-y-0.5 active:scale-95 transition-all group"
            >
              <svg className="w-4 h-4 shrink-0 transition-transform group-hover:scale-110" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Reseñar Tribunales
            </a>
          </div>
        </div>
      </div>

    </section>
  );
};
