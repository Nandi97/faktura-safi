import NextAuth from 'next-auth';
import authConfig from './auth.config';
import { NextResponse } from 'next/server';

const { auth } = NextAuth(authConfig);

export default auth((req) => {
	const { pathname } = req.nextUrl;

	// Log the incoming request URL and the route being checked
	console.log('Request URL:', req.url);
	console.log('Request Pathname:', pathname);

	// Define the public routes (quote/[id] and invoice/[id])
	const publicRoutesRegex = /^\/dashboard\/(quote|invoice)\/[^\/]+$/;

	// Allow access to public routes
	if (publicRoutesRegex.test(pathname)) {
		console.log('Public route accessed:', pathname);
		return NextResponse.next(); // Correct way to proceed to the next middleware or route
	}

	// Log if authentication is missing for protected routes
	if (!req.auth) {
		console.log('Unauthenticated access attempt to protected route:', pathname);

		const redirectUrl = req.url.replace(req.nextUrl.pathname, '/');
		console.log('Redirecting to:', redirectUrl);

		return NextResponse.redirect(redirectUrl); // Use NextResponse.redirect for redirects
	}

	// Log successful access to protected routes
	console.log('Authenticated access to:', pathname);

	return NextResponse.next(); // Correct way to proceed for authenticated users
});

export const config = { matcher: ['/dashboard/:path*'] };
