import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Alianzas y Descuentos',
  description: 'Explora nuestras alianzas vigentes para acceder a una salud integral de primer nivel con precios preferenciales.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
