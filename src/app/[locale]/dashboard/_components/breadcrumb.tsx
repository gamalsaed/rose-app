'use client';

import React from 'react';
import { Link, usePathname } from '@/i18n/navigation';

// Shadcn Components
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utilits/cn';

export default function BreadCrumb() {
  // Pathname Hook
  const pathname = usePathname();

  // Variables
  const segments = pathname.split('/').filter(Boolean);
  const shouldCollapse = segments.length > 3;
  const dashboardSegment = segments[0];
  const last = segments[segments.length - 1];
  const middle = segments.slice(1, -1);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {/* First */}
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href={`/${dashboardSegment}`} className="capitalize">
              {decodeURIComponent(dashboardSegment)}
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {shouldCollapse && (
          <>
            <BreadcrumbSeparator />

            {/* Dropdown Ellipsis if we have 4 or more segmants */}
            <BreadcrumbItem>
              <DropdownMenu>
                <DropdownMenuTrigger className="px-2">...</DropdownMenuTrigger>

                <DropdownMenuContent align="start">
                  {middle.map((segment, index) => {
                    const href = '/' + segments.slice(0, index + 2).join('/');

                    return (
                      <DropdownMenuItem key={href} asChild>
                        <Link href={href} className="capitalize w-full">
                          {decodeURIComponent(segment)}
                        </Link>
                      </DropdownMenuItem>
                    );
                  })}
                </DropdownMenuContent>
              </DropdownMenu>
            </BreadcrumbItem>
          </>
        )}

        {/* Middle if less than 4 */}
        {!shouldCollapse &&
          middle.map((segment, index) => {
            const href = '/' + segments.slice(0, index + 2).join('/');
            return (
              <React.Fragment key={href}>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href={href} className="capitalize">
                      {decodeURIComponent(segment)}
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </React.Fragment>
            );
          })}

        {/* Last */}
        {segments.length > 1 && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage
                className={cn(
                  'capitalize',
                  last !== 'dashboard' ? 'text-maroon-600' : 'text-gray-500'
                )}
              >
                {decodeURIComponent(last)}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
