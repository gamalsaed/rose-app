import { getTranslations } from 'next-intl/server';

import { LoginForm } from './_components/login-form';
import { Separator } from '@/components/ui/separator';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export async function generateMetadata({
  params: { locale },
}: Pick<RouteProps, 'params'>) {
  const t = await getTranslations({ locale });

  return {
    title: t('auth.login-meta-title'),
  };
}

export default function LoginPage() {
  // Translation
  const t = useTranslations();

  return (
    <>
      {/* Title */}
      <h1 className="text-center text-5xl text-maroon-700 dark:text-softPink-300 font-edwardian">
        {t('auth.welcome-back')}
      </h1>

      <Separator className="w-full mt-4 mb-6" />
      <LoginForm />
      <Separator className="w-full mt-9 mb-5" />

      {/* Don't have an account? */}
      <p className="text-center text-sm font-medium">
        {t.rich('auth.do-not-have-account', {
          cta: (chunks: React.ReactNode) => (
            <Link
              href="/register"
              className="text-maroon-700 dark:text-softPink-300"
            >
              {chunks}
            </Link>
          ),
        })}
      </p>
    </>
  );
}
