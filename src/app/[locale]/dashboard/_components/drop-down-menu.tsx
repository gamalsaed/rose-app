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

export default function DropDownMenu() {
  // Session => User Info
  const session = useSession();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none m-0 pt-5">
        <EllipsisVertical />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-64  rounded-2xl" align="end">
        <DropdownMenuLabel className="font-semibold px-3 py-2.5 text-maroon-700">
          {session.data?.user.firstName} {session.data?.user.firstName}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="p-4" asChild>
          <Link href="/dashboard/account">
            <User />
            Account
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => signOut()}
          className="p-4 text-red-600"
        >
          <LogOut />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
