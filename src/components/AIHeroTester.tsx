"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  Sparkles,
  Send,
  Bot,
  User,
  Key,
  RotateCcw,
  ShieldCheck,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Copy,
  ArrowRight,
  CornerDownLeft,
  X,
  Zap,
  SmilePlus,
  Building2,
  Activity
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const PRESET_QUESTIONS = [
  {
    label: "Tarjeta Mi Vita (25% Dcto)",
    query: "¿Qué descuento tengo con la Tarjeta Mi Vita y cómo se aplica?",
    bgClass: "bg-[#259CF4] hover:bg-[#188be0] text-white shadow-xs"
  },
  {
    label: "Agendar Dental",
    query: "¿Cómo puedo agendar una hora para atención dental en la sucursal de Vitacura?",
    bgClass: "bg-[#0891b2] hover:bg-[#0e7490] text-white shadow-xs"
  },
  {
    label: "Fonasa y Bono PAD",
    query: "¿Atienden por Fonasa y qué cubre el Bono PAD?",
    bgClass: "bg-[#6366f1] hover:bg-[#4f46e5] text-white shadow-xs"
  },
  {
    label: "Sucursales y Horarios",
    query: "¿Cuáles son las direcciones y horarios de atención de sus sucursales?",
    bgClass: "bg-[#059669] hover:bg-[#047857] text-white shadow-xs"
  },
  {
    label: "Test Desvío Urgencia",
    query: "Siento un dolor muy fuerte en el pecho y me cuesta respirar, ¿qué hago?",
    bgClass: "bg-[#e11d48] hover:bg-[#be123c] text-white shadow-xs"
  }
];

export function AIHeroTester() {
  const [isMounted, setIsMounted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [selectedModel, setSelectedModel] = useState("gemini-flash-lite-latest");
  const [showConfig, setShowConfig] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setIsMounted(true);
    const savedKey = localStorage.getItem("pt_gemini_api_key");
    if (savedKey) setApiKey(savedKey);
  }, []);

  const handleSaveApiKey = (key: string) => {
    setApiKey(key);
    localStorage.setItem("pt_gemini_api_key", key);
  };

  // Auto-scroll interno del contenedor del chat SIN alterar la posición del scroll de la página
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const prompt = (textToSend || input).trim();
    if (!prompt || isLoading) return;

    setErrorMessage(null);
    const userMsgId = Date.now().toString();
    const assistantMsgId = (Date.now() + 1).toString();

    const newUserMessage: Message = {
      id: userMsgId,
      role: "user",
      content: prompt
    };

    const initialAssistantMessage: Message = {
      id: assistantMsgId,
      role: "assistant",
      content: ""
    };

    const updatedMessages = [...messages, newUserMessage];
    setMessages([...updatedMessages, initialAssistantMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const apiMessages = updatedMessages.map((m) => ({
        role: m.role,
        content: m.content
      }));

      const res = await fetch("/api/test/ai-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: apiMessages,
          apiKey: apiKey.trim() || undefined,
          model: selectedModel,
          stream: true
        })
      });

      if (!res.ok) {
        let errorDetails = "Ocurrió un error al contactar la IA.";
        try {
          const errorJson = await res.json();
          if (errorJson.missingKey) setShowConfig(true);
          errorDetails = errorJson.details || errorJson.error || errorDetails;
        } catch {
          errorDetails = await res.text();
        }
        setMessages(updatedMessages);
        throw new Error(errorDetails);
      }

      // Lectura del stream en tiempo real
      const reader = res.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error("No se pudo iniciar la lectura en tiempo real.");
      }

      let accumulatedText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const textChunk = decoder.decode(value, { stream: true });
        accumulatedText += textChunk;

        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantMsgId
              ? { ...msg, content: accumulatedText }
              : msg
          )
        );
      }
    } catch (err: any) {
      setErrorMessage(err.message || "Error al conectar con el servidor.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([]);
    setErrorMessage(null);
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (!isMounted) {
    return (
      <section className="relative z-10 pt-28 pb-10 min-h-[400px] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </section>
    );
  }

  const hasMessages = messages.length > 0;

  return (
    <section className="relative z-10 pt-28 sm:pt-36 lg:pt-40 pb-10 sm:pb-14 overflow-hidden transition-colors duration-300">
      {/* Halos decorativos de fondo */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] sm:w-[900px] h-[350px] bg-gradient-to-b from-[#259CF4]/15 via-[#227262]/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        
        {/* ENCABEZADO MINIMALISTA ESTÁTICO */}
        <div className="text-center mb-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 shadow-2xs mb-3">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="font-semibold text-slate-900 dark:text-white flex items-center gap-1">
              <Zap size={11} className="text-amber-500 fill-amber-500" />
              PoliBot Stream
            </span>
            <span className="text-slate-400">•</span>
            <span className="font-mono text-[11px] text-slate-500">{selectedModel}</span>

            <button
              type="button"
              onClick={() => setShowConfig(!showConfig)}
              className="ml-1 text-[11px] font-medium text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-0.5"
            >
              <Key size={11} />
              <span>Ajustes</span>
            </button>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight mb-2">
            ¿En qué podemos{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#162158] via-[#259CF4] to-[#227262] dark:from-blue-400 dark:via-cyan-300 dark:to-teal-300">
              ayudarte hoy?
            </span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-lg mx-auto">
            Consulta en lenguaje natural sobre especialidades, horarios, convenios Mi Vita y Fonasa.
          </p>
        </div>

        {/* CONTENEDOR ESTÁTICO UNIFICADO DEL CHATBOT */}
        <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800 rounded-3xl shadow-[0_20px_60px_-15px_rgba(22,33,88,0.12)] dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col h-[520px] sm:h-[540px]">
          
          {/* BARRA SUPERIOR DEL CHATBOT */}
          <div className="bg-slate-50/90 dark:bg-slate-950/80 border-b border-slate-200/80 dark:border-slate-800 px-4 sm:px-5 py-3 flex items-center justify-between gap-3 shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#162158] to-[#259CF4] text-white flex items-center justify-center shadow-xs">
                  <Bot size={18} />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                    PoliBot Asistente
                  </span>
                  <span className="bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300 text-[10px] font-bold px-1.5 py-0.5 rounded">
                    Online
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">
                  Contexto oficial Policlínico Tabancura
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href="#agendar"
                className="text-[11px] text-[#162158] dark:text-blue-400 font-semibold hover:underline hidden sm:flex items-center gap-0.5 mr-1"
              >
                <span>Agendamiento Modular</span>
                <ArrowRight size={11} />
              </a>

              <button
                type="button"
                onClick={handleClearChat}
                title="Reiniciar chat"
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors"
              >
                <RotateCcw size={15} />
              </button>
            </div>
          </div>

          {/* PANEL DE AJUSTES DESPLEGABLE */}
          <AnimatePresence>
            {showConfig && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-amber-50/90 dark:bg-slate-950 border-b border-amber-200/80 dark:border-slate-800 px-4 py-3 shrink-0"
              >
                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-800 dark:text-slate-200 mb-1">
                      API Key (Sobrescribir .env opcional):
                    </label>
                    <input
                      type="password"
                      placeholder="Tomada de .env por defecto"
                      value={apiKey}
                      onChange={(e) => handleSaveApiKey(e.target.value)}
                      className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 dark:text-white font-mono focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-800 dark:text-slate-200 mb-1">
                      Modelo de Gemini:
                    </label>
                    <select
                      value={selectedModel}
                      onChange={(e) => setSelectedModel(e.target.value)}
                      className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 dark:text-white font-mono focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="gemini-flash-lite-latest">gemini-flash-lite-latest (⚡ Recomendado / 500 RPD)</option>
                      <option value="gemini-3.5-flash-lite">gemini-3.5-flash-lite (⚡ Ultra Rápido / 500 RPD)</option>
                      <option value="gemini-3.6-flash">gemini-3.6-flash (Equilibrado / 20 RPD)</option>
                      <option value="gemini-3.7-flash">gemini-3.7-flash (Última Gen / 20 RPD)</option>
                    </select>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ÁREA DE MENSAJES CON SCROLL INTERNO (SIEMPRE VISIBLE EN EL HERO) */}
          <div
            ref={chatContainerRef}
            className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-3.5 bg-slate-50/40 dark:bg-transparent"
          >
            {/* Estado vacío cuando no hay mensajes */}
            {!hasMessages && !isLoading && (
              <div className="h-full flex flex-col items-center justify-center text-center p-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#162158] to-[#259CF4] text-white flex items-center justify-center shadow-md mb-3">
                  <Sparkles size={22} />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-slate-800 dark:text-slate-200 mb-1">
                  ¡Hola! Soy PoliBot
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm">
                  Haz una pregunta o selecciona una de las consultas frecuentes abajo para comenzar.
                </p>
              </div>
            )}

            {/* Renderizado de mensajes */}
            {messages.map((msg) => {
              const isUser = msg.role === "user";
              const isStreamingEmpty = !isUser && msg.content === "" && isLoading;

              return (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${isUser ? "justify-end" : "justify-start"}`}
                >
                  {!isUser && (
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#162158] to-[#259CF4] text-white flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                      <Bot size={14} />
                    </div>
                  )}

                  <div
                    className={`relative max-w-[88%] sm:max-w-[80%] rounded-2xl p-3.5 text-xs sm:text-[13px] leading-relaxed shadow-2xs ${
                      isUser
                        ? "bg-[#162158] dark:bg-blue-600 text-white rounded-tr-xs"
                        : "bg-white dark:bg-slate-800/90 text-slate-800 dark:text-slate-100 rounded-tl-xs border border-slate-200/70 dark:border-slate-700/60"
                    }`}
                  >
                    {!isUser && msg.content && (
                      <button
                        type="button"
                        onClick={() => handleCopy(msg.id, msg.content)}
                        className="absolute top-2.5 right-2.5 p-1 rounded text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
                        title="Copiar respuesta"
                      >
                        {copiedId === msg.id ? (
                          <CheckCircle2 size={12} className="text-emerald-500" />
                        ) : (
                          <Copy size={12} />
                        )}
                      </button>
                    )}

                    {isStreamingEmpty ? (
                      <div className="flex items-center gap-1.5 py-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce [animation-delay:-0.3s]" />
                        <div className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-bounce [animation-delay:-0.15s]" />
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce" />
                      </div>
                    ) : (
                      <div className="whitespace-pre-line space-y-1 pr-4">
                        {msg.content.split("\n").map((line, idx) => {
                          const formatted = line.replace(/\*\*(.*?)\*\*/g, "$1");
                          const isBold = line.includes("**");
                          return (
                            <p key={idx} className={isBold ? "font-semibold text-slate-900 dark:text-white" : ""}>
                              {formatted}
                            </p>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {isUser && (
                    <div className="w-7 h-7 rounded-lg bg-slate-300 dark:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                      <User size={14} />
                    </div>
                  )}
                </div>
              );
            })}

            {errorMessage && (
              <div className="p-3 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 rounded-xl text-xs text-red-700 dark:text-red-300 flex items-start gap-2">
                <AlertTriangle size={14} className="shrink-0 mt-0.5" />
                <p className="font-medium text-xs">{errorMessage}</p>
              </div>
            )}
          </div>

          {/* BARRA INFERIOR CON PREGUNTAS RÁPIDAS + CAMPO DE ENTRADA (ESTÁTICA AL FONDO) */}
          <div className="border-t border-slate-200/80 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/60 p-3 sm:p-3.5 space-y-2.5 shrink-0">
            
            {/* Píldoras de colores */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none justify-start">
              {PRESET_QUESTIONS.map((preset, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleSendMessage(preset.query)}
                  disabled={isLoading}
                  className={`shrink-0 text-[11px] font-medium px-3 py-1 rounded-full ${preset.bgClass} transition-all duration-200 cursor-pointer disabled:opacity-50 hover:scale-105 active:scale-95`}
                >
                  {preset.label}
                </button>
              ))}
            </div>

            {/* Formulario de entrada */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-1.5 sm:p-2 focus-within:border-[#259CF4] focus-within:ring-2 focus-within:ring-blue-500/20 transition-all"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Escribe tu consulta sobre doctores, horarios, Fonasa..."
                disabled={isLoading}
                className="flex-1 bg-transparent border-none outline-none text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 px-3 py-1"
              />

              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="bg-gradient-to-r from-[#162158] to-[#259CF4] hover:from-[#111a46] hover:to-[#1e8ad8] text-white px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-1 shadow-xs transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shrink-0"
              >
                <span>Preguntar</span>
                <Send size={12} />
              </button>
            </form>

          </div>

        </div>

      </div>
    </section>
  );
}
