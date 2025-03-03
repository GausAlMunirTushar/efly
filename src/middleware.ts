import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
	const { pathname } = req.nextUrl

	if (pathname === '/') {
		return NextResponse.redirect(new URL('/login', req.nextUrl))
	}
}

export const config = {
	matcher: ['/']
}
