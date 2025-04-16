import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
	const { pathname } = req.nextUrl
	const role = req.cookies.get('role')?.value

	// Public routes
	const publicPaths = ['/', '/login', '/register']

	if (publicPaths.includes(pathname)) {
		return NextResponse.next()
	}

	// Block if no role
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
				pathname.startsWith('/admin/blog') ||
				pathname.startsWith('/admin/categories')
			) {
				return NextResponse.next()
			} else {
				return NextResponse.redirect(new URL('/unauthorized', req.url))
			}
		}

		// Regular users cannot access any admin routes
		if (role === 'user') {
			return NextResponse.redirect(new URL('/unauthorized', req.url))
		}
	}

	return NextResponse.next()
}

export const config = {
	matcher: ['/admin/:path*']
}
