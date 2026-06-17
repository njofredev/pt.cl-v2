import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Convenios y Beneficios',
  description: 'Conoce todos nuestros convenios, beneficios y opciones de pago con Isapres, Fonasa y seguros complementarios.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
