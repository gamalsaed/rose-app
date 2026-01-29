import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import type { Metadata } from "next";
import { Sarabun, Tajawal } from "next/font/google";
import Providers from "@/components/providers";
import {NextIntlClientProvider} from 'next-intl';
import localFont from "next/font/local";

import { Toaster } from "@/components/ui/toaster";
import Footer from "@/components/layout/app/footer/footer";
import Header from "@/components/layout/app/header/header";

const sarabun = Sarabun({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  variable: "--font-sarabun",
});
const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["200", "300", "400", "500", "700", "800", "900"],
  variable: "--font-tajawal",
});

const edwardianScript = localFont({
  src: [
    {
      path: "../../../public/assets/fonts/Edwardian-Scriptitc.ttf",
    },
  ],
  variable: "--font-edwardian",
});

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: { locale: string };
};

export async function generateMetadata({
  params: { locale },
}: Pick<RouteProps, "params">): Promise<Metadata> {
  const t = await getTranslations({ locale });

  return {
    title: t("meta-title"),
    description: t("meta-description"),
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);
  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body
        className={`${sarabun.variable} ${tajawal.variable} ${edwardianScript.variable} antialiased dark:bg-zinc-800 `}
      >
         <Providers> 
          <Header /> 
          <NextIntlClientProvider>{children}</NextIntlClientProvider>
          <Toaster />
          <Footer />
        </Providers>
       
      </body>
    </html>
  );
}
