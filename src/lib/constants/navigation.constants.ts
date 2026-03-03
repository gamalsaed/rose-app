import {
  CalendarHeart,
  ClipboardList,
  LayoutDashboard,
  Package,
} from 'lucide-react';

export const DEFAULT_ROUTE = '/'; // Home page

export const SYSTEM_ROUTES = ['/unauthorized', '/not-found', '/error'];
export const AUTH_ROUTES = ['/login', '/register', '/forgot-password'];
export const PUBLIC_ROUTES = [
  DEFAULT_ROUTE,
  '/products',
  '/products/:productId',
];
export const PROTECTED_ROUTES = [
  // TODO: Add protected routes here, except for the home page
  '/dashboard',
  '/profile/account',
  '/profile/change-password',
];

// Constants
export const DASHBOARD_ROUTES = [
  {
    text: 'overview',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    text: 'categories',
    href: '/dashboard/categories',
    icon: ClipboardList,
  },
  {
    text: 'occasions',
    href: '/dashboard/occasions',
    icon: CalendarHeart,
  },
  {
    text: 'products',
    href: '/dashboard/products',
    icon: Package,
  },
] as const;
