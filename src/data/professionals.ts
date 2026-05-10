import prisma from '../lib/prisma';

export interface Professional {
  id: number;
  name: string;
  specialty: string;
  area: string;
  description?: string | null;
  education?: string | null;
  sucursal?: string | null;
  image?: string | null;
}

export const AREAS = [
  "Salud Dental",
  "Salud Mental",
  "Medicina General",
  "Terapias Complementarias",
] as const;

export type Area = (typeof AREAS)[number];

// Datos estáticos de respaldo
export const PROFESSIONALS: Professional[] = [
  { id: 1, name: "Dra. Ana María Silva", specialty: "Odontología General", area: "Salud Dental", sucursal: "Los Tribunales", description: "Especialista en odontología conservadora y estética dental." },
  { id: 2, name: "Dr. Carlos Rodríguez", specialty: "Endodoncia", area: "Salud Dental", sucursal: "Vitacura", description: "Experto en tratamientos de conducto y rehabilitación." },
  { id: 3, name: "Ps. Roberto Muñoz", specialty: "Psicología Clínica", area: "Salud Mental", sucursal: "Los Tribunales", description: "Especialista en terapia de adultos y parejas." },
  { id: 4, name: "Dra. Laura Venegas", specialty: "Psiquiatría Adultos", area: "Salud Mental", sucursal: "Vitacura", description: "Atención especializada en trastornos del ánimo y ansiedad." },
  { id: 5, name: "Andro Sapunar Rodríguez", specialty: "Kinesiología", area: "Medicina General", sucursal: "Vitacura", description: "Kinesiólogo enfocado en bienestar y rehabilitación física.", image: "/img_profesionales/perfilAndroSapunar.jpg" },
  { id: 6, name: "Dr. Juan Pérez", specialty: "Kinesiología", area: "Medicina General", sucursal: "Los Tribunales", description: "Rehabilitación física y deportiva." },
  { id: 7, name: "Sra. Carmen Gloria", specialty: "Masoterapia", area: "Terapias Complementarias", sucursal: "Vitacura", description: "Masajes descontracturantes y relajación." },
  { id: 8, name: "Dr. Miguel Ángel", specialty: "Biomagnetismo", area: "Terapias Complementarias", sucursal: "Los Tribunales", description: "Terapia de imanes para el equilibrio integral." },
];

export async function getProfessionals(): Promise<Professional[]> {
  try {
    // Obtenemos los profesionales de la base de datos real (db_sst)
    const dbProfessionals = await prisma.professional.findMany({
      orderBy: { id: 'asc' }
    });

    if (dbProfessionals && dbProfessionals.length > 0) {
      // Mapeamos los campos reales de la DB al formato de la interfaz Professional
      return dbProfessionals.map((p) => {
        const name = `${p.firstName} ${p.lastName || ''}`.trim();
        let image = null;
        
        // Mapeo manual de imágenes para pruebas
        const lowerName = name.toLowerCase();
        if (lowerName.includes("andro") && lowerName.includes("sapunar")) {
          image = "/img_profesionales/perfilAndroSapunar.jpg";
          console.log(`Matched image for: ${name} -> ${image}`);
        }

        return {
          id: p.id,
          name,
          specialty: p.specialty,
          area: p.area,
          description: p.description,
          education: p.education,
          sucursal: p.sucursal,
          image
        };
      });
    }
    
    return PROFESSIONALS;
  } catch (error) {
    console.error("Error al conectar con la base de datos real, usando fallback:", error);
    return PROFESSIONALS;
  }
}
