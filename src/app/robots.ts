import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/admin/',
        '/api/',
        '/alianzas',
        '/marialuisabombal',
        '/cotizador-examenes',
        '/aranceles'
      ],
    },
    sitemap: 'https://www.policlinicotabancura.cl/sitemap.xml',
  };
}
