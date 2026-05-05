"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Zap, ArrowRight, MapPin, Activity, HeartPulse, Sparkles, Brain } from 'lucide-react';

const ICON_MAP = {
  zap: Zap,
  sparkles: Sparkles,
  brain: Brain,
  heartPulse: HeartPulse,
  activity: Activity,
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
  buttonText = "Agendar una Cita",
  statsNumber = "+10k",
  statsLabel = "Pacientes Atendidos",
  images = DEFAULT_IMAGES
}: HeroProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const BadgeIcon = ICON_MAP[badgeIconName] || Zap;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 5000); // Cambia de imagen cada 5 segundos
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <section className="relative pt-24 md:pt-32 pb-16 md:pb-20 overflow-hidden bg-white">
      {/* Fondo sutil degradado */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-secondary/5 rounded-full blur-[150px] pointer-events-none -z-10" />

      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary text-white text-[10px] font-bold uppercase tracking-widest mb-8">
            <BadgeIcon size={14} fill="currentColor" className="text-secondary" /> {badgeText}
          </div>
          <h1 className="text-4xl md:text-7xl font-bold text-primary leading-[1.1] md:leading-[1] tracking-tighter mb-8">
            {titlePrefix} <br />
            <span className="text-secondary">{titleHighlight}</span>
          </h1>
          <p className="text-xl text-slate-500 font-medium max-w-md leading-relaxed mb-10">
            {description}
          </p>
          <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white rounded-2xl px-10 h-16 text-lg font-bold shadow-md transition-all hover:scale-105">
            {buttonText}
            <ArrowRight className="ml-2" />
          </Button>
        </motion.div>

        {/* Elemento Visual de Identidad: Slider de Sucursales / Especialidad */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="relative z-10 bg-slate-100 rounded-[3rem] p-4 shadow-lg shadow-slate-200/50 border-8 border-white overflow-hidden aspect-[4/3]">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentImageIndex}
                src={images[currentImageIndex].src}
                alt={images[currentImageIndex].alt}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                className="rounded-[2.5rem] w-full h-full object-cover absolute inset-0 p-4"
              />
            </AnimatePresence>

            {/* Indicador de Sucursal/Imagen Actual */}
            <div className="absolute top-8 left-8 right-8 z-20 flex justify-between items-start">
              <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl shadow-sm border border-white flex items-center gap-2">
                <MapPin size={16} className="text-secondary" />
                <span className="text-[11px] font-bold text-primary tracking-widest uppercase">
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
          <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-3xl shadow-lg border border-slate-100 z-30">
            <p className="text-3xl font-bold text-primary">{statsNumber}</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{statsLabel}</p>
          </div>

        </motion.div>
      </div>
    </section>
  );
};