import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './src/lib/jwt';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Debug logging - track cookie availability
//   console.log('🔧 [Middleware] Path:', pathname);
//   console.log('🔧 [Middleware] Cookie header:', request.headers.get('cookie'));
//   console.log('🔧 [Middleware] authToken cookie:', request.cookies.get('authToken')?.value);

  // Protect /pages/user/* routes
  if (pathname.startsWith('/pages/user')) {
    const token = request.cookies.get('authToken')?.value || 
                  request.headers.get('authorization')?.replace('Bearer ', '');

    if (!token) {
      // Redirect to home page if not authenticated
      const url = request.nextUrl.clone();
      url.pathname = '/';
      return NextResponse.redirect(url);
    }

    // Verify token validity (now async)
    const decoded = await verifyToken(token);
    // console.log('🔧 [Middleware] Token decoded:', decoded);
    
    if (!decoded) {
    //   console.log('❌ [Middleware] Token invalid/expired! Clearing cookie and redirecting to /');
      // Clear invalid token and redirect
      const url = request.nextUrl.clone();
      url.pathname = '/';
      const response = NextResponse.redirect(url);
      response.cookies.delete('authToken');
      return response;
    }

    // console.log('✅ [Middleware] Token valid! User:', decoded.email, 'Role:', decoded.role);
    // Token is valid, allow access
    return NextResponse.next();
  }

  // Protect /pages/admin/* routes (admin only)
  if (pathname.startsWith('/pages/admin')) {
    const token = request.cookies.get('authToken')?.value || 
                  request.headers.get('authorization')?.replace('Bearer ', '');

    if (!token) {
      // Redirect to home page if not authenticated
      const url = request.nextUrl.clone();
      url.pathname = '/';
      return NextResponse.redirect(url);
    }

    // Verify token validity and role (now async)
    const decoded = await verifyToken(token);
    // console.log('🔧 [Middleware] Token decoded:', decoded);
    
    if (!decoded) {
    //   console.log('❌ [Middleware] Token invalid/expired! Clearing cookie and redirecting to /');
      // Clear invalid token and redirect
      const url = request.nextUrl.clone();
      url.pathname = '/';
      const response = NextResponse.redirect(url);
      response.cookies.delete('authToken');
      return response;
    }

    // Check if user has admin role
    if (decoded.role !== 'admin') {
      // console.log('⚠️ [Middleware] User is not admin! Role:', decoded.role, '- Redirecting to /pages/user/home');
      // Redirect non-admin users to their dashboard
      const url = request.nextUrl.clone();
      url.pathname = '/pages/user/home';
      return NextResponse.redirect(url);
    }

    // console.log('✅ [Middleware] Admin access granted! User:', decoded.email);
    // Token is valid and user is admin, allow access
    return NextResponse.next();
  }

  // Allow all other routes
  return NextResponse.next();
}

export const config = {
  matcher: ['/pages/user/:path*', '/pages/admin/:path*'],
};
