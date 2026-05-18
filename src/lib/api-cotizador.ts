
export interface Exam {
  id: number;
  codigo: string;
  nombre: string;
  valor_particular_general: number;
  valor_particular_preferencial: number;
  valor_bono_fonasa: number;
  valor_copago: number;
  created_at: string;
  updated_at: string;
}

export interface Package {
  id: number;
  nombre: string;
  descripcion: string;
  examenes: Exam[];
}

export interface PatientData {
  nombre_paciente: string;
  documento_id: string;
  tipo_documento: string;
  email: string;
  telefono: string;
  prevision: string;
  fecha_nacimiento: string;
}

export interface QuoteRequest {
  nombre_paciente: string;
  fecha_nacimiento: string;
  tipo_documento: string;
  documento_id: string;
  prevision: string;
  email: string;
  telefono: string;
  es_publico?: boolean;
  pack_activo?: string;
  examenes: { 
    codigo: string; 
    nombre: string;
    cantidad: number;
    valor_bono_fonasa: number;
    valor_copago: number;
    valor_particular_general: number;
    valor_particular_preferencial: number;
  }[];
}

const BASE_URL = '/api/cotizador';

export async function fetchExams(): Promise<Exam[]> {
  const response = await fetch(`${BASE_URL}/examenes`);
  if (!response.ok) throw new Error('Failed to fetch exams');
  return response.json();
}

export async function fetchPackages(): Promise<Package[]> {
  const response = await fetch(`${BASE_URL}/paquetes`);
  if (!response.ok) throw new Error('Failed to fetch packages');
  return response.json();
}

export async function generateQuote(data: QuoteRequest): Promise<{ url_pdf: string }> {
  const response = await fetch(`${BASE_URL}/cotizar`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    console.error('API Error Details:', errorData);
    throw new Error(errorData.message || 'Failed to generate quote');
  }
  
  return response.json();
}

export async function fetchPatient(rut: string): Promise<PatientData | null> {
  const response = await fetch(`${BASE_URL}/paciente/${rut}`);
  if (response.status === 404) return null;
  if (!response.ok) throw new Error('Failed to fetch patient');
  return response.json();
}
