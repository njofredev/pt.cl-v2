"use client";

import React from 'react';
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
    image: '/Sucursales/sucursal_tribunales.webp'
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
    image: '/Sucursales/sucursal_maps.webp'
  }
];

export const Branches = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="bg-primary rounded-[2.5rem] md:rounded-[4rem] p-8 md:p-20 text-white relative overflow-hidden shadow-2xl">
          {/* Background Orbs */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[150px] -z-0" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[120px] -z-0" />

          <div className="relative z-10">
            {/* Header */}
            <div className="max-w-3xl mb-16">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-secondary text-[11px] font-bold uppercase tracking-widest mb-8 border border-white/5"
              >
                <MapPin size={14} /> Presencia Local
              </motion.div>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-6xl font-bold mb-8 leading-[0.9] tracking-tighter"
              >
                Conoce nuestros centros <br /> 
                <span className="text-secondary">médicos y dentales.</span>
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-slate-300 text-xl md:text-2xl leading-relaxed font-medium max-w-xl"
              >
                Dos ubicaciones estratégicas en Vitacura para brindarte la mejor atención profesional y humana.
              </motion.p>
            </div>

            {/* Branches Grid */}
            <div className="grid lg:grid-cols-2 gap-10">
              {branches.map((branch, index) => (
                <motion.div
                  key={branch.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="group relative bg-white/5 backdrop-blur-sm rounded-[2rem] border border-white/10 p-6 md:p-8 hover:bg-white/[0.08] transition-all duration-500 overflow-hidden flex flex-col"
                >
                  <div className="flex flex-col h-full">
                    {/* Header: Icon + Name/Address + Map Link */}
                    <div className="flex justify-between items-start mb-8">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-secondary/20 rounded-xl shrink-0">
                          <Building2 className="text-secondary" size={24} />
                        </div>
                        <div className="flex flex-col">
                          <h3 className="text-xl md:text-3xl font-bold tracking-tight group-hover:text-secondary transition-colors mb-1">
                            {branch.name}
                          </h3>
                          <div className="flex items-center gap-1.5 text-slate-400">
                            <MapPin size={14} className="text-secondary" />
                            <span className="text-[14px] md:text-[15px] font-medium leading-tight">{branch.address}</span>
                          </div>
                        </div>
                      </div>
                      <a 
                        href={branch.mapLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-4 bg-white/10 rounded-full hover:bg-secondary hover:text-primary transition-all duration-300 border border-white/10 shrink-0 ml-2"
                      >
                        <Navigation size={20} />
                      </a>
                    </div>

                    {/* Image Area */}
                    <div className="relative group/img w-full h-[260px] mb-8">
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent z-10 rounded-2xl opacity-40 group-hover/img:opacity-10 transition-opacity" />
                      <img 
                        src={branch.image} 
                        alt={branch.name} 
                        className="w-full h-full object-cover rounded-2xl grayscale group-hover/img:grayscale-0 transition-all duration-700" 
                      />
                    </div>

                    {/* Information Grid */}
                    <div className="mb-8">
                      <div className="flex gap-4 items-center bg-white/5 rounded-2xl p-4 border border-white/5 group-hover:border-secondary/20 transition-colors">
                        <Clock className="text-secondary shrink-0" size={20} />
                        <div className="flex flex-col md:flex-row md:items-center gap-x-4 gap-y-1">
                          <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Horarios:</span>
                          <p className="text-slate-200 text-[14px] md:text-[15px] font-medium">
                            {branch.hours.map((h, i) => (
                              <React.Fragment key={i}>
                                <span className="text-secondary font-bold mr-1">{h.day}:</span>
                                {h.time}
                                {i < branch.hours.length - 1 && <span className="mx-3 text-white/20 hidden md:inline">|</span>}
                                {i < branch.hours.length - 1 && <br className="md:hidden" />}
                              </React.Fragment>
                            ))}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Contact & CTA Section */}
                    <div className="space-y-6 pt-6 border-t border-white/5 mt-auto">
                      <div className="grid sm:grid-cols-2 gap-6">
                        <div className="space-y-4">
                           <span className="block text-[11px] font-bold uppercase tracking-widest text-slate-400">Contacto Directo</span>
                           <div className="flex flex-col gap-3">
                            <a 
                              href={`tel:${branch.contact.phone.replace(/\s/g, '')}`}
                              className="flex items-center gap-3 text-[14px] md:text-[15px] font-medium text-slate-300 hover:text-white transition-colors group/link"
                            >
                              <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center group-hover/link:bg-secondary/20 transition-colors">
                                <Phone size={14} className="text-secondary" />
                              </div>
                              {branch.contact.phone}
                            </a>
                            <a 
                              href={`https://wa.me/${branch.contact.whatsapp.replace(/\+/g, '').replace(/\s/g, '')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-3 text-[14px] md:text-[15px] font-medium text-slate-300 hover:text-white transition-colors group/link"
                            >
                              <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center group-hover/link:bg-secondary/20 transition-colors">
                                <MessageCircle size={14} className="text-secondary" />
                              </div>
                              WhatsApp
                            </a>
                           </div>
                        </div>
                        
                        <div className="space-y-4">
                          <span className="block text-[11px] font-bold uppercase tracking-widest text-slate-400">Canales Digitales</span>
                          <div className="flex flex-col gap-3">
                            {branch.contact.emails ? (
                              branch.contact.emails.map((e: any, i: number) => (
                                <a 
                                  key={i}
                                  href={`mailto:${e.address}`}
                                  className="flex items-center gap-3 text-[13px] md:text-[14px] font-medium text-slate-400 hover:text-white transition-colors truncate group/link"
                                >
                                  <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center group-hover/link:bg-secondary/20 transition-colors">
                                    <Mail size={14} className="text-secondary shrink-0" />
                                  </div>
                                  <div className="flex flex-col">
                                    <span className="text-white/40 text-[9px] uppercase tracking-tighter">{e.label}</span>
                                    <span className="truncate">{e.address}</span>
                                  </div>
                                </a>
                              ))
                            ) : (
                              <a 
                                href={`mailto:${branch.contact.email}`}
                                className="flex items-center gap-3 text-[13px] md:text-[14px] font-medium text-slate-400 hover:text-white transition-colors truncate group/link"
                              >
                                <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center group-hover/link:bg-secondary/20 transition-colors">
                                  <Mail size={14} className="text-secondary shrink-0" />
                                </div>
                                {branch.contact.email}
                              </a>
                            )}
                          </div>
                        </div>
                      </div>

                      <Button 
                        variant="outline" 
                        className="w-full border-white/10 text-white hover:bg-secondary hover:text-primary hover:border-secondary rounded-2xl h-16 font-bold text-[15px] transition-all group/btn"
                        asChild
                      >
                        <a href={branch.mapLink} target="_blank" rel="noopener noreferrer">
                          OBTENER INDICACIONES <ChevronRight size={20} className="ml-2 group-hover/btn:translate-x-2 transition-transform" />
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
