import { NextIntlClientProvider } from "next-intl";
import { ThemeProviderComponent } from "./theme-provider";
import ReactQueryProvider from "@/components/providers/react-query-provider";

type ProvidersProps = {
  children: React.ReactNode;
};

export default function Providers({ children }: ProvidersProps) {
  return (
    <NextIntlClientProvider>
      <ThemeProviderComponent>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </ThemeProviderComponent>
    </NextIntlClientProvider>
  );
}
