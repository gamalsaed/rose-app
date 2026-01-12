import { NextIntlClientProvider } from "next-intl";
import { ThemeProviderComponent } from "./theme-provider";

type ProvidersProps = {
  children: React.ReactNode;
};

export default function Providers({ children }: ProvidersProps) {
  return (
    <NextIntlClientProvider>
      <ThemeProviderComponent>{children}</ThemeProviderComponent>
    </NextIntlClientProvider>
  );
}
