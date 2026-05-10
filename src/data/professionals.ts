import prisma from '../lib/prisma';
import { unstable_noStore as noStore } from 'next/cache';

export interface Professional {
  id: number;
  name: string;
  specialty: string;
  area: string;
  description?: string | null;
  education?: string | null;
  sucursal?: string | null;
  image?: string | null;
  ageGroup?: string | null;
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
  { id: 5, name: "Andro Sapunar Rodríguez", specialty: "Kinesiología", area: "Medicina General", sucursal: "Vitacura", description: "Kinesiólogo enfocado en bienestar y rehabilitación física.", image: "/img_profesionales/perfilAndroSapunar.jpg", ageGroup: "Adolescentes (12 a 17 años)., Adulto - Joven (18 a 29 años)." },
  { id: 6, name: "Dr. Juan Pérez", specialty: "Kinesiología", area: "Medicina General", sucursal: "Los Tribunales", description: "Rehabilitación física y deportiva." },
  { id: 7, name: "Sra. Carmen Gloria", specialty: "Masoterapia", area: "Terapias Complementarias", sucursal: "Vitacura", description: "Masajes descontracturantes y relajación." },
  { id: 8, name: "Dr. Miguel Ángel", specialty: "Biomagnetismo", area: "Terapias Complementarias", sucursal: "Los Tribunales", description: "Terapia de imanes para el equilibrio integral." },
];

export async function getProfessionals(): Promise<Professional[]> {
  noStore(); // Desactiva completamente la caché para este fetch
  try {
    // Obtenemos los profesionales de la base de datos real (db_sst)
    const dbProfessionals = await prisma.professional.findMany({
      orderBy: { id: 'asc' }
    });

    if (dbProfessionals && dbProfessionals.length > 0) {
      // Mapeamos los campos reales de la DB al formato de la interfaz Professional
      return dbProfessionals.map((p) => {
        const name = `${p.firstName} ${p.lastName || ''}`.trim();
        let image = (p as any).imageUrl;

        // Si el usuario guardó un nombre de archivo, verificamos si necesita el prefijo de la carpeta
        if (image && !image.startsWith('/') && !image.startsWith('http')) {
          image = `/img_profesionales/${image}`;
        }
        
        // Mapeo manual de respaldo si la base de datos no tiene imagen explícita
        if (!image) {
          const lowerName = name.toLowerCase();
          if (lowerName.includes("andro") && lowerName.includes("sapunar")) {
            image = "/img_profesionales/perfilAndroSapunar.jpg";
          } else if (lowerName.includes("antonio") && lowerName.includes("alvear")) {
            image = "/img_profesionales/perfilAntonioAlvear.jpg";
          } else if (lowerName.includes("jaime") && lowerName.includes("correa")) {
            image = "/img_profesionales/perfilJaimeCorrea.jpg";
          } else if (lowerName.includes("covarrubias")) {
            image = "/img_profesionales/perfilTeresaCovarrubias.jpg";
          } else if (lowerName.includes("laura") && lowerName.includes("herrera")) {
            image = "/img_profesionales/perfilLauraHerrera.jpg";
          } else if (lowerName.includes("catalina") && lowerName.includes("rojas")) {
            image = "/img_profesionales/perfilCatalinaRojas.jpg";
          } else if (lowerName.includes("catalina") && lowerName.includes("villegas")) {
            image = "/img_profesionales/perfilCatalinaVillegas.jpg";
          } else if (lowerName.includes("carla") && lowerName.includes("mazzarelli")) {
            image = "/img_profesionales/perfilCarlaMazzarelli.jpg";
          } else if (lowerName.includes("felipe") && lowerName.includes("valenzuela")) {
            image = "/img_profesionales/perfilFelipeValenzuela.jpg";
          } else if (lowerName.includes("isabel") && lowerName.includes("rodriguez")) {
            image = "/img_profesionales/perfilIsabelRodriguez.jpg";
          } else if (lowerName.includes("marcela") && lowerName.includes("burgos")) {
            image = "/img_profesionales/perfilMarcelaBurgos.jpg";
          } else if (lowerName.includes("patricio") && lowerName.includes("merino")) {
            image = "/img_profesionales/perfilPatricioMerino.jpg";
          } else if (lowerName.includes("pauline") && lowerName.includes("heinriksen")) {
            image = "/img_profesionales/perfilPaulineHeinriksen.jpg";
          }
        }
        
        if (image) {
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
          image,
          ageGroup: p.ageGroup
        };
      });
    }
    
    return PROFESSIONALS;
  } catch (error) {
    console.error("Error al conectar con la base de datos real, usando fallback:", error);
    return PROFESSIONALS;
  }
}
