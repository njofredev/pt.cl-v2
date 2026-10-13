import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

function generateSlug(text: string) {
  return text
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Quita tildes
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export async function GET() {
  try {
    const posts = await prisma.blogPost.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ success: true, data: posts });
  } catch (error) {
    console.error('Error fetching admin blog posts:', error);
    return NextResponse.json(
      { success: false, message: 'Error al obtener artículos' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    let slug = data.slug ? generateSlug(data.slug) : generateSlug(data.title);
    if (!slug) {
      slug = `articulo-${Date.now()}`;
    }

    // Check slug uniqueness
    const existing = await prisma.blogPost.findUnique({
      where: { slug },
    });
    if (existing) {
      slug = `${slug}-${Date.now().toString().slice(-4)}`;
    }

    const post = await prisma.blogPost.create({
      data: {
        title: data.title,
        slug,
        excerpt: data.excerpt || null,
        content: data.content,
        category: data.category || 'General',
        author: data.author || 'Equipo Médico',
        imageUrl: data.imageUrl || null,
        readingTime: data.readingTime || '3 min',
        published: Boolean(data.published),
        publishedAt: data.published ? new Date() : null,
      },
    });

    return NextResponse.json({ success: true, data: post });
  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json(
      { success: false, message: 'Error al crear el artículo' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    if (!data.id) {
      return NextResponse.json(
        { success: false, message: 'ID es requerido' },
        { status: 400 }
      );
    }

    const updateData: any = {
      title: data.title,
      excerpt: data.excerpt,
      content: data.content,
      category: data.category,
      author: data.author,
      imageUrl: data.imageUrl,
      readingTime: data.readingTime,
      published: Boolean(data.published),
    };

    if (data.slug) {
      updateData.slug = generateSlug(data.slug);
    }

    if (data.published && !data.publishedAt) {
      updateData.publishedAt = new Date();
    }

    const post = await prisma.blogPost.update({
      where: { id: Number(data.id) },
      data: updateData,
    });

    return NextResponse.json({ success: true, data: post });
  } catch (error) {
    console.error('Error updating blog post:', error);
    return NextResponse.json(
      { success: false, message: 'Error al actualizar el artículo' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'ID es requerido' },
        { status: 400 }
      );
    }

    await prisma.blogPost.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ success: true, message: 'Artículo eliminado' });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return NextResponse.json(
      { success: false, message: 'Error al eliminar el artículo' },
      { status: 500 }
    );
  }
}
