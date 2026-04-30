import React from 'react';
import Link from 'next/link';
import { Activity, ShieldCheck, Instagram, Facebook, MapPin, Phone, Mail } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-primary text-white pt-20 md:pt-24 pb-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-16 mb-24">
          {/* Brand & Mission */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3">
              <img src="/logo.svg" alt="Logo" className="h-10 w-auto brightness-0 invert" />
              <span className="text-2xl font-bold tracking-tighter text-white leading-none">
                POLICLÍNICO<span className="text-secondary">TABANCURA</span>
              </span>
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
              {['Quiénes Somos', 'Misión y Visión', 'Equipo Médico', 'Convenios', 'Preguntas Frecuentes'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-slate-300 hover:text-white transition-colors font-medium">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Site Map: Servicios */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-secondary mb-8">Servicios</h4>
            <ul className="space-y-4">
              {['Salud Dental', 'Salud Mental', 'Medicina General', 'Terapias Alternativas', 'Toma de Muestras'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-slate-300 hover:text-white transition-colors font-medium">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-secondary mb-8">Contacto</h4>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <MapPin className="text-secondary shrink-0" size={20} />
                <span className="text-slate-300 font-medium">Av. Vitacura 8620, Vitacura, Santiago</span>
              </li>
              <li className="flex gap-4">
                <Phone className="text-secondary shrink-0" size={20} />
                <span className="text-slate-300 font-medium">+56 2 2933 6740</span>
              </li>
              <li className="flex gap-4 items-start">
                <Mail className="text-secondary shrink-0 mt-0.5" size={20} />
                <div className="flex flex-col gap-2">
                  <span className="text-slate-300 font-medium break-all">secretaria@policlinicotabancura.cl</span>
                  <span className="text-slate-300 font-medium break-all">recepciondental@policlinicotabancura.cl</span>
                  <span className="text-slate-300 font-medium break-all">recepcionmedica@policlinicotabancura.cl</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
              <Activity size={14} className="text-secondary" /> Sistema Cerebro v2
            </div>
            <div className="flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
              <ShieldCheck size={14} className="text-secondary" /> Certificación de Calidad
            </div>
          </div>

          <p className="text-slate-600 text-[10px] font-bold uppercase tracking-[0.4em]">
            © {new Date().getFullYear()} POLICLÍNICO TABANCURA • TECNOLOGÍA AL SERVICIO DE LA VIDA
          </p>
        </div>
      </div>
    </footer >
  );
};
