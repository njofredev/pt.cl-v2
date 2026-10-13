"use client";

import { useState, useEffect } from 'react';
import { 
  Plus, Search, Edit2, Trash2, Loader2, Eye, EyeOff, BookOpen, 
  Clock, Tag, Calendar, CheckCircle2, ArrowUpRight
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import Link from 'next/link';

export interface BlogPostData {
  id?: number;
  slug?: string;
  title: string;
  excerpt?: string;
  content: string;
  category: string;
  author: string;
  imageUrl?: string;
  readingTime?: string;
  published: boolean;
  publishedAt?: string;
  createdAt?: string;
}

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPostData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todas");

  // Form modal states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPostData | null>(null);
  const [formData, setFormData] = useState<BlogPostData>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: 'Salud y Bienestar',
    author: 'Equipo Médico',
    imageUrl: '',
    readingTime: '3 min',
    published: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Delete modal states
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<BlogPostData | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/blog');
      const data = await res.json();
      if (data.success) {
        setPosts(data.data);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const categories = ["Todas", ...Array.from(new Set(posts.map(p => p.category).filter(Boolean)))];

  const handleOpenAdd = () => {
    setEditingPost(null);
    setFormData({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      category: 'Salud y Bienestar',
      author: 'Equipo Médico Policlínico Tabancura',
      imageUrl: '',
      readingTime: '3 min',
      published: true,
    });
    setIsFormOpen(true);
  };

  const handleOpenEdit = (post: BlogPostData) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      slug: post.slug || '',
      excerpt: post.excerpt || '',
      content: post.content,
      category: post.category || 'Salud y Bienestar',
      author: post.author || 'Equipo Médico',
      imageUrl: post.imageUrl || '',
      readingTime: post.readingTime || '3 min',
      published: post.published,
    });
    setIsFormOpen(true);
  };

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim()) {
      alert("Título y contenido son obligatorios");
      return;
    }

    setIsSubmitting(true);
    try {
      const method = editingPost ? 'PUT' : 'POST';
      const body = editingPost ? { ...formData, id: editingPost.id } : formData;

      const res = await fetch('/api/admin/blog', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();

      if (data.success) {
        setIsFormOpen(false);
        fetchPosts();
      } else {
        alert(data.message || "Error al guardar el artículo");
      }
    } catch (error) {
      console.error("Error saving post:", error);
      alert("Error al conectar con el servidor");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTogglePublish = async (post: BlogPostData) => {
    try {
      const res = await fetch('/api/admin/blog', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: post.id,
          title: post.title,
          content: post.content,
          published: !post.published,
        }),
      });
      if (res.ok) {
        fetchPosts();
      }
    } catch (err) {
      console.error("Error toggling publish state:", err);
    }
  };

  const handleDeleteClick = (post: BlogPostData) => {
    setPostToDelete(post);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!postToDelete?.id) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/blog?id=${postToDelete.id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setIsDeleteDialogOpen(false);
        setPostToDelete(null);
        fetchPosts();
      }
    } catch (err) {
      console.error("Error deleting post:", err);
    } finally {
      setIsDeleting(false);
    }
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (post.excerpt && post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCat = selectedCategory === "Todas" || post.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Gestión del Blog</h1>
            <Badge variant="outline" className="text-xs bg-slate-100 text-slate-600 border-slate-200">
              Ruta oculta /blog
            </Badge>
          </div>
          <p className="text-slate-500 text-sm mt-1">
            Crea, edita y publica artículos con información clave y salud para la comunidad.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link 
            href="/blog" 
            target="_blank"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition-all shadow-sm"
          >
            <Eye size={16} />
            Ver blog público
            <ArrowUpRight size={14} className="text-slate-400" />
          </Link>

          <Button 
            onClick={handleOpenAdd} 
            className="bg-primary hover:bg-primary/95 text-white gap-2 font-bold px-5 py-2.5 rounded-xl shadow-md"
          >
            <Plus size={18} />
            Nuevo Artículo
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <Input 
            type="text"
            placeholder="Buscar por título o resumen..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-10 bg-slate-50 border-slate-200 rounded-xl text-sm"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          <Tag size={16} className="text-slate-400 shrink-0" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat 
                  ? 'bg-secondary text-white' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Table or Cards */}
      {loading ? (
        <div className="py-24 text-center">
          <Loader2 className="animate-spin text-secondary mx-auto mb-3" size={32} />
          <p className="text-slate-500 font-medium">Cargando publicaciones...</p>
        </div>
      ) : filteredPosts.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-lg mx-auto shadow-sm my-8">
          <BookOpen className="mx-auto text-slate-300 mb-4" size={48} />
          <h3 className="text-lg font-bold text-slate-900 mb-1">No hay artículos registrados</h3>
          <p className="text-slate-500 text-sm mb-6">
            Comienza creando el primer artículo con información de salud, recomendaciones o novedades.
          </p>
          <Button onClick={handleOpenAdd} className="bg-primary text-white font-bold gap-2">
            <Plus size={16} /> Crear primer artículo
          </Button>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/75 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-4 px-6">Artículo</th>
                  <th className="py-4 px-6">Categoría</th>
                  <th className="py-4 px-6">Autor</th>
                  <th className="py-4 px-6">Estado</th>
                  <th className="py-4 px-6 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {filteredPosts.map((post) => (
                  <tr key={post.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-6 max-w-md">
                      <div className="font-bold text-slate-900">{post.title}</div>
                      <div className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                        {post.excerpt || 'Sin resumen'}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-2">
                        <span>slug: /{post.slug}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1"><Clock size={11} /> {post.readingTime}</span>
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <Badge variant="outline" className="bg-slate-100 text-slate-700 font-semibold border-slate-200">
                        {post.category}
                      </Badge>
                    </td>

                    <td className="py-4 px-6 text-slate-600 font-medium">
                      {post.author}
                    </td>

                    <td className="py-4 px-6">
                      <button 
                        onClick={() => handleTogglePublish(post)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all ${
                          post.published 
                            ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200' 
                            : 'bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200'
                        }`}
                        title="Haz clic para alternar publicación"
                      >
                        {post.published ? (
                          <>
                            <Eye size={12} /> Publicado
                          </>
                        ) : (
                          <>
                            <EyeOff size={12} /> Borrador
                          </>
                        )}
                      </button>
                    </td>

                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {post.published && (
                          <Link
                            href={`/blog/${post.slug}`}
                            target="_blank"
                            className="p-2 text-slate-400 hover:text-primary hover:bg-slate-100 rounded-lg transition-colors"
                            title="Ver en la web"
                          >
                            <ArrowUpRight size={16} />
                          </Link>
                        )}
                        <button
                          onClick={() => handleOpenEdit(post)}
                          className="p-2 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
                          title="Editar"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(post)}
                          className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                          title="Eliminar"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Form Dialog Extenso y Adaptado a la Ventana */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-5xl md:max-w-5xl lg:max-w-6xl w-[95vw] h-[92vh] flex flex-col p-0 overflow-hidden rounded-3xl bg-white shadow-2xl border border-slate-200 text-slate-900 gap-0">
          <DialogHeader className="p-6 md:px-8 border-b border-slate-100 shrink-0 bg-slate-50/70">
            <div className="flex items-center justify-between">
              <div>
                <DialogTitle className="text-2xl font-black text-primary tracking-tight">
                  {editingPost ? 'Editar Artículo' : 'Nuevo Artículo de Blog'}
                </DialogTitle>
                <DialogDescription className="text-slate-500 text-sm mt-1">
                  Redacta o actualiza la información y guías de salud que se mostrarán en la sección de Blog.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <form onSubmit={handleSubmitForm} className="flex flex-col flex-1 overflow-hidden">
            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 bg-white">
              
              {/* Fila 1: Título completo */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 block">
                  Título del Artículo <span className="text-rose-500">*</span>
                </label>
                <Input 
                  value={formData.title} 
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Ej: Cuidados clave tras una extracción dental"
                  required
                  className="h-12 text-base font-semibold bg-white border-slate-200 focus-visible:ring-primary rounded-xl"
                />
              </div>

              {/* Fila 2: Metadata (Categoría, Tiempo de lectura, Autor, URL Portada) */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-100">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5 block">
                    Categoría
                  </label>
                  <select
                    value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                    className="w-full h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="Noticias">Noticias</option>
                    <option value="Salud Dental">Salud Dental</option>
                    <option value="Salud Mental">Salud Mental</option>
                    <option value="Medicina General">Medicina General</option>
                    <option value="Terapias Complementarias">Terapias Complementarias</option>
                    <option value="Novedades Médicas">Novedades Médicas</option>
                    <option value="General">General</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5 block">
                    Tiempo de Lectura
                  </label>
                  <Input 
                    value={formData.readingTime || ''} 
                    onChange={e => setFormData({ ...formData, readingTime: e.target.value })}
                    placeholder="Ej: 4 min"
                    className="h-10 bg-white border-slate-200 rounded-xl text-sm"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5 block">
                    Autor
                  </label>
                  <Input 
                    value={formData.author} 
                    onChange={e => setFormData({ ...formData, author: e.target.value })}
                    placeholder="Ej: Dr. Juan Pérez"
                    className="h-10 bg-white border-slate-200 rounded-xl text-sm"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5 block">
                    URL de Portada (opcional)
                  </label>
                  <Input 
                    value={formData.imageUrl || ''} 
                    onChange={e => setFormData({ ...formData, imageUrl: e.target.value })}
                    placeholder="https://..."
                    className="h-10 bg-white border-slate-200 rounded-xl text-sm"
                  />
                </div>
              </div>

              {/* Fila 3: Resumen Breve (Excerpt) */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 block">
                  Resumen Breve (Excerpt)
                </label>
                <textarea 
                  value={formData.excerpt || ''} 
                  onChange={e => setFormData({ ...formData, excerpt: e.target.value })}
                  rows={2}
                  className="w-full p-4 text-sm bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-slate-800 leading-relaxed"
                  placeholder="Breve introducción que aparecerá en la tarjeta de previsualización..."
                />
              </div>

              {/* Fila 4: Editor de Contenido Extenso */}
              <div className="flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Contenido Completo <span className="text-rose-500">*</span>
                  </label>
                  <span className="text-xs text-slate-400">
                    Usa <code>## Subtítulo</code> para crear secciones destacadas.
                  </span>
                </div>
                <textarea 
                  value={formData.content} 
                  onChange={e => setFormData({ ...formData, content: e.target.value })}
                  rows={12}
                  className="w-full p-4 text-sm font-sans bg-slate-50/50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-slate-800 leading-relaxed min-h-[260px]"
                  placeholder="Escribe aquí el contenido detallado del artículo..."
                  required
                />
              </div>

              {/* Fila 5: Estado de Publicación */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <input 
                    type="checkbox" 
                    id="publishCheckbox"
                    checked={formData.published}
                    onChange={e => setFormData({ ...formData, published: e.target.checked })}
                    className="w-5 h-5 rounded text-[#259CF4] focus:ring-[#259CF4] cursor-pointer"
                  />
                  <div>
                    <label htmlFor="publishCheckbox" className="text-sm font-bold text-slate-800 cursor-pointer block">
                      Publicar inmediatamente
                    </label>
                    <p className="text-xs text-slate-500">
                      Si está desmarcado, el artículo se guardará como borrador y no será visible en el sitio público.
                    </p>
                  </div>
                </div>

                <Badge variant={formData.published ? "default" : "secondary"} className={formData.published ? "bg-emerald-600 text-white" : "bg-amber-100 text-amber-800"}>
                  {formData.published ? "Visible en /blog" : "Borrador Privado"}
                </Badge>
              </div>

            </div>

            <DialogFooter className="p-4 md:px-8 border-t border-slate-100 shrink-0 bg-slate-50/70 flex items-center justify-between">
              <Button type="button" variant="outline" onClick={() => setIsFormOpen(false)} className="rounded-xl">
                Cancelar
              </Button>
              <Button type="submit" disabled={isSubmitting} className="bg-primary hover:bg-primary/95 text-white font-bold px-6 rounded-xl shadow-md">
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin mr-2" size={16} /> Guardando...
                  </>
                ) : (
                  editingPost ? 'Guardar Cambios' : 'Crear Artículo'
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-rose-600 font-bold">¿Eliminar artículo?</DialogTitle>
            <DialogDescription>
              Esta acción eliminará de forma permanente el artículo "{postToDelete?.title}".
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)} disabled={isDeleting}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={confirmDelete} disabled={isDeleting} className="bg-rose-600 hover:bg-rose-700">
              {isDeleting ? <Loader2 className="animate-spin" size={16} /> : 'Eliminar'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
