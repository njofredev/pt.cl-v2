import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Centro Radiológico',
  description: 'Próximamente contaremos con un nuevo centro digitalizado para ofrecerte imágenes de alta resolución.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
