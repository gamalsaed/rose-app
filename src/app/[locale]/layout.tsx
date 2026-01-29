import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import type { Metadata } from "next";
import { Sarabun, Tajawal } from "next/font/google";
import Providers from "@/components/providers";
<<<<<<< HEAD
=======
import localFont from 'next/font/local';

>>>>>>> 02f3b26765c0ea1fc269f3f99c5cb4e323f56931
import { Toaster } from "@/components/ui/toaster";

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
      path: '../../../public/assets/fonts/Edwardian-Scriptitc.ttf',
    },
  ],
  variable: '--font-edwardian',
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
<<<<<<< HEAD
          <Providers>
            <Header />
            {children}
            <Toaster />
            <Footer />
          </Providers>
=======
        <Providers>
          {/* TODO: move header and footer to a separate home page layout */}
          {/* <Header /> */}

          {children}
          <Toaster />

          {/* <Footer /> */}
        </Providers>
>>>>>>> 02f3b26765c0ea1fc269f3f99c5cb4e323f56931
      </body>
    </html>
  );
}
