import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Convenio María Luisa Bombal',
  description: 'Beneficio exclusivo para la comunidad María Luisa Bombal en Policlínico Tabancura.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
