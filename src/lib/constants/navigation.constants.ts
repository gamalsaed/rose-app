export const DEFAULT_ROUTE = '/'; // Home page

export const SYSTEM_ROUTES = ['/unauthorized', '/not-found', '/error'];
export const AUTH_ROUTES = ['/login', '/register', '/forgot-password'];
export const PUBLIC_ROUTES = [
  DEFAULT_ROUTE,
  '/products',
  '/products/:productId',
];
export const PROTECTED_ROUTES = [
  '/profile/account',
  '/profile/change-password',
];