import {  Locale } from "next-intl";
import { routing } from "@/i18n/routing";
import { formats } from "@/i18n/request";
import messages from "@/i18n/messages/en.json";
import { getTranslations } from "next-intl/server";


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
