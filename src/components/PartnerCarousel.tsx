"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

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

// Duplicamos para asegurar que el scroll infinito sea fluido con la animación CSS
const INFINITE_PARTNERS = [...PARTNERS, ...PARTNERS];

export function PartnerCarousel() {
  return (
    <div 
      className="relative w-full overflow-hidden py-4 group [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
    >
      {/* Contenedor del Carrusel con Animación CSS Marquee y velocidad reducida a 80s (más pausada y legible) */}
      <div 
        className="flex w-fit animate-marquee hover:[animation-play-state:paused] py-4"
        style={{ animationDuration: '80s' }}
      >
        {INFINITE_PARTNERS.map((partner, i) => (
          <Link
            key={i}
            href="/convenios"
            className="relative shrink-0 h-14 w-28 md:h-20 md:w-40 transition-all duration-700 hover:scale-110 mx-10 md:mx-16 block group"
          >
            <Image 
              src={`/logos_convenios_prevision/${partner.file}`} 
              alt={partner.name} 
              fill
              sizes="160px"
              className="object-contain opacity-50 grayscale dark:invert group-hover:opacity-100 group-hover:grayscale-0 group-hover:invert-0 dark:group-hover:invert-0 transition-all duration-700 cursor-pointer dark:drop-shadow-[0_0_3px_rgba(255,255,255,0.15)]" 
              priority={i < 3}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
