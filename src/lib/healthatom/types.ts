export type HealthatomPlatform = 'dentalink' | 'medilink';

export interface HealthatomSucursal {
  id: number;
  nombre: string;
  direccion?: string;
  ciudad?: string;
  comuna?: string;
  habilitado?: number;
}

export interface HealthatomEspecialidad {
  id: number;
  nombre: string;
}

export interface HealthatomProfesional {
  id: number;
  nombre: string;
  apellidos: string;
  rut?: string;
  email?: string;
  id_especialidad?: number;
  especialidad?: string;
  habilitado?: number;
  agenda_online?: number;
  intervalo?: number;
  id_sucursal?: number;
  nombre_sucursal?: string;
  contratos_sucursal?: string[];
  horarios_sucursal?: string[];
  sucursales_ids?: number[];
}

export interface HealthatomPrevision {
  id: number;
  nombre: string;
}

export interface HealthatomConvenio {
  id: number;
  nombre: string;
}

export interface HealthatomPaciente {
  id: number;
  rut: string;
  nombre: string;
  apellidos: string;
  email?: string;
  celular?: string;
  telefono?: string;
  direccion?: string;
  ciudad?: string;
  comuna?: string;
  fecha_nacimiento?: string;
  genero?: string;
  id_prevision?: number;
}

export interface CleanSlot {
  hora: string;        // "10:00"
  hora_api: string;    // "10:00:00"
  id_sillon: number;   // ID del primer sillón disponible
  id_sucursal?: number; // ID de la sucursal del sillón
  periodo: 'manana' | 'tarde';
}

export interface DayAvailability {
  fecha: string;
  total_disponibles: number;
  slots: CleanSlot[];
}

export interface MaskedPatientData {
  first_name: string;
  masked_last_name: string;
  masked_email: string;
  masked_phone: string;
}

export interface PatientLookupResponse {
  exists: boolean;
  patient_token?: string;
  masked_data?: MaskedPatientData;
  error?: string;
}

export interface BookingConfirmRequest {
  platform: HealthatomPlatform;
  id_sucursal: number;
  id_profesional: number;
  id_sillon: number;
  fecha: string;       // "YYYY-MM-DD"
  hora_inicio: string; // "10:00" o "10:00:00"
  duracion?: number;   // default 30 o intervalo del profesional
  comentarios?: string;
  patient_token?: string;
  new_patient?: {
    rut: string;
    nombre: string;
    apellidos: string;
    email: string;
    celular: string;
    fecha_nacimiento?: string;
    id_prevision?: number;
    genero?: string;
    direccion?: string;
  };
  turnstile_token?: string;
}

export interface BookingConfirmResponse {
  success: boolean;
  id_cita: number;
  folio: string;
  fecha: string;
  hora_inicio: string;
  profesional_nombre: string;
  especialidad: string;
  sucursal_nombre: string;
  paciente_nombre: string;
  ics_download_url?: string;
  error?: string;
}
