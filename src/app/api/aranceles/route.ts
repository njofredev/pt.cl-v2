import { NextResponse } from 'next/server';
import { getAranceles } from '@/data/aranceles';

export const dynamic = 'force-dynamic'; // Asegura que las peticiones obtengan precios en tiempo real

export async function GET() {
  try {
    const data = await getAranceles();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching aranceles in API route:', error);
    return NextResponse.json({ error: 'Failed to fetch aranceles' }, { status: 500 });
  }
}
