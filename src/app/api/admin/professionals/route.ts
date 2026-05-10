import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const professionals = await prisma.professional.findMany({
      orderBy: { id: 'asc' }
    });
    return NextResponse.json({ success: true, data: professionals });
  } catch (error) {
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
