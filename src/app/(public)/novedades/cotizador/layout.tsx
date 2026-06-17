import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cotizador de Servicios',
  description: 'Herramienta de cotización de servicios médicos en nuestro centro.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
