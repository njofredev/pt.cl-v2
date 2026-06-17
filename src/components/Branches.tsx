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
    mapLink: 'https://maps.app.goo.gl/WoWQ6CKgtLpBphgr9',
    hours: 'Lunes a viernes: 9:00 - 13:00 y 14:00 - 18:30',
    contact: {
      phone: '+562 2217 2635',
      whatsapp: '+569 6618 7736',
      email: 'secretaria@policlinicotabancura.cl',
      emails: ['secretaria@policlinicotabancura.cl']
    },
    image: '/Sucursales/sucursal_tribunales.webp',
    embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3330.550348530835!2d-70.5624518243113!3d-33.38279869340229!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662cf2f9e4c351b%3A0xed2752c723e031!2sLos%20Tribunales%201268%2C%207630442%20Vitacura%2C%20Regi%C3%B3n%20Metropolitana!5e0!3m2!1ses-419!2scl!4v1715294000000!5m2!1ses-419!2scl'
  },
  {
    id: 'vitacura',
    name: 'Sucursal Vitacura',
    address: 'Avenida Vitacura #8620, Vitacura. Santiago',
    mapLink: 'https://maps.app.goo.gl/L3TNhpYTvyNwCqdS6',
    hours: 'Lunes a viernes: 8:30 - 20:00 y Sábados: 9:00 - 13:00',
    contact: {
      phone: '+562 2933 6740',
      whatsapp: '+569 6578 1253',
      email: 'recepcionmedica@policlinicotabancura.cl',
      emails: [
        'recepciondental@policlinicotabancura.cl',
        'recepcionmedica@policlinicotabancura.cl'
      ]
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
                <div className="flex flex-col gap-3 w-full">
                  {/* Phones */}
                  <div className="bg-[#162158] text-white rounded-xl p-3 flex flex-col justify-center items-center min-h-[64px] shadow-sm">
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-300 flex items-center gap-1 mb-0.5">
                      <Phone size={10} /> Teléfonos
                    </span>
                    <div className="flex flex-col text-xs font-bold leading-tight">
                      <a href={`tel:${branch.contact.phone.replace(/\s/g, '')}`} className="hover:text-[#259CF4] transition-colors">
                        {branch.contact.phone}
                      </a>
                      <a href={`https://wa.me/${branch.contact.whatsapp.replace(/\+/g, '').replace(/\s/g, '')}`} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">
                        {branch.contact.whatsapp} (WhatsApp)
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="bg-[#162158] text-white rounded-xl p-3 flex flex-col justify-center items-center min-h-[64px] shadow-sm">
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-300 flex items-center gap-1 mb-0.5">
                      <Mail size={10} /> Email
                    </span>
                    <div className="flex flex-col gap-1 text-xs font-bold leading-tight w-full justify-center items-center">
                      {branch.contact.emails.map((email) => (
                        <a key={email} href={`mailto:${email}`} className="hover:text-[#259CF4] transition-colors break-all text-center">
                          {email}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button: Get Directions */}
              <a
                href={branch.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#162158] hover:bg-[#111827] text-white font-bold py-3.5 px-6 rounded-xl transition-all duration-300 shadow-md flex items-center justify-center gap-2.5 cursor-pointer text-sm tracking-wide group"
              >
                <svg className="w-4 h-4 shrink-0 transition-transform group-hover:scale-110 bg-white rounded-full p-0.5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                <span>Ver en Google Maps</span>
                <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
