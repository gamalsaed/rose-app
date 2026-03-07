import { hasLocale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

// Layouts
import HeaderContainer from '@/components/layout/app/header/header-container';
import Footer from '@/components/layout/app/footer/footer';
import CartContextProvider from '@/lib/context/CartContext';

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

  return (
    <div
      lang={locale}
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
      className="flex flex-col min-h-screen overflow-auto w-full"
    >
      <CartContextProvider>
        <HeaderContainer />
        {children}
        <Footer />
      </CartContextProvider>
    </div>
  );
}
