import { NextIntlClientProvider } from 'next-intl';
import { ThemeProviderComponent } from './theme-provider';
import ReactQueryProvider from '@/components/providers/react-query-provider';
import { NextAuthProvider } from '@/components/providers/next-auth-provider';
import AppSidebarProvider from '@/components/providers/app-sidebar-provider';

type ProvidersProps = {
  children: React.ReactNode;
};

export default function Providers({ children }: ProvidersProps) {
  return (
    <NextIntlClientProvider>
      <NextAuthProvider>
        <ThemeProviderComponent>
          <ReactQueryProvider>
            <AppSidebarProvider>{children}</AppSidebarProvider>
          </ReactQueryProvider>
        </ThemeProviderComponent>
      </NextAuthProvider>
    </NextIntlClientProvider>
  );
}
