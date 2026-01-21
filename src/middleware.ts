import { NextRequest, NextResponse } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';
import { getToken } from 'next-auth/jwt';
import { getLocaleAndBasePath, getPathnameWithLocale } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';

import {
  DEFAULT_AUTHORIZED_ROUTE,
  PUBLIC_ROUTES,
  AUTH_ROUTES,
} from './lib/constants/navigation.constants';

const intlMiddleware = createIntlMiddleware(routing);

export default async function middleware(request: NextRequest) {
  // 1) next-intl first (may redirect)
  const intlResponse = intlMiddleware(request);
  if (intlResponse && intlResponse.status !== 200) {
    return intlResponse;
  }

  const { pathname, origin } = request.nextUrl;

  // 2) Normalize path for auth checks
  const { locale, basePath } = getLocaleAndBasePath(pathname);

  const isPublicRoute = PUBLIC_ROUTES.includes(basePath);
  const isAuthRoute = AUTH_ROUTES.includes(basePath);

  // 3) Auth token
  const token = await getToken({ req: request });

  // If route is protected (not public)
  if (!isPublicRoute) {
    if (token) return intlResponse ?? NextResponse.next();

    // Redirect to localized login
    const loginPath = getPathnameWithLocale(locale, '/login');
    const redirectUrl = new URL(loginPath, origin);

    // Keep full original path (including locale) so callback returns correctly
    redirectUrl.searchParams.set('callbackUrl', pathname);

    return NextResponse.redirect(redirectUrl);
  }

  // Public but not auth routes -> allow
  if (!isAuthRoute) {
    return intlResponse ?? NextResponse.next();
  }

  // Auth routes:
  // - if not logged in -> allow (show login/signup/forgot)
  if (!token) return intlResponse ?? NextResponse.next();

  // - if logged in -> redirect away from auth pages
  const authorizedPath = getPathnameWithLocale(
    locale,
    DEFAULT_AUTHORIZED_ROUTE
  );
  return NextResponse.redirect(new URL(authorizedPath, origin));
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  // Exclude api, next internals, vercel, and all files with extensions
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
};
