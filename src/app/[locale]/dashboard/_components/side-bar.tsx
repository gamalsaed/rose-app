import Image from 'next/image';

// Icons
import { Flower } from 'lucide-react';

// Navigation
import { Link } from '@/i18n/navigation';

// Layouts
import { Button } from '@/components/ui/button';
import SideLink from './side-link';
import DropDownMenu from './drop-down-menu';
import ProfileImage from './profile-image';

// Next Auth
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';

// Shadcn Side Bar
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from '@/components/ui/sidebar';
import { DASHBOARD_ROUTES } from '@/lib/constants/navigation.constants';
import { getTranslations } from 'next-intl/server';
export default async function SideBar({ locale }: { locale: string }) {
  // Session => User Info
  const session = await getServerSession(authOptions);

  // Translation
  const t = await getTranslations('dashboard.sidebar');

  // Side Bar direction
  const isRTL = locale === 'ar';

  return (
    <Sidebar
      side={isRTL ? 'right' : 'left'}
      variant="inset"
      className="bg-white border  border-black/10"
    >
      {/* Header */}
      <SidebarHeader className="bg-white">
        <Image
          width={120}
          height={112}
          alt="logo"
          src="/assets/images/logo.svg"
          className="mt-16 mx-auto"
        />
        <Link href="/" className="w-full my-6">
          <Button className="font-semibold !py-6">
            <Flower height={25} width={25} />
            <span>Preview website</span>
          </Button>
        </Link>
      </SidebarHeader>

      {/* Links */}
      <SidebarContent className="bg-white">
        {DASHBOARD_ROUTES.map(link => {
          return (
            <SideLink href={link.href}>
              <link.icon />
              <span className="capitalize">{t(link.text)}</span>
            </SideLink>
          );
        })}
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="bg-white">
        {' '}
        <div className="w-full flex items-center justify-between gap-2.5 mb-6">
          {/* Profile Image */}
          <ProfileImage />

          {/* User Info */}
          <div className="flex flex-col ">
            <span className="text-zinc-800 font-bold leading-loose">
              {session?.user?.firstName} {session?.user?.lastName}
            </span>
            <span className="leading-none text-gray-500 break-all ">
              {session?.user?.email}
            </span>
          </div>

          {/* Three dots */}
          <DropDownMenu />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
