"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

const PARTNERS = [
  { name: 'Fonasa', file: 'fonasa.png' },
  { name: 'Banmédica', file: 'banmedica.png' },
  { name: 'Vida Tres', file: 'vidatres.png' },
  { name: 'Mi Vita', file: 'mivita.png' },
  { name: 'Amanda Labarca', file: 'amanda_labarca.png' },
  { name: 'Antártica Chilena', file: 'antartica_chilena.png' },
  { name: 'Betterland', file: 'betterland.png' },
  { name: 'Colegio Everest', file: 'colegio_everest.png' },
  { name: 'Mra Luisa Bombal', file: 'mraluisabombal.png' },
  { name: 'Sirio', file: 'sirio.png' },
  { name: 'Sta Ursula', file: 'staursula.png' },
  { name: 'UTFSM', file: 'utfsm.png' },
];

// Triplicamos para asegurar que el scroll infinito sea fluido
const INFINITE_PARTNERS = [...PARTNERS, ...PARTNERS, ...PARTNERS];

export function PartnerCarousel() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Lógica de Scroll Infinito sin saltos visuales
  const handleScroll = () => {
    if (!carouselRef.current) return;
    const { scrollLeft, scrollWidth } = carouselRef.current;
    const singleSetWidth = scrollWidth / 3;

    if (scrollLeft >= singleSetWidth * 2) {
      carouselRef.current.scrollLeft = scrollLeft - singleSetWidth;
    }
    if (scrollLeft <= 0) {
      carouselRef.current.scrollLeft = singleSetWidth;
    }
  };

  useEffect(() => {
    if (carouselRef.current) {
      const singleSetWidth = carouselRef.current.scrollWidth / 3;
      carouselRef.current.scrollLeft = singleSetWidth;
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused && carouselRef.current) {
        carouselRef.current.scrollBy({ left: 1, behavior: "auto" });
      }
    }, 20); // Velocidad de giro constante

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <div 
      className="relative w-full overflow-hidden py-4 group [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >

      {/* Contenedor del Carrusel */}
      <div 
        ref={carouselRef}
        onScroll={handleScroll}
        className="flex gap-20 md:gap-32 overflow-x-auto hide-scrollbar items-center py-4 select-none"
        style={{ scrollBehavior: 'auto' }}
      >
        {INFINITE_PARTNERS.map((partner, i) => (
          <div
            key={i}
            className="shrink-0 transition-all duration-700 hover:scale-150"
          >
            <img 
              src={`/logos_convenios_prevision/${partner.file}`} 
              className="h-14 md:h-20 w-auto object-contain opacity-50 grayscale hover:opacity-100 hover:grayscale-0 dark:opacity-60 dark:invert transition-all duration-700 cursor-pointer" 
              alt={partner.name} 
            />
          </div>
        ))}
      </div>
    </div>
  );
}
