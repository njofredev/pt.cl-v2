"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  MapPin,
  Clock,
  Phone,
  Mail,
  MessageCircle,
  ChevronRight,
  Navigation,
  Building2
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import Image from 'next/image';

const branches = [
  {
    id: 'tribunales',
    name: 'Sucursal Los Tribunales',
    address: 'Calle Los Tribunales #1268, Vitacura, Santiago',
    mapLink: 'https://www.google.com/maps/search/?api=1&query=Calle+Los+Tribunales+1268+Vitacura',
    hours: [
      { day: 'Lunes a Viernes', time: '09:00am - 13:00pm y 14:00pm - 18:30pm' }
    ],
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
    address: 'Avenida Vitacura #8620, Vitacura, Santiago',
    mapLink: 'https://www.google.com/maps/search/?api=1&query=Avenida+Vitacura+8620+Vitacura',
    hours: [
      { day: 'Lunes a Viernes', time: '08:30am - 20:00pm' },
      { day: 'Sábados', time: '09:00am - 13:00pm' }
    ],
    contact: {
      phone: '+562 2933 6740',
      whatsapp: '+569 6578 1253',
      emails: [
        { label: 'Dental', address: 'recepciondental@policlinicotabancura.cl' },
        { label: 'Médica', address: 'recepcionmedica@policlinicotabancura.cl' }
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
    <section id="sucursales" className="py-16 bg-transparent dark:bg-transparent transition-colors duration-300">
      <div className="container mx-auto px-6">
        <div className="bg-primary rounded-[2.5rem] sm:rounded-[3rem] md:rounded-[4rem] p-6 sm:p-8 md:p-16 lg:p-20 text-white relative overflow-hidden shadow-2xl border border-white/5">
          {/* Background Orbs */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[150px] -z-0 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[120px] -z-0 pointer-events-none" />

          <div className="relative z-10">
            {/* Header - Rediseñado para optimizar espacio vertical */}
            <div className="max-w-3xl mb-12">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-emerald-300 text-[10px] sm:text-[11px] font-bold uppercase tracking-widest mb-6 border border-white/5 shadow-inner"
              >
                <MapPin size={14} className="shrink-0 text-emerald-300" /> ¡Visítanos!
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 tracking-tight leading-tight sm:leading-none"
              >
                Conoce nuestros centros <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-teal-400">médicos y dentales.</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-slate-200 text-base md:text-lg leading-relaxed font-medium max-w-xl"
              >
                Dos ubicaciones estratégicas en Vitacura para brindarte la mejor atención profesional y humana.
              </motion.p>
            </div>

            {/* Branches Grid */}
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-10">
              {branches.map((branch, index) => (
                <motion.div
                  key={branch.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  className="group relative bg-gradient-to-b from-white/[0.07] to-white/[0.02] backdrop-blur-md rounded-[2.5rem] border border-white/10 p-5 sm:p-7 md:p-9 hover:from-white/[0.1] hover:to-white/[0.03] hover:border-white/20 transition-all duration-500 flex flex-col shadow-xl shadow-black/5"
                >
                  <div className="flex flex-col h-full">
                    {/* Header: Icon + Name/Address + External Direction Link */}
                    <div className="flex justify-between items-start mb-8 gap-4">
                      <div className="flex items-start gap-4">
                        <div className="p-3.5 bg-secondary/20 rounded-2xl shrink-0 text-secondary shadow-md border border-secondary/10 group-hover:scale-105 transition-transform duration-500">
                          <Building2 size={24} strokeWidth={2} />
                        </div>
                        <div className="flex flex-col">
                          <h3 className="text-xl md:text-2xl lg:text-3xl font-black tracking-tight mb-1.5 text-white group-hover:text-secondary transition-colors duration-300">
                            {branch.name}
                          </h3>
                          <div className="flex items-start gap-1.5 text-slate-300/90 group/addr">
                            <MapPin size={15} className="text-secondary shrink-0 mt-0.5" />
                            <span className="text-[13px] sm:text-[14px] font-semibold leading-snug tracking-wide transition-colors group-hover/addr:text-white">
                              {branch.address}
                            </span>
                          </div>
                        </div>
                      </div>

                      <a
                        href={branch.mapLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3.5 bg-white/5 rounded-full hover:bg-secondary hover:text-primary hover:scale-110 transition-all duration-300 border border-white/5 hover:border-secondary shrink-0 group/btn-map"
                        title="Abrir en Google Maps"
                      >
                        <Navigation size={18} className="group-hover/btn-map:animate-pulse" />
                      </a>
                    </div>

                    {/* Image Container / Map Iframe */}
                    <div className="relative group/img w-full h-[200px] sm:h-[240px] md:h-[260px] mb-8 overflow-hidden rounded-[1.75rem] bg-slate-900/80 border border-white/5 shadow-2xl">
                      {activeMaps[branch.id] ? (
                        <div className="w-full h-full relative animate-in fade-in duration-300">
                          <iframe
                            src={branch.embedUrl}
                            className="w-full h-full border-0 grayscale opacity-90 invert contrast-125 scale-105"
                            style={{ filter: "invert(90%) hue-rotate(180deg)" }}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title={branch.name}
                          />
                          <button
                            onClick={() => toggleMap(branch.id)}
                            className="absolute top-4 right-4 bg-primary/90 hover:bg-secondary text-white hover:text-primary px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all shadow-xl border border-white/10 backdrop-blur-md hover:scale-105 active:scale-95 z-20"
                          >
                            Cerrar Mapa
                          </button>
                        </div>
                      ) : (
                        <>
                          <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/20 to-transparent z-10 transition-opacity duration-500 group-hover/img:opacity-50" />
                          <div className="relative w-full h-full">
                            <Image
                              src={branch.image}
                              alt={branch.name}
                              fill
                              className="object-cover group-hover/img:scale-110 transition-transform duration-700 ease-out"
                              sizes="(max-width: 640px) 100vw, 320px"
                            />
                          </div>
                          {/* Overlay Badge / CTA Inside Card */}
                          <div className="absolute bottom-4 right-4 z-20">
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                toggleMap(branch.id);
                              }}
                              className="bg-white text-primary hover:bg-secondary hover:text-primary font-bold text-[12px] px-4.5 py-2.5 rounded-xl flex items-center justify-center gap-2 shadow-[0_10px_30px_rgba(0,0,0,0.2)] hover:scale-105 active:scale-95 transition-all border border-transparent hover:border-white/20 group/badge-cta"
                            >
                              <MapPin size={14} className="shrink-0 text-secondary group-hover/badge-cta:text-primary transition-colors" />
                              <span className="leading-none uppercase tracking-wider font-black text-[11px]">Ver Mapa</span>
                            </button>
                          </div>
                        </>
                      )}
                    </div>

                    {/* Time / Horarios Box packaged beautifully */}
                    <div className="mb-8">
                      <div className="flex gap-4 items-center bg-white/[0.04] rounded-2xl p-4.5 border border-white/5 group-hover:border-secondary/20 group-hover:bg-white/[0.06] transition-all duration-300">
                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-secondary shrink-0 shadow-inner">
                          <Clock size={18} />
                        </div>
                        <div className="flex flex-col md:flex-row md:items-center gap-x-3 gap-y-1">
                          <span className="text-[10px] font-black uppercase tracking-widest text-slate-300 shrink-0">Horarios de Atención:</span>
                          <div className="text-slate-200 text-[13px] sm:text-[14px] font-semibold">
                            {branch.hours.map((h, i) => (
                              <React.Fragment key={i}>
                                <span className="text-secondary font-bold mr-1">{h.day}:</span>
                                <span className="font-medium text-white/90">{h.time}</span>
                                {i < branch.hours.length - 1 && <span className="mx-2 text-white/10 hidden md:inline">|</span>}
                                {i < branch.hours.length - 1 && <br className="md:hidden" />}
                              </React.Fragment>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Contact Cards Grid - packaged in Tiles */}
                    <div className="space-y-6 pt-6 border-t border-white/10 mt-auto">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <span className="block text-[10px] font-black uppercase tracking-widest text-slate-300">Contacto Rápido</span>
                          <div className="flex flex-col gap-2.5">
                            <a
                              href={`tel:${branch.contact.phone.replace(/\s/g, '')}`}
                              className="flex items-center gap-3 p-3 bg-white/[0.04] hover:bg-white/[0.08] border border-white/5 hover:border-white/10 rounded-xl text-[13px] font-bold text-slate-200 hover:text-white transition-all group/link"
                            >
                              <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center text-secondary shrink-0 group-hover/link:bg-secondary group-hover/link:text-primary transition-colors duration-300 shadow-sm">
                                <Phone size={14} />
                              </div>
                              <span className="tracking-wide">{branch.contact.phone}</span>
                            </a>
                            <a
                              href={`https://wa.me/${branch.contact.whatsapp.replace(/\+/g, '').replace(/\s/g, '')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-3 p-3 bg-white/[0.04] hover:bg-white/[0.08] border border-white/5 hover:border-white/10 rounded-xl text-[13px] font-bold text-slate-200 hover:text-white transition-all group/link"
                            >
                              <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center text-secondary shrink-0 group-hover/link:bg-emerald-500 group-hover/link:text-white transition-colors duration-300 shadow-sm">
                                <MessageCircle size={15} />
                              </div>
                              <span className="tracking-wide">WhatsApp Sucursal</span>
                            </a>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <span className="block text-[10px] font-black uppercase tracking-widest text-slate-400">Soporte / Emails</span>
                          <div className="flex flex-col gap-2.5">
                            {branch.contact.emails ? (
                              branch.contact.emails.map((e: any, i: number) => (
                                <a
                                  key={i}
                                  href={`mailto:${e.address}`}
                                  className="flex items-center gap-3 p-3 bg-white/[0.04] hover:bg-white/[0.08] border border-white/5 hover:border-white/10 rounded-xl text-[12px] sm:text-[13px] font-bold text-slate-300 hover:text-white transition-all group/link overflow-hidden"
                                >
                                  <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center text-secondary shrink-0 group-hover/link:bg-secondary group-hover/link:text-primary transition-colors duration-300">
                                    <Mail size={14} />
                                  </div>
                                  <div className="flex flex-col min-w-0 flex-1">
                                    <span className="text-secondary text-[9px] uppercase tracking-widest font-black opacity-80">{e.label}</span>
                                    <span className="truncate font-semibold tracking-wide text-white/90">{e.address}</span>
                                  </div>
                                </a>
                              ))
                            ) : (
                              <a
                                href={`mailto:${branch.contact.email}`}
                                className="flex items-center gap-3 p-3 bg-white/[0.04] hover:bg-white/[0.08] border border-white/5 hover:border-white/10 rounded-xl text-[12px] sm:text-[13px] font-bold text-slate-300 hover:text-white transition-all group/link overflow-hidden"
                              >
                                <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center text-secondary shrink-0 group-hover/link:bg-secondary group-hover/link:text-primary transition-colors duration-300">
                                  <Mail size={14} />
                                </div>
                                <div className="flex flex-col min-w-0 flex-1">
                                  <span className="text-secondary text-[9px] uppercase tracking-widest font-black opacity-80">Email General</span>
                                  <span className="truncate font-semibold tracking-wide text-white/90">{branch.contact.email}</span>
                                </div>
                              </a>
                            )}
                          </div>
                        </div>
                      </div>

                      <Button
                        variant="outline"
                        className="w-full bg-transparent border-white/10 text-white hover:bg-secondary hover:text-primary hover:border-secondary rounded-2xl h-14 font-black text-[13px] uppercase tracking-widest transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:scale-98 group/btn"
                        asChild
                      >
                        <a href={branch.mapLink} target="_blank" rel="noopener noreferrer">
                          OBTENER INDICACIONES <ChevronRight size={16} className="ml-2 group-hover/btn:translate-x-1.5 transition-transform duration-300" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
