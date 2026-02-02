"use client";
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { ArrowRight, Activity } from 'lucide-react';

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-slate-50">
      {/* Elemento Decorativo Innovador */}
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold mb-6">
            <Activity size={14} />
            TECNOLOGÍA MÉDICA DE VANGUARDIA
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 leading-[1.1] mb-6">
            Tu salud merece una <span className="text-blue-600">atención superior.</span>
          </h1>
          <p className="text-lg text-slate-600 mb-8 max-w-lg leading-relaxed">
            Combinamos excelencia médica con procesos digitales ágiles. Agenda tu cita en segundos y accede a los mejores especialistas de Vitacura y Santiago Centro.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white text-md px-8 h-14 rounded-xl shadow-lg shadow-blue-200">
              Agendar ahora
              <ArrowRight className="ml-2" size={20} />
            </Button>
            <Button size="lg" variant="outline" className="border-slate-200 text-md px-8 h-14 rounded-xl hover:bg-white">
              Nuestras Especialidades
            </Button>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative"
        >
          {/* Aquí iría una imagen real de la clínica con bordes redondeados orgánicos */}
          <div className="aspect-square bg-slate-200 rounded-[2rem] overflow-hidden shadow-2xl relative">
             <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-transparent z-10" />
             <img 
               src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80" 
               alt="Atención médica profesional"
               className="object-cover w-full h-full hover:scale-105 transition-transform duration-700"
             />
          </div>
        </motion.div>
      </div>
    </section>
  );
};