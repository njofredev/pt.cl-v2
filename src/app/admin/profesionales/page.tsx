"use client";

import { useState, useEffect } from 'react';
import { Plus, Search, Edit2, Trash2, Loader2, AlertTriangle, Eye, EyeOff } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ProfessionalForm, ProfessionalData } from '@/components/admin/ProfessionalForm';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";

export default function AdminProfessionalsPage() {
  const [professionals, setProfessionals] = useState<ProfessionalData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedArea, setSelectedArea] = useState("Todas");
  
  // Extract unique areas dynamically
  const uniqueAreas = ["Todas", ...Array.from(new Set(professionals.map(p => p.area).filter(Boolean) as string[]))];
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedProfessional, setSelectedProfessional] = useState<ProfessionalData | null>(null);

  // Delete Confirmation States
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [professionalToDelete, setProfessionalToDelete] = useState<ProfessionalData | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchProfessionals = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/professionals');
      const data = await res.json();
      if (data.success) {
        setProfessionals(data.data);
      }
    } catch (error) {
      console.error("Error fetching professionals:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfessionals();
  }, []);

  const handleAdd = () => {
    setSelectedProfessional(null);
    setIsFormOpen(true);
  };

  const handleEdit = (prof: ProfessionalData) => {
    setSelectedProfessional(prof);
    setIsFormOpen(true);
  };

  const handleDeleteClick = (prof: ProfessionalData) => {
    setProfessionalToDelete(prof);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!professionalToDelete || !professionalToDelete.id) return;
    
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/professionals/${professionalToDelete.id}`, {
        method: 'DELETE',
      });
      
      if (res.ok) {
        setIsDeleteDialogOpen(false);
        setProfessionalToDelete(null);
        fetchProfessionals();
      } else {
        alert("Error al intentar eliminar el registro.");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Error de red al eliminar.");
    } finally {
      setIsDeleting(false);
    }
  };

  const filteredProfessionals = professionals.filter(p => {
    const term = searchTerm.toLowerCase();
    const fullName = `${p.firstName} ${p.lastName || ''}`.toLowerCase();
    const matchesSearch = fullName.includes(term) || (p.specialty || '').toLowerCase().includes(term) || (p.area || '').toLowerCase().includes(term);
    
    const matchesArea = selectedArea === "Todas" || p.area === selectedArea;
    
    return matchesSearch && matchesArea;
  });

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-primary tracking-tight">Directorio de Profesionales</h1>
          <p className="text-slate-500 mt-1">Gestiona los médicos y especialistas de la clínica.</p>
        </div>
        <Button onClick={handleAdd} className="bg-secondary hover:bg-secondary/90 text-white rounded-xl shadow-lg shadow-secondary/20 h-12 px-6">
          <Plus size={20} className="mr-2" />
          Crear Profesional
        </Button>
      </div>

      <div className="bg-white rounded-3xl p-6 shadow-xl shadow-primary/5 border border-slate-100">
        <div className="flex items-center gap-4 mb-6 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <Input 
            placeholder="Buscar por nombre, especialidad o área..." 
            className="pl-12 h-14 rounded-2xl bg-slate-50 border-transparent focus:bg-white transition-all text-base text-slate-900"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {uniqueAreas.map(area => (
            <button 
              key={area} 
              onClick={() => setSelectedArea(area)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                selectedArea === area 
                  ? "bg-primary text-white border-primary shadow-md shadow-primary/20" 
                  : "bg-white text-slate-500 border-slate-100 hover:bg-slate-50 hover:border-slate-200"
              }`}
            >
              {area}
            </button>
          ))}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="pb-4 pt-2 px-4 text-xs font-bold uppercase tracking-widest text-slate-400">Profesional</th>
                <th className="pb-4 pt-2 px-4 text-xs font-bold uppercase tracking-widest text-slate-400">Especialidad</th>
                <th className="pb-4 pt-2 px-4 text-xs font-bold uppercase tracking-widest text-slate-400">Área</th>
                <th className="pb-4 pt-2 px-4 text-xs font-bold uppercase tracking-widest text-slate-400">Estado</th>
                <th className="pb-4 pt-2 px-4 text-xs font-bold uppercase tracking-widest text-slate-400 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-400">
                    <Loader2 className="animate-spin mx-auto mb-2" size={24} />
                    Cargando profesionales...
                  </td>
                </tr>
              ) : filteredProfessionals.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-500">
                    <AlertTriangle className="mx-auto mb-2 text-slate-300" size={32} />
                    No se encontraron resultados.
                  </td>
                </tr>
              ) : (
                filteredProfessionals.map((prof) => (
                  <tr key={prof.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors group">
                    <td className="py-4 px-4">
                      <div className="font-bold text-primary">{prof.firstName} {prof.lastName}</div>
                      <div className="text-xs text-slate-400 mt-0.5">{prof.rut || 'Sin RUT'}</div>
                    </td>
                    <td className="py-4 px-4 font-medium text-slate-600">{prof.specialty}</td>
                    <td className="py-4 px-4">
                      <Badge variant="secondary" className="bg-primary/5 text-primary hover:bg-primary/10 rounded-lg font-bold">
                        {prof.area}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      {prof.published !== false ? (
                        <div className="flex items-center gap-1.5 text-emerald-600 font-bold text-[10px] uppercase tracking-wider bg-emerald-50 px-2 py-1 rounded-lg w-fit">
                          <Eye size={12} /> Habilitado
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 text-slate-400 font-bold text-[10px] uppercase tracking-wider bg-slate-50 px-2 py-1 rounded-lg w-fit">
                          <EyeOff size={12} /> Deshabilitado
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={async () => {
                            try {
                              const res = await fetch(`/api/admin/professionals/${prof.id}`, {
                                method: 'PUT',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ ...prof, published: prof.published === false }),
                              });
                              if (res.ok) fetchProfessionals();
                            } catch (e) { console.error(e); }
                          }} 
                          className={`h-8 w-8 rounded-lg transition-colors ${prof.published !== false ? 'text-slate-400 hover:text-emerald-600 hover:bg-emerald-50' : 'text-emerald-600 bg-emerald-50 hover:bg-emerald-100'}`}
                          title={prof.published !== false ? "Deshabilitar de la web" : "Habilitar en la web"}
                        >
                          {prof.published !== false ? <EyeOff size={16} /> : <Eye size={16} />}
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleEdit(prof)} className="h-8 w-8 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg">
                          <Edit2 size={16} />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleDeleteClick(prof)} 
                          className="h-8 w-8 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ProfessionalForm 
        open={isFormOpen} 
        onOpenChange={setIsFormOpen} 
        professional={selectedProfessional}
        onSuccess={fetchProfessionals}
      />

      {/* Modern Delete Confirmation Modal */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="max-w-md bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-2xl text-slate-900">
          <DialogHeader className="flex flex-col items-center text-center pt-4">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4 text-red-500">
              <AlertTriangle size={32} strokeWidth={1.5} />
            </div>
            <DialogTitle className="text-2xl font-bold tracking-tight text-slate-900">
              ¿Confirmar eliminación?
            </DialogTitle>
            <DialogDescription className="text-base text-slate-500 mt-2">
              Estás a punto de eliminar permanentemente a <br/>
              <span className="font-bold text-primary">
                {professionalToDelete?.firstName} {professionalToDelete?.lastName}
              </span>.
              Esta acción no se puede deshacer.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-row sm:flex-row gap-3 sm:gap-3 mt-6 border-t border-slate-50 pt-6 bg-slate-50/50 -mx-6 px-6 -mb-6 pb-6">
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
              disabled={isDeleting}
              className="flex-1 h-12 rounded-xl font-bold border-slate-200 text-slate-600 hover:bg-white hover:text-slate-900 hover:border-slate-300 transition-all"
            >
              Cancelar
            </Button>
            <Button
              onClick={confirmDelete}
              disabled={isDeleting}
              className="flex-1 h-12 rounded-xl font-bold bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-200 transition-all"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Eliminando...
                </>
              ) : (
                'Sí, Eliminar'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
