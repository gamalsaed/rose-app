import { hasLocale } from 'next-intl';
import { getTranslations } from 'next-intl/server';

import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

import { ProfileSidebar } from './_components/profile-sidebar';

type ProfileLayoutProps = {
  children: React.ReactNode;
  params: { locale: string };
};

export default async function ProfileLayout({
  children,
  params,
}: ProfileLayoutProps) {
  // Translation
  const t = await getTranslations('profile');

  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  return (
    <main className="py-16 px-20">
      <h1 className="text-5xl font-bold mb-9">{t('update-profile-title')}</h1>

      <div className="flex gap-9 items-stretch">
        <ProfileSidebar />

        {children}
      </div>
    </main>
  );
}
