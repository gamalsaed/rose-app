"use client";

import { useLocale, useTranslations, Locale } from "next-intl";
// eslint-disable-next-line no-restricted-imports
import { useRouter, usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";

export const LanguageSwitcher = () => {
  // Translation
  const t = useTranslations();

  // Navigation
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();

  // Functions
  const switchLang = (lang: Locale) => {
    const segments = pathname.split("/");
    segments[1] = lang; // replace locale
    router.push(segments.join("/"));
  };

  return (
    <Button
      variant={"ghost"}
      className="text-base cursor-pointer p-0 hover:bg-transparent w-fit"
      onClick={() => switchLang(locale === "ar" ? "en" : "ar")}
    >
      {t("shared.language-switcher")}
    </Button>
  );
};
