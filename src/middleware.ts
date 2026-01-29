import { NextResponse, NextRequest, NextFetchEvent } from 'next/server';
import { withAuth, NextRequestWithAuth } from 'next-auth/middleware';
import createIntlMiddleware from 'next-intl/middleware';
import { getToken } from 'next-auth/jwt';
import { routing } from '@/i18n/routing';

import {
  DEFAULT_ROUTE,
  SYSTEM_ROUTES,
  AUTH_ROUTES,
  PUBLIC_ROUTES,
  PROTECTED_ROUTES,
} from './lib/constants/navigation.constants';

function routesRegex(routes: string[]) {
  return RegExp(
    `^(/(${routing.locales.join('|')}))?(${routes
      .flatMap(p => (p === '/' ? ['', '/'] : p))
      .join('|')})/?$`,
    'i'
  );
}

const handleI18nRouting = createIntlMiddleware(routing);

const authMiddleware = withAuth(
  // Note that this callback is only invoked if
  // the `authorized` callback has returned `true`
  // and not for pages listed in `pages`.
  function onSuccess(req) {
    return handleI18nRouting(req);
  },
  {
    callbacks: {
      authorized: ({ token }) => token != null,
    },
    pages: {
      signIn: '/login',
    },
  }
);

export default async function middleware(
  req: NextRequest,
  event: NextFetchEvent
) {
  const { pathname, origin } = req.nextUrl;

  // * handle next-intl redirect
  const intlResponse = handleI18nRouting(req);

  if (intlResponse && intlResponse.status !== 200) {
    return intlResponse;
  }

  //* Normalize path for auth checks

  const publicRouteRegex = routesRegex(PUBLIC_ROUTES);
  const isPublicRoute = publicRouteRegex.test(pathname);

  const authRouteRegex = routesRegex(AUTH_ROUTES);
  const isAuthRoute = authRouteRegex.test(pathname);

  const protectedRouteRegex = routesRegex(PROTECTED_ROUTES);
  const isProtectedRoute = protectedRouteRegex.test(pathname);

  const systemRouteRegex = routesRegex(SYSTEM_ROUTES);
  const isSystemRoute = systemRouteRegex.test(pathname);

  const token = await getToken({ req });

  // * System routes
  if (isSystemRoute) {
    return intlResponse;
  }

  // * Auth routes
  if (isAuthRoute) {
    const redirectUrl = new URL(DEFAULT_ROUTE, origin);

    // - if logged in -> redirect away from auth pages
    if (token) {
      return NextResponse.redirect(redirectUrl);
    }

    // - if not logged in -> allow (show login/register/forgot)
    return handleI18nRouting(req);
  }

  // * Public routes (No auth required)
  if (isPublicRoute) {
    return intlResponse;
  }

  // * Protected routes (Auth required)
  if (isProtectedRoute) {
    return authMiddleware(req as NextRequestWithAuth, event);
  }

  // * Default behavior - unknown routes (404)
  return handleI18nRouting(req);
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  // Exclude api, next internals, vercel, and all files with extensions
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
};
