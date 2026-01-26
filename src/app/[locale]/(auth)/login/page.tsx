import { getTranslations } from 'next-intl/server';

import { LoginForm } from './_components/login-form';

export async function generateMetadata({
  params: { locale },
}: Pick<RouteProps, 'params'>) {
  const t = await getTranslations({ locale });

  return {
    title: t('auth.login-meta-title'),
  };
}

export default function LoginPage() {
  return <LoginForm />;
}
