import React from 'react'
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from '@/components/ui/app-sidebar'
import { hasLocale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: { locale: string };
};

export default async function Layout({ children, params }: LocaleLayoutProps) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);
  return <>
  <div lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>

    <SidebarProvider>
    
       

        {/* Sidebar */}
        <AppSidebar />

        {/* Main Content Area */}
      
      <main className="flex-1 w-full p-6">
            {children}
          </main>
     
    </SidebarProvider>
  </div>
  </>
}
