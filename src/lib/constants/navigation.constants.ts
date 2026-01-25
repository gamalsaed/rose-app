export const DEFAULT_ROUTE = '/'; // Home page

export const SYSTEM_ROUTES = ['/unauthorized', '/not-found', '/error'];
export const AUTH_ROUTES = ['/login', '/signup', '/forgot-password'];
export const PUBLIC_ROUTES = [...AUTH_ROUTES, DEFAULT_ROUTE];
export const PROTECTED_ROUTES = [
  // TODO: Add protected routes here, except for the home page
];
