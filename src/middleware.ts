import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Solo aplicamos middleware a rutas que empiecen con /admin
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Excluimos la página de login
    if (request.nextUrl.pathname === '/admin/login') {
      return NextResponse.next();
    }

    // Verificamos si existe la cookie de sesión
    const token = request.cookies.get('adminToken')?.value;

    // Si no hay token, redirigimos al login
    if (!token || token !== 'authenticated') {
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};
