"use client";
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Zap, ArrowRight } from 'lucide-react';

export const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden bg-white">
      {/* Fondo dinámico: Puedes usar un GIF médico en loop sutil aquí */}
      <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none -z-10">
        <img 
          src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHJqZ3R4Z3R4Z3R4Z3R4Z3R4Z3R4Z3R4Z3R4Z3R4Z3R/3o7TKVUn7iM8FMEU24/giphy.gif" 
          className="w-full h-full object-cover"
          alt="background pulse"
        />
      </div>

      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest mb-8">
            <Zap size={14} fill="currentColor" /> Agenda 100% Digital
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-slate-900 leading-[0.9] tracking-tighter mb-8">
            Tu salud, <br/> 
            <span className="text-blue-600 italic">más clara.</span>
          </h1>
          <p className="text-xl text-slate-500 font-medium max-w-md leading-relaxed mb-10">
            Reserva tu hora, revisa exámenes y gestiona tu bienestar desde cualquier lugar, fácil y rápido.
          </p>
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white rounded-2xl px-10 h-16 text-lg font-bold shadow-2xl shadow-blue-200">
            Agendar Hora Ahora
            <ArrowRight className="ml-2" />
          </Button>
        </motion.div>

        {/* Elemento Visual de Identidad: Mockup de App */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="relative z-10 bg-slate-100 rounded-[3rem] p-4 shadow-3xl border-8 border-white">
            <img 
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80" 
              className="rounded-[2.5rem] w-full h-auto grayscale hover:grayscale-0 transition-all duration-700"
              alt="Innovación Médica"
            />
          </div>
          {/* Badge flotante de confianza */}
          <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-3xl shadow-2xl border border-slate-100 z-20">
            <p className="text-3xl font-black text-blue-600">+15k</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Pacientes Atendidos</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};