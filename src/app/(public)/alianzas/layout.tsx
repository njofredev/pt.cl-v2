import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Alianzas y Descuentos',
  description: 'Explora nuestras alianzas vigentes para acceder a una salud integral de primer nivel con precios preferenciales.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
