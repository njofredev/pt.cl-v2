import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Derechos y Deberes',
  description: 'En Policlínico Tabancura nos comprometemos con una atención de excelencia y respeto mutuo.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
