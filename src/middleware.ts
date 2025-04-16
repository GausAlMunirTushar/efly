import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
	const { pathname } = req.nextUrl
	const role = req.cookies.get('role')?.value

	// Public routes (accessible without authentication)
	const publicPaths = ['/', '/login', '/register']
	if (publicPaths.includes(pathname)) {
		return NextResponse.next()
	}

	// Redirect to login if no role cookie is found
	if (!role) {
		return NextResponse.redirect(new URL('/login', req.url))
	}

	// Admin: full access
	if (role === 'admin') {
		return NextResponse.next()
	}

	// Editor: limited access under /admin
	if (role === 'editor') {
		const allowedEditorPaths = [
			'/admin/dashboard',
			'/admin/blog',
			'/admin/categories'
		]
		const isEditorAllowed = allowedEditorPaths.some(path =>
			pathname.startsWith(path)
		)
		if (isEditorAllowed) {
			return NextResponse.next()
		}
		return NextResponse.redirect(new URL('/unauthorized', req.url))
	}

	// Regular user: deny access to /admin
	if (role === 'user' && pathname.startsWith('/admin')) {
		return NextResponse.redirect(new URL('/unauthorized', req.url))
	}

	return NextResponse.next()
}

export const config = {
	matcher: ['/admin/:path*', '/dashboard/:path*', '/profile/:path*']
}
