import { Metadata } from 'next';
import BlogListClient from './BlogListClient';

export const metadata: Metadata = {
  title: 'Blog de Salud | Policlínico Tabancura',
  description: 'Artículos, recomendaciones médicas y novedades de salud de Policlínico Tabancura.',
};

export default function BlogPage() {
  return <BlogListClient />;
}
