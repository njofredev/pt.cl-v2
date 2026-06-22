"use client";

import React, { useState } from "react";
import { Calendar, ChevronDown, User, Building2 } from "lucide-react";

export function QuickSchedulerBar() {
  const [patientType, setPatientType] = useState<"general" | "mivita">("general");
  const [attentionType, setAttentionType] = useState("");
  const [modality, setModality] = useState("");

  const handleBookClick = () => {
    if (!attentionType) return;
    
    // Smooth scroll to the main agendador section
    const element = document.getElementById("agendar");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 -mt-10 md:-mt-16 relative z-30">
      <div className="inline-flex flex-col items-start w-full">
        
        {/* Top Radio Tabs */}
        <div className="flex items-center gap-6 bg-white dark:bg-slate-900 px-6 py-2.5 rounded-t-[1.5rem] border-t border-l border-r border-slate-200/80 dark:border-slate-800 shadow-sm">
          
          {/* Option 1: General Patient */}
          <label className="flex items-center gap-2.5 cursor-pointer group">
            <input
              type="radio"
              name="patientType"
              checked={patientType === "general"}
              onChange={() => setPatientType("general")}
              className="sr-only"
            />
            <div className="relative flex items-center justify-center">
              <div className={`w-[18px] h-[18px] rounded-full border-2 transition-all flex items-center justify-center ${
                patientType === "general"
                  ? "border-[#6366f1] dark:border-[#818cf8]"
                  : "border-slate-300 dark:border-slate-600 group-hover:border-slate-400"
              }`}>
                {patientType === "general" && (
                  <div className="w-2.5 h-2.5 rounded-full bg-[#6366f1] dark:bg-[#818cf8]" />
                )}
              </div>
            </div>
            <span className={`text-[13px] font-bold tracking-tight transition-colors ${
              patientType === "general" 
                ? "text-slate-800 dark:text-slate-100" 
                : "text-slate-500 dark:text-slate-400 group-hover:text-slate-700"
            }`}>
              Paciente General
            </span>
          </label>

          {/* Option 2: Mi Vita Agreement */}
          <label className="flex items-center gap-2.5 cursor-pointer group">
            <input
              type="radio"
              name="patientType"
              checked={patientType === "mivita"}
              onChange={() => setPatientType("mivita")}
              className="sr-only"
            />
            <div className="relative flex items-center justify-center">
              <div className={`w-[18px] h-[18px] rounded-full border-2 transition-all flex items-center justify-center ${
                patientType === "mivita"
                  ? "border-[#6366f1] dark:border-[#818cf8]"
                  : "border-slate-300 dark:border-slate-600 group-hover:border-slate-400"
              }`}>
                {patientType === "mivita" && (
                  <div className="w-2.5 h-2.5 rounded-full bg-[#6366f1] dark:bg-[#818cf8]" />
                )}
              </div>
            </div>
            <span className={`text-[13px] font-bold tracking-tight transition-colors ${
              patientType === "mivita" 
                ? "text-slate-800 dark:text-slate-100" 
                : "text-slate-500 dark:text-slate-400 group-hover:text-slate-700"
            }`}>
              Convenio Mi Vita
            </span>
          </label>
        </div>

        {/* Main Selection Bar */}
        <div className="w-full bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-b-[2rem] rounded-tr-[2rem] p-4 md:p-6 shadow-[0_15px_30px_-5px_rgba(0,0,0,0.06),0_10px_20px_-10px_rgba(0,0,0,0.04)] dark:shadow-none transition-colors">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            
            {/* Left Selection Controls Container */}
            <div className="flex-1 grid md:grid-cols-2 gap-4">
              
              {/* Select 1: Tipo de Atención */}
              <div className="relative flex flex-col justify-center">
                <div className="absolute left-4 text-slate-400 pointer-events-none">
                  <User size={18} />
                </div>
                <select
                  value={attentionType}
                  onChange={(e) => {
                    setAttentionType(e.target.value);
                    if (!e.target.value) setModality("");
                  }}
                  className="w-full pl-11 pr-10 py-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 text-xs font-bold text-slate-600 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-[#00a499] appearance-none cursor-pointer"
                >
                  <option value="">Tipo de atención</option>
                  <option value="dental">Salud Dental</option>
                  <option value="mental">Salud Mental</option>
                  <option value="general">Medicina General</option>
                  <option value="terapias">Terapias Complementarias</option>
                </select>
                <div className="absolute right-4 text-slate-400 pointer-events-none">
                  <ChevronDown size={14} />
                </div>
              </div>

              {/* Select 2: Modalidad */}
              <div className="relative flex flex-col justify-center">
                <div className={`absolute left-4 pointer-events-none ${attentionType ? "text-slate-400" : "text-slate-300 dark:text-slate-700"}`}>
                  <Building2 size={18} />
                </div>
                <select
                  value={modality}
                  disabled={!attentionType}
                  onChange={(e) => setModality(e.target.value)}
                  className={`w-full pl-11 pr-10 py-3.5 rounded-xl border appearance-none text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#00a499] cursor-pointer ${
                    attentionType
                      ? "border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 text-slate-600 dark:text-slate-200"
                      : "border-slate-100 dark:border-slate-900 bg-slate-100/50 dark:bg-slate-950/20 text-slate-300 dark:text-slate-700 cursor-not-allowed"
                  }`}
                >
                  <option value="">Modalidad</option>
                  <option value="presencial">Presencial (Vitacura o Tribunales)</option>
                  <option value="telemedicina">Telemedicina (Salud Mental)</option>
                </select>
                <div className="absolute right-4 text-slate-400 pointer-events-none">
                  <ChevronDown size={14} />
                </div>
              </div>

            </div>

            {/* Right Booking Action Controls */}
            <div className="flex items-center gap-6 justify-between lg:justify-end shrink-0 pl-2 lg:pl-0">
              
              {/* Reservar Button */}
              <button
                onClick={handleBookClick}
                disabled={!attentionType}
                className={`px-6 py-3.5 rounded-full font-black text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-md ${
                  attentionType
                    ? "bg-[#00a499] hover:bg-[#00897b] text-white hover:scale-102"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed shadow-none"
                }`}
              >
                <Calendar size={14} />
                Reservar hora
              </button>

              {/* Anular Hora Link */}
              <a
                href="#agendar"
                className="text-xs font-bold text-[#00a499] hover:text-[#00897b] underline underline-offset-4 tracking-tight whitespace-nowrap"
              >
                Anular hora
              </a>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
