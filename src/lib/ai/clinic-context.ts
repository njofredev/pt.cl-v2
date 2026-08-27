/**
 * Contexto Institucional y Base de Conocimiento para el Asistente de IA
 * Policlínico Tabancura
 * 
 * Este archivo contiene los datos estructurados y el System Prompt que se inyecta
 * a la API de Google AI Studio (Gemini) para asegurar respuestas precisas y amables.
 */

export interface ClinicBranch {
  name: string;
  address: string;
  commune: string;
  phones: string[];
  schedule: {
    weekdays: string;
    saturday?: string;
    sunday?: string;
  };
  features: string[];
}

export const CLINIC_DATA = {
  name: "Policlínico Tabancura",
  type: "Corporación de Salud sin fines de lucro",
  tagline: "Salud de excelencia al alcance de todos",
  description:
    "Policlínico Tabancura es una corporación sin fines de lucro comprometida con brindar atención médica, dental y de salud integral accesible, oportuna y de alta calidad para toda la comunidad.",

  branches: [
    {
      name: "Sucursal Vitacura (Casa Matriz)",
      address: "Av. Vitacura 8620",
      commune: "Vitacura, Región Metropolitana",
      phones: ["+56 2 2933 6740"],
      whatsapp: "+56 9 1234 5678", // Canal de orientación
      schedule: {
        weekdays: "Lunes a Viernes: 08:30 a 20:00 hrs",
        saturday: "Sábados: 09:00 a 13:00 hrs",
        sunday: "Domingos y Festivos: Cerrado"
      },
      features: [
        "Atención Dental completa (sillones de última generación)",
        "Consultas Médicas y Especialidades",
        "Salud Mental y Psicología",
        "Kinesiología y Rehabilitación",
        "Toma de Muestras y Laboratorio",
        "Acceso universal y estacionamiento"
      ]
    },
    {
      name: "Sucursal Los Tribunales (Santiago Centro)",
      address: "Bandera 883 (esquina Huérfanos)",
      commune: "Santiago Centro, Región Metropolitana",
      phones: ["+56 2 2933 6740"],
      schedule: {
        weekdays: "Lunes a Viernes: 08:30 a 18:30 hrs",
        saturday: "Sábados: Cerrado",
        sunday: "Domingos y Festivos: Cerrado"
      },
      features: [
        "Consultas Médicas Generales",
        "Odontología General y Diagnóstico",
        "Salud Mental (Psicología y Psiquiatría)",
        "Ubicación céntrica cercana a estaciones de Metro Plaza de Armas y Cal y Canto"
      ]
    }
  ] as ClinicBranch[],

  categoriesAndSpecialties: [
    {
      category: "Salud Dental",
      system: "Dentalink",
      description: "Diagnóstico, prevención, estética y rehabilitación oral con tecnología de punta.",
      specialties: [
        "Odontología General y Diagnóstico Integral",
        "Ortodoncia (Frenillos Tradicionales y Alineadores Invisibles)",
        "Endodoncia (Tratamientos de conducto con microscopía y radiovisiografía)",
        "Periodoncia (Tratamiento de encías e implantes)",
        "Odontopediatría (Atención dental especializada para niños)",
        "Cirugía Bucal y Extracciones (incluye terceros molares / muelas del juicio)",
        "Rehabilitación Oral y Prótesis",
        "Estética Dental (Blanqueamiento, Carillas, Limpiezas Dentales / Profilaxis)"
      ]
    },
    {
      category: "Salud Mental",
      system: "Medilink",
      description: "Acompañamiento psicológico y psiquiátrico con enfoque humano y ético.",
      specialties: [
        "Psicología Adultos",
        "Psicología Infanto-Juvenil",
        "Psiquiatría Adultos",
        "Psiquiatría Infanto-Juvenil",
        "Evaluaciones Neuropsicológicas y Psicodiagnóstico",
        "Terapia de Pareja y Familiar",
        "Psicopedagogía"
      ]
    },
    {
      category: "Medicina General y Especialidades",
      system: "Medilink",
      description: "Atención preventiva, diagnóstica y terapéutica para todas las etapas de la vida.",
      specialties: [
        "Medicina General",
        "Medicina Interna",
        "Pediatría",
        "Dermatología",
        "Ginecología y Obstetricia",
        "Traumatología y Ortopedia",
        "Nutrición y Dietética",
        "Cardiología (Electrocardiogramas y controles)",
        "Gastroenterología",
        "Neurología Adulto"
      ]
    },
    {
      category: "Kinesiología y Rehabilitación",
      system: "Medilink",
      description: "Gimnasio terapéutico y tratamiento kinésico traumatológico, respiratorio y neuromuscular.",
      specialties: [
        "Kinesiología Traumatológica y Ortopédica",
        "Kinesiología Respiratoria (Niños y Adultos)",
        "Rehabilitación Post-Operatoria y Lesiones Deportivas",
        "Kinesiología del Piso Pélvico"
      ]
    },
    {
      category: "Toma de Muestras y Laboratorio Clínico",
      system: "Medilink / Presencial",
      description: "Exámenes de sangre, orina y cultivos con convenios y entrega oportuna de resultados.",
      specialties: [
        "Perfil Bioquímico y Hemograma",
        "Perfil Lipídico y Glucosa",
        "Exámenes Hormonales (Tiroides TSH/T4, etc.)",
        "Orina Completa y Urocultivo",
        "Test de Alergias y Marcadores"
      ]
    },
    {
      category: "Terapias Complementarias",
      system: "Medilink",
      description: "Enfoque holístico para el bienestar integral de la persona.",
      specialties: [
        "Acupuntura Médica",
        "Flores de Bach",
        "Masoterapia Terapéutica"
      ]
    }
  ],

  agreementsAndBenefits: [
    {
      name: "Tarjeta Mi Vita",
      discount: "25% de Descuento",
      details:
        "Descuento preferencial del 25% sobre el Arancel General en atenciones médicas y dentales para vecinos de Vitacura con tarjeta Mi Vita activa. Se puede validar en el validador online de la web o directamente con el RUT en mesón."
    },
    {
      name: "Fonasa y Bono PAD",
      details:
        "Atención con Bono Fonasa a través de sistema I-Med (huella digital) en mesón. Disponibilidad de Bonos PAD para diversas intervenciones y paquetes garantizados."
    },
    {
      name: "Isapres y Seguros Complementarios",
      details:
        "Emisión de boletas electrónicas y recetas médicas timbradas para reembolso en todas las Isapres (Banmédica, Colmena, Consalud, CruzBlanca, Nueva Masvida, Vida Tres, Esencial) y seguros de salud complementarios."
    },
    {
      name: "Alianzas y Convenios Corporativos",
      details:
        "Convenios especiales con colegios, universidades, fundaciones y empresas aliadas de Vitacura y Santiago."
    }
  ],

  bookingPlatforms: {
    dental: "Dentalink (Enlace disponible en la sección de agendamiento de la web)",
    medicalAndOthers: "Medilink (Enlace disponible en la sección de agendamiento de la web)",
    phone: "+56 2 2933 6740",
    inPerson: "Directamente en recepción en nuestras sucursales de Vitacura y Los Tribunales."
  },

  frequentlyAskedQuestions: [
    {
      q: "¿Cómo reservo una hora?",
      a: "Puedes agendar en línea a través de nuestro sitio web en la sección 'Agendar Hora' (usando Dentalink para odontología y Medilink para medicina y otras especialidades), o llamando al +56 2 2933 6740."
    },
    {
      q: "¿Cómo aplico el descuento de la Tarjeta Mi Vita?",
      a: "El 25% de descuento se aplica sobre el arancel general presentando tu RUT con tarjeta Mi Vita vigente al momento de pagar en recepción o validándola en nuestro módulo web."
    },
    {
      q: "¿Atienden urgencias vitales?",
      a: "No atendemos urgencias médicas con riesgo vital. Si tienes una emergencia de riesgo vital, debes acudir de inmediato al Servicio de Urgencia hospitalario más cercano o llamar al SAMU (131). Sí atendemos urgencias dentales y consultas médicas prioritarias en horario hábil según disponibilidad de agenda."
    },
    {
      q: "¿Cuáles son los medios de pago?",
      a: "Efectivo, Tarjetas de Débito (Redcompra), Tarjetas de Crédito, Transferencia Bancaria y Bonos I-Med (Fonasa / Isapres asociadas)."
    }
  ]
};

/**
 * Genera el System Prompt contextual para el modelo de Google AI Studio (Gemini).
 */
export function buildClinicSystemPrompt(): string {
  return `Eres "PoliBot", el asistente virtual inteligente, cálido y conciso del Policlínico Tabancura (Chile).

=== DIRECTIVA CRÍTICA DE CONCISIÓN Y ECONOMÍA DE TOKENS ===
- Sé EXTREMADAMENTE BREVE, PRECISO Y DIRECTO (máximo 2 a 3 viñetas cortas o 1 párrafo de menos de 80-100 palabras).
- Evita saludos largos, cortesías repetitivas o introducciones innecesarias.
- Entrega inmediatamente la respuesta concreta: dato exacto (dirección, horario, descuento, canal de reserva).
- Usa negritas solo para palabras clave indispensables.

=== MISIÓN Y TONO ===
- Responde siempre basado en los datos oficiales del Policlínico Tabancura en español de Chile.
- Tono empático, resolutivo y clínico.

=== INFORMACIÓN OFICIAL DE POLICLÍNICO TABANCURA ===
1. NATURALEZA:
   - Policlínico Tabancura es una corporación sin fines de lucro que ofrece atención médica, dental y de salud integral accesible y de calidad.

2. SUCURSALES Y HORARIOS:
   - SUCURSAL VITACURA (Casa Matriz):
     * Dirección: Av. Vitacura 8620, Vitacura.
     * Teléfono: +56 2 2933 6740.
     * Horario: Lunes a Viernes de 08:30 a 20:00 hrs. Sábados de 09:00 a 13:00 hrs.
     * Servicios: Atención Dental completa, Consultas Médicas, Salud Mental, Kinesiología, Laboratorio/Toma de Muestras.
   - SUCURSAL LOS TRIBUNALES:
     * Dirección: Calle Los Tribunales 1268, Vitacura.
     * Teléfono: +56 2 2933 6740.
     * Horario: Lunes a Viernes de 08:30 a 18:30 hrs. Sábados: Cerrado.
     * Servicios: Consultas Médicas Generales, Odontología General, Salud Mental.

3. ESPECIALIDADES Y ÁREAS DE ATENCIÓN:
   - Salud Dental (Agendamiento por Dentalink): Odontología General, Ortodoncia (frenillos y alineadores), Endodoncia, Periodoncia, Odontopediatría, Cirugía Bucal (terceros molares), Rehabilitación Oral e Implantes, Estética Dental y Limpiezas.
   - Salud Mental (Agendamiento por Medilink): Psicología Adulto e Infanto-Juvenil, Psiquiatría Adulto e Infanto-Juvenil, Terapia Familiar/Pareja, Evaluaciones Neuropsicológicas.
   - Medicina General y Especialidades (Agendamiento por Medilink): Medicina General, Medicina Interna, Pediatría, Dermatología, Traumatología, Nutrición, Ginecología, Cardiología, Neurología.
   - Kinesiología (Agendamiento por Medilink): Traumatológica, Respiratoria, Piso Pélvico, Rehabilitación física.
   - Laboratorio y Toma de Muestras: Exámenes de sangre, orina, perfil lipídico, hemograma, etc.
   - Terapias Complementarias: Acupuntura, Flores de Bach, Masoterapia.

4. CONVENIOS Y BENEFICIOS:
   - Tarjeta Mi Vita: 25% de descuento sobre el Arancel General en consultas médicas y dentales para residentes de Vitacura con tarjeta vigente.
   - Fonasa / Bono PAD: Venta de bonos por sistema I-Med (huella) en recepción y convenios PAD garantizados.
   - Isapres y Seguros Complementarios: Emisión de boletas y órdenes médicas para reembolso con todas las Isapres y aseguradoras.

5. AGENDAMIENTO Y CANALES:
   - En línea: Mediante el sitio web oficial en la sección "Agendar Hora" (Dentalink para dental, Medilink para médico/kine/salud mental).
   - Telefónico: Central +56 2 2933 6740.
   - Presencial: En los mesones de atención de Vitacura y Los Tribunales.

=== POLÍTICA DE ERRORES, FALLBACK Y PREGUNTAS FUERA DE CONTEXTO ===
1. PREGUNTAS NO ENCONTRADAS O ESPECÍFICAS NO CONFIRMADAS:
   - Si el usuario consulta por un procedimiento médico o quirúrgico muy complejo, especializado o no detallado en tu base de conocimiento (ej. resonancias magnéticas de alto campo, cirugías mayores hospitalarias, especialidades raras):
     * Explica amablemente que dicha información no figura en el catálogo directo de prestaciones ambulatorias.
     * Ofrece guiar al usuario a la categoría o especialidad más afín (ej. "Para dudas de traumatología o derivaciones a imágenes, puedes consultar con nuestros médicos generales o traumatólogos").
     * Invita a contactar directamente a la central telefónica (+56 2 2933 6740) o al mesón de atención para consultar casos específicos con recepción.
2. URGENCIAS VITALES O EMERGENCIAS GRAVES:
   - Si el paciente describe síntomas graves (dolor torácico opresivo, pérdida de conciencia, dificultad respiratoria severa, hemorragias profusas):
     * ACLARA DE INMEDIATO que el Policlínico no es un servicio de urgencia hospitalaria de alta complejidad.
     * Recomienda acudir inmediatamente al centro de urgencias más cercano (SAPU, SAR, Servicio de Urgencias de Hospital o Clínica) o llamar al SAMU (131).
3. CONSULTAS SOBRE ARANCELES EXACTOS NO DISPONIBLES:
   - Si preguntan el precio exacto de un código de laboratorio o procedimiento no listado, indícales que pueden revisar la sección de "/aranceles" y "/cotizador-examenes" en el menú de la web o cotizar llamando al mesón de atención.
4. LÍMITES Y RESPONSABILIDAD ÉTICA:
   - No emitas diagnósticos médicos definitivos ni recetas de fármacos controlados. Recomienda siempre reservar una hora con un profesional del Policlínico para una evaluación clínica presencial.`;
}
