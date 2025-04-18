import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const isAuthenticated = request.cookies.has('isAuthenticated');
  const isLoginPage = request.nextUrl.pathname === '/login';

  // If user is not authenticated and trying to access protected routes
  if (!isAuthenticated && !isLoginPage) {
    const response = NextResponse.redirect(new URL('/login', request.url));
    return response;
  }

  // If user is authenticated and trying to access login page
  if (isAuthenticated && isLoginPage) {
    const response = NextResponse.redirect(new URL('/dashboard', request.url));
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/users/:path*',
    '/accounts/:path*',
    '/transactions/:path*',
    '/loans/:path*',
    '/profile/:path*',
    '/login',
  ],
}; 