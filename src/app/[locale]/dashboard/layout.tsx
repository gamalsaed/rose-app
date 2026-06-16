import React from 'react';
import SideBar from './_components/side-bar';
import Header from './_components/header';
import { SidebarProvider } from '@/components/ui/sidebar';
import ResponsiveFooter from './_components/responsive-footer';
import { hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { setRequestLocale } from 'next-intl/server';
export default async function layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // params

  // if (session?.user.role === 'user') {
  //   return (
  //     <h1 className="h-dvh flex items-center justify-center">Unauthorized</h1>
  //   );
  // }
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  return (
    <SidebarProvider className=" overflow-hidden">
      <SideBar locale={locale} />
      <div className="w-full overflow-y-auto bg-zinc-50 ">
        <Header />
        <div className="max-md:mb-32 p-4">{children}</div>
      </div>
      <ResponsiveFooter />
    </SidebarProvider>
  );
}
