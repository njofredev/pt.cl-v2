import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bono PAD Fonasa',
  description: 'Información y valores de tratamientos odontológicos con cobertura del Bono PAD de Fonasa en nuestro centro.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
