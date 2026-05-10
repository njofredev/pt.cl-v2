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
};

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
      });
    } else {
      setFormData(defaultData);
    }
  }, [professional, open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white shadow-2xl p-6 md:p-8 border border-slate-100">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-primary">
            {professional ? 'Editar Profesional' : 'Agregar Profesional'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Información Personal */}
            <div className="space-y-4">
              <h3 className="font-bold text-slate-500 border-b pb-2">Información Personal</h3>
              <div>
                <label className="text-xs font-bold uppercase text-slate-400">Nombres *</label>
                <Input name="firstName" value={formData.firstName} onChange={handleChange} required className="mt-1" />
              </div>
              <div>
                <label className="text-xs font-bold uppercase text-slate-400">Apellidos</label>
                <Input name="lastName" value={formData.lastName} onChange={handleChange} className="mt-1" />
              </div>
              <div>
                <label className="text-xs font-bold uppercase text-slate-400">RUT</label>
                <Input name="rut" value={formData.rut} onChange={handleChange} className="mt-1" />
              </div>
            </div>

            {/* Información Médica */}
            <div className="space-y-4">
              <h3 className="font-bold text-slate-500 border-b pb-2">Información Médica</h3>
              <div>
                <label className="text-xs font-bold uppercase text-slate-400">Área *</label>
                <select 
                  name="area" 
                  value={formData.area} 
                  onChange={handleChange} 
                  required 
                  className="w-full h-10 mt-1 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-secondary/20"
                >
                  <option value="">Selecciona un área</option>
                  <option value="Salud Dental">Salud Dental</option>
                  <option value="Salud Mental">Salud Mental</option>
                  <option value="Medicina General">Medicina General</option>
                  <option value="Terapias Complementarias">Terapias Complementarias</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold uppercase text-slate-400">Especialidad *</label>
                <Input name="specialty" value={formData.specialty} onChange={handleChange} required className="mt-1" />
              </div>
              <div>
                <label className="text-xs font-bold uppercase text-slate-400">Sucursal</label>
                <Input name="sucursal" value={formData.sucursal} onChange={handleChange} placeholder="Ej: Los Tribunales, Vitacura..." className="mt-1" />
              </div>
            </div>

            {/* Contacto */}
            <div className="space-y-4">
              <h3 className="font-bold text-slate-500 border-b pb-2">Contacto</h3>
              <div>
                <label className="text-xs font-bold uppercase text-slate-400">Email</label>
                <Input type="email" name="email" value={formData.email} onChange={handleChange} className="mt-1" />
              </div>
              <div>
                <label className="text-xs font-bold uppercase text-slate-400">Teléfono</label>
                <Input name="phone" value={formData.phone} onChange={handleChange} className="mt-1" />
              </div>
            </div>

            {/* Detalles Extra */}
            <div className="space-y-4">
              <h3 className="font-bold text-slate-500 border-b pb-2">Detalles Académicos</h3>
              <div>
                <label className="text-xs font-bold uppercase text-slate-400">Título / Universidad</label>
                <Input name="education" value={formData.education} onChange={handleChange} className="mt-1" />
              </div>
              <div>
                <label className="text-xs font-bold uppercase text-slate-400">Otros Títulos</label>
                <Input name="otherTitles" value={formData.otherTitles} onChange={handleChange} className="mt-1" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-slate-500 border-b pb-2">Perfil Web</h3>
            <div>
              <label className="text-xs font-bold uppercase text-slate-400">Descripción Pública</label>
              <textarea 
                name="description" 
                value={formData.description} 
                onChange={handleChange} 
                rows={3}
                className="w-full mt-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-secondary/20"
                placeholder="Breve descripción que aparecerá en el sitio web..."
              />
            </div>
          </div>

          <DialogFooter className="pt-6 border-t">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="rounded-xl">
              Cancelar
            </Button>
            <Button type="submit" className="rounded-xl bg-primary hover:bg-primary/90 text-white" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Guardar Profesional
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
