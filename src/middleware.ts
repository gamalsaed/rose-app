import { NextResponse } from 'next/server';
import { withAuth, NextRequestWithAuth } from 'next-auth/middleware';
import createIntlMiddleware from 'next-intl/middleware';
import { getLocaleAndBasePath, getPathnameWithLocale } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';

import {
  DEFAULT_ROUTE,
  SYSTEM_ROUTES,
  AUTH_ROUTES,
  PUBLIC_ROUTES,
  PROTECTED_ROUTES,
} from './lib/constants/navigation.constants';

const intlMiddleware = createIntlMiddleware(routing);

export default withAuth(
  function middleware(req: NextRequestWithAuth) {
    const { pathname, origin } = req.nextUrl;

    // * handle next-intl redirect
    const intlResponse = intlMiddleware(req);

    if (intlResponse && intlResponse.status !== 200) {
      return intlResponse;
    }

    //* Normalize path for auth checks
    const { locale, basePath } = getLocaleAndBasePath(pathname);

    const isSystemRoute = SYSTEM_ROUTES.includes(basePath);
    const isAuthRoute = AUTH_ROUTES.includes(basePath);
    const isPublicRoute = PUBLIC_ROUTES.includes(basePath);
    const isProtectedRoute = PROTECTED_ROUTES.includes(basePath);

    const token = req.nextauth.token;

    // * System routes
    if (isSystemRoute) {
      return intlResponse;
    }

    // * Protected routes
    if (isProtectedRoute) {
      if (token) return intlResponse;

      // Redirect to localized login
      const loginPath = getPathnameWithLocale(locale, '/login');
      const redirectUrl = new URL(loginPath, origin);

      // Keep full original path (including locale) so callback returns correctly
      redirectUrl.searchParams.set('callbackUrl', pathname);

      return NextResponse.redirect(redirectUrl);
    }

    // * Public but not auth routes
    if (isPublicRoute && !isAuthRoute) {
      return intlResponse;
    }

    // * Auth routes
    // - if not logged in -> allow (show login/signup/forgot)
    if (!token) return intlResponse;

    // - if logged in -> redirect away from auth pages
    const authorizedPath = getPathnameWithLocale(locale, DEFAULT_ROUTE);

    return NextResponse.redirect(new URL(authorizedPath, origin));
  },
  {
    callbacks: {
      // * Always authorize to handle redirects manually with locale support
      authorized: () => true,
    },
  }
);

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  // Exclude api, next internals, vercel, and all files with extensions
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
};
