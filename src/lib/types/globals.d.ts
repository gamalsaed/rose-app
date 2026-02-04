import { Locale, useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { formats } from "@/i18n/request";
import messages from "@/i18n/messages/en.json";
import { use } from "react";

declare global {
  type Params = {
    locale: Locale;
  };

  type RouteProps = {
    params: Params;
    searchParams?: { [key: string]: string | string[] | undefined };
  };
}

declare module "next-intl" {
  interface AppConfig {
    Locale: (typeof routing.locales)[number];
    Messages: typeof messages;
    Formats: typeof formats;
  }
}

export type Translations = Awaited<ReturnType<typeof getTranslations>>;
