import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    // Workaround: Use raw SQL to get all fields including 'published' if Prisma client is stale
    const professionals: any[] = await prisma.$queryRaw`SELECT * FROM "Professional" ORDER BY id ASC`;
    
    // Mapeo manual de nombres de columna de la DB (con tildes y dos puntos) a los campos de la interfaz
    const mappedProfessionals = professionals.map(p => ({
      id: Number(p.id),
      firstName: p["Nombres:"] || p.firstName,
      lastName: p["Apellidos:"] || p.lastName,
      specialty: p["Especialidad:"] || p.specialty,
      area: p["Área:"] || p.area,
      description: p["Descripción para el sitio web:"] || p.description,
      education: p["Título / Universidad:"] || p.education,
      sucursal: p["Sucursal:"] || p.sucursal,
      rut: p["Rut:"] || p.rut,
      email: p["Correo electrónico:"] || p.email,
      phone: p["Teléfono de contacto:"] || p.phone,
      ageGroup: p["Grupo Etario:"] || p.ageGroup,
      otherTitles: p["Otros títulos académicos:"] || p.otherTitles,
      imageUrl: p["Imagen:"] || p.imageUrl,
      published: p.published === true || p.published === 1
    }));

    return NextResponse.json({ success: true, data: mappedProfessionals });
  } catch (error) {
    console.error("Error fetching professionals via SQL:", error);
    return NextResponse.json(
      { success: false, message: 'Error al obtener profesionales' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    const newProfessional = await prisma.professional.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        specialty: data.specialty,
        area: data.area,
        description: data.description,
        education: data.education,
        sucursal: data.sucursal,
        rut: data.rut,
        email: data.email,
        phone: data.phone,
        ageGroup: data.ageGroup,
        otherTitles: data.otherTitles,
        imageUrl: data.imageUrl,
        timestamp: data.timestamp || new Date().toISOString(),
        published: data.published !== undefined ? data.published : true,
      }
    });

    return NextResponse.json({ success: true, data: newProfessional });
  } catch (error) {
    console.error("Error creating professional:", error);
    return NextResponse.json(
      { success: false, message: 'Error al crear el profesional' },
      { status: 500 }
    );
  }
}
