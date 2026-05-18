import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cotizador de Exámenes | Policlínico Tabancura',
  description: 'Cotiza tus exámenes de laboratorio de forma rápida y sencilla. Obtén valores particulares y Fonasa al instante.',
};

export default function CotizadorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
