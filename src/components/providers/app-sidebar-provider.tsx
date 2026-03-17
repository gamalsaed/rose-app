import { SidebarProvider } from '@/components/ui/sidebar';

type AppSidebarProviderProps = {
  children: React.ReactNode;
};

export default function AppSidebarProvider({
  children,
}: AppSidebarProviderProps) {
  return <SidebarProvider>{children}</SidebarProvider>;
}
