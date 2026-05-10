import React from 'react';
import Link from 'next/link';
import { Activity, ShieldCheck, Instagram, Facebook, MapPin, Phone, Mail, MessageCircle } from 'lucide-react';

const TikTokIcon = ({ size = 18, className = "" }: { size?: number, className?: string }) => (
  <svg width={size} height={size} fill="currentColor" viewBox="0 0 24 24" className={className}>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z" />
  </svg>
);

export const Footer = () => {
  return (
    <footer className="bg-white dark:bg-transparent text-slate-900 dark:text-white pt-20 md:pt-24 pb-12 transition-colors duration-300 border-t border-slate-100 dark:border-none relative z-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-x-8 gap-y-16 mb-24">
          {/* Brand & Mission */}
          <div className="space-y-6">
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
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-secondary mb-8">Institucional</h4>
            <ul className="space-y-4">
              {[
                { name: 'Inicio', href: '/' },
                { name: 'Quiénes Somos', href: '/nosotros' },
                { name: 'Derechos y Deberes', href: '/derechos-y-deberes' },
                { name: 'Misión y Visión', href: '/nosotros#mision' },
                { name: 'Equipo Médico', href: '/nosotros#equipo' },
                { name: 'Convenios', href: '/#convenios' },
                { name: 'Preguntas Frecuentes', href: '#' }
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-slate-500 dark:text-slate-300 hover:text-primary dark:hover:text-white transition-colors font-medium text-sm sm:text-base">{item.name}</Link>
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
                  <Link href={item.href} className="text-slate-500 dark:text-slate-300 hover:text-primary dark:hover:text-white transition-colors font-medium text-sm sm:text-base">{item.name}</Link>
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
                  <Link href={item.href} className="text-slate-500 dark:text-slate-300 hover:text-primary dark:hover:text-white transition-colors font-medium text-sm sm:text-base">{item.name}</Link>
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
                  <MessageCircle className="text-emerald-500 shrink-0 group-hover:scale-110 transition-transform" size={16} />
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
                  <MessageCircle className="text-emerald-500 shrink-0 group-hover:scale-110 transition-transform" size={16} />
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
              <Activity size={14} className="text-secondary" /> Hecho en Policlínico Tabancura con ❤️
            </div>
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-[10px] font-bold uppercase tracking-widest">
              <ShieldCheck size={14} className="text-secondary" /> Certificación de Calidad
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
