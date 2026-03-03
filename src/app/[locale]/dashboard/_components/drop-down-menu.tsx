'use client';

// Navigation
import Link from 'next/link';

// Shadcn
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';

// Icons
import { EllipsisVertical, LogOut, User } from 'lucide-react';

// Next Auth
import { signOut, useSession } from 'next-auth/react';

import { useTranslations } from 'next-intl';

export default function DropDownMenu() {
  // Session => User Info
  const session = useSession();

  // Translation
  const t = useTranslations('dashboard.dropDownMenu');
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none m-0 border border-gray-300 p-1 rounded-lg ">
        <EllipsisVertical />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-64  rounded-2xl" align="end">
        <DropdownMenuLabel className="font-semibold px-3 py-2.5 text-maroon-700">
          {session.data?.user.firstName} {session.data?.user.lastName}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="p-4" asChild>
          <Link href="/dashboard/account">
            <User />
            {t('account')}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => signOut()}
          className="p-4 text-red-600"
        >
          <LogOut />
          {t('logout')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
