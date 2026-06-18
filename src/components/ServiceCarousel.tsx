"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ChevronRight,
  SmilePlus,
  Brain,
  Microscope,
  Stethoscope,
  Leaf,
  Building2,
  Video,
  Wallet,
  CreditCard,
  Phone
} from "lucide-react";

interface CarouselItem {
  title: string;
  desc: string;
  icon: React.ReactNode;
  link: string;
  color?: 'cyan' | 'indigo' | 'rose' | 'blue' | 'green' | 'secondary';
}

const COLOR_MAP = {
  cyan: { text: "text-cyan-500", bg: "bg-cyan-500/10", border: "border-cyan-500/30", hoverBorder: "group-hover/card:border-cyan-500", hoverBg: "group-hover/card:bg-cyan-500" },
  indigo: { text: "text-indigo-500", bg: "bg-indigo-500/10", border: "border-indigo-500/30", hoverBorder: "group-hover/card:border-indigo-500", hoverBg: "group-hover/card:bg-indigo-500" },
  rose: { text: "text-rose-500", bg: "bg-rose-500/10", border: "border-rose-500/30", hoverBorder: "group-hover/card:border-rose-500", hoverBg: "group-hover/card:bg-rose-500" },
  blue: { text: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-500/30", hoverBorder: "group-hover/card:border-blue-500", hoverBg: "group-hover/card:bg-blue-500" },
  green: { text: "text-green-500", bg: "bg-green-500/10", border: "border-green-500/30", hoverBorder: "group-hover/card:border-green-500", hoverBg: "group-hover/card:bg-green-500" },
  secondary: { text: "text-secondary", bg: "bg-secondary/10", border: "border-secondary/30", hoverBorder: "group-hover/card:border-secondary", hoverBg: "group-hover/card:bg-secondary" },
};

const SERVICES: CarouselItem[] = [
  { title: "Salud Dental", desc: "Odontología avanzada con tecnología.", icon: <SmilePlus size={22} />, link: "/servicios/dental", color: 'cyan' },
  { title: "Salud Mental", desc: "Acompañamiento con enfoque humano.", icon: <Brain size={22} />, link: "/servicios/mental", color: 'indigo' },
  { title: "Toma de Muestras", desc: "Resultados rápidos y precisos en 24h.", icon: <Microscope size={22} />, link: "/servicios/medicina", color: 'rose' },
  { title: "Medicina General", desc: "Atención integral para toda tu familia.", icon: <Stethoscope size={22} />, link: "/servicios/medicina", color: 'blue' },
  { title: "Terapias Complementarias", desc: "Enfoque holístico para tu salud.", icon: <Leaf size={22} />, link: "/servicios/terapias", color: 'green' }
];

const MODALITIES: CarouselItem[] = [
  { title: "Atención Presencial", desc: "En nuestras sucursales de alta tecnología.", icon: <Building2 size={22} />, link: "/contacto", color: 'secondary' },
  { title: "Teleconsulta", desc: "Consulta médica remota sin moverte de casa.", icon: <Video size={22} />, link: "https://ff.healthatom.io/7c4geA", color: 'secondary' },
  { title: "Bono Fonasa", desc: "Facilitamos tu atención con emisión directa.", icon: <Wallet size={22} />, link: "#agendar", color: 'secondary' },
  { title: "Bono Isapres", desc: "Amplia cobertura con tu plan de salud.", icon: <CreditCard size={22} />, link: "#agendar", color: 'secondary' },
];

// Duplicamos bastante para que no haya cortes visuales en el infinito
const INFINITE_SERVICES = [...SERVICES, ...SERVICES, ...SERVICES, ...SERVICES, ...SERVICES, ...SERVICES, ...SERVICES, ...SERVICES];
const INFINITE_MODALITIES = [...MODALITIES, ...MODALITIES, ...MODALITIES, ...MODALITIES, ...MODALITIES, ...MODALITIES, ...MODALITIES, ...MODALITIES];

function InfiniteScrollRow({
  items,
  speed = 0.8,
  direction = "right"
}: {
  items: CarouselItem[],
  speed?: number,
  direction?: "left" | "right"
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  
  // Drag to scroll state for Mouse
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftStart, setScrollLeftStart] = useState(0);
  const hasMoved = useRef(false);

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    setIsPaused(false);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    hasMoved.current = false; // Reiniciamos el detector de arrastre
    setIsPaused(true);
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeftStart(scrollRef.current.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    // Se mantiene pausado porque el mouse sigue sobre el elemento (handleMouseEnter)
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Scroll speed scalar
    
    // Si la distancia del arrastre supera un umbral, lo consideramos 'drag' y no 'click'
    if (Math.abs(walk) > 10) {
      hasMoved.current = true;
    }
    
    scrollRef.current.scrollLeft = scrollLeftStart - walk;
  };

  const handleItemClick = (e: React.MouseEvent) => {
    if (hasMoved.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const handleTouchStart = () => {
    setIsPaused(true);
  };

  const handleTouchEnd = () => {
    // Pausa extendida en móvil después de soltar para leer tranquilo
    setTimeout(() => setIsPaused(false), 3000);
  };

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth } = scrollRef.current;
    const singleSetWidth = scrollWidth / 8; // Ajustado a 8 para que coincida con la nueva longitud del carrusel

    if (direction === "right") {
      if (scrollLeft >= singleSetWidth * 6) {
        scrollRef.current.scrollLeft = singleSetWidth * 2;
      }
    } else {
      if (scrollLeft <= 0) {
        scrollRef.current.scrollLeft = singleSetWidth * 2;
      }
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      const { scrollWidth } = scrollRef.current;
      // Posicionamos en un punto intermedio del track para permitir loops a ambos lados
      scrollRef.current.scrollLeft = scrollWidth / 2;
    }
  }, []);

  const [effectiveSpeed, setEffectiveSpeed] = useState(speed);

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined") {
        // Ajustamos la velocidad para móvil, algo más moderado que antes pero que se note el movimiento
        setEffectiveSpeed(window.innerWidth < 768 ? speed * 0.75 : speed);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [speed]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused && scrollRef.current) {
        const scrollValue = direction === "right" ? effectiveSpeed : -effectiveSpeed;
        scrollRef.current.scrollBy({ left: scrollValue, behavior: "auto" });
      }
    }, 20);
    return () => clearInterval(interval);
  }, [isPaused, effectiveSpeed, direction]);

  return (
    <div
      className="relative w-full group py-2 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
    >

      <div
        ref={scrollRef}
        onScroll={handleScroll}
        onMouseEnter={handleMouseEnter}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
        className={`flex gap-4 overflow-x-auto hide-scrollbar px-6 py-3 select-none ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        style={{ scrollBehavior: isDragging ? 'auto' : 'auto' }}
      >
        {items.map((s, i) => {
          const colors = COLOR_MAP[s.color || 'secondary'];
          return (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05, y: -5 }}
              className={`w-[170px] md:w-[280px] h-[220px] md:h-auto shrink-0 group/card rounded-2xl bg-white dark:bg-slate-900 border border-slate-300/80 dark:border-slate-800 transition-all duration-300 relative overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.03)] dark:shadow-none hover:shadow-2xl hover:shadow-slate-300/50 dark:hover:shadow-none ${colors.hoverBorder}`}
            >
              <Link
                href={s.link}
                onClick={handleItemClick}
                className="flex flex-col justify-between h-full w-full p-4 md:p-5 select-none cursor-pointer"
              >
                <div>
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-3 mb-3">
                    <div className={`w-9 h-9 md:w-10 md:h-10 shrink-0 bg-slate-50 dark:bg-slate-950 border ${colors.border} rounded-xl flex items-center justify-center shadow-sm ${colors.hoverBg} group-hover/card:border-transparent transition-all duration-300`}>
                      <div className={`${colors.text} group-hover/card:text-white transition-colors [&>svg]:w-5 [&>svg]:h-5 md:[&>svg]:w-[22px] md:[&>svg]:h-[22px]`}>
                        {s.icon}
                      </div>
                    </div>
                    <div>
                      <h3 className={`text-[13px] md:text-base font-bold text-primary dark:text-white group-hover/card:${colors.text} transition-colors leading-tight`}>
                        {s.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-[11px] md:text-[12px] text-slate-500 dark:text-slate-400 font-medium leading-tight mb-4">
                    {s.desc}
                  </p>
                </div>

                <div
                  className={`inline-flex items-center gap-1 md:gap-2 text-[9px] md:text-[10px] font-bold text-primary dark:text-slate-300 uppercase tracking-wider group-hover/card:${colors.text} transition-all mt-auto`}
                >
                  <span>Ver detalles</span>
                  <ChevronRight size={14} className="group-hover/card:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export function ServiceCarousel() {
  return (
    <div className="flex flex-col gap-3 -mx-6 px-6 relative z-10 overflow-hidden">

      {/* Fila 1: Especialidades (A la derecha) */}
      <div className="w-full">
        <div className="px-8 mb-1">
          <h2 className="text-[9px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-[0.2em]">
            Conoce nuestras especialidades
          </h2>
        </div>
        <InfiniteScrollRow items={INFINITE_SERVICES} speed={0.9} direction="right" />
      </div>

      {/* Fila 2: Modalidades (Deshabilitado temporalmente para uso futuro) */}
      {/* 
      <div className="w-full hidden md:block">
        <div className="px-8 mb-1">
          <h2 className="text-[9px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-[0.2em]">
            Modalidades de Atención y Pagos
          </h2>
        </div>
        <InfiniteScrollRow items={INFINITE_MODALITIES} speed={0.9} direction="left" />
      </div>
      */}

    </div>
  );
}
