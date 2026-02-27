'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';
import { usePathname } from '@/i18n/navigation';
import { cn } from '@/lib/utilits/cn';

type SideLinkProps = {
  children: React.ReactNode;
  href: string;
  className?: string;
};

export default function SideLink({ children, href, className }: SideLinkProps) {
  // Pathname Hook
  const pathname = usePathname();

  return (
    <Link href={href}>
      <Button
        className={cn('font-semibold flex justify-start', className)}
        variant={pathname.endsWith(href) ? 'secondary' : 'ghost'}
      >
        {children}
      </Button>
    </Link>
  );
}
