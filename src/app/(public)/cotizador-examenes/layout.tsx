import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cotizador de Exámenes',
  description: 'Cotiza tus exámenes de laboratorio de forma rápida y sencilla. Obtén valores particulares y Fonasa al instante.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function CotizadorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
