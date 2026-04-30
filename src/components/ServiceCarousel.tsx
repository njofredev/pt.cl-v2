"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight, ChevronLeft } from "lucide-react";

const SERVICES = [
  { title: "Salud Dental", desc: "Odontología avanzada con tecnología digital de última generación.", icon: "/ico_dental.png", link: "/servicios/dental" },
  { title: "Salud Mental", desc: "Acompañamiento psicológico y psiquiátrico con enfoque humano.", icon: "/ico_mental.png", link: "/servicios/mental" },
  { title: "Toma de Muestras", desc: "Laboratorio clínico con resultados rápidos y precisos en 24h.", icon: "/ico_lab.png", link: "/servicios/medicina" },
  { title: "Medicina General", desc: "Atención integral para el cuidado primario de toda tu familia.", icon: "/ico_med_general.png", link: "/servicios/medicina" },
  { title: "Terapias Alternativas", desc: "Enfoque holístico para tu salud con profesionales certificados.", icon: "/ico_terapias_alternativas.png", link: "/servicios/terapias" }
];

// Triplicamos para asegurar que el scroll infinito sea fluido
const INFINITE_SERVICES = [...SERVICES, ...SERVICES, ...SERVICES];

export function ServiceCarousel() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Lógica de Scroll Infinito sin saltos visuales
  const handleScroll = () => {
    if (!carouselRef.current) return;
    const { scrollLeft, scrollWidth } = carouselRef.current;
    const singleSetWidth = scrollWidth / 3;

    // Si llegamos al final del tercer set, saltamos al inicio del segundo set
    if (scrollLeft >= singleSetWidth * 2) {
      carouselRef.current.scrollLeft = scrollLeft - singleSetWidth;
    }
    // Si llegamos al inicio del primer set, saltamos al inicio del segundo set
    if (scrollLeft <= 0) {
      carouselRef.current.scrollLeft = singleSetWidth;
    }
  };

  useEffect(() => {
    // Posicionar el scroll en el inicio del segundo set (el medio) al montar
    if (carouselRef.current) {
      const singleSetWidth = carouselRef.current.scrollWidth / 3;
      carouselRef.current.scrollLeft = singleSetWidth;
    }

    const interval = setInterval(() => {
      if (!isPaused && carouselRef.current) {
        carouselRef.current.scrollBy({ left: 1, behavior: "auto" }); // Movimiento suave y continuo
      }
    }, 20); // Velocidad de giro

    return () => clearInterval(interval);
  }, [isPaused]);

  const manualScroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = direction === "left" ? -400 : 400;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div 
      className="relative w-full overflow-hidden pt-8 pb-12 -mx-6 px-6 group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Controles Minimalistas */}
      <div className="absolute top-1/2 -translate-y-1/2 left-10 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:block">
        <button 
          onClick={() => manualScroll("left")}
          className="w-14 h-14 bg-white/80 backdrop-blur-md border border-slate-100 text-primary rounded-full flex items-center justify-center hover:bg-white hover:scale-110 hover:text-secondary transition-all cursor-pointer"
        >
          <ChevronLeft size={28} />
        </button>
      </div>

      <div className="absolute top-1/2 -translate-y-1/2 right-10 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:block">
        <button 
          onClick={() => manualScroll("right")}
          className="w-14 h-14 bg-white/80 backdrop-blur-md border border-slate-100 text-primary rounded-full flex items-center justify-center hover:bg-white hover:scale-110 hover:text-secondary transition-all cursor-pointer"
        >
          <ChevronRight size={28} />
        </button>
      </div>

      {/* Gradientes laterales */}
      <div className="absolute top-0 left-0 bottom-0 w-32 bg-gradient-to-r from-white via-white/50 to-transparent z-20 pointer-events-none" />
      <div className="absolute top-0 right-0 bottom-0 w-32 bg-gradient-to-l from-white via-white/50 to-transparent z-20 pointer-events-none" />

      {/* Contenedor del Carrusel */}
      <div 
        ref={carouselRef}
        onScroll={handleScroll}
        className="flex gap-8 overflow-x-auto hide-scrollbar pb-10 pt-4 px-10 select-none"
        style={{ scrollBehavior: 'auto' }}
      >
        {INFINITE_SERVICES.map((s, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -10 }}
            className="w-[350px] shrink-0 group/card p-10 rounded-[3.5rem] bg-white border border-slate-100 transition-all duration-500 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-secondary/5 rounded-full -mr-20 -mt-20 group-hover/card:bg-secondary/10 group-hover/card:scale-150 transition-all duration-700" />
            
            <div className="relative z-10 w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mb-10 group-hover/card:bg-white transition-all duration-500">
              <img src={s.icon} alt={s.title} className="w-12 h-12 object-contain" />
            </div>

            <h3 className="relative z-10 text-2xl font-bold text-primary mb-4 group-hover/card:text-secondary transition-colors">
              {s.title}
            </h3>
            
            <p className="relative z-10 text-slate-500 font-medium leading-relaxed mb-10">
              {s.desc}
            </p>

            <Link 
              href={s.link} 
              className="relative z-10 inline-flex items-center gap-3 text-[12px] font-bold text-primary uppercase tracking-widest group-hover/card:text-secondary transition-all"
            >
              Ver detalles 
              <div className="w-8 h-8 rounded-full border border-slate-100 flex items-center justify-center group-hover/card:border-secondary transition-colors">
                <ChevronRight size={16} />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
