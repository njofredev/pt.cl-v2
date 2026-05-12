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
  { id: 5, name: "Andro Sapunar Rodríguez", specialty: "Kinesiología", area: "Medicina General", sucursal: "Vitacura", description: "Kinesiólogo enfocado en bienestar y rehabilitación física.", image: "/img_profesionales/perfilAndroSapunar_v2.jpg", ageGroup: "Adolescentes (12 a 17 años)., Adulto - Joven (18 a 29 años)." },
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
          const lowerName = name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
          if (lowerName.includes("andro") && lowerName.includes("sapunar")) {
            image = "/img_profesionales/perfilAndroSapunar_v2.jpg";
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
          } else if (lowerName.includes("yamil") || (lowerName.includes("carlos") && lowerName.includes("garc"))) {
            image = "/img_profesionales/perfilCarlosGarcia_v2.jpg";
          } else if (lowerName.includes("charytin") || lowerName.includes("gonzalez")) {
            // Use a stricter check just in case or combine for better accuracy
            if (lowerName.includes("charytin")) {
               image = "/img_profesionales/perfilCharytinGonzalez_v2.jpg";
            }
          } else if (lowerName.includes("pilar") && lowerName.includes("bello")) {
            image = "/img_profesionales/perfilPilarBello_v2.jpg";
          } else if (lowerName.includes("catalina") && lowerName.includes("aris")) {
            image = "/img_profesionales/perfilCatalinaAris.jpg";
          } else if (lowerName.includes("gloria") && lowerName.includes("reti")) {
            image = "/img_profesionales/perfilGloriaReti.jpg";
          } else if (lowerName.includes("javiera") && lowerName.includes("marchant")) {
            image = "/img_profesionales/perfilJavieraMarchant.jpg";
          } else if (lowerName.includes("sebastian") && lowerName.includes("ortiz")) {
            image = "/img_profesionales/perfilSebastianOrtiz.jpg";
          } else if (lowerName.includes("carola") && lowerName.includes("munoz")) {
            image = "/img_profesionales/perfilCarolaMuñoz.jpg";
          } else if (lowerName.includes("carola") && lowerName.includes("poblete")) {
            image = "/img_profesionales/perfilCarolaPoblete.jpg";
          } else if (lowerName.includes("florencia") && lowerName.includes("mizala")) {
            image = "/img_profesionales/perfilFlorenciaMizala.jpg";
          } else if (lowerName.includes("jorge") && lowerName.includes("ramillanca")) {
            image = "/img_profesionales/perfilJorgeRamillanca.jpg";
          } else if (lowerName.includes("sergio") && lowerName.includes("parada")) {
            image = "/img_profesionales/perfilSergioParada.jpg";
          } else if (lowerName.includes("andres") && lowerName.includes("hampel")) {
            image = "/img_profesionales/perfilAndresHampel.jpg";
          } else if (lowerName.includes("antonia") && lowerName.includes("pardo")) {
            image = "/img_profesionales/perfilAntoniaPardo.jpg";
          } else if (lowerName.includes("cristian") && lowerName.includes("prado")) {
            image = "/img_profesionales/perfilCristianPrado.jpg";
          } else if (lowerName.includes("daissy") && lowerName.includes("mckenzie")) {
            image = "/img_profesionales/perfilDaissyMckenzie.jpg";
          } else if (lowerName.includes("daniela") && lowerName.includes("alvarado")) {
            image = "/img_profesionales/perfilDanielaAlvarado.jpg";
          } else if (lowerName.includes("francisca") && lowerName.includes("lira")) {
            image = "/img_profesionales/perfilFranciscaLira.jpg";
          } else if (lowerName.includes("grace") && lowerName.includes("martinson")) {
            image = "/img_profesionales/perfilGraceMartinson.jpg";
          } else if (lowerName.includes("ines") && (lowerName.includes("armstrong") || lowerName.includes("artmstrong"))) {
            image = "/img_profesionales/perfilInesArtmstrong.jpg";
          } else if (lowerName.includes("joaquin") && lowerName.includes("vial")) {
            image = "/img_profesionales/perfilJoaquinVial.jpg";
          } else if (lowerName.includes("jorge") && lowerName.includes("valdes")) {
            image = "/img_profesionales/perfilJorgeValdes.jpg";
          } else if (lowerName.includes("josefina") && (lowerName.includes("mass") || lowerName.includes("maass"))) {
            image = "/img_profesionales/perfilJosefinaMass.jpg";
          } else if (lowerName.includes("jose") && lowerName.includes("domenech")) {
            image = "/img_profesionales/perfilMariaJoseDomenech.jpg";
          } else if (lowerName.includes("soledad") && lowerName.includes("iturra")) {
            image = "/img_profesionales/perfilMariaSoledadIturra.jpg";
          } else if (lowerName.includes("matias") && lowerName.includes("navarrete")) {
            image = "/img_profesionales/perfilMatiasNavarrete.jpg";
          } else if (lowerName.includes("pablo") && lowerName.includes("santa")) {
            image = "/img_profesionales/perfilPabloSantaCruz.jpg";
          } else if (lowerName.includes("ximena") && lowerName.includes("olivares")) {
            image = "/img_profesionales/perfilXimenaOlivares.jpg";
          } else if (lowerName.includes("camila") && lowerName.includes("puerto")) {
            image = "/img_profesionales/perfilCamiladelPuerto.jpg";
          } else if (lowerName.includes("carmen") && lowerName.includes("mejias")) {
            image = "/img_profesionales/perfilCarmenGloriaMejias.jpg";
          } else if (lowerName.includes("carolina") && lowerName.includes("fones")) {
            image = "/img_profesionales/perfilCarolinaFones.jpg";
          } else if (lowerName.includes("caterina") && lowerName.includes("benapres")) {
            image = "/img_profesionales/perfilCaterinaBenapres.jpg";
          } else if (lowerName.includes("consuelo") && lowerName.includes("olivares")) {
            image = "/img_profesionales/perfilConsueloOlivares.jpg";
          } else if (lowerName.includes("david") && lowerName.includes("sandoval")) {
            image = "/img_profesionales/perfilDavidSandoval.jpg";
          } else if (lowerName.includes("gardenia") && lowerName.includes("saldias")) {
            image = "/img_profesionales/perfilGardeniaSaldías.jpg";
          } else if (lowerName.includes("isidora") && lowerName.includes("luengo")) {
            image = "/img_profesionales/perfilIsidoraLuengo.jpg";
          } else if (lowerName.includes("loreto") && lowerName.includes("torres")) {
            image = "/img_profesionales/perfilLoretoTorres.jpg";
          } else if (lowerName.includes("macarena") && lowerName.includes("fuenzalida")) {
            image = "/img_profesionales/perfilMacarenaFuenzalida.jpg";
          } else if (lowerName.includes("patricia") && lowerName.includes("montalva")) {
            image = "/img_profesionales/perfilPatriciaMontalva.jpg";
          } else if (lowerName.includes("paulina") && lowerName.includes("velasquez")) {
            image = "/img_profesionales/perfilPaulinaVelasquez.jpg";
          } else if (lowerName.includes("trinidad") && lowerName.includes("sanchez")) {
            image = "/img_profesionales/perfilTrinidadSanchez.jpg";
          } else if (lowerName.includes("valentina") && lowerName.includes("briseno")) {
            image = "/img_profesionales/perfilValentinaBriseño.jpg";
          }
        }
        
        // Safety fix: re-enforcing Charytin check outside block if previous logic was too simple
        if (!image && name.toLowerCase().includes("charytin")) {
           image = "/img_profesionales/perfilCharytinGonzalez_v2.jpg";
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
