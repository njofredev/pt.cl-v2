import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const data = await request.json();
    
    const updatedProfessional = await prisma.professional.update({
      where: { id: parseInt(id) },
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
      }
    });

    return NextResponse.json({ success: true, data: updatedProfessional });
  } catch (error) {
    console.error("Error updating professional:", error);
    return NextResponse.json(
      { success: false, message: 'Error al actualizar el profesional' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    
    await prisma.professional.delete({
      where: { id: parseInt(id) }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting professional:", error);
    return NextResponse.json(
      { success: false, message: 'Error al eliminar el profesional' },
      { status: 500 }
    );
  }
}
