"use client";

import { usePathname, useRouter } from 'next/navigation';
import { LogOut, LayoutDashboard, Users } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  // No mostrar la barra de navegación en la página de login
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top Navigation */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/admin/profesionales" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <LayoutDashboard size={16} className="text-white" />
              </div>
              <span className="font-bold text-primary tracking-tight">Admin PT</span>
            </Link>
            
            <nav className="hidden md:flex items-center gap-1">
              <Link 
                href="/admin/profesionales"
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
                  pathname.includes('/admin/profesionales') 
                    ? 'bg-secondary/10 text-secondary' 
                    : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Users size={16} />
                Profesionales
              </Link>
            </nav>
          </div>

          <Button 
            variant="ghost" 
            onClick={handleLogout}
            className="text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-xl"
          >
            <LogOut size={18} className="mr-2" />
            Cerrar Sesión
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-8">
        <div className="container mx-auto px-6">
          {children}
        </div>
      </main>
    </div>
  );
}
