"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, AlertCircle, Loader2 } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (data.success) {
        router.push('/admin/profesionales');
        router.refresh();
      } else {
        setError(data.message || 'Contraseña incorrecta');
      }
    } catch (err) {
      setError('Ocurrió un error. Inténtalo nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <Card className="w-full max-w-md shadow-xl border-slate-100">
        <CardHeader className="space-y-3 text-center pb-8">
          <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center mx-auto mb-2">
            <Lock className="text-primary" size={32} />
          </div>
          <CardTitle className="text-2xl font-bold text-primary">Acceso Restringido</CardTitle>
          <CardDescription className="text-slate-500">
            Ingresa la contraseña maestra para acceder al panel de administración.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-2">
                Contraseña
              </label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="h-14 rounded-2xl border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-secondary/20 transition-all text-center text-lg tracking-widest"
                required
              />
            </div>

            {error && (
              <div className="p-4 bg-red-50 text-red-600 rounded-2xl text-sm font-medium flex items-center gap-3">
                <AlertCircle size={18} className="shrink-0" />
                {error}
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full h-14 rounded-2xl bg-primary hover:bg-primary/90 text-white font-bold text-base transition-all"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin mr-2" size={20} />
                  Verificando...
                </>
              ) : (
                'Ingresar al Panel'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
