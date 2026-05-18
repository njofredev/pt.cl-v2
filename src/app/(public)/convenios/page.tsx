"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, HeartHandshake, ShieldCheck, Check, Sparkles, Mail, ArrowRight, HelpCircle, Activity, ChevronDown } from 'lucide-react';
import { Hero } from '@/components/Hero';

// Frequently Asked Questions array with 5 comprehensive elements
const FAQS = [
  {
    q: "¿Cómo funciona la validación por I-Med?",
    a: "Contamos con lectores de huella dactilar integrados con el sistema I-Med en todos nuestros módulos de admisión. Al pasar tu huella dactilar, el sistema consulta de forma inmediata tu cobertura y calcula tu copago neto en tiempo real para Isapres y Fonasa."
  },
  {
    q: "¿Los descuentos son acumulables?",
    a: "Los convenios de descuento directo (como Tarjeta Mi Vita o Cajas de Compensación) no son acumulables entre sí ni con otras promociones activas. Al momento del cobro, nuestro equipo aplicará siempre el beneficio más conveniente para el paciente."
  },
  {
    q: "¿Qué hago si mi seguro complementario o Isapre no valida en línea?",
    a: "Si por alguna intermitencia temporal del sistema I-Med o de tu propia aseguradora no es posible realizar la bonificación en línea al instante, emitiremos una boleta electrónica detallada con todos los códigos de prestación. Con este documento podrás realizar la solicitud de reembolso de forma manual y digital en el sitio web de tu Isapre o seguro complementario para recibir el 100% de la cobertura de tu plan."
  },
  {
    q: "¿Cómo asocio mi Tarjeta Mi Vita a mi ficha para obtener el descuento?",
    a: "Solo debes presentar tu cédula de identidad y tu Tarjeta Mi Vita vigente (ya sea en formato físico o digital a través de la aplicación oficial de la Municipalidad de Vitacura) en cualquiera de nuestros mesones de recepción. Una vez validada, nuestro personal la dejará registrada permanentemente en tu ficha para aplicar descuentos automáticos en todas tus siguientes atenciones."
  },
  {
    q: "¿Los convenios colectivos cubren a todo el grupo familiar?",
    a: "Sí. La gran mayoría de nuestras alianzas e integraciones (con empresas, colegios e instituciones asociadas) extienden sus aranceles preferenciales tanto para el trabajador o afiliado titular como para sus cargas familiares acreditadas (cónyuge, conviviente civil e hijos) al momento de registrarse en admisión."
  }
];

// Categories definitions
const CATEGORIES = [
  { id: 'previsiones', name: 'Previsiones (Isapres & Fonasa)', icon: <Activity size={16} /> },
  { id: 'colectivos', name: 'Convenios Colectivos', icon: <Building2 size={16} /> },
  { id: 'seguros', name: 'Seguros Complementarios', icon: <ShieldCheck size={16} /> },
];

// Content maps
const PREVISIONES = [
  { name: 'Fonasa', type: 'Pública', desc: 'Bonos I-Med en línea para consultas médicas, dental y exámenes de laboratorio (Nivel 1, 2 y 3).', color: 'from-emerald-500 to-teal-600', badge: 'Convenio Preferente' },
  { name: 'Isapre Colmena', type: 'Privada', desc: 'Validación en línea (I-Med). Cobertura inmediata según tu plan de salud en todas las especialidades.', color: 'from-amber-500 to-orange-600' },
  { name: 'Isapre Consalud', type: 'Privada', desc: 'Convenio directo para consultas generales, dentales y exámenes. Copago automático por I-Med.', color: 'from-rose-500 to-red-600' },
  { name: 'Isapre CruzBlanca', type: 'Privada', desc: 'Reembolso automático en línea. Cobertura preferente en odontología integral y laboratorio.', color: 'from-blue-500 to-indigo-600' },
  { name: 'Isapre Banmédica', type: 'Privada', desc: 'Acceso directo a aranceles preferenciales. Bonificación en línea para todas las consultas médicas.', color: 'from-cyan-500 to-blue-600' },
  { name: 'Isapre Vida Tres', type: 'Privada', desc: 'Cobertura de alta gama en consultas de medicina general, especialidades y kinesiología.', color: 'from-violet-500 to-purple-600' },
  { name: 'Nueva Masvida', type: 'Privada', desc: 'Bonificación automatizada para exámenes de laboratorio clínico y especialidades médicas.', color: 'from-teal-500 to-emerald-600' },
];

const COLECTIVOS = [
  { name: 'Tarjeta Mi Vita (Vitacura)', benefit: 'Hasta 20% de descuento en aranceles de especialidades dentales, kinesiología y medicina general.', type: 'Municipalidad', detail: 'Exclusivo para residentes de Vitacura presentando tarjeta vigente.' },
  { name: 'Caja Los Andes', benefit: '15% de descuento en el copago de atenciones dentales integrales y consultas médicas generales.', type: 'Caja Compensación', detail: 'Válido para afiliados y cargas familiares acreditadas.' },
  { name: 'Caja La Araucana', benefit: 'Aranceles preferenciales y bonificaciones directas en consultas dentales de diagnóstico y profilaxis.', type: 'Caja Compensación', detail: 'Presentar certificado de afiliación digital al momento de ingresar.' },
  { name: 'Convenios Escolares Oriente', benefit: '15% de descuento en odontopediatría y ortodoncia para alumnos de colegios asociados.', type: 'Institucional', detail: 'Aplica a colegios de Vitacura y comunas del sector oriente.' },
  { name: 'Alianzas Corporativas', benefit: 'Programas de salud preventiva corporativa y chequeos anuales con tarifas especiales.', type: 'Empresas', detail: 'Convenio corporativo firmado entre tu empresa y nuestro policlínico.' },
];

const SEGUROS = [
  { name: 'Bupa Seguros', desc: 'Reembolso en línea inmediato a través del sistema I-Med. Cobertura en consultas y procedimientos dentales.' },
  { name: 'MetLife Seguros', desc: 'Convenio directo para seguros colectivos e individuales. Cobertura preferente en medicina general y exámenes.' },
  { name: 'Consorcio Seguros', desc: 'Validación automatizada en recepción. Reembolso directo según la póliza de salud complementaria contratada.' },
  { name: 'Chilena Consolidada', desc: 'Descuentos y coberturas directas en consultas de salud mental (psicología) y terapias complementarias.' },
  { name: 'Mapfre Seguros', desc: 'Cobertura en línea para exámenes de laboratorio y chequeos preventivos en sucursal Vitacura.' },
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
    <div className="flex flex-col gap-6 w-full max-w-lg lg:max-w-xl mx-auto py-8 relative overflow-hidden select-none">
      {/* Estilo local para animación en dirección opuesta */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee-reverse {
          from { transform: translateX(calc(-50% - 1rem)); }
          to { transform: translateX(0); }
        }
        .animate-marquee-reverse {
          animation: marquee-reverse 60s linear infinite;
        }
        .animate-marquee-normal {
          animation: marquee 60s linear infinite;
        }
      `}} />

      {/* Máscara de desvanecimiento suave a los lados */}
      <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-slate-50 dark:from-slate-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-slate-50 dark:from-slate-950 to-transparent z-10 pointer-events-none" />

      {/* Fila 1: Izquierda a Derecha (Normal) */}
      <div className="w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
        <div className="flex w-fit animate-marquee-normal hover:[animation-play-state:paused] py-2">
          {INFINITE_ROW1.map((partner, i) => (
            <div
              key={`row1-${i}`}
              className="relative shrink-0 h-10 w-24 md:h-14 md:w-32 transition-all duration-500 hover:scale-110 mx-6 md:mx-8 block group"
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
      <div className="w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
        <div className="flex w-fit animate-marquee-reverse hover:[animation-play-state:paused] py-2">
          {INFINITE_ROW2.map((partner, i) => (
            <div
              key={`row2-${i}`}
              className="relative shrink-0 h-10 w-24 md:h-14 md:w-32 transition-all duration-500 hover:scale-110 mx-6 md:mx-8 block group"
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
  const [activeTab, setActiveTab] = useState('previsiones');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-500 pb-24 relative overflow-hidden">

      {/* Usamos el Hero global para que tenga la misma estructura e impida quedar debajo del nav */}
      <Hero
        badgeText="Salud Accesible"
        badgeIconName="sparkles"
        titlePrefix="Convenios y"
        titleHighlight="Beneficios."
        description="En Policlínico Tabancura trabajamos activamente para que accedas a una salud de excelencia con el menor costo posible. Contamos con validación en línea y múltiples alianzas."
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
                      className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-100 dark:border-slate-800/60 shadow-xl shadow-slate-200/20 dark:shadow-none relative overflow-hidden group hover:shadow-2xl transition-all duration-300"
                    >
                      <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 dark:bg-slate-950 rounded-bl-[4rem] flex items-center justify-center -mr-4 -mt-4 group-hover:-translate-x-1 group-hover:translate-y-1 transition-transform">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{prev.type}</span>
                      </div>

                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-3.5 h-3.5 rounded-full bg-secondary" />
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
                <div className="space-y-6">
                  {COLECTIVOS.map((col, idx) => (
                    <div
                      key={idx}
                      className="bg-white dark:bg-slate-900 rounded-[2rem] p-8 border border-slate-100 dark:border-slate-800/60 shadow-xl shadow-slate-200/20 dark:shadow-none flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-2xl transition-all duration-300"
                    >
                      <div className="space-y-2 max-w-2xl">
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="bg-secondary/15 text-secondary px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider">{col.type}</span>
                          <h3 className="text-lg font-black text-primary dark:text-white">{col.name}</h3>
                        </div>
                        <p className="text-sm font-bold text-slate-700 dark:text-slate-200 mt-2">{col.benefit}</p>
                        <p className="text-xs font-semibold text-slate-400 dark:text-slate-500">{col.detail}</p>
                      </div>

                      <div className="shrink-0 flex items-center justify-center md:justify-end">
                        <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl flex items-center gap-2 border border-slate-100 dark:border-slate-800">
                          <ShieldCheck className="text-emerald-500" size={16} />
                          <span className="text-[10px] font-black text-primary dark:text-white uppercase tracking-widest">Validado en Admisión</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'seguros' && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {SEGUROS.map((seg, idx) => (
                    <div
                      key={idx}
                      className="bg-white dark:bg-slate-900 rounded-[2rem] p-8 border border-slate-100 dark:border-slate-800/60 shadow-xl shadow-slate-200/10 dark:shadow-none flex flex-col justify-between hover:shadow-2xl transition-all duration-300"
                    >
                      <div>
                        <div className="w-10 h-10 bg-primary/5 dark:bg-slate-800 rounded-xl flex items-center justify-center text-primary dark:text-white mb-6">
                          <ShieldCheck size={20} className="text-secondary" />
                        </div>
                        <h3 className="text-md font-black text-primary dark:text-white mb-3">{seg.name}</h3>
                        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 leading-relaxed">{seg.desc}</p>
                      </div>
                      <div className="mt-8 border-t border-slate-50 dark:border-slate-850 pt-4 flex items-center justify-between text-[9px] font-black uppercase tracking-widest text-slate-400">
                        <span>Reembolso en Línea</span>
                        <Check size={12} className="text-emerald-500" strokeWidth={3} />
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

        {/* CORPORATE PARTNERS CTA */}
        <section className="max-w-4xl mx-auto">
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

        {/* FAQS SECTION */}
        <section id="faqs" className="max-w-3xl mx-auto mt-28 scroll-mt-36">
          <h3 className="text-2xl font-black text-primary dark:text-white text-center tracking-tight mb-12 flex items-center justify-center gap-2">
            <HelpCircle className="text-secondary" size={24} />
            Preguntas Frecuentes de Convenios
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

      </div>
    </div>
  );
}
