"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Users, Heart, Target, Award, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";

export default function NosotrosPage() {
  return (
    <main className="relative min-h-screen pt-32 pb-24 overflow-hidden">
      {/* Hero Section */}
      <section className="container mx-auto px-6 mb-24 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary dark:bg-primary/20 dark:text-secondary text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
            <Users size={14} />
            Sobre Nosotros
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight mb-8 leading-tight">
            Compromiso real con la <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-teal-500 to-secondary">excelencia médica</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            Más de 50 años brindando atención integral en la comuna de Vitacura,
            fusionando calidez humana con tecnología de vanguardia.
          </p>
        </motion.div>
      </section>

      {/* Quienes Somos */}
      <section className="container mx-auto px-6 mb-32 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl border border-white/10"
          >
            <img
              src="/Sucursales/sucursal_tribunales.webp"
              alt="Nuestra Historia"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent mix-blend-multiply"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Nuestra Historia</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
              Policlínico Tabancura nace con el firme propósito de descentralizar la salud de calidad,
              brindando a la comunidad una alternativa médica cercana, eficiente y de primer nivel.
            </p>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Comenzamos como una consulta dental y hoy somos un centro de salud multipropósito con dos sedes
              estratégicas en Vitacura, equipadas con laboratorios, tecnología de diagnóstico y un equipo
              multidisciplinario enfocado enteramente en tu bienestar.
            </p>

            <div className="grid grid-cols-2 gap-6 pt-4">
              <div className="p-4 bg-white dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-white/5 shadow-sm">
                <div className="text-3xl font-black text-secondary mb-1">+20</div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">Años de Trayectoria</div>
              </div>
              <div className="p-4 bg-white dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-white/5 shadow-sm">
                <div className="text-3xl font-black text-primary mb-1">2</div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">Sucursales en Vitacura</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Misión y Visión */}
      <section id="mision" className="container mx-auto px-6 mb-32 relative z-10 scroll-mt-24">
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-10 bg-white dark:bg-slate-900/60 backdrop-blur-xl border border-slate-100 dark:border-white/10 rounded-3xl shadow-xl relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-150 duration-700"></div>
            <Target className="text-primary mb-6" size={40} />
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">Nuestra Misión</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
              Brindar atención de salud accesible, oportuna y con los más altos estándares de calidad técnica y humana,
              contribuyendo activamente a mejorar la calidad de vida de nuestros pacientes y su entorno familiar.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="p-10 bg-slate-900 text-white border border-white/5 rounded-3xl shadow-xl relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-150 duration-700"></div>
            <Award className="text-secondary mb-6" size={40} />
            <h3 className="text-2xl font-black text-white mb-4 tracking-tight">Nuestra Visión</h3>
            <p className="text-slate-300 leading-relaxed text-lg">
              Ser reconocidos como el principal referente de salud ambulatoria en la comuna,
              siendo la primera opción para las familias gracias a nuestra excelencia médica,
              calidez en el trato y constante innovación tecnológica.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Equipo Placeholder / Section */}
      <section id="equipo" className="container mx-auto px-6 relative z-10 scroll-mt-24">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-4">Nuestro Equipo Profesional</h2>
          <p className="text-slate-600 dark:text-slate-400">Contamos con especialistas certificados y con una profunda vocación de servicio.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {[
            { name: 'Área Dental', desc: 'Cirujanos dentistas con especializaciones en ortodoncia, estética e implantes.', icon: <CheckCircle2 className="text-teal-500" size={18} /> },
            { name: 'Salud Mental', desc: 'Psicólogos y Psiquiatras con enfoque clínico integrativo para adultos y niños.', icon: <CheckCircle2 className="text-purple-500" size={18} /> },
            { name: 'Medicina General', desc: 'Médicos dedicados a la prevención, diagnóstico y tratamiento ambulatorio.', icon: <CheckCircle2 className="text-blue-500" size={18} /> }
          ].map((card, idx) => (
            <div key={idx} className="p-6 bg-white dark:bg-slate-900/40 border border-slate-100 dark:border-white/5 rounded-2xl shadow-sm hover:shadow-md transition-all text-center">
              <div className="flex justify-center mb-4">{card.icon}</div>
              <h4 className="font-bold text-slate-900 dark:text-white mb-2">{card.name}</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400">{card.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/#buscador-profesionales">
            <Button className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 h-12 font-bold text-sm shadow-xl">
              VER TODO EL EQUIPO MÉDICO
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
