export interface Professional {
  name: string;
  specialty: string;
  area: string;
  description?: string;
  education?: string;
  sucursal?: string;
}

export const AREAS = [
  "Salud Dental",
  "Salud Mental",
  "Medicina General",
  "Terapias Alternativas",
] as const;

export type Area = (typeof AREAS)[number];

export const PROFESSIONALS: Professional[] = [
  // Salud Dental
  { 
    name: "Patricia Montalva", 
    specialty: "Odontología General", 
    area: "Salud Dental",
    description: "Especialista en odontología restauradora y estética. Con un enfoque en la prevención y el cuidado integral del paciente.",
    education: "Universidad de los Andes",
    sucursal: "Sucursal Vitacura"
  },
  { 
    name: "Daissy McKenzie", 
    specialty: "Odontología General", 
    area: "Salud Dental" 
  },
  { 
    name: "Gardenia Saldías Ruiz", 
    specialty: "Odontología General", 
    area: "Salud Dental" 
  },
  { 
    name: "Jorge Ramillanca Rain", 
    specialty: "Odontología General", 
    area: "Salud Dental" 
  },
  { 
    name: "Patricio Ignacio Merino Acevedo", 
    specialty: "Odontología General", 
    area: "Salud Dental",
    description: "Enfoque cercano y empático con una práctica clínica rigurosa y basada en la evidencia. Especialista en generar espacios de confianza para niños y pacientes ansiosos.",
    education: "Cirujano Dentista de la Universidad de Chile. Diplomado Estética en Odontología Restauradora.",
    sucursal: "Sucursal Vitacura"
  },
  { 
    name: "Antonio Alvear Muñoz", 
    specialty: "Odontología General", 
    area: "Salud Dental" 
  },
  { 
    name: "Matías Enrique Navarrete", 
    specialty: "Trastornos Temporomandibulares", 
    area: "Salud Dental" 
  },
  { 
    name: "Trinidad Sánchez Ruiz", 
    specialty: "Odontopediatría", 
    area: "Salud Dental" 
  },
  { 
    name: "Macarena Andrea Fuenzalida Calorio", 
    specialty: "Odontopediatría", 
    area: "Salud Dental",
    description: "Mi enfoque es priorizar el bienestar de los pacientes, que los niños tengan una muy buena experiencia y se sientan cómodos en su atención dental.",
    education: "Cirujano dentista de la Universidad de los Andes. Postítulo de Odontopediatría.",
    sucursal: "Sucursal Casa Matriz, Sucursal Vitacura"
  },
  { 
    name: "Daniela Constanza Alvarado Duarte", 
    specialty: "Odontopediatría", 
    area: "Salud Dental" 
  },
  { 
    name: "Catalina Villegas Lagos", 
    specialty: "Endodoncia", 
    area: "Salud Dental" 
  },
  { 
    name: "Caterina Benapres Cortés", 
    specialty: "Endodoncia", 
    area: "Salud Dental" 
  },
  { 
    name: "Consuelo Olivares Ortega", 
    specialty: "Endodoncia", 
    area: "Salud Dental" 
  },
  { 
    name: "María Soledad Iturra Lepe", 
    specialty: "Endodoncia", 
    area: "Salud Dental",
    description: "Amplia trayectoria en odontología, endodoncia y en el manejo emocional en pacientes sensibles a la atención odontológica.",
    education: "Cirujano Dentista de la Universidad de Chile. Especialización en Endodoncia Universidad de Chile.",
    sucursal: "Sucursal Casa Matriz"
  },
  { 
    name: "Felipe Valenzuela Pinto", 
    specialty: "Cirugía", 
    area: "Salud Dental" 
  },
  { 
    name: "Camila Del Puerto Vergara", 
    specialty: "Ortodoncia", 
    area: "Salud Dental" 
  },
  { 
    name: "Antonia Pardo Ortileb", 
    specialty: "Ortodoncia", 
    area: "Salud Dental" 
  },
  { 
    name: "Josefina Maass Avilés", 
    specialty: "Periodoncia", 
    area: "Salud Dental",
    description: "Especialista en Periodoncia con enfoque en la salud de las encías y tejidos de soporte.",
    education: "Especialización en Periodoncia y Magíster en Docencia Universitaria.",
    sucursal: "Sucursal Vitacura"
  },
  { 
    name: "Carmen Gloria Mejías Matus", 
    specialty: "Periodoncia", 
    area: "Salud Dental" 
  },
  { 
    name: "Florencia Mizala García", 
    specialty: "Periodoncia", 
    area: "Salud Dental" 
  },
  { 
    name: "David Sandoval Miranda", 
    specialty: "Rehabilitación Oral", 
    area: "Salud Dental" 
  },
  { 
    name: "Grace Martinson Tejada", 
    specialty: "Rehabilitación Oral", 
    area: "Salud Dental" 
  },
  { 
    name: "Sebastián Ortiz Mery", 
    specialty: "Rehabilitación Oral", 
    area: "Salud Dental" 
  },
  { 
    name: "Pauline Henriksen Pérez", 
    specialty: "Rehabilitación Oral", 
    area: "Salud Dental" 
  },
  { 
    name: "Jorge Valdés Albornoz", 
    specialty: "Rehabilitación Oral", 
    area: "Salud Dental" 
  },
  { 
    name: "Felipe Valenzuela Pinto", 
    specialty: "Implantología", 
    area: "Salud Dental" 
  },
  { 
    name: "Andrés Horst Hampel Aljaro", 
    specialty: "Implantología", 
    area: "Salud Dental" 
  },
  { 
    name: "Loreto Torres Sánchez", 
    specialty: "Implantología", 
    area: "Salud Dental" 
  },
  { 
    name: "José Joaquín Vial Balmaceda", 
    specialty: "Radiología", 
    area: "Salud Dental" 
  },

  // Salud Mental
  { 
    name: "Isabel Rodríguez Legrand", 
    specialty: "Psicología", 
    area: "Salud Mental",
    description: "Psicóloga clínica de adultos. Concibe la psicoterapia como un espacio de autoconocimiento y transformación. Experiencia en ansiedad, depresión, duelo y trauma.",
    education: "Psicóloga Universidad Diego Portales. Magíster en Psicología Clínica de Adultos de la Universidad de Chile.",
    sucursal: "Sucursal Vitacura"
  },
  { 
    name: "Valentina Briseño Ossandón", 
    specialty: "Psicología", 
    area: "Salud Mental" 
  },
  { 
    name: "Isidora Luengo Larraín", 
    specialty: "Psicología", 
    area: "Salud Mental" 
  },
  { 
    name: "Carola Poblete Plaza", 
    specialty: "Psicología", 
    area: "Salud Mental" 
  },
  { 
    name: "Sergio Parada Escobar", 
    specialty: "Psicología", 
    area: "Salud Mental" 
  },
  { 
    name: "Carla Andrea Mazzarelli Rodríguez", 
    specialty: "Psicología", 
    area: "Salud Mental",
    description: "Psicóloga clínica formada en modelo Integrativo y orientación sistémica. Experiencia en contextos complejos psicosociojurídicos y gestión emocional.",
    education: "Universidad Católica de Chile. Mediadora familiar en Universidad de Chile.",
    sucursal: "Sucursal Vitacura, Teleconsulta"
  },
  { 
    name: "Carolina Fones Caballero", 
    specialty: "Psicología", 
    area: "Salud Mental" 
  },
  { 
    name: "Catalina Rojas Campillo", 
    specialty: "Psicología", 
    area: "Salud Mental" 
  },
  { 
    name: "Teresa Covarrubias Correa", 
    specialty: "Psicología", 
    area: "Salud Mental" 
  },
  { 
    name: "Marcela Burgos Díaz", 
    specialty: "Psicología", 
    area: "Salud Mental" 
  },
  { 
    name: "Francisca Cisternas Lira", 
    specialty: "Psicología", 
    area: "Salud Mental" 
  },
  { 
    name: "María José García Doménech", 
    specialty: "Psicología", 
    area: "Salud Mental" 
  },
  { 
    name: "Carola Muñoz Poblete", 
    specialty: "Psicología", 
    area: "Salud Mental" 
  },
  { 
    name: "Catalina Aris Faúndez", 
    specialty: "Fonoaudiología", 
    area: "Salud Mental" 
  },
  { 
    name: "Lucas Andrés Martínez Pucci", 
    specialty: "Psiquiatría", 
    area: "Salud Mental" 
  },
  { 
    name: "Pablo Santa Cruz Guzmán", 
    specialty: "Psiquiatría", 
    area: "Salud Mental" 
  },
  { 
    name: "Jaime Correa Domínguez", 
    specialty: "Psiquiatría", 
    area: "Salud Mental" 
  },
  { 
    name: "Inés Armstrong Cox", 
    specialty: "Psicopedagogía", 
    area: "Salud Mental" 
  },
  { 
    name: "María Ximena Olivares Díaz", 
    specialty: "Psicopedagogía", 
    area: "Salud Mental",
    description: "Especialista en desarrollo de pensamiento.",
    education: "Profesora educación Media PUC. Psicopedagoga Universidad Tarapacá.",
    sucursal: "Sucursal Vitacura"
  },

  // Medicina General
  { 
    name: "Cristian Prado Jara", 
    specialty: "Medicina", 
    area: "Medicina General" 
  },
  { 
    name: "Gloria Reti Malusa", 
    specialty: "Pediatría", 
    area: "Medicina General" 
  },
  { 
    name: "Charityn Salazar Yáñez", 
    specialty: "Podología Clínica", 
    area: "Medicina General" 
  },
  { 
    name: "Paulina Velásquez Catrifil", 
    specialty: "Kinesiología", 
    area: "Medicina General" 
  },
  { 
    name: "Andro Sapunar Rodríguez", 
    specialty: "Kinesiología", 
    area: "Medicina General" 
  },
  { 
    name: "Javiera Marchant Vio", 
    specialty: "Administración de Medicamentos", 
    area: "Medicina General" 
  },

  // Terapias Alternativas
  { 
    name: "Pilar Bello Martínez", 
    specialty: "Biomagnetismo", 
    area: "Terapias Alternativas" 
  },
  { 
    name: "Carlos Yamil García - Huidobro Acosta", 
    specialty: "Masoterapia", 
    area: "Terapias Alternativas" 
  },
];
