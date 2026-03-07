import React from 'react';
import Image from 'next/image';
import { SidebarTrigger } from '@/components/ui/sidebar';
import ProfileImage from './profile-image';
import BreadCrumb from './breadcrumb';

export default function Header() {
  return (
    <div className="w-full flex justify-between flex-wrap  h-fit py-6 px-4 bg-white border-b border-black/10 text-gray-500 text-sm">
      <div className="flex items-center gap-3">
        <Image
          width={60}
          height={57}
          alt="logo"
          src="/assets/images/logo.svg"
          className="md:sr-only"
        />

        <h1>
          {/* Path */}
          <BreadCrumb />
        </h1>
      </div>
      <div className="flex items-center md:sr-only gap-3">
        <ProfileImage />
        <SidebarTrigger />
      </div>
    </div>
  );
}
