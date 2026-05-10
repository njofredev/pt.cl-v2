import React from 'react';
import Link from 'next/link';
import { Activity, ShieldCheck, Instagram, Facebook, MapPin, Phone, Mail } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-primary dark:bg-transparent text-white pt-20 md:pt-24 pb-12 transition-colors duration-300">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-x-8 gap-y-16 mb-24">
          {/* Brand & Mission */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3">
              <img src="/logo.svg" alt="Logo" className="h-12 w-auto brightness-0 invert" />
            </Link>
            <p className="text-slate-300 font-medium leading-relaxed">
              Tecnología y cuidado humano al servicio de tu salud. Más de 20 años innovando en medicina integral.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:text-secondary transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:text-secondary transition-colors">
                <Facebook size={18} />
              </a>
            </div>
          </div>

          {/* Site Map: Nosotros */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-secondary mb-8">Institucional</h4>
            <ul className="space-y-4">
              {[
                { name: 'Quiénes Somos', href: '/nosotros' },
                { name: 'Misión y Visión', href: '/nosotros#mision' },
                { name: 'Equipo Médico', href: '/nosotros#equipo' },
                { name: 'Convenios', href: '/#convenios' },
                { name: 'Preguntas Frecuentes', href: '#' }
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-slate-300 hover:text-white transition-colors font-medium">{item.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Site Map: Servicios */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-secondary mb-8">Servicios</h4>
            <ul className="space-y-4">
              {[
                { name: 'Salud Dental', href: '/servicios/dental' },
                { name: 'Salud Mental', href: '/servicios/mental' },
                { name: 'Medicina General', href: '/servicios/medicina' },
                { name: 'Terapias Complementarias', href: '/servicios/terapias' },
                { name: 'Toma de Muestras', href: '/servicios/medicina' }
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-slate-300 hover:text-white transition-colors font-medium">{item.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Site Map: Novedades */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-secondary mb-8">Novedades 2026</h4>
            <ul className="space-y-4">
              {[
                { name: 'Centro Radiológico', href: '/novedades/centro-radiologico' },
                { name: 'Laboratorio Digital', href: '/novedades/laboratorio' },
                { name: 'Cotizador Digital', href: '/novedades/cotizador' },
                { name: 'Validador Mi Vita', href: '/#mivita' }
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-slate-300 hover:text-white transition-colors font-medium">{item.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-span-1">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-secondary mb-8">Contacto</h4>
            <div className="space-y-6">
              
              {/* Sucursal Vitacura */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-px w-4 bg-secondary/30"></div>
                  <span className="text-white text-[11px] font-bold uppercase tracking-widest">Sucursal Vitacura</span>
                </div>
                <a href="https://www.google.com/maps/search/?api=1&query=Avenida+Vitacura+8620+Vitacura" target="_blank" rel="noreferrer" className="flex gap-3 text-slate-300 hover:text-white transition-colors group text-sm items-start">
                  <MapPin className="text-secondary shrink-0 mt-0.5 group-hover:scale-110 transition-transform" size={16} />
                  <span>Av. Vitacura 8620</span>
                </a>
                <a href="tel:+56229336740" className="flex gap-3 text-slate-300 hover:text-white transition-colors group text-sm items-center">
                  <Phone className="text-secondary shrink-0 group-hover:scale-110 transition-transform" size={16} />
                  <span>+56 2 2933 6740</span>
                </a>
                <div className="flex items-start gap-3 pt-1 text-[12px]">
                  <Mail className="text-secondary shrink-0 mt-0.5 opacity-70" size={15} />
                  <div className="flex flex-col gap-1">
                    <a href="mailto:recepciondental@policlinicotabancura.cl" className="text-slate-400 hover:text-white transition-colors break-all leading-tight">recepciondental@policlinicotabancura.cl</a>
                    <a href="mailto:recepcionmedica@policlinicotabancura.cl" className="text-slate-400 hover:text-white transition-colors break-all leading-tight">recepcionmedica@policlinicotabancura.cl</a>
                  </div>
                </div>
              </div>

              {/* Sucursal Los Tribunales */}
              <div className="space-y-3 pt-3 border-t border-white/5">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-px w-4 bg-secondary/30"></div>
                  <span className="text-white text-[11px] font-bold uppercase tracking-widest">Sucursal Los Tribunales</span>
                </div>
                <a href="https://www.google.com/maps/search/?api=1&query=Calle+Los+Tribunales+1268+Vitacura" target="_blank" rel="noreferrer" className="flex gap-3 text-slate-300 hover:text-white transition-colors group text-sm items-start">
                  <MapPin className="text-secondary shrink-0 mt-0.5 group-hover:scale-110 transition-transform" size={16} />
                  <span>Calle Los Tribunales #1268</span>
                </a>
                <a href="tel:+56222172635" className="flex gap-3 text-slate-300 hover:text-white transition-colors group text-sm items-center">
                  <Phone className="text-secondary shrink-0 group-hover:scale-110 transition-transform" size={16} />
                  <span>+56 2 2217 2635</span>
                </a>
                <a href="mailto:secretaria@policlinicotabancura.cl" className="flex gap-3 text-[12px] text-slate-400 hover:text-white transition-colors items-center pt-1">
                  <Mail className="text-secondary shrink-0 opacity-70" size={15} />
                  <span className="break-all">secretaria@policlinicotabancura.cl</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
              <Activity size={14} className="text-secondary" /> Hecho en Policlínico Tabancura con ❤️
            </div>
            <div className="flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
              <ShieldCheck size={14} className="text-secondary" /> Certificación de Calidad
            </div>
          </div>

          <p className="text-slate-600 text-[10px] font-bold uppercase tracking-[0.4em]">
            © {new Date().getFullYear()} POLICLÍNICO TABANCURA • Tu Salud es nuestra prioridad.
          </p>
        </div>
      </div>
    </footer >
  );
};
