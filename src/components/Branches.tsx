"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  MapPin,
  Clock,
  Phone,
  Mail,
  Navigation,
  ChevronRight
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import Image from 'next/image';

const branches = [
  {
    id: 'tribunales',
    name: 'Sucursal Casa Matriz',
    address: 'Calle Los Tribunales #1268, Vitacura. Santiago',
    mapLink: 'https://www.google.com/maps/search/?api=1&query=Calle+Los+Tribunales+1268+Vitacura',
    hours: 'Lunes a viernes: 9:00 - 13:00 y 14:00 - 18:30',
    contact: {
      phone: '+562 2217 2635',
      whatsapp: '+569 6618 7736',
      email: 'secretaria@policlinicotabancura.cl'
    },
    image: '/Sucursales/sucursal_tribunales.webp',
    embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3330.550348530835!2d-70.5624518243113!3d-33.38279869340229!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662cf2f9e4c351b%3A0xed2752c723e031!2sLos%20Tribunales%201268%2C%207630442%20Vitacura%2C%20Regi%C3%B3n%20Metropolitana!5e0!3m2!1ses-419!2scl!4v1715294000000!5m2!1ses-419!2scl'
  },
  {
    id: 'vitacura',
    name: 'Sucursal Vitacura',
    address: 'Avenida Vitacura #8620, Vitacura. Santiago',
    mapLink: 'https://www.google.com/maps/search/?api=1&query=Avenida+Vitacura+8620+Vitacura',
    hours: 'Lunes a viernes: 8:30 - 20:00 y Sábados: 9:00 - 13:00',
    contact: {
      phone: '+562 2933 6740',
      whatsapp: '+569 6578 1253',
      email: 'recepcionmedica@policlinicotabancura.cl'
    },
    image: '/Sucursales/sucursal_maps.webp',
    embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3330.7288989075495!2d-70.5602714!3d-33.3781667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662cf2e53286e2d%3A0x8328594285bd1bc1!2sAv.%20Vitacura%208620%2C%20Vitacura%2C%20Regi%C3%B3n%20Metropolitana!5e0!3m2!1ses-419!2scl!4v1715294100000!5m2!1ses-419!2scl'
  }
];

export const Branches = () => {
  const [activeMaps, setActiveMaps] = useState<Record<string, boolean>>({});

  const toggleMap = (id: string) => {
    setActiveMaps(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <section id="sucursales" className="py-20 bg-[#162158] text-white scroll-mt-24 transition-all duration-300">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Title */}
        <div className="mb-12 text-center lg:text-left">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight max-w-2xl">
            Conoce nuestros centros médicos y dentales
          </h2>
        </div>

        {/* Branches Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {branches.map((branch) => (
            <div
              key={branch.id}
              className="bg-[#e8effe] text-[#162158] rounded-[2.5rem] p-6 sm:p-8 flex flex-col items-center text-center shadow-2xl relative overflow-hidden"
            >
              {/* Branch Header */}
              <h3 className="text-2xl sm:text-3xl font-black mb-1.5">
                {branch.name}
              </h3>
              <p className="text-xs sm:text-sm font-medium text-slate-600 mb-6">
                {branch.address}
              </p>

              {/* Image / Map Frame Container */}
              <div className="relative w-full h-[180px] sm:h-[220px] mb-6 overflow-hidden rounded-[2rem] bg-slate-900 border border-slate-200/50 shadow-md">
                {activeMaps[branch.id] ? (
                  <div className="w-full h-full relative">
                    <iframe
                      src={branch.embedUrl}
                      className="w-full h-full border-0"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title={branch.name}
                    />
                    <button
                      onClick={() => toggleMap(branch.id)}
                      className="absolute top-3 right-3 bg-[#162158] hover:bg-[#111827] text-white px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest transition-all shadow-md z-20 cursor-pointer"
                    >
                      Cerrar Mapa
                    </button>
                  </div>
                ) : (
                  <div className="relative w-full h-full group/img">
                    <Image
                      src={branch.image}
                      alt={branch.name}
                      fill
                      className="object-cover group-hover/img:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, 400px"
                    />
                    <button
                      onClick={() => toggleMap(branch.id)}
                      className="absolute bottom-3 right-3 bg-[#162158] hover:bg-[#111827] text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-md flex items-center gap-1.5 z-20 cursor-pointer"
                    >
                      <MapPin size={12} />
                      Ver Mapa
                    </button>
                  </div>
                )}
              </div>

              {/* Info Tiles */}
              <div className="w-full space-y-3 mb-6">
                {/* Hours Box */}
                <div className="bg-[#162158] text-white rounded-xl p-3 flex flex-col justify-center items-center min-h-[56px] shadow-sm">
                  <span className="text-[9px] font-black uppercase tracking-widest text-slate-300 flex items-center gap-1 mb-0.5">
                    <Clock size={10} /> Horarios de atención
                  </span>
                  <span className="text-xs font-bold leading-tight">
                    {branch.hours}
                  </span>
                </div>

                {/* Contact Box (Phone & Whatsapp) & Email Box Row */}
                <div className="grid sm:grid-cols-2 gap-3 w-full">
                  {/* Left: Phones */}
                  <div className="bg-[#162158] text-white rounded-xl p-3 flex flex-col justify-center items-center min-h-[64px] shadow-sm">
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-300 flex items-center gap-1 mb-0.5">
                      <Phone size={10} /> Teléfonos
                    </span>
                    <div className="flex flex-col text-xs font-bold leading-tight">
                      <a href={`tel:${branch.contact.phone.replace(/\s/g, '')}`} className="hover:text-[#259CF4] transition-colors">
                        {branch.contact.phone}
                      </a>
                      <a href={`https://wa.me/${branch.contact.whatsapp.replace(/\+/g, '').replace(/\s/g, '')}`} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">
                        {branch.contact.whatsapp} (WA)
                      </a>
                    </div>
                  </div>

                  {/* Right: Email */}
                  <div className="bg-[#162158] text-white rounded-xl p-3 flex flex-col justify-center items-center min-h-[64px] shadow-sm overflow-hidden">
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-300 flex items-center gap-1 mb-0.5">
                      <Mail size={10} /> Email
                    </span>
                    <a href={`mailto:${branch.contact.email}`} className="text-xs font-bold leading-tight hover:text-[#259CF4] transition-colors truncate w-full px-1">
                      {branch.contact.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Action Button: Get Directions */}
              <a
                href={branch.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#162158] hover:bg-[#111827] text-white font-bold py-3.5 px-6 rounded-xl transition-all duration-300 shadow-md flex items-center justify-center gap-2 cursor-pointer text-sm tracking-wide"
              >
                <span>Obtener indicaciones</span>
                <ChevronRight size={16} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
