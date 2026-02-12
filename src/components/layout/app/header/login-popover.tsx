import { Button } from '@/components/ui/button';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User } from 'lucide-react';

import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

import { LoginForm } from '@/app/[locale]/(auth)/login/_components/login-form';

/*
  Added varient system to TabsTrigger component
  1-default
  2-destructive
  3-outline => pass a prop called direction, it takes 2 things left and right
  4-ghost
*/

export default function LoginPopover() {
  // Translation
  const t = useTranslations();

  return (
    <HoverCard openDelay={10} closeDelay={100}>
      <HoverCardTrigger asChild>
        <Button variant="ghost" asChild>
          <Link href="/login" className="flex items-center gap-1">
            <User size={24} />
            <span className="text-base whitespace-nowrap font-normal">
              {t('auth.login')}
            </span>
          </Link>
        </Button>
      </HoverCardTrigger>

      <HoverCardContent className="flex dark:bg-zinc-800  w-96 p-0.5 flex-col gap-0.5 border-none rounded-xl ">
        <Tabs defaultValue="login" className="w-full p-0 m-0">
          <TabsList>
            <TabsTrigger
              value="login"
              className="rounded-b-none rounded-r-none z-10"
            >
              {t('auth.login')}
            </TabsTrigger>
            <Link
              href="/register"
              className="inline-flex w-full h-full items-center justify-center rounded-none ring-2  ring-zinc-300 dark:ring-zinc-600  whitespace-nowrap dark:bg-zinc-700 rounded-tr-lg"
            >
              {t('auth.register')}
            </Link>
          </TabsList>

          {/* Login Tab */}
          <TabsContent value="login" className="p-4  ">
            <LoginForm />
          </TabsContent>
        </Tabs>
      </HoverCardContent>
    </HoverCard>
  );
}
