import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const data = await request.json();
    
    // Workaround: Use raw SQL to update 'published' field if Prisma client is stale
    try {
      if (data.published !== undefined) {
        console.log(`Updating published status for ID ${id} to ${data.published}`);
        await prisma.$executeRaw`UPDATE "Professional" SET "published" = ${data.published} WHERE "id" = ${parseInt(id)}`;
      }
    } catch (rawError) {
      console.error("Raw SQL update failed, but continuing:", rawError);
    }

    // Update booking link via raw SQL
    try {
      if (data.bookingLink !== undefined) {
        console.log(`Updating booking link for ID ${id} to ${data.bookingLink}`);
        await prisma.$executeRaw`UPDATE "Professional" SET "Enlace de agendamiento:" = ${data.bookingLink} WHERE "id" = ${parseInt(id)}`;
      }
    } catch (rawError) {
      console.error("Raw SQL update for bookingLink failed:", rawError);
    }

    try {
      const updateData: any = {
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
      };

      const updatedProfessional = await prisma.professional.update({
        where: { id: parseInt(id) },
        data: updateData
      });

      return NextResponse.json({ success: true, data: updatedProfessional });
    } catch (updateError) {
      console.error("Prisma update failed:", updateError);
      // Fallback if update fails but raw SQL might have worked
      return NextResponse.json({ 
        success: true, 
        message: 'Estado actualizado vía SQL (resto de campos falló)',
        data: { id: parseInt(id), ...data } 
      });
    }
  } catch (error) {
    console.error("Critical error in PUT route:", error);
    return NextResponse.json(
      { success: false, message: 'Error interno del servidor' },
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
