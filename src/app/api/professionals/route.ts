import { NextResponse } from 'next/server';
import { getProfessionals } from '@/data/professionals';

export const dynamic = 'force-dynamic'; // Aseguramos que siempre consulte datos frescos

export async function GET() {
  try {
    const data = await getProfessionals();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching professionals for Search API:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
