import { NextResponse } from 'next/server';

export function middleware(request) {
  // Get the pathname of the request (e.g. /admin)
  const { pathname } = request.nextUrl;
  
  // Check if the pathname starts with /admin
  const isAdminRoute = pathname.startsWith('/admin');
  
  // Check if the user is authenticated by looking for the auth cookie
  const isAuthenticated = request.cookies.has('auth-token');
  
  // If it's an admin route and the user is not authenticated,
  // redirect to the login page
  if (!isAdminRoute && isAuthenticated ) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  // Specify which paths this middleware should run on
  matcher: [
    '/admin/:path*',
  ],
};