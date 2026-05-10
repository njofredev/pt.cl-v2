"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Zap, CalendarDays, MapPin, Activity, HeartPulse, Sparkles, Brain, SmilePlus, Stethoscope, Leaf, Microscope, Accessibility } from 'lucide-react';

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
  description?: string;
  buttonText?: string;
  statsNumber?: string;
  statsLabel?: string;
  images?: HeroImage[];
  floatingIconName?: keyof typeof ICON_MAP;
  floatingIconBg?: string;
  isInlineIcon?: boolean;
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
  titleHighlight = "nuestra prioridad.",
  description = "Reserva tu hora, revisa exámenes y gestiona tu bienestar desde cualquier lugar, fácil y rápido.",
  buttonText = "Tu bienestar comienza aquí",
  statsNumber = "+10k",
  statsLabel = "Pacientes Atendidos",
  images = DEFAULT_IMAGES,
  floatingIconName = "calendar",
  floatingIconBg = "bg-secondary",
  isInlineIcon = false
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

  return (
    <section className="relative pt-44 md:pt-32 pb-16 md:pb-20 overflow-hidden bg-white dark:bg-transparent transition-colors duration-300">


      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary text-white text-[10px] font-bold uppercase tracking-widest mb-8">
            <BadgeIcon size={14} fill="currentColor" className="text-secondary" /> {badgeText}
          </div>
          <h1 className="text-4xl md:text-7xl font-bold text-primary dark:text-slate-50 leading-[1.1] md:leading-[1] tracking-tighter mb-8">
            {titlePrefix} <br />
            <span className="text-secondary">{titleHighlight}</span>
          </h1>
          <p className="text-xl text-slate-500 dark:text-slate-400 font-medium max-w-md leading-relaxed mb-10">
            {description}
          </p>
          <div
            className="relative inline-flex cursor-pointer select-none group"
            onClick={() => {
              const el = document.getElementById('agendar');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            {/* Cuerpo del Botón principal con Degradado Premium */}
            <div className="bg-gradient-to-r from-primary to-[#1e3a8a] text-white px-8 sm:px-12 h-16 flex items-center justify-center gap-4 rounded-full text-sm sm:text-lg font-black tracking-tight shadow-xl shadow-black/10 transition-all duration-500 transform group-hover:-translate-y-1 group-active:scale-95 relative z-10 whitespace-nowrap">
              {buttonText}
              {isInlineIcon && (
                <div className={`w-10 h-10 rounded-full ${floatingIconBg} flex items-center justify-center text-primary shadow-sm shrink-0 group-hover:scale-110 group-hover:rotate-[10deg] transition-transform duration-500 mr-[-12px] ml-1`}>
                  <FloatingIcon size={18} strokeWidth={2.5} />
                </div>
              )}
            </div>

            {/* Icono Badge Flotante en la Esquina Superior Derecha (Solo si NO es Inline) */}
            {!isInlineIcon && (
              <div className={`absolute -top-3 -right-3 w-12 h-12 ${floatingIconBg} rounded-full flex items-center justify-center text-white shadow-lg transition-all duration-500 transform group-hover:-translate-y-1 group-hover:rotate-[-15deg] group-hover:scale-110 group-active:scale-95 z-20 border-4 border-white dark:border-slate-950`}>
                <FloatingIcon size={20} strokeWidth={2.5} />
              </div>
            )}
          </div>
        </motion.div>

        {/* Elemento Visual de Identidad: Slider de Sucursales / Especialidad */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="relative z-10 bg-slate-100 dark:bg-slate-900 rounded-[3rem] p-4 shadow-lg shadow-slate-200/50 dark:shadow-none border-8 border-white dark:border-slate-900 overflow-hidden aspect-[4/3]">
            <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden">
              <AnimatePresence initial={false}>
                <motion.img
                  key={currentImageIndex}
                  src={images[currentImageIndex].src}
                  alt={images[currentImageIndex].alt}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                  className="w-full h-full object-cover absolute inset-0"
                />
              </AnimatePresence>
            </div>

            {/* Indicador de Sucursal/Imagen Actual */}
            <div className="absolute top-8 left-8 right-8 z-20 flex justify-between items-start">
              <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-4 py-2 rounded-xl shadow-sm border border-white dark:border-slate-800 flex items-center gap-2">
                <MapPin size={16} className="text-secondary" />
                <span className="text-[11px] font-bold text-primary dark:text-slate-100 tracking-widest uppercase">
                  {images[currentImageIndex].location}
                </span>
              </div>

              {/* Puntos de paginación */}
              <div className="flex gap-2 bg-black/20 p-2 rounded-full backdrop-blur-sm">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImageIndex(i)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${i === currentImageIndex ? 'w-6 bg-white' : 'bg-white/50 hover:bg-white'
                      }`}
                  />
                ))}
              </div>
            </div>
          </div>
          {/* Badge flotante de confianza */}
          <div className="absolute -bottom-6 -left-6 bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-lg border border-slate-100 dark:border-slate-800 z-30">
            <p className="text-3xl font-bold text-primary dark:text-slate-50">{statsNumber}</p>
            <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">{statsLabel}</p>
          </div>

        </motion.div>
      </div>
    </section>
  );
};