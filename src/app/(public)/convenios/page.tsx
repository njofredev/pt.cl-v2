"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, HeartHandshake, ShieldCheck, Check, Sparkles, Mail, ArrowRight, HelpCircle, Activity, ChevronDown } from 'lucide-react';
import { Hero } from '@/components/Hero';

// Frequently Asked Questions array with 5 comprehensive elements
const FAQS = [
  {
    q: "¿Cómo funciona la validación por IMED?",
    a: "Contamos con lectores de huella dactilar integrados con el sistema IMED en todos nuestros módulos de recepción. Al pasar tu huella dactilar, el sistema consulta de forma inmediata tu cobertura y calcula tu copago para Isapres y Fonasa."
  },
  {
    q: "¿Los descuentos son acumulables?",
    a: "Los convenios de descuento directo (como Tarjeta Mi Vita) no son acumulables entre sí ni con otras promociones activas. Al momento del cobro, nuestro equipo aplicará siempre el beneficio más conveniente para el paciente."
  },
  {
    q: "¿Qué hago si mi seguro complementario o Isapre no valida en línea?",
    a: "Si por alguna intermitencia temporal del sistema I-Med o de tu propia aseguradora no es posible realizar la bonificación en línea al instante, puedes comprar el bono directamente en el sitio de tu previsión."
  },
  {
    q: "¿Cómo asocio mi Tarjeta Mi Vita a mi ficha para obtener el descuento?",
    a: "Solo debes presentar tu cédula de identidad y validaremos tu beneficio en cualquiera de nuestros mesones de recepción. Una vez validada, nuestro personal la dejará registrada permanentemente en tu ficha digital para aplicar descuentos automáticos en todas tus siguientes atenciones."
  }
];

// Categories definitions
const CATEGORIES = [
  { id: 'colectivos', name: 'Convenios Institucionales', icon: <Building2 size={16} /> },
  { id: 'previsiones', name: 'Previsiones', icon: <Activity size={16} /> }
];

// Content maps
const PREVISIONES = [
  { name: 'Fonasa', type: 'Pública', desc: 'Bonificación a través de sistema I-Med en sucursales o venta de bonos web.', color: 'from-blue-500 to-blue-600', badge: 'Atención Directa', logo: 'fonasa.png' },
  { name: 'Isapre Banmédica', type: 'Privada', desc: 'Bonificación a través de sistema I-Med en módulos de atención.', color: 'from-cyan-500 to-blue-600', badge: 'Convenio Preferente', logo: 'banmedica.png' },
  { name: 'Isapre Vida Tres', type: 'Privada', desc: 'Bonificación a través de sistema I-Med en módulos de atención.', color: 'from-violet-500 to-purple-600', badge: 'Convenio Preferente', logo: 'vidatres.png' },
  { name: 'Atención Particular', type: 'Privada', desc: 'Atención a pacientes sin previsión de salud o que requieran prestaciones no codificadas.', color: 'from-slate-500 to-slate-600', badge: '', logo: '' }
];

const COLECTIVOS = [
  { name: 'Tarjeta Mi Vita', benefit: '25% de descuento sobre el arancel.', type: 'Municipalidad', detail: 'Exclusivo para residentes de Vitacura presentando tarjeta vigente.', logo: 'mivita.png' },
  { name: 'Liceo Amanda Labarca', benefit: '25% de descuento sobre el arancel.', type: 'Educacional', detail: 'Beneficio exclusivo para alumnos y comunidad educativa.', logo: 'amanda_labarca.png' },
  { name: 'Colegio Antártica Chilena', benefit: '25% de descuento sobre el arancel.', type: 'Educacional', detail: 'Beneficio exclusivo para alumnos y comunidad educativa.', logo: 'antartica_chilena.png' },
  { name: 'Colegio Betterland', benefit: '25% de descuento sobre el arancel.', type: 'Educacional', detail: 'Beneficio exclusivo para alumnos y comunidad educativa.', logo: 'betterland.png' },
  { name: 'Colegio Everest', benefit: '25% de descuento sobre el arancel.', type: 'Educacional', detail: 'Beneficio exclusivo para alumnos y comunidad educativa.', logo: 'colegio_everest.png' },
  { name: 'Liceo María Luisa Bombal', benefit: '25% de descuento sobre el arancel.', type: 'Educacional', detail: 'Beneficio exclusivo para alumnos y comunidad educativa.', logo: 'mraluisabombal.png' },
  { name: 'Club Sirio', benefit: '25% de descuento sobre el arancel.', type: 'Educacional', detail: 'Beneficio exclusivo para alumnos y comunidad educativa.', logo: 'sirio.png' },
  { name: 'Colegio Santa Úrsula', benefit: '25% de descuento sobre el arancel.', type: 'Educacional', detail: 'Beneficio exclusivo para alumnos y comunidad educativa.', logo: 'staursula.png' },
  { name: 'Universidad Federico Santa María', benefit: '25% de descuento sobre el arancel.', type: 'Educacional', detail: 'Beneficio exclusivo para alumnos y comunidad educativa.', logo: 'utfsm.png' },
];

import Image from 'next/image';

const ROW1 = [
  { name: 'Liceo Amanda Labarca', file: 'amanda_labarca.png' },
  { name: 'Colegio Antártica Chilena', file: 'antartica_chilena.png' },
  { name: 'Isapre Banmédica', file: 'banmedica.png' },
  { name: 'Colegio Betterland', file: 'betterland.png' },
  { name: 'Colegio Everest', file: 'colegio_everest.png' },
];

const ROW2 = [
  { name: 'Tarjeta Mi Vita', file: 'mivita.png' },
  { name: 'Liceo María Luisa Bombal', file: 'mraluisabombal.png' },
  { name: 'Colegio Sirio', file: 'sirio.png' },
  { name: 'Colegio Santa Úrsula', file: 'staursula.png' },
  { name: 'Universidad Federico Santa María', file: 'utfsm.png' },
  { name: 'Isapre Vida Tres', file: 'vidatres.png' },
];

const INFINITE_ROW1 = [...ROW1, ...ROW1, ...ROW1];
const INFINITE_ROW2 = [...ROW2, ...ROW2, ...ROW2];

function ConveniosMarquee() {
  return (
    <div className="flex flex-col gap-3 md:gap-6 w-full max-w-lg lg:max-w-xl mx-auto py-4 md:py-8 relative overflow-hidden select-none">
      {/* Estilo local para animación en dirección opuesta */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes marquee-normal {
          from { transform: translateX(0); }
          to { transform: translateX(calc(-50% - 1rem)); }
        }
        @keyframes marquee-reverse {
          from { transform: translateX(calc(-50% - 1rem)); }
          to { transform: translateX(0); }
        }
        .animate-marquee-reverse {
          animation: marquee-reverse 50s linear infinite;
        }
        .animate-marquee-normal {
          animation: marquee-normal 50s linear infinite;
        }
      `}} />

      {/* Máscara de desvanecimiento suave a los lados */}
      <div className="absolute inset-y-0 left-0 w-8 md:w-16 bg-gradient-to-r from-slate-50 dark:from-slate-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-8 md:w-16 bg-gradient-to-l from-slate-50 dark:from-slate-950 to-transparent z-10 pointer-events-none" />

      {/* Fila 1: Izquierda a Derecha (Normal) */}
      <div className="w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] md:[mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
        <div className="flex w-fit animate-marquee-normal hover:[animation-play-state:paused] py-2">
          {INFINITE_ROW1.map((partner, i) => (
            <div
              key={`row1-${i}`}
              className="relative shrink-0 h-10 w-24 md:h-14 md:w-32 transition-all duration-500 hover:scale-110 mx-4 md:mx-8 block group"
            >
              <Image
                src={`/logos_convenios_prevision/${partner.file}`}
                alt={partner.name}
                fill
                sizes="120px"
                className="object-contain opacity-40 grayscale dark:invert group-hover:opacity-100 group-hover:grayscale-0 group-hover:invert-0 dark:group-hover:invert-0 transition-all duration-500 cursor-pointer"
                priority={i < 4}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Fila 2: Derecha a Izquierda (Reversa) */}
      <div className="w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] md:[mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
        <div className="flex w-fit animate-marquee-reverse hover:[animation-play-state:paused] py-2">
          {INFINITE_ROW2.map((partner, i) => (
            <div
              key={`row2-${i}`}
              className="relative shrink-0 h-10 w-24 md:h-14 md:w-32 transition-all duration-500 hover:scale-110 mx-4 md:mx-8 block group"
            >
              <Image
                src={`/logos_convenios_prevision/${partner.file}`}
                alt={partner.name}
                fill
                sizes="120px"
                className="object-contain opacity-40 grayscale dark:invert group-hover:opacity-100 group-hover:grayscale-0 group-hover:invert-0 dark:group-hover:invert-0 transition-all duration-500 cursor-pointer"
                priority={i < 4}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ConveniosPage() {
  const [activeTab, setActiveTab] = useState('colectivos');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-clinical-bg dark:bg-slate-950 transition-colors duration-500 pb-24 relative overflow-hidden">

      {/* Usamos el Hero global para que tenga la misma estructura e impida quedar debajo del nav */}
      <Hero
        badgeText="Salud Accesible"
        badgeIconName="sparkles"
        titlePrefix="Convenios y"
        titleHighlight="Beneficios."
        description="En Policlínico Tabancura trabajamos activamente para que accedas a una salud de excelencia con el menor costo posible. "
        buttonText="Ver Previsiones"
        secondaryButtonText="¿Aún con dudas?"
        secondaryButtonAnchorId="faqs"
        statsNumber="100%"
        statsLabel="Validación I-Med"
        customRightElement={<ConveniosMarquee />}
      />

      {/* Light mode organic blob backplate */}
      <div className="absolute top-[600px] left-10 w-[600px] h-[600px] text-slate-100/60 dark:text-transparent blur-3xl pointer-events-none -z-10 bg-gradient-to-tr from-secondary/10 via-primary/5 to-transparent blur-2xl" />
      <div className="absolute bottom-20 right-10 w-[500px] h-[500px] text-slate-100/40 dark:text-transparent blur-3xl pointer-events-none -z-10 bg-gradient-to-br from-teal-500/5 via-secondary/5 to-transparent blur-2xl" />

      <div className="container mx-auto px-6 relative z-10">

        {/* TABS FILTER BUTTONS */}
        <section id="agendar" className="max-w-3xl mx-auto mb-16 scroll-mt-44">
          <div className="flex flex-col sm:flex-row gap-3 bg-white dark:bg-slate-900 p-2 rounded-[2rem] border border-slate-100 dark:border-slate-800/80 shadow-xl shadow-slate-100/50 dark:shadow-none">
            {CATEGORIES.map((cat) => {
              const isActive = activeTab === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={`flex items-center justify-center gap-2.5 px-6 py-4 rounded-[1.5rem] font-bold text-xs uppercase tracking-widest transition-all w-full select-none cursor-pointer ${isActive
                    ? 'bg-primary dark:bg-slate-800 text-white shadow-lg'
                    : 'text-slate-400 dark:text-slate-500 hover:text-primary dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-950'
                    }`}
                >
                  {cat.icon}
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* DYNAMIC GRID CONTENT AREA */}
        <section className="max-w-5xl mx-auto mb-28">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              {activeTab === 'previsiones' && (
                <div className="grid md:grid-cols-2 gap-8">
                  {PREVISIONES.map((prev, idx) => (
                    <div
                      key={idx}
                      className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-200 dark:border-slate-800/60 shadow-xl shadow-slate-200/20 dark:shadow-none relative overflow-hidden group hover:shadow-2xl transition-all duration-300"
                    >
                      <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 dark:bg-slate-950 rounded-bl-[4rem] flex items-center justify-center -mr-4 -mt-4 group-hover:-translate-x-1 group-hover:translate-y-1 transition-transform">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{prev.type}</span>
                      </div>

                      <div className="flex items-center gap-4 mb-6">
                        {prev.logo ? (
                          <div className="relative w-16 h-12 shrink-0 flex items-center justify-center">
                            <Image src={`/logos_convenios_prevision/${prev.logo}`} alt={prev.name} fill sizes="64px" className="object-contain drop-shadow-sm" />
                          </div>
                        ) : (
                          <div className="w-3.5 h-3.5 rounded-full bg-secondary shrink-0" />
                        )}
                        <h3 className="text-xl font-black text-primary dark:text-white group-hover:text-secondary transition-colors">{prev.name}</h3>
                      </div>

                      <p className="text-sm font-medium text-slate-500 dark:text-slate-400 leading-relaxed pr-8">{prev.desc}</p>

                      {prev.badge && (
                        <div className="mt-6 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[9px] font-black uppercase tracking-wider">
                          <Check size={10} strokeWidth={3} />
                          {prev.badge}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'colectivos' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {COLECTIVOS.map((col, idx) => (
                    <div
                      key={idx}
                      className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800/60 shadow-xl shadow-slate-200/20 dark:shadow-none flex flex-col h-full hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 group relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 w-24 h-24 bg-slate-50 dark:bg-slate-950 rounded-bl-full flex items-center justify-center -mr-4 -mt-4 opacity-50 pointer-events-none group-hover:scale-110 transition-transform duration-500" />

                      <div className="flex justify-between items-start mb-5 relative z-10">
                        {col.logo ? (
                          <div className="relative w-24 h-14 shrink-0 flex items-center justify-start">
                            <Image src={`/logos_convenios_prevision/${col.logo}`} alt={col.name} fill sizes="96px" className="object-contain object-left drop-shadow-sm group-hover:scale-105 transition-transform" />
                          </div>
                        ) : (
                          <div className="w-14 h-14 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center justify-center shrink-0">
                            <Building2 className="text-slate-400" size={24} />
                          </div>
                        )}
                        <span className="bg-secondary/10 text-secondary border border-secondary/20 px-2.5 py-1 rounded-full text-[8px] font-black uppercase tracking-widest shrink-0 mt-1">{col.type}</span>
                      </div>

                      <div className="flex-1 space-y-2.5 mb-6 relative z-10">
                        <h3 className="text-base font-black text-primary dark:text-white leading-tight group-hover:text-secondary transition-colors">{col.name}</h3>
                        <p className="text-xs font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-900/30 p-2.5 rounded-lg border border-emerald-200 dark:border-emerald-800/50">{col.benefit}</p>
                        <p className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 leading-relaxed pt-1">{col.detail}</p>
                      </div>

                      <div className="mt-auto pt-4 border-t border-slate-200 dark:border-slate-800/80 relative z-10">
                        <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                          <ShieldCheck className="text-emerald-500 shrink-0" size={16} />
                          <span className="text-[10px] font-black uppercase tracking-widest">Validado en Admisión</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}


            </motion.div>
          </AnimatePresence>
        </section>

        {/* STEP BY STEP GUIDE */}
        <section className="max-w-5xl mx-auto mb-28">
          <div className="bg-primary dark:bg-slate-900 rounded-[4rem] p-12 md:p-20 text-white relative overflow-hidden shadow-2xl shadow-primary/25">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/5 rounded-full -mr-48 -mt-48 blur-3xl" />

            <div className="relative z-10 max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-black mb-4 tracking-tighter">¿Cómo utilizar tus convenios?</h2>
              <p className="text-white/70 text-sm md:text-base font-semibold">Validar tus descuentos o coberturas de salud en nuestro policlínico es un proceso sencillo de 3 pasos.</p>
            </div>

            <div className="relative z-10 grid md:grid-cols-3 gap-12">
              <div className="space-y-4 text-center md:text-left">
                <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-secondary font-black text-lg mx-auto md:mx-0 shadow-lg border border-white/5">01</div>
                <h3 className="text-lg font-black tracking-tight">Agenda tu Atención</h3>
                <p className="text-xs font-semibold text-white/70 leading-relaxed">Reserva tu hora a través de nuestra agenda digital o por vía telefónica en cualquiera de nuestras sucursales.</p>
              </div>

              <div className="space-y-4 text-center md:text-left">
                <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-secondary font-black text-lg mx-auto md:mx-0 shadow-lg border border-white/5">02</div>
                <h3 className="text-lg font-black tracking-tight">Presenta tu Documento</h3>
                <p className="text-xs font-semibold text-white/70 leading-relaxed">Al llegar al módulo de admisión, presenta tu cédula de identidad vigente e indica tu previsión o convenio corporativo.</p>
              </div>

              <div className="space-y-4 text-center md:text-left">
                <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-secondary font-black text-lg mx-auto md:mx-0 shadow-lg border border-white/5">03</div>
                <h3 className="text-lg font-black tracking-tight">Validación Directa</h3>
                <p className="text-xs font-semibold text-white/70 leading-relaxed">Validamos de forma directa tu copago por I-Med o aplicamos el descuento correspondiente en tu boleta al instante.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQS SECTION */}
        <section id="faqs" className="max-w-3xl mx-auto mt-28 scroll-mt-36">
          <h3 className="text-2xl font-black text-primary dark:text-white text-center tracking-tight mb-12 flex items-center justify-center gap-2">
            <HelpCircle className="text-secondary" size={24} />
            Preguntas Frecuentes
          </h3>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white dark:bg-slate-900 rounded-[1.8rem] border border-slate-100 dark:border-slate-800/60 shadow-md overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-6 text-left cursor-pointer select-none font-black text-slate-800 dark:text-slate-200 hover:text-secondary dark:hover:text-secondary transition-colors outline-none"
                  >
                    <span className="text-sm pr-6 leading-snug">{faq.q}</span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="shrink-0 w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 flex items-center justify-center text-slate-400 dark:text-slate-500"
                    >
                      <ChevronDown size={16} />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="p-6 pt-0 border-t border-slate-50 dark:border-slate-850/50 text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 leading-relaxed">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>

        {/* CORPORATE PARTNERS CTA */}
        <section className="max-w-4xl mx-auto mt-28">
          <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-10 md:p-14 border border-slate-100 dark:border-slate-800/80 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="space-y-4 max-w-md text-center md:text-left">
              <div className="w-12 h-12 bg-secondary/15 rounded-2xl flex items-center justify-center text-secondary mx-auto md:mx-0">
                <HeartHandshake size={24} />
              </div>
              <h3 className="text-2xl font-black text-primary dark:text-white tracking-tight">¿Quieres establecer una alianza corporativa?</h3>
              <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 leading-relaxed">
                Ofrecemos programas de salud bucal, preventiva y de medicina general personalizados para empresas, colegios o sindicatos de la comuna de Vitacura y alrededores.
              </p>
            </div>

            <div className="shrink-0 w-full md:w-auto">
              <a
                href="mailto:alianzas@policlinicotabancura.cl?subject=Consulta%20por%20Convenio%20Corporativo"
                className="flex items-center justify-center gap-3 bg-primary hover:bg-[#1e3a8a] text-white px-8 py-5 rounded-[1.5rem] font-bold text-xs uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-xl shadow-primary/10 cursor-pointer"
              >
                <Mail size={16} />
                <span>Escríbenos Hoy</span>
                <ArrowRight size={14} className="animate-pulse" />
              </a>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
