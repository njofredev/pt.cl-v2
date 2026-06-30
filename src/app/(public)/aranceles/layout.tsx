import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nuestros Aranceles',
  description: 'Consulta los valores generales y preferenciales asociados a nuestras especialidades clínicas y odontológicas.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
