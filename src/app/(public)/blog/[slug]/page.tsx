import { Metadata } from 'next';
import prisma from '@/lib/prisma';
import BlogPostDetailClient from './BlogPostDetailClient';
import { notFound } from 'next/navigation';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({
    where: { slug },
  });

  if (!post || !post.published) {
    return {
      title: 'Artículo no encontrado | Policlínico Tabancura',
    };
  }

  return {
    title: `${post.title} | Blog Policlínico Tabancura`,
    description: post.excerpt || `Lee sobre ${post.title} en el blog oficial de Policlínico Tabancura.`,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({
    where: { slug },
  });

  if (!post || !post.published) {
    notFound();
  }

  // Obtener artículos sugeridos (los más recientes excluyendo el actual)
  const suggestedPosts = await prisma.blogPost.findMany({
    where: {
      published: true,
      NOT: { id: post.id },
    },
    take: 3,
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      slug: true,
      title: true,
      excerpt: true,
      category: true,
      author: true,
      imageUrl: true,
      readingTime: true,
      createdAt: true,
    },
  });

  return (
    <BlogPostDetailClient 
      post={JSON.parse(JSON.stringify(post))} 
      suggestedPosts={JSON.parse(JSON.stringify(suggestedPosts))}
    />
  );
}
