'use client';

import { usePathname, Link } from '@/i18n/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useLogout } from '@/hooks/auth/use-logout';
import { cn } from '@/lib/utilits/cn';
import { Translations } from '@/lib/types/next-intl';

import {
  Sidebar,
  SidebarFooter,
  SidebarContent,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

import { Spinner } from '@/components/ui/spinner';
import { LogOut, UserRoundPen, Lock } from 'lucide-react';

export const SETTINGS_SIDEBAR_ITEMS = (t: Translations) =>
  [
    {
      title: t('my-account'),
      url: '/profile/account',
      icon: UserRoundPen,
      matchRegex: /profile\/account/,
    },
    {
      title: t('change-password'),
      url: '/profile/change-password',
      icon: Lock,
      matchRegex: /profile\/change-password/,
    },
  ] as const;

export function ProfileSidebar() {
  // Translation
  const profileMessages = useTranslations('profile');

  // Navigation
  const pathname = usePathname();

  // Hooks
  const locale = useLocale();

  // Mutations
  const { logout, isPending: logoutLoading } = useLogout();

  // Variables
  const isRTL = locale === 'ar';

  return (
    <aside className="h-[34.375rem]">
      <Sidebar collapsible="none" className="p-4 bg-zinc-50 w-72 rounded-lg">
        <SidebarContent>
          {/* Main Settings Sidebar Items  */}
          <SidebarGroupContent>
            <SidebarMenu>
              {SETTINGS_SIDEBAR_ITEMS(profileMessages).map(item => {
                const isSelected = item.matchRegex?.test(pathname);

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild size={'lg'}>
                      <Link
                        href={item.url}
                        className={cn(
                          'text-base ps-3 font-medium border-none',
                          isSelected
                            ? 'text-white bg-zinc-800 hover:bg-zinc-900 hover:text-white'
                            : ''
                        )}
                      >
                        <item.icon
                          className="size-6"
                          size={24}
                          width={24}
                          height={24}
                        />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarContent>

        {/* Logout Button */}
        <SidebarFooter>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  size={'lg'}
                  className={cn(
                    'h-11 text-base font-medium border-none text-maroon-500 bg-zinc-100',
                    'hover:bg-zinc-100 hover:text-maroon-600'
                  )}
                  onClick={async () => {
                    logout();
                  }}
                  disabled={logoutLoading}
                >
                  <LogOut
                    className={cn('size-5', isRTL ? '' : 'scale-x-[-1]')}
                    size={24}
                    width={24}
                    height={24}
                  />
                  <span>{profileMessages('logout')}</span>
                  {logoutLoading && (
                    <Spinner className={cn('size-4 ms-auto')} />
                  )}
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarFooter>
      </Sidebar>
    </aside>
  );
}
