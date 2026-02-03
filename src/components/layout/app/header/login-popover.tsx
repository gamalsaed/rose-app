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
import RegisterForm from '@/app/[locale]/(auth)/register/_components/register-form';

/*
  Added varient system to TabsTrigger component
  1-default
  2-destructive
  3-outline
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

      <HoverCardContent className="flex w-96 p-0 flex-col gap-0.5 border-none rounded-xl ">
        <Tabs defaultValue="login" className="w-full m-0">
          <TabsList>
            <TabsTrigger
              value="login"
              className="rounded-b-none rounded-r-none !border-r-0"
            >
              Login
            </TabsTrigger>
            <TabsTrigger
              value="register"
              className="rounded-b-none rounded-l-none !border-l-0"
            >
              Register
            </TabsTrigger>
          </TabsList>

          {/* Login Tab */}
          <TabsContent value="login" className="m-4">
            <LoginForm />
          </TabsContent>

          {/* Register Tab */}
          <TabsContent value="register" className="m-4">
            <RegisterForm />
          </TabsContent>
        </Tabs>
      </HoverCardContent>
    </HoverCard>
  );
}
