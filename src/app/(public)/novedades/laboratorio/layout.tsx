import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Laboratorio Clínico',
  description: 'Información sobre la toma de muestras y nuestro laboratorio clínico.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
