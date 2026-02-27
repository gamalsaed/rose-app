import React from 'react';
import SideBar from './_components/side-bar';
import Header from './_components/header';
import { SidebarProvider } from '@/components/ui/sidebar';
import ResponsiveFooter from './_components/responsive-footer';
import { authOptions } from '@/auth';
import { getServerSession } from 'next-auth';

export default async function layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // User Info
  const session = await getServerSession(authOptions);

  // params
  const { locale } = await params;

  if (session?.user.role === 'user') {
    return (
      <h1 className="h-dvh flex items-center justify-center">Unauthorized</h1>
    );
  }

  return (
    <SidebarProvider className=" overflow-hidden">
      <SideBar locale={locale} />
      <div className="w-full overflow-y-auto bg-zinc-50 ">
        <Header />
        <div className="max-md:mb-32 ">{children}</div>
      </div>
      <ResponsiveFooter />
    </SidebarProvider>
  );
}
