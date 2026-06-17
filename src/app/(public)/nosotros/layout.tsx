import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Quiénes Somos',
  description: 'Nacimos del voluntariado y la vocación de servicio. Hoy somos un referente de atención ambulatoria integral en la comuna de Vitacura.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
