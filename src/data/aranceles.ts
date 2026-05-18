import prisma from '../lib/prisma';
import { unstable_noStore as noStore } from 'next/cache';

export interface ArancelItem {
  id: number;
  source: string; // 'dentalink' | 'medilink'
  category: string;
  name: string;
  priceBase: number | null;
  pricePref: number | null;
  hasDiscount: boolean;
  discountPercentage: number;
}

export async function getAranceles(): Promise<ArancelItem[]> {
  noStore(); // Asegura consultas frescas sin caché en el servidor Next.js
  try {
    const dbAranceles = await prisma.$queryRaw<any[]>`SELECT * FROM "Arancel" ORDER BY category ASC, name ASC`;
    
    return dbAranceles.map((item) => ({
      id: item.id,
      source: item.source,
      category: item.category,
      name: item.name,
      priceBase: item.priceBase,
      pricePref: item.pricePref,
      hasDiscount: item.hasDiscount,
      discountPercentage: item.discountPercentage,
    }));
  } catch (error) {
    console.error("Error fetching aranceles from database:", error);
    return [];
  }
}
