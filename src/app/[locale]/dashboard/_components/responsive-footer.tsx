import React from 'react';
import { DASHBOARD_ROUTES } from '@/lib/constants/navigation.constants';
import SideLink from './side-link';
import { Flower } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';

export default function ResponsiveFooter() {
  return (
    <div className=" fixed m-0 bottom-0 left-0 z-50 w-full md:sr-only bg-white p-4  ">
      <div className="flex relative">
        {/* Review the website button */}
        <Link
          href="/"
          className="flex justify-center w-full rounded-full content-center absolute -top-10"
        >
          <Button className="font-semibold w-12 h-12 rounded-full ring-8 ring-white">
            <div className="flex flex-col items">
              <Flower height={30} width={30} />
            </div>
          </Button>
        </Link>

        {/* Links */}
        <div className="flex w-full justify-around">
          {DASHBOARD_ROUTES.map(link => {
            return (
              <SideLink href={link.href} className="w-fit h-16 !rounded-xl">
                <div className="flex flex-col items-center justify-center ">
                  <div>
                    <link.icon />
                  </div>
                  <div className="block capitalize">{link.text}</div>
                </div>
              </SideLink>
            );
          })}
        </div>
      </div>
    </div>
  );
}
