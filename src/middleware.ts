import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
	const { pathname } = req.nextUrl
	const role = req.cookies.get('role')?.value // Get the role cookie

	// Public routes that can be accessed without authentication
	const publicPaths = ['/', '/login', '/register']

	// If the request is to a public path, let it pass through
	if (publicPaths.includes(pathname)) {
		return NextResponse.next()
	}

	// Redirect to login if no role is found
	if (!role) {
		return NextResponse.redirect(new URL('/login', req.url))
	}

	// Admin-only routes
	if (pathname.startsWith('/admin')) {
		if (role === 'admin') {
			return NextResponse.next()
		}

		if (role === 'editor') {
			// Editor can only access /admin/blog and /admin/categories
			if (
				pathname.startsWith('/admin/dashboard') ||
				pathname.startsWith('/admin/blog') ||
				pathname.startsWith('/admin/categories')
			) {
				return NextResponse.next()
			} else {
				return NextResponse.redirect(new URL('/unauthorized', req.url))
			}
		}

		// Regular users cannot access admin routes
		if (role === 'user') {
			return NextResponse.redirect(new URL('/unauthorized', req.url))
		}
	}

	return NextResponse.next()
}

export const config = {
	matcher: ['/admin/:path*', '/dashboard/:path*', '/profile/:path*']
}
