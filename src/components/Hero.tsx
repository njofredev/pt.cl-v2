"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Zap, CalendarDays, MapPin, Activity, HeartPulse, Sparkles, Brain, SmilePlus, Stethoscope, Leaf, Microscope, Accessibility, Users } from 'lucide-react';

const ICON_MAP = {
  zap: Zap,
  sparkles: Sparkles,
  brain: Brain,
  heartPulse: HeartPulse,
  activity: Activity,
  smilePlus: SmilePlus,
  stethoscope: Stethoscope,
  leaf: Leaf,
  microscope: Microscope,
  accessibility: Accessibility,
  calendar: CalendarDays,
};

export interface HeroImage {
  src: string;
  alt: string;
  location: string;
}

export interface HeroProps {
  badgeText?: string;
  badgeIconName?: keyof typeof ICON_MAP;
  titlePrefix?: string;
  titleHighlight?: string;
  description?: React.ReactNode;
  buttonText?: string;
  statsNumber?: string;
  statsLabel?: string;
  images?: HeroImage[];
  floatingIconName?: keyof typeof ICON_MAP;
  floatingIconBg?: string;
  isInlineIcon?: boolean;
  secondaryButtonText?: string;
  secondaryButtonAnchorId?: string;
  sliderAnchorId?: string;
  customRightElement?: React.ReactNode;
  showBranches?: boolean;
}

const DEFAULT_IMAGES = [
  { src: '/Sucursales/sucursal_tribunales.webp', alt: 'Sucursal Tribunales', location: 'Los Tribunales #1268' },
  { src: '/Sucursales/sucursal_vitacura.webp', alt: 'Sucursal Vitacura', location: 'Av. Vitacura #8620' },
  { src: '/Sucursales/sucursal_tribunales2.webp', alt: 'Sucursal Tribunales 2', location: 'Los Tribunales #1268' },
  { src: '/Sucursales/sucursal_vitacura2.webp', alt: 'Sucursal Vitacura 2', location: 'Av. Vitacura #8620' }
];

export const Hero = ({
  badgeText = "Agenda 100% Digital",
  badgeIconName = "zap",
  titlePrefix = "Tu salud, ",
  titleHighlight = "nuestra prioridad",
  description = "Reserva tu hora, revisa exámenes y gestiona tu bienestar desde cualquier lugar, fácil y rápido.",
  buttonText = "Reserva tu atención",
  statsNumber = "+10k",
  statsLabel = "Pacientes Atendidos",
  images = DEFAULT_IMAGES,
  floatingIconName = "calendar",
  floatingIconBg = "bg-secondary",
  isInlineIcon = false,
  secondaryButtonText,
  secondaryButtonAnchorId,
  sliderAnchorId,
  customRightElement,
  showBranches = false
}: HeroProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const BadgeIcon = ICON_MAP[badgeIconName] || Zap;
  const FloatingIcon = ICON_MAP[floatingIconName] || CalendarDays;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 5000); // Cambia de imagen cada 5 segundos
    return () => clearInterval(timer);
  }, [images.length]);

  const handleSliderClick = () => {
    // Si estamos en una página de servicio (donde images != DEFAULT_IMAGES), 
    // no redirigimos a la home a menos que sliderAnchorId esté definido.
    const targetId = sliderAnchorId || (images === DEFAULT_IMAGES ? 'sucursales' : null);

    if (!targetId) return;

    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else if (typeof window !== 'undefined' && window.location.pathname === '/') {
      window.location.href = `#${targetId}`;
    }
  };

  return (
    <section className="relative pt-[200px] sm:pt-[220px] md:pt-44 pb-12 md:pb-20 overflow-hidden bg-transparent dark:bg-transparent transition-colors duration-300">


      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-6 lg:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center sm:items-start text-center sm:text-left relative w-full min-w-0"
        >

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary text-white text-[10px] font-bold uppercase tracking-widest mb-5 md:mb-8">
            <BadgeIcon size={14} fill="currentColor" className="text-secondary" /> {badgeText}
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-primary dark:text-slate-50 leading-[1.15] md:leading-[1] tracking-tighter mb-3 md:mb-8">
            {titlePrefix} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-teal-400 to-secondary dark:from-white dark:via-secondary dark:to-teal-400">{titleHighlight}</span>
          </h1>
          <p className="text-base md:text-xl text-slate-500 dark:text-slate-400 font-medium max-w-md leading-relaxed mb-6 md:mb-8">
            {description}
          </p>

          <div className="flex flex-col sm:flex-row items-center sm:items-center gap-4 flex-wrap w-full justify-center sm:justify-start">
            <button
              type="button"
              className="relative inline-flex cursor-pointer select-none group border-none bg-transparent p-0 outline-none w-60 sm:w-64"
              onClick={() => {
                const el = document.getElementById('agendar');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {/* Cuerpo del Botón principal con Degradado Premium y Ancho Normalizado */}
              <div className="bg-gradient-to-r from-primary to-[#1e3a8a] text-white w-60 sm:w-64 h-16 flex items-center justify-center gap-4 rounded-full text-sm sm:text-lg font-black tracking-tight shadow-xl shadow-black/10 transition-all duration-500 transform group-hover:-translate-y-1 group-active:scale-95 relative z-10 whitespace-nowrap">
                {buttonText}
                {isInlineIcon && (
                  <div className={`w-10 h-10 rounded-full ${floatingIconBg} flex items-center justify-center text-primary shadow-sm shrink-0 group-hover:scale-110 group-hover:rotate-[10deg] transition-transform duration-500 mr-[-12px] ml-1`}>
                    <FloatingIcon size={18} strokeWidth={2.5} />
                  </div>
                )}
              </div>

              {/* Icono Badge Flotante en la Esquina Superior Derecha (Solo si NO es Inline) */}
              {!isInlineIcon && (
                <div className={`absolute -top-2 -right-2 sm:-top-3 sm:-right-3 w-10 h-10 sm:w-12 sm:h-12 ${floatingIconBg} rounded-full flex items-center justify-center text-white shadow-lg transition-all duration-500 transform group-hover:-translate-y-1 group-hover:rotate-[-15deg] group-hover:scale-110 group-active:scale-95 z-20 border-4 border-white dark:border-slate-950`}>
                  <FloatingIcon className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2.5} />
                </div>
              )}
            </button>

            {/* Botón Secundario Condicional */}
            {secondaryButtonText && (
              <div className="relative inline-flex select-none group/sec w-60 sm:w-64">
                <button
                  onClick={() => {
                    if (secondaryButtonAnchorId) {
                      const el = document.getElementById(secondaryButtonAnchorId);
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="h-16 w-60 sm:w-64 inline-flex items-center justify-center gap-3 rounded-full border-2 border-slate-200 dark:border-white/10 bg-transparent dark:bg-white/5 text-slate-700 dark:text-slate-100 text-sm sm:text-lg font-black tracking-tight shadow-sm hover:bg-slate-50 dark:hover:bg-white/10 hover:border-primary/20 dark:hover:border-white/20 transition-all duration-500 transform group-hover/sec:-translate-y-1 group-active/sec:scale-95 select-none whitespace-nowrap cursor-pointer"
                >
                  <span>{secondaryButtonText}</span>
                </button>

                {/* Icono Badge Flotante Secundario */}
                <div className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 w-10 h-10 sm:w-12 sm:h-12 bg-slate-800 dark:bg-slate-700 rounded-full flex items-center justify-center text-white shadow-lg transition-all duration-500 transform group-hover/sec:-translate-y-1 group-hover/sec:rotate-[15deg] group-hover/sec:scale-110 group-active/sec:scale-95 z-20 border-4 border-white dark:border-slate-950 border-solid">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5 text-white" strokeWidth={2.5} />
                </div>
              </div>
            )}
          </div>

        </motion.div>

        {/* Elemento Visual de Identidad: Slider de Sucursales / Especialidad o Elemento Personalizado */}
        {customRightElement ? (
          <div className="relative w-full min-w-0 overflow-hidden flex items-center justify-center">
            {customRightElement}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0.01, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="relative w-full"
          >
            <div
              onClick={handleSliderClick}
              className={`relative z-10 bg-slate-100 dark:bg-slate-900 rounded-[2rem] sm:rounded-[3rem] p-3 sm:p-4 shadow-lg shadow-slate-200/50 dark:shadow-none border-4 sm:border-8 border-white dark:border-slate-900 overflow-hidden aspect-[4/3] group/slider hover:shadow-2xl transition-all duration-500 transform active:scale-[0.99] ${(sliderAnchorId || images === DEFAULT_IMAGES) ? 'cursor-pointer' : 'cursor-default'
                }`}
            >
              <div className="relative w-full h-full rounded-[1.7rem] sm:rounded-[2.5rem] overflow-hidden">
                <AnimatePresence initial={false}>
                  <motion.div
                    key={currentImageIndex}
                    initial={currentImageIndex === 0 ? { opacity: 1 } : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: currentImageIndex === 0 ? 0 : 1.2, ease: "easeInOut" }}
                    className="absolute inset-0 w-full h-full"
                  >
                    <Image
                      src={images[currentImageIndex].src}
                      alt={images[currentImageIndex].alt}
                      fill
                      priority={currentImageIndex === 0}
                      {...({ fetchPriority: currentImageIndex === 0 ? "high" : undefined } as any)}
                      className={`${images[currentImageIndex].src.includes('/logos_convenios_prevision/')
                        ? 'object-contain p-12 bg-white dark:bg-slate-900'
                        : 'object-cover'
                        } group-hover/slider:scale-105 transition-transform duration-700`}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1200px"
                      quality={currentImageIndex === 0 ? 90 : 75}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Indicador de Sucursal/Imagen Actual */}
              <div className="absolute top-4 sm:top-8 left-4 sm:left-8 right-4 sm:right-8 z-20 flex justify-end items-start">
                {!showBranches && (
                  <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-4 py-2 rounded-xl shadow-sm border border-white dark:border-slate-800 flex items-center gap-2 mr-auto">
                    {images[currentImageIndex].src.includes('/logos_convenios_prevision/') ? (
                      <Sparkles size={16} className="text-secondary shrink-0" />
                    ) : (
                      <MapPin size={16} className="text-secondary" />
                    )}
                    <span className="text-[11px] font-bold text-primary dark:text-slate-100 tracking-widest uppercase">
                      {images[currentImageIndex].location}
                    </span>
                  </div>
                )}

                {/* Puntos de paginación */}
                {images.length > 1 && (
                  <div className="flex gap-1 bg-black/20 p-1 rounded-full backdrop-blur-sm">
                    {images.map((_, i) => (
                      <button
                        key={i}
                        onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(i); }}
                        aria-label={`Ver imagen ${i + 1}`}
                        className="w-6 h-6 flex items-center justify-center cursor-pointer focus:outline-none group"
                      >
                        <div className={`h-2 rounded-full transition-all duration-300 ${i === currentImageIndex ? 'w-4 bg-white' : 'w-2 bg-white/50 group-hover:bg-white'
                          }`} />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Info de Sucursal Dinámica (Bottom Right) */}
              {showBranches && (
                <div className="absolute bottom-4 sm:bottom-8 right-4 sm:right-8 z-20 flex flex-col sm:flex-row gap-3">
                  {/* Sucursal Tribunales */}
                  {images[currentImageIndex].src.toLowerCase().includes('tribunales') && (
                    <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-2xl border border-white dark:border-slate-800 shadow-sm">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-secondary/10 rounded-xl flex items-center justify-center text-secondary shrink-0">
                        <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <div className="text-left">
                        <p className="text-[8px] sm:text-[9px] font-black uppercase tracking-[0.2em] text-secondary mb-0.5">Casa Matriz</p>
                        <p className="text-[11px] sm:text-[13px] font-bold text-primary dark:text-white leading-tight">Los Tribunales #1268</p>
                        <p className="hidden sm:block text-[10px] text-slate-500 dark:text-slate-400 font-medium mt-0.5">+56 2 2217 2635</p>
                      </div>
                    </div>
                  )}
                  {/* Sucursal Vitacura */}
                  {images[currentImageIndex].src.toLowerCase().includes('vitacura') && (
                    <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-2xl border border-white dark:border-slate-800 shadow-sm">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-secondary/10 rounded-xl flex items-center justify-center text-secondary shrink-0">
                        <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <div className="text-left">
                        <p className="text-[8px] sm:text-[9px] font-black uppercase tracking-[0.2em] text-secondary mb-0.5">Centro Médico</p>
                        <p className="text-[11px] sm:text-[13px] font-bold text-primary dark:text-white leading-tight">Av. Vitacura #8620</p>
                        <p className="hidden sm:block text-[10px] text-slate-500 dark:text-slate-400 font-medium mt-0.5">+56 2 2933 6740</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
            {/* Badge flotante de confianza */}
            <div className="absolute -bottom-6 -left-6 bg-white dark:bg-slate-900 p-4 md:p-6 rounded-3xl shadow-lg border border-slate-100 dark:border-slate-800 z-30">
              <p className="text-3xl font-bold text-primary dark:text-slate-50">{statsNumber}</p>
              <p className="text-[10px] font-bold text-slate-500 dark:text-slate-300 uppercase tracking-widest">{statsLabel}</p>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};