import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';

// Lightweight wrappers around Next.js' navigation
// APIs that consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);

/**
 * Extract locale from pathname if it starts with /{locale}/... or equals /{locale}
 * Returns { locale, basePath }
 * /en/login => { locale: 'en', basePath: '/login' }
 */
export function getLocaleAndBasePath(pathname: string) {
  const locales = routing.locales;

  // pathname: "/en/login" => ["", "en", "login"]
  const segments = pathname.split('/');
  const maybeLocale = segments[1];

  const hasLocalePrefix = (locales as readonly string[]).includes(maybeLocale);

  if (!hasLocalePrefix) {
    return { locale: undefined as string | undefined, basePath: pathname };
  }

  // "/en" -> "/"
  const rest = segments.slice(2).join('/');
  const basePath = '/' + rest;
  return {
    locale: maybeLocale,
    basePath: basePath === '/' ? '/' : basePath.replace(/\/+$/, '') || '/',
  };
}

// /login => /en/login
export function getPathnameWithLocale(
  locale: string | undefined,
  path: string
) {
  // If next-intl is configured to always prefix locales, keep locale in redirects.
  // If locale is undefined, just return the path.
  if (!locale) return path;
  if (path === '/') return `/${locale}`;
  return `/${locale}${path.startsWith('/') ? '' : '/'}${path}`;
}
