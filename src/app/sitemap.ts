import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.policlinicotabancura.cl';
  
  const routes = [
    '',
    '/nosotros',
    '/servicios/dental',
    '/servicios/mental',
    '/servicios/medicina',
    '/servicios/terapias',
    '/convenios',
    '/bonopad',
    '/derechos-y-deberes',
    '/agenda',
    '/novedades/centro-radiologico',
    '/novedades/laboratorio',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1.0 : route.startsWith('/servicios') ? 0.9 : 0.7,
  }));
}
