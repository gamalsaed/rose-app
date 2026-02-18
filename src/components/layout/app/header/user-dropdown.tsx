'use client';

import { useTranslations } from 'next-intl';
import { useSession } from 'next-auth/react';
import { useLogout } from '@/hooks/auth/use-logout';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import LoginPopover from './login-popover';
import { ChevronDown, LogOut } from 'lucide-react';

export default function UserDropDown() {
  // Translation
  const t = useTranslations();

  // Hooks
  const { data: session } = useSession();
  const { logout } = useLogout();

  // Variables
  const isLoggedIn = !!session?.user;
  const isAlive = sessionStorage.getItem('isAlive');
  const handleLogout = async () => {
    logout();
  };

  return (isLoggedIn && isAlive === null && session.rememberMe === 'true') ||
    (isLoggedIn && isAlive === 'true' && session?.rememberMe === 'false') ? (
    <DropdownMenu>
      {/* Dropdown Menu Trigger */}
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <span className="flex gap-1 min-w-16">
            {/* User Name */}
            <span className="flex flex-col items-start text-xs text-zinc-500 ">
              {t.rich('homepage.hello-user', {
                name: session?.user?.firstName,
                span: (chunks: React.ReactNode) => (
                  <span className="font-medium text-maroon-700">{chunks}</span>
                ),
              })}
            </span>

            <ChevronDown
              size={18}
              className="text-zinc-500 mt-auto mb-0.5 ms-auto"
            />
          </span>
        </Button>
      </DropdownMenuTrigger>

      {/* Dropdown Menu Content */}
      <DropdownMenuContent className="w-56">
        {/* User Name */}
        <DropdownMenuGroup>
          <DropdownMenuLabel>
            <p className="text-sm font-medium text-maroon-700 dark:text-softPink-200">{`${session?.user?.firstName} ${session?.user?.lastName}`}</p>
          </DropdownMenuLabel>
        </DropdownMenuGroup>

        {/* Logout Button */}
        <DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Button
              variant="ghost"
              onClick={handleLogout}
              className="w-full justify-start"
            >
              <LogOut size={18} className="me-1" />
              {t('homepage.logout-cta')}
            </Button>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    // Login Popover
    <LoginPopover />
  );
}
