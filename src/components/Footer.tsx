"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Activity, Instagram, Facebook, MapPin, Phone, Mail, MessageCircle, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TikTokIcon = ({ size = 18, className = "" }: { size?: number, className?: string }) => (
  <svg width={size} height={size} fill="currentColor" viewBox="0 0 24 24" className={className}>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z" />
  </svg>
);

const WhatsAppIcon = ({ size = 18, className = "" }: { size?: number, className?: string }) => (
  <svg width={size} height={size} fill="currentColor" viewBox="0 0 24 24" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

interface FooterSectionProps {
  title: string;
  links: { name: string; href: string }[];
}

const FooterSection = ({ title, links }: FooterSectionProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-slate-100 dark:border-white/5 md:border-none">
      {/* Versión Desktop */}
      <div className="hidden md:block">
        <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-secondary mb-8">{title}</h4>
        <ul className="space-y-4">
          {links.map((item) => (
            <li key={item.name}>
              <Link href={item.href} className="text-slate-500 dark:text-slate-300 hover:text-primary dark:hover:text-white transition-colors font-medium text-sm sm:text-base">{item.name}</Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Versión Mobile Accordion */}
      <div className="md:hidden py-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between text-left group cursor-pointer"
        >
          <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-secondary">{title}</h4>
          <ChevronDown 
            size={16} 
            className={`text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-secondary' : ''}`} 
          />
        </button>
        
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <ul className="pt-4 pb-2 space-y-3">
                {links.map((item) => (
                  <li key={item.name}>
                    <Link 
                      href={item.href} 
                      className="text-slate-500 dark:text-slate-300 active:text-secondary transition-colors font-medium text-sm block py-1"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export const Footer = () => {
  return (
    <footer className="bg-white dark:bg-transparent text-slate-900 dark:text-white pt-20 md:pt-24 pb-12 transition-colors duration-300 border-t border-slate-100 dark:border-none relative z-10">
      <div className="container mx-auto px-6">
        {/* La grilla en mobile ya no usará gap-y-16 completo, lo dejaremos adaptado */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-x-8 gap-y-8 md:gap-y-16 mb-24">
          {/* Brand & Mission */}
          <div className="space-y-6 mb-4 md:mb-0">
            <Link href="/" className="flex items-center gap-3">
              <img src="/logo.svg" alt="Logo" className="h-12 w-auto dark:brightness-0 dark:invert" />
            </Link>
            <p className="text-slate-500 dark:text-slate-300 font-medium leading-relaxed text-sm sm:text-base">
              Tecnología y cuidado humano al servicio de tu salud. Más de 20 años innovando en medicina integral.
            </p>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/politabancura/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-slate-100 dark:bg-white/10 rounded-full flex items-center justify-center text-slate-500 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/20 hover:text-secondary transition-all group">
                <Instagram size={18} className="group-hover:scale-110 transition-transform" />
              </a>
              <a href="https://www.facebook.com/profile.php?id=61568214167163" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-slate-100 dark:bg-white/10 rounded-full flex items-center justify-center text-slate-500 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/20 hover:text-secondary transition-all group">
                <Facebook size={18} className="group-hover:scale-110 transition-transform" />
              </a>
              <a href="https://www.tiktok.com/@politabancura" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-slate-100 dark:bg-white/10 rounded-full flex items-center justify-center text-slate-500 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/20 hover:text-secondary transition-all group">
                <TikTokIcon size={18} className="group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>

          {/* Site Map: Nosotros */}
          <FooterSection 
            title="Institucional"
            links={[
              { name: 'Inicio', href: '/' },
              { name: 'Quiénes Somos', href: '/nosotros' },
              { name: 'Derechos y Deberes', href: '/derechos-y-deberes' },
              { name: 'Misión y Visión', href: '/nosotros#mision' },
              { name: 'Equipo Médico', href: '/nosotros#equipo' },
              { name: 'Convenios', href: '/#convenios' },
              { name: 'Preguntas Frecuentes', href: '#' }
            ]}
          />

          {/* Site Map: Servicios */}
          <FooterSection 
            title="Servicios"
            links={[
              { name: 'Salud Dental', href: '/servicios/dental' },
              { name: 'Salud Mental', href: '/servicios/mental' },
              { name: 'Medicina General', href: '/servicios/medicina' },
              { name: 'Terapias Complementarias', href: '/servicios/terapias' },
              { name: 'Toma de Muestras', href: '/servicios/medicina' }
            ]}
          />

          {/* Site Map: Novedades */}
          <FooterSection 
            title="Novedades 2026"
            links={[
              { name: 'Centro Radiológico', href: '/novedades/centro-radiologico' },
              { name: 'Laboratorio Digital', href: '/novedades/laboratorio' },
              { name: 'Cotizador Digital', href: '/novedades/cotizador' },
              { name: 'Validador Mi Vita', href: '/#mivita' }
            ]}
          />

          {/* Contact Info */}
          <div className="col-span-1 mt-6 md:mt-0">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-secondary mb-8">Contacto</h4>
            <div className="space-y-6">
              
              {/* Sucursal Vitacura */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-px w-4 bg-secondary/30"></div>
                  <span className="text-slate-900 dark:text-white text-[11px] font-bold uppercase tracking-widest">Sucursal Vitacura</span>
                </div>
                <a href="https://www.google.com/maps/search/?api=1&query=Avenida+Vitacura+8620+Vitacura" target="_blank" rel="noreferrer" className="flex gap-3 text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-white transition-colors group text-sm items-start">
                  <MapPin className="text-secondary shrink-0 mt-0.5 group-hover:scale-110 transition-transform" size={16} />
                  <span className="font-medium">Av. Vitacura 8620</span>
                </a>
                <a href="tel:+56229336740" className="flex gap-3 text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-white transition-colors group text-sm items-center">
                  <Phone className="text-secondary shrink-0 group-hover:scale-110 transition-transform" size={16} />
                  <span className="font-medium">+56 2 2933 6740</span>
                </a>
                <a href="https://wa.me/56965781253" target="_blank" rel="noreferrer" className="flex gap-3 text-slate-600 dark:text-slate-300 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors group text-sm items-center">
                  <WhatsAppIcon className="text-emerald-500 shrink-0 group-hover:scale-110 transition-transform" size={16} />
                  <span className="font-medium">+56 9 6578 1253</span>
                </a>
                <a href="mailto:recepciondental@policlinicotabancura.cl" className="flex gap-3 text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-white transition-colors group text-sm items-center pt-1">
                  <Mail className="text-secondary shrink-0 group-hover:scale-110 transition-transform" size={16} />
                  <span className="font-medium text-[12px] break-all">recepciondental@policlinicotabancura.cl</span>
                </a>
                <a href="mailto:recepcionmedica@policlinicotabancura.cl" className="flex gap-3 text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-white transition-colors group text-sm items-center">
                  <Mail className="text-secondary shrink-0 group-hover:scale-110 transition-transform" size={16} />
                  <span className="font-medium text-[12px] break-all">recepcionmedica@policlinicotabancura.cl</span>
                </a>
              </div>

              {/* Sucursal Los Tribunales */}
              <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-white/5">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-px w-4 bg-secondary/30"></div>
                  <span className="text-slate-900 dark:text-white text-[11px] font-bold uppercase tracking-widest">Sucursal Los Tribunales</span>
                </div>
                <a href="https://www.google.com/maps/search/?api=1&query=Calle+Los+Tribunales+1268+Vitacura" target="_blank" rel="noreferrer" className="flex gap-3 text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-white transition-colors group text-sm items-start">
                  <MapPin className="text-secondary shrink-0 mt-0.5 group-hover:scale-110 transition-transform" size={16} />
                  <span className="font-medium">Calle Los Tribunales #1268</span>
                </a>
                <a href="tel:+56222172635" className="flex gap-3 text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-white transition-colors group text-sm items-center">
                  <Phone className="text-secondary shrink-0 group-hover:scale-110 transition-transform" size={16} />
                  <span className="font-medium">+56 2 2217 2635</span>
                </a>
                <a href="https://wa.me/56966187736" target="_blank" rel="noreferrer" className="flex gap-3 text-slate-600 dark:text-slate-300 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors group text-sm items-center">
                  <WhatsAppIcon className="text-emerald-500 shrink-0 group-hover:scale-110 transition-transform" size={16} />
                  <span className="font-medium">+56 9 6618 7736</span>
                </a>
                <a href="mailto:secretaria@policlinicotabancura.cl" className="flex gap-3 text-[12px] text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-white transition-colors items-center pt-1">
                  <Mail className="text-secondary shrink-0 opacity-70" size={15} />
                  <span className="break-all font-medium">secretaria@policlinicotabancura.cl</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-slate-100 dark:border-white/10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-[10px] font-bold uppercase tracking-widest">
              <Activity size={14} className="text-secondary" /> Diseñado y desarrollado en Policlínico Tabancura
            </div>
          </div>

          <p className="text-slate-400 dark:text-slate-600 text-[10px] font-bold uppercase tracking-[0.4em]">
            © {new Date().getFullYear()} POLICLÍNICO TABANCURA • Tu Salud es nuestra prioridad.
          </p>
        </div>
      </div>
    </footer>
  );
};
