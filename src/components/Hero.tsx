"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Zap, CalendarDays, MapPin, Activity, HeartPulse, Sparkles, Brain, SmilePlus, Stethoscope, Leaf, Microscope, Accessibility, Users } from 'lucide-react';

import { trackEvent } from '@/lib/analytics';

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
  users: Users,
};

export interface HeroImage {
  src: string;
  alt: string;
  location: string;
}

export interface HeroProps {
  badgeText?: React.ReactNode | { text: string; iconName?: keyof typeof ICON_MAP }[];
  badgeIconName?: keyof typeof ICON_MAP;
  titlePrefix?: string;
  titleHighlight?: string;
  highlightClassName?: string;
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
  hideFloatingIcon?: boolean;
  category?: 'home' | 'dental' | 'mental' | 'medicina' | 'terapias';
}

const DEFAULT_IMAGES = [
  { src: '/Sucursales/heroActual.webp', alt: 'Policlínico Tabancura', location: 'Atención Familiar' }
];

export const Hero = ({
  badgeText = "Agenda 100% Digital",
  badgeIconName = "zap",
  titlePrefix = "Salud de calidad, ",
  titleHighlight = "más cerca de ti",
  highlightClassName,
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
  showBranches = false,
  hideFloatingIcon = false,
  category = 'home'
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

  const renderGlowShapes = () => {
    switch (category) {
      case 'dental':
        return (
          <div className="absolute inset-0 pointer-events-none select-none z-0">
            {/* Top-Right Cyan Glow */}
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-cyan-400/30 dark:bg-cyan-500/10 rounded-full blur-3xl opacity-75 animate-pulse duration-[6000ms]" />
          </div>
        );
      case 'mental':
        return (
          <div className="absolute inset-0 pointer-events-none select-none z-0">
            {/* Top-Right Indigo Glow */}
            <div className="absolute -top-12 -right-12 w-72 h-72 bg-indigo-400/25 dark:bg-indigo-500/10 rounded-full blur-3xl opacity-75" />
          </div>
        );
      case 'medicina':
        return (
          <div className="absolute inset-0 pointer-events-none select-none z-0">
            {/* Top-Right Blue Glow */}
            <div className="absolute -top-12 -right-12 w-72 h-72 bg-blue-500/25 dark:bg-blue-600/10 rounded-full blur-3xl opacity-75" />
          </div>
        );
      case 'terapias':
        return (
          <div className="absolute inset-0 pointer-events-none select-none z-0">
            {/* Top-Right Green Glow */}
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-emerald-400/20 dark:bg-emerald-500/5 rounded-full blur-3xl opacity-80" />
          </div>
        );
      default:
        return (
          <div className="absolute inset-0 pointer-events-none select-none z-0">
            {/* Default/Home: Brand Celeste & Blue Glows */}
            <div className="absolute -top-16 -right-16 w-80 h-80 bg-[#259CF4]/30 dark:bg-[#259CF4]/10 rounded-full blur-3xl opacity-75 animate-pulse duration-[7000ms]" />
            <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-[#162158]/15 dark:bg-[#162158]/5 rounded-full blur-3xl opacity-80" />
            <div className="absolute top-1/3 left-1/4 w-48 h-48 bg-cyan-400/20 dark:bg-cyan-500/5 rounded-full blur-3xl" />
          </div>
        );
    }
  };
  return (
    <section className="main-hero relative z-10 pt-[120px] sm:pt-[130px] md:pt-[170px] lg:pt-[190px] pb-6 md:pb-10 bg-transparent dark:bg-transparent transition-colors duration-300">
      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-6 lg:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center sm:items-start text-center sm:text-left relative w-full min-w-0"
        >

          <div className="flex flex-wrap gap-2.5 mb-5 md:mb-8 justify-center sm:justify-start">
            {Array.isArray(badgeText) ? (
              badgeText.map((badge, index) => {
                const isObject = typeof badge === 'object' && badge !== null && 'text' in badge;
                const text = isObject ? (badge as any).text : badge;
                const iconName = isObject ? (badge as any).iconName : badgeIconName;
                const SpecificIcon = iconName && ICON_MAP[iconName as keyof typeof ICON_MAP] ? ICON_MAP[iconName as keyof typeof ICON_MAP] : BadgeIcon;
                return (
                  <div key={index} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#259CF4] text-white text-[10px] font-bold uppercase tracking-widest">
                    <SpecificIcon size={14} className="text-white shrink-0" />
                    <span>{text}</span>
                  </div>
                );
              })
            ) : (
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#259CF4] text-white text-[10px] font-bold uppercase tracking-widest">
                <BadgeIcon size={14} className="text-white shrink-0" />
                <span>{badgeText}</span>
              </div>
            )}
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-primary dark:text-slate-50 leading-[1.15] md:leading-[1] tracking-tighter mb-3 md:mb-8">
            {titlePrefix} <br />
            <span className={highlightClassName || "text-[#259CF4] dark:text-[#259CF4]"}>{titleHighlight}</span>
          </h1>
          <p className="text-base md:text-xl text-slate-500 dark:text-slate-400 font-medium max-w-md leading-relaxed mb-6 md:mb-8">
            {description}
          </p>

          <div className="flex flex-col sm:flex-row items-center sm:items-center gap-4 flex-wrap w-full justify-center sm:justify-start">
            <button
              type="button"
              className="relative inline-flex cursor-pointer select-none group border-none bg-transparent p-0 outline-none w-60 sm:w-64"
              onClick={() => {
                trackEvent('click_reservar_hora', { label: 'Boton Principal Hero' });
                trackEvent('reserva_iniciada', { label: 'Flujo desde Hero' });
                const el = document.getElementById('agendar');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {/* Cuerpo del Botón principal con Degradado Premium o Color Sólido y Ancho Normalizado */}
              <div className={`${hideFloatingIcon ? 'bg-primary hover:bg-primary/90' : 'bg-gradient-to-r from-primary to-[#1e3a8a]'} text-white w-60 sm:w-64 h-16 flex items-center justify-center gap-4 rounded-full text-sm sm:text-lg font-black tracking-tight shadow-xl shadow-black/10 transition-all duration-500 transform group-hover:-translate-y-1 group-active:scale-95 relative z-10 whitespace-nowrap`}>
                {buttonText}
                {!hideFloatingIcon && isInlineIcon && (
                  <div className={`w-10 h-10 rounded-full ${floatingIconBg} flex items-center justify-center text-primary shadow-sm shrink-0 group-hover:scale-110 group-hover:rotate-[10deg] transition-transform duration-500 mr-[-12px] ml-1`}>
                    <FloatingIcon size={18} strokeWidth={2.5} />
                  </div>
                )}
              </div>

              {/* Icono Badge Flotante en la Esquina Superior Derecha (Solo si NO es Inline y NO está oculto) */}
              {!hideFloatingIcon && !isInlineIcon && (
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
                {!hideFloatingIcon && (
                  <div className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 w-10 h-10 sm:w-12 sm:h-12 bg-slate-800 dark:bg-slate-700 rounded-full flex items-center justify-center text-white shadow-lg transition-all duration-500 transform group-hover/sec:-translate-y-1 group-hover/sec:rotate-[15deg] group-hover/sec:scale-110 group-active/sec:scale-95 z-20 border-4 border-white dark:border-slate-950 border-solid">
                    <Users className="w-4 h-4 sm:w-5 sm:h-5 text-white" strokeWidth={2.5} />
                  </div>
                )}
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
            className="relative w-full group/slider"
          >
            {renderGlowShapes()}

            <div
              onClick={handleSliderClick}
              className={`relative z-10 bg-white dark:bg-slate-950 rounded-[2rem] sm:rounded-[3rem] overflow-hidden aspect-[4/3] lg:aspect-[16/10] transition-all duration-500 transform active:scale-[0.99] ${(sliderAnchorId || images === DEFAULT_IMAGES) ? 'cursor-pointer' : 'cursor-default'
                }`}
            >
              <div className="relative w-full h-full overflow-hidden">
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
                        : 'object-cover scale-[1.15] origin-bottom'
                        } group-hover/slider:scale-[1.20] transition-transform duration-700`}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1200px"
                      quality={currentImageIndex === 0 ? 90 : 75}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Indicador de Sucursal/Imagen Actual */}
              <div className="hero-dots-wrapper absolute top-4 sm:top-8 left-4 sm:left-8 right-4 sm:right-8 z-20 flex justify-end items-start">
                {/* Puntos de paginación */}
                {images.length > 1 && (
                  <div className="hero-dots-container flex gap-1 bg-black/20 p-1 rounded-full backdrop-blur-sm">
                    {images.map((_, i) => (
                      <button
                        key={i}
                        onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(i); }}
                        aria-label={`Ver imagen ${i + 1}`}
                        className="w-6 h-6 flex items-center justify-center cursor-pointer focus:outline-none group"
                      >
                        <div className={`hero-dot h-2 rounded-full transition-all duration-300 ${
                          i === currentImageIndex 
                            ? 'w-4 bg-white active' 
                            : 'w-2 bg-white/50 group-hover:bg-white'
                        }`} />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};