import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  // variables
  const requestedLocale = await requestLocale;
  const locale = hasLocale(routing.locales, requestedLocale)
    ? requestedLocale
    : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
    formats: {
      number: {
        // 65,000.00
        "price": {
          style: "decimal",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
          numberingSystem: locale === "ar" ? "arab" : "latn",
        },
      },
      dateTime: {
        // January 12, 2025
        "long-date": {
          month: "long",
          day: "numeric",
          year: "numeric",
          numberingSystem: locale === "ar" ? "arab" : "latn",
        },
        // Jan 12, 2025
        "medium-date": {
          month: "short",
          day: "numeric",
          year: "numeric",
          numberingSystem: locale === "ar" ? "arab" : "latn",
        },
      },
    },
  };
});
