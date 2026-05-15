"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";

export type ProfessionalData = {
  id?: number;
  firstName: string;
  lastName: string;
  specialty: string;
  area: string;
  description: string;
  education: string;
  sucursal: string;
  rut: string;
  email: string;
  phone: string;
  ageGroup: string;
  otherTitles: string;
  imageUrl?: string;
  published: boolean;
};

const defaultData: ProfessionalData = {
  firstName: '',
  lastName: '',
  specialty: '',
  area: '',
  description: '',
  education: '',
  sucursal: '',
  rut: '',
  email: '',
  phone: '',
  ageGroup: '',
  otherTitles: '',
  imageUrl: '',
  published: true,
};

const AGE_GROUPS = [
  'Niños (0 a 11 años).',
  'Adolescentes (12 a 17 años).',
  'Adulto - Joven (18 a 29 años).',
  'Adulto (30 a 59 años).',
  'Tercera Edad (60 años en adelante).'
];

const SPECIALTIES = [
  'Odontopediatría', 'Odontología General', 'Endodoncia', 'Implantología', 'Psicología',
  'Trastornos Temporomandibulares', 'Cirugía, Implantología', 'Ortodoncia', 'Periodoncia',
  'Rehabilitación Oral', 'Radiología', 'Fonoaudiología', 'Psiquiatría', 'Psicopedagogía',
  'Medicina', 'Pediatría', 'Kinesiología', 'Biomagnetismo', 'Masoterapia', 'Enfermería', 'Podología'
].sort();

const SUCURSALES = [
  'Sucursal Casa Matríz (Calle Los Tribunales #1268)',
  'Sucursal Vitacura (Avenida Vitacura #8620)',
  'Teleconsulta'
];

interface ProfessionalFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  professional?: ProfessionalData | null;
  onSuccess: () => void;
}

export function ProfessionalForm({ open, onOpenChange, professional, onSuccess }: ProfessionalFormProps) {
  const [formData, setFormData] = useState<ProfessionalData>(defaultData);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (professional) {
      setFormData({
        id: professional.id,
        firstName: professional.firstName || '',
        lastName: professional.lastName || '',
        specialty: professional.specialty || '',
        area: professional.area || '',
        description: professional.description || '',
        education: professional.education || '',
        sucursal: professional.sucursal || '',
        rut: professional.rut || '',
        email: professional.email || '',
        phone: professional.phone || '',
        ageGroup: professional.ageGroup || '',
        otherTitles: professional.otherTitles || '',
        imageUrl: (professional as any).imageUrl || '',
        published: professional.published !== undefined ? professional.published : true,
      });
    } else {
      setFormData(defaultData);
    }
  }, [professional, open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAgeGroupChange = (age: string, checked: boolean) => {
    const currentAges = formData.ageGroup.split(',').map(a => a.trim()).filter(Boolean);
    let newAges;
    if (checked) {
      newAges = [...currentAges, age];
    } else {
      newAges = currentAges.filter(a => a !== age);
    }
    // Mantiene formato consistente
    setFormData(prev => ({ ...prev, ageGroup: newAges.join(', ') }));
  };

  const isAgeSelected = (age: string) => {
    return formData.ageGroup.split(',').map(a => a.trim()).includes(age);
  };

  const handleSucursalChange = (suc: string, checked: boolean) => {
    const current = formData.sucursal.split(',').map(s => s.trim()).filter(Boolean);
    let next;
    if (checked) {
      next = [...current, suc];
    } else {
      next = current.filter(s => s !== suc);
    }
    setFormData(prev => ({ ...prev, sucursal: next.join(', ') }));
  };

  const isSucursalSelected = (suc: string) => {
    return formData.sucursal.split(',').map(s => s.trim()).includes(suc);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const isEditing = !!formData.id;
      const url = isEditing 
        ? `/api/admin/professionals/${formData.id}` 
        : `/api/admin/professionals`;
      
      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        onSuccess();
        onOpenChange(false);
      } else {
        alert("Error al guardar el profesional");
      }
    } catch (error) {
      console.error(error);
      alert("Error de red");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl h-[90vh] flex flex-col p-0 overflow-hidden rounded-3xl bg-white shadow-2xl border border-slate-100 text-slate-900 gap-0">
        <DialogHeader className="p-6 md:px-8 md:py-6 border-b shrink-0">
          <DialogTitle className="text-2xl font-bold text-primary">
            {professional ? 'Editar Profesional' : 'Agregar Profesional'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
          <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              {/* Información Personal */}
              <div className="space-y-3">
                <h3 className="font-bold text-slate-500 border-b pb-2 text-sm tracking-wide">Información Personal</h3>
                <div>
                  <label className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Nombres *</label>
                  <Input name="firstName" value={formData.firstName} onChange={handleChange} required className="mt-1 bg-white text-slate-900" />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Apellidos</label>
                  <Input name="lastName" value={formData.lastName} onChange={handleChange} className="mt-1 bg-white text-slate-900" />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">RUT</label>
                  <Input name="rut" value={formData.rut} onChange={handleChange} className="mt-1 bg-white text-slate-900" />
                </div>
              </div>

              {/* Información Médica */}
              <div className="space-y-3">
                <h3 className="font-bold text-slate-500 border-b pb-2 text-sm tracking-wide">Información Médica</h3>
                <div>
                  <label className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Área *</label>
                  <select 
                    name="area" 
                    value={formData.area} 
                    onChange={handleChange} 
                    required 
                    className="w-full h-10 mt-1 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-secondary/20 cursor-pointer"
                  >
                    <option value="" className="text-slate-900">Selecciona un área</option>
                    <option value="Salud Dental" className="text-slate-900">Salud Dental</option>
                    <option value="Salud Mental" className="text-slate-900">Salud Mental</option>
                    <option value="Medicina General" className="text-slate-900">Medicina General</option>
                    <option value="Terapias Complementarias" className="text-slate-900">Terapias Complementarias</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Especialidad *</label>
                  <Input 
                    name="specialty" 
                    value={formData.specialty} 
                    onChange={handleChange} 
                    required 
                    list="specialties-list"
                    placeholder="Selecciona o escribe una..."
                    className="mt-1 bg-white text-slate-900" 
                  />
                  <datalist id="specialties-list">
                    {SPECIALTIES.map(spec => (
                      <option key={spec} value={spec} />
                    ))}
                  </datalist>
                </div>
                
                <div className="pt-1">
                  <label className="text-[10px] font-bold uppercase text-slate-400 tracking-wider block mb-1.5">Sucursales / Modalidad</label>
                  <div className="space-y-2 bg-slate-50/50 p-2.5 rounded-xl border border-slate-100">
                    {SUCURSALES.map(suc => {
                      const isSelected = isSucursalSelected(suc);
                      return (
                        <label key={suc} className={`flex items-center gap-2.5 cursor-pointer group p-1.5 rounded-lg transition-colors ${isSelected ? 'bg-white shadow-xs' : 'hover:bg-white/50'}`}>
                          <input 
                            type="checkbox" 
                            className="accent-secondary w-3.5 h-3.5 rounded cursor-pointer"
                            checked={isSelected}
                            onChange={(e) => handleSucursalChange(suc, e.target.checked)}
                          />
                          <span className={`text-xs leading-tight transition-colors ${isSelected ? 'font-medium text-slate-900' : 'text-slate-500 group-hover:text-slate-700'}`}>
                            {suc}
                          </span>
                        </label>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* Contacto */}
              <div className="space-y-3">
                <h3 className="font-bold text-slate-500 border-b pb-2 text-sm tracking-wide">Contacto</h3>
                <div>
                  <label className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Email</label>
                  <Input type="email" name="email" value={formData.email} onChange={handleChange} className="mt-1 bg-white text-slate-900" />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Teléfono</label>
                  <Input name="phone" value={formData.phone} onChange={handleChange} className="mt-1 bg-white text-slate-900" />
                </div>
              </div>

              {/* Detalles Extra */}
              <div className="space-y-3">
                <h3 className="font-bold text-slate-500 border-b pb-2 text-sm tracking-wide">Detalles Académicos</h3>
                <div>
                  <label className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Título / Universidad</label>
                  <Input name="education" value={formData.education} onChange={handleChange} className="mt-1 bg-white text-slate-900" />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Otros Títulos</label>
                  <Input name="otherTitles" value={formData.otherTitles} onChange={handleChange} className="mt-1 bg-white text-slate-900" />
                </div>
              </div>
            </div>

            {/* Grupo Etario Multi-checkboxes */}
            <div className="space-y-3">
              <h3 className="font-bold text-slate-500 border-b pb-2 text-sm tracking-wide">Grupo Etario de Atención</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-1">
                {AGE_GROUPS.map((age) => {
                  const isSelected = isAgeSelected(age);
                  return (
                    <label 
                      key={age} 
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl border cursor-pointer transition-all ${
                        isSelected 
                          ? 'border-secondary bg-secondary/5 border-2 shadow-sm' 
                          : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <input 
                        type="checkbox" 
                        className="accent-secondary w-4 h-4 rounded"
                        checked={isSelected}
                        onChange={(e) => handleAgeGroupChange(age, e.target.checked)}
                      />
                      <span className={`text-sm ${isSelected ? 'font-semibold text-slate-900' : 'text-slate-600'}`}>
                        {age.replace('.', '')}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Perfil Web */}
            <div className="space-y-3">
              <h3 className="font-bold text-slate-500 border-b pb-2 text-sm tracking-wide">Perfil Web</h3>
              <div>
                <label className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Descripción Pública</label>
                <textarea 
                  name="description" 
                  value={formData.description} 
                  onChange={handleChange} 
                  rows={3}
                  className="w-full mt-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-secondary/20 placeholder:text-slate-300 min-h-[100px] resize-none"
                  placeholder="Breve descripción que aparecerá en el sitio web..."
                />
              </div>
              <div className="mt-4 bg-slate-50 border border-slate-100 p-4 rounded-2xl">
                <label className="text-[10px] font-black uppercase text-primary tracking-wider flex items-center gap-2">
                  Imagen de Perfil
                  <span className="text-[8px] font-bold text-slate-400 normal-case bg-white px-2 py-0.5 border border-slate-100 rounded-md">Ej: mi-foto.jpg</span>
                </label>
                <Input 
                  name="imageUrl" 
                  value={formData.imageUrl} 
                  onChange={handleChange} 
                  className="mt-2 bg-white text-slate-900 h-11 shadow-sm border-slate-200" 
                  placeholder="Nombre del archivo o link URL de la foto"
                />
                <p className="text-[10px] text-slate-400 mt-2">
                  Si subes el archivo a la carpeta de imágenes, solo escribe el nombre (ej: <strong>perfilCatalina.jpg</strong>).
                </p>
              </div>
              <div className="mt-4 bg-slate-50 border border-slate-100 p-4 rounded-2xl flex items-center justify-between">
                <div>
                  <label className="text-[10px] font-black uppercase text-primary tracking-wider flex items-center gap-2">
                    Visibilidad en la Web
                  </label>
                  <p className="text-[10px] text-slate-400 mt-1">
                    Habilita o deshabilita la visualización de este profesional en el sitio público.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    name="published"
                    checked={formData.published}
                    onChange={(e) => setFormData(prev => ({ ...prev, published: e.target.checked }))}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
                </label>
              </div>
            </div>
          </div>

          <DialogFooter className="p-6 md:px-8 md:py-6 border-t shrink-0 bg-slate-50/50 flex items-center justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="rounded-xl border-slate-300 px-6">
              Cancelar
            </Button>
            <Button type="submit" className="rounded-xl bg-primary hover:bg-primary/90 text-white px-8 py-2" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Guardar Profesional
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
