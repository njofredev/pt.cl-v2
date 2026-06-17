"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Users, Target, Award, CheckCircle2,
  Calendar, Building, Stethoscope, Sparkles,
  ArrowRight, ArrowUp, ChevronDown, Clock, History, Heart,
  SmilePlus, Brain, Leaf, ChevronLeft, ChevronRight
} from 'lucide-react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import Image from 'next/image';
import { OtherServices } from '@/components/OtherServices';

export default function NosotrosPage() {
  const hitos = [
    { year: "1973", text: "El Policlínico Tabancura inicia su Asistencia Médica, atendiendo a la Población Tabancura con atención de voluntariado. Participan desde el inicio: Sra. Beatriz Lambert, Gloria Correa, Isabel Prieto, Isabel Braun, Paula Fernández, Patricia Braun, Paz Correa, Ángela García, Nelly Arancibia, Nelly San Martin, Dora Juliana Russo y el Padre Enrique Merks.", category: 'foundation' },
    { year: "1979", text: "Ante la sugerencia de la I. Municipalidad de Las Condes, se da comienzo a la Asistencia Dental y al Programa de Prevención y Tratamiento del Alcoholismo.", category: 'expansion' },
    { year: "1981", text: "El 29 de Septiembre de 1981 se concede oficialmente la Personalidad Jurídica N°1297 al Policlínico Tabancura.", category: 'legal' },
    { year: "1988", text: "Se inicia el programa de Prevención y Tratamiento de la Muerte Súbita 'Las Condes salva una vida', a cargo del Dr. Ennio Vivaldi.", category: 'medical' },
    { year: "2001", text: "Se da inicio al Programa de Asistencia Psicológica debido a la alta demanda, a cargo de un equipo especializado para todas las edades.", category: 'expansion' },
    { year: "2008", text: "Inauguración de la primera gran ampliación de las instalaciones dentales del centro.", category: 'infra' },
    { year: "2011", text: "Comienza la era digital. Se incorpora software Dentalink y Medilink para agendamiento y control de citas de pacientes.", category: 'tech' },
    { year: "2015", text: "Adquisición de equipo de Rayos X de última generación para Radiografías Retroalveolar y Bitewing.", category: 'tech' },
    { year: "2017", text: "Incremento sustancial en la dotación de psicólogos para responder a la creciente demanda de Salud Mental.", category: 'medical' },
    { year: "2021", text: "Firma de convenio con destacada institución académica para recibir alumnos en práctica de la carrera técnico dental.", category: 'alliance' },
    { year: "2022", text: "Remodelación integral de infraestructura: modernización total de boxes dentales y salas de espera.", category: 'infra' },
    { year: "2023", text: "Transformación Digital total: nueva plataforma web robusta y agendamiento en línea inteligente.", category: 'tech' },
    { year: "2024", text: "¡Hito Histórico! Inauguración el 26 de Septiembre de nuestra nueva y moderna Sucursal Vitacura en Av. Vitacura #8620.", category: 'landmark' }
  ];

  const [activeHito, setActiveHito] = useState(0);

  const nextHito = () => setActiveHito((prev) => (prev + 1) % hitos.length);
  const prevHito = () => setActiveHito((prev) => (prev - 1 + hitos.length) % hitos.length);

  return (
    <main className="min-h-screen bg-clinical-bg dark:bg-slate-950 transition-colors duration-500 overflow-x-hidden">

      {/* HERO SECTION MODERNO */}
      <section className="relative pt-56 pb-28 overflow-hidden">
        {/* Background accents */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2"></div>
          <div className="absolute top-40 right-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[100px]"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#259CF4] text-white text-[10px] font-black uppercase tracking-widest mb-8">
                <History size={14} strokeWidth={2.5} className="text-white" />
                Nuestra Trayectoria
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-primary dark:text-white tracking-tight leading-[1.1] mb-8">
                Medio siglo cuidando <br />
                <span className="text-[#259CF4] dark:text-[#259CF4]">
                  tu salud y bienestar.
                </span>
              </h1>
              <p className="text-xl text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed">
                Nacimos del voluntariado y la vocación de servicio. Hoy somos un referente de atención ambulatoria integral en la comuna de Vitacura.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECCIÓN FUNDADORAS & MISIÓN */}
      <section className="container mx-auto px-6 mb-32 relative z-10">
        <div className="flex flex-col gap-12 lg:gap-16">

          {/* Card de Foto Fundadoras - Centrada Top */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full max-w-4xl mx-auto group"
          >
            <div className="relative rounded-[2.5rem] bg-slate-50 dark:bg-slate-900 p-3 sm:p-4 border border-slate-100 dark:border-white/5 overflow-hidden shadow-xl shadow-slate-200/30 dark:shadow-none transition-all hover:shadow-2xl hover:-translate-y-1 duration-500">
              <div className="relative aspect-[16/9] w-full rounded-[1.8rem] sm:rounded-[2rem] overflow-hidden border border-white/20">
                <Image
                  src="/imagenes_general/Fundadoras.jpeg"
                  alt="Nuestras Fundadoras"
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 1024px) 100vw, 896px"
                />
                {/* Overlay de nombres elegante - Solo Desktop (al hover) */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 lg:group-hover:opacity-100 transition-opacity duration-500 hidden lg:flex flex-col justify-end p-8 text-white">
                  <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-2">Identidad Histórica</p>
                  <p className="text-sm md:text-base font-medium leading-relaxed">
                    <span className="font-black">De izq a der:</span> Sra. Paz Correa, Beatriz Lambert, Isabel Prieto, Patricia Braun, Gloria Correa, Isabel Braun.
                  </p>
                </div>
              </div>

              {/* Texto debajo de la imagen - Solo Mobile */}
              <div className="lg:hidden px-4 py-8 text-center sm:text-left bg-white dark:bg-slate-900/50 rounded-b-[2rem]">
                <p className="text-[10px] font-black uppercase tracking-widest text-secondary mb-3">Identidad Histórica</p>
                <p className="text-sm text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                  <span className="font-black text-primary dark:text-secondary">De izq a der:</span> Sra. Paz Correa, Beatriz Lambert, Isabel Prieto, Patricia Braun, Gloria Correa, Isabel Braun.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Subgrid de Misión & Datos - Abajo */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto w-full items-stretch"
          >
            {/* Misión Directa */}
            <div className="p-8 bg-white dark:bg-slate-900/60 border border-slate-100 dark:border-white/10 rounded-[2.5rem] shadow-md shadow-slate-200/20 dark:shadow-none flex flex-col justify-center gap-6 group hover:-translate-y-1 transition-transform duration-300">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center shrink-0 text-secondary border border-secondary/20 group-hover:scale-110 transition-transform duration-500">
                  <Target size={28} strokeWidth={2} />
                </div>
                <div>
                  <h3 className="text-xl font-black uppercase tracking-wider text-primary dark:text-slate-100 mb-1">Nuestra Misión</h3>
                  <p className="text-slate-500 dark:text-slate-400 font-medium">Tu salud, nuestra prioridad.</p>
                </div>
              </div>
              <div className="bg-slate-50 dark:bg-white/5 p-6 rounded-2xl border border-slate-100 dark:border-white/5">
                <p className="text-base text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                  &quot;Entregar oportunamente prestaciones de excelencia en el ámbito de la salud, a toda persona que requiera atención, al menor costo posible.&quot;
                </p>
              </div>
            </div>

            {/* Cita de Visión Complementaria */}
            <div className="p-8 bg-white dark:bg-slate-900/60 border border-slate-100 dark:border-white/10 rounded-[2.5rem] shadow-md shadow-slate-200/20 dark:shadow-none flex flex-col justify-center gap-6 group hover:-translate-y-1 transition-transform duration-300">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center shrink-0 text-secondary border border-secondary/20 group-hover:scale-110 transition-transform duration-500">
                  <Award size={28} strokeWidth={2} />
                </div>
                <div>
                  <h3 className="text-xl font-black uppercase tracking-wider text-primary dark:text-slate-100 mb-1">Compromiso Social</h3>
                  <p className="text-slate-500 dark:text-slate-400 font-medium">Valores que perduran.</p>
                </div>
              </div>
              <div className="bg-slate-50 dark:bg-white/5 p-6 rounded-2xl border border-slate-100 dark:border-white/5">
                <p className="text-base text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                  &quot;Trabajamos día a día para mantener vivo el espíritu solidario de nuestras fundadoras, asegurando un trato digno y cercano en cada consulta.&quot;
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* DIRECTORIO CORPORATIVO */}
      <section id="directorio" className="py-24 bg-slate-50/50 dark:bg-slate-950 border-t border-slate-100 dark:border-white/5 relative scroll-mt-24">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#259CF4] text-white text-[10px] md:text-[11px] font-black uppercase tracking-widest mb-6">
              <Award size={14} strokeWidth={2.5} className="text-white shrink-0" /> Liderazgo
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-primary dark:text-white tracking-tight">
              Nuestro <span className="text-[#259CF4] dark:text-[#259CF4]">Directorio</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">

            {/* Panel 1: Policlínico */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-slate-900 rounded-[3rem] p-8 lg:p-10 shadow-xl shadow-primary/5 border border-slate-100 dark:border-slate-800/50"
            >
              <div className="flex items-center gap-4 mb-8 pb-6 border-b border-slate-100 dark:border-white/5">
                <div className="w-12 h-12 rounded-xl bg-primary/5 dark:bg-white/5 flex items-center justify-center text-primary dark:text-white">
                  <Building size={24} />
                </div>
                <h3 className="text-xl font-black text-primary dark:text-slate-100 tracking-tight">Policlínico Tabancura</h3>
              </div>

              <div className="space-y-6">
                <div className="flex flex-col group">
                  <span className="text-[10px] font-black uppercase tracking-widest text-secondary mb-1 group-hover:translate-x-1 transition-transform">Directora General</span>
                  <span className="text-lg font-bold text-slate-900 dark:text-slate-200">Sra. Teresa Covarrubias Correa</span>
                </div>

                <div className="flex flex-col group">
                  <span className="text-[10px] font-black uppercase tracking-widest text-secondary mb-1 group-hover:translate-x-1 transition-transform">Director Médico</span>
                  <span className="text-lg font-bold text-slate-900 dark:text-slate-200">Dra. Gloria Reti Malusa</span>
                </div>

                <div className="flex flex-col group">
                  <span className="text-[10px] font-black uppercase tracking-widest text-secondary mb-1 group-hover:translate-x-1 transition-transform">Administración y Finanzas</span>
                  <span className="text-lg font-bold text-slate-900 dark:text-slate-200">Sr. Alejandro Valenzuela Sandoval</span>
                </div>
              </div>
            </motion.div>

            {/* Panel 2: Administración */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-slate-900 rounded-[3rem] p-8 lg:p-10 shadow-xl shadow-primary/5 border border-slate-100 dark:border-slate-800/50"
            >
              <div className="flex items-center gap-4 mb-8 pb-6 border-b border-slate-100 dark:border-white/5">
                <div className="w-12 h-12 rounded-xl bg-primary/5 dark:bg-white/5 flex items-center justify-center text-primary dark:text-white">
                  <Users size={24} />
                </div>
                <h3 className="text-xl font-black text-primary dark:text-slate-100 tracking-tight">Cuerpo Administrativo</h3>
              </div>

              <div className="space-y-6">
                <div className="flex flex-col group">
                  <span className="text-[10px] font-black uppercase tracking-widest text-secondary mb-1 group-hover:translate-x-1 transition-transform">Presidenta</span>
                  <span className="text-lg font-bold text-slate-900 dark:text-slate-200">Sra. Beatriz Lambert Pereira</span>
                </div>

                <div className="flex flex-col group">
                  <span className="text-[10px] font-black uppercase tracking-widest text-secondary mb-1 group-hover:translate-x-1 transition-transform">Vicepresidenta</span>
                  <span className="text-lg font-bold text-slate-900 dark:text-slate-200">Sra. Gloria Correa Opaso</span>
                </div>

                <div className="flex flex-col group">
                  <span className="text-[10px] font-black uppercase tracking-widest text-secondary mb-1 group-hover:translate-x-1 transition-transform">Tesorera</span>
                  <span className="text-lg font-bold text-slate-900 dark:text-slate-200">Sra. Isabel Prieto Correa</span>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* SECCIÓN DE HITOS / HORIZONTAL INTERACTIVE SLIDER */}
      <section id="hitos" className="py-16 md:py-20 bg-white dark:bg-slate-950 relative overflow-hidden border-b border-slate-100 dark:border-white/5">

        {/* Acentos de fondo abstractos */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent pointer-events-none"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#259CF4] text-white text-[10px] font-black uppercase tracking-widest mb-6">
              <Sparkles size={14} strokeWidth={2.5} className="text-white shrink-0" /> Evolución Interactiva
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-primary dark:text-white tracking-tight mb-4">
              Nuestra <span className="text-[#259CF4] dark:text-[#259CF4]">Línea de Tiempo</span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-lg mx-auto text-sm font-medium">Navega a través de los años y revive los momentos que definieron nuestra historia.</p>
          </div>

          <div className="max-w-6xl mx-auto">

            {/* Track de Años Horizontal */}
            <div className="relative mb-12 pb-4">
              {/* Línea de fondo constante - Centrada verticalmente a la altura de los nodos */}
              <div className="absolute top-[3.5rem] left-0 w-full h-0.5 bg-slate-100 dark:bg-slate-800/50 z-0 flex items-center justify-between px-2">
                <div className="w-2 h-2 border-l-2 border-t-2 border-secondary/40 -rotate-45 -translate-x-1 shrink-0"></div>
                <div className="w-2 h-2 border-r-2 border-t-2 border-secondary/40 rotate-45 translate-x-1 shrink-0"></div>
              </div>

              {/* Contenedor deslizable para mobile */}
              <div className="flex justify-between items-center gap-4 md:gap-6 overflow-x-auto custom-scrollbar pt-8 pb-6 px-4 relative z-10 snap-x">
                {hitos.map((hito, index) => {
                  const isActive = index === activeHito;

                  return (
                    <button
                      key={`hito-${index}`}
                      onClick={() => setActiveHito(index)}
                      className={`group flex flex-col items-center shrink-0 transition-all duration-500 outline-none focus:ring-0 snap-center`}
                    >
                      {/* El Nodo Circular */}
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center border-4 transition-all duration-500 ${isActive
                        ? 'bg-primary border-white dark:border-slate-950 shadow-xl shadow-primary/30 scale-125 z-20'
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-secondary group-hover:scale-110'
                        }`}>
                        {isActive ? (
                          <Clock size={16} className="text-secondary animate-pulse" />
                        ) : (
                          <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${isActive ? 'bg-secondary' : 'bg-slate-300 dark:bg-slate-600 group-hover:bg-secondary'}`}></div>
                        )}
                      </div>

                      {/* La Etiqueta del Año */}
                      <span className={`mt-4 text-sm font-black tracking-tighter transition-all duration-500 ${isActive
                        ? 'text-primary dark:text-secondary scale-110 translate-y-1'
                        : 'text-slate-400 dark:text-slate-600 hover:text-slate-800 dark:hover:text-slate-300'
                        }`}>
                        {hito.year}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Visualización del Contenido Activo con Transición Cinemática */}
            <div className="relative flex items-center justify-center min-h-[280px]">

              {/* Botones de navegación rápidos desktop */}
              <div className="absolute inset-y-0 left-0 right-0 hidden md:flex justify-between items-center pointer-events-none px-4 z-20">
                <button
                  onClick={prevHito}
                  className="w-12 h-12 rounded-full bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/10 shadow-xl flex items-center justify-center text-primary dark:text-white pointer-events-auto hover:scale-110 active:scale-95 transition-all group"
                >
                  <ArrowRight size={20} className="rotate-180 text-slate-400 group-hover:text-primary dark:group-hover:text-secondary transition-colors" />
                </button>
                <button
                  onClick={nextHito}
                  className="w-12 h-12 rounded-full bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/10 shadow-xl flex items-center justify-center text-primary dark:text-white pointer-events-auto hover:scale-110 active:scale-95 transition-all group"
                >
                  <ArrowRight size={20} className="text-slate-400 group-hover:text-primary dark:group-hover:text-secondary transition-colors" />
                </button>
              </div>

              {/* Carta Central Animada */}
              <div className="w-full max-w-4xl">
                <motion.div
                  key={activeHito}
                  initial={{ opacity: 0, x: 30, scale: 0.98 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -30, scale: 0.98 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 p-8 md:p-10 lg:p-12 rounded-[2.5rem] border border-slate-100 dark:border-white/5 shadow-xl shadow-slate-200/30 dark:shadow-none flex flex-col md:flex-row items-center gap-6 md:gap-12 relative overflow-hidden"
                >
                  {/* Detalle visual del año de fondo enorme */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[12rem] md:text-[18rem] font-black text-slate-900/[0.02] dark:text-white/[0.02] leading-none z-0 pointer-events-none select-none">
                    {hitos[activeHito].year}
                  </div>

                  {/* Columna 1: Ícono y Año Gigante */}
                  <div className="flex flex-col items-center justify-center text-center relative z-10 md:w-1/3">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-primary dark:bg-white/5 flex items-center justify-center text-secondary shadow-2xl mb-4 shadow-primary/20 transform rotate-3">
                      {hitos[activeHito].category === 'tech' && <Sparkles size={40} strokeWidth={1.5} />}
                      {hitos[activeHito].category === 'medical' && <Stethoscope size={40} strokeWidth={1.5} />}
                      {hitos[activeHito].category === 'infra' && <Building size={40} strokeWidth={1.5} />}
                      {hitos[activeHito].category === 'foundation' && <Heart size={40} strokeWidth={1.5} />}
                      {['legal', 'alliance', 'expansion', 'landmark'].includes(hitos[activeHito].category) && <CheckCircle2 size={40} strokeWidth={1.5} />}
                    </div>
                    <span className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tighter">
                      {hitos[activeHito].year}
                    </span>
                  </div>

                  {/* Columna 2: Texto y Contenido */}
                  <div className="md:w-2/3 relative z-10 text-center md:text-left">
                    <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-secondary mb-4">
                      <span className="w-2 h-2 rounded-full bg-secondary"></span>
                      Hito Corporativo
                    </div>
                    <p className="text-lg md:text-xl lg:text-2xl font-medium text-slate-700 dark:text-slate-300 leading-relaxed">
                      {hitos[activeHito].text}
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* EXPLORA NUESTROS SERVICIOS */}
      <OtherServices />

    </main>
  );
}
